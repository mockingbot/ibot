const pify = require('pify')

module.exports = {
  name: 'sass',
  test: /\.s[ac]ss$/,
  async process({ code }) {
    const sass = require('node-sass')
    const res = await pify(sass.render.bind(sass))({
      ...this.options,
      file: this.id,
      data: code,
      indentedSyntax: /\.sass$/.test(this.id),
    })

    return {
      code: res.css.toString(),
      map: res.map && res.map.toString(),
    }
  },
}
