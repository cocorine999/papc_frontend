<template>
  <dashboard>
    <div v-if="showModal">
      <modal-top-right :title="title"  v-on:close="showModal = false">
      
        <div  class="px-4 overflow-y-auto">
          <form action="" @submit.prevent="sendForm" class="px-4"  >
       
            <div class="my-4">
              <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light"> Nom de l'activité <span class="px-2 text-lg font-black text-red-700">*</span></label>
              <input required class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="text" placeholder="Entrer le nom du composante" />
            </div>

          <div class="my-4">
            <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light">Code de l'activité <span class="px-2 text-lg font-black text-red-700">*</span></label>
            <input required class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="text" placeholder="Entrer le nom du composante" />
          </div>
          
          <div class="my-4">
            <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light"> Selectionnez une entreprise <span class="px-2 text-lg font-black text-red-700">*</span></label>
            <div class="flex justify-between my-3">
              <div>
                <input type="radio" @click="allEntreprise= false" id="all" name="entreprise" value="all" >
                <label class="px-2" for="all">Tout les entreprises</label>
              </div>
              <div>
                <input type="radio" @click="allEntreprise= true" id="sauf" name="entreprise" value="sauf">
                <label class="px-2" for="sauf">Tout sauf</label>
              </div>
            </div>
          
            <multiselect v-if="allEntreprise" v-model="value" tag-placeholder="seleectionnez une entreprise" placeholder="selectionnez une entreprise" label="nom" track-by="nom"  :selectLabel="'Appuyez sur Entrée pour sélectionner'" :deselectLabel="'Appuyez sur Entrée pour supprimer'" :options="entreprises" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
          </div>

          <div class="my-4">
            <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light">Date debut <span class="px-2 text-lg font-black text-red-700">*</span></label>
            <input required class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="text" placeholder="Entrer le nom du composante" />
          </div>

          <div class="my-4">
            <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light">Date fin <span class="px-2 text-lg font-black text-red-700">*</span></label>
            <input required class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="text" placeholder="Entrer le nom du composante" />
          </div>
        

        <div class='flex items-center justify-center gap-4 pt-5 pb-5 my-4 md:gap-8'>
          <button type="submit" class='w-auto px-4 py-2 font-medium text-white  shadow-xl bg-blue-500 hover:opacity-80'> 
            Enregistrer 
          </button>

          <button type="submit" class='w-auto px-4 py-2 font-medium text-white  shadow-xl bg-red-500 hover:opacity-80'> 
            Annuler
          </button>

        </div>
          </form>
        </div>
      </modal-top-right>
    </div>
    <vmodal v-if="showLink" @close="showLink=false">
      <div class="m-2 p-2 bg-white shadow" style="width:60vw">
        <p class="p-2 bg-gray-300 border text-gray-700 font-semibold text-sm border-gray-600 text-center rounded-md">
          <a  title="cliquez ici" target="_blank" href="/form"> cliquer ici</a>
        </p>
      </div>
    </vmodal>
    <div class="w-full px-4">
      <nav class="mb-2 text-sm font-semibold flex justify-between items-center " aria-label="Breadcrumb">
        <div>
          <ol class="inline-flex p-0 list-none">
            <li class="flex items-center text-blue-500">
              <router-link to="" class="text-gray-600">dashboard</router-link>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
            </li>
            <li class="flex items-center ">
              <router-link to="" class="text-gray-600">entreprise</router-link>
            </li>
          </ol>
        </div>
        <div>
          <search-bar></search-bar>
        </div>
      </nav> 

      <div class="flex items-center justify-between my-2">
        <div class="flex space-x-4">
          <span @click="goEntreprise" :class="{'border-primary border-b-8':seeEntreprise}" class="inline-block cursor-pointer  text-lg uppercase font-bold    py-2"> Listes des entreprises </span>
          <span @click="goActivite" :class="{'border-primary border-b-8':seeActivite}" class="inline-block cursor-pointer  text-lg uppercase font-bold   py-2"> Les activites </span>
          <span @click="goFormulaire" :class="{'border-primary border-b-8':seeFormulaire}" class="inline-block cursor-pointer  text-lg uppercase font-bold   py-2"> Les formulaires </span>
        </div> 
        <div>
          <button @click="addActivite" v-if="seeActivite"   title="creer une activité"  class="py-2 px-4 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase bg-primary focus:outline-none focus:shadow-outline">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
            <span class="mx-2 text-sm font-semibold">Creer une activité </span>
          </button>
          <router-link v-if="seeFormulaire" :to="{name:'unite_de_gestion_checklist_create',params:{id:$route.params.id}}"  title="ajouter une checklist"  class="py-2 px-4 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase bg-primary focus:outline-none focus:shadow-outline">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
            <span class="mx-2 text-sm font-semibold">Creer un formulaire </span>
          </router-link> 
        </div>
         
      </div>

      <div v-if="seeEntreprise" class="grid grid-cols-1 my-4 lg:grid-cols-3 md:grid-cols-2 sm:gap-5">
        <div v-for="(entreprise,index) in entreprises" :key="index">
          <div @click="gotoNext" class="relative cursor-pointer">
             
            <div class="relative p-6 max-w-80 bg-white sm:rounded-lg overflow-hidden _shadow-md">
              <span  class="absolute bottom-0 left-0 w-full  h-8 text-white font-semibold leading-3 px-8 py-2 text-right"><p> </p></span>
              <span  class="absolute text-4xl sm:text-5xl text-white tracking-tight font-bold  px-4 py-2 rounded-lg uppercase"><i class='bx bx-coin-stack bx-md'></i>{{entreprise.nom}}</span>
              
              <p class="my-2 text-normal text-lg sm:text-2xl font-medium text-gray-600 mt-16 truncate">Entreprise {{index}}</p>
        
              <div class="flex items-center mt-8 text-gray-600">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" class="w-8 h-8 text-gray-500">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div class="ml-4 text-md tracking-wide font-semibold w-full truncate">{{entreprise.adresse}}</div>
              </div>
        
              <div class="flex items-center mt-1 text-gray-600 dark:text-gray-400">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" class="w-8 h-8 text-gray-500">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div class="ml-4 text-md tracking-wide font-semibold w-full truncate">{{entreprise.contact}}</div>
              </div>
        
              <div class="flex items-center mb-8 text-gray-600 dark:text-gray-400">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" class="w-8 h-8 text-gray-500">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div class="ml-4 text-md tracking-wide font-semibold w-full truncate">{{entreprise.email}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="seeActivite">
        <vtable :headers="headers" :datas="dataTable" :actions="actions" @supprimer="supprimerActivte" ></vtable>    
      </div>
      <div v-if="seeFormulaire">
        <div class="grid grid-cols-3 gap-4">
          <div v-for="i in 6" :key="i.id">
            <card-checklist
              libelle="formulaire"
              code="15555DC" 
              activite="Nombre d'accident routiere" 
              :unites="['personne','%','km']" 
              @supprimer="supprimer"
              @modifier="modifier"
              @dupliquer="dupliquer"
              @gotoDetails="gotoDetails(i)"
              @onlink="getlink(i)"
              > 
            </card-checklist>
          </div>
        </div>
      </div>

      
  </div>
  </dashboard>
</template>

<script>
import ModalTopRight from '@/components/ModalTopRight'
import SearchBar from '@/components/SearchBar'
import CardBailleur from '@/components/CardBailleur'
import Titre from '@/components/Titre'
import Vtable from '@/components/Vtable'
import Vform from '@/components/Vform'
import Vmodal from '@/components/Vmodal'
import Dashboard from '@/layouts/Dashboard'
import Dropdown from '@/components/Dropdown.vue'
import CardChecklist from '@/components/CardChecklist'
import Multiselect from 'vue-multiselect'
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
 
  components: {
    Vtable,
    Dashboard,
    Vmodal,
    Vform,
    CardBailleur,
    Titre,
    SearchBar,
    ModalTopRight,
    Dropdown,
    CardChecklist,
    Multiselect,

  },
  data() {
    return {
      title:'',
      showModal:false,
      allEntreprise:false,
      champs:[],
      
      showLink:false,
      headers:[
          {name:'Libelle activite',cle:'libelle'},
          {name:'code',cle:'code'},
          {name:'Entreprise',cle:'entreprise'},
          {name:'Date debut',cle:'debut'},
          {name:'Date fin',cle:'fin'},
          {name:'Date de creation',cle:'created_at'},
      ],
      dataTable:[
          {libelle:'preparer et faire valider par le MO et le MOD un PGESC',code:"DD555F",entreprise:'liste entreprise',debut:'31-01-2020',fin:"23-0-2022",created_at:"22-06-2022"},
          {libelle:'preparer et faire valider par le MO et le MOD un PAE',code:"DD555F",entreprise:'liste entreprise',debut:'31-01-2020',fin:"23-0-2022",created_at:"22-06-2022"},
          {libelle:'preparer et faire valider par le MO et le MOD un PPGED',code:"DD555F",entreprise:'liste entreprise',debut:'31-01-2020',fin:"23-0-2022",created_at:"22-06-2022"},
          {libelle:'preparer et faire valider par le MO et le MOD un PPSPS',code:"DD555F",entreprise:'liste entreprise',debut:'31-01-2020',fin:"23-0-2022",created_at:"22-06-2022"},
      ],
      option:[
        {name:'supprimer'},
        {name:'modifier'},
        {name:'continuer',iconne:''},
      ],
      seeEntreprise:true,
      seeFormulaire:false,
      seeActivite:false,
      value:[]
      
    }
  },
  computed: {
    ...mapGetters({
      hasErrors: "GET_ERREURS",
      isLoading: "IS_LOADING",
      entreprises: "entreprisesExecutante/getEntreprisesExecutante",
      currentUser: "auths/GET_AUTHENTICATE_USER",
    }),
  },

  mounted() {
    
    console.log("Fetching entreprises executantes ...");
    this.fetchEntreprisesExecutante();

    const en = [{name:'papc'},{name:'pool'},{name:'demo'}]
    this.champs = [
      {name:'Nom activité',type:'text',placeholdere:"libelle activité",isSelect:false,isTextArea:false,data:'',required:true,},
      {name:'Code activité',type:'text',placeholdere:"code activité",isSelect:false,isTextArea:false,data:'',required:true,},
      {name:'Programme',type:'',placeholdere:'Choisir un programme',isSelect:true,isTextArea:false,data:'',options:programme,required:true,methode:this.selectData},
      {name:'Date debut',type:'date',placeholdere:"Date debut",isSelect:false,isTextArea:false,data:'',required:true,},
      {name:'Date fin',type:'date',placeholdere:"Date fin",isSelect:false,isTextArea:false,data:'',required:true,},
    ]
  },
  methods: {
    
    ...mapActions("entreprisesExecutante", {
      fetchEntreprisesExecutante: "FETCH_LIST_ENTREPRISE_EXECUTANTE",
    }),

    addTag (newTag) {
      const tag = {
        nom: newTag,
      }
      this.options.push(tag)
      this.value.push(tag)
    },
    getlink(i){
      this.showLink = true
    },
    gotoDetails(id) {
      this.$router.push({name:'unite_de_gestion_checklist_details',params:{id:id}})
    },
    selectData ({ name}) {
      return `${name}`
    },
    addActivite() {
      this.title = 'Creer une activité'
      this.showModal = true
    },
    goEntreprise() {
      this.seeEntreprise = true
      this.seeFormulaire = false
      this.seeActivite = false
    },
    goFormulaire() {
      this.seeEntreprise = false
      this.seeFormulaire = true
      this.seeActivite = false
    },
    goActivite() {
      this.seeEntreprise = false
      this.seeFormulaire = false
      this.seeActivite = true
    },
    
    gotoNext() {
       this.$router.push({name:'unite_de_gestion_checklist',params:{id:1}})
    },

   
  }
}
</script>

<style>

</style>