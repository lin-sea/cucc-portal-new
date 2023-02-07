<template>
  <div class="title-cucc" :style="{ fontFamily: app.echartFontFamily }">
    <div class="title-box">
      <img :src="titleImg" alt="" />
      <span>当年签收方量</span>
    </div>
    <div class="label-1">签收方量: {{ qsTotalThisMonth }}万方</div>
    <div :id="'myChart' + index" style="height: 80%"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { deliverGoods } from "@/api/home/home";
import moment from "moment";
import titleImg from "../../assets/homeImg/newSmallTitle.png";

var chartDom;
var option;
export default {
  name: "SiteYearDelivery",
  props: {
    index: {
      type: String,
      default: "0",
    },
  },
  data() {
    return {
      titleImg: titleImg,
      data: [],
      qsTotalThisMonth: 0,
      qsYearOnYear: "",
      qsMonthOnMonth: "",
    };
  },

  computed: {
    ...mapState(["app"]),
  },
  mounted() {
    this.echartInit();
    this.getData();
  },
  methods: {
    getData() {
      var self = this;
      var month = new Date().getMonth() + 1;
      var year = moment(new Date()).format("YYYY");
      var qsMap = {};
      for (var i = 1; i <= month; i++) {
        var monthStr = "";
        var m = 0;
        if (i < 10) {
          monthStr = "0" + i;
        } else {
          monthStr = "" + i;
        }
        var date = year + "-" + monthStr;
        deliverGoods({
          month: date,
        }).then((resp) => {
          if (resp && resp.data.success) {
            var data = JSON.parse(resp.data.data);
            if (!data || !data.list) {
              return false;
            }
            data.list.forEach((item) => {
              if (qsMap[item.name]) {
                qsMap[item.name] = qsMap[item.name] + item.qsThisMonth;
              } else {
                qsMap[item.name] = item.qsThisMonth;
              }
            });
            m++;
            // console.log(m, month);
            if (m == month) {
              // console.log(qsMap);
              var keys = Object.keys(qsMap);
              keys.forEach((item) => {
                self.qsTotalThisMonth = self.qsTotalThisMonth + qsMap[item];
              });

              const data1 = keys.map((item) => {
                return {
                  value: qsMap[item],
                  name: item.substr(0, item.length - 1),
                };
              });
              this.data = data1
              self.qsTotalThisMonth = (self.qsTotalThisMonth / 10000).toFixed(2)
              self.echartSetOption();
            }
          }
        });
      }
    },
    clearData() {},
    echartInit() {
      // 基于准备好的dom，初始化echarts实例
      chartDom = this.$echarts.init(
        document.getElementById("myChart" + this.index)
      );
    },
    echartSetOption() {
      var self = this;
      option = {
        //   title: {
        //     text: 'Referer of a Website',
        //     subtext: 'Fake Data',
        //     left: 'center'
        //   },
        color: this.$store.state.app.pieColor,
        tooltip: {
          trigger: "item",
          formatter: (item) => {
            if (item.seriesIndex === 1) {
              return `${item.data.name}: ${item.data.value}`;
            }
            if (item.seriesIndex === 0) {
              return "";
            }
            return "";
          },
        },
        textStyle: {
          fontFamily: this.$store.state.app.echartFontFamily,
          color: "#FFFFFF",
        },
        legend: [
          {
            orient: "vertical",
            left: "50%",
            top: "40",
            itemGap: 30,
            textStyle: {
              fontFamily: this.$store.state.app.echartFontFamily,
              color: "#fff",
              fontSize: 28,
            },
            data: self.data.slice(0, 7),
            formatter: (name) => {
              let value = "";
              self.data.forEach((item) => {
                if (item.name === name) {
                  value = (item.value / 10000).toFixed(2);
                }
              });
              return name + " " + value;
            },
          },
          {
            orient: "vertical",
            left: "75%",
            top: "40",
            itemGap: 30,
            textStyle: {
              fontFamily: this.$store.state.app.echartFontFamily,
              color: "#fff",
              fontSize: 28,
            },
            data: self.data.slice(7, 14),
            formatter: (name) => {
              let value = "";
              self.data.forEach((item) => {
                if (item.name === name) {
                  value = (item.value / 10000).toFixed(2);
                }
              });
              return name + " " + value;
            },
          },
        ],
        series: [
          {
            name: "",
            type: "pie",
            color: "rgb(6,45,218)",
            radius: ["0", "25%"],
            center: ["25%", "50%"],
            label: {
              position: "center",
              fontSize: 27,
              color: "#fff",
              formatter: this.qsTotalThisMonth,
            },
            labelLine: {
              show: false,
            },
            data: [{ value: 1, name: "签收方量" }],
          },
          {
            // name: "Access From",
            type: "pie",
            radius: ["30%", "60%"],
            center: ["25%", "50%"],
            data: this.data,
            label: {
              normal: {
                show: false,
                textStyle: {
                  fontFamily: this.$store.state.app.echartFontFamily,
                  color: "#FFFFFF",
                  fontSize: this.$store.state.app.echartfontSizeX,
                },
              },
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
          {
            name: "外边框",
            type: "pie",
            clockWise: false,
            clockWise: false, //顺时加载
            hoverAnimation: false, //鼠标移入变大
            radius: ["64%", "64%"], //边框大小
            center: ["25%", "50%"],
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: 10,
                itemStyle: {
                  normal: {
                    borderWidth: 15,
                    borderColor: "#07125D", //边框颜色
                  },
                },
              },
            ],
          },
        ],
      };
      // 绘制图表
      chartDom.setOption(option);
    },
  },
  watch: {},
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
    top: 0;
    transform: translate(-50%);
  }
}

.label-1 {
  color: #5cacc5;
  font-size: 26px;
  position: absolute;
  margin-top: 3px;
  margin-left: 100px;
  z-index: 5;
  width: 300px;
  /* font-family: 'font1'; */
}

.label-2 {
  position: absolute;
  margin-top: 130px;
  margin-left: 120px;
  z-index: 5;
  width: 200px;
  /* font-family: 'font1'; */
}

.label-3 {
  position: absolute;
  margin-top: 260px;
  margin-left: 120px;
  z-index: 5;
  width: 200px;
  /* font-family: 'font1'; */
}
</style>
