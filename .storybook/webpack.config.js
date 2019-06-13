// const path = require('path')
const stylus = require('stylus')

module.exports = ({ config, mode }) => {
  config.module.rules.push(
    /* Asset */
    {
      exclude: /\/node_modules\//,
      test: /\.(png|jpg|gif)$/,
      use: [
        { loader: 'file-loader', options: { name: '[name].[hash].[ext]' } },
      ],
    },

    /* Stylus */
    {
      exclude: /\/node_modules\//,
      test: /\.styl$/,
      use: [
        'style-loader',
        'css-loader',
        { loader: 'stylus-loader', options: { define: { url: stylus.resolver() } } },
      ],
    }

    // /* Sass */
    // {
    //   exclude: /\/node_modules\//,
    //   test: /\.sass$/,
    //   use: [
    //     // 'style-loader',
    //     { loader: 'css-loader', options: { importLoaders: 1, modules: true, localIdentName: '[local]---[hash:base64:5]' } },
    //     { loader: 'sass-loader' }
    //   ]
    // },

    // /* CSS */
    // {
    //   exclude: /\/node_modules\//,
    //   test: /\.css$/,
    //   use: [
    //     // 'style-loader',
    //     { loader: 'css-loader', options: { importLoaders: 1, modules: true, localIdentName: '[local]---[hash:base64:5]' } },
    //     { loader: 'postcss-loader'
    //       // , options: { config: { path: `${path.resolve(__dirname, '..', '.storybook/postcss.config.js')}` } }
    //     }
    //   ]
    // }
  )

  return config
}
