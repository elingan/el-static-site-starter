const debug = require('debug')('sumaq:build:scripts')
const dotenv = require('dotenv')
const rollup = require('rollup')
const resolve = require('@rollup/plugin-node-resolve')
const babel = require('@rollup/plugin-babel')
const { terser } = require('rollup-plugin-terser')
const cleanup = require('rollup-plugin-cleanup')

dotenv.config()
process.env.NODE_ENV = (process.env.NODE_ENV === 'production') ? process.env.NODE_ENV : 'development'
const isProduction = (process.env.NODE_ENV === 'production')

// https://rollupjs.org/guide/en/#reading-a-file-from-stdin
async function build() {
  debug(`build scripts for "${process.env.NODE_ENV}"...`)

  const inputOptions = {
    input: 'src/scripts/main.js',
    plugins: [
      resolve.nodeResolve(),
      babel.babel({
        babelHelpers: 'bundled',
      })
    ]
  }
  const outputOptions = {
    format: 'esm',
    file: 'dist/assets/scripts.js',
    plugins: []
  }
  if (isProduction) {
    inputOptions.plugins.push(cleanup({ comments: 'none', sourcemap: false }))
    outputOptions.plugins.push(terser())
  }
  try {
    const bundle = await rollup.rollup(inputOptions)
    await bundle.write(outputOptions)
    debug('done!')
  } catch (error) {
    debug(error.toString())
  }
}
exports.build = build
// build()
