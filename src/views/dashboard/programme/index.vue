<template>
  <dashboard>
    <div class="w-full p-4">
    <div v-if="showModal">
      <modal-top-right  :title="title"  v-on:close="close">
        <div class="px-4 overflow-auto" >
          <div>
             <vform template="default" :champs="champs" :cols="cols" :submitText="submitText" @sendForm="sendForm" ></vform>
          </div>
        </div>
      </modal-top-right>
    </div>
    
    <nav class="mb-2 text-sm font-semibold flex justify-between items-center " aria-label="Breadcrumb">
      <div>
        <ol class="inline-flex p-0 list-none">
          <li class="flex items-center text-blue-500">
            <router-link to="" class="text-gray-600">dashboard</router-link>
            <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
          </li>
          <li class="flex items-center ">
            <router-link to="" class="text-gray-600">programme</router-link>
          </li>
        </ol>
      </div>
      <div>
        <search-bar ></search-bar>
      </div>
    </nav> 

    <div class="flex items-center justify-between my-2">
      <titre>Mes programmes </titre>
        <button @click="addProgramme" title="ajouter un programme"   class="px-4 py-2 flex overflow-hidden items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
        
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
          <span class="mx-2 text-sm font-semibold">Ajouter </span>
        </button>
    </div>
    <div  class="grid grid-cols-3 gap-4">

        <div v-for="programme in programmes" :key="programme.id">
          <card-programme
            :libelle="programme.nom"
            :code="programme.code"
            :dateDeb="programme.debut"
            :montantBN="programme.budgetNational"
            :dateFin="programme.fin"
            :description="programme.description"
            @supprimer="supprimer(programme)"
            @modifier="modifier(programme)"
            @dupliquer="dupliquer"
            > </card-programme>
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
import CardProgramme from '@/components/CardProgramme'

import { mapGetters, mapActions, mapMutations, mapState} from "vuex";

import utils from '@/utils/index'

export default {
  components: {
    Vtable,
    Dashboard,
    Vmodal,
    Vform,
    Titre,
    SearchBar,
    CardProgramme,
    ModalTopRight
  },
  data() {
    return {
      showModal:false,
      line:false,
      mosaique:true,
      title: 'Ajouter un nouveau programme',
      submitText:"Enregistrer",
      programmeAttributs : ['nom', 'code', 'description', 'debut', 'fin', 'objectifGlobaux', 'budgetNational'],
      champs:[
        {name:'Nom du programme', key: 'nom', type:'text', placeholdere:"Nom du programme",isSelect:false,isTextArea:false,data:'',required:true, errors : []},
        {name:'Code', type:'number', key: 'code', placeholdere:"Code de l'indicateur",isSelect:false,isTextArea:false,data:'',required:true, errors : []},
        {name:'Date debut', type:'date', key: 'debut', placeholdere:'Date de debut',isSelect:false,isTextArea:false,data:'', required:true, errors : []},
        {name:'Date fin', type:'date', key: 'fin', placeholdere:'Date de fin',isSelect:false,isTextArea:false,data:'', required:true, errors : []},
        {name:'Description', type:'', key: 'description', placeholdere:'Description du programme', isSelect:false, isTextArea:true, data:'', required:true, errors : []},
        {name:'Objectif globaux', type:'text', key: 'objectifGlobaux', placeholdere:'Definir les objectifs',isSelect:false,isTextArea:false,data:'', required:true, errors : []},
        {name:'Budget national', type:'number', key: 'budgetNational', placeholdere:'Definir un budget',isSelect:false,isTextArea:false,data:'', required:true, errors : []}
      ],
      cols:2,
      option:[
        {name:'supprimer'},
        {name:'modifier'},
       
      ]
    }
  },

  computed:{

    //importation des variables du module auths
    ...mapState({
      identifiant: state => state.auths.identifiant,
      programme: state => state.programmes.programme,
      loading : state => state.loading,
      errors : state => state.errors
    }),

    ...mapGetters('programmes', {
      programmes: "getProgrammes", programme: "getProgramme"
    })
    
  },
      
  methods: {

    //Charger les fonctions de communication avec le serveur
    ...mapMutations({
      setErrors: 'SET_ERRORS_MESSAGE', // map `this.setErrors()` to `this.$store.commit('SET_ERRORS_MESSAGE')`,
      setProgramme: 'programmes/FILL' // map `this.CREATE_INSTANCE_PROGRAMME()` to `this.$store.commit('CREATE_INSTANCE_PROGRAMME')`
    }),

    ...mapActions('programmes', {
      fetchProgrammes: "FETCH_LIST_PROGRAMME",
      saveProgramme: "STORE_PROGRAMME",
      updateProgramme: "UPDATE_PROGRAMME",
      deleteProgramme: "DESTROY_PROGRAMME"
    }),

    switch1() {
      this.mosaique = true
      this.line = false
    },
    switch2() {
      this.mosaique = false
      this.line = true
    },
    
    addProgramme() {
  
      this.title='Ajouter un nouveau programme'

      this.submitText= "Enregistrer"

      this.showCloseModal(true)
    },

    modifier(programme) {

      this.title = 'Modification du programme { programme.nom }'

      this.submitText= "Modifier"

      this.setProgramme(programme)

      this.programmeAttributs.forEach((item) => {

        this.champs.find((value, index) => {

          if(value.key === item){
            if(value.key === 'debut' || value.key === 'fin')
            {
              this.champs[index]['data'] = this.programme[item] + "-01"
            }else{
                this.champs[index]['data'] = this.programme[item]
            }
          }

        })

      })

      this.showCloseModal(true)
    },

    async supprimer(programme) {
      if(window.confirm("Voulez-vous supprimer ce programme " + programme.nom))
        await this.deleteProgramme(programme.id)
    },

    dupliquer(programme) {

      this.title = 'Ajout du programme { programme.nom }'

      this.submitText= "Enregistrer"

      this.programmeAttributs.forEach((item) => {

        this.champs.find((value, index) => {

          if(value.key === item){
            if(value.key === 'debut' || value.key === 'fin')
            {
              this.champs[index]['data'] = programme[item] + "-01"
            }else{
                this.champs[index]['data'] = programme[item]
            }
          }

        })

      })

      this.showCloseModal(true)
    },
    
    close() {
      this.showCloseModal()

      this.resetForm()
    }, 
    
    showCloseModal(value = false) {
      this.showModal = value
    },

    resetForm(){

      this.champs = this.champs.map(item => { item.data = ''; return item})
      
      window.document.getElementById('vform')?.reset()

      setProgramme({})
    },

    sendForm() {

      this.champs = this.champs.map(item => { item.errors = []; return item})

      let programme = utils.extractFormData(this.champs, this.programmeAttributs)
      
      programme['debut'] = utils.formatDate(programme['debut'], {'year' : 'year' , 'month': 'month' })
      
      programme['fin'] = utils.formatDate(programme['fin'], {'year' : 'year' , 'month': 'month' })

      if(this.programme?.id)
      {

        this.updateProgramme({programme: programme, id : this.programme?.id}).then(response => {
          
          if(response.status == 200 || response.status == 201){

            this.close()
          }

        })

      }
      else
      {
        
        this.saveProgramme(programme).then(response => {
          if(response.status == 200 || response.status == 201){
              this.close()
          }

        })
      }
    }

  },

  watch: {
    loading: function(value) {
      //this.loading = value
    },

    errors: function(errors) {
      this.champs.forEach((value) => {value.errors = errors[value.key]})
      //this.errors = errors
    }

  },
  
  mounted() {
    console.log("Fetching programmes ...")
    this.fetchProgrammes()
  }

}
</script>

<style>

</style>