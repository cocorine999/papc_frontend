<template>
  <dashboard>
  <div  v-if="mission_de_controleVisible || currentRole == 'bailleur' " class="px-4">
    <div v-if="showModal">
      <modal-top-right :title="title"  v-on:close="close">
        <div  class="px-4 overflow-y-auto">
          <vform template="default"  :champs="champs" :cols="cols" :submitText="submitText" @sendForm="sendForm" @closeModal="close" ></vform>
        </div>
      </modal-top-right>
    </div>
    <div v-if="showModal2">
      <modal-top-right :title="title2"  v-on:close="close2">
        <div  class="px-4 overflow-y-auto">
          <vform template="default"  :champs="passationChamps" isAllPairSaufDescrip="true" :cols="colsPassation" submitText="Enregistrer" @sendForm="sendForm2" ></vform>
        </div>
      </modal-top-right>
    </div>
    <nav class="mb-2 mt-4 text-sm font-semibold  " aria-label="Breadcrumb">
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
      </div>
      
      <button  v-if="seeMo && mission_de_controleAdd " @click="addMissionDeControle" title="Ajouter un MO"  class="py-2 px-4 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase _rounded bg-primary focus:outline-none focus:shadow-outline">
        <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;">
            <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
          </svg></span>
        <span class="mx-2 text-sm font-semibold">Ajouter un MO</span>
      </button>
      <button  v-if="seePassation" @click="addPassation" title="Ajouter une passation de marché"  class="py-2 px-4 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase _rounded bg-primary focus:outline-none focus:shadow-outline">
        <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;">
            <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
          </svg></span>
        <span class="mx-2 text-sm font-semibold">Ajouter une passation de marché</span>
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
          :isDelete="mission_de_controleDelete"
          :isUpdate="mission_de_controleUpdate"
          :sendRequest="false"
        >
        </card-mod>
      </div>
    </div>

    <div v-if="seePassation">
      <vtable :headers="headers" :datas="passations" :actions="actions" @supprimer="supprimerPassation" ></vtable>    
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
      currentRole:'',
      showInput:true,
      uploadFile:false,
      title: "Ajouter une nouvelle mission de controle",
      submitText: "Enregistrer la mission de controle",
      title2:'Ajouter une nouvelle passation',
      missionDeControleAttributs: ["nom", "email", "contact"],
      passationAttributs: ["missionDeControleId", "siteId", "entrepriseExecutanteId", "dateDobtention", "dateDeSignature", "dateDeDemarrage", "datePrevisionnel", "dateDobtentionAvance", "montantAvance", "estimation", "ordreDeService", "travaux", "responsableSociologue", "montant"],
      champs:[
        {name:'Nom',key:'nom',type:'text',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,errors: []},
        {name:'Email',key:'email',type:'email',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,errors: []},
        {name:'Contact',key:'contact',type:'number',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,errors: []},
      ],
      passationChamps:[
        {name:'Mission de controle',key:'missionDeControleId',type:'',placeholdere:"Selectionnez une mission de controle",isSelect:true,isTextArea:false,data:'',required:true,options:this.missionDeControles, cle: 'id', value: 'nom',errors : []},
        {name:'Site', key:'siteId',type:'',placeholdere:"Selectionnez un site",isSelect:true,isTextArea:false,data:'',options:this.sites, cle: 'id', value: 'nom',required:true,errors : []},
        {name:'Entreprise Executante', key:'entrepriseExecutanteId',type:'',placeholdere:"Selectionnez une entreprise",isSelect:true,isTextArea:false,data:'',options:this.entreprisesExecutante, cle: 'id', value: 'nom',required:true,errors : []},
        {name:'Montant passation',key:'montant',type:'number',placeholdere:"Montant passation",isSelect:false,isTextArea:false,data:'',required:true,errors : []},
        {name:'Date obtention',key:'dateDobtention',type:'date',placeholdere:"Date obtention",isSelect:false,isTextArea:false,data:'',required:true,errors : []},
        {name:'Date signature',key:'dateDeSignature',type:'date',placeholdere:"Date signature",isSelect:false,isTextArea:false,data:'',required:true,errors : []},
        {name:'Date Demarrage',key:'dateDeDemarrage',type:'date',placeholdere:"Date de Demarrage",isSelect:false,isTextArea:false,data:'',required:true,errors : []},
        {name:'Date previsionnelle',key:'datePrevisionnel',type:'date',placeholdere:"Date de previsionnelle",isSelect:false,isTextArea:false,data:'',required:true,errors : []},
        {name:'Date  obtention avance',key:'dateDobtentionAvance',type:'date',placeholdere:"Date obtention avance",isSelect:false,isTextArea:false,data:'',required:true,errors : []},
        {name:'Montant avance',key:'montantAvance',type:'number',placeholdere:"Montant avance",isSelect:false,isTextArea:false,data:'',required:true,errors : []},
        {name:'Estimation',key:'estimation',type:'number',placeholdere:"Estimation",isSelect:false,isTextArea:false,data:'',required:true,errors : []},
        {name:'Ordre de service',key:'ordreDeService',type:'text',placeholdere:"Ordre de service",isSelect:false,isTextArea:false,data:'',required:true,errors : []},
        {name:'Travaux',key:'travaux',type:'text',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,errors : []},
        {name:'Responsable sociologue',key:'responsableSociologue',type:'text',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,errors : []},
      ],
      cols:1,
      colsPassation:2,
      headers:[
          {name:'Site',cle:'site',width:"w-36"},
          {name:'Mission de controle',cle:'passationable',width:"w-36"},
          {name:'Montant passation',cle:'montant',width:"w-24"},
          {name:'Date obtention',cle:'dateDobtention',width:"w-24"},
          {name:'Date obtention',cle:'dateDobtentionAvance',width:"w-24"},
          {name:'Date demarrage',cle:'dateDeDemarrage',width:"w-24"},
          {name:'Date signature',cle:'dateDeSignature',width:"w-24"},
          {name:'Date previsionnelle',cle:'datePrevisionnel',width:"w-24"},
          {name:'Montant avance',cle:'montantAvance',width:"w-24"},
          {name:'Estimation',cle:'estimation',width:"w-24"},
          {name:'Ordre de service',cle:'ordreDeService',width:"w-24"},
          {name:'travaux',cle:'travaux',width:"w-24"},
          {name:'Responsable sociologue',cle:'responsableSociologue',width:"w-24"},
          {name:'Date de creation',cle:'dateDeCreation',width:"w-28"},
        ],
        
        actions:[
          {name:'modifier',iconne:''},
          {name:'supprimer',iconne:''},
        ],
        mission_de_controleVisible:false,
        mission_de_controleAdd:false,
        mission_de_controleDelete:false,
        mission_de_controleUpdate:false,
    }
    
  },

  computed:{
      ...mapGetters({
        hasErrors : "GET_ERREURS",
        isLoading : "IS_LOADING",
        missionDeControle: "missionDeControles/getMissionDeControle",
        missionDeControles: "missionDeControles/getMissionDeControles",
        passation: "passations/getPassation",
        passations: "passations/getPassations",
        entreprisesExecutante: "entreprisesExecutante/getEntreprisesExecutante",
        sites: "sites/getSites",
        currentUser : 'auths/GET_AUTHENTICATE_USER'
      }),
      ...mapGetters('auths', {currentUser : 'GET_AUTHENTICATE_USER'})
  },

  methods: {

      ...mapMutations({
        setErrors: 'SET_ERRORS_MESSAGE', // map `this.setErrors()` to `this.$store.commit('SET_ERRORS_MESSAGE')`,
        setMissionDeControle: 'missionDeControles/FILL', // map `this.CREATE_INSTANCE_PROGRAMME()` to `this.$store.commit('CREATE_INSTANCE_PROGRAMME')`
        setPassation: 'passations/FILL' // map `this.CREATE_INSTANCE_PROGRAMME()` to `this.$store.commit('CREATE_INSTANCE_PROGRAMME')`
      }),
      

      ...mapActions('missionDeControles', {
        fetchMissionDeControles: "FETCH_LIST_MISSION_DE_CONTROLE",
        saveMissionDeControle: "STORE_MISSION_DE_CONTROLE",
        updateMissionDeControle: "UPDATE_MISSION_DE_CONTROLE",
        deleteMissionDeControle: "DESTROY_MISSION_DE_CONTROLE"
      }),
      ...mapActions('passations', {
        fetchPassations: "FETCH_LIST_MISSIONDECONTROLE_PASSATION",
        savePassation: "STORE_PASSATION",
        updatePassation: "UPDATE_PASSATION",
        deletePassation: "DESTROY_PASSATION"
      }),
      ...mapActions("entreprisesExecutante", {
        fetchEntreprisesExecutante: "FETCH_LIST_ENTREPRISE_EXECUTANTE",
      }),
      ...mapActions("sites", {
        fetchSites: "FETCH_LIST_SITE",
      }),
      
       getPermission() {
          this.currentUser.role[0].permissions.forEach(element => {
            if(element.slug ==='voir-une-mission-de-controle') {
              this.mission_de_controleVisible = true
            }
            if(element.slug === 'creer-une-mission-de-controle') {
              this.mission_de_controleAdd = true
            }
            if(element.slug === 'modifier-une-mission-de-controle') {
              this.mission_de_controleUpdate = true
            }
            if(element.slug ==='supprimer-une-mission-de-controle') {
              this.mission_de_controleDelete = true
            }
           
          });

      },

    
    goMo() {
      this.seeMo = true
      this.seePassation = false
     
    },
    goPassation() {
      this.seeMo = false
      this.seePassation = true
    
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

    supprimerPassation(passation) {
      if(window.confirm("Voulez-vous supprimer la passation "))
        this.deletePassation(passation.id)
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
    close2() {
      this.showCloseModal2()

      this.resetForm2()
    }, 
    
    showCloseModal(value = false) {
      this.showModal = value
    },
    showCloseModal2(value = false) {
      this.showModal2 = value
    },

    resetForm2(){

      this.passationChamps = this.passationChamps.map(item => { item.data = ''; return item})
        
      window.document.getElementById('vform')?.reset()

      this.setPassation({})
    },
    resetForm(){

      this.champs = this.champs.map(item => { item.data = ''; return item})
  
     window.document.getElementById('vform')?.reset()

     this.setMissionDeControle({})
    },
    addPassation() {
      this.title2 = 'Ajouter une nouvelle passation'
      
      this.showCloseModal2(true)
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
    },
    sendForm2() {

      this.passationChamps = this.passationChamps.map(item => { item.errors = []; return item})

      let passation = extractFormData(this.passationChamps, this.passationAttributs)


      passation.siteId = passation.siteId.id

      passation.missionDeControleId = passation.missionDeControleId.id

      passation.entrepriseExecutantId = passation.entrepriseExecutanteId.id

      console.log(passation)
      
      this.savePassation(passation).then(response => {
        if(response.status == 200 || response.status == 201){
            this.close2()
        }

      })
    },
    
  },

  watch: {
    isLoading: function(value) {
      //this.loading = value
    },

    hasErrors: function(errors) {
      this.champs.forEach((value) => {value.errors = errors[value.key]})
      //this.errors = errors
    },

    sites: function (sites) {
      this.passationChamps.map((item) => {
        if (item.key === "siteId") {
          item.options = sites.map((site) => {
            return {
              id: site.id,
              nom: site.nom,
            };
          });
        }
        return item;
      });
    },
    
    missionDeControles: function (missionDeControles) {
      this.passationChamps.map((item) => {
        if (item.key === "missionDeControleId") {
          item.options = missionDeControles.map((m) => {
            return {
              id: m.id,
              nom: m.user.nom,
            };
          });
        }
        return item;
      });
    },

    entreprisesExecutante: function (entrepriseExecutantes) {
      this.passationChamps.map((item) => {
        if (item.key === "entrepriseExecutanteId") {
          item.options = entrepriseExecutantes.map((m) => {
            return {
              id: m.id,
              nom: m.user.nom,
            };
          });
        }
        return item;
      });
    }

  },
  
  mounted() {
    this.getPermission()
     if(this.currentUser != undefined) {
       this.currentRole = this.currentUser.type
       if(this.currentUser.type ==='bailleur') {
          this.fetchMissionDeControles()
          this.fetchPassations(this.currentUser?.programme?.id)
       }
       else {
          this.fetchMissionDeControles()
          this.fetchEntreprisesExecutante()
          this.fetchSites(this.currentUser?.programme?.id)
          this.fetchPassations(this.currentUser?.programme?.id)
       }
     }
  
    
  }
}
</script>

<style>

</style>