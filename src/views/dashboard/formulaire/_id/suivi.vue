<template>
  <dashboard>
    <div class="w-full">
      <nav class="mb-2 mt-4 text-sm font-semibold flex justify-between items-center 	" aria-label="Breadcrumb">
          <div>
            <ol class="inline-flex p-0 list-none">
              <li class="flex items-center text-blue-500">
                <router-link to="/dashboard" class="text-gray-600">dashboard</router-link>
                <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
              </li>
              <li class="flex items-center ">
                <router-link to="" class="text-gray-600">Resultat</router-link>
              </li>
            </ol>
          </div>
          <div>
            <search-bar ></search-bar>
          </div>
      </nav> 
        
      <div class="flex items-center justify-between my-4">
        <titre>Resultat </titre>
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
      return ({
        
        headers:[
          {name:'nom unitiisateur',cle:'nom',width:"w-24"},
          {name:'prenoms',cle:'prenoms',width:"w-24"},
          {name:'role',cle:'role',width:"w-28"},
          {name:'Categorie',cle:'categorie',width:"w-28"},
          {name:'Unité de mesure',cle:'unite_mesure',width:"w-40"},
          {name:'Date de soumission',cle:'date_soumission',width:"w-24"},
        ],
        dataTable:[
          {nom:"gomez",prenoms:"jacob",role:"entreprie executante",categorie:"categorie",unite_mesure:"cm",date_soumission:"02-07-2022"}
        ],
        actions:[
          {name:'modifier',iconne:''},
          {name:'supprimer',iconne:''},
        ],
        
        series: [{
            name: 'Net Profit',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
          }, {
            name: 'Revenue',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
          }, {
            name: 'Free Cash Flow',
            data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
        }],
          chartOptions: {
            chart: {
              type: 'bar',
              height: 350
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
              },
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              show: true,
              width: 2,
              colors: ['transparent']
            },
            xaxis: {
              categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            },
            yaxis: {
              title: {
                text: '$ (thousands)'
              }
            },
            fill: {
              opacity: 1
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return "$ " + val + " thousands"
                }
              }
            }
        },
          
          
        
      });
    },
    mounted() {
    },
    methods: {
      addSuivi() {
        this.title ='Creer un suivi'
        this.showModal = true
      },
      modifier() {
        this.title ='Modifier un suivi'
        this.showModal = true
      },
      supprimer(data) {
        alert(data+" à ete bien supprimer")
      },
      dupliquer() {
        this.title ='Dupliquer un suivi'
        this.showModal = true
      }
    }
}
</script>

<style scoped>

</style>