<template>
<dashboard>
  <div v-if="papVisible" class="px-4">
    <div v-if="showModal">
      <ModalTopRight :title="title"  v-on:close="showModal = false">
        <div  class="px-4 overflow-y-auto">
          <vform template="default" isAllPairSaufDescrip="true" :champs="champs" :cols="cols" submitText="Creer un pap" @sendForm="sendForm" ></vform>
        </div>
      </ModalTopRight>
    </div>
    <div v-if="showModal2">
        <vmodal  title="Importez les données "  v-on:close="showModal2 = false">
          <form @submit.prevent="importData" style="width:500px" class="">
            <input class="block w-full text-sm text-gray-900 bg-gray-50  border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" @change="previewFiles"   accept=".xlsx"  type="file">
            <p class="my-4 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">FORMAT XLSX SEULEMENT AUTORISE </p>
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
           </div>
    </nav>

    <div class="flex items-center justify-between my-2">
      
      <div class="flex space-x-4">
        <span  class="inline-block cursor-pointer  border-b-8 font-bold text-sm uppercase    border-primary py-2">Tableau recapitulatif </span> 
      </div>
      <button  @click="showModal2 = true" title="exporter en excel"   class="py-2 flex space-x-3 items-center px-4 overflow-hidden  space-x-2 items-center text-xs font-semibold text-white uppercase bg-blue-500 focus:outline-none focus:shadow-outline">
            <svg  stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path d="m12 18 4-5h-3V2h-2v11H8z"></path><path d="M19 9h-4v2h4v9H5v-9h4V9H5c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-9c0-1.103-.897-2-2-2z"></path></svg>
            <span class="mx-2 text-sm font-semibold">Importez les données</span>
      </button>
      <button v-if="papAdd" @click="addPap" title="ajouter un tabelau"  class="py-2 px-4 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase bg-primary focus:outline-none focus:shadow-outline">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
        <span class="mx-2 text-xs font-semibold">Ajouter </span> 
      </button>
    </div>
    
     <vtable v-if="papDelete && papUpdate" :headers="headers" :datas="filteredPap()" :actions="actions" @supprimer="supprimer" @updateInputData="updateInputData"></vtable>
     <vtable v-if="!papDelete && papUpdate" :headers="headers" :datas="filteredPap()"   @updateInputData="updateInputData"></vtable>
     
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
      showModal2:false,
      loading:false,
      showInput:true,
      title:'',
      sexe: [
        {
          sigle: 'M',
          nom: 'Masculin'
        },
        {
          sigle: 'F',
          nom: 'Feminin'
        }
      ],
      search:'',
      papAttributs : ['nom', 'rue', 'longitude', 'latitude', 'sexe', 'contact', 'siteId', 'montant', 'payer', 'referencePieceIdentite', 'statut', 'modeDePaiement'],
      champs:[
        {name:' N° Rue', key:'rue',type:'text',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,errors : []},
        {name:' Longitude', key:'longitude',type:'text',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,errors : []},
        {name:' Latitude', key:'latitude',type:'text',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,errors : []},
        {name:'Site', key:'siteId',type:'',placeholdere:"Selectionnez un site",isSelect:true,isTextArea:false,data:'',options:this.sites, cle: 'id', value: 'nom',required:true,errors : []},
        {name:' Nom et prenoms', key:'nom',type:'text',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,errors : []},
        {name:'Sexe', key:'sexe',type:'',placeholdere:"Selectionnez le sexe",isSelect:true,isTextArea:false,data:'',options:this.sexe, cle: 'sigle', value: 'nom',required:true,errors : []},
        {name:' Contact ', key:'contact',type:'text',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,errors : []},
        {name:'Référence Pièces identité', key:'referencePieceIdentite',type:'text',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,errors : []},
        {name:'Statut', key:'statut',type:'text',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,errors : []},
        {name:'Mode de paiement', key:'modeDePaiement',type:'text',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,errors : []},
        {name:' Indeminisation', key:'montant',type:'number',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,errors : []},
        {name:' Transféré', key:'payer',type:'number',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,errors : []},
        
      ],
      cols:2,
      headers:[
        {name:'N° Rue',cle:'rue'},
        {name:'Longitude',cle:'longitude'},
        {name:'Latitude',cle:'latitude'},
        {name:'Site',cle:'site'},
        {name:'Nom et prenom',cle:'nom'},
        {name:'Sexe',cle:'sexe'},
        {name:'Contact',cle:'contact'},
        {name:'Reference Pieèce Identite',cle:'referencePieceIdentite'},
        {name:'Statut',cle:'statut'},
        {name:'Mode de paiement',cle:'modeDePaiement'},
        {name:'Indeminisation',cle:'montant'},
        {name:'Transféré',cle:'payer'},
      ],
      actions:[
        {name:'supprimer',iconne:''},
      ],
      papVisible:false,
      papAdd:false,
      papDelete:false,
      papUpdate:false,
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
      sites: "sites/getSites",
      currentUser : 'auths/GET_AUTHENTICATE_USER'
    }),
     ...mapGetters('auths', {currentUser : 'GET_AUTHENTICATE_USER'})
    
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
      deletePap: "DESTROY_PAP",
      importSinistre: "IMPORTATION_PAP"
    }),

    ...mapActions('sites', { fetchSites: 'FETCH_LIST_SITE' }),

    addAno() {
      this.title = 'Ajouter un element'
      this.showModal = true
    },

    getPermission() {
         this.currentUser.role[0].permissions.forEach(element => {
            if(element.slug ==='voir-un-pap') {
              this.papVisible = true
            }
            if(element.slug === 'creer-un-pap') {
              this.papAdd = true
            }
            if(element.slug === 'modifier-un-pap') {
              this.papUpdate = true
            }
            if(element.slug ==='supprimer-un-pap') {
              this.papDelete = true
            }
           
          });

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
          if(value.key === 'siteId'){ 
            value['options'] = this.sites
          }

          else if(value.key === 'sexe'){ 
            value['options'] = this.sexe
          }


          return value
        })

      this.champs = formData

      this.showCloseModal(true)
    },

    importData() {
  
      const formData = new FormData();
      formData.append('fichier', this.file);
      this.importSinistre(formData).then((data) => {
      
        this.$toast.success("importation reussie")
      }).catch((e) => {
        this.$toast.error(e)
      })
     
    },

    filteredPap(){
        var self = this;

        return this.paps.sinistres.filter(function (pap){
          return pap.site.toLowerCase().indexOf(self.search.toLowerCase()) >= 0 ||
                 pap.sexe.toLowerCase().indexOf(self.search.toLowerCase()) >= 0 ||
                 pap.nom.toLowerCase().indexOf(self.search.toLowerCase()) >= 0;
        });
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

      pap.siteId = pap.siteId.id

      pap.sexe = pap.sexe.sigle

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
    this.getPermission()
    this.fetchPaps({id : this.currentUser?.programme?.id}).then((value) => {
        setTimeout(() => {
          console.log("Fetching list of sites...")
          this.fetchSites(this.currentUser?.programme?.id)
        }, 500);
    })
  }
}
</script>

