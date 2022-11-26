<template>
  <dashboard espace="mod">
    <div class="w-full">
        <nav class="mb-2 mt-4 text-sm font-semibold flex justify-between items-center 	" aria-label="Breadcrumb">
          <div>
            <ol class="inline-flex p-0 list-none">
              <li class="flex items-center text-blue-500">
                <router-link to="#" class="text-gray-600">dashboard</router-link>
                <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
              </li>
              <li class="flex items-center ">
                <router-link to="" class="text-gray-600">Suivi evaluation</router-link>
              </li>
            </ol>
          </div>
          <div>
            <search-bar ></search-bar>
          </div>
        </nav> 
        
        <div v-if="showModal">
          <modal-top-right :title="title"  v-on:close="showModal = false">
            <div  class="px-4 overflow-y-auto">
              <div v-if="title =='Modifier un suivi'">
                <vform template="default" isAllPairSaufDescrip="true" :champs="champs" :cols="cols" submitText="Modifier" @sendForm="sendForm" ></vform>
              </div>
              <div v-if="title =='Creer un suivi'">
                <vform template="default" isAllPairSaufDescrip="true" :champs="champs" :cols="cols" submitText="Ajouter" @sendForm="sendForm" ></vform>
              </div>
              <div v-if="title =='Dupliquer un suivi'">
                <vform template="default" isAllPairSaufDescrip="true" :champs="champs" :cols="cols" submitText="Creer à partir de " @sendForm="sendForm" ></vform>
              </div>
            </div>
          </modal-top-right>
        </div>

        <div v-if="showModal2">
          <modal-top-right  title="Filtre de suivi"  v-on:close="showModal2 = false">
            <div class="w-full">
              <vform template="default" isAllPairSaufDescrip="true" :champs="champsRecherche" :cols="cols" submitText="Rechercher" @sendForm="filtre" ></vform>
            </div>
          </modal-top-right>
        </div>

        <div class="flex items-center justify-between my-4">
          <titre>Le suivi d'evaluation </titre>
          <div class="flex items-center space-x-4">
            <button @click="showModal2 = true" title="filtre" class="bg-primary text-white px-2 py-1"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg></button>
            <button @click="addSuivi" title="ajouter un indicateur"   class="px-4 py-2 flex overflow-hidden items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
              <span class="mx-2 text-xs  md:text-sm font-semibold">ajouter un suivi d'evaluation</span>
            </button>
          </div>
        </div>

        
        <vtable :headers="headers" :datas="dataTable" :actions="actions" @supprimer="supprimer" @modifier="modifier"></vtable>    
    </div>
  </dashboard>

</template>

<script>
import ModalTopRight from '@/components/ModalTopRight'
import SearchBar from '@/components/SearchBar'
import Titre from '@/components/Titre'
import Vtable from '@/components/Vtable'
import Vform from '@/components/Vform'
import Vmodal from '@/components/Vmodal'
import Dashboard from '@/layouts/Dashboard'
export default {
  components: {
    Vtable,
    Dashboard,
    Vmodal,
    Vform,
    Titre,
    SearchBar,
    ModalTopRight
  },
    data() {
      return ({
        showModal:false,
        showModal2:false,
        champs:[
          {name:'Indicateurs',type:'text',placeholdere:"Selectionnez un indicateur",isSelect:true,isTextArea:false,data:'',required:true,options:[{name:'indicateur1'},{name:'indicateur2'},{name:'indicateur3'}]},
          {name:'Année',type:'number',placeholdere:"Entrez l'année",isSelect:false,isTextArea:false,data:'',required:true,},
          {name:'Valeur de base',type:'number',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,},
          {name:'Valeur realisé',type:'number',placeholdere:"Valeur realise",isSelect:false,isTextArea:false,data:'',required:true,},
          {name:'Unite de mesure',type:'',placeholdere:"Selectionnez une unité de mesure",isSelect:true,isTextArea:false,data:'',options:[{name:'metre'},{name:'milimetre'},{name:'centimentre'},{name:'personne'},{name:'pourcentage'}],required:true,},
          
        ],
        champsRecherche:[
          {name:'Indicateurs',type:'text',placeholdere:"Selectionnez un indicateur",isSelect:true,isTextArea:false,data:'',required:true,options:['indicateur1','indicateur2','indicateurs3']},
          {name:'Année de base',type:'year',placeholdere:"l'année de base",isSelect:false,isTextArea:false,data:'',required:true,},
          {name:'Valeur de base',type:'number',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,},
        ],
        cols:2,
        title:'',
        headers:[
          {name:'Indicateur',props:'indicateur'},
          {name:'Année de base',props:'anne_base'},
          {name:'Valeur de base',props:'valeur_base'},
          {name:'Valeur cible',props:'valeur_cible'},
          {name:'Unité de mesure',props:'unite_mesure'},
          {name:'2020',props:'date1'},
          {name:'2022',props:'date2'},
          {name:'2023',props:'date3'},
          {name:'2024',props:'date4'},
          {name:'Date de creation',props:'created_at'},
         
        ],
        dataTable:[
          {indicateur:'accident de circulation',anne_base:"2019",valeur_base:"22222222222222222",valeur_cible:"1500000000",valeur_realise:"700000000",unite_mesure:"centimentre",date1:'43% (2016) ',date2:'46%',date3:'51%',date4:'60%',ecart:'80',commentaire:'commentaire',created_at:"22-06-2022"},
          {indicateur:'taux de pauvrete',anne_base:"2019",valeur_base:"22222222222222222",valeur_cible:"1500000000",valeur_realise:"700000000",unite_mesure:"centimentre",date1:'43% (2016) ',date2:'46%',date3:'51%',date4:'60%',ecart:'80',commentaire:'commentaire',created_at:"22-06-2022"},
          {indicateur:'Volume du bassin de retention',anne_base:"2019",valeur_base:"22222222222222222",valeur_cible:"1500000000",valeur_realise:"700000000",unite_mesure:"centimentre",date1:'43% (2016) ',date2:'46%',date3:'51%',date4:'60%',ecart:'80',commentaire:'commentaire',created_at:"22-06-2022"},
          {indicateur:'Nombre d\'espace vert amenager',anne_base:"2019",valeur_base:"22222222222222222",valeur_cible:"1500000000",valeur_realise:"700000000",unite_mesure:"centimentre",date1:'43% (2016) ',date2:'46%',date3:'51%',date4:'60%',ecart:'80',commentaire:'commentaire',created_at:"22-06-2022"},
          {indicateur:'Nombre equipement vers acquis',anne_base:"2019",valeur_base:"22222222222222222",valeur_cible:"1500000000",valeur_realise:"700000000",unite_mesure:"centimentre",date1:'43% (2016) ',date2:'46%',date3:'51%',date4:'60%',ecart:'80',commentaire:'commentaire',created_at:"22-06-2022"},
          {indicateur:'Nombre d\'enfant former au metier',anne_base:"2019",valeur_base:"22222222222222222",valeur_cible:"1500000000",valeur_realise:"700000000",unite_mesure:"centimentre",date1:'43% (2016) ',date2:'46%',date3:'51%',date4:'60%',ecart:'80',commentaire:'commentaire',created_at:"22-06-2022"},
          {indicateur:'Nombre de bac à ordure acquis',anne_base:"2019",valeur_base:"22222222222222222",valeur_cible:"1500000000",valeur_realise:"700000000",unite_mesure:"centimentre",date1:'43% (2016) ',date2:'46%',date3:'51%',date4:'60%',ecart:'80',commentaire:'commentaire',created_at:"22-06-2022"},
          
         
          
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