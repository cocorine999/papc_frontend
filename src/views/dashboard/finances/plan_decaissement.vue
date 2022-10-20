<template>
  <dashboard>
    <div  class="p-4">
      <div>
          <ol class="inline-flex p-0 list-none">
            <li class="flex items-center text-blue-500">
              <router-link to="/dashboard" class="text-gray-600">dashboard</router-link>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
            </li>
            <li class="flex items-center text-blue-500">
              <router-link to="/dasboard/projet" class="">Plan de décaissement</router-link>
            </li>
          </ol>
      </div>

      <div class="flex items-center justify-between my-2" >
        <div>
          <span data-v-7b9b4c0e="" class="inline-block cursor-pointer border-primary border-b-8 text-base uppercase font-bold   py-2">Plan de décaissement </span>
        </div> 
      </div>

      <div v-if="planDecaissementVisible" class="relative my-4  sm:rounded-lg">
        <planDecaissement></planDecaissement>
      </div>
    </div>
  </dashboard>
  
</template>

<script>
import SearchBar from '@/components/SearchBar'
import Titre from '@/components/Titre'
import Ptab from '@/components/Ptab'
import PlanDecaissement from '@/components/PlanDecaissement'
import Vtable from '@/components/Vtable'
import Vform from '@/components/Vform'
import Vmodal from '@/components/Vmodal'
import Dashboard from '@/layouts/Dashboard'
import { mapGetters } from "vuex";
export default {
  components: {
    Vtable,
    Dashboard,
    Vmodal,
    Vform,
    Titre,
    SearchBar,
    Ptab,
    PlanDecaissement
  },
  data() {
    return {
      seePta:true,
      seePpm:false,
      openFiltre:false,
      showModal:false,
      champsExport:[
        {name:'Date de debut',type:'text',placeholdere:"Selectionnez un indicateur",isSelect:true,isTextArea:false,data:'',required:true,options:['indicateur1','indicateur2','indicateurs3']},
        {name:'Date de Fin',type:'year',placeholdere:"l'année de base",isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Trimestre',type:'',placeholdere:"Selectionnez le trimestre",isSelect:true,isTextArea:false,data:'',required:true,options:[1,2,3,4]},
        {name:'Bailleurs',type:'',placeholdere:"Selectionnez le bailleur",isSelect:true,isTextArea:false,data:'',required:true,options:['BM','BOA']},
      ],
      cols:2,
      planDecaissementVisible:false,
      planDecaissementUpdate:false,
      planDecaissementDelete:false,
      planDecaissementAdd:false,
      exporterDecaissement:false,
    }      
  },
  computed: {
    ...mapGetters('auths', {currentUser : 'GET_AUTHENTICATE_USER'})
  },
  methods: {
    exportAsExcel () {
      this.showModal = true
    },
    getPermission() {
          this.currentUser.role[0].permissions.forEach(element => {
            if(element.slug ==='voir-un-plan-de-decaissement') {
              this.planDecaissementVisible = true
            }
            if(element.slug === 'creer-un-plan-de-decaissement') {
              this.planplanDecaissementAdd = true
            }
            if(element.slug === 'modifier-un-plan-de-decaissement') {
              this.decaissementUpdate = true
            }
            if(element.slug ==='supprimer-un-plan-de-decaissement') {
              this.planDecaissementDelete = true
            }
            if(element.slug ==='exporter-un-plan-decaissement') {
              this.exporterDecaissement = true
            }
           
          });

    },
  },
  
  mounted() {
      this.getPermission()
       if(!this.planDecaissementVisible) {
        this.$router.push('/401-non-autorise')
      } 
    }
}
</script>

<style scoped>

</style>