#!/usr/bin/env bash

# This file starts the raspberry pi client.
# Follow installation instructions in the README.md file.
# Then place this file in the user's root directory.

cd ~/alarm-siren-raspberry-client
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
nvm use
export PRIVATE_KEY= # PASTE GENERATED PRIVATE KEY
export NODE_ENV=production
export LOGIN_URL= # https://<LOGIN_SERVER_URL>
export PINS_SIREN_ACTIVE_SIGNAL= # <GPIO PIN FOR MOTION SENSOR>
export PUBNUB_PUBLISH_KEY= # pubnub publish key
export PUBNUB_SUBSCRIBE_KEY= # pubnub subscribe key
npm start
