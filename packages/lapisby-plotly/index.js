const { reduce } = require("lodash");
const short = require("short-uuid");

module.exports = function codepenGenerator(config, node) {

  let { id = short.generate(), data, classNames = ""} = config
  let layout = {
    font: { size: 10 }
  }
  node.type = 'html'
  node.value = `
<div id="${id}" class="plotly-wrap ${classNames}"></div>
<script defer>
Plotly.newPlot('${id}', ${data}, ${JSON.stringify(layout)}, {responsive: true})
</script>`
  node.data = undefined
};
