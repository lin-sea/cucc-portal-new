<template>
  <div>
    <div>
        <span></span>
        <span>温度：</span>
        <span></span>
    </div>
    <div>
        <span>湿度：</span>
        <span>PM2.5：</span>

    </div>
  </div>
</template>

<script>
import { getWeather } from "@/api/home/home";
export default {
  name: "Weather",
  data() {
    return {
        data: {}
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      getWeather().then((res) => {
      });
    },
  },
};
</script>

<style lang='less' scoped>
</style>