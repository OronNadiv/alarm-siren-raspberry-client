# Home Automation - Alarm Siren Raspberry Pi Client
This repository contains the raspberry-pi client for the alarm's siren.

[![JavaScript Style Guide][standard-image]][standard-url]
[![Dependencies][dependencies-image]][dependencies-url]
[![DevDependencies][dependencies-dev-image]][dependencies-dev-url]

I suggest you first [read][overview-url] about the different components of the home automation application.
This will help you understand better the general architecture and different functions of the system.

## Hardware
\<TODO\>

## Installation instructions
Click [here][client-installation-instruction-url] and follow the installation instructions for the raspberry-pi clients.

## Environment variables (configuration)
__LOGIN\_URL__ (required): url to the [authentication][auth-url] server. Example: `login.herokuapp.com`  
__PINS\_CLIENT\_UP__ (optional): GPIO pin (output) that sets to high when client process is running. Default: `none`  
__PINS\_CONNECTED\_TO\_SERVER__ (optional): GPIO pin (output) that sets to high when client is connected to server. Default: `none`  
__PINS\_SIREN\_ACTIVE\_SIGNAL__ (required): GPIO pin (output) that turns on the relay that connected to the siren.  
__PRIVATE\_KEY__ (required): generated private key.  Public key should be shared with the [authentication][auth-url] server. See [here][private-public-keys-url].  
__PUBNUB\_PUBLISH\_KEY__ (required): PubNub's publisher key.  
__PUBNUB\_SUBSCRIBE\_KEY__ (requireD): = PubNub's subscriber key.  

\<TODO\> Circuit Diagram

### License
[AGPL-3.0](https://spdx.org/licenses/AGPL-3.0.html)

### Author
[Oron Nadiv](https://github.com/OronNadiv) ([oron@nadiv.us](mailto:oron@nadiv.us))

[dependencies-image]: https://david-dm.org/OronNadiv/alarm-siren-raspberry-client/status.svg
[dependencies-url]: https://david-dm.org/OronNadiv/alarm-siren-raspberry-client
[dependencies-dev-image]: https://david-dm.org/OronNadiv/alarm-siren-raspberry-client/dev-status.svg
[dependencies-dev-url]: https://david-dm.org/OronNadiv/alarm-siren-raspberry-client?type=dev
[travis-image]: http://img.shields.io/travis/OronNadiv/alarm-siren-raspberry-client.svg?style=flat-square
[travis-url]: https://travis-ci.org/OronNadiv/alarm-siren-raspberry-client
[coveralls-image]: http://img.shields.io/coveralls/OronNadiv/alarm-siren-raspberry-client.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/OronNadiv/alarm-siren-raspberry-client
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com

[overview-url]: https://oronnadiv.github.io/home-automation
[client-installation-instruction-url]: https://oronnadiv.github.io/home-automation/#installation-instructions-for-the-raspberry-pi-clients
[server-installation-instruction-url]: https://oronnadiv.github.io/home-automation/#installation-instructions-for-the-server-micro-services
[private-public-keys-url]: https://oronnadiv.github.io/home-automation/#generating-private-and-public-keys

[alarm-url]: https://github.com/OronNadiv/alarm-system-api
[auth-url]: https://github.com/OronNadiv/authentication-api
[camera-url]: https://github.com/OronNadiv/camera-api
[garage-url]: https://github.com/OronNadiv/garage-door-api
[notifications-url]: https://github.com/OronNadiv/notifications-api
[ui-url]: https://github.com/OronNadiv/home-automation-ui
