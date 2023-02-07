<template>
  <div class="title-cucc" :style="{ fontFamily: app.echartFontFamily }">
    <div class="title-box">
      <img :src="titleImg" alt="..">
      <span>当年生产剩回方量</span>
    </div>
    <div class="label-1">剩回方量: {{ shTotalThisMonth }}万方</div>
    <div class="label-4">退货方量: {{ thTotalThisMonth }}万方</div>
    <!-- <div class="label-5">未签收方量: {{ (thTotalThisMonth - qsTotalThisMonth).toFixed(2) }}</div> -->

    <div :id="'myChart' + index" style="height: 80%"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { deliverGoods } from "@/api/home/home";
import moment from "moment";
import titleImg from '../../assets/homeImg/newSmallTitle.png'
var chartDom;
var option;
export default {
  name: "SiteYearBack",
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
      thTotalThisMonth: 0,
      shTotalThisMonth: 0,
    };
  },
  mounted() {
    this.echartInit();
    this.getData();
  },
  computed: {
    ...mapState(["app"]),
  },
  methods: {
    getData() {
      var self = this;
      var month = new Date().getMonth() + 1;
      var year = moment(new Date()).format("YYYY");
      var shMap = {};
      this.shTotalThisMonth = 0;
      this.thTotalThisMonth = 0;
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
            this.shTotalThisMonth = this.shTotalThisMonth + (data.shTotalThisMonth / 10000)
            this.thTotalThisMonth = this.thTotalThisMonth + (data.thTotalThisMonth / 10000)
            data.list.forEach((item) => {
              if (shMap[item.name]) {
                shMap[item.name] = shMap[item.name] + item.shThisMonth;
              } else {
                shMap[item.name] = item.shThisMonth;
              }
            });
            m++;
            // console.log(m, month);
            if (m == month) {
              // console.log(shMap);
              var keys = Object.keys(shMap);
              keys.forEach((item) => {
                self.data.push({
                  value: shMap[item],
                  name: item.substr(0,item.length -1),
                });
              });
              // console.log(this.shTotalThisMonth, this.thTotalThisMonth)
              this.shTotalThisMonth = (this.shTotalThisMonth).toFixed(2)
              this.thTotalThisMonth = (this.thTotalThisMonth).toFixed(2)
              self.echartSetOption();
            }
          }
        });
      }
    },
    clearData() { },
    echartInit() {
      // 基于准备好的dom，初始化echarts实例
      chartDom = this.$echarts.init(
        document.getElementById("myChart" + this.index)
      );
    },
    echartSetOption() {
      var self = this;
      option = {
        title: {
          textAlign: 'left'
        },
        //   title: {
        //     text: 'Referer of a Website',
        //     subtext: 'Fake Data',
        //     left: 'center'
        //   },
        tooltip: {
          trigger: "item",
          formatter: item => {
            if (item.seriesIndex === 1) {
              return `${item.data.name}: ${item.data.value}`
            }
            if (item.seriesIndex === 0) {
              return ''
            }
            return ''
          }
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
            top: '40',
            itemGap: 30,
            textStyle: {
              fontFamily: this.$store.state.app.echartFontFamily,
              color: "#fff",
              fontSize: 28,
            },
            data: self.data.slice(0, 7),
            formatter: name => {
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
            top: '40',
            itemGap: 30,
            textStyle: {
              fontFamily: this.$store.state.app.echartFontFamily,
              color: "#fff",
              fontSize: 28,
            },
            data: self.data.slice(7, 14),
            formatter: name => {
              let value = "";
              self.data.forEach((item) => {
                if (item.name === name) {
                  value = (item.value / 10000).toFixed(2);
                }
              });
              return name + " " + value;
            },
          }
        ],
        series: [
          {
            name: '',
            type: 'pie',
            color: 'rgb(6,45,218)',
            radius: ["0", '25%'],
            center: ['25%', '50%'],
            label: {
              position: 'center',
              fontSize: 27,
              color: '#fff',
              formatter: this.shTotalThisMonth
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1, name: '剩回方量' },
            ]
          },
          {
            // name: "Access From",
            type: "pie",
            radius: ["30%", "60%"],
            center: ['25%', '50%'],
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
            center: ["25%", "50%"], //边框位置
            labelLine: {
              normal: {
                show: false
              }
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

.label-1 {
  color: #5cacc5;
  font-size: 26px;
  position: absolute;
  margin-top: 3px;
  margin-left: 100px;
  text-align: left;
  z-index: 5;
  width: 240px;
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

.label-4 {
  color: #5cacc5;
  font-size: 26px;
  position: absolute;
  margin-top: 3px;
  margin-left: 330px;
  z-index: 5;
  width: 240px;
  /* font-family: 'font1'; */
}

.label-5 {
  position: absolute;
  margin-top: 3px;
  margin-left: 450px;
  z-index: 5;
  width: 200px;
  /* font-family: 'font1'; */
}
</style>
