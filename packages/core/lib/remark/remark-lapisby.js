// const low = require('lowlight')
const fs = require('fs')
const { merge, pick } = require('lodash')
const visit = require('unist-util-visit')
const is = require('unist-util-is')
const yaml = require('yaml')
const { YAML, CODE } = require('../common/constants')
const { parse } = require('../../../common/propParser')

module.exports = function(params) {
  return ast => visit(ast, test, visitor)

  function test(node) {
    return is(CODE, node) || is(YAML, node)
  }

  function fmProcessor(content, params) {
    const frontmatter = yaml.parse(content)
    if (!frontmatter) {
      return
    }
    //const { scripts = [], styles = [], theme } = frontmatter
    const data = params.data
    data.frontmatter = frontmatter
    // scripts.forEach(s => {
    //   data.scripts.add(s)
    // })
    // styles.forEach(s => {
    //   data.styles.add(s)
    // })
    let core = pick(frontmatter, [
      'title',
      'template',
      'theme',
      'codeTheme',
      'bibliography',
    ])
    merge(data, core)
    return frontmatter
  }

  function lapisbyRouter(content, params, node, data) {
    let config = yaml.parse(content)
    let { component } = config
    config.classNames = config.classNames || ''
    if (data.classNames) {
      config.classNames += ' ' + data.classNames.join(' ')
    }
    if (!config.id && data.id) {
      config.id = data.id
    }
    const generators = params.confs.lapisby.generators || {}
    const generator = generators[component]
    if (generator) {
      params.data.components[component] = config
      return generator(config, node)
    }
  }

  function visitor(node) {
    let { lang, value, meta, type } = node
    let src
    let frontmatter = null
    let data = {}

    if (type === YAML) {
      // if frontmatter
      if (node.position.start.line === 1) {
        frontmatter = fmProcessor(value, params)
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
        data = parse(meta)
      }
    }
    // no value either inline or externally
    if (!value) {
      return
    }
    lapisbyRouter(value, params, node, data)
  }
}
