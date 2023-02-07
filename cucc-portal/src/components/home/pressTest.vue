<template>
  <div>
    <div class="title-cucc">
      <div class="title-box">
        <img :src="titleImg" alt="..">
        <span>压力机试块强度测试次数</span>
      </div>

      <div>
        <div class="card">
          <div class="card2" v-for="(item, i) in list" :key="i">
            <div v-if="i < 7">
              <el-row>
                <div>
                  <span>[</span>
                  <span class="card-name"> {{ item.name }} </span>
                  <span> . </span>
                  <span>{{ item.count }}</span>
                  <span>]</span>
                </div>
              </el-row>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card2" v-for="(item, i) in list" :key="i">
            <div v-if="i >= 7">
              <el-row>
                <el-col :span="12"><span>{{ item.name }}</span></el-col>
                <el-col :span="12"><span>{{ item.count }}</span></el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
let initList = [];
for (let i = 0; i < 14; i++) {
  initList.push({
    code: 0,
    name: "",
    count: 0,
  });
}

import { blockTest } from "@/api/home/home";
import { getToday } from "@/utils/dateUtil";
import titleImg from '../../assets/homeImg/newSmallTitle.png'
export default {
  name: "PressTest",
  data() {
    return {
      titleImg,
      list: initList,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      blockTest({
        date: getToday(),
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
  }

  span {
    color: #5cacc5;
    font-size: 26px;
    position: absolute;
    margin: 0;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}

.card {
  float: left;
  width: 50%;
}

.card2 {
  margin-top: 20px;
  margin-left: 100px;
  font-size: 30px;
  .card-name {
        color: rgb(180, 188, 199);

  }
}
</style>
