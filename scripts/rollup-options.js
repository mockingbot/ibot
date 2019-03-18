const path = require('path')
const minimatch = require('minimatch')

const commonjs = require('rollup-plugin-commonjs')
const nodeResolvePlugin = require('rollup-plugin-node-resolve')
const babel = require('rollup-plugin-babel')
const json = require('rollup-plugin-json')

const postcss = require('@plrthink/rollup-plugin-postcss')

const url = require('postcss-url')

const stylusLoader = require('./stylus-loader')

// used to track the cache for subsequent bundles
let cache

async function getOptions (input, dest, useModules = false) {
  const styleOutputPath = path.join(dest, 'style/index.css')
  const assetsOutputPath = path.join(dest, 'assets/')
  const base = {
    cache,
    external: (id) => {
      return (id !== input && minimatch(id, '**/ibot/components/*/index.js')) || ['react', 'react-dom', 'prop-types', 'lodash', 'react-router', 'react-router-dom'].includes(id)
    },
    plugins: [
      // the order is fucking important
      nodeResolvePlugin(),
      postcss({
        plugins: [
          url({ url: 'copy', assetsPath: assetsOutputPath }),
        ],
        use: ['stylus'],
        loaders: [stylusLoader],
        modules: useModules,
        extract: styleOutputPath,
      }),
      json(),
      babel({
        exclude: 'node_modules/**',
        plugins: ['external-helpers'],
      }),
      commonjs({
        namedExports: {
          'node_modules/react/index.js': ['Component', 'PureComponent', 'Children', 'createElement'],
        },
    }),
    ],
  }

  return { ...base, input }
}

module.exports = getOptions
