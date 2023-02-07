<template>
  <div class="title-cucc" :style="{ fontFamily: app.echartFontFamily }">
    <div class="title-box">
      <img :src="titleImg" alt="" />
      <span>当月发货车次</span>
    </div>
    <div :id="'myChart' + index" style="height: 80%"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { currentMonthDeliver } from "@/api/home/home";
import titleImg from "../../assets/homeImg/newSmallTitle.png";
import moment from "moment";
var chartDom;
var option;
export default {
  name: "MonthDelivedNum",
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
      yAxis: [],
      month: "",
    };
  },
  mounted() {
    this.getData();
    this.echartInit();
    setInterval(() => {
      this.getData();
      this.echartInit();
    }, this.app.timing);
  },
  computed: {
    ...mapState(["app"]),
  },
  methods: {
    getData() {
      var month = moment(new Date()).format("YYYY-MM");
      currentMonthDeliver({
        date: month,
      }).then((resp) => {
        if (resp && resp.data.success) {
          var data = resp.data.data;
          if (!data) {
            return false;
          }
          const xData = data.map((item) => {
            return item.name.substr(0, item.name.length - 1);
          });
          this.xAxis = xData;
          //   console.log(data);
          data.forEach((item) => {
            // this.xAxis.push(item.name);
            this.yAxis.push(item.totalTrainNum);
          });
          this.echartSetOption();
        }
      });
    },
    clearData() {},
    echartInit() {
      this.month = new Date().getMonth() + 1;
      // 基于准备好的dom，初始化echarts实例
      chartDom = this.$echarts.init(
        document.getElementById("myChart" + this.index)
      );
    },
    echartSetOption() {
      option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3.2%",
          right: "4%",
          bottom: "2%",
          containLabel: true,
        },
        // legend: {
        //   data: ["计划完成量", "实际完成量"],
        //   right: "10%",
        //   textStyle: {
        //     fontFamily: this.$store.state.app.echartFontFamily,
        //     color: "#FFFFFF",
        //     fontSize: this.$store.state.app.echartfontSizeX,
        //   },
        // },
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
            name: "次",
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
            name: "发货车次",
            type: "line",
            lineStyle: {
              width: 3,
              color: "#05e8ab",
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.7,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#03937a",
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
            data: this.yAxis,
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
    top: 0;
    transform: translate(-50%);
  }
}

.label-1 {
  position: absolute;
  margin-top: 3px;
  margin-left: 130px;
  /* font-family: 'font1'; */
}
</style>
