<template>
  <div style="display: flex;">
    <div id="svg"></div>
    <div id="line"></div>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  data () {
    return {}
  },
  mounted () {
    this.initBar()
    this.initLine()
  },
  methods: {
    initBar () {
      const dataset = [50, 43, 120, 87, 99, 120]
      const height = 400
      const width = 400
      const svg = d3
        .select('#svg')
        .append('svg')
        .attr('height', height)
        .attr('width', width)
      const padding = {
        top: 20,
        left: 30,
        right: 20,
        bottom: 20
      }
      const rectStep = 35
      const rectWith = 30
      svg
        .selectAll('rect')
        .data(dataset)
        .enter()
        .append('rect')
        .attr('fill', 'red')
        .attr('x', (d, i) => padding.left + i * rectStep)
        .attr('y', (d, i) => height - padding.bottom - d)
        .attr('width', rectWith)
        .attr('height', d => d)
      svg
        .selectAll('text')
        .data(dataset)
        .enter()
        .append('text')
        .attr('fill', 'blue')
        .attr('font-size', '14px')
        .attr('text-anchor', 'middle')
        .attr('x', (d, i) => padding.left + i * rectStep)
        .attr('y', (d, i) => height - padding.bottom - d)
        .text(d => d)
        .attr('dx', rectWith / 2)
        .attr('dy', '1em')
    },
    initLine () {
      const dataset = [50, 43, 120, 87, 99, 167, 142]
      const padding = { top: 20, right: 20, left: 30, bottom: 20 }
      const height = 400
      const width = 600
      const xAxisWidth = width - padding.left - padding.right
      const yAxisWidth = height - padding.bottom - padding.top
      const svg = d3
        .select('#line')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
      const xScale = d3.scaleBand()
        .domain(dataset.map((d, i) => i))
        .range([0, xAxisWidth])
        .padding(0.1)
      const yScale = d3
        .scaleLinear()
        .domain([d3.max(dataset, d => d), 0])
        .range([0, yAxisWidth])
      const xAxis = d3.axisBottom(xScale)
      const yAxis = d3.axisLeft(yScale)

      const gx = svg.append('g').attr('transform', `translate(${padding.left}, ${height - padding.bottom})`)
      const gy = svg
        .append('g')
        .attr('transform', `translate(${padding.left}, ${height - padding.bottom - yAxisWidth})`)

      gx.call(xAxis)
      gy.call(yAxis)

      const linePath = d3
        .line()
        .x((d, i) => xScale(i) + padding.left + xScale.bandwidth() / 2)
        .y(d => height - padding.bottom - (yScale(0) - yScale(d)))

      svg.append('path').attr('d', linePath(dataset))
        .attr('stroke', '#000')
        .attr('store-width', '2px')
        .attr('fill', 'none')
    }
  }
}
</script>

<style></style>
