<template>
  <div>
    <div class="title-cucc">
      <div class="title-box">
        <img :src="titleImg" alt="" />
        <span :style="{ fontFamily: app.echartFontFamily }">
          当日计划生产总方
        </span>
      </div>
      <div style="height: 60%" class="content">
        <div class="con-son">
          <div class="card2_left" :style="{ fontFamily: app.echartFontFamily }">
            <div class="left_num">
              {{ Number(planData.planTotal).toFixed(0) }}
              <span>方</span>
            </div>
            <div class="card-text">开盘计划总量</div>
          </div>
        </div>
        <div class="con-son">
          <div
            class="card2_right1"
            :style="{ fontFamily: app.echartFontFamily }"
          >
            <div class="right_num1">
              {{ fbsTotal }}
              <span>方</span>
            </div>
            <div class="card-text">非泵</div>
          </div>
          <div
            class="card2_right2"
            :style="{ fontFamily: app.echartFontFamily }"
          >
            <div class="right_num2">
              {{ bsTotal }}
              <span>方</span>
            </div>
            <div class="card-text">泵送</div>
          </div>
        </div>
      </div>
      <div class="pro-box">
        <el-row type="flex" align="middle">
          <el-col :span="8" :style="{ fontFamily: app.echartFontFamily }">
            <div
              style="
                text-align: right;
                margin-right: 10px;
                color: #fff;
                font-size: 30px;
              "
            >
              当日计划完成率
            </div>
          </el-col>
          <el-col :span="12" style="margin-top: 10px">
            <el-progress
              :percentage="percentage"
              :color="customColor"
              :style="{ fontFamily: app.echartFontFamily }"
            ></el-progress>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
import { queryDailyData, getProPlan } from "@/api/home/home";
import { getToday } from "@/utils/dateUtil";
import titleImg from "../../assets/homeImg/newSmallTitle.png";
import proImg1 from "../../assets/homeImg/proNum1.png";
import proImg2 from "../../assets/homeImg/proNum2.png";
import proImg3 from "../../assets/homeImg/proNum3.png";
import proImg4 from "../../assets/homeImg/proNum4.png";

export default {
  name: "DaliyVolume",
  data() {
    return {
      titleImg,
      proImg1,
      proImg2,
      proImg3,
      proImg4,
      percentage: 20,
      customColor: "#409eff",
      actualTotal: "",
      bsTotal: "",
      fbsTotal: "",
      planTotal: "",
      planData: {},
    };
  },

  computed: {
    ...mapState(["app"]),
  },
  mounted() {
    this.getData();
    setInterval(() => {
      this.getData();
    }, this.app.timing);
  },
  methods: {
    getData() {
      getProPlan().then((res) => {
        const { data } = res;
        this.planData = data;
      });
      queryDailyData({
        date: getToday(),
      }).then((resp) => {
        if (resp && resp.data.success) {
          var data = JSON.parse(resp.data.data);
          if (!data || !data.list) {
            return false;
          }
          this.actualTotal = data.actualTotal.toFixed(0);
          this.bsTotal = data.bsTotal.toFixed(0);
          this.fbsTotal = data.fbsTotal.toFixed(0);
          this.percentage = data.percentage.toFixed(2) * 1;
          this.planTotal = data.planTotal.toFixed(0);
        }
      });
    },
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
      background: url("../../assets/homeImg/planLeft.png") no-repeat;
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
