const path = require('path')
const { exec } = require('child_process')

const commonjs = require('rollup-plugin-commonjs')
const nodeResolvePlugin = require('rollup-plugin-node-resolve')
const babel = require('rollup-plugin-babel')
const json = require('rollup-plugin-json')

const postcss = require('rollup-plugin-postcss')

const url = require('postcss-url')

const sassLoader = require('./sass-loader')
const stylusLoader = require('./stylus-loader')

// used to track the cache for subsequent bundles
let cache

const getPkgs = () => new Promise((resolve, reject) => {
  exec(
    `${path.resolve(__dirname, '../node_modules/.bin/lerna')} ls --json`,
    (error, stdout, stderr) => {
      if (error) {
        return reject(error)
      }
      return resolve(stdout)
    })
})

async function getOptions (entry, dest = '', useModules = false) {
  const styleOutputPath = path.join(path.dirname(entry), path.dirname(dest).split(path.sep).pop(), 'style/index.css')
  const assetsOutputPath = path.join(path.dirname(entry), path.dirname(dest).split(path.sep).pop(), 'assets/')
  // TODO: should catch this result
  const pkgs = JSON.parse(await getPkgs())
  // TODO: no entry means running rollup for production build, need a better name
  const base = {
  // The bundle's starting point. This file will be
    // included, along with the minimum necessary code
    // from its dependencies
    // If you have a bundle you want to re-use (e.g., when using a watcher to rebuild as files change),
    // you can tell rollup use a previous bundle as its starting point.
    // This is entirely optional!
    cache,
    external: ['react', 'react-dom', 'prop-types'].concat(pkgs.map(pkg => pkg.name)),
    plugins: [
      // the order is fucking important
      nodeResolvePlugin(),
      postcss({
        sourceMap: !entry,
        plugins: [
          url(!entry ? { url: 'inline' }: { url: 'copy', assetsPath: assetsOutputPath })
        ],
        use: ['sass', 'stylus'],
        loaders: [sassLoader, stylusLoader],
        modules: useModules,
        extract: !!entry && styleOutputPath
      }),
      json(),
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

module.exports = getOptions
