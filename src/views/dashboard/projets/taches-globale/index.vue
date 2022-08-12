<template>
  <dashboard>
    <div class="w-full px-4">
       <vmodal v-if="showProlonger" title="prolonger la date d'echeance " @close="showProlonger = false">
        <div style="width:60vw" class="p-4">
          <form @submit.prevent="saveProlongerDate(tacheId,dates)" action="">
            <div  class="grid grid-cols-2 gap-2 my-2">
              <div class="form-group my-2">
                <label class="text-xs font-semibold block text-gray-500 uppercase md:text-sm text-light">Date debut<span class="px-2 text-lg font-black text-red-700">*</span></label>
                <input v-model="dates.debut" required class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2 w-full  focus:border-transparent" type="date" />
              </div>
              <div class="form-group my-2">
                <label class="text-xs font-semibold block text-gray-500 uppercase md:text-sm text-light">Date fin <span class="px-2 text-lg font-black text-red-700">*</span></label>
                <input v-model="dates.fin" required class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2 w-full  focus:border-transparent" type="date"  />
              </div>
            </div>
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
          </form>
        </div>
      </vmodal>
      
      <modal-top-right v-if="showModal" :title="title" v-on:close="close">
          <div class="p-4">
            <vform
            template="default"
            :champs="champs"
            :cols="cols"
            :submitText="submitText"
            :sendRequest="sendRequest"
            @sendForm="sendForm"
            @closeModal="close">
            </vform>
          </div>
      </modal-top-right>

      <nav
        class="mb-2 mt-4 text-sm font-semibold flex justify-between items-center"
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

      <div class="flex items-center justify-between my-2">
        <div class="flex space-x-4">
          <span :class="{ 'border-primary border-b-8 font-bold': seeTache}" @click="gotoTache()" class="inline-block cursor-pointer text-lg uppercase border-primary py-2">Taches</span>
          <span :class="{ 'border-primary border-b-8 font-bold': seeSuivi}" @click="gotoSuivi()" class="inline-block cursor-pointer text-lg uppercase border-primary py-2">Suivi tache</span>
        </div>

        <button v-if="seeTache"   @click="addTache" title="ajouter une tache" class="px-4 py-2 flex overflow-hidden items-center text-xs font-semibold text-white uppercase bg-primary focus:outline-none focus:shadow-outline">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              style="fill: rgba(255, 255, 255, 1); transform: ; msfilter: ">
              <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
            </span>
          <span class="mx-2 text-xs font-semibold">ajouter une tâche</span>
        </button>
       
      </div>

      <!-- le filtre -->
      <div v-if="seeTache">
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
              <label for="" class="block text-sm font-semibold uppercase my-2 ">Selectionnez une activité</label>
              <multiselect
                v-model="valueFiltre"
                :options="activites"
                :preselect-first="true"
                :custom-label="customLabel" 
                placeholder="selectionnez l'activite"
                label="nom"
                track-by="id">
              </multiselect>
            </div>
              
            <button
                v-if="!showFiltre"
                title="filtre"
                @click="showFiltre = true"
                class="bg-primary flex items-center space-x-3 text-white px-2 py-1"
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
                  <span
                    @click="filtreRange(0)"
                    class="w-8 cursor-pointer text-left"
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
          <div class="flex   justify-between">
             <!--Filtre sur projet -->
             <h2 class="uppercase font-bold">Listes des taches </h2>
            <nav class="flex text-sm align-middle justify-evenly">
                <span
                  @click="toggle2"
                  :class="{ 'border-yellow-600 text-yellow-600': pending }"
                  class="inline-block px-4 py-2 font-semibold text-gray-700 uppercase border-b-8 border-transparent cursor-pointer"
                >
                  attentes
                  <span
                    class="px-2 text-base text-yellow-600 border border-yellow-600 rounded-full undefined"
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
              :libelle="tache.nom"
              :montantNE="tache.montantNE"
              :montantEPM="tache.montantEPM"
              @supprimer="supprimer(tache)"
              @modifier="modifier(tache)"
              @validation="validation(tache)"
              @prolonger="prolonger(tache)"
              @suivre="suivreMyTache(tache)"
            ></card-tache>
          </div>
        </div>
      </div>
      <div v-if="seeSuivi">
          <vtable
            id="datatable"
            :headers="headers"
            :datas="dataTable"
            :actions="actions"

            >
          </vtable>
      </div>
    </div>
  </dashboard>
</template>

<script>
import Vtable from '@/components/Vtable'
import Multiselect from 'vue-multiselect'
import SearchBar from '@/components/SearchBar'
import Titre from '@/components/Titre'
import Vmodal from '@/components/Vmodal'
import Vform from '@/components/Vform'
import ModalTopRight from '@/components/ModalTopRight'
import Dashboard from '@/layouts/Dashboard'
import CardTache from '@/components/CardTache.vue'
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
import { extractFormData, getStringValueOfStatutCode } from "@/utils/index";
import Composante from "@/store/modules/composantes/composante";
import Activite from "@/store/modules/activites/activite";
import TacheService from "@/services/modules/tache.service.js";
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
    Vform
  },
  data() {
    return {
      dates: {debut:'',fin:''},
      suivis:[],
      chargement:false,
      showProlonger:false,
      showModalSuivi:false,
      valueFiltre: null,
      composanteId: null,
      projetFiltre: null,
      composanteFiltre: null,
      sousComposanteFiltre: null,
      pending:false,
      success:true,
      rejected:false,
      rangeValue:0,
      programmeId: this.currentUser?.programme.id,
      cols: 1,
      sendRequest: false,
      submitText: "Enregistrer",
      showFiltre:false,
      showModal: false,
      showModal2: false,
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
      tacheAttributs : ['nom', 'description', 'debut', 'fin', 'tepPrevu', 'statut', 'poids'],

      champs:[

        {name: 'Nom de la tâche', key: "nom", type: 'text', placeholdere: "Nom de la tâche", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Poids', type: 'number', key: "poids", placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Taux d\'execution physique', key: "tepPrevu", type: 'number', placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Date de debut', key: "debut", type: 'date', placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Date de fin', key: "fin", type: 'date', placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Statut', key: "statut", type: '', placeholdere: 'Selectionnez le statut', isSelect: true, isTextArea: false, data:'', required: true, options: this.$store.state.statuts, cle: 'etat', value: 'nom',  errors : []},
        {name: 'Description', type: '', key: "description", placeholdere: 'Description de la tâche', isSelect: false, isTextArea: true, data:'', required: false, errors : []},
        
      ],
      champsSuiviTache:[
        {name: 'Tache ', key: "statut", type: '', placeholdere: 'Selectionnez une tache ', isSelect: true, isTextArea: false, data:'', required: true, options: [{nom:'tache 1'},{nom:'tache 2'}], cle: 'etat', value: 'nom',  errors : []},
        {name: 'Poids', type: 'number', key: "poids", placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        
      ],

   
      headers: [
        { name: "Tache", cle: "tache"},
        { name: "Description", cle: "description"},
        { name: "Budget Nationnal", cle:'bn'},
        { name: "Pret", cle:'pret'},
        { name: "Poids", cle:'poids'},
        { name: "date de creation", cle:'created_at'},
        
      ],

      dataTable:[
        {tache:"tache 1",description:"lorem ipsum",bn:"200000000",pret:"9540000000",poids:"5",created_at:"08/08/2022"}
      ],

      actions: [
       
      ],
      
    };
  },

  computed: {
    //importation des variables du module activites
    ...mapState({
      tache: (state) => state.taches.tache,
      loading: (state) => state.loading,
      errors: (state) => state.errors,
    }),

    ...mapGetters({
      projets: "projets/getProjets",
      composantes: "composantes/getComposantes",
      sousComposantes: "sousComposantes/getSousComposantes",
      activites: "activites/getActivites",
      taches: "taches/getTaches",
      tache: "taches/getTache",
      currentUser : 'auths/GET_AUTHENTICATE_USER'
    }),
  },

  methods: {
    //Charger les fonctions de communication avec le serveur
    ...mapMutations({
      setErrors: "SET_ERRORS_MESSAGE", // map `this.setErrors()` to `this.$store.commit('SET_ERRORS_MESSAGE')`,
      setTache: "taches/FILL", // map `this.CREATE_INSTANCE_PROJET()` to `this.$store.commit('CREATE_INSTANCE_PROJET')`
      setTaches: "taches/SET_LIST_TACHE_OF_ACTIVITE",
      setActivites: 'activites/SET_LIST_ACTIVITES',
      setComposantes: 'composantes/SET_LIST_COMPOSANTES',
      setSousComposantes: 'sousComposantes/SET_LIST_SOUSCOMPOSANTE'
    }),

    ...mapActions("taches", {
      fetchTaches: "FETCH_LIST_TACHE_OF_ACTIVITE",
      saveTache: "STORE_TACHE",
      updateTache: "UPDATE_TACHE",
      deleteTache: "DESTROY_TACHE",
    }),

    ...mapActions({
      fetchActivites: "activites/FETCH_LIST_ACTIVITE_OF_COMPOSANTE",
      fetchComposantes: "composantes/FETCH_LIST_COMPOSANTE_OF_PROJET",
      fetchSousComposantes: "sousComposantes/FETCH_LIST_SOUS_COMPOSANTE_OF_COMPOSANTE",
      fetchProjets: "projets/FETCH_LIST_PROJET_OF_PROGRAMME",
    }),

    customLabel ({ codePta, nom }) {
      return `${codePta} – ${nom}`
    },

    filtreRange(value){
      this.rangeValue = value
    },
    selectActivite ({ name}) {
      return `${name}`
    },

    addDate() {
      this.dates.push({});
    },
    deleteItem(item) {
      this.dates.splice(item, 1);
      alert(item)
    },
    prolonger(tache) {
      this.tacheId = tache.id
      this.showProlonger = true
    },
    saveProlongerDate(id,data) {
      this.chargement = true
      TacheService.addDate(id,data).then((data) => {
        alert('envoyer')
      }).catch((e) => {
        console.log(e)
      })
      this.chargement = false  
    },
    getSuivi() {
      TacheService.getSuivi().then((data) => {
        this.suivis = data.data
        console.log('mes suivis',this.suivis.data)
      }).catch((e) => {
        console.log(e)
      })
    },
    suivreMyTache(tache) {
      this.$router.push({name:'dashboard_projets_taches_globale_suivis',params:{id:tache.id}})
    },
    close() {
      this.showModal = false;
    },
    close2() {
      this.showModal2 = false;
    },
    addPlan() {
      this.title = "Ajouter un plan decaissement";
      this.showModal2 = true;
    },
    modifierPlan() {
      this.title = "Modifier un plan de decaissement";
      this.showModal2 = true;
    },
    dupliquerPlan() {
      this.title = "Dupliquer un plan decaissement";
      this.showModal2 = true;
    },

    addTache() {

      this.title ="Ajouter une activité"

      this.submitText="Enregistrer",

      this.showCloseModal(true)

    },

    

    suivreTache(data) {
       this.title ="Suivre une tache "

      this.submitText="Enregistrer",

      this.showModalSuivi = true
    },
    
    getNom(nom, prenom) {

      let name = ''

      if(nom !== undefined && nom !== null) name+= nom

      if(prenom !== undefined && prenom !== null ) name+= prenom

      return name;
    },

    supprimer(tache) {
      if(window.confirm("Voulez-vous supprimer la tache " + tache.nom)){
        if(this.sendRequest === false){
          this.sendRequest = true;
          this.deleteTache(tache.id)
            .finally((error) => {              
              this.sendRequest = false;
              this.fetchTaches(this.valueFiltre.id);
            });
        }
      }
    },

    modifier(tache) {

      this.title = 'Modifier une tache'

      this.setTache(tache)

      this.tacheAttributs.forEach((item) => {

        this.champs.find((value, index) => {

          if( value.key === "statut" && item === "statut"){

            this.$store.state.statuts.map((value) => {
              if(value.etat === tache[item]){
                this.champs[index]['data'] = value
              }
            });

          }
          else if(value.key === item){
            this.champs[index]['data'] = tache[item]
          }

        });

      });

      this.submitText = "Modifier",

      this.showCloseModal(true)
    },

    dupliquer() {
      this.title = "Dupliquer une activité";
      this.showModal = true;
    },

    gotoNext() {
      this.$router.push(
        "/dashboard/projets/composantes/sous-composantes/activites/taches"
      );
    },
     toggle() {
      this.pending = false
      this.rejected = false
      this.success = true

    },
    toggle2() {
      this.success = false
      this.rejected = false
      this.pending = true
    },
    toggle3() {
      this.pending = false
      this.success = false
      this.rejected = true
    },

    getStatus(status) {
      return getStringValueOfStatutCode(status);
    },

    validation(tache) {
      if (this.sendRequest === false) {
        this.sendRequest = true;

        this.updateTache({
          tache: { statut: -1, activiteId: this.valueFiltre.id },
          id: tache.id,
        })
          .finally((error) => {      
            this.sendRequest = false;        
            this.fetchTaches(this.valueFiltre.id);
          })
      }
    },

    sendForm() {
      if (this.sendRequest === false) {
        this.sendRequest = true;

        this.champs = this.champs.map((item) => {
          item.errors = [];
          return item;
        });

        let tache = extractFormData(this.champs, this.tacheAttributs);

        tache['activiteId'] = this.valueFiltre.id;

        tache.statut = tache.statut.etat;

        if (this.tache?.id) {
          this.updateTache({ tache: tache, id: this.tache?.id })
            .then((response) => {
              if (response.status === 200 || response.status === 201) {
                this.close();
              }
            })
            .finally((error) => {              
              this.fetchTaches(this.valueFiltre.id);
            });
        } else {
          this.saveTache(tache)
            .then((response) => {
              if (response.status === 200 || response.status === 201) {
                this.close();
              }
            })
            .finally((error) => {              
              this.fetchTaches(this.valueFiltre.id);
            });
        }

      }
    },

    close() {
      this.showCloseModal();

      this.resetForm();

      this.sendRequest = false;
    },

    resetForm(){

      this.champs = this.champs.map(item => { item['data'] = ''; return item})

      window.document.getElementById('vform').reset()

      this.setTache({})
    },

    showCloseModal(value = false) {
      this.showModal = value;
    },
    gotoSuivi() {
      this.seeSuivi = true
      this.seeTache = false
    },
    gotoTache() {
      this.seeSuivi = false
      this.seeTache = true
    }
  },

  watch: {
    loading: function (value) {
      //this.loading = value
    },

    errors: function (errors) {
      this.champs.forEach((value) => {
        if(value.key === "types"){

          value.errors = errors["type"];

        }
        else value.errors = errors[value.key];
      });

    },
    
    projets: function(projets){
      if(projets.length > 0){
        this.projetFiltre = projets[0]
      }
    },

    projetFiltre: function(valeur){

      if( valeur instanceof Composante || valeur instanceof Object )
      {
        this.fetchComposantes(valeur.id);
      }
      else if( valeur !== null && typeof valeur !== 'undefined' && valeur.length !== 0 ){
        this.fetchComposantes(valeur);
      }
      else{
        this.setComposantes([])
      }
    },

    composantes: function (composantes) {
      if(composantes.length > 0){
        this.composanteFiltre = composantes[0]
      }
      else{
        this.composanteFiltre = null
      }
    },

    composanteFiltre: function(valeur){

      if( valeur instanceof Composante || valeur instanceof Object )
      {
        this.fetchSousComposantes(valeur.id);
      }
      else if( valeur !== null && typeof valeur !== 'undefined' && valeur.length !== 0 ){
        this.fetchSousComposantes(valeur);
      }
      else{
        this.setSousComposantes([])
      }
    },

    sousComposantes: function (sousComposantes) {
      if(sousComposantes.length > 0){
        this.sousComposanteFiltre = sousComposantes[0];
      }
      else if(this.composanteFiltre !== null && typeof this.composanteFiltre !== 'undefined' && this.composanteFiltre.length !== 0  ){
        this.fetchActivites(this.composanteFiltre.id);
        this.composanteId = this.composanteFiltre.id
        this.sousComposanteFiltre = null
        this.valueFiltre = null;
      }
      else{
        this.sousComposanteFiltre = null;
      }
    },

    sousComposanteFiltre: function(valeur){

      if( valeur instanceof Composante || valeur instanceof Object )
      {
        this.fetchActivites(valeur.id);
        this.composanteId = valeur.id
      }
      else if( valeur !== null && typeof valeur !== 'undefined' && valeur.length !== 0 ){
        this.fetchActivites(valeur);
        this.composanteId = valeur
      }
      else{
        this.setActivites([])
      }

    },

    activites: function (activites) {
      if(activites.length > 0){
        this.valueFiltre = activites[0]
      }
      else{
        this.valueFiltre = null
      }
    },

    valueFiltre: function (valeur) {
      if (valeur instanceof Activite || valeur instanceof Object) {
        this.fetchTaches(valeur.id);
      }

      else if( valeur !== null && typeof valeur !== 'undefined' && valeur.length !== 0 ){
        this.fetchTaches(valeur);
      }

    }

  },

  created() {
    this.getSuivi()
    this.programmeId = this.currentUser.programme.id

    if(this.programmeId){
      Promise.all([this.fetchProjets(this.programmeId) ]);
    }

  }

};
</script>

<style></style>
