<template>
  <div class="title-cucc1">
    <div class="cucc-con">
      <div class="title-box">
        <img src="../../assets/detailImg/title.png" alt=".." />
        <span>压力机试块强度测试</span>
      </div>

      <div class="con">
        <div class="con-left">
          <div>
            <span>型号: C15</span>
            <span>次数: {{ c15.length === 0 ? '0' : c15[0].count }}</span>
          </div>
          <div>
            <span>型号: C20</span>
            <span>次数: {{ c20.length === 0 ? '0' : c20[0].count }}</span>
          </div>
          <div>
            <span>型号: C25</span>
            <span>次数: {{ c25.length === 0 ? '0' : c25[0].count }}</span>
          </div>
          <div>
            <span>型号: C30</span>
            <span>次数: {{ c30.length === 0 ? '0' : c30[0].count }}</span>
          </div>
          <div>
            <span>型号: C35</span>
            <span>次数: {{ c35.length === 0 ? '0' : c35[0].count }}</span>
          </div>
        </div>
        <div class="line"></div>
        <div class="con-right">
          <div>
            <span>型号: C40</span>
            <span>次数: {{ c40.length === 0 ? '0' : c40[0].count }}</span>
          </div>
          <div>
            <span>型号: C45</span>
            <span>次数: {{ c45.length === 0 ? '0' : c45[0].count }}</span>
          </div>
          <div>
            <span>型号: C50</span>
            <span>次数: {{ c50.length === 0 ? '0' : c50[0].count }}</span>
          </div>
          <div>
            <span>型号: C60</span>
            <span>次数: {{ c60.length === 0 ? '0' : c60[0].count }}</span>
          </div>
        </div>
      </div>

      <div v-for="(item, i) in data" :key="i">
        <div>{{ item.name + ":" + item.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { blockTestInMixingStation } from "@/api/detail/detail";
import { getToday } from "@/utils/dateUtil";
export default {
  name: "DailyTotalVolume",
  props: {
    index: {
      type: String,
      default: "0",
    },
  },
  data() {
    return {
      mixingStation: "",
      data: [],
      c15:[],
      c20:[],
      c25:[],
      c30:[],
      c35:[],
      c40:[],
      c45:[],
      c50:[],
      c60:[],

    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.mixingStation = this.$route.query.mixingStation;
      blockTestInMixingStation({
        date: getToday(),
        mixingStation: this.mixingStation,
      }).then((resp) => {
        if (resp && resp.data.success) {
          const { data }  = resp.data.data;
          if (!data) return false;
          this.data = data;
          const c15 = data.filter(item=> item.name === "C15")
          const c20 = data.filter(item=> item.name === "C20")
          const c25 = data.filter(item=> item.name === "C25")
          const c30 = data.filter(item=> item.name === "C30")
          const c35 = data.filter(item=> item.name === "C35")
          const c40 = data.filter(item=> item.name === "C40")
          const c45 = data.filter(item=> item.name === "C45")
          const c50 = data.filter(item=> item.name === "C50")
          const c60 = data.filter(item=> item.name === "C60")

          this.c15 = c15
          this.c20 = c20
          this.c25 = c25
          this.c30 = c30
          this.c35 = c35
          this.c40 = c40
          this.c45 = c45
          this.c50 = c50
          this.c60 = c60

        

        }
      });
    },
  },
  watch: {},
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

.con {
  display: flex;
  justify-content: flex-start;
  margin-top: 56px;

  .con-left {
    margin-right: 25px;
    margin-left: 48px;
    div {
      width: 370px;
      height: 60px;
      margin-bottom: 28px;
      background: url(../../assets/detailImg/press.png);
      display: flex;
      justify-content: space-around;
      span {
        height: 100%;
        line-height: 60px;
        font-size: 30px;
      }
    }
  }
  .line {
    width: 1px;
    height: 334px;
    border-right: 1px dashed #38aaf2;
    margin-right: 25px;
    margin-top: 30px;
  }
  .con-right {
    div {
      width: 370px;
      height: 60px;
      margin-bottom: 28px;
      background: url(../../assets/detailImg/press.png);
      display: flex;
      justify-content: space-around;
      span {
        height: 100%;
        line-height: 60px;
        font-size: 30px;
      }
    }
  }
}
</style>
