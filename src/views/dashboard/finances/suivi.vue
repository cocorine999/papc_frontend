<template>
  <dashboard>
    <div class="w-full">
      <nav class="text-sm font-semibold flex justify-between items-center flex-wrap" aria-label="Breadcrumb">
        <div>
          <ol class="inline-flex p-0 list-none">
            <li class="flex items-center text-blue-500">
              <router-link to="" class="text-gray-600">dashboard</router-link>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
              </svg>
            </li>
            <li class="flex items-center">
              <router-link to="" class="text-gray-600">Suivi</router-link>
            </li>
          </ol>
        </div>
        <div>
          <div class="w-full flex text-gray-600">
            <input @input="$emit('search', $event.target.value)" class="h-8 w-full px-5 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none relative -mr-9 block sm:block" v-model="search" type="text" name="search" placeholder="Rechercher" />
            <button type="submit" class="relative p-2 rounded-lg">
              <svg class="w-4 h-4 text-gray-600 fill-current" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" style="enable-background: new 0 0 56.966 56.966" xml:space="preserve" width="512px" height="512px">
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <div v-if="showModal">
        <modal-top-right :title="title" v-on:close="closeA">
          <div class="w-full p-4">
            <div v-if="title == 'Ajouter un Suivi'">
              <vform template="default" @closeModal="close" :champs="champs" :cols="cols" submitText="Enregistrer" :savedInput="savedInput" :isloading="loaderActivites" @sendForm="sendForm"></vform>
            </div>
            <div v-if="title == 'Modifier un Suivi'">
              <vform template="default" @closeModal="close" :champs="champs" :cols="cols" submitText="Modifier" @sendForm="sendForm"></vform>
            </div>
          </div>
        </modal-top-right>
      </div>

      <div v-if="showModalSuiviFinancier">
        <!-- v-on:close="closeA" -->
        <modal-top-right title="Ajouter un suivi financier" v-on:close="closeSuiviModal">
          <!-- <pre>{{ suiviFinancierss }}</pre> -->
          <form @submit.prevent="sendForm2" id="vform">
            <div v-for="(plan, index) in suiviFinancierss" :key="plan.id" class="col-span-12 border-b pb-4 mb-4">
              <div :class="`grid grid-cols-1 gap-4`">
                <div class="w-full px-4 font-bold text-base mt-4">Suivi {{ index + 1 }}</div>
                <div class="w-full px-4 py-2">
                  <div>
                    <label class="block py-2 text-xs md:text-sm font-semibold" for="">
                      Consommé
                      <span class="px-2 w-full text-lg font-black text-red-700">*</span>
                    </label>
                    <input :required="true" placeholder="champ.placeholdere" type="numpber" v-model="plan.consommer" class="px-2 py-1 md:px-2 md:py-1 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent placeholder:text-xs md:placeholder:text-sm" />
                  </div>
                </div>
                <!-- <pre>{{ $store.state.trimestres }}</pre> -->
                <div class="w-full px-4 py-2">
                  <label for="dropdown" class="block text-sm font-medium text-gray-700">Sélectionner le trimestre</label>
                  <div class="flex items-center">
                    <select id="dropdown" v-model="plan.trimestre" class="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                      <option v-for="trimestre in $store.state.trimestres" :key="trimestre.valeur" :value="trimestre.valeur">{{ trimestre.trimestre }}</option>
                    </select>
                  </div>
                </div>
                <!-- <div class="w-full px-4 py-2">
                  <div>
                    <label class="block py-2 text-xs md:text-sm font-semibold" for="">
                      Sélectionner le trimestre
                      <span class="px-2 w-full text-lg font-black text-red-700">*</span>
                    </label>
                    <input v-model="plan.trimestre" :required="true" placeholder="champ.placeholdere" type="number" min="1" max="4" class="px-2 py-1 md:px-2 md:py-1 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent placeholder:text-xs md:placeholder:text-sm" />
                  </div>
                </div> -->

                <!-- <div class="w-full px-4 py-2">
                  <div>
                    <label class="block py-2 text-xs md:text-sm font-semibold" for="">
                      Saisissez l'année de décaissement
                      <span class="px-2 w-full text-lg font-black text-red-700">*</span>
                    </label>
                    <div class="flex justify-between space-x-1">
                      <multiselect v-model="plan.annee" value="nom" :required="true" :preselect-first="false" label="nom" class="w-full" placeholder="Sélectionner l'année de décaissement" :options="years" selectLabel="Appuyez sur Entrée pour sélectionner" deselectLabel="Appuyez sur Entrée pour supprimer" selectedLabel="Selectionné" track-by=""></multiselect>
                    </div>
                  </div>
                </div> -->
                <div class="w-full px-4 py-2">
                  <label for="dropdown" class="block text-sm font-medium text-gray-700">Sélectionnez l'année de décaissement</label>
                  <div class="flex items-center">
                    <select id="dropdown" v-model="plan.annee" class="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" @change="getFiltreActivites2(plan.annee, index)">
                      <option v-for="year in years" :key="year.id" :value="year.nom">{{ year.nom }}</option>
                    </select>
                  </div>
                </div>
                <div class="w-full p-4">
                  <div class="">
                    <label class="block py-2 text-xs md:text-sm font-semibold" for="">
                      Sélectionner une Activité
                      <span class="px-2 w-full text-lg font-black text-red-700">*</span>
                    </label>

                    <!-- <pre>{{ index }}</pre>
                    <pre>{{ loaderTab }}</pre>
                    <pre>{{ loaderTab[index] }}</pre> -->
                    <div class="flex items-center">
                      <multiselect v-model="plan.activiteId" value="id" placeholder="Sélectionner une activité" :options="superTableauActivites[index]" :selectLabel="'Appuyez sur Entrée pour sélectionner'" deselectLabel="'Appuyez sur Entrée pour supprimer'" selectedLabel="Selectionné" label="nom" track-by=""></multiselect>
                      <span v-if="loaderTab[index] === true">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 ml-2 text-center animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="w-full px-4 py-2">
                  <div>
                    <label class="block py-2 text-xs md:text-sm font-semibold" for="">
                      Source
                      <span class="px-2 w-full text-lg font-black text-red-700">*</span>
                    </label>
                    <div class="flex justify-between space-x-1">
                      <multiselect v-model="plan.type" :required="true" :preselect-first="false" label="nom" class="w-full" placeholder="Sélectionner la source du financement" :options="$store.state.sources" selectLabel="Appuyez sur Entrée pour sélectionner" deselectLabel="Appuyez sur Entrée pour supprimer" selectedLabel="Selectionné" track-by=""></multiselect>
                    </div>
                  </div>
                </div>
              </div>
              <button type="button" @click="removePlan(index)" class="mt-4 ml-4 text-red-600 text-sm underline">Supprimer ce suivi</button>
            </div>

            <button type="button" @click="addPlan" class="py-2 px-4 overflow-hidden flex space-x-2 items-center font-semibold text-white uppercase bg-primary focus:outline-none focus:shadow-outline mx-auto my-4">Ajouter un autre plan</button>

            <div class="py-2 my-2 flex justify-center space-x-8">
              <vbutton type="submit" :isloading="ajoutSuiviLoader" template="success"> Enregistrer </vbutton>
              <!-- @close="close()" -->
              <vbutton type="reset" template="danger"> annuler </vbutton>
            </div>
          </form>
        </modal-top-right>
      </div>

      <div v-if="showModal2">
        <vmodal title="Importez les données " v-on:close="showModal2 = false">
          <form @submit.prevent="importData" style="width: 500px" class="">
            <input class="block w-full text-xs md:text-sm text-gray-900 bg-gray-50 border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 placeholder:text-xs md:placeholder:text-sm" aria-describedby="file_input_help" id="file_input" @change="previewFiles" accept=".xlsx" type="file" />
            <p class="my-4 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">FORMAT XLSX SEULEMENT AUTORISE</p>
            <div class="flex justify-end">
              <button type="submit" class="bg-primary flex space-x-2 items-center text-white px-4 py-2 border border-primary font-semibold uppercase">
                <span class="text-sm font-semibold uppercase" v-if="!chargement"> importez </span>
                <span v-else class="flex items-center space-x-2">
                  <span class="text-xs px-4 font-semibold"> chargement ... </span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-center animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </vmodal>
      </div>

      <div v-if="showModal3">
        <vmodal title="Filtre" v-on:close="showModal3 = false">
          <div class="w-full" style="width: 500px">
            <vform template="default" isAllPairSaufDescrip="true" @closeModal="showModal3 = false" :champs="champsRecherche" :cols="cols" submitText="Rechercher" @sendForm="filtre"></vform>
          </div>
        </vmodal>
      </div>

      <div class="flex items-center justify-between flex-wrap my-2">
        <titre>Suivi Budgétaire </titre>
        <div class="flex items-center space-x-3">
          <button @click="showFiltreModal" title="filtre" class="bg-primary text-white px-2 py-1">
            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
          </button>
          <button v-if="importerSuiviFinance" @click="showModal2 = true" title="exporter en excel" class="py-2 flex space-x-3 items-center px-4 overflow-hidden space-x-2 items-center text-xs font-semibold text-white uppercase bg-blue-500 focus:outline-none focus:shadow-outline">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg">
              <path d="m12 18 4-5h-3V2h-2v11H8z"></path>
              <path d="M19 9h-4v2h4v9H5v-9h4V9H5c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-9c0-1.103-.897-2-2-2z"></path>
            </svg>
            <span class="mx-2 text-xs md:text-sm font-semibold">Importez les données</span>
          </button>
          <json-excel :data="json_data" header="SUIVI FINANCIER" type="xlsx" :name="title_csv">
            <button title="exporter en excel" class="py-2 px-4 overflow-hidden space-x-2 items-center text-xs font-semibold text-white uppercase bg-indigo-500 focus:outline-none focus:shadow-outline">
              <svg class="inline" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 16h2V7h3l-4-5-4 5h3z"></path>
                <path d="M5 22h14c1.103 0 2-.897 2-2v-9c0-1.103-.897-2-2-2h-4v2h4v9H5v-9h4V9H5c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2z"></path>
              </svg>
              <span class="mx-2 text-xs md:text-sm font-semibold">Export Excel</span>
            </button>
          </json-excel>

          <!-- <button v-if="suiviFinancierAdd" @click="addSuivi" title="ajouter " class="py-2 px-4 overflow-hidden flex space-x-2 items-center font-semibold text-white uppercase bg-primary focus:outline-none focus:shadow-outline">
            <span
              ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1); transform: ; msfilter: ">
                <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg
            ></span>
            <span class="mx-1 md:mx-2 text-xs font-semibold">ajouter</span>
          </button> -->
          <button v-if="suiviFinancierAdd" @click="ouvrirModalSuiviFinancierActivite" title="ajouter " class="py-2 px-4 overflow-hidden flex space-x-2 items-center font-semibold text-white uppercase bg-primary focus:outline-none focus:shadow-outline">
            <span
              ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1); transform: ; msfilter: ">
                <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg
            ></span>
            <span class="mx-1 md:mx-2 text-xs font-semibold">ajouter un suivi</span>
          </button>
        </div>
      </div>

      <div v-if="showInfo" class="flex justify-center py-3">
        <p class="text-center w-1/3 border bg-primary text-white shadow p-2 font-bold"><span>Exercice :</span> {{ filtreInfos.annee }} - trimestre {{ filtreInfos.trimestre }} - {{ filtreInfos.bailleur }}</p>
      </div>

      <div class="my-4">
        <suivi-budgetaire :suiviFinancier="suiviFinancier" :annee="annee"></suivi-budgetaire>
      </div>
    </div>
  </dashboard>
</template>

<script>
import ModalTopRight from "@/components/ModalTopRight";
import SearchBar from "@/components/SearchBar";
import Titre from "@/components/Titre";
import Vtable from "@/components/Vtable";
import Vform from "@/components/Vform";
import Vbutton from "@/components/Vbutton";
import Vmodal from "@/components/Vmodal";
import SuiviBudgetaire from "@/components/SuiviBudgetaire";
import Dashboard from "@/layouts/Dashboard";
import ProgrammeService from "@/services/modules/programme.service.js";
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
import { extractFormData } from "@/utils/index";
import BailleursService from "@/services/modules/bailleur.service.js";
import SuiviFinancierService from "@/services/modules/suiviFinancier.service.js";
import SuiviFinancier from "@/services/modules/suiviFinancier.service.js";
import JsonExcel from "vue-json-excel";
import Multiselect from "vue-multiselect";
import suiviFinanciers from "@/store/modules/suiviFinanciers";
import _ from "lodash";

export default {
  components: {
    Multiselect,
    Vtable,
    Dashboard,
    Vmodal,
    Vbutton,
    Vform,
    Titre,
    SearchBar,
    ModalTopRight,
    JsonExcel,
    SuiviBudgetaire,
  },
  data() {
    return {
      loaderTab: [],
      suiviFinancierss: [],
      superTableauActivites: [],
      suiviFinancierPayload: {
        activiteId: null,
        trimestre: 1, // Trimestre actuel
        annee: new Date().getFullYear(), // Set current year as default
        consommer: 0,
        type: "",
      },
      years: [],
      oldTableau: [],
      oldValue: new Date().getFullYear().toString(),
      savedInput: [],
      showModal: false,
      showModal2: false,
      showModal3: false,
      showModalSuiviFinancier: false,
      ajoutSuiviLoader: false,
      title: "",
      file: "",
      chargement: false,
      showInfo: false,
      suiviAttributs: ["consommer", "type", "trimestre", "annee", "activiteId"],
      suiviAttributsRecherche: ["trimestre", "annee", "activiteId", "bailleurId"],
      champs: [
        {
          name: "Consommer",
          key: "consommer",
          type: "number",
          placeholdere: "",
          isSelect: false,
          isTextArea: false,
          data: "",
          required: true,
          errors: [],
        },
        {
          name: "Source",
          key: "type",
          placeholdere: "Selectionnez la source",
          isSelect: true,
          isTextArea: false,
          data: "",
          options: this.$store.state.sources,
          cle: "id",
          value: "nom",
          required: true,
          errors: [],
        },
        {
          name: "Année",
          key: "annee",
          placeholdere: "Selectionnez une année",
          isSelect: true,
          isTextArea: false,
          data: "",
          options: this.years,
          cle: "id",
          value: "nom",
          required: true,
          errors: [],
        },
        // { name: "Année", key: "annee", type: "number", placeholdere: "", isSelect: false, isTextArea: false, data: "", required: true, errors: [] },
        {
          name: "Activité",
          key: "activiteId",
          type: "",
          placeholdere: "Sélectionnez une activité",
          isSelect: true,
          isTextArea: false,
          loaderActivity: true,
          data: "",
          options: this.activites,
          cle: "id",
          value: "nom",
          required: true,
          errors: [],
        },
        {
          name: "Trimestre",
          key: "trimestre",
          type: "",
          placeholdere: "Sélectionnez un trimestre",
          isSelect: true,
          isTextArea: false,
          data: "",
          options: this.$store.state.trimestres,
          cle: "valeur",
          value: "trimestre",
          required: true,
          errors: [],
        },
      ],
      champsRecherche: [],
      cols: 2,
      headers: [
        { name: "Code PTAB", cle: "codePta" },
        { name: "Activité", cle: "nom" },
        { name: "Trimestre", cle: "trimestre" },
        { name: "Consommer", cle: "consommer", monaie: true },
        { name: "Année", cle: "annee" },
        { name: "Date de création", cle: "created_at" },
      ],
      search: "",
      actions: [{ name: "supprimer", iconne: "" }],
      suiviFinancier: [],
      annee: "",
      bailleur: "",
      trimestre: "",
      bailleurs: [],
      filtreInfos: {},
      suiviFinancierVisible: false,
      suiviFinancierUpdate: false,
      suiviFinancierDelete: false,
      suiviFinancierAdd: false,
      importerSuiviFinance: false,
      exporterSuiviFinance: false,
      activites: [],
      verification: true,
      loadingBailleur: true,
      loadingSuivi: true,
      loadingFiltre: true,
    };
  },

  computed: {
    //importation des variables du module auths
    ...mapState({
      identifiant: (state) => state.auths.identifiant,
      //    suiviFinancier: (state) => state.suiviFinanciers.suiviFinancier,
      currentYearsActivites: (state) => state.yearsActivites,
      loaderActivites: (state) => state.filtreActivitesLoader,
      loading: (state) => state.loading,
      errors: (state) => state.errors,
    }),
    ...mapGetters({
      projets: "projets/getProjets",
      //  activites: "activites/getActivites",
      isLoading: "IS_LOADING",
      currentUser: "auths/GET_AUTHENTICATE_USER",
    }),

    title_csv() {
      return "suivi budgetaire trimestre -" + this.currentTrimestre + "-" + new Date();
    },

    json_data() {
      const data = [];
      if (this.suiviFinancier != undefined || this.suiviFinancier != null) {
        this.suiviFinancier.forEach((element) => {
          const bailleur = element.bailleur;
          const activites = element.activite.nom;
          const trimestre = element.trimestre;
          const p_budget = element.periode.budjet;
          const p_consommer = element.periode.consommer;
          const p_disponible = element.periode.disponible;
          const p_pourcentage = element.periode.pourcentage;
          const e_budget = element.exercice.budjet;
          const e_consommer = element.exercice.consommer;
          const e_disponible = element.exercice.disponible;
          const e_pourcentage = element.exercice.pourcentage;
          const c_budget = element.cumul.budjet;
          const c_consommer = element.cumul.consommer;
          const c_disponible = element.cumul.disponible;
          const c_pourcentage = element.cumul.pourcentage;
          data.push({
            bailleur,
            activites,
            trimestre,
            p_budget,
            p_consommer,
            p_disponible,
            p_pourcentage,
            e_budget,
            e_consommer,
            e_disponible,
            e_pourcentage,
            c_budget,
            c_consommer,
            c_disponible,
            c_pourcentage,
          });
        });
        return data;
      }
    },

    /*  filteredSuivis(){
         var self = this;

         return this.suiviFinanciers?.suiviFinanciers?.filter(function (suiviFinancier){
           return suiviFinancier.codePta.toLowerCase().indexOf(self.search.toLowerCase()) >= 0 ||
                  suiviFinancier.nom.toLowerCase().indexOf(self.search.toLowerCase()) >= 0;
               });
     }, */
  },

  methods: {
    //Charger les fonctions de communication avec le serveur
    ...mapMutations({
      setErrors: "SET_ERRORS_MESSAGE", // map `this.setErrors()` to `this.$store.commit('SET_ERRORS_MESSAGE')`,
      setSuiviFinancier: "suiviFinanciers/FILL", // map `this.CREATE_INSTANCE_PROJET()` to `this.$store.commit('CREATE_INSTANCE_PROJET')`
    }),

    getType(obj) {
      return Object.prototype.toString.call(obj).slice(8, -1);
    },

    ...mapActions("suiviFinanciers", {
      fetchSuiviFinanciers: "FETCH_LIST_SUIVIFINANCIER",
      filter: "FILTRE_SUIVIFINANCIER",
      saveSuiviFinancier: "STORE_SUIVIFINANCIER",
      updateSuiviFinancier: "UPDATE_SUIVIFINANCIER",
      deleteSuiviFinancier: "DESTROY_SUIVIFINANCIER",
    }),
    ...mapActions({
      activeLoader: "updapefiltreActivitesLoader",
    }),
    getSuivi() {
      SuiviFinancierService.byProgramme(this.currentUser.programme.id)
        .then((data) => {
          this.suiviFinancier = data.data.data.suiviFinanciers;
          this.annee = data.data.data.annee;
        })
        .catch((e) => {
          this.$toast.error(e);
        });
    },
    getPermission() {
      this.currentUser.role[0].permissions.forEach((element) => {
        if (element.slug === "voir-un-suivi-financier") {
          this.suiviFinancierVisible = true;
        }
        if (element.slug === "creer-un-suivi-financier") {
          this.suiviFinancierAdd = true;
        }
        if (element.slug === "modifier-un-suivi-financier") {
          this.suiviFinancierUpdate = true;
        }
        if (element.slug === "supprimer-un-suivi-financier") {
          this.suiviFinancierDelete = true;
        }
        if (element.slug === "importer-un-suivi-financier") {
          this.importerSuiviFinance = true;
        }
        if (element.slug === "exporter-un-suivi-financier") {
          this.exporterSuiviFinance = true;
        }
      });
    },

    ...mapActions("projets", { fetchProjets: "FETCH_LIST_PROJET" }),

    ...mapActions("activites", {
      fetchActivites: "FETCH_LIST_ACTIVITE_OF_PROGRAMME",
    }),

    ...mapActions("activites", {
      fetchFiltreActivites: "FETCH_FILTRE_ACTIVITE_OF_PROGRAMME",
    }),

    async updateInputData(id, attribut, value) {
      await this.updateSuiviFinancier({ suivi: { [attribut]: value }, id: id })
        .catch((value, status) => {
          if (this.hasErrors[attribut] !== undefined) alert(this.hasErrors[attribut]);
        })
        .finally(() => {
          $("#" + "dataTable").load(location.href + "#" + id + ">*", "");
        });
    },
    resetForm() {
      this.champs = this.champs.map((item) => {
        item.data = "";
        return item;
      });

      window.document.getElementById("vform")?.reset();

      this.setSuiviFinancier({});
    },
    sendForm2() {
      this.suiviFinancierss.forEach((item) => {
        item.activiteId = item.activiteId.id;
        // item.annee = item.annee.nom;
        item.type = item.type.id;
      });

      for (let index = 0; index < this.suiviFinancierss.length; index++) {
        this.saveSuiviFinancier(this.suiviFinancierss[index]).then((response) => {
          if (response.status === 200 || response.status === 201) {
            if (this.suiviFinancierss.length - 1 === index) {
              this.showModalSuiviFinancier = false;
              this.$toast.success("Ajout de suivi financier réussie");

              setTimeout(() => {
                this.suiviFinancierss = [];

                this.suiviFinancierPayload = {
                  activiteId: null,
                  trimestre: 1, // Trimestre actuel
                  annee: new Date().getFullYear(), // Set current year as default
                  consommer: 0,
                  type: "",
                };
              }, 500);
            }
          }
        });
      }
    },
    removePlan(index) {
      this.suiviFinancierss.splice(index, 1);
      this.superTableauActivites.splice(index, 1);
      this.loaderTab.splice(index, 1);
    },

    sendForm() {
      this.champs = this.champs.map((item) => {
        item.errors = [];
        return item;
      });

      let suivi = extractFormData(this.champs, this.suiviAttributs);

      let annee = suivi.annee.nom;
      suivi.annee = annee;
      suivi.type = suivi.type.id;
      suivi.trimestre = suivi.trimestre.valeur;
      suivi.activiteId = suivi.activiteId.id;

      this.saveSuiviFinancier(suivi).then((response) => {
        if (response.status === 200 || response.status === 201) {
          this.close();
          this.verification = false;
          this.resetForm();
          this.champs[2].data = this.years[this.years.length - 1];
          this.verification = true;
          localStorage.removeItem("formData");
          this.getSuivi();
        }
      });
    },
    filtre() {
      this.champsRecherche = this.champsRecherche.map((item) => {
        item.errors = [];
        return item;
      });

      let suivi = extractFormData(this.champsRecherche, this.suiviAttributsRecherche);

      suivi.trimestre = suivi.trimestre?.valeur;
      suivi.activiteId = suivi.activiteId?.id;
      suivi.bailleurId = suivi.bailleurId?.id;

      this.filtreInfos = suivi;

      this.filter(suivi).then((response) => {
        if (response.status == 200 || response.status == 201) {
          this.suiviFinancier = response.data.data.suiviFinanciers;
          this.annee = response.data.data.annee;
          this.filtreInfos.bailleur = response.data.data.bailleur;
          this.showInfo = true;
          this.close2();
        }
      });
    },
    previewFiles(event) {
      this.file = event.target.files[0];
    },
    importData() {
      const formData = new FormData();
      formData.append("fichier", this.file);
      SuiviFinancier.importCSV(formData)
        .then((data) => {
          this.$toast.success("importation reussie");
        })
        .catch((e) => {
          this.$toast.error(e);
        });
    },

    async supprimer(suivi) {
      if (window.confirm("Voulez-vous supprimer ce suivi ")) await this.deleteSuiviFinancier(suivi.id);
    },
    close() {
      this.showModal = false;
      this.verification = false;
      this.resetForm();
      this.champs[2].data = this.years[this.years.length - 1];
      this.verification = true;
    },

    closeA() {
      this.showModal = false;
      this.savedInput = [];
      for (let i = 0; i < this.champs.length; i++) {
        this.savedInput.push(this.champs[i].data);
      }
      const parsed = JSON.stringify(this.savedInput);
      localStorage.setItem("formData", parsed);
    },
    close2() {
      this.showModal3 = false;
    },
    closeSuiviModal() {
      this.showModalSuiviFinancier = false;
      // this.savedInput = [];
      // for (let i = 0; i < this.champs.length; i++) {
      //   this.savedInput.push(this.champs[i].data);
      // }
      // const parsed = JSON.stringify(this.savedInput);
      // localStorage.setItem("formData", parsed);
    },
    active() {
      this.$store.dispatch("active");
    },
    disabled() {
      this.$store.dispatch("disabled");
    },
    getCurrentQuarter() {
      const month = new Date().getMonth() + 1; // Les mois sont indexés à partir de 0
      return Math.ceil(month / 3);
    },
    addPlan() {
      this.suiviFinancierPayload.id = Date.now() + "-" + Math.random().toString(36).substr(2, 9);
      this.suiviFinancierss.push(this.suiviFinancierPayload);
      this.superTableauActivites.push(this.activites);
      this.loaderTab.push(false);
    },
    ouvrirModalSuiviFinancierActivite() {
      if (this.currentYearsActivites.length > 0) {
        this.activites = this.currentYearsActivites.map((value) => {
          value.nom = `${value.codePta} – ${value.nom}`;
          return value;
        });
      } else {
        if (localStorage.getItem("filtreActivite") !== null) {
          this.activites = JSON.parse(localStorage.getItem("filtreActivite")).map((value) => {
            value.nom = `${value.codePta} – ${value.nom}`;
            return value;
          });
        }
      }

      this.superTableauActivites = [];

      this.suiviFinancierss = [];

      const newItem = {
        activiteId: null,
        trimestre: 1, // Trimestre actuel
        annee: new Date().getFullYear(), // Set current year as default
        consommer: 0,
        type: "",
        id: Date.now() + "-" + Math.random().toString(36).substr(2, 9),
      };

      this.suiviFinancierPayload.trimestre = this.getCurrentQuarter();
      // this.suiviFinancierPayload.id = Date.now() + "-" + Math.random().toString(36).substr(2, 9);
      this.suiviFinancierss.push(newItem);
      this.superTableauActivites.push(this.activites);
      // this.superTableauActivites.push(this.activites);
      this.loaderTab.push(false);
      this.showModalSuiviFinancier = true;
    },

    addSuivi() {
      //

      this.title = "Ajouter un Suivi";

      if (this.currentYearsActivites.length > 0) {
        this.activites = this.currentYearsActivites.map((value) => {
          value.nom = `${value.codePta} – ${value.nom}`;
          return value;
        });
      } else {
        if (localStorage.getItem("filtreActivite") !== null) {
          this.activites = JSON.parse(localStorage.getItem("filtreActivite")).map((value) => {
            value.nom = `${value.codePta} – ${value.nom}`;
            return value;
          });
        }
      }

      let formData = this.champs.map((value) => {
        if (value.key === "activiteId") {
          value["options"] = this.activites;
        } else if (value.key === "trimestre") {
          value["options"] = this.$store.state.trimestres;
        } else if (value.key === "type") {
          value["options"] = this.$store.state.sources;
        }

        return value;
      });

      this.champs = formData;

      this.showModal = true;
    },
    showFiltreModal() {
      this.title = "Filtre";

      // let formData = this.champsRecherche.map((value) => {
      //     if (value.key === "activiteId") {
      //         value["options"] = this.activites;
      //     } else if (value.key === "trimestre") {
      //         value["options"] = this.$store.state.trimestres;
      //     }

      //     return value;
      // });

      // this.champsRecherche = formData;
      if (this.currentYearsActivites.length > 0) {
        this.activites = this.currentYearsActivites.map((value) => {
          value.nom = `${value.codePta} – ${value.nom}`;
          return value;
        });
      } else {
        if (localStorage.getItem("filtreActivite") !== null) {
          this.activites = JSON.parse(localStorage.getItem("filtreActivite")).map((value) => {
            value.nom = `${value.codePta} – ${value.nom}`;
            return value;
          });
        }
      }

      this.showModal3 = true;
    },
    modifier(data) {
      localStorage.removeItem("formData");

      this.title = "Modifier un Suivi";
      this.showModal = true;
      alert(data + " à ete modifier");
    },

    getPtaFiltre() {
      let data = {};
      this.chargement(true);
      if (this.ppm == null) {
        data = {
          bailleurId: this.bailleur.id,
          programmeId: this.currentUser.programme.id,
          annee: Number(this.annee),
        };
      } else {
        data = {
          bailleurId: this.bailleur.id,
          programmeId: this.currentUser.programme.id,
          annee: Number(this.annee),
          ppm: this.ppm,
        };
      }

      PtabService.getFiltre(data)
        .then((data) => {
          this.ptab = data.data.data;
          this.openFiltre = false;
          this.chargement(false);
        })
        .catch((e) => {
          this.chargement(false);
          this.$toast.error(e);
        });
    },

    getBailleur() {
      BailleursService.get()
        .then((data) => {
          const datas = data.data.data;
          this.bailleurs = datas;
          this.champsRecherche = [
            {
              name: "Année",
              key: "annee",
              placeholdere: "Selectionnez une année",
              isSelect: true,
              isTextArea: false,
              data: "",
              options: this.years,
              cle: "id",
              value: "nom",
              required: false,
              errors: [],
            },
            {
              name: "Activité",
              key: "activiteId",
              type: "",
              placeholdere: "Sélectionnez une activité",
              isSelect: true,
              isTextArea: false,
              data: "",
              options: this.activites,
              cle: "id",
              value: "nom",
              required: false,
              errors: [],
            },
            {
              name: "Trimestre",
              key: "trimestre",
              type: "",
              placeholdere: "Sélectionnez un trimestre",
              isSelect: true,
              isTextArea: false,
              data: "",
              options: this.$store.state.trimestres,
              cle: "valeur",
              value: "trimestre",
              required: false,
              errors: [],
            },
            {
              name: "Bailleur",
              key: "bailleurId",
              type: "",
              placeholdere: "Sélectionnez un bailleur",
              isSelect: true,
              isTextArea: false,
              data: "",
              options: datas,
              cle: "id",
              value: "sigle",
              required: false,
              errors: [],
            },
          ];
        })
        .catch((e) => {
          this.$toast.error(e);
        });
    },
    getFiltreActivites2(years, index) {
      this.loaderTab[index] = true;

      ProgrammeService.filtreActivites({ annee: years })
        .then((data) => {
          //  this.activites = data.data.data;

          this.$set(this.loaderTab, index, false);

          //this.loaderTab[index] = false;

          this.activites = this.activites.map((value) => {
            value.nom = `${value.codePta} – ${value.nom}`;
            return value;
          });

          this.superTableauActivites[index] = this.activites;

          console.log(" console.log(this.superTableauActivites[index])", this.superTableauActivites[index]);
          localStorage.setItem("filtreActivite", JSON.stringify(data.data.data));

          this.champs[3].options = this.activites;
          this.disabled();
        })
        .catch((error) => {
          console.log(error);
          this.$set(this.loaderTab, index, false);
          // this.loaderTab[index] = false;
          this.activeLoader(false);
          this.disabled();
          if (error.response) {
            // Requête effectuée mais le serveur a répondu par une erreur.
            const message = error.response.data.message;
            this.$toast.error(message);
          } else if (error.request) {
            // Demande effectuée mais aucune réponse n'est reçue du serveur.
            //console.log(error.request);
          } else {
            // Une erreur s'est produite lors de la configuration de la demande
            //console.log('dernier message', error.message);
          }
        });
    },
    getFiltreActivites() {
      // this.active();
      this.activeLoader(true);
      ProgrammeService.filtreActivites({ annee: this.oldValue })
        .then((data) => {
          this.activeLoader(false);
          this.activites = data.data.data;
          this.activites = this.activites.map((value) => {
            value.nom = `${value.codePta} – ${value.nom}`;
            return value;
          });
          localStorage.setItem("filtreActivite", JSON.stringify(data.data.data));

          this.champs[3].options = this.activites;
          this.disabled();
        })
        .catch((error) => {
          this.activeLoader(false);
          this.disabled();
          if (error.response) {
            // Requête effectuée mais le serveur a répondu par une erreur.
            const message = error.response.data.message;
            this.$toast.error(message);
          } else if (error.request) {
            // Demande effectuée mais aucune réponse n'est reçue du serveur.
            //console.log(error.request);
          } else {
            // Une erreur s'est produite lors de la configuration de la demande
            //console.log('dernier message', error.message);
          }
        });
    },
  },

  mounted() {
    this.getPermission();

    if (!this.suiviFinancierVisible) {
      this.$router.push("/401-non-autorise");
    } else {
      var anneeActuelle = new Date().getFullYear() + 5;
      let i = 0;
      for (var annee = 2016; annee <= anneeActuelle; annee++) {
        i++;
        this.years.push({ id: i, nom: `${annee}` });
      }

      this.champs[2].options = this.years;
      console.log(this.years[this.years.length - 6]);
      this.champs[2].data = this.years[this.years.length - 6];
      this.getSuivi();
      this.getBailleur();
      this.currentYearsActivites;

      if (!this.loaderActivites) {
        this.getFiltreActivites();
      }

      // this.getFiltreActivites();
      // this.fetchActivites(this.currentUser?.programme?.id);
    }
  },

  watch: {
    loading: function (value) {
      //this.loading = value
    },
    suiviFinancierss: {
      handler(newVal) {
        newVal.forEach((item, index) => {
          const oldItem = this.oldTableau[index] || {}; // Évite les erreurs si `oldTableau[index]` est vide

          // console.log("oldItem.annee", oldItem.annee);
          // console.log("item.annee", item.annee);

          if (oldItem && oldItem && item.annee !== oldItem.annee) {
            console.log(_.isEqual(oldItem, {}));

            //  if (_.isEqual(oldItem, {})) {
            //    this.getFiltreActivites2(parseInt(item.annee), index);
            //  } else {
            //    this.getFiltreActivites2(parseInt(item.annee.nom), index);
            //  }
          }
        });

        // this.oldTableau = _.cloneDeep(this.suiviFinancierss);
      },
      // handler(newVal) {
      //   newVal.forEach((item, index) => {
      //     const oldItem = this.oldTableau[index] || {}; // Évite les erreurs si `oldTableau[index]` est vide

      //     console.log("oldItem", oldItem);
      //    if (!_.isEqual(item, oldItem)) {
      //    console.log("item", item);
      //    console.log("oldItem", oldItem);
      //    if (_.isEqual(oldItem, {})) {
      //      this.getFiltreActivites2(parseInt(item.annee), index);
      //    } else {
      //      this.getFiltreActivites2(parseInt(item.annee.nom), index);
      //    }
      //  }
      //});

      // Mise à jour avec une copie indépendante
      //   this.oldTableau = _.cloneDeep(this.suiviFinancierss);
      //  },
      deep: true,
    },
    champs: {
      handler(newValue, oldvalue) {
        if (newValue[2].data.nom !== this.oldValue) {
          if (this.verification) {
            //  this.active();
            this.activeLoader(true);
            ProgrammeService.filtreActivites({ annee: newValue[2].data.nom })
              .then((data) => {
                this.oldValue = newValue[2].data.nom;
                this.activites = data.data.data;
                this.activites = this.activites.map((value) => {
                  value.nom = `${value.codePta} – ${value.nom}`;
                  return value;
                });

                newValue[3].options = this.activites;
                this.activeLoader(false);
              })
              .catch((error) => {
                this.activeLoader(false);
                if (error.response) {
                  // Requête effectuée mais le serveur a répondu par une erreur.
                  const message = error.response.data.message;
                  this.$toast.error(message);
                } else if (error.request) {
                  // Demande effectuée mais aucune réponse n'est reçue du serveur.
                  //console.log(error.request);
                } else {
                  // Une erreur s'est produite lors de la configuration de la demande
                  //console.log('dernier message', error.message);
                }
              });
          }
        }
      },
      deep: true,
    },
    errors: function (errors) {
      this.champs.forEach((value) => {
        value.errors = errors[value.key];
      });
      this.champsRecherche.forEach((value) => {
        value.errors = errors[value.key];
      });
      //this.errors = errors
    },

    // map du statut dans Store
    activites: function (activites) {
      this.champs.map((item) => {
        if (item.key === "activiteId") {
          item.options = activites.map((activite) => {
            return {
              id: activite.id,
              nom: activite.bailleur.sigle + "-" + activite.codePta + "-" + activite.nom,
            };
          });
        }
        return item;
      });

      this.champsRecherche.map((item) => {
        if (item.key === "activiteId") {
          item.options = activites.map((activite) => {
            return {
              id: activite.id,
              nom: activite.bailleur.sigle + "-" + activite.codePta + "-" + activite.nom,
            };
          });
        }
        return item;
      });
    },
  },
};
</script>

<style scoped></style>
