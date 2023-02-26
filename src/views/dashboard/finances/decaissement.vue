<template>
  <dashboard>
    <modal-chat v-if="showComment" title="espace commentaire" v-on:close="closeCommentaire">
      <commentaire module="decaissement" :data="data" :datas="commentaires"></commentaire>
    </modal-chat>

    <delete-alert v-if="deleteModal" type="danger" title="Confirm Action" width="sm" v-on:close="deleteModal = false">
      <p class="text-gray-800">
        voulez vous supprimer cet decaissement?
      </p>

      <div class="text-right mt-4">
        <button @click="deleteModal = false"
          class="px-4 py-2 text-sm text-gray-600 focus:outline-none hover:underline">Annuler</button>
        <button class="mr-2 px-4 py-2 text-sm rounded text-white bg-red-500 focus:outline-none hover:bg-red-400"
          @click="deleteDecaissements(deleteData)">Supprimer</button>
      </div>
    </delete-alert>
    <div class="w-full">
      <nav class="text-sm font-semibold flex justify-between items-center  flex-wrap " aria-label="Breadcrumb">
        <div>
          <ol class="inline-flex p-0 list-none">
            <li class="flex items-center text-blue-500">
              <router-link to="" class="text-gray-600">dashboard</router-link>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path
                  d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
              </svg>
            </li>
            <li class="flex items-center ">
              <router-link to="" class="text-gray-600">Décaissement</router-link>
            </li>
          </ol>
        </div>
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
      <div v-if="showModal">
        <modal-top-right :title="title" v-on:close="closeA">
          <div class="w-full p-4">
            <div v-if="!isUpdate">
              <vform template="default" @closeModal="close" :champs="champs" :sendRequest="sendRequest"
                submitText="Enregistrer" @sendForm="sendForm"></vform>
            </div>
            <div v-else>
              <vform template="default" @closeModal="close" :champs="champsUpdate" :sendRequest="sendRequest"
                submitText="Modifier" @sendForm="sendForm"></vform>
            </div>

          </div>
        </modal-top-right>
      </div>
      <div v-if="showModal2">
        <vmodal title="Filtre decaissement" v-on:close="showModal2 = false">
          <div class="px-4" style="width:500px">
            <vform template="default" isAllPairSaufDescrip="true" @closeModal="showModal2 = false"
              :champs="champsRecherche" :sendRequest="sendRequest" :cols="cols" submitText="Rechercher"
              @sendForm="filtre"></vform>
          </div>
        </vmodal>
      </div>
     <!-- modal ajout projet -->
      <div v-if="showProjetModal">
        <modal-top-right :title="title" v-title v-on:close="closeProjet2">
          <div class="p-4 overflow-auto">
            <vform template="default"  :sendRequest="sendRequest" @getFile="getProjetFile" :savedInput="savedInput"
              @getImage="getImage" :champs="champs" :cols="cols" :submitText="submitText" @sendForm="sendForm"
              @closeModal="closeProjet"></vform>
          </div>
        </modal-top-right>
      </div>

        <!--  modal ajout projet -->
      <div class="flex items-center justify-between my-2">
        <titre>Decaissement </titre>
        <div class="flex space-x-3">
          <json-excel v-if="exporterDecaissement" :data="json_data()" header="DECAISSEMENT" type="xlsx"
            :name="title_csv()">
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
          <button @click="showFiltreModal2" title="filtre" class="bg-primary text-white px-2 py-1"><svg
              stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
              stroke-linejoin="round" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg></button>
          <button v-if="decaissementAdd" @click="addDecaissement" title="ajouter "
            class="px-4 py-2 overflow-hidden flex space-x-2 items-center font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
            <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;">
                <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
              </svg></span>
            <span class="mx-1 md:mx-2 text-xs font-semibold">ajouter</span>
          </button>
        </div>

      </div>
      <vtable v-if="!decaissementDelete && !decaissementUpdate" :headers="headers" :datas="filteredDecaissement()"
        @supprimer="supprimer" @updateInputData="updateInputData"></vtable>
      <vtable v-if="decaissementDelete && !decaissementUpdate" :headers="headers" :datas="filteredDecaissement()"
        :actions="actionsDelete" @supprimer="supprimer" @updateInputData="updateInputData"></vtable>
      <vtable v-if="decaissementDelete && decaissementUpdate" :sendRequest="false" @modifier="modifier" :headers="headers"
        :datas="filteredDecaissement()" :actions="actions" @supprimer="supprimer" @updateInputData="updateInputData">
      </vtable>
      <vtable v-if="decaissementUpdate && !decaissementDelete" :sendRequest="false" :actions="actionsUpdate"
        @modifier="modifier" :headers="headers" :datas="filteredDecaissement()" @updateInputData="updateInputData">
      </vtable>
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
import { mapGetters, mapActions, mapMutations, mapState } from "vuex"
import { extractFormData } from '@/utils/index'
import ProgrammeService from "@/services/modules/programme.service.js";
import JsonExcel from "vue-json-excel"
import ModalChat from '@/components/ModalChat'
import DeleteAlert from "@/components/DeleteAlert.vue";
import Commentaire from '@/components/Commentaire.vue'
import DecaissementService from "@/services/modules/decaissement.service";

// add projet


export default {
  components: {
    Vtable,
    Dashboard,
    Vmodal,
    Vform,
    Titre,
    SearchBar,
    ModalTopRight,
    DeleteAlert,
    JsonExcel,
    ModalChat,
    Commentaire
  },
  data() {
    return {
      showModal: false,
      showModal2: false,
      sendRequest: false,
      title: '',
      isUpdate: false,
      decaissementAttributs: ['montant', 'methodeDePaiement', 'date', 'projetId', 'type'],
      decaissementAttributsRecherche: ['type', 'debut', 'fin', 'projetId'],
      champs: [],
      champsUpdate: [],
      champsRecherche: [
        { name: 'Date debut', key: 'debut', type: 'date', placeholdere: "", isSelect: false, isTextArea: false, data: '', required: false, },
        { name: 'Date fin ', key: 'fin', type: 'date', placeholdere: "", isSelect: false, isTextArea: false, data: '', required: false, },
        { name: 'Projet', key: 'projetId', type: '', placeholdere: 'Choisir un projet', isSelect: true, isTextArea: false, data: '', options: this.projets, cle: 'id', value: 'nom', required: false, },
        { name: 'Source de decaissement', key: 'type', placeholdere: 'Choisir la source', isSelect: true, isTextArea: false, data: '', options: this.$store.state.sources, cle: 'id', value: 'nom', required: false, },
      ],
      decaissementId: '',

      search: "",
      headers: [
        { name: 'Projets', cle: 'projet' },
        { name: 'Bailleur', cle: 'bailleur' },
        { name: 'Methode de paiement', cle: 'methodeDePaiement' },
        { name: 'Montant', cle: 'montant', monaie: true },
        { name: 'Date de décaissement', cle: 'date' },
        { name: 'Date de création', cle: 'created_at' },
      ],
      dataTable: [

      ],
      actions: [
        { name: 'supprimer', iconne: '' },
        { name: 'modifier', iconne: '' },
      ],
      actionsDelete: [
        { name: 'supprimer', iconne: '' },
      ],
      actionUpdate: [
        { name: 'modifier', iconne: '' },
      ],
      decaissementVisible: false,
      decaissementAdd: false,
      decaissementDelete: false,
      decaissementUpdate: false,
      exporterDecaissement: false,
      data: {},
      commentaires: [],
      projets: [],
      showComment: false,
      deleteData: {},
      deleteModal: false,
    };
  },
  computed: {

    //importation des variables du module auths
    ...mapState({
      identifiant: state => state.auths.identifiant,
      decaissement: state => state.decaissements.decaissement,
      loading: state => state.loading,
      errors: state => state.errors,
    }),

    ...mapGetters({
      decaissements: "decaissements/getDecaissements", decaissement: "getDecaissement",
      currentUser: 'auths/GET_AUTHENTICATE_USER'
    }),
    ...mapGetters('auths', { currentUser: 'GET_AUTHENTICATE_USER' })

  },

  methods: {

    //Charger les fonctions de communication avec le serveur
    ...mapMutations({
      setErrors: 'SET_ERRORS_MESSAGE', // map `this.setErrors()` to `this.$store.commit('SET_ERRORS_MESSAGE')`,
      setDecaissement: 'decaissements/FILL' // map `this.CREATE_INSTANCE_PROJET()` to `this.$store.commit('CREATE_INSTANCE_PROJET')`
    }),
    getPermission() {
      this.currentUser.role[0].permissions.forEach(element => {
        if (element.slug === 'voir-un-decaissement') {
          this.decaissementVisible = true
        }
        if (element.slug === 'modifier-un-decaissement') {
          this.decaissementAdd = true
        }
        if (element.slug === 'modifier-un-decaissement') {
          this.decaissementUpdate = true
        }
        if (element.slug === 'supprimer-un-decaissement') {
          this.decaissementDelete = true
        }
        if (element.slug === 'exporter-un-decaissement') {
          this.exporterDecaissement = true
        }
      });

    },
    commenter(data) {
      const commentaires = data.commentaires
      commentaires.forEach(element => {
        const nom = element.auteur.nom
        const message = element.message
        const date = element.date
        this.commentaires.push({ nom, message, date })
      });

      this.data = data
      this.showComment = true
    },
    ...mapActions('decaissements', {
      fetchDecaissements: "FETCH_LIST_DECAISSEMENT",
      filter: "FILTRE_DECAISSEMENT",
      saveDecaissement: "STORE_DECAISSEMENT",
      updateDecaissement: "UPDATE_DECAISSEMENT",
      deleteDecaissement: "DESTROY_DECAISSEMENT"
    }),

    async updateInputData(id, attribut, value) {

      await this.updateDecaissement({ decaissement: { [attribut]: value }, id: id }).catch((value, status) => {
        if (this.hasErrors[attribut] !== undefined)
          alert(this.hasErrors[attribut])
      }).finally(() => {
        $('#' + "dataTable").load(location.href + '#' + id + '>*', '')
      })
    },

    filteredDecaissement() {
      var self = this;

      return this.decaissements.filter(function (decaissement) {
        return decaissement.projet.toLowerCase().indexOf(self.search.toLowerCase()) >= 0 ||
          decaissement.date.toLowerCase().indexOf(self.search.toLowerCase()) >= 0 ||
          decaissement.type.toLowerCase().indexOf(self.search.toLowerCase()) >= 0;
      });
    },

    title_csv() {
      return "decaissement-" + "-" + new Date()
    },

    json_data() {
      let tab = [];

      this.filteredDecaissement().forEach(element => {
        tab.push(
          {
            projet: element.projet,
            bailleur: element.bailleur,
            type: element.type,
            montant: element.montant,
            date_de_decaissement: element.date
          }
        );
      });
      return tab;
    },

    sendForm() {
      if (this.sendRequest === false) {
        this.sendRequest = true;
        this.champs = this.champs.map(item => { item.errors = []; return item })
        this.champsUpdate = this.champsUpdate.map(item => { item.errors = []; return item })
        let decaissement = {}
        if (this.isUpdate) {
          decaissement = extractFormData(this.champsUpdate, this.decaissementAttributs)
          decaissement.id = this.decaissementId
        } else {
          decaissement = extractFormData(this.champs, this.decaissementAttributs)
        }
        decaissement.methodeDePaiement = decaissement.methodeDePaiement.id

        decaissement.type = decaissement.type.id
        decaissement.projetId = decaissement.projetId.id

        if (decaissement?.id) {

          this.updateDecaissement({ decaissement: decaissement, id: decaissement?.id }).then(response => {

            if (response.status == 200 || response.status == 201) {
              this.$toast.success("operation effectué avec success")

              this.fetchDecaissements()
              this.sendRequest = false
              this.close()
            }

          }).catch((error) => {
            this.setErrors({ message: error?.response?.data?.message, errors: error?.response?.data?.data?.errors })
            this.sendRequest = false;
            this.champs.map(value => value.errors = this.erreurs[value.key])
          })
        }
        else {
          this.saveDecaissement(decaissement).then(response => {
            if (response.status == 200 || response.status == 201) {

              this.$toast.success("nouveau enregistrement")
              this.showModal = false
              this.fetchDecaissements()
              this.sendRequest = false
              this.close()
            }

          }).finally((error) => {
            this.sendRequest = false
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




      }

    },

    filtre() {
      this.champsRecherche = this.champsRecherche.map((item) => {
        item.errors = [];
        return item;
      });

      let decaissement = extractFormData(this.champsRecherche, this.decaissementAttributsRecherche);
      decaissement.projetId = decaissement.projetId?.id
      decaissement.type = decaissement.type?.id



      this.filter(decaissement).then((response) => {
        if (response.status == 200 || response.status == 201) {
          this.close2();
        }
      });
    },
    closeCommentaire() {
      this.showComment = false
      this.commentaires = []
    },
    resetForm() {

      this.champs = this.champs.map(item => { item.data = ''; return item })

      window.document.getElementById('vform')?.reset()


    },
    close() {
      this.resetForm()
      this.showModal = false      
    },
    closeA() {
      this.showModal = false
      this.savedInput = []
      for (let i = 0; i < this.champs.length; i++) {
        this.savedInput.push(this.champs[i].data)
      }
      const parsed = JSON.stringify(this.savedInput);
      localStorage.setItem('formData', parsed);
    },
    close2() {
      this.showModal2 = false
    },
    addDecaissement() {
      this.title = "Ajouter"
      this.isUpdate = false
      let formData = this.champs.map((value) => {
        if (value.key === 'projetId') {
          value['options'] = this.projets
        }
 
        else if (value.key === 'type') {
          value['options'] = this.$store.state.sources;
        }

        return value
      })

      this.champs = formData

      this.showModal = true
    },

    showFiltreModal2() {
      this.title = "Filtre decaissement"

      let formData = this.champsRecherche.map((value) => {
        if (value.key === 'projetId') {
          value['options'] = this.projets
        }

        else if (value.key === 'type') {
          value['options'] = this.$store.state.sources;
        }

        return value
      })

      this.champsRecherche = formData

      this.showModal2 = true
    },

    supprimer(decaissement, index) {
      this.deleteModal = true
      this.deleteData.data = decaissement
      this.deleteData.index = index
    },

    deleteDecaissements(data) {
      //this.filteredIndicateur.splice(data.index,1)
      this.deleteModal = false
      DecaissementService.destroy(data.data.id).then((data) => {
        this.$toast.success("Operation effectué avec success !")
        this.fetchDecaissements()

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


    modifier(decaissement) {
      localStorage.removeItem('formData')

      this.isUpdate = true
      this.title = 'Modifier un decaissement'
      this.showModal = true



      this.decaissementId = decaissement.id

      this.decaissementAttributs.forEach((item) => {

        this.champsUpdate.find((value, index) => {
          if (value.key !== 'projetId') {
            if (value.key === item) {

              this.champsUpdate[index]['data'] = decaissement[item]
            }
          }


        })

      })

    },
    active() {
      this.$store.dispatch('active')
    },
    disabled() {
      this.$store.dispatch('disabled')
    },
    fetchProjets(programme) {

      ProgrammeService.projets(programme).then((data) => {
        const datas = data.data.data
        this.projets = datas
        this.champs = [
          { name: 'Montant', key: 'montant', type: 'number', placeholdere: "", isSelect: false, isTextArea: false, data: '', required: true, },
          { name: 'Date', key: 'date', type: 'date', placeholdere: "", isSelect: false, isTextArea: false, data: '', required: true, },
          { name: 'Projet', key: 'projetId', type: '', placeholdere: 'Choisir un projet', canAdd: true,  isSelect: true, isTextArea: false, data: '', options: datas, cle: 'id', value: 'nom', required: true, },
          { name: 'Methode de paiement', key: 'methodeDePaiement', placeholdere: 'Mode de paiement', isSelect: true, isTextArea: false, data: '', options: this.$store.state.modePaiement, cle: 'id', value: 'nom', required: true, },
          { name: 'Source', key: 'type', placeholdere: 'Source', isSelect: true, isTextArea: false, data: '', options: this.$store.state.source, cle: 'id', value: 'nom', required: true, },
        ]
        this.champsUpdate = [
          { name: 'Montant', key: 'montant', type: 'number', placeholdere: "", isSelect: false, isTextArea: false, data: '', required: true, },
          { name: 'Date', key: 'date', type: 'date', placeholdere: "", isSelect: false, isTextArea: false, data: '', required: true, },
          { name: 'Projet', key: 'projetId', type: '', placeholdere: 'Choisir un projet', isSelect: true, isTextArea: false, data: '', options: datas, cle: 'id', value: 'nom', required: true, },
          { name: 'Méthode de paiement', key: 'methodeDePaiement', placeholdere: 'Mode de paiement', isSelect: true, isTextArea: false, data: '', options: this.$store.state.modePaiement, cle: 'id', value: 'nom', required: true, },
          { name: 'Source', key: 'type', placeholdere: 'Source', isSelect: true, isTextArea: false, data: '', options: this.$store.state.source, cle: 'id', value: 'nom', required: true, },
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
  },

  mounted() {
    this.getPermission()
    if (!this.decaissementVisible) {
      this.$router.push('/401-non-autorise')
    }
    else {
      this.fetchProjets(this.currentUser?.programme?.id)
      this.fetchDecaissements()

    }



  }
}
</script>

<style scoped></style>