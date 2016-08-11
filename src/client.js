const info = require('debug')('ha:client:info')
const error = require('debug')('ha:client:error')

const config = require('./config')
const diehard = require('diehard')
const LED = require('./led')
const Siren = require('./siren')
const SocketIO = require('./socket-io')
const Promise = require('bluebird')

class Client {
  constructor () {
    this.ledClientUp = new LED('PIN_CLIENT_UP', config.pins.clientUp)
    this.ledConnectedToServer = new LED('PIN_CONNECTED_TO_SERVER', config.pins.connectedToServer)
    this.siren = new Siren()
    this.socketIO = new SocketIO(this.ledConnectedToServer)
  }

  run () {
    const self = this

    return Promise
      .resolve(self.ledClientUp.initialize())
      .then(() => self.ledClientUp.turnOn())
      .then(() => self.ledConnectedToServer.initialize())
      .then(() => self.ledConnectedToServer.turnOff())
      .then(() => {
        const options = {
          subject: '/motions',
          audience: 'urn:home-automation/alarm',
          rooms: ['sirens', 'alarm-sensors'],
          events: [
            {
              name: 'TOGGLE_CREATED',
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
              name: 'MOTION_CREATED',
              callback: data => {
                info('MOTION_CREATED called.', 'data:', data)
                return Promise
                  .resolve(self.siren.turnOn())
                  .catch(err => error('While calling siren.turnOn.', 'err:', err))
              }
            }
          ]
        }
        info('calling socketIo.connect')
        return self.socketIO.connect(options)
      })
      .then(() => diehard.listen()) // diehard uses 'this' context.  That is why we have to call it this way.
  }
}

module.exports = Client
