<template>
  <dashboard>
    <div class="w-full p-4">
       <vmodal v-if="showProlonger" title="prolonger la date d'echeance " @close="showProlonger = false">
        <div style="width:60vw" class="p-4">
          <form @submit.prevent="saveProlongerDate()" action="">
            <div class="form-group my-2">
                <label class="text-xs font-semibold block text-gray-500 uppercase md:text-sm text-light">Date prolongation <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
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
              <vform template="default" v-if="!isUpdate" :sendRequest="sendRequest" @getFile="getFile" @getImage="getImage" :champs="champs" :cols="cols" :submitText="submitText" @sendForm="sendForm" @closeModal="close" ></vform>
              <vform template="default" v-if="isUpdate" :sendRequest="sendRequest" :champs="champsUpdate" :cols="cols" :submitText="submitText" @sendForm="sendForm" @closeModal="close" ></vform>
            </div>
        </modal-top-right>
      </div>
      <nav class="mb-2 mt-2 text-xs md:text-sm font-semibold flex justify-between items-center flex-wrap"  aria-label="Breadcrumb">
        <div class="mb-2">
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
        </div>
        <div>
          <div class="w-full flex text-gray-600">
              <input @input="$emit('search',$event.target.value)" :class="{ block: showSearch }"   class="h-10 w-full px-5 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none relative -mr-9 block sm:block" v-model="search" type="text" name="search" placeholder="Rechercher" >
              <button type="submit" @click="showSearch = !showSearch" :class="{ 'border-2': showSearch }"    class="relative  p-2 rounded-lg">
              <svg class="w-4 h-4 text-gray-600 fill-current" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
                    viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve"
                    width="512px" height="512px">
                 <path
                    d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
             </button>
           </div>
        </div>
      </nav> 
      
      <div class="flex items-center justify-between my-2" >
        <div class="">
          <span  class="inline-block cursor-pointer  border-b-8 font-bold text-xs md:text-sm uppercase    border-primary py-2">Les projets </span>
        </div>

        <button v-if="projetAdd" @click="addProjet"  title="ajouter un projet"    class="px-4 py-2 flex overflow-hidden items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
          <span> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg></span>
          <span class="mx-1 md:mx-2 text-xs font-semibold">ajouter</span>
        </button>
      </div>
    
      <div  class="grid grid-cols-1 my-4 lg:grid-cols-3 md:grid-cols-2 sm:gap-5">
        <div v-for="(projet, index) in filteredProjet()" :key="index">
        
          <div @click.stop="gotoDetails(projet)" class="bg-white p-0 mb-6 transition duration-300 group transform hover:-translate-y-1 hover:shadow-lg cursor-pointer  shadow-md border-bottom border-indigo-500">
            <!-- <a href="#1" class="absolute opacity-0 top-0 right-0 left-0 bottom-0"></a> -->
            <div class="flex justify-center items-top p-4 bg-gray-600 bg-opacity-100 z-10 absolute top-0 left-0 w-full h-full text-white opacity-0 transition-all duration-300 transform group-hover:scale-105 text-lg group-hover:opacity-100">
              <p class="max-h-48 line-clamp-7 px-2"> {{ projet.description }} </p>
              <div  class="absolute bottom-5 ">
                <div v-if="dashboardProjetVisible" class="uppercase text-sm flex items-center rounded-2xl shadow space-x-3 bg-white text-primary px-4 py-3 font-bold">
                  details
                </div>
              </div>
              <div v-if="projet.statut == -2 "  class="absolute top-2 left-2 ">
                <button v-if="validation" @click.stop="validerProjet(projet.id)" class="px-2 py-3  font-semibold text-sm uppercase bg-green-500 text-white  rounded-md shadow ">valider</button>
              </div>
              <div v-else  class="absolute top-2 left-2 ">
                <div v-if="projetDelete && projetUpdate" class="uppercase text-sm flex bg-white text-primary p-1 font-bold">
                  <dropdown @supprimer="supprimerProjet(projet)" @gotoNext="gotoNext(projet,index)" @modifier="modifierProjet(projet)"  @prolonger="prolonger(projet)" :option="option"></dropdown>
                </div>
                <div v-if="projetUpdate && projetDelete ==false " class="uppercase text-sm flex bg-white text-primary p-1 font-bold">
                  <dropdown  @modifier="modifierProjet(projet)" @gotoNext="gotoNext(projet,index)"  @prolonger="prolonger(projet)" :option="optionUpdate"></dropdown>
                </div>
                <div v-if="projetDelete && projetUpdate==false" class="uppercase text-sm flex bg-white text-primary p-1 font-bold">
                  <dropdown @supprimer="supprimerProjet(projet)" @gotoNext="gotoNext(projet,index)"  @prolonger="prolonger(projet)" :option="optionD"></dropdown>
                </div>
              </div>
            </div>
            <div class="relative mb-2">
              <img v-if="projet.image != null || projet.image != undefined" 
                class=" max-h-52 w-full object-cover transition-transform duration-300 transform group-hover:scale-100"
                :src="`${base_url}${projet.image.url}`">
              <img v-else class=" max-h-52 w-full object-cover transition-transform duration-300 transform group-hover:scale-100"
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
import {API_BASE_URL} from "@/services/configs/environment.js";
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
      base_url:API_BASE_URL,
      showModal:false,
      showSearch:false,
      line:false,
      dates: {fin:''},
      isUpdate:false,
      submitText:"Enregistrer",
      cols:1,
      mosaique:true,
      programmeId: this.currentUser?.programme?.id,
      showProlonger:false,
      chargement: false,
      projetId:'',
      title: '',
      search:"",
      projetAttributs : ['nom', 'description', 'debut', 'fin', 'objectifGlobaux', 'budgetNational', 'pret', 'couleur', 'ville', 'bailleurId'],
      champs:[
        {name: 'Nom du projet', key: "nom", type: 'text', placeholdere: "Nom du projet", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Pret', type: 'number', key: "pret", placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Budget Nationnal', key: "budgetNational", type: 'number', placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Date debut', key: "debut", type: 'date', placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true,},
        {name: 'Date fin', type: 'date', key: "fin", placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Couleur', type: 'color', key: "couleur", placeholdere: 'Choississez une couleur', isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'couverture du projet', type: 'file', placeholdere: 'Choississez une couverture',isImage:true, isSelect: false, isTextArea: false, data:'', required: false, errors : []},
        {name: 'Piece jointe', type: 'file', placeholdere: 'televerser des fichiers', isSelect: false,isImage:false, isTextArea: false, data:'', required: false, errors : []},
        {name: 'Ville', key: "ville", type: '', placeholdere: 'Selectionnez une ville', isSelect: true, isTextArea: false, data:'', required: true, options: ['cotonou', 'calavi', 'bohicon'], isSimpleTable: true, errors : []},
        {name: 'Bailleur', key: "bailleurId", type: '', placeholdere: 'Selectionnez un bailleur', isSelect: true, isTextArea: false, data:'', required: true, options: this.bailleurs, cle: 'id', value: 'sigle',  errors : []},
        {name: 'Objectifs globaux', key: "objectifGlobaux", type: '', placeholdere: '', isSelect: false, isTextArea:true, data:'', required: false, errors : []},
        {name: 'Objectif specifique', key: "objectifSpecifique", type: 'text', placeholdere: 'Definir les objectifs', isSelect: false, isTextArea: false, data:'', required: false, errors : []},
        {name: 'Description', type: '', key: "description", placeholdere: 'Description du projet', isSelect: false, isTextArea: true, data:'', required: false, errors : []},
      ],
      champsUpdate:[
        {name: 'Nom du projet', key: "nom", type: 'text', placeholdere: "Nom du projet", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Pret', type: 'number', key: "pret", placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Budget Nationnal', key: "budgetNational", type: 'number', placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Date debut', key: "debut", type: 'date', placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true,},
        {name: 'Date fin', type: 'date', key: "fin", placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Couleur', type: 'color', key: "couleur", placeholdere: 'Choississez une couleur', isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Ville', key: "ville", type: '', placeholdere: 'Selectionnez une ville', isSelect: true, isTextArea: false, data:'', required: true, options: ['cotonou', 'calavi', 'bohicon'], isSimpleTable: true, errors : []},
        {name: 'Bailleur', key: "bailleurId", type: '', placeholdere: 'Selectionnez un bailleur', isSelect: true, isTextArea: false, data:'', required: true, options: this.bailleurs, cle: 'id', value: 'sigle',  errors : []},
        {name: 'Objectifs globaux', key: "objectifGlobaux", type: '', placeholdere: '', isSelect: false, isTextArea:true, data:'', required: false, errors : []},
        {name: 'Objectif specifique', key: "objectifSpecifique", type: 'text', placeholdere: 'Definir les objectifs', isSelect: false, isTextArea: false, data:'', required: false, errors : []},
        {name: 'Description', type: '', key: "description", placeholdere: 'Description du projet', isSelect: false, isTextArea: true, data:'', required: false, errors : []},
      ],
      option: [
        { name: "supprimer" },
        { name: "modifier" },
        { name: "prolonger" },
        { name: "continuer" },
      ],
      optionUpdate: [
        { name: "modifier" },
        { name: "continuer" },
      ],
      optionD: [
        { name: "supprimer" },
        { name: "continuer" },
      ],
      projetId:'',
      projetVisible:false,
      projetAdd:false,
      projetDelete:false,
      projetUpdate:false,
      dashboardProjetVisible:false,
      bailleurVisible:false,
      validation:false,
      sendRequest: false,
      fichiers:[],
      image:{}
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
    }),
    
  },

  methods: {
    getFile(data) {
      this.champs[7].data = data
     for (const property in data) {
        this.fichiers.push(data[property])
      }
      this.fichiers.pop()
      this.fichiers.pop() 
     console.log('les fichiers dddd',this.fichiers)
     
    },
     getImage(data) {
      this.champs[6].data = data
      this.image = data
      console.log('image',this.image)
    },
    getPermission() {
      this.currentUser.role[0].permissions.forEach(element => {
        if(element.slug ==='voir-un-projet') {
            this.projetVisible = true
          }
          if(element.slug === 'creer-un-projet') {
            this.projetAdd = true
          }
            if(element.slug === 'modifier-un-projet') {
              this.projetUpdate = true
            }
            if(element.slug ==='supprimer-un-projet') {
              this.projetDelete = true
            }
            if(element.slug ==='voir-details-projet') {
              this.dashboardProjetVisible = true
            }
            if(element.slug ==='voir-un-bailleur') {
              this.bailleurVisible = true
            }
            if(element.slug === 'validation' ) {
              this.validation = true
            }
           
        });
    },
    prolonger(projet) {
      this.projetId = projet.id
      this.showProlonger = true
    },
    gotoNext(projet,index) {
      const profondeurProjet = {
       isClick:true,
       position:index,
       id:projet.id
      }
     
      localStorage.setItem('profondeurProjet',JSON.stringify(profondeurProjet));
      this.$router.push({name:'dashboard_projets_composantes_globale'})
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
     if(this.dashboardProjetVisible) {
        this.$router.push({name:'projets_id_details',params:{id:projet.id, projet: projet}})
     }
    
     
    },

    addDate() {
      this.dates.push({})
    },
    
    close() {
      this.showCloseModal()
      this.sendRequest = false;
      this.resetForm
    }, 
    
    showCloseModal(value = false) {
      this.showModal = value
    },

    filteredProjet(){
        var self = this;
        return this.projets.filter(function (projet){
          return projet.bailleur.sigle.toLowerCase().indexOf(self.search.toLowerCase()) >= 0 || 
            projet.nom.toLowerCase().indexOf(self.search.toLowerCase()) >= 0 ||
            projet.codePta.toLowerCase().indexOf(self.search.toLowerCase()) >= 0;
        });
    },

    addProjet() {
      this.title='Ajouter'
      this.isUpdate = false
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
        this.isUpdate = true
        this.title = 'Modifier un projet'

        this.submitText = "Modifier"
          
        this.projetId = projet.id

        this.projetAttributs.forEach((item) => {

          this.champsUpdate.find((value, index) => {

            if(value.key !== 'bailleurId' && value.key !== 'statut'){ 
              if(value.key === item){
                this.champsUpdate[index]['data'] = projet[item]
              }
            }

          })

        })

        this.showCloseModal(true)
      
    },

    async supprimerProjet(projet) {
      if(window.confirm("Voulez-vous supprimer ce projet " + projet.nom)) await this.deleteProjet(projet.id)
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

    dupliquer() {
      this.title ="Dupliquer projet existant"
      this.showModal = true
    },

    
    resetForm(){

      this.champs = this.champs.map(item => { item.data = ''; return item})
      
      window.document.getElementById('vform').reset()

      this.setProjet({})
    },


    sendForm() {
      if( this.sendRequest === false ){
        this.sendRequest = true;

        this.champs = this.champs.map(item => { item.errors = []; return item})
        this.champsUpdate = this.champsUpdate.map(item => { item.errors = []; return item})
        let projet = {}
        if(this.isUpdate) {
          projet = extractFormData(this.champsUpdate, this.projetAttributs)
        }else {
          projet = extractFormData(this.champs, this.projetAttributs)
        }

        projet.programmeId = this.programmeId

        projet.bailleurId = projet.bailleurId.id
        projet.id = this.projetId
        
        if(projet?.id)
        {
         projet.statut = -1
          this.updateProjet({projet: projet, id : projet?.id}).then(response => {
            
            if(response.status == 200 || response.status == 201){
              this.sendRequest = false;
              this.close()
            }

          }).catch((error) => {

            this.setErrors({message: error?.response?.data?.message, errors: error.response.data.errors})
            this.sendRequest = false;
            this.champs.map(value => value.errors = this.erreurs[value.key])

          })
        }
        else
        { 
          this.sendRequest = true;
          projet.statut = -2
          const demo = {
            "nom": projet.nom,
            "description": projet.description,
            "debut": projet.debut,
            "fin": projet.fin,
            "objectifGlobaux": projet.objectifGlobaux,
            "budgetNational": projet.budgetNational,
            "pret": projet.pret,
            "couleur": projet.couleur,
            "ville": projet.ville,
            "statut": -1,
            "bailleurId": projet.bailleurId,
            "programmeId": projet.programmeId,
            "id": ""
          }
      
          const formData = new FormData();
          formData.append('nom',demo.nom)
          formData.append('description',demo.description)
          formData.append('debut',demo.debut)
          formData.append('fin',demo.fin)
          formData.append('objectifGlobaux',demo.objectifGlobaux)
          formData.append('budgetNational',demo.budgetNational)
          formData.append('pret',demo.pret)
          formData.append('couleur',demo.couleur)
          formData.append('budgetNational',Number(demo.budgetNational))
          formData.append('pret',demo.pret)
          formData.append('couleur',demo.couleur)
          formData.append('ville',demo.ville)
          formData.append('statut',demo.statut)
          formData.append('image',this.image)
          for( let i = 0; i < this.fichiers.length; i++ ){
            let file = this.fichiers[i];
            console.log(file);
            formData.append('fichier'+ i , file);
          }
        
          formData.append('bailleurId',demo.bailleurId)
          formData.append('programmeId',demo.programmeId) 
          
          this.saveProjet(formData).then(response => {
            if(response.status == 200 || response.status == 201){
              this.close()
              this.sendRequest = false;
            }
          }).catch((error) => {

           
            this.sendRequest = false;
           

          }) 
        
        }
        }
     

      },

    validerProjet(id) {
      let projet = {}
      projet.statut =-1
      this.updateProjet({projet: projet, id : id}).then(response => {
   
        if(response.status == 200 || response.status == 201){
         this.$toast.success("projet valider")
        }

        }).catch((error) => {
          if (error.response) {
            // Requête effectuée mais le serveur a répondu par une erreur.
            const message = error.response.data.message
            this.$toast.error(message)
          } else if (error.request) {
             // Demande effectuée mais aucune réponse n'est reçue du serveur.
            //console.log(error.request);
          } else {
            // Une erreur s'est produite lors de la configuration de la demande
            //console.log('dernier message', error.message);
          }

        })
     

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
    this.getPermission()
     if(!this.projetVisible) {
        this.$router.push('/401-non-autorise')
      } 
    this.programmeId = this.currentUser.programme.id
    if(this.programmeId){
      this.fetchProjets(this.programmeId).then((value) => {
        setTimeout(() => {
          console.log("Fetching list of bailleurs...")
          if(this.bailleurVisible) {
            this.fetchBailleurs(this.programmeId)
          }  
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
