const error = require('debug')('ha:config:error')

const fs = require('fs')
const path = require('path')

const config = {production: process.env.NODE_ENV && process.env.NODE_ENV.toUpperCase() === 'PRODUCTION'}

config.loginUrl = process.env.LOGIN_URL || (config.production ? null : 'http://localhost:3001')
if (!config.loginUrl) {
  error('Login URL could not be found in the environment variable.  Please set \'LOGIN_URL\'.')
  process.exit(1)
}

config.pins = {
  clientUp: parseInt(process.env.PINS_CLIENT_UP || -1, 10),
  connectedToServer: parseInt(process.env.PINS_CONNECTED_TO_SERVER || -1, 10),
  sirenActiveSignal: parseInt(process.env.PINS_SIREN_ACTIVE_SIGNAL || 18, 10)
}
if (config.pins.sirenActiveSignal < 0) {
  error('Required pin could not be found in the environment variable.  Please set \'PINS_SIREN_ACTIVE_SIGNAL\'.')
  process.exit(1)
}

config.privateKey = process.env.PRIVATE_KEY || (config.production ? null : fs.readFileSync(path.join(__dirname, '../test/private_key.pem')))
if (!config.privateKey) {
  error('Private key could not be found in the environment variable.  Please set \'PRIVATE_KEY\'.')
  process.exit(1)
}

config.pushUrl = process.env.PUSH_URL || (config.production ? null : 'http://localhost:3005')
if (!config.pushUrl) {
  error('Push URL could not be found in the environment variable.  Please set \'PUSH_URL\'.')
  process.exit(1)
}

module.exports = config
