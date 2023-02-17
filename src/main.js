import Vue from "vue";
import App from "./App.vue";

import router from "./router"; 
import store from "./store";




// custom import
import './main.css';
import './assets/css/fonts.css';
import 'boxicons/css/boxicons.min.css';
import VueApexCharts from 'vue-apexcharts'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import numeral from 'numeral';
import numFormat from 'vue-filter-number-format';

import Vuelidate from 'vuelidate';
Vue.component('apexchart', VueApexCharts)

Vue.use(require('vue-moment'));

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
});

Vue.filter('numFormat', numFormat(numeral));

Vue.filter("formatNumber", function (value) {
  return new Intl.NumberFormat().format(value)
  //return numeral(value).format("0,0");  displaying other groupings/separators is possible, look at the docs
});

import vTitle from 'vuejs-title'
Vue.use(vTitle,{
  fontSize: "12px",
  padding: "12px"
})




Vue.use(Vuelidate);
Vue.use(VueApexCharts)
Vue.use(VueToast,{
  position: 'top-right',
  duration:5000
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
