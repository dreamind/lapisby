// const low = require('lowlight')
const fs = require('fs')
const short = require('short-uuid')
const { merge, pick } = require('lodash')
const visit = require('unist-util-visit')
const is = require('unist-util-is')
const yaml = require('yaml')
const { YAML, CODE } = require('../common/constants')
const plotlyGenerator = require('./generator/plotly')

module.exports = function (params) {
  return ast => visit(ast, test, visitor)  
  
  function test(node) {
    return is(CODE, node) || is(YAML, node)
  }

  function fmProcessor (content, params) {
    const frontmatter = yaml.parse(content)
    if (!frontmatter) {
      return
    }
    const {
      scripts = [],
      styles = [],
      theme,
    } = frontmatter
    const data = params.data
    data.frontmatter = frontmatter
    scripts.forEach(s => {
      data.scripts.add(s)
    })
    styles.forEach(s => {
      data.styles.add(s)
    })    
    let core = pick(frontmatter, ['title', 'template', 'theme', 'codeTheme', 'bibliography'])
    merge(data, core)
    // console.log(theme, data)
    if (theme) {
      data.styles.add(theme + '/fonts.css')
      data.styles.add(theme + '/index.styl')
    }
    return frontmatter
  }

  function lapisbyRouter (content, params, node) {
    let config = yaml.parse(content)
    let { component } = config

    if (component === 'plotly') {
      return plotlyGenerator (config, params, node)
    }
  }  

  function visitor(node) {
    let { lang, value, meta, type } = node
    let src, frontmatter = null

    
    if (type === YAML) {
      // if frontmatter
      if (node.position.start.line === 1) {
        frontmatter = fmProcessor (value, params)
        return
      }
    } else if (type === CODE) {
      if (!lang || !lang.startsWith('lapisby')) {
        return
      }
    } else {
      return
    }

    // Lapisby handler
    // Getting the body of the config
    if (meta) {
      try {
        // try to get external value
        src = meta.match(/src=\"(.+)\"/)[1]
        value = fs.readFileSync(src).toString()
      } catch (e) {
        // pass
      }
    }
    // no value either inline or externally 
    if (!value) {
      return
    }
    lapisbyRouter (value, params, node)
  }
}
