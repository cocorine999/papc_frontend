<template>
  <dashboard>
    <div class="px-4">
      <nav class="mb-2 mt-4 text-sm font-semibold flex justify-between items-center " aria-label="Breadcrumb">
        <div>
          <ol class="inline-flex p-0 list-none">
            <li class="flex items-center text-blue-500">
              <router-link to="" class="text-gray-600">dashboard</router-link>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
            </li>
            <li class="flex items-center ">
              <router-link to="" class="text-gray-600">roles et permission</router-link>
            </li>
          </ol>
        </div>
        <div>
          <search-bar ></search-bar>
        </div>
      </nav> 
      <div v-if="showModal">
        <modal-top-right :title="title" v-on:close="close">
          <div  class="px-4">
            <form @submit.prevent="createRole" v-if="title =='Creer un nouveau role' ">
              <div class="my-4">
                <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light">Entrez le role  </label>
                <input required type="text" v-model="roles.nom" placeholder="Taper le role"  class="px-4 py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent" >
                <!-- <div v-for="nom in errors.nom" :key="nom.id" class="text-red-500 text-sm   py-2 font-bold"> {{nom}} </div> -->
              </div>
              
          
              <div class="my-4">
                <multiselect v-model="value" :hideSelected="true" :closeOnSelect="false" tag-placeholder="Ajouter un type utilisateur" placeholder="Ajouter une permissions" label="nom" track-by="nom"  :selectLabel="'Appuyez sur Entrée pour sélectionner'" :deselectLabel="'Appuyez sur Entrée pour supprimer'"  :options="permissions" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
                <!-- <div v-for="role in errors.roles" :key="role.id" class="text-red-500 text-sm   py-2 font-bold"> {{role}} </div> -->
              </div>

              <div class="my-4">
               
                <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light">Description du role  <span class="px-2 text-lg font-black text-red-700">*</span></label>
              
                <textarea v-model="roles.description"  class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" rows="3"></textarea>
              </div>

              <div class="py-2 my-4 flex justify-center space-x-8">
                <button type="submit" class="bg-primary  flex space-x-2  items-center text-white px-4 py-2 border border-primary font-semibold uppercase">
                  <span class="text-sm font-semibold uppercase" v-if="!chargement">
                    enregistrer
                  </span>
                  <span v-else class="flex items-center space-x-2">
                    <span class="text-xs px-4 font-semibold ">
                      envoi ...
                    </span>
                    <svg  xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-center animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </span>
                </button>
                <vbutton type="reset" template="danger" @close="close"> annuler </vbutton>
              </div>
            </form>
            <form @submit.prevent="updateRole" v-if="title =='Modifier un role' ">
              <div class="my-4">
                <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light">Entrez le role  </label>
                <input required type="text" v-model="saveUpdate.nom" placeholder="Taper le role"  class="px-4 py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent" >
                <!-- <div v-for="nom in errors.nom" :key="nom.id" class="text-red-500 text-sm   py-2 font-bold"> {{nom}} </div> -->
              </div>
              
          
              <div class="my-4">
                <multiselect v-model="saveUpdate.permissions" tag-placeholder="Ajouter un type utilisateur" placeholder="Ajouter une permissions" label="nom" track-by="nom"  :selectLabel="'Appuyez sur Entrée pour sélectionner'" :deselectLabel="'Appuyez sur Entrée pour supprimer'"  :options="permissions" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
                <!-- <div v-for="role in errors.roles" :key="role.id" class="text-red-500 text-sm   py-2 font-bold"> {{role}} </div> -->
              </div>

              <div class="my-4">
               
                <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light">Description du role  <span class="px-2 text-lg font-black text-red-700">*</span></label>
              
                <textarea v-model="saveUpdate.description"  class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" rows="3"></textarea>
              </div>

              <div class="py-2 my-4 flex justify-center space-x-8">
                <button type="submit" class="bg-primary  flex space-x-2  items-center text-white px-4 py-2 border border-primary font-semibold uppercase">
                  <span class="text-sm font-semibold uppercase" v-if="!chargement">
                    enregistrer
                  </span>
                  <span v-else class="flex items-center space-x-2">
                    <span class="text-xs px-4 font-semibold ">
                      envoi ...
                    </span>
                    <svg  xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-center animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </span>
                </button>
                <vbutton type="reset" template="danger" @close="close"> annuler </vbutton>
              </div>
            </form>
          </div>
        </modal-top-right>
      </div>
      <div class="flex items-center justify-between">
        <titre>Role et permissions </titre>
          <button @click="addRole" title="ajouter " class="px-4 py-2 flex overflow-hidden items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
            <span class="mx-2 text-sm font-semibold">creer un role</span>
          </button>
      </div>
   
      <div  id="dataTable">
       <div class="flex flex-col">
          <div class="overflow-x-auto ">
            <div class="py-4 inline-block min-w-full ">
              <div class="overflow-hidden">
                <table class="min-w-full text-center">
                  <thead class="border-b bg-gray-50">
                    <tr>
                    
                      <th scope="col" class="text-sm font-semibold uppercase text-gray-900 px-6 py-4">
                        roles
                      </th>
                      <th scope="col" class="text-sm font-semibold uppercase text-gray-900 px-6 py-4">
                        permissions
                      </th>
                      <th scope="col" class="text-sm font-semibold uppercase text-gray-900 px-6 py-4">
                        actions
                      </th>
                    </tr>
                  </thead >
                  <tbody>
                   <tr v-for="(data,index) in mesRoles" :key="index" class="bg-white border-b">
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                       {{data.nom}}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                        <div class="flex space-x-4 space-y-2 flex-wrap ">
                          <span v-for="permission in data.permissions" :key="permission.id" class="bg-green-500 py-1 px-3 cursor-pointer text-xs font-bold text-white border-green-500 rounded-xl"> {{permission.nom}} </span>
                        </div>
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                        <div class="flex item-center justify-center">
                          <div @click="modifier(data)" class="w-4 mr-2 transform hover:text-blue-500 hover:scale-110" >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </div>
                          <div @click="deleteRole(data)"  class="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
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
          </div>
        </div>
      </div>
    </div>
  </dashboard>
</template>

<script>
import ModalTopRight from '@/components/ModalTopRight'
import Multiselect from 'vue-multiselect'
import SearchBar from '@/components/SearchBar'
import Titre from '@/components/Titre'
import Vtable from '@/components/Vtable'
import Vform from '@/components/Vform'
import Vmodal from '@/components/Vmodal'
import Dashboard from '@/layouts/Dashboard'
import Vbutton from '@/components/Vbutton'
import RoleService from "@/services/modules/role.service.js";
import PermissionsService from "@/services/modules/permission.service.js";


  export default {
    components: {
      Vtable,
      Dashboard,
      Vmodal,
      Vform,
      Titre,
      SearchBar,
      ModalTopRight,
      Multiselect,
      Vbutton
    },
    data() {
        return {
          mesRoles:[],
          uniteeDeGestionAttributs : ['nom', 'email', 'contact', 'programmeId'],
          showModal:false,
          chargement:false,
          title:'',
          saveUpdate:{},
          permissions: [],
          idRole:'',
          description:'',
          roles:{
            nom:'',
            description:'',
            role:[]
          },
          value:[],
          saveUpdate:[],
          isOpen: false,
      };
    },
  
    computed: {

      //importation des variables du module auths

   
    },

    methods: {
      active() {
        this.$store.dispatch('active')
      },
      disabled() {
        this.$store.dispatch('disabled')
      },
      createRole() {
        
        this.value.forEach(element => {
          this.roles.role.push(element.id)
        })
        const data = {
          nom:this.roles.nom,
          description:this.roles.description,
          permissions:this.roles.role
        }
         
        
        RoleService.create(data).then((data) => {
           const id =setInterval(() => { 
              this.chargement = true
              console.log(this.chargement)
           }, 3000);
          clearInterval(id)
          this.chargement = false
           alert('nouveau role Creer')
           this.showModal = false
        }).catch((e) => {
          this.chargement = false  
          console.log(e)
        })
        
        
      },
      getRole() {
        this.active()
        RoleService.get().then((data) => {
          this.mesRoles = data.data.data
          console.log('mes  permissions',this.mesRoles)
          this.disabled()
        }).catch((e) => {
          console.log(e)
        })
      },
      deleteRole(data) {
         if(window.confirm("Voulez-vous supprimer cette unitee de gestion  " + data.nom)) {
            RoleService.destroy(data.id).then((data) => {
            alert('suppression reuissie')
          }).catch((e) => {
           alert(e)
          })
         }
      },
      updateRole() {
        let roles =[]
          this.saveUpdate.permissions.forEach(element => {
          roles.push(element.id)
        })
        const data = {
          nom:this.saveUpdate.nom,
          description:this.saveUpdate.description,
          permissions:this.roles
        }
        RoleService.update(this.saveUpdate.id,data).then((data) => {
           const id =setInterval(() => { 
              this.chargement = true
           },3000);
          clearInterval(id)
          this.chargement = false
        }).catch((e) => {
          this.chargement = false  
          console.log(e)
        })
      },
      getPermission() {
        PermissionsService.get().then((data) => {
          this.permissions = data.data.data
          console.log('mes  permissions',this.permisions)
        }).catch((e) => {
          console.log(e)
        })
      },
      addTag (newTag) {
            const tag = {
              nom: newTag,
            }
            this.options.push(tag)
            this.value.push(tag)
      },
      modifier(data) {
        this.saveUpdate = data
        this.title='Modifier un role'
        this.showCloseModal(true)
      },

      addRole() {
        this.title='Creer un nouveau role'
        this.showCloseModal(true)
      },

      close() {
        this.showCloseModal()
        this.resetForm()
      }, 
      
      showCloseModal(value = false) {
        this.showModal = value
      },
      
    },
    mounted() {
      this.getRole()
      this.getPermission()
    }
  }
</script>

<style scoped>

</style>