const short = require('short-uuid')

module.exports = function plotlyGenerator(config, params, node) {
  let { id = short.generate(), data, classNames } = config
  let layout = {
    title: 'Responsive to window size',
    font: { size: 10 },
  }
  params.data.scripts.add(params.confs.lapisby.ext.plotly.local.js)
  node.type = 'html'
  node.value = `
<div id="${id}" class="plotly-wrap ${classNames}"></div>
<script defer>
Plotly.newPlot('${id}', ${data}, null, {responsive: true})
</script>`
  node.data = undefined
}
