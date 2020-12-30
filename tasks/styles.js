const autoprefixer = require('autoprefixer')
const debug = require('debug')('sumaq:build:styles')
const dotenv = require('dotenv')

const postcss = require('postcss')
const postTailwind = require('tailwindcss')
const postCssnano = require('cssnano')
const postNested = require('postcss-nested')
const postImport = require('postcss-import')
const postDiscard = require('postcss-discard-comments')
const postPurge = require('@fullhuman/postcss-purgecss')
const fs = require('fs')

dotenv.config()
process.env.NODE_ENV = (process.env.NODE_ENV === 'production') ? process.env.NODE_ENV : 'development'
const isProduction = (process.env.NODE_ENV === 'production')

async function build() {
  debug(`start build for "${process.env.NODE_ENV}"...`)

  try {
    const plugins = [
      postImport,
      postNested,
      postTailwind,
      postPurge({
        content: ['./dist/**/*.html',]
      }),
      postDiscard,
    ]
    if (isProduction) {
      autoprefixer
      plugins.push(postCssnano)
    }
    const fromFile = `${process.env.DIR_SRC}/styles/main.css`
    const toFile = `${process.env.DIR_DIST}/assets/styles.css`
    const css = fs.readFileSync(fromFile)
    // const styles = sass.renderSync({ file: `${process.env.DIR_SRC}/styles/main.scss` })
    return postcss(plugins)
      .process(css, { map: false })
      .then(result => {
        fs.writeFileSync(toFile, result.css)
        debug(`styles done!`)
      })

  } catch (error) {
    debug(error.toString())
  }
}

exports.build = build

