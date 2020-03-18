<template>
  <div id="ball">
    <svg width="100%"
         height="100%"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3'
export default {
  data () {
    return {
      ballData: {
        "children": [
          { "name": "维修质量差", "weight": 60 },
          { "name": "超经营范围", "weight": 77 },
          { "name": "假冒伪劣配件", "weight": 110 },
          { "name": "占道洗车", "weight": 66 },
          { "name": "噪音污染", "weight": 80 },
          { "name": "乱收费", "weight": 56 },
          { "name": "脏乱差", "weight": 69 },
          { "name": "服务态度恶劣", "weight": 120 },
          { "name": "违规喷漆", "weight": 44 }
        ]
      }
    }
  },
  mounted () {
    this.initD3()
  },
  methods: {
    // 初始化
    initD3 () {
      const svg = d3
        .select('#ball svg') //选择<body>

      var width = 408 //SVG绘制区域的宽度
      var height = 373 //SVG绘制区域的高度

      const pack = d3.layout
        .pack()
        .size([width, height])
        .sort(null)
        .value(function (d) {
          return d.weight
        })
        .padding(3)

      var nodes = pack.nodes(this.ballData)

      var colors = ['#FF3CB3', '#4E67FF', '#1E8DFF', '#24C11D', '#FF4545', '#12D7DE', '#F335FF', '#FF6630', '#FFA42F']

      var grads = svg
        .append('defs')
        .selectAll('radialGradient')
        .data(nodes)
        .enter()
        .append('radialGradient')
        .attr('gradientUnits', 'objectBoundingBox')
        .attr('cx', '50%')
        .attr('cy', '50%')
        .attr('r', '50%')
        .attr('fx', '50%')
        .attr('fy', '50%')
        .attr('id', function (d, i) {
          return 'grad' + i
        })

      grads
        .append('stop')
        .attr('offset', '0%')
        .style('stop-color', '#040d2e')
        .style('stop-opacity', 0)

      grads
        .append('stop')
        .attr('offset', '100%')
        .style('stop-color', function (d, i) {
          return colors[i]
        })
        .style('stop-opacity', 0.5)

      var bubbles = svg
        .selectAll('.bubble')
        .data(
          nodes.filter(function (d) {
            return !d.children
          })
        )
        .enter()
        .append('g')
        .attr('class', 'bubble')

      bubbles
        .append('circle')
        .style('fill', function (d, i) {
          return 'url(#grad' + i + ')'
        })
        .attr('cx', function (d) {
          return d.x
        })
        .attr('cy', function (d) {
          return d.y
        })
        .attr('r', function (d) {
          return d.r
        })

      bubbles
        .append('text')
        .attr('x', function (d) {
          return d.x
        })
        .attr('y', function (d) {
          return d.y
        })
        .style('fill', function (d, i) {
          return colors[i]
        })
        .text(function (d) {
          return d.name
        })
    }
  }
}
</script>


<style lang="scss" scoped>
#ball {
  width: 100%;
  height: 100%;
}
</style>
<style lang="scss">
#ball {
  .bubble text {
    font-size: 0.7vw;
    font-family: arial;
    text-anchor: middle;
    cursor: pointer;
  }
}
</style>

