<template>
  <div class="w-full px-4">

      <nav
        class="mb-2 mt-4 text-xs md:text-sm font-semibold flex justify-between items-center flex-wrap"
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

      <div class="flex items-center justify-between my-2" >
        <div class="flex space-x-4">
          <span
            v-if="activiteVisible"
            :class="{ 'border-primary border-b-8 font-bold': seeActivite }"
            @click="gotoActivite()"
            class="inline-block cursor-pointer text-xs sm:text-sm  md:text-base uppercase border-primary py-2"
            >Activités</span
          >
          <span
            v-if="planDecaissementVisible"
            :class="{ 'border-primary border-b-8 font-bold': seePlan }"
            @click="gotoPlan()"
            class="inline-block cursor-pointer text-xs sm:text-sm  md:text-base uppercase py-2"
            >Plan d'ecaissement
          </span>
         
          <span
            :class="{ 'border-primary border-b-8 font-bold': seeStatistique }"
            @click="gotoStatistique()"
            class="inline-block cursor-pointer text-xs sm:text-sm  md:text-base uppercase py-2"
            >Statistiques
          </span>
        </div>

        <button
          v-if="seeActivite && activiteVisible"
          @click="addActivite"
          title="ajouter une activite"
          class="px-2 py-1  md:px-4 md:py-2 flex overflow-hidden items-center text-xs font-semibold text-white uppercase bg-primary focus:outline-none focus:shadow-outline"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              style="fill: rgba(255, 255, 255, 1); transform: ; msfilter: "
            >
              <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg
          ></span>
          <span class="mx-1 md:mx-2 text-xs font-semibold">ajouter une activité</span>
        </button>
        <button
          v-if="seePlan && planDecaissementVisible"
          @click="addPlan"
          title="ajouter un plan d'ecaissement"
          class="p-2 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline"
        >
        <span
            ><svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="1.3em"
              width="1.3em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path
                d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM17 11h-4v4h-2v-4H7V9h4V5h2v4h4v2z"
              ></path></svg
          ></span>
          <span class="mx-2 text-xs  md:text-sm font-semibold"
            >ajouter un plan de décaissement</span
          >
        </button>
      </div>

      <div v-if="seeActivite && activiteVisible">
        <div class="p-4 my-4 rounded-sm shadow-md bg-gray-50">
          <div class="flex items-center justify-between flex-wrap">
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
                class="bg-primary flex items-center space-x-3 text-white px-2 py-1 text-sm"
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
              @modifier="modifier(activite)"
              @supprimer="supprimer(activite)"
              @prolonger="prolonger(activite)"
              @validation="validation(activite)"
              @suivre="suivreMyActivite(activite)"
              :isDelete="activiteDelete"
              :isUpdate="activiteUpdate"
            ></card-activite>
            <!-- End cards Activités -->
          </div>
        </div>
      </div>

      <div v-if="seePlan">
        <plan :results="results" :isDelete="planDecaissementDelete" :isUpdate="planDecaissementUpdate"></plan>
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

  props:['version'],
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
      cols: 1,
      sendRequest: false,
      rangeValue: 0,
      showFiltre: false,
      chargement:false,
      projets: [],
      composantes: [],
      sousComposantes: [],
      activites: [],
      taches: [],
      suivis: [],
      results: [],
      planDeDecaissements: [],
      
      dates:{debut: '', fin: ''},
    
      showModal2: false,
      line: false,
      mosaique: true,
      showInput: true,
      isStateChange: false,
      seeStatistique: false,
      seePlan: false,
      seeActivite: true,
      option: [{ name: "supprimer" }, { name: "modifier" }],
      optionActivite: [
        { name: "supprimer" },
        { name: "modifier" }
      ],

      dates: {
        debut:'',fin:''
      },
      activiteVisible:false,
      activiteAdd:false,
      activiteDelete:false,
      activiteUpdate:false,
      planDecaissementVisible:false,
      planDecaissementAdd:false,
      planDecaissementUpdate:false,
      planDecaissementDelete:false

    };
  },

  methods: {
    //Charger les fonctions de communication avec le serveur

    ...mapActions({
      getPtabReviser: "revisionPtab/GET_PTAB_REVISER"
    }),

    getPermission() {
      this.currentUser.role[0].permissions.forEach(element => {
       
          if(element.slug === 'creer-une-activite') {
            this.activiteAdd = true
          }
           if(element.slug === 'voir-une-activite') {
            this.activiteVisible = true
          }
            if(element.slug === 'modifier-une-activite') {
              this.activiteUpdate = true
            }
            if(element.slug ==='supprimer-une-activite') {
              this.activiteDelete = true
            }
            //plan de decaissement

            if(element.slug ==='voir-un-plan-de-decaissement') {
              this.planDecaissementVisible= true
            }
            if(element.slug ==='creer-un-plan-de-decaissement') {
              this.planDecaissementAdd= true
            }
            if(element.slug ==='modifier-un-plan-de-decaissement') {
              this.planDecaissementUpdate= true
            }
             if(element.slug ==='supprimer-un-plan-de-decaissement') {
              this.planDecaissementDelete= true
            }
           
        });
    },


    customLabel ({ codePta, nom }) {
      return `${codePta} – ${nom}`
    },

    filtreRange(value) {
      this.rangeValue = value;
    },

    gotoActivite() {
      this.seePlan = false;
      this.seeActivite = true;
      this.seeSuivi = false;
      this.seeStatistique = false;
      this.activites = this.results['activites'].filter((value) => {
        if(value.composanteId === this.composanteId) return value;
      })
    },

    gotoStatistique() {
      this.seePlan = false;
      this.seeActivite = false;
     
      this.seeStatistique = true;
    },

    gotoPlan() {
      this.seePlan = true;
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

    version: function (version) {
      const params = {
        "version": version,
        "composantes": null,
        "sous-composantes": null,
        "activites": null
      };

      this.getPtabReviser(params).then((value) => {
        this.results = value.data.data
      })
    },

    errors: function (errors) {

    },

    results: function(results){
      this.projets = results['projets'];

      if(results['projets'].length > 0){
        this.projetFiltre = results[0]
      }
    },

    projets: function(projets){
      if(projets.length > 0){
        this.projetFiltre = projets[0]
      }
    },

    projetFiltre: function(valeur){

      if( valeur instanceof Composante || valeur instanceof Object )
      {
        this.composantes = this.results['composantes'].filter((value) => {
          if(value.projetId === valeur.id) return value;
        })
      }
      else if( valeur !== null && typeof valeur !== 'undefined' && valeur.length !== 0 ){

        this.composantes = this.results['composantes'].filter((value) => {
          if(value.projetId === valeur) return value;
        })
      }
      else{
        this.composantes = [];
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
        this.sousComposantes = this.results['sous-composantes'].filter((value) => {
          if(value.composanteId === valeur.id) return value;
        })
      }
      else if( valeur !== null && typeof valeur !== 'undefined' && valeur.length !== 0 ){

        this.sousComposantes = this.results['sous-composantes'].filter((value) => {
          if(value.composanteId === valeur) return value;
        })
      }
      else{ 
        this.sousComposantes = [];
      }
    }, 

    sousComposantes: function (sousComposantes) {
      if(sousComposantes.length > 0){
        this.valueFiltre = sousComposantes[0];
      }
      else if(this.composanteFiltre !== null && typeof this.composanteFiltre !== 'undefined' && this.composanteFiltre.length !== 0  ){

        this.activites = this.results['activites'].filter((value) => {
          if(value.composanteId === this.composanteFiltre.id) return value;
        })
        this.composanteId = this.composanteFiltre.id
        this.valueFiltre = null;
      }
      else{
        this.valueFiltre = null;
      }
    },

    valueFiltre: function (valeur) {
      
      if (valeur instanceof Composante || valeur instanceof Object) {

        this.activites = this.results['activites'].filter((value) => {
          if(value.composanteId === valeur.id) return value;
        })
        this.composanteId = valeur.id
      } 

      else if( valeur !== null && typeof valeur !== 'undefined' && valeur.length !== 0 ){

        this.activites = this.results['activites'].filter((value) => {
          if(value.composanteId === valeur) return value;
        })
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

        this.planDeDecaissements = this.results['planDeDecaissements'].filter((value) => {
          if(value.activiteId === valeur.id) return value;
        })

      }
      else if( valeur !== null && typeof valeur !== 'undefined' && valeur.length !== 0 ){

        this.planDeDecaissements = this.results['planDeDecaissements'].filter((value) => {
          if(value.activiteId === valeur) return value;
        })
      }
      else{
        this.planDeDecaissements = [];
      }
    },

    seePlan: function(valeur){
      if(this.activites.length > 0){
        this.activiteFiltre = this.activites[0]
      }
    }

  },

  created() {
    this.getPermission()
    const params = {
      "version": this.version,
      "composantes": null,
      "sous-composantes": null,
      "activites": null
    };

    this.getPtabReviser(params).then((value) => {
      this.results = value.data.data
    })
  }

};
</script>

<style></style>
