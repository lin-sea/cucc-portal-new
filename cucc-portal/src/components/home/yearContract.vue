<template>
  <div>
    <div class="title-cucc">
      <div class="tip">
        <div></div>
        <span>年度合同类别销售同比</span>
      </div>
      <div :id="'myChart' + index" style="height: 80%"></div>
    </div>
  </div>
</template>


<script>
import { salesVolumeByContract } from "@/api/home/home";
import { mapState } from "vuex";
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
  name: "YearContract",
  props: {
    index: {
      type: String,
      default: "0",
    },
  },
  data() {
    return {
      formal: "",
      temporary: "",
      microMall: "",
      temporaryLastYear: "",
      formalLastYear: "",
      microMallLastYear: "",
    };
  },
  computed: {
    ...mapState(["app"]),
  },
  mounted() {
    this.echartInit();
    this.getData();
    setInterval(()=>{
      this.echartInit();
    this.getData();
    },this.app.timing)
  },
  methods: {
    echartInit() {
      // 基于准备好的dom，初始化echarts实例
      chartDom = this.$echarts.init(
        document.getElementById("myChart" + this.index)
      );
    },
    getData() {
      salesVolumeByContract({
        year: thisYear,
      }).then((resp) => {
        if (resp && resp.data.success) {
          var data = resp.data.data;
          if (!data) {
            return false;
          }
          //   debugger
          this.formal = (data.formal / 10000).toFixed(2);
          this.temporary = (data.temporary / 10000).toFixed(2);
          this.microMall = (data.microMall / 10000).toFixed(2);
          this.temporaryLastYear = (data.temporaryLastYear / 10000).toFixed(2);
          this.formalLastYear = (data.formalLastYear / 10000).toFixed(2);
          this.microMallLastYear = (data.microMallLastYear / 10000).toFixed(2);
          this.echartSetOption();
        }
      });
    },
    echartSetOption() {
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
          data: [thisYear, lastYear],
          right: 20,
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
            // axisTick: { show: false },
            data: ["正式合同", "临时合同", "微商城"],
            axisLabel: {
              fontSize: this.$store.state.app.echartfontSizeX,
            fontFamily: this.$store.state.app.echartFontFamily,

              color: '#6A89AF',
              interval: 0,
              formatter: function (value) {
                //x轴的文字改为竖版显示
                var str = value.split();
                return str
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "万元",
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
              color:'#fff',
            fontFamily: this.$store.state.app.echartFontFamily,

            }
          },
        ],
        series: [
          {
            name: thisYear,
            type: "bar",
            barGap: 0,
            barWidth: 70,
            // label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: [this.formal, this.temporary, this.microMall],
            itemStyle: {
              normal: {
                label: {
                  formatter: val => {
                    return Number(val.value).toFixed(1)
                  },
                  show: true,
                  position: 'top',
                  textStyle: {
                    fontSize: 24,
                    color: '#fff'
                  }
                },
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

            }
          },
          {
            name: lastYear,
            type: "bar",
            barWidth: 70,
            // stack: "jhfl",
            // label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: [
              this.formalLastYear,
              this.temporaryLastYear,
              this.microMallLastYear,
            ],
            itemStyle: {
              normal: {
                label: {
                  formatter: val => {
                    return Number(val.value).toFixed(1)
                  },
                  show: true,
                  position: 'top',
                  textStyle: {
                    fontSize: 24,
                    color: '#fff'
                  }
                },
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
              },

            }
          },
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
