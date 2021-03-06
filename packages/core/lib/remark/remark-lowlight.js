let low = require('lowlight')
let visit = require('unist-util-visit')
let fs = require('fs')

module.exports = function attacher({ include, exclude } = {}) {
  return ast => visit(ast, 'code', visitor)

  function visitor(node) {
    let { lang, data, meta } = node
    let url
    let code

    if (
      !lang ||
      (include && include.indexOf(lang) === -1) ||
      (exclude && exclude.indexOf(lang) !== -1)
    ) {
      return
    }
    if (meta) {
      try {
        url = meta.match(/url=\"(.+)\"/)[1]
      } catch (e) {
        // pass
      }
    }
    if (!data) {
      data = {}
      node.data = data
    }
    if (!data.hProperties) {
      data.hProperties = {}
    }
    if (url) {
      code = fs.readFileSync(url).toString()
    } else {
      code = node.value
    }
    data.hChildren = low.highlight(lang, code).value
    data.hProperties.className = [
      'hljs',
      ...(data.hProperties.className || []),
      'language-' + lang,
    ]
  }
}
