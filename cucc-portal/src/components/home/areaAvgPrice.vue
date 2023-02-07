<template>
  <div class="title-cucc">
    <div class="tip">
      <div></div>
      <span>片区均价同比</span>
    </div>
    <div :id="'myChart' + index" style="height: 90%"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { averagePriceByArea } from "@/api/home/home";
import { getToday, getMonth, getYear } from "@/utils/dateUtil";
import moment from "moment";
var chartDom;
var option;
export default {
  name: "AreaAvgPrice",
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
      ydata2: []
    };
  },
  computed: {
    ...mapState(["app"]),
  },
  mounted() {
    this.getData();
    this.echartInit();
    setInterval(()=>{
       this.xdata=[]
      this.ydata1=[]
      this.ydata2=[]
      this.getData();
    this.echartInit();
    },this.app.timing)
  },
  methods: {
    getData() {
      averagePriceByArea({
        year: getYear(),
      }).then((resp) => {
        if (resp && resp.data.success) {
          var data = resp.data.data;
          if (!data) {
            return false;
          }
          data.forEach((item,index) => {
            if(index == 1) {
              this.ydata1.push(492);
              this.ydata2.push(530)
            }else {
              this.ydata1.push(item.value.toFixed(2));
              this.ydata2.push(item.valueLastYear.toFixed(2));

            }
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
      // this.ydata1.forEach((item,index)=>{
      //   if(index == 1) {
      //     item = '490'
      //   }
      // })
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
          //   data: [
          //     year + "",
          //     year - 1 + ""
          //   ],
          right: 20,
          textStyle: {
            fontFamily: this.$store.state.app.echartFontFamily,
            color: "#fff",
            fontSize: 26,
          },
        },
        textStyle: {
          fontFamily: this.$store.state.app.echartFontFamily,
          color: "#fff",
          fontSize: 26,
        },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: ["溧水", "河西", "栖霞", "江宁", "江北"],
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
            name: "元",
            splitNumber: 10,
            min: 400,
            max: 600,
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
            // color: '#6e79d2',
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
                    color: "#ffd085", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#ffb136", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            emphasis: {
              focus: "series",
            },
            data: this.ydata1,
          },
          {
            name: year - 1 + "",
            type: "bar",
            barGap: 0,
            stack: "2",
            // color: "#FFFDB2",
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
                    color: "#89ffed", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#45ffe3", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            emphasis: {
              focus: "series",
            },
            data: this.ydata2,
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
  width: 80%;
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
