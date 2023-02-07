<template>
  <div>
    <div class="title-cucc">
      <div class="title-box">
        <img :src="titleImg" alt=".." />
        <span>当日新增合同量</span>
      </div>

      <!-- <div class="total_num">{{ htData.totalNum }}</div> -->
      <div class="tip">
        <div></div>
        <span>当日新增合同量</span>
      </div>
      <!-- <div :id="'myChart' + index" style="height: 80%"></div> -->
      <div class="con">
        <div class="con-left">
          <span>{{ htData.totalNum }}</span>
          <div>总方量 {{ Number(htData.totalVol).toFixed(0) }}</div>
        </div>

        <div class="con-mid">
          <img :src="day1" alt="" />
          <img :src="day2" alt="" />
          <img :src="day3" alt="" />
        </div>

        <div class="con-right">
          <div>
            <span class="right-text">现金</span>
            <img :src="gash" alt="" />
            <span class="right-num">{{ htData.cashContractNum }}</span>
            <span class="fl"> 方量<span class="cash"> {{ htData.cashContractVolume || 0 }} </span> </span>  
          </div>

          <div>
            <span class="right-text">临时</span>
            <img :src="gash" alt="" />
            <span class="right-num">{{ htData.temporaryContractNum }}</span>  
            <span class="fl"> 方量<span class="ls"> {{ htData.temporaryContractVolume || 0 }} </span> </span>  

          </div>
          <div>
            <span class="right-text">正式</span>
            <img :src="gash" alt="" />
            <span class="right-num">{{ htData.formaliContractNum }}</span>  
            <span class="fl"> 方量<span class="zs"> {{ htData.formalContractVolume || 0 }} </span> </span>  
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
import {
  salesVolumeByMonth,
  saleOrderByMonth,
  getHtData,
} from "@/api/home/home";
import titleImg from "../../assets/homeImg/newSmallTitle.png";
import moneyImg from "../../assets/homeImg/saleNum.png";
import moneyRightImg from "../../assets/homeImg/saleNumRight.png";

import day1 from "../../assets/homeImg/day1.png";
import day2 from "../../assets/homeImg/day2.png";
import day3 from "../../assets/homeImg/day3.png";

import gash from "../../assets/homeImg/gash.png";

import moment from "moment";
let chartDom;
export default {
  name: "saleComparison",
  data() {
    return {
      day1,
      day2,
      day3,
      gash,
      titleImg,
      moneyImg,
      moneyRightImg,
      salesVolumeThisMonth: 284101.26,
      salesVolumeThisYear: 4809195.91,
      conData: {},
      htData: {},
    };
  },

  props: {
    index: {
      type: String,
      default: "",
    },
  },

  computed: {
    ...mapState(["app"]),
  },
  mounted() {
    // this.initChartDom();
    this.getData();
    setInterval(() => {
      this.getData();
    }, this.app.timing);
  },
  methods: {
    initChartDom() {
      chartDom = this.$echarts.init(
        document.getElementById("myChart" + this.index)
      );
    },
    getData() {
      getHtData().then((res) => {
        const { data } = res;
        this.htData = data;
        console.log(data,'zainininini');
        const chartOption = {
          title: {
            text: `方量：${Number(data.totalVol).toFixed(0)}`,
            top: "254px",
            left: "474px",
            textAlign: "center",
            textStyle: {
              color: "#31ABE3",
              fontSize: "30px",
              lineHeight: 30,
              rich: {
                name: {
                  fontSize: 60,
                  color: "#fff",
                  fontFamily: this.app.echartFontFamily,
                },
                value: {
                  fontSize: 30,
                  color: "#31ABE3",
                  fontFamily: this.app.echartFontFamily,
                },
              },
            },
          },
          grid: {
            left: "1%",
            right: "1%",
            bottom: "4%",
          },
          tooltip: {
            trigger: "item",
          },
          legend: {
            show: false,
          },
          series: [
            {
              name: "",
              type: "pie",
              radius: ["55%", "70%"],
              label: {
                show: true,
                fontSize: 24,
                color: "#fff",
                formatter: "{name|{b}}\n{num|数量：{c}}",
                rich: {
                  name: {
                    fontSize: 34,
                    color: "#fff",
                    fontFamily: this.app.echartFontFamily,
                  },
                  num: {
                    fontSize: 36,
                    color: "#31ABE3",
                    fontFamily: this.app.echartFontFamily,
                  },
                  fl: {
                    fontSize: 24,
                    color: "#31ABE3",
                    fontFamily: this.app.echartFontFamily,
                  },
                },
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: "40",
                  fontWeight: "bold",
                },
              },
              labelLine: {
                lineStyle: {
                  color: "rgba(255, 255, 255, 0.3)",
                },
                smooth: 0.2,
                length: 35,
              },
              data: [
                {
                  value: data.cashContractNum,
                  name: "现金",
                  itemStyle: { color: "#00BEDC", fontSize: 28 },
                },
                {
                  value: data.formaliContractNum,
                  name: "正式",
                  itemStyle: { color: "#0BAEFD", fontSize: 18 },
                },
                {
                  value: data.temporaryContractNum,
                  name: "临时",
                  itemStyle: { color: "#A5D465", fontSize: 18 },
                },
              ],
            },
          ],
        };

        chartDom.setOption(chartOption);
      });

      salesVolumeByMonth({
        year: new Date().getFullYear(),
      }).then((resp) => {
        if (resp && resp.data.success) {
          const data = resp.data.data;
          if (!data) return false;
          this.salesVolumeThisMonth = data.salesVolumeThisMonth;
          this.salesVolumeThisYear = data.salesVolumeThisYear;
        }
      });
      const year = moment(new Date()).format("YYYY-MM-DD");
      saleOrderByMonth({ year }).then((res) => {
        if (res.status === 200) {
          const { data } = res;
          this.conData = data;
        }
      });
    },
    clearData() {},
  },
};
</script>

<style lang="less" scoped>
.con {
  display: flex;
  justify-content: flex-start;
  .con-left {
    width: 300px;
    height: 300px;
    background: url("../../assets/homeImg/allFlBg.png") no-repeat;
    margin-left: 66px;
    overflow: hidden;
    margin-top: 60px;
    span {
      font-size: 72px;
      color: #17c69a;
      display: block;
      margin-top: 74px;
    }
    div {
      font-size: 36px;
      margin-top: 50px;
    }
  }
  .con-mid {
    margin-top: 45px;
    margin-left: 40px;
    img {
      display: block;
      margin-bottom: 64px;
    }
  }
  .con-right {
    overflow: hidden;
    width: 500px;
    div {
      margin-left: 40px;
      position: relative;
      img {
        display: block;
      }
      .right-text {
        position: absolute;
        font-size: 33px;
        left: 20px;
        top: -12px;
      }
      .right-num {
        position: absolute;
        font-size: 58px;
        color: #17C69A;
        left: 50px;
        top: 44px;
      }
      .fl {
        position: absolute;
        left: 240px;
        top: -4px;
        font-size: 28px;
        .cash {
          color: #60D4FF;
        } 
        .ls {
          color: #FF6A6A;
        }
        .zs {
          color: #C3D479;
        }
      }
    }
    div:nth-child(1) {
      margin-top: 35px;
    }
    div:nth-child(2) {
      margin-top: 104px;
    }
    div:nth-child(3) {
      margin-top: 106px;
    }
  }
}
.title-cucc {
  // width: 100%;
  // height: 100%;
  position: relative;
}
.total_num {
  position: absolute;
  font-size: 110px;
  color: #fff;
  top: 248px;
  left: 430px;
}
.tip {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 26px;
  width: 80%;
  margin-bottom: 18px;

  div {
    display: inline-block;
    width: 6px;
    height: 20px;
    background-color: #00b0fc;
    margin-right: 18px;
  }

  span {
    color: #6a89af;
    font-size: 26px;
  }
}

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

.content {
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;

  .money-box {
    position: relative;
    margin-top: 58px;
    width: 40%;

    img {
      width: 100%;
    }

    .money-num {
      position: absolute;
      top: 120px;
      left: 50%;
      transform: translateX(-50%);
      background-image: -webkit-linear-gradient(bottom, #f7a6fe, #f372fc);
      font-size: 60px;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .money-text {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 200px;
      font-size: 30px;
      width: 344px;
    }
  }
}

// .content {
//   width: 80%;
//   margin: 70px auto;

//   .con-father {
//     display: flex;
//     justify-content: space-between;
//   }

//   p {
//     // float: left;
//     margin-bottom: 18px;
//     text-align: left;
//     color: #5cacc5;
//   }

//   .con-box {
//     width: 80%;
//     border: 1px solid #2372B0;
//     height: 45px;
//     display: flex;
//     justify-content: space-around;
//     align-items: center;

//     div {
//       width: 18%;
//       height: 30px;
//     }

//     div:nth-child(1) {
//       background-color: #EE71FE;
//     }

//     div:nth-child(2) {
//       background-color: #EE65FF;
//     }

//     div:nth-child(3) {
//       background-color: #EA4EFF;
//     }

//     div:nth-child(4) {
//       background-color: #E13BFC;
//     }

//     div:nth-child(5) {
//       background-color: #E32AFF;
//     }
//   }
// }
</style>
