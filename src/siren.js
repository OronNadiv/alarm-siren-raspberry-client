const info = require('debug')('ha:siren:info')

const config = require('./config')
const diehard = require('diehard')
const Promise = require('bluebird')
const gpio = require('rpi-gpio')
const gpiop = gpio.promise

class Siren {
  turnOff () {
    const self = this

    if (!self.isSirenActive) {
      return Promise.resolve()
    }

    info('Turning siren off.')
    return gpiop.write(config.pins.sirenActiveSignal, 1)
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
          return gpiop
            .setup(config.pins.sirenActiveSignal, gpio.DIR_OUT)
            .then(() => {
              info('Opened output pin.')
              diehard.register(done => {
                info('closing PIN_SIREN_ACTIVE_SIGNAL')
                gpiop
                  .destroy(config.pins.sirenActiveSignal)
                  .then(done)
              })
            })
        } else {
          info('Pin is already open.  Setting to low (active).')
          return gpiop.write(config.pins.sirenActiveSignal, 0)
        }
      })
      .delay(5 * 60 * 1000) // five minutes
      .then(() => {
        self.isSirenActive = false
        info('Turning siren off.')
        info('Setting pin to high (inactive).')
        return gpiop.write(config.pins.sirenActiveSignal, 1)
      })
  }
}

module.exports = Siren
