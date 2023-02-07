<template>
  <div class="title-cucc">
    <div class="title-box">
      <img :src="titleImg" alt=".." />
      <span :style="{ fontFamily: app.echartFontFamily }"> 操作列表 </span>
    </div>
    <div class="table-head">
      <div>站点</div>
      <div>时间</div>
      <div>申请人名称</div>
      <div>操作部位</div>
    </div>

    <div class="table-box">
      <div
        class="table-list"
        v-for="(item, index) in tableData"
        :key="index"
        :style="{ background: index % 2 === 0 ? '#17345C' : '#000029' }"
        @click="handleSendSocket(item)"
      >
        <div>{{ item.sitename }}</div>
        <div>{{ item.CreatedTime }}</div>
        <div>{{ item.OwnerId }}</div>
        <div>{{ item.position }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getPostEquipment } from "@/api/home/home";
import titleImg from "../../assets/homeImg/newBigTitle.png";
import { contactSocket, doSend } from "../../utils/websocket";
let interval;
let int;
let webSocket = null;
let socketOpen = false;
export default {
  name: "PostEquipmentRepair",
  data() {
    return {
      titleImg,
      tableData: [],
    };
  },
  computed: {
    ...mapState(["app"]),
  },
  mounted() {
    this.initScokt();
    this.getData();
    setInterval(() => {
      clearInterval(int);
      clearInterval(interval);
      this.getData();
    }, this.app.timing);
  },
  methods: {
    initScokt() {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
        return false;
      }

      webSocket = new WebSocket("ws://127.0.0.1:11008");
      webSocket.onopen = this.sockOpen;
      webSocket.onclose = this.sockClose;
      webSocket.onerror = this.sockError;
    },

    sockError() {
      console.log("链接error");
      socketOpen = false;
      // setTimeout(() => {
      //   this.initScokt();
      // }, 10 * 1000);
    },

    sockClose() {
      console.log("链接close");
      socketOpen = false;
      setTimeout(() => {
        this.initScokt();
      }, 10 * 1000);
    },

    sockOpen() {
      console.log("链接open");
      socketOpen = true;
    },

    sendSocket(data) {
      if (socketOpen) {
        console.log("发送sock");
        webSocket.send(data);
      }
    },

    getData() {
      getPostEquipment().then((res) => {
        if (res.status === 200) {
          const { data } = res.data;
          let times = 0;
          int = setInterval(() => {
            this.tableData = data.slice(times * 5, (times + 1) * 5);
            if (times > 1) {
              times = 0;
            } else {
              times += 1;
            }
          }, 4000);
          // this.tableData = data;
          this.circulateSend(data);
        }
      });
    },

    circulateSend(data) {
      let time = 0;
      interval = setInterval(() => {
        if (time === data.length) {
          time = 0;
        } else {
          const urlData = data[time].address;
          const address = `{"cmdName":"OpenRTSPSingle","cmdValue":"${urlData}"}`;
          // doSend(address);

          this.sendSocket(address);
          time += 1;
        }
      }, 20000);
    },

    handleSendSocket(data) {
      clearInterval(interval);
      const address = `{"cmdName":"OpenRTSPSingle","cmdValue":"${data.address}"}`;
      // doSend(address);
      this.sendSocket(address);

      this.circulateSend(this.tableData);
    },
  },
};
</script>

<style lang='less' scoped>
.title-cucc {
  background: #010813;
  .table-head {
    font-size: 30px;
    color: #ff4f66;
    margin-top: 10px;
    margin-bottom: 30px;
    display: flex;
    justify-content: flex-start;
    div:first-child {
      margin-left: 63px;
    }
    div:nth-child(2) {
      margin-left: 470px;
    }
    div:nth-child(3) {
      margin-left: 460px;
    }
    div:nth-child(4) {
      margin-left: 434px;
    }
  }
  .table-box {
    height: 392px;
    overflow: hidden;
  }

  .table-list {
    display: flex;
    justify-content: flex-start;
    font-size: 30px;
    height: 78px;
    line-height: 78px;
    div:first-child {
      width: 150px;
      margin-left: 18px;
      text-align: center;
    }
    div:nth-child(2) {
      width: 300px;
      margin-left: 320px;
      text-align: center;
    }
    div:nth-child(3) {
      width: 150px;
      text-align: center;
      margin-left: 330px;
    }
    div:nth-child(4) {
      width: 300px;
      text-align: center;
      margin-left: 344px;
    }
  }
}

.title-box {
  position: relative;

  img {
    margin-top: 20px;
    width: 100%;
    height: 100%;
  }

  span {
    position: absolute;
    color: #5cacc5;
    font-size: 37px;
    margin: 0;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
