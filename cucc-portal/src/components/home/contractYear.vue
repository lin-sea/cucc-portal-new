<template>
  <div>
    <div class="title-cucc">
      <div class="title-box">
        <img :src="titleImg" alt="" />
        <span>当月新增合同量</span>
      </div>
      <div class="all">合同新增总量：{{ sumNum }}</div>
      <div :id="'myChart' + index" style="height: 80%"></div>
      <!-- <div style="height: 60%">
        <div v-for="(item, index) in data" :key="index">{{ item.name }}: {{ item.value }} </div>
      </div> -->
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
import { contractNotClosed } from "@/api/home/home";
import titleImg from "../../assets/homeImg/newSmallTitle.png";
let chartDom;
export default {
  name: "ContractYear",
  props: {
    index: {
      type: String,
      default: "0",
    },
  },
  data() {
    return {
      titleImg,
      data: [],
      sumNum: 0
    };
  },
  computed: {
    ...mapState(["app"]),
  },
  mounted() {
    this.getData();
    setInterval(()=>{
      this.data = []
    this.getData();

    },this.app.timing)
  },
  methods: {
    getData() {
      contractNotClosed().then((resp) => {
        if (resp && resp.data.success) {
          var data = resp.data.data;
          if (!data) {
            return false;
          }

          const sumArr = Object.values(resp.data.data)
          const sum = sumArr.reduce((pre,next)=>{
            return pre + next
          })
          this.sumNum = sum
          for (var item in data) {
            this.data.push({
              name: item,
              value: data[item],
            });
          }

          this.initChart();
          //   console.log(this.data)
        }
      });
    },

    initChart() {
      chartDom = this.$echarts.init(
        document.getElementById("myChart" + this.index)
      );
      this.setOption();
    },

    setOption() {
      const yData = this.data.map((item) => item.name);
      const xData = this.data.map((item) => item.value);
      const option = {
        grid: {
          left: 2,
          right: 2,
          bottom: 2,
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          type: "value",
          splitLine: false,
          axisTick: {
            show: false, //刻度线
          },
          axisLine: {
            show: false, //隐藏y轴
          },
          axisLabel: {
            show: false, //隐藏刻度值
          },
          // axisLabel: {
          //   color: "#fff",
          //   fontSize: 22,
          // },
        },
        yAxis: {
          type: "category",
          data: yData,
          axisLabel: {
            color: "#fff",
            fontSize: 26,
            fontFamily: this.$store.state.app.echartFontFamily,
  
          },
        },
        series: [
          {
            name: "2011",
            type: "bar",
            data: xData,
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: "#F59332", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#FFCA72", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            label: {
              normal: {
                show: true,
                position: "right",
                color: "#fff",
                fontSize: 26,
              },
            },
          },
        ],
      };
      chartDom.setOption(option);
    },
  },
};
</script>

<style lang="less" scoped>
.all {
  font-size: 26px;
  color: #5cacc5;
  text-align: right;
  margin-top: 14px;
}
.title-box {
  position: relative;

  img {
    width: 100%;
    height: 100%;
  }

  span {
    position: absolute;
    color: #5cacc5;
    font-size: 37px;
    margin: 0;
    left: 50%;
    // top: 45%;
    margin-top: -26px;
    transform: translateX(-50%);
  }
}
</style>
