<template>
  <dashboard>
    <div class="px-4">
    <nav class="mb-2 text-sm font-semibold flex justify-between items-center " aria-label="Breadcrumb">
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
    <vtable :headers="headers" :datas="dataTable" :actions="actions" @supprimer="supprimer" @modifier="modifier"></vtable>
  </div>
  </dashboard>
 
</template>

<script>
import SearchBar from '@/components/SearchBar'
import Titre from '@/components/Titre'
import Vtable from '@/components/Vtable'
import Dashboard from '@/layouts/Dashboard'

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
          {name:'Bailleur',props:'bailleur'},
          {name:'Montants financier',props:'montant_financier'},
          {name:'Taux de decaissement',props:'taux'},
          {name:'PTAB',props:'ptab'},
          {name:'Decaissement',props:'decaissement'},
          {name:'Realisation PTAB ',props:'realisation'},
          {name:'TEF',props:'tef'},
          {name:'TEF GLOBALE',props:'tefGlobale'},
          {name:'Date de creation',props:'created_at'},
        ],
        dataTable:[
          {bailleur:'BM',montant_financier:'2000000000',taux:'5%',ptab:'',decaissement:'50000000',realisation:'',tef:'',tefGlobale:'',created_at:'27-07-2022'},
          {bailleur:'BM',montant_financier:'2000000000',taux:'5%',ptab:'',decaissement:'50000000',realisation:'',tef:'',tefGlobale:'',created_at:'27-07-2022'},
          {bailleur:'BM',montant_financier:'2000000000',taux:'5%',ptab:'',decaissement:'50000000',realisation:'',tef:'',tefGlobale:'',created_at:'27-07-2022'},
          {bailleur:'BM',montant_financier:'2000000000',taux:'5%',ptab:'',decaissement:'50000000',realisation:'',tef:'',tefGlobale:'',created_at:'27-07-2022'},
          {bailleur:'BM',montant_financier:'2000000000',taux:'5%',ptab:'',decaissement:'50000000',realisation:'',tef:'',tefGlobale:'',created_at:'27-07-2022'},
          {bailleur:'BM',montant_financier:'2000000000',taux:'5%',ptab:'',decaissement:'50000000',realisation:'',tef:'',tefGlobale:'',created_at:'27-07-2022'},
          {bailleur:'BM',montant_financier:'2000000000',taux:'5%',ptab:'',decaissement:'50000000',realisation:'',tef:'',tefGlobale:'',created_at:'27-07-2022'},
          {bailleur:'BM',montant_financier:'2000000000',taux:'5%',ptab:'',decaissement:'50000000',realisation:'',tef:'',tefGlobale:'',created_at:'27-07-2022'},
         
        ],
        actions:[
         
          {name:'supprimer',iconne:''},
        ]
      };
    },
    mounted() {
    },
    methods: {
      sendForm() {
        alert('donnée envoyer')
      },
      close() {
        this.showModal = false
      },
      addDecaissement() {
        this.title ="Ajouter un decaissement"
        this.showModal = true
      },
      modifier(data) {
        this.title ="Modifier un decaissement"
        this.showModal = true
        alert(data +" à ete modifier")
      },
      supprimer(data) {
        alert(data +" à ete bien supprimer")
      }
    }
  }
</script>

<style scoped>

</style>