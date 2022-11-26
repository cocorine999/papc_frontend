<template>
  <dashboard>
    <div class="w-full">
    <div v-if="showModal">
      <modal-top-right  :title="title"  v-on:close="close">
         <div class="w-full">
            <vform
              template="default"
              :champs="champs"
              cols="1"
              :submitText="submitText"
              @sendForm="sendForm"
              @closeModal="close" 
            ></vform>
        </div>
      </modal-top-right>
    </div>
    <div v-if="showModal2">
        <vmodal  title="Importez les données "  v-on:close="showModal2 = false">
          <form @submit.prevent="importData" style="width:500px" class="">
            <input class="block w-full text-xs md:text-sm text-gray-900 bg-gray-50  border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 placeholder:text-xs md:placeholder:text-sm" aria-describedby="file_input_help" id="file_input" @change="previewFiles"   accept=".csv"  type="file">
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
    <nav class="mb-2 mt-4 text-sm font-semibold flex justify-between items-center 	" aria-label="Breadcrumb">
      <div>
        <ol class="inline-flex p-0 list-none">
          <li class="flex items-center ">
            <router-link to="#" class="text-gray-600">dashboard</router-link>
            <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
          </li>
          
          <li class="flex items-center text-blue-500 ">
            <router-link to="" class="">sinistre</router-link>
          </li>
        </ol>
      </div>
      <div>
        <search-bar ></search-bar>
      </div>
    </nav>
    
      <div class="my-2 flex justify-between items-center ">
        <titre>les sinistres</titre>
        <button  @click="showModal2 = true" title="exporter en excel"   class="py-2 flex space-x-3 items-center px-4 overflow-hidden  space-x-2 items-center text-xs font-semibold text-white uppercase bg-blue-500 focus:outline-none focus:shadow-outline">
            <svg  stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path d="m12 18 4-5h-3V2h-2v11H8z"></path><path d="M19 9h-4v2h4v9H5v-9h4V9H5c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-9c0-1.103-.897-2-2-2z"></path></svg>
            <span class="mx-2 text-xs  md:text-sm font-semibold">Importez les données</span>
        </button>
        <button  @click="addSinistre" title="ajouter un sinistre"   class="py-2 px-4  overflow-hidden flex items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
          <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg></span>
          <span class="mx-2 text-xs  md:text-sm font-semibold">ajouter un sinistre</span>
        </button>
      </div>

      <vtable :headers="headers" :datas="sinistres" :actions="actions" @updateInputData="updateInputData" @supprimer="supprimer"></vtable>
     </div>
  </dashboard>
</template>

<script>
import ModalTopRight from '@/components/ModalTopRight'
import SearchBar from '@/components/SearchBar'
import Titre from '@/components/Titre'
import Vmodal from '@/components/Vmodal'
import Vform from '@/components/Vform'
import Dashboard from '@/layouts/Dashboard'
import Vtable from '@/components/Vtable'
import { mapGetters, mapMutations, mapActions } from "vuex"
import extractFormData from "@/utils/extract-data"
export default {
  components: {
    Dashboard,
    Vmodal,
    Titre,
    SearchBar,
    ModalTopRight,
    Vform,
    Vtable,
  },
  data() {
      return ({
        showModal:false,
        sinistreAttributes: ["nom","prenoms","contact","annee"],
        submitText: 'Enrégistrer',
        champs: [
          {name:'Nom',type:'text',key:'nom',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true, errors : []},
          {name:'Prenoms',key:'prenoms',type:'text',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true, errors : []},
          {name:'contact',key:'contact',type:'text',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true, errors : []},
          {name:'année',key:'annee',type:'text',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true, errors : []},
        ],
        headers:[
          {name:'Nom',cle:'nom'},
          {name:'Prenoms',cle:'prenoms'},
          {name:'Contact',cle:'Contact'},
          {name:'Annee',cle:'annee'},
          {name:'Date de creation',cle:'created_at'},
        ],
        
        actions:[
          {name:'modifier',iconne:''},
          {name:'supprimer',iconne:''},
        ]
      });
    },
    computed: {
    ...mapGetters({
      hasErrors: "GET_ERREURS",
      isLoading: "IS_LOADING",
      sinistre: "sinistres/getSinistre",
      sinistres: "sinistres/getSinistres",
    }),
  },
  methods: {
      ...mapMutations({
        setErrors: "SET_ERRORS_MESSAGE", // map `this.setErrors()` to `this.$store.commit('SET_ERRORS_MESSAGE')`,
        setSinistre: "sinistres/FILL", // map `this.CREATE_INSTANCE_PROGRAMME()` to `this.$store.commit('CREATE_INSTANCE_PROGRAMME')`
      }),

      ...mapActions("sinistres", {
        fetchSinistre: "FETCH_LIST_SINISTRE",
        saveSinistre: "STORE_SINISTRE",
        updateSinistre: "UPDATE_SINISTRE",
        deleteSinistre: "DESTROY_SINISTRE",
        importSinistre: "IMPORTATION_SINISTRE",
      }),

      addSinistre() {
        this.title = "Ajouter un sinistre";
        this.submitText = "Enrégistrer";
        this.showCloseModal(true);
      },
      close() {
        this.showCloseModal();
        this.resetForm();
      },
      showCloseModal(value = false) {
        this.showModal = value;
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
      sendForm() {
      this.champs = this.champs.map((item) => {
        item.errors = [];
        return item;
      });

      let sinistre = extractFormData(this.champs,this.sinistreAttributes);
     
      console.log("les sinistres",sinistre)

      if (this.sinistre?.id) {
        this.updateSinistre({ sinistre: sinistre, id: this.sinistre?.id }).then(
          (response) => {
            if (response.status == 200 || response.status == 201) {
              this.close();
            }
          }
        );
      } else {
        this.saveSinistre(sinistre).then((response) => {
          if (response.status == 200 || response.status == 201) {
            this.close();
          }
        });
      }
    },
    resetForm(){

      this.champs = this.champs.map(item => { item.data = ''; return item})
        
      window.document.getElementById('vform')?.reset()

      this.setSinistre({})
    },

    async updateInputData(id, attribut, value) {
        await this.updateSinistre({sinistre: {[attribut] : value}, id : id}).catch((value, status) => {
          if(this.hasErrors[attribut] !== undefined)
            alert(this.hasErrors[attribut])            
        }).finally(() => {
          $('#' + "dataTable").load(location.href + '#' + id + '>*', '')
        })
    },
    async supprimer(sinistre) {
      if(window.confirm("Voulez-vous supprimer ce sinitre  " + sinistre.nom))
        await this.deleteIndicateur(indicateur.id)
    },


  },

  watch: {
    isLoading: function (value) {
      //this.loading = value
    },

    hasErrors: function (errors) {
      this.champs.forEach((value) => {
        value.errors = errors[value.key];
      });
      //this.errors = errors
    },
  },

  mounted() {
    console.log("Fetching sinistres ...");
    this.fetchSinistre()
  },

}
</script>

<style scoped>

</style>