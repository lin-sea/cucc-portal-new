<template>
  <div class="home" style="zoom: 1" :style="{ fontFamily: app.echartFontFamily }">
    <!-- 960*540 -->
    <!-- <div><span>简体字</span></div> -->
    <div class="line1">
      <div class="line-1-min"><daliy-volume :index="'1-1'"></daliy-volume></div>
      <div class="line-1-min">
        <daliy-total-volume :index="'1-2'"></daliy-total-volume>
      </div>
      <div class="line-1-min"></div>
      <div class="line-1-min"></div>
      <div class="line-1-min"><warning-statistics :index="'1-5'"></warning-statistics></div>

      <div class="line-1-min"><year-volume :index="'1-6'"></year-volume></div>
      <div class="line-1-min"><month-volume :index="'1-7'"></month-volume></div>
      <div class="line-1-min"></div>
      <div class="line-1-min"></div>
      <div class="line-1-min"><car-warning :index="'1-10'"></car-warning></div>

      <div class="line-1-min"><raw-material :index="'1-11'"></raw-material></div>
      <div class="line-1-min"></div>
      <div class="line-1-min"></div>
      <div class="line-1-min"></div>
      <div class="line-1-min"><production-warning :index="'1-15'"></production-warning></div>

      <div class="line-1-min">
        <site-month-back :index="'1-16'"></site-month-back>
      </div>
      <div class="line-1-min"><press-test :index="'1-17'"></press-test></div>
      <div class="line-1-min"><demo-echart :index="'1-18'"></demo-echart></div>
      <div class="line-1-min"><demo-echart :index="'1-19'"></demo-echart></div>
      <div class="line-1-min"><car-statistics :index="'1-20'"></car-statistics></div>
    </div>
    <div class="line2"></div>
    <div class="line3">
      <!-- <div class="line-1-min"><demo-echart :index="'3-1'"></demo-echart></div>
      <div class="line-1-min"><demo-echart :index="'3-2'"></demo-echart></div>
      <div class="line-1-min"><demo-echart :index="'3-3'"></demo-echart></div>
      <div class="line-1-min"><demo-echart :index="'3-4'"></demo-echart></div>
      <div class="line-1-min"><demo-echart :index="'3-5'"></demo-echart></div>
      <div class="line-1-min"><demo-echart :index="'3-6'"></demo-echart></div>
      <div class="line-1-min"><demo-echart :index="'3-7'"></demo-echart></div>
      <div class="line-1-min"><demo-echart :index="'3-8'"></demo-echart></div>
      <div class="line-1-min"><demo-echart :index="'3-9'"></demo-echart></div>
      <div class="line-1-min"><demo-echart :index="'3-10'"></demo-echart></div>
      <div class="line-1-min"><demo-echart :index="'3-11'"></demo-echart></div>
      <div class="line-1-min"><demo-echart :index="'3-12'"></demo-echart></div>
      <div class="line-1-min"><demo-echart :index="'3-13'"></demo-echart></div>
      <div class="line-1-min"><demo-echart :index="'3-14'"></demo-echart></div>
      <div class="line-1-min"><demo-echart :index="'3-15'"></demo-echart></div>
      <div class="line-1-min"><demo-echart :index="'3-16'"></demo-echart></div>
      <div class="line-1-min"><demo-echart :index="'3-17'"></demo-echart></div>
      <div class="line-1-min"><demo-echart :index="'3-18'"></demo-echart></div>
      <div class="line-1-min"><demo-echart :index="'3-19'"></demo-echart></div>
      <div class="line-1-min"><demo-echart :index="'3-20'"></demo-echart></div> -->
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
import DemoEchart from "./detail/DemoEchart.vue";
import DaliyVolume from "./detail/daliyVolume.vue";
import DaliyTotalVolume from "./detail/daliyTotalVolume.vue";
import YearVolume from "./detail/yearVolume.vue";
import MonthVolume from "./detail/monthVolume.vue";
import PressTest from "./detail/pressTest.vue";
import SiteMonthBack from "./detail/siteMonthBack.vue";
import RawMaterial from "./detail/rawMaterial.vue";
import ProductionWarning from "./detail/productionWarning.vue";
import CarWarning from "./detail/carWarning.vue";
import WarningStatistics from "./detail/warningstatistics.vue";
import CarStatistics from "./detail/carStatistics.vue";
export default {
  name: "DetailPage",
  components: {
    DemoEchart,
    DaliyVolume,
    DaliyTotalVolume,
    YearVolume,
    MonthVolume,
    PressTest,
    SiteMonthBack,
    RawMaterial,
    ProductionWarning,
    CarWarning,
    WarningStatistics,
    CarStatistics
  },
  data() {
    return {
      mixingStation: "",
    };
  },
  mounted() {
    var path = this.$route.query;
    if (!path || !path.mixingStation) {
      this.$router.push("/");
    }
    this.mixingStation = path.mixingStation;
  },
  computed: {
    ...mapState(["app"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  width: 13440px;
  height: 2160px;
  font-family: "font1";
  /* background-color: #132148; */
}
.line1 {
  width: 35.4%;
  height: 100%;
  float: left;
  /* border: 1px solid #000; */
}
.line2 {
  width: 28.5%;
  height: 100%;
  float: left;
  /* border: 1px solid #000; */
}
.line3 {
  width: 35.4%;
  height: 100%;
  float: left;
  /* border: 1px solid #000; */
}
.line-1-min {
  width: 20%;
  height: 25%;
  float: left;
  /* border: 1px solid #000; */
}
</style>
