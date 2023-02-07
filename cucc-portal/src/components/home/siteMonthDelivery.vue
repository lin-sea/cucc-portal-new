<template>
  <div class="title-cucc">
    <div class="title-box" :style="{ fontFamily: app.echartFontFamily }">
      <img :src="titleImg" alt=".." />
      <span>当月签收方量</span>
    </div>
    <div class="label-1" :style="{ fontFamily: app.echartFontFamily }">
      签收方量: {{ qsTotalThisMonth }}万方
    </div>
    <!-- <div class="label-2">
      <div class="label-son1">
        <div class="label-son2">
          <div class="label-son3">
            <span>
              <div>同比</div>
              <div>{{ qsYearOnYear }}</div>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="label-3">
      <div class="label-son1">
        <div class="label-son2">
          <div class="label-son3">
            <span>
              <div>环比</div>
              <div>{{ qsMonthOnMonth }}</div>
            </span>
          </div>
        </div>
      </div>
    </div> -->
    <!-- <div class="line"></div> -->
    <div :id="'myChart' + index" style="height: 80%"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { deliverGoods } from "@/api/home/home";
import titleImg from "../../assets/homeImg/newSmallTitle.png";
import moment from "moment";
var chartDom;
var option;
export default {
  name: "SiteMonthDelivery",
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
      qsTotalThisMonth: "",
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
    setInterval(() => {
      this.echartInit();
      this.getData();
    }, this.app.timing);
  },

  methods: {
    getData() {
      const month = moment(new Date()).format("YYYY-MM");
      deliverGoods({
        month: month,
      }).then((resp) => {
        if (resp && resp.data.success) {
          var data = JSON.parse(resp.data.data);
          if (!data) return false;
          this.qsMonthOnMonth = data.qsMonthOnMonth.toFixed(2);
          this.qsTotalThisMonth = (data.qsTotalThisMonth / 10000).toFixed(2);
          this.qsYearOnYear = data.qsYearOnYear.toFixed(2);
          const data1 = data.list.map((item) => {
            return {
              value: item.qsThisMonth,
              name: item.name.substr(0, item.name.length - 1),
            }
          });
          this.data = data1
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
      var self = this;

      // const legendArr = self.data.map(item => {
      //   return { name: `${item.name} ： ${(item.value / 1000).toFixed(2)}` }
      // })
      // console.log(this.data, legendArr, 'legendArr1');

      option = {
        //   title: {
        //     text: 'Referer of a Website',
        //     subtext: 'Fake Data',
        //     left: 'center'
        //   },
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
        color: this.$store.state.app.pieColor,
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
            labelLine: {
              show: false,
            },
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
              show: false,
            },
            data: [
              {
                value: 10,
                itemStyle: {
                  normal: {
                    borderWidth: 15, //设置边框粗细
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

.line {
  position: absolute;
  margin-left: 264px;
  margin-top: 140px;
  width: 6px;
  height: 230px;
  border-right: 4px dashed rgb(72, 78, 89);
}

.label-1 {
  position: absolute;
  color: #5cacc5;
  font-size: 26px;
  margin-top: 3px;
  margin-left: 100px;
  z-index: 5;
  text-align: left;
  width: 300px;
  /* font-family: 'font1'; */
}

.label-2 {
  margin-top: 130px;
  margin-left: 120px;
}

.label-2,
.label-3 {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  // background: linear-gradient(#d3ae39, #ba5f26);
  background: #503315;
  // margin-top: 130px;
  // margin-left: 120px;
  // z-index: 1;
  width: 108px;
  height: 108px;
  border-radius: 50%;

  .label-son1 {
    background-color: #000;
    width: 104px;
    height: 104px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;

    .label-son2 {
      width: 100px;
      height: 100px;
      background: linear-gradient(#d3ae39, #ba5f26);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;

      .label-son3 {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 96px;
        height: 96px;
        border-radius: 50%;
        background-color: #132148;
      }
    }
  }

  /* font-family: 'font1'; */
}

.label-3 {
  // position: absolute;
  margin-top: 260px;
  margin-left: 120px;
  // z-index: 5;
  // width: 200px;
  // height: 200px;
  /* font-family: 'font1'; */
}
</style>
