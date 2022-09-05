<template>
  <dashboard>
    <div v-if="suiviFinancierVisible" class="px-4">
      <nav class="mb-2 mt-4 text-sm font-semibold flex justify-between items-center " aria-label="Breadcrumb">
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
          <div class="flex justify-center w-full text-gray-600">
              <input @input="$emit('search',$event.target.value)" class="h-10  w-full px-5 pr-16 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none" v-model="search" type="text" name="search" placeholder="Rechercher" >
              <button type="submit" class="relative  right-10 ">
              <svg class="w-4 h-4 text-gray-600 fill-current" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
                    viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve"
                    width="512px" height="512px">
                 <path
                    d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
             </button>
           </div>        </div>
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
        <vmodal  title="Importez les données "  v-on:close="showModal2 = false">
          <form @submit.prevent="importData" style="width:500px" class="">
            <input class="block w-full text-sm text-gray-900 bg-gray-50  border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" @change="previewFiles"   accept=".csv"  type="file">
            <p class="my-4 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">FORMAT CSV SEULEMENT AUTORISE </p>
            <div class="flex justify-end">
              <button type="submit" class="bg-primary  flex space-x-2  items-center text-white px-4 py-2 border border-primary font-semibold uppercase">
                  <span class="text-sm font-semibold uppercase" v-if="!chargement">
                    importez
                  </span>
                  <span v-else class="flex items-center space-x-2">
                    <span class="text-xs px-4 font-semibold ">
                      chargement ...
                    </span>
                    <svg  xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-center animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </span>
              </button>
            </div>
          </form>
        </vmodal>
      </div>
      <div v-if="showModal3">
      <vmodal  title="Filtre"  v-on:close="showModal3 = false">
        <div class="px-4" style="width:500px" >
          <vform template="default" isAllPairSaufDescrip="true" :champs="champsRecherche" :cols="cols" submitText="Rechercher" @sendForm="filtre" ></vform>
        </div>
      </vmodal>
       </div>
      <div class="flex items-center justify-between">
        <titre>Suivi financier </titre>
        <div class="flex space-x-3">
          <button  @click="showModal2 = true" title="exporter en excel"   class="py-2 flex space-x-3 items-center px-4 overflow-hidden  space-x-2 items-center text-xs font-semibold text-white uppercase bg-blue-500 focus:outline-none focus:shadow-outline">
            <svg  stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path d="m12 18 4-5h-3V2h-2v11H8z"></path><path d="M19 9h-4v2h4v9H5v-9h4V9H5c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-9c0-1.103-.897-2-2-2z"></path></svg>
            <span class="mx-2 text-sm font-semibold">Importez les données</span>
          </button>
          <json-excel :data="json_data()" header="SUIVI FINANCIER" type="xlsx" :name="title_csv()"  >
          <button  title="exporter en excel"   class="py-2  px-4 overflow-hidden  space-x-2 items-center text-xs font-semibold text-white uppercase bg-indigo-500 focus:outline-none focus:shadow-outline">
            <svg class="inline" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path d="M11 16h2V7h3l-4-5-4 5h3z"></path><path d="M5 22h14c1.103 0 2-.897 2-2v-9c0-1.103-.897-2-2-2h-4v2h4v9H5v-9h4V9H5c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2z"></path></svg>
            <span class="mx-2 text-sm font-semibold">Export Excel</span>
          </button>
        </json-excel>
          <button @click="showFiltreModal" title="filtre" class="bg-primary text-white px-2 py-1"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg></button>
          <button v-if="suiviFinancierAdd" @click="addSuivi" title="ajouter " class="py-2 px-4 overflow-hidden flex space-x-2 items-center font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
            <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg></span>
            <span class="mx-2 text-xs font-semibold">ajouter</span>
          </button>
        </div>
      
      </div>
      <vtable v-if="suiviFinancierDelete && suiviFinancierUpdate" :headers="headers" :datas="filteredSuivis()" :actions="actions" @supprimer="supprimer" @updateInputData="updateInputData"></vtable>
      <vtable v-if="!suiviFinancierDelete && suiviFinancierUpdate" :headers="headers" :datas="filteredSuivis()" :actions="actions" @updateInputData="updateInputData"></vtable>
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
import SuiviFinancier from "@/services/modules/suiviFinancier.service.js";
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
          showModal3:false,
          title:'',
          file:'',
          chargement:false,
          suiviAttributs : ['consommer', 'type', 'trimestre', 'annee', 'activiteId'],
          suiviAttributsRecherche : ['trimestre', 'annee', 'activiteId'],
          champs:[
          {name:'Consommer', key:'consommer',type:'number',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,errors : []},
          {name:'Source', key:'type',placeholdere:'Selectionnez la source',isSelect:true,isTextArea:false,data:'',options:this.$store.state.sources, cle: 'id', value:'nom',required:true,errors : []}, 
          {name:'Année', key:'annee',type:'number',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,errors : []},
          {name:'Activité', key:'activiteId',type:'',placeholdere:'Selectionnez une activité',isSelect:true,isTextArea:false,data:'',options:this.activites, cle: 'id', value: 'nom',required:true,errors : []},
          {name:'Trimestre', key:'trimestre',type:'',placeholdere:'Selectionnez un trimestre',isSelect:true,isTextArea:false,data:'',options:this.$store.state.trimestres, cle: 'valeur', value: 'trimestre',required:true,errors : []}, 
        ],
        champsRecherche:[
          {name:'Année', key:'annee',type:'number',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:false,errors : []},
          {name:'Activité', key:'activiteId',type:'',placeholdere:'Selectionnez une activité',isSelect:true,isTextArea:false,data:'',options:this.activites, cle: 'id', value: 'nom',required:false,errors : []},
          {name:'Trimestre', key:'trimestre',type:'',placeholdere:'Selectionnez un trimestre',isSelect:true,isTextArea:false,data:'',options:this.$store.state.trimestres, cle: 'valeur', value: 'trimestre',required:false,errors : []}, 
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
        search:'',
        actions:[
         
          {name:'supprimer',iconne:''},
        ],
        suiviFinancierVisible:false,
        suiviFinancierUpdate:false,
        suiviFinancierDelete:false,
        suiviFinancierAdd:false,
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
    }),
    ...mapGetters('auths', {currentUser : 'GET_AUTHENTICATE_USER'})
    
  },

    methods: {
      //Charger les fonctions de communication avec le serveur
    ...mapMutations({
      setErrors: 'SET_ERRORS_MESSAGE', // map `this.setErrors()` to `this.$store.commit('SET_ERRORS_MESSAGE')`,
      setSuiviFinancier: 'suiviFinanciers/FILL' // map `this.CREATE_INSTANCE_PROJET()` to `this.$store.commit('CREATE_INSTANCE_PROJET')`
    }),

    ...mapActions('suiviFinanciers', {
      fetchSuiviFinanciers: "FETCH_LIST_SUIVIFINANCIER",
      filter: "FILTRE_SUIVIFINANCIER",
      saveSuiviFinancier: "STORE_SUIVIFINANCIER",
      updateSuiviFinancier: "UPDATE_SUIVIFINANCIER",
      deleteSuiviFinancier: "DESTROY_SUIVIFINANCIER"
    }),
    getPermission() {
          this.currentUser.role[0].permissions.forEach(element => {
            if(element.slug ==='voir-un-suivi-financier') {
              this.suiviFinancierVisible = true
            }
            if(element.slug === 'creer-un-suivi-financier') {
              this.plansuiviFinancierAdd = true
            }
            if(element.slug === 'modifier-un-suivi-financier') {
              this.decaissementUpdate = true
            }
            if(element.slug ==='supprimer-un-suivi-financier') {
              this.suiviFinancierDelete = true
            }
           
          });

    },

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

    filteredSuivis(){
        var self = this;

        return this.suiviFinanciers.suiviFinanciers.filter(function (suiviFinancier){
          return suiviFinancier.codePta.toLowerCase().indexOf(self.search.toLowerCase()) >= 0 || 
                 suiviFinancier.nom.toLowerCase().indexOf(self.search.toLowerCase()) >= 0;
              });
      },

      title_csv() {
        return "suiviFinancier-" +"-" + new Date()
      },

      json_data(){
        let tab = [];

        this.filteredSuivis().forEach(element => {
          tab.push(
            {
              codePta: element.codePta,
              activite: element.nom,
              trimestre: element.trimestre,
              consommer: element.consommer,
              annee: element.annee
            }
          );
        });
        return tab;
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
    filtre() {
      this.champsRecherche = this.champsRecherche.map((item) => {
        item.errors = [];
        return item;
      });

      let suivi = extractFormData(this.champsRecherche,this.suiviAttributsRecherche);

      suivi.trimestre = suivi.trimestre?.valeur
      suivi.activiteId = suivi.activiteId?.id

      console.log(suivi)

      this.filter(suivi).then((response) => {
          if (response.status == 200 || response.status == 201) {
            this.close2();
          }
      });
    },
    previewFiles(event) {
      this.file = event.target.files[0]
    },
    importData() {
  
      const formData = new FormData();
      formData.append('fichier', this.file);
      SuiviFinancier.importCSV(formData).then((data) => {
      
        this.$toast.success("importation reussie")
      }).catch((e) => {
        this.$toast.error(e)
      })
     
    },

    async supprimer(suivi) {
      if(window.confirm("Voulez-vous supprimer ce suivi " ))
        await this.deleteSuiviFinancier(suivi.id)
    },
      close() {
        this.showModal = false
      },
      close2() {
        this.showModal3 = false
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
      showFiltreModal() {
        this.title ="Filtre"

        let formData = this.champsRecherche.map((value) => {
          if(value.key === 'activiteId'){ 
            value['options'] = this.activites
          }
          
          else if(value.key === 'trimestre'){
            value['options'] = this.$store.state.trimestres;
          }

          return value
        })

      this.champsRecherche = formData

        this.showModal3 = true
      },
      modifier(data) {
        this.title ="Modifier un Suivi"
        this.showModal = true
        alert(data +" à ete modifier")
      },
    },

    mounted() {
      this.getPermission()
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