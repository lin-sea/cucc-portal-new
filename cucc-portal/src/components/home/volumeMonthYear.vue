<template>
  <div>
    <div class="title-cucc">
      <div class="title-box">
        <img :src="titleImg" alt="" />
        <span :style="{ fontFamily: app.echartFontFamily }">
          当日实时生产总方
        </span>
      </div>
      <div style="height: 60%" class="content">
        <div class="con-son">
          <div class="card2_left" :style="{ fontFamily: app.echartFontFamily }">
            <div class="left_num">
              {{ Number(realData.actualTotal).toFixed(0) }}
              <span>方</span>
            </div>
            <div class="card-text">实时生产总量</div>
          </div>
        </div>
        <div class="con-son">
          <div
            class="card2_right1"
            :style="{ fontFamily: app.echartFontFamily }"
          >
            <div class="right_num1">
              {{ Number(realData.bsTotal).toFixed(0) }}
              <span>方</span>
            </div>
            <div class="card-text">泵送</div>
          </div>
          <div
            class="card2_right2"
            :style="{ fontFamily: app.echartFontFamily }"
          >
            <div class="right_num2">
              {{ Number(realData.fbsTotal).toFixed(0) }}
              <span>方</span>
            </div>
            <div class="card-text">非泵</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
import { summaryInYear, deliverGoods, getProReal } from "@/api/home/home";
import moment from "moment";
import { getYear } from "@/utils/dateUtil";
import titleImg from "../../assets/homeImg/newSmallTitle.png";
import yearImg from "../../assets/homeImg/thisYearAll.png";
import monthImg from "../../assets/homeImg/thisMonthAll.png";
import moneyImg from "../../assets/homeImg/redRight.png";
import moneyRightImg from "../../assets/homeImg/redLeft.png";
export default {
  name: "VolumeMonthYear",
  data() {
    return {
      moneyImg,
      moneyRightImg,
      titleImg,
      yearImg,
      monthImg,
      monthTotal: 0,
      yearTotal: 0,
      realData: {}
    };
  },

  computed: {
    ...mapState(["app"]),
  },
  mounted() {
    this.getData();
    this.getYearData();
    setInterval(() => {
      this.getData();
    }, this.app.timing);
  },
  methods: {
    getYearData() {
      const month1 = new Date().getMonth() + 1;
      const year = moment(new Date()).format("YYYY");
      let qsMap = {};
      for (var i = 1; i <= month1; i++) {
        var monthStr = "";
        var m = 0;
        if (i < 10) {
          monthStr = "0" + i;
        } else {
          monthStr = "" + i;
        }
        let date = year + "-" + monthStr;
        deliverGoods({
          month: date,
        }).then((resp) => {
          if (resp && resp.data.success) {
            const data1 = JSON.parse(resp.data.data);
            data1.list.forEach((item) => {
              if (qsMap[item.name]) {
                qsMap[item.name] = qsMap[item.name] + item.qsThisMonth;
              } else {
                qsMap[item.name] = item.qsThisMonth;
              }
            });
            m++;
            if (m == month1) {
              var keys = Object.keys(qsMap);
              keys.forEach((item) => {
                this.yearTotal = this.yearTotal + qsMap[item];
              });
              this.yearTotal = (this.yearTotal / 10000).toFixed(2);
            }
          }
        });
      }
    },
    getData() {
      getProReal().then(res=>{
        const { data } = res
        this.realData = data
      })

      const month = moment(new Date()).format("YYYY-MM");
      deliverGoods({ month }).then((res) => {
        const { data } = res.data;
        const nData = JSON.parse(data);
        this.monthTotal = (nData.qsTotalThisMonth / 10000).toFixed(2);
      });
    },
    // getData() {
    //   summaryInYear({
    //     year: getYear(),
    //   }).then((resp) => {
    //     if (resp && resp.data.success) {
    //       var data = JSON.parse(resp.data.data);
    //       if (!data) {
    //         return false;
    //       }
    //       this.yearTotal = (data.quantityThisYear / 10000).toFixed(2);
    //       var month = new Date().getMonth();
    //       this.monthTotal = (
    //         data.quantityThisYearByMonth[month] / 10000
    //       ).toFixed(2);
    //     }
    //   });
    // },
    clearData() {},
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
    position: absolute;
    font-size: 37px;
    margin: 0;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}

/deep/ .pro-box {
  margin-top: 40px;
  .progressbar {
    .el-progress-bar {
      .el-progress-bar__outer {
        height: 12px;
      }
    }
  }

  .el-col {
    .el-progress {
      .el-progress__text {
        font-size: 32px !important;
        color: white !important;
      }
    }
  }
}

.content {
  display: flex;
  justify-content: flex-start;
  .con-son:nth-child(1) {
    margin-left: 112px;
  }
  .con-son {
    margin-top: 24px;
    width: 100%;
    .card2_left {
      overflow: hidden;
      width: 320px;
      height: 322px;
      background: url("../../assets/homeImg/realLeft.png") no-repeat;
      .left_num {
        margin-top: 190px;
        font-size: 52px;
         background-image: -webkit-linear-gradient(bottom, #d4cd41, white);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        span {
          font-size: 30px;
        }
      }
      .card-text {
        margin-top: 16px;
        font-size: 30px;
      }
    }

    .card2_right1 {
      width: 320px;
      height: 128px;
      background: url("../../assets/homeImg/plan2.png") no-repeat;
      overflow: hidden;
      margin-top: 18px;
      .right_num1 {
        margin-top: 27px;
        margin-left: 127px;
        font-size: 42px;
        background-image: -webkit-linear-gradient(bottom, #d4cd41, white);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        span{
          font-size: 30px;
        }
      }
      .card-text {
        margin-left: 30px;
        font-size: 24px;
      }
    }

    .card2_right2 {
      width: 320px;
      height: 128px;
      background: url("../../assets/homeImg/plan3.png") no-repeat;
      overflow: hidden;
      margin-top: 40px;
      .right_num2 {
        margin-top: 27px;
        margin-left: 127px;
        font-size: 42px;
        background-image: -webkit-linear-gradient(bottom, #d4cd41, white);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        span{
          font-size: 30px;
        }
      }
      .card-text {
        margin-left: 36px;
        font-size: 24px;
      }
    }

    // .card {
    //   position: relative;
    //   width: 45%;
    //   height: 80%;

    //   img {
    //     width: 84%;
    //     height: 82%;
    //   }

    //   .card2 {
    //     position: absolute;
    //     top: 20px;
    //     left: 170px;
    //     // color: rgb(180, 188, 199);

    //     .card-text {
    //       margin-top: -0px;
    //       text-align: left;
    //       font-size: 30px;
    //     }

    //     div:first-child {
    //       text-align: left;
    //       font-size: 54px;
    //       background-image: -webkit-linear-gradient(bottom, #d4cd41, white);
    //       -webkit-background-clip: text;
    //       -webkit-text-fill-color: transparent;
    //     }

    //     span {
    //       font-size: 26px;
    //     }
    //   }
    // }
  }
}
</style>
