import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

import index from "../views/index.vue";
import authPage from "../views/401.vue";
import ano from "../views/dashboard/ano/index.vue";
import role_permission from "../views/dashboard/role_permission/index.vue";
import historique from "../views/dashboard/historique/index.vue";
import notification from "../views/dashboard/notification/index.vue";
import liens from "../views/liens.vue";
import password_update from "../views/password_update.vue";
import newPassword from "../views/reset.vue";
import activation from "../views/_identifiant/active.vue";
import confirm from "../views/_identifiant/confirm.vue";
import resendLink from "../views/_identifiant/resend_link.vue";
import info from "../views/info.vue";
import form_gestion_generator from "../views/dashboard/form/_id/generator.vue";
import form_gestion_generator_general from "../views/dashboard/form/_id/generator_general.vue";
import backup from "../views/dashboard/backup/index.vue";
import dashboard from "../views/dashboard/index.vue";

//checklist environment unite de gestion
import unite_de_gestion_checklist from "../views/dashboard/environements/unite-gestion/_idE/checklist.vue";

import unite_de_gestion_checklist_details from "../views/dashboard/environements/unite-gestion/_idE/_idC/details.vue";
import unite_de_gestion_checklist_create from "../views/dashboard/environements/unite-gestion/create.vue";
import unite_de_gestion_checklist_entreprise from "../views/dashboard/environements/unite-gestion/index.vue";
//checklist environment unite de gestion

//checklist environement mod
import mod_checklist from "../views/dashboard/environements/mod/_idE/checklist.vue";
//import mod_generator from "../views/dashboard/environements/mod/generator.vue";
import mod_checklist_details from "../views/dashboard/environements/mod/_idE/_idC/details.vue";
import mod_checklist_create from "../views/dashboard/environements/mod/create.vue";
import mod_checklist_entreprise from "../views/dashboard/environements/mod/index.vue";

//fin checklist environment mod

//checklist environement mission-controle
import mission_controle_checklist from "../views/dashboard/environements/mission-controle/_idE/checklist.vue";
//import mission_controle_generator from "../views/dashboard/environements/mission-controle/generator.vue";
import mission_controle_checklist_details from "../views/dashboard/environements/mission-controle/_idE/_idC/details.vue";
import mission_controle_checklist_create from "../views/dashboard/environements/mission-controle/create.vue";
import mission_controle_checklist_entreprise from "../views/dashboard/environements/mission-controle/index.vue";
//checklist environment mission-controle

//checklist environement entreprise
import entreprise_checklist from "../views/dashboard/environements/entreprise/_idE/checklist.vue";
//import entreprise_generator from "../views/dashboard/environements/entreprise/generator.vue";
import entreprise_checklist_details from "../views/dashboard/environements/entreprise/_idE/_idC/details.vue";
import entreprise_checklist_create from "../views/dashboard/environements/entreprise/create.vue";
import entreprise_checklist_entreprise from "../views/dashboard/environements/entreprise/index.vue";

import general_checklist_details from "../views/dashboard/formulaire/_id/details.vue";

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
import indicateurs_suivi from "../views/dashboard/indicateurs/suivi.vue";
import indicateurs_suivi_details from "../views/dashboard/indicateurs/_id/suivi.vue";
/*mod indicateur */
import indicateurs_mod from "../views/dashboard/indicateurs_mod/index.vue";
import indicateurs_suivi_mod from "../views/dashboard/indicateurs_mod/suivi.vue";
import indicateurs_suivi_mod_details from "../views/dashboard/indicateurs_mod/_id/suivi.vue";
/* fin indicateur mod */
import programme from "../views/dashboard/programme/index.vue";
import finances_decaissement from "../views/dashboard/finances/decaissement.vue";
import finances_suivi from "../views/dashboard/finances/suivi.vue";
import point_financier from "../views/dashboard/finances/point_financier.vue";
import config_unites from "../views/dashboard/config/unites/index.vue";
import config_types from "../views/dashboard/config/types/index.vue";
import config_sites from "../views/dashboard/config/site/index.vue";
import config_categories from "../views/dashboard/config/categories/index.vue";
import config_sinistres from "../views/dashboard/config/sinistres/index.vue";
import config_main_oeuvre from "../views/dashboard/config/main_oeuvre/index.vue";
import config_alert from "../views/dashboard/config/alert/index.vue";
import config_rappel from "../views/dashboard/config/rappel/index.vue";
import config_backup from "../views/dashboard/config/backup/index.vue";

import utilisateurs from "../views/dashboard/utilisateurs/index.vue";
import finances_plan_decaissement from "../views/dashboard/finances/plan_decaissement.vue";
import projets from "../views/dashboard/projets/index.vue";

import dashboard_projets_activites_globale from "../views/dashboard/projets/activites-globale/index.vue";
import dashboard_projets_activites from "../views/dashboard/projets/composantes/sous-composantes/activites/index.vue";

import dashboard_projets_activites_globale_suivis from "../views/dashboard/projets/activites-globale/_id/suivis.vue";
import dashboard_projets_taches_globale from "../views/dashboard/projets/taches-globale/index.vue";
import dashboard_projets_taches from "../views/dashboard/projets/composantes/sous-composantes/activites/taches.vue";
import dashboard_projets_taches_globale_suivis from "../views/dashboard/projets/taches-globale/_id/suivis.vue";

import dashboard_projets_composantes_globale from "../views/dashboard/projets/composantes-globale/index.vue";
import dashboard_projets_composantes from "../views/dashboard/projets/composantes/index.vue";

import dashboard_projets_composantes_globale_suivis from "../views/dashboard/projets/composantes-globale/_id/suivis.vue";
import dashboard_projets_sous_composantes_globale from "../views/dashboard/projets/sous-composantes-globale/index.vue";
import dashboard_projets_sous_composantes from "../views/dashboard/projets/composantes/sous-composantes/index.vue";
import dashboard_projets_sous_composantes_globale_suivis from "../views/dashboard/projets/sous-composantes-globale/_id/suivis.vue";
import projets_id_details from "../views/dashboard/projets/_id/details.vue";
import projets_id_cadreLogique from "../views/dashboard/projets/_id/cadre-logique.vue";
import bailleurs from "../views/dashboard/bailleurs/index.vue";
import fileManager from "../views/dashboard/fileManager/index.vue";
import demo from "../views/demo.vue";
import instutitions from "../views/dashboard/instutitions/index.vue";
import paps from "../views/dashboard/paps/index.vue";
import collecteur_mod from "../views/dashboard/agetur/index.vue";
import formulaire from "../views/dashboard/formulaire/index.vue";
import formulaire_create from "../views/dashboard/formulaire/create.vue";
import formulaire_id_details from "../views/dashboard/formulaire/_id/suivi.vue";

import profil from "../views/dashboard/profil/index.vue";


/*  componemts */
// const BailleursClild = () => import('../components/dashboard/Bailleurs');

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: index,
    meta: {
      middleware: [guest],
    },
  },

  {
    path: "/demo",
    name: "demo",
    component: demo,
  },
  {
    path: "/401-non-autorise",
    name: "authPage",
    component: authPage,
  },
  {
    path: "/dashboard/backup",
    name: "backup",
    component: backup,
  },
  {
    path: "/changer-mots-de-passe",
    name: "password_update",
    component: password_update,
  },
  {
    path: "/activation/:identifiant",
    name: "activation",
    component: activation,
  },
  {
    path: "/resend-link/:identifiant",
    name: "resendLink",
    component:resendLink,
  },
  {
    path: "/reset_password/:identifiant",
    name: "confirm",
    component: confirm,
  },
  {
    path: "/change-password",
    name: "newPassword",
    component:newPassword,
  },
  {
    path: "/info",
    name: "info",
    component:info,
  },

  {
    path: "/dashboard/roles",
    name: "role_permission",
    component: role_permission,
  },
  {
    path: "/dashboard/historique",
    name: "historique",
    component: historique,
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
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/dashboard/notification",
    name: "notification",
    component: notification,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/dashboard/collecteur",
    name: "collecteur_mod",
    component: collecteur_mod,
    meta: {
      middleware: [auth],
    },
   
  },

  {
    path: "/liens",
    name: "liens",
    component: liens,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: dashboard,
    meta: {
      middleware: [auth],
    },
  },

  {
    path: "/form/:id",
    name: "form_gestion_generator",
    component: form_gestion_generator,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/formGeneral/:id",
    name: "form_gestion_generator_general",
    component: form_gestion_generator_general,
    meta: {
      middleware: [auth],
    },
  },
  // checklist unite de gestion
  {
    path: "/dashboard/unite-gestion/entreprise/:idE/checklist",
    name: "unite_de_gestion_checklist",
    component: unite_de_gestion_checklist,
    meta: {
      middleware: [auth],
    },
  },

  {
    path: "/dashboard/unite-de-gestion/entreprise/:idE/checklist/:idC/details",
    name: "unite_de_gestion_checklist_details",
    component: unite_de_gestion_checklist_details,
    meta: {
      middleware: [auth],
    },
  },

  {
    path: "/dashboard/unite-de-gestion/checklist/create",
    name: "unite_de_gestion_checklist_create",
    component: unite_de_gestion_checklist_create,
    meta: {
      middleware: [auth],
    },
  },

  {
    path: "/dashboard/unite-gestion/checklist",
    name: "unite_de_gestion_checklist_entreprise",
    component: unite_de_gestion_checklist_entreprise,
    meta: {
      middleware: [auth],
    },
  },
  //fin checklist de gestion

  // checklist mod
  {
    path: "/dashboard/mod/entreprise/:idE/checklist",
    name: "mod_checklist",
    component: mod_checklist,
    meta: {
      middleware: [auth],
    },
  },

  {
    path: "/dashboard/mod/checklist/:idE/checklist/:idC/details",
    name: "mod_checklist_details",
    component: mod_checklist_details,
    meta: {
      middleware: [auth],
    },
  },

  {
    path: "/dashboard/mod/checklist/create",
    name: "mod_checklist_create",
    component: mod_checklist_create,
    meta: {
      middleware: [auth],
    },
  },

  {
    path: "/dashboard/mod/checklist",
    name: "mod_checklist_entreprise",
    component: mod_checklist_entreprise,
    meta: {
      middleware: [auth],
    },
  },
  //fin checklist de mod

  // checklist mission-controle
  {
    path: "/dashboard/mission-controle/checklist/:idE/checklist",
    name: "mission_controle_checklist",
    component: mission_controle_checklist,
    meta: {
      middleware: [auth],
    },
  },

  {
    path: "/dashboard/mission-controle/checklist/:idE/checklist/:idC/details",
    name: "mission_controle_checklist_details",
    component: mission_controle_checklist_details,
    meta: {
      middleware: [auth],
    },
  },

  {
    path: "/dashboard/mission-controle/checklist/create",
    name: "mission_controle_checklist_create",
    component: mission_controle_checklist_create,
    meta: {
      middleware: [auth],
    },
  },

  {
    path: "/dashboard/mission-controle/checklist",
    name: "mission_controle_checklist_entreprise",
    component: mission_controle_checklist_entreprise,
    meta: {
      middleware: [auth],
    },
  },
  //fin checklist de mission-controle

  // checklist entreprise
  {
    path: "/dashboard/entreprise/:idE/checklist",
    name: "entreprise_checklist",
    component: entreprise_checklist,
    meta: {
      middleware: [auth],
    },
  },

  {
    path: "/dashboard/entreprise/:idE/checklist/:idC/details",
    name: "entreprise_checklist_details",
    component: entreprise_checklist_details,
    meta: {
      middleware: [auth],
    },
  },

  {
    path: "/dashboard/rapport/:id/details",
    name: "general_checklist_details",
    component: general_checklist_details,
    meta: {
      middleware: [auth],
    },
  },

  {
    path: "/dashboard/entreprise/checklist/create",
    name: "entreprise_checklist_create",
    component: entreprise_checklist_create,
    meta: {
      middleware: [auth],
    },
  },

  {
    path: "/dashboard/entreprise/checklist",
    name: "entreprise_checklist_entreprise",
    component: entreprise_checklist_entreprise,
    meta: {
      middleware: [auth],
    },
  },
  //fin checklist de entreprise

  
  {
    path: "/dashboard/entreprises",
    name: "entreprises",
    component: entreprises,
    meta: {
      middleware: [auth],
    },
  },

  {
    path: "/dashboard/instutitions",
    name: "instutitions",
    component: instutitions,
    meta: {
      middleware: [auth],
    },
  },

  {
    path: "/dashboard/PAP",
    name: "paps",
    component: paps,
    meta: {
      middleware: [auth],
    },
  },

  {
    path: "/dashboard/formulaire",
    name: "formulaire",
    component: formulaire,
    meta: {
      middleware: [auth],
    },
  },

  {
    path: "/dashboard/formulaire-create",
    name: "formulaire_create",
    component: formulaire_create,
    meta: {
      middleware: [auth],
    },
  },

  {
    path: "/dashboard/formulaire/:id/suivi",
    name: "formulaire_id_details",
    component: formulaire_id_details,
    meta: {
      middleware: [auth],
    },
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
    meta: {
      middleware: [auth],
    },
  },

  {
    path: "/dashboard/mod",
    name: "mod",
    component: mod,
    meta: {
      middleware: [auth],
    },
  },

  {
    path: "/dashboard/profil",
    name: "profil",
    component: profil,
    meta: {
      middleware: [auth],
    },
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
    meta: {
      middleware: [auth],
    },
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
    meta: {
      middleware: [auth],
    },
  },

  {
    path: "/dashboard/utilisateurs",
    name: "utilisateurs",
    component: utilisateurs,
    meta: {
      middleware: [auth],
    },
  },

  {
    path: "/dashboard/programme",
    name: "programme",
    component: programme,
    meta: {
      middleware: [auth],
    },
  },

  {
    path: "/dashboard/unite-gestion",
    name: "unite_gestion",
    component: unite_gestion,
    meta: {
      middleware: [auth],
    },
  },

  {
    path: "/dashboard/projets",
    name: "projets",
    component: projets,
    meta: {
      middleware: [auth],
    },
  },

  {
    path: "/dashboard/fileManager",
    name: "fileManager",
    component: fileManager,
    meta: {
      middleware: [auth],
    },
  },

  {
    path: "/dashboard/projets/:id/details",
    component: projets_id_details,
    meta: {
      middleware: [auth],
    },
    name: "projets_id_details",
  },

  {
    path: "/dashboard/projets/:id/cadreLogique",
    component: projets_id_cadreLogique,
    meta: {
      middleware: [auth],
    },
    name: "projets_id_cadreLogique",
  },
  ,
  {
    path: "/dashboard/projets/activites-globale",
    component: dashboard_projets_activites_globale,
    meta: {
      middleware: [auth],
    },
    name: "dashboard_projets_activites_globale",
  },
  {
    path: "/dashboard/projets/activites/:nom/:code/:nomP/codeP/:nomC/:codeC",
    component: dashboard_projets_activites,
    meta: {
      middleware: [auth],
    },
    name: "dashboard_projets_activites",
  },
  {
    path: "/dashboard/projets/taches/:nom/:code/:nomP/codeP/:nomC/:codeC/:codeSC/:nomSC",
    component: dashboard_projets_taches,
    meta: {
      middleware: [auth],
    },
    name: "dashboard_projets_taches",
  },
  {
    path: "/dashboard/projets/activites-globale/:id/details",
    component: dashboard_projets_activites_globale_suivis,
    meta: {
      middleware: [auth],
    },
    name: "dashboard_projets_activites_globale_suivis",
  },
  
  {
    path: "/dashboard/projets/composantes-globale",
    component: dashboard_projets_composantes_globale,
    name: "dashboard_projets_composantes_globale",
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/dashboard/projets/composantes/:code/:nom",
    component: dashboard_projets_composantes,
    name: "dashboard_projets_composantes",
    meta: {
      middleware: [auth],
    },
  },

  {
    path: "/dashboard/projets/composantes-globale/:id/details",
    component: dashboard_projets_composantes_globale_suivis,
    name: "dashboard_projets_composantes_globale_suivis",
    meta: {
      middleware: [auth],
    },
  },


  {
    path: "/dashboard/projets/sous-composantes-globale",
    component: dashboard_projets_sous_composantes_globale,
    name: "dashboard_projets_sous_composantes_globale",
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/dashboard/projets/sous-composantes/:nom/:code/:nomP/codeP",
    component: dashboard_projets_sous_composantes,
    name: "dashboard_projets_sous_composantes",
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/dashboard/projets/sous-composantes-globale/:id/details",
    component: dashboard_projets_sous_composantes_globale_suivis,
    name: "dashboard_projets_sous_composantes_globale_suivis",
    meta: {
      middleware: [auth],
    },
  },

  {
    path: "/dashboard/projets/taches-globale",
    component: dashboard_projets_taches_globale,
    meta: {
      middleware: [auth],
    },
    name: "dashboard_projets_taches_globale",
  },
  {
    path: "/dashboard/projets/taches-globale/:id/details",
    component: dashboard_projets_taches_globale_suivis,
    meta: {
      middleware: [auth],
    },
    name: "dashboard_projets_taches_globale_suivis",
  },

  {
    path: "/dashboard/indicateurs",
    component: indicateurs,
    meta: {
      middleware: [auth],
    },
    name: "indicateurs",
  },
  {
    path: "/dashboard/indicateurs-mod",
    component: indicateurs_mod,
    meta: {
      middleware: [auth],
    },
    name: "indicateurs_mod",
  },

  {
    path: "/dashboard/indicateurs/suivi-mod",
    component: indicateurs_suivi_mod,
    meta: {
      middleware: [auth],
    },
    name: "indicateurs_suivi_mod",
  },

  {
    path: "/dashboard/indicateurs/:id/suivi-mod",
    component: indicateurs_suivi_mod_details,
    meta: {
      middleware: [auth],
    },
    name: "indicateurs_suivi_mod_details",
  },

  {
    path: "/dashboard/finances/decaissement",
    component: finances_decaissement,
    meta: {
      middleware: [auth],
    },
    name: "finances_decaissement",
  },

  {
    path: "/dashboard/finances/suivi",
    component: finances_suivi,
    meta: {
      middleware: [auth],
    },
    name: "finances_suivi",
  },

  {
    path: "/dashboard/finances/point-financier",
    component: point_financier,
    meta: {
      middleware: [auth],
    },
    name: "point_financier",
  },

  {
    path: "/dashboard/finances/plan_decaissement",
    component: finances_plan_decaissement,
    meta: {
      middleware: [auth],
    },
    name: "finances_plan_decaissement",
  },

  {
    path: "/dashboard/config/categories",
    component: config_categories,
    meta: {
      middleware: [auth],
    },
    name: "config_categories",
  },

  {
    path: "/dashboard/config/backup",
    component: config_backup,
    meta: {
      middleware: [auth],
    },
    name: "config_backup",
  },

 

  {
    path: "/dashboard/config/sinistres",
    component: config_sinistres,
    name: "config_sinistres",
  },
  {
    path: "/dashboard/config/main_oeuvre",
    component: config_main_oeuvre,
    meta: {
      middleware: [auth],
    },
    name: "config_main_oeuvre",
  },

  {
    path: "/dashboard/config/unites",
    component: config_unites,
    meta: {
      middleware: [auth],
    },
    name: "config_unites",
  },

  {
    path: "/dashboard/config/types",
    component: config_types,
    meta: {
      middleware: [auth],
    },
    name: "config_types",
  },
  {
    path: "/dashboard/config/sites",
    component: config_sites,
    meta: {
      middleware: [auth],
    },
    name: "config_sites",
  },
  {
    path: "/dashboard/config/alert",
    component: config_alert,
    meta: {
      middleware: [auth],
    },
    name: "config_alert",
  },
  {
    path: "/dashboard/config/rappel",
    component: config_rappel,
    meta: {
      middleware: [auth],
    },
    name: "config_rappel",
  },

 


  
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }
  const middleware = to.meta.middleware;

  console.log(to);
  console.log(middleware);

  const context = {
    to,
    from,
    next,
    store,
  };

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});

export default router;
