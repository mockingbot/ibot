const stylus = require('stylus')

module.exports = ({ config, mode }) => {
  config.module.rules.push({ // add stylus loader for component
    exclude: /\/node_modules\//,
    test: /\.styl$/,
    use: [
      'style-loader',
      'css-loader',
      { loader: 'stylus-loader', options: { define: { url: stylus.resolver() } } },
    ],
  })

  return config
}
