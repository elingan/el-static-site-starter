// const resolve = require('resolve');
// const http2 = require.resolve('http2');
const os = require('os')
const bs = require("browser-sync").create()

// resolve.sync('http2') // will resolve the molnarg http2 module if you have it installed
// require.resolve('http2') // will always resolve the native http2 module

bs.init({
  server: './dist',
  httpModule: 'http2',
  https: {
    key: `${os.homedir()}/.ssh/localhost+2-key.pem`,
    cert: `${os.homedir()}/.ssh/localhost+2.pem`
  }
})

exports.bs = bs
