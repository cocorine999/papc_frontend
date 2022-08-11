<template>
  <dashboard>
    <div class="px-4">
      <div v-if="showModal">
        <modal-top-right :title="title" v-on:close="showModal = false">
          <div class="px-4 overflow-y-auto">
            <vform template="default" isAllPairSaufDescrip="true" :champs="champs" :cols="cols"
              submitText="Creer un ano" @sendForm="sendForm"></vform>
          </div>
        </modal-top-right>
      </div>
      <nav class="mb-2 mt-4 text-sm font-semibold  " aria-label="Breadcrumb">
        <div>

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
      </nav>
      <div class="flex items-center justify-between my-2">
        <div class="flex space-x-4">
          <span
            class="inline-block cursor-pointer  border-b-8 font-bold text-lg uppercase    border-primary py-2">Tableau recapitulatif </span>
        </div>
        <button @click="addAno" title="ajouter un tabelau"
          class="py-2 px-4 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase _rounded bg-primary focus:outline-none focus:shadow-outline">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;">
            <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
          </svg>
          <span class="mx-2 text-sm font-semibold">Ajouter </span>
        </button>
      </div>
      <div id="dataTable">
        <vtable :headers="headers" :datas="anos" :actions="actions" @supprimer="supprimer" @modifier="modifier">
        </vtable>
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

import { mapActions, mapMutations, mapGetters } from "vuex";
import extractFormData from '@/utils/extract-data'

export default {
  components: {
    Vtable,
    Dashboard,
    Vmodal,
    Vform,
    SearchBar,
    ModalTopRight
  },

  data() {
    return {
      anoAttributs: ['dossier', 'statut', 'dateSoumission', 'destinataire', 'bailleurId', 'typeId'],
      showModal: false,
      loading: false,
      showInput: true,
      title: '',
      champs: [
        { name: 'Nom', key: 'dossier', type: 'text', placeholdere: "", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },
        { name: 'Bailleurs', key: 'bailleurId', type: '', placeholdere: "Selectionnez le bailleur", isSelect: true, isTextArea: false, data: '', required: false, options: this.bailleurs, cle: 'id', value: 'nom', errors: [] },
        { name: 'Type', key: 'typeId', type: '', placeholdere: "Selectionnez un type", isSelect: true, isTextArea: false, data: '', options: this.typeAnos, cle: 'id', value: 'nom', required: true, errors: [] },
        { name: 'Date de soumission', key: 'dateSoumission', type: 'date', placeholdere: "", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },
        { name: 'Destinataire', key: 'destinataire', type: 'text', placeholdere: "", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },
        { name: 'Description', key: '', type: '', placeholdere: "Description", isSelect: false, isTextArea: true, data: '', required: false, errors: [] },
        { name: 'Status', key: 'statut', type: '', placeholdere: "Selectionnez une valeur", isSelect: true, isTextArea: false, data: '', options: this.$store.state.statuts, cle: 'id', value: 'nom', required: true, errors: [] },
      ],
      cols: 1,
      headers: [
        { name: 'Nom', cle: 'dossier' },
        { name: 'Bailleur', props: 'bailleur', cle: 'sigle' },
        { name: 'Type', props: 'typeAno', cle: 'nom' },
        { name: 'Date soumission', cle: 'dateDeSoumission' },
        { name: 'Destinataire', cle: 'destinataire' },
        { name: 'Status', cle: 'status', status: true },
        { name: 'Date de creation', cle: 'created_at' },
      ],

      actions: [
        { name: 'supprimer', iconne: '' },
      ]
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

    sendForm() {
      this.champs = this.champs.map((item) => {
        item.errors = [];
        return item;
      });
      let ano = extractFormData(this.champs, this.anoAttributs);

      ano.typeId = ano.typeId.id
      ano.bailleurId = ano.bailleurId.id
      ano.statut = ano.statut.etat
      console.log(ano);

      if (this.ano?.id) {
        this.updateAno({ ano: ano, id: this.ano?.id }).then(
          (response) => {
            if (response.status == 200 || response.status == 201) {
              this.close();
            }
          }
        );
      } else {
        this.saveAno(ano).then((response) => {
          if (response.status == 200 || response.status == 201) {
            this.close();
          }
        });
      }
    },


    addAno() {
      this.title = 'Ajouter un element'
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
    },
  },

  mounted() {
    console.log("Fetching anos ...");
    this.fetchAnos()
    //.then((value) => { console.log(value) });
    console.log("Fetching type anos ...");
    this.fetchTypeAnos()
    //.then((value) => { console.log(value), console.log('content typeAno ' + this.typeAnos) });
    console.log("Fetching bailleurs ...");
    this.fetchBailleurs()
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

    typeAnos: function (typeAnos) {
      this.champs.map((item) => {
        if (item.key === "typeId") {
          item.options = typeAnos.map((typeAno) => {
            return {
              id: typeAno.id,
              nom: typeAno.nom,
            };
          });
        }
        return item;
      });
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

<style>
</style>