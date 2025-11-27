const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.js'); 
module.exports = function startServer() {
  return new Promise((resolve, reject) => {
    const compiler = webpack(config);

    const server = new WebpackDevServer(
      {
        port: 9000,
        open: false,
        static: config.devServer.static,
        hot: true,
      },
      compiler
    );

    server.startCallback(err => {
      if (err) {
        reject(err);
        return;
      }
      console.log('Dev server started on http://localhost:9000');
      resolve({
        stop: () => new Promise(res => server.stop(res)),
      });
    });
  });
};


