<template>
  <div class="title-cucc">
    <h2>非泵送实时生产总方</h2>
    <div :id="'myChart' + index" style="height: 80%"></div>
  </div>
</template>

<script>
import { queryDailyData } from "@/api/home/home";
import { getToday } from "@/utils/dateUtil";
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
  name: "FbsDaliyVolume",
  props: {
    index: {
      type: String,
      default: "0",
    },
  },
  data() {
    return {
      xAxisData: [],
      actualNumY: [],
      bsActualNumY: [],
      bsPlanNumY: [],
      fbsActualNumY: [],
      fbsPlanNumY: [],
      planNumY: [],
      fsjdY: [],
    };
  },
  mounted() {
    this.getData();
    this.echartInit();
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
          data.list.forEach((item) => {
            this.xAxisData.push(item.name);
            this.planNumY.push(item.planNum);
            this.actualNumY.push(item.actualNum);
            this.bsActualNumY.push(item.bsActualNum);
            this.bsPlanNumY.push(item.bsPlanNum);
            this.fbsActualNumY.push(item.fbsActualNum);
            this.fbsPlanNumY.push(item.fbsPlanNum);
            this.fsjdY.push(
              ((item.fbsActualNum / item.fbsPlanNum) * 100).toFixed(2)
            );
          });
          this.echartSetOption();
        }
      });
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
      option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: [
            "生产总量",
            "泵送计划方量",
            "非泵送计划方量",
            "非泵送发送方量",
            "非泵送发送进度",
          ],
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
            data: this.xAxisData,
            axisLabel: {
              fontSize: this.$store.state.app.echartfontSizeX,
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
          },
          {
            type: "value",
            axisLabel: {
              formatter: "{value} %",
            },
          },
        ],
        series: [
          {
            name: "生产总量",
            type: "bar",
            barGap: 0,
            // label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: this.actualNumY,
          },
          {
            name: "泵送计划方量",
            type: "bar",
            // label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: this.bsPlanNumY,
          },
          {
            name: "非泵送计划方量",
            type: "bar",
            // label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: this.fbsPlanNumY,
          },
          {
            name: "非泵送发送方量",
            type: "bar",
            // label: labelOption,
            // yAxisIndex: 1,
            emphasis: {
              focus: "series",
            },
            data: this.fbsActualNumY,
          },
          {
            name: "非泵送发送进度",
            type: "line",
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

<style scoped>
</style>
