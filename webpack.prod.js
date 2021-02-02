const webpack = require('webpack')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const base = require('./webpack.config.js')

module.exports = merge(base, {
  mode: 'production',
  output: {
    publicPath: '/slide/lottie-editor/'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      PROD: true
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
    ]
  },
  // optimization: {
  //   minimize: true,
  //   splitChunks: {
  //     automaticNameDelimiter: '~',
  //     chunks: 'all',
  //     minSize: 20000,
  //     minRemainingSize: 0,
  //     maxSize: 0,
  //     minChunks: 1,
  //     maxAsyncRequests: 30,
  //     maxInitialRequests: 30,
  //     name: function (module, chunks, cacheGroupKey) {
  //       const moduleFileName = module
  //         .identifier()
  //         .split('/')
  //         .reduceRight((item) => item);
  //       const allChunksNames = chunks.map((item) => item.name).join('~');
  //       return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
  //     },
  //     enforceSizeThreshold: 50000,
  //     cacheGroups: {
  //       defaultVendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         priority: -10,
  //         reuseExistingChunk: true,
  //       },
  //       default: {
  //         minChunks: 2,
  //         priority: -20,
  //         reuseExistingChunk: true,
  //       },
  //     },
  //   },
  // }
})