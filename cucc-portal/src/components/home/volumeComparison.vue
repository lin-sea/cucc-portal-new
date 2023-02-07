<template>
  <div class="title-cucc">
    <div class="title-box" :style="{ fontFamily: app.echartFontFamily }">
      <img :src="titleImg" alt="" />
      <span>年/月度生产总方对比</span>
    </div>
    <div :id="'myChart' + index" style="height: 80%"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { summaryInYear } from "@/api/home/home";
import moment from "moment";
import titleImg from "../../assets/homeImg/newSmallTitle.png";
var chartDom;
var option;
export default {
  name: "VolumeComparison",
  props: {
    index: {
      type: String,
      default: "0",
    },
  },
  data() {
    return {
      titleImg: titleImg,
      thisYearBs: [],
      thisYearfBs: [],
      lastYearBs: [],
      lastYearfBs: [],
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
  },
  methods: {
    getData() {
      var year = moment(new Date()).format("YYYY");
      summaryInYear({
        year: year,
      }).then((resp) => {
        if (resp && resp.data.success) {
          const data = JSON.parse(resp.data && resp.data.data);
          if (!data) {
            return false;
          }

          this.thisYearBs = data.quantityBSThisYearByMonth.map((item) =>
            (item / 10000).toFixed(1)
          );
          this.thisYearfBs = data.quantityFBSThisYearByMonth.map((item) =>
            (item / 10000).toFixed(1)
          );
          this.lastYearBs = data.quantityBSLastYearByMonth.map((item) =>
            (item / 10000).toFixed(1)
          );
          this.lastYearfBs = data.quantityFBSLastYearByMonth.map((item) =>
            (item / 10000).toFixed(1)
          );
          // console.log(data);

          //   data.list.forEach((item) => {});
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
      var year = moment(new Date()).format("YYYY");
      option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "2%",
          right: "2%",
          bottom: 1,
          containLabel: true,
        },
        legend: {
          itemWidth: 6,
          itemHeight: 18,
          itemGap: 35,
          right: 90,
          data: [
            year + "泵送",
            year - 1 + "泵送",
            year + "非泵送",
            year - 1 + "非泵送",
          ],
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
            data: [
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
            axisLabel: {
              fontSize: this.$store.state.app.echartfontSizeX,
              fontFamily: this.$store.state.app.echartFontFamily,
              interval: 0,
              color: "#5cacc5",
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
            splitLine: {
              show: true,
              lineStyle: {
                color: ["rgba(228,228,228,0.4)", "rgb(228,228,228,0.4)"],
                type: "dashed",
              },
            },
            name: "万方",
            axisLabel: {
              color: "#fff",
              fontSize: 26,
              fontFamily: this.$store.state.app.echartFontFamily,
            },
            nameTextStyle: {
              fontSize: 26,
              fontFamily: this.$store.state.app.echartFontFamily,
            },
          },
        ],
        series: [
          {
            name: year + "泵送",
            type: "bar",
            barGap: 0,
            // stack: "bs",
            stack: "thisYear",

            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgb(216,78,251)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgb(181,100,238)", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            emphasis: {
              focus: "series",
            },
            data: this.thisYearBs,
          },
          {
            name: year - 1 + "泵送",
            type: "bar",
            // stack: "bs",
            stack: "lastYear",
            itemStyle: {
              borderWidth: 1,
              borderColor: "#5B78A6",
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(48,23,65,1)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(48,23,65,1)", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            emphasis: {
              focus: "series",
            },
            data: this.lastYearBs,
          },
          {
            name: year + "非泵送",
            type: "bar",
            // stack: "fbs",
            stack: "thisYear",

            emphasis: {
              focus: "series",
            },
            data: this.thisYearfBs,
          },
          {
            name: year - 1 + "非泵送",
            type: "bar",
            // stack: "fbs",
            stack: "lastYear",
            itemStyle: {
              borderWidth: 1,
              borderColor: "#5B78A6",
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgb(16,38,63)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgb(16,38,63)", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            emphasis: {
              focus: "series",
            },
            data: this.lastYearfBs,
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
    position: absolute;
    color: #5cacc5;
    font-size: 37px;
    margin: 0;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
