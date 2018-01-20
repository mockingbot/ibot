const pify = require('pify')
const EnhancedEvaluator = require('./stylus-enhanced-evaluator')

module.exports = {
  name: 'stylus',
  test: /\.(styl|stylus)$/,
  async process({ code }) {
    const stylus = require('stylus')

    const style = stylus(code, { Evaluator: EnhancedEvaluator })
      .set('filename', this.id)
      .set('sourcemap', this.sourceMap && {})

    const css = await pify(style.render.bind(style))()
    return {
      code: css,
      map: style.sourcemap
    }
  }
}
