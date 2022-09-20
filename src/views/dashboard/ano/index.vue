<template>
  <dashboard>
    <div v-if="anoVisible" class="px-4">

      <vmodal v-if="readPDF" title="fichier.extention"  v-on:close="readPDF = false">
        <div style="height: 70vh;width:80vw">
          <vue-pdf-app  :pdf="pdfFile"></vue-pdf-app> 
        </div>
      </vmodal>
      <vmodal v-if="true" @close="showDetail = false" >
        <div style="width:60vw">
          <preview @previewFile="previewFile" ></preview>
        </div>
      </vmodal>
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
      <div v-if="anoAdd" class="flex items-center justify-between my-2">
        <div class="flex space-x-4">
          <span
            class="inline-block cursor-pointer  border-b-8 font-bold text-lg uppercase    border-primary py-2">Tableau recapitulatif </span>
        </div>
        <div class="flex space-x-4">
          <button @click="relancerAno" title="Relancer Ano"
            class="py-2 px-4 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase _rounded bg-primary focus:outline-none focus:shadow-outline">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm120 190.77h-89l36.88-36.88-5.6-6.51a87.38 87.38 0 10-62.94 148 87.55 87.55 0 0082.42-58.25l5.37-15.13 30.17 10.67-5.3 15.13a119.4 119.4 0 11-112.62-159.18 118.34 118.34 0 0186.36 36.95l.56.62 4.31 5L376 149.81z"></path></svg>
            <span class="mx-2 text-sm font-semibold">relancer </span>
          </button>
          <button @click="addAno" title="ajouter un tabelau"
            class="py-2 px-4 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase _rounded bg-primary focus:outline-none focus:shadow-outline">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;">
              <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
            </svg>
            <span class="mx-2 text-sm font-semibold">Ajouter </span>
          </button>
        </div>
      </div>
      <div id="dataTable">
        <vtable v-if="actions != undefined && anoDelete" :sendRequest="false" :headers="headers" :datas="filteredAno()" :actions="actions" @seeUpload="seeUpload" @supprimer="supprimer" @modifier="modifier"></vtable>
        <vtable v-else :headers="headers" :datas="filteredAno()" :sendRequest="false" @supprimer="supprimer" @seeUpload="seeUpload" @modifier="modifier"></vtable>
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
import VuePdfApp from "vue-pdf-app";
import PermissionsService from "@/services/modules/permission.service.js";
import { mapActions, mapMutations, mapGetters } from "vuex";
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
    VuePdfApp
  },

  data() {
    return {
      anoAttributs: ['dossier', 'statut', 'dateSoumission', 'destinataire', 'bailleurId', 'fichiers'],
      showModal: false,
      loading: false,
      showInput: true,
      showDetail:false,
      search:"",
      title: '',
      anoVisible:false,
      anoAdd:false,
      anoDelete:false,
      anoUpdate:false,
      readPDF:false,
      pdfFile:'',
      champs: [
        { name: 'Objet', key: 'dossier', type: 'text', placeholdere: "", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },
        { name: 'Bailleurs', key: 'bailleurId', type: '', placeholdere: "Selectionnez le bailleur", isSelect: true, isTextArea: false, data: '', required: false, options: this.bailleurs, cle: 'id', value: 'nom', errors: [] },
        { name: 'Date de soumission', key: 'dateSoumission', type: 'date', placeholdere: "", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },
        { name: 'Destinataire', key: 'destinataire', type: 'text', placeholdere: "", isSelect: false, isTextArea: false, data: '', required: true, errors: [] },
        {name: 'Piece jointe',key:'fichiers', type: 'file', placeholdere: 'televerser des fichiers', isSelect: false,isImage:false, isTextArea: false, data:'', required: false, errors : []},
        { name: 'Description', key: '', type: '', placeholdere: "Description", isSelect: false, isTextArea: true, data: '', required: false, errors: [] },
        { name: 'Status', key: 'statut', type: '', placeholdere: "Selectionnez une valeur", isSelect: true, isTextArea: false, data: '', options: this.$store.state.statuts, cle: 'id', value: 'nom', required: true, errors: [] },
      ],
      cols: 1,
      headers: [
        { name: 'dossier', cle: 'dossier' },
        { name: 'Bailleur', props: 'bailleur', cle: 'sigle' },
        { name: 'Date soumission', cle: 'dateDeSoumission' },
        { name: 'Destinataire', cle: 'destinataire' },
        { name: 'Status', cle: 'status', status: true },
        { name: 'Date de creation', cle: 'created_at' },
      ],
      actions: [
        { name: 'supprimer', iconne: '' },
        { name:'fichier'}
      ],
      fichiers:[],
       pdf:[
          {url:'/upload/ppm -2022.pdf',title:'ppm -2022.pdf'},
          {url:'/upload/pta -2022.pdf',title:'pta -2022.pdf'},
      
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
    relancerAno() {

    },
    previewFile() {
      this.pdfFile = this.pdf[0].url
      this.readPDF = true
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
            if(element.slug ==='voir-un-ano') {
              this.anoVisible = true
            }
            if(element.slug === 'creer-un-ano') {
              this.anoAdd = true
            }
            if(element.slug === 'modifier-un-ano') {
              this.anoUpdate = true
            }
            if(element.slug ==='supprimer-un-ano') {
              this.anoDelete = true
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

    filteredAno(){
      var self = this;
      return this.anos.filter(function (ano){
        return ano.bailleur.sigle.toLowerCase().indexOf(self.search.toLowerCase()) >= 0 || 
          ano.type.toLowerCase().indexOf(self.search.toLowerCase()) >= 0 ||
          ano.destinataire.toLowerCase().indexOf(self.search.toLowerCase()) >= 0 ||
          ano.dateDeSoumission.toLowerCase().indexOf(self.search.toLowerCase()) >= 0 ||
          ano.dossier.toLowerCase().indexOf(self.search.toLowerCase()) >= 0;
        });
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
      
        const demo = {
          "dossier": projet.dossier,
          "statut": projet.statut,
          "dateSoumission": projet.dateSoumission,
          "destinataire": projet.destinataire,
          "bailleurId": projet.bailleurId,
        }
      
        const formData = new FormData();
        formData.append('dossier',demo.dossier)
        formData.append('statut',demo.statut)
        formData.append('dateSoumission',demo.dateSoumission)
        formData.append('destinataire',demo.destinataire)
        formData.append('bailleurId',demo.bailleurId)
        formData.append('fichiers',this.fichiers)
    
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
    this.active()

    this.fetchAnos()
    //.then((value) => { console.log(value) });
    console.log("Fetching type anos ...");
    this.fetchTypeAnos()
    //.then((value) => { console.log(value), console.log('content typeAno ' + this.typeAnos) });
    console.log("Fetching bailleurs ...");
    this.fetchBailleurs()
    this.getPermission()
    this.disabled()
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