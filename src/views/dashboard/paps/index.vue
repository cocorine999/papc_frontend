<template>
<dashboard>
  <div class="px-4">
    <div v-if="showModal">
      <ModalTopRight :title="title"  v-on:close="showModal = false">
        <div  class="px-4 overflow-y-auto">
          <vform template="default" isAllPairSaufDescrip="true" :champs="champs" :cols="cols" submitText="Creer un pap" @sendForm="sendForm" ></vform>
        </div>
      </ModalTopRight>
    </div>

    <nav class="mb-2 mt-4 text-sm font-semibold  " aria-label="Breadcrumb">
      <div>
        <ol class="inline-flex p-0 list-none">

          <li class="flex items-center ">
            <router-link to="/dashboard" class="text-gray-600">dashboard</router-link>
            <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
          </li>

          <li class="flex items-center text-blue-500 ">
            <router-link to="" class="">Pap</router-link>
          </li>
        </ol>
      </div> 
    </nav>

    <div class="flex items-center justify-between my-2">
      
      <div class="flex space-x-4">
        <span  class="inline-block cursor-pointer  border-b-8 font-bold text-sm uppercase    border-primary py-2">Tableau recapitulatif </span> 
      </div>
      <button  @click="addPap" title="ajouter un tabelau"  class="py-2 px-4 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase bg-primary focus:outline-none focus:shadow-outline">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
        <span class="mx-2 text-xs font-semibold">Ajouter </span> 
      </button>
    </div>
    
     <vtable :headers="headers" :datas="paps" :actions="actions" @supprimer="supprimer" @updateInputData="updateInputData"></vtable>
    
  </div>
  </dashboard>
</template>

<script>
import ModalTopRight from '@/components/ModalTopRight'
import SearchBar from '@/components/SearchBar'
import CardBailleur from '@/components/CardBailleur'
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
    CardBailleur,
    Titre,
    SearchBar,
    ModalTopRight
  },
  data() {
    return {
      showModal:false,
      loading:false,
      showInput:true,
      title:'',
      papAttributs : ['nom', 'prenoms', 'longitude', 'latitude', 'dateDePaiement', 'contact', 'bailleurId', 'montant'],
      champs:[
        {name:' Nom ', key:'nom',type:'text',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,errors : []},
        {name:' Prenoms ', key:'prenoms',type:'text',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,errors : []},
        {name:' Montant', key:'montant',type:'number',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,errors : []},

        {name:'Date de paiement', key:'dateDePaiement',type:'date',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,errors : []},
        {name:' Longitude', key:'longitude',type:'text',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,errors : []},
        {name:' Latitude', key:'latitude',type:'text',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,errors : []},
        {name:' Contact ', key:'contact',type:'text',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,errors : []},
        {name:'Bailleur', key:'bailleurId',type:'',placeholdere:"Selectionnez un bailleur",isSelect:true,isTextArea:false,data:'',options:this.bailleurs, cle: 'id', value: 'sigle',required:true,errors : []},
      ],
      cols:2,
      headers:[
        {name:'Nom',cle:'nom'},
        {name:'Prenoms',cle:'prenoms'},
        {name:'Longitude',cle:'longitude'},
        {name:'Latitude',cle:'latitude'},
        {name:'Montant(Fcfa)',cle:'montant'},
        {name:'Date de paiement',cle:'dateDePaiement'},
        {name:'Contact',cle:'contact'},
        {name:'Bailleur',cle:'bailleur'},
        {name:'Date de création',cle:'dateDeCreation'},
      ],
      actions:[
        {name:'supprimer',iconne:''},
      ]
    }
    
  },

  computed:{

    //importation des variables du module auths
    ...mapState({
      identifiant: state => state.auths.identifiant,
      pap: state => state.paps.pap,
      loading : state => state.loading,
      errors : state => state.errors
    }),

    ...mapGetters({
      paps: "paps/getPaps", 
      pap: "paps/getPap",
      bailleurs: "bailleurs/getBailleurs",
      currentUser : 'auths/GET_AUTHENTICATE_USER'
    })
    
  },

  methods: {
    //Charger les fonctions de communication avec le serveur
    ...mapMutations({
      setErrors: 'SET_ERRORS_MESSAGE', // map `this.setErrors()` to `this.$store.commit('SET_ERRORS_MESSAGE')`,
      setPap: 'paps/FILL' // map `this.CREATE_INSTANCE_PAP()` to `this.$store.commit('CREATE_INSTANCE_PROJET')`
    }),

    ...mapActions('paps', {
      fetchPaps: "FETCH_LIST_PAP",
      savePap: "STORE_PAP",
      updatePap: "UPDATE_PAP",
      deletePap: "DESTROY_PAP"
    }),

    ...mapActions('bailleurs', { fetchBailleurs: 'FETCH_LIST_BAILLEUR' }),

    addAno() {
      this.title = 'Ajouter un element'
      this.showModal = true
    },

    
    
    close() {
      this.showCloseModal()

      this.resetForm
    }, 
    
    showCloseModal(value = false) {
      this.showModal = value
    },
    addPap() {
      this.title='Ajouter un nouveau pap'

      let formData = this.champs.map((value) => {
          if(value.key === 'bailleurId'){ 
            value['options'] = this.bailleurs
          }

          return value
        })

      this.champs = formData

      this.showCloseModal(true)
    },

    async supprimer(pap) {
      if(window.confirm("Voulez-vous supprimer ce pap " + pap.nom + ' '+ pap.prenoms))
        await this.deletePap(pap.id)
    },

    resetForm(){

      this.champs = this.champs.map(item => { item.data = ''; return item})
      
      window.document.getElementById('vform').reset()

      this.pap = {}
    },
    close() {
        this.showCloseModal();

        this.resetForm();
      },

    async updateInputData(id, attribut, value) {
        
          await this.updatePap({pap: {[attribut] : value}, id : id}).catch((value, status) => {
            if(this.hasErrors[attribut] !== undefined)
              alert(this.hasErrors[attribut])            
          }).finally(() => {
            $('#' + "dataTable").load(location.href + '#' + id + '>*', '')
          })

    },

    sendForm() {

      console.log(this.champs)

      this.champs = this.champs.map(item => { item.errors = []; return item})

      let pap = extractFormData(this.champs, this.papAttributs)

      pap.programmeId = this.currentUser?.programme?.id

      pap.bailleurId = pap.bailleurId.id

      console.log(pap)
      
      if(this.pap?.id)
      {

        this.updatePap({pap: pap, id : this.pap?.id}).then(response => {
          
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
      
        this.savePap(pap).then(response => {
          if(response.status == 200 || response.status == 201){
              this.close()
          }

        })
      }

    },
    
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
    console.log("Fetching paps ...")
    this.fetchPaps({id : this.currentUser?.programme?.id}).then((value) => {
        setTimeout(() => {
          console.log("Fetching list of bailleurs...")
          this.fetchBailleurs()
        }, 500);
    })
  }
}
</script>

<style>

</style>