<template>
  <dashboard>
    
  <div class="px-4">
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
        <span  class="inline-block cursor-pointer text-lg utext-lg uppercase font-bold  border-primary border-b-8 py-2">Checklist </span>
      </div>
      <button v-if="seeChecklist" @click="goForm" title="Voir le formulaire" class="bg-blue-500 text-white px-3 py-1 text-center">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="1.3em" height="1.3em" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
      </button>

      <button v-else @click="goChecklist" title="cacher le formulaire" class="bg-blue-500 text-white px-3 py-1 text-center">
       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="1.3em" height="1.3em" stroke-linecap="round" stroke-linejoin="round" class="icon icon-eye-off"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" x2="23" y1="1" y2="23"></line></svg>
      </button>
      
    </div>
    <!--En tete de la checklist-->
    <div v-if="seeChecklist" >
      <div class="mt-4 mb-6">
        <div class="py-2 font-semibold">Date de collecte : <span class="font-bold px-2">16-07-2022</span> </div>
        <input type="date" class="px-2 py-1 border border-gray-700">

      </div>
      <div class="grid grid-cols-4 w-3/4 mb-4">
        <div class="">
          <ul>
            <li class="text-base font-bold py-2">Entreprise</li>
            <li class="text-base font-bold py-2">Enquité</li>
            <li class="text-base font-bold py-2">Post enquité</li>
            <li class="text-base font-bold py-2">Contact enquité</li>
          </ul>
        </div>
        <div>
          <ul>
            <li class="text-base  py-2">: indefinit</li>
            <li class="text-base  py-2">: indefinit</li>
            <li class="text-base  py-2">: indefinit</li>
            <li class="text-base  py-2">: indefinit</li>
          </ul>
        </div>
        <div>
          <ul>
            <li class="text-base font-bold py-2">Bailleur</li>
            <li class="text-base font-bold py-2">Site</li>
            <li class="text-base font-bold py-2">Missionaire</li>
            <li class="text-base font-bold py-2">Numero</li>
          </ul>
        </div>
        <div>
          <ul>
            <li class="text-base  py-2">: indefinit</li>
            <li class="text-base  py-2">: indefinit</li>
            <li class="text-base  py-2">: indefinit</li>
            <li class="text-base  py-2">: indefinit</li>
          </ul>
        </div>
      </div>
       <!-- fin En tete de la checklist-->
      <div class=" overflow-x-auto">
        <table class="min-w-full">
          <thead class="border-b bg-gray-300">
            <tr>
              <th  scope="col" class="text-sm whitespace-nowrap font-medium text-gray-900 px-6 py-4 text-left"> Activité </th>
              <th  scope="col" class="text-sm whitespace-nowrap font-medium text-gray-900 px-6 py-4 text-left"> Status </th>
  
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Justification</th>
            </tr>
          </thead>
          
          <tbody>
            <tr  class="border-b border-gray-300" v-for="(activite ,index) in checklists" :key="index">
                
                <td  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <span class="font-bold">{{activite.activite}}</span>
                  <tr class="" v-for="(data ,indexe) in activite.data" :key="indexe">
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                     <span class="font-bold">-</span> {{data.label}}
                    </td>
                  </tr>
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                 <tr class="" v-for="(data ,indexe) in activite.data" :key="indexe">
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                     vide
                    </td>
                  </tr>
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <tr class="" v-for="(data ,indexe) in activite.data" :key="indexe">
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      vide
                    </td>
                  </tr>
                </td>
                
                
            </tr>              
          </tbody>
        </table>
      </div>
    </div>
    <div v-else class="my-4">
       <form action="">
        <div class="flex justify-center ">
          <div class="w-3/4">
            <div v-for="checklist in checklists" :key="checklist.id" class=" border border-dashed border-gray-400 p-6">
            <h1 class="text-lg font-semibold uppercase text-center py-2">{{checklist.activite}}</h1>
            <div v-for="form in checklist.data" :key="form.id">
              <div v-if="form.type=='edit'">
                  <label   class=" block py-2 text-sm font-semibold " for="">
                    {{form.label}} <span  class="px-2 text-lg font-black text-red-700">*</span>
                  </label>
                  <input  type="text"   class="px-4 py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent"  />
              </div>
              <div v-if="form.type=='photos'">
                <label   class=" block py-2 text-sm font-semibold " for="">
                  {{form.label}} <span  class="px-2 text-lg font-black text-red-700">*</span>
                </label>
                <input  type="file" accept="png,jpg"   class="px-4 py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent"  />
              </div>
              <div v-if="form.type=='boolean'">
                <label for="name" class="my-4 block text-xl font-medium text-gray-700">{{form.label}}</label>
                <div class="flex items-center my-4">
                  <label for="vrai" class="px-4 block text-sm uppercase font-medium text-gray-700">
                    <input id="vrai" name="verite" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-primary border-gray-300"/>
                    vrai
                  </label>
                  <label for="faux" class="px-4 block text-sm uppercase font-medium text-gray-700">
                    <input id="faux" name="verite" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-primary border-gray-300"/>
                    faux
                  </label>
                </div>
              </div>
              <div class="" v-if="form.type=='multiple'">
                <label for="name" class="my-4 block text-xl font-medium text-gray-700">{{form.label}}</label>
                <label v-for="answers in Answers" :key="answers.id" class="px-4  text-sm uppercase font-medium text-gray-700">
                  <input  name="multiple" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-primary border-gray-300"/>
                  {{answers.label}} /
                </label>
              </div>
            </div>
            </div>
          </div>
        </div>
        <div class="py-2 my-2 flex justify-center space-x-8">
          <vbutton  type="submit" template="success">Enregistrer </vbutton>
          
        </div>
      </form>
    </div>
  </div>
  </dashboard>
</template>

<script>
  import Dashboard from '@/layouts/Dashboard'
  import CardChecklist from '@/components/CardChecklist'
  import Vtable from '@/components/Vtable'
  import Vform from '@/components/Vform'
  import Vbutton from '@/components/Vbutton'
export default {
  components: {
    CardChecklist,
    Dashboard,
    Vtable,
    Vform,
    Vbutton,
   
  },
  data() {
    return {
      seeChecklist:true,
      seeForm:false,
      showModal:false,
      champs:[],
      headers:[
          {name:'Libelle activite',props:'libelle'},
          {name:'Code activite',props:'code'},
          {name:'Programme',props:'programme'},
          {name:'Date debut',props:'debut'},
          {name:'Date fin',props:'fin'},
          {name:'Date de creation',props:'created_at'},
        ],
        checklists:[
          {
            "activite": "Preparer et faire valider par le Mo et MOD un PGESC",
            "data": [
              {
                "type": "edit",
                "label": "Date de validation",
                "content": null
              },
              {
                "type": "edit",
                "label": "Plaquette validée et/ou notification de la validation",
                "content": null
              }
            ]
          },
          {
            "activite": "Preparer et faire valider par le Mo et MOD un PAE",
            "data": [
              {
                "type": "edit",
                "label": "Date de validation",
                "content": null
              },
              {
                "type": "edit",
                "label": "PAE approuvé",
                "content": null
              }
            ]
          },
          {
            "activite": "Preparer et faire valider par le Mo et MOD un PPGED",
            "data": [
              {
                "type": "edit",
                "label": "Date de validation",
                "content": null
              },
              {
                "type": "edit",
                "label": "PPGED approuvé",
                "content": null
              }
            ]
          },
          {
            "activite": "Preparer et faire valider par le Mo et MOD un PPSPS",
            "data": [
              {
                "type": "edit",
                "label": "Date de validation",
                "content": null
              },
              {
                "type": "edit",
                "label": "PPSPS approuvé",
                "content": null
              }
            ]
          },
        ],
        actions:[
          {name:'modifier',iconne:''},
          {name:'supprimer',iconne:''},
        ],
    }
  },
  methods: {
    addActivite() {
      this.title = 'Creer une activité'
      this.showModal = true
    },
    goForm() {
      this.seeForm = true
      this.seeChecklist = false
    },
    goChecklist() {
      this.seeForm = false
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