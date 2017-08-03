const path = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
let config = require('./webpack.config')

const port = 3000

if (process.argv[2] === '--createApp') {
  config = require('./webpack.createApp')
}

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  // It suppress error shown in console, so it has to be set to false.
  quiet: false,
  // It suppress everything except error, so it has to be set to false as well
  // to see success build.
  noInfo: false,
  contentBase: path.join(__dirname, 'dist'),
  stats: {
    // Config for minimal console.log mess.
    assets: false,
    colors: true,
    version: false,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
  },
}).listen(port, 'localhost', err => {
  if (err) {
    console.log(err)
  }

  console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
})
