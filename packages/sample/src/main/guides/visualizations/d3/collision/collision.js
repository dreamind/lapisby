function d3CollisionDemo(selector) {
  const width = 1000
  const height = 600
  const viewBox = `0 0 ${width} ${height}`

  const nodes = d3.range(200).map(() => ({
    r: Math.random() * 12 + 4,
  }))
  const color = d3.scaleOrdinal(d3.schemeCategory10)
  const root = nodes[0]
  root.radius = 0
  root.fixed = true

  const forceX = d3.forceX(width / 2).strength(0.015)
  const forceY = d3.forceY(height / 2).strength(0.015)

  const force = d3
    .forceSimulation()
    .velocityDecay(0.2)
    .force('x', forceX)
    .force('y', forceY)
    .force(
      'collide',
      d3
        .forceCollide()
        .radius(d => {
          if (d === root) {
            return Math.random() * 50 + 100
          }
          return d.r + 0.5
        })
        .iterations(5)
    )
    .nodes(nodes)
    .on('tick', ticked)

  const svg = d3
    .select(selector)
    .append('svg')
    .attr('viewBox', viewBox)
    .attr('width', '100%')

  svg
    .selectAll('circle')
    .data(nodes.slice(1))
    .enter()
    .append('circle')
    .attr('r', d => d.r)
    .style('fill', (d, i) => color(i % 10))
    .on('mousemove', function() {
      const p = d3.mouse(this)
      root.fx = p[0]
      root.fy = p[1]
      force.alphaTarget(0.3).restart()
    })

  function ticked(e) {
    svg
      .selectAll('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
  }
}
