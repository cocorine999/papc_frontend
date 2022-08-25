<template>
  <dashboard>
    <vmodal v-if="showLink" @close="showLink=false">
      <div class="m-2 p-2 bg-white shadow flex justify-center " style="width:60vw">
        <router-link title="cliquez ici"  target="_blank" :to="{name:'form_gestion_generator',params:{id:2}}" class="p-2 bg-gray-300 border cursor-pointer text-gray-700 font-semibold text-sm border-gray-600 text-center rounded-md">
          cliquer ici
        </router-link>
      </div>
    </vmodal>
    <div v-if="showModal">
      <modal-top-right :title="title"  v-on:close="showModal = false">
        <div  class="px-4 overflow-y-auto">
          <vform template="default"  :champs="champs" :cols="cols" submitText="Creer un MOD" @sendForm="sendForm" ></vform>
        </div>
      </modal-top-right>
    </div>
  <div class="px-4">
    <nav class="mb-2 text-sm font-semibold  " aria-label="Breadcrumb">
      <div>
        <ol class="inline-flex p-0 list-none">
          <li class="flex items-center ">
            <router-link to="/dashboard" class="text-gray-600">dashboard</router-link>
            <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
          </li>
          <li class="flex items-center text-blue-500 ">
            <router-link to="" class="">Formulaire</router-link>
          </li>
        </ol>
      </div> 
    </nav>
    <div class="flex items-center justify-between my-4">
      <div class="flex space-x-4">
        <span class="inline-block cursor-pointer border-primary border-b-8 text-lg utext-lg uppercase font-bold   py-2">Suivi formulaire </span>
      </div>
      
    </div>
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
          @gotoDetails="gotoDetails(i)"
          @onlink="getlink(i)"
          > </card-checklist>
      </div>
    </div>
    
  </div>
  </dashboard>
</template>

<script>
  import Dashboard from '@/layouts/Dashboard'
  import CardChecklist from '@/components/CardChecklist'
  import Vtable from '@/components/Vtable'
  import Vform from '@/components/Vform'
  import ModalTopRight from '@/components/ModalTopRight'
  import Vmodal from '@/components/Vmodal'
export default {
  components: {
    CardChecklist,
    Dashboard,
    Vtable,
    Vform,
    ModalTopRight,
    Vmodal
  },
  data() {
    return {
      seeChecklist:true,
      seeActivite:false,
      showModal:false,
      showLink:false,
      champs:[],
      headers:[
          {name:'Libelle activite',cle:'libelle'},
          {name:'Date debut',cle:'debut'},
          {name:'Date fin',cle:'fin'},
          {name:'Date de creation',cle:'created_at'},
        ],
        dataTable:[
          {libelle:'preparer et faire valider par le MO et le MOD un PGESC',code:"DD555F",programme:'POOL PAPC',debut:'31-01-2020',fin:"23-0-2022",created_at:"22-06-2022"},
          {libelle:'preparer et faire valider par le MO et le MOD un PAE',code:"DD555F",programme:'POOL PAPC',debut:'31-01-2020',fin:"23-0-2022",created_at:"22-06-2022"},
          {libelle:'preparer et faire valider par le MO et le MOD un PPGED',code:"DD555F",programme:'POOL PAPC',debut:'31-01-2020',fin:"23-0-2022",created_at:"22-06-2022"},
          {libelle:'preparer et faire valider par le MO et le MOD un PPSPS',code:"DD555F",programme:'POOL PAPC',debut:'31-01-2020',fin:"23-0-2022",created_at:"22-06-2022"},
        ],
        actions:[
          {name:'modifier',iconne:''},
          {name:'supprimer',iconne:''},
        ],
    }
  },
  methods: {
    getlink(i){
      this.showLink = true
    },
    gotoDetails(id) {
      this.$router.push({name:'entreprise_checklist_details',params:{idC:id}})
    },
    
    modifier(data) {
      alert(data+ " à ete bien modifier")
    },
    supprimer(data) {
      alert(data+ " à ete bien supprimer")
    },
    supprimerActivte(data) {
      alert(data+ " à ete bien supprimer")
    },
    selectData ({ name}) {
      return `${name}`
    },
  },
  mounted() {
    const programme = [{name:'papc'},{name:'pool'},{name:'demo'}]
    this.champs = [
      {name:'Nom activité',type:'text',placeholdere:"libelle activité",isSelect:false,isTextArea:false,data:'',required:true,},
      {name:'Code activité',type:'text',placeholdere:"code activité",isSelect:false,isTextArea:false,data:'',required:true,},
      {name:'Programme',type:'',placeholdere:'Choisir un programme',isSelect:true,isTextArea:false,data:'',options:programme,required:true,methode:this.selectData},
      {name:'Date debut',type:'date',placeholdere:"Date debut",isSelect:false,isTextArea:false,data:'',required:true,},
      {name:'Date fin',type:'date',placeholdere:"Date fin",isSelect:false,isTextArea:false,data:'',required:true,},
    ]
  }
}
</script>

<style>

</style>