<template>
  <div class="p-4">
    <nav class="mb-2 text-sm font-semibold flex justify-between items-center " aria-label="Breadcrumb">
      <div>
        <ol class="inline-flex p-0 list-none">
          <li class="flex items-center text-blue-500">
            <nuxt-link to="" class="text-gray-600">dashboard</nuxt-link>
            <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
          </li>
          <li class="flex items-center ">
            <nuxt-link to="" class="text-gray-600">unite de gestion</nuxt-link>
          </li>
        </ol>
      </div>
      <div>
        <search-bar ></search-bar>
      </div>
    </nav> 
    <div v-if="showModal">
      <vmodal :title="title" v-on:close="close">
       <div style="width:60vw" class="px-4">
         <div v-if="title =='Ajouter une unité de gestion'">
            <vform template="default" :champs="champs" :cols="cols" submitText="Enregistrer" @sendForm="sendForm" ></vform>
         </div>
         <div v-if="title =='Modifier une unité de gestion'">
            <vform template="default" :champs="champs" :cols="cols" submitText="Modifier" @sendForm="sendForm" ></vform>
         </div>
        
       </div>
      </vmodal>
    </div>
    <div class="flex items-center justify-between">
      <titre>Unites de gestions </titre>
        <button @click="addUnite" title="ajouter " class="p-2 overflow-hidden text-xs font-semibold text-white uppercase rounded bg-primary focus:outline-none focus:shadow-outline">
          <span class="mx-2 text-sm font-semibold">ajouter</span>
        </button>
    </div>
    <vtable :headers="headers" :datas="dataTable" :actions="actions" @supprimer="supprimer" @modifier="modifier"></vtable>
    
  </div>
</template>

<script>
  export default {
    layout: "dashboard",
    data() {
        return {
          showModal:false,
          title:'',
          champs:[
          {name:'Nom',type:'text',placeholdere:"Nom de  l'unité de gestion",isSelect:false,isTextArea:false,data:'',required:true,},
          {name:'Email',type:'email',placeholdere:"Votre Email",isSelect:false,isTextArea:false,data:'',required:true,},
          {name:'Contact',type:'',placeholdere:'Votre contact',isSelect:false,isTextArea:false,data:'',required:true,},
          {name:'Programme',type:'',placeholdere:'Choisir un programme',isSelect:true,isTextArea:false,data:'',options:['pool papc','gouvernement'],required:true,},
        ],
        cols:1,
          
        headers:[
          {name:'Nom',props:'firstName'},
          {name:'Prenoms',props:'lastName'},
          {name:'Email',props:'email'},
          {name:'Contact',props:'contact',cle:'tel'},
          {name:'Date de creation',props:'created_at'},
        ],
        dataTable:[
          {firstName:'Gomez ',lastName:'Jacob',email:"jacobgomez@gmail.com",contact:{tel:"96001200"},created_at:"22-06-2022"},
          {firstName:'Gomez ',lastName:'Jacob',email:"jacobgomez@gmail.com",contact:{tel:"96001200"},created_at:"22-06-2022"},
          {firstName:'Gomez ',lastName:'Jacob',email:"jacobgomez@gmail.com",contact:{tel:"96001200"},created_at:"22-06-2022"},
          {firstName:'Gomez ',lastName:'Jacob',email:"jacobgomez@gmail.com",contact:{tel:"96001200"},created_at:"22-06-2022"},
          {firstName:'Gomez ',lastName:'Jacob',email:"jacobgomez@gmail.com",contact:{tel:"96001200"},created_at:"22-06-2022"},
          {firstName:'Gomez ',lastName:'Jacob',email:"jacobgomez@gmail.com",contact:{tel:"96001200"},created_at:"22-06-2022"},
          {firstName:'Gomez ',lastName:'Jacob',email:"jacobgomez@gmail.com",contact:{tel:"96001200"},created_at:"22-06-2022"},
          {firstName:'Gomez ',lastName:'Jacob',email:"jacobgomez@gmail.com",contact:{tel:"96001200"},created_at:"22-06-2022"},
          {firstName:'Gomez ',lastName:'Jacob',email:"jacobgomez@gmail.com",contact:{tel:"96001200"},created_at:"22-06-2022"},
          
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
      addUnite() {
        this.title ="Ajouter une unité de gestion"
        this.showModal = true
      },
      modifier(data) {
        this.title ="Modifier une unité de gestion"
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