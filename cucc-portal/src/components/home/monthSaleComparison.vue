<template>
  <div>
    <div class="title-cucc">
      <div class="tip">
        <div></div>
        <span>月度销量对比</span>
      </div>
      <div :id="'myChart' + index" style="height: 90%"></div>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";

import { salesVolumeByMonth } from "@/api/home/home";
var app = {};
var chartDom;
var option;
app.config = {
  rotate: 90,
  align: "left",
  verticalAlign: "middle",
  position: "insideBottom",
  distance: 10,
  onChange: function () {
    const labelOption = {
      rotate: app.config.rotate,
      align: app.config.align,
      verticalAlign: app.config.verticalAlign,
      position: app.config.position,
      distance: app.config.distance,
    };
    myChart.setOption({
      series: [
        {
          label: labelOption,
        },
        {
          label: labelOption,
        },
        {
          label: labelOption,
        },
      ],
    });
  },
};
const labelOption = {
  show: true,
  position: app.config.position,
  distance: app.config.distance,
  align: app.config.align,
  verticalAlign: app.config.verticalAlign,
  rotate: app.config.rotate,
  formatter: "{c}  {name|{a}}",
  fontSize: 16,
  rich: {
    name: {},
  },
};

const thisYear = new Date().getFullYear() + "";
const lastYear = new Date().getFullYear() - 1 + "";
export default {
  name: "monthSaleComparison",
  props: {
    index: {
      type: String,
      default: "0",
    },
  },
  data() {
    return {
      thisMonth: [],
      lastYearMonth: [],
      differenceList: [],
      max1: 0,
      min1: 0,
      max2: 0,
      min2: 0,
    };
  },
  computed: {
    ...mapState(["app"]),
  },
  mounted() {
    this.echartInit();
    // this.getData();
    this.getFakeData()
    setInterval(()=>{
       this.echartInit();
    // this.getData();
    this.getFakeData()
    },this.app.timing)
  },

  methods: {
    echartInit() {
      // 基于准备好的dom，初始化echarts实例
      chartDom = this.$echarts.init(
        document.getElementById("myChart" + this.index)
      );
    },
    getMax(val1, val2) {
      if (val1 * 1 > val2 * 1) {
        return val1;
      }
      return val2;
    },
    getMin(val1, val2) {
      if (val1 * 1 < val2 * 1) {
        return val1;
      }
      return val2;
    },

    getFakeData() {
      [{"month":1,"valueLastYear":812297.3800000001,"difference":-60877.47000000009,"value":751419.91},{"month":2,"valueLastYear":111387.75,"difference":-111387.75,"value":0.0},{"month":3,"valueLastYear":732145.0199999999,"difference":1009.5000000001164,"value":733154.52},{"month":4,"valueLastYear":947340.92,"difference":-156921.69000000006,"value":790419.23},{"month":5,"valueLastYear":959495.4800000002,"difference":-83276.04000000027,"value":876219.44},{"month":6,"valueLastYear":772885.6900000001,"difference":-58693.55999999994,"value":714192.1300000001},{"month":7,"valueLastYear":617378.0800000002,"difference":42334.20999999973,"value":659712.2899999999},{"month":8,"valueLastYear":665193.6600000001,"difference":-415203.90000000014,"value":249989.76},{"month":9,"valueLastYear":761735.56,"difference":-761735.56,"value":0.0},{"month":10,"valueLastYear":861204.0,"difference":-861204.0,"value":0.0},{"month":11,"valueLastYear":1031839.4000000001,"difference":-1031839.4000000001,"value":0.0},{"month":12,"valueLastYear":976616.5700000001,"difference":-976616.5700000001,"value":0.0}].forEach((item) => {
        this.thisMonth.push((item.value / 10000).toFixed(2));
        // this.max1 = this.getMax(this.max1, item.value.toFixed(0));
        // this.min1 = this.getMin(this.min1, item.value.toFixed(0));
        this.lastYearMonth.push((item.valueLastYear / 10000).toFixed(2));
        // this.max1 = this.getMax(this.max1, item.valueLastYear.toFixed(0));
        // this.min1 = this.getMin(this.min1, item.valueLastYear.toFixed(0));
        let difference =
          item.value == 0
            ? "0"
            : ((item.difference / item.valueLastYear) * 100).toFixed(0);
        this.max2 = this.getMax(this.max2, difference);
        this.min2 = this.getMin(this.min2, difference);
        this.differenceList.push(difference);
      });
      this.echartSetOption();
    },

    getData() {


      salesVolumeByMonth({
        year: thisYear,
      }).then((resp) => {
        if (resp && resp.data.success) {
          const data = resp.data.data;
          if (!data) {
            return false;
          }
          data.list.forEach((item) => {
            this.thisMonth.push((item.value / 10000).toFixed(2));
            // this.max1 = this.getMax(this.max1, item.value.toFixed(0));
            // this.min1 = this.getMin(this.min1, item.value.toFixed(0));
            this.lastYearMonth.push((item.valueLastYear / 10000).toFixed(2));
            // this.max1 = this.getMax(this.max1, item.valueLastYear.toFixed(0));
            // this.min1 = this.getMin(this.min1, item.valueLastYear.toFixed(0));
            var difference =
              item.value == 0
                ? "0"
                : ((item.difference / item.valueLastYear) * 100).toFixed(0);
            this.max2 = this.getMax(this.max2, difference);
            this.min2 = this.getMin(this.min2, difference);
            this.differenceList.push(difference);
          });
          this.echartSetOption();
        }
      });
    },
    echartSetOption() {
      var interval1 = ((this.max1 - this.min1) / 6 + 0.5).toFixed(0) * 1;
      var interval2 = ((this.max2 - this.min2) / 6 + 0.5).toFixed(0) * 1;
      var x1 = (this.min1 * 1).toFixed(0) * 1;
      var d1 = (this.min1 * 1).toFixed(0) * 1 + interval1 * 6;
      var x2 = (this.min2 * 1).toFixed(0) * 1;
      var d2 = (this.min2 * 1).toFixed(0) * 1 + interval2 * 6;
      option = {
        grid: {
          left: 18,
          right: 8,
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
          right:20,
          data: [thisYear, lastYear],
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
            // axisTick: { show: false },
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
              color: '#fff',
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
            name: '万元',
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
            fontFamily: this.$store.state.app.echartFontFamily,

            },
            nameTextStyle: {
              color:'#fff',
              fontSize: 26,
            fontFamily: this.$store.state.app.echartFontFamily,

            }
            // splitNumber: 7,
            // min: x1,
            // max: d1,
            // interval: interval1,
          },
        ],
        series: [
          {
            name: thisYear,
            type: "bar",
            barGap: 0,
            // label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: this.thisMonth,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#4B84F0' // 0% 处的颜色
                }, {
                  offset: 1, color: '#7FDEFB' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            },
          },
          {
            name: lastYear,
            type: "bar",
            // stack: "jhfl",
            // label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: this.lastYearMonth,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#D760E1' // 0% 处的颜色
                }, {
                  offset: 1, color: '#F8B5FE' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            },
          },
          // {
          //   name: "增幅",
          //   type: "line",
          //   // stack: "jhfl",
          //   // label: labelOption,
          //   emphasis: {
          //     focus: "series",
          //   },
          //   yAxisIndex: 1,
          //   data: this.differenceList,
          // },
        ],
      };
      // 绘制图表
      chartDom.setOption(option);
    },

    clearData() { },
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
    background-color: #00B0FC;
    margin-right: 18px;
  }

  span {
    color: #6A89AF;
    font-size: 26px;
  }

}
</style>
