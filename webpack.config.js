const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const manifest = require(path.join(__dirname, 'dist/vendor-manifest.json'))

const ENV = process.env.NODE_ENV

/* eslint-disable max-len */
const common = {
  entry: {
    app: [
      './app/index',
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'static/[name].[hash].js',
    publicPath: '/',
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin({
      filename: 'static/style.[hash].css',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      template: './app/index.html',
      inject: false,
      chunks: ['app'],
      jsassets: [`/static/${manifest.name}.js`],
    }),
    new webpack.DllReferencePlugin({
      context: '.',
      manifest,
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
        include: __dirname,
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'static/img/[name].[ext]',
          },
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'static/fonts/[name].[ext]',
          },
        },
      },
    ],
  },
  watch: true,
}

if (ENV === 'development') {
  module.exports = merge.smart({
    devtool: 'cheap-module-eval-source-map',
    entry: {
      app: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
      ],
    },
    module: {
      rules: [
        {
          test: /\.scss/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
            {
              loader: 'postcss-loader',
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"development"',
      }),
    ],
  }, common)
} else {
  module.exports = merge.smart(common, {
    devtool: 'hidden-source-map',
    module: {
      rules: [
        {
          test: /\.scss/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  modules: true,
                  importLoaders: 1,
                  localIdentName: '[name]__[local]___[hash:base64:5]',
                },
              },
              {
                loader: 'postcss-loader',
              },
            ],
          }),
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
      }),
    ],
  })
}
