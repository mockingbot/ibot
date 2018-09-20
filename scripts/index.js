#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require('fs')
const path = require('path')
const rollup = require('rollup')
const getOptions = require('./rollup-options')

const builds = fs.readdirSync('./components').filter((fileOrFolder) => {
  return fs.lstatSync(path.join('./components', fileOrFolder)).isDirectory()
}).map((component) => {
  const componentSrcDir = path.resolve(__dirname, `../components/${component}`)
  const componentDestDir = path.resolve(__dirname, `../lib/${component}`)
  return getOptions(path.join(componentSrcDir, 'index.js'), componentDestDir)
    .then(options => rollup.rollup(options))
    .then(function (bundle) {
      return bundle.write({
        format: 'es',
        file: path.join(componentDestDir, 'index.js'),
      })
    })
    .then(function () {
      fs.writeFileSync(path.join(componentDestDir, 'style/index.js'), 'import "./index.css"', 'utf8')
      fs.writeFileSync(path.join(componentDestDir, 'style/css.js'), 'import "./index.css"', 'utf8')
    })
    .then(() => {
      console.log(`built component ${component}`)
    })
    .catch(function (e) {
      console.log(e.message)
      console.log(e.stack)
    })
})

Promise.all(builds).then(() => {
  fs.writeFileSync(path.resolve(__dirname, '../lib/index.js'), fs.readFileSync('./components/index.js', 'utf-8'))
  console.log('built index file')
})
