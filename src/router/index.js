import Vue from "vue";
import VueRouter from "vue-router";
import index from "../views/index.vue";
import ano from "../views/dashboard/ano/index.vue";
// import bailleurs from "../views/dashboard/bailleurs/index.vue";
// import checklist from "../views/dashboard/checklist/index.vue";
// import entreprises from "../views/dashboard/entreprises/index.vue";
// import fileManager from "../views/dashboard/fileManager/index.vue";
// import indicateurs from "../views/dashboard/indicateurs/index.vue";
// import missioncontrole from "../views/dashboard/mission-controle/index.vue";
// import mod from "../views/dashboard/mod/index.vue";
// import ppm from "../views/dashboard/ppm/index.vue";
// import profil from "../views/dashboard/profil/index.vue";
// import programme from "../views/dashboard/programme/index.vue";
// import projets from "../views/dashboard/projets/index.vue";
import pta from "../views/dashboard/pta/index.vue";
// import unitegestion from "../views/dashboard/unite-gestion/index.vue";
// import utilisateurs from "../views/dashboard/utilisateurs/index.vue";
// import config from "../views/dashboard/config/index.vue";
// import dashboard from "../views/dashboard/index.vue";
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
  // {
  //   path: "/dashboard/",
  //   name: "dashboard",
  //   component: dashboard,
  // },
  {
    path: "/dashboard/ano",
    name: "ano",
    component: ano,
  },
  // {
  //   path: "/dashboard/bailleurs",
  //   name: "bailleurs",
  //   component: bailleurs,
  // },
  // {
  //   path: "/dashboard/checklist",
  //   name: "checklist",
  //   component: checklist,
  // },
  // {
  //   path: "/dashboard/entreprises",
  //   name: "entreprises",
  //   component: entreprises,
  // },
  // {
  //   path: "/dashboard/fileManager",
  //   name: "fileManager",
  //   component: fileManager,
  // },
  // {
  //   path: "/dashboard/indicateurs",
  //   name: "indicateurs",
  //   component: indicateurs,
  // },
  // {
  //   path: "/dashboard/mission-controle",
  //   name: "missioncontrole",
  //   component: missioncontrole,
  // },
  // {
  //   path: "/dashboard/mod",
  //   name: "mod",
  //   component: mod,
  // },
  // {
  //   path: "/dashboard/ppm",
  //   name: "ppm",
  //   component: ppm,
  // },
  // {
  //   path: "/dashboard/profil",
  //   name: "profil",
  //   component: profil,
  // },
  // {
  //   path: "/dashboard/programme",
  //   name: "programme",
  //   component: programme,
  // },
  // {
  //   path: "/dashboard/projets",
  //   name: "projets",
  //   component: projets,
  // },
  {
    path: "/dashboard/pta",
    name: "pta",
    component: pta,
  },
  // {
  //   path: "/dashboard/unite-gestion",
  //   name: "unitegestion",
  //   component: unitegestion,
  // },
  // {
  //   path: "/dashboard/utilisateurs",
  //   name: "utilisateurs",
  //   component: utilisateurs,
  // },
  // {
  //   path: "/dashboard/config",
  //   name: "config",
  //   component: config,
  // },
  
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
