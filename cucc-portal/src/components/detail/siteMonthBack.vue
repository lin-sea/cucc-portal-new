<template>
  <div class="title-cucc1" style="height: 1080px">
    <div class="cucc-con">
      <div class="title-box">
        <img :src="titleImg" alt=".."/>
        <span>站点月度退转剩方量</span>
      </div>
      <div :id="'myChart' + index" style="height: 228px" class="chart"></div>

      <div class="table-head">
        <div>工程名称</div>
        <div>转发至工程名称</div>
        <div>退货方量</div>
        <div>退货原因</div>
      </div>
      <div class="table-father">
        <div class="table-box">
          <div v-for="(item, index) in listData" :key="index" class="list">
            <div>{{ item.工程名称 }}</div>
            <div>{{ item.转发至工程名称 }}</div>
            <div>{{ item.退货方量 }}</div>
            <div>{{ item.退货原因 }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {deliverGoods} from "@/api/home/home";
import {getMonthBack} from "@/api/detail/detail";
import moment from "moment";
import titleImg from "../../assets/detailImg/title.png";

var chartDom;
var option;
export default {
  name: "SiteMonthBack",
  props: {
    index: {
      type: String,
      default: "0",
    },
  },
  data() {
    return {
      titleImg,
      mixingStation: "",
      thThisMonth: 0,
      zcThisMonth: 0,
      shThisMonth: 0,
      fhThisMonth: 0,
      qsThisMonth: 0,
      listData: [],
    };
  },
  mounted() {
    this.echartInit();
    this.getData();
  },
  computed: {
    ...mapState(["app"]),
  },
  methods: {
    getData() {
      this.mixingStation = this.$route.query.mixingStation;
      const site = this.$route && this.$route.query && this.$route.query.sitename
      const month = moment(new Date()).format("YYYY-MM");
      const thisDay = moment(new Date()).format("YYYY-MM-DD");
      deliverGoods({
        month,
      }).then((resp) => {
        if (resp && resp.data.success) {
          let data = JSON.parse(resp.data.data);
          if (!data) {
            return false;
          }
          data.list.forEach((item) => {
            if (item.name == this.mixingStation) {
              this.thThisMonth = item.thThisMonth.toFixed(1);
              this.zcThisMonth = item.zcThisMonth.toFixed(1);
              this.shThisMonth = item.shThisMonth.toFixed(1);
              this.fhThisMonth = item.fhThisMonth.toFixed(1);
              this.qsThisMonth = item.qsThisMonth.toFixed(1);
            }
          });
          this.echartSetOption();
        }
      });

      getMonthBack({sitename: site}).then((res) => {
        if (res.status == 200) {
          this.listData = res.data.data;
        }
      });
    },
    clearData() {
    },
    echartInit() {
      // 基于准备好的dom，初始化echarts实例
      chartDom = this.$echarts.init(
        document.getElementById("myChart" + this.index)
      );
    },
    echartSetOption() {
      var self = this;
      // const all = Number(this.fhThisMonth) + Number(this.zcThisMonth);
      var data = [
        {
          name: "已签",
          value: this.shThisMonth,
          icon: "circle",
        },
        {
          name: "未签",
          value: this.thThisMonth,
          icon: "circle",
        }
      ];

      option = {
        title: {
          text: `转场\n${this.zcThisMonth}`,
          left: "158px",
          top: "35%",
          textAlign: "center",
          itemGap: 0,
          textStyle: {
            color: "#FFFFFF",
            fontSize: "30",
            fontWeight: 400,
            fontFamily: this.app.echartFontFamily
          },
          subtextStyle: {
            color: "rgba(255, 255, 255, 0.4)",
            fontSize: "17",
            fontWeight: 400,
            lineHeight: "30",
          },
        },
        legend: {
          orient: "horizontal",
          left: "45%",
          top: "30%",
          data,
          itemGap: 180,
          textStyle: {
            fontFamily: this.$store.state.app.echartFontFamily,
            color: "#FFFFFF",
            fontSize:30,
          },

          formatter: function (name) {
            var value = "";
            data.forEach((item) => {
              if (item.name == name) {
                value = item.value;
              }
            });
            return name + "\n" + value;
          },
        },
        series: [
          {
            name: "需求类型占比",
            type: "pie",
            center: ["164", "50%"],
            radius: [114, "75%"],
            label: {
              normal: {
                show: false,
                position: "center",
                formatter: "{value|{c}}\n{label|{b}}",
              },
            },
            labelLine: {
              show: false,
              length: 0,
              length2: 0,
            },
            data,
          },

          {
            name: "刻度间隔",
            type: "gauge",
            radius: "75%",
            center: ["164", "50%"],
            startAngle: 0,
            endAngle: 360,
            splitNumber: 20,
            hoverAnimation: true,
            splitLine: {
              show: false,
              distance: 20,
              length: 10,
              lineStyle: {
                width: 1,
                color: "#2D4C66",
              },
            },
            axisTick: {
              length: 20,
              lineStyle: {
                width: 1,
                color: "#2D4C66",
              },
            },
            axisLabel: {
              show: false,
            },
            pointer: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                opacity: 0,
              },
            },
            detail: {
              show: false,
            },
            data: [0],
          },
        ],
      };
      // 绘制图表
      chartDom.setOption(option);
    },
  },
  watch: {},
};
</script>

<style lang="less" scoped>
.table-head {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 28px;
  color: #25e3ff;
  margin-top: 42px;
  margin-bottom: 28px;

  div:first-child {
    margin: 0 137px 0 55px;
  }

  div:nth-child(2) {
    margin-right: 58px;
  }

  div:nth-child(3) {
    margin-right: 40px;
  }
}

.table-father {
  height: 650px;
  // background-color: pink;
  overflow: hidden;

  .table-box {
    overflow: hidden;
    -webkit-animation: 30s move infinite linear;
  }
}

@-webkit-keyframes move {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(0, -100%);
  }
}

.list {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 847px;
  height: 132px;
  // border: 1px dashed #1CFFFC;
  margin-bottom: 18px;
  color: #ccdcde;
  font-size: 28px;
  overflow: hidden;
  background: url(../../assets/detailImg/list1.jpg);

  div:first-child {
    margin-left: 4px;
    margin-right: 10px;
    width: 260px;
    height: 100%;
    margin-top: 20px;
    overflow: hidden;
   
  }

  div:nth-child(2) {
    margin-top: 20px;
    width: 280px;
    height: 100%;    
  }

  div:nth-child(3) {
    margin-left: 16px;
    width: 100px;
    height: 100%;
    text-align: center;
    // line-height: 132px;
    margin-top: 30px;
  }
  div:nth-child(4) {
    width: 170px;
    height: 100%;
    margin-top: 30px;
  }
}

.title-box {
  height: 63px;
  img {
    height: 100%;
    width: 814px;
  }
}

.chart {
  margin-top: 20px;
}
</style>
