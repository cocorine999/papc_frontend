<template>
  <dashboard>
    <div class="w-full">
      <delete-alert v-if="deleteModal" type="danger" title="Confirm Action" width="sm" v-on:close="deleteModal = false">
        <p class="text-gray-800">
          voulez vous supprimer cet element?
        </p>

        <div class="text-right mt-4">
          <button @click="deleteModal = false" class="px-4 py-2 text-sm text-gray-600 focus:outline-none hover:underline">Annuler</button>
          <button class="mr-2 px-4 py-2 text-sm rounded text-white bg-red-500 focus:outline-none hover:bg-red-400" @click="deleteUtilisateurs(deleteData)">Supprimer</button>
        </div>
      </delete-alert>
      <nav class="text-xs md:text-sm font-semibold flex flex-wrap justify-between items-center " aria-label="Breadcrumb">
          <div>
            <ol class="inline-flex p-0 list-none">
              <li class="flex items-center text-blue-500">
                <router-link to="#" class="text-gray-600">dashboard</router-link>
                <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
              </li>
              <li class="flex items-center ">
                <router-link to="#" class="text-gray-600">Utilisateurs</router-link>
              </li>
            </ol>
          </div>
          <div>
            <div class="w-full flex text-gray-600">
                <input @input="$emit('search',$event.target.value)" class="h-8 w-full px-5 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none relative -mr-9 block sm:block" v-model="search" type="text" name="search" placeholder="Rechercher" >
                <button type="submit" class="relative  p-2 rounded-lg">
                <svg class="w-4 h-4 text-gray-600 fill-current" xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
                      viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve"
                      width="512px" height="512px">
                  <path
                      d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                </svg>
              </button>
            </div> 
            </div>
      </nav> 
      <div v-if="showModal">
        <modal-top-right :title="title" v-on:close="close">
        <div v-if="!isUpdate" class="w-full px-4">
            <vform template="default" :sendRequest="sendRequest"  :champs="champs" submitText="Ajouter " @sendForm="sendForm" @closeModal="close"></vform>
        </div>
        <div v-else class="w-full px-4">
            <vform template="default" :sendRequest="sendRequest"  :champs="champsUpdate" submitText="modifier" @sendForm="sendForm" @closeModal="close"></vform>
        </div>
        </modal-top-right>
      </div>
      <div class="flex items-center justify-between flex-wrap my-2">
        <titre>Les utilisateurs </titre>
          <button @click="addUsers" title="ajouter utilisateur" class="py-2 px-4 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase bg-primary focus:outline-none focus:shadow-outline">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
            <span class="mx-1 md:mx-2 text-xs font-semibold">ajouter</span>
          </button>
      </div>
   
      <div  id="dataTable">
        <vtable v-if="utilisateurUpdate && utilisateurDelete" :headers="headers" :datas="filteredUser()"  :sendRequest="sendRequest" :actions="actions" @modifier="modifier" @supprimer="supprimer"></vtable>
        <vtable v-if="!utilisateurUpdate && utilisateurDelete" :headers="headers" :datas="filteredUser()"  :sendRequest="sendRequest" :actions="actionsDelete" @supprimer="supprimer"></vtable>
        <vtable v-if="utilisateurUpdate && !utilisateurDelete" :headers="headers" :datas="filteredUser()"  :sendRequest="sendRequest" :actions="actionsUpdate" @modifier="modifier"></vtable>
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
import UtilisateurService from "@/services/modules/utilisateur.service.js";
import RoleService from "@/services/modules/role.service.js";
import { mapActions, mapMutations, mapGetters} from "vuex";
import DeleteAlert from "@/components/DeleteAlert.vue";
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
    DeleteAlert,
    Vtable,
  },
    data() {
      return ({
        showModal:false,
        usersAttributes : ['nom', 'email', 'contact','roles'],
        usersAttributesUp : ['nom', 'contact','roles'],
        showModal:false,
        isComment:false,
        sendRequest: false,
        isUpdate:false,
        title:'',
        cols:1,
        search:'',
        champs:[],
        champsUpdate:[],
        headers:[
          {name:'Nom et Prénoms',  cle:'nom'},
          {name:'Email',  cle:'email', edit : false},
          {name:'Contact',  cle:'contact'},
          {name:'type utilisateur', cle:'type'},
          {name:'Date de creation', cle:'created_at', edit : false},
        ],
        actions:[
          {name:'supprimer',iconne:''},
          {name:'modifier',iconne:''},
        ],
        actionsDelete:[
          {name:'supprimer',iconne:''},
         
        ],
        actionsUpdate:[
         
          {name:'modifier',iconne:''},
        ],
        
        utilisateurVisible:false,
        utilisateurAdd:false,
        utilisateurDelete:false,
        utilisateurUpdate:false,
        utilisateurs:[],
        roles:[],
        utilisateurId:'',
        deleteData:{},
        deleteModal:false,
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
      saveUtilisateurs: "STORE_UTILISATEUR",
      updateUtilisateur: "UPDATE_UTILISATEUR",
      deleteUtilisateur: "DESTROY_UTILISATEUR",
    }),
    ...mapActions("roles", {
      fetchRoles: "FETCH_LIST_ROLE",
    }),
    addUsers() {
      this.title = 'Ajouter un utilisateur'
      this.showModal = true
      this.isUpdate = false
    },
    getRole() {

      RoleService.get().then((data) => {
        const datas = data.data.data
        this.roles = datas
        this.champs = [
          {name:'Nom et Prenoms', key: 'nom', type:'text', placeholdere:"", isSelect:false, isTextArea:false, data:'',required:true, errors : []},
          {name:'Email', key: 'email', type:'email', placeholdere:"Votre Email", isSelect:false, isTextArea:false, data:'', required:true, errors : []},
          {name:'Contact', key: 'contact', type:'number', placeholdere:'Votre contact', isSelect:false, isTextArea:false, data:'', required:true, errors : []},
          {name:'Type utilisateurs', key: 'roles', type:'', placeholdere:'Choisir un type d\' utilisateur', isSelect:true, isTextArea:false, data:'', options: datas, cle: 'id', value: 'nom', required:true, errors : []}
        ]
        this.champsUpdate = [
          {name:'Nom et Prenoms', key: 'nom', type:'text', placeholdere:"", isSelect:false, isTextArea:false, data:'',required:true, errors : []},
          {name:'Contact', key: 'contact', type:'number', placeholdere:'Votre contact', isSelect:false, isTextArea:false, data:'', required:true, errors : []},
          {name:'Type utilisateurs', key: 'roles', type:'', placeholdere:'Choisir un type d\' utilisateur', isSelect:true, isTextArea:false, data:'', options: datas, cle: 'id', value: 'nom', required:true, errors : []}
        ]
        
    
      }).catch((error) => {
      
        if (error.response) {
              // Requête effectuée mais le serveur a répondu par une erreur.
              const message = error.response.data.message
              this.$toast.error(message)
              } else if (error.request) {
                // Demande effectuée mais aucune réponse n'est reçue du serveur.
                //console.log(error.request);
              } else {
              // Une erreur s'est produite lors de la configuration de la demande
              //console.log('dernier message', error.message);
          }
      })
    },

    active() {
      this.$store.dispatch('active')
    },
    disabled() {
      this.$store.dispatch('disabled')
    },
    modifier(utilisateur) {
      this.isUpdate = true
      this.title = 'Modifier un projet'

      this.submitText = "Modifier"

      this.utilisateurId = utilisateur.id

      this.usersAttributesUp.forEach((item) => {

        this.champsUpdate.find((value, index) => {

          if (value.key !== 'roleId') {
            if (value.key === item) {
              this.champsUpdate[index]['data'] = utilisateur[item]
            }
          }

        })

      })

      this.showCloseModal(true)

    },
    fetchUtilisateurs() {
      this.active()
      UtilisateurService.get().then((data) => {
        const datas = data.data.data
        this.utilisateurs = datas
        this.getRole()
        this.disabled()
      }).catch((error) => {
        this.disabled()
        if (error.response) {
          // Requête effectuée mais le serveur a répondu par une erreur.
          const message = error.response.data.message
          this.$toast.error(message)
        } else if (error.request) {
        // Demande effectuée mais aucune réponse n'est reçue du serveur.
        //console.log(error.request);
        } else {
          // Une erreur s'est produite lors de la configuration de la demande
        }
      })
    },
    fetchUtilisateur() {
     
      UtilisateurService.get().then((data) => {
        const datas = data.data.data
        this.utilisateurs = datas
      
      }).catch((error) => {
       
        if (error.response) {
          // Requête effectuée mais le serveur a répondu par une erreur.
          const message = error.response.data.message
          this.$toast.error(message)
        } else if (error.request) {
        // Demande effectuée mais aucune réponse n'est reçue du serveur.
        //console.log(error.request);
        } else {
          // Une erreur s'est produite lors de la configuration de la demande
        }
      })
    },

    getPermission() {
         this.currentUser.role[0].permissions.forEach(element => {
            if(element.slug ==='voir-un-utilisateur') {
              this.utilisateurVisible = true
            }
            if(element.slug === 'creer-un-utilisateur') {
              this.utilisateurAdd = true
            }
            if(element.slug === 'modifier-un-utilisateur') {
              this.utilisateurUpdate = true
            }
            if(element.slug ==='supprimer-un-utilisateur') {
              this.utilisateurDelete = true
            }
            
          });

    },
    
    sendForm() {
      this.champs = this.champs.map((item) => {
        item.errors = [];
        return item;
      });

      this.champs = this.champs.map(item => { item.errors = []; return item })
        this.champsUpdate = this.champsUpdate.map(item => { item.errors = []; return item })
        let utilisateur = {}
        if (this.isUpdate) {
          utilisateur = extractFormData(this.champsUpdate, this. usersAttributesUp)
          utilisateur.id = this.utilisateurId
        } else {
          utilisateur = extractFormData(this.champs, this. usersAttributes)
        }

      utilisateur.roles = [utilisateur.roles.id]
      //utilisateur.roles = utilisateur.roles.id
      utilisateur.programmeId = this.idProgramme
      if(this.sendRequest == false ) {
        this.sendRequest = true
        if (utilisateur?.id) {
          this.updateUtilisateur({ utilisateur: utilisateur, id:utilisateur?.id }).then(
            (response) => {
              if (response.status == 200 || response.status == 201) {
                this.$toast.success('operation effectuer avec sucess')
                this.sendRequest = false
                this.fetchUtilisateur()
                this.close();
              }
            }
          ).catch((e) => {
            this.$toast.error(e)
            this.sendRequest = false
          })
          } else {
          this.saveUtilisateurs(utilisateur).then((response) => {
            if (response.status == 200 || response.status == 201) {
              this.$toast.success('nouveau utilisateur creer')
              this.close();
              this.fetchUtilisateur()
              this.sendRequest = false
            }
          }).catch((e) => {
            this.$toast.error(e)
            this.sendRequest = false
          })
          }
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
    supprimer(utilisateur,index) {
        this.deleteModal= true
        this.deleteData.data = utilisateur
        this.deleteData.index = index
    },

    deleteUtilisateurs(data) {
        //this.filteredIndicateur.splice(data.index,1)
        this.deleteModal= false
        UtilisateurService.destroy(data.data.id).then((data) => {
          this.$toast.success("Operation effectué avec success !")
          this.fetchUtilisateur()
        
        }).catch((error) => {
          
          if (error.response) {
            // Requête effectuée mais le serveur a répondu par une erreur.
            const message = error.response.data.message
            this.$toast.error(message)
          } else if (error.request) {
          // Demande effectuée mais aucune réponse n'est reçue du serveur.
          //console.log(error.request);
          } else {
            // Une erreur s'est produite lors de la configuration de la demande
          }
        }) 
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
    this.getPermission()
    if(!this.utilisateurVisible) {
      this.$router.push('/401-non-autorise')
    } 
    this.fetchUtilisateurs()
  
  },
   
}
</script>

<style scoped>

</style>