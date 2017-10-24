const path = require('path')
const rollupOptions = require('../build/rollup_options')
const minimatch = require("minimatch")

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(js|sass|styl|css)$/,
        include: path.resolve(__dirname, '../packages'),
        // exclude asset in dest folder
        exclude: (asset) => {
          return asset.split('/').includes('dest')
        },
        loader: 'rollup-loader',
        options: rollupOptions()
      }
    ]
  }
}
