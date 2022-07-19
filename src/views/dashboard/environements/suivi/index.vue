<template>
  <dashboard>
    <div class="p-4">
        <nav class="mb-2 text-sm font-semibold flex justify-between items-center " aria-label="Breadcrumb">
          <div>
            <ol class="inline-flex p-0 list-none">
              <li class="flex items-center text-blue-500">
                <router-link to="/dashboard" class="text-gray-600">dashboard</router-link>
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

      

        <div class="flex items-center justify-between my-4">
          <titre>Le suivi d'evaluation </titre>
          <div class="flex items-center space-x-4">
            <button @click="addSuivi" title="ajouter un indicateur"   class="px-4 py-2 flex overflow-hidden items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
              <span class="mx-2 text-sm font-semibold">ajouter un suivi d'evaluation</span>
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
          {name:'Bailleurs',type:'',placeholdere:"Selectionnez le bailleur",isSelect:true,isTextArea:false,data:'',required:true,options:[{name:'BM'},{name:'BOA'}]},
          {name:'Description',type:'',placeholdere:"",isSelect:false,isTextArea:true,data:'',required:true,},
          {name:'Ouvrage concerné',type:'text',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,},
          {name:'Activités programmées',type:'',placeholdere:"",isSelect:false,isTextArea:true,data:'',required:true,},
          {name:'Activité menu',type:'',placeholdere:"",isSelect:false,isTextArea:true,data:'',required:true,},
          {name:'Niveau de mise en oeuvre',type:'text',placeholdere:"ex:50%",isSelect:false,isTextArea:false,data:'',required:true,},
          {name:'Commentaire',type:'',placeholdere:"",isSelect:false,isTextArea:true,data:'',required:true,},
         
        ],
       
        cols:2,
        title:'',
        headers:[
    
          {name:'Bailleur',props:'bailleur'},
          {name:'Description',props:'description'},
          {name:'ouvrages concernés',props:'ouvrages'},
          {name:'Activité programmées',props:'activite_prog'},
          {name:'Activité mennées',props:'activite_mene'},
          {name:'Niveau mise en oeuvre',props:'niveau'},
          {name:'Commentaire',props:'commentaire'},
          {name:'Date de creation',props:'created_at'},
         
        ],
        dataTable:[
          {bailleur:'BM',description:'lorem ipsum',ouvrages:"Pa3 Y et AAC",activite_prog:"indentification du site d'enfouissement des boue de dragage",activite_mene:"lorem ipsum",niveau:"100%",commentaire:"",created_at:"22-06-2022"},
          {bailleur:'BM',description:'lorem ipsum',ouvrages:"Pa3 Y et AAC",activite_prog:"indentification du site d'enfouissement des boue de dragage",activite_mene:"lorem ipsum",niveau:"100%",commentaire:"",created_at:"22-06-2022"},
          {bailleur:'BM',description:'lorem ipsum',ouvrages:"Pa3 Y et AAC",activite_prog:"indentification du site d'enfouissement des boue de dragage",activite_mene:"lorem ipsum",niveau:"100%",commentaire:"",created_at:"22-06-2022"},
          {bailleur:'BM',description:'lorem ipsum',ouvrages:"Pa3 Y et AAC",activite_prog:"indentification du site d'enfouissement des boue de dragage",activite_mene:"lorem ipsum",niveau:"100%",commentaire:"",created_at:"22-06-2022"},
          {bailleur:'BM',description:'lorem ipsum',ouvrages:"Pa3 Y et AAC",activite_prog:"indentification du site d'enfouissement des boue de dragage",activite_mene:"lorem ipsum",niveau:"100%",commentaire:"",created_at:"22-06-2022"},
          {bailleur:'BM',description:'lorem ipsum',ouvrages:"Pa3 Y et AAC",activite_prog:"indentification du site d'enfouissement des boue de dragage",activite_mene:"lorem ipsum",niveau:"100%",commentaire:"",created_at:"22-06-2022"},
          {bailleur:'BM',description:'lorem ipsum',ouvrages:"Pa3 Y et AAC",activite_prog:"indentification du site d'enfouissement des boue de dragage",activite_mene:"lorem ipsum",niveau:"100%",commentaire:"",created_at:"22-06-2022"},
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