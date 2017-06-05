#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const junk = require('junk')
const rimraf = require('rimraf')
const ncp = require('ncp')
const render = require('json-templater/string')
const camelCase = require('lodash/camelCase')
const endOfLine = require('os').EOL
const { exec } = require('./utils')
const libDir = path.resolve(__dirname, '..', 'lib')
const pkgsDir = path.resolve(__dirname, '..', 'packages')

rimraf.sync(libDir)
fs.mkdirSync(libDir)

const pkgs = fs.readdirSync(pkgsDir).filter(junk.not)

const copyPkgQueue = []

for (let i = 0; i < pkgs.length; i++) {
  const pkg = pkgs[i]
  copyPkgQueue.push(copyPkg(pkg))
}

Promise.all(copyPkgQueue).then(function (pkgs) {
  renderIndexFile(pkgs)
})

function copyPkg (pkg) {
  const pkgSrcDir = `${pkgsDir}/${pkg}/dest/`
  const pkgDestDir = `${libDir}/${pkg}`
  fs.mkdirSync(pkgDestDir)
  return new Promise(function (resolve, reject) {
    ncp(pkgSrcDir, pkgDestDir, function (err) {
      if (err) {
        reject(err)
      }

      resolve(pkg)
    })
  })
}

const tmpl = 'export {{name}} from \'./{{package}}/index.js\''

function renderIndexFile (pkgs) {
  const importStatmentsArray = []
  for (let i = 0; i < pkgs.length; i++) {
    const pkg = pkgs[i]
    importStatmentsArray.push(
      render(tmpl, {
        name: capitalize(camelCase(pkg)),
        package: pkg
      })
    )
  }

  const importStatments = importStatmentsArray.splice(',').join(endOfLine)

  fs.writeFileSync(`${libDir}/index.js`, importStatments)

  exec(`${path.resolve(__dirname, '..', 'node_modules/.bin/babel')} '${libDir}/index.js' -o '${libDir}/index.js'`)
}

function capitalize (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
