<template>
  <div>
    <div class="title-cucc">
      <h2>预警统计</h2>
      <div style="height: 60%">
          <div>{{'车辆预计：待处理:' + car0 + '；已处理：' + car1 + '；'}}</div>
          <div>{{'生产预计：待处理:' + production0 + '；已处理：' + production1 + '；'}}</div>
      </div>
    </div>
  </div>
</template>


<script>
import { warningQueryList } from "@/api/detail/detail";
import moment from "moment";
export default {
  name: "Warningstatistics",
  data() {
    return {
      car0: 0,
      car1: 0,
      production0: 0,
      production1: 0,
      mixingStation: "",
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
          data.forEach((item) => {
            item.status == 0 ? this.car0++ : "";
            item.status == 1 ? this.car1++ : "";
          });
        }
      });

      warningQueryList({
        earlyWarningType: "生产预警",
        siteName: this.mixingStation,
      }).then((resp) => {
        if (resp && resp.data.success) {
          var data = resp.data.data;
          if (!data) {
            return false;
          }
          data.forEach((item) => {
            item.status == 0 ? this.production0++ : "";
            item.status == 1 ? this.production1++ : "";
          });
        }
      });
    },
    clearData() {},
  },
};
</script>

<style scoped>
</style>
