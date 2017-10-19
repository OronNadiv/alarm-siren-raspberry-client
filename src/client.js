const info = require('debug')('ha:client:info')
const error = require('debug')('ha:client:error')

const config = require('./config')
const diehard = require('diehard')
const LED = require('raspberry-pi-led')
const Siren = require('./siren')
const Promise = require('bluebird')
const pubnubConnect = require('./pubnub')

class Client {
  constructor () {
    this.ledClientUp = config.pins.clientUp < 0
      ? null
      : new LED({name: 'PIN_CLIENT_UP', pin: config.pins.clientUp})
    this.ledConnectedToServer = config.pins.connectedToServer < 0
      ? null
      : new LED({name: 'PIN_CONNECTED_TO_SERVER', pin: config.pins.connectedToServer})
    this.siren = new Siren()
  }

  run () {
    const self = this

    return Promise
      .try(() => self.ledClientUp && self.ledClientUp.initialize())
      .then(() => self.ledClientUp && self.ledClientUp.turnOn())
      .then(() => self.ledConnectedToServer && self.ledConnectedToServer.initialize())
      .then(() => self.ledConnectedToServer && self.ledConnectedToServer.turnOff())
      .then(() => {
        const events = [
          {
            system: 'ALARM',
            type: 'TOGGLE_CREATED',
            callback: data => {
              info('TOGGLE_CREATED called.', 'data:', data)
              if (data.is_armed) {
                return
              }
              return Promise
                .resolve(self.siren.turnOff())
                .catch(err => error('While calling siren.turnOff.', 'err:', err))
            }
          },
          {
            system: 'ALARM',
            type: 'MOTION_CREATED',
            callback: data => {
              info('MOTION_CREATED called.', 'data:', data)
              return Promise
                .resolve(self.siren.turnOn())
                .catch(err => error('While calling siren.turnOn.', 'err:', err))
            }
          }
        ]

        info('calling pubnub')
        return pubnubConnect(
          self.ledConnectedToServer,
          events,
          {
            subject: '/motions',
            audience: 'urn:home-automation/alarm'
          }
        )
      })
      .then(() => diehard.listen()) // diehard uses 'this' context.  That is why we have to call it this way.
  }
}

module.exports = Client
