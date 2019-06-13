/* eslint-disable no-console */

const { resolve } = require('path')
const { mkdirSync, readdirSync, writeFileSync, statSync, copyFileSync } = require('fs')

const PATH_ROOT = resolve(__dirname, '../')
const fromRoot = (...args) => resolve(PATH_ROOT, ...args)

module.exports = {
  PATH_ROOT,
  fromRoot,

  writeFileSync,
  copyFileSync,
  mkdirP: (path) => {
    try { mkdirSync(path, { recursive: true }) } catch (error) { console.warn(error.message) }
  },
  getDirNameList: (path) => readdirSync(path)
    .filter((pathName) => statSync(resolve(path, pathName)).isDirectory()),
}
