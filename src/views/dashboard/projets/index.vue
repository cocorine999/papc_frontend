<template>
  <dashboard>
    <div class="w-full p-4">
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
                <div class="uppercase text-sm flex items-center space-x-3 bg-white text-primary px-4 py-3 font-bold">
                  <span @click.stop="modifierProjet(projet)" title="modifier un projet" class="text-blue-500 cursor-pointer"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></span>
                  <span @click.stop="supprimerProjet(projet)" title="supprimer un projet"  class="text-red-500 cursor-pointer"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M292.7 840h438.6l24.2-512h-487z"></path><path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-504-72h304v72H360v-72zm371.3 656H292.7l-24.2-512h487l-24.2 512z"></path></svg></span>
                </div>
              </div>
            </div>
            <div class="relative mb-2">
              <img class=" max-h-52 w-full object-cover transition-transform duration-300 transform group-hover:scale-100"
                :src=" projet.link "
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
  },
  data() {
    return {
      showModal:false,
      line:false,
      submitText:"Enregistrer",
      cols:1,
      mosaique:true,
      programmeId: this.currentUser?.programme?.id,
      title: '',
      projetAttributs : ['nom', 'description', 'debut', 'fin', 'objectifGlobaux', 'budgetNational', 'pret', 'couleur', 'ville', 'statut', 'poids', 'bailleurId'],
      champs:[
        {name: 'Nom du projet', key: "nom", type: 'text', placeholdere: "Nom du projet", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Poids', type: 'number', key: "poids", placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
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
     
      option:[
        {name:'supprimer'},
        {name:'modifier'},
        {name:'dupliquer'},
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
    //Charger les fonctions de communication avec le serveur
    ...mapMutations({
      setErrors: 'SET_ERRORS_MESSAGE', // map `this.setErrors()` to `this.$store.commit('SET_ERRORS_MESSAGE')`,
      setProjet: 'projets/FILL' // map `this.CREATE_INSTANCE_PROJET()` to `this.$store.commit('CREATE_INSTANCE_PROJET')`
    }),

    ...mapActions('projets', {
      fetchProjets: "FETCH_LIST_PROJET_OF_PROGRAMME",
      saveProjet: "STORE_PROJET",
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
