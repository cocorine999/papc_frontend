import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

/* layouts */
const DashboardLayout = () => import('../layouts/Dashboard.vue')

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardLayout,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
