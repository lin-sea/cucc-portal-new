<template>
  <div class="title-cucc">
    <h2>原材料出入库</h2>
    <div style="margin-top: 20px">
      <el-radio-group v-model="radio" size="small">
        <el-radio-button label="粉料"></el-radio-button>
        <el-radio-button label="骨料"></el-radio-button>
        <el-radio-button label="液剂"></el-radio-button>
      </el-radio-group>
    </div>
    <div v-for="(item1, index1) in showList" :key="index1">
        <div>{{item1}}</div>
        <div v-for="(item2, index2) in data[radio][item1]" :key="index2">
            <div>{{item2.materialNameJ + ':' + item2.valueStock}}</div>
        </div>
    </div>
  </div>
</template>

<script>
import { stockInMixingStationByMaterial } from "@/api/detail/detail";
export default {
  name: "RawMaterial",
  props: {
    index: {
      type: String,
      default: "0",
    },
  },
  data() {
    return {
      mixingStation: "",
      radio: "粉料",
      radio1: '',
      data: [],
      showValue:[],
      showList:[]
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.mixingStation = this.$route.query.mixingStation;
      stockInMixingStationByMaterial({
        mixingStation: this.mixingStation,
      }).then((resp) => {
        if (resp && resp.data.success) {
          var data = resp.data.data;
          if (!data) {
            return false;
          }
          this.data = data;
          this.changeData()
        }
      });
    },
    changeData(){
        this.showList = Object.keys(this.data[this.radio])
    },
  },
  watch: {
      radio(){
          this.changeData()
      }
  },
};
</script>

<style lang="less" scoped>
</style>
