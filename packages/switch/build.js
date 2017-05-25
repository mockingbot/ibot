#!/usr/bin/env node

const path = require('path')
const execSync = require('child_process').execSync

const exec = (command, extraEnv) => {
  execSync(command, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv)
  })
}

exec(`../../build/index.js --entry ${path.resolve('./index.js')} --dest ${path.resolve('./dest/main.es.js')}`)
