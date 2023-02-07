<template>
  <div class="title-cucc">
    <div class="tip">
      <div></div>
      <span>月度平均标号对比</span>
    </div>
    <div :id="'myChart' + index" style="height: 80%"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { averageGradeByMonth } from "@/api/home/home";
import { getToday, getMonth, getYear } from "@/utils/dateUtil";
import moment from "moment";
var chartDom;
var option;
export default {
  name: "AverageGrade",
  props: {
    index: {
      type: String,
      default: "0",
    },
  },
  data() {
    return {
      xdata: [],
      ydata1: [],
      ydata2: [],
    };
  },
  computed: {
    ...mapState(["app"]),
  },
  mounted() {
    this.getData();
    this.echartInit();
    setInterval(() => {
      this.xdata = [];
      this.ydata1 = [];
      this.ydata2 = [];
      this.getData();
      this.echartInit();
    }, this.app.timing);
  },
  methods: {
    getData() {
      averageGradeByMonth({
        year: getYear(),
      }).then((resp) => {
        if (resp && resp.data.success) {
          var data = resp.data.data;
          if (!data || !data.list) {
            return false;
          }
          data.list.forEach((item) => {
            this.ydata1.push(item.value.toFixed(2));
            this.ydata2.push(item.valueLastYear.toFixed(2));
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
              color: "#27657D",
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
            name: "标号",
            min: 30,
            max: 36,
            splitLine: {
              show: true,
              lineStyle: {
                color: ["rgba(228,228,228,0.4)", "rgb(228,228,228,0.4)"],
                type: "dashed",
              },
            },
            axisLabel: {
              color: "#fff",
              fontSize: 26,
              fontFamily: this.$store.state.app.echartFontFamily,
            },
            nameTextStyle: {
              fontSize: 26,
              color: "#fff",
              fontFamily: this.$store.state.app.echartFontFamily,
            },
            // data:['10','20','30','40']
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
            data: this.ydata1,
            color: "#5cb496",
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
                    color: "#4690ff",
                  },
                  {
                    offset: 1,
                    color: "#045ce0",
                  },
                ],
                global: false,
              },
            },
          },
          {
            name: year - 1 + "",
            type: "bar",
            barGap: 0,
            stack: "2",
            emphasis: {
              focus: "series",
            },
            data: this.ydata2,
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
                    color: "#b4baff",
                  },
                  {
                    offset: 1,
                    color: "#7179cc",
                  },
                ],
                global: false,
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
    background-color: #cccb87;
    margin-right: 18px;
  }

  span {
    color: #a8c4cd;
    font-size: 26px;
  }
}
</style>
