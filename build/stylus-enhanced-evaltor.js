const path = require("path")
const sep = path.sep

const resolve = require("resolve")
const { urlToRequest } = require("loader-utils")
const fs = require("fs")
const utils = require("stylus/lib/utils")
const nodes = require("stylus/lib/nodes")
const Evaluator = require("stylus/lib/visitor/evaluator")

function importFile(node, file, literal, index) {
  var importStack = this.importStack,
    Parser = require("stylus/lib/parser"),
    stat

  // Handling the `require`
  if (node.once) {
    if (this.requireHistory[file]) return nodes.null
    this.requireHistory[file] = true

    if (literal && !this.includeCSS) {
      return node
    }
  }

  // Expose imports
  node.path = file
  node.dirname = path.dirname(file)
  // Store the modified time
  stat = fs.statSync(file)
  node.mtime = stat.mtime
  this.paths.push(node.dirname)

  // Avoid overflows from importing the same file over again
  if (file === importStack[importStack.length - 1]) return nodes.null

  if (this.options._imports) this.options._imports.push(node.clone())

  // Parse the file
  importStack.push(file)
  nodes.filename = file

  var str = fs.readFileSync(file, "utf8")

  if (literal && !this.resolveURL)
    return new nodes.Literal(str.replace(/\r\n?/g, "\n"))

  // parse
  var block = new nodes.Block(),
    parser = new Parser(str, utils.merge({ root: block }, this.options))

  try {
    block = parser.parse()
  } catch (err) {
    err.filename = file
    err.lineno = parser.lexer.lineno
    err.input = str
    throw err
  }

  // Evaluate imported "root"
  block.parent = this.root
  block.scope = false
  var ret = this.visit(block)
  importStack.pop()
  if (importStack.length || index) this.paths.pop()

  return ret
}
function EnhancedEvaluator(root, optios) {
  Evaluator.apply(this, arguments)
}
EnhancedEvaluator.prototype = Object.create(Evaluator.prototype)
EnhancedEvaluator.prototype.constructor = EnhancedEvaluator
EnhancedEvaluator.prototype.visitImport = function(imported) {
  this.return++

  var path = this.visit(imported.path).first,
    nodeName = imported.once ? "require" : "import",
    found,
    literal,
    index

  this.return--

  // url() passed
  if ("url" == path.name) {
    if (imported.once) throw new Error("You cannot @require a url")

    return imported
  }

  // Ensure string
  if (!path.string) throw new Error("@" + nodeName + " string expected")

  var name = (path = path.string)

  // Absolute URL
  if (/url\s*\(\s*['"]?(?:https?:)?\/\//i.test(path)) {
    if (imported.once) throw new Error("You cannot @require a url")
    return imported
  }

  // Literal
  if (/\.css(?:"|$)/.test(path)) {
    literal = true
    if (!imported.once && !this.includeCSS) {
      return imported
    }
  }

  // support optional .styl
  if (!literal && !/\.styl$/i.test(path)) path += ".styl"

  // Lookup
  found = utils.find(path, this.paths, this.filename)
  if (!found) {
    found = utils.lookupIndex(name, this.paths, this.filename)
  }
  /*****************************************************************************
   * THIS IS THE ONLY BLOCK THAT DIFFERS FROM THE ACTUAL STYLUS IMPLEMENTATION. *
   *****************************************************************************/
  // if still not found, so maybe it ref to a module file in node_modules
  if (!found) {
    path = urlToRequest(path)
    let pathComponents = this.filename.split(sep)
    if (pathComponents.indexOf("packages") > -1) {
      const pkgDir = pathComponents
        .slice(0, pathComponents.indexOf("packages") + 2)
        .join(sep)
      found = [resolve.sync(path, { extensions: [".styl"], basedir: pkgDir })]
    }
  }
  // Throw if import failed
  if (!found) throw new Error("failed to locate @" + nodeName + " file " + path)

  var block = new nodes.Block()

  for (var i = 0, len = found.length; i < len; ++i) {
    block.push(importFile.call(this, imported, found[i], literal, index))
  }

  return block
}

module.exports = EnhancedEvaluator
