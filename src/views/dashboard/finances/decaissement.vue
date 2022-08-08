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
            <router-link to="" class="text-gray-600">Decaissement</router-link>
          </li>
        </ol>
      </div>
      <div>
        <search-bar ></search-bar>
      </div>
    </nav> 
    <div v-if="showModal">
      <modal-top-right :title="title" v-on:close="close">
       <div class="px-4">
         <div v-if="title =='Ajouter un decaissement'">
            <vform template="default" :champs="champs" :cols="cols" submitText="Enregistrer" @sendForm="sendForm" ></vform>
         </div>
         <div v-if="title =='Modifier un decaissement'">
            <vform template="default" :champs="champs" :cols="cols" submitText="Modifier" @sendForm="sendForm" ></vform>
         </div>
        
       </div>
      </modal-top-right>
    </div>
    <div v-if="showModal2">
      <vmodal  title="Filtre indicateur"  v-on:close="showModal2 = false">
        <div class="px-4" style="width:500px" >
          <vform template="default" isAllPairSaufDescrip="true" :champs="champsRecherche" :cols="cols" submitText="Rechercher" @sendForm="filtre" ></vform>
        </div>
      </vmodal>
    </div>
    <div class="flex items-center justify-between">
      <titre>Decaissement </titre>
      <div class="flex space-x-3">
        <button @click="showModal2 = true" title="filtre" class="bg-primary text-white px-2 py-1"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg></button>
        <button @click="addDecaissement" title="ajouter " class="px-4 py-2 overflow-hidden flex space-x-2 items-center font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
          <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg></span>
          <span class="mx-2 text-xs font-semibold">ajouter</span>
        </button>
      </div>
     
    </div>
    <vtable :headers="headers" :datas="decaissements" :actions="actions" @supprimer="supprimer" @modifier="modifier"></vtable>
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
          decaissementAttributs : ['montant', 'type', 'date', 'projetId'],
          champs:[
          {name:'Montant',key:'montant',type:'number',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,},
          {name:'Date',key:'date',type:'date',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,},
          {name:'Projet',key:'projetId',type:'',placeholdere:'Choisir un projet',isSelect:true,isTextArea:false,data:'',options:this.projets, cle: 'id', value: 'nom',required:true,},
          {name:'Source de decaissement',key:'type',placeholdere:'Choisir la source',isSelect:true,isTextArea:false,data:'',options:this.$store.state.sources, cle: 'id', value: 'nom',required:true,},
        ],
        champsRecherche:[
          {name:'Date',type:'date',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,},
          {name:'Projets',type:'',placeholdere:"Selectionnez un projet",isSelect:true,isTextArea:false,data:'',options:['categ1','categ2','categ3'],required:true,},
          {name:'Bailleurs',type:'',placeholdere:"Selectionnez le bailleur",isSelect:true,isTextArea:false,data:'',required:true,options:['BM','BOA']},
          
        ],
        cols:2,
          
        headers:[
          {name:'Projets',cle:'projet'},
          {name:'Bailleur',cle:'bailleur'},
          {name:'Type de decaissement',cle:'type'},
          {name:'Date de decaissement',cle:'date'},
          {name:'Date de creation',cle:'created_at'},
        ],
        dataTable:[
          
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
      decaissement: state => state.decaissements.decaissement,
      loading : state => state.loading,
      errors : state => state.errors,
    }),

    ...mapGetters({
      decaissements: "decaissements/getDecaissements", decaissement: "getDecaissement",
      projets: "projets/getProjets",
      currentUser : 'auths/GET_AUTHENTICATE_USER'
    })
    
  },

    methods: {

            //Charger les fonctions de communication avec le serveur
    ...mapMutations({
      setErrors: 'SET_ERRORS_MESSAGE', // map `this.setErrors()` to `this.$store.commit('SET_ERRORS_MESSAGE')`,
      setDecaissement: 'decaissements/FILL' // map `this.CREATE_INSTANCE_PROJET()` to `this.$store.commit('CREATE_INSTANCE_PROJET')`
    }),

    ...mapActions('decaissements', {
      fetchDecaissements: "FETCH_LIST_DECAISSEMENT",
      saveDecaissement: "STORE_DECAISSEMENT",
      updateDecaissement: "UPDATE_DECAISSEMENT",
      deleteDecaissement: "DESTROY_DECAISSEMENT"
    }),

    ...mapActions('projets', { fetchProjets: 'FETCH_LIST_PROJET_OF_PROGRAMME' }),

    sendForm() {

      console.log(this.champs)

      this.champs = this.champs.map(item => { item.errors = []; return item})

      let decaissement = extractFormData(this.champs, this.decaissementAttributs)

      decaissement.type = decaissement.type.id
      decaissement.projetId = decaissement.projetId.id

      console.log(decaissement)
      
      if(this.decaissement?.id)
      {

        this.updateDecaissement({decaissement: decaissement, id : this.decaissement?.id}).then(response => {
          
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
      
        this.saveDecaissement(decaissement).then(response => {
          if(response.status == 200 || response.status == 201){
              this.close()
          }

        })
      }

    },  
      close() {
        this.showModal = false
      },
      addDecaissement() {
        this.title ="Ajouter un decaissement"

        let formData = this.champs.map((value) => {
          if(value.key === 'projetId'){ 
            value['options'] = this.projets
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
        this.title ="Modifier un decaissement"
        this.showModal = true
        alert(data +" à ete modifier")
      },
      supprimer(data) {
        alert(data +" à ete bien supprimer")
      }
    },

    mounted() {
      console.log("Fetching decaissements ...")
        this.fetchDecaissements().then((value) => {
        setTimeout(() => {
          console.log("Fetching list of projets")
          this.fetchProjets(this.currentUser?.programme?.id)
        }, 500);
    })
  }
}
</script>

<style scoped>

</style>