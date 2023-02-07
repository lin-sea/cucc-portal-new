<template>
  <div class="title-cucc">
    <div class="tip">
      <div></div>
      <span>当月订单对比</span>
    </div>
    <div :id="'myChart' + index" style="height: 80%"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import { orderByArea } from "@/api/home/home";
import moment from "moment";
let chartDom;
let option;
export default {
  name: "YearOrder",
  props: {
    index: {
      type: String,
      default: "0",
    },
  },
  data() {
    return {
      indicator: [],
      data: [],
    };
  },
  computed: {
    ...mapState(["app"]),
  },
  mounted() {
    this.getData();
    this.echartInit();
    setInterval(() => {
      this.indicator = [];
      this.data = [];
      this.getData();
      this.echartInit();
    }, this.app.timing);
  },
  methods: {
    getData() {
      var year = moment(new Date()).format("YYYY");
      var total = 0;
      orderByArea({
        year: year,
      }).then((resp) => {
        if (resp && resp.data.success) {
          var data = resp.data.data;
          if (!data) {
            return false;
          }
          this.data = [];
          data.forEach((item) => {
            total = total + item.value;
          });
          data.forEach((item) => {
            var value = ((item.value / total) * 100).toFixed(2);
            item.name = item.name + ":" + value + "%";
            this.indicator.push({
              name: item.name,
              max: 50,
            });
            this.data.push(value);
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
      var year = moment(new Date()).format("YYYY");
      option = {
        grid: {
          left: 18,
          right: 16,
          bottom: 1,
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        // legend: {
        //   data: [year + "", year - 1 + ""],
        //   textStyle: {
        //     fontFamily: this.$store.state.app.echartFontFamily,
        //     color: "#FFFFFF",
        //     fontSize: this.$store.state.app.echartfontSizeX,
        //   },
        // },
        textStyle: {
          fontFamily: this.$store.state.app.echartFontFamily,
          color: "#FFFFFF",
          fontSize: 26,
        },
        radar: {
          // shape: 'circle',
          indicator: this.indicator,
          splitArea: {
            show: false,
            areaStyle: {
              color: "rgba(255,0,0,0)", // 图表背景的颜色
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: "#3BA193", // 设置网格的颜色
            },
          },
        },
        series: [
          {
            type: "radar",
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#35463C", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#D3786D", // 100% 处的颜色
                  },
                ],
                global: false,
              },
            },
            // data: this.data
            data: [
              {
                value: this.data,
                name: "Allocated Budget",
              },
            ],
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
.tip {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 26px;
  width: 80%;

  div {
    display: inline-block;
    width: 6px;
    height: 20px;
    background-color: #a0ff89;
    margin-right: 18px;
  }

  span {
    color: #558d91;
    font-size: 26px;
  }
}
</style>
