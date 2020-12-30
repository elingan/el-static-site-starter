const os = require('os')
module.exports = {
  http2: true,
  watch: true,
  open: true,
  rootDir: 'dist/',
  sslKey: `${os.homedir()}/.ssh/localhost+2-key.pem`,
  sslCert: `${os.homedir()}/.ssh/localhost+2.pem`
}
