<template>
  <div class="p-4">
   
    <RouteName title="utilisateurs" />
    <div v-if="showModal">
      <modal-top-right :title="key === '' ? 'Ajouter un utilisateur' : 'Modifier un utilisateur'" v-on:close="close">
        <FormComponent :form="form" @send="sender" />
      </modal-top-right>
    </div>
    <div class="flex items-center justify-between">
      <titre>Les utilisateurs </titre>
        <button @click="showModal=true" title="ajouter un bailleur" class="p-2 overflow-hidden text-xs font-semibold text-white uppercase rounded bg-primary focus:outline-none focus:shadow-outline">
          <span class="mx-2 text-sm font-semibold">ajouter</span>
        </button>
    </div>
    <div class="align-middle inline-block w-full  overflow-hidden  pt-3 rounded-bl-lg rounded-br-lg">
      <table class="w-full">
        <thead>
          <tr>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">#</th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Nom</th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">pernom</th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Email</th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Contact</th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Roles</th>

            <th class="px-6 py-3 border-b-2 border-gray-300 text-center text-sm leading-4 text-primary tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="(item, i) in list" :key="i">
            
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500"> {{i}} </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500"> {{item.nom}} </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500"> {{item.prenom}} </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{{item.email}} </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500"> {{item.contact}} </td>
            
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
              <p v-for="(ite, j) in item.roles" :key="j">{{ite.nom}}</p>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap text-center border-b border-gray-500 text-sm leading-5">
              <div class="flex item-center justify-center">
                <div class="w-4 mr-2 transform hover:text-blue-500 hover:scale-110" @click="editer(item)">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <div   class="w-4 mr-2 transform hover:text-blue-500 hover:scale-110" @click="deleter(item)">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
              </div>      
            </td>
          </tr>              
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import RouteName from "../../../components/RouteName.vue";
import FormComponent from "../../../components/FormComponent.vue";

import { mapState } from 'vuex'
export default {
  modules: ['@nuxtjs/axios'],
  computed: {
      ...mapState(['baseURL'])
  },
  layout: "dashboard",
  components: { RouteName, FormComponent },
  data() {
    return ({
      showModal:false,
      form: [
        { label: "nom", type: "text", value: null },
        { label: "prenom", type: "text", value: null },
        { label: "email", type: "email", value: null },
        { label: "contact", type: "tel", value: null },
        { label: "roles", type: "select", value: null, options: [] }
      ],
      list: [],
      token: "",
      key: ''
    });
  },
  mounted() {
    this.token  = localStorage.getItem("token");
    this.$axios.setBaseURL(this.baseURL);
    this.$axios.setToken(this.token, 'Bearer');
    this.getroles().then((response)=>{
      //console.log(response);
      response.data.forEach(element => {
        this.form[4].options = this.form[4].options.concat({label: element.nom, value: element.id});
      });
    });
    this.getusers().then((response)=>{
      //console.log(response);
      this.list = response.data;
    })
  },
  methods: {
    sender(){
      let data = {};

      for (let i = 0; i < this.form.length; i++) {
        data[this.form[i].label] = this.form[i].value;
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
      for (let i = 0; i < this.form.length; i++) {
        this.form[i].value =  data[this.form[i].label];
      }
      this.form = this.form.concat({ label: "id", type: "hidden", value: data.id })
      this.showModal = true;
      this.key = 'put'
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
      return await this.$axios.$post('/api/utilisateurs', data)
    },
    async getusers() {
      return await this.$axios.$get('/api/utilisateurs')
    },
    async putuser(id, data) {
      return await this.$axios.$put('/api/utilisateurs/'+id, data)
    },
    async deleteuser(id) {
      return await this.$axios.$delete('/api/utilisateurs/'+id)
    },
    async getroles() {
      return await this.$axios.$get('/api/roles')
    },
  }
}
</script>

<style scoped>

</style>