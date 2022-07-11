<template>
  <dashboard>
    <div class="w-full p-4">
      <div v-if="showModal">
        <modal-top-right  :title="title"  v-on:close="closeModal">
          <div style="width:60vw" class="px-4">
            <div v-if="title =='Modifier un bailleur'">
              <vform template="default" :champs="champs" :cols="cols" submitText="Modifier" @sendForm="sendForm" ></vform>
            </div>
            <div v-if="title =='Ajouter un nouveau bailleur'">
              <vform template="default" :champs="champs" :cols="cols" submitText="Ajouter" @sendForm="sendForm" ></vform>
            </div>
            <div v-if="title =='Dupliquer un bailleur'">
              <vform template="default" :champs="champs" :cols="cols" submitText="Creer à partir de " @sendForm="sendForm" ></vform>
            </div>
          
          </div>
        </modal-top-right>
      </div>
      <nav class="mb-2 text-sm font-semibold flex justify-between items-center " aria-label="Breadcrumb">
        <div>
          <ol class="inline-flex p-0 list-none">
            <li class="flex items-center text-blue-500">
              <router-link to="" class="text-gray-600">dashboard</router-link>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
            </li>
            <li class="flex items-center ">
              <router-link to="" class="text-gray-600">bailleurs</router-link>
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
      <div class="flex items-center justify-between my-2">
        <titre>Les bailleurs </titre>
          <button @click="addBailleur" title="ajouter un bailleur"   class="p-2 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase rounded bg-primary focus:outline-none focus:shadow-outline">
            <span><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM17 11h-4v4h-2v-4H7V9h4V5h2v4h4v2z"></path></svg></span>
            <span class="mx-2 text-sm font-semibold">ajouter</span>
          </button>
      </div>
      <div v-if="mosaique" class="grid grid-cols-1 my-4 lg:grid-cols-3 md:grid-cols-2 sm:gap-5">
        <div v-for="i in 6" :key="i.id">
          <card-bailleur 
            sigle="BM"
            libelle="Banque Mondiale" 
            description="Lorem ipsum dolor sit" 
            codePTA="1.3.3.2.1" 
            pays="Benin" 
            @supprimerBailleur="supprimer(5)"
            @modifierBailleur="modifier(5)"
            @dupliquerBailleur="dupliquer(5)"
          ></card-bailleur>
        </div>
      </div>
      <div v-if="line"  class="line my-4">
        <vtable 
        :headers="headers" 
        :datas="dataTable"
        :actions="actions" 
        @supprimer="supprimer" 
        @modifier="modifier"></vtable>
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
export default {
  modules: ['@nuxtjs/axios'],
  computed: {
    ...mapState(['baseURL'])
  },
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
      line:false,
      mosaique:true,
      title: '',
      headers:[
        {name:'Bailleurs',props:'bailleur'},
        {name:'Sigle',props:'sigle'},
        {name:'Code PTA',props:'code'},
        {name:'Date creation',props:'created_at'},
      ],
      dataTable:[
        {bailleur:'Banque Mondiale ',sigle:'BM',code:"DFSDFDS525",created_at:"22-06-2022"},
        {bailleur:'Banque Mondiale ',sigle:'BM',code:"DFSDFDS525",created_at:"22-06-2022"},
        {bailleur:'Banque Mondiale ',sigle:'BM',code:"DFSDFDS525",created_at:"22-06-2022"},
        
          
      ],
      actions:[
        {name:'modifier',iconne:''},
        {name:'supprimer',iconne:''},
      ],
      champs:[
        {name:'Nom',type:'text',placeholdere:"Nom du bailleur",isSelect:false,isTextArea:false,data:'',required:true,},
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
  mounted() {
    this.token  = localStorage.getItem("token");
    this.$axios.setBaseURL(this.baseURL);
    this.$axios.setToken(this.token, 'Bearer');
    
    this.getusers().then((response)=>{
      //console.log(response);
      this.list = response.data;
    })
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
    addBailleur() {
      this.title='Ajouter un nouveau bailleur'
      this.showModal = true
    },
    sendForm() {
      alert('donnée envoyer')
    },
    
    modifier(data) {
      this.title='Modifier un bailleur'
      this.showModal = true
    },

    sender(){
      let data = {};

      for (let i = 0; i < this.form.length; i++) {
        data[this.form[i].label] = this.form[i].label === 'code' ? ""+this.form[i].value+"": this.form[i].value;
      }
      //console.log(data);
      switch (this.key) {
        case 'put':
          this.putuser(data.id, data).then((response)=>{
            console.log(response);
          });
          break;

        case 'delete':
          this.deleteuser(data.id).then((response)=>{
            console.log(response);
          });
          break;
      
        default:
          this.postuser(data).then((response)=>{
            console.log(response);
          });
          break;
      }
      this.getusers().then((response)=>{
        //console.log(response);
        this.list = response.data;
        this.key = '';
        this.close();
      })

    },
    initform(){
      for (let i = 0; i < this.form.length; i++) {
        this.form[i].value =  null;
      }
    },
    editer(data){
      this.title='Modifier un bailleur'
      for (let i = 0; i < this.form.length; i++) {
        this.form[i].value =  data[this.form[i].label];
      }
      this.form = this.form.concat({ label: "id", type: "hidden", value: data.id });
      let tab = [];
      data.roles.forEach(element => {
        tab = tab.concat(element.id)
      });
      this.form = this.form.concat({ label: "roles", type: "hidden", value: tab })
      this.showModal = true;
      this.key = 'put';
    },
    deleter(data){
      this.key = 'delete';
      for (let i = 0; i < this.form.length; i++) {
        this.form[i].value =  data[this.form[i].label];
      }
      this.form = this.form.concat({ label: "id", type: "hidden", value: data.id });
      this.sender()
    },
    close() {
      this.initform();
      this.showModal = false
    },
    async postuser(data) {
      return await this.$axios.$post('/api/utilisateurs/creation-de-compte-bailleur', data)
    },
    async getusers() {
      return await this.$axios.$get('/api/utilisateurs/bailleurs')
    },

    async putuser(id, data) {
      return await this.$axios.$put('/api/utilisateurs/mis-à-jour-de-compte-bailleur/'+id, data)
    },

    async deleteuser(id) {
      return await this.$axios.$delete('/api/utilisateurs/'+id)
    },
    
    supprimer(data) {
      alert(data +" à ete bien supprimer")
    },
    dupliquer(data) {
      this.showModal = true
      this.title='Dupliquer un bailleur'
      alert(data +" à ete bien dupliquer")
    },
   
  }
}
</script>

<style>

</style>