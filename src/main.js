import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";


// custom import
import './main.css';
import './assets/css/fonts.css';
import 'boxicons/css/boxicons.min.css';
import VueApexCharts from 'vue-apexcharts'


import Vuelidate from 'vuelidate';
Vue.component('apexchart', VueApexCharts)
Vue.use(Vuelidate);
Vue.use(VueApexCharts)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
