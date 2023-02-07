<template>
  <div>
    <div class="title-cucc">
      <div style="height: 60%">
        <div class="card" v-for="(item, i) in list" :key="i" :style="{ background: (i % 2 === 0 ? '#0C4D5D': '#000027') }">
          <div v-if="i > 2" class="content">
            <div>
              <img :src="numImg" alt="..">
              <span class="num">{{ i + 1 }}</span>
              <div class="con-name">{{ item.FSGDW }}</div>
            </div>
            <div class="con-num">{{ (item.FHDBDZL / 10000).toFixed(2) }} 万方</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { customerTop10 } from "@/api/home/home";
import numImg from '../../assets/homeImg/numIcon.png'
export default {
  name: "TopThreeConsumer",
  data() {
    return {
      numImg,
      list: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      customerTop10({
        year: new Date().getFullYear(),
      }).then((resp) => {
        if (resp && resp.data.success) {
          const { data } = resp.data
          this.list = data && data;
        }
      });
    },
    clearData() { },
  },
};
</script>

<style lang="less" scoped>
.content {
  width: 90%;
  margin: 15px auto 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .con-num {
    font-size: 32px;
    color: rgb(180, 188, 199);
  }

  div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;

    .num {
      position: absolute;
      left: 20px;
      top: 20px;

    }

    .con-name {
      color: rgb(180, 188, 199);
      margin-left: 20px;
      font-size: 30px;
    }

    img {
      width: 60px;
      height: 60px;
    }

  }
}
</style>
