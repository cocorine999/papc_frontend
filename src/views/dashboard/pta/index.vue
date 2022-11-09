<template>
  <dashboard>
  <div  class="w-full">
    <div v-if="reviser ">
      <vmodal title="confirmation !"  v-on:close="reviser = false">
        <div  style="width:60vw !important">
          <div  class="p-4 mb-4 border border-red-300 rounded-lg bg-red-50 dark:bg-red-200" role="alert">
            <div class="flex items-center">
              <svg aria-hidden="true" class="w-5 h-5 mr-2 text-red-900 dark:text-red-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
              <span class="sr-only">Info</span>
              <h3 class="text-lg font-medium text-red-900 dark:text-red-800">Voulez vous revisez le PTAB  ?</h3>
            </div>
            <div class="mt-2 mb-4 text-sm text-red-900 dark:text-red-800">
             Cette action est irreversible , et les changements affecterront les données de votres applications 
            </div>
            <div class="flex">
              <button type="button" v-if="isClick" @click.once="reviserPta" class="text-white bg-red-900 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-red-800 dark:hover:bg-red-900">
                confirmer 
              </button>
              <button type="button" v-if="isClick" @click="reviser = false                                                                                                                " class="text-red-900 bg-transparent border border-red-900 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:border-red-800 dark:text-red-800 dark:hover:text-white" data-dismiss-target="#alert-additional-content-2" aria-label="Close">
               abandonner
              </button>
              <div v-if="!isClick"> 
                chargement ...
              </div>
            </div>
          </div>
        </div>
      </vmodal>
    </div>
     <div v-if="showModal">
      <vmodal  title="Exporter les données"  v-on:close="showModal = false">
        <div class="px-8" style="width:60vw !important">
          <vform template="default" isAllPairSaufDescrip="true" :champs="champsExport" :cols="cols" submitText="Exporter" @sendForm="Exporter" ></vform>
        </div>
      </vmodal>
    </div>
   
    <div>
        <ol class="inline-flex p-0 list-none">
          <li class="flex items-center text-blue-500">
            <router-link to="/dashboard" class="text-gray-600">dashboard</router-link>
            <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
          </li>
          <li class="flex items-center text-blue-500">
            <router-link to="/dasboard/projet" class="">pta</router-link>
          </li>
        </ol>
    </div>

    <div class="flex items-center justify-between my-2" >
      <div class="flex space-x-4">
        <span @click="goPta" v-if="ptaVisible" :class="{'border-primary border-b-8':seePta}" class="inline-block cursor-pointer  text-lg uppercase font-bold    py-2">Le pta </span>
        <span @click="goPpm" v-if="ppmVisible" :class="{'border-primary border-b-8':seePpm}" class="inline-block cursor-pointer  text-lg uppercase font-bold   py-2">Le PPM </span>
      </div> 
      <div>
        <div v-if="seePta && revisionAdd " class="flex space-x-4 items-center">
          <button @click="reviser = true" title="reviser ptba"   class="py-2 px-4 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase  bg-red-500 focus:outline-none focus:shadow-outline">
            <span class="mx-2 text-xs  md:text-sm font-semibold"> reviser ptba </span>
          </button>
         
        
        </div>
       
        
      </div>
    </div>

   
    <div v-if="seePta && ptaVisible"  class="relative my-4  sm:rounded-lg">
      <ptab  ></ptab>
    </div>
    <div v-if="seePpm && ppmVisible "  class="relative my-4  sm:rounded-lg">
      <ppm ></ppm>
    </div>
  </div>
  </dashboard>
  
</template>

<script>

 import Dashboard from '@/layouts/Dashboard'
 import Ptab from '@/components/Ptab'
 import Ppm from '@/components/Ppm'
 import Vmodal from '@/components/Vmodal'
 import Vform from '@/components/Vform'
 import Multiselect from 'vue-multiselect'
 import { mapGetters, mapMutations, mapActions } from "vuex";
 import PtabService from "@/services/modules/pta.service.js";

export default {
  components: {
    Ptab,
    Ppm,
    Dashboard,
    Vmodal,
    Vform,
    Multiselect,
    Vmodal
  },
  data() {
    return {
      seePta:true,
      seePpm:false,
      openFiltre:false,
      showModal:false,
      reviser:false,
      champsExport:[
        {name:'Date de debut',type:'text',placeholdere:"Selectionnez un indicateur",isSelect:true,isTextArea:false,data:'',required:true,options:['indicateur1','indicateur2','indicateurs3']},
        {name:'Date de Fin',type:'year',placeholdere:"l'année de base",isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Trimestre',type:'',placeholdere:"Selectionnez le trimestre",isSelect:true,isTextArea:false,data:'',required:true,options:[1,2,3,4]},
        {name:'Bailleurs',type:'',placeholdere:"Selectionnez le bailleur",isSelect:true,isTextArea:false,data:'',required:true,options:['BM','BOA']},
      ],
      isClick:true,
      ptaVisible:false,
      ppmVisible:false,
      cols:2,
      currentRole:'',
      revisionAdd:false,
      revisionVisible:false,
      ptaVisible:false,
      filtrePta:false,
      filtrePpm:false,
      filtreRePta:false,
      filtreRePpm:false,
      planDecaissementPtaVisible:false,
      ppmVisible:false,
      exporterSuiviPpm:false,
      exporterSuiviPta:false,
      exporterSuiviRePpm:false,
      exporterSuiviRePta:false,
    }      
  },
   computed: {
    ...mapGetters('auths', {currentUser : 'GET_AUTHENTICATE_USER'})
  },

  methods: {
    
    exportAsExcel () {
      this.showModal = true
    },
    goPta() {
      this.seePta = true
      this.seePpm = false
    },
    goPpm() {
      this.seePta = false
      this.seePpm = true
    },
    getPermission() {
      this.currentUser.role[0].permissions.forEach(element => {
        if(element.slug ==='exporter-un-suivi-ppm') {
          this.exporterSuiviPpm = true
        }
       if(element.slug === 'exporter-un-suivi-ptab') {
        this.exporterSuiviPta = true
      }
      if(element.slug === 'exporter-un-suivi-ppm') {
        this.exporterSuiviRePpm = true
      }
      if(element.slug ==='exporter-un-suivi-pta') {
        this.exporterSuiviRePta = true
      }
      if(element.slug ==='voir-revision-ptab') {
        this.planDecaissementPtaVisible= true
      }
      if(element.slug ==='exporter-un-suivi-financier') {
        this.exporterSuiviFinance = true
      }
      if(element.slug ==='voir-ptab') {
        this.ptaVisible = true
      }
      if(element.slug ==='voir-ppm') {
        this.ppmVisible = true
      }
      if(element.slug ==='voir-revision-ptab') {
        this.revisionVisible = true
      }
      if(element.slug ==='faire-revision-ptab') {
        this.revisionAdd = true
      }
      if(element.slug ==='voir-ptab') {
        this.filtrePta = true
      }
      if(element.slug ==='voir-ppm') {
        this.filtrePpm = true
      }
      if(element.slug ==='voir-ptab') {
        this.filtreRePta = true
      }
      if(element.slug ==='voir-ppm') {
        this.filtreRePpm = true
      }

           
    });

    },

    reviserPta() {
      this.isClick = false
     const  data={
        programmeId:this.currentUser.programme.id
      }
      PtabService.reviser(data).then(() => {
            this.$toast.success("Revision effectué avec success")
            this.reviser = false
            this.isClick = true
        }).catch((e) => {
        this.$toast.error(e)
          this.reviser = false
           this.isClick = true
      })
    },
   
     
  },
  mounted() {
 
    this.getPermission()
    if(!this.ptaVisible || !this.ppmVisible) {
      this.$router.push('/401-non-autorise')
    } 
     if(this.currentUser != undefined) {
       this.currentRole = this.currentUser.type
        console.log("role courant",this.currentUser)
     }
  }
}
</script>

<style scoped>

input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>