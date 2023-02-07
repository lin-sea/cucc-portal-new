<template>
  <div class="title-cucc">
    <div class="tip">
      <div></div>
      <span>年/月度合同金额对比</span>
    </div>
    <div :id="'myChart' + index" style="height: 80%"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { paymentCollectionByMonth } from "@/api/home/home";
import moment from "moment";
var chartDom;
var option;
export default {
  name: "MonthPaymentYearOnYear",
  props: {
    index: {
      type: String,
      default: "0",
    },
  },
  data() {
    return {
      thisYear: [],
      lastYear: [],
    };
  },
  computed: {
    ...mapState(["app"]),
  },
  mounted() {
    
    this.getData();
    this.echartInit();
    setInterval(()=>{
      this.getData();
    this.echartInit();
    },this.app.timing)
  },
  methods: {
    getData() {
      var year = moment(new Date()).format("YYYY");
      paymentCollectionByMonth({
        year: year,
      }).then((resp) => {
        if (resp && resp.data.success) {
          var data = resp.data.data;
          if (!data) {
            return false;
          }
          this.thisYear = [];
          this.lastYear = [];
          data.forEach((item) => {
            item.value = item.value > 0 ? item.value : item.value * -1;
            item.valueLastYear =
              item.valueLastYear > 0
                ? item.valueLastYear
                : item.valueLastYear * -1;
            var thisvalue =
              item.value > 1000 ? item.value / 100000000 : item.value;
            var lastvalue =
              item.valueLastYear > 1000
                ? item.valueLastYear / 100000000
                : item.valueLastYear;
            this.thisYear.push(thisvalue.toFixed(2));
            this.lastYear.push(lastvalue.toFixed(2));
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
        legend: {
          right: 20,
          data: [year + "", year - 1 + ""],
          textStyle: {
            fontFamily: this.$store.state.app.echartFontFamily,
            color: "#FFFFFF",
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
              color: "#4F8B9F",
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
            name: "亿元",
            // splitLine: false,
            splitLine: {
              show: true,
              lineStyle: {
                color: ["rgba(228,228,228,0.4)", "rgb(228,228,228,0.4)"],
                type: "dashed",
              },
            },
            splitNumber: 6,
            min: 0,
            max: 30,
            interval: 5,
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
            name: year + "",
            type: "bar",
            barGap: 0,
            stack: "1",
            emphasis: {
              focus: "series",
            },
            data: this.thisYear,
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
                    color: "#A1F6A6",
                  },
                  {
                    offset: 1,
                    color: "#4FFCBB",
                  },
                ],
                global: false, // 缺省为 false
              },
            },
          },
          {
            name: year - 1 + "",
            type: "bar",
            stack: "2",
            emphasis: {
              focus: "series",
            },
            data: this.lastYear,
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
                    color: "#4B84F0", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#7FDEFB", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
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
    background-color: #a1f6a6;
    margin-right: 18px;
  }

  span {
    color: #558d91;
    font-size: 26px;
  }
}
</style>
