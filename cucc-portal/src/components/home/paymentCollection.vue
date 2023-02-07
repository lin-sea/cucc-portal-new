<template>
  <div>
    <div class="title-cucc">
      <div class="title-box">
        <img :src="titleImg" alt=".." />
        <span>月/年度回款</span>
      </div>
      <div class="tip">
        <div></div>
        <span>月/年度回款</span>
      </div>
      <div class="content">
        <div class="money-box">
          <img :src="moneyImg" alt=".." />
          <span class="money-num">{{ valueThisMonth }}</span>
          <span class="money-text"> 当月回款（万元）</span>
        </div>
        <div class="money-box">
          <img :src="moneyRightImg" alt=".." />
          <span class="money-num">{{
            (Number(yearMoney) / 10000).toFixed(2)
          }}</span>
          <span class="money-text">当年回款 (万元) </span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
import { paymentCollection, getYearBackMoney } from "@/api/home/home";
import titleImg from "../../assets/homeImg/newSmallTitle.png";
import moneyImg from "../../assets/homeImg/newLeft.png";
import moneyRightImg from "../../assets/homeImg/newRight.png";
export default {
  name: "DaliyVolume",
  data() {
    return {
      titleImg,
      moneyImg,
      moneyRightImg,
      valueThisMonth: "",
      valueThisYear: "",
      yearMoney: 0,
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
      getYearBackMoney().then((res) => {
        if (res.status === 200) {
          const { data } = res.data;
          const transData = JSON.parse(data);
          this.yearMoney = transData && transData[0].amount;
        }
      });
      paymentCollection().then((resp) => {
        if (resp && resp.data.success) {
          var data = resp.data.data;
          if (!data) return false;
          this.valueThisYear = (data.valueThisYear * 100).toFixed(0);
          this.valueThisMonth = data.valueThisMonth.toFixed(1);
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
    font-size: 37px;
    position: absolute;
    margin: 0;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}

.tip {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 26px;
  margin-bottom: 18px;
  width: 80%;

  div {
    display: inline-block;
    width: 6px;
    height: 20px;
    background-color: #a1f6a6;
    margin-right: 18px;
  }

  span {
    color: #558d91;
    font-size: 26px;
  }
}

.content {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 90%;
  height: 80%;
  .money-box {
    position: relative;
    width: 40%;
    margin-top: 58px;

    img {
      width: 100%;
    }

    .money-num {
      position: absolute;
      top: 120px;
      left: 50%;
      transform: translateX(-50%);
      background-image: -webkit-linear-gradient(bottom, #a2f7ab, #c3f104);
      font-size: 60px;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .money-text {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      top: 200px;
      font-size: 30px;
    }
  }
}
</style>
