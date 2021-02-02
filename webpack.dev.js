const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const base = require('./webpack.config.js')

module.exports = merge(base, {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshPlugin()
  ],
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [require.resolve('react-refresh/babel')]
          }
        }
      },
      {
        test: /.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
    ]
  },
  devServer: {
    // 可以通过ip地址访问
    // 其他电脑可以通过配置host访问
    host: '0.0.0.0',
    port: 8000,
    disableHostCheck: true,
    hot: true,
    contentBase: path.resolve(__dirname, 'public'),
    publicPath: '/'
  },
  optimization: {
    minimize: true
  }
})