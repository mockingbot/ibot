const path = require('path')
const stylus = require('stylus')
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js')

module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env)

  config.module.rules.push(
    /* Asset */
    {
      test: /\.(png|jpg|gif)$/,
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
        {
          loader: 'stylus-loader',
          options: {
            define: {
              url: stylus.resolver(),
            },
          },
        },
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
            localIdentName: '[local]---[hash:base64:5]',
          },
        },
        {
          loader: 'sass-loader',
        },
      ],
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
            localIdentName: '[local]---[hash:base64:5]',
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: `${path.resolve(__dirname, '..', '.storybook/postcss.config.js')}`,
            },
          },
        },
      ],
    },
  )

  return config
}
