<template>
  <dashboard>
    <vmodal v-if="showLink" @close="showLink=false">
      <div class="m-2 p-2 bg-white shadow" style="width:60vw">
        <p class="p-2 bg-gray-300 border text-gray-700 font-semibold text-sm border-gray-600 text-center rounded-md">
          <a  title="cliquez ici" target="_blank" href="/form"> cliquer ici</a>
        </p>
      </div>
    </vmodal>
    <div v-if="showModal">
      <modal-top-right :title="title"  v-on:close="showModal = false">
        <div  class="px-4 overflow-y-auto">
          <vform template="default"  :champs="champs" :cols="cols" submitText="Creer un MOD" @sendForm="sendForm" ></vform>
        </div>
      </modal-top-right>
    </div>
  <div class="p-4">
    <nav class="mb-2 text-sm font-semibold  " aria-label="Breadcrumb">
      <div>
        <ol class="inline-flex p-0 list-none">
          <li class="flex items-center ">
            <router-link to="/dashboard" class="text-gray-600">dashboard</router-link>
            <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
          </li>

          <li class="flex items-center text-blue-500 ">
            <router-link to="" class="">Checklist</router-link>
          </li>
        </ol>
      </div> 
    </nav>
    <div class="flex items-center justify-between my-4">
      <div class="flex space-x-4">
        <span @click="goChecklist" :class="{'border-primary border-b-8':seeChecklist}" class="inline-block cursor-pointer text-lg utext-lg uppercase font-bold   py-2">Checklist </span>
        <span @click="goActivite" :class="{'border-primary border-b-8':seeActivite}" class="inline-block cursor-pointer  text-lg uppercase font-bold   py-2">Activité </span>
      </div>
      <router-link v-if="seeChecklist" to="/dashboard/mod/checklist/create"  title="ajouter une checklist"  class="py-2 px-4 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase bg-primary focus:outline-none focus:shadow-outline">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
        <span class="mx-2 text-sm font-semibold">Creer une checklist </span>
      </router-link>
      <button @click="addActivite" v-else to="/dashboard/checklist/create"  title="ajouter une checklist"  class="py-2 px-4 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase bg-primary focus:outline-none focus:shadow-outline">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
        <span class="mx-2 text-sm font-semibold">Creer une activité </span>
      </button>
    </div>
    <div v-if="seeChecklist" class="grid grid-cols-3 gap-4">
      <div v-for="i in 6" :key="i.id">
        <card-checklist
          libelle="checklist"
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
    <div v-else class="my-4">
      <vtable :headers="headers" :datas="dataTable" :actions="actions" @supprimer="supprimerActivte" ></vtable>    
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
          {name:'Libelle activite',props:'libelle'},
          {name:'Date debut',props:'debut'},
          {name:'Date fin',props:'fin'},
          {name:'Date de creation',props:'created_at'},
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
      this.$router.push({name:'unite_de_gestion_checklist_details',params:{id:id}})
    },
    addActivite() {
      this.title = 'Creer une activité'
      this.showModal = true
    },
    goActivite() {
      this.seeActivite = true
      this.seeChecklist = false
    },
    goChecklist() {
      this.seeActivite = false
      this.seeChecklist = true
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