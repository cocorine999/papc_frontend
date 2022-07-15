<template>
  <dashboard>
    <div class="p-4">
      <nav class="mb-2 text-sm font-semibold flex justify-between items-center " aria-label="Breadcrumb">
        <div>
          <ol class="inline-flex p-0 list-none">
            <li class="flex items-center text-blue-500">
              <router-link to="" class="text-gray-600">dashboard</router-link>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
            </li>
            <li class="flex items-center ">
              <router-link to="" class="text-gray-600">environement-indicateur</router-link>
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
            <div v-if="title =='Modifier un indicateur'">
              <vform template="default" isAllPairSaufDescrip="true" :champs="champs" :cols="cols" submitText="Modifier" @sendForm="sendForm" ></vform>
            </div>
            <div v-if="title =='Ajouter un indicateur'">
              <vform template="default" isAllPairSaufDescrip="true" :champs="champs" :cols="cols" submitText="Ajouter" @sendForm="sendForm" ></vform>
            </div>
            <div v-if="title =='Dupliquer un indicateur'">
              <vform template="default" isAllPairSaufDescrip="true" :champs="champs" :cols="cols" submitText="Creer à partir de " @sendForm="sendForm" ></vform>
            </div>
          </div>
        </modal-top-right>
      </div>

      <div v-if="showModal2">
        <modal-top-right  title="Filtre indicateur"  v-on:close="showModal2 = false">
          <div class="px-4" >
            <vform template="default" isAllPairSaufDescrip="true" :champs="champsRecherche" :cols="cols" submitText="Rechercher" @sendForm="filtre" ></vform>
          </div>
        </modal-top-right>
      </div>

      <div class="flex items-center justify-between">
        <titre>Les indicateurs </titre>
        <div class="flex items-center space-x-4">
          <button @click="showModal2 = true" title="filtre" class="bg-primary text-white px-2 py-1"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg></button>
          <button @click="addIndicateur" title="ajouter un indicateur"   class="px-4 py-2 flex overflow-hidden items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
            <span class="mx-2 text-sm font-semibold uppercase">ajouter un indicateur</span>
          </button>
          <router-link to="/dashboard/environement/suivi"  title="voir suivi"   class="px-4 py-2 overflow-hidden items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
            <span  class="mx-2 text-sm font-semibold uppercase ">Voir suivi indicateur</span>
          </router-link>
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
import CardProgramme from '@/components/CardProgramme'
export default {
  components: {
    Vtable,
    Dashboard,
    Vmodal,
    Vform,
    Titre,
    SearchBar,
    CardProgramme,
    ModalTopRight
  },
  data() {
      return ({
        showModal:false,
        showModal2:false,
        loading:false,
        title:'',
        champs:[
          {name:'Nom',type:'text',placeholdere:"Nom de l'indicateur",isSelect:false,isTextArea:false,data:'',required:true,},
          {name:'Date debut',type:'year',placeholdere:"Date debut",isSelect:false,isTextArea:false,data:'',required:true,},
          {name:'Date fin',type:'',placeholdere:"Selectionnez une date de fin",isSelect:false,isTextArea:false,data:'',required:true,},
        ],
        cols:2,
        champsRecherche:[
          {name:'Indicateurs',type:'text',placeholdere:"Selectionnez un indicateur",isSelect:true,isTextArea:false,data:'',required:true,options:[{name:'indicateur1'},{name:'indicateur2'},{name:'indicateurs3'}],methode:this.selectData},
          {name:'Date debut',type:'year',placeholdere:"Date debut",isSelect:false,isTextArea:false,data:'',required:true,},
          {name:'Date fin',type:'',placeholdere:"Selectionnez une date de fin",isSelect:false,isTextArea:false,data:'',required:true,},
        ],
        headers:[
          {name:'Indicateur',props:'indicateur'},
          {name:'Code',props:'code'},
          {name:'Programme',props:'programme'},
          {name:'Date debut',props:'debut'},
          {name:'Date Fin',props:'fin'},
          {name:'Date de creation',props:'created_at'},
        ],
        dataTable:[
          {indicateur:'indicateur1',code:'BM55555',programme:"programme",debut:"01-01-2020",fin:"01-01-2022",created_at:"22-06-2022"},
          {indicateur:'indicateur2',code:'BM55555',programme:"programme",debut:"01-01-2020",fin:"01-01-2022",created_at:"22-06-2022"},
          {indicateur:'indicateur3',code:'BM55555',programme:"programme",debut:"01-01-2020",fin:"01-01-2022",created_at:"22-06-2022"},
          {indicateur:'indicateur4',code:'BM55555',programme:"programme",debut:"01-01-2020",fin:"01-01-2022",created_at:"22-06-2022"},
          {indicateur:'indicateur5',code:'BM55555',programme:"programme",debut:"01-01-2020",fin:"01-01-2022",created_at:"22-06-2022"},
          {indicateur:'indicateur6',code:'BM55555',programme:"programme",debut:"01-01-2020",fin:"01-01-2022",created_at:"22-06-2022"},
          {indicateur:'indicateur7',code:'BM55555',programme:"programme",debut:"01-01-2020",fin:"01-01-2022",created_at:"22-06-2022"},
          {indicateur:'indicateur8',code:'BM55555',programme:"programme",debut:"01-01-2020",fin:"01-01-2022",created_at:"22-06-2022"},
          {indicateur:'indicateur9',code:'BM55555',programme:"programme",debut:"01-01-2020",fin:"01-01-2022",created_at:"22-06-2022"},
          
          
        ],
        actions:[
          {name:'modifier',iconne:''},
          {name:'supprimer',iconne:''},
        ]

      });
  },
  mounted() {
  },
  methods: {
    selectData ({ name}) {
      return `${name}`
    },
    addIndicateur() {
      this.title ='Ajouter un indicateur'
      this.showModal = true
    },
    modifier() {
      this.title ='Modifier un indicateur'
      this.showModal = true
    },
    supprimer(data) {
      alert(data+" à ete bien supprimer")
    },
    dupliquer() {
      this.title ='Dupliquer un indicateur'
      this.showModal = true
    }
  }
}
</script>

<style scoped>

</style>