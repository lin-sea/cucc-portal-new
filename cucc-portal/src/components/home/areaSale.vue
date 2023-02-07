<template>
  <div class="title-cucc">
    <div class="tip">
      <div></div>
      <span>片区落地销量同比</span>
    </div>
    <div :id="'myChart' + index" style="height: 80%"></div>
  </div>
</template>

<script>
import { salesVolumeByArea } from "@/api/home/home";
import { mapState } from "vuex";
import { getToday,getMonth, getYear } from "@/utils/dateUtil";
import moment from "moment";
var chartDom;
var option;
export default {
  name: "AreaSale",
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
    // this.getData();
    this.echartInit();
    this.getFakeData()
    setInterval(()=>{
      this.xdata=[]
      this.ydata1=[]
      this.ydata2=[]
      this.echartInit();
    this.getFakeData()
    },this.app.timing)

  },
  methods: {
    getFakeData() {
      [{"code":"a14","valueLastYear":790202.33,"name":"溧水公司","difference":-397893.92999999993,"value":392308.4},{"code":"a15","valueLastYear":1167802.2200000002,"name":"西北公司-河西","difference":-533845.3600000001,"value":633956.8600000001},{"code":"a16","valueLastYear":1635806.35,"name":"栖霞公司","difference":-666191.1500000001,"value":969615.2},{"code":"a17","valueLastYear":3699657.9399999995,"name":"江宁公司","difference":-1903728.1199999996,"value":1795929.8199999998},{"code":"a18","valueLastYear":1956050.6699999997,"name":"西北公司-江北","difference":-1051992.4799999997,"value":904058.19}].forEach(item => {
        this.ydata1.push((item.value/10000).toFixed(2))
        this.ydata2.push((item.valueLastYear/10000).toFixed(2))
      })
      this.echartSetOption()
    },
    getData() {
      salesVolumeByArea({
        year: getYear(),
      }).then((resp) => {
        if (resp && resp.data.success) {
          const data = resp.data.data;
          if (!data) {
            return false;
          }
          data.forEach(item => {
            this.ydata1.push((item.value/10000).toFixed(2))
            this.ydata2.push((item.valueLastYear/10000).toFixed(2))
          })
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

        //   data: [
        //     year + "",
        //     year - 1 + ""
        //   ],
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
            data: ['溧水', '河西', '栖霞', '江宁', '江北'],
            axisLabel: {
              fontSize: this.$store.state.app.echartfontSizeX,
            fontFamily: this.$store.state.app.echartFontFamily,
              interval: 0,
              color: '#6A89AF',
              formatter: function (value) {
                //x轴的文字改为竖版显示
                return value.split();
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: '万方',
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
              fontSize: 26,
              color: '#fff',
            fontFamily: this.$store.state.app.echartFontFamily,

            }
          },
        ],
        series: [
          {
            name: year + "",
            barWidth: 50,
            type: "bar",
            barGap: 0,
            stack: "1",
            emphasis: {
              focus: "series",
            },
            data: this.ydata1,
            color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: '#E24AEF' // 0% 处的颜色
                  }, {
                    offset: 1, color: '#FCB8FC' // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
                }
          },
          {
            name: year-1 + "",
            barWidth: 50,
            type: "bar",
            barGap: 0,
            stack: "2",
            emphasis: {
              focus: "series",
            },
            data: this.ydata2,
            color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: '#3A7AF0' // 0% 处的颜色
                  }, {
                    offset: 1, color: '#7ED8FD' // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
                }
          }

        ],
      };
      // 绘制图表
      chartDom && chartDom.setOption(option);
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
    background-color: #00B0FC;
    margin-right: 18px;
  }

  span {
    color: #6A89AF;
    font-size: 26px;
  }

}
</style>
