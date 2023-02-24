<template>
  <dashboard>
    <div class="w-full">
      <delete-alert v-if="deleteModal" type="danger" title="Confirm Action" width="sm" v-on:close="deleteModal = false">
      <p class="text-gray-800">
        voulez vous supprimer cet indicateur?
      </p>

      <div class="text-right mt-4">
          <button @click="deleteModal = false" class="px-4 py-2 text-sm text-gray-600 focus:outline-none hover:underline">Annuler</button>
          <button class="mr-2 px-4 py-2 text-sm rounded text-white bg-red-500 focus:outline-none hover:bg-red-400" @click="deleteIndicateur(deleteData)">Supprimer</button>
      </div>
      </delete-alert>
      <nav class="text-xs md:text-sm font-semibold flex flex-wrap justify-between items-center " aria-label="Breadcrumb">
        <div class="mb-2">
          <ol class="inline-flex p-0 list-none">
            <li class="flex items-center text-blue-500">
              <router-link to="" class="text-gray-600">dashboard</router-link>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path
                  d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
              </svg>
            </li>
            <li class="flex items-center ">
              <router-link to="" class="text-gray-600">Indicateurs</router-link>
            </li>
          </ol>
        </div>
        <div>
          <div class="w-full flex text-gray-600">
            <input @input="$emit('search',$event.target.value)"
              class="h-10  w-full px-5 pr-16 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none"
              v-model="search" type="text" name="search" placeholder="Rechercher">
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

        <button>Actualiser</button>
      </nav>

      <div v-if="showSuiviModal">
        <modal-top-right :title="title" v-on:close="showSuiviModal = false">
          <div class="px-4 overflow-y-auto">
            <form action="" @submit.prevent="saveSuivi" class="p-0 w-full">

              <div class="my-4">

                <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light"> l'année suivi
                  <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>

                <input v-model="suiviIndicateurs.annee" @change="verifyValeurCible(suiviIndicateurs.annee)" required
                  class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent"
                  type="number" placeholder="" />
                </div>

              <div v-if="isValeurCibleUse" class="my-true">

                <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light">Valeur cible
                  <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
                <input v-model="suiviIndicateurs.valeurCible" required
                  class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent"
                  type="text" placeholder="" />
              </div>

              <div class="my-4">
                <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light">Valeur Realisé
                  <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
                <input v-model="suiviIndicateurs.valeurRealise" required
                  class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent"
                  type="text" placeholder="" />
              </div>

              <div class="my-4">
                <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light"> Suivi par date
                  ou par trimestre ? <span
                    class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
                <div class="flex justify-between my-3">
                  <div>
                    <input type="radio" :checked="choiceDateOption" @click="choiceDateOption= true" id="date"
                      name="choix" value="date">
                    <label class="px-2" for="all">Par date</label>
                  </div>
                  <div>
                    <input type="radio" @click="choiceDateOption= false" id="trimestre" name="choix" value="trimestre">
                    <label class="px-2" for="sauf">Par trimestre</label>
                  </div>
                </div>

                <div v-if="choiceDateOption" class="my-4">
                  <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light">Date de suivi
                    <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
                  <input v-model="suiviIndicateurs.dateSuivie" required
                    class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent"
                    type="date" placeholder="" />
                </div>

                <div v-else class="my-4">
                  <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light"> Selectionnez
                    un trimestre <span
                      class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
                  <div class="flex justify-between my-3">
                    <div>
                      <input v-model="suiviIndicateurs.trimestre" type="radio" id="T1" name="trimestre" value="1">
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
                <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light">Commentaire
                  </label>
                <textarea v-model="suiviIndicateurs.commentaire"
                  class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent"
                  rows="3">
                </textarea>
              </div>

              <div class="py-2 my-4 flex justify-center space-x-8">
                <button type="submit"
                  class="bg-primary  flex space-x-2  items-center text-white px-4 py-2 border border-primary font-semibold uppercase">
                  <span class="text-sm font-semibold uppercase" v-if="!chargement">
                    enregistrer
                  </span>
                  <span v-else class="flex items-center space-x-2">
                    <span class="text-xs px-4 font-semibold ">
                      envoi ...
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-center animate-spin" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
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
        <modal-top-right :title="title" v-on:close="closeA">
          <div class="px-4 overflow-y-auto">
            <div v-if="isUpdate">
              <vform template="default"  isAllPairSaufDescrip="true" :sendRequest="sendRequest"  :champs="champsUpdate"
                :cols="cols" submitText="Modifier" @sendForm="sendForm" @closeModal="close"></vform>
            </div>
            <div v-if="!isUpdate">
              <vform template="default" isAllPairSaufDescrip="true" :sendRequest="sendRequest" :savedInput="savedInput" :champs="champs"
                :cols="cols" submitText="Ajouter" @sendForm="sendForm" @closeModal="close"></vform>
            </div>
            
          </div>
        </modal-top-right>
      </div>

      <div v-if="showModal2">
        <vmodal title="Filtre indicateur" v-on:close="showModal2 = false">
          <div class="p-0 w-full" style="width:40vw !important">
            <vform template="default" isAllPairSaufDescrip="true" :champs="champsRecherche" :cols="cols"
              submitText="Rechercher" @sendForm="filter"></vform>
          </div>
        </vmodal>
      </div>

      
      <div v-if="showUniteDeMesureModal">
        <modal-top-right  :title="title"  v-on:close="closeUniteDeMesure1">

            <div class="w-full p-4">
              <vform
                template="default"
                :champs="champsUniteDeMesure"
                cols="1"
                :savedInput="savedInput"
                :submitText="submitText"
                @sendForm="sendUniteDeMesureForm"
                @closeModal="closeUniteDeMesure" 
              ></vform>
            </div>
        </modal-top-right>
      </div>

      <div class="flex items-end justify-between my-2">
        <titre>Les indicateurs </titre>
        <div class="flex items-center space-x-4">
          <button @click="showModal2 = true" title="filtre" class="bg-primary text-white px-2 py-1"><svg
              stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
              stroke-linejoin="round" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg></button>
          <json-excel v-if="exporterIndicateur" :data="json_data()" header="INDICATEUR" type="xlsx" :name="title_csv()">
            <button title="exporter en excel"
              class="py-2  px-4 overflow-hidden  space-x-2 items-center text-xs font-semibold text-white uppercase bg-indigo-500 focus:outline-none focus:shadow-outline">
              <svg class="inline" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24"
                height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 16h2V7h3l-4-5-4 5h3z"></path>
                <path
                  d="M5 22h14c1.103 0 2-.897 2-2v-9c0-1.103-.897-2-2-2h-4v2h4v9H5v-9h4V9H5c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2z">
                </path>
              </svg>
              <span class="mx-2 text-sm font-semibold">Export Excel</span>
            </button>
          </json-excel>
          <button @click="addIndicateur" v-if="indicateurAdd" title="ajouter un indicateur"
            class="px-4 py-2 flex overflow-hidden items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;">
              <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
            </svg>
            <span class="mx-2 text-sm font-semibold uppercase">ajouter un indicateur</span>
          </button>

        </div>
      </div>

      <indicateur-table v-if="currentRole == 'bailleur'" :sendRequest="sendRequest" :key="componentKey" :headers="headers"
        :datas="indicateurBailleurs" :actions="[{name:'consulter'}]" @consulter="consulterSuivi" @supprimer="supprimer" @colonneSearch="getColonne">
      </indicateur-table>
      <indicateur-table v-if="indicateurUpdate && indicateurDelete && suiviIndicateurAdd" :key="componentKey" :sendRequest="sendRequest"
        :headers="headers" :datas="filteredIndicateur" :actions="actions" @modifier="modifier"  @updateInputData="updateInputData"
        @suivre="suivreIndicateur" @consulter="consulterSuivi" @supprimer="supprimer" @colonneSearch="getColonne"></indicateur-table>
      <indicateur-table v-if="indicateurDelete && !indicateurUpdate && suiviIndicateurAdd " :key="componentKey" :actions="[{name:'supprimer'},{name:'consulter'},{name:'suivre'},]" :sendRequest="sendRequest"
        :headers="headers" :datas="filteredIndicateur" @suivre="suivreIndicateur" @consulter="consulterSuivi"
        @supprimer="supprimer" @colonneSearch="getColonne"></indicateur-table>
      <indicateur-table v-if="!indicateurDelete && indicateurUpdate && suiviIndicateurAdd " :key="componentKey" :actions="[{name:'suivre'},{name:'consulter'}]"  :sendRequest="sendRequest"
        :headers="headers" :datas="filteredIndicateur" @modifier="modifier" @updateInputData="updateInputData" @suivre="suivreIndicateur"
        @consulter="consulterSuivi"></indicateur-table>
      <indicateur-table v-if="!indicateurDelete && !indicateurUpdate  && suiviIndicateurAdd " :key="componentKey" :actions="[{name:'suivre'},{name:'consulter'}]"  :sendRequest="sendRequest"
        :headers="headers" :datas="filteredIndicateur" @suivre="suivreIndicateur" @consulter="consulterSuivi">
      </indicateur-table>
      <indicateur-table v-if="indicateurDelete && indicateurUpdate  && !suiviIndicateurAdd " :key="componentKey" @consulter="consulterSuivi" :actions="[{name:'supprimer'},{name:'consulter'}]"  :sendRequest="sendRequest"
        :headers="headers" :datas="filteredIndicateur" @modifier="modifier" @updateInputData="updateInputData" @supprimer="supprimer" @colonneSearch="getColonne">
      </indicateur-table>
    </div>
  </dashboard>

</template>

<script>
import ModalTopRight from '@/components/ModalTopRight'
import SearchBar from '@/components/SearchBar'
import Titre from '@/components/Titre'
import IndicateurTable from '@/components/IndicateurTable'
import Vform from '@/components/Vform'
import Vmodal from '@/components/Vmodal'
import Vbutton from '@/components/Vbutton'
import Dashboard from '@/layouts/Dashboard'
import CardProgramme from '@/components/CardProgramme'
import { mapGetters, mapMutations, mapActions } from "vuex";
import extractFormData from "@/utils/extract-data";
import SuiviService from "@/services/modules/indicateur.suivi.service.js";
import IndicateurService from "@/services/modules/indicateur.service";
import BailleurService from "@/services/modules/bailleur.service";
import CategorieService from "@/services/modules/categorie.service";
import UniteDeMesureService from "@/services/modules/unitee.mesure.service";
import DeleteAlert from "@/components/DeleteAlert.vue";
import JsonExcel from "vue-json-excel";
export default {
  components: {
    IndicateurTable,
    Dashboard,
    Vmodal,
    Vbutton,
    Vform,
    Titre,
    SearchBar,
    CardProgramme,
    DeleteAlert,
    ModalTopRight,
    JsonExcel
  },
  data() {
    return {
      savedInput: [],
      sendRequest: false,
      suiviIndicateurs: {
        annee: '',
        trimestre: '',
        dateSuivie: '',
        valeurCible: 0,
        valeurRealise: 0,
        commentaire: '',
      },
      showModal: false,
      showModal2: false,
      showSuiviModal: false,
      loading: false,
      search: "",
      title: '',
      chargement: false,
      indicateurId:'',
      indicateurAttributs: ['nom', 'description', 'anneeDeBase', 'valeurDeBase', 'bailleurId', 'categorieId', 'uniteeMesureId','sourceDeVerification','hypothese'],
      indicateurAttributsUpdate: ['nom', 'description', 'anneeDeBase', 'valeurDeBase', 'bailleurId', 'categorieId', 'uniteeMesureId'],
      indicateurAttributsRecherche: ['nom', 'anneeDeBase', 'bailleurId', 'categorieId', 'uniteeMesureId'],
      choiceDateOption: true,
      champs: null,
      champsUniteDeMesure: [
        {
          name: "Nom",
          type: "text",
          key: "nom",
          placeholdere: "Nom de l'unitee de mésure",
          isSelect: false,
          isTextArea: false,
          data: "",
          required: true,
          errors: [],
        },
        {
          name: "Type",
          type: "",
          key: "type",
          placeholdere: "Type de l'unitée",
          isSelect: true,
          isTextArea: false,
          options: [{id: 1, nom: "Numérique"}, {id:0, nom:"Non Numérique"}],
          data:"",
          cle: 'id',
          value:'nom',
          required: true,
          errors: [],
        }
      ],
      champsUpdate: [],
      cols: 2,
      champsRecherche: [],
      headers: [],
      idIndicateur: '',
      isValeurCibleUse: true,
      colonnes:[],
      actions: [
        { name: 'suivre' },
        { name: 'supprimer', iconne: '' },
        { name: 'modifier', iconne: '' },
        { name: 'consulter', iconne: '' },
      ],
      indicateurBailleurs: '',
      currentRole: '',
      indicateurVisible: false,
      indicateurAdd: false,
      indicateurDelete: false,
      indicateurUpdate: false,
      suiviIndicateurAdd: false,
      suiviIndicateurVisible: false,
      exporterIndicateur: false,
      indicateurs:[],
      bailleurs:[],
      categories:[],
      uniteDeMesures:[],
      programmeId:[],
      isUpdate:false,
      deleteData:{},
      deleteModal:false,
      componentKey: 0,

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

      /* categories: "categories/getCategorie",
      bailleurs: "bailleurs/getBailleurs",
      categories: "categories/getCategories",
      uniteDeMesure: "uniteesDeMesure/getUniteesDeMesure", */
    }),
    ...mapGetters('auths', { currentUser: 'GET_AUTHENTICATE_USER' }),
    filteredIndicateur() {
      var self = this;
      var colonnes = [];
      var i = 0;

      this.headers.forEach(element => {
        if(this.colonnes[i])
        {
          if(element.props)
          {
            colonnes.push([element.props, element.cle])
          }

          else
          {
            colonnes.push(element.cle)
          }
        }

        i++;
      });

      if(colonnes.length)
      {
        return this.indicateurs.filter(function (data){
          for(let col of colonnes)
          {
            if(Array.isArray(col))
            {
              if(data[col[0]][col[1]].toString().toLowerCase().indexOf(self.search.toLowerCase()) >= 0)
                {
                  return data              
                }
            }

            else
            {
              if(data[col].toString().toLowerCase().indexOf(self.search.toLowerCase()) >= 0)
                {
                  return data              
                }              
            }
            
          }                         
        });  
      }

      else
      {
        return this.indicateurs.filter(function (data){
    
          for(let header of self.headers)
          {

            if(data[header.props] != null)
            {
              if(data[header.props][header.cle])
              {
                if(data[header.props][header.cle].toString().toLowerCase().indexOf(self.search.toLowerCase()) >= 0)
                {                  
                  return data                  
                }
              }
            }

            else
            {
              if(data[header.cle])
              {
                if(data[header.cle].toString().toLowerCase().indexOf(self.search.toLowerCase()) >= 0)
                {                  
                  return data              
                }
              }
            }
            
          }
        });
      }
    },
  },
  methods: {

    modalclose(){
     // this.suiviIndicateurs.annee='',
     // this.suiviIndicateurs.trimestre='',
      //this.suiviIndicateurs.valeurCible=0,
      //this.suiviIndicateurs.valeurRealise=0,
      //this.suiviIndicateurs.commentaire='',
    },
    ...mapMutations({
      setErrors: "SET_ERRORS_MESSAGE", // map `this.setErrors()` to `this.$store.commit('SET_ERRORS_MESSAGE')`,
      setIndicateur: "indicateurs/FILL", // map `this.CREATE_INSTANCE_PROGRAMME()` to `this.$store.commit('CREATE_INSTANCE_PROGRAMME')`
    }),
    getColonne(data)
    {
      this.colonnes = data
      console.log(this.colonnes)
    },
    active() {
      this.$store.dispatch('active')
    },
    disabled() {
      this.$store.dispatch('disabled')
    },
    fetchIndicateurs() {
      this.active()
      IndicateurService.get().then((data) => {
        const datas = data.data.data
        this.indicateurs= datas
        this.headers = [
          {name: 'Indicateur ', cle: 'nom', width:'w-56' },
          {name: 'Bailleur', cle: 'sigle', props: 'bailleur', select: true, options: this.bailleurs, key: 'sigle', updateKey: 'bailleurId', width:'w-20' },
          {name: 'Catégorie', cle: 'nom', props: 'categorie', select: true, options: this.categories, key: 'nom', updateKey: 'categorieId', width:'w-56' },
          {name: 'Unité de mesure', cle: 'nom', props: 'uniteeDeMesure', select: true, options: this.uniteDeMesures, key: 'nom', updateKey: 'uniteeMesureId', width:'w-56' },
          {name: 'Valeur de base', cle: 'valeurDeBase', width:'w-24' },
          {name: 'Année de base', cle: 'anneeDeBase', width:'w-24' },
          {name: 'Date de création', cle: 'created_at', width:'w-56' },
        ]
        this.champs = [
          { name: 'Nom', type: 'text', key: 'nom', placeholdere: "Nom de l'indicateur", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },
          { name: 'Année de base', key: 'anneeDeBase', type: 'number', placeholdere: "l'année de base", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },
          { name: 'Valeur de base', key: 'valeurDeBase', type: 'text', placeholdere: "Valeur de base", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },
          { name: 'Unite de mesure', key: 'uniteeMesureId', type: '', placeholdere: "Selectionnez une unité de mesure", isSelect: true, isTextArea: false, data: '', options: this.uniteDeMesures, required: true, cle: 'id', value: 'nom', errors: [] },
          { name: 'Categories', key: 'categorieId', type: '', placeholdere: "Selectionnez une categorie", isSelect: true, isTextArea: false, data: '', options: this.categories, required: false, cle: 'id', value: 'nom', errors: [] },
          { name: 'Bailleurs', key: 'bailleurId', type: '', placeholdere: "Selectionnez le bailleur", isSelect: true, isTextArea: false, data: '', required: true, options: this.bailleurs, cle: 'id', value: 'sigle', errors: [] },
          { name: 'Source de verification', type: 'text', key: 'sourceDeVerification', placeholdere: "Source de verification", isSelect: false, isTextArea: false, data: '', required: false, errors: [] },
          { name: 'Hypothese', type: 'text', key: 'hypothese', placeholdere: "Hypothese", isSelect: false, isTextArea: false, data: '', required: false, errors: [] },
          { name: 'Description', key: 'description', type: '', placeholdere: "Description", isSelect: false, isTextArea: true, data: '', required: false, errors: [] },
        ]
        this.champsRecherche = [
          { name: 'Indicateur', key: 'nom', type: 'text', placeholdere: "Donnez un nom d'indicateur", isSelect: false, isTextArea: false, data: '', required: false },
          { name: 'Année de base', key: 'anneeDeBase', type: 'numer', placeholdere: "l'année de base", isSelect: false, isTextArea: false, data: '', required: false, },
          { name: 'Categories', key: 'categorieId', type: '', placeholdere: "Selectionnez une categorie", isSelect: true, isTextArea: false, data: '', options: this.categories, required: true, cle: 'id', value: 'nom', required: false, },
          { name: 'Unite de mesure', key: 'uniteeMesureId', type: '', placeholdere: "Selectionnez une unité de mesure", isSelect: true, isTextArea: false, data: '', options: this.uniteDeMesures, required: false, cle: 'id', value: 'nom', errors: [] },
          { name: 'Bailleurs', key: 'bailleurId', type: '', placeholdere: "Selectionnez le bailleur", isSelect: true, isTextArea: false, data: '', required: false, options: this.bailleurs, cle: 'id', value: 'sigle' },
        ]
        this.disabled()
      }).catch((error) => {
        this.disabled()
        if (error.response) {
          // Requête effectuée mais le serveur a répondu par une erreur.
          const message = error.response.data.message
          this.$toast.error(message)
        } else if (error.request) {
        // Demande effectuée mais aucune réponse n'est reçue du serveur.
        //console.log(error.request);
        } else {
          // Une erreur s'est produite lors de la configuration de la demande
        }
      })
    },
    fetchIndicateur() {
      IndicateurService.get().then((data) => {
        const datas = data.data.data
        this.indicateurs= datas
        this.headers = [
          {name: 'Indicateur ', cle: 'nom', width:'w-56' },
          {name: 'Bailleur', cle: 'sigle', props: 'bailleur', select: true, options: this.bailleurs, key: 'sigle', updateKey: 'bailleurId', width:'w-20' },
          {name: 'Catégorie', cle: 'nom', props: 'categorie', select: true, options: this.categories, key: 'nom', updateKey: 'categorieId', width:'w-56' },
          {name: 'Unité de mesure', cle: 'nom', props: 'uniteeDeMesure', select: true, options: this.uniteDeMesures, key: 'nom', updateKey: 'uniteeMesureId', width:'w-56' },
          {name: 'Valeur de base', cle: 'valeurDeBase', width:'w-24' },
          {name: 'Année de base', cle: 'anneeDeBase', width:'w-24' },
          {name: 'Date de création', cle: 'created_at', width:'w-56' },
        ]
        this.champs = [
        { name: 'Nom', type: 'text', key: 'nom', placeholdere: "Nom de l'indicateur", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },
        { name: 'Année de base', key: 'anneeDeBase', type: 'number', placeholdere: "l'année de base", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },
        { name: 'Valeur de base', key: 'valeurDeBase', type: 'text', placeholdere: "Valeur de base", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },
        { name: 'Unite de mesure', key: 'uniteeMesureId', type: '', placeholdere: "Selectionnez une unité de mesure", isSelect: true, isTextArea: false, data: '', options: this.uniteDeMesures, required: true, cle: 'id', value: 'nom', errors: [] },
        { name: 'Categories', key: 'categorieId', type: '', placeholdere: "Selectionnez une categorie", isSelect: true, isTextArea: false, data: '', options: this.categories, required: false, cle: 'id', value: 'nom', errors: [] },
        { name: 'Bailleurs', key: 'bailleurId', type: '', placeholdere: "Selectionnez le bailleur", isSelect: true, isTextArea: false, data: '', required: true, options: this.bailleurs, cle: 'id', value: 'sigle', errors: [] },
        { name: 'Source de verification', type: 'text', key: 'sourceDeVerification', placeholdere: "Source de verification", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },
        { name: 'Hypothese', type: 'text', key: 'hypothese', placeholdere: "Hypothese", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },
        { name: 'Description', key: 'description', type: '', placeholdere: "Description", isSelect: false, isTextArea: true, data: '', required: true, },
      ]
       
      }).catch((error) => {
       
        if (error.response) {
          // Requête effectuée mais le serveur a répondu par une erreur.
          const message = error.response.data.message
          this.$toast.error(message)
        } else if (error.request) {
        // Demande effectuée mais aucune réponse n'est reçue du serveur.
        //console.log(error.request);
        } else {
          // Une erreur s'est produite lors de la configuration de la demande
        }
      })
    },
   
    ...mapActions("indicateurs", {
      saveIndicateur: "STORE_INDICATEUR",
      filtre: "FILTRE_INDICATEUR",
      updateIndicateur: "UPDATE_INDICATEUR",
      deleteIndicateur: "DESTROY_INDICATEUR",
    }),
    /* ...mapActions("bailleurs", {
      fetchBailleurs: "FETCH_LIST_BAILLEUR",
    }),
    ...mapActions("categories", {
      fetchCategories: "FETCH_LIST_CATEGORIE",
    }),
    ...mapActions("uniteesDeMesure", {
      fetchUnite: "FETCH_LIST_UNITEE_DE_MESURE",
    }), */

    getIndicateurBailleurs() {
      IndicateurService.getIndicateurBailleur().then((data) => {
        this.indicateurBailleurs = data.data.data
      }).catch((error) => {
        if (error.response) {
              // Requête effectuée mais le serveur a répondu par une erreur.
              const message = error.response.data.message
              this.$toast.error(message)
              } else if (error.request) {
                // Demande effectuée mais aucune réponse n'est reçue du serveur.
                //console.log(error.request);
              } else {
              // Une erreur s'est produite lors de la configuration de la demande
              //console.log('dernier message', error.message);
          }
      })
    },
    
    
    getPermission() {
      this.currentUser.role[0].permissions.forEach(element => {
        if (element.slug === 'voir-un-indicateur') {
          this.indicateurVisible = true
        }
        if (element.slug === 'creer-un-indicateur') {
          this.indicateurAdd = true
        }
        if (element.slug === 'modifier-un-indicateur') {
          this.indicateurUpdate = true
        }
        if (element.slug === 'supprimer-un-indicateur') {
          this.indicateurDelete = true
        }
        if (element.slug === 'creer-un-suivi-indicateur') {
          this.suiviIndicateurAdd = true
        }
        if (element.slug == 'voir-un-suivi-indicateur') {
          this.suiviIndicateurVisible = true
        }
        if (element.slug == 'exporter-un-indicateur') {
          this.exporterIndicateur = true
        }

      });
    },

    suivreIndicateur(data) {
      this.idIndicateur = data
      this.showSuiviModal = true
      this.title = `Suivre l'indicateur`
    },

    consulterSuivi(id) {
      this.$router.push({ name: 'indicateurs_suivi_details', params: { id: id } })
    },

    saveSuivi() {
      if (this.chargement == false) {
        this.chargement = true
        const data = this.suiviIndicateurs
        data.valeurRealise = [Number(data.valeurRealise)]
        //data.valeurCible = [90000]
        data.valeurCible = [Number(data.valeurCible)]
        data.indicateurId = this.idIndicateur
        if (this.choiceDateOption == true) {
          delete data.trimestre
        }
        else {
          delete data.dateSuivie
        }

        SuiviService.create(data).then((data) => {
          this.$toast.success('suivi éffectué')
          this.showSuiviModal = false
          this.chargement = false
          this.suiviIndicateurs.annee =''
          this.suiviIndicateurs.trimestre = ''
          this.suiviIndicateurs.dateSuivie= ''
          this.suiviIndicateurs.valeurCible =0
          this.suiviIndicateurs.valeurRealise = 0
          this.suiviIndicateurs.commentaire =''
        }).catch((error) => {
          this.chargement = false
          if (error.response) {
          // Requête effectuée mais le serveur a répondu par une erreur.
          const message = error.response.data.message
          this.$toast.error(message)
          } else if (error.request) {
          // Demande effectuée mais aucune réponse n'est reçue du serveur.
          //console.log(error.request);
          } else {
            // Une erreur s'est produite lors de la configuration de la demande
          }
        })
      }


    },

    title_csv() {
      return "indicateur-" + "-" + new Date()
    },

    json_data() {
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
      SuiviService.checksuivi(this.idIndicateur, date).then((data) => {
        //recuperation de la valeur de verfication pour la valeur cible
        if (data.data.data === true) {
          this.isValeurCibleUse = false;
        } else {
          this.isValeurCibleUse = true;
        }
      }).catch((error) => {
        if (error.response) {
              // Requête effectuée mais le serveur a répondu par une erreur.
              const message = error.response.data.message
              this.$toast.error(message)
              } else if (error.request) {
                // Demande effectuée mais aucune réponse n'est reçue du serveur.
                //console.log(error.request);
              } else {
              // Une erreur s'est produite lors de la configuration de la demande
              //console.log('dernier message', error.message);
          }
      })
    },

    

    sendForm() {

      this.champs = this.champs.map(item => { item.errors = []; return item })
      this.champsUpdate = this.champsUpdate.map(item => { item.errors = []; return item })
      let indicateur = {}
      if (this.isUpdate) {
        indicateur = extractFormData(this.champsUpdate, this.indicateurAttributsUpdate)
      } else {
        indicateur = extractFormData(this.champs, this.indicateurAttributs)
      }

      indicateur.bailleurId = indicateur.bailleurId.id
      indicateur.categorieId = indicateur.categorieId.id
      indicateur.uniteeMesureId = indicateur.uniteeMesureId.id
      
      if (this.sendRequest == false) {
        this.sendRequest = true
        if (this.indicateurId != '') {

          this.updateIndicateur({ indicateur: indicateur, id: this.indicateurId }).then(
            (response) => {
              if (response.status == 200 || response.status == 201) {
                this.$toast.success('operation effectué avec success')
                this.fetchIndicateur()
               
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
              this.resetForm()
              localStorage.removeItem('formData');
              this.$toast.success('operation effectué avec success')
              this.fetchIndicateur()
             
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

      let indicateur = extractFormData(this.champsRecherche, this.indicateurAttributsRecherche);
      indicateur.bailleurId = indicateur.bailleurId?.id
      indicateur.categorieId = indicateur.categorieId?.id
      indicateur.uniteeMesureId = indicateur.uniteeMesureId?.id
      


      this.filtre(indicateur).then((response) => {
        if (response.status == 200 || response.status == 201) {
          const datas = response.data.data
          this.indicateurs= datas
          this.close2();
        }
      });
    },

    resetForm() {

      this.champs = this.champs.map(item => { item.data = ''; return item })

      window.document.getElementById('vform')?.reset()

      this.setIndicateur({})
    },

    async updateInputData(id, attribut, value) {
      await this.updateIndicateur({ indicateur: { [attribut]: value }, id: id }).catch((value, status) => {
        if (this.hasErrors[attribut] !== undefined)
          alert(this.hasErrors[attribut])
      }).finally(() => {
        $('#' + "dataTable").load(location.href + '#' + id + '>*', '')
      })
    },

    supprimer(indicateur,index) {
      this.deleteModal= true
      this.deleteData.data = indicateur
      this.deleteData.index = index
    },

    deleteIndicateur(data) {
      //this.filteredIndicateur.splice(data.index,1)
      this.deleteModal= false
      IndicateurService.destroy(data.data.id).then((data) => {
        this.$toast.success("Operation effectué avec success !")
        this.fetchIndicateur()
       
      }).catch((error) => {
        
        if (error.response) {
          // Requête effectuée mais le serveur a répondu par une erreur.
          const message = error.response.data.message
          this.$toast.error(message)
        } else if (error.request) {
        // Demande effectuée mais aucune réponse n'est reçue du serveur.
        //console.log(error.request);
        } else {
          // Une erreur s'est produite lors de la configuration de la demande
        }
      }) 
    },
    
    

    close() {
      this.showCloseModal();
      this.resetForm()
    },
    closeA() {
      this.showCloseModal();
      this.savedInput = []
      for (let i = 0; i < this.champs.length; i++) {
        this.savedInput.push(this.champs[i].data)
      }
      const parsed = JSON.stringify(this.savedInput);
      localStorage.setItem('formData', parsed);
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
      this.title = 'Ajouter'
      this.showModal = true
      this.isUpdate = false
    },
   
    modifier(indicateur) {
      localStorage.removeItem('formData');
      this.isUpdate = true
      this.title = 'Modifier un indicateur'
      this.showModal = true
      
      this.submitText = "Modifier"

      this.indicateurId = indicateur.id

      this.indicateurAttributsUpdate.forEach((item) => {
        
        this.champsUpdate.find((value, index) => {
         
        if (value.key !== 'bailleurId' && value.key !== 'categorieId' && value.key !== 'uniteeMesureId') {
          if (value.key === item) {
           
            this.champsUpdate[index]['data'] = indicateur[item]
           
          }
        }

        })

      })

    },

    getBailleur(programme) {
      this.active()
      BailleurService.bailleursOfProgramme(programme).then((data) => {
        const datas = data.data.data
        this.bailleurs = datas
        this.champsUpdate.push({ name: 'Bailleurs', key: 'bailleurId', type: '', placeholdere: "Selectionnez le bailleur", isSelect: true, isTextArea: false, data: '', required: true, options: datas, cle: 'id', value: 'sigle', errors: [] },)
        this.disabled()
      }).catch((error) => {
        this.disabled()
      })
    },

    getUniteDeMesure() {
      this.active()
      UniteDeMesureService.get().then((data) => {
        const datas = data.data.data
        this.uniteDeMesures = datas
        this.champsUpdate.push({ name: 'Unite de mesure', key: 'uniteeMesureId', type: '', placeholdere: "Selectionnez une unité de mesure", isSelect: true, isTextArea: false, data: '', options: datas, required: true, cle: 'id', value: 'nom', errors: [] },)
        this.disabled()
      }).catch((error) => {
        this.disabled()
      })
    },

    getCategorie() {
      this.active()
      CategorieService.get().then((data) => {
        const datas = data.data.data
        this.categories = datas
        this.champsUpdate.push({ name: 'Categories', key: 'categorieId', type: '', placeholdere: "Selectionnez une categorie", isSelect: true, isTextArea: false, data: '', options: datas, required: false, cle: 'id', value: 'nom', errors: [] },)
        this.disabled()
      }).catch((error) => {
        this.disabled()
      })
    },


  },

  created() {
    this.getPermission()
    if (!this.indicateurVisible) {
      this.$router.push('/401-non-autorise')
    }
    if (this.currentUser != undefined) {
      this.currentRole = this.currentUser.type
      this.programmeId = this.currentUser.programme.id

      if (this.currentUser.type === 'bailleur') {
        this.getIndicateurBailleurs()
        this.headers = [
          { name: 'Indicateur', cle: 'nom', },
          { name: 'description', cle: 'description' },
          { name: 'Bailleur', cle: 'nom', props: 'bailleur', select: true, },
          { name: 'Categorie', cle: 'nom', props: 'categorie', select: true },
          { name: 'Unité de mesure', cle: 'nom', props: 'unitee_mesure', select: true },
          { name: 'Valeur de base', cle: 'valeurDeBase' },
          { name: 'Année de base', cle: 'anneeDeBase' },
          { name: 'Date de création', cle: 'created_at' },
        ]
      }
      else {
        this.getBailleur(this.programmeId)
        this.getUniteDeMesure()
        this.getCategorie()
        this.fetchIndicateurs()
        
        this.champsUpdate = [
          { name: 'Nom', type: 'text', key: 'nom', placeholdere: "Nom de l'indicateur", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },
          { name: 'Année de base', key: 'anneeDeBase', type: 'number', placeholdere: "l'année de base", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },
          { name: 'Valeur de base', key: 'valeurDeBase', type: 'text', placeholdere: "Valeur de base", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },
          /* { name: 'Source de verification', type: 'text', key: 'sourceDeVerification', placeholdere: "Source de verification", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },
          { name: 'Hypothese', type: 'text', key: 'hypothese', placeholdere: "Hypothese", isSelect: false, isTextArea: false, data: '', required: true, errors: [] }, */
          { name: 'Description', key: 'description', type: '', placeholdere: "Description", isSelect: false, isTextArea: true, data: '', required: true, },
        ]
        
      }
    }

  },
}
</script>

<style scoped>

</style>