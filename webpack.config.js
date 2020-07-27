const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    index: './src/index.js',
    browse: './src/browse.js',
    signup: './src/signup.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  devServer: {
    contentBase: './dist',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/pages/index.html',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      filename: 'browse.html',
      template: 'src/pages/index.html',
      chunks: ['browse'],
    }),
    new HtmlWebpackPlugin({
      filename: 'signup.html',
      template: 'src/pages/index.html',
      chunks: ['signup'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  watch: true,
}
