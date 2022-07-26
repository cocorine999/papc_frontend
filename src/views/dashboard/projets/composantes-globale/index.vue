<template>
  <dashboard>
    <div class="w-full px-4">
    <modal-top-right v-if="showModal" :title="title"  v-on:close="close">
      <form action="" @submit.prevent="save" class="px-4"  >
        <div class="grid grid-cols-1 gap-5 mt-3 ">
          <div class="grid grid-cols-1">
            <label class="text-xs font-semibold text-gray-500 uppercase md:text-sm text-light">Nom du composante <span class="px-2 text-lg font-black text-red-700">*</span></label>
            <input required class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2  focus:border-transparent" type="text" placeholder="Entrer le nom du composante" />
          </div>
          <div class="grid grid-cols-1">
            <label class="text-xs font-semibold text-gray-500 uppercase md:text-sm text-light">Description <span class="px-2 text-lg font-black text-red-700">*</span></label>
            <input required   class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2  focus:border-transparent" type="text" placeholder="Entrer la description" />
          </div>
        </div>

        <div class="grid grid-cols-1 gap-5 mt-3 ">
          <div class="grid grid-cols-1">
            <label class="text-xs font-semibold text-gray-500 uppercase md:text-sm text-light">Position  <span class="px-2 text-lg font-black text-red-700">*</span></label>
            <select class="px-3 py-2 mt-1 border-2 border-gray-300 w-full  focus:outline-none focus:ring-2  focus:border-transparent" name="" id="">
              <option v-for="i in 5" :key="i.id" value=""> {{i}} </option>
            </select>
          </div>

          <div class="grid grid-cols-1">
            <label class="text-xs font-semibold text-gray-500 uppercase md:text-sm text-light">Selectionnez un projet <span class="px-2 text-lg font-black text-red-700">*</span></label>
            <select class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2  focus:border-transparent" name="" id="">
              <option v-for="i in 5" :key="i.id" value=""> projet {{i}} </option>

            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-5 mt-3 ">
          <div class="grid grid-cols-1">
            <label class="text-xs font-semibold text-gray-500 uppercase md:text-sm text-light">Poids <span class="px-2 text-lg font-black text-red-700">*</span></label>
            <input required  class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2  focus:border-transparent" type="number" placeholder="Entrer le poids" />
          </div>
          <div class="grid grid-cols-1">
            <label class="text-xs font-semibold text-gray-500 uppercase md:text-sm text-light">Status <span class="px-2 text-lg font-black text-red-700">*</span></label>
            <select class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2  focus:border-transparent" name="" id="">
              <option value="">En cours</option>
              <option value="">En attente</option>
              <option value="">En terminer</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-5 mt-3 ">
          <div class="grid grid-cols-1">
            <label class="text-xs font-semibold text-gray-500 uppercase md:text-sm text-light">Montant BN <span class="px-2 text-lg font-black text-red-700">*</span></label>
            <input required  class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2  focus:border-transparent" type="number" placeholder="Entrer le BN" />
          </div>
          <div class="grid grid-cols-1">
            <label class="text-xs font-semibold text-gray-500 uppercase md:text-sm text-light">Montant EPM-PRET <span class="px-2 text-lg font-black text-red-700">*</span></label>
            <input required   class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2  focus:border-transparent" type="number" placeholder="Entrer le EPM pret " />
          </div>
        </div>

        
        

        <div class='flex items-center justify-center gap-4 pt-5 pb-5 my-4 md:gap-8'>
          <button v-if="title == 'Ajouter un nouveau composant' || title== 'Dupliquer un projet existant' " type="submit" class='w-auto px-4 py-2 font-medium text-white  shadow-xl bg-blue-500 hover:opacity-80'> 
            <span  class="mx-2 text-sm font-semibold uppercase" v-if="loading == false">
            Enregistrer et fermer
            </span>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>

          <button v-if="title == 'Modifier un nouveau composant'  " type="submit" class='w-full px-1 py-2 font-medium text-white  shadow-xl bg-blue-500 hover:opacity-80'> 
            <span  class="mx-2 text-xs font-semibold uppercase" v-if="loading == false">
              Modifier
            </span>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>

          <button v-if="title == 'Ajouter un nouveau composant' || title== 'Dupliquer un projet existant' " type="submit" class='w-auto px-4 py-2 font-medium text-white  shadow-xl bg-primary hover:opacity-80'> 
            <span  class="mx-2 text-sm font-semibold uppercase" v-if="loading == false">
            Enregistrer et ajouter
            </span>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </form>
    </modal-top-right>
    
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
        <span :class="{'border-primary border-b-8 font-bold':seeSuivi}" @click="gotoSuivi()" class="inline-block cursor-pointer text-lg uppercase  py-2">Le suivi evaluation </span>
      </div>
      
      <button v-if="seeComposant" @click="addComponent" title="ajouter un projet"   class="px-4 py-2 flex overflow-hidden items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
          <span> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg></span>
          <span class="mx-2 text-xs font-semibold">ajouter un composant</span>
      </button>
     
    </div>
    
    <div v-if="seeComposant">
      <div class="p-4 my-4 rounded-sm shadow-md bg-gray-50">
        <div class="flex items-center justify-between ">
        <!--Filtre sur projet -->
        <div class="w-2/5 flex items-center space-x-2">
          <multiselect v-model="valueFiltre" :options="options" :custom-label="selectProjet"  placeholder="selectionnez un projet" label="name" track-by="name"></multiselect>
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
        <div v-for="(composante,index) in composantes" :key="index">
          <card-composante
            :libelle="composante.libelle"
            :code="composante.code"
            :montantEPM="composante.montantEPM"
            :id="index"
          ></card-composante>
        </div>
      </div>
    </div>
    <div v-if="seeSuivi">
      <vtable id="datatable"
        :headers="headers"
        :datas="dataTable"
        :actions="actions"
        @supprimer="supprimer">
      </vtable>
    </div>
    
  </div>
  </dashboard>
 
</template>

<script>
import Vtable from '@/components/Vtable'
import ModalTopRight from '@/components/ModalTopRight'
import Multiselect from 'vue-multiselect'
import SearchBar from '@/components/SearchBar'
import Titre from '@/components/Titre'
import Vmodal from '@/components/Vmodal'
import Dashboard from '@/layouts/Dashboard'
import Dropdown from '@/components/Dropdown.vue'
import CardComposante from '@/components/CardComposante.vue'

import { mapGetters, mapActions, mapMutations, mapState} from "vuex";
import utils from '@/utils/index'

export default {
  components: {
    Dashboard,
    Vmodal,
    Titre,
    SearchBar,
    Multiselect,
    ModalTopRight,
    Dropdown,
    CardComposante,
    Vtable
},
  data() {
    return {
      valueFiltre:'',
      pending:false,
      success:true,
      rejected:false,
      rangeValue:0,
      showFiltre:false,
      options:[
        {name:'projet1'},
        {name:'projet2'},
        {name:'projet3'},
        {name:'projet4'},
        {name:'projet5'},
      ],
      showModal:false,
      loading:false,
      line:false,
      mosaique:true,
      isStateChange:false,
      seeComposant:true,
      seeSuivi:false,
      showInput:true,
      seeStatistique:false,
      option:[
        {name:"supprimer"},
        {name:"modifier"},
        {name:"dupliquer"},
        {name:"continuer"},
      ],
      composantes: [
        {
          code: "4.1.1.3.1.1",
          libelle: " Investissement dans l’assainissement pluvial et engagement des communautés pour la réduction des risques d’inondation et l’adaptation au changement climatique ",
          montantBN: "1,561,078.941",
          montantEPM: "42,598,138.77",
          poids: "72.00",
        },
        {
          code: "4.1.1.3.1.2",
          libelle: " Renforcement de la gestion et de la capacité en matière de résilience urbaine",
          montantBN: "1,030,354.65",
          montantEPM: "1,030,354.65",
          poids: "13.00",
        },
         {
          code: "4.1.1.3.1.3",
          libelle: " Renforcement de la gestion et de la capacité en matière de résilience urbaine",
          montantBN: "1,030,354.65",
          montantEPM: "1,030,354.65",
          poids: "13.00",
        },
      ],
      headers: [
        { name: "Composante", props: "composante"},
        { name: "Description", props: "description"},
        { name: "Budget Nationnal",props:'bn'},
        { name: "Pret",props:'pret'},
        { name: "Poids",props:'poids'},
       
        { name: "Status",props:'status'},
      ],
      dataTable:[
        {composante:"tache 1",description:"lorem ipsum",bn:"200000000",pret:"9540000000",poids:"5",status:"en cours"}
      ],
      actions: [
        { name: "supprimer", iconne: "" },
      ],
      dates:[
        {}
      ],
     
    }
    
  },
  computed:{

    //importation des variables du module auths
    ...mapState({
      identifiant: state => state.auths.identifiant,
      composante: state => state.composantes.composante,
      loading : state => state.loading,
      errors : state => state.errors,
    }),

    ...mapGetters({
      composantes: "composantes/getComposantes", 
      composante: "getComposante",
      projets: "projets/getProjets",
      currentUser : 'auths/GET_AUTHENTICATE_USER'
      
    })
  },

  methods: {
    filtreRange(value){
      this.rangeValue = value
    },
    selectProjet ({ name}) {
      return `${name}`
    },
    addDate() {
      this.dates.push({})
    },
     gotoSuivi() {
      this.seeSuivi = true
      this.seeComposant = false
    },
    gotoComposante() {
      this.seeSuivi = false
      this.seeComposant = true
    },
    switch1() {
      this.mosaique = true
      this.line = false
    },
    switch2() {
      this.mosaique = false
      this.line = true
    },
    close() {
      this.showModal = false
    },
    addComponent() {
      this.title ="Ajouter un nouveau composant"
      this.showModal = true
    },
    modifier() {
      this.title ="Modifier un nouveau composant"
      this.showModal = true
    },
    dupliquer() {
      this.title ="Dupliquer un projet existant"
      this.showModal = true
    },
    gotoNext() {
      this.$router.push('/dashboard/projets/sous-composantes-globale')
    },
     editerSuivi(index) {
      this.showInput = false
    },
    toggle() {
      this.pending = false
      this.rejected = false
      this.success = true

    },

    errors: function(errors) {
      this.champs.forEach((value) => {value.errors = errors[value.key]})
      //this.errors = errors
    }

  },
  
  mounted() {
    console.log("Fetching list of composantes ...")
    this.fetchComposantes({id : this.currentUser?.programme?.id}).then((value) => {
        setTimeout(() => {
          console.log("Fetching list of projets...")
          this.fetchProjets({id : this.currentUser?.programme?.id})
        }, 1000);
    })
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>

</style>