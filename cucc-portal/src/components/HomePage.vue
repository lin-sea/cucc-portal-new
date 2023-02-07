<template>
  <div class="home" style="zoom: 1" :style="{ fontFamily: app.echartFontFamily }">
    <!-- 960*540 -->
    <!-- <div><span>简体字</span></div> -->
    <div class="line1">

      <div class="line-1-2">
        <bs-daliy-volume :index="'1-1'"></bs-daliy-volume>
      </div>
      <div class="line-1-min">
        <daliy-volume :index="'1-3'"></daliy-volume>
      </div>
      <div class="line-1-min">
        <volume-month-year :index="'1-4'"></volume-month-year>
      </div>
      <div class="line-1-min">
        <daliy-order :index="'1-5'"></daliy-order>
      </div>

      <div class="line1-son">
        <div class="son-left">
          <div class="line-1-min">
            <month-volume :index="'1-6'"></month-volume>
          </div>
          <div class="line-1-min">
            <site-volume-target :index="'1-7'"></site-volume-target>
          </div>
          <div class="line-1-min">
            <volume-comparison :index="'1-8'"></volume-comparison>
          </div>
          <div class="line-1-min">
            <site-month-delivery :index="'1-11'"></site-month-delivery>
          </div>
          <div class="line-1-min">
            <site-year-delivery :index="'1-12'"></site-year-delivery>
          </div>
          <div class="line-1-min">
            <month-output :index="'1-13'"></month-output>
          </div>
          <div class="line-1-min">
            <site-month-back :index="'1-16'"></site-month-back>
          </div>
          <div class="line-1-min">
            <site-year-back :index="'1-17'"></site-year-back>
          </div>
          <div class="line-1-min">
            <month-delived-num :index="'1-18'"></month-delived-num>
          </div>
        </div>
        <div class="son-right">
          <!-- <Amap></Amap> -->
          <div class="son-right-video"></div>
          <post-equipment></post-equipment>
        </div>
      </div>
      <!-- <div class="line-1-min"></div>
      <div class="line-1-min"></div>
      <div class="line-1-min"></div>
      <div class="line-1-min"></div> -->
    </div>
    <div class="line2"></div>
    <div class="line3" :style="{ fontFamily: app.echartFontFamily }">
      <div class="line-1-min">
        <general-warning :index="'3-1'"></general-warning>
      </div>
      <div class="line-1-min">
        <top-three-consumer :index="'3-2'"></top-three-consumer>
      </div>
      <div class="line-1-min">
        <payment-collection :index="'3-3'"></payment-collection>
      </div>
      <div class="line-1-min">
        <sale-comparison :index="'3-4'"></sale-comparison>
      </div>
      <div class="line-1-min">
        <c-30-price :index="'3-5'"></c-30-price>
      </div>

      <div class="line-1-min">
        <car-warning :index="'3-6'"></car-warning>
      </div>
      <div class="line-1-min">
        <top-ten-consumer :index="'3-7'"></top-ten-consumer>
      </div>
      <div class="line-1-min">
        <month-payment :index="'3-8'"></month-payment>
      </div>
      <div class="line-1-min">
        <month-sale-comparison :index="'3-9'"></month-sale-comparison>
      </div>
      <div class="line-1-min">
        <area-avg-price :index="'3-10'"></area-avg-price>
      </div>

      <div class="line-1-min">
        <production-warning :index="'3-11'"></production-warning>
      </div>
      <div class="line-1-min">
        <!-- 当天新增 -->
        <month-order :index="'3-17'"></month-order>
      </div>
      <div class="line-1-min">
        <month-payment-year-on-year :index="'3-13'"></month-payment-year-on-year>
      </div>
      <div class="line-1-min">
        <year-contract :index="'3-14'"></year-contract>
      </div>
      <div class="line-1-min">
        <comprehensive-price :index="'3-15'"></comprehensive-price>
      </div>

      <div class="line-1-min">
        <sale-warning :index="'3-16'"></sale-warning>
      </div>
      <div class="line-1-min">
        <contract-year :index="'3-12'"></contract-year>
      </div>
      <div class="line-1-min">
        <year-order :index="'3-18'"></year-order>
      </div>
      <div class="line-1-min">
        <area-sale :index="'3-19'"></area-sale>
      </div>
      <div class="line-1-min">
        <average-grade :index="'3-20'"></average-grade>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
import HistogramEchart from "./HistogramEchart.vue";
import BsDaliyVolume from "./home/bsDaliyVolume.vue";
import FbsDaliyVolume from "./home/fbsDaliyVolume.vue";
import DaliyVolume from "./home/daliyVolume";
import VolumeComparison from "./home/volumeComparison.vue";
import SiteVolumeTarget from "./home/siteVolumeTarget.vue";
import MonthVolume from "./home/monthVolume.vue";
import MonthOutput from "./home/monthOutput.vue";
import SiteMonthDelivery from "./home/siteMonthDelivery.vue";
// import PressTest from "./home/pressTest.vue";
import Amap from './home/aMap.vue';
import MonthDelivedNum from "./home/monthDelivedNum.vue";
import SiteMonthBack from "./home/siteMonthBack.vue";
import GeneralWarning from "./home/generalWarning.vue";
import CarWarning from "./home/carWarning.vue";
import ProductionWarning from "./home/productionWarning.vue";
import SaleWarning from "./home/saleWarning.vue";
import TopThreeConsumer from "./home/TopThreeConsumer.vue";
import TopTenConsumer from "./home/TopTenConsumer.vue";
import SaleComparison from "./home/saleComparison.vue";
import MonthSaleComparison from "./home/monthSaleComparison.vue";
import PaymentCollection from "./home/paymentCollection.vue";
import VolumeMonthYear from "./home/volumeMonthYear.vue";
import DaliyOrder from "./home/daliyOrder.vue";
import SiteYearDelivery from "./home/siteYearDelivery.vue";
import SiteYearBack from "./home/siteYearBack.vue";
import ContractYear from "./home/contractYear.vue";
import MonthOrder from "./home/monthOrder.vue";
import MonthPayment from "./home/monthPayment.vue";
import MonthPaymentYearOnYear from "./home/monthPaymentYearOnYear.vue";
import YearOrder from "./home/yearOrder.vue";
import YearContract from "./home/yearContract.vue";
import AreaSale from "./home/areaSale.vue";
import ComprehensivePrice from "./home/comprehensivePrice.vue";
import C30Price from "./home/c30Price.vue";
import AreaAvgPrice from "./home/areaAvgPrice.vue";
import AverageGrade from "./home/averageGrade.vue";
import PostEquipment from "./home/postEquipmentRepair.vue"
export default {
  name: "HomePage",
  components: {
    PostEquipment,
    Amap,
    HistogramEchart,
    BsDaliyVolume,
    FbsDaliyVolume,
    DaliyVolume,
    VolumeComparison,
    SiteVolumeTarget,
    MonthVolume,
    MonthOutput,
    SiteMonthDelivery,
    MonthDelivedNum,
    SiteMonthBack,
    GeneralWarning,
    CarWarning,
    ProductionWarning,
    SaleWarning,
    TopThreeConsumer,
    TopTenConsumer,
    SaleComparison,
    MonthSaleComparison,
    PaymentCollection,
    VolumeMonthYear,
    DaliyOrder,
    SiteYearDelivery,
    SiteYearBack,
    ContractYear,
    MonthOrder,
    MonthPayment,
    MonthPaymentYearOnYear,
    YearOrder,
    YearContract,
    AreaSale,
    ComprehensivePrice,
    C30Price,
    AreaAvgPrice,
    AverageGrade
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["app"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.home {
  width: 13440px;
  height: 2160px;
  // font-family: "font1";

  font-size: 20px;

  display: flex;
  background-color: #132148;
  // background-color: #000;
}

.line-1-min {
  width: 20%;
  height: 25%;
  float: left;
  /* border: 1px solid #000; */
}

.line1-son {
  width: 100%;
  height: 75%;
  display: flex;
  justify-content: flex-start;

  .son-left {
    width: 60%;

    .line-1-min {
      width: 33.33%;
      height: 33.4%;
    }
  }

  .son-right {
    // width: 1950px;
    width: 40%;
    // background-color: pink;
    height: 100%;
    // margin-left: 20px;
    .son-right-video {
        width: 100%;
        height: 1080px;
    }
  }
}

.line1 {
  // width: 35.5%;
  width: 4800px;
  height: 100%;
  background-color: #010813;
  // float: left;
  /* border: 1px solid #000; */
}

.line2 {
  // width: 29%;
  width: 3840px;
  height: 100%;
  // float: left;
  /* border: 1px solid #000; */
}

.line3 {
  // width: 35.5%;
  width: 4800px;
  height: 100%;
  background-color: #000027;
  // float: left;
  /* border: 1px solid #000; */
}



.line-1-2 {
  width: 40%;
  height: 25%;
  float: left;
  /* border: 1px solid #000; */
}
</style>
