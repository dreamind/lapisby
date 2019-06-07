let Markdown = require('lapisby/lib/processors/markdown')
let md = new Markdown()

module.exports = {
  filters: {
    markdown: async function(text, options) {
      return await md.generate(text).html // broken bcoz async
    },
  },
}
