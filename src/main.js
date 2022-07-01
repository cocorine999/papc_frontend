import Vue from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

// custom import
import './main.css';
import './assets/css/fonts.css';
import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);


Vue.config.productionTip = false;

// const router = new VueRouter({
//   mode: 'history',
//   routes: [
//     { 
//       path: '/:catchAll(.*)', 
//       component: NotFoundComponent,
//       name: 'NotFound'
//     }
//   ]
// });

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
