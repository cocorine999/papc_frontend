<template>
  <dashboard>
    <vmodal v-if="showLink" @close="showLink=false">
      <div class="m-2 p-2 bg-white shadow flex justify-center" style="width:60vw">
        <router-link title="cliquez ici" target="_blank"
          :to="{name:'form_gestion_generator_general',params:{id:formulaireId}}"
          class="p-2 bg-gray-300 border cursor-pointer text-gray-700 font-semibold text-sm border-gray-600 text-center rounded-md">
          cliquer ici
        </router-link>
      </div>
    </vmodal>
    <div class="w-full">
      <nav class="text-xs md:text-sm font-semibold flex justify-between items-center flex-wrap"
        aria-label="Breadcrumb">
        <div>
          <ol class="inline-flex p-0 list-none">
            <li class="flex items-center">
              <router-link to="/dashboard" class="text-gray-600">dashboard</router-link>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path
                  d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
              </svg>
            </li>
            <li class="flex items-center text-blue-500">
              <router-link to="" class="text-gray-600">formulaire</router-link>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path
                  d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
              </svg>
            </li>
          </ol>
        </div>
        <div>
          <div class="flex justify-center w-full text-gray-600">
          <input @input="$emit('search',$event.target.value)"
            class="h-8  w-full px-5 pr-16 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none"
            v-model="search" type="text" name="search" placeholder="Rechercher">
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



      <div class="flex items-center justify-between my-4">
        <div class="flex space-x-4">
          <span @click="goFormulaire" v-if="formulaireVisible" :class="{'border-primary border-b-8':seeFormulaire}"
            class="inline-block cursor-pointer  text-lg uppercase font-bold   py-2"> Les formulaires </span>
          <span @click="goSuivi" v-if="suiviVisible" :class="{'border-primary border-b-8':seeSuivi}"
            class="inline-block cursor-pointer  text-lg uppercase font-bold    py-2"> Collectes </span>
        </div>
        <div>
          <router-link v-if="seeFormulaire && formulaireAdd" to="/dashboard/formulaire-create"
            title="ajouter une checklist"
            class="py-2 px-4 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase bg-primary focus:outline-none focus:shadow-outline">
            <span>            
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
            </span>
            <span class="mx-2 text-xs font-semibold">Ajouter </span>
          </router-link>
        </div>

      </div>

      <div v-if="seeFormulaire">
        <div class="grid grid-cols-3 gap-4">
          <div v-for="formulaire in filteredFormulaire()" :key="formulaire.id">
            <card-checklist :libelle=formulaire.nom :activite=formulaire.auteur
              @gotoDetails="gotoDetails(formulaire.id)" @onlink="getlink(formulaire.id)" :isGotoLink="true">
            </card-checklist>
          </div>
        </div>
      </div>

      <div v-if="seeSuivi">
        <div class="grid grid-cols-3 gap-4">
          <div v-for="formulaire in filteredFormulaire()" :key="formulaire.id">
            <card-checklist :libelle="`Collecte ${formulaire.nom}`" :activite=formulaire.auteur
              @gotoDetails="gotoDetails(formulaire.id)">
            </card-checklist>
          </div>
        </div>
      </div>
    </div>
  </dashboard>
</template>

<script>
import Dashboard from '@/layouts/Dashboard'
import CardChecklist from '@/components/CardChecklist'
//import Vform from '@/components/Vform'
import Vmodal from '@/components/Vmodal'
import { mapGetters, mapMutations, mapActions, mapState } from "vuex";
export default {
  layout: 'dashboard',
  components: {
    Dashboard,
    CardChecklist,
    Vmodal

  },
  data() {
    return {
      showLink: false,
      search: '',
      seeSuivi: false,
      seeFormulaire: true,
      suiviVisible: true,
      formulaireVisible: true,
      formulaireAdd: true,
    }
  },
  computed: {
    ...mapState({
      identifiant: state => state.auths.identifiant,
      formulaire: state => state.formulaires.formulaire,
      loading: state => state.loading,
      errors: state => state.errors,
      statuts: state => state.statuts
    }),

    ...mapGetters({
      hasErrors: "GET_ERREURS",
      isLoading: "IS_LOADING",
      formulaires: "formulaires/getFormulaires",
      currentUser: "auths/GET_AUTHENTICATE_USER",
    }),
  },

  methods: {
    ...mapActions("formulaires", {
      fetchFormulaires: "ALL_GENERAL_FORMULAIRE",
      saveFormulaire: "STORE_FORMULAIRE",
      updateFormulaire: "UPDATE_FORMULAIRE",
      deleteFormulaire: "DESTROY_FORMULAIRE"
    }),
    gotoDetails(id) {
      this.$router.push({ name: 'formulaire_id_details', params: { id: id } })
    },
    goSuivi() {
      this.seeSuivi = true
      this.seeFormulaire = false
    },
    goFormulaire() {
      this.seeSuivi = false
      this.seeFormulaire = true
    },
    getlink(i) {
      this.formulaireId = i
      this.showLink = true
    },
    gotoDetails(id) {
      this.$router.push({ name: 'general_checklist_details', params: { id: id } })
    },
    modifier(data) {
      alert(data + " à ete bien modifier")
    },
    supprimer(data) {
      alert(data + " à ete bien supprimer")
    },
    filteredFormulaire() {
      var self = this;

      return this.formulaires.filter(function (formulaire) {
        return formulaire.nom.toLowerCase().indexOf(self.search.toLowerCase()) >= 0 ||
          formulaire.auteur.toLowerCase().indexOf(self.search.toLowerCase()) >= 0;
      });
    }
  },
  mounted() {

    console.log("Fetching list formulaires ...")
    this.fetchFormulaires()


    const en = [{ name: 'papc' }, { name: 'pool' }, { name: 'demo' }]

  }
}
</script>

<style>

</style>