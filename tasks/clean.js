const fs = require('fs')
const debug = require('debug')('sumaq:clean')
const dotenv = require('dotenv')

dotenv.config()
process.env.NODE_ENV = (process.env.NODE_ENV === 'production') ? process.env.NODE_ENV : 'development'

async function clean() {
  try {
    debug('removing files...')
    fs.rmdirSync(process.env.DIR_DIST, { recursive: true })
    fs.mkdirSync(`${process.env.DIR_DIST}/assets`, { recursive: true })
    fs.mkdirSync(`${process.env.DIR_DIST}/images`, { recursive: true })
    debug('done!')
  } catch (error) {
    debug(error.toString())
  }
}

exports.clean = clean
