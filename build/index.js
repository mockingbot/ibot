#!/usr/bin/env node

const argv = require('yargs').argv
const fs = require('fs')
const path = require('path')
const rollup = require('rollup')
const getOptions = require('./rollup-options')

getOptions(argv.entry, argv.dest, argv['use-modules'])
  .then(options => rollup.rollup(options))
  .then(function (bundle) {
    return bundle.write({
      format: 'es',
      dest: argv.dest,
      sourceMap: false
    })
  })
  .then(function () {
    fs.writeFileSync(`${path.dirname(argv.dest)}/style/css.js`, 'import "./index.css"', 'utf8')
    fs.writeFileSync(`${path.dirname(argv.dest)}/style/index.js`, 'import "./index.css"', 'utf8')
    return
  })
  .catch(function (e) {
    console.log(e.message)
    console.log(e.stack)
  })
