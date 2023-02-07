<template>
  <div class="title-cucc">
    <div class="title-box">
      <img :src="titleImg" alt=".." />
      <span>当月回款明细</span>
    </div>
    <div :id="'myChart' + index" style="height: 90%"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { paymentCollectionThisMonth } from "@/api/home/home";
import { getToday, getMonth, getYear } from "@/utils/dateUtil";
import titleImg from "../../assets/homeImg/newSmallTitle.png";
import moment from "moment";
var chartDom;
var option;
export default {
  name: "MonthPayment",
  props: {
    index: {
      type: String,
      default: "0",
    },
  },
  data() {
    return {
      titleImg,
      xdata: [],
      ydata: [],
    };
  },

  computed: {
    ...mapState(["app"]),
  },
  mounted() {
    this.getData();
    this.echartInit();
    setInterval(() => {
      this.xdata= [],
      this.ydata= [],
      this.getData();
      this.echartInit();
    }, this.app.timing);
  },
  methods: {
    getData() {
      paymentCollectionThisMonth({
        year: getMonth(),
      }).then((resp) => {
        if (resp && resp.data.success) {
          var data = resp.data.data;
          if (!data) {
            return false;
          }
          data.forEach((item) => {
            this.xdata.push(item.name);
            var value = item.value < 0 ? item.value * -1 : item.value;
            this.ydata.push(value);
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
          right: 8,
          bottom: 18,
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          right: 90,
          textStyle: {
            fontFamily: this.$store.state.app.echartFontFamily,
            color: "rgb(180,188,199)",
            fontSize: this.$store.state.app.echartfontSizeX,
          },
        },
        textStyle: {
          fontFamily: this.$store.state.app.echartFontFamily,
          color: "rgb(180,188,199)",
        },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: this.xdata,
            axisLabel: {
              fontSize: this.$store.state.app.echartfontSizeX,
              fontFamily: this.$store.state.app.echartFontFamily,
              color: "#fff",
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
            name: "万元",
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
            itemStyle: {
              color: "#4FFCBB",
            },
            data: this.ydata,
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
    width: 100%;
    height: 100%;
    margin-top: 20px;
  }

  span {
    color: #5cacc5;
    font-size: 37px;
    position: absolute;
    margin: 0;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
