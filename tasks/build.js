const debug = require('debug')('sumaq:build')
const dotenv = require('dotenv')
const taskClean = require('./clean')
const taskCopy = require('./copy')
const taskMarkups = require('./markups')
const taskScripts = require('./scripts')
const taskStyles = require('./styles')

dotenv.config()
process.env.NODE_ENV = (process.env.NODE_ENV === 'production') ? process.env.NODE_ENV : 'development'

async function buildAll() {
  debug('start building...')
  await taskClean.clean()
  await taskCopy.copy()
  await taskMarkups.build()
  await taskScripts.build()
  await taskStyles.build()
  debug('build done!')
}
// buildAll()
exports.buildAll = buildAll
