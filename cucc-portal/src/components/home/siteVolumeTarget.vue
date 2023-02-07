<template>
  <div class="title-cucc">
    <div class="title-box" :style="{ fontFamily: app.echartFontFamily }">
      <img :src="titleImg" alt="" />
      <span>当年任务完成量</span>
    </div>
    <div :id="'myChart' + index" style="height: 80%"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { summaryMixingStationInYear } from "@/api/home/home";
import moment from "moment";
import titleImg from "../../assets/homeImg/newSmallTitle.png";
var chartDom;
var option;
export default {
  name: "SiteVolumeTarget",
  props: {
    index: {
      type: String,
      default: "0",
    },
  },
  data() {
    return {
      titleImg,
      xAxis: [],
      wcl: [],
      mbl: [],
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
      const year = moment(new Date()).format("YYYY-MM-DD");
      summaryMixingStationInYear({
        year,
      }).then((resp) => {
        if (resp && resp.data.success) {
        debugger
  
          var data = resp.data.data
          if (!data) {
            return false;
          }
          const xData = data.map((item) => {
            return item.name.substr(0, item.name.length - 1);
          });
          this.xAxis = xData;
          //   console.log(data);
          data.forEach((item) => {
            this.wcl.push((item.actualNum / 10000).toFixed(2));
            this.mbl.push((item.planNum/ 10000).toFixed(2));
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
        grid: {
          left: "2%",
          right: "2%",
          bottom: "2%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          right: 90,
          data: ["任务计划量", "实际完成量"],
          textStyle: {
            fontFamily: this.$store.state.app.echartFontFamily,
            color: "#fff",
            fontSize: this.$store.state.app.echartfontSizeX,
          },
        },
        textStyle: {
          fontFamily: this.$store.state.app.echartFontFamily,
          color: "#FFFFFF",
        },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: this.xAxis,
            axisLabel: {
              fontSize: this.$store.state.app.echartfontSizeX,
              fontFamily: this.$store.state.app.echartFontFamily,
              interval: 0,
              color: "#fff",
              // fontSize:26,
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
            name: "实际完成量",
            type: "bar",
            color: "rgb(238,203,124)",
            barGap: 0,
            emphasis: {
              focus: "series",
            },
            data: this.wcl,
          },
          {
            name: "任务计划量",
            type: "line",
            color: "rgb(203,86,69)",
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 4,
                },
              },
            },
            emphasis: {
              focus: "series",
            },
            data: this.mbl,
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
</style>
