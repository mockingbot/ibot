#!/usr/bin/env node

const argv = require('yargs').argv
const rollup = require('rollup')
const getOptions = require('./rollup-options')

getOptions(argv.entry, argv.dest, argv['use-modules'])
  .then(options => rollup.rollup(options))
  .then(function (bundle) {
    bundle.write({
      format: 'es',
      dest: argv.dest,
      sourceMap: false
    })
  })
  .catch(function (e) {
    console.log(e.message)
    console.log(e.stack)
  })
