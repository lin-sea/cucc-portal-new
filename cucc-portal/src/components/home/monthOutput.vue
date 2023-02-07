<template>
  <div class="title-cucc">
    <div class="title-box" :style="{ fontFamily: app.echartFontFamily }">
      <img :src="titleImg" alt=".." />
      <span>当月生产标号对比</span>
    </div>
    <div class="label-1">
      <el-select
        :popper-append-to-body="false"
        v-model="month"
        placeholder="请选择"
      >
        <el-option
          v-for="item in select"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div :id="'myChart' + index" style="height: 80%"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { deliverGoodsByGood } from "@/api/home/home";
import moment from "moment";
import titleImg from "../../assets/homeImg/newSmallTitle.png";

// import { intToChinese } from '@/utils/commonUtil'
var chartDom;
var option;
export default {
  name: "MonthOutput",
  props: {
    index: {
      type: String,
      default: "0",
    },
  },
  data() {
    return {
      titleImg,
      xAxis: [
        "C10",
        "C15",
        "C20",
        "C25",
        "C30",
        "C35",
        "C40",
        "C45",
        "C50",
        "C55",
        "C60",
      ],
      yAxis: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      month: "",
      select: [],
    };
  },
  
  computed: {
    ...mapState(["app"]),
  },
  mounted() {
    this.echartInit();
    this.getData();
    setInterval(() => {
      this.echartInit();
      this.getData();
    }, this.app.timing);
  },
  methods: {
    getData() {
      deliverGoodsByGood({
        date: this.month,
        type: "月",
      }).then((resp) => {
        if (resp && resp.data.success) {
          var data = JSON.parse(resp.data.data);
          if (!data) {
            return false;
          }
          //   console.log(data);
          this.xAxis.forEach((item, index) => {
            data.forEach((item2) => {
              if (item == item2.key) {
                this.yAxis[index] = (item2.quantityTotal / 10000).toFixed(2);
              }
            });
          });
          this.echartSetOption();
        }
      });
    },
    clearData() {},
    echartInit() {
      this.month = moment(new Date()).format("YYYY-MM");
      var year = new Date().getFullYear();
      var m = new Date().getMonth() + 1;
      for (let i = 1; i <= m; i++) {
        var value = year + "-" + (i.toString().length == 1 ? "0" + i : i);
        var label = i + "月生产总方（万方）";
        this.select.push({
          value: value,
          label: label,
        });
      }
      // 基于准备好的dom，初始化echarts实例
      chartDom = this.$echarts.init(
        document.getElementById("myChart" + this.index)
      );
    },
    echartSetOption() {
      var value = [];
      this.yAxis.forEach((item) => {
        value.push({
          value: item,
          itemStyle: {
            // color: "#02e5f8",
            shadowColor: "#91cc75",
            borderType: "dashed",
            // opacity: 0.5,
          },
        });
      });
      option = {
        // title: { text: '在Vue中使用echarts' },
        tooltip: {},
        grid: {
          left: "2%",
          right: "2%",
          bottom: "2%",
          containLabel: true,
        },
        xAxis: {
          data: this.xAxis,
          axisLabel: {
            color: "#5cacc5",
            fontSize: this.$store.state.app.echartfontSizeX,
            fontFamily: this.$store.state.app.echartFontFamily,
          },
        },
        yAxis: {
          splitLine: {
            show: true,
            lineStyle: {
              color: ["rgba(228,228,228,0.4)", "rgb(228,228,228,0.4)"],
              type: "dashed",
            },
          },
          name: "万方",
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
        textStyle: {
          fontFamily: this.$store.state.app.echartFontFamily,
          color: "#FFF",
          fontSize: 26,
        },
        series: [
          {
            name: "发货量",
            type: "bar",
            // color: "rgb(238,203,124)",
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
                    color: "rgb(143,255,145)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgb(143,255,145)", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            data: value,
          },
        ],
      };
      // 绘制图表
      chartDom.setOption(option);
    },
  },
  watch: {
    month() {
      //   console.log(1111)
      if (!this.month) {
        return false;
      }
      this.getData();
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

/deep/ .label-1 {
  position: absolute;
  margin-top: 3px;
  margin-left: 620px;
  z-index: 5;

  .el-select {
    width: 244px;
  }

  .el-select-dropdown__item {
    font-size: 26px;
  }

  .el-input__inner {
    font-size: 26px;
  }

  /* font-family: 'font1'; */
}

.select {
  background-color: #1b7179;
}

/deep/ .el-input--suffix .el-input__inner {
  background-color: #1b7179;
  font-family: "font1";
  color: white;
  border: 0px;
}
</style>
