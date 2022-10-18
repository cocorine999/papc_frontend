<template>
<dashboard espace="bailleur">
  <div class="px-4">
    <div v-if="showModal">
      <ModalTopRight :title="title"  v-on:close="showModal = false">
        <div  class="px-4 overflow-y-auto">
          <vform template="default" isAllPairSaufDescrip="true" :champs="champs" :cols="cols" submitText="Creer un ano" @sendForm="sendForm" ></vform>
        </div>
      </ModalTopRight>
    </div>

    <nav class="mb-2 text-sm font-semibold  " aria-label="Breadcrumb">
      <div>
        <ol class="inline-flex p-0 list-none">

          <li class="flex items-center ">
            <router-link to="/dashboard" class="text-gray-600">dashboard</router-link>
            <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
          </li>

          <li class="flex items-center text-blue-500 ">
            <router-link to="" class="">Pap</router-link>
          </li>
        </ol>
      </div> 
    </nav>

    <div class="flex items-center justify-between my-2" >
      
      <div class="flex space-x-4">
        <span  class="inline-block cursor-pointer  border-b-8 font-bold text-sm uppercase    border-primary py-2">Tableau recapitulatif </span> 
      </div>
      <button  @click="addAno" title="ajouter un tabelau"  class="py-2 px-4 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase bg-primary focus:outline-none focus:shadow-outline">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
        <span class="mx-1 md:mx-2 text-xs font-semibold">Ajouter </span> 
      </button>
    </div>
    
     <vtable :headers="headers" :datas="dataTable" :actions="actions" @supprimer="supprimer" @modifier="modifier"></vtable>
    
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



export default {
   components: {
    Vtable,
    Dashboard,
    Vmodal,
    Vform,
    CardBailleur,
    Titre,
    SearchBar,
    ModalTopRight
  },
  data() {
    return {
      showModal:false,
      loading:false,
      showInput:true,
      title:'',
      champs:[
        {name:' Nom et Prenom ',type:'text',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,},
        {name:' Montant',type:'text',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,},

        {name:'Date de paiement',type:'date',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,},
        {name:' coordonnées geographiques',type:'text',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Commentaires',type:'',placeholdere:"Description",isSelect:false,isTextArea:true,data:'',required:true,},
        {name:' Contact ',type:'text',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,},

        {name:'Status',type:'',placeholdere:"Selectionnez une valeur",isSelect:true,isTextArea:false,data:'',options:['En cours','En attente','terminer'],required:true,},
      ],
      cols:2,
      headers:[
        {name:'Nom et Prenom',props:'nom'},
        {name:'Coordonnées géographiques',props:'bailleur'},
        {name:'Montant(Fcfa)',props:'type'},
        {name:'Date de paiement',props:'date_soumission'},
        {name:'Contact',props:'date_obtention'},
        {name:'Status',props:'status',status:true},
        {name:'Date de création',props:'created_at'},
      ],
      dataTable:[
        {nom:'ZINSOU Alain ',bailleur:'L:6,547777 , l=2,5855477',type:"8 000 000 ",date_soumission:"23-06-2022",date_obtention:"00229 96 97 06 03",status:'terminer',created_at:"22-06-2022"},
        {nom:'ATO Marc',bailleur:'L:6,547777 , l=2,5855477',type:"2  000 000 ",date_soumission:"23-06-2022",date_obtention:"00229 96 97 06 03",status:'terminer',created_at:"22-06-2022"},
        {nom:'HOUENOU Roger',bailleur:'L:6,547777 , l=2,5855477',type:"6  000 000 ",date_soumission:"23-06-2022",date_obtention:"00229 96 97 06 03",status:'en cours',created_at:"22-06-2022"},
        {nom:'AZIZA Mathieu',bailleur:'L:6,547777 , l=2,5855477',type:"4  000 000 ",date_soumission:"23-06-2022",date_obtention:"00229 96 97 06 03",status:'en attente',created_at:"22-06-2022"},
        {nom:'NOUTAI Constantin',bailleur:'L:6,547777 , l=2,5855477',type:"1  000 000 ",date_soumission:"23-06-2022",date_obtention:"00229 96 97 06 03",status:'en cours',created_at:"22-06-2022"},
        {nom:'demande de fond à la BM',bailleur:'L:6,547777 , l=2,5855477',type:"PTAB",date_soumission:"23-06-2022",date_obtention:"00229 96 97 06 03",status:'terminer',created_at:"22-06-2022"},
        {nom:'demande de fond à la BM',bailleur:'BM',type:"PTAB",date_soumission:"23-06-2022",date_obtention:"30-07-2022",status:'en cours',created_at:"22-06-2022"},
        {nom:'demande de fond à la BM',bailleur:'BM',type:"PTAB",date_soumission:"23-06-2022",date_obtention:"30-07-2022",status:'en attente',created_at:"22-06-2022"},
        {nom:'demande de fond à la BM',bailleur:'BM',type:"PTAB",date_soumission:"23-06-2022",date_obtention:"30-07-2022",status:'en attente',created_at:"22-06-2022"},
        {nom:'demande de fond à la BM',bailleur:'BM',type:"PTAB",date_soumission:"23-06-2022",date_obtention:"30-07-2022",status:'terminer',created_at:"22-06-2022"},
      ],
      actions:[
        {name:'supprimer',iconne:''},
      ]
    }
    
  },
  methods: {
    addAno() {
      this.title = 'Ajouter un element'
      this.showModal = true
    },

    
    
    supprimer(data) {
     alert(data +" à ete bien supprimer")
    },
    close() {
      this.showModal = false
    },
    
  }
}
</script>

<style>

</style>