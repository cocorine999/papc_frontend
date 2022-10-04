<template>
  <dashboard>
    <div class="px-4">
      <nav class="mb-2 mt-4 text-sm font-semibold flex justify-between items-center " aria-label="Breadcrumb">
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
        </div>
      </nav> 

      <div v-if="showSuiviModal">
        <modal-top-right :title="title"  v-on:close="showSuiviModal = false">
            <div  class="px-4 overflow-y-auto">
              <form action="" @submit.prevent="saveSuivi" class="px-4"  >
          
                <div class="my-4">
                 
                  <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light"> l'année suivi <span class="px-2 text-lg font-black text-red-700">*</span></label>

                   <input v-model="suiviIndicateurs.annee"  @change="verifyValeurCible(suiviIndicateurs.annee)" required class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="number" placeholder="" />
                </div>

              <div v-if="isValeurCibleUse" class="my-4">
                
                <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light">Valeur cible <span class="px-2 text-lg font-black text-red-700">*</span></label>
                <input v-model="suiviIndicateurs.valeurCible" required class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="number" placeholder="" />
              </div>

              <div class="my-4">
               
                <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light">Valeur Realisé <span class="px-2 text-lg font-black text-red-700">*</span></label>
                <input v-model="suiviIndicateurs.valeurRealise" required class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="number" placeholder="" />
              </div>

              <div class="my-4">
                <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light"> Suivi par date ou par trimestre ? <span class="px-2 text-lg font-black text-red-700">*</span></label>
                <div class="flex justify-between my-3">
                  <div>
                    <input type="radio" :checked="choiceDateOption"  @click="choiceDateOption= true" id="date" name="choix" value="date" >
                    <label class="px-2" for="all">Par date</label>
                  </div>
                  <div>
                    <input type="radio" @click="choiceDateOption= false" id="trimestre" name="choix" value="trimestre">
                    <label class="px-2" for="sauf">Par trimestre</label>
                  </div>
                </div>

                <div v-if="choiceDateOption" class="my-4">
                  <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light">Date de suivi <span class="px-2 text-lg font-black text-red-700">*</span></label>
                  <input v-model="suiviIndicateurs.dateSuivie" required class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="date" placeholder="" />
                </div>
              
              <div v-else class="my-4">
                <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light"> Selectionnez un trimestre <span class="px-2 text-lg font-black text-red-700">*</span></label>
                <div class="flex justify-between my-3">
                  <div>
                    <input v-model="suiviIndicateurs.trimestre" type="radio"  id="T1" name="trimestre" value="1" >
                    <label class="px-2" for="T1">T1</label>
                  </div>
                  <div>
                    <input type="radio" v-model="suiviIndicateurs.trimestre" id="T2" name="trimestre" value="2">
                    <label class="px-2" for="T2">T2</label>
                  </div>
                  <div>
                    <input type="radio" v-model="suiviIndicateurs.trimestre" id="T3" name="trimestre" value="3">
                    <label class="px-2" for="T3">T3</label>
                  </div>
                  <div>
                    <input type="radio" v-model="suiviIndicateurs.trimestre" id="T4" name="trimestre" value="4">
                    <label class="px-2" for="T4">T4</label>
                  </div>
                </div>

              </div>
          </div>
              <div class="my-4">
                <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light">Commentaire <span class="px-2 text-lg font-black text-red-700">*</span></label>
                <textarea v-model="suiviIndicateurs.commentaire" class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" rows="3"></textarea>
             </div>
            
              <div class="py-2 my-4 flex justify-center space-x-8">
                <button type="submit" class="bg-primary  flex space-x-2  items-center text-white px-4 py-2 border border-primary font-semibold uppercase">
                  <span class="text-sm font-semibold uppercase" v-if="!chargement">
                    enregistrer
                  </span>
                  <span v-else class="flex items-center space-x-2">
                    <span class="text-xs px-4 font-semibold ">
                      envoi ...
                    </span>
                    <svg  xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-center animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </span>
                </button>
                <vbutton type="reset" template="danger" @close="close"> annuler </vbutton>
              </div>
              </form>
            </div>
        </modal-top-right>
      </div>

      <div v-if="showModal">
        <modal-top-right :title="title"  v-on:close="close">
          <div  class="px-4 overflow-y-auto">
            <div v-if="title =='Modifier un indicateur'">
              <vform template="default" isAllPairSaufDescrip="true" :sendRequest="sendRequest" :champs="champs" :cols="cols" submitText="Modifier" @sendForm="sendForm"   @closeModal="close"  ></vform>
            </div>
            <div v-if="title =='Ajouter'">
              <vform template="default" isAllPairSaufDescrip="true" :sendRequest="sendRequest" :champs="champs" :cols="cols" submitText="Ajouter" @sendForm="sendForm"   @closeModal="close"  ></vform>
            </div>
            <div v-if="title =='Dupliquer un indicateur'">
              <vform template="default" isAllPairSaufDescrip="true" :champs="champs" :cols="cols" submitText="Creer à partir de "   @closeModal="close"  @sendForm="sendForm" ></vform>
            </div>
          </div>
        </modal-top-right>
      </div>

      <div v-if="showModal2">
        <vmodal  title="Filtre indicateur"  v-on:close="showModal2 = false">
          <div class="px-4" style="width:40vw !important">
            <vform template="default" isAllPairSaufDescrip="true" :champs="champsRecherche" :cols="cols" submitText="Rechercher" @sendForm="filter" ></vform>
          </div>
        </vmodal>
      </div>

      <div class="flex items-center justify-between">
        <titre>Les indicateurs </titre>
        <div class="flex items-center justify-end  space-x-4 flex-wrap">
            <div class="flex my-1 mr-1" >

                      <json-excel :data="json_data()" header="INDICATEUR" type="xlsx" :name="title_csv()"  >
                    <button  title="exporter en excel"   class="py-2  px-4 overflow-hidden mx-1  space-x-2 items-center text-xs font-semibold text-white uppercase bg-indigo-500 focus:outline-none focus:shadow-outline">
                      <svg class="inline" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path d="M11 16h2V7h3l-4-5-4 5h3z"></path><path d="M5 22h14c1.103 0 2-.897 2-2v-9c0-1.103-.897-2-2-2h-4v2h4v9H5v-9h4V9H5c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2z"></path></svg>
                      <span class="mx-2 text-sm font-semibold">Export Excel</span>
                    </button>
                    </json-excel>
                    <button @click="showModal2 = true" title="filtre"    class="bg-primary text-white px-2 py-1"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg></button>

            </div>
            <div class=" flex flex-wrap justify-end items-center" >
              <button @click="addIndicateur" v-if="indicateurAdd"  title="ajouter un indicateur"   class="px-1 sm:px-4 py-2 ml-0 my-1 mr-1 flex overflow-hidden justify-around items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
                <span class="   text-sm  font-semibold uppercase">ajouter un indicateur</span>
              </button>
              <router-link to="/dashboard/indicateurs/suivi"  title="voir suivi"   class="px-1 sm:px-4 py-2 mr-1 overflow-hidden items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
                <span  class="mx-2 text-sm font-semibold uppercase ">Voir suivi indicateur</span>
              </router-link>
            </div>
        </div>
      </div>
     
      
      <vtable v-if="currentRole == 'bailleur' " :sendRequest="sendRequest" :headers="headers" :datas="indicateurBailleurs" :actions="[{name:'consulter'}]" @consulter="consulterSuivi" @supprimer="supprimer"></vtable>
      <vtable v-if="indicateurUpdate && indicateurDelete " :sendRequest="sendRequest" :headers="headers" :datas="filteredIndicateur()" :actions="actions" @updateInputData="updateInputData" @suivre="suivreIndicateur" @consulter="consulterSuivi" @supprimer="supprimer"></vtable>
      <vtable v-if="!indicateurDelete && indicateurUpdate " :sendRequest="sendRequest" :headers="headers" :datas="filteredIndicateur()"  @updateInputData="updateInputData" @suivre="suivreIndicateur" @consulter="consulterSuivi" @supprimer="supprimer"></vtable>
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
import Vbutton from '@/components/Vbutton'
import Dashboard from '@/layouts/Dashboard'
import CardProgramme from '@/components/CardProgramme'
import { mapGetters, mapMutations, mapActions } from "vuex";
import extractFormData from "@/utils/extract-data";
import SuiviService from "@/services/modules/indicateur.suivi.service.js";
import IndicateurService from "@/services/modules/indicateur.service";
import JsonExcel from "vue-json-excel";
export default {
  components: {
    Vtable,
    Dashboard,
    Vmodal,
    Vbutton,
    Vform,
    Titre,
    SearchBar,
    CardProgramme,
    ModalTopRight,
    JsonExcel
  },
  data() {
    return {
        sendRequest: false,
        suiviIndicateurs:{
          annee:'',
          trimestre:'',
          dateSuivie:'',
          valeurCible:0,
          valeurRealise:0,
          commentaire:'',

        },
        showModal:false,
        showModal2:false,
        showSuiviModal:false,
        loading:false,
        search:"",
        title:'',
        chargement:false,
        indicateurAttributs : ['nom', 'description', 'anneeDeBase', 'valeurDeBase','bailleurId','categorieId','uniteeMesureId'],
        indicateurAttributsRecherche : ['nom', 'anneeDeBase', 'bailleurId','categorieId','uniteeMesureId'],
        choiceDateOption:true,
        champs:[
          {name:'Nom',type:'text',key:'nom',placeholdere:"Nom de l'indicateur",isSelect:false,isTextArea:false,data:'',required:true, errors : []},
          {name:'Année de base',key:'anneeDeBase',type:'year',placeholdere:"l'année de base",isSelect:false,isTextArea:false,data:'',required:true, errors : []},
          {name:'Valeur de base',key:'valeurDeBase',type:'number',placeholdere:"Valeur de base",isSelect:false,isTextArea:false,data:'',required:true, errors : []},
          {name:'Unite de mesure',key:'uniteeMesureId',type:'',placeholdere:"Selectionnez une unité de mesure",isSelect:true,isTextArea:false,data:'',options:this.uniteDeMesure,required:true,cle: 'id', value:'nom',errors : []},
          {name:'Categories',key:'categorieId',type:'',placeholdere:"Selectionnez une categorie",isSelect:true,isTextArea:false,data:'',options:this.categories,required:true, cle: 'id', value: 'nom', errors : []},
          {name:'Bailleurs',key:'bailleurId',type:'',placeholdere:"Selectionnez le bailleur",isSelect:true,isTextArea:false,data:'',required:true,options:this.bailleurs, cle: 'id', value: 'sigle',errors : []},
          {name:'Description',key:'description',type:'',placeholdere:"Description",isSelect:false,isTextArea:true,data:'',required:true,},
        ],
        cols:2,
        champsRecherche:[
          {name:'Indicateur',key:'nom',type:'text',placeholdere:"Donnez un nom d'indicateur",isSelect:false,isTextArea:false,data:'',required:false},
          {name:'Année de base',key:'anneeDeBase',type:'year',placeholdere:"l'année de base",isSelect:false,isTextArea:false,data:'',required:false,},
          {name:'Categories',key:'categorieId',type:'',placeholdere:"Selectionnez une categorie",isSelect:true,isTextArea:false,data:'',options:this.categories,required:true, cle: 'id', value: 'nom',required:false,},
          {name:'Unite de mesure',key:'uniteeMesureId',type:'',placeholdere:"Selectionnez une unité de mesure",isSelect:true,isTextArea:false,data:'',options:this.uniteDeMesure,required:false,cle: 'id', value:'nom',errors : []},
          {name:'Bailleurs',key:'bailleurId',type:'',placeholdere:"Selectionnez le bailleur",isSelect:true,isTextArea:false,data:'',required:false,options:this.bailleurs, cle: 'id', value: 'sigle'},
          
        ],
        headers:[],
        idIndicateur:'',
        isValeurCibleUse:false,
        actions:[
          {name:'suivre'},
          {name:'supprimer',iconne:''},
          {name:'consulter',iconne:''},
        ],
        indicateurBailleurs:'',
        currentRole:'',
        indicateurVisible:false,
        indicateurAdd:false,
        indicateurDelete:false,
        indicateurUpdate:false,
    };
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
      this.champsRecherche.map((item) => {
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
      this.champsRecherche.map((item) => {
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
      this.champsRecherche.map((item) => {
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
    ...mapGetters('auths', {currentUser : 'GET_AUTHENTICATE_USER'})
  },
  methods: {
    ...mapMutations({
      setErrors: "SET_ERRORS_MESSAGE", // map `this.setErrors()` to `this.$store.commit('SET_ERRORS_MESSAGE')`,
      setIndicateur: "indicateurs/FILL", // map `this.CREATE_INSTANCE_PROGRAMME()` to `this.$store.commit('CREATE_INSTANCE_PROGRAMME')`
    }),

    ...mapActions("indicateurs", {
      fetchIndicateurs: "FETCH_LIST_INDICATEUR",
      saveIndicateur: "STORE_INDICATEUR",
      filtre: "FILTRE_INDICATEUR",
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
    getIndicateurBailleurs() {
      IndicateurService.getIndicateurBailleur().then((data) => {
        this.indicateurBailleurs = data.data.data
      }).catch((e) => {
          console.log(e)
      })
    },
    getPermission() {
          this.currentUser.role[0].permissions.forEach(element => {
            if(element.slug ==='voir-un-indicateur') {
              this.indicateurVisible = true
            }
            if(element.slug === 'creer-un-indicateur') {
              this.indicateurAdd = true
            }
            if(element.slug === 'modifier-un-indicateur') {
              this.indicateurUpdate = true
            }
            if(element.slug ==='supprimer-un-indicateur') {
              this.indicateurDelete = true
            }
           
          });
    },
    suivreIndicateur(data){
      this.idIndicateur = data
      this.showSuiviModal = true
      this.title = `Suivre l'indicateur`
    },
    consulterSuivi(id){
      this.$router.push({name:'indicateurs_suivi_details',params:{id:id}})
    },
    saveSuivi() {
      if(this.chargement == false) {
          this.chargement = true
          const data = this.suiviIndicateurs
          data.valeurRealise = [data.valeurRealise]
          data.valeurCible = [data.valeurCible]
          data.indicateurId = this.idIndicateur
          if(this.choiceDateOption == true){
            delete data.trimestre
          }
          else {
            delete data.dateSuivie
          }
         
          SuiviService.create(data).then((data) => {
            this.$toast.success('suivi éffectué')
            this.showSuiviModal = false
            this.chargement = false
          }).catch((e) => {
            this.$toast.error(e)
            this.chargement = false
          }) 
      }
     
      
    },
    title_csv() {
        return "indicateur-" +"-" + new Date()
    },

    json_data(){
        let tab = [];

        this.filteredIndicateur().forEach(element => {
          tab.push(
            {
              nom: element.nom,
              description: element.description,
              bailleur: element.bailleur.sigle,
              categorie: element.categorie?.nom,
              unitee_de_mesure: element.uniteeDeMesure.nom,
              valeur_de_base: element.valeurDeBase,
              annee_de_base: element.anneeDeBase
            }
          );
        });
        return tab;
    },
    verifyValeurCible(date) {
      SuiviService.checksuivi(this.idIndicateur,date).then((data) => {
        //recuperation de la valeur de verfication pour la valeur cible
        this.isValeurCibleUse.data.data.data
      }).catch((e) => {
        console.log(e)
      })
    },
    filteredIndicateur(){
        var self = this;

        return this.indicateurs.filter(function (indicateur){
          return indicateur.bailleur.sigle.toLowerCase().indexOf(self.search.toLowerCase()) >= 0 || 
                 indicateur.bailleur.nom.toLowerCase().indexOf(self.search.toLowerCase()) >= 0 ||
                 indicateur.categorie.nom.toLowerCase().indexOf(self.search.toLowerCase()) >= 0 ||
                 indicateur.uniteDeMesure.nom.toLowerCase().indexOf(self.search.toLowerCase()) >= 0 ||
                 indicateur.nom.toLowerCase().indexOf(self.search.toLowerCase()) >= 0;
        });
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
      if(this.sendRequest ==false) {
        this.sendRequest = true
        if (this.indicateur?.id) {
          this.updateIndicateur({ indicateur: indicateur, id: this.indicateur?.id }).then(
            (response) => {
              if (response.status == 200 || response.status == 201) {
                this.$toast.success('operation effectué avec success')
                this.sendRequest = false
                this.close();
              }
            }
          ).catch((e) => {
            this.$toast.error(e)
            this.sendRequest = false
          })
          } else {
          this.saveIndicateur(indicateur).then((response) => {
            if (response.status == 200 || response.status == 201) {
              this.close();
              his.$toast.success('operation effectué avec success')
              this.sendRequest = false
            }
          }).catch((e) => {
              this.$toast.error(e)
              this.sendRequest = false
            })
        }
      }

     
    },

    filter() {
      this.champsRecherche = this.champsRecherche.map((item) => {
        item.errors = [];
        return item;
      });

      let indicateur = extractFormData(this.champsRecherche,this.indicateurAttributsRecherche);
      indicateur.bailleurId = indicateur.bailleurId?.id
      indicateur.categorieId = indicateur.categorieId?.id
      indicateur.uniteeMesureId = indicateur.uniteeMesureId?.id
      console.log("les indicateurs",indicateur)

      
        this.filtre(indicateur).then((response) => {
          if (response.status == 200 || response.status == 201) {
            this.close2();
          }
        });
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
    addIndicateur() {
      this.title ='Ajouter'
      this.showModal = true
    },
    modifier() {
        this.title ='Modifier un indicateur'
        this.showModal = true
    }
      
      
  },

   mounted() {
     this.getPermission()
      if(this.currentUser != undefined) {
       this.currentRole = this.currentUser.type
       if(this.currentUser.type ==='bailleur') {
         this.getIndicateurBailleurs()
         
         this.headers = [
              {name:'Indicateur',cle:'nom',},
              {name:'description',cle:'description'},
              {name:'Bailleur',cle:'nom',props:'bailleur',select:true,},
              {name:'Categorie',cle:'nom',props:'categorie',select:true},
              {name:'Unité de mesure',cle:'nom',props:'unitee_mesure',select:true},
              {name:'Valeur de base',cle:'valeurDeBase'},
              {name:'Année de base',cle:'anneeDeBase'},
              {name:'Date de création',cle:'created_at'},
            ]
       }
       else {
          this.fetchIndicateurs().then((value) => {
          setTimeout(() => {
            console.log("Fetching list indicateurs...")
            this.fetchBailleurs()
            this.fetchCategories()
            this.fetchUnite()
            this.headers = [
              {name:'Indicateur',cle:'nom',},
              {name:'Description',cle:'description'},
              {name:'Bailleur',cle:'sigle',props:'bailleur',select:true,options:this.bailleurs,key:'sigle',updateKey:'bailleurId'},
              {name:'Catégorie',cle:'nom',props:'categorie',select:true,options:this.categories,key:'nom',updateKey:'categorieId'},
              {name:'Unité de mesure',cle:'nom',props:'uniteeDeMesure',select:true,options:this.uniteDeMesure,key:'nom',updateKey:'uniteeMesureId'},
              {name:'Valeur de base',cle:'valeurDeBase'},
              {name:'Année de base',cle:'anneeDeBase'},
              {name:'Date de création',cle:'created_at'},
            ]

          }, 100);
          })
       }
     }
    
  },
}
</script>

<style scoped>

</style>