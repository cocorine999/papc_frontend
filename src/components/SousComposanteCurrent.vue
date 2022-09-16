<template>
    <div class="w-full p-4">

      <div v-if="showModal">
        <modal-top-right :title="title" v-on:close="close">
            <div class="p-4 overflow-auto">
              <vform template="default"  :champs="champs" :cols="cols" :submitText="submitText" :sendRequest="sendRequest" @sendForm="sendForm" @closeModal="close"></vform>
            </div>
        </modal-top-right>
      </div>
      
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
              <router-link to="/dashboard/projets/sous-composantes-globale" class="">sous composantes</router-link>
            </li>
          </ol>
        </div>
        <div>
          <search-bar ></search-bar>
        </div>
      </nav> 

    
    <div class="flex items-center justify-between my-2">
      <div class="flex space-x-4">
        <span :class="{'border-primary border-b-8 font-bold':seeSousComposantes}" @click="gotoSousComposante()" class="inline-block cursor-pointer  text-lg uppercase    border-primary py-2">Sous composantes </span>
        <span :class="{'border-primary border-b-8 font-bold':seeSuivi}" @click="gotoSuivi()" class="inline-block cursor-pointer text-lg uppercase  py-2">Le suivi evaluation </span>
      </div>
      
      <button v-if="seeSousComposantes && composanteAdd" @click="addSousComposante" title="ajouter un projet"   class="px-4 py-2 flex overflow-hidden items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
          <span> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg></span>
          <span class="mx-2 text-xs font-semibold">ajouter un sous composant</span>
      </button>
     
    </div>
    
    <div v-if="seeSousComposantes">
      <div class="p-4 my-4 rounded-sm shadow-md bg-gray-50">
        <div class="flex items-center justify-between ">
        <!--Filtre sur projet -->
        <div class="w-2/5 flex items-center space-x-2">
      
          <multiselect v-model="projetFiltre" :options="projets" :custom-label="customLabel" @input="changeProjet(projetFiltre)" :preselect-first="true" placeholder="selectionnez un projet" label="nom" track-by="id"></multiselect>

          <multiselect v-model="valueFiltre" :options="composantes" :custom-label="customLabel" @input="changeComposante(valueFiltre)" :preselect-first="true" placeholder="selectionnez une composante" label="nom" track-by="id"></multiselect>
          
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
        <div v-for="(sousComposante, index) in sousComposantes" :key="index">
          <card-composante
            :libelle="sousComposante.nom"
            :code="sousComposante.code"
            composanteName="Sous Composante"
            :statut="getStatus(sousComposante.statut)"
            :montantEPM="sousComposante.pret"
            :position="sousComposante.position"
            :poids="sousComposante.poids"
            :bailleur="sousComposante.sigle"
            @modifier="modifier(sousComposante)"
            @dupliquer="dupliquer(sousComposante)"
            @supprimer="supprimer(sousComposante)"
            @validation="validation(sousComposante)"
            @suivre="suivreMyComposant(sousComposante)"
            @gotoNext="gotoNext(sousComposante)"
            :isDelete = "composanteDelete"
            :isUpdate="composanteUpdate"
          ></card-composante>
        </div>

      </div>
    </div>


    
    <div v-if="seeSuivi">
      <vtable id="datatable"
        :headers="headers"
        :datas="dataTable"
        :sendRequest="sendRequest"
        :actions="actions"
        @supprimer="supprimer">
      </vtable>
    </div>
    
    </div>
 
</template>

<script>
import Vtable from '@/components/Vtable'
import ModalTopRight from '@/components/ModalTopRight'
import Multiselect from 'vue-multiselect'
import SearchBar from '@/components/SearchBar'
import Titre from '@/components/Titre'
import Vmodal from '@/components/Vmodal'
import Vform from '@/components/Vform'
import Dashboard from '@/layouts/Dashboard'
import Dropdown from '@/components/Dropdown.vue'
import CardComposante from '@/components/CardComposante.vue'
import { mapGetters, mapActions, mapMutations, mapState} from "vuex";
import { extractFormData, getStringValueOfStatutCode } from '@/utils/index'
import Composante from '@/store/modules/composantes/composante'
import ComposanteService from "@/services/modules/composante.service.js";
export default {
  props:['valeurProjet','valueProfondeur'],
  components: {
    Dashboard,
    Vmodal,
    Titre,
    Vform,
    SearchBar,
    Multiselect,
    ModalTopRight,
    Dropdown,
    CardComposante,
    Vtable
},
  data() {
    return {
      valueFiltre:null,
      projetFiltre: null,
      pending:false,
      success:true,
      rejected:false,
      rangeValue:0,
      showFiltre:false,
      programmeId: this.currentUser?.programme?.id,
      cols:1,
      sendRequest: false,
      submitText:"Enregistrer",
      showModal:false,
      line:false,
      mosaique:true,
      isStateChange:false,
      seeSousComposantes:true,
      seeSuivi:false,
      showInput:true,
      seeStatistique:false,
      option:[
        {name:"supprimer"},
        {name:"modifier"},
        {name:"dupliquer"},
        {name:"continuer"},
      ],
      sousComposanteAttributs : ['nom', 'description', 'budgetNational', 'pret', 'tepPrevu', 'poids'],
      champs:[

        {name: 'Nom du projet', key: "nom", type: 'text', placeholdere: "Nom du projet", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Poids', type: 'number', key: "poids", placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Pret', type: 'number', key: "pret", placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Budget National', key: "budgetNational", type: 'number', placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Taux d\'execution physique', key: "tepPrevu", type: 'number', placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Description', type: '', key: "description", placeholdere: 'Description du projet', isSelect: false, isTextArea: true, data:'', required: false, errors : []},
        
      ],

    headers: [
        { name: "Composante", cle: "composante"},
        { name: "code pta", cle: "codePta"},
        { name: "poids initial", cle:'poidsInitial'},
        { name: "poids actuel", cle:'poidsActuel'},
        { name: "date de creation", cle:'created_at'},
      ],
      dataTable:[],
      actions: [
        { name: "supprimer", iconne: "" },
      ],
      dates:[
        {}
      ],
      suivis:[],
      composanteAdd:false,
      composanteDelete:false,
      composanteUpdate:false,
      positionP:0,
      idProjet:'',
      positionC:0,
      idComposante:'',
      newProjet:null,
      newComponent:null,
      isClick:false
     
    }
    
  },

  computed:{

    //importation des variables du module auths
    ...mapState({
      sousComposante: state => state.sousComposantes.composante,
      loading : state => state.loading,
      errors : state => state.errors
    }),

    ...mapGetters({
      projets: "projets/getProjets",
      composantes: "composantes/getComposantes",
      sousComposante: "sousComposantes/getSousComposante",
      sousComposantes: "sousComposantes/getSousComposantes",
      currentUser : 'auths/GET_AUTHENTICATE_USER'
    }),
    ...mapGetters('auths', {currentUser : 'GET_AUTHENTICATE_USER'})

  },

  methods: {
    changeProjet(projet) {
      if(this.isClick) {
        this.projetFiltre = this.newProjet
      
        this.fetchComposantes(this.idProjet);
        this.isClick = false
        localStorage.removeItem('profondeurComposante');
      }else {
        this.fetchComposantes(projet.id);
      }
     
    },
    changeComposante(composante) {
      if(this.isClick) {
         this.valueFiltre = this.newComponent
        this.fetchSousComposantes(this.idComposante);
        this.isClick = false
        localStorage.removeItem('profondeurComposante');
      }else {
        this.fetchSousComposantes(composante.id);
       
      }

     
    },
    //Charger les fonctions de communication avec le serveur
    ...mapMutations({
      setErrors: 'SET_ERRORS_MESSAGE', // map `this.setErrors()` to `this.$store.commit('SET_ERRORS_MESSAGE')`,
      setSousComposante: 'sousComposantes/FILL', // map `this.CREATE_INSTANCE_PROJET()` to `this.$store.commit('CREATE_INSTANCE_PROJET')`
      setSousComposantes: 'sousComposantes/SET_LIST_SOUS_COMPOSANTE'
    }),

    ...mapActions('sousComposantes', {
      fetchSousComposantes: "FETCH_LIST_SOUS_COMPOSANTE_OF_COMPOSANTE",
      saveSousComposante: "STORE_SOUS_COMPOSANTE",
      updateSousComposante: "UPDATE_SOUS_COMPOSANTE",
      deleteSousComposante: "DESTROY_SOUS_COMPOSANTE"
    }),

    ...mapActions({
      fetchComposantes: "composantes/FETCH_LIST_COMPOSANTE_OF_PROJET",
      fetchProjets: "projets/FETCH_LIST_PROJET_OF_PROGRAMME",
    }),

    suivreMyComposant(sousComposante) {
      this.$router.push({name:'dashboard_projets_sous_composantes_globale_suivis',params:{id:sousComposante.id}})
    },

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

    getSuivi() {
      ComposanteService.getSuivi().then((data) => {
        const datas = data.data.data
        datas.forEach(element => {
          const composante = element.composante.nom
          const codePta = element.tache.codePta
          const poidsInitial = element.tache.poids
          const poidsActuel = element.poidsActuel
          const created_at = element.created_at
          this.dataTable.push({composante:composante,codePta:codePta,poidsInitial:poidsInitial,poidsActuel:poidsActuel,created_at:created_at})
        })
        console.log("les suiivs",this.dataTable)
       
      }).catch((e) => {
        console.log(e)
      })
    },


    customLabel ({ codePta, nom }) {
      return `${codePta} – ${nom}`
    },

    getIntervale(val){
      return val - 25;
    },

    getStatus(status){
      return getStringValueOfStatutCode(status);
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

    addDate() {
      this.dates.push({})
    },

     gotoSuivi() {
      this.seeSuivi = true
      this.seeSousComposantes = false
    },

    gotoSousComposante() {
      this.seeSuivi = false
      this.seeSousComposantes = true
    },

     gotoNext(sousComposante,index) {
     
  
     
      let codeP = ''
      let nomP =''
      let codeC=''
      let nomC=''
      let codeSC=sousComposante.codePta
      let nomSC=sousComposante.nom
      for (let index = 0; index < this.projets.length; index++) {
        const element = this.projets[index];
        if(element.id == sousComposante.projetId ) {
          codeP = element.codePta
          nomP = element.nom
        }
      }
      for (let index = 0; index < this.composantes.length; index++) {
        const element = this.composantes[index];
        if(element.id == sousComposante.composanteId ) {
          codeC = element.codePta
          nomC = element.nom
        }
        
      }

      const profondeurSC = {
        isClick:true,
        idP:sousComposante.projetId,
        idC:sousComposante.composanteId,
        idSC:composante.id,
        projet:{codePta:codeP,nom:nomP},
        composante:{codePta:codeC,nom:nomC},
        sousComposante:{codePta:codeSC,nom:nomSC}
      }
     
      localStorage.setItem('profondeurSC',JSON.stringify(profondeurSC));
     
      this.$router.push({name:'dashboard_projets_activites_globale'})
    },


    

    editerSuivi(index) {
      this.showInput = false
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
    
    addSousComposante() {
      this.title ="Ajouter un nouveau composant"

      this.submitText="Enregistrer",

      this.showCloseModal(true)

    },

    dupliquer(sousComposante) {

      this.title ="Ajouter un nouveau composant"

      this.sousComposanteAttributs.forEach((item) => {

        this.champs.find((value, index) => {

          if(value.key === item){
            this.champs[index]['data'] = sousComposante[item]
          }

        });

      });

      this.submitText="Enregistrer",

      this.showCloseModal(true)
    },

    

    modifier(sousComposante) {

      this.title = 'Modifier un sous composant'

      this.setSousComposante(sousComposante)

      this.sousComposanteAttributs.forEach((item) => {

        this.champs.find((value, index) => {

          if(value.key === item){
            this.champs[index]['data'] = sousComposante[item]
          }

        });

      });

      this.submitText = "Modifier",

      this.showCloseModal(true)
    },

    supprimer(sousComposante) {
      if(window.confirm("Voulez-vous supprimer la sous composante " + sousComposante.nom)){
        if(this.sendRequest === false){

          this.sendRequest = true;

          this.deleteSousComposante(sousComposante.id).finally((response) => {
                this.sendRequest = false;
                this.fetchSousComposantes(this.valueFiltre.id);
          });
        }
      }
    },

    dupliquer(sousComposante) {

      this.title = "Ajouter un nouveau  composant";

      this.submitText = "Enrégistrer";

      this.sousComposanteAttributs.forEach((item) => {

        this.champs.find((value, index) => {

          if(value.key === item){
            this.champs[index]['data'] = sousComposante[item]
          }

        });

      });
      
      this.showCloseModal(true);
      
    },

    resetForm(){

      this.champs = this.champs.map(item => { item['data'] = ''; item['errors'] = []; return item})
      
      window.document.getElementById('vform').reset()

      this.setSousComposante({})
    },
    
   

    validation(sousComposante){

      if( this.sendRequest === false ){

        this.sendRequest = true;

        this.updateSousComposante({sousComposante: { "statut": -1, "composanteId": this.valueFiltre.id }, id : sousComposante.id})
        .then((value) => {
            this.fetchSousComposantes(this.valueFiltre.id);
        })
          .finally((error) => {
            this.sendRequest = false;
          })

      }
    },
    
    sendForm() {

      if( this.sendRequest === false ){

        this.sendRequest = true;

        this.champs = this.champs.map(item => { item.errors = []; return item})

        let sousComposante = extractFormData(this.champs, this.sousComposanteAttributs)

        sousComposante.composanteId = this.valueFiltre.id;
                
        if(this.sousComposante?.id)
        {

          this.updateSousComposante({sousComposante: sousComposante, id : this.sousComposante?.id})
            .then(response => {
              
              if(response.status === 200 || response.status === 201){
                this.fetchSousComposantes(this.valueFiltre.id);
                this.close()
              }

            })
            .finally((error) => {
              this.sendRequest = false;
            })

        }
        else
        {
          
          this.saveSousComposante(sousComposante)
          
            .then(response => {
              if(response.status === 200 || response.status === 201){
                this.fetchSousComposantes(this.valueFiltre.id);
                this.close()
              }

            })
            .finally((error) => {          
              this.sendRequest = false;    
            })
        }
      }
    },

    close() {
      this.showCloseModal()

      this.resetForm()

      this.sendRequest = false;
    }, 
    
    showCloseModal(value = false) {
      this.showModal = value
    },

  },
  watch: {
    loading: function(value) {
      //this.loading = value
    },

    errors: function(errors) {

      this.champs.forEach((value) => {
        if(errors[value.key] instanceof Array || errors[value.key] !== undefined ){
          value.errors = errors[value.key]
        }
      })
      //this.errors = errors
    },

   /*  valueFiltre: function(valeur){
      if( valeur instanceof Composante || valeur instanceof Object )
      {
        if(this.isClick ==false) { 

            this.fetchSousComposantes(valeur.id);
             
         }
         else {
          
            this.fetchSousComposantes(this.idComposante);
            //this.isClick = false
           
         }
        
      }
      else if( valeur !== null && typeof valeur !== 'undefined' && valeur.length !== 0 ){
        this.fetchSousComposantes(valeur);
      }
    },

    projetFiltre: function(valeur){
      if( valeur instanceof Composante || valeur instanceof Object )
      {
        if(this.isClick ==false) { 
            this.fetchComposantes(valeur.id);
         }
         else {
            this.fetchComposantes(this.idProjet);
           
            
           
          
         }
        
       
      }
      else if( valeur !== null ){
      
        this.fetchComposantes(valeur);
      }
    },
    
    composantes: function(composantes){
      alert(this.isClick)
       if(this.isClick ==false) { 
         
          this.valueFiltre = composantes[0]
         
       }else {
         
          this.valueFiltre = composantes[this.positionC]
        
          
       }
    
    } */
     
   
  },

  created(){

    const profondeurComposante = JSON.parse(localStorage.getItem('profondeurComposante'))
    console.log("profondeur",profondeurComposante)
    if(profondeurComposante != undefined || profondeurComposante != null) {
      this.isClick = profondeurComposante.isClick
      if(this.isClick) {
        console.log(profondeurComposante)
        this.idProjet = profondeurComposante.id
        this.positionP = profondeurComposante.positionP
        this.idComposante = profondeurComposante.idC
        this.positionC = profondeurComposante.positionC
        this.newProjet = profondeurComposante.projet
        this.newComponent = profondeurComposante.composante
       
      }else {
       this.positionP = 0
       this.positionC = 0
      }

    } 

    this.getPermission()
    if(this.programmeId){
      this.fetchProjets(this.programmeId)
    }
  }
  
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>

</style>