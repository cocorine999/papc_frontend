<template>
 <dashboard>
  <vmodal v-if="showLink" @close="showLink=false">
      <div class="m-2 p-2 bg-white shadow flex justify-center" style="width:60vw">
        <router-link title="cliquez ici"  target="_blank" :to="{name:'form_gestion_generator_general',params:{id:formulaireId}}" class="p-2 bg-gray-300 border cursor-pointer text-gray-700 font-semibold text-sm border-gray-600 text-center rounded-md">
          cliquer ici
        </router-link>
      </div>
    </vmodal>
    <div class="px-4">
      <nav
        class="mb-2 mt-4 text-sm font-semibold flex justify-between items-center"
        aria-label="Breadcrumb"
      >
        <div>
          <ol class="inline-flex p-0 list-none">
            <li class="flex items-center">
              <router-link to="/dashboard" class="text-gray-600"
                >dashboard</router-link
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
              <router-link to="" class="text-gray-600"
                >formulaire</router-link
              >
             
                <path
                  d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
                />
              </svg>
            </li>
          </ol>
        </div>
        <div>
          <search-bar></search-bar>
        </div>
      </nav>


      
      <div class="flex items-center justify-between my-4">
        <div class="flex space-x-4">
          <span  class="inline-block cursor-pointer  border-b-8 font-bold text-sm uppercase    border-primary py-2">Mes formulaires </span> 
        </div>
        <router-link to="/dashboard/formulaire-create"  title="ajouter une checklist"  class="p-2 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
           <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              style="fill: rgba(255, 255, 255, 1); transform: ; msfilter: "
            >
              <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg
          ></span>
          <span class="mx-2 text-xs font-semibold">Ajouter </span>
        </router-link>
      </div>
      <div  class="grid grid-cols-3 gap-4">
        <div v-for="formulaire in filteredFormulaire()" :key="formulaire.id">
            <card-checklist
              :libelle=formulaire.nom
              :activite=formulaire.auteur
              @supprimer="supprimer"
              @gotoDetails="gotoDetails(formulaire.id)"
              @onlink="getlink(formulaire.id)"
              > 
            </card-checklist>
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
  layout:'dashboard',
  components:{ 
    Dashboard,
    CardChecklist,
    Vmodal

  },
  data() {
    return {
      showLink:false,
      search:''
    }
  },
  computed: {
        ...mapState({
      identifiant: state => state.auths.identifiant,
      formulaire: state => state.formulaires.formulaire,
      loading : state => state.loading,
      errors : state => state.errors,
      statuts : state => state.statuts
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
      this.$router.push({name:'formulaire_id_details',params:{id:id}})
    },
    getlink(i){
      this.formulaireId = i
      this.showLink = true
    },
    modifier(data) {
      alert(data+ " à ete bien modifier")
    },
    supprimer(data) {
      alert(data+ " à ete bien supprimer")
    },
    filteredFormulaire(){
        var self = this;

        return this.formulaires.filter(function (formulaire){
          return formulaire.nom.toLowerCase().indexOf(self.search.toLowerCase()) >= 0 ||
                 formulaire.auteur.toLowerCase().indexOf(self.search.toLowerCase()) >= 0;
        });
      }
  }, 
  mounted() {
    
    console.log("Fetching list formulaires ...")
    this.fetchFormulaires()


    const en = [{name:'papc'},{name:'pool'},{name:'demo'}]
    
  }
}
</script>

<style>

</style>