<template>
  <div class="title-cucc">
    <div class="title-box" :style="{ fontFamily: app.echartFontFamily }">
      <img :src="titleImg" alt="" />
      <span>当月任务完成量</span>
    </div>
    <div class="label-1" :style="{ fontFamily: app.echartFontFamily }">
      月度总对比：
      {{ bfb }}
    </div>
    <div :id="'myChart' + index" style="height: 80%"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { summaryMixingStationInMonth } from "@/api/home/home";
import moment from "moment";
import { decimalsToFractional } from "@/utils/commonUtil";
import titleImg from "../../assets/homeImg/newSmallTitle.png";

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
      titleImg: titleImg,
      xAxis: [],
      planNum: [],
      actualNum: [],
      planNumTotal: 0,
      actualNumTotal: 0,
      bfb: "",
    };
  },

  computed: {
    ...mapState(["app"]),
  },
  mounted() {
    this.getData();
    this.echartInit();
    setInterval(() => {
      this.getData();
      this.echartInit();
    }, this.app.timing);
    // deliverGoodsByGood({
    //     date: '2022-03',
    //     type: '月'
    //   }).then(resp => {
    //       var data = JSON.parse(resp.data.data);
    //       console.log(data)
    //   })
  },
  methods: {
    getData() {
      var month = moment(new Date()).format("YYYY-MM-DD");
      summaryMixingStationInMonth({
        month: month,
      }).then((resp) => {
        if (resp && resp.data.success) {
          var data = JSON.parse(resp.data.data);
          // console.log(data)
          if (!data) {
            return false;
          }
          //   console.log(data);
          const xData = data.map((item) => {
            return item.name.substr(0, item.name.length - 1);
          });
          this.xAxis = xData;
          data.forEach((item) => {
            // this.xAxis.push(item.name);
            this.planNum.push((item.planNum / 10000).toFixed(2));
            this.planNumTotal += item.planNum;
            this.actualNum.push((item.actualNum / 10000).toFixed(2));
            this.actualNumTotal += item.actualNum;
          });
          this.echartSetOption();
          this.bfb = decimalsToFractional(
            (this.actualNumTotal / this.planNumTotal).toFixed(1) * 1
          );
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
        grid: {
          left: "2%",
          right: "2%",
          bottom: 1,
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["任务计划量", "实际完成量"],
          right: "10%",
          textStyle: {
            fontFamily: this.$store.state.app.echartFontFamily,
            color: "#fff",
            fontSize: this.$store.state.app.echartfontSizeX,
          },
        },
        textStyle: {
          fontFamily: this.$store.state.app.echartFontFamily,
          color: "#fff",
        },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: this.xAxis,
            axisLabel: {
              fontSize: this.$store.state.app.echartfontSizeX,
              fontFamily: this.app.echartFontFamily,
              interval: 0,
              color: "#fff",
              fontSize: 24,
              formatter: function (value) {
                //x轴的文字改为竖版显示
                var str = value.split("");
                return str.join("\n");
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "万方",
            axisLabel: {
              color: "#fff",
              fontSize: 26,
              fontFamily: this.app.echartFontFamily,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ["rgba(228,228,228,0.4)", "rgb(228,228,228,0.4)"],
                type: "dashed",
              },
            },
            nameTextStyle: {
              fontSize: 26,
              fontFamily: this.app.echartFontFamily,
            },
          },
        ],
        series: [
          {
            name: "任务计划量",
            type: "line",
            lineStyle: {
              width: 3,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(139, 247, 206)",
                },
                {
                  offset: 1,
                  color: "#02141d",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: this.planNum,
          },
          {
            name: "实际完成量",
            type: "line",
            lineStyle: {
              width: 3,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(0, 221, 255)",
                },
                {
                  offset: 1,
                  color: "#02141d",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: this.actualNum,
          },
        ],
      };
      // 绘制图表
      chartDom.setOption(option);
    },
  },
};
</script>

<style lang="less" scoped>
.title-box {
  position: relative;

  img {
    width: 100%;
    height: 100%;
    margin-top: 20px;
  }

  span {
    color: #5cacc5;
    font-size: 37px;
    position: absolute;
    margin: 0;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}

.label-1 {
  // color: rgb(180, 188, 199);
  color: "#fff";
  position: absolute;
  font-size: 22px;
  margin-top: 3px;
  margin-left: 130px;
  /* font-family: 'font1'; */
}
</style>
