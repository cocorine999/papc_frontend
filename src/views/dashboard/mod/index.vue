<template>
  <dashboard>
    <div class="w-full">
      <div v-if="showModal">
        <modal-top-right :title="title" v-on:close="closeA">
          <div class="px-4 overflow-y-auto">
            <vform template="default" :champs="champs" :cols="cols" :submitText="submitText" @sendForm="sendForm"
              @closeModal="close"></vform>
          </div>
        </modal-top-right>
      </div>


      <div v-if="showModal2">
        <modal-top-right :title="title2" v-on:close="closeB">
          <div class="px-4 overflow-y-auto">
            <vform template="default" :champs="passationChamps" isAllPairSaufDescrip="true" :cols="colsPassation"
              submitText="Creer la passation" @sendForm="sendForm2" @addSomeThing="addSite" @closeModal="close2"></vform>
          </div>
        </modal-top-right>
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
                  type="text" placeholder="Entrer un " />
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
            @click="supprimerMods(deleteData)">Supprimer</button>
        </div>
      </delete-alert>

      <nav class="text-sm font-semibold flex items-center " aria-label="Breadcrumb">
        <div>
          <ol class="inline-flex p-0 list-none">
            <li class="flex items-center">
              <router-link to="#" class="text-gray-600">dashboard</router-link>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path
                  d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
              </svg>
            </li>

            <li class="flex items-center text-blue-500">
              <router-link to="" class="">MOD</router-link>
            </li>
          </ol>
        </div>
      </nav>

      <div class="flex items-center justify-between my-2">
        <div class="flex space-x-4">
          <span @click="goMod" v-if="modVisible" :class="{ 'border-primary border-b-8': seeMod }"
            class="inline-block cursor-pointer text-base uppercase font-bold py-2">Listes MOD
          </span>
          <span v-if="passationVisible" @click="goPassation" :class="{ 'border-primary border-b-8': seePassation }"
            class="inline-block cursor-pointer text-base uppercase font-bold py-2">Passation de marché
          </span>

        </div>

        <button v-if="seeMod && modAdd" @click="addMod" title="Ajouter un MOD"
          class="py-2 px-4 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase bg-primary focus:outline-none focus:shadow-outline">
          <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              style="fill: rgba(255, 255, 255, 1); transform: ; msfilter: ">
              <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
            </svg></span>
          <span class="mx-2 text-xs  md:text-sm font-semibold">Ajouter</span>
        </button>
        <button v-if="seePassation && passationAdd" @click="addPassation" title="Ajouter une passation de marché"
          class="py-2 px-4 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase bg-primary focus:outline-none focus:shadow-outline">
          <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              style="fill: rgba(255, 255, 255, 1); transform: ; msfilter: ">
              <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
            </svg></span>
          <span class="mx-2 text-xs  md:text-sm font-semibold">Ajouter</span>
        </button>
      </div>

      <div v-if="seeMod" class="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-4 my-1  lg:my-6">
        <div v-for="mod in mods" :key="mod.id">
          <card-mod :libelle="mod.user.nom" :contact="mod.user.contact" :email="mod.user.email"
            @supprimer="supprimerMod(mod)" @modifier="modifierMod(mod)" @dupliquer="dupliquerMod(mod)"
            :isDelete="modDelete" :isUpdate="modUpdate">
          </card-mod>
        </div>
      </div>

      <div v-if="seePassation">
        <vtable :headers="headers" :datas="passations" :actions="actions" @supprimer="supprimerPassation"></vtable>
      </div>
    </div>
  </dashboard>
</template>

<script>
import Dashboard from "@/layouts/Dashboard";
import CardMod from "@/components/CardMod";
import Vtable from "@/components/Vtable";
import Vmodal from "@/components/Vmodal";
import Vform from "@/components/Vform";
import DeleteAlert from "@/components/DeleteAlert.vue";
import { mapGetters, mapMutations, mapActions, mapState } from "vuex";
import extractFormData from "@/utils/extract-data";
import ModService from "@/services/modules/mod.service"
import ModalTopRight from "@/components/ModalTopRight";
import CardChecklist from "@/components/CardChecklist";
import Multiselect from 'vue-multiselect';
export default {
  components: {
    CardMod,
    Dashboard,
    Vtable,
    Vform,
    Vmodal,
    DeleteAlert,
    ModalTopRight,
    CardChecklist,
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
      // données du modal de site
      showSiteModal: false,
      savedInput: [],
      showModal: false,
      showModal2: false,
      seeMod: true,
      seePassation: false,
      seeChecklist: false,
      showInput: true,
      uploadFile: false,
      currentRole: '',
      title: "",
      title2: "",
      submitText: "Enrégistrer",
      modAttributs: ["nom", "email", "contact"],
      champs: [
        {
          name: "Nom",
          key: "nom",
          type: "text",
          placeholdere: "",
          isSelect: false,
          isTextArea: false,
          data: "",
          required: true,
          errors: [],
        },
        {
          name: "Email",
          key: "email",
          type: "email",
          placeholdere: "",
          isSelect: false,
          isTextArea: false,
          data: "",
          required: true,
          errors: [],
        },
        {
          name: "Contact",
          key: "contact",
          type: "number",
          placeholdere: "",
          isSelect: false,
          isTextArea: false,
          data: "",
          required: true,
          errors: [],
        },
        {
          name: "Logo",
          key: "logo",
          type: "file",
          placeholdere: "Votre logo",
          isSelect: false,
          isTextArea: false,
          data: "",
          required: true,
          errors: [],
        },
      ],
      passationAttributs: ["modId", "siteId", "entrepriseExecutanteId", "dateDobtention", "dateDeSignature", "dateDeDemarrage", "datePrevisionnel", "dateDobtentionAvance", "montantAvance", "estimation", "ordreDeService", "travaux", "responsableSociologue", "montant"],
      passationChamps: [
        { name: 'Mod', key: 'modId', type: '', placeholdere: "Selectionnez un mod", isSelect: true, isTextArea: false, data: '', required: true, options: this.mods, cle: 'id', value: 'nom', errors: [] },
        { name: 'Site', key: 'siteId', type: '', placeholdere: "Selectionnez un site", isSelect: true, canAdd: true, isTextArea: false, data: '', options: this.sites, cle: 'id', value: 'nom', required: true, errors: [] },
        { name: 'Entreprise Executante', key: 'entrepriseExecutanteId', type: '', placeholdere: "Selectionnez une entreprise", isSelect: true, isTextArea: false, data: '', options: this.entreprisesExecutante, cle: 'id', value: 'nom', required: true, errors: [] },
        { name: 'Montant passation', key: 'montant', type: 'number', placeholdere: "Montant passation", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },
        { name: 'Date obtention', key: 'dateDobtention', type: 'date', placeholdere: "Date obtention", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },
        { name: 'Date signature', key: 'dateDeSignature', type: 'date', placeholdere: "Date signature", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },
        { name: 'Date Demarrage', key: 'dateDeDemarrage', type: 'date', placeholdere: "Date de Demarrage", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },
        { name: 'Date previsionnelle', key: 'datePrevisionnel', type: 'date', placeholdere: "Date de previsionnelle", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },
        { name: 'Date  obtention avance', key: 'dateDobtentionAvance', type: 'date', placeholdere: "Date obtention avance", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },
        { name: 'Montant avance', key: 'montantAvance', type: 'number', placeholdere: "Montant avance", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },
        { name: 'Estimation', key: 'estimation', type: 'number', placeholdere: "Estimation", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },
        { name: 'Ordre de service', key: 'ordreDeService', type: 'text', placeholdere: "Ordre de service", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },
        { name: 'Travaux', key: 'travaux', type: 'text', placeholdere: "", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },
        { name: 'Responsable sociologue', key: 'responsableSociologue', type: 'text', placeholdere: "", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },
      ],
      cols: 1,
      colsPassation: 2,
      headers: [
        { name: "Nom createur", cle: "createur", width: "w-24" },
        { name: "Site", cle: "site", width: "w-36" },
        { name: "MOD", cle: "mod", width: "w-36" },
        {
          name: "Montant passation",
          cle: "montant_passation",
          width: "w-24",
        },
        { name: "Date obtention", cle: "date_obtention", width: "w-24" },
        { name: "Date demarrage", cle: "date_demarrage", width: "w-24" },
        { name: "Date signature", cle: "date_signature", width: "w-24" },
        {
          name: "date previsionnelle",
          cle: "date_previsionnelle",
          width: "w-24",
        },
        { name: "Date obtention avance", cle: "date_avance", width: "w-40" },
        { name: "Montant avance", cle: "montant_avance", width: "w-24" },
        { name: "Estimation", cle: "estimation", width: "w-24" },
        { name: "Ordre de service", cle: "ordre_service", width: "w-24" },
        { name: "travaux", cle: "travaux", width: "w-24" },
        {
          name: "Responsable sociologue",
          cle: "responsable_sociologue",
          width: "w-24",
        },
        { name: "Date de creation", cle: "created_at", width: "w-28" },
      ],
      headers: [
        { name: 'Site', cle: 'site', width: "w-36" },
        { name: 'Mod', cle: 'passationable', width: "w-36" },
        { name: 'Montant passation', cle: 'montant', width: "w-24" },
        { name: 'Date obtention', cle: 'dateDobtention', width: "w-24" },
        { name: 'Date obtention', cle: 'dateDobtentionAvance', width: "w-24" },
        { name: 'Date demarrage', cle: 'dateDeDemarrage', width: "w-24" },
        { name: 'Date signature', cle: 'dateDeSignature', width: "w-24" },
        { name: 'Date previsionnelle', cle: 'datePrevisionnel', width: "w-24" },
        { name: 'Montant avance', cle: 'montantAvance', width: "w-24" },
        { name: 'Estimation', cle: 'estimation', width: "w-24" },
        { name: 'Ordre de service', cle: 'ordreDeService', width: "w-24" },
        { name: 'travaux', cle: 'travaux', width: "w-24" },
        { name: 'Responsable sociologue', cle: 'responsableSociologue', width: "w-24" },
        { name: 'Date de creation', cle: 'dateDeCreation', width: "w-28" },
      ],
      actions: [
        { name: "modifier", iconne: "" },
        { name: "supprimer", iconne: "" },
      ],
      modVisible: false,
      modAdd: false,
      modDelete: false,
      modUpdate: false,
      passationVisible: false,
      passationAdd: false,
      passationDelete: false,
      passationUpdate: false,
      siteVisible: false,
      entreprisesExecutanteVisible: false,
      deleteData: {},
      deleteModal: false,

    };
  },

  computed: {
    ...mapGetters({
      hasErrors: "GET_ERREURS",
      isLoading: "IS_LOADING",
      mod: "mods/getMod",
      mods: "mods/getMods",
      passation: "passations/getPassation",
      passations: "passations/getPassations",
      entreprisesExecutante: "entreprisesExecutante/getEntreprisesExecutante",
      sites: "sites/getSites",
      // modal de site 
      site: "sites/getSite",
      entreprises: "entreprisesExecutante/getEntreprisesExecutante",
      bailleurs: "bailleurs/getBailleurs",
      // fin modal site
      currentUser: "auths/GET_AUTHENTICATE_USER",
    }),
    ...mapGetters('auths', { currentUser: 'GET_AUTHENTICATE_USER' })
  },

  methods: {
    ...mapMutations({
      setErrors: "SET_ERRORS_MESSAGE", // map `this.setErrors()` to `this.$store.commit('SET_ERRORS_MESSAGE')`,
      setMod: "mods/FILL", // map `this.CREATE_INSTANCE_PROGRAMME()` to `this.$store.commit('CREATE_INSTANCE_PROGRAMME')` 
      setSite: "Sites/FILL",  // for site modal
    }),

    ...mapActions(
      "mods", {
      fetchMods: "FETCH_LIST_MOD",
      saveMod: "STORE_MOD",
      updateMod: "UPDATE_MOD",
      deleteMod: "DESTROY_MOD",
    }
    ),
    ...mapActions('passations', {
      fetchPassations: "FETCH_LIST_MOD_PASSATION",
      savePassation: "STORE_PASSATION",
      updatePassation: "UPDATE_PASSATION",
      deletePassation: "DESTROY_PASSATION"
    }),
    ...mapActions('bailleurs', { fetchBailleurs: 'FETCH_LIST_BAILLEUR' }),

    ...mapActions("entreprisesExecutante", {
      fetchEntreprisesExecutante: "FETCH_LIST_ENTREPRISE_EXECUTANTE",
    }),
    // for site modal
    ...mapActions("sites", {
      fetchSites: "FETCH_LIST_SITE",
      saveSite: "STORE_SITE",
    }),
    // fin site modal

    getPermission() {
      this.currentUser.role[0].permissions.forEach(element => {
        if (element.slug === 'voir-un-mod') {
          this.modVisible = true
        }
        if (element.slug === 'modifier-un-mod') {
          this.modAdd = true
        }
        if (element.slug === 'modifier-un-mod') {
          this.modUpdate = true
        }
        if (element.slug === 'supprimer-un-mod') {
          this.modDelete = true
        }
        if (element.slug === 'voir-une-passation') {
          this.passationVisible = true
        }
        if (element.slug === 'modifier-une-passation') {
          this.passationAdd = true
        }
        if (element.slug === 'modifier-une-passation') {
          this.passationUpdate = true
        }
        if (element.slug === 'supprimer-une-passation') {
          this.passationDelete = true
        }
        if (element.slug === 'voir-une-entreprise-executante') {
          this.entreprisesExecutanteVisible = true
        }
        if (element.slug === 'voir-un-site') {
          this.siteVisible = true
        }
        if (element.slug === 'creer-un-site') {
          this.siteAdd = true
        }
      });

    },

    // site methods
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

    // fin site methods 
    addPassation() {
      this.title2 = "Ajouter une Passation";
      this.showModal2 = true;
    },

    goMod() {
      this.seeMod = true;
      this.seePassation = false;
    },

    goPassation() {
      this.seeMod = false;
      this.seePassation = true;
    },


    supprimerPassation(data) {
      alert(data + " à ete bien supprimer");
    },

    addMod() {
      this.title = "Ajouter";

      this.submitText = "Enrégistrer";

      this.showCloseModal(true);
    },

    modifierMod(mod) {
      localStorage.removeItem('formData')

      this.title = "Modification du MOD " + mod.user.nom;
      this.submitText = "Modifier";
      this.setMod(mod);
      this.modAttributs.forEach((item) => {
        this.champs.find((value, index) => {
          if (value.key === item) {
            this.champs[index]["data"] = this.mod.user[item];
          }
        });
      });

      this.showCloseModal(true);
    },

    supprimerMod(mod, index) {
      this.deleteModal = true
      this.deleteData.data = mod
      this.deleteData.index = index
    },

    supprimerMods(data) {
      //this.filteredIndicateur.splice(data.index,1)
      this.deleteModal = false
      ModService.destroy(data.data.id).then((data) => {
        this.$toast.success("Operation effectué avec success !")
        this.fetchMods();

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

    supprimerPassation(passation) {
      if (window.confirm("Voulez-vous supprimer la passation "))
        this.deletePassation(passation.id)
    },

    dupliquerMod(mod) {
      this.title = "Ajouter d'un nouveau MOD";

      this.submitText = "Enrégistrer";

      this.modAttributs.forEach((item) => {
        this.champs.find((value, index) => {
          if (value.key === item) {
            this.champs[index]["data"] = mod.user[item];
          }
        });
      });

      this.showCloseModal(true);
    },

    modifierChecklist() { },

    supprimerChecklist() { },

    dupliquerChecklist() { },

    close() {
      this.showCloseModal();
      this.resetForm();
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
    closeB() {
      this.showCloseModal2()
      this.savedInput = []
      for (let i = 0; i < this.passationChamps.length; i++) {
        this.savedInput.push(this.passationChamps[i].data)
      }
      const parsed = JSON.stringify(this.savedInput);
      localStorage.setItem('formData', parsed);
    },



    close2() {
      this.showCloseModal2()
      this.resetForm2()
    },

    showCloseModal2(value = false) {
      this.showModal2 = value
    },

    resetForm2() {

      this.passationChamps = this.passationChamps.map(item => { item.data = ''; return item })

      window.document.getElementById('vform')?.reset()

      this.setPassation({})
    },

    addPassation() {
      this.title2 = 'Ajouter'

      this.showCloseModal2(true)
    },

    sendForm2() {

      this.passationChamps = this.passationChamps.map(item => { item.errors = []; return item })

      let passation = extractFormData(this.passationChamps, this.passationAttributs)


      passation.siteId = passation.siteId.id

      passation.modId = passation.modId.id

      passation.entrepriseExecutantId = passation.entrepriseExecutanteId.id


      this.savePassation(passation).then(response => {
        if (response.status == 200 || response.status == 201) {
          this.close2()
        }

      })
    },

    showCloseModal(value = false) {
      this.showModal = value;
    },

    resetForm() {
      this.champs = this.champs.map((item) => {
        item.data = "";
        return item;
      });

      window.document.getElementById("vform")?.reset();

      this.setMod({});
    },



    sendForm() {
      this.champs = this.champs.map((item) => {
        item.errors = [];
        return item;
      });

      let mod = extractFormData(this.champs, this.modAttributs);

      mod.programmeId = this.currentUser?.programme?.id;

      if (this.mod?.id) {
        this.updateMod({ mod: mod, id: this.mod?.id })
          .then((response) => {
            if (response.status == 200 || response.status == 201) {
              this.close();
            }
          })
          .catch((value) => {
            alert(value.response.data.errors.programmeId[0]);
          });
      } else {
        this.saveMod(mod)
          .then((response) => {
            if (response.status == 200 || response.status == 201) {
              this.close();
            }
          })
          .catch((value) => {
            alert(value.response.data.errors.programmeId[0]);
          });
      }
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

    sites: function (sites) {
      this.passationChamps.map((item) => {
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
    mods: function (mods) {
      this.passationChamps.map((item) => {
        if (item.key === "modId") {
          item.options = mods.map((m) => {
            return {
              id: m.id,
              nom: m.user.nom,
            };
          });
        }
        return item;
      });
    },

    entreprisesExecutante: function (entrepriseExecutantes) {
      this.passationChamps.map((item) => {
        if (item.key === "entrepriseExecutanteId") {
          item.options = entrepriseExecutantes.map((m) => {
            return {
              id: m.id,
              nom: m.user.nom,
            };
          });
        }
        return item;
      });
    }
  },

  mounted() {

    this.getPermission()
    if (!this.modVisible) {
      this.$router.push('/401-non-autorise')
    }
    else {
      this.fetchMods();
      this.fetchPassations(this.currentUser?.programme?.id)
      if (this.entreprisesExecutanteVisible) {
        this.fetchEntreprisesExecutante()
      }
      if (this.siteVisible) {
        this.fetchSites(this.currentUser?.programme?.id)
      }

    }


  },
};
</script>

<style></style>
