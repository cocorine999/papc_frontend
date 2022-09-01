<template>
  <dashboard>
    <div class="px-4 py-2">
    <nav class="mb-2 mt-4 text-sm font-semibold flex justify-between items-center " aria-label="Breadcrumb">
        <div>
          <ol class="inline-flex p-0 list-none">
            <li class="flex items-center text-blue-500">
              <router-link to="" class="text-gray-600">dashboard</router-link>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
            </li>
            <li class="flex items-center ">
              <router-link to="" class="text-gray-600">Utilisateurs</router-link>
            </li>
          </ol>
        </div>
        <div>
          <div class="flex justify-center w-full text-gray-600">
              <input @input="$emit('search',$event.target.value)" class="h-10  w-full px-5 pr-16 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none" v-model="search" type="text" name="search" placeholder="Rechercher" >
              <button type="submit" class="relative  right-10 ">
              <svg class="w-4 h-4 text-gray-600 fill-current" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
                    viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve"
                    width="512px" height="512px">
                 <path
                    d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
             </button>
           </div>        </div>
      </nav> 
    <div v-if="showModal">
      <modal-top-right title="Ajouter un utilisateur" v-on:close="close">
       <div class="px-4">
          <vform template="default" :champs="champs" :cols="cols" submitText="Ajouter un utilisateur" @sendForm="sendForm" @closeModal="close"></vform>
       </div>
      </modal-top-right>
    </div>
    <div class="flex items-center justify-between">
      <titre>Les utilisateurs </titre>
        <button @click="showModal=true" title="ajouter un bailleur" class="py-2 px-4 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase bg-primary focus:outline-none focus:shadow-outline">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
          <span class="mx-2 text-xs font-semibold">ajouter</span>
        </button>
    </div>
   
    <div  id="dataTable">
      <vtable :headers="headers" :datas="filteredUser()" :actions="actions" @updateInputData="updateInputData" @supprimer="supprimer"></vtable>
    </div>

  </div>
  </dashboard>
</template>

<script>

import SearchBar from '@/components/SearchBar'
import RouteName from '@/components/RouteName.vue'
import Vform from '@/components/Vform'
import Titre from '@/components/Titre'
import Vmodal from '@/components/Vmodal'
import ModalTopRight from '@/components/ModalTopRight'
import Vtable from '@/components/Vtable'
import Dashboard from '@/layouts/Dashboard'

import { mapActions, mapMutations, mapGetters} from "vuex";
import extractFormData from '@/utils/extract-data'
export default {
  components: {
    Dashboard,
    Vmodal,
    Titre,
    SearchBar,
    RouteName,
    Vform,
    ModalTopRight,
    Vtable,
  },
    data() {
      return ({
        showModal:false,
        usersAttributes : ['nom', 'email', 'contact', 'prenom','roles'],
        showModal:false,
        isComment:false,
        title:'',
        cols:1,
        search:'',
        champs:[
          {name:'Nom', key: 'nom', type:'text', placeholdere:"", isSelect:false, isTextArea:false, data:'',required:true, errors : []},
          {name:'Prenom', key: 'prenom', type:'text', placeholdere:"", isSelect:false, isTextArea:false, data:'',required:true, errors : []},
          {name:'Email', key: 'email', type:'email', placeholdere:"Votre Email", isSelect:false, isTextArea:false, data:'', required:true, errors : []},
          {name:'Contact', key: 'contact', type:'number', placeholdere:'Votre contact', isSelect:false, isTextArea:false, data:'', required:true, errors : []},
          {name:'Type utilisateurs', key: 'roles', type:'', placeholdere:'Choisir un type d\' utilisateur', isSelect:true, isTextArea:false, data:'', options: this.roles, cle: 'id', value: 'nom', required:true, errors : []}
        ],
        headers:[
          {name:'Nom',  cle:'nom'},
          {name:'Prenom',  cle:'prenom'},
          {name:'Email',  cle:'email', edit : false},
          {name:'Contact',  cle:'contact'},
          {name:'type utilisateur', props:'nom', cle:'roles'},
          {name:'Date de creation', cle:'created_at', edit : false},
        ],
        actions:[
          {name:'supprimer',iconne:''},
        ]
        
      });
      
    },
     watch: {
      isLoading: function (value) {
        //this.loading = value
      },
     roles: function (roles) {
      this.champs.map((item) => {
        if (item.key === "roles") {
          item.options = roles.map((role) => {
            return {
              id: role.id,
              nom: role.nom,
            };
          });
        }
        return item;
      });
    },
   
    hasErrors: function (errors) {
      this.champs.forEach((value) => {
        value.errors = errors[value.key];
      });
      //this.errors = errors
    },
  },
  
  computed: {
    ...mapGetters({
      hasErrors: "GET_ERREURS",
      isLoading: "IS_LOADING",
      utilisateur: "utilisateurs/getUtilisateur",
      utilisateurs: "utilisateurs/getUtilisateurs",
      roles: "roles/getRoles",
      currentUser : 'auths/GET_AUTHENTICATE_USER'
    }),
    idProgramme(){
      return this.currentUser.programme.id
    }
  },
  methods: {
    ...mapMutations({
      setErrors: "SET_ERRORS_MESSAGE", // map `this.setErrors()` to `this.$store.commit('SET_ERRORS_MESSAGE')`,
      setUtilisateur: "utilisateurs/FILL", // map `this.CREATE_INSTANCE_PROGRAMME()` to `this.$store.commit('CREATE_INSTANCE_PROGRAMME')`
    }),

    ...mapActions("utilisateurs", {
      fetchUtilisateurs: "FETCH_LIST_UTILISATEUR",
      saveUtilisateurs: "STORE_UTILISATEUR",
      updateUtilisateur: "UPDATE_UTILISATEUR",
      deleteUtilisateur: "DESTROY_UTILISATEUR",
    }),
    ...mapActions("roles", {
      fetchRoles: "FETCH_LIST_ROLE",
    }),

    
    sendForm() {
      this.champs = this.champs.map((item) => {
        item.errors = [];
        return item;
      });

      let utilisateur = extractFormData(this.champs,this.usersAttributes);
      utilisateur.roles = [utilisateur.roles.id]
      utilisateur.programmeId = this.idProgramme

      if (this.utilisateur?.id) {
        this.updateUtilisateur({ utilisateur: utilisateur, id: this.utilisateur?.id }).then(
          (response) => {
            if (response.status == 200 || response.status == 201) {
              this.close();
            }
          }
        );
      } else {
        this.saveUtilisateurs(utilisateur).then((response) => {
          if (response.status == 200 || response.status == 201) {
            this.close();
          }
        });
      }
    },
    filteredUser(){
        var self = this;

        return this.utilisateurs.filter(function (user){
          return user.email.toLowerCase().indexOf(self.search.toLowerCase()) >= 0 ||
                 user.prenom.toLowerCase().indexOf(self.search.toLowerCase()) >= 0 ||
                 user.nom.toLowerCase().indexOf(self.search.toLowerCase()) >= 0;
        });
      },
    resetForm(){

      this.champs = this.champs.map(item => { item.data = ''; return item})
        
      window.document.getElementById('vform')?.reset()

      this.setUtilisateur({})
    },

    async updateInputData(id, attribut, value) {
        await this.updateUtilisateur({utilisateur: {[attribut] : value}, id : id}).catch((value, status) => {
          if(this.hasErrors[attribut] !== undefined)
            alert(this.hasErrors[attribut])            
        }).finally(() => {
          $('#' + "dataTable").load(location.href + '#' + id + '>*', '')
        })
    },
    async supprimer(utilisateur) {
      if(window.confirm("Voulez-vous supprimer cette unitee de gestion  " + utilisateur.nom))
        await this.deleteUtilisateur(utilisateur.id)
    },
    close() {
      this.showCloseModal();
      this.resetForm();
    },
    showCloseModal(value = false) {
      this.showModal = value;
    },

  },

   mounted() {
    this.fetchUtilisateurs().then((value) => {
      setTimeout(() => {
        console.log("Fetching list of programmes...")
        this.fetchRoles()
      }, 100);
    })
  },
   
}
</script>

<style scoped>

</style>