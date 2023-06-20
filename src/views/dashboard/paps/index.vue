<template>
  
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
      showSiteModal: false, //open and close add site modal
      sendRequest: false,
      showModal: false,
      showModal2: false,
      showInput: true,
      title: '',
      total: 0,
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
        { name: 'Site', key: 'siteId', type: '', placeholdere: "Selectionnez un site", canAdd: true, isSelect: true, isTextArea: false, data: '', options: this.sites, cle: 'id', value: 'nom', required: true, errors: [] },
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
      savedInput: []
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
      // for site modal   
      site: "sites/getSite",
      entreprises: "entreprisesExecutante/getEntreprisesExecutante",
      bailleurs: "bailleurs/getBailleurs",
      // end for site modal
      currentUser: 'auths/GET_AUTHENTICATE_USER'
    }),
    ...mapGetters('auths', { currentUser: 'GET_AUTHENTICATE_USER' })

  },

  methods: {
    //Charger les fonctions de communication avec le serveur
    ...mapMutations({
      setErrors: 'SET_ERRORS_MESSAGE', // map `this.setErrors()` to `this.$store.commit('SET_ERRORS_MESSAGE')`,
      setPap: 'paps/FILL', // map `this.CREATE_INSTANCE_PAP()` to `this.$store.commit('CREATE_INSTANCE_PROJET')`
      setSite: "Sites/FILL", //for site modal
    }),

    previewFiles(event) {
      const data = event.target.files[0]
      this.file = data

    },

    ...mapActions('paps', {
      fetchPaps: "FETCH_LIST_PAP",
      deletePap: "DESTROY_PAP",
      importSinistre: "IMPORTATION_PAP"
    }),
    //  all site modal methods


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
    onRetour(data) {
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
  //  site modal
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
//  end site modal

  },

  created: function() {
    console.log('mounted')
     this.getPermission()
     
    // if (!this.papVisible) {
    //   this.$router.push('/401-non-autorise')
    // }

     this.fetchPaps({ id: this.currentUser?.programme?.id }).then((value) => {
      console.log(value.data)
      this.total = value.data.data.total

    })

    this.fetchSites(this.currentUser?.programme?.id)
  },

  
}
</script>

