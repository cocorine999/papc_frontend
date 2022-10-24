<template>
<dashboard espace="mo">
  <div class="w-full p-4">
    <div v-if="showModal">
      <modal-top-right :title="title"  v-on:close="closeModal">
        <div  class="w-full">
          <div v-if="title =='Modifier une ONG/AGENCES DE COMMUNICATION'">
            <vform template="default" :champs="champs" :cols="cols" submitText="Modifier" @sendForm="sendForm" ></vform>
          </div>
          <div v-if="title =='Ajouter une nouvelle ONG/AGENCES DE COMMUNICATION'">
            <vform template="default" :champs="champs" :cols="cols" submitText="Ajouter" @sendForm="sendForm" ></vform>
          </div>
          <div v-if="title =='Dupliquer une ONG/AGENCES DE COMMUNICATION'">
            <vform template="default" :champs="champs" :cols="cols" submitText="Creer à partir de " @sendForm="sendForm" ></vform>
          </div>
        </div>
      </modal-top-right>
    </div>

    <div v-if="showModal2">
      <modal-top-right :title="title2"  v-on:close="showModal2 = false">
        <div  class="px-4 overflow-y-auto">
          <vform template="default"  :champs="passationChamps" isAllPairSaufDescrip="true" :cols="colsPassation" submitText="Creer un MOD" @sendForm="sendForm" ></vform>
        </div>
      </modal-top-right>
    </div>
    
    <nav class="mb-2 mt-4 text-sm font-semibold flex justify-between items-center 	" aria-label="Breadcrumb">
      <div>
        <ol class="inline-flex p-0 list-none">
          <li class="flex items-center text-blue-500">
            <router-link to="" class="text-gray-600">dashboard</router-link>
            <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
          </li>
          <li class="flex items-center ">
            <router-link to="" class="text-gray-600">ONG/AGENCES DE COMMUNICATIONS</router-link>
          </li>
        </ol>
      </div>
      <div>
        <search-bar ></search-bar>
      </div>
    </nav> 
    
    <div class="flex justify-start mt-2">
      <div class="flex  items-center ">
        <span title="vue en mosaique" @click="switch1" :class="{'border-2':mosaique}" class="p-2  cursor-pointer border-gray-500 text-gray-700 hover:text-gray-500"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.8em" width="1.8em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M3 5v14a2 2 0 002 2h6V3H5a2 2 0 00-2 2zm16-2h-6v8h8V5c0-1.1-.9-2-2-2zm-6 18h6c1.1 0 2-.9 2-2v-6h-8v8z"></path></svg></span>
        <span title="vue en ligne" @click="switch2" :class="{'border-2':line}" class="p-2 text-gray-700 border-gray-500 cursor-pointer hover:text-gray-500 "><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.8em" width="1.8em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M3 14h4v-4H3v4zm0 5h4v-4H3v4zM3 9h4V5H3v4zm5 5h13v-4H8v4zm0 5h13v-4H8v4zM8 5v4h13V5H8z"></path></svg></span>
      </div>
    </div>
    <div class="flex items-center justify-between my-2" >
       <div class="flex space-x-4">
          <span @click="goOng" :class="{'border-primary border-b-8':seeOng}" class="inline-block cursor-pointer  text-lg uppercase font-bold  py-2">Les ONG/AGENCES DE COMMUNICATIONs </span>
          <span @click="goPassation" :class="{'border-primary border-b-8':seePassation}" class="inline-block cursor-pointer  text-base uppercase font-bold   py-2">Passation de marché </span>
          <span @click="gochecklist" :class="{'border-primary border-b-8':seechecklist}" class="inline-block cursor-pointer  text-base uppercase font-bold   py-2">Mes checklist </span>
        </div>
      
        <button v-if="seeOng" @click="addBailleur" title="ajouter une instutitions"   class="py-2 px-4 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase bg-primary focus:outline-none focus:shadow-outline">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
         <span class="mx-2 text-xs  md:text-sm font-semibold">Ajouter un passation de marché</span>
        </button>
        <button  v-if="seePassation" @click="addPassation" title="Ajouter un MOD"  class="py-2 px-4 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase bg-primary focus:outline-none focus:shadow-outline">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
          <span class="mx-2 text-xs  md:text-sm font-semibold">Ajouter un passation de marché</span>
        </button>

        <router-link v-if="seechecklist" to="/dashboard/checklist/create"  title="ajouter une checklist"  class="py-2 px-4 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
          <span class="mx-2 text-xs md:text-sm font-semibold">Ajouter </span>
        </router-link>

        
    </div>

    <div v-if="seeOng">
     <div v-if="mosaique" class="grid grid-cols-1 my-4 lg:grid-cols-3 md:grid-cols-2 sm:gap-5">
      <div v-for="(bailleur,index) in bailleurs" :key="index">
           <div class="relative p-6 max-w-80 bg-white sm:rounded-lg overflow-hidden _shadow-md">
              <span :class="bailleur.color" class="absolute text-4xl sm:text-5xl text-white tracking-tight font-bold  px-4 py-2 rounded-lg uppercase"><i class='bx bx-coin-stack bx-md'></i>{{bailleur.sigle}}</span>
              <!-- dots -->
              <span class="absolute right-0 cursor-pointer"><i class='bx bx-dots-vertical-rounded bx-md pr-2'></i></span>
              <!-- ./dots -->
              <p class="my-2 text-normal text-sm sm:text-base font-medium text-gray-600 mt-16 truncate">{{bailleur.bailleur}}</p>
    
              <div class="flex items-center mt-8 text-gray-600">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" class="w-8 h-8 text-gray-500">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div class="ml-4 text-xs  md:text-md tracking-wide font-semibold w-full truncate">Dhaka, Street, State, Postal Code Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo quod sunt tempore iste eligendi unde molestias ipsum omnis dolorum totam!</div>
              </div>
    
              <div class="flex items-center mt-1 text-gray-600 dark:text-gray-400">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" class="w-8 h-8 text-gray-500">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div class="ml-4 text-xs  md:text-md tracking-wide font-semibold w-full truncate">+880 1234567890</div>
              </div>
    
              <div class="flex items-center mb-8 text-gray-600 dark:text-gray-400">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" class="w-8 h-8 text-gray-500">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div class="ml-4 text-xs  md:text-md tracking-wide font-semibold w-full truncate">info@demo.com</div>
              </div>
            </div>
      </div>
    </div>
    <div v-if="line"  class="line my-4">
      <vtable 
      :headers="headers" 
      :datas="bailleurs"
      :actions="actions" 
      @supprimer="supprimer" 
      @modifier="modifier"></vtable>
    </div>
    </div>

    <div v-if="seePassation">
      <div v-if="seePassation">
        <vtable :headers="headers" :datas="dataTable2" :actions="actions" @supprimer="supprimerPassation" ></vtable>    
      </div>
    </div>
    <div v-if="seechecklist"> 
      <div  class="grid grid-cols-3 gap-4">
        <div v-for="i in 6" :key="i.id">
          <card-checklist
            libelle="formulaire"
            code="15555DC" 
            activite="Nombre d'accident routiere" 
            :unites="['personne','%','km']" 
            @supprimer="supprimer"
            @modifier="modifier"
            @dupliquer="dupliquer"
            > </card-checklist>
        </div>
      </div>
    </div>
  </div>
  </dashboard>
</template>

<script>
import ModalTopRight from '@/components/ModalTopRight'
import SearchBar from '@/components/SearchBar'
import CardBailleur from '@/components/CardBailleur'
import Titre from '@/components/Titre'
import Vtable from '@/components/Vtable'
import Vform from '@/components/Vform'
import Vmodal from '@/components/Vmodal'
import Dashboard from '@/layouts/Dashboard'
import { mapState } from 'vuex'
import CardMod from '@/components/CardMod'
import CardChecklist from '@/components/CardChecklist'

export default {
  components: {
    Vtable,
    Dashboard,
    Vmodal,
    Vform,
    CardBailleur,
    Titre,
    SearchBar,
    CardMod,
    CardChecklist,
    ModalTopRight
    
  },
  data() {
    return {
      showModal:false,
      showModal2:false,
      loading:false,
      line:false,
      mosaique:true,
      seeOng:true,
      seePassation:false,
      seechecklist:false,
      title: '',
      headers:[
        {name:'Bailleurs',props:'bailleur'},
        {name:'Sigle',props:'sigle'},
        {name:'Code PTA',props:'code'},
        {name:'Date creation',props:'created_at'},
      ],
       
      bailleurs:[
         {
          bailleur:'',
          sigle:'ACVDT',
          code:"4.1.1.3.1",
          created_at:"22-06-2022",
          color:' bg-yellow-500'
          },
        {
        bailleur:'',
        sigle:'SIRAT',
        code:"4.1.1.3.2",
        created_at:"22-06-2022",
        color:' bg-red-500'
        },
        {
        bailleur:'',
        sigle:'MEF',
        code:"4.1.1.3.3",
        created_at:"22-06-2022",
        color:' bg-pink-500'
        },
        {
        bailleur:"",
        sigle:'CAA',
        code:"4.1.1.3.4",
        created_at:"22-06-2022",
        color:' bg-blue-500'
        },
        {
        bailleur:"",
        sigle:'ANSI',
        code:"4.1.1.3.5",
        created_at:"22-06-2022",
        color:' bg-yellow-900'
        },
        {
        bailleur:"",
        sigle:'GOUV',
        code:"4.1.1.3.6",
        created_at:"22-06-2022",
        color:' bg-indigo-500'
        },

      ],
      
      dataTable:[
        {bailleur:'Banque Mondiale ',sigle:'BM',code:"DFSDFDS525",created_at:"22-06-2022"},
        {bailleur:'Banque Mondiale ',sigle:'BM',code:"DFSDFDS525",created_at:"22-06-2022"},
        {bailleur:'Banque Mondiale ',sigle:'BM',code:"DFSDFDS525",created_at:"22-06-2022"},
      ],

       dataTable2:[
          {createur:'Gomez jacob',mod:"Agetur",site:'Calavi',montant_passation:'20000000000000',date_obtention:"23-0-2022",date_demarrage:"25-0-2022",date_signature:"22-06-2022",date_previsionnelle:"23-06-2025",date_avance:"21-06-2022",montant_avance:"200000000000",estimation:'40000000000000',ordre_service:'lorem',travaux:'lorem',responsable_sociologue:'Ange Klika',created_at:"22-06-2022"},
          {createur:'Gomez jacob',mod:"Agetur",site:'Calavi',montant_passation:'20000000000000',date_obtention:"23-0-2022",date_demarrage:"25-0-2022",date_signature:"22-06-2022",date_previsionnelle:"23-06-2025",date_avance:"21-06-2022",montant_avance:"200000000000",estimation:'40000000000000',ordre_service:'lorem',travaux:'lorem',responsable_sociologue:'Ange Klika',created_at:"22-06-2022"},
          {createur:'Gomez jacob',mod:"Agetur",site:'Calavi',montant_passation:'20000000000000',date_obtention:"23-0-2022",date_demarrage:"25-0-2022",date_signature:"22-06-2022",date_previsionnelle:"23-06-2025",date_avance:"21-06-2022",montant_avance:"200000000000",estimation:'40000000000000',ordre_service:'lorem',travaux:'lorem',responsable_sociologue:'Ange Klika',created_at:"22-06-2022"},
          {createur:'Gomez jacob',mod:"Agetur",site:'Calavi',montant_passation:'20000000000000',date_obtention:"23-0-2022",date_demarrage:"25-0-2022",date_signature:"22-06-2022",date_previsionnelle:"23-06-2025",date_avance:"21-06-2022",montant_avance:"200000000000",estimation:'40000000000000',ordre_service:'lorem',travaux:'lorem',responsable_sociologue:'Ange Klika',created_at:"22-06-2022"},
          {createur:'Gomez jacob',mod:"Agetur",site:'Calavi',montant_passation:'20000000000000',date_obtention:"23-0-2022",date_demarrage:"25-0-2022",date_signature:"22-06-2022",date_previsionnelle:"23-06-2025",date_avance:"21-06-2022",montant_avance:"200000000000",estimation:'40000000000000',ordre_service:'lorem',travaux:'lorem',responsable_sociologue:'Ange Klika',created_at:"22-06-2022"},
          {createur:'Gomez jacob',mod:"Agetur",site:'Calavi',montant_passation:'20000000000000',date_obtention:"23-0-2022",date_demarrage:"25-0-2022",date_signature:"22-06-2022",date_previsionnelle:"23-06-2025",date_avance:"21-06-2022",montant_avance:"200000000000",estimation:'40000000000000',ordre_service:'lorem',travaux:'lorem',responsable_sociologue:'Ange Klika',created_at:"22-06-2022"},
          {createur:'Gomez jacob',mod:"Agetur",site:'Calavi',montant_passation:'20000000000000',date_obtention:"23-0-2022",date_demarrage:"25-0-2022",date_signature:"22-06-2022",date_previsionnelle:"23-06-2025",date_avance:"21-06-2022",montant_avance:"200000000000",estimation:'40000000000000',ordre_service:'lorem',travaux:'lorem',responsable_sociologue:'Ange Klika',created_at:"22-06-2022"},
        ],
      passationChamps:[
        {name:'Selectionnez MOD',type:'',placeholdere:"Selectionnez MOD",isSelect:true,isTextArea:false,data:'',required:true,options:['Agetur','Agetur2']},
        {name:'Selectionnez Site',type:'',placeholdere:"Selectionnez un site",isSelect:true,isTextArea:false,data:'',options:['calavi','cotonou'],required:true,},
        {name:'Montant passation',type:'number',placeholdere:"Montant passation",isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Date obtention',type:'date',placeholdere:"Date obtention",isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Date signature',type:'date',placeholdere:"Date signature",isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Date Demarrage',type:'date',placeholdere:"Date de Demarrage",isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Date previsionnelle',type:'date',placeholdere:"Date de previsionnelle",isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Date  obtention avance',type:'date',placeholdere:"Date obtention avance",isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Montant avance',type:'number',placeholdere:"Montant avance",isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Estimation',type:'number',placeholdere:"Estimation",isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Ordre de service',type:'text',placeholdere:"Ordre de service",isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Travaux',type:'text',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Responsable sociologue',type:'',placeholdere:"Selectionnez un responsable",isSelect:true,isTextArea:false,data:'',required:true,options:['Responsable','Responsable2']},
      ],
      cols:1,
      colsPassation:2,
      headers:[
          {name:'Nom createur',props:'createur',width:"w-24"},
          {name:'Site',props:'site',width:"w-36"},
          {name:'MOD',props:'mod',width:"w-36"},
          {name:'Montant passation',props:'montant_passation',width:"w-24"},
          {name:'Date obtention',props:'date_obtention',width:"w-24"},
          {name:'Date demarrage',props:'date_demarrage',width:"w-24"},
          {name:'Date signature',props:'date_signature',width:"w-24"},
          {name:'date previsionnelle',props:'date_previsionnelle',width:"w-24"},
          {name:'Date obtention avance',props:'date_avance',width:"w-40"},
          {name:'Montant avance',props:'montant_avance',width:"w-24"},
          {name:'Estimation',props:'estimation',width:"w-24"},
          {name:'Ordre de service',props:'ordre_service',width:"w-24"},
          {name:'travaux',props:'travaux',width:"w-24"},
          {name:'Responsable sociologue',props:'responsable_sociologue',width:"w-24"},
          {name:'Date de creation',props:'created_at',width:"w-28"},
         
         
        ],

      actions:[
        {name:'modifier',iconne:''},
        {name:'supprimer',iconne:''},
      ],
      champs:[
        {name:'Nom',type:'text',placeholdere:"Nom de  l'ONG/AGENCES DE COMMUNIMATION",isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Email',type:'email',placeholdere:"Votre Email",isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Contact',type:'',placeholdere:'Votre contact',isSelect:false,isTextArea:false,data:'',required:true,},
      ],
      cols:1,
      option:[
        {name:'supprimer'},
        {name:'modifier'},
      ]
      


    }
  },
  methods: {
    switch1() {
      this.mosaique = true
      this.line = false
    },
    switch2() {
      this.mosaique = false
      this.line = true
    },
    
    closeModal() {
      this.showModal=false
    },
   
    sendForm() {
      alert('donnée envoyer')
    },
     goOng() {
      this.seeOng = true
      this.seePassation = false
      this.seechecklist = false
    },
    goPassation() {
      this.seeOng = false
      this.seePassation = true
      this.seechecklist = false
    },
    gochecklist() {
      this.seeOng = false
      this.seePassation = false
      this.seechecklist = true
    },
    modifier(data) {
      this.title='Modifier une ONG/AGENCES DE COMMUNICATION'
      this.showModal = true
      alert(data +" à ete modifier")
    },
    supprimer(data) {
      alert(data +" à ete bien supprimer")
    },
    dupliquer(data) {
      this.showModal = true
      this.title='Dupliquer une ONG/AGENCES DE COMMUNICATION'
      alert(data +" à ete bien dupliquer")
    },
    supprimerPassation(data) {
      alert(data+ " à ete bien supprimer")
    },
     addBailleur() {
      this.title='Ajouter une nouvelle ONG/AGENCES DE COMMUNICATION'
      this.showModal = true
    },
     addPassation() {
      this.title2 = 'Ajouter une Passation'
      this.showModal2 = true
    },
    

   
  }
}
</script>

<style>

</style>