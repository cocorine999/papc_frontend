<template>
  <dashboard>
  <div class="p-4">
    <div v-if="showModal">
      <vmodal :title="title"  v-on:close="showModal = false">
        <div style="width:60vw;" class="px-4 overflow-y-auto">
          <vform template="default"  :champs="champs" :cols="cols" submitText="Creer un MOD" @sendForm="sendForm" ></vform>
        </div>
      </vmodal>
    </div>
    <div v-if="showModal2">
      <vmodal :title="title2"  v-on:close="showModal2 = false">
        <div style="width:60vw;height:450px" class="px-4 overflow-y-auto">
          <vform template="default"  :champs="passationChamps" isAllPairSaufDescrip="true" :cols="colsPassation" submitText="Creer un MOD" @sendForm="sendForm" ></vform>
        </div>
      </vmodal>
    </div>
    <nav class="mb-2 text-sm font-semibold  " aria-label="Breadcrumb">
      <div>
        <ol class="inline-flex p-0 list-none">
          <li class="flex items-center ">
            <router-link to="/dashboard" class="text-gray-600">dashboard</router-link>
            <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
          </li>

          <li class="flex items-center text-blue-500 ">
            <router-link to="" class="">MOD</router-link>
          </li>
        </ol>
      </div> 
    </nav>
    <div class="flex items-center justify-between my-2">
      <div class="flex space-x-4">
        <span @click="goMod" :class="{'border-primary border-b-8':seeMod}" class="inline-block cursor-pointer  text-lg uppercase font-bold    py-2">Listes MOD </span>
        <span @click="goPassation" :class="{'border-primary border-b-8':seePassation}" class="inline-block cursor-pointer  text-lg uppercase font-bold   py-2">Passation de marché </span>
      </div>
      
      <button  v-if="seeMod" @click="addMod" title="Ajouter un MOD"  class="p-2 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase rounded bg-primary focus:outline-none focus:shadow-outline">
        <span><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM17 11h-4v4h-2v-4H7V9h4V5h2v4h4v2z"></path></svg></span>
        <span class="mx-2 text-sm font-semibold">Ajouter un MOD</span>
      </button>
      <button  v-if="seePassation" @click="addPassation" title="Ajouter un MOD"  class="p-2 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase rounded bg-primary focus:outline-none focus:shadow-outline">
        <span><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM17 11h-4v4h-2v-4H7V9h4V5h2v4h4v2z"></path></svg></span>
        <span class="mx-2 text-sm font-semibold">Ajouter un passation de marché</span>
      </button>
    </div>
    <div v-if="seeMod" class="grid grid-cols-3 gap-4 my-6">
      <div v-for="mod in mods" :key="mod.id">

        <card-mod
          :libelle="mod.user.nom"
          :contact="mod.user.contact"
          :email="mod.user.email"
          @supprimer="supprimerMod(mod)"
          @modifier="modifierMod(mod)"
          @dupliquer="dupliquerMod(mod)"
        >
        </card-mod>

      </div>
    </div>
    <div v-if="seePassation">
      <vtable :headers="headers" :datas="dataTable" :actions="actions" @supprimer="supprimerPassation" ></vtable>    
    </div>
  </div>
  </dashboard>
</template>

<script>
  import Dashboard from '@/layouts/Dashboard'
  import CardMod from '@/components/CardMod'
  import Vtable from '@/components/Vtable'
  import Vmodal from '@/components/Vmodal'
  import Vform from '@/components/Vform'
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  import extractFormData from "@/utils/extract-data";

export default {
  components: {
    CardMod,
    Dashboard,
    Vtable,
    Vform,
    Vmodal
  },
  data() {
    return {
      showModal:false,
      showModal2:false,
      seeMod:true,
      seePassation:false,
      showInput:true,
      uploadFile:false,
      title:'',
      title2:'',
      modAttributs: ["nom", "email", "contact"],
      champs:[
        {name:'Nom',key:'nom',type:'text',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,errors: []},
        {name:'Email',key:'email',type:'email',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,errors: []},
        {name:'Contact',key:'contact',type:'number',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,errors: []},
      ],
      passationChamps:[
        {name:'Selectionnez MOD',type:'',placeholdere:"Selectionnez MOD",isSelect:true,isTextArea:false,data:'',required:true,options:['Agetur','Agetur2']},
        {name:'Selectionnez Site',type:'',placeholdere:"Selectionnez un site",isSelect:true,isTextArea:false,data:'',options:['calavi','cotonou'],required:true,},
        {name:'Montant passation',type:'number',placeholdere:"Montant passation",isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Date obtention',type:'date',placeholdere:"Date obtention",isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Date signature',type:'date',placeholdere:"Date signature",isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Date Demarrage',type:'date',placeholdere:"Date de Demarrage",isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Date previsionnelle',type:'date',placeholdere:"Date de previsionnelle",isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Date  obtention avance',type:'date',placeholdere:"Date obtention avance",isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Montant avance',type:'number',placeholdere:"Montant avance",isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Estimation',type:'number',placeholdere:"Estimation",isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Ordre de service',type:'text',placeholdere:"Ordre de service",isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Travaux',type:'text',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Responsable sociologue',type:'',placeholdere:"Selectionnez un responsable",isSelect:true,isTextArea:false,data:'',required:true,options:['Responsable','Responsable2']},
      ],
      cols:1,
      colsPassation:2,
      headers:[
          {name:'Nom createur',props:'createur',width:"w-24"},
          {name:'Site',props:'site',width:"w-36"},
          {name:'MOD',props:'mod',width:"w-36"},
          {name:'Montant passation',props:'montant_passation',width:"w-24"},
          {name:'Date obtention',props:'date_obtention',width:"w-24"},
          {name:'Date demarrage',props:'date_demarrage',width:"w-24"},
          {name:'Date signature',props:'date_signature',width:"w-24"},
          {name:'date previsionnelle',props:'date_previsionnelle',width:"w-24"},
          {name:'Date obtention avance',props:'date_avance',width:"w-40"},
          {name:'Montant avance',props:'montant_avance',width:"w-24"},
          {name:'Estimation',props:'estimation',width:"w-24"},
          {name:'Ordre de service',props:'ordre_service',width:"w-24"},
          {name:'travaux',props:'travaux',width:"w-24"},
          {name:'Responsable sociologue',props:'responsable_sociologue',width:"w-24"},
          {name:'Date de creation',props:'created_at',width:"w-28"},
         
         
        ],
        dataTable:[
          {createur:'Gomez jacob',mod:"Agetur",site:'Calavi',montant_passation:'20000000000000',date_obtention:"23-0-2022",date_demarrage:"25-0-2022",date_signature:"22-06-2022",date_previsionnelle:"23-06-2025",date_avance:"21-06-2022",montant_avance:"200000000000",estimation:'40000000000000',ordre_service:'lorem',travaux:'lorem',responsable_sociologue:'Ange Klika',created_at:"22-06-2022"},
          {createur:'Gomez jacob',mod:"Agetur",site:'Calavi',montant_passation:'20000000000000',date_obtention:"23-0-2022",date_demarrage:"25-0-2022",date_signature:"22-06-2022",date_previsionnelle:"23-06-2025",date_avance:"21-06-2022",montant_avance:"200000000000",estimation:'40000000000000',ordre_service:'lorem',travaux:'lorem',responsable_sociologue:'Ange Klika',created_at:"22-06-2022"},
          {createur:'Gomez jacob',mod:"Agetur",site:'Calavi',montant_passation:'20000000000000',date_obtention:"23-0-2022",date_demarrage:"25-0-2022",date_signature:"22-06-2022",date_previsionnelle:"23-06-2025",date_avance:"21-06-2022",montant_avance:"200000000000",estimation:'40000000000000',ordre_service:'lorem',travaux:'lorem',responsable_sociologue:'Ange Klika',created_at:"22-06-2022"},
          {createur:'Gomez jacob',mod:"Agetur",site:'Calavi',montant_passation:'20000000000000',date_obtention:"23-0-2022",date_demarrage:"25-0-2022",date_signature:"22-06-2022",date_previsionnelle:"23-06-2025",date_avance:"21-06-2022",montant_avance:"200000000000",estimation:'40000000000000',ordre_service:'lorem',travaux:'lorem',responsable_sociologue:'Ange Klika',created_at:"22-06-2022"},
          {createur:'Gomez jacob',mod:"Agetur",site:'Calavi',montant_passation:'20000000000000',date_obtention:"23-0-2022",date_demarrage:"25-0-2022",date_signature:"22-06-2022",date_previsionnelle:"23-06-2025",date_avance:"21-06-2022",montant_avance:"200000000000",estimation:'40000000000000',ordre_service:'lorem',travaux:'lorem',responsable_sociologue:'Ange Klika',created_at:"22-06-2022"},
          {createur:'Gomez jacob',mod:"Agetur",site:'Calavi',montant_passation:'20000000000000',date_obtention:"23-0-2022",date_demarrage:"25-0-2022",date_signature:"22-06-2022",date_previsionnelle:"23-06-2025",date_avance:"21-06-2022",montant_avance:"200000000000",estimation:'40000000000000',ordre_service:'lorem',travaux:'lorem',responsable_sociologue:'Ange Klika',created_at:"22-06-2022"},
          {createur:'Gomez jacob',mod:"Agetur",site:'Calavi',montant_passation:'20000000000000',date_obtention:"23-0-2022",date_demarrage:"25-0-2022",date_signature:"22-06-2022",date_previsionnelle:"23-06-2025",date_avance:"21-06-2022",montant_avance:"200000000000",estimation:'40000000000000',ordre_service:'lorem',travaux:'lorem',responsable_sociologue:'Ange Klika',created_at:"22-06-2022"},
        ],
        actions:[
          {name:'modifier',iconne:''},
          {name:'supprimer',iconne:''},
        ],
    }
    
  },

  computed:{
      ...mapGetters({
        hasErrors : "GET_ERREURS",
        isLoading : "IS_LOADING",
        mod: "mods/getMod",
        mods: "mods/getMods",
        currentUser : 'auths/GET_AUTHENTICATE_USER'
      })
  },

  methods: {

    ...mapMutations({
      setErrors: 'SET_ERRORS_MESSAGE', // map `this.setErrors()` to `this.$store.commit('SET_ERRORS_MESSAGE')`,
      setMod: 'mods/FILL' // map `this.CREATE_INSTANCE_PROGRAMME()` to `this.$store.commit('CREATE_INSTANCE_PROGRAMME')`
    }),

    ...mapActions('mods', {
      fetchMods: "FETCH_LIST_MOD",
      saveMod: "STORE_MOD",
      updateMod: "UPDATE_MOD",
      deleteMod: "DESTROY_MOD"
    }),

    addPassation() {
      this.title2 = 'Ajouter une Passation'
      this.showModal2 = true
    },
    
    goMod() {
      this.seeMod = true
      this.seePassation = false
    },

    goPassation() {
      this.seeMod = false
      this.seePassation = true
    },

    supprimerPassation(data) {
      alert(data+ " à ete bien supprimer")
    },

    
    addMod() {
      this.title='Ajouter un MOD'
      this.showCloseModal(true)
    },

    modifierMod(mod) {

      this.title = 'Modifier un MOD'

      this.setMod(mod)

      this.modAttributs.forEach((item) => {

        this.champs.find((value, index) => {

          if(value.key === item){
            if(item === "nom" || item === "email" || item === "contact" )
              this.champs[index]['data'] = this.mod.user[item]
            else
              this.champs[index]['data'] = this.mod[item]
          }

        })

      })

      this.showCloseModal(true)
    },

    supprimerMod(mod) {
      if(window.confirm("Voulez-vous supprimer le mod " + mod.user.nom))
        this.deleteMod(mod.id)
    },

    dupliquerMod() {
      this.title='Dupliquer un mod'
      this.showCloseModal()
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

      this.setMod({})
    },

    sendForm() {

        this.champs = this.champs.map(item => { item.errors = []; return item})

        let mod = extractFormData(this.champs, this.modAttributs)

        console.log(mod)

        if(this.mod?.id)
        {

          this.updateMod({mod: mod, id : this.mod?.id}).then(response => {
            
            if(response.status == 200 || response.status == 201){

              this.close()
            }

          })

        }
        else
        {
          
          this.saveMod(mod).then(response => {
            if(response.status == 200 || response.status == 201){
                this.close()
            }

          })
        }
    }

  },

  watch: {
    isLoading: function(value) {
      //this.loading = value
    },

    hasErrors: function(errors) {
      this.champs.forEach((value) => {value.errors = errors[value.key]})
      //this.errors = errors
    }

  },
  
  mounted() {
    console.log("Fetching mods ...")
    this.fetchMods()
  }
}
</script>

<style>

</style>