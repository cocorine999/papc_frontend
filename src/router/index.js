import Vue from "vue";
import VueRouter from "vue-router";

import index from "../views/index.vue";
import ano from "../views/dashboard/ano/index.vue";
import role_permission from "../views/dashboard/role_permission/index.vue";
import liens from "../views/liens.vue";

import form_gestion_generator from "../views/dashboard/form/_id/generator.vue";

//checklist environment unite de gestion
import unite_de_gestion_checklist from "../views/dashboard/environements/unite-gestion/_id/checklist.vue";

import unite_de_gestion_checklist_details from "../views/dashboard/environements/unite-gestion/_id/_id/details.vue";
import unite_de_gestion_checklist_create from "../views/dashboard/environements/unite-gestion/create.vue";
import unite_de_gestion_checklist_entreprise from "../views/dashboard/environements/unite-gestion/index.vue";
//checklist environment unite de gestion

//checklist environement mod
import mod_checklist from "../views/dashboard/environements/mod/_id/checklist.vue";
//import mod_generator from "../views/dashboard/environements/mod/generator.vue";
import mod_checklist_details from "../views/dashboard/environements/mod/_id/_id/details.vue";
import mod_checklist_create from "../views/dashboard/environements/mod/create.vue";
import mod_checklist_entreprise from "../views/dashboard/environements/mod/index.vue";

//fin checklist environment mod

//checklist environement mission-controle
import mission_controle_checklist from "../views/dashboard/environements/mission-controle/_id/checklist.vue";
//import mission_controle_generator from "../views/dashboard/environements/mission-controle/generator.vue";
import mission_controle_checklist_details from "../views/dashboard/environements/mission-controle/_id/_id/details.vue";
import mission_controle_checklist_create from "../views/dashboard/environements/mission-controle/create.vue";
import mission_controle_checklist_entreprise from "../views/dashboard/environements/mission-controle/index.vue";
//checklist environment mission-controle

//checklist environement entreprise
import entreprise_checklist from "../views/dashboard/environements/entreprise/_id/checklist.vue";
//import entreprise_generator from "../views/dashboard/environements/entreprise/generator.vue";
import entreprise_checklist_details from "../views/dashboard/environements/entreprise/_id/_id/details.vue";
import entreprise_checklist_create from "../views/dashboard/environements/entreprise/create.vue";
import entreprise_checklist_entreprise from "../views/dashboard/environements/entreprise/index.vue";

//fin checklist environment entreprise

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
import indicateurs_suivi from "../views/dashboard/indicateurs/_id/suivi.vue";
import programme from "../views/dashboard/programme/index.vue";
import finances_decaissement from "../views/dashboard/finances/decaissement.vue";
import finances_suivi from "../views/dashboard/finances/suivi.vue";
import point_financier from "../views/dashboard/finances/point_financier.vue";
import config_unites from "../views/dashboard/config/unites/index.vue";
import config_types from "../views/dashboard/config/types/index.vue";
import config_categories from "../views/dashboard/config/categories/index.vue";
import config_sinistres from "../views/dashboard/config/sinistres/index.vue";
import config_main_oeuvre from "../views/dashboard/config/main_oeuvre/index.vue";
import utilisateurs from "../views/dashboard/utilisateurs/index.vue";
import finances_plan_decaissement from "../views/dashboard/finances/plan_decaissement.vue";
import projets from "../views/dashboard/projets/index.vue";
import dashboard_projets_activites_globale from "../views/dashboard/projets/activites-globale/index.vue";
import dashboard_projets_taches_globale from "../views/dashboard/projets/taches-globale/index.vue";
import dashboard_projets_composantes_globale from "../views/dashboard/projets/composantes-globale/index.vue";
import dashboard_projets_sous_composantes_globale from "../views/dashboard/projets/sous-composantes-globale/index.vue";
import projets_id_details from "../views/dashboard/projets/_id/details.vue";
import projets_id_cadreLogique from "../views/dashboard/projets/_id/cadre-logique.vue";
import bailleurs from "../views/dashboard/bailleurs/index.vue";
import fileManager from "../views/dashboard/fileManager/index.vue";
import demo from "../views/demo.vue";
import instutitions from "../views/dashboard/instutitions/index.vue";
import paps from "../views/dashboard/paps/index.vue";

import formulaire from "../views/dashboard/formulaire/index.vue";
import formulaire_create from "../views/dashboard/formulaire/create.vue";
import formulaire_id_details from "../views/dashboard/formulaire/_id/suivi.vue";

import profil from "../views/dashboard/profil/index.vue";

/* espace bailleurs */
import dashboard_bailleur from "../views/espaces_bailleurs/dashboard/index.vue";
import ano_bailleur from "../views/espaces_bailleurs/ano/index.vue";
import composantes_bailleur from "../views/espaces_bailleurs/projets/composantes-globale/index.vue";
import sous_composantes_bailleur from "../views/espaces_bailleurs/projets/sous-composantes-globale/index.vue";
import activites_bailleur from "../views/espaces_bailleurs/projets/activites-globale/index.vue";
import taches_bailleur from "../views/espaces_bailleurs/projets/taches-globale/index.vue";
import indicateurs_bailleur from "../views/espaces_bailleurs/indicateurs/index.vue";
import suivi_indicateur_bailleur from "../views/espaces_bailleurs/indicateurs/suivi/index.vue";
import finances_decaissement_bailleur from "../views/espaces_bailleurs/finances/decaissement.vue";
import finances_suivi_bailleur from "../views/espaces_bailleurs/finances/suivi.vue";
import finances_plan_decaissement_bailleur from "../views/espaces_bailleurs/finances/plan_decaissement.vue";
import entreprises_bailleur from "../views/espaces_bailleurs/entreprises/index.vue";
import missioncontrole_bailleur from "../views/espaces_bailleurs/mission-controle/index.vue";
import mod_bailleur from "../views/espaces_bailleurs/mod/index.vue";
import paps_bailleur from "../views/espaces_bailleurs/paps/index.vue";
import ong_bailleur from "../views/espaces_bailleurs/ong/index.vue";
import pta_bailleur from "../views/espaces_bailleurs/pta/index.vue";

/* espace MOD */
import collecteur_mod from "../views/espaces_mod/agetur/index.vue";
import indicateurs_mod from "../views/espaces_mod/indicateurs/index.vue";
import suivi_indicateur_mod from "../views/espaces_mod/indicateurs/suivi/index.vue";
import entreprises_mod from "../views/espaces_mod/entreprises/index.vue";
import missioncontrole_mod from "../views/espaces_mod/mission-controle/index.vue";
import ong_mod from "../views/espaces_mod/ong/index.vue";

/* espace MOD */
import entreprises_mo from "../views/espaces_mo/entreprises/index.vue";
import missioncontrole_mo from "../views/espaces_mo/mission-controle/index.vue";
import ong_mo from "../views/espaces_mo/ong/index.vue";
/*  componemts */
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
    path: "/dashboard/roles",
    name: "role_permission",
    component: role_permission,
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
  {
    path: "/liens",
    name: "liens",
    component: liens,
  },

  {
    path: "/form/:id",
    name: "form_gestion_generator",
    component: form_gestion_generator,
  },
  // checklist unite de gestion
  {
    path: "/dashboard/unite-gestion/checklist/:id/checklist",
    name: "unite_de_gestion_checklist",
    component: unite_de_gestion_checklist,
  },

  {
    path: "/dashboard/unite-de-gestion/checklist/:id/checklist/:id/details",
    name: "unite_de_gestion_checklist_details",
    component: unite_de_gestion_checklist_details,
  },

  {
    path: "/dashboard/unite-de-gestion/checklist/create",
    name: "unite_de_gestion_checklist_create",
    component: unite_de_gestion_checklist_create,
  },
  {
    path: "/dashboard/unite-gestion/checklist",
    name: "unite_de_gestion_checklist_entreprise",
    component: unite_de_gestion_checklist_entreprise,
  },
  //fin checklist de gestion

  // checklist mod
  {
    path: "/dashboard/mod/checklist/:id/checklist",
    name: "mod_checklist",
    component: mod_checklist,
  },

  {
    path: "/dashboard/mod/checklist/:id/checklist/:id/details",
    name: "mod_checklist_details",
    component: mod_checklist_details,
  },

  {
    path: "/dashboard/mod/checklist/create",
    name: "mod_checklist_create",
    component: mod_checklist_create,
  },
  {
    path: "/dashboard/mod/checklist",
    name: "mod_checklist_entreprise",
    component: mod_checklist_entreprise,
  },
  //fin checklist de mod

  // checklist mission-controle
  {
    path: "/dashboard/mission-controle/checklist/:id/checklist",
    name: "mission_controle_checklist",
    component: mission_controle_checklist,
  },

  {
    path: "/dashboard/mission-controle/checklist/:id/checklist/:id/details",
    name: "mission_controle_checklist_details",
    component: mission_controle_checklist_details,
  },

  {
    path: "/dashboard/mission-controle/checklist/create",
    name: "mission_controle_checklist_create",
    component: mission_controle_checklist_create,
  },
  {
    path: "/dashboard/mission-controle/checklist",
    name: "mission_controle_checklist_entreprise",
    component: mission_controle_checklist_entreprise,
  },
  //fin checklist de mission-controle

  // checklist entreprise
  {
    path: "/dashboard/entreprise/checklist/:id/checklist",
    name: "entreprise_checklist",
    component: entreprise_checklist,
  },

  {
    path: "/dashboard/entreprise/checklist/:id/checklist/:id/details",
    name: "entreprise_checklist_details",
    component: entreprise_checklist_details,
  },

  {
    path: "/dashboard/entreprise/checklist/create",
    name: "entreprise_checklist_create",
    component: entreprise_checklist_create,
  },
  {
    path: "/dashboard/entreprise/checklist",
    name: "entreprise_checklist_entreprise",
    component: entreprise_checklist_entreprise,
  },
  //fin checklist de entreprise

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
    path: "/dashboard/formulaire",
    name: "formulaire",
    component: formulaire,
  },
  {
    path: "/dashboard/formulaire-create",
    name: "formulaire_create",
    component: formulaire_create,
  },
  {
    path: "/dashboard/formulaire/:id/suivi",
    name: "formulaire_id_details",
    component: formulaire_id_details,
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

  //

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
    component: programme,
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
    name: "projets_id_details",
  },
  {
    path: "/dashboard/projets/:id/cadreLogique",
    component: projets_id_cadreLogique,
    name: "projets_id_cadreLogique",
  },
  ,
  {
    path: "/dashboard/projets/activites-globale",
    component: dashboard_projets_activites_globale,
    name: "dashboard_projets_activites_globale",
  },
  {
    path: "/dashboard/projets/composantes-globale",
    component: dashboard_projets_composantes_globale,
    name: "dashboard_projets_composantes_globale",
  },
  {
    path: "/dashboard/projets/sous-composantes-globale",
    component: dashboard_projets_sous_composantes_globale,
    name: "dashboard_projets_sous_composantes_globale",
  },
  {
    path: "/dashboard/projets/taches-globale",
    component: dashboard_projets_taches_globale,
    name: "dashboard_projets_taches_globale",
  },
  {
    path: "/dashboard/indicateurs",
    component: indicateurs,
    name: "indicateurs",
  },
  {
    path: "/dashboard/indicateurs/:id/suivi",
    component: indicateurs_suivi,
    name: "indicateurs_suivi",
  },

  {
    path: "/dashboard/finances/decaissement",
    component: finances_decaissement,
    name: "finances_decaissement",
  },
  {
    path: "/dashboard/finances/suivi",
    component: finances_suivi,
    name: "finances_suivi",
  },
  {
    path: "/dashboard/finances/point-financier",
    component: point_financier,
    name: "point_financier",
  },
  
  {
    path: "/dashboard/finances/plan_decaissement",
    component: finances_plan_decaissement,
    name: "finances_plan_decaissement",
  },
  {
    path: "/dashboard/config/categories",
    component: config_categories,
    name: "config_categories",
  },
  {
    path: "/dashboard/config/sinistres",
    component: config_sinistres,
    name: "config_sinistres",
  },
  {
    path: "/dashboard/config/main_oeuvre",
    component: config_main_oeuvre,
    name: "config_main_oeuvre",
  },
  {
    path: "/dashboard/config/unites",
    component: config_unites,
    name: "config_unites",
  },
  {
    path: "/dashboard/config/types",
    component: config_types,
    name: "config_types",
  },

  // espace bailleurs
  {
    path: "/bailleurs/dashboard",
    name: "dashboard_bailleur",
    component: dashboard_bailleur,
  },
  {
    path: "/bailleurs/ano",
    name: "ano_bailleur",
    component: ano_bailleur,
  },
  {
    path: "/bailleurs/activites",
    component: activites_bailleur,
    name: "activites_bailleur",
  },
  {
    path: "/bailleurs/composantes",
    component: composantes_bailleur,
    name: "composantes_bailleur",
  },
  {
    path: "/bailleurs/sous-composantes",
    component: sous_composantes_bailleur,
    name: "sous_composantes_bailleur,",
  },
  {
    path: "/bailleurs/taches",
    component: taches_bailleur,
    name: "taches_bailleur",
  },
  {
    path: "/bailleurs/indicateurs",
    component: indicateurs_bailleur,
    name: "indicateurs_bailleur",
  },
  {
    path: "/bailleurs/indicateurs/suivi",
    component: suivi_indicateur_bailleur,
    name: "suivi_indicateur_bailleur",
  },
  {
    path: "/bailleurs/finances/decaissement",
    component: finances_decaissement_bailleur,
    name: "finances_decaissement",
  },
  {
    path: "/bailleurs/finances/suivi",
    component: finances_suivi_bailleur,
    name: "finances_suivi_bailleur",
  },
  {
    path: "/bailleurs/finances/plan_decaissement",
    component: finances_plan_decaissement_bailleur,
    name: "finances_plan_decaissement_bailleur",
  },
  {
    path: "/bailleurs/mission-controle",
    name: "missioncontrole_bailleur",
    component: missioncontrole_bailleur,
  },
  {
    path: "/bailleurs/mod",
    name: "mod_bailleur",
    component: mod_bailleur,
  },
  {
    path: "/bailleurs/entreprises",
    name: "entreprises_bailleur",
    component: entreprises_bailleur,
  },
  {
    path: "/bailleurs/PAP",
    name: "paps_bailleur",
    component: paps_bailleur,
  },
  {
    path: "/bailleurs/ong",
    name: "ong_bailleur",
    component: ong_bailleur,
  },
  {
    path: "/bailleurs/pta",
    name: "pta_bailleur",
    component: pta_bailleur,
  },
  // espace Mod
  {
    path: "/mod/collecteur",
    name: "collecteur_mod",
    component: collecteur_mod,
  },
  {
    path: "/mod/indicateurs",
    component: indicateurs_mod,
    name: "indicateurs_mod",
  },
  {
    path: "/mod/indicateurs/suivi",
    component: suivi_indicateur_mod,
    name: "suivi_indicateur_mod",
  },
  {
    path: "/mod/mission-controle",
    name: "missioncontrole_mod",
    component: missioncontrole_mod,
  },

  {
    path: "/mod/entreprises",
    name: "entreprises_mod",
    component: entreprises_mod,
  },

  {
    path: "/mod/ong",
    name: "ong_mod",
    component: ong_mod,
  },

  // espace Mo

  {
    path: "/mo/mission-controle",
    name: "missioncontrole_mo",
    component: missioncontrole_mo,
  },

  {
    path: "/mo/entreprises",
    name: "entreprises_mo",
    component: entreprises_mo,
  },

  {
    path: "/mo/ong",
    name: "ong_mo",
    component: ong_mo,
  },
];
const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
