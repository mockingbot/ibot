const path = require('path')
const rollupOptions = require('../build/rollup_options')
const minimatch = require("minimatch")

module.exports = {
  resolve: {
    alias: {
      '@mockingbot': path.resolve(__dirname, '../packages'),
    },
  },

  module: {
    rules: [
      {
        test: /\.(js|sass|styl|css)$/,
        include: path.resolve(__dirname, '../packages'),
        // exclude asset in dest folder
        exclude: asset => asset.split('/').includes('dest'),
        loader: 'rollup-loader',
        options: rollupOptions()
      },
    ]
  }
}
