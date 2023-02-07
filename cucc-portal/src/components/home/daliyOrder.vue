<template>
  <div>
    <div class="title-cucc">
      <div class="title-box" :style="{ fontFamily: app.echartFontFamily }">
        <img :src="titleImg" alt=".." />
        <span>当月/年生产方量</span>

      </div>

      <div class="con">
        <div class="con-left">
          <div class="text">当月</div>
          <div class="num">
            <!-- <span>{{ qsTotalThisMonth }}</span> -->
            <span>{{ infoObj.MonthTotal }}</span>
            <span>万方</span>
          </div>
          <div class="bs">
            <span>泵送</span>  
            <span>{{ Number(infoObj.MonthBS).toFixed(0) }}  方</span>
            <span>{{ infoObj.bsMonthPercent }}</span>
          </div>
          <div class="fb">
            <span>非泵</span>
            <span>{{ Number(infoObj.MonthFBS).toFixed(0) }}  方</span>
            <span>{{ infoObj.fbsMonthPercent }}</span>
          </div>
        </div>
        <div class="con-right">
          <div class="text">当年</div>
          <div class="num">
            <!-- <span>{{ qsTotalThisYear }}</span> -->
            <span> {{ infoObj.YearTotal }} </span>
            <span>万方</span>
          </div>
          <div class="bs">
            <span>泵送</span> 
            <span>{{ Number(infoObj.YearBS).toFixed(0) }}  方</span>
            <span>{{ infoObj.bsYearPercent }}</span>
          </div>
          <div class="fb">
            <span>非泵</span>
            <span>{{ Number(infoObj.YearFBS).toFixed(0) }}  方</span>
            <span>{{ infoObj.fbsYearPercent }}</span>
          </div>
        </div>
      </div>
      <!-- <div class="content" :style="{ fontFamily: app.echartFontFamily }">
        <img :src="dayImg" alt=".." />
        <div class="con-num">{{ addOrder }}</div>
        <div class="con-text">当日新增合同量</div>
      </div> -->
      <!-- <div class="con">
        <div class="con-left"></div>
        <div class="con-right"></div>
      </div> -->
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
import { countNewOrder, deliverGoods, getHtDataBl } from "@/api/home/home";
import { getToday } from "@/utils/dateUtil";
import titleImg from "../../assets/homeImg/newSmallTitle.png";
import dayImg from "../../assets/homeImg/dayNum.png";
import moment from "moment";

export default {
  name: "DaliyOrder",
  data() {
    return {
      addOrder: 0,
      titleImg,
      dayImg,
      qsTotalThisMonth: 0,
      qsTotalThisYear: 0,
      data: {},
      infoObj: {}
    };
  },

  computed: {
    ...mapState(["app"]),
  },
  mounted() {
    this.getData();
    setInterval(() => {
      this.getData();
    }, 120000);
  },
  methods: {
    getData() {
      getHtDataBl().then(res => {
        console.log(res, "获取比例");
        const { data } = res
        this.infoObj = data
      });

      // countNewOrder({
      //   date: getToday(),
      // }).then((resp) => {
      //   if (resp && resp.data.success) {
      //     var data = JSON.parse(resp.data.data);
      //     if (!data) {
      //       return false;
      //     }
      //     this.addOrder = data;
      //   }
      // });

      const month = moment(new Date()).format("YYYY-MM");
      deliverGoods({
        month,
      }).then((resp) => {
        if (resp && resp.data.success) {
          const data = JSON.parse(resp.data.data);
          if (!data) return false;
          this.qsTotalThisMonth = (data.qsTotalThisMonth / 10000).toFixed(2);
        }
      });

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
            if (m == month1) {
              // console.log(qsMap);
              var keys = Object.keys(qsMap);
              keys.forEach((item) => {
                this.qsTotalThisYear = this.qsTotalThisYear + qsMap[item];
              });

              const data1 = keys.map((item) => {
                return {
                  value: qsMap[item],
                  name: item.substr(0, item.length - 1),
                };
              });
              this.data = data1;
              this.qsTotalThisYear = (this.qsTotalThisYear / 10000).toFixed(2);
            }
          }
        });
      }
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
    position: absolute;
    color: #5cacc5;
    font-size: 37px;
    margin: 0;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}

.con {
  display: flex;
  justify-content: space-around;
  margin-top: 18px;
  div {
    width: 400px;
    height: 388px;
    .text {
      font-size: 36px;
      font-weight: 400;
      text-align: center;
      position: absolute;
      top: 110px;
    }
    .num {
      position: absolute;
      top: 255px;
      span:nth-child(1) {
        font-size: 60px;
        background-image: -webkit-linear-gradient(bottom, #d4cd41, white);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      span:nth-child(2) {
        color: #fff;
        font-size: 24px;
      }
    }
  }
  .con-left {
    background: url("../../assets/homeImg/monthLeft.png");
  }
  .con-right {
    background: url("../../assets/homeImg/monthRight.png");
  }
}

.con {
  display: flex;
  justify-content: space-around;
  .con-left,
  .con-right {
    width: 400px;
    height: 388px;
    div {
      color: #fff;
      font-size: 28px;
    }
    .bs {
      position: absolute;
      top: 336px;
      span:nth-child(1) {
       
        display: inline-block;
        width: 60px;
      }
      span:nth-child(3), span:nth-child(2) {
        background-image: -webkit-linear-gradient(bottom, #d4cd41, white);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    .fb {
      position: absolute;
      top: 390px;
      span:nth-child(1) {
        display: inline-block;
        width: 60px;
      }
       span:nth-child(3), span:nth-child(2) {
        background-image: -webkit-linear-gradient(bottom, #d4cd41, white);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
  
}

.content {
  position: relative;
  margin-top: 35px;

  img {
    height: 100%;
  }

  div {
    position: absolute;
    // color: #b4bcc7;
  }

  .con-text {
    left: 50%;
    top: 114px;
    transform: translateX(-50%);
    font-size: 35px;
  }

  .con-num {
    left: 50%;
    top: -20px;
    transform: translateX(-50%);
    background-image: -webkit-linear-gradient(bottom, #d4cd41, white);
    font-size: 120px;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
