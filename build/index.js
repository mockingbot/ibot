#!/usr/bin/env node

const argv = require('yargs').argv
const rollup = require('rollup')
const options = require('./rollup_options')

rollup.rollup(options(argv.entry)).then(function (bundle) {
  // Alternatively, let Rollup do it for you
  // (this returns a promise). This is much
  // easier if you're generating a sourcemap

  bundle.write({
    format: 'es',
    dest: argv.dest,
    sourceMap: false,
    globals: {
      react: 'React'
    }
  })
}).catch(function (e) {
  console.log(e.message)
  console.log(e.stack)
})
