#!/usr/bin/env node

const path = require('path')
const exec = require('../../build/utils').exec

exec(`../../build/index.js --entry ${path.resolve('./src/index.js')} --dest ${path.resolve('./dest/index.js')}`)
