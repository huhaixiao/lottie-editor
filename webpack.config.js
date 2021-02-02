const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/index.js'),
    about: path.resolve(__dirname, 'src/about.js')
  },
  output: {
    filename: '[name].[fullhash:8].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './template/index.html'),
      filename: 'index.html',
      chunks: ['main']
    }),
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, './template/index.html'),
    //   filename: 'about.html',
    //   chunks: ['about']
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      }
    ]
  },
  resolve: {
    alias: {
      core: path.resolve(__dirname, 'src/core/')
    },
    extensions: ['.css', '.scss', '.jsx', '.js', '.json']
  }
}