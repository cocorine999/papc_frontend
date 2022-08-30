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
           </div>      </div>
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
          {name:'Bailleur', cle:'bailleur'},
          {name:'Montants financier', cle:'montanFinancier'},
          {name:'Taux de decaissement', cle:'tauxDeDecaissement'},
          {name:'PTAB', cle:'ptab'},
          {name:'Decaissement', cle:'decaissement'},
          {name:'Realisation PTAB ', cle:'realisationPta'},
          {name:'TEF', cle:'tef'},
          {name:'TEF GLOBALE', cle:'tefGlobal'},
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
          return pointFinancier.bailleur.toLowerCase().indexOf(self.search.toLowerCase()) >= 0;
        });
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