<template>
  <div class="title-cucc">
    <div class="title-box">
      <img :src="titleImg" alt=".." />
      <span>当日实时生产总方</span>
    </div>
    <div :id="'myChart' + index" style="height: 80%"></div>
  </div>
</template>

<script>
import { summaryMixingStationByHour } from "@/api/detail/detail";
import { getToday } from "@/utils/dateUtil";
import titleImg from '../../assets/homeImg/newBigTitle.png'
// import { getPathParam } from "@/utils/commonUtil";
var chartDom;
var option;
let hour = new Date().getHours();
export default {
  name: "DailyVolume",
  props: {
    index: {
      type: String,
      default: "0",
    },
  },
  data() {
    return {
      titleImg,
      mixingStation: "",
      xAxis: [],
      bsAxis: [],
      fbsAxis: [],
      min: 0,
      max: 0,
      size: 8,
    };
  },
  mounted() {
    this.echartInit();
    this.adjustment();
    this.getData();
    setInterval(() => {
      this.checkTime();
    }, 1000 * 60);
  },
  methods: {
    checkTime() {
      var newHour = new Date().getHours();
      if (newHour != hour) {
        this.getData();
      }
    },
    getData() {
      this.mixingStation = this.$route.query.mixingStation;
      summaryMixingStationByHour({
        date: getToday(),
        mixingStation: this.mixingStation,
      }).then((resp) => {
        if (resp && resp.data.success) {
          var data = JSON.parse(resp.data.data);
          if (!data) {
            return false;
          }
          //   console.log(data);
          this.xAxis = [];
          this.bsAxis = [];
          this.fbsAxis = [];
          data.forEach((item, index) => {
            if (item.hour >= this.min && item.hour <= this.max) {
              this.xAxis.push(item.hour.toFixed(0) + ":00");
              this.bsAxis.push(item.bsActualNum);
              this.fbsAxis.push(item.fbsActualNum);
            }
          });
          this.echartSetOption();
        }
      });
    },
    adjustment() {
      if (hour < this.size) {
        this.max = this.size;
        this.min = 0;
        return true;
      }
      if (hour >= this.size && hour <= 24 - this.size) {
        this.max = hour;
        this.min = hour - this.size;
        return true;
      }
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
          left: "1%",
          right: "1%",
          bottom: "1%",
          containLabel: true,
        },
        legend: {
          data: ["泵送", "非泵送"],
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
          name: '单位：方',
          splitLine: {
            show: true,
            lineStyle: {
              color:['rgba(228,228,228,0.4)','rgb(228,228,228,0.4)'],
              type: 'dashed'
            }
          },
          axisLabel: {
            color: '#fff',
            fontSize: 26,
          },
        },
        textStyle: {
          fontFamily: this.$store.state.app.echartFontFamily,
          color: "#FFFFFF",
        },
        series: [
          {
            name: "泵送",
            type: "line",
            barGap: 0,
            // label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: this.bsAxis,
          },
          {
            name: "非泵送",
            type: "line",
            barGap: 0,
            // label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: this.fbsAxis,
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
