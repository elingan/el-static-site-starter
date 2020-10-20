const fs = require('fs')
const debug = require('debug')('sumaq:copy')
const dotenv = require('dotenv')

dotenv.config()
process.env.NODE_ENV = (process.env.NODE_ENV === 'production') ? process.env.NODE_ENV : 'development'
// const isProduction = (process.env.NODE_ENV === 'production')

async function copyFiles() {
  try {
    debug('coping files...')
    fs.readdirSync('public').forEach(filename => {
      debug('coping ' + filename)
      fs.copyFileSync(`public/${filename}`, `dist/${filename}`)
    })
    fs.readdirSync('src/images').forEach(filename => {
      debug('coping ' + filename)
      fs.copyFileSync(`src/images/${filename}`, `dist/images/${filename}`)
    })
    debug('done!')
  } catch (error) {
    debug(error.toString())
  }
}

exports.copy = copyFiles


