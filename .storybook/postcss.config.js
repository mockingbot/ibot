var cssvariables = require('postcss-css-variables')
var calc = require('postcss-calc')
var colorFunction = require('postcss-color-function')

module.exports = function (ctx) {
  return {
    plugins: [
      cssvariables(),
      colorFunction(),
      calc()
    ]
  }
}
