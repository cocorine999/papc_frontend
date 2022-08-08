<template>
  <dashboard>
    <div class="px-4">
      <nav class="mb-2 text-sm font-semibold flex justify-between items-center " aria-label="Breadcrumb">
        <div>
          <ol class="inline-flex p-0 list-none">
            <li class="flex items-center text-blue-500">
              <router-link to="" class="text-gray-600">dashboard</router-link>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
            </li>
            <li class="flex items-center ">
              <router-link to="" class="text-gray-600">Suivi</router-link>
            </li>
          </ol>
        </div>
        <div>
          <search-bar ></search-bar>
        </div>
      </nav> 
      <div v-if="showModal">
        <modal-top-right :title="title" v-on:close="close">
        <div  class="px-4">
          <div v-if="title =='Ajouter un Suivi'">
              <vform template="default" :champs="champs" :cols="cols" submitText="Enregistrer" @sendForm="sendForm" ></vform>
          </div>
          <div v-if="title =='Modifier un Suivi'">
              <vform template="default" :champs="champs" :cols="cols" submitText="Modifier" @sendForm="sendForm" ></vform>
          </div>
          
        </div>
        </modal-top-right>
      </div>
      <div v-if="showModal2">
        <vmodal  title="Exporter les données"  v-on:close="showModal = false">
          <div class="px-8" style="width:60vw !important">
            <vform template="default" isAllPairSaufDescrip="true" :champs="champsExport" :cols="cols" submitText="Exporter" @sendForm="Exporter" ></vform>
          </div>
        </vmodal>
      </div>
      <div class="flex items-center justify-between">
        <titre>Suivi financier </titre>
        <div class="flex space-x-3">
          
          <button  @click="showModal2 = true" title="exporter en excel"   class="py-2  px-4 overflow-hidden  space-x-2 items-center text-xs font-semibold text-white uppercase bg-blue-500 focus:outline-none focus:shadow-outline">
              <svg class="inline mr-2" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path d="m12 18 4-5h-3V2h-2v11H8z"></path><path d="M19 9h-4v2h4v9H5v-9h4V9H5c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-9c0-1.103-.897-2-2-2z"></path></svg>
            <span class="mx-2 text-sm font-semibold">Importez les données</span>
          </button>
          <button  @click="showModal2 = true" title="exporter en excel"   class="py-2  px-4 overflow-hidden  space-x-2 items-center text-xs font-semibold text-white uppercase bg-indigo-500 focus:outline-none focus:shadow-outline">
            <svg class="inline" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path d="M11 16h2V7h3l-4-5-4 5h3z"></path><path d="M5 22h14c1.103 0 2-.897 2-2v-9c0-1.103-.897-2-2-2h-4v2h4v9H5v-9h4V9H5c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2z"></path></svg>
            <span class="mx-2 text-sm font-semibold">Export Excel</span>
          </button>
          <button @click="addSuivi" title="ajouter " class="py-2 px-4 overflow-hidden flex space-x-2 items-center font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
            <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg></span>
            <span class="mx-2 text-xs font-semibold">ajouter</span>
          </button>
        </div>
      
      </div>
      <vtable :headers="headers" :datas="suiviFinanciers" :actions="actions" @supprimer="supprimer" @updateInputData="updateInputData"></vtable>
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
    ModalTopRight
  },
    data() {
        return {
          showModal:false,
          showModal2:false,
          title:'',
          suiviAttributs : ['consommer', 'type', 'trimestre', 'annee', 'activiteId'],
          champs:[
          {name:'Consommer', key:'consommer',type:'number',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,errors : []},
          {name:'Source', key:'type',placeholdere:'Selectionnez la source',isSelect:true,isTextArea:false,data:'',options:this.$store.state.sources, cle: 'id', value:'nom',required:true,errors : []}, 
          {name:'Année', key:'annee',type:'number',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,errors : []},
          {name:'Activité', key:'activiteId',type:'',placeholdere:'Selectionnez une activité',isSelect:true,isTextArea:false,data:'',options:this.activites, cle: 'id', value: 'nom',required:true,errors : []},
          {name:'Trimestre', key:'trimestre',type:'',placeholdere:'Selectionnez un trimestre',isSelect:true,isTextArea:false,data:'',options:this.$store.state.trimestres, cle: 'valeur', value: 'trimestre',required:true,errors : []}, 
        ],
        cols:2, 
        headers:[
          {name:'Code PTAB',cle:'codePta'},
          {name:'Activité',cle:'nom'},
          {name:'Trimestre',cle:'trimestre'},
          {name:'Consommer',cle:'consommer'},
          {name:'Année',cle:'annee'},
          {name:'Date de creation',cle:'created_at'},
        ],
        actions:[
         
          {name:'supprimer',iconne:''},
        ]
      };
    },

  computed:{

  //importation des variables du module auths
    ...mapState({
      identifiant: state => state.auths.identifiant,
      suiviFinancier: state => state.suiviFinanciers.suiviFinancier,
      loading : state => state.loading,
      errors : state => state.errors,
    }),

    ...mapGetters({
      suiviFinanciers: "suiviFinanciers/getSuiviFinanciers", suiviFinancier: "getSuiviFinancier",
      projets: "projets/getProjets",
      activites: "activites/getActivites",
      currentUser : 'auths/GET_AUTHENTICATE_USER'
    })
    
  },

    methods: {
      //Charger les fonctions de communication avec le serveur
    ...mapMutations({
      setErrors: 'SET_ERRORS_MESSAGE', // map `this.setErrors()` to `this.$store.commit('SET_ERRORS_MESSAGE')`,
      setSuiviFinancier: 'suiviFinanciers/FILL' // map `this.CREATE_INSTANCE_PROJET()` to `this.$store.commit('CREATE_INSTANCE_PROJET')`
    }),

    ...mapActions('suiviFinanciers', {
      fetchSuiviFinanciers: "FETCH_LIST_SUIVIFINANCIER",
      saveSuiviFinancier: "STORE_SUIVIFINANCIER",
      updateSuiviFinancier: "UPDATE_SUIVIFINANCIER",
      deleteSuiviFinancier: "DESTROY_SUIVIFINANCIER"
    }),

    ...mapActions('projets', { fetchProjets: 'FETCH_LIST_PROJET' }),

    ...mapActions('activites', { fetchActivites: 'FETCH_LIST_ACTIVITE_OF_PROGRAMME' }),

    async updateInputData(id, attribut, value) {
      console.log('ok')
        
          await this.updateSuiviFinancier({suivi: {[attribut] : value}, id : id}).catch((value, status) => {
            if(this.hasErrors[attribut] !== undefined)
              alert(this.hasErrors[attribut])            
          }).finally(() => {
            $('#' + "dataTable").load(location.href + '#' + id + '>*', '')
          })
    },

      sendForm() {

      console.log(this.champs)

      this.champs = this.champs.map(item => { item.errors = []; return item})

      let suivi = extractFormData(this.champs, this.suiviAttributs)

      suivi.type = suivi.type.id
      suivi.trimestre = suivi.trimestre.valeur
      suivi.activiteId = suivi.activiteId.id

      console.log(suivi)
      
      
      
      
        this.saveSuiviFinancier(suivi).then(response => {
          if(response.status == 200 || response.status == 201){
              this.close()
          }

        })
      

    },

    async supprimer(suivi) {
      if(window.confirm("Voulez-vous supprimer ce suivi " ))
        await this.deleteSuiviFinancier(suivi.id)
    },
      close() {
        this.showModal = false
      },
      addSuivi() {
        this.title ="Ajouter un Suivi"

        this.activites = this.activites.map((value) =>{
          value.nom = `${value.codePta} – ${value.nom}`
          return value
        })

        let formData = this.champs.map((value) => {
          if(value.key === 'activiteId'){ 
            value['options'] = this.activites
          }

          else if(value.key === 'trimestre'){
            value['options'] = this.$store.state.trimestres;
          }
          
          else if(value.key === 'type'){
            value['options'] = this.$store.state.sources;
          }

          return value
        })

      this.champs = formData

        this.showModal = true
      },
      modifier(data) {
        this.title ="Modifier un Suivi"
        this.showModal = true
        alert(data +" à ete modifier")
      },
    },

    mounted() {
      console.log("Fetching suivi financier ...")
        this.fetchSuiviFinanciers(this.currentUser?.programme?.id).then((value) => {
        setTimeout(() => {
          console.log("Fetching list of activite")
          this.fetchActivites(this.currentUser?.programme?.id)
        }, 500);
    })
  }

  }
</script>

<style scoped>

</style>