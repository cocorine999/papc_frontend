import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

/* layouts */
const DashboardLayout = () => import('../layouts/Dashboard.vue');

/* componemts */
// const BailleursClild = () => import('../components/dashboard/Bailleurs');

Vue.use(VueRouter);

const contentDashboards = (prop) => [
  {
    path: 'bailleurs',
    name: prop + '.bailleurs',
//     meta: { auth: true, name: 'Home 1', layout: 'mini-sidebar-right-fix' },
    component: DashboardLayout,
  },
]

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { auth: true },
    children: contentDashboards('dashboard')
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardLayout,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
