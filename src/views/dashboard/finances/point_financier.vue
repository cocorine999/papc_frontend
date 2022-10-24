<template>
  <dashboard>
    <div class="w-full">
    <nav class="text-xs md:text-sm font-semibold flex flex-wrap justify-between items-center " aria-label="Breadcrumb">
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
        <div class="w-full flex text-gray-600">
              <input @input="$emit('search',$event.target.value)" class="h-8 w-full px-5 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none relative -mr-9 block sm:block" v-model="search" type="text" name="search" placeholder="Rechercher" >
              <button type="submit" class="relative  p-2 rounded-lg">
              <svg class="w-4 h-4 text-gray-600 fill-current" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
                    viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve"
                    width="512px" height="512px">
                 <path
                    d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
             </button>
           </div>      </div>
    </nav> 
    
    <div class="flex items-center justify-between flex-wrap my-2">
        <titre>Point financier </titre>
        <div class="flex space-x-3 flex-wrap justify-end ">
          <json-excel :data="json_data()" header="POINT FINANCIER" type="xlsx" :name="title_csv()"  >
          <button  title="exporter en excel"   class="py-2  px-4 overflow-hidden  space-x-2 items-center text-xs font-semibold text-white uppercase bg-indigo-500 focus:outline-none focus:shadow-outline">
            <svg class="inline" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path d="M11 16h2V7h3l-4-5-4 5h3z"></path><path d="M5 22h14c1.103 0 2-.897 2-2v-9c0-1.103-.897-2-2-2h-4v2h4v9H5v-9h4V9H5c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2z"></path></svg>
            <span class="mx-2 text-xs  md:text-sm font-semibold">Export Excel</span>
          </button>
        </json-excel>
        </div>
      
    </div>
    <vtable :headers="headers" :datas="filteredPointFinancier()"></vtable>
  </div>
  </dashboard>
 
</template>

<script>
import SearchBar from '@/components/SearchBar'
import Titre from '@/components/Titre'
import Vtable from '@/components/Vtable'
import Dashboard from '@/layouts/Dashboard'
import { mapGetters, mapActions, mapState} from "vuex"
import JsonExcel from "vue-json-excel"

export default {
  components: {
    Vtable,
    Dashboard,
    Titre,
    SearchBar,
    JsonExcel
  },
    data() {
        return {
        headers:[
          {name:'Bailleur', cle:'sigle'},
          {name:'Montants financier', cle:'montantFinancement'},
          {name:'Taux de decaissement', cle:'tauxDecaissement'},
          {name:'PTAB', cle:'ptab'},
          {name:'Decaissement', cle:'decaissement'},
          {name:'Realisation PTAB ', cle:'realisationPta'},
          {name:'TEF', cle:'tef'},
          {name:'TEF GLOBALE', cle:'tefGlobale'},
        ],
        search:'',
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

    filteredPointFinancier(){
        var self = this;

        return this.pointFinancier.filter(function (pointFinancier){
          return pointFinancier.sigle.toLowerCase().indexOf(self.search.toLowerCase()) >= 0;
        });
      },
      
      title_csv() {
        return "point-financier-" +"-" + new Date()
      },

      json_data(){
        let tab = [];

        this.filteredPointFinancier().forEach(element => {
          tab.push(
            {
              bailleur: element.sigle,
              montant_financier: element.montantFinancement,
              taux_de_decaissement: element.tauxDecaissement,
              ptab: element.ptab,
              decaissement: element.decaissement,
              realisation_ptab: element.realisationPta,
              tef: element.tef,
              tef_global: element.tefGlobale
            }
          );
        });
        return tab;
      },

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