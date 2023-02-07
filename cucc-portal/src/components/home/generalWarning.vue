<template>
  <div>
    <div class="title-cucc">
      <div class="title-box">
        <img :src="titleImg" alt=".." />
        <span>三大预警</span>
      </div>
      <div class="content-box">
        <div class="charts-box">
          <div :id="'myChart' + index" style="height: 80%"></div>
          <p class="car-text">车辆预警</p>
          <!-- <p style="color: #A7A8CC; font-size: 28px;">处理中:{{ car_0 }}</p>
          <p style="color: #A7A8CC; font-size: 28px;">处理完成:{{ car_1 }}</p> -->
        </div>
        <div class="charts-box">
          <div :id="'myChart' + index + '-1'" style="height: 80%"></div>
          <p class="pro-text">生产预警</p>
          <!-- <p style="color: #A7A8CC; font-size: 28px;">处理中:{{ production_0 }}</p>
          <p style="color: #A7A8CC; font-size: 28px;">处理完成:{{ production_1 }}</p> -->
        </div>
        <div class="charts-box">
          <div :id="'myChart' + index + '-2'" style="height: 80%"></div>
          <p class="sale-text">营销预警</p>
          <!-- <p style="color: #A7A8CC; font-size: 28px;">处理中:{{ sale_0 }}</p>
          <p style="color: #A7A8CC; font-size: 28px;">处理完成:{{ sale_1 }}</p> -->
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
import {
  earlyWarningList,
  earlyWarningTotal,
  threeWarning,
} from "@/api/home/home";
import titleImg from "../../assets/homeImg/newSmallTitle.png";
import moment from "moment";
let chartDom1;
let chartDom2;
let chartDom3;
export default {
  name: "GeneralWarning",
  props: {
    index: {
      type: String,
      default: "0",
    },
  },
  data() {
    return {
      titleImg,
      car_0: 0,
      car_1: 0,
      production_0: 0,
      production_1: 0,
      sale_0: 0,
      sale_1: 0,
      proValue: 0,
      saleValue: 0,
    };
  },
  computed: {
    ...mapState(["app"]),
  },
  mounted() {
    this.getData();
    setInterval(() => {
      this.getData();
    }, this.app.timing);
  },
  methods: {
    getData() {
      var today = moment(new Date()).format("YYYY-MM-DD") + " 00:00";
      var dateTime = new Date();
      dateTime = dateTime.setDate(dateTime.getDate() + 1);
      dateTime = new Date(dateTime);
      var tomorrow = moment(dateTime).format("YYYY-MM-DD") + " 00:00";
      let warning = threeWarning().then((res) => {
        const { data } = res.data;
        const proWarning = data.filter(
          (item) => item.earlyWarningType === "生产预警"
        );
        const saleWarning = data.filter(
          (item) => item.earlyWarningType === "营销预警"
        );
        console.log(proWarning,saleWarning,'saleWarning11');

        this.proValue = (proWarning[0] && proWarning[0].count) || 0;
        this.saleValue = (saleWarning[0] && saleWarning[0].count) || 0;
      });

      // let getCar = earlyWarningTotal({
      //   earlyWarningType: "车辆预警",
      // }).then(() => {
      // });

      // let getProd = earlyWarningTotal({
      //   earlyWarningType: "生产预警",
      // }).then((res) => {
      //   const { data } = res.data
      //   return data.total
      // });

      // let getSale = earlyWarningTotal({
      //   earlyWarningType: "营销预警",
      // }).then((res) => {
      //   const { data } = res.data
      //   return data.total
      // });

      // let getCar0 = earlyWarningList({
      //   earlyWarningType: "车辆预警",
      //   size: 1,
      //   status: 0,
      //   startTimeFrom: today,
      //   startTimeTo: tomorrow,
      // }).then((resp) => {
      //   if (resp && resp.data.success) {
      //     const { data } = resp.data;
      //     this.car_0 = data && data;
      //     return data;
      //   }
      // });

      // let getCar1 = earlyWarningList({
      //   earlyWarningType: "车辆预警",
      //   size: 1,
      //   status: 1,
      //   startTimeFrom: today,
      //   startTimeTo: tomorrow,
      // }).then((resp) => {
      //   if (resp && resp.data.success) {
      //     var data = resp.data.data;
      //     if (!data) {
      //       return false;
      //     }
      //     this.car_1 = data.total;
      //     return data.total;
      //   }
      // });

      // let getPro0 = earlyWarningList({
      //   earlyWarningType: "生产预警",
      //   size: 1,
      //   status: 0,
      //   startTimeFrom: today,
      //   startTimeTo: tomorrow,
      // }).then((resp) => {
      //   if (resp && resp.data.success) {
      //     var data = resp.data.data;
      //     if (!data) {
      //       return false;
      //     }

      //     this.production_0 = data;
      //     return data;
      //   }
      // });

      // let getPro1 = earlyWarningList({
      //   earlyWarningType: "生产预警",
      //   size: 1,
      //   status: 1,
      //   startTimeFrom: today,
      //   startTimeTo: tomorrow,
      // }).then((resp) => {
      //   if (resp && resp.data.success) {
      //     var data = resp.data.data;
      //     if (!data) {
      //       return false;
      //     }

      //     this.production_1 = data;
      //     return data;
      //   }
      // });

      // let getSale0 = earlyWarningList({
      //   earlyWarningType: "营销预警",
      //   size: 1,
      //   status: 0,
      //   startTimeFrom: today,
      //   startTimeTo: tomorrow,
      // }).then((resp) => {
      //   if (resp && resp.data.success) {
      //     var data = resp.data.data;
      //     if (!data) {
      //       return false;
      //     }
      //     this.sale_0 = data;
      //     return data;
      //   }
      // });

      // let getSale1 = earlyWarningList({
      //   earlyWarningType: "营销预警",
      //   size: 1,
      //   status: 1,
      //   startTimeFrom: today,
      //   startTimeTo: tomorrow,
      // }).then((resp) => {
      //   if (resp && resp.data.success) {
      //     var data = resp.data.data;
      //     if (!data) {
      //       return false;
      //     }
      //     this.sale_1 = data;
      //   }
      //   return data;
      // });
      Promise.all([warning]).then((resolve) => {
        this.initCharts(resolve);
      });
    },
    setCharts(data) {
      // const self = this
      let option1 = {
        series: [
          {
            type: "gauge",
            center: ["50%", "70%"],
            startAngle: 180,
            endAngle: -180,
            min: 0,
            splitNumber: 10,
            itemStyle: {
              color: "#4734A7",
            },
            progress: {
              show: true,
              width: 10,
            },
            pointer: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                width: 15,
                color: [[1, "#4734A7"]],
              },
            },
            axisTick: {
              distance: -30,
              splitNumber: 5,
              lineStyle: {
                height: 7,
                width: 2,
                color: "#999",
              },
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            detail: {
              valueAnimation: true,
              width: "60%",
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, 0],
              fontSize: 30,
              fontWeight: "bolder",
              color: "auto",
            },
            data: [
              {
                value: 0,
              },
            ],
          },
        ],
      };
      let option2 = {
        series: [
          {
            type: "gauge",
            center: ["50%", "70%"],
            startAngle: 180,
            endAngle: -180,
            min: 0,
            splitNumber: 10,
            itemStyle: {
              color: "#B22DB3",
            },
            progress: {
              show: true,
              width: 15,
            },
            pointer: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                width: 15,
                color: [[1, "#B22DB3"]],
              },
            },
            axisTick: {
              distance: -30,
              splitNumber: 5,
              lineStyle: {
                height: 7,
                width: 2,
                color: "#999",
              },
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            detail: {
              valueAnimation: true,
              width: "60%",
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, 0],
              fontSize: 30,
              fontWeight: "bolder",
              color: "auto",
            },
            data: [
              {
                value: this.proValue,
              },
            ],
          },
        ],
      };
      let option3 = {
        series: [
          {
            type: "gauge",
            center: ["46%", "70%"],
            startAngle: 180,
            endAngle: -180,
            min: 0,
            splitNumber: 10,
            itemStyle: {
              color: "#A84219",
            },
            progress: {
              show: true,
              width: 15,
            },
            pointer: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                width: 15,
                color: [[1, "#A84219"]],
              },
            },
            axisTick: {
              distance: -30,
              splitNumber: 5,
              lineStyle: {
                height: 7,
                width: 2,
                color: "#999",
              },
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            detail: {
              valueAnimation: true,
              width: "60%",
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, 0],
              fontSize: 30,
              fontWeight: "bolder",
              color: "auto",
            },
            data: [
              {
                value: this.saleValue,
              },
            ],
          },
        ],
      };
      chartDom1 && chartDom1.setOption(option1);
      chartDom2 && chartDom2.setOption(option2);
      chartDom3 && chartDom3.setOption(option3);
    },
    initCharts(data) {
      chartDom1 = this.$echarts.init(
        document.getElementById("myChart" + this.index)
      );
      chartDom2 = this.$echarts.init(
        document.getElementById("myChart" + this.index + "-1")
      );
      chartDom3 = this.$echarts.init(
        document.getElementById("myChart" + this.index + "-2")
      );
      this.setCharts(data);
    },
  },
};
</script>

<style lang="less" scoped>
.title-box {
  position: relative;

  img {
    width: 100%;
    height: 100%;
    margin-top: 20px;
  }

  span {
    color: #5cacc5;
    font-size: 37px;
    position: absolute;
    margin: 0;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}

.content-box {
  margin-top: 18px;
  display: flex;
  justify-content: flex-start;
  height: 80%;
  width: 100%;

  .charts-box {
    width: 100%;
    height: 80%;

    div {
      height: 100%;
      width: 70%;
      margin: 0 auto;
    }

    .car-text {
      color: #4734a7;
      font-size: 40px;
      margin-top: 60px;
    }

    .pro-text {
      color: #b22db3;
      font-size: 40px;
      margin-top: 60px;
    }

    .sale-text {
      color: #a84219;
      font-size: 40px;
      margin-top: 60px;
    }
  }
}
</style>
