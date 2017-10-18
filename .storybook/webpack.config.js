const path = require('path')

module.exports = {
  module: {
    rules: [
      /* Stylus */
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: false,
            },
          },
          { loader: 'stylus-loader' },
        ],
      },

      /* Sass */
      {
        test: /\.sass$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[local]---[hash:base64:5]'
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },

      /* CSS */
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[local]---[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: `${path.resolve(__dirname, '..', '.storybook/postcss.config.js')}`
              }
            }
          }
        ]
      }
    ]
  }
}
