#!/usr/bin/env node

const argv = require('yargs').argv

const rollup = require('rollup')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const babel = require('rollup-plugin-babel')
const sass = require('node-sass')
const postcss = require('@plrthink/rollup-plugin-postcss')
const postcssModules = require('postcss-modules')
const cssvariables = require('postcss-css-variables')
const colorFunction = require('postcss-color-function')
const calc = require('postcss-calc')

const preprocessor = (_, id) => new Promise((resolve, reject) => {
  const result = sass.renderSync({ file: id })
  resolve({ code: result.css.toString() })
})

const cssExportMap = {}

// used to track the cache for subsequent bundles
let cache

rollup.rollup({
  // The bundle's starting point. This file will be
  // included, along with the minimum necessary code
  // from its dependencies
  entry: argv.entry,
  // If you have a bundle you want to re-use (e.g., when using a watcher to rebuild as files change),
  // you can tell rollup use a previous bundle as its starting point.
  // This is entirely optional!
  cache: cache,
  external: ['react'],
  plugins: [
    resolve(),
    commonjs({ sourceMap: false }),
    postcss({
      sourceMap: false,
      plugins: [
        cssvariables(),
        colorFunction(),
        calc(),
        postcssModules({
          getJSON (id, exportTokens) {
            cssExportMap[id] = exportTokens
          }
        })
      ],
      getExport (id) {
        return cssExportMap[id]
      },
      extensions: ['.css'],
      extract: true
    }),
    postcss({
      sourceMap: false,
      preprocessor,
      plugins: [
        postcssModules({
          getJSON (id, exportTokens) {
            cssExportMap[id] = exportTokens
          }
        })
      ],
      getExport (id) {
        return cssExportMap[id]
      },
      extensions: ['.sass'],
      extract: true
    }),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}).then(function (bundle) {
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
