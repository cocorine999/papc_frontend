<template>
  <dashboard>
    <div class="w-full">
      <div v-if="showModal">
        <ModalTopRight :title="title" v-on:close="closeA">
          <div class="px-4 overflow-y-auto">
            <vform template="default" isAllPairSaufDescrip="true" @closeModal="showModal = false" :champs="champs"
              :cols="cols" :sendRequest="sendRequest" submitText="Creer un pap" @sendForm="sendForm" @addSite="addSite" ></vform>
          </div>
        </ModalTopRight>
      </div>
      <div v-if="showModal2">
        <vmodal title="Importez les données " v-on:close="showModal2 = false">
          <form @submit.prevent="importData" style="width:500px" class="">
            <input
              class="block w-full text-xs md:text-sm text-gray-900 bg-gray-50  border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 placeholder:text-xs md:placeholder:text-sm"
              aria-describedby="file_input_help" id="file_input" @change="previewFiles" accept=".xlsx" type="file">
            <p class="my-4 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">FORMAT XLSX SEULEMENT AUTORISE
            </p>
            <div class="flex justify-end">
              <button type="submit"
                class="bg-primary  flex space-x-2  items-center text-white px-4 py-2 border border-primary font-semibold uppercase">
                <span class="text-sm font-semibold uppercase" v-if="!chargement">
                  importez
                </span>
                <span v-else class="flex items-center space-x-2">
                  <span class="text-xs px-4 font-semibold ">
                    chargement ...
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-center animate-spin" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </vmodal>
      </div>

      <div v-if="showSiteModal">
        <modal-top-right :title="title" v-on:close="closeSiteModal2">
          <div class="px-4 overflow-y-auto">
            <form action="" @submit.prevent="sendSiteForm" class="w-full">

              <div class="my-4">
                <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light"> Site <span
                    class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
                <input required v-model="nom"
                  class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent"
                  type="text" placeholder="Entrer le nom de l'activite" />
              </div>


              <div class="my-4">
                <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light">Bailleur <span
                    class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
                <select v-model="bailleur"
                  class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2 w-full  focus:border-transparent"
                  placeholder="selectionnez une entreprise" :selectLabel="'Appuyez sur Entrée pour sélectionner'"
                  :deselectLabel="'Appuyez sur Entrée pour supprimer'">
                  <option v-for="(item, i) in bailleurs" :key="i" :value="item.id">{{ item.sigle }}</option>
                </select>
              </div>

              <div class="my-4">
                <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light"> Selectionnez les
                  entreprises <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
                <multiselect v-model="value" tag-placeholder="selectionnez une entreprise"
                  placeholder="selectionnez une entreprise" label="nom" track-by="nom"
                  :selectLabel="'Appuyez sur Entrée pour sélectionner'"
                  :deselectLabel="'Appuyez sur Entrée pour supprimer'" :options="entreprises" :multiple="true"
                  :taggable="true" @tag="addTag"></multiselect>
              </div>

              <div class="my-4">
                <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light">Longitude <span
                    class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
                <input required v-model="longitude"
                  class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent"
                  type="number" step="0.01" placeholder="Entrer la longitude" />
              </div>

              <div class="my-4">
                <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light">Latitude <span
                    class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
                <input required v-model="latitude"
                  class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent"
                  type="number" step="0.01" placeholder="Entrer la latitude" />
              </div>


              <div class='flex items-center justify-center gap-4 pt-5 pb-5 my-4 md:gap-8'>
                <button type="submit"
                  class='w-auto px-4 py-2 font-medium text-white  shadow-xl bg-blue-500 hover:opacity-80'>
                  Creer le site
                </button>

                <button type="submit" @click="closeSiteModal"
                  class='w-auto px-4 py-2 font-medium text-white  shadow-xl bg-red-500 hover:opacity-80'>
                  Annuler
                </button>

              </div>
            </form>
          </div>
        </modal-top-right>
      </div>

      <delete-alert v-if="deleteModal" type="danger" title="Confirm Action" width="sm" v-on:close="deleteModal = false">
        <p class="text-gray-800">
          voulez vous supprimer cet element?
        </p>

        <div class="text-right mt-4">
          <button @click="deleteModal = false"
            class="px-4 py-2 text-sm text-gray-600 focus:outline-none hover:underline">Annuler</button>
          <button class="mr-2 px-4 py-2 text-sm rounded text-white bg-red-500 focus:outline-none hover:bg-red-400"
            @click="deletePaps(deleteData)">Supprimer</button>
        </div>
      </delete-alert>


      <nav class="text-xs md:text-sm font-semibold flex justify-between items-center flex-wrap" aria-label="Breadcrumb">
        <div>
          <ol class="inline-flex p-0 list-none">

            <li class="flex items-center ">
              <router-link to="#" class="text-gray-600">dashboard</router-link>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path
                  d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
              </svg>
            </li>

            <li class="flex items-center text-blue-500 ">
              <router-link to="" class="">Pap</router-link>
            </li>
          </ol>
        </div>
        <div></div>
        <div>
          <div class="w-full flex text-gray-600">
            <input @input="$emit('search', $event.target.value)"
              class="h-8 w-full px-5 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none relative -mr-9 block sm:block"
              v-model="search" type="text" name="search" placeholder="Rechercher">
            <button type="submit" class="relative  p-2 rounded-lg">
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

      <div class="flex justify-between items-center my-2">

        <div class="flex space-x-4">
          <span class="inline-block cursor-pointer  border-b-8 font-bold text-sm uppercase    border-primary py-2">Tableau
            recapitulatif </span>
        </div>

        <div class="flex space-x-3">
          <button @click="showModal2 = true" v-if="papImporter" title="importez les données"
            class="py-2 flex space-x-3  px-4 overflow-hidden  space-x-2 items-center text-xs font-semibold text-white uppercase bg-blue-500 focus:outline-none focus:shadow-outline">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em"
              width="1.3em" xmlns="http://www.w3.org/2000/svg">
              <path d="m12 18 4-5h-3V2h-2v11H8z"></path>
              <path
                d="M19 9h-4v2h4v9H5v-9h4V9H5c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-9c0-1.103-.897-2-2-2z">
              </path>
            </svg>
            <span class="mx-2 text-sm font-semibold">Importez les données</span>
          </button>
          <json-excel v-if="papExporter" :data="json_data()" header="PAP" type="xlsx" :name="title_csv()">
            <button title="exporter en excel"
              class="py-2  px-4 overflow-hidden  space-x-2 items-center text-xs font-semibold text-white uppercase bg-indigo-500 focus:outline-none focus:shadow-outline">
              <svg class="inline" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24"
                height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 16h2V7h3l-4-5-4 5h3z"></path>
                <path
                  d="M5 22h14c1.103 0 2-.897 2-2v-9c0-1.103-.897-2-2-2h-4v2h4v9H5v-9h4V9H5c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2z">
                </path>
              </svg>
              <span class="mx-2 text-xs  md:text-sm font-semibold">Export Excel</span>
            </button>
          </json-excel>

          <button v-if="papAdd" @click="addPap" title="ajouter un tabelau"
            class="py-2 px-4 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase bg-primary focus:outline-none focus:shadow-outline">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;">
              <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
            </svg>
            <span class="mx-1 md:mx-2 text-xs font-semibold">Ajouter </span>
          </button>
        </div>
      </div>


      <section class="text-gray-600 body-font bg-gray-50 h-auto flex justify-center items-center">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap -m-4 text-center"   >
            <div class="p-4 sm:w-1/2 lg:w-1/4 w-full hover:scale-105 duration-500" v-for="(site, index) in paps.sites" :key="index">
              <div class=" flex items-center  justify-between p-4  rounded-lg bg-white shadow-indigo-50 shadow-md">
                <div>

                  <h3 class="mt-2 text-xl font-bold text-yellow-500 text-left" :style="`color:${site.bailleurCouleur}`">{{ site.total | formatNumber }} XOF</h3>
                  
                  <button
                    class="text-sm mt-6 px-4 py-2 bg-yellow-400 text-white rounded-lg  tracking-wider hover:bg-yellow-300 outline-none" :style="`background-color:${site.bailleurCouleur}`">{{ site.nom }}</button>
                </div>
                <div
                  class="bg-gradient-to-tr from-red-500 to-yellow-400 w-32 h-32  rounded-full shadow-2xl shadow-yellow-400 border-white  border-dashed border-2  flex justify-center items-center ">
                  <div>
                    <h1 class="text-white text-2xl">{{ site.bailleur }}</h1>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
    

    </section>


    <vtable v-if="!papDelete && !papUpdate" :sendRequest="false" :headers="headers" :datas="paps.sinistres"
      :search="search" :actions="actions" @supprimer="supprimer" @updateInputData="updateInputData" :total="'payer'" @retour="onRetour"></vtable>
    <vtable v-if="papDelete && papUpdate" :sendRequest="false" :headers="headers" :datas="paps.sinistres" :search="search"
      :actions="actions" @supprimer="supprimer" @updateInputData="updateInputData" :total="'payer'" @retour="onRetour"></vtable>
    <vtable v-if="!papDelete && papUpdate" :sendRequest="false" :headers="headers" :datas="paps.sinistres"
      :search="search" @updateInputData="updateInputData" :total="'payer'" @retour="onRetour"></vtable>

      <h2 class="text-gray-900 text-lg font-bold">Total Transféré</h2>
      <h3 class="mt-2 text-xl font-bold text-yellow-500 text-left">{{ total | formatNumber }} XOF</h3>
    </div>

  </dashboard>
</template>

<script>
import ModalTopRight from '@/components/ModalTopRight'
import SearchBar from '@/components/SearchBar'
import CardBailleur from '@/components/CardBailleur'
import Titre from '@/components/Titre'
import Vtable from '@/components/Vtable'
import Vform from '@/components/Vform'
import Vmodal from '@/components/Vmodal'
import DeleteAlert from "@/components/DeleteAlert.vue";
import Dashboard from '@/layouts/Dashboard'
import JsonExcel from "vue-json-excel"
import PapService from "@/services/modules/paps.service";
import Multiselect from 'vue-multiselect';

import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
import { extractFormData } from '@/utils/index'

export default {
  components: {
    Vtable,
    Dashboard,
    Vmodal,
    Vform,
    CardBailleur,
    DeleteAlert,
    Titre,
    SearchBar,
    ModalTopRight,
    JsonExcel,
    Multiselect,

  },
  data() {
    return {
      value: [],
      nom: "",
      longitude: "",
      latitude: "",
      bailleur: null,
      entrepriseExecutantId: "",
      showSiteModal: false,
      sendRequest: false,
      showModal: false,
      showModal2: false,
      showInput: true,
      title: '',
      total:0,
      cols: [],
      sexe: [
        {
          sigle: 'M',
          nom: 'Masculin'
        },
        {
          sigle: 'F',
          nom: 'Feminin'
        }
      ],
      search: '',
      papAttributs: ['nom', 'rue', 'longitude', 'latitude', 'sexe', 'contact', 'siteId', 'montant', 'payer', 'referencePieceIdentite', 'statut', 'modeDePaiement', 'dateDePaiement'],
      champs: [
        { name: ' N° Rue', key: 'rue', type: 'number', placeholdere: "", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },
        { name: ' Longitude', key: 'longitude', type: 'text', placeholdere: "", isSelect: false, isTextArea: false, data: '', required: false, errors: [] },
        { name: ' Latitude', key: 'latitude', type: 'text', placeholdere: "", isSelect: false, isTextArea: false, data: '', required: false, errors: [] },
        { name: 'Site', key: 'siteId', type: '', placeholdere: "Selectionnez un site",isSite:true, isSelect: true, isTextArea: false, data: '', options: this.sites, cle: 'id', value: 'nom', required: true, errors: [] },
        { name: ' Nom et prenoms', key: 'nom', type: 'text', placeholdere: "", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },
        { name: 'Sexe', key: 'sexe', type: '', placeholdere: "Selectionnez le sexe", isSelect: true, isTextArea: false, data: '', options: this.sexe, cle: 'sigle', value: 'nom', required: true, errors: [] },
        { name: ' Contact ', key: 'contact', type: 'number', placeholdere: "", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },
        { name: 'Référence Pièces identité', key: 'referencePieceIdentite', type: 'text', placeholdere: "", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },
        { name: 'Statut', key: 'statut', type: 'text', placeholdere: "", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },
        { name: 'Mode de paiement', key: 'modeDePaiement', type: 'text', placeholdere: "", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },
        { name: ' Indeminisation', key: 'montant', type: 'number', placeholdere: "", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },
        { name: ' Transféré', key: 'payer', type: 'number', placeholdere: "", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },
        { name: 'Date de paiement', key: "dateDePaiement", type: 'date', placeholdere: "", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },

      ],
      cols: 2,
      headers: [
        { name: 'N° Rue', cle: 'rue' },
        { name: 'Longitude', cle: 'longitude' },
        { name: 'Latitude', cle: 'latitude' },
        { name: 'Bailleur', cle: 'bailleur' },
        { name: 'Site', cle: 'site' },
        { name: 'Nom et prenom', cle: 'nom' },
        { name: 'Sexe', cle: 'sexe' },
        { name: 'Contact', cle: 'contact' },
        { name: 'Reference Pieèce Identite', cle: 'referencePieceIdentite' },
        { name: 'Statut', cle: 'statut' },
        { name: 'Mode de paiement', cle: 'modeDePaiement' },
        { name: 'Indeminisation', cle: 'montant' },
        { name: 'Transféré', cle: 'payer', monaie: true },
        { name: 'Date de paiement', cle: 'dateDePaiement' },
        { name: 'Date de creation', cle: 'dateDeCreation' },

      ],
      actions: [
        { name: 'supprimer', iconne: '' },
      ],
      file: '',
      papVisible: false,
      papAdd: false,
      papDelete: false,
      papUpdate: false,
      papImporter: false,
      papExporter: false,
      deleteData: {},
      deleteModal: false,
      savedInput:[]
    }

  },

  computed: {

    //importation des variables du module auths
    ...mapState({
      identifiant: state => state.auths.identifiant,
      pap: state => state.paps.pap,
      loading: state => state.loading,
      errors: state => state.errors
    }),

    ...mapGetters({
      hasErrors: "GET_ERREURS",
      isLoading: "IS_LOADING",
      paps: "paps/getPaps",
      pap: "paps/getPap",
      sites: "sites/getSites",
      site: "sites/getSite",
      entreprises: "entreprisesExecutante/getEntreprisesExecutante",
      bailleurs: "bailleurs/getBailleurs",
      currentUser: 'auths/GET_AUTHENTICATE_USER'
    }),
    ...mapGetters('auths', { currentUser: 'GET_AUTHENTICATE_USER' })

  },

  methods: {
    //Charger les fonctions de communication avec le serveur
    ...mapMutations({
      setErrors: 'SET_ERRORS_MESSAGE', // map `this.setErrors()` to `this.$store.commit('SET_ERRORS_MESSAGE')`,
      setPap: 'paps/FILL', // map `this.CREATE_INSTANCE_PAP()` to `this.$store.commit('CREATE_INSTANCE_PROJET')`
      setSite: "Sites/FILL",
    }),

    previewFiles(event) {
      const data = event.target.files[0]
      this.file = data

    },

    ...mapActions('paps', {
      fetchPaps: "FETCH_LIST_PAP",
      savePap: "STORE_PAP",
      updatePap: "UPDATE_PAP",
      deletePap: "DESTROY_PAP",
      importSinistre: "IMPORTATION_PAP"
    }),

    ...mapActions('sites', { fetchSites: 'FETCH_LIST_SITE',saveSite: "STORE_SITE",}),

    ...mapActions('bailleurs', { fetchBailleurs: 'FETCH_LIST_BAILLEUR' }),

    ...mapActions("entreprisesExecutante", {
      fetchEntreprisesExecutante: "FETCH_LIST_ENTREPRISE_EXECUTANTE",
    }), 

    addAno() {
      this.title = 'Ajouter un element'
      this.showModal = true
    },

    getPermission() {
      this.currentUser.role[0].permissions.forEach(element => {
        if (element.slug === 'voir-un-pap') {
          this.papVisible = true
        }
        if (element.slug === 'creer-un-pap') {
          this.papAdd = true
        }
        if (element.slug === 'modifier-un-pap') {
          this.papUpdate = true
        }
        if (element.slug === 'supprimer-un-pap') {
          this.papDelete = true
        }
        if (element.slug === 'importer-un-pap') {
          this.papImporter = true
        }
        if (element.slug === 'exporter-un-pap') {
          this.papExporter = true
        }
        if (element.slug === 'voir-un-site') {
          this.siteVisible = true
        }
        if (element.slug === 'creer-un-site') {
          this.siteAdd = true
        }

      });

    },
    onRetour(data)
    {
      this.total = data
    },
    close() {
      this.showCloseModal()
      this.resetForm()
    },
    closeA() {
      this.showCloseModal()

      this.savedInput = []
      for (let i = 0; i < this.champs.length; i++) {
        this.savedInput.push(this.champs[i].data)
      }
      const parsed = JSON.stringify(this.savedInput);
      localStorage.setItem('formData', parsed);
    },
    addSite() {
      this.showSiteModal = true
      this.title = 'Ajouter un nouveau site'
      
   this.fetchSites(this.currentUser?.programme?.id)
   this.fetchEntreprisesExecutante();
   this.fetchBailleurs()

    },
    closeSiteModal2() {
      this.showSiteModal = false;

      this.savedInput.push(this.nom),
        this.savedInput.push(this.bailleur),
        this.savedInput.push(this.value)
      this.savedInput.push(this.longitude),
        this.savedInput.push(this.latitude)

      const parsed = JSON.stringify(this.savedInput);
      localStorage.setItem('formData', parsed);

    },
    closeSiteModal() {
      this.showSiteModal = false;
      this.nom = "",
        this.bailleur = null,
        this.value = [],
        this.longitude = "",
        this.latitude = ""
      localStorage.removeItem('formData');
    },

    sendSiteForm() {
      var entrepriseExecutantId = []

      this.value.forEach(element => {
        entrepriseExecutantId.push(element.id)
      });

      let site = {
        "nom": this.nom,
        "longitude": this.longitude,
        "latitude": this.latitude,
        "bailleurId": this.bailleur,
        "entrepriseExecutantId": entrepriseExecutantId
      }

      this.saveSite(site).then((response) => {
        if (response.status == 200 || response.status == 201) {
          this.$toast.success('operation effectuer avec sucess')
          this.fetchSites(this.currentUser?.programme?.id)
          this.showSiteModal = false;
          this.nom = "",
            this.bailleur = null,
            this.value = [],
            this.longitude = "",
            this.latitude = ""
          localStorage.removeItem('formData');
        }
      }).catch((e) => {
        this.$toast.error(e)
        this.sendRequest = false
      });

    },
    title_csv() {
      return "paps-" + "-" + new Date()
    },

    json_data() {
      let tab = [];

      this.paps.sinistres.forEach(element => {
        tab.push(
          {
            rue: element.rue,
            longifilteredAnotude: element.longitude,
            latitude: element.latitude,
            bailleur: element.bailleur,
            site: element.site,
            nom_prenoms: element.nom,
            sexe: element.sexe,
            contact: element.contact,
            reference_piece_identite: element.referencePieceIdentite,
            statut: element.statut,
            mode_de_paiement: element.modeDePaiement,
            indeministation: element.montant,
            transferer: element.payer,
            date_de_paiement: element.dateDePaiement,
            date_de_creation: element.dateDeCreation
          }
        );
      });
      return tab;
    },

    showCloseModal(value = false) {
      this.showModal = value
    },
    addPap() {
      this.title = 'Ajouter un nouveau pap'

      let formData = this.champs.map((value) => {
        if (value.key === 'siteId') {
          value['options'] = this.sites
        }

        else if (value.key === 'sexe') {
          value['options'] = this.sexe
        }


        return value
      })

      this.champs = formData

      this.showCloseModal(true)
    },

    importData() {
      const formData = new FormData();
      formData.append('fichier', this.file);
      this.importSinistre(formData).then((data) => {

        this.$toast.success("importation reussie")
      }).catch((e) => {
        this.$toast.error(e)
      })

    },


    /*filteredPap(){

        var self = this;
        var colonnes = [];
        var i = 0;

        this.headers.forEach(element => {
          if(this.cols[i])
          {
            colonnes.push(element.cle)
          }

          i++;
        });

        if(colonnes.length)
        {
          return this.paps.sinistres.filter(function (pap){
            return pap[colonnes[0]].toString().toLowerCase().indexOf(self.search.toLowerCase()) >= 0
            
                 
          });  
        }

        else
        {
          return this.paps.sinistres.filter(function (pap){
            
            for(let header of self.headers)
            {
              if(pap[header.cle].toString().toLowerCase().indexOf(self.search.toLowerCase()) >= 0)
              {
                 return pap
              }
            }

          });
        }
        
    },*/



    resetForm() {
      this.champs = this.champs.map(item => { item.data = ''; return item })
      window.document.getElementById('vform').reset()

      this.pap = {}
    },

    async updateInputData(id, attribut, value) {

      await this.updatePap({ pap: { [attribut]: value }, id: id }).catch((value, status) => {
        if (this.hasErrors[attribut] !== undefined)
          alert(this.hasErrors[attribut])
      }).finally(() => {
        $('#' + "dataTable").load(location.href + '#' + id + '>*', '')
      })

    },

    sendForm() {
      this.champs = this.champs.map(item => { item.errors = []; return item })

      let pap = extractFormData(this.champs, this.papAttributs)

      pap.programmeId = this.currentUser?.programme?.id

      pap.siteId = pap.siteId.id

      pap.sexe = pap.sexe.sigle
      PapService.create(pap).then((data) => {
        this.$toast.success("enregistrement éffectué avec success")
        this.fetchPaps({ id: this.currentUser?.programme?.id })
        this.resetForm

        this.showModal = false

      }).catch((e) => {
        this.$toast.error(e)
      })
    },
    supprimer(pap, index) {
      this.deleteModal = true
      this.deleteData.data = pap
      this.deleteData.index = index
    },

    deletePaps(data) {
      //this.filteredIndicateur.splice(data.index,1)
      this.deleteModal = false
      PapService.destroy(data.data.id).then((data) => {
        this.$toast.success("Operation effectué avec success !")
        this.fetchPaps({ id: this.currentUser?.programme?.id })

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



  },

  watch: {
    loading: function (value) {
      //this.loading = value
    },

    errors: function (errors) {
      this.champs.forEach((value) => { value.errors = errors[value.key] })
      //this.errors = errors
    },

    sites: function (sites) {
      this.champs.map((item) => {
        if (item.key === "siteId") {
          item.options = sites.map((site) => {
            return {
              id: site.id,
              nom: site.nom,
            };
          });
        }
        return item;
      });
    },
    entreprises: function (entreprises) {
      this.entreprises.map((item) => {
        item.nom = item.user.nom
        return item;

      });
    },
   

  },

  created() {

    this.getPermission()
    if (!this.papVisible) {
      this.$router.push('/401-non-autorise')
    }

    this.fetchPaps({ id: this.currentUser?.programme?.id }).then((value) => {
      console.log(value.data)
      this.total = value.data.data.total

    })

    this.fetchSites(this.currentUser?.programme?.id)


  }
}
</script>

