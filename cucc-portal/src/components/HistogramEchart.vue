<template>
  <div>
    <div :id="'myChart' + index" class="title-cucc"></div>
  </div>
</template>

<script>
export default {
  name: "HistogramEchart",
  props: {
    index: {
      type: String,
      default: "0",
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(
        document.getElementById("myChart" + this.index)
      );
      // 绘制图表
      myChart.setOption({
        // title: { text: '在Vue中使用echarts' },
        tooltip: {},
        grid: {
          left: "5%",
          right: "5%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
          axisLabel: {
            fontSize: this.$store.state.app.echartfontSizeX,
          },
        },
        yAxis: {
          axisLabel: {
            fontSize: this.$store.state.app.echartfontSizeY,
          },
        },
        textStyle: {
          fontFamily: this.$store.state.app.echartFontFamily,
          color: "#FFFFFF",
        },
        series: [
          {
            name: "销量",
            type: "bar",
            data: [
              {
                value: 5,
                // 设置单个柱子的样式
                itemStyle: {
                  color: "#02e5f8",
                  shadowColor: "#91cc75",
                  borderType: "dashed",
                  opacity: 0.5,
                },
              },
              {
                value: 20,
                // 设置单个柱子的样式
                itemStyle: {
                  color: "#02e5f8",
                  shadowColor: "#91cc75",
                  borderType: "dashed",
                  opacity: 0.5,
                },
              },
              {
                value: 36,
                // 设置单个柱子的样式
                itemStyle: {
                  color: "#02e5f8",
                  shadowColor: "#91cc75",
                  borderType: "dashed",
                  opacity: 0.5,
                },
              },
              {
                value: 10,
                // 设置单个柱子的样式
                itemStyle: {
                  color: "#02e5f8",
                  shadowColor: "#91cc75",
                  borderType: "dashed",
                  opacity: 0.5,
                },
              },
              {
                value: 43,
                // 设置单个柱子的样式
                itemStyle: {
                  color: "#02e5f8",
                  shadowColor: "#91cc75",
                  borderType: "dashed",
                  opacity: 0.5,
                },
              },
              {
                value: 20,
                // 设置单个柱子的样式
                itemStyle: {
                  color: "#02e5f8",
                  shadowColor: "#91cc75",
                  borderType: "dashed",
                  opacity: 0.5,
                },
              },
            ],
          },
        ],
      });
    },
  },
};
</script>

<style scoped>
</style>
