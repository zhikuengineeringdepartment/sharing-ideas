import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import store from "./store/store";
import router from "./router/router";
import axios from "axios";
import Vueaxios from "vue-axios";
import Qs from "qs";
import animate from "animate.css";
import * as functions from "./app/modules/functions";

// 创建一个axios实例
const axiosInstance = axios.create({
  // config里面有这个transformRquest，这个选项会在发送参数前进行处理，这时候我们通过Qs.stringify转换为表单查询参数
  transformRequest: [
    function(data) {
      data = Qs.stringify(data);
      return data;
    }
  ],

  // 设置Content-Type
  headers: { "Content-Type": "application/x-www-form-urlencoded" },

  // 可携带cookies
  withCredentials: true,
  baseURL:
    process.env.NODE_ENV === "production"
      ? "http://sharingideas.cn/"
      : "/api" // 正式环境与开发环境的url
});

Vue.use(animate);
Vue.use(ElementUI);
Vue.use(Vueaxios, axiosInstance);
Vue.config.productionTip = false;
Vue.prototype.$fn = functions;

// 页面初始化时先判断是手机端还是电脑端
store.commit("changeMode", window.innerHeight > window.innerWidth);

// 修改窗口大小时的操作，用于判断手机端或电脑端，使用节流函数
window.onresize = () => {
  store.commit("changeMode", window.innerHeight > window.innerWidth);
};
/**
* 关闭或者离开页面时候发请求
* 参考网上说必须发同步请求，所以不能用axsio
* 用了最原始的Ajax
*/
window.onbeforeunload = ()=>{
  let xhr;
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xhr = new XMLHttpRequest();
  } else {
  // code for IE6, IE5
  xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  //发送同步请求
  let apiPath = process.env.NODE_ENV === "production"
  ? "dataStatistics/access"
  : "api/dataStatistics/access" // 正式环境与开发环境的url
  xhr.open("POST",apiPath, false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  // lastURI: "/",          //上一个页面uri
  // nextURI: "/resources",      //即将跳转的页面uri
  let lastURI = this.$route.path;
  let nextURI = null;
  // let parm = "lastURI=" + lastURI + "&nextURI=" + nextURI;
  let postData = {"lastURI":lastURI,"nextURI":nextURI};
  xhr.send(postData);
};
// 这个版本是使用节流函数的，不过貌似在这里使用节流函数效果更差
// window.onresize = throttle(() => {
//   store.commit('changeMode', window.innerHeight > window.innerWidth);
// }, 1000);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
