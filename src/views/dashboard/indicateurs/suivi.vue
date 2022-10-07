<template>
  <dashboard>
     <modal-chat v-if="showComment" title="espace commentaire" v-on:close="closeCommentaire">
        <commentaire  module="suivi" :data="data" :datas="commentaires"></commentaire>
      </modal-chat>
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
            </div>          </div>
          </nav> 
          
          <div v-if="showModal2">
            <modal-top-right  title="Filtre de suivi"  v-on:close="showModal2 = false">
              <div class="px-4">
                <vform template="default" isAllPairSaufDescrip="true" :champs="champsRecherche" :cols="cols" submitText="Rechercher" @sendForm="filtre" ></vform>
              </div>
            </modal-top-right>
          </div>

          <div class="flex items-center justify-between my-4">
            <titre>Le suivi d'evaluation </titre>
            <div v-if="exporterSuivi" class="flex items-center space-x-4">
              <json-excel :data="json_data()" header="INDICATEUR SUIVI" type="xlsx" :name="title_csv()"  >
            <button  title="exporter en excel"   class="py-2  px-4 overflow-hidden  space-x-2 items-center text-xs font-semibold text-white uppercase bg-indigo-500 focus:outline-none focus:shadow-outline">
              <svg class="inline" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path d="M11 16h2V7h3l-4-5-4 5h3z"></path><path d="M5 22h14c1.103 0 2-.897 2-2v-9c0-1.103-.897-2-2-2h-4v2h4v9H5v-9h4V9H5c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2z"></path></svg>
              <span class="mx-2 text-sm font-semibold">Export Excel</span>
            </button>
            </json-excel>
              <button @click="showModal2 = true" title="filtre" class="bg-primary text-white px-2 py-1"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg></button>
            </div>
          </div>
        
          <vtable v-if="currentRole==='bailleur'" @commenter="commenter" :isComment="true"  :actions="actions" :sendRequest="false" :headers="headers" :datas=" suiviBailleurs"  ></vtable>    
          <vtable v-if="commenterSuivi" :headers="headers" @commenter="commenter" :isComment="true"   :sendRequest="false" :datas="filteredSuivis()"  ></vtable>    
          <vtable v-if="!commenterSuivi" :headers="headers"   :sendRequest="false" :datas="filteredSuivis()"  ></vtable>    
        
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
import IndicateurSuiviService from "@/services/modules/indicateur.suivi.service";
import JsonExcel from "vue-json-excel";
import ModalChat from '@/components/ModalChat'
import Commentaire from '@/components/Commentaire.vue'

export default {
  components: {
    Vtable,
    Dashboard,
    Vmodal,
    Vform,
    Titre,
    SearchBar,
    ModalTopRight,
    JsonExcel,
    ModalChat,
    Commentaire
  },
  data() {
      return ({
        suiviAttributes : ['annee', 'trimestre','valeurCible','valeurRealise','indicateurId','commentaire'],
        suiviAttributesRecherche : ['date_debut', 'date_fin', 'trimestre','nom','bailleurId','categorieId'],
        showModal2:false,
       suiviBailleurs:[],
       currentRole:'',
       actions:[{name:''}],
        champsRecherche:[
          {name:'Indicateurs',key:'nom',type:'text',placeholdere:"Selectionnez un indicateur",isSelect:true,isTextArea:false,data:'',required:false,options:['indicateur1','indicateur2','indicateurs3']},
          {name:'Année de base',key:'date_debut',type:'year',placeholdere:"l'année de base",isSelect:false,isTextArea:false,data:'',required:false,},
          {name:'Année',key:'date_fin',type:'year',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:false,},
          {name:'Trimestre',key:'trimestre',type:'',placeholdere:"Selectionnez le trimestre",isSelect:true,isTextArea:false,data:'',required:false,options:[1,2,3,4]},
          {name:'Bailleurs',key:'bailleurId',type:'',placeholdere:"Selectionnez le bailleur",isSelect:true,isTextArea:false,data:'',required:false,options:['BM','BOA']},
          {name:'Categories',key:'categorieId',type:'',placeholdere:"Selectionnez une categorie",isSelect:true,isTextArea:false,data:'',options:['categ1','categ2','categ3'],required:false,}, 
        ],
        cols:2,
        title:'',
        search:'',
        headers:[],
        showComment:false,
        commentaires:[],
        data:'',
        suiviIndicateurVisible:false,
        exporterSuivi:false,
        commenterSuivi:false
        
      });
  },
  watch: {
    isLoading: function (value) {
      //this.loading = value
    },
     indicateurs: function (indicateurs) {
      this.champsRecherche.map((item) => {
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
      this.champsRecherche.forEach((value) => {
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
    ...mapGetters('auths', {currentUser : 'GET_AUTHENTICATE_USER'}),
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
      filter: "FILTRE_SUIVI",
      saveSuivi: "STORE_SUIVI",
      updateSuivi: "UPDATE_SUIVI",
      deleteSuivi: "DESTROY_SUIVI",
    }),
    commenter(data) {
      const commentaires = data.commentaires
      commentaires.forEach(element => {
        const nom = element.auteur.nom
        const message = element.message
        const date = element.date
        this.commentaires.push({nom,message,date})
      });
  
      this.data = data
      this.showComment = true
    },
    suivreIndicateur(data){
      this.showModal = true
      this.title = `Suivre l'indicateur ${data}`
    },
    filteredSuivis(){
        var self = this;
        return this.suivis.filter(function (suivi){
          return suivi.indicateur.nom.toLowerCase().indexOf(self.search.toLowerCase()) >= 0;
        });
    },
    title_csv() {
        return "suivi-indicateur-" +"-" + new Date()
    },

    json_data(){
        let tab = [];
        this.filteredSuivis().forEach(element => {
          tab.push(
            {
              nom: element.indicateur.nom,
              description: element.indicateur.description,
              //bailleur: element.indicateur.bailleur.sigle,
              categorie: element.indicateur.categorie?.nom,
              //unitee_de_mesure: element.indicateur.uniteeDeMesure.nom,
              valeur_de_base: element.indicateur.valeurDeBase,
              annee_de_base: element.indicateur.anneeDeBase,
              trimestre: element.trimestre,
              valeur_cible: element.valeurCible,
              valeur_realise: element.valeurRealise,
            }
          );
        });
        return tab;
    },
    filtre() {
      this.champsRecherche = this.champsRecherche.map((item) => {
        item.errors = [];
        return item;
      });

      let suivi = extractFormData(this.champsRecherche,this.suiviAttributesRecherche);
      suivi.bailleurId = suivi.bailleurId?.id
      suivi.categorieId = suivi.categorieId?.id
      suivi.uniteeMesureId = suivi.uniteeMesureId?.id
      console.log("les suivi",suivi)

      
        this.filter(suivi).then((response) => {
          if (response.status == 200 || response.status == 201) {
            this.close2();
          }
        });
    },
    resetForm(){

      this.champsRecherche = this.champsRecherche.map(item => { item.data = ''; return item})
        
      window.document.getElementById('vform')?.reset()

      this.setIndicateur({})
    },
    getSuiviBailleur() {
      IndicateurSuiviService.getBailleurSuivi().then((data) => {
        this.suiviBailleurs = data.data.data
      }).catch((e) => {
          console.log(e)
      })
    },
    closeCommentaire() {
      this.showComment = false
      this.commentaires = []
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
    close2() {
      this.showCloseModal2();
      this.resetForm();
    },
    showCloseModal(value = false) {
      this.showModal = value;
    },
    showCloseModal2(value = false) {
      this.showModal2 = value;
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
    },
    getPermission() {
      this.currentUser.role[0].permissions.forEach(element => {
        if(element.slug ==='voir-un-suivi-indicateur') {
          this.suiviIndicateurVisible = true
        }
        if(element.slug ==='exporter-un-suivi-indicateur') {
          this.exporterSuivi = true
        }
        if(element.slug ==='commenter-un-suivi-indicateur') {
          this.commenterSuivi = true
        }
           
      });
    },
  },
  mounted() {
    this.getPermission()
    if(!this.suiviIndicateurVisible) {
        this.$router.push('/401-non-autorise')
      } 
    if(this.currentUser != undefined) {
       this.currentRole = this.currentUser.type
       if(this.currentUser.type ==='bailleur') {
           this.getSuiviBailleur()
            const headers = [
          {name:'Indicateur',cle:'nom',props:'indicateur',width:"w-24"},
          {name:'Trimestre',cle:'trimestre',width:"w-24"},
          {name:'valeur cible',cle:'valeurCible',props:'valeurCible',width:"w-28"},
          {name:'valeur realisé',cle:'valeurRealise',width:"w-28"},
          {name:'Date de creation',cle:'created_at',width:"w-24"},
        ]
        this.headers = headers
        }
        else {
          const headers = [
          {name:'Indicateur',cle:'nom',props:'indicateur',width:"w-24"},
          {name:'Trimestre',cle:'trimestre',width:"w-24"},
          {name:'valeur cible',cle:'valeurCible',props:'valeurCible',width:"w-28"},
          {name:'valeur realisé',cle:'valeurRealise',width:"w-28"},
          {name:'Date de creation',cle:'created_at',width:"w-24"},
        ]
        this.headers = headers
        
           this.fetchSuivi().then((value) => {
            setTimeout(() => {
              console.log("Fetching list of suivi...")
              this.fetchIndicateurs()
            }, 100);
          })
        }
      }
   
   
    
  },
}
</script>

<style scoped>

</style>