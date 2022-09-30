<template>
  <div class="w-full p-4">
      
      <nav class="mb-2 text-sm font-semibold flex justify-between items-center " aria-label="Breadcrumb">
        <div>
          <ol class="inline-flex p-0 list-none">
            <li class="flex items-center ">
              <router-link to="/dashboard" class="text-gray-600">dashboard</router-link>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
            </li>
            <li class="flex items-center text-blue-500 ">
              <router-link to="/dashboard/projets" class="text-gray-600">projets</router-link>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
            </li>
            <li class="flex items-center text-blue-500 ">
              <router-link to="/dashboard/projets/composantes-globale" class="">composantes</router-link>
            </li>
          </ol>
        </div>
        <div>
          <search-bar ></search-bar>
        </div>
      </nav> 

    
    <div class="flex items-center justify-between my-2">
      <div class="flex space-x-4">
        <span :class="{'border-primary border-b-8 font-bold':seeComposant}" @click="gotoComposante()" class="inline-block cursor-pointer  text-lg uppercase    border-primary py-2">les composantes </span>
      </div>
      
      <button v-if="seeComposant && composanteAdd" @click="addComponent" title="ajouter un projet"   class="px-4 py-2 flex overflow-hidden items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
          <span> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg></span>
          <span class="mx-2 text-xs font-semibold">ajouter un composant</span>
      </button>
     
    </div>
    
    <div v-if="seeComposant">
      <div class="p-4 my-4 rounded-sm shadow-md bg-gray-50">
        <div class="flex items-center justify-between ">
        <!--Filtre sur projet -->
        <div class="w-2/5 flex items-center space-x-2">
          <multiselect v-model="valueFiltre" :options="projets" :custom-label="customLabel" :preselect-first="true" placeholder="selectionnez un projet" label="nom" track-by="id"></multiselect>
          <button v-if="!showFiltre" title="filtre" @click="showFiltre = true" class="bg-primary flex items-center space-x-3 text-white px-2 py-1">
            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
            <span>filtre</span>
          </button>
          <div v-else  class="px-6 w-full">
            <div class="bg-gray-300 h-2 w-full rounded-full relative">
              <span class="bg-white h-4 w-4 absolute top-0 -ml-2 -mt-1 z-10 shadow rounded-full cursor-pointer" :style="`left:${rangeValue}%`"></span>
              <span class="bg-green-500 h-2 absolute left-0 top-0 rounded-full"  :style="`width:${rangeValue}%`"></span>
            </div>
            <div class="flex justify-between mt-2 text-xs text-gray-600">
              <span @click="filtreRange(0)" class="w-8 cursor-pointer text-left">0%</span>
              <span @click="filtreRange(25)" class="w-8 cursor-pointer text-center">25%</span>
              <span @click="filtreRange(50)" class="w-8 cursor-pointer text-center">50%</span>
              <span @click="filtreRange(75)" class="w-8 cursor-pointer text-center">75%</span>
              <span @click="filtreRange(100)" class="w-8 cursor-pointer text-right">100%</span>
              <button @click="showFiltre = false" class="text-white bg-blue-300 p-1">revenir</button>
            </div>
          
          </div>
        </div>
      <!--Filtre sur projet -->
          <nav class="flex text-sm align-middle justify-evenly">
          <span  @click="toggle2" :class="{'border-yellow-600 text-yellow-600' : pending}" class="inline-block px-4 py-2 font-semibold text-gray-700 uppercase border-b-8 border-transparent cursor-pointer ">
            attentes 
              <span class="px-2 text-base text-yellow-600 border border-yellow-600 rounded-full undefined">
              5
              </span>
            </span>
            <span  @click="toggle" :class="{'border-green-600 text-green-600' : success}" class="inline-block px-4 py-2 font-semibold text-gray-700 uppercase border-b-8 border-transparent cursor-pointer ">
              validés 
              <span class="px-2 text-base text-green-600 border border-green-600 rounded-full undefined">
              9
              </span>
            </span>
            <span  @click="toggle3" :class="{'border-red-600 text-red-600' : rejected}" class="inline-block px-4 py-2 font-semibold text-gray-700 uppercase border-b-8 border-transparent cursor-pointer ">
              rejetés
              <span class="px-2 text-base text-red-600 border border-red-600 rounded-full undefined">
              8
              </span>
            </span>
          </nav>
        </div>
      </div>
      <div  class="grid grid-cols-1 my-4 lg:grid-cols-3 md:grid-cols-2 sm:gap-5">
        <div v-for="(composante, index) in composantes" :key="index">
          <card-composante
            :libelle="composante.nom"
            :code="composante.code"
            :statut="getStatus(composante.statut)"
            :montantEPM="composante.pret"
            :position="composante.position"
            :poids="composante.poids"
            :bailleur="composante.sigle"
            @modifier="modifier(composante)"
            @supprimer="supprimer(composante)"
            @validation="validation(composante)"
            @suivre="suivreMyComposant(composante)"
            :isDelete = "composanteDelete"
            :isUpdate="composanteUpdate"
          ></card-composante>
        </div>

      </div>
    </div>
    
  </div>
 
</template>

<script>

import ModalTopRight from '@/components/ModalTopRight'
import Multiselect from 'vue-multiselect'
import SearchBar from '@/components/SearchBar'
import Titre from '@/components/Titre'
import Vmodal from '@/components/Vmodal'
import Vform from '@/components/Vform'
import Dropdown from '@/components/Dropdown.vue'
import CardComposante from '@/components/CardComposante.vue'
import  { getStringValueOfStatutCode }  from '@/utils/index'
import Suivi from "@/components/revisiteC/Suivi.vue";
import { mapGetters, mapActions, mapMutations, mapState} from "vuex";
import Projet from '@/store/modules/projets/projet'
export default {
  components: {
    Vmodal,
    Titre,
    Vform,
    SearchBar,
    Multiselect,
    ModalTopRight,
    Dropdown,
    CardComposante,
    Suivi
},
props: ['version'],
  data() {
    return {
      valueFiltre: null,
      pending:false,
      success:true,
      rejected:false,
      rangeValue:0,
      showFiltre:false,
      seeComposant:true,
      seeSuivi:false,
      seeStatistique:false,
      option:[
        {name:"supprimer"},
        {name:"modifier"},
        {name:"dupliquer"},
        {name:"continuer"},
      ],
      
      composanteAttributs : ['nom', 'description', 'budgetNational', 'pret', 'tepPrevu', 'poids'],

      champs:[

        {name: 'Nom de la composante', key: "nom", type: 'text', placeholdere: "Nom du projet", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Poids', type: 'number', key: "poids", placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Pret', type: 'number', key: "pret", placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Budget National', key: "budgetNational", type: 'number', placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Taux d\'execution physique', key: "tepPrevu", type: 'number', placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Description', type: '', key: "description", placeholdere: 'Description du projet', isSelect: false, isTextArea: true, data:'', required: false, errors : []},
        
      ],

      composanteAdd:false,
      composanteDelete:false,
      composanteUpdate:false,
      actions: [
        { name: "supprimer", iconne: "" },
      ],
      dates:[
        {}
      ],
      results: [],
      projets: [],
      composantes: [],
      suivis:[]
     
    }
    
  },
  
  computed:{

    //importation des variables du module auths
    ...mapState({
      composante: state => state.composantes.composante,
      loading : state => state.loading,
      errors : state => state.errors
    }),

    ...mapGetters({
      projets: "projets/getProjets",
      composantes: "composantes/getComposantes",
      composante: "composantes/getComposante",
      currentUser : 'auths/GET_AUTHENTICATE_USER'
    }),
     ...mapGetters('auths', {currentUser : 'GET_AUTHENTICATE_USER'})

  },

  methods: {

    //Charger les fonctions de communication avec le serveur
    ...mapMutations({
      setErrors: 'SET_ERRORS_MESSAGE', // map `this.setErrors()` to `this.$store.commit('SET_ERRORS_MESSAGE')`,
      setComposante: 'composantes/FILL', // map `this.CREATE_INSTANCE_PROJET()` to `this.$store.commit('CREATE_INSTANCE_PROJET')`
      setComposantes: 'composantes/SET_LIST_COMPOSANTES'
    }),
     getPermission() {
      this.currentUser.role[0].permissions.forEach(element => {
        
          if(element.slug === 'creer-une-composante') {
            this.composanteAdd = true
          }
            if(element.slug === 'modifier-une-composante') {
              this.composanteUpdate = true
            }
            if(element.slug ==='supprimer-une-composante') {
              this.composanteDelete = true
            }
           
        });
    },
    suivreMyComposant(composante) {
      this.$router.push({name:'dashboard_projets_composantes_globale_suivis',params:{id:composante.id}})
    },

   
    ...mapActions('composantes', {
      fetchComposantes: "FETCH_LIST_COMPOSANTE_OF_PROJET",
      saveComposante: "STORE_COMPOSANTE",
      updateComposante: "UPDATE_COMPOSANTE",
      deleteComposante: "DESTROY_COMPOSANTE"
    }),

    ...mapActions({
      getPtabReviser: "revisionPtab/GET_PTAB_REVISER"
    }),
    
    customLabel ({ codePta, nom }) {
      return `${codePta} – ${nom}`
    },

    getIntervale(val){
      return val - 25;
    },

    filtreRange(value){

      this.rangeValue = value

      /* let composantes = this.composantes.map((composante) => {
        
        if(composante.tep >= this.getIntervale(value) &&  composante.tep <= value){
            return composante;
        }
      }); */

    },

    selectProjet ({ nom}) {
      return `${nom}`
    },

    gotoSuivi() {
      this.seeSuivi = true
      this.seeComposant = false
    },

    gotoComposante() {
      this.seeSuivi = false
      this.seeComposant = true
    },

    toggle() {
      this.pending = false
      this.rejected = false
      this.success = true

    },

    toggle2() {
      this.success = false
      this.rejected = false
      this.pending = true
    },

    toggle3() {
      this.pending = false
      this.success = false
      this.rejected = true
    },

    getStatus(status){
      return getStringValueOfStatutCode(status);
    },

  },
  watch: {

    version: function (version) {

      const params = {
        "version": version,
        "composantes": null
      };

      this.getPtabReviser(params).then((value) => {
        this.results = value.data.data
      })
    },

    errors: function(errors) {
    },

    valueFiltre: function(valeur){
      if( valeur instanceof Projet || valeur instanceof Object )
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
    },
    
    results: function(results){
      this.projets = results['projets'];

      if(results['projets'].length > 0){
        this.projetFiltre = results[0]
      }
    },

    projets: function(projets){
      if(projets.length > 0){
        this.valueFiltre = projets[0]
      }
    },

  },

  created() {
    this.getPermission()
    const params = {
      "version": this.version,
      "composantes": null
    };

    this.getPtabReviser(params).then((value) => {
      this.results = value.data.data
    })
  }
  
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>

</style>