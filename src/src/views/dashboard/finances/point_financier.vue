<template>
  <dashboard>
    <div class="px-4">
    <nav class="mb-2 mt-4 text-sm font-semibold flex justify-between items-center " aria-label="Breadcrumb">
      <div>
        <ol class="inline-flex p-0 list-none">
          <li class="flex items-center text-blue-500">
            <router-link to="" class="text-gray-600">dashboard</router-link>
            <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
          </li>
          <li class="flex items-center ">
            <router-link to="" class="text-gray-600">Point financier</router-link>
          </li>
        </ol>
      </div>
      <div>
        <search-bar ></search-bar>
      </div>
    </nav> 
    
    <div class="flex items-center justify-between">
      <titre>Point financier </titre>     
    </div>
    <vtable :headers="headers" :datas="pointFinancier"></vtable>
  </div>
  </dashboard>
 
</template>

<script>
import SearchBar from '@/components/SearchBar'
import Titre from '@/components/Titre'
import Vtable from '@/components/Vtable'
import Dashboard from '@/layouts/Dashboard'
import { mapGetters, mapActions, mapMutations, mapState} from "vuex";

export default {
  components: {
    Vtable,
    Dashboard,
    Titre,
    SearchBar,
  },
    data() {
        return {
        headers:[
          {name:'Bailleur',props:'bailleur', cle:'bailleur'},
          {name:'Montants financier',props:'montant_financier', cle:'montanFinancier'},
          {name:'Taux de decaissement',props:'taux', cle:'tauxDeDecaissement'},
          {name:'PTAB',props:'ptab', cle:'ptab'},
          {name:'Decaissement',props:'decaissement', cle:'decaissement'},
          {name:'Realisation PTAB ',props:'realisation', cle:'realisationPta'},
          {name:'TEF',props:'tef', cle:'tef'},
          {name:'TEF GLOBALE',props:'tefGlobale', cle:'tefGlobal'},
        ],
      };
    },
    computed:{

  //importation des variables du module auths
    ...mapState({
      identifiant: state => state.auths.identifiant,
      pointFinancier: state => state.pointFinancier.suiviFinancier,
      loading : state => state.loading,
      errors : state => state.errors,
    }),

    ...mapGetters({
      pointFinancier: "pointFinancier/getPointFinancier",
      currentUser : 'auths/GET_AUTHENTICATE_USER'
    }),   
    
  },
    
  methods: {
    ...mapActions('pointFinancier', { fetchPointFinancier: 'FETCH_LIST_POINTFINANCIER' }),

    },
    mounted() {
      console.log("Fetching point financier ...")
      let form = 
        {
          "programmeId" : this.currentUser?.programme?.id, 
          "annee" : (new Date()).getFullYear()
        }
      
      this.fetchPointFinancier(form);
    },
  }
</script>

<style scoped>

</style>