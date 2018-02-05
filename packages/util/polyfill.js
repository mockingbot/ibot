/**
 * Element.fn.matches
 */
if (!Element.prototype.matches) {
  Element.prototype.matches = (
    Element.prototype.matchesSelector
    || Element.prototype.mozMatchesSelector
    || Element.prototype.msMatchesSelector
    || Element.prototype.oMatchesSelector
    || Element.prototype.webkitMatchesSelector
    || (
      function(selector) {
        const matches = document.querySelectorAll(selector)

        let i = matches.length
        while (--i >= 0 && matches.item(i) !== this) {}
        return i > -1
      }
    )
  )
}

/**
 * Node.fn.remove
 *
 * from:https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/remove()/remove().md
 */
void [
  Node.prototype,
  Element.prototype,
  CharacterData.prototype,
  DocumentType.prototype,
]
.forEach(item => {
  if (item.hasOwnProperty('remove')) {
    return
  }

  item.remove = function() {
    if (this.parentNode !== null) {
      this.parentNode.removeChild(this)
    }
  }
})

/**
 * Element.fn.closest
 */
if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    const matches = document.querySelectorAll(s)
    let el = this
    let i

    do {
      i = matches.length
      while (--i >= 0 && matches.item(i) !== el) {}
    } while ((i < 0) && (el = el.parentElement))
    return el
  }
}
