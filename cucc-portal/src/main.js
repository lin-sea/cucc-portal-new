// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as echarts from 'echarts';
import 'echarts-liquidfill'
import store from './store/'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueAMap from 'vue-amap'


Vue.use(ElementUI)
Vue.use(VueAMap)

Vue.prototype.$axios = axios

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
VueAMap.initAMapApiLoader({
  // 高德地图key
  key: '76e26ebbe72f2ede34872e8d3d064e48',
  plugin: [
    'AMap.Autocomplete', // 输入提示插件
    'AMap.PlaceSearch', // POI搜索插件
    'AMap.Scale', // 右下角缩略图插件 比例尺
    'AMap.OverView', // 地图鹰眼插件
    'AMap.ToolBar', // 地图工具条
    'AMap.MapType', // 类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
    'AMap.PolyEditor', // 编辑 折线多，边形
    'AMap.CircleEditor', // 圆形编辑器插件
    'AMap.Geolocation', // 定位控件，用来获取和展示用户主机所在的经纬度位置
    'AMap.ControlBar'   // 缩放、尺寸控制器
  ],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.15',
})
window._AMapSecurityConfig = {
  // 高德地图securitykey
  securityJsCode: 'a5d125dee656f8c713b149701467490d'
  // securityJsCode: process.env.VUE_MAP_SECURITYKEY
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
