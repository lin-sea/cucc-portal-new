<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      // fullscreen: true,
    };
  },
  mounted() {
    const isDev = process.env.NODE_ENV
    if(isDev !== "development") {
      document.body.style.overflow = 'hidden'
    }
  },
};
</script>

<style lang='less'>
@import "./style/index.css";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #252350;
  /* margin-top: 60px; */
}

body {
  margin: 0;
  // overflow: hidden;
}

.title-cucc {
  width: 100%;
  height: 550px;
  color: #ffffff;
}

.title-cucc1 {
  width: 100%;
  height: 540px;
  color: #ffffff;
  overflow: hidden;

  .cucc-con {
    width: 880px;
    margin: 0 auto;
  }
}

.title-box {
  position: relative;

  img {
    width: 100%;
    height: 100%;
    // margin-top: 20px;
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

/* .title-text {
  font-size: 32px;

} */

</style>
