<template>
  <div class="title-cucc">
    <div class="title-box">
      <img :src="titleImg" alt="..">
      <span>月/年度销价</span>
    </div>

    <div class="tip">
      <div></div>
      <span>月/年度销价</span>
    </div>

    <div class="content">
      <div>
        <img :src="tipImg" alt="..">
        <span class="month">本月</span>
        <span>C30均价</span>
      </div>
      <div>
        <img :src="numImg" alt="..">
        <img :src="numImg" alt="..">
        <img :src="numImg" alt="..">
        <img :src="numImg" alt="..">
        <span class="num3">{{ monthData[0] }}</span>
        <span class="num2">{{ monthData[monthData.length -2] }}</span>
        <span class="num1">{{ monthData[monthData.length -1] }}</span>
      </div>
    </div>

    <div class="content" style="margin-top: 34px">
      <div>
        <img :src="tipImg" alt="..">
        <span class="month">本年</span>
        <span>C30均价</span>
      </div>
      <div>
        <img :src="numImg" alt="..">
        <img :src="numImg" alt="..">
        <img :src="numImg" alt="..">
        <img :src="numImg" alt="..">
        <span class="num3">{{ yearData[0] }}</span>
        <span class="num2">{{ yearData[yearData.length -2] }}</span>
        <span class="num1">{{ yearData[yearData.length -1] }}</span>
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapState } from "vuex";
import { averagePriceByMonth } from "@/api/home/home";
import { getYear } from "@/utils/dateUtil";
import titleImg from '../../assets/homeImg/newSmallTitle.png'
import tipImg from '../../assets/homeImg/tip.png'
import numImg from '../../assets/homeImg/numSqu.png'
var chartDom;
var option;
export default {
  name: "ComprehensivePrice",
  props: {
    index: {
      type: String,
      default: "0",
    },
  },
  data() {
    return {
      tipImg,
      numImg,
      titleImg,
      yearData: [],
      monthData: []
    };
  },
  computed: {
    ...mapState(["app"]),
  },
  mounted() {
    this.getData();
    setInterval(()=>{
      this.yearData=[]
      this.monthData=[]
    this.getData();

    },this.app.timing)
    // this.echartInit();
  },
  methods: {

    getData() {
      var month = new Date().getMonth() + 1
      averagePriceByMonth({
        year: getYear(),
      }).then((resp) => {
        if (resp && resp.data.success) {
          var data = resp.data.data;
          if (!data) {
            return false;
          }
          data.forEach(item => {
            if (item.month == 'all') {
              this.yearData = item.value.toFixed(0)
            }
            if (item.month == month) {
              if(item.value === 0) {
                this.monthData = [ '0','0','0' ]
              }else {
                this.monthData = item.value.toFixed(0)
              }
            }
          })

        }
      });
    },
    clearData() { },
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
  width: 80%;

  div {
    display: inline-block;
    width: 6px;
    height: 20px;
    background-color: #CCCB87;
    margin-right: 18px;
  }

  span {
    color: #A8C4CD;
    font-size: 26px;

  }

}

.content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 68px;

  .month {
    margin-left: 28px;
    color: #C3D479;
  }

  div:nth-child(1) {
    font-size: 36px;
  }

  div:nth-child(2) {
    position: relative;
    img {
      width: 90px;
      margin-right: 10px;
    }
    span {
      position: absolute;
      font-size: 70px;
    }

    .num1 {
      right: 35px;
      top: 20px;
    }
    .num2 {
      right: 140px;
      top: 20px;
    }
    .num3 {
      right: 248px;
      top: 20px;
    }

  }
}
</style>
