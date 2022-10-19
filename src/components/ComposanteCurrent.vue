<template>
  <div class="w-full p-4">
      <div v-if="showModal">
        <modal-top-right :title="title" v-on:close="close">
            <div class="p-4 overflow-auto">
              <vform template="default"  :champs="champs" :cols="cols" :submitText="submitText" :sendRequest="sendRequest" @sendForm="sendForm" @closeModal="close"></vform>
            </div>
        </modal-top-right>
      </div>
      
      <nav class="mb-2 text-sm font-semibold flex justify-between items-center flex-wrap" aria-label="Breadcrumb">
        <div class="mb-2">
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

    
    <div class="flex items-center justify-between my-2" >
      <div class="flex space-x-4">
        <span :class="{'border-primary border-b-8 font-bold':seeComposant}" @click="gotoComposante()" class="inline-block cursor-pointer text-xs sm:text-sm  md:text-base uppercase border-primary py-2">les composantes </span>
      </div>
      
      <button  v-if="seeComposant && composanteAdd " @click="addComponent" title="ajouter un projet"   class="px-4 py-2 flex overflow-hidden items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
        <span> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg></span>
        <span class="mx-1 md:mx-2 text-xs font-semibold">ajouter</span>
      </button>
     
    </div>
    
    <div v-if="seeComposant">
      <div class="p-4 my-4 rounded-sm shadow-md bg-gray-50">
        <div class="flex items-center justify-between ">
        <!--Filtre sur projet -->
        <div class="w-2/4  flex justify-between  items-center space-x-2 mb-2">
          <multiselect v-model="valueFiltre" :options="projets" :custom-label="customLabel" :preselect-first="true" placeholder="selectionnez un projet" label="nom" track-by="id"></multiselect>
         
        </div>
      <!--Filtre sur projet -->
          <nav class="flex  text-xs  md:text-sm align-middle justify-between ">
          <span  @click="toggle2" :class="{'border-yellow-600 text-yellow-600' : pending}" class="inline-block px-4 py-2 font-semibold text-gray-700 uppercase border-b-8 border-transparent cursor-pointer  text-xs">
            attentes 
              <span class="px-2 text-base text-yellow-600 border border-yellow-600 rounded-full undefined ">
              {{enAttente.length}}
              </span>
            </span>
            <span  @click="toggle3" :class="{'border-indigo-600 text-indigo-600' : inProgress}" class="inline-block px-4 py-2 font-semibold text-gray-700 uppercase border-b-8 border-transparent cursor-pointer  text-xs">
              En cours
              <span class="px-2 text-base text-indigo-600 border border-indigo-600 rounded-full undefined">
              {{enCours.length}}
              </span>
            </span>
            <span  @click="toggle" :class="{'border-green-600 text-green-600' : success}" class="inline-block px-4 py-2 font-semibold text-gray-700 uppercase border-b-8 border-transparent cursor-pointer  text-xs">
              terminer 
              <span class="px-2 text-base text-green-600 border border-green-600 rounded-full undefined">
              {{terminer.length}}
              </span>
            </span>
           
          </nav>
        </div>
      </div>
     
      <div v-if="pending" >
        <empty v-if="enAttente.length ==0">Ce composant est vide !!!</empty>
        <div v-else class="grid grid-cols-1 my-4 lg:grid-cols-3 md:grid-cols-2 sm:gap-5">
          <div v-for="(composante, index) in enAttente" :key="index">
            <card-composante
              :isComposante = "true"
              :data = "composante"
              :libelle="composante.nom"
              :code="composante.code"
              :statut="getStatus(composante.statut)"
              :montantEPM="composante.pret"
              :position="composante.position"
              :poids="composante.poids"
              :bailleur="composante.sigle"
              @modifier="modifier(composante)"
              @supprimer="supprimer(composante)"
              @suivre="suivreMyComposant(composante)"
              @gotoNext="gotoNext(composante,index)"
              :isDelete = "composanteDelete"
              :isUpdate="composanteUpdate"
            ></card-composante>
          </div>
        </div>
       
      </div>
      <div v-if="inProgress" >
        <empty v-if="enCours.length === 0">Ce composant est vide !!!</empty>
        <div v-else class="grid grid-cols-1 my-4 lg:grid-cols-3 md:grid-cols-2 sm:gap-5">
          <div v-for="(composante, index) in enCours" :key="index">
            <card-composante
              :isComposante = "true"
              :data = "composante"
              :libelle="composante.nom"
              :code="composante.code"
              :statut="getStatus(composante.statut)"
              :montantEPM="composante.pret"
              :position="composante.position"
              :poids="composante.poids"
              :bailleur="composante.sigle"
              @modifier="modifier(composante)"
              @supprimer="supprimer(composante)"
              @suivre="suivreMyComposant(composante)"
              @gotoNext="gotoNext(composante,index)"
              :isDelete = "composanteDelete"
              :isUpdate="composanteUpdate"
            ></card-composante>
          </div>
        </div>
      </div>
      <div v-if="success" >
        <empty v-if="terminer.length === 0">Ce composant est vide !!!</empty>
        <div v-else class="grid grid-cols-1 my-4 lg:grid-cols-3 md:grid-cols-2 sm:gap-5">
          <div v-for="(composante, index) in terminer" :key="index">
            <card-composante
              :isComposante = "true"
              :data = "composante"
              :libelle="composante.nom"
              :code="composante.code"
              :statut="getStatus(composante.statut)"
              :montantEPM="composante.pret"
              :position="composante.position"
              :poids="composante.poids"
              :bailleur="composante.sigle"
              @modifier="modifier(composante)"
              @supprimer="supprimer(composante)"
              @suivre="suivreMyComposant(composante)"
              @gotoNext="gotoNext(composante,index)"
              :isDelete = "composanteDelete"
              :isUpdate="composanteUpdate"
            ></card-composante>
          </div>
        </div>
       
       
      </div>
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
import Dropdown from '@/components/Dropdown.vue'
import Empty from '@/components/Empty.vue'
import CardComposante from '@/components/CardComposante.vue'
import { mapGetters, mapActions, mapMutations, mapState} from "vuex";
import  { extractFormData, getStringValueOfStatutCode }  from '@/utils/index'
import Projet from '@/store/modules/projets/projet'
import ComposanteService from "@/services/modules/composante.service.js";

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
    Empty,
    Vtable
},
props:['valueProfondeur'],
  data() {
    return {
      valueFiltre: this.valueProfondeur,
      pending:false,
      success:true,
      inProgress:false,
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
      seeComposant:true,
      seeSuivi:false,
      showInput:true,
      seeStatistique:false,
      composanteAttributs : ['nom', 'description', 'budgetNational', 'pret', 'tepPrevu', 'poids'],
      
      champs:[
        {name: 'Nom de la composante', key: "nom", type: 'text', placeholdere: "Nom du projet", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
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
      position:0,
      isClick:false,
      idProjet:''
    }
    
  },
  
  computed:{

    //importation des variables du module auths
    ...mapState({
      composante: state => state.composantes.composante,
      loading : state => state.loading,
      errors : state => state.errors
    }),

    terminer() {
      if(this.composantes != undefined) {
        const datas = []
        this.composantes.forEach(element => {
          if(element.statut == 2) {
            datas.push(element)
          }
        })
        return datas
      }
    },
    enAttente() {
      if(this.composantes != undefined) {
        const datas = []
        this.composantes.forEach(element => {
          if(element.statut == -1 || element.statut == -2 ) {
            datas.push(element)
          }
        })
        return datas
      }
    },
    enCours() {
      if(this.composantes != undefined) {
        const datas = []
        this.composantes.forEach(element => {
          if(element.statut == 2) {
            datas.push(element)
          }
        })
        return datas
      }
    },

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

    suivreMyComposant(composante) {
      this.$router.push({name:'dashboard_projets_composantes_globale_suivis',params:{id:composante.id}})
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

    ...mapActions('composantes', {
      fetchComposantes: "FETCH_LIST_COMPOSANTE_OF_PROJET",
      saveComposante: "STORE_COMPOSANTE",
      updateComposante: "UPDATE_COMPOSANTE",
      deleteComposante: "DESTROY_COMPOSANTE"
    }),

    ...mapActions({
      fetchProjets: "projets/FETCH_LIST_PROJET_OF_PROGRAMME",
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

    gotoNext(composante,index) {
      let indexP = 0
      let codeP = ''
      let nomP =''
      for (let index = 0; index < this.projets.length; index++) {
        const element = this.projets[index];
        if(element.id == composante.projetId ) {
          indexP = index
          codeP = element.codePta
          nomP = element.nom
        }
        
      }
      let codeC = composante.codePta
      let nomC = composante.nom

      const profondeurComposante = {
        isClick:true,
        positionP:indexP,
        idP:composante.projetId,
        positionC:index,
        idC:composante.id,
        projet:{codePta:codeP,nom:nomP},
        composante:{codePta:codeC,nom:nomC}
      }
     
      localStorage.setItem('profondeurComposante',JSON.stringify(profondeurComposante));
      this.$router.push({name:'dashboard_projets_sous_composantes_globale'})
    },

    editerSuivi(index) {
      this.showInput = false
    },

    toggle() {
      this.pending = false
      this.inProgress = false
      this.success = true

    },

    toggle2() {
      this.success = false
      this.inProgress = false
      this.pending = true
    },

    toggle3() {
      this.pending = false
      this.success = false
      this.inProgress = true
    },
    
    addComponent() {
      this.title ="Ajouter"

      this.submitText="Enregistrer",

      this.showCloseModal(true)
    },

    modifier(composante) {

      this.title = 'Modifier un composante'

      this.setComposante(composante)

      this.composanteAttributs.forEach((item) => {

        this.champs.find((value, index) => {

          if(value.key === item){
            this.champs[index]['data'] = composante[item]
          }

        });

      });

      this.submitText = "Modifier",

      this.showCloseModal(true)
    },

    supprimer(composante) {
      if(window.confirm("Voulez-vous supprimer la composante " + composante.nom)){
        if(this.sendRequest === false){

          this.sendRequest = true;

          this.deleteComposante(composante.id)
            .then((value) => {           
              this.fetchComposantes(this.valueFiltre.id);
            })
            .finally((error) => {      
              this.sendRequest = false;        
            });
        }
      }
    },

    dupliquer(composante) {

      this.title = "Ajouter un nouveau  composant";

      this.submitText = "Enrégistrer";

      this.composanteAttributs.forEach((item) => {

        this.champs.find((value, index) => {
            this.champs[index]['data'] = composante[item]

        });

      });
      
      this.showCloseModal(true);
      
    },

    resetForm(){

      this.champs = this.champs.map(item => { item['data'] = ''; item['errors'] = []; return item})
      
      window.document.getElementById('vform').reset()

      this.setComposante({})
    },
    

    getStatus(status){
      return getStringValueOfStatutCode(status);
    },

   
    
    sendForm() {

      if( this.sendRequest === false ){

        this.sendRequest = true;

        this.champs = this.champs.map(item => { item.errors = []; return item})

        let composante = extractFormData(this.champs, this.composanteAttributs)

        composante.projetId = this.valueFiltre.id;
                
        if(this.composante?.id)
        {

          this.updateComposante({composante: composante, id : this.composante?.id})
          
            .then(response => {
              
              if(response.status === 200 || response.status === 201){
                this.fetchComposantes(this.valueFiltre.id);
                this.close()
              }

            })
            .finally((error) => {              
              this.sendRequest = false;
            });

        }
        else
        {
          
          this.saveComposante(composante)
            .then(response => {
              if(response.status === 200 || response.status === 201){
                this.fetchComposantes(this.valueFiltre.id);
                this.close()
              }

            })
            .finally((error) => {              
              this.sendRequest = false;
            });
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
    },

    valueFiltre: function(valeur,old){
      if( valeur instanceof Projet || valeur instanceof Object )
      {
        let demo = valeur
        console.log('demo valueur',demo)
        console.log('valeur old',old)
        console.log('valeur premier',valeur)
       

        /*  */
      
         if(this.isClick ==false) { 
           this.fetchComposantes(valeur.id);
         }
         else {
            this.fetchComposantes(this.idProjet); 
            this.isClick = false
            localStorage.removeItem('profondeurProjet');
         }
       
      }
      else if( valeur !== null && typeof valeur !== 'undefined' && valeur.length !== 0 ){
         console.log('valeur second',valeur)
        this.fetchComposantes(valeur);
      }
    },
    
    projets: function(projets){
    
      if(this.isClick ==false) {
        this.valueFiltre = projets[0]
      }else {
        this.valueFiltre = projets[this.position]
      }
   
    }
 
  },

  created(){
   const profondeurProjet = JSON.parse(localStorage.getItem('profondeurProjet'))
    console.log("profondeur",profondeurProjet)
    if(profondeurProjet != undefined || profondeurProjet != null) {
      this.isClick = profondeurProjet.isClick
      if(this.isClick) {
        this.idProjet = profondeurProjet.id
        this.position = profondeurProjet.position
       
      }else {
       this.position = 0
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