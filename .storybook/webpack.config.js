const path = require('path')

module.exports = {
  module: {
    rules: [
      /* Asset */
      {
        test: /\.(png|jpg|gif|svg|ttf|woff2?|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
          },
        },
      },

      /* Stylus */
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader',
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
