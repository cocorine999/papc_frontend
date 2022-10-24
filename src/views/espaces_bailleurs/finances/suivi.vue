<template>
  <dashboard espace="bailleur">
    <div class="w-full">
      <nav class="mb-2 mt-4 text-sm font-semibold flex justify-between items-center 	" aria-label="Breadcrumb">
        <div>
          <ol class="inline-flex p-0 list-none">
            <li class="flex items-center text-blue-500">
              <router-link to="" class="text-gray-600">dashboard</router-link>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
            </li>
            <li class="flex items-center ">
              <router-link to="" class="text-gray-600">Decaissement</router-link>
            </li>
          </ol>
        </div>
        <div>
          <search-bar ></search-bar>
        </div>
      </nav> 
      <div v-if="showModal">
        <modal-top-right :title="title" v-on:close="close">
        <div  class="w-full">
          <div v-if="title =='Ajouter un decaissement'">
              <vform template="default" :champs="champs" :cols="cols" submitText="Enregistrer" @sendForm="sendForm" ></vform>
          </div>
          <div v-if="title =='Modifier un decaissement'">
              <vform template="default" :champs="champs" :cols="cols" submitText="Modifier" @sendForm="sendForm" ></vform>
          </div>
          
        </div>
        </modal-top-right>
      </div>
      <div v-if="showModal2">
        <vmodal  title="Exporter les données"  v-on:close="showModal = false">
          <div class="px-8" style="width:60vw !important">
            <vform template="default" isAllPairSaufDescrip="true" :champs="champsExport" :cols="cols" submitText="Exporter" @sendForm="Exporter" ></vform>
          </div>
        </vmodal>
      </div>
      <div class="flex items-center justify-between flex-wrap">
        <titre>Suivi Budgétaire </titre>
        <div class="flex space-x-3 flex-wrap justify-end ">
          
          <button  @click="showModal2 = true" title="exporter en excel"   class="py-2  px-4 overflow-hidden  space-x-2 items-center text-xs font-semibold text-white uppercase bg-blue-500 focus:outline-none focus:shadow-outline">
              <svg class="inline mr-2" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path d="m12 18 4-5h-3V2h-2v11H8z"></path><path d="M19 9h-4v2h4v9H5v-9h4V9H5c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-9c0-1.103-.897-2-2-2z"></path></svg>
            <span class="mx-2 text-xs  md:text-sm font-semibold">Importez les données</span>
          </button>
          <button  @click="showModal2 = true" title="exporter en excel"   class="py-2  px-4 overflow-hidden  space-x-2 items-center text-xs font-semibold text-white uppercase bg-indigo-500 focus:outline-none focus:shadow-outline">
            <svg class="inline" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path d="M11 16h2V7h3l-4-5-4 5h3z"></path><path d="M5 22h14c1.103 0 2-.897 2-2v-9c0-1.103-.897-2-2-2h-4v2h4v9H5v-9h4V9H5c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2z"></path></svg>
            <span class="mx-2 text-xs  md:text-sm font-semibold">Export Excel</span>
          </button>
          <button @click="addDecaissement" title="ajouter " class="py-2 px-4 overflow-hidden flex space-x-2 items-center font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
            <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg></span>
            <span class="mx-1 md:mx-2 text-xs font-semibold">ajouter</span>
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
        return {
          showModal:false,
          showModal2:false,
          title:'',
          champs:[
          {name:'Montant',type:'number',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,},
          {name:'Date',type:'date',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,},
          {name:'Activité',type:'',placeholdere:'Selectionnez une activité',isSelect:true,isTextArea:false,data:'',options:['projet1','projet2'],required:true,},
          {name:'Trimestre',type:'',placeholdere:'Selectionnez un trimestre',isSelect:true,isTextArea:false,data:'',options:['trimestre 1','trimestre 2','trimestre 3','trimestre 4'],required:true,}, 
        ],
        champsExport:[
          {name:'Date de debut',type:'text',placeholdere:"Selectionnez un indicateur",isSelect:true,isTextArea:false,data:'',required:true,options:['indicateur1','indicateur2','indicateurs3']},
          {name:'Date de Fin',type:'year',placeholdere:"l'année de base",isSelect:false,isTextArea:false,data:'',required:true,},
          {name:'Trimestre',type:'',placeholdere:"Selectionnez le trimestre",isSelect:true,isTextArea:false,data:'',required:true,options:[1,2,3,4]},
          {name:'Activité',type:'',placeholdere:"Selectionnez une activité",isSelect:true,isTextArea:false,data:'',required:true,options:['BM','BOA']},
        ],
        cols:2, 
        headers:[
          {name:'Createur',props:'createur'},
          {name:'Code',props:'code'},
          {name:'Activité',props:'activite'},
          {name:'Trimestre 1',props:'trimestre1'},
          {name:'Trimestre 2',props:'trimestre2'},
          {name:'Trimestre 3',props:'trimestre3'},
          {name:'Trimestre 4',props:'trimestre4'},
          {name:'Code PTAB',props:'pta'},
          {name:'Année',props:'annee'},
          {name:'Date de creation',props:'created_at'},
        ],
        dataTable:[
          {createur:'Gomez ',code:'',activite:"activité 1",trimestre1:",trimestre1",trimestre2:"trimestre2",trimestre3:"trimestre3",trimestre4:"trimestre4",pta:'1.3.3.5',annee:"2020",created_at:"22-06-2022"},
          {createur:'Ange Klika ',code:'',activite:"activité 1",trimestre1:",trimestre1",trimestre2:"trimestre2",trimestre3:"trimestre3",trimestre4:"trimestre4",pta:'1.3.3.5',annee:"2020",created_at:"22-06-2022"},
          {createur:'Gandonou Luthe ',code:'',activite:"activité 1",trimestre1:",trimestre1",trimestre2:"trimestre2",trimestre3:"trimestre3",trimestre4:"trimestre4",pta:'1.3.3.5',annee:"2020",created_at:"22-06-2022"},
          
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