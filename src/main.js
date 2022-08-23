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
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

import Vuelidate from 'vuelidate';
Vue.component('apexchart', VueApexCharts)

Vue.use(Vuelidate);
Vue.use(VueApexCharts)
Vue.use(VueToast,{
  position: 'top-right',
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
