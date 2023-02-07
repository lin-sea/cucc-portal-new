<template>
  <div class="title-cucc1" :style="{ fontFamily: app.echartFontFamily }">
    <div class="cucc-con">
      <div class="title-box">
        <img :src="titleImg" alt=".." />
        <span>当日实时生产总方</span>
      </div>

      <div class="pro-num">
        <img :src="topBg" alt=".." class="pro-bg" />
        <img :src="waterFather" alt=".." class="water-father" />
        <div :id="'mychart' + index" class="mychart-progress"></div>
        <span class="left-text">计划生产方量</span>
        <span class="left-num">{{ planTotal }}</span>
        <span class="right-text">实际生产方量</span>
        <span class="right-num">{{ actualTotal }}</span>
      </div>

      <!-- <div class="con-box">
        <div class="con-left">
          <div class="con-text">泵送</div>
          <div class="con-num" style="color: #fcb31e">
            {{ bsTotal }}
          </div>
          <div class="con-text">非泵送</div>
          <div class="con-num" style="color: #46ede8">
            {{ fbsTotal }}
          </div>
        </div>
        <div class="con-progress" :style="{ fontFamily: app.echartFontFamily }">发货进度</div>
        <div id="chart-progress" class="chart-progress"></div>
      </div> -->
      <div class="con">
        <div class="con1">
          <div class="con-text">
            <span>计划泵送</span>
            <span>实际泵送</span>
          </div>

          <div class="con-num">
            <div style="color:'#FCB31E'">{{dataObj.bsPlanNum}}</div>
            <div></div>
            <div style="color:'#FCB31E'">{{dataObj.bsActualNum}}</div>
            <span class="bl">{{dataObj.bsPercent}}</span>
          </div>
        </div>
        <div class="con2">
          <div class="con-text">
            <span>计划非泵送</span>
            <span>实际非泵</span>
          </div>
          <div class="con-num">
            <div style="color:'#46EDE8'">{{dataObj.fbsPlanNum}}</div>
            <div></div>
            <div style="color:'#46EDE8'">{{dataObj.fbsActualNum}}</div>
            <span class="bl">{{dataObj.fbsPercent}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import { summaryRealTimeInMixingStation } from "@/api/detail/detail";
import { getToday } from "@/utils/dateUtil";
import titleImg from "../../assets/detailImg/title.png";
import topBg from "../../assets/detailImg/topBg.png";
import waterFather from "../../assets/detailImg/water.png";
let chartDom;
let progressDom;
export default {
  name: "DailyTotalVolume",
  props: {
    index: {
      type: String,
      default: "0",
    },
  },
  data() {
    return {
      waterFather,
      titleImg,
      topBg,
      mixingStation: "",
      planTotal: "",
      difference: "",
      percentage: "",
      fbsTotal: "",
      bsTotal: "",
      actualTotal: "",
      dataObj: {}
    };
  },
  computed: {
    ...mapState(["app"]),
  },
  mounted() {
    this.getData();
    chartDom = this.$echarts.init(
      document.getElementById("mychart" + this.index)
    );
    progressDom = this.$echarts.init(document.getElementById("chart-progress"));
  },

  methods: {
    getData() {
      this.mixingStation = this.$route.query.mixingStation;
      summaryRealTimeInMixingStation({
        // date: getToday(),
        mixingStation: this.$route.query.mixingStation,
      }).then((resp) => {
        if (resp && resp.status === 200) {
          const { data } = resp;
          this.dataObj = data
          if (!data) return false;
          this.actualTotal = data.actualNum.toFixed(0);
          this.bsTotal = data.bsPlanNum.toFixed(0);
          this.fbsTotal = data.fbsPlanNum.toFixed(0);
          // this.percentage = (data.percentage * 100).toFixed(0);
          // this.difference = data.difference.toFixed(0);
          this.planTotal = data.planNum.toFixed(0);
          this.setCharts();
        }
      });
    },

    setCharts() {
      const numValue = this.actualTotal / this.planTotal;
      const option = {
        series: [
          {
            type: "liquidFill", //水位图
            radius: "70%", //显示比例
            center: ["49%", "54%"], //中心点
            amplitude: 20, //水波振幅
            data: [numValue, numValue], // data个数代表波浪数
            color: [
              {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#446bf5",
                  },
                  {
                    offset: 1,
                    color: "#2ca3e2",
                  },
                ],
                globalCoord: false,
              },
            ], //波浪颜色
            backgroundStyle: {
              borderWidth: 1, //外边框
              // borderColor: '#23cc72', //边框颜色
              color: "RGBA(51, 66, 127, 0.7)", //边框内部填充部分颜色
            },
            label: {
              //标签设置
              position: ["50%", "45%"],
              formatter: this.actualTotal / this.planTotal, //显示文本,
              textStyle: {
                fontSize: "32px", //文本字号,
                color: "#fff",
              },
            },
            outline: {
              // show: false
              borderDistance: 0,
              itemStyle: {
                borderWidth: 2,
                borderColor: "#112165",
              },
            },
          },
        ],
      };

      const value = (this.percentage / 100).toFixed(1);
      let angle = 0;
      const progressOption = {
        title: {
          text: "{a|" + value + "}{c|%}",
          x: "center",
          y: "center",
          textStyle: {
            rich: {
              a: {
                fontSize: 25,
                color: "#29EEF3",
                fontWeight: "bold",
              },
              c: {
                fontSize: 25,
                color: "#29EEF3",
                fontWeight: "bold",
              },
            },
          },
        },
        series: [
          {
            name: "",
            type: "custom",
            coordinateSystem: "none",
            renderItem: function (params, api) {
              return {
                type: "arc",
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: (Math.min(api.getWidth(), api.getHeight()) / 1.5) * 0.65,
                  startAngle: ((0 + -angle) * Math.PI) / 180,
                  endAngle: ((360 + -angle) * Math.PI) / 180,
                },
                style: {
                  stroke: "#0CD3DB",
                  fill: "transparent",
                  lineWidth: 4.5,
                },
                silent: true,
              };
            },
            data: [0],
          },
          {
            name: "",
            type: "pie",
            radius: ["75%", "60%"],
            silent: true,
            clockwise: true,
            startAngle: 90,
            z: 0,
            zlevel: 0,
            label: {
              normal: {
                position: "center",
              },
            },
            data: [
              {
                value: value,
                name: "",
                itemStyle: {
                  normal: {
                    color: {
                      // 完成的圆环的颜色
                      colorStops: [
                        {
                          offset: 0,
                          color: "#4FADFD", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#28E8FA", // 100% 处的颜色
                        },
                      ],
                    },
                  },
                },
              },
              {
                value: 100 - value,
                name: "",
                label: {
                  normal: {
                    show: false,
                  },
                },
                itemStyle: {
                  normal: {
                    color: "#173164",
                  },
                },
              },
            ],
          },
          {
            name: "",
            type: "gauge",
            radius: "83%",
            center: ["50%", "50%"],
            startAngle: 0,
            endAngle: 360,
            splitNumber: 8,
            hoverAnimation: true,
            axisTick: {
              show: false,
            },
            splitLine: {
              length: "110%",
              lineStyle: {
                width: 1,
                color: "rgba(0,0,0,0.2)",
              },
            },
            axisLabel: {
              show: false,
            },
            pointer: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                opacity: 0,
              },
            },
            detail: {
              show: false,
            },
            data: [
              {
                value: 0,
                name: "",
              },
            ],
          },
        ],
      };
      const progressOption1 = {
        title: {
          text: value + "%",
          x: "center",
          y: "center",
          textStyle: {
            fontSize: 22,
            color: "#fff",
          },
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: ["64%", "48%"],
            silent: true,
            clockwise: false,
            startAngle: 90,
            z: 0,
            zlevel: 0,
            label: {
              normal: {
                position: "center",
              },
            },
            data: [
              {
                value: value,
                name: "",
                itemStyle: {
                  normal: {
                    color: {
                      // 完成的圆环的颜色
                      colorStops: [
                        {
                          offset: 0,
                          color: "#4FADFD", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#28E8FA", // 100% 处的颜色
                        },
                      ],
                    },
                  },
                },
              },
              {
                value: 100 - value,
                name: "",
                label: {
                  normal: {
                    show: false,
                  },
                },
                itemStyle: {
                  normal: {
                    color: "#173164",
                  },
                },
              },
            ],
          },
          {
            name: "",
            type: "gauge",
            radius: "100%",
            center: ["50%", "50%"],
            startAngle: 0,
            endAngle: 359.9,
            splitNumber: 12,
            hoverAnimation: true,
            axisTick: {
              show: false,
            },
            splitLine: {
              length: 60,
              lineStyle: {
                width: 10,
                color: "#061740",
              },
            },
            axisLabel: {
              show: false,
            },
            pointer: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                opacity: 0,
              },
            },
            detail: {
              show: false,
            },
            data: [
              {
                value: 0,
                name: "",
              },
            ],
          },
          {
            name: "",
            type: "pie",
            startAngle: 90,
            radius: ["70%", "72%"],
            hoverAnimation: false,
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
              },
            },
            data: [
              {
                value: 2.5,
                name: "",
                itemStyle: {
                  normal: {
                    color: " #02B1FF",
                    opacity: 0.5,
                  },
                },
              },
              {
                value: 7.5,
                name: "",
                itemStyle: {
                  normal: {
                    color: " #fff",
                    opacity: 0.1,
                  },
                },
              },
            ],
          },
          {
            name: "",
            type: "gauge",
            radius: "93%",
            center: ["50%", "50%"],
            startAngle: 0,
            endAngle: 90,
            splitNumber: 1,
            hoverAnimation: true,
            axisTick: {
              show: false,
            },
            splitLine: {
              length: 30,
              lineStyle: {
                width: 5,
                color: "#02B1FF",
              },
            },
            axisLabel: {
              show: false,
            },
            pointer: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                opacity: 0,
              },
            },
            detail: {
              show: false,
            },
            data: [
              {
                value: 2.5,
                name: "",
              },
            ],
          },
        ],
      };
      chartDom && chartDom.setOption(option);
      progressDom && progressDom.setOption(progressOption);
    },
  },
  watch: {},
};
</script>

<style lang="less" scoped>
.con {
  margin: 0 auto;
  width: 750px;
  .con1{
    .con-num {
      color: #FCB31E;
    }
  }
  .con2{
    .con-num {
      color: #46EDE8;
    }
  }
  .con1,.con2 {
    margin-top: 36px;
    width: 100%;
    .con-text {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      font-size: 36px;
      margin-bottom: 12px;
      span:nth-child(1) {
        margin-left: 10px;
      }
      span:nth-child(2) {
        position: absolute;
        left: 670px;
      }
    }
    .con-num {
      width: 750px;
      height: 44px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 28px;
      position: relative;
      .bl {
        position: absolute;
        left: 338px;
        top: -12px;
        display: inline-block;
      }
      div:nth-child(1) {
        width: 195px;
        height: 100%;
        background: url("../../assets/detailImg/left-box.png") no-repeat;
        line-height: 44px;
      }

      div:nth-child(2) {
        width: 350px;
        height: 100%;
        background: url("../../assets/detailImg/left-line.png") no-repeat;
        margin-top: 18px;
      }
      div:nth-child(3) {
        width: 195px;
        height: 100%;
        line-height: 44px;
        background: url("../../assets/detailImg/left-box.png") no-repeat;
      }
    }
  }
}
.title-box {
  height: 63px;
  img {
    height: 100%;
    width: 814px;
  }
}
.chart-progress {
  width: 160px;
  height: 160px;
  margin-top: 30px;
  // background-color: #132149;
}
.mychart-progress {
  width: 134px;
  height: 134px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -104px;
}
.pro-num {
  padding: 0 112px;
  // height: 400px;
  position: relative;
  margin-top: 110px;
  .pro-bg {
    width: 100%;
  }

  .water-father {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -104px;
    z-index: 3;
  }
  span,
  div {
    position: absolute;
  }

  .left-text {
    left: 55px;
    top: 45px;
    font-size: 28px;
  }
  .left-num {
    left: 116px;
    top: -4px;
    font-size: 40px;
  }

  .right-text {
    right: 64px;
    top: 45px;
    font-size: 28px;
  }

  .right-num {
    right: 116px;
    top: -4px;
    font-size: 40px;
  }
}

.con-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 130px;
  margin-top: 18px;
  .con-left {
    div {
      margin-bottom: 20px;
    }
    .con-text {
      font-size: 36px;
      text-align: left;
    }
    .con-num {
      width: 194px;
      height: 44px;
      background: url(../../assets/detailImg/numBg.png);
      text-align: center;
      line-height: 44px;
      font-size: 28px;
    }
  }
  .con-progress {
    width: 210px;
    height: 90px;
    background: url(../../assets/detailImg/jiantou.png);
    margin-top: 30px;
    margin-left: 26px;
    font-size: 35px;
    font-family: PangMenZhengDao-3;
    font-weight: 400;
    color: #ccdcde;
    text-align: center;
    line-height: 90px;
  }
}
</style>
