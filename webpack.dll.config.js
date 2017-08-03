const path = require('path')
const webpack = require('webpack')

const pkg = require('./package.json')
const vendor = Object.keys(pkg.dependencies)

/* eslint-disable max-len */
module.exports = {
  entry: {
    vendor,
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'static/[name]_[chunkhash].js',
    publicPath: '.',
    library: '[name]_[chunkhash]',
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dist/[name]-manifest.json'),
      name: '[name]_[chunkhash]',
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
}
