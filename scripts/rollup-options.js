const { rollup } = require('rollup')
const { fromRoot } = require('./function')

const commonjs = require('rollup-plugin-commonjs')
const nodeResolvePlugin = require('rollup-plugin-node-resolve')
const babel = require('rollup-plugin-babel')
const json = require('rollup-plugin-json')

// https://rollupjs.org/guide/en#cache
let rollUpCache // The cache property of a previous bundle. Use it to speed up subsequent builds in watch mode

const buildWithRollup = async ({ componentName, componentNameList = [] }) => {
  const sourceRoot = fromRoot('components/', componentName)
  const outputRoot = fromRoot('lib/', componentName)

  const inputFile = fromRoot(sourceRoot, 'index.js')
  const outputFileJS = fromRoot(outputRoot, 'index.js')

  const externalPackageList = [
    'react', 'react-dom', 'prop-types',
    'react-router', 'react-router-dom',
    'lodash', 'styled-components'
  ]
  const externalComponentPrefixList = componentNameList // mark cross component import as external
    .filter((name) => name !== componentName)
    .map((name) => fromRoot(`components/${name}`))

  const bundle = await rollup({
    input: inputFile,
    external: (id, parent, isResolved) => {
      const isExternal = (id[0] !== '.')
        ? externalPackageList.includes(id) // from another package (`import ... from 'react'`)
        : externalComponentPrefixList.some((prefix) => fromRoot(parent, '../', id).startsWith(prefix)) // from relative file (`import ... from './script.js'`)
      // console.log(JSON.stringify({ isExternal, id, parent, isResolved })) // debug id filter
      return isExternal
    },
    plugins: [
      // the order is fucking important
      nodeResolvePlugin(),
      require('rollup-plugin-postcss')({ // default support Stylus // https://github.com/egoist/rollup-plugin-postcss#with-sassstylusless
        extract: true,
        plugins: [
          (() => {
            const { relative } = require('path')
            const { normalize } = require('postcss-url/src/lib/paths')
            const postcssUrlCopy = require('postcss-url/src/type/copy')
            return require('postcss-url')({
              assetsPath: outputRoot,
              url: (...args) => { // TODO: HACK: postcss-url will return asset-url relative to process.cwd(), so calc the relative asset-url again
                // console.log('HACK:', args)
                const remappedUrl = postcssUrlCopy(...args)
                // console.log('HACK:', { remappedUrl, hackedUrl: remappedUrl && normalize(relative(outputRoot, remappedUrl)) })
                return remappedUrl && normalize(relative(outputRoot, remappedUrl))
              },
            })
          })(),
        ],
      }),

      json(),
      babel({ exclude: 'node_modules/**', plugins: ['babel-plugin-styled-components'] }),
      commonjs({
        namedExports: {
          'node_modules/react/index.js': ['Component', 'PureComponent', 'Children', 'createElement'],
        },
      }),
    ],
    cache: rollUpCache,
  })
  rollUpCache = bundle.cache // store the cache object of the previous build

  await bundle.write({ format: 'es', file: outputFileJS })
}

module.exports = { buildWithRollup }
