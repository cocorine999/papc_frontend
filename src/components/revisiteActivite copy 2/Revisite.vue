<template>
  <div class="w-full px-4">

      <nav
        class="mb-2 mt-4 text-sm font-semibold flex justify-between items-center"
        aria-label="Breadcrumb"
      >
        <div>
          <ol class="inline-flex p-0 list-none">
            <li class="flex items-center">
              <router-link to="/dashboard" class="text-gray-600"
                >dashboard</router-link
              >
              <svg
                class="w-3 h-3 mx-3 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
                />
              </svg>
            </li>
            <li class="flex items-center">
              <router-link to="/dashboard/projets" class="text-gray-600"
                >projets</router-link
              >
              <svg
                class="w-3 h-3 mx-3 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
                />
              </svg>
            </li>

            <li class="flex items-center text-blue-500">
              <router-link to="" class="">activites</router-link>
            </li>
          </ol>
        </div>
        <div>
          <search-bar></search-bar>
        </div>
      </nav>

      <div class="flex items-center justify-between my-2">
        <div class="flex space-x-4">
          <span
            :class="{ 'border-primary border-b-8 font-bold': seeActivite }"
            @click="gotoActivite()"
            class="inline-block cursor-pointer text-lg uppercase border-primary py-2"
            >Activités</span
          >
          <span
            :class="{ 'border-primary border-b-8 font-bold': seePlan }"
            @click="gotoPlan()"
            class="inline-block cursor-pointer text-lg uppercase py-2"
            >Plan d'ecaissement
          </span>
          <span
            :class="{ 'border-primary border-b-8 font-bold': seeSuivi }"
            @click="gotoSuivi()"
            class="inline-block cursor-pointer text-lg uppercase py-2"
            >Le suivi evaluation
          </span>
          <span
            :class="{ 'border-primary border-b-8 font-bold': seeStatistique }"
            @click="gotoStatistique()"
            class="inline-block cursor-pointer text-lg uppercase py-2"
            >Statistiques
          </span>
        </div>

      </div>

      <div v-if="seeActivite">
        <div class="p-4 my-4 rounded-sm shadow-md bg-gray-50">
          <div class="flex items-center justify-between">
            <!--Filtre sur projet -->
            <div class="w-full grid grid-cols-2 items-center gap-4">
              <div>
                <label for="" class="block text-sm font-semibold uppercase my-2 ">Selectionnez un projet</label>
                <multiselect v-model="projetFiltre" :options="projets" :preselect-first="true" :custom-label="customLabel" placeholder="selectionnez un projet" label="nom" track-by="id"></multiselect>
              </div>

              <div>
                <label for="" class="block text-sm font-semibold uppercase my-2 ">Selectionnez un composant</label>
                <multiselect v-model="composanteFiltre" :options="composantes" :preselect-first="true" :custom-label="customLabel" placeholder="selectionnez une composante" label="nom" track-by="id"></multiselect>
              </div>
              <div>
                
                <label for="" class="block text-sm font-semibold uppercase my-2 ">Selectionnez un sous  composant</label>
                <multiselect
                v-model="valueFiltre"
                :options="sousComposantes"
                :preselect-first="true"
                :custom-label="customLabel" 
                placeholder="selectionnez une sous composante"
                label="nom"
                track-by="id"
              ></multiselect>
              </div>
           
              <div></div>
              <button
                v-if="!showFiltre"
                title="filtre"
                @click="showFiltre = true"
                class="bg-primary flex items-center space-x-3 text-white px-2 py-1"
              >
                <svg
                  stroke="currentColor"
                  fill="none"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  height="1.5em"
                  width="1.5em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon
                    points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"
                  ></polygon>
                </svg>
                <span>progression des activités</span>
              </button>
              <div v-else class="px-6 w-full">
                <div class="bg-gray-300 h-2 w-full rounded-full relative">
                  <span
                    class="bg-white h-4 w-4 absolute top-0 -ml-2 -mt-1 z-10 shadow rounded-full cursor-pointer"
                    :style="`left:${rangeValue}%`"
                  ></span>
                  <span
                    class="bg-green-500 h-2 absolute left-0 top-0 rounded-full"
                    :style="`width:${rangeValue}%`"
                  ></span>
                </div>
                <div class="flex justify-between mt-2 text-xs text-gray-600">
                  <span
                    @click="filtreRange(0)"
                    class="w-8 cursor-pointer text-left"
                    >0%</span
                  >
                  <span
                    @click="filtreRange(25)"
                    class="w-8 cursor-pointer text-center"
                    >25%</span
                  >
                  <span
                    @click="filtreRange(50)"
                    class="w-8 cursor-pointer text-center"
                    >50%</span
                  >
                  <span
                    @click="filtreRange(75)"
                    class="w-8 cursor-pointer text-center"
                    >75%</span
                  >
                  <span
                    @click="filtreRange(100)"
                    class="w-8 cursor-pointer text-right"
                    >100%</span
                  >
                  <button
                    @click="showFiltre = false"
                    class="text-white bg-blue-300 p-1"
                  >
                    revenir
                  </button>
                </div>
              </div>
            </div>
           
          </div>

        </div>
        <div class="my-4 grid lg:grid-cols-3 md:grid-cols-2 sm:gap-5">
          <div v-for="(activite, index) in activites" :key="index">
            <card-activite
              :bailleur="activite.bailleur.sigle"
              :libelle="activite.nom"
              :poids="activite.poids"
              :montantEPM="activite.pret"
              :montantNE="activite.budgetNational"
              :debut="activite.debut"
              :fin="activite.fin"
              :statut="getStatus(activite.statut)"
              :structureResponsable="activite.structureResponsable !== null ? getNom(activite.structureResponsable.nom, activite.structureResponsable.prenom) : ''"
            ></card-activite>
            <!-- End cards Activités -->
          </div>
        </div>
      </div>

      <div v-if="seePlan">
        <plan></plan>
      </div>

      <div v-if="seeSuivi">
        <suivi></suivi>
      </div>

      <div v-if="seeStatistique">
        <statistiques ></statistiques>
      </div>
  </div>
</template>

<script>

import Multiselect from "vue-multiselect";
import Dropdown from "@/components/Dropdown";
import Card from "@/components/Card";
import SearchBar from "@/components/SearchBar";
import Titre from "@/components/Titre";
import CardActivite from "@/components/CardActivite";
import Vmodal from "@/components/Vmodal";
import Vform from "@/components/Vform";
import ModalTopRight from "@/components/ModalTopRight";
import Plan from "@/components/revisiteActivite/Plan.vue";
import Suivi from "@/components/revisiteActivite/Suivi.vue";
import Statistiques from "@/components/revisiteActivite/Statistiques.vue";
import Dashboard from "@/layouts/Dashboard";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { getStringValueOfStatutCode } from "@/utils/index";
import Composante from "@/store/modules/composantes/composante";
import Activite from '@/store/modules/activites/activite';

export default {
  components: {
    Dashboard,
    Vmodal,
    ModalTopRight,
    Titre,
    SearchBar,
    Card,
    Multiselect,
    Dropdown,
    CardActivite,
    Vform,
    Plan,
    Suivi,
    Statistiques,
  },

  data() {
    return {
      suivis:[],
      valueFiltre: null,
      activiteFiltre: null,
      composanteId: null,
      projetFiltre: null,
      composanteFiltre: null,
      pending: false,
      success: true,
      rejected: false,
      activiteId:'',
      programmeId: this.currentUser?.programme.id,
      cols: 1,
      sendRequest: false,
      submitText: "Enregistrer",
      rangeValue: 0,
      showFiltre: false,
      showProlonger:false,
      chargement:false,
      
      dates:{debut: '', fin: ''},
    
      showModal2: false,
      line: false,
      mosaique: true,
      showInput: true,
      isStateChange: false,
      seeStatistique: false,
      seePlan: false,
      seeActivite: true,
      seeSuivi: false,
      option: [{ name: "supprimer" }, { name: "modifier" }],
      optionActivite: [
        { name: "supprimer" },
        { name: "modifier" }
      ],

      dates: {
        debut:'',fin:''
      },

    };
  },

  computed: {
    //importation des variables du module activites

    ...mapGetters({
      projets: "projets/getProjets",
      composantes: "composantes/getComposantes",
      sousComposantes: "sousComposantes/getSousComposantes",
      activites: "activites/getActivites",
      planDeDecaissements: "planDeDecaissements/getPlanDeDecaissements",
      currentUser : 'auths/GET_AUTHENTICATE_USER'
    }),
  },

  methods: {
    //Charger les fonctions de communication avec le serveur
    ...mapMutations({
      setPlanDeDecaissements: "planDeDecaissements/SET_LIST_PLAN_DE_DECAISSEMENT",
      setActivites: "activites/SET_LIST_ACTIVITES",
      setComposantes: 'composantes/SET_LIST_COMPOSANTES',
      setSousComposantes: 'sousComposantes/SET_LIST_SOUSCOMPOSANTE'
    }),

    ...mapActions("activites", {
      fetchActivites: "FETCH_LIST_ACTIVITE_OF_COMPOSANTE"
    }),

    ...mapActions("planDeDecaissements", {
      fetchPlanDeDecaissements: "FETCH_LIST_PLAN_DE_DECAISSEMENT_ACTIVITE"
    }),

    ...mapActions({
      fetchComposantes: "composantes/FETCH_LIST_COMPOSANTE_OF_PROJET",
      fetchSousComposantes: "sousComposantes/FETCH_LIST_SOUS_COMPOSANTE_OF_COMPOSANTE",
      fetchProjets: "projets/FETCH_LIST_PROJET_OF_PROGRAMME",
      getPtabReviser: "revisionPtab/GET_PTAB_REVISER"
    }),

    customLabel ({ codePta, nom }) {
      return `${codePta} – ${nom}`
    },

    suivreMyActivite(activite) {
      this.$router.push({name:'dashboard_projets_activites_globale_suivis',params:{id:activite.id}})
    },

    filtreRange(value) {
      this.rangeValue = value;
    },

    gotoActivite() {
      this.seePlan = false;
      this.seeActivite = true;
      this.seeSuivi = false;
      this.seeStatistique = false;
      this.fetchActivites(this.composanteId)
    },

    gotoStatistique() {
      this.seePlan = false;
      this.seeActivite = false;
      this.seeSuivi = false;
      this.seeStatistique = true;
    },

    gotoPlan() {
      this.seePlan = true;
      this.seeActivite = false;
      this.seeSuivi = false;
      this.seeStatistique = false;
    },

    gotoSuivi() {
      this.seeSuivi = true;
      this.seePlan = false;
      this.seeActivite = false;
      this.seeStatistique = false;
    },

    getNom(nom, prenom) {

      let name = ''

      if(nom !== undefined && nom !== null) name+= nom

      if(prenom !== undefined && prenom !== null ) name+= prenom

      return name;
    },

    getStatus(status) {
      return getStringValueOfStatutCode(status);
    }
  },

  watch: {
    loading: function (value) {
      //this.loading = value
    },

    errors: function (errors) {

    },

    projets: function(projets){
      if(projets.length > 0){
        this.projetFiltre = projets[0]
      }
    },

    projetFiltre: function(valeur){

      if( valeur instanceof Composante || valeur instanceof Object )
      {
        this.fetchComposantes(valeur.id);
      }
      else if( valeur !== null && typeof valeur !== 'undefined' && valeur.length !== 0 ){
        this.fetchComposantes(valeur);
      }
      else{
        this.setComposantes([])
      }
    },
    
    composantes: function (composantes) {
      if(composantes.length > 0){
        this.composanteFiltre = composantes[0]
      }
      else{
        this.composanteFiltre = null
      }
    },

    composanteFiltre: function(valeur){

      if( valeur instanceof Composante || valeur instanceof Object )
      {
        this.fetchSousComposantes(valeur.id);
      }
      else if( valeur !== null && typeof valeur !== 'undefined' && valeur.length !== 0 ){
        this.fetchSousComposantes(valeur);
      }
      else{ 
        this.setSousComposantes([])
      }
    }, 

    sousComposantes: function (sousComposantes) {
      if(sousComposantes.length > 0){ 
        this.valueFiltre = sousComposantes[0];
      }
      else if(this.composanteFiltre !== null && typeof this.composanteFiltre !== 'undefined' && this.composanteFiltre.length !== 0  ){
        this.fetchActivites(this.composanteFiltre.id);
        this.composanteId = this.composanteFiltre.id
        this.valueFiltre = null;
      }
      else{
        this.valueFiltre = null;
      }
    },

    valueFiltre: function (valeur) {
      
      if (valeur instanceof Composante || valeur instanceof Object) {
        this.fetchActivites(valeur.id);
        this.composanteId = valeur.id
      } 

      else if( valeur !== null && typeof valeur !== 'undefined' && valeur.length !== 0 ){
        this.fetchActivites(valeur);
        this.composanteId = valeur
      }

    },
    
    activites: function (activites) {
      if(this.seePlan){
        if(activites.length > 0){
          this.activiteFiltre = activites[0]
        }
      }
    },

    activiteFiltre: function(valeur){
      if( valeur instanceof Activite || valeur instanceof Object )
      {
        this.fetchPlanDeDecaissements(valeur.id);
      }
      else if( valeur !== null && typeof valeur !== 'undefined' && valeur.length !== 0 ){
        this.fetchPlanDeDecaissements(valeur);
      }
      else{ 
        this.setPlanDeDecaissements([])
      }
    }, 

    seePlan: function(valeur){
      if(this.activites.length > 0){
        this.activiteFiltre = this.activites[0]
      }
    }

  },

  created() {

    /* const params = {
      "version": this.version,
      "composantes": null,
      "sous-composantes": null,
      "activites": null,
      "taches": null
    };

    this.getPtabReviser(params).then((value) => {
      console.log("Value : ", value)
    }) */

  /* 
    this.programmeId = this.currentUser.programme.id

    if(this.programmeId){
      this.fetchProjets(this.programmeId);
    } */

  }

};
</script>

<style></style>
