let Markdown = require('./lib/processors/markdown')

let md = new Markdown();

module.exports = {
  filters: {
    'markdown': function (text, options) {
      return md.generate(text)
    }
  }
};