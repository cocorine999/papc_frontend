import Vue from "vue";
import Vuex from "vuex";

import auths from "@/store/modules/auths/index";

import bailleurs from "@/store/modules/bailleurs/index";

import programmes from "@/store/modules/programmes/index";

import projets from "./modules/projets/index";

import uniteeDeGestions from "@/store/modules/uniteeDeGestions/index";

import mods from "./modules/mods/index";

import missionDeControles from "./modules/missionDeControles/index";

import composantes from "./modules/composantes/index";

import activites from "./modules/activites/index";

import taches from "./modules/taches/index";


import { SET_LOADER, SET_ERRORS_MESSAGE, RESET_ERROR_MESSAGE_MUTATIONS } from "@/store/mutations.type";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideBarOpen: false,
    loading : false,
    messageErreur : null,
    errors : [],
    statuts : [
      {
        nom : "Non validé",
        etat: -2
      },
      {
        nom: "Validé",
        etat: -1
      },
      {
        nom: "En cours",
        etat: 0
      },
      {
        nom: "En retard",
        etat: 1
      },
      {
        nom: "Terminé",
        etat: 2
      }
    ],
  },
  getters: {
    sideBarOpen: state => {
      return state.sideBarOpen
    },

    HAS_ERROR: state => {
      return state.messageErreur != null ? true : false
    },
  
    IS_LOADING: state => {
      return state.loading
    },
  
    GET_MESSAGE_ERREUR: state => {
      return state.messageErreur
    },
  
    GET_ERREURS: state => {
      return state.errors
    }
  },
  mutations: {
    toggleSidebar (state) {
      state.sideBarOpen = !state.sideBarOpen
    },

    [SET_LOADER](state, value) {
      if(typeof value === "boolean")
        state.loading = value
    },

    [SET_ERRORS_MESSAGE](state, {message, errors}) {
      state.messageErreur = message
      state.errors = errors
    },

    [RESET_ERROR_MESSAGE_MUTATIONS](state){
      state.messageErreur = null
      state.errors = []
    }

  },

  actions: {
    toggleSidebar(context) {
      context.commit('toggleSidebar')
    },
  },

  modules: {
    auths,
    programmes,
    projets,
    uniteeDeGestions,
    bailleurs,
    mods,
    missionDeControles,
    composantes,
    activites,
    taches,
  }
});

