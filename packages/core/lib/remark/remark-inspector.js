var visit = require('unist-util-visit')

module.exports = function debug (params) {
  function transformer (tree, file) {

    visit(tree, function visitor (node, i, parent) {
      let c = node.value && node.value.toString().substr(0, 60)
      let { type } = node

      if (params && params.data) {
        if (!params.data.hasMath && (type === 'math' || type === 'inlineMath')) {
          params.data.hasMath = true
        }
        if (!params.data.hasCode && (type === 'code' || type === 'inlineCode')) {
          params.data.hasCode = true
        }
      }

      if (c && c.startsWith('::x')) {
        console.log('PARENT', node, parent)
      }

    })
  }
  return transformer
}


