var visit = require('unist-util-visit')

module.exports = function debug(params) {
  function transformer(tree, file) {
    visit(tree, function visitor(node, i, parent) {
      const { type } = node

      if (params && params.data) {
        if (
          !params.data.hasMath &&
          (type === 'math' || type === 'inlineMath')
        ) {
          params.data.hasMath = true
        }
        if (
          !params.data.hasCode &&
          (type === 'code' || type === 'inlineCode')
        ) {
          params.data.hasCode = true
        }
      }
    })
  }
  return transformer
}
