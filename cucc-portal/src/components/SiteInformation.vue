<template>
  <div class="home" style="zoom: 1">

    <div class="line1">
      <div class="line-1-min">
        <daliy-total-volume :index="'1-2'"></daliy-total-volume>
      </div>

      <div class="line-1-min">
        <this-year-prod></this-year-prod>
      </div>

      <div class="line-1-min">
        <site-year></site-year>
      </div>
    </div>
  </div>
</template>


<script>
import DaliyVolume from "./detail/daliyVolume.vue";
import DaliyTotalVolume from "./detail/daliyTotalVolume.vue";
import SiteMonthBack from "./detail/siteMonthBack.vue";
import ThisYearProd from './detail/thisYearProd.vue'
import SiteYear from './detail/siteYear.vue'
export default {
  name: "DetailPage",
  components: {
    DaliyVolume,
    DaliyTotalVolume,
    SiteMonthBack,
    ThisYearProd,
    SiteYear
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
  width: 960px;
  height: 100%;
 
}
.line-1-min {
  width: 960px;
  height: 540px;
  background-color: rgba(9,45,72,0.7);

  /* border: 1px solid #000; */
}
</style>
