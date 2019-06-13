const { rollup } = require('rollup')
const { fromRoot, writeFileSync, mkdirP } = require('./function')

const commonjs = require('rollup-plugin-commonjs')
const nodeResolvePlugin = require('rollup-plugin-node-resolve')
const babel = require('rollup-plugin-babel')
const json = require('rollup-plugin-json')

// https://rollupjs.org/guide/en#cache
let rollUpCache // The cache property of a previous bundle. Use it to speed up subsequent builds in watch mode

const buildWithRollup = async ({
  componentName,
  componentNameList = [],
}) => {
  const inputFile = fromRoot('components/', componentName, 'index.js')
  const outputFileJS = fromRoot('lib/', componentName, 'index.js')
  const outputFileCSS = fromRoot('lib/', componentName, 'style/index.css')
  const outputPathPostcssAsset = fromRoot('lib/', componentName, 'assets/')

  const externalPackageList = [
    'react', 'react-dom', 'prop-types',
    'react-router', 'react-router-dom',
    'lodash',
  ]
  const externalComponentPrefixList = componentNameList // mark cross component import as external
    .filter((name) => name !== componentName)
    .map((name) => fromRoot(`components/${name}`))

  const bundle = await rollup({
    input: inputFile,
    external: (id, parent, isResolved) => {
      const isExternal = (id[ 0 ] !== '.')
        ? externalPackageList.includes(id) // from another package (`import ... from 'react'`)
        : externalComponentPrefixList.some((prefix) => fromRoot(parent, '../', id).startsWith(prefix)) // from relative file (`import ... from './script.js'`)
      // console.log(JSON.stringify({ isExternal, id, parent, isResolved })) // debug id filter
      return isExternal
    },
    plugins: [
      // the order is fucking important
      nodeResolvePlugin(),
      require('rollup-plugin-postcss')({
        plugins: [ require('postcss-url')({ url: 'copy', assetsPath: outputPathPostcssAsset }) ],
        use: [ 'stylus' ],
        loaders: [ require('./stylus-loader') ],
        modules: false,
        extract: outputFileCSS,
      }),
      json(),
      babel({ exclude: 'node_modules/**' }),
      commonjs({
        namedExports: {
          'node_modules/react/index.js': [ 'Component', 'PureComponent', 'Children', 'createElement' ],
        },
      }),
    ],
    cache: rollUpCache,
  })
  rollUpCache = bundle.cache // store the cache object of the previous build

  await bundle.write({ format: 'es', file: outputFileJS })

  mkdirP(fromRoot('lib/', componentName, 'style/'))
  writeFileSync(fromRoot('lib/', componentName, 'style/index.js'), 'import "./index.css"')
  writeFileSync(fromRoot('lib/', componentName, 'style/css.js'), 'import "./index.css"')
}

module.exports = { buildWithRollup }
