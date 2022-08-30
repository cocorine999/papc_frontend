<template>
  <dashboard>
    <div class="p-4">
    <div v-if="showModal">
      <modal-top-right  :title="title"  v-on:close="close">
         <div class="px-4">
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
    <nav class="mb-2 text-sm font-semibold flex justify-between items-center " aria-label="Breadcrumb">
      <div>
        <ol class="inline-flex p-0 list-none">
          <li class="flex items-center ">
            <router-link to="/dashboard" class="text-gray-600">dashboard</router-link>
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
    
      <div class="my-8 flex justify-between items-center ">
        <titre>les sinistres</titre>
        <button  @click="addSinistre" title="ajouter un sinistre"   class="py-2 px-4  overflow-hidden flex items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
          <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg></span>
          <span class="mx-2 text-sm font-semibold">ajouter un sinistre</span>
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