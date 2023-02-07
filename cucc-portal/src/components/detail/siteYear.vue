<template>
  <div class="title-cucc1">
    <div class="cucc-con">
    <div class="title-box">
      <img :src="titleImg" alt=".." />
      <span>当年实时生产总方</span>
    </div>
    <div class="con">
      <div class="con1">
        <div class="con1-left">
          <span class="con1-text">计划总方</span>
          <span class="con1-num">{{ Math.floor(stationData && stationData.planNum)  }}</span>
        </div>
        <div class="con1-right">
          <span class="con1-text">实时生产总方</span>
          <span class="con1-num"> {{ Math.floor( stationData && stationData.actualNum) }} </span>
        </div>
      </div>

    </div>
    <div class="day-con">
        <span :style="{ fontFamily: app.echartFontFamily }">当年计划完成率</span>
        <div class="back-box">
            <div class="up-box" :style="{width: percentWidth + '%', fontFamily: app.echartFontFamily}"></div>
        </div>
        <span  :style="{ fontFamily: app.echartFontFamily }">{{ percentWidth }} %</span>
    </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getYearProd } from "@/api/detail/detail";
import moment from "moment";
import titleImg from "../../assets/detailImg/title.png";
import month1 from "../../assets/detailImg/month1.png";
import month2 from "../../assets/detailImg/month2.png";
import month3 from "../../assets/detailImg/month3.png";
import month4 from "../../assets/detailImg/month4.png";

export default {
  name: "ThisYearProd",
  props: {
    index: {
      type: String,
      default: "0",
    },
  },
  data() {
    return {
      titleImg,
      month1,
      month2,
      month3,
      month4,
      stationData: {},
      percentWidth: ''
    };
  },
  computed: {
    ...mapState(["app"]),
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      const month = moment(new Date()).format("YYYY-MM-DD");
      getYearProd({ year:month }).then((res) => {
        const { code, data } = res.data;
        if (code == 200) {
          const transData = JSON.parse(data);
          const path = this.$route.query;
          const station = path.mixingStation;
          const filterData = transData.filter(item => item.name === station)

          this.stationData = filterData[0]
          this.percentWidth = ((filterData[0].actualNum / filterData[0].planNum) *100).toFixed(1)
        }

      });
    },
  },
};
</script>

<style lang="less" scoped>
.title-box {
  height: 63px;
  img {
    height: 100%;
    width: 814px;
  }
}
.day-con {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 100px;
    span {
        font-size: 38px;
        font-family: 'PangMenZhengDao-3';
        color: #fff;
    }

    .back-box {
        width: 418px;
        height: 24px;
        background-color: #4068D7;
        margin-left: 20px;
        margin-right: 28px;
        .up-box {
            height: 100%;
            background-color: #4DF3F8 ;
        }
    }

}
.con1 {
  display: flex;
  justify-content: flex-start;
}

.con1 {
  margin-top: 60px;
}

.con1-left {
  width: 352px;
  height: 136px;
  margin-right: 110px;
  margin-left: 45px;
  background: url(../../assets/detailImg/year1.png);
  position: relative;
  .con1-text {
    font-size: 22px;
    color: #fff;
    position: absolute;
    top: 7px;
    left: 175px;
  }
  .con1-num {
    font-size: 56px;
    color: #A3DBFF;
    position: absolute;
    top: 58px;
    left: 130px;
  }
}

.con1-right {
  width: 353px;
  height: 136px;
  background: url(../../assets/detailImg/year2.png);
  position: relative;
  span {
    position: absolute;
  }
  .con1-text {
    font-size: 22px;
    color: #fff;
    left: 175px;
    top: 7px;
  }
    .con1-num {
        left: 130px;
        top: 58px;
        font-size: 55px;
        color: #A3DBFF;
    }
}
</style>
