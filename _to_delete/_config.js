const os = require('os')
module.exports = {
  watch: true,
  open: true,
  rootDir: 'dist/',
  http2: true,
  sslKey: `${os.homedir()}/.ssh/localhost+2-key.pem`,
  sslCert: `${os.homedir()}/.ssh/localhost+2.pem`
}
