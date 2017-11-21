const { name } = require('../package.json')
const scopeName = new RegExp(`^${name.split('/')[0]}`)

function resolver (
  { node: { source } },
  {
    file: { opts: { filename } },
    opts: { parse }
  }
) {
  if (source !== null && scopeName.test(source.value)) {
    source.value = `..${source.value.replace(scopeName, '')}`
  }
}

function transformImportResolve () {
  return {
    visitor: {
      ImportDeclaration: resolver
    }
  }
}

module.exports = transformImportResolve
