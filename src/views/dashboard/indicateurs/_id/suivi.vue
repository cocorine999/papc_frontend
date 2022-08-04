<template>
  <dashboard>
    <div class="px-4">
        <nav class="mb-2 text-sm font-semibold flex justify-between items-center " aria-label="Breadcrumb">
          <div>
            <ol class="inline-flex p-0 list-none">
              <li class="flex items-center text-blue-500">
                <router-link to="/dashboard" class="text-gray-600">dashboard</router-link>
                <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
              </li>
              <li class="flex items-center ">
                <router-link to="" class="text-gray-600">Suivi evaluation</router-link>
              </li>
            </ol>
          </div>
          <div>
            <search-bar ></search-bar>
          </div>
        </nav> 
        
        <div v-if="showModal">
          <modal-top-right :title="title"  v-on:close="showModal = false">
          
            <div  class="px-4 overflow-y-auto">
              <form action="" @submit.prevent="sendForm" class="px-4"  >
          
                <div class="my-4">
                  <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light"> Nom de l'activité <span class="px-2 text-lg font-black text-red-700">*</span></label>
                  <select class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent">
                    <option disabled value="0">Année:</option>
                    <option v-for="year in years" :key="year.id" :value="year">{{ year }}</option>
                  </select>
                </div>

              <div class="my-4">
                <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light">Valeur cible <span class="px-2 text-lg font-black text-red-700">*</span></label>
                <input required class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="number" placeholder="" />
              </div>

              <div class="my-4">
                <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light">Valeur Realisé <span class="px-2 text-lg font-black text-red-700">*</span></label>
                <input required class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="number" placeholder="" />
              </div>

              <div class="my-4">
                <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light">Date de suivi <span class="px-2 text-lg font-black text-red-700">*</span></label>
                <input required class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="date" placeholder="" />
              </div>
              
              <div class="my-4">
                <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light"> Selectionnez un trimestre <span class="px-2 text-lg font-black text-red-700">*</span></label>
                <div class="flex justify-between my-3">
                  <div>
                    <input type="radio"  id="T1" name="trimestre" value="T1" >
                    <label class="px-2" for="T1">T1</label>
                  </div>
                  <div>
                    <input type="radio" id="T2" name="trimestre" value="T2">
                    <label class="px-2" for="T2">T2</label>
                  </div>
                  <div>
                    <input type="radio" id="T3" name="trimestre" value="T3">
                    <label class="px-2" for="T3">T3</label>
                  </div>
                  <div>
                    <input type="radio" id="T4" name="trimestre" value="T4">
                    <label class="px-2" for="T4">T4</label>
                  </div>
                </div>
              
                <multiselect v-if="allEntreprise" v-model="value" tag-placeholder="seleectionnez une entreprise" placeholder="selectionnez une entreprise" label="nom" track-by="nom"  :selectLabel="'Appuyez sur Entrée pour sélectionner'" :deselectLabel="'Appuyez sur Entrée pour supprimer'" :options="entreprises" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
              </div>

              

              <div class="my-4">
                <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light">Commentaire <span class="px-2 text-lg font-black text-red-700">*</span></label>
                <textArea class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" rows="3"></textArea>
             </div>
            

            <div class='flex items-center justify-center gap-4 pt-5 pb-5 my-4 md:gap-8'>
              <button type="submit" class='w-auto px-4 py-2 font-medium text-white  shadow-xl bg-blue-500 hover:opacity-80'> 
                Enregistrer 
              </button>

              <button type="submit" class='w-auto px-4 py-2 font-medium text-white  shadow-xl bg-red-500 hover:opacity-80'> 
                Annuler
              </button>

            </div>
              </form>
            </div>
          </modal-top-right>
        </div>

        <div v-if="showModal2">
          <modal-top-right  title="Filtre de suivi"  v-on:close="showModal2 = false">
            <div class="px-4">
              <vform template="default" isAllPairSaufDescrip="true" :champs="champsRecherche" :cols="cols" submitText="Rechercher" @sendForm="filtre" ></vform>
            </div>
          </modal-top-right>
        </div>

        <div class="flex items-center justify-between my-4">
          <titre>Le suivi d'evaluation - indiciateur 2 </titre>
          <div class="flex items-center space-x-4">
            <button @click="showModal2 = true" title="filtre" class="bg-primary text-white px-2 py-1"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg></button>
            <button @click="addSuivi" title="ajouter un indicateur"   class="px-4 py-2 flex overflow-hidden items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
              <span class="mx-2 text-sm font-semibold">ajouter un suivi d'evaluation</span>
            </button>
          </div>
        </div>
       
        <vtable :headers="headers" :datas="suivis" :actions="actions"  @suivre="suivreIndicateur"></vtable>    
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
    ModalTopRight
  },
  data() {
      return ({
        suiviAttributes : ['annee', 'trimestre','valeurCible','valeurRealise','indicateurId','commentaire'],
        showModal:false,
        showModal2:false,
        champs:[
          {name:'Année',type:'number',key:'annee',placeholdere:"Entrez l'année",isSelect:false,isTextArea:false,data:'',required:true,},
          {name:'Valeur cible',key:'valeurCible',type:'number',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,},
          {name:'Valeur realisé',key:'valeurRealise',type:'number',placeholdere:"Valeur de base",isSelect:false,isTextArea:false,data:'',required:true,},
          {name:'Trimestre',key:'trimestre',type:'',placeholdere:"Selectionnez le trimestre",isSelect:true,isTextArea:false,data:'',required:true,options:[{id:1,nom:1},{id:2,nom:2},{id:3,nom:3},{id:4,nom:4}],cle: 'id', value: 'nom',},
          {name:'Indicateurs',key:'indicateurId',type:'',placeholdere:"Selectionnez un indicateur",isSelect:true,isTextArea:false,data:'',required:true,options:this.indicateurs, cle: 'id', value: 'nom',errors : []},
          {name:'Commentaire',key:'commentaire',type:'',placeholdere:"commentaire",isSelect:false,isTextArea:true,data:'',required:true,},
        ],
        champsRecherche:[
          {name:'Indicateurs',type:'text',placeholdere:"Selectionnez un indicateur",isSelect:true,isTextArea:false,data:'',required:true,options:['indicateur1','indicateur2','indicateurs3']},
          {name:'Année de base',type:'year',placeholdere:"l'année de base",isSelect:false,isTextArea:false,data:'',required:true,},
          {name:'Année',type:'year',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,},
          {name:'Trimestre',type:'',placeholdere:"Selectionnez le trimestre",isSelect:true,isTextArea:false,data:'',required:true,options:[1,2,3,4]},
          {name:'Bailleurs',type:'',placeholdere:"Selectionnez le bailleur",isSelect:true,isTextArea:false,data:'',required:true,options:['BM','BOA']},
          {name:'Categories',type:'',placeholdere:"Selectionnez une categorie",isSelect:true,isTextArea:false,data:'',options:['categ1','categ2','categ3'],required:true,}, 
        ],
        cols:2,
        title:'',
        headers:[
          
          {name:'Trimestre',cle:'trimestre',width:"w-24"},
          {name:'valeur cible',cle:'valeurCible',props:'valeurCible',width:"w-28"},
          {name:'valeur realisé',cle:'valeurRealise',width:"w-28"},
          {name:'Date de creation',cle:'created_at',width:"w-24"},
        ],
       
        actions:[
          {name:'suivre'}
        ],

      });
  },
  watch: {
    isLoading: function (value) {
      //this.loading = value
    },
     indicateurs: function (indicateurs) {
      this.champs.map((item) => {
        if (item.key === "indicateurId") {
          item.options = indicateurs.map((indicateur) => {
            return {
              id: indicateur.id,
              nom: indicateur.nom,
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
      indicateurs: "indicateurs/getIndicateurs",
      suivis: "suiviIndicateurs/getSuivis",
      suivi: "suiviIndicateurs/getSuivi",
    }),
    years () {
      const year = new Date().getFullYear()+20
      return Array.from({length: year - 1900}, (value, index) => year + index)
    }
    
  },
  
  methods: {
    ...mapMutations({
      setErrors: "SET_ERRORS_MESSAGE", // map `this.setErrors()` to `this.$store.commit('SET_ERRORS_MESSAGE')`,
      setSuivis: "suiviIndicateurs/FILL", // map `this.CREATE_INSTANCE_PROGRAMME()` to `this.$store.commit('CREATE_INSTANCE_PROGRAMME')`
    }),
     ...mapActions("indicateurs", {
      fetchIndicateurs: "FETCH_LIST_INDICATEUR",
    }),
    ...mapActions("suiviIndicateurs", {
      fetchSuivi: "FETCH_LIST_SUIVI",
      saveSuivi: "STORE_SUIVI",
      updateSuivi: "UPDATE_SUIVI",
      deleteSuivi: "DESTROY_SUIVI",
    }),
    suivreIndicateur(data){
      this.showModal = true
      this.title = `Suivre l'indicateur ${data}`
    },
    sendForm() {
      this.champs = this.champs.map((item) => {
        item.errors = [];
        return item;
      });

      let suivi = extractFormData(this.champs,this.suiviAttributes);
      suivi.trimestre = suivi.trimestre.id
      suivi.indicateurId = suivi.indicateurId.id
      suivi.valeurCible = [suivi.valeurCible]
      suivi.valeurRealise = [suivi.valeurRealise]
    
     

      if (this.suivi?.id) {
        this.updateSuivi({ suivi: suivi, id: this.suivi?.id }).then(
          (response) => {
            if (response.status == 200 || response.status == 201) {
              this.close();
            }
          }
        );
      } else {
        this.saveSuivi(suivi).then((response) => {
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
        await this.updateSuivi({suivi: {[attribut] : value}, id : id}).catch((value, status) => {
          if(this.hasErrors[attribut] !== undefined)
            alert(this.hasErrors[attribut])            
        }).finally(() => {
          $('#' + "dataTable").load(location.href + '#' + id + '>*', '')
        })
    },

    async supprimer(suivi) {
      if(window.confirm("Voulez-vous supprimer cette unitee de gestion  " + suivi.nom))
        await this.deleteSuivi(suivi.id)
    },

    close() {
      this.showCloseModal();
      this.resetForm();
    },
    showCloseModal(value = false) {
      this.showModal = value;
    },
    addSuivi() {
        this.title ='Creer un suivi'
        this.showModal = true
      },
      modifier() {
        this.title ='Modifier un suivi'
        this.showModal = true
      },
      supprimer(data) {
        alert(data+" à ete bien supprimer")
      },
      dupliquer() {
        this.title ='Dupliquer un suivi'
        this.showModal = true
      }
  },
  mounted() {
    this.fetchSuivi().then((value) => {
      setTimeout(() => {
        console.log("Fetching list of suivi...")
        this.fetchIndicateurs()
      }, 100);
    })
   
    
  },
}
</script>

<style scoped>

</style>