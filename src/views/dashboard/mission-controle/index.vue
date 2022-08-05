<template>
  <dashboard>
  <div class="px-4">
    <div v-if="showModal">
      <modal-top-right :title="title"  v-on:close="close">
        <div  class="px-4 overflow-y-auto">
          <vform template="default"  :champs="champs" :cols="cols" :submitText="submitText" @sendForm="sendForm" @closeModal="close" ></vform>
        </div>
      </modal-top-right>
    </div>
    <div v-if="showModal2">
      <modal-top-right :title="title2"  v-on:close="showModal2 = false">
        <div  class="px-4 overflow-y-auto">
          <vform template="default"  :champs="passationChamps" isAllPairSaufDescrip="true" :cols="colsPassation" submitText="Creer un MOD" @sendForm="sendForm" ></vform>
        </div>
      </modal-top-right>
    </div>
    <nav class="mb-2 text-sm font-semibold  " aria-label="Breadcrumb">
      <div>
        <ol class="inline-flex p-0 list-none">
          <li class="flex items-center ">
            <router-link to="/dashboard" class="text-gray-600">dashboard</router-link>
            <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
          </li>

          <li class="flex items-center text-blue-500 ">
            <router-link to="" class="">MO</router-link>
          </li>
        </ol>
      </div> 
    </nav>
    <div class="flex items-center justify-between my-2">
      <div class="flex space-x-4">
        <span @click="goMo" :class="{'border-primary border-b-8':seeMo}" class="inline-block cursor-pointer  text-lg uppercase font-bold    py-2">Listes MO </span>
        <span @click="goPassation" :class="{'border-primary border-b-8':seePassation}" class="inline-block cursor-pointer  text-lg uppercase font-bold   py-2">Passation de marché </span>
        <span @click="goChecklist" :class="{'border-primary border-b-8':seeChecklist}" class="inline-block cursor-pointer text-lg utext-lg uppercase font-bold   py-2">Checklist </span>
      </div>
      
      <button  v-if="seeMo" @click="addMissionDeControle" title="Ajouter un MO"  class="p-2 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase rounded bg-primary focus:outline-none focus:shadow-outline">
        <span><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM17 11h-4v4h-2v-4H7V9h4V5h2v4h4v2z"></path></svg></span>
        <span class="mx-2 text-sm font-semibold">Ajouter un MO</span>
      </button>
      <button  v-if="seePassation" @click="addPassation" title="Ajouter un MO"  class="p-2 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase rounded bg-primary focus:outline-none focus:shadow-outline">
        <span><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM17 11h-4v4h-2v-4H7V9h4V5h2v4h4v2z"></path></svg></span>
        <span class="mx-2 text-sm font-semibold">Ajouter un passation de marché</span>
      </button>
    </div>
    <div v-if="seeMo" class="grid grid-cols-3 gap-4 my-6">
      
      <div
        v-for="missionDeControle in missionDeControles"
        :key="missionDeControle.id"
      >
        <card-mod
          :libelle="missionDeControle.user.nom"
          :contact="missionDeControle.user.contact"
          :email="missionDeControle.user.email"
          @supprimer="supprimerMissionDeControle(missionDeControle)"
          @modifier="modifierMissionDeControle(missionDeControle)"
          @dupliquer="dupliquerMissionDeControle(missionDeControle)"
        >
        </card-mod>
      </div>
    </div>
    <div v-if="seeChecklist">
      <div  class="grid grid-cols-3 gap-4">
        <div v-for="i in 6" :key="i.id">
          <card-checklist
            libelle="formulaire"
            code="15555DC" 
            activite="Nombre d'accident routiere" 
            :unites="['personne','%','km']" 
            @supprimer="supprimerChecklist"
            @modifier="modifierChecklist"
            @dupliquer="dupliquerChecklist"
            > </card-checklist>
        </div>
      </div>
    </div>
    <div v-if="seePassation">
      <vtable :headers="headers" :datas="dataTable" :actions="actions" @supprimer="supprimerPassation" ></vtable>    
    </div>
  </div>
  </dashboard>
</template>

<script>

  import ModalTopRight from '@/components/ModalTopRight'
  import CardChecklist from '@/components/CardChecklist'
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
    Vmodal,
    ModalTopRight,
    CardChecklist
  },
  data() {
    return {
      showModal:false,
      showModal2:false,
      seeMo:true,
      seeMod:false,
      seePassation:false,
      seeChecklist:false,
      showInput:true,
      uploadFile:false,
      title: "Ajouter une nouvelle mission de controle",
      submitText: "Enrégistrer la mission de controle",
      title2:'',
      missionDeControleAttributs: ["nom", "email", "contact"],
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
        missionDeControle: "missionDeControles/getMissionDeControle",
        missionDeControles: "missionDeControles/getMissionDeControles",
        currentUser : 'auths/GET_AUTHENTICATE_USER'
      })
  },

  methods: {

      ...mapMutations({
        setErrors: 'SET_ERRORS_MESSAGE', // map `this.setErrors()` to `this.$store.commit('SET_ERRORS_MESSAGE')`,
        setMissionDeControle: 'missionDeControles/FILL' // map `this.CREATE_INSTANCE_PROGRAMME()` to `this.$store.commit('CREATE_INSTANCE_PROGRAMME')`
      }),

      ...mapActions('missionDeControles', {
        fetchMissionDeControles: "FETCH_LIST_MISSION_DE_CONTROLE",
        saveMissionDeControle: "STORE_MISSION_DE_CONTROLE",
        updateMissionDeControle: "UPDATE_MISSION_DE_CONTROLE",
        deleteMissionDeControle: "DESTROY_MISSION_DE_CONTROLE"
      }),

    addPassation() {
      this.title2 = 'Ajouter une Passation'
      this.showModal2 = true
    },
    
    goMo() {
      this.seeMo = true
      this.seePassation = false
      this.seeChecklist = false
    },
    goPassation() {
      this.seeMo = false
      this.seePassation = true
      this.seeChecklist = false
    },
    goChecklist() {
      this.seeMo = false
      this.seePassation = false
      this.seeChecklist = true
    },

    supprimerPassation(data) {
      alert(data+ " à ete bien supprimer")
    },

    addMissionDeControle() {
      this.title = "Ajouter une nouvelle mission de controle"

      this.submitText = "Enrégistrer la mission de controle"

      this.showCloseModal(true)
    },

    modifierMissionDeControle(missionDeControle) {

      this.title = "Modifier une mission de controle"

      this.submitText = "Modifier la mission de controle"

      this.setMissionDeControle(missionDeControle)

      this.missionDeControleAttributs.forEach((item) => {

        this.champs.find((value, index) => {

          if(value.key === item){
            if(item === "nom" || item === "email" || item === "contact" )
              this.champs[index]['data'] = this.missionDeControle.user[item]
            else
              this.champs[index]['data'] = this.missionDeControle[item]
          }

        })

      })

      this.showCloseModal(true)
    },

    supprimerMissionDeControle(missionDeControle) {
      if(window.confirm("Voulez-vous supprimer la mission de controle " + missionDeControle.user.nom))
        this.deleteMissionDeControle(missionDeControle.id)
    },

    dupliquerMissionDeControle(missionDeControle) {

      this.title = "Ajouter d'une nouvelle mission de controle"

      this.submitText = "Enrégistrer"

      this.missionDeControleAttributs.forEach((item) => {

        this.champs.find((value, index) => {

          if(value.key === item){
            this.champs[index]['data'] = missionDeControle.user[item]
          }

        })

      })

      this.showCloseModal(true)
    },

    modifierChecklist(){

    }, 
     
    supprimerChecklist(){

    }, 
     
    dupliquerChecklist(){

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

      this.setMissionDeControle({})
    },

    sendForm() {

        this.champs = this.champs.map(item => { item.errors = []; return item})

        let missionDeControle = extractFormData(this.champs, this.missionDeControleAttributs)

        missionDeControle.programmeId = this.currentUser?.programme?.id

        console.log(missionDeControle)

        if(this.missionDeControle?.id)
        {

          this.updateMissionDeControle({missionDeControle: missionDeControle, id : this.missionDeControle?.id})
            .then(response => {
              
              if(response.status == 200 || response.status == 201){

                this.close()
              }

            })
            .catch((value) => {
              alert(value.response.data.errors.programmeId[0])
            })

        }
        else
        {
          
          this.saveMissionDeControle(missionDeControle)
            .then(response => {
              if(response.status == 200 || response.status == 201){
                  this.close()
              }
            })
            .catch((value) => {
              alert(value.response.data.errors.programmeId[0])
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
    console.log("Fetching missions de controle ...")
    this.fetchMissionDeControles()
  }
}
</script>

<style>

</style>