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
              <router-link to="" class="text-gray-600">Indicateurs</router-link>
            </li>
          </ol>
        </div>
        <div>
          <search-bar ></search-bar>
        </div>
      </nav> 

      <div v-if="showModal">
        <modal-top-right :title="title"  v-on:close="close">
          <div  class="px-4 overflow-y-auto">
            <div v-if="title =='Modifier un indicateur'">
              <vform template="default" isAllPairSaufDescrip="true" :champs="champs" :cols="cols" submitText="Modifier" @sendForm="sendForm"   @closeModal="close"  ></vform>
            </div>
            <div v-if="title =='Ajouter un indicateur'">
              <vform template="default" isAllPairSaufDescrip="true" :champs="champs" :cols="cols" submitText="Ajouter" @sendForm="sendForm"   @closeModal="close"  ></vform>
            </div>
            <div v-if="title =='Dupliquer un indicateur'">
              <vform template="default" isAllPairSaufDescrip="true" :champs="champs" :cols="cols" submitText="Creer à partir de "   @closeModal="close"  @sendForm="sendForm" ></vform>
            </div>
          </div>
        </modal-top-right>
      </div>

      <div v-if="showModal2">
        <vmodal  title="Filtre indicateur"  v-on:close="showModal2 = false">
          <div class="px-12" style="width:80vw !important">
            <vform template="default" isAllPairSaufDescrip="true" :champs="champsRecherche" :cols="cols" submitText="Rechercher" @sendForm="filtre" ></vform>
          </div>
        </vmodal>
      </div>

      <div class="flex items-center justify-between">
        <titre>Les indicateurs </titre>
        <div class="flex items-center space-x-4">
          <button @click="showModal2 = true" title="filtre" class="bg-primary text-white px-2 py-1"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg></button>
          <button @click="addIndicateur" title="ajouter un indicateur"   class="px-4 py-2 flex overflow-hidden items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
            <span class="mx-2 text-sm font-semibold uppercase">ajouter un indicateur</span>
          </button>
          <router-link to="/dashboard/indicateurs/suivi"  title="voir suivi"   class="px-4 py-2 overflow-hidden items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
            <span  class="mx-2 text-sm font-semibold uppercase ">Voir suivi indicateur</span>
          </router-link>
        </div>
      </div>
     
      <vtable :headers="headers" :datas="indicateurs" :actions="actions" @updateInputData="updateInputData" @consulter="consulterSuivi" @supprimer="supprimer"></vtable>
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
import { mapGetters, mapMutations, mapActions } from "vuex";
import extractFormData from "@/utils/extract-data";
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
      return ({
        showModal:false,
        showModal2:false,
        loading:false,
        title:'',
        indicateurAttributs : ['nom', 'description', 'anneeDeBase', 'valeurDeBase','bailleurId','categorieId','uniteeMesureId'],
        champs:[
          {name:'Nom',type:'text',key:'nom',placeholdere:"Nom de l'indicateur",isSelect:false,isTextArea:false,data:'',required:true, errors : []},
          {name:'Année de base',key:'anneeDeBase',type:'year',placeholdere:"l'année de base",isSelect:false,isTextArea:false,data:'',required:true, errors : []},
          {name:'Valeur de base',key:'valeurDeBase',type:'number',placeholdere:"Valeur de base",isSelect:false,isTextArea:false,data:'',required:true, errors : []},
          {name:'Unite de mesure',key:'uniteeMesureId',type:'',placeholdere:"Selectionnez une unité de mesure",isSelect:true,isTextArea:false,data:'',options:this.uniteDeMesure,required:true,cle: 'id', value:'nom',errors : []},
          {name:'Categories',key:'categorieId',ntype:'',placeholdere:"Selectionnez une categorie",isSelect:true,isTextArea:false,data:'',options:this.categories,required:true, cle: 'id', value: 'nom', errors : []},
          {name:'Bailleurs',key:'bailleurId',type:'',placeholdere:"Selectionnez le bailleur",isSelect:true,isTextArea:false,data:'',required:true,options:this.bailleurs, cle: 'id', value: 'sigle',errors : []},
          {name:'Description',key:'description',type:'',placeholdere:"Description",isSelect:false,isTextArea:true,data:'',required:true,},
        ],
        cols:2,
        champsRecherche:[
          {name:'Indicateurs',type:'text',placeholdere:"Selectionnez un indicateur",isSelect:true,isTextArea:false,data:'',required:true,options:['indicateur1','indicateur2','indicateurs3']},
          {name:'Année de base',type:'year',placeholdere:"l'année de base",isSelect:false,isTextArea:false,data:'',required:true,},
          {name:'Categories',type:'',placeholdere:"Selectionnez une categorie",isSelect:true,isTextArea:false,data:'',options:['categ1','categ2','categ3'],required:true,},
          {name:'Bailleurs',type:'',placeholdere:"Selectionnez le bailleur",isSelect:true,isTextArea:false,data:'',required:true,options:['BM','BOA']},
          
        ],
        headers:[],
        
        actions:[
          {name:'consulter',iconne:''},
          {name:'supprimer',iconne:''},
        ]

      });
  },
  watch: {
    isLoading: function (value) {
      //this.loading = value
    },
    
    bailleurs: function (bailleurs) {
      this.champs.map((item) => {
        if (item.key === "bailleurId") {
          item.options = bailleurs.map((bailleur) => {
            return {
              id: bailleur.id,
              sigle: bailleur.sigle,
            };
          });
        }
        return item;
      });
    },
    categories: function (categories) {
      this.champs.map((item) => {
        if (item.key === "categorieId") {
          item.options = categories.map((categorie) => {
            return {
              id: categorie.id,
              nom: categorie.nom,
            };
          });
        }
        return item;
      });
    },
    uniteDeMesure: function (uniteDeMesure) {
      this.champs.map((item) => {
        if (item.key === "uniteeMesureId") {
          item.options = uniteDeMesure.map((unite) => {
            return {
              id: unite.id,
              nom: unite.nom,
            };
          });
        }
        return item;
      });
    },
    hasErrors: function (errors) {
      this.champs.forEach((value) => {
        value.errors = errors[value.key];
      });
      //this.errors = errors
    },
  },
  
  computed: {
    ...mapGetters({
      hasErrors: "GET_ERREURS",
      isLoading: "IS_LOADING",
      indicateur: "indiateurs/getIndicateur",
      indicateurs: "indicateurs/getIndicateurs",
      categories: "categories/getCategorie",
      bailleurs: "bailleurs/getBailleurs",
      categories: "categories/getCategories",
      uniteDeMesure:"uniteesDeMesure/getUniteesDeMesure",
    }),
  },
  methods: {
    ...mapMutations({
      setErrors: "SET_ERRORS_MESSAGE", // map `this.setErrors()` to `this.$store.commit('SET_ERRORS_MESSAGE')`,
      setIndicateur: "indicateurs/FILL", // map `this.CREATE_INSTANCE_PROGRAMME()` to `this.$store.commit('CREATE_INSTANCE_PROGRAMME')`
    }),

    ...mapActions("indicateurs", {
      fetchIndicateurs: "FETCH_LIST_INDICATEUR",
      saveIndicateur: "STORE_INDICATEUR",
      updateIndicateur: "UPDATE_INDICATEUR",
      deleteIndicateur: "DESTROY_INDICATEUR",
    }),
    ...mapActions("bailleurs", {
      fetchBailleurs: "FETCH_LIST_BAILLEUR",
    }),
    ...mapActions("categories", {
      fetchCategories: "FETCH_LIST_CATEGORIE",
    }),
     ...mapActions("uniteesDeMesure", {
      fetchUnite: "FETCH_LIST_UNITEE_DE_MESURE",
    }),
    consulterSuivi(id){
      this.$router.push({name:'indicateurs_suivi',params:{id:id}})
    },
    sendForm() {
      this.champs = this.champs.map((item) => {
        item.errors = [];
        return item;
      });

      let indicateur = extractFormData(this.champs,this.indicateurAttributs);
      indicateur.bailleurId = indicateur.bailleurId.id
      indicateur.categorieId = indicateur.categorieId.id
      indicateur.uniteeMesureId = indicateur.uniteeMesureId.id
      console.log("les indicateurs",indicateur)

      if (this.indicateur?.id) {
        this.updateIndicateur({ indicateur: indicateur, id: this.indicateur?.id }).then(
          (response) => {
            if (response.status == 200 || response.status == 201) {
              this.close();
            }
          }
        );
      } else {
        this.saveIndicateur(indicateur).then((response) => {
          if (response.status == 200 || response.status == 201) {
            this.close();
          }
        });
      }
    },
    resetForm(){

      this.champs = this.champs.map(item => { item.data = ''; return item})
        
      window.document.getElementById('vform')?.reset()

      this.setIndicateur({})
    },

    async updateInputData(id, attribut, value) {
        await this.updateIndicateur({indicateur: {[attribut] : value}, id : id}).catch((value, status) => {
          if(this.hasErrors[attribut] !== undefined)
            alert(this.hasErrors[attribut])            
        }).finally(() => {
          $('#' + "dataTable").load(location.href + '#' + id + '>*', '')
        })
    },
    async supprimer(indicateur) {
      if(window.confirm("Voulez-vous supprimer cette unitee de gestion  " + indicateur.nom))
        await this.deleteIndicateur(indicateur.id)
    },
    close() {
      this.showCloseModal();
      this.resetForm();
    },
    showCloseModal(value = false) {
      this.showModal = value;
    },
    addIndicateur() {
      this.title ='Ajouter un indicateur'
      this.showModal = true
    },
    modifier() {
        this.title ='Modifier un indicateur'
        this.showModal = true
    },

    
      
      
  },

   mounted() {
    this.fetchIndicateurs().then((value) => {
      setTimeout(() => {
        console.log("Fetching list of programmes...")
        this.fetchBailleurs()
        this.fetchCategories()
        this.fetchUnite()
        this.headers = [
          {name:'Indicateur',cle:'nom',},
          {name:'description',cle:'description'},
          {name:'Bailleur',cle:'sigle',props:'bailleur',select:true,options:this.bailleurs,key:'sigle',updateKey:'bailleurId'},
          {name:'Categorie',cle:'nom',props:'categorie',select:true,options:this.categories,key:'nom',updateKey:'categorieId'},
          {name:'Unité de mesure',cle:'nom',props:'uniteeDeMesure',select:true,options:this.uniteDeMesure,key:'nom',updateKey:'uniteeMesureId'},
          {name:'Valeur de base',cle:'valeurDeBase'},
          {name:'Année de base',cle:'anneeDeBase'},
          {name:'Date de creation',cle:'created_at'},
        ]

      }, 100);
    })
  },
}
</script>

<style scoped>

</style>