<template>
  <div>
    <div class="title-cucc">
      <div class="title-box">
        <img :src="titleImg" alt="..">
        <span>年度十大销售客户</span>
      </div>
      <div class="first-cus">
        <img :src="num1" alt="..">
        <span>{{ list.length > 0 ? list[0].FSGDW : '' }}</span>
      </div>
      <div class="second-cus">
        <img :src="numBack" alt="">
        <p> {{ list.length > 0 ? (list[0].FHDBDZL / 10000).toFixed(2) : '' }} </p>
        <span>万方</span>
      </div>
      <div class="third-cus">
        <div>
          <img :src="num2" alt="..">
          <span class="cus-name"> {{ list.length > 0 ? list[1].FSGDW : '' }} </span>
          <span class="cus-num"> {{ list.length > 0 ? (list[1].FHDBDZL/10000).toFixed(2) : '' }} 万方 </span>
        </div>
        <div>
          <img :src="num3" alt="">
          <span class="cus-name third-name"> {{ list.length > 0 ? list[2].FSGDW : '' }} </span>
          <span class="cus-num third-num"> {{ list.length > 0 ? (list[2].FHDBDZL/10000).toFixed(2) : '' }} 万方</span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { customerTop10 } from "@/api/home/home";
import { mapState } from "vuex";
import titleImg from '../../assets/homeImg/newSmallTitle.png'
import num1 from '../../assets/homeImg/num1.png'
import numBack from '../../assets/homeImg/numBack.png'
import num2 from '../../assets/homeImg/num2.png'
import num3 from '../../assets/homeImg/num3.png'
export default {
  name: "TopThreeConsumer",
  data() {
    return {
      titleImg,
      numBack,
      num1,
      num2,
      num3,
      list: [],
    };
  },
  computed: {
    ...mapState(["app"]),
  },
  mounted() {
    this.getData();
    setInterval(()=>{
    this.getData();

    },this.app.timing)
  },
  methods: {
    getData() {
      customerTop10({
        year: new Date().getFullYear(),
      }).then((resp) => {
        if (resp && resp.data.success) {
          var data = resp.data.data;
          if (!data) {
            return false;
          }
          this.list = data;
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

.first-cus {
  margin-top: 10px;

  img {
    vertical-align: middle;
    width: 150px;
    height: 150px;
  }

  span {
    display: inline-block;
    font-size: 35px;
    color: rgb(237, 217, 73)
  }
}

.second-cus {
  position: relative;

  p {
    position: absolute;
    display: inline-block;
    left: 50%;
    top: -85px;
    background-image: -webkit-linear-gradient(bottom, red, #fd8403, white);
    font-size: 100px;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transform: translate(-50%, -50%);
  }

  span {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 38px;
    transform: translate(-50%, -50%);
  }
}

.third-cus {
  display: flex;
  margin-top: -10px;
  div {
    position: relative;
    width: 50%;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      position: absolute;
    }

    .cus-name {
      display: block;
      word-wrap: break-word;
      color: #a5edcf;
      width: 160px;
      top: 18px;
      font-size: 22px;
      left: 198px;
    }

    .cus-num {
      top: 80px;
      left: 198px;
      font-size: 38px;
      color: #a5edcf;
    }

    .third-name,
    .third-num {
      color: #e9a4cd;
    }


    img {
      width: 80%;
      height: 130px;
    }

  }

}
</style>
