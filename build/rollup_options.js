const path = require('path')

const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const babel = require('rollup-plugin-babel')

const sass = require('node-sass')
const stylus = require('stylus')
const postcss = require('rollup-plugin-postcss')

const postcssModules = require('postcss-modules')
const cssvariables = require('postcss-css-variables')
const colorFunction = require('postcss-color-function')
const calc = require('postcss-calc')

const sassPreprocessor = (_, id) => new Promise((resolve, reject) => {
  const result = sass.renderSync({ file: id })
  resolve({ code: result.css.toString() })
})

const stylusPreprocessor = (content, filename) => new Promise((resolve, reject) => (
  stylus(content)
  .set('filename', filename)
  .render((err, code) => err ? reject(err) : resolve({ code }))
))

const cssExportMap = {}

// used to track the cache for subsequent bundles
let cache

const options = (entry) => {
  const base = {
  // The bundle's starting point. This file will be
    // included, along with the minimum necessary code
    // from its dependencies
    // If you have a bundle you want to re-use (e.g., when using a watcher to rebuild as files change),
    // you can tell rollup use a previous bundle as its starting point.
    // This is entirely optional!
    cache,
    external: ['react', 'react-dom', 'prop-types'],
    plugins: [
      // the order is fucking important
      resolve(),
      /* PostCSS */
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
        // used for css-modules
        getExport (id) {
          return cssExportMap[id]
        },
        extensions: ['.css'],
        extract: !!entry
      }),
      /* Sass */
      postcss({
        sourceMap: !entry,
        preprocessor: sassPreprocessor,
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
        extract: !!entry
      }),
      /* Stylus */
      postcss({
        sourceMap: !entry,
        preprocessor: stylusPreprocessor,
        extensions: ['.styl', '.stylus'],
        extract: !!entry
      }),
      babel({
        exclude: 'node_modules/**',
        include: path.resolve(__dirname, '../packages/**'),
        plugins: ['external-helpers']
      }),
      commonjs({ sourceMap: !entry }),
    ]
  }

  return entry ? { ...base, entry } : base
}

module.exports = options
