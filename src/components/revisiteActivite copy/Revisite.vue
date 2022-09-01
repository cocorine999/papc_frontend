<template>
  <div class="w-full px-4">

      <modal-top-right v-if="showModal" :title="title" v-on:close="close">
        <div class="p-4 overflow-auto">
          <vform
            template="default"
            :champs="champs"
            :cols="cols"
            :submitText="submitText"
            :sendRequest="sendRequest"
            @sendForm="sendForm"
            @closeModal="close"
          ></vform>
        </div>
       
      </modal-top-right>


      <modal-top-right v-if="showModal2" :title="title" v-on:close="close2">
        <div class="p-4 overflow-auto">
          <vform
            template="default"
            :champs="champs2"
            :cols="cols"
            :submitText="submitText"
            :sendRequest="sendRequest"
            @sendForm="savePlanDecaissement"
            @closeModal="close2"
          ></vform>
        </div>
       
      </modal-top-right>

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

        <button
          v-if="seeActivite"
          @click="addActivite"
          title="ajouter une activite"
          class="px-4 py-2 flex overflow-hidden items-center text-xs font-semibold text-white uppercase bg-primary focus:outline-none focus:shadow-outline"
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
          <span class="mx-2 text-xs font-semibold">ajouter une activité</span>
        </button>
        <button
          v-if="seePlan"
          @click="addPlan"
          title="ajouter un plan d'ecaissement"
          class="p-2 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase rounded bg-primary focus:outline-none focus:shadow-outline"
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
          <span class="mx-2 text-sm font-semibold"
            >ajouter un plan de décaissement</span
          >
        </button>
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
              @modifier="modifier(activite)"
              @supprimer="supprimer(activite)"
              @prolonger="prolonger(activite)"
              @validation="validation(activite)"
              @suivre="suivreMyActivite(activite)"
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
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
import { extractFormData, getStringValueOfStatutCode } from "@/utils/index";
import Composante from "@/store/modules/composantes/composante";
import Activite from '@/store/modules/activites/activite';
import moment from 'moment'
import ActiviteService from "@/services/modules/activite.service.js";

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
      activiteAttributs : ['nom', 'description', 'debut', 'fin', 'budgetNational', 'structureResponsableId', 'structureAssocieId', 'types', 'pret', 'tepPrevu', 'poids'],
      dates:{debut:'',fin:''},
     
      champs:[
        {name: 'Nom de l\'activite', key: "nom", type: 'text', placeholdere: "Nom de l\'activité", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Type', key: "types", type: '', placeholdere: 'Selectionnez le type d\'activite', isSelect: true, isTextArea: false, data:'', required: true, options: this.$store.state.types, cle: 'type', value: 'nom',  errors : []},
        {name: 'Poids', type: 'number', key: "poids", placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Taux d\'execution physique', key: "tepPrevu", type: 'number', placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Pret', type: 'number', key: "pret", placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Budget National', key: "budgetNational", type: 'number', placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Date de debut', key: "debut", type: 'date', placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Date de fin', key: "fin", type: 'date', placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Structure Responsable', key: "structureResponsableId", type: '', placeholdere: 'Veuillez selectionnez la structure responsable', isSelect: true, isTextArea: false, data:'', required: true, options: this.entreprisesExecutante, cle: 'id', value: 'nom',  errors : []},
        {name: 'Structure associée', key: "structureAssocieId", type: '', placeholdere: 'Veuillez selectionnez la structure associée', isSelect: true, isTextArea: false, data:'', required: true, options: this.mods, cle: 'id', value: 'nom',  errors : []},
        {name: 'Description', type: '', key: "description", placeholdere: 'Description de l\'activité', isSelect: false, isTextArea: true, data:'', required: false, errors : []},
      ],
      showModal: false,
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
    ...mapState({
      activite: (state) => state.activites.activite,
      loading: (state) => state.loading,
      errors: (state) => state.errors,
    }),

    ...mapGetters({
      mods: "mods/getMods",
      projets: "projets/getProjets",
      composantes: "composantes/getComposantes",
      sousComposantes: "sousComposantes/getSousComposantes",
      entreprisesExecutante: "entreprisesExecutante/getEntreprisesExecutante",
      activites: "activites/getActivites",
      activite: "activites/getActivite",
      planDeDecaissements: "planDeDecaissements/getPlanDeDecaissements",
      planDeDecaissement: "planDeDecaissements/getPlanDeDecaissement",
      currentUser : 'auths/GET_AUTHENTICATE_USER'
    }),
  },

  methods: {
    //Charger les fonctions de communication avec le serveur
    ...mapMutations({
      setErrors: "SET_ERRORS_MESSAGE", // map `this.setErrors()` to `this.$store.commit('SET_ERRORS_MESSAGE')`,
      setPlanDeDecaissement: "planDeDecaissements/FILL", // map `this.CREATE_INSTANCE_PROJET()` to `this.$store.commit('CREATE_INSTANCE_PROJET')`
      setPlanDeDecaissements: "planDeDecaissements/SET_LIST_PLAN_DE_DECAISSEMENT",
      setActivite: "activites/FILL", // map `this.CREATE_INSTANCE_PROJET()` to `this.$store.commit('CREATE_INSTANCE_PROJET')`
      setActivites: "activites/SET_LIST_ACTIVITES",
      setComposantes: 'composantes/SET_LIST_COMPOSANTES',
      setSousComposantes: 'sousComposantes/SET_LIST_SOUSCOMPOSANTE'
    }),

    ...mapActions("activites", {
      fetchActivites: "FETCH_LIST_ACTIVITE_OF_COMPOSANTE",
      saveActivite: "STORE_ACTIVITE",
      updateActivite: "UPDATE_ACTIVITE",
      deleteActivite: "DESTROY_ACTIVITE",
    }),

    ...mapActions("planDeDecaissements", {
      fetchPlanDeDecaissements: "FETCH_LIST_PLAN_DE_DECAISSEMENT_ACTIVITE",
      savePlanDeDecaissement: "STORE_PLAN_DE_DECAISSEMENT",
      updatePlanDeDecaissement: "UPDATE_PLAN_DE_DECAISSEMENT",
      deletePlanDeDecaissement: "DESTROY_PLAN_DE_DECAISSEMENT",
    }),

    ...mapActions({
      fetchMods: "mods/FETCH_LIST_MOD_OF_PROGRAMME",
      fetchEntreprisesExecutante: "entreprisesExecutante/FETCH_LIST_ENTREPRISE_EXECUTANTE_OF_PROGRAMME",
      fetchComposantes: "composantes/FETCH_LIST_COMPOSANTE_OF_PROJET",
      fetchSousComposantes: "sousComposantes/FETCH_LIST_SOUS_COMPOSANTE_OF_COMPOSANTE",
      fetchProjets: "projets/FETCH_LIST_PROJET_OF_PROGRAMME",
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

    
   
    addActivite() {

      this.title ="Ajouter une activité"

      this.submitText="Enregistrer",

      this.showCloseModal(true)

    },

    getNom(nom, prenom) {

      let name = ''

      if(nom !== undefined && nom !== null) name+= nom

      if(prenom !== undefined && prenom !== null ) name+= prenom

      return name;
    },

    prolonger(activite) {
      this.activiteId = activite.id
      this.showProlonger = true
    },

    supprimer(activite) {
      if(window.confirm("Voulez-vous supprimer l'activite " + activite.nom)){
        if(this.sendRequest === false){
          this.sendRequest = true;

          this.deleteActivite(activite.id)
            .then((value) => {
              this.fetchActivites(this.composanteId);
            })
            .finally((value) => {
              this.sendRequest = false;
            });
        }
      }
    },

    modifier(activite) {

      this.title = 'Modifier une activite'

      this.setActivite(activite)

      this.activiteAttributs.forEach((item) => {

        this.champs.find((value, index) => {

          if(value.key === item){
            this.champs[index]['data'] = activite[item]
          }

        });

      });

      this.submitText = "Modifier",

      this.showCloseModal(true)
    },


    editerSuivi() {
      this.showInput = false;
    },

    toggle() {
      this.pending = false;
      this.rejected = false;
      this.success = true;
    },

    toggle2() {
      this.success = false;
      this.rejected = false;
      this.pending = true;
    },

    toggle3() {
      this.pending = false;
      this.success = false;
      this.rejected = true;
    },

    getStatus(status) {
      return getStringValueOfStatutCode(status);
    },

    validation(activite) {
      if (this.sendRequest === false) {
        this.sendRequest = true;

        this.updateActivite({ activite: { statut: -1, composanteId: this.composanteId }, id: activite.id })
          .then((value) => {              
            this.fetchActivites(this.composanteId);
          })
          .finally((error) => {              
            this.sendRequest = false;
          });
      }
    },

    sendForm() {
      if (this.sendRequest === false) {
        this.sendRequest = true;

        this.champs = this.champs.map((item) => {
          item.errors = [];
          return item;
        });

        let activite = extractFormData(this.champs, this.activiteAttributs);

        activite.composanteId = this.composanteId;

        activite.structureResponsableId = activite.structureResponsableId.id;

        activite.structureAssocieId = activite.structureAssocieId.id;

        activite.userId = activite.structureAssocieId;

        activite["type"] = activite.types.type;

        if (this.activite?.id) {
          this.updateActivite({ activite: activite, id: this.activite?.id })
            .then((response) => {
              if (response.status === 200 || response.status === 201) {
                this.fetchActivites(this.composanteId);
                this.close();
              }
            })
            .finally((error) => {            
              this.sendRequest = false;
            });
        } else {
          this.saveActivite(activite)
            .then((response) => {
              if (response.status === 200 || response.status === 201) {
                this.fetchActivites(this.composanteId);
                this.close();
              }
            })
            .finally((error) => {          
              this.sendRequest = false;    
            });
        }
      }
    },

    close() {
      this.showCloseModal();

      this.resetForm();

      this.sendRequest = false;
    },

    resetForm(){

      this.champs = this.champs.map(item => { item['data'] = ''; item['errors'] = []; return item})
      
      window.document.getElementById('vform').reset()

      this.setActivite({})
    },
    
    showCloseModal(value = false) {
      this.showModal = value;
    }
  },

  watch: {
    loading: function (value) {
      //this.loading = value
    },

    errors: function (errors) {

      if(errors instanceof Object && errors.length === undefined){
        if(this.seePlan){
            this.champs2.forEach((value) => {

              if(errors[value.key] instanceof Array || errors[value.key] !== undefined ){
                if(value.key === "types"){
                
                  value.errors = errors["type"];

                }
                else value.errors = errors[value.key];
              }
            });
        }
        else if(this.seeActivite){
            this.champs.forEach((value) => {
              if(errors[value.key] instanceof Array || errors[value.key] !== undefined ){
               console.log("seeActivite boucle if ")
                if(value.key === "types"){
                  value.errors = errors["type"];
                }
                else{
                  console.log(this.sendRequest)
                  value.errors = errors[value.key];
                }

              }
            });
        }
      }
      else if(errors instanceof Array && errors.length === 0 ){
        this.champs = this.champs.map(item => { item['errors'] = []; return item})
      }
    },

    entreprisesExecutante: function (entreprisesExecutante) {

      this.champs.map((item) => {

        if (item.key === "structureResponsableId") {

          item.options = entreprisesExecutante.map((entrepriseExecutante) => {

            return {
              id: entrepriseExecutante.user.id,
              nom: entrepriseExecutante.user.nom,
            };

          });

        }

        return item;

      });

    },

    mods: function (mods) {

      this.champs.map((item) => {

        if (item.key === "structureAssocieId") {

          item.options = mods.map((mod) => {

            return {
              id: mod.user.id,
              nom: mod.user.nom,
            };

          });

        }

        return item;
        
      });
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
  
    this.programmeId = this.currentUser.programme.id

    if(this.programmeId){
      Promise.all([this.fetchProjets(this.programmeId) ]).then((value) => {
  
          this.fetchMods(this.programmeId)

          this.fetchEntreprisesExecutante(this.programmeId)
      });
    }

  }

};
</script>

<style></style>
