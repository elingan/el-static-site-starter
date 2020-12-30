const debug = require('debug')('sumaq:build:markups')
const dotenv = require('dotenv')
const pug = require('pug')
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

dotenv.config()
process.env.NODE_ENV = (process.env.NODE_ENV === 'production') ? process.env.NODE_ENV : 'development'
const isProduction = (process.env.NODE_ENV === 'production')

const pugConfig = {
  basedir: 'dist',
  pretty: !isProduction
}

async function build() {
  debug(`build pages for "${process.env.NODE_ENV}"...`)

  try {
    const baseData = yaml.safeLoad(fs.readFileSync(`${process.env.DIR_SRC}/data/_base.yaml`, 'utf-8'))
    fs.readdirSync(`${process.env.DIR_SRC}`).forEach(filename => {
      const name = path.basename(filename, '.pug')
      if (filename.endsWith('.pug')) {
        const pageData = yaml.safeLoad(fs.readFileSync(`${process.env.DIR_SRC}/data/${name}.yaml`, 'utf-8'))
        buildPage(name, { ...baseData, ...pageData })
      }
    })
    debug(`pages done!`)

  } catch (error) {
    debug(error.toString())
  }
}

function buildPage(page, data) {
  debug(`...building "${page}"`)
  const compiledFn = pug.compileFile(`${process.env.DIR_SRC}/${page}.pug`, pugConfig)
  const output = compiledFn(data)
  let htmlFile = `${process.env.DIR_DIST}/${page}.html`
  fs.writeFileSync(htmlFile, output)
}
exports.build = build
