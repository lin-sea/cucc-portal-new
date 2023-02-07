<template>
  <div class="title-cucc">
    <h2>年度生产总方</h2>
    <div :id="'myChart' + index" style="height: 80%"></div>
  </div>
</template>

<script>
import { summaryInYearByMixingStation } from "@/api/detail/detail";
var chartDom;
var option;
const thisYear = new Date().getFullYear() + "";
const lastYear = new Date().getFullYear() - 1 + "";
export default {
  name: "YearVolume",
  props: {
    index: {
      type: String,
      default: "0",
    },
  },
  data() {
    return {
      mixingStation: "",
      xAxis: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
      ],
      bsThisYear: [],
      fbsThisYear: [],
      bsLastYear: [],
      fbsLastYear: [],
    };
  },
  mounted() {
    this.echartInit();
    this.getData();
  },
  methods: {
    getData() {
      this.mixingStation = this.$route.query.mixingStation;
      summaryInYearByMixingStation({
        year: new Date().getFullYear(),
        mixingStation: this.mixingStation,
      }).then((resp) => {
        if (resp && resp.data.success) {
          var data = JSON.parse(resp.data.data);
          if (!data) {
            return false;
          }
          data.forEach((item, index) => {
            this.bsThisYear.push((item.bsThisYear / 10000).toFixed(1));
            this.fbsThisYear.push((item.fbsThisYear / 10000).toFixed(1));
            this.bsLastYear.push((item.bsLastYear / 10000).toFixed(1));
            this.fbsLastYear.push((item.fbsLastYear / 10000).toFixed(1));
          });
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
          left: "5%",
          right: "5%",
          bottom: "3%",
          containLabel: true,
        },
        legend: {
          data: [
            thisYear + "泵送",
            thisYear + "非泵送",
            lastYear + "泵送",
            lastYear + "非泵送",
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
              formatter: function (value) {
                //x轴的文字改为竖版显示
                var str = value.split("");
                return str.join("\n");
              },
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
            name: thisYear + "泵送",
            type: "bar",
            barGap: 0,
            // label: labelOption,
            stack: "thisYear",
            emphasis: {
              focus: "series",
            },
            data: this.bsThisYear,
          },
          {
            name: thisYear + "非泵送",
            type: "bar",
            stack: "thisYear",
            barGap: 0,
            // label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: this.fbsThisYear,
          },
          {
            name: lastYear + "泵送",
            type: "bar",
            barGap: 0,
            // label: labelOption,
            stack: "lastYear",
            emphasis: {
              focus: "series",
            },
            data: this.bsLastYear,
          },
          {
            name: lastYear + "非泵送",
            type: "bar",
            stack: "lastYear",
            barGap: 0,
            // label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: this.fbsLastYear,
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
