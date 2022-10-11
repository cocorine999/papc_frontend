<template>
  <div class="w-full px-4">
    <nav
      class="mb-2 mt-4 text-xs md:text-sm font-semibold flex justify-between items-center flex-wrap"
      aria-label="Breadcrumb"
    >
      <div>
        <ol class="inline-flex p-0 list-none">
          <li class="flex items-center">
            <router-link to="" class="text-gray-600">dashboard</router-link>
            <svg
              class="w-3 h-3 mx-3 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path
                d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
              />
            </svg>
          </li>
          <li class="flex items-center">
            <router-link to="/dashboard/projets" class="text-gray-600"
              >projets</router-link
            >
            <svg
              class="w-3 h-3 mx-3 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path
                d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
              />
            </svg>
          </li>
          <li class="flex items-center text-blue-500">
            <router-link to="/dashboard/projets/taches-globale" class=""
              >taches</router-link
            >
          </li>
        </ol>
      </div>
      <div>
        <search-bar></search-bar>
      </div>
    </nav>

    <div class="flex items-center justify-between my-2" >
      <div class="flex space-x-4">
        <span
          :class="{ 'border-primary border-b-8 font-bold': seeTache }"
          @click="gotoTache()"
          class="inline-block cursor-pointer text-xs sm:text-sm  md:text-base uppercase border-primary py-2"
          >Taches</span
        >
       <!--  <span
          :class="{ 'border-primary border-b-8 font-bold': seeSuivi }"
          @click="gotoSuivi()"
          class="inline-block cursor-pointer text-xs sm:text-sm  md:text-base uppercase border-primary py-2"
          >Suivi tache</span -->
        >
      </div>
    </div>

    <!-- le filtre -->
    <div v-if="seeTache">
      <div class="p-4 my-4 rounded-sm shadow-md bg-gray-50">
        <!--Filtre sur projet -->
      <div class="w-full grid grid-cols-2 gap-4">
          <div>
            <label for="" class="block text-sm font-semibold uppercase my-2"
              >Selectionnez un projet</label
            >
            <multiselect
              v-model="projetFiltre"
              :options="projets"
              :custom-label="customLabel"
              :preselect-first="true"
              placeholder="selectionnez un projet"
              label="nom"
              track-by="id"
            ></multiselect>
          </div>
      </div>


      <!-- le filtre -->
      <div v-if="seeTache && tacheVisible">
        <div class="p-4 my-4 rounded-sm shadow-md bg-gray-50">
          <!--Filtre sur projet -->
          <div class="w-full grid grid-cols-2 gap-4">
           <div>
            <label for="" class="block text-sm font-semibold uppercase my-2 ">Selectionnez un projet</label>
            <multiselect v-model="projetFiltre" :options="projets" :custom-label="customLabel" :preselect-first="true" placeholder="selectionnez un projet" label="nom" track-by="id"></multiselect>
           </div>

           <div>
              <label for="" class="block text-sm font-semibold uppercase my-2 ">Selectionnez un composant</label>
             <multiselect v-model="composanteFiltre" :options="composantes" :custom-label="customLabel" :preselect-first="true" placeholder="selectionnez une composante" label="nom" track-by="id"></multiselect>
           </div>
          
            <div>
              <label for="" class="block text-sm font-semibold uppercase my-2 ">Selectionnez un sous composant</label>
              <multiselect
                v-model="sousComposanteFiltre"
                :options="sousComposantes"
                :preselect-first="true"
                :custom-label="customLabel" 
                placeholder="selectionnez une sous composante"
                label="nom"
                track-by="id">
              </multiselect>
            </div>

          <div>
            <label for="" class="block text-sm font-semibold uppercase my-2"
              >Selectionnez un sous composant</label
            >
            <multiselect
              v-model="sousComposanteFiltre"
              :options="sousComposantes"
              :preselect-first="true"
              :custom-label="customLabel"
              placeholder="selectionnez une sous composante"
              label="nom"
              track-by="id"
            >
            </multiselect>
          </div>

          <div>
            <label for="" class="block text-sm font-semibold uppercase my-2"
              >Selectionnez une activité</label
            >
            <multiselect
              v-model="valueFiltre"
              :options="activites"
              :preselect-first="true"
              :custom-label="customLabel"
              placeholder="selectionnez l'activite"
              label="nom"
              track-by="id"
            >
            </multiselect>
          </div>

          <button
            v-if="!showFiltre"
            title="filtre"
            @click="showFiltre = true"
            class="bg-primary flex items-center space-x-3 text-white px-2 py-1 text-sm"
          >
            <svg
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
              height="1.5em"
              width="1.5em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"
              ></polygon>
            </svg>
            <span>progression des taches </span>
          </button>
          <div v-else class="px-6 w-full">
            <div class="bg-gray-300 h-2 w-full rounded-full relative">
              <span
                class="bg-white h-4 w-4 absolute top-0 -ml-2 -mt-1 z-10 shadow rounded-full cursor-pointer"
                :style="`left:${rangeValue}%`"
              ></span>
              <span
                class="bg-green-500 h-2 absolute left-0 top-0 rounded-full"
                :style="`width:${rangeValue}%`"
              ></span>
            </div>
            <div class="flex justify-between mt-2 text-xs text-gray-600">
              <span @click="filtreRange(0)" class="w-8 cursor-pointer text-left"
                >0%</span
              >
              <span
                @click="filtreRange(25)"
                class="w-8 cursor-pointer text-center"
                >25%</span
              >
              <span
                @click="filtreRange(50)"
                class="w-8 cursor-pointer text-center"
                >50%</span
              >
              <span
                @click="filtreRange(75)"
                class="w-8 cursor-pointer text-center"
                >75%</span
              >
              <span
                @click="filtreRange(100)"
                class="w-8 cursor-pointer text-right"
                >100%</span
              >
              <button
                @click="showFiltre = false"
                class="text-white bg-blue-300 p-1"
              >
                revenir
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="p-4 mt-12 rounded-sm shadow-md relative bg-white">
        <div class="flex justify-between">
          <!--Filtre sur projet -->
          <h2 class="uppercase font-bold">Listes des taches</h2>
          <nav class="flex text-sm align-middle justify-evenly">
            <span
              @click="toggle2"
              :class="{ 'border-yellow-600 text-yellow-600': pending }"
              class="inline-block px-4 py-2 font-semibold text-gray-700 uppercase border-b-8 border-transparent cursor-pointer"
            >
              attentes
              <span
                class="px-2 text-base text-yellow-600 border border-yellow-600 rounded-full undefined "
              >
                5
              </span>
            </span>
            <span
              @click="toggle"
              :class="{ 'border-green-600 text-green-600': success }"
              class="inline-block px-4 py-2 font-semibold text-gray-700 uppercase border-b-8 border-transparent cursor-pointer"
            >
              validés
              <span
                class="px-2 text-base text-green-600 border border-green-600 rounded-full undefined"
              >
                9
              </span>
            </span>
            <span
              @click="toggle3"
              :class="{ 'border-red-600 text-red-600': rejected }"
              class="inline-block px-4 py-2 font-semibold text-gray-700 uppercase border-b-8 border-transparent cursor-pointer"
            >
              rejetés
              <span
                class="px-2 text-base text-red-600 border border-red-600 rounded-full undefined"
              >
                8
              </span>
            </span>
          </nav>
        </div>
      </div>
      <div class="my-4 grid lg:grid-cols-3 md:grid-cols-2 sm:gap-5">
        <div v-for="(tache, index) in taches" :key="index">
          <card-tache
            :id="tache.id"
            :bailleur="tache.bailleur.sigle"
            :statut="getStatus(tache.statut)"
            :poids="tache.poids"
            :poidsActuel="tache.poidsActuel"
            :libelle="tache.nom"
            :montantNE="tache.montantNE"
            :montantEPM="tache.montantEPM"
            :isDelete="tacheDelete"
            :isUpdate="tacheUpdate"
          ></card-tache>
        </div>
      </div>
    </div>
    <!-- <div v-if="seeSuivi">
      <suivi :suivis="results.suivis"></suivi>
    </div> -->
    </div>
    </div>
  </div>
</template>

<script>
import Vtable from "@/components/Vtable";
import Multiselect from "vue-multiselect";
import SearchBar from "@/components/SearchBar";
import Titre from "@/components/Titre";
import Vmodal from "@/components/Vmodal";
import Vform from "@/components/Vform";
import ModalTopRight from "@/components/ModalTopRight";
import Dashboard from "@/layouts/Dashboard";
import CardTache from "@/components/CardTache.vue";
import { mapGetters, mapActions } from "vuex";
import { getStringValueOfStatutCode } from "@/utils/index";
import Composante from "@/store/modules/composantes/composante";
import Activite from "@/store/modules/activites/activite";
import Suivi from "@/components/revisiteTache/Suivi.vue";
export default {
  components: {
    Dashboard,
    Vmodal,
    Titre,
    SearchBar,
    ModalTopRight,
    Multiselect,
    CardTache,
    Vtable,
    Suivi,
    Vform,
  },
  props:['version'],
  data() {
    return {
      dates: { debut: "", fin: "" },
      suivis: [],
      chargement: false,
      showProlonger: false,
      showModalSuivi: false,
      valueFiltre: null,
      composanteId: null,
      projetFiltre: null,
      composanteFiltre: null,
      sousComposanteFiltre: null,
      pending: false,
      success: true,
      rejected: false,
      rangeValue: 0,
      programmeId: this.currentUser?.programme.id,

      sendRequest: false,
      submitText: "Enregistrer",
      showFiltre: false,
      line: false,
      mosaique: true,
      isStateChange: false,
      seeSuivi: false,
      seeTache: true,
      options:[
        {name:'activite 1'},
        {name:'activite 2'},
        {name:'activite 3'},
        {name:'activite 4'},
        {name:'activite 5'},
      ],
      tacheId:'',
      tacheAttributs : ['nom', 'description', 'debut', 'fin', 'tepPrevu', 'poids'],

      champs:[

        {name: 'Nom de la tâche', key: "nom", type: 'text', placeholdere: "Nom de la tâche", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Poids', type: 'number', key: "poids", placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Taux d\'execution physique', key: "tepPrevu", type: 'number', placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Date de debut', key: "debut", type: 'date', placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Date de fin', key: "fin", type: 'date', placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Description', type: '', key: "description", placeholdere: 'Description de la tâche', isSelect: false, isTextArea: true, data:'', required: false, errors : []},
        
      ],
      champsSuiviTache:[
        {name: 'Tache ', key: "statut", type: '', placeholdere: 'Selectionnez une tache ', isSelect: true, isTextArea: false, data:'', required: true, options: [{nom:'tache 1'},{nom:'tache 2'}], cle: 'etat', value: 'nom',  errors : []},
        {name: 'Poids', type: 'number', key: "poids", placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        
      ],
      tacheVisible:false,
      tacheAdd:false,
      tacheDelete:false,
      tacheUpdate:false,

      actions: [
       
      ],
      
      tacheId: "",

      projets: [],
      composantes: [],
      sousComposantes: [],
      activites: [],
      taches: [],
      suivis: [],
      results: [],
    };
  },

  computed: {
    ...mapGetters({
      currentUser: "auths/GET_AUTHENTICATE_USER",
    }),
    ...mapGetters('auths', {currentUser : 'GET_AUTHENTICATE_USER'})
  },

  methods: {
    ...mapActions({
      getPtabReviser: "revisionPtab/GET_PTAB_REVISER",
    }),

    getPermission() {
      this.currentUser.role[0].permissions.forEach(element => {
          if(element.slug ==='voir-une-tache') {
            this.tacheVisible = true
          }
          if(element.slug === 'creer-une-tache') {
            this.tacheAdd = true
          }
            if(element.slug === 'modifier-une-tache') {
              this.tacheUpdate = true
            }
            if(element.slug ==='supprimer-une-tache') {
              this.tacheDelete = true
            } 
        });
    },
    customLabel({ codePta, nom }) {
      return `${codePta} – ${nom}`;
    },

    filtreRange(value) {
      this.rangeValue = value;
    },

    selectActivite({ name }) {
      return `${name}`;
    },

    getNom(nom, prenom) {
      let name = "";

      if (nom !== undefined && nom !== null) name += nom;

      if (prenom !== undefined && prenom !== null) name += prenom;

      return name;
    },

    gotoNext() {
      this.$router.push(
        "/dashboard/projets/composantes/sous-composantes/activites/taches"
      );
    },
    toggle() {
      this.pending = false;
      this.rejected = false;
      this.success = true;
    },
    toggle2() {
      this.success = false;
      this.rejected = false;
      this.pending = true;
    },
    toggle3() {
      this.pending = false;
      this.success = false;
      this.rejected = true;
    },

    getStatus(status) {
      return getStringValueOfStatutCode(status);
    },

    gotoSuivi() {
      this.seeSuivi = true;
      this.seeTache = false;
    },

    gotoTache() {
      this.seeSuivi = false;
      this.seeTache = true;
    },
  },

  watch: {
    version: function (version) {
      const params = {
        "version": version,
        "composantes": null,
        "sous-composantes": null,
        "activites": null,
        "taches": null,
      };

      this.getPtabReviser(params).then((value) => {
        this.results = value.data.data;
      });
    },

    results: function (results) {
      this.projets = results["projets"];

      if (results["projets"].length > 0) {
        this.projetFiltre = results[0];
      }
    },

    projets: function (projets) {
      if (projets.length > 0) {
        this.projetFiltre = projets[0];
      }
    },

    projetFiltre: function (valeur) {
      if (valeur instanceof Composante || valeur instanceof Object) {
        this.composantes = this.results["composantes"].filter((value) => {
          if (value.projetId === valeur.id) return value;
        });
      } else if (
        valeur !== null &&
        typeof valeur !== "undefined" &&
        valeur.length !== 0
      ) {
        this.composantes = this.results["composantes"].filter((value) => {
          if (value.projetId === valeur) return value;
        });
      } else {
        this.composantes = [];
      }
    },

    composantes: function (composantes) {
      if (composantes.length > 0) {
        this.composanteFiltre = composantes[0];
      } else {
        this.composanteFiltre = null;
      }
    },

    composanteFiltre: function (valeur) {
      if (valeur instanceof Composante || valeur instanceof Object) {
        this.sousComposantes = this.results["sous-composantes"].filter(
          (value) => {
            if (value.composanteId === valeur.id) return value;
          }
        );
      } else if (
        valeur !== null &&
        typeof valeur !== "undefined" &&
        valeur.length !== 0
      ) {
        this.sousComposantes = this.results["sous-composantes"].filter(
          (value) => {
            if (value.composanteId === valeur) return value;
          }
        );
      } else {
        this.setSousComposantes = [];
      }
    },

    sousComposantes: function (sousComposantes) {
      if (sousComposantes.length > 0) {
        this.sousComposanteFiltre = sousComposantes[0];
      } else if (
        this.composanteFiltre !== null &&
        typeof this.composanteFiltre !== "undefined" &&
        this.composanteFiltre.length !== 0
      ) {
        this.activites = this.results["activites"].filter((value) => {
          if (value.composanteId === this.composanteFiltre.id) return value;
        });

        this.composanteId = this.composanteFiltre.id;
        this.sousComposanteFiltre = null;
        this.valueFiltre = null;
      } else {
        this.sousComposanteFiltre = null;
      }
    },

    sousComposanteFiltre: function (valeur) {
      if (valeur instanceof Composante || valeur instanceof Object) {
        this.activites = this.results["activites"].filter((value) => {
          if (value.composanteId === valeur.id) return value;
        });

        this.composanteId = valeur.id;
      } else if (
        valeur !== null &&
        typeof valeur !== "undefined" &&
        valeur.length !== 0
      ) {
        this.activites = this.results["activites"].filter((value) => {
          if (value.composanteId === valeur) return value;
        });

        this.composanteId = valeur;
      } else {
        this.activites = [];
      }
      
    },

    activites: function (activites) {
      if (activites.length > 0) {
        this.valueFiltre = activites[0];
      } else {
        this.valueFiltre = null;
      }
    },

    valueFiltre: function (valeur) {
      if (valeur instanceof Activite || valeur instanceof Object) {
        this.taches = this.results["taches"].filter((value) => {
          if (value.activiteId === valeur.id) return value;
        });
      } else if (
        valeur !== null &&
        typeof valeur !== "undefined" &&
        valeur.length !== 0
      ) {
        this.taches = this.results["taches"].filter((value) => {
          if (value.activiteId === valeur) return value;
        });
      }
    },
  },

  created() {
    this.getPermission()
    const params = {
      "version": this.version,
      "composantes": null,
      "sous-composantes": null,
      "activites": null,
      "taches": null,
    };

    this.getPtabReviser(params).then((value) => {
      this.results = value.data.data;
    });
  },
};
</script>

<style></style>
