<template>
  <div>
    <div class="title-cucc">
      <h2>车辆统计</h2>
      <div :id="'myChart' + index" style="height: 80%"></div>
    </div>
  </div>
</template>


<script>
var appData = require("@/assets/json/VehicleLocation.json");
var data;
var chartDom;
var option;
export default {
  name: "CarStatistics",
  props: {
    index: {
      type: String,
      default: "0",
    },
  },
  data() {
    return {
      list: [],
      mixingStation: "",
    };
  },
  mounted() {
    // this.getData();
    data = {};
    Object.keys(appData).forEach((item) => {
      if (appData[item].rollerStatus) {
        if (
          data[appData[item].rollerStatus] ||
          data[appData[item].rollerStatus] == 0
        ) {
          data[appData[item].rollerStatus] =
            data[appData[item].rollerStatus] + 1;
        } else {
          data[appData[item].rollerStatus] = 0;
        }
      }
    });
    // console.log(data);
    this.echartInit();
    this.echartSetOption();
  },
  methods: {
    clearData() {},
    echartInit() {
      // 基于准备好的dom，初始化echarts实例
      chartDom = this.$echarts.init(
        document.getElementById("myChart" + this.index)
      );
    },
    echartSetOption() {
      var value = []
      Object.keys(data).forEach(item => {
        value.push({
          name: item,
          value: data[item]
        })
      })
      option = {
        // title: {
        //   text: "Referer of a Website",
        //   subtext: "Fake Data",
        //   left: "center",
        // },
        tooltip: {
          trigger: "item",
        },
        textStyle: {
          fontFamily: this.$store.state.app.echartFontFamily,
          color: "#FFFFFF",
        },
        legend: {
          orient: "vertical",
          left: "left",
          textStyle: {
            fontFamily: this.$store.state.app.echartFontFamily,
            color: "#FFFFFF",
            fontSize: this.$store.state.app.echartfontSizeX,
          },
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: value,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      // 绘制图表
      chartDom.setOption(option);
    },
  },
};
</script>

<style scoped>
</style>
