<template>
  <dashboard espace="bailleur">
    <div class="p-0 w-full">
      <div v-if="showModal">
        <modal-top-right :title="title"  v-on:close="showModal = false">
          <div  class="px-4 overflow-y-auto">
            <vform template="default" isAllPairSaufDescrip="true" :champs="champs" :cols="cols" submitText="Creer un ano" @sendForm="sendForm" ></vform>
          </div>
        </modal-top-right>
      </div>
      <nav class="mb-2 text-sm font-semibold  " aria-label="Breadcrumb">
        <div>

          <ol class="inline-flex p-0 list-none">
            <li class="flex items-center ">
              <router-link to="/dashboard" class="text-gray-600">dashboard</router-link>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
            </li>

            <li class="flex items-center text-blue-500 ">
              <router-link to="" class="">ano</router-link>
            </li>
          </ol> 

        </div> 
      </nav>
      <div class="flex items-center justify-between my-2" >
        <div class="flex space-x-4">
          <span  class="inline-block cursor-pointer  border-b-8 font-bold text-xs 
 md:text-base uppercase    border-primary py-2">Tableau recapitulatif </span> 
        </div>
        <button  @click="addAno" title="ajouter un tabelau"  class="py-1 px-2  md:py-2 md:px-4 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase _rounded bg-primary focus:outline-none focus:shadow-outline">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
          <span class="mx-2 text-xs md:text-sm font-semibold">Ajouter </span>
        </button>
      </div>
      <vtable :headers="headers" :datas="dataTable" :actions="actions" @supprimer="supprimer" @modifier="modifier"></vtable>
    </div>
  </dashboard>
  
</template>

<script>
import ModalTopRight from '@/components/ModalTopRight'
 import SearchBar from '@/components/SearchBar'
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
        {name:'Nom',type:'text',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Date de soumission',type:'date',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Date obtention',type:'date',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Bailleurs',type:'',placeholdere:"Selectionnez le bailleur",isSelect:true,isTextArea:false,data:'',required:false,options:['BM','BOA']},
        {name:'Type',type:'',placeholdere:"Selectionnez un type",isSelect:true,isTextArea:false,data:'',options:['PTAB','PPM'],required:true,},
        {name:'Description',type:'',placeholdere:"Description",isSelect:false,isTextArea:true,data:'',required:true,},
        {name:'Status',type:'',placeholdere:"Selectionnez une valeur",isSelect:true,isTextArea:false,data:'',options:['En cours','En attente','terminer'],required:true,},
      ],
      cols:1,
      headers:[
        {name:'Nom',props:'nom'},
        {name:'Bailleur',props:'bailleur'},
        {name:'Type',props:'type'},
        {name:'Date soumission',props:'date_soumission'},
        {name:'Date obtention',props:'date_obtention'},
        {name:'Status',props:'status',status:true},
        {name:'Date de creation',props:'created_at'},
      ],
      dataTable:[
        {nom:'demande de fond à la BM',bailleur:'BM',type:"PTAB",date_soumission:"23-06-2022",date_obtention:"30-07-2022",status:'terminer',created_at:"22-06-2022"},
        {nom:'demande de fond à la BM',bailleur:'BM',type:"PTAB",date_soumission:"23-06-2022",date_obtention:"30-07-2022",status:'terminer',created_at:"22-06-2022"},
        {nom:'demande de fond à la BM',bailleur:'BM',type:"PTAB",date_soumission:"23-06-2022",date_obtention:"30-07-2022",status:'en cours',created_at:"22-06-2022"},
        {nom:'demande de fond à la BM',bailleur:'BM',type:"PTAB",date_soumission:"23-06-2022",date_obtention:"30-07-2022",status:'en attente',created_at:"22-06-2022"},
        {nom:'demande de fond à la BM',bailleur:'BM',type:"PTAB",date_soumission:"23-06-2022",date_obtention:"30-07-2022",status:'en cours',created_at:"22-06-2022"},
        {nom:'demande de fond à la BM',bailleur:'BM',type:"PTAB",date_soumission:"23-06-2022",date_obtention:"30-07-2022",status:'terminer',created_at:"22-06-2022"},
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