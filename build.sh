#!/usr/bin/env bash
set -e

clean_all() {
  echo "cleaning all..."
  rm -rf ./node_modules
  rm -rf ./platforms
  rm -rf ./plugins
  rm -f ./package-lock.json
}

build() {
  echo "building..."
  if [ ! -d "./node_modules" ]; then
    npm install
  fi
  if [ ! -d "./platforms" ]; then
    cordova platform add ios # this will automatically add the plugins referenced in package.json
  fi
  cordova build
}

$1 # the function to invoke just needs to be provided as the first bash script parameter
