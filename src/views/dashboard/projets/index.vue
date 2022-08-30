<template>
  <dashboard>
    <div class="w-full p-4">
       <vmodal v-if="showProlonger" title="prolonger la date d'echeance " @close="showProlonger = false">
        <div style="width:60vw" class="p-4">
          <form @submit.prevent="saveProlongerDate()" action="">
            <div class="form-group my-2">
                <label class="text-xs font-semibold block text-gray-500 uppercase md:text-sm text-light">Date prolongation <span class="px-2 text-lg font-black text-red-700">*</span></label>
                <input v-model="dates.fin" required class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2 w-full  focus:border-transparent" type="date"  />
            </div>
            <button type="submit" class="bg-primary  flex space-x-2  items-center text-white px-4 py-2 border border-primary font-semibold uppercase">
              <span class="text-sm font-semibold uppercase" v-if="!chargement">
                enregistrer
              </span>
              <span v-else class="flex items-center space-x-2">
                <span class="text-xs px-4 font-semibold ">
                  envoi ...
                </span>
                <svg  xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-center animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </span>
              </button>
          </form>
        </div>
      </vmodal>
      <div v-if="showModal">
        <modal-top-right :title="title" v-on:close="close">
            <div class="p-4 overflow-auto">
              <vform template="default"  :champs="champs" :cols="cols" :submitText="submitText" @sendForm="sendForm" @closeModal="close" ></vform>
            </div>
        </modal-top-right>
      </div>
      <nav class="mb-2 text-sm font-semibold flex justify-between items-center " aria-label="Breadcrumb">
        <div>
          <ol class="inline-flex p-0 list-none">
            <li class="flex items-center text-blue-500">
              <router-link to="/dashboard" class="text-gray-600">dashboard</router-link>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
            </li>
            <li class="flex items-center text-blue-500 ">
              <router-link to="/dashboard/projets" class="">projets</router-link>
            </li>
          </ol>
        </div>
        <div>
          <search-bar ></search-bar>
        </div>
      </nav> 
      
      <div class="flex items-center justify-between my-2">
        <div class="">
          <span  class="inline-block cursor-pointer  border-b-8 font-bold  text-sm uppercase    border-primary py-2">Les projets </span>
        </div>

        <button @click="addProjet"  title="ajouter un projet"    class="px-4 py-2 flex overflow-hidden items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
          <span> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg></span>
          <span class="mx-2 text-xs font-semibold">ajouter</span>
        </button>
      </div>
      <div  class="grid grid-cols-1 my-4 lg:grid-cols-3 md:grid-cols-2 sm:gap-5">
        <div v-for="(projet, index) in projets" :key="index">
          <div @click.stop="gotoDetails(projet)" class="bg-white p-0 mb-6 transition duration-300 group transform hover:-translate-y-1 hover:shadow-lg cursor-pointer  shadow-md border-bottom border-indigo-500">
            <!-- <a href="#1" class="absolute opacity-0 top-0 right-0 left-0 bottom-0"></a> -->
            <div class="flex justify-center items-top p-4 bg-gray-600 bg-opacity-100 z-10 absolute top-0 left-0 w-full h-full text-white opacity-0 transition-all duration-300 transform group-hover:scale-105 text-lg group-hover:opacity-100">
              <p class="max-h-48 line-clamp-7 px-2"> {{ projet.description }} </p>
              <div  class="absolute bottom-5 ">
                <div class="uppercase text-sm flex items-center rounded-2xl shadow space-x-3 bg-white text-primary px-4 py-3 font-bold">
                  details
                </div>
              </div>
              <div  class="absolute top-2 left-2 ">
                <div class="uppercase text-sm flex bg-white text-primary p-1 font-bold">
                  <dropdown @supprimer="supprimerProjet(projet)" @modifier="modifierProjet(projet)"  @prolonger="prolonger(projet)" :option="option"></dropdown>
                </div>
              </div>
            </div>
            <div class="relative mb-2">
              <img class=" max-h-52 w-full object-cover transition-transform duration-300 transform group-hover:scale-100"
                src="@/assets/images/login/logo-gouv.webp"
                alt="">
                <div class="absolute bottom-0 right-0">
                  <div v-if="projet.statut == 0 " class=" text-sm flex items-center text-white bg-yellow-500 px-3 py-1 font-semibold">En cours<i class='bx bx-time-five ml-1'></i></div>
                  <div v-if="projet.statut == 2 " class=" text-sm flex items-center text-white bg-green-500 px-3 py-1 font-semibold">Terminer<i class='bx bx-time-five ml-1'></i></div>
                  <div v-if="projet.statut == -1 " class=" text-sm flex items-center text-white bg-gray-500 px-3 py-1 font-semibold">En attente <i class='bx bx-time-five ml-1'></i></div>
                  <div v-if="projet.statut == 1 " class=" text-sm flex items-center text-white bg-gray-500 px-3 py-1 font-semibold">En retard <i class='bx bx-time-five ml-1'></i></div>
                  <div v-if="projet.statut == -2 " class=" text-sm flex items-center text-white bg-gray-500 px-3 py-1 font-semibold">Non validé <i class='bx bx-time-five ml-1'></i></div>
                </div>
                <div class="absolute top-2 left-2">
                  <div :class="projet.couleur" :style="`background-color:${projet.couleur}`" class="uppercase rounded-lg text-sm flex items-center text-white  px-3 py-1 font-semibold"><i class='bx bx-coin-stack mr-1'></i>{{projet.bailleur.sigle}}
                  </div>
                </div>
            </div>
            <div class="block px-4 pb-4">
              <span :class="projet.couleur" :style="`background-color:${projet.couleur}`" class="absolute bottom-0 left-0 w-full  h-2"></span>
              <h3 class="font-medium text-xl">
                <a href="#2"
                  class="block uppercase relative group-hover:text-gray-800 transition-colors duration-200 line-clamp-2 text-lg">{{projet.nom}}
                </a>
              </h3>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </dashboard>
  
</template>

<script>
import ModalTopRight from '@/components/ModalTopRight'
import SearchBar from '@/components/SearchBar'
import Titre from '@/components/Titre'
import Vtable from '@/components/Vtable'
import Vform from '@/components/Vform'
import Vmodal from '@/components/Vmodal'
import Dashboard from '@/layouts/Dashboard'
import Dropdown from '@/components/Dropdown.vue'
import { mapGetters, mapActions, mapMutations, mapState} from "vuex";

import { extractFormData } from '@/utils/index'

export default {
  components: {
    Vtable,
    Dashboard,
    Vmodal,
    Vform,
    Titre,
    SearchBar,
    ModalTopRight,
    Dropdown
  },
  data() {
    return {
      showModal:false,
      line:false,
      dates: {fin:''},
      submitText:"Enregistrer",
      cols:1,
      mosaique:true,
      programmeId: this.currentUser?.programme?.id,
      showProlonger:false,
      chargement: false,
      projetId:'',
      title: '',
      projetAttributs : ['nom', 'description', 'debut', 'fin', 'objectifGlobaux', 'budgetNational', 'pret', 'couleur', 'ville', 'statut', 'bailleurId'],
      champs:[
        {name: 'Nom du projet', key: "nom", type: 'text', placeholdere: "Nom du projet", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Pret', type: 'number', key: "pret", placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Budget Nationnal', key: "budgetNational", type: 'number', placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Date debut', key: "debut", type: 'date', placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true,},
        {name: 'Date fin', type: 'date', key: "fin", placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Couleur', type: 'color', key: "couleur", placeholdere: 'Choississez une couleur', isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Piece jointe', type: 'file', placeholdere: 'Choississez une couverture', isSelect: false, isTextArea: false, data:'', required: false, errors : []},
        {name: 'Ville', key: "ville", type: '', placeholdere: 'Selectionnez une ville', isSelect: true, isTextArea: false, data:'', required: true, options: ['cotonou', 'calavi', 'bohicon'], isSimpleTable: true, errors : []},
        {name: 'Bailleur', key: "bailleurId", type: '', placeholdere: 'Selectionnez un bailleur', isSelect: true, isTextArea: false, data:'', required: true, options: this.bailleurs, cle: 'id', value: 'sigle',  errors : []},
        {name: 'Status', key: "statut", type: '', placeholdere: 'Selectionnez un status', isSelect: true, isTextArea: false, data:'', required: true, options:this.$store.state.statuts, cle: 'etat', value: 'nom',  errors : []},
        {name: 'Objectifs globaux', key: "objectifGlobaux", type: '', placeholdere: '', isSelect: false, isTextArea:true, data:'', required: false, errors : []},
        {name: 'Objectif specifique', key: "objectifSpecifique", type: 'text', placeholdere: 'Definir les objectifs', isSelect: false, isTextArea: false, data:'', required: false, errors : []},
        {name: 'Description', type: '', key: "description", placeholdere: 'Description du projet', isSelect: false, isTextArea: true, data:'', required: false, errors : []},
      ],
     
     option: [
        { name: "supprimer" },
        { name: "modifier" },
        { name: "prolonger" },
      ],
    }
    
  },

  computed:{

    //importation des variables du module auths
    ...mapState({
      identifiant: state => state.auths.identifiant,
      projet: state => state.projets.projet,
      loading : state => state.loading,
      errors : state => state.errors
    }),

    ...mapGetters({
      projets: "projets/getProjets", projet: "getProjet",
      bailleurs: "bailleurs/getBailleurs",
      currentUser : 'auths/GET_AUTHENTICATE_USER'
    })
    
  },

  methods: {
    prolonger(projet) {
      console.log(projet);
      this.projetId = projet.id
      this.showProlonger = true
    },

    saveProlongerDate() {
  
      this.chargement = true
      
      this.prolongerDateProjet({projet: this.dates, id : this.projetId}).then(response => {
          
          if(response.status == 200 || response.status == 201){

            this.showProlonger = false;

            this.fetchProjets(this.programmeId);
          }

        }).catch((error) => {
          alert(error.response?.data?.errors['fin']);
        })

      this.chargement = false  
    },
    //Charger les fonctions de communication avec le serveur
    ...mapMutations({
      setErrors: 'SET_ERRORS_MESSAGE', // map `this.setErrors()` to `this.$store.commit('SET_ERRORS_MESSAGE')`,
      setProjet: 'projets/FILL' // map `this.CREATE_INSTANCE_PROJET()` to `this.$store.commit('CREATE_INSTANCE_PROJET')`
    }),

    ...mapActions('projets', {
      fetchProjets: "FETCH_LIST_PROJET_OF_PROGRAMME",
      saveProjet: "STORE_PROJET",
      prolongerDateProjet: "PROLONGER_DATE_PROJET",
      updateProjet: "UPDATE_PROJET",
      deleteProjet: "DESTROY_PROJET"
    }),

    ...mapActions('bailleurs', { fetchBailleurs: 'FETCH_LIST_BAILLEUR_OF_PROGRAMME' }),

    gotoDetails(projet) {
      console.log(projet)
      this.$router.push({name:'projets_id_details',params:{id:projet.id, projet: projet}})
     
    },

    addDate() {
      this.dates.push({})
    },
    
    close() {
      this.showCloseModal()

      this.resetForm
    }, 
    
    showCloseModal(value = false) {
      this.showModal = value
    },

    addProjet() {

      this.title='Ajouter un nouveau projet'

      let formData = this.champs.map((value) => {
          if(value.key === 'bailleurId'){ 
            value['options'] = this.bailleurs
          }

          else if(value.key === 'statut'){ 
            value['options'] = this.$store.state.statuts
          }

          return value

        })

      this.champs = formData

      this.showCloseModal(true)
    },

    modifierProjet(projet) {

      this.title = 'Modifier un projet'

      this.submitText="Enregistrer",

      this.setProjet(projet)

      this.projetAttributs.forEach((item) => {

        this.champs.find((value, index) => {

          if(value.key === item){
            this.champs[index]['data'] = this.projet[item]
          }

        })

      })

      this.showCloseModal(true)
    },

    async supprimerProjet(projet) {
      if(window.confirm("Voulez-vous supprimer ce projet " + projet.nom)) await this.deleteProjet(projet.id)
    },

    dupliquer() {
      this.title ="Dupliquer projet existant"
      this.showModal = true
    },

    
    resetForm(){

      this.champs = this.champs.map(item => { item.data = ''; return item})
      
      window.document.getElementById('vform').reset()

      this.setProjet({})
    },

    gotoNext() {
      this.$router.push('/dashboard/projets/composantes')
    },

    sendForm() {

      this.champs = this.champs.map(item => { item.errors = []; return item})

      let projet = extractFormData(this.champs, this.projetAttributs)

      projet.programmeId = this.programmeId

      projet.bailleurId = projet.bailleurId.id

      projet.statut = projet.statut.etat
      
      if(this.projet?.id)
      {

        this.updateProjet({projet: projet, id : this.projet?.id}).then(response => {
          
          if(response.status == 200 || response.status == 201){

            this.close()
          }

        }).catch((error) => {

          this.setErrors({message: error?.response?.data?.message, errors: error.response.data.errors})

          this.champs.map(value => value.errors = this.erreurs[value.key])

        })

      }
      else
      { 
        this.saveProjet(projet).then(response => {
          if(response.status == 200 || response.status == 201){
              this.close()
          }

        })
      }

    },
  },

  watch: {
    loading: function(value) {
      //this.loading = value
    },

    errors: function(errors) {
      this.champs.forEach((value) => {value.errors = errors[value.key]})
    }

  },
  
  created() {
    console.log("Fetching projets ...")
    this.programmeId = this.currentUser.programme.id
    if(this.programmeId){
      this.fetchProjets(this.programmeId).then((value) => {
          setTimeout(() => {
            console.log("Fetching list of bailleurs...")
            this.fetchBailleurs(this.programmeId)
          });
      })
    }
  }
}
</script>

<style scoped>
.icon-bold{
  font-weight: 800;
}
</style>
