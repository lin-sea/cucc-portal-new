<template>
  <div>
    <div class="title-cucc">
      <h2>生产预警</h2>
      <div style="height: 60%">
        <div class="list-head">
          <el-col :span="8"
            ><div class="list-title"><span></span>时间</div></el-col
          >
          <el-col :span="8"
            ><div class="list-title"><span></span>站点</div></el-col
          >
          <el-col :span="8"
            ><div class="list-title"><span></span>预警内容</div></el-col
          >
        </div>
        <div id="wrap">
          <ul id="list">
            <li v-for="(item, i) in list" :key="i">
              <el-row>
                <el-col :span="8"
                  ><div class="list-title">
                    <span></span>{{ item.createTime }}
                  </div></el-col
                >
                <el-col :span="8"
                  ><div class="list-title">
                    <span></span>{{ item.mixingStationName }}
                  </div></el-col
                >
                <el-col :span="8"
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
  name: "ProductionWarning",
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
        earlyWarningType: "生产预警",
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
  top: 0px;
  margin: 0;
  padding: 0;
  -webkit-animation: 20s move infinite linear;
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
  background-color: purple;
  font-size: 30px;
  height: 50px;
}

.list-title {
  margin-top: 10px;
}
</style>
