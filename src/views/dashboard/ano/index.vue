<template>
  <dashboard>
    <div class="w-full">

      <modal-chat v-if="showComment" title="espace commentaire" v-on:close="closeCommentaire">
        <div v-if="anosReponses.length > 0" style="height:800px" class="overflow-auto ">
          <div v-for="data in anosReponses" :key="data.id">

            <reponse-anos :anoId="anosId" :statut="statut" :datas="data"></reponse-anos>
          </div>
        </div>

        <div v-else class="font-bold  text-gray-600 py-5  text-center">
          pas de commentaire
        </div>

      </modal-chat>

      <vmodal v-if="showDetail" @close="showDetail = false">
        <div style="width:60vw">
          <preview template="ano" :datas="datas" @previewFile="previewFile"></preview>
        </div>
      </vmodal>

      <div v-if="showModal">
        <modal-top-right :title="title" v-on:close="close">
          <div class="px-4 overflow-y-auto">
            <vform template="default" isAllPairSaufDescrip="true" :sendRequest="sendRequest" :champs="champs"
              @getFile="getFile" submitText="Créer un ano" @sendForm="sendForm"></vform>
          </div>
        </modal-top-right>
      </div>

      <div v-if="showReponse">
        <modal-chat :title="title" v-on:close="closeReponse">
          <form @submit.prevent="sendReponse" class="px-4 overflow-y-auto">
            <div class="my-2">
              <label class="my-2 block" for="">Selectionnez l'etat de l'ano </label>
              <select id="choice" required v-model="Relance.statut"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm   focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="" selected>Selectionnez le statut</option>
                <option v-for="(statut, index) in statuts" :key="index" :value="statut.value"> {{statut.name}}</option>
              </select>
            </div>
            <div class="my-2">
              <label class="my-2 block" for="">Pieces jointes </label>
              <input required
                class="block w-full text-sm text-gray-900 bg-gray-50 p-2.5 border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="file_input_help" id="file_input" multiple type="file" @change="previewFiles">
            </div>
            <div class="my-2">
              <label class="my-2 block">Commentaire <span
                  class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
              <textarea v-model="Relance.commentaire"
                class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent"
                rows="3"></textarea>
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
              <vbutton type="reset" template="danger" @close="showReponse =false"> annuler </vbutton>
            </div>
          </form>
        </modal-chat>
      </div>
   
      <nav class="text-xs md:text-sm font-semibold flex items-center justify-between flex-wrap " aria-label="Breadcrumb">
        <div class="mb-2">
          <ol class="inline-flex p-0 list-none">
            <li class="flex items-center ">
              <router-link to="/dashboard" class="text-gray-600">dashboard</router-link>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path
                  d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
              </svg>
            </li>

            <li class="flex items-center text-blue-500 ">
              <router-link to="" class="">ano</router-link>
            </li>
          </ol>
        </div>

        <div>
            <div class="w-full flex text-gray-600">
              <input @input="$emit('search',$event.target.value)" class="h-8  w-full px-5  text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none relative -mr-7" v-model="search" type="text" name="search" placeholder="Rechercher" >
              <button type="submit" class="relative">
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
      <div class="flex items-center justify-between my-2">
        <div class="flex space-x-4">
          <span class="inline-block cursor-pointer  border-b-8 font-bold text-xs 
 md:text-base uppercase    border-primary py-2">Tableau récapitulatif </span>
        </div>
        <div class="flex space-x-4">

          <button v-if="anoAdd" @click="addAno" title="ajouter un tabelau"
            class="py-2 px-4 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase _rounded bg-primary focus:outline-none focus:shadow-outline">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;">
              <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
            </svg>
            <span class="mx-2 text-xs md:text-sm font-semibold">Ajouter </span>
          </button>
        </div>
      </div>

      <div id="dataTable">
        <vtable v-if="anoDelete &&  reponseAnoVisible ==false && anoUpdate == false" :statut="true" :sendRequest="false"
          :headers="headers" :datas="filteredAno()" :actions="actionsDelete" @supprimer="supprimer"></vtable>
        <vtable v-if="reponseAnoAdd && anoDelete==false && reponseAnoVisible  &&  anoUpdate == false" :statut="true"
          :sendRequest="false" @reponseAno="reponseAno" :headers="headers" :datas="filteredAno()"
          :actions="actionsReponse" :isComment="true" @commenter="commenter" @seeUpload="seeUpload"></vtable>
        <vtable v-if="reponseAnoAdd==false && anoDelete==false && reponseAnoVisible ==false" :statut="true"
          :sendRequest="false" :headers="headers" :datas="filteredAno()"></vtable>
        <vtable v-if="anoUpdate && anoDelete && reponseAnoAdd && reponseAnoVisible " :statut="true" :isComment="true"
          @commenter="commenter" :sendRequest="false" :headers="headers" :datas="filteredAno()" :actions="actions"
          @seeUpload="seeUpload" @reponseAno="reponseAno" @supprimer="supprimer" @modifier="modifier"></vtable>
      </div>
    </div>
  </dashboard>

</template>

<script>
import ModalTopRight from '@/components/ModalTopRight'
import SearchBar from '@/components/SearchBar'
import Vtable from '@/components/Vtable'
import Vform from '@/components/Vform'
import Vmodal from '@/components/Vmodal'
import Dashboard from '@/layouts/Dashboard'
import Preview from '@/components/Preview.vue'
import Vbutton from '@/components/Vbutton.vue'
import PermissionsService from "@/services/modules/permission.service.js";
import AnosService from "@/services/modules/ano.service.js";
import { mapActions, mapMutations, mapGetters } from "vuex";
import ModalChat from '@/components/ModalChat'
import Commentaire from '@/components/Commentaire.vue'

import ReponseAnos from '@/components/ReponseAnos.vue'

import extractFormData from '@/utils/extract-data'

export default {
  components: {
    Vtable,
    Dashboard,
    Vmodal,
    Vform,
    SearchBar,
    ModalTopRight,
    Preview,
    Vbutton,
    ModalChat,
    Commentaire,
    ReponseAnos
  },

  data() {
    return {
      anoAttributs: ['dossier', 'statut', 'dateSoumission', 'destinataire', 'bailleurId', 'fichiers'],
      commentaires: [],
      data: {},
      showModal: false,
      loading: false,
      showInput: true,
      showDetail: false,
      search: "",
      title: '',
      statut: '',
      anoVisible: false,
      anoAdd: false,
      anoDelete: false,
      anoUpdate: false,
      bailleurVisible: false,
      voirDetailAno: false,
      commentaireVisible: false,
      anoRelancer: false,
      reponseAnoVisible: false,
      reponseAnoAdd: false,
      readPDF: false,
      pdfFile: '',
      chargement: false,
      Relance: {
        statut: null,
        files: [],
        commentaire: '',
      },
      statuts: [
        { name: 'en cours', value: 0 },
        { name: 'validé', value: 1 },
        { name: 'non validé', value: -1 }
      ],
      champs: [
        { name: 'Objet', key: 'dossier', type: 'text', placeholdere: "", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },
        { name: 'Bailleurs', key: 'bailleurId', type: '', placeholdere: "Selectionnez le bailleur", isSelect: true, isTextArea: false, data: '', required: false, options: this.bailleurs, cle: 'id', value: 'nom', errors: [] },
        { name: 'Date de soumission', key: 'dateSoumission', type: 'date', placeholdere: "", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },
        { name: 'Destinataire', key: 'destinataire', type: 'text', placeholdere: "", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },
        { name: 'Pièce jointe', key: 'fichiers', type: 'file', placeholdere: 'televerser des fichiers', isSelect: false, isImage: false, isTextArea: false, data: '', required: false, errors: [] },
        { name: 'Description', key: '', type: '', placeholdere: "Description", isSelect: false, isTextArea: true, data: '', required: false, errors: [] },
        { name: 'Status', key: 'statut', type: '', placeholdere: "Selectionnez une valeur", isSelect: true, isTextArea: false, data: '', options: this.$store.state.statuts, cle: 'id', value: 'nom', required: true, errors: [] },
      ],

      datas: [],
      cols: 1,
      headers: [
        { name: 'Dossier', cle: 'dossier' },
        { name: 'Bailleur', props: 'bailleur', cle: 'sigle' },
        { name: 'Date soumission', cle: 'dateDeSoumission' },
        { name: 'Destinataire', cle: 'destinataire' },
        { name: 'Date de création', cle: 'created_at' },
      ],
      actions: [
        { name: 'supprimer', iconne: '' },
        { name: 'detail' },
        { name: 'reponse' },
      ],
      actionsDetail: [
        { name: 'detail' },
      ],
      actionsDelete: [
        { name: 'supprimer', iconne: '' },
        { name: 'detail' },
      ],
      actionsReponse: [
        { name: 'reponse' },
        { name: 'detail' },
      ],
      sendRequest: false,

      fichiers: [],
      pdf: [
        { url: '/upload/ppm -2022.pdf', title: 'ppm -2022.pdf' },
        { url: '/upload/pta -2022.pdf', title: 'pta -2022.pdf' },
      ],
      showReponse: false,
      anosId: '',
      showComment: false,
      anosReponses: []
    }
  },

  computed: {
    //importation des variables du module auths
    ...mapGetters({
      hasErrors: "GET_ERREURS",
      isLoading: "IS_LOADING",
      ano: "anos/getAno",
      anos: "anos/getAnos",
      typeAnos: 'typeAnos/getTypeAnos',
      bailleurs: 'bailleurs/getBailleurs',
      currentUser: "auths/GET_AUTHENTICATE_USER",
    })
  },

  methods: {
    previewFiles(event) {
      const data = event.target.files
      for (const property in data) {
        this.Relance.files.push(data[property])
      }
      this.Relance.files.pop()
      this.Relance.files.pop()

    },
    seeUpload(data) {
      this.datas = data
      this.showDetail = true
    },
    closeReponse() {
      this.showReponse = false
      this.Relance.statut = null
      this.Relance.files = []
      this.Relance.commentaires = ''
    },
    closeCommentaire() {
      this.showComment = false
      this.anosReponses = []
    },
    reponseAno(data) {
      this.anosId = data.id
      this.showReponse = true
      this.title = "Reponse un ano"

    },
    commenter(data) {
      console.log(data)
      this.anosId = data.id
      this.statut = data.statut
      this.getAnosReponse(data.id)
      this.showComment = true
      this.title = "reponses"


    },
    getAnosReponse(id) {
      AnosService.getReponseAnos(id).then((data) => {
        const datas = data.data.data
        datas.forEach(element => {
          let auteur = 'non definit'
          if (element.auteur != null) {
            auteur = element.auteur.nom
          }
          const anoid = element.anosId
          const commentaire = element.commentaire
          const bailleur = element.bailleur.sigle
          const date = element.created_at
          const documents = element.documents
          const idReponse = element.id
          this.anosReponses.push({ anoid, commentaire, bailleur, date, documents, idReponse, date, auteur })
        });
      }).catch((e) => {
        console.log(e)
      })
    },

    getFile(data) {
      for (const property in data) {
        this.fichiers.push(data[property])
      }
      this.fichiers.pop()
      this.fichiers.pop()
    },
    active() {
      this.$store.dispatch('active')
    },
    disabled() {
      this.$store.dispatch('disabled')
    },
    getPermission() {
      this.currentUser.role[0].permissions.forEach(element => {
        if (element.slug === 'voir-un-ano') {
          this.anoVisible = true
        }
        if (element.slug === 'creer-un-ano') {
          this.anoAdd = true
        }
        if (element.slug === 'modifier-un-ano') {
          this.anoUpdate = true
        }
        if (element.slug === 'supprimer-un-ano') {
          this.anoDelete = true
        }
        if (element.slug === 'voir-une-reponse-ano') {
          this.reponseAnoVisible = true
        }
        if (element.slug === 'creer-une-reponse-ano') {
          this.reponseAnoAdd = true
        }

        if (element.slug === 'voir-un-bailleur') {
          this.bailleurVisible = true
        }
      });
    },

    // call action
    ...mapActions("anos", {
      fetchAnos: "FETCH_LIST_ANO",
      saveAno: "STORE_ANO",
      updateAno: "UPDATE_ANO",
      deleteAno: "DESTROY_ANO",
    }),

    //Charger les fonctions de communication avec le serveur
    ...mapMutations({
      setErrors: 'SET_ERRORS_MESSAGE', // map `this.setErrors()` to `this.$store.commit('SET_ERRORS_MESSAGE')`,
      setAno: 'anos/FILL' // map `this.CREATE_INSTANCE_ANO()` to `this.$store.commit('CREATE_INSTANCE_ANO')`
    }),

    ...mapActions('typeAnos', { fetchTypeAnos: 'FETCH_LIST_TYPE_ANO' }),
    ...mapActions('bailleurs', { fetchBailleurs: 'FETCH_LIST_BAILLEUR' }),

    resetForm() { //delete data in form after submit
      this.champs = this.champs.map(item => { item.data = ''; return item })
      window.document.getElementById('vform')?.reset()
      this.setAno({})
    },

    filteredAno() {
      var self = this;
      return this.anos.filter(function (ano) {
        return ano.bailleur.sigle.toLowerCase().indexOf(self.search.toLowerCase()) >= 0 ||
          ano.type.toLowerCase().indexOf(self.search.toLowerCase()) >= 0 ||
          ano.destinataire.toLowerCase().indexOf(self.search.toLowerCase()) >= 0 ||
          ano.dateDeSoumission.toLowerCase().indexOf(self.search.toLowerCase()) >= 0 ||
          ano.dossier.toLowerCase().indexOf(self.search.toLowerCase()) >= 0;
      });
    },
    sendReponse() {
      if (this.chargement == false) {
        this.chargement = true
        const formData = new FormData();
        formData.append('statut', this.Relance.statut)
        formData.append('commentaire', this.Relance.commentaire)
        formData.append('anoId', this.anosId)
        /* formData.append('reponseId',null) */

        for (let i = 0; i < this.Relance.files.length; i++) {
          let file = this.Relance.files[i];
          formData.append('fichier' + i, file);
        }
        AnosService.reponseAnos(formData).then(() => {
          this.$toast.success('operation effectué avec success !!!')
          this.showReponse = false
          this.chargement = false
        }).catch((e) => {
          this.$toast.error(e)
          this.chargement = false
        })
      }

    },
    sendForm() {
      this.champs = this.champs.map((item) => {
        item.errors = [];
        return item;
      });
      let ano = extractFormData(this.champs, this.anoAttributs);
      ano.bailleurId = ano.bailleurId.id
      ano.statut = ano.statut.etat
      console.log(ano);

      if (this.sendRequest == false) {
        this.sendRequest = true
        if (this.ano?.id) {
          this.updateAno({ ano: ano, id: this.ano?.id }).then(
            (response) => {
              if (response.status == 200 || response.status == 201) {
                this.close();
                this.sendRequest = false
              }
            }
          ).catch((e) => {
            this.sendRequest = false
          });
        } else {
          this.sendRequest = true
          const demo = {
            "dossier": ano.dossier,
            "statut": ano.statut,
            "dateSoumission": ano.dateSoumission,
            "destinataire": ano.destinataire,
            "bailleurId": ano.bailleurId,
          }

          const formData = new FormData();
          formData.append('dossier', demo.dossier)
          formData.append('statut', demo.statut)
          formData.append('dateSoumission', demo.dateSoumission)
          formData.append('destinataire', demo.destinataire)
          formData.append('bailleurId', demo.bailleurId)
          for (let i = 0; i < this.fichiers.length; i++) {
            let file = this.fichiers[i];
            formData.append('fichier' + i, file);
          }

          this.saveAno(formData).then((response) => {
            if (response.status == 200 || response.status == 201) {
              this.close();
              this.sendRequest = false
            }
          }).catch((e) => {
            this.sendRequest = false
          })
        }
      }
    },

    addAno() {
      this.title = 'Ajouter'
      this.showModal = true
    },

    modifier(ano) {
      this.title = 'Modifier ano {{ ano.nom }}'
      this.submitText = "Modifier"
      this.setAno(ano)
      this.anoAttributs.forEach((item) => {

        this.champs.find((value, index) => {
          if (value.key === item) {
            if (value.key === 'debut' || value.key === 'fin') {
              this.champs[index]['data'] = this.ano[item] + "-01"
            } else {
              this.champs[index]['data'] = this.ano[item]
            }
          }
        })

      })
      this.showCloseModal(true)
    },


    async supprimer(ano) {
      if (window.confirm("Voulez-vous supprimer ce ano ?" + ano.nom))
        await this.deleteAno(ano.id)
    },

    close() {
      this.showModal = false
      this.resetForm()
    },
  },

  mounted() {

    this.getPermission()
    if (!this.anoVisible) {
      this.$router.push('/401-non-autorise')
    }
    else {
      this.fetchAnos()
      if (this.bailleurVisible) {
        this.fetchBailleurs()
      }
    }



    //.then((value) => { console.log(value), console.log('content bailleur ' + this.bailleurs) });
  },

  watch: {
    loading: function (value) {
      //this.loading = value
    },

    errors: function (errors) {
      this.champs.forEach((value) => { value.errors = errors[value.key] })
      //this.errors = errors
    },



    bailleurs: function (bailleurs) {
      this.champs.map((item) => {
        if (item.key === "bailleurId") {
          item.options = bailleurs.map((bailleur) => {
            return {
              id: bailleur.id,
              nom: bailleur.sigle,
            };
          });
        }
        return item;
      });
    },
    // map du statut dans Store
    statuts: function (statuts) {
      this.champs.map((item) => {
        if (item.key === 'statut') {
          item.options = statuts.map((statut) => {
            return {
              id: statut.etat,
              nom: statut.nom,
            }
          });
        }
        return item;
      });
    }
  },
}
</script>

<style scoped>
.animation {
  animation: vibration infinite .3s;
}

@keyframes vibration {
  to {
    transform: rotate(0deg);
    transition: all 0.3s ease-in-out;
  }

  from {
    transform: rotate(3deg);
    transition: all 0.3s ease-in-out;
  }
}
</style>