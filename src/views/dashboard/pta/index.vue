<template>
  <dashboard>
  <div class="px-4">
    <div v-if="reviser">
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

    <div class="mt-4">
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

    <div class="flex items-center justify-between my-2">
      <div class="flex space-x-4">
        <span @click="goPta" v-if="ptaVisible" :class="{'border-primary border-b-8':seePta}" class="inline-block cursor-pointer  text-lg uppercase font-bold    py-2">Le pta </span>
        <span @click="goPpm" v-if="ppmVisible" :class="{'border-primary border-b-8':seePpm}" class="inline-block cursor-pointer  text-lg uppercase font-bold   py-2">Le PPM </span>
      </div> 
      <div>
        <div v-if="seePta" class="flex space-x-4 items-center">
          <button @click="reviser = true" title="reviser pta"   class="py-2 px-4 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase  bg-red-500 focus:outline-none focus:shadow-outline">
            <span class="mx-2 text-sm font-semibold"> reviser ptab </span>
          </button>
          <button @click="openFiltre = !openFiltre"  title="filtrer les données"   class="py-2 px-4 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
           <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24m0 24H0"></path><path d="M4.25 5.61C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39A.998.998 0 0018.95 4H5.04c-.83 0-1.3.95-.79 1.61z"></path><path fill="none" d="M0 0h24v24H0V0z"></path></svg>
            <span class="mx-2 text-sm font-semibold">Filtre</span>
          </button>
          <button v-if="seePta" @click="exportAsExcel" title="exporter en excel"   class="py-2 px-4 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase bg-primary focus:outline-none focus:shadow-outline">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path d="M11 16h2V7h3l-4-5-4 5h3z"></path><path d="M5 22h14c1.103 0 2-.897 2-2v-9c0-1.103-.897-2-2-2h-4v2h4v9H5v-9h4V9H5c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2z"></path></svg>
            <span class="mx-2 text-sm font-semibold">Export Excel</span>
          </button>
        </div>
        <div  v-if="seePpm" class="flex space-x-4 items-center">
          <button @click="filtre" title="filtrer les données"   class="py-2 px-4 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase bg-primary focus:outline-none focus:shadow-outline">
           <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24m0 24H0"></path><path d="M4.25 5.61C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39A.998.998 0 0018.95 4H5.04c-.83 0-1.3.95-.79 1.61z"></path><path fill="none" d="M0 0h24v24H0V0z"></path></svg>
            <span class="mx-2 text-sm font-semibold">Filtre</span>
          </button>
          <button  @click="exportAsExcel" title="exporter en excel"   class="py-2 px-4 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase bg-primary focus:outline-none focus:shadow-outline">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path d="M11 16h2V7h3l-4-5-4 5h3z"></path><path d="M5 22h14c1.103 0 2-.897 2-2v-9c0-1.103-.897-2-2-2h-4v2h4v9H5v-9h4V9H5c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2z"></path></svg>
            <span class="mx-2 text-sm font-semibold">Export Excel</span>
          </button>
        </div>
        
      </div>
    </div>

    <div v-if="openFiltre" class="bg-primary text-white rounded-2xl space-x-4 p-3 shadow flex justify-between my-4 ">
      <div class="flex items-center w-full  overflow-x-auto">
        <div class="flex justify-between items-center">
          <label class="font-semibold text-sm px-2 w-full">Bailleurs</label>
          <select class="bg-gray-100 border border-gray-100 py-1 px-2 rounded-2xl outline-none text-xs">
            <option disabled>BM</option>
            <option disabled>BOM</option>
          </select>
        </div>
        <div class="flex items-center">
          <label class="font-semibold text-sm px-2 w-full ">Date debut</label>
          <input type="date" class="bg-gray-100 border w-full border-gray-100 py-1 px-2 rounded-2xl outline-none text-xs" />
        </div>
         
        <div class="flex items-center">
          <label class="font-semibold text-sm px-2 w-full">Date Fin</label>
          <input type="date" class="bg-gray-100 w-full border border-gray-100 py-1 px-2 rounded-2xl outline-none text-xs" />
        </div>
        <div class="flex items-center">
          <label class="font-semibold text-sm px-2 w-full">Annee</label>
          <input type="date" class="bg-gray-100 w-full border border-gray-100 py-1 px-2 rounded-2xl outline-none text-xs" />
        </div>
      </div>

      <div class="flex items-center">
        <button type="submit" class="bg-blue-500 border border-blue-500 py-1 px-2 rounded-2xl outline-none text-xs" >Rechercher </button>
      </div>
    </div>
    
    <div v-if="seePta && ptaVisible" class="relative my-4  sm:rounded-lg">
      <ptab></ptab>
    </div>
    <div v-if="seePpm && ppmVisible " class="relative my-4  sm:rounded-lg">
      <ptab></ptab>
    </div>
  </div>
  </dashboard>
  
</template>

<script>

 import Dashboard from '@/layouts/Dashboard'
 import Ptab from '@/components/Ptab'
 import Vmodal from '@/components/Vmodal'
 import Vform from '@/components/Vform'
 import { mapGetters, mapMutations, mapActions } from "vuex";
 import PtabService from "@/services/modules/pta.service.js";
export default {
  components: {
    Ptab,
    Dashboard,
    Vmodal,
    Vform,
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
      if(element.slug ==='voir ptab') {
        this.ptaVisible = true
      }
      if(element.slug === 'voir ppm') {
        this.ppmVisible = true
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
  }
}
</script>

<style scoped>

</style>