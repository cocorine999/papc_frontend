<template>
  <dashboard>
    <delete-alert v-if="deleteModal" type="danger" title="Confirm Action" width="sm" v-on:close="deleteModal = false">
      <p class="text-gray-800">
        voulez vous supprimer cet element?
      </p>

      <div class="text-right mt-4">
        <button @click="deleteModal = false"
          class="px-4 py-2 text-sm text-gray-600 focus:outline-none hover:underline">Annuler</button>
        <button class="mr-2 px-4 py-2 text-sm rounded text-white bg-red-500 focus:outline-none hover:bg-red-400"
          @click="deleteRoles(deleteData)">Supprimer</button>
      </div>
    </delete-alert>
    <div class="w-full">
      <nav class="text-sm font-semibold flex justify-between items-center  flex-wrap " aria-label="Breadcrumb">
        <div>
          <ol class="inline-flex p-0 list-none">
            <li class="flex items-center text-blue-500">
              <router-link to="" class="text-gray-600">dashboard</router-link>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path
                  d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
              </svg>
            </li>
            <li class="flex items-center ">
              <router-link to="" class="text-gray-600">rôles et permissions</router-link>
            </li>
          </ol>
        </div>
        <div>
          <div class="w-full flex text-gray-600">
            <input @input="$emit('search', $event.target.value)"
              class="h-8 w-full px-5 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none relative -mr-9 block sm:block"
              v-model="search" type="text" name="search" placeholder="Rechercher">
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
          <div class="w-full p-4">
            <form @submit.prevent="createRole" v-if="title == 'Créer'">
              <div class="my-4">
                <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light">Entrez le rôle
                </label>
                <input required type="text" v-model="roles.nom" placeholder="Taper le rôle"
                  class="px-2 py-1 md:px-4 md:py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent placeholder:text-xs md:placeholder:text-sm">
                <!-- <div v-for="nom in errors.nom" :key="nom.id" class="text-red-500 text-sm   py-2 font-bold"> {{nom}} </div> -->
              </div>

              <div class="my-4">
                <multiselect v-model="value" :hideSelected="true" :closeOnSelect="false"
                  tag-placeholder="Ajouter un type utilisateur" placeholder="Ajouter une permission" label="nom"
                  track-by="nom" :selectLabel="'Appuyez sur Entrée pour sélectionner'"
                  :deselectLabel="'Appuyez sur Entrée pour supprimer'" :options="permissions" :multiple="true"
                  :taggable="true" @tag="addTag"></multiselect>
                <!-- <div v-for="role in errors.roles" :key="role.id" class="text-red-500 text-sm   py-2 font-bold"> {{role}} </div> -->
              </div>

              <div class="my-4">

                <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light">Description du
                  rôle <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>

                <textarea v-model="roles.description"
                  class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent"
                  rows="3"></textarea>
              </div>

              <div class="py-2 my-4 flex justify-center space-x-8">
                <button type="submit"
                  class="bg-primary  flex space-x-2  items-center text-white px-4 py-2 border border-primary font-semibold uppercase">
                  <span class="text-sm font-semibold uppercase" v-if="!chargement">
                    enregistrer
                  </span>
                  <span v-else class="flex items-center space-x-2">
                    <span class="text-xs px-4 font-semibold ">
                      envoi ...
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-center animate-spin" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </span>
                </button>
                <vbutton type="reset" template="danger" @close="close"> annuler </vbutton>
              </div>
            </form>
            <form @submit.prevent="updateRole" v-if="title == 'Modifier un rôle'">
              <div class="my-4">
                <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light">Entrez le rôle
                </label>
                <input required type="text" v-model="saveUpdate.nom" placeholder="Taper le role"
                  class="px-2 py-1 md:px-4 md:py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent placeholder:text-xs md:placeholder:text-sm">
                <!-- <div v-for="nom in errors.nom" :key="nom.id" class="text-red-500 text-sm   py-2 font-bold"> {{nom}} </div> -->
              </div>


              <div class="my-4">
                <multiselect v-model="saveUpdate.permissions" tag-placeholder="Ajouter un type utilisateur"
                  placeholder="Ajouter une permissions" label="nom" track-by="nom"
                  :selectLabel="'Appuyez sur Entrée pour sélectionner'"
                  :deselectLabel="'Appuyez sur Entrée pour supprimer'" :options="permissions" :multiple="true"
                  :taggable="true" @tag="addTag"></multiselect>
                <!-- <div v-for="role in errors.roles" :key="role.id" class="text-red-500 text-sm   py-2 font-bold"> {{role}} </div> -->
              </div>

              <div class="my-4">

                <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light">Description du
                  role <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>

                <textarea v-model="saveUpdate.description"
                  class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent"
                  rows="3"></textarea>
              </div>

              <div class="py-2 my-4 flex justify-center space-x-8">
                <button type="submit"
                  class="bg-primary  flex space-x-2  items-center text-white px-4 py-2 border border-primary font-semibold uppercase">
                  <span class="text-sm font-semibold uppercase" v-if="!chargement">
                    enregistrer
                  </span>
                  <span v-else class="flex items-center space-x-2">
                    <span class="text-xs px-4 font-semibold ">
                      envoi ...
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-center animate-spin" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </span>
                </button>
                <vbutton type="reset" template="danger" @close="close"> annuler </vbutton>
              </div>
            </form>
          </div>
        </modal-top-right>
      </div>
      <div class="flex items-center justify-between my-2">
        <titre>Rôles et permissions </titre>
        <button v-if="roleAdd" @click="addRole" title="ajouter "
          class="px-4 py-2 flex overflow-hidden items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;">
            <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
          </svg>
          <span class="mx-2 text-xs  md:text-sm font-semibold">créer un rôle</span>
        </button>
      </div>

      <div id="dataTable">
        <div class="flex flex-col">
          <div class="overflow-x-auto ">
            <div class="py-4 inline-block min-w-full ">
              <div class="overflow-hidden">
                <table class="min-w-full text-center table-fixed">
                  <thead class="border-b bg-gray-50">
                    <tr>
                      <th scope="col"
                        class="text-xs md:text-sm font-semibold uppercase text-gray-900 px-6 py-4 w-5/12 whitespace-normal">
                        rôles
                      </th>
                      <th scope="col"
                        class="text-xs md:text-sm font-semibold uppercase text-gray-900 px-6 py-4 w-5/12 whitespace-normal">
                        permissions
                      </th>

                      <th scope="col" class="text-xs md:text-sm font-semibold uppercase text-gray-900 px-6 py-4 w-2/12">
                        actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(data, index) in filteredRole()" :key="index" class="bg-white border-b ">
                      <td class="text-sm text-gray-900 font-semibold flex justify-start  text-left p-2 flex-wrap">
                        {{ data.nom }} : <br>
                        <span class="italic text-start "> {{ data.description }}</span>
                      </td>
                      <td class="text-sm text-gray-900 font-light p-2">
                        <div class="container">
                          <span v-for="permission in data.permissions" :key="permission.id"
                            class="bg-green-500 py-0.5 px-2 cursor-pointer text-xs font-bold my-0.5 text-white border-green-500 rounded-xl  role">
                            {{ permission.nom }} </span>
                        </div>
                      </td>

                      <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                        <div class="flex item-center justify-center">
                          <div v-if="roleUpdate" @click="modifier(data)"
                            class="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </div>
                          <div v-if="roleDelete" @click="supprimeRole(data)"
                            class="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
import DeleteAlert from "@/components/DeleteAlert.vue";
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";

export default {
  components: {
    Vtable,
    Dashboard,
    Vmodal,
    Vform,
    Titre,
    SearchBar,
    DeleteAlert,
    ModalTopRight,
    Multiselect,
    Vbutton
  },
  data() {
    return {
      mesRoles: [],
      uniteeDeGestionAttributs: ['nom', 'email', 'contact', 'programmeId'],
      showModal: false,
      chargement: false,
      title: '',
      saveUpdate: {},
      idRole: '',
      search: "",
      description: '',
      roles: {
        nom: '',
        description: '',
        role: []
      },
      value: [],
      saveUpdate: [],
      isOpen: false,
      roleVisible: false,
      roleAdd: false,
      roleDelete: false,
      roleUpdate: false,
      deleteData: {},
      deleteModal: false,
    };
  },

  computed: {
    //importation des variables du module auths
    ...mapGetters('auths', { currentUser: 'GET_AUTHENTICATE_USER' }),
    permissions() {
      return this.currentUser.role[0].permissions
    }
  },

  methods: {
    active() {
      this.$store.dispatch('active')
    },
    disabled() {
      this.$store.dispatch('disabled')
    },
    getPermission() {
      this.currentUser.role[0].permissions.forEach(element => {
        if (element.slug === 'voir-un-role') {
          this.roleVisible = true
        }
        if (element.slug === 'creer-un-role') {
          this.roleAdd = true
        }
        if (element.slug === 'modifier-un-role') {
          this.roleUpdate = true
        }
        if (element.slug === 'supprimer-un-role') {
          this.roleDelete = true
        }

      });
    },
    createRole() {

      this.value.forEach(element => {
        this.roles.role.push(element.id)
      })
      const data = {
        nom: this.roles.nom,
        description: this.roles.description,
        permissions: this.roles.role
      }

      if (this.chargement == false) {
        this.chargement = true
        RoleService.create(data).then((data) => {
          this.chargement = false
          this.$toast.success('nouveau role creer')
          this.showModal = false
          this.getRole()
          this.roles.nom = "",
        this.roles.description = "",
         this.roles.role = []
         localStorage.removeItem('formData');


        }).catch((e) => {
          this.chargement = false
          this.$toast.error(e)
        })
      }

    },
    getRole() {
      this.active()
      RoleService.get().then((data) => {
        this.mesRoles = data.data.data

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
          //console.log('dernier message', error.message);
        }
      })
    },

    getRoles() {
      RoleService.get().then((data) => {
        this.mesRoles = data.data.data
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
    supprimeRole(role, index) {
      this.deleteModal = true
      this.deleteData.data = role
      this.deleteData.index = index
    },

    deleteRoles(data) {
      //this.filteredIndicateur.splice(data.index,1)
      this.deleteModal = false
      RoleService.destroy(data.data.id).then((data) => {
        this.$toast.success("Operation effectué avec success !")
        this.getRoles()

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


    updateRole() {
      if (this.chargement == false) {
        this.chargement = true
        let roles = []

        this.saveUpdate.permissions.forEach(element => {
          roles.push(element.id)
        })
        const data = {
          nom: this.saveUpdate.nom,
          description: this.saveUpdate.description,
          permissions: roles
        }
        RoleService.update(this.saveUpdate.id, data).then((data) => {
          this.$toast.success('Mise à jours effectué')
          this.showModal = false
          this.chargement = false
        }).catch((e) => {
          this.chargement = false
          this.$toast.error(e)
        })

      }

    },
    modifier(data) {
      this.saveUpdate = data
      this.title = 'Modifier un rôle'
      this.showCloseModal(true)
    },

    addTag(newTag) {
      const tag = {
        nom: newTag,
      }
      this.options.push(tag)
      this.value.push(tag)
    },


    filteredRole() {
      var self = this;
      return this.mesRoles.filter(function (role) {
        return role.nom.toLowerCase().indexOf(self.search.toLowerCase()) >= 0;
      });
    },

    addRole() {
      this.title = 'Créer'
      this.showCloseModal(true)
    },

    close() {
      this.showCloseModal()

      this.roles.role = this.value
     
        this.savedInput = Object.values(this.roles)
          
        const parsed = JSON.stringify(this.savedInput);
        localStorage.setItem('formData', parsed);
    },

    showCloseModal(value = false) {
      this.showModal = value
    },

  },
  mounted() {
    this.getRole()
    this.getPermission()
    if (!this.roleVisible) {
      this.$router.push('/401-non-autorise')
    }

    if (localStorage.getItem("formData")) {
      this.savedInput = []
      this.savedInput = JSON.parse(localStorage.getItem("formData"))
      console.log(this.savedInput)

      this.roles.nom = this.savedInput[0]
        this.roles.description = this.savedInput[1]
        this.roles.role = this.savedInput[2]
        this.value = this.roles.role
     
    }
  }
}
</script>

<style scoped>.container {
  display: flex;
  flex-wrap: wrap;
}

.role {

  margin-right: 5px;
  font-size: 10px;
}</style>