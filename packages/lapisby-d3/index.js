const fs = require('fs')
const short = require('short-uuid')
const config = require('./config')

module.exports = {
  generator: function(config, node) {
    let { id = short.generate(), data, classNames = '', url } = config
    node.type = 'html'
    const content = fs
      .readFileSync(url)
      .toString()
      .trim()
    node.value = `
  <div id="${id}" class="d3-wrapper ${classNames}"></div>
  <script>
  window.addEventListener('DOMContentLoaded', function() {
    (${content})('#${id}')
  });
  </script>`
    node.data = undefined
  },
  config
}
