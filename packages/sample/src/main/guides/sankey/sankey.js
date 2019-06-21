let height = 600
let width = 975

let color = (function() {
  const color1 = d3.scaleOrdinal(d3.schemeCategory10)
  return name => color1(name.replace(/ .*/, ''))
})()

let format = (function() {
  const f = d3.format(',.0f')
  return d => `${f(d)} TWh`
})()

let sankey = (function() {
  const sankey2 = d3
    .sankey()
    .nodeAlign(d3.sankeyJustify)
    .nodeWidth(15)
    .nodePadding(10)
    .extent([[1, 5], [width - 1, height - 5]])
  return ({ nodes, links }) =>
    sankey2({
      nodes: nodes.map(d => Object.assign({}, d)),
      links: links.map(d => Object.assign({}, d)),
    })
})()

let chart = function(data) {
  const svg = d3
    .select('#d3')
    .append('svg')
    .attr('viewBox', [0, 0, width, height])

  const { nodes, links } = sankey(data)

  svg
    .append('g')
    .attr('stroke', '#000')
    .selectAll('rect')
    .data(nodes)
    .join('rect')
    .attr('x', d => d.x0)
    .attr('y', d => d.y0)
    .attr('height', d => d.y1 - d.y0)
    .attr('width', d => d.x1 - d.x0)
    .attr('fill', d => color(d.name))
    .append('title')
    .text(d => `${d.name}\n${format(d.value)}`)

  const link = svg
    .append('g')
    .attr('fill', 'none')
    .attr('stroke-opacity', 0.5)
    .selectAll('g')
    .data(links)
    .join('g')
    .style('mix-blend-mode', 'multiply')

  let i = 1
  const gradient = link
    .append('linearGradient')
    //.attr("id", d => (d.uid = DOM.uid("link")).id)
    .attr('id', d => (d.uid = i++))
    .attr('gradientUnits', 'userSpaceOnUse')
    .attr('x1', d => d.source.x1)
    .attr('x2', d => d.target.x0)

  gradient
    .append('stop')
    .attr('offset', '0%')
    .attr('stop-color', d => color(d.source.name))

  gradient
    .append('stop')
    .attr('offset', '100%')
    .attr('stop-color', d => color(d.target.name))

  link
    .append('path')
    .attr('d', d3.sankeyLinkHorizontal())
    .attr('stroke', d => 'url(#' + d.uid + ')')
    .attr('stroke-width', d => Math.max(1, d.width))

  link
    .append('title')
    .text(d => `${d.source.name} → ${d.target.name}\n${format(d.value)}`)

  svg
    .append('g')
    .style('font', '10px sans-serif')
    .selectAll('text')
    .data(nodes)
    .join('text')
    .attr('x', d => (d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6))
    .attr('y', d => (d.y1 + d.y0) / 2)
    .attr('dy', '0.35em')
    .attr('text-anchor', d => (d.x0 < width / 2 ? 'start' : 'end'))
    .text(d => d.name)
}

let x = require('/main/guides/sankey/energy.json')
console.log(x)
d3.json(x).then(function(data) {
  chart(data)
})
