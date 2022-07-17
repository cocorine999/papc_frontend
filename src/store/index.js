import Vue from "vue";
import Vuex from "vuex";

import auths from "@/store/modules/auths/index";

import agencesDeCommunication from "./modules/agencesDeCommunication/index";

import ongs from "./modules/ongs/index";

import bailleurs from "@/store/modules/bailleurs/index";

import entreprisesExecutante from "./modules/entreprisesExecutante/index";

import institutions from "./modules/institutions/index";

import projets from "./modules/projets/index";

import programmes from "./modules/programmes/index";

import mods from "./modules/mods/index";

import missionDeControles from "./modules/missionDeControles/index";

import uniteeDeGestions from "./modules/uniteeDeGestions/index";

import uniteesDeMesure from "./modules/uniteesDeMesure/index";


import { SET_LOADER, SET_ERRORS_MESSAGE, RESET_ERROR_MESSAGE_MUTATIONS } from "@/store/mutations.type";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideBarOpen: false,
    loading : false,
    messageErreur : null,
    errors : [],
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
    agencesDeCommunication,
    bailleurs,
    entreprisesExecutante,
    institutions,
    mods,
    ongs,
    missionDeControles,
    projets,
    programmes,
    uniteeDeGestions,
    uniteesDeMesure
  }
});

