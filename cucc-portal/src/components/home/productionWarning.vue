<template>
  <div>
    <div class="title-cucc">
      <div class="title-box">
        <img :src="titleImg" alt="" />
        <span>生产预警</span>
      </div>
      <div style="height: 70%; margin-top: 18px">
        <div class="list-head">
          <el-col :span="8">
            <div class="list-title"><span></span>时间</div>
          </el-col>
          <el-col :span="8">
            <div class="list-title"><span></span>站点</div>
          </el-col>
          <el-col :span="8">
            <div class="list-title"><span></span>预警内容</div>
          </el-col>
        </div>
        <div id="wrap">
          <div id="list">
            <div
              v-for="(item, i) in list"
              :style="{ background: i % 2 === 0 ? '#2F1946' : '#000027' }"
              :key="i"
            >
              <div class="list-title title1">
                {{ item.createTime }}
              </div>

              <div class="list-title title2">
                {{ item.mixingStationName }}
              </div>

              <div class="list-title title3">
                {{ item.earlyWarningName }}
              </div>
            </div>
            <!-- <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { earlyWarningList } from "@/api/home/home";
import { mapState } from "vuex";
import titleImg from "../../assets/homeImg/newSmallTitle.png";
import moment from "moment";
let int;
export default {
  name: "ProductionWarning",
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
    setInterval(()=>{
      clearInterval(int)
      this.getData();
    },this.app.timing)
  },
  methods: {
    getData() {
      earlyWarningList({
        earlyWarningType: "生产预警",
        size: 50,
      }).then((resp) => {
        if (resp && resp.data.success) {
          const { data } = resp.data;
          if (!data) return false;
          // this.list = data.records;
          let times = 0;
          const t = Math.floor(data.length / 3) - 1;
          int = setInterval(() => {
            this.list = data.slice(times * 3, (times + 1) * 3);
            if (times > t) {
              times = 0;
            } else {
              times += 1;
            }
          }, 4000);
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
  margin: 0px auto;
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
  /* border: 1px solid #fff; */
  /* background: #000;
  color: #fff; */
  font-size: 30px;
  height: 130px;
  line-height: 120px;
  text-align: center;
  display: flex;
  .title1{
    margin-left: 30px;
    width: 340px;
  }
  .title2{
    width: 190px;
    text-align: center;
    margin-left: 70px;
  }
  .title3{
    width: 300px;
    margin-left: 60px;
  }
}


#wrap:hover #list {
  -webkit-animation-play-state: paused;
}

.list-head {
  background-color: #b42dae;
  font-size: 30px;
  height: 60px;
}

.list-title {
  margin-top: 10px;
  line-height: 50px;
}
</style>
