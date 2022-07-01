import Vue from "vue";
import VueRouter from "vue-router";
import index from "../views/index.vue";
import ano from "../views/dashboard/ano/index.vue";
import unite_gestion from "../views/dashboard/unite-gestion/index.vue";
import bailleurs from "../views/dashboard/bailleurs/index.vue";
import demo from "../views/demo.vue";

/* layouts */
//const DashboardLayout = () => import('../layouts/Dashboard.vue');

/* componemts */
// const BailleursClild = () => import('../components/dashboard/Bailleurs');

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: index,
    meta: { auth: true },
  },
  {
    path: "/demo",
    name: "demo",
    component: demo,
  },
  {
    path: "/dashboard/ano",
    name: "ano",
    component: ano,
  },
  {
    path: "/dashboard/bailleurs",
    name: "bailleurs",
    component: bailleurs,
  },
  {
    path: "/dashboard/unite-gestion",
    name: "unite_gestion",
    component: unite_gestion,
  },
  
];
const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
