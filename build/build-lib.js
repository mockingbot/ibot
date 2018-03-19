#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const junk = require('junk')
const rimraf = require('rimraf')
const ncp = require('ncp')
const render = require('json-templater/string')
const camelCase = require('lodash/camelCase')
const endOfLine = require('os').EOL
const argv = require('yargs').argv
const babel = require('babel-core')
const libDir = path.resolve(__dirname, '..', 'lib')
const pkgsDir = path.resolve(__dirname, '..', 'packages')
const customPlugin = path.resolve(`${__dirname}/babel-plugin-transform-import-resolve-relative.js`)

rimraf.sync(libDir)
fs.mkdirSync(libDir)

const pkgs = fs.readdirSync(pkgsDir).filter(junk.not)

const copyPkgQueue = []

for (let i = 0; i < pkgs.length; i++) {
  const pkg = pkgs[i]
  copyPkgQueue.push(
    copyPkg(pkg).then(transformImport)
  )
}

Promise.all(copyPkgQueue)
  .then(function (pkgs) {
    renderIndexFile(pkgs)
  })

function transformImport (pkg) {
  const compiledPkg =  `${libDir}/${pkg}/index.js`
  const transformedContent = babel.transformFileSync(compiledPkg, {
      plugins: [customPlugin]
    }).code
  fs.writeFileSync(compiledPkg, transformedContent, 'utf8')
  return pkg
}

function copyPkg (pkg) {
  const pkgSrcDir = `${pkgsDir}/${pkg}/${argv.dest}/`
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
    const camelCasedPkg = camelCase(pkg)
    importStatmentsArray.push(
      render(tmpl, {
        name: ['util', 'form', 'text'].includes(pkg) ? camelCasedPkg : capitalize(camelCasedPkg),
        package: pkg
      })
    )
  }

  const importStatments = importStatmentsArray.splice(',').join(endOfLine)

  fs.writeFileSync(`${libDir}/index.js`, importStatments)

  fs.writeFileSync(`${libDir}/index.js`, babel.transformFileSync(`${libDir}/index.js`).code, 'utf8')
}

function capitalize (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
