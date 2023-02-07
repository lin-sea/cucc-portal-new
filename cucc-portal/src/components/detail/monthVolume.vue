<template>
  <div class="title-cucc">
    <h2>当月生产总方</h2>
    <div :id="'myChart' + index" style="height: 80%"></div>
  </div>
</template>

<script>
import { summaryInMonthByMixingStation } from "@/api/detail/detail";
import moment from 'moment';
var chartDom;
var option;
export default {
  name: "MonthVolume",
  props: {
    index: {
      type: String,
      default: "0",
    },
  },
  data() {
    return {
      mixingStation: "",
      xAxis: [],
      total: [],
      bsActualNum: [],
      fbsActualNum: [],
      size: 7
    };
  },
  mounted() {
    this.echartInit();
    this.getData();
  },
  methods: {
    getData() {
      this.mixingStation = this.$route.query.mixingStation;
      summaryInMonthByMixingStation({
        month: moment(new Date()).format('YYYY-MM'),
        mixingStation: this.mixingStation,
      }).then((resp) => {
        if (resp && resp.data.success) {
          var data = JSON.parse(resp.data.data);
          if (!data) {
            return false;
          }
          data.forEach((item, index) => {
            this.total.push(item.total);
            this.bsActualNum.push(item.bsActualNum);
            this.fbsActualNum.push(item.fbsActualNum);
            this.xAxis.push(item.day.toFixed(0)+'日');
          });
          this.total = this.total.splice(this.total.length-this.size,this.size)
          this.bsActualNum = this.bsActualNum.splice(this.bsActualNum.length-this.size,this.size)
          this.fbsActualNum = this.fbsActualNum.splice(this.fbsActualNum.length-this.size,this.size)
          this.xAxis = this.xAxis.splice(this.xAxis.length-this.size,this.size)
          this.echartSetOption();
        }
      });
    },
    clearData() {},
    echartInit() {
      // 基于准备好的dom，初始化echarts实例
      chartDom = this.$echarts.init(
        document.getElementById("myChart" + this.index)
      );
    },
    echartSetOption() {
      option = {
        tooltip: {},
        grid: {
          left: "2%",
          right: "2%",
          bottom: "2%",
          containLabel: true,
        },
        legend: {
          data: [
            "总方",
            "泵送",
            "非泵送",
          ],
          textStyle: {
            fontFamily: this.$store.state.app.echartFontFamily,
            color: "#FFFFFF",
            fontSize: this.$store.state.app.echartfontSizeX,
          },
        },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: this.xAxis,
            axisLabel: {
              fontSize: this.$store.state.app.echartfontSizeX,
              interval: 0,
            //   formatter: function (value) {
            //     //x轴的文字改为竖版显示
            //     var str = value.split("");
            //     return str.join("\n");
            //   },
            },
          },
        ],
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
            name: "总方",
            type: "bar",
            barGap: 0,
            // label: labelOption,
            // stack: "bar",
            emphasis: {
              focus: "series",
            },
            data: this.total,
          },
          {
            name: "泵送",
            type: "bar",
            barGap: 0,
            // label: labelOption,
            // stack: "bar",
            emphasis: {
              focus: "series",
            },
            data: this.bsActualNum,
          },
          {
            name: "非泵送",
            type: "bar",
            // stack: "bar",
            barGap: 0,
            // label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: this.fbsActualNum,
          },
        ],
      };
      // 绘制图表
      chartDom.setOption(option);
    },
  },
  watch: {},
};
</script>

<style lang="less" scoped>
</style>
