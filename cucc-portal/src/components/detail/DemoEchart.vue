<template>
  <div>
    <div
      :id="'myChart' + index"
      style="width: 100%; height: 560px; font-family: 'font1'"
    ></div>
  </div>
</template>

<script>
export default {
  name: "DemoEchart",
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
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
          },
        ],
      });
    },
  },
};
</script>

<style scoped>
</style>
