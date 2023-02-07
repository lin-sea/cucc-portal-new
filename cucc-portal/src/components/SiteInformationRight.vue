<template>
  <div class="home" style="zoom: 1">

    <div class="line1">
      <div class="line-1-min">
        <press-test></press-test>
      </div>

      <div class="line-2-min">
        <site-month-back></site-month-back>
      </div>

      
    </div>
  </div>
</template>


<script>  
import PressTest from './detail/pressTest.vue'
import DaliyVolume from "./detail/daliyVolume.vue";
import SiteMonthBack from "./detail/siteMonthBack.vue";
import ThisYearProd from './detail/thisYearProd.vue'
export default {
  name: "SiteInformationRight",
  components: {
    DaliyVolume,
    SiteMonthBack,
    ThisYearProd,
    PressTest
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

}

.line-2-min {
  width: 960px;
  height: 1080;
  background-color: rgba(9,45,72,0.7);
}

</style>
