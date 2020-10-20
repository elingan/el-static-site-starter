const debug = require('debug')('sumaq:build:styles')
const dotenv = require('dotenv')
const pug = require('pug')
const fs = require('fs')
const yaml = require('js-yaml')
const sass = require('node-sass')
const purify = require('purify-css')
const stripComments = require('strip-css-comments')
const rollup = require('rollup')
const resolve = require('@rollup/plugin-node-resolve')
const babel = require('@rollup/plugin-babel')

dotenv.config()
process.env.NODE_ENV = (process.env.NODE_ENV === 'production') ? process.env.NODE_ENV : 'development'
const isProduction = (process.env.NODE_ENV === 'production')

async function build() {
  try {
    debug(`start build for "${process.env.NODE_ENV}"...`)
    const styles = sass.renderSync({ file: `${process.env.DIR_SRC}/styles/main.scss` })
    const content = [`${process.env.DIR_DIST}/*.html`]
    let css = styles.css.toString()
    if (isProduction) {
      const cleanComments = stripComments(styles.css.toString(), { preserve: false })
      css = cleanComments
    }
    const purifyCSS = purify(content, css, { minify: isProduction })
    fs.writeFileSync(`${process.env.DIR_DIST}/assets/styles.css`, purifyCSS)
    debug(`styles done!`)
  } catch (error) {
    debug(error.toString())
  }
}

exports.build = build
build()
