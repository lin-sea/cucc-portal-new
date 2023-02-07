<template>
  <div class="title-cucc">
    <div class="title-box">
      <img :src="titleImg" alt="..">
      <span :style="{ fontFamily: app.echartFontFamily }">当日站点实时生产方量对比</span>
    </div>
    <div :id="'myChart' + index" style="height: 90%"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { queryDailyData } from "@/api/home/home";
import { getToday } from "@/utils/dateUtil";
import titleImg from '../../assets/homeImg/newBigTitle.png'
var app = {};
let chartDom;
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
export default {
  name: "BsDaliyVolume",
  props: {
    index: {
      type: String,
      default: "0",
    },
  },
  data() {
    return {
      titleImg: titleImg,
      xAxisData: [],
      actualNumY: [],
      bsActualNumY: [],
      bsPlanNumY: [],
      fbsActualNumY: [],
      fbsPlanNumY: [],
      planNumY: [],
      fsjdY: [],
      planData: [],
      actData: [],
      max1: 0,
      max2: 0,
    };
  },
  
  computed: {
    ...mapState(["app"]),
  },
  mounted() {
    this.getData();
    this.echartInit();
    setInterval(()=>{
      this.clearData()
      this.getData();
      this.echartInit();
    },this.app.timing)
  },
  methods: {
    getData() {
      queryDailyData({
        date: getToday(),
      }).then((resp) => {
        if (resp && resp.data.success) {
          var data = JSON.parse(resp.data.data);
          if (!data || !data.list) {
            return false;
          }
          const planAll = data.list.map(item=> {
            return item.fbsPlanNum + item.bsPlanNum
          })
          const actNum = data.list.map(item=> {
            return item.bsActualNum + item.fbsActualNum
          })
          
          this.planData = planAll
          this.actData = actNum
          const xData = data.list.map(item=>{ return item.name.substr(0,item.name.length -1 ) })
          this.xAxisData = xData
          this.fsjdY = []
          data.list.forEach((item) => {
            // this.xAxisData.push(item.name);
            this.planNumY.push(item.planNum);
            this.actualNumY.push(item.actualNum);
            this.bsActualNumY.push(item.bsActualNum);
            this.bsPlanNumY.push(item.bsPlanNum);
            this.fbsActualNumY.push(item.fbsActualNum);
            this.fbsPlanNumY.push(item.fbsPlanNum);
            this.max1 = this.getMax(this.max1, item.planNum);
            this.max1 = this.getMax(this.max1, item.actualNum);
            this.max1 = this.getMax(this.max1, item.bsActualNum);
            this.max1 = this.getMax(this.max1, item.fbsActualNum);
            this.max1 = this.getMax(this.max1, item.fbsPlanNum);
            this.max1 = this.getMax(this.max1, item.bsPlanNum);
            var jd = (
              ((item.bsActualNum + item.fbsActualNum) /
                (item.bsPlanNum + item.fbsPlanNum)) *
              100
            ).toFixed(2);
            jd = isNaN(jd) ? 0 : jd;


            this.max2 = this.getMax(this.max2, jd);
            // console.log(this.max2, jd)
            this.fsjdY.push(jd);
          });
          this.echartSetOption();
        }
      });
    },
    getMax(val1, val2) {
      if (val1 * 1 > val2 * 1) {
        return val1;
      }
      return val2;
    },
    clearData() {
      this.xAxisData = [];
      this.actualNumY = [];
      this.bsActualNumY = [];
      this.bsPlanNumY = [];
      this.fbsActualNumY = [];
      this.fbsPlanNumY = [];
      this.planNumY = [];
      this.fsjdY = [];
    },
    echartInit() {
      // 基于准备好的dom，初始化echarts实例
      chartDom = this.$echarts.init(
        document.getElementById("myChart" + this.index)
      );
    },
    echartSetOption() {
      this.max1 = Math.ceil(this.max1 / 6) * 6
      this.max2 = Math.ceil(this.max2 / 6) * 6
      option = {
        grid: {
          left: "3.2%",
          right: "4%",
          bottom: "0%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          right: 70,
          data: [
            // "生产总量",
            "计划方量",
            "发送方量",
            "发送进度",
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
            data: this.xAxisData,
            axisLabel: {
              fontSize: this.$store.state.app.echartfontSizeX,
              color: "#fff",
              fontSize:26,
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
            splitNumber: 6,
            name: '方',
            min: 0,
            max: this.max1,
            interval: Math.ceil(this.max1 / 6),
            axisLabel: {
              color: '#fff',
              fontSize: 26,
              fontFamily: this.app.echartFontFamily
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgb(228,228,228,0.4)",
                type: "dashed",
              },
            },
            nameTextStyle: {
              fontSize: 26,
              fontFamily: this.app.echartFontFamily

            }
          },
          {
            type: "value",
            // splitLine: false,
            splitNumber: 6,
            min: 0,
            max: this.max2,
            interval: Math.ceil(this.max2 / 6),
            axisLabel: {
              formatter: "{value} %",
              color: '#fff',
              fontSize: 26,
              fontFamily: this.app.echartFontFamily

            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ["rgba(228,228,228,0.4)", "rgb(228,228,228,0.4)"],
                type: "dashed",
              },
            },
            nameTextStyle: {
              fontSize: 20,
              fontFamily: this.app.echartFontFamily

            }
          },
        ],
        series: [
         
          {
            name: "计划方量",
            barWidth: 24,
            type: "bar",
            stack: "jhfl",
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgb(216,78,251)' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgb(181,100,238)' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            },
            // label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: this.planData,
          },
          
          {
            name: "发送方量",
            type: "bar",
            stack: "sjfl",
            barWidth: 24,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgb(143,255,145)' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgb(143,255,145)' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            },
            // label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: this.actData,
          },
          {
            name: "发送进度",
            type: "line",
            color: 'rgb(203,86,69)',
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 4

                }
              }
            },
            // label: labelOption,
            yAxisIndex: 1,
            emphasis: {
              focus: "series",
            },
            data: this.fsjdY,
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
    margin-top: 20px;
    width: 100%;
    height: 100%;
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
