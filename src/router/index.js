import Vue from "vue";
import VueRouter from "vue-router";
import index from "../views/index.vue";
import ano from "../views/dashboard/ano/index.vue";
// import bailleurs from "../views/dashboard/bailleurs/index.vue";
import checklist from "../views/dashboard/checklist/index.vue";
import checklist_create from "../views/dashboard/checklist/create.vue";
import entreprises from "../views/dashboard/entreprises/index.vue";
// import fileManager from "../views/dashboard/fileManager/index.vue";
// import indicateurs from "../views/dashboard/indicateurs/index.vue";
import missioncontrole from "../views/dashboard/mission-controle/index.vue";
import mod from "../views/dashboard/mod/index.vue";
// import ppm from "../views/dashboard/ppm/index.vue";
// import profil from "../views/dashboard/profil/index.vue";
// import programme from "../views/dashboard/programme/index.vue";
// import projets from "../views/dashboard/projets/index.vue";
import pta from "../views/dashboard/pta/index.vue";
// import unitegestion from "../views/dashboard/unite-gestion/index.vue";
// import utilisateurs from "../views/dashboard/utilisateurs/index.vue";
// import config from "../views/dashboard/config/index.vue";
// import dashboard from "../views/dashboard/index.vue";
import unite_gestion from "../views/dashboard/unite-gestion/index.vue";
import indicateurs from "../views/dashboard/indicateurs/index.vue";
import indicateurs_suivi from "../views/dashboard/indicateurs/suivi/index.vue";
import programme from "../views/dashboard/programme/index.vue";
import finances_decaissement from "../views/dashboard/finances/decaissement.vue";
import finances_suivi from "../views/dashboard/finances/suivi.vue";
import config_unites from "../views/dashboard/config/unites/index.vue";
import config_categories from "../views/dashboard/config/categories/index.vue";
import utilisateurs from "../views/dashboard/utilisateurs/index.vue";
import finances_plan_decaissement from "../views/dashboard/finances/plan_decaissement.vue";
import projets from "../views/dashboard/projets/index.vue";
import dashboard_projets_activites_globale from "../views/dashboard/projets/activites-globale/index.vue";
import dashboard_projets_taches_globale from "../views/dashboard/projets/taches-globale/index.vue";
import dashboard_projets_composantes_globale from "../views/dashboard/projets/composantes-globale/index.vue";
import dashboard_projets_sous_composantes_globale from "../views/dashboard/projets/sous-composantes-globale/index.vue";
import projets_id_details from "../views/dashboard/projets/_id/details.vue";
import bailleurs from "../views/dashboard/bailleurs/index.vue";
import fileManager from "../views/dashboard/fileManager/index.vue";
import demo from "../views/demo.vue";
import instutitions from "../views/dashboard/instutitions/index.vue";
import paps from "../views/dashboard/paps/index.vue";
import ong from "../views/dashboard/ong/index.vue";
import profil from "../views/dashboard/profil/index.vue";

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
  {
    path: "/dashboard/checklist",
    name: "checklist",
    component: checklist,
  },
  {
    path: "/dashboard/checklist/create",
    name: "checklist_create",
    component: checklist_create,
  },
  {
    path: "/dashboard/entreprises",
    name: "entreprises",
    component: entreprises,
  },
  {
    path: "/dashboard/instutitions",
    name: "instutitions",
    component: instutitions,
  },
  {
    path: "/dashboard/PAP",
    name: "paps",
    component: paps,
  },
  {
    path: "/dashboard/ong",
    name: "ong",
    component: ong,
  },
  
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
  {
    path: "/dashboard/mission-controle",
    name: "missioncontrole",
    component: missioncontrole,
  },
  {
    path: "/dashboard/mod",
    name: "mod",
    component: mod,
  },
  {
    path: "/dashboard/profil",
    name: "profil",
    component: profil,
  },

  // {
  //   path: "/dashboard/ppm",
  //   name: "ppm",
  //   component: ppm,
  // },
  //
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
  
  {
    path: "/dashboard/bailleurs",
    name: "bailleurs",
    component: bailleurs,
  },
  {
    path: "/dashboard/utilisateurs",
    name: "utilisateurs",
    component: utilisateurs,
  },
  {
    path: "/dashboard/programme",
    name: "programme",
    component:programme,
  },
  {
    path: "/dashboard/unite-gestion",
    name: "unite_gestion",
    component: unite_gestion,
  },
  {
    path: "/dashboard/projets",
    name: "projets",
    component: projets,
  },
  {
    path: "/dashboard/fileManager",
    name: "fileManager",
    component: fileManager,
  },
  {
    path: "/dashboard/projets/:id/details",
    component: projets_id_details,
    name: "projets_id_details"
  },
  , 
  {
    path: "/dashboard/projets/activites-globale",
    component: dashboard_projets_activites_globale,
    name: "dashboard_projets_activites_globale"
  }, 
   {
    path: "/dashboard/projets/composantes-globale",
    component:dashboard_projets_composantes_globale,
    name: "dashboard_projets_composantes_globale"
  }, 
  {
    path: "/dashboard/projets/sous-composantes-globale",
    component:dashboard_projets_sous_composantes_globale,
    name: "dashboard_projets_sous_composantes_globale"
  }, 
  {
    path: "/dashboard/projets/taches-globale",
    component: dashboard_projets_taches_globale,
    name: "dashboard_projets_taches_globale"
  },
  {
    path: "/dashboard/indicateurs",
    component: indicateurs,
    name: "indicateurs"
  }, 
  {
    path: "/dashboard/indicateurs/suivi",
    component:indicateurs_suivi,
    name: "indicateurs_suivi"
  }, 
  {
    path: "/dashboard/finances/decaissement",
    component:finances_decaissement,
    name: "finances_decaissement"
  }, 
  {
    path: "/dashboard/finances/suivi",
    component:finances_suivi,
    name: "finances_suivi"
  }, 
  {
    path: "/dashboard/finances/plan_decaissement",
    component:finances_plan_decaissement,
    name: "finances_plan_decaissement"
  },
  {
    path: "/dashboard/config/categories",
    component: config_categories,
    name: "config_categories"
  },
  {
    path: "/dashboard/config/unites",
    component: config_unites,
    name: "config_unites"
  },

];
const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
