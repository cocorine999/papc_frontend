import Vue from "vue";
import VueRouter from "vue-router";
import index from "../views/index.vue";
import ano from "../views/dashboard/ano/index.vue";
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
