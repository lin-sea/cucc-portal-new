<template>
  <div>
    <div class="title-cucc">
      <div class="title-box">
        <img :src="titleImg" alt="" />
        <span>营销预警</span>
      </div>
      <div style="height: 70%; margin-top: 18px">
        <div class="list-head">
          <el-col :span="16"
            ><div class="list-title"><span></span>合同编号</div></el-col
          >
          <el-col :span="8"
            ><div class="list-title"><span></span>预警内容</div></el-col
          >
        </div>
        <div id="wrap">
          <div id="list">
            <div
              v-for="(item, i) in list"
              :key="i"
              :style="{ background: i % 2 === 0 ? '#2A2122' : '#000027' }"
            >
              <el-row>
                <el-col :span="16"
                  ><div class="list-title">
                    <span></span>{{ item.serialNumber }}
                  </div></el-col
                >
                <el-col :span="8"
                  ><div class="list-title">
                    <span></span>{{ item.earlyWarningName }}
                  </div></el-col
                >
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
import { earlyWarningList } from "@/api/home/home";
import titleImg from "../../assets/homeImg/newSmallTitle.png";
import moment from "moment";
let int;
export default {
  name: "CarWarning",
  data() {
    return {
      titleImg,
      list: [],
    };
  },
  computed: {
    ...mapState(["app"]),
  },
  mounted() {
    this.getData();
    setInterval(() => {
      clearInterval(int)
      this.getData();
    }, this.app.timing);
  },
  methods: {
    getData() {
      earlyWarningList({
        earlyWarningType: "营销预警",
        size: 50,
      }).then((resp) => {
        if (resp && resp.data.success) {
          const data = resp.data.data;
          if (!data) return false;
          // this.list = data.records;
          let times = 0;
          int = setInterval(() => {
            this.list = data.slice(times * 3, (times + 1) * 3);
            if (times > 15) {
              times = 0;
            } else {
              times += 1;
            }
          }, 4000);
        }
      });
    },
    getBh(val) {
      if (!val) {
        return "";
      }
      const arr = val.split("，");
      if (arr.length < 2) {
        return "";
      }
      return arr[1].replace("项目名称：", "");
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
    margin-top: 2px;
  }

  span {
    color: #5cacc5;
    font-size: 37px;
    position: absolute;
    margin: 0;
    left: 50%;
    margin-top: -26px;
    transform: translateX(-50%);
  }
}
@-webkit-keyframes move {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(0, -100%);
  }
}

#wrap {
  width: 100%;
  height: 100%;
  position: relative;
  margin: 0 auto;
  overflow: hidden;
}

#list {
  position: absolute;
  left: 0;
  top: 0px;
  margin: 0;
  padding: 0;
  //-webkit-animation: 100s move infinite linear;
  width: 100%;
}

#list div {
  list-style: none;
  height: 130px;
  font-size: 30px;
  line-height: 130px;
  text-align: center;
}

#wrap:hover #list {
  -webkit-animation-play-state: paused;
}

.list-head {
  background-color: #d14632;
  font-size: 30px;
  height: 60px;
}

.list-title {
  margin-top: 10px;
}
</style>
