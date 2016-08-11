const info = require('debug')('ha:siren:info')

const config = require('./config')
const diehard = require('diehard')
const Promise = require('bluebird')
const gpio = Promise.promisifyAll(require('pi-gpio'))

class Siren {
  turnOff () {
    const self = this

    if (!self.isSirenActive) {
      return Promise.resolve()
    }

    info('Turning siren off.')
    return gpio.writeAsync(config.pins.sirenActiveSignal, 1)
  }

  turnOn () {
    const self = this

    if (self.isSirenActive) {
      info('Siren is active.  ignoring request.')
      return Promise.resolve()
    }

    return Promise
      .try(() => {
        info('Turning siren on.')
        self.isSirenActive = true

        if (!self.isSirenSignalGPIOSetOutput) {
          info('Opening output pin.')
          self.isSirenSignalGPIOSetOutput = true
          return gpio.openAsync(config.pins.sirenActiveSignal, 'output')
            .then(() => {
              info('Opened output pin.')
              diehard.register(done => {
                info('closing PIN_SIREN_ACTIVE_SIGNAL')
                gpio.close(config.pins.sirenActiveSignal, done)
              })
            })
        } else {
          info('Pin is already open.  Setting to low (active).')
          return gpio.writeAsync(config.pins.sirenActiveSignal, 0)
        }
      })
      .delay(5 * 60 * 1000) // five minutes
      .then(() => {
        self.isSirenActive = false
        info('Turning siren off.')
        info('Setting pin to high (inactive).')
        return gpio.writeAsync(config.pins.sirenActiveSignal, 1)
      })
  }
}

module.exports = Siren
