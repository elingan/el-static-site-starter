// const debug = require('debug')('sumaq:build:styles')
const dotenv = require('dotenv')
const os = require('os')
const watch = require('node-watch')
const builder = require('./build')
const { startDevServer } = require('@web/dev-server')
const taskMarkups = require('./markups')
const taskScripts = require('./scripts')
const taskStyles = require('./styles')


dotenv.config()
process.env.NODE_ENV = (process.env.NODE_ENV === 'production') ? process.env.NODE_ENV : 'development'
// const isProduction = (process.env.NODE_ENV === 'production')

watch([
  `${process.env.DIR_SRC}/`,
  `${process.env.DIR_SRC}/includes/`,
  `${process.env.DIR_SRC}/includes/components/`,
  `${process.env.DIR_SRC}/data/`
], { resursive: true, filter: /\.(yaml|pug)$/ }, taskMarkups.build)
watch([
  `${process.env.DIR_SRC}/scripts/`,
], { resursive: true, filter: /\.(js)$/ }, taskScripts.build)
watch([
  `${process.env.DIR_SRC}/`,
  `${process.env.DIR_SRC}/includes/`,
  `${process.env.DIR_SRC}/includes/components/`,
  `${process.env.DIR_SRC}/styles/`,
  `${process.env.DIR_SRC}/styles/components/`
], { resursive: true, filter: /\.(css|pug)$/ }, taskStyles.build)


async function main() {
  await builder.buildAll()
  const server = await startDevServer({
    // logStartMessage: false,
    // autoExitProcess: true,
    config: {
      watch: true,
      // open: true,
      rootDir: `${process.env.DIR_DIST}/`,
      http2: true,
      sslKey: `${os.homedir()}/.ssh/localhost+2-key.pem`,
      sslCert: `${os.homedir()}/.ssh/localhost+2.pem`,
      // middleware: [
      //   function rewriteIndex(context, next) {
      //     // console.log(context.path)
      //     // console.log(context.status, context.url)
      //     // if (context.status === 404) {
      //     //   context.url = '404.html';
      //     // }
      //     return next()
      //   },
      // ]
    }
  })
  // console.log(`https://${server.config.hostname}:${server.config.port}`)
}

main()
