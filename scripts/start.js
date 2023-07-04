'use strict';
const configs = require('../configs/configs');

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const path = require('path');
const http = require('http');

const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const configFactory = require('../configs/webpack.config.js');

function build() {

  const webpackConfig = configFactory('development');
  const compiler = webpack(webpackConfig);

  return new Promise((resolve, reject) => {

    const devServerOptions = Object.assign({}, webpackConfig.devServer, {
      open: true,
    });

    webpackDevServer.addDevServerEntrypoints(configFactory, devServerOptions);

    const devServer = new webpackDevServer(compiler, devServerOptions)

    // Launch webpackDevServer.
    const PORT = process.env.PORT || configs.port_dev;

    devServer.listen(PORT, process.env.DOMAIN, err => {
      console.log(`Dev server listening on port ${configs.port_dev}`);
      if (err) {
         console.log(err);
      }
    });

    return resolve('Compiled successfully.');

  }).catch(err => {
    console.log(err);
  })

}