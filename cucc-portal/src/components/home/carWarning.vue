<template>
  <div style="width: 100%">
    <div class="title-cucc">
      <div class="title-box">
        <img :src="titleImg" alt=".." />
        <span>车辆预警</span>
      </div>

      <div style="height: 70%; margin-top: 18px">
        <div class="list-head">
          <el-col :span="6">
            <div class="list-title"><span></span>时间</div>
          </el-col>
          <el-col :span="6">
            <div class="list-title"><span></span>站点</div>
          </el-col>
          <el-col :span="6">
            <div class="list-title"><span></span>自编号</div>
          </el-col>
          <el-col :span="6">
            <div class="list-title"><span></span>预警内容</div>
          </el-col>
        </div>
        <div id="wrap">
          <div id="list">
            <div
              v-for="(item, i) in list2"
              :key="i"
              :style="{ background: i % 2 === 0 ? '#231749' : '#000027' }"
            >
              <el-row>
                <el-col :span="6">
                  <div class="list-title">
                    <span></span>{{ item.creatTime }}
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="list-title">
                    <span></span>{{ item.mixingStationName }}
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="list-title">
                    <span></span>{{ item.earlyWarningContent }}
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="list-title">
                    <span></span>{{ item.earlyWarningName }}
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { earlyWarningList,getCarList } from "@/api/home/home";
import titleImg from "../../assets/homeImg/newSmallTitle.png";
export default {
  name: "CarWarning",
  data() {
    return {
      titleImg,
      list: [],
      list1: [
        { createTime: "2022-10-19  08:10:23",mixingStationName: '南京中联雄州站',earlyWarningContent:'V822', earlyWarningName:'超速报警' },
        { createTime: "2022-10-19  08:13:01",mixingStationName: '南京中联土桥站',earlyWarningContent:'J659', earlyWarningName:'超速报警' },
        { createTime: "2022-10-19  08:13:46",mixingStationName: '南京中联海华站',earlyWarningContent:'0332双', earlyWarningName:'超速报警' },
        { createTime: "2022-10-19  08:15:00",mixingStationName: '南京中联上峰站',earlyWarningContent:'5229', earlyWarningName:'超速报警' },
        { createTime: "2022-10-19  08:17:55",mixingStationName: '南京中联雄州站',earlyWarningContent:'V822', earlyWarningName:'超速报警' },
        { createTime: "2022-10-19  08:19:24",mixingStationName: '南京中联溧水站',earlyWarningContent:'191', earlyWarningName:'超速报警' },
      ],
      list2: []
    };
  },
  mounted() {
    // this.getData();
    

          getCarList().then(res=>{
            console.log(res,'pppp');
            if(res.status === 200) {
              let times = 0
              setInterval(()=>{
                this.list2 = res.data.slice(times * 3, (times + 1) * 3)
                if (times > 0 ) {
                  times = 0
                }else {
                  times += 1
                }
              },4000)
            }
          })
  },
  methods: {
    getData() {
      earlyWarningList({
        earlyWarningType: "车辆预警",
        size: 50,
      }).then((resp) => {
        if (resp && resp.data.success) {
          const data = resp.data.data;
          if (!data) return false;
          // this.list = data.records;
          let times = 0
          setInterval(()=>{
            this.list = data.records.slice(times * 3, (times + 1) * 3)
            if (times > 15) {
              times = 0
            }else {
              times += 1
            }
          },4000)
        }
      });
    },
    getBh(val) {
      if (!val) {
        return "";
      }
      const arr = val.split(",");
      if (arr.length < 2) {
        return "";
      }
      return arr[1].replace("车辆编号", "");
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

// @-webkit-keyframes move {
//   0% {
//     top: 0;
//   }

//   100% {
//     top: -3900px;
//   }
// }

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
  top: 0;
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
  height: 130px;
  font-size: 30px;
  //line-height: 130px;
  //margin-top: 8px;
  text-align: center;
}

#wrap:hover #list {
  -webkit-animation-play-state: paused;
}

.list-head {
  background-color: #7c43ec;
  font-size: 30px;
  height: 60px;
}

.list-title {
  margin-top: 10px;
  line-height: 50px;
}
</style>
