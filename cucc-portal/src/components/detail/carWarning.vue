<template>
  <div>
    <div class="title-cucc">
      <h2>车辆预警</h2>
      <div style="height: 60%">
        <div class="list-head">
          <el-col :span="6"
            ><div class="list-title"><span></span>时间</div></el-col
          >
          <el-col :span="6"
            ><div class="list-title"><span></span>站点</div></el-col
          >
          <el-col :span="6"
            ><div class="list-title"><span></span>自编号</div></el-col
          >
          <el-col :span="6"
            ><div class="list-title"><span></span>预警内容</div></el-col
          >
        </div>
        <div id="wrap">
          <ul id="list">
            <li v-for="(item, i) in list" :key="i">
              <el-row>
                <el-col :span="6"
                  ><div class="list-title">
                    <span></span>{{ item.createTime }}
                  </div></el-col
                >
                <el-col :span="6"
                  ><div class="list-title">
                    <span></span>{{ item.mixingStationName }}
                  </div></el-col
                >
                <el-col :span="6"
                  ><div class="list-title">
                    <span></span>{{ getBh(item.earlyWarningContent) }}
                  </div></el-col
                >
                <el-col :span="6"
                  ><div class="list-title">
                    <span></span>{{ item.earlyWarningName }}
                  </div></el-col
                >
              </el-row>
            </li>
            <!-- <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li> -->
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { warningQueryList } from "@/api/detail/detail";
import moment from "moment";
export default {
  name: "CarWarning",
  data() {
    return {
      list: [],
      mixingStation: ''
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.mixingStation = this.$route.query.mixingStation;
      warningQueryList({
        earlyWarningType: "车辆预警",
        siteName: this.mixingStation,
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
    getBh(val) {
      if (!val) {
        return "";
      }
      var arr = val.split(",");
      if (arr.length < 2) {
        return "";
      }
      return arr[1].replace("车辆编号", "");
    },
    clearData() {},
  },
};
</script>

<style scoped>
@-webkit-keyframes move {
  0% {
    top: 0;
  }

  100% {
    top: -100%;
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
  top: 0;
  margin: 0;
  padding: 0;
  -webkit-animation: 60s move infinite linear;
  width: 100%;
}

#list li {
  list-style: none;
  /* border: 1px solid #fff; */
  /* background: #000;
  color: #fff; */
  font-size: 25px;
  height: 70px;
  text-align: center;
}

#wrap:hover #list {
  -webkit-animation-play-state: paused;
}

.list-head {
  background-color: darkblue;
  font-size: 30px;
  height: 50px;
}

.list-title {
  margin-top: 10px;
}
</style>
