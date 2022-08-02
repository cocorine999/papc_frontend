<template>
  <dashboard>
    <div class="px-4">
      <nav class="mb-2 text-sm font-semibold flex justify-between items-center " aria-label="Breadcrumb">
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
            <form v-if="title =='Creer un nouveau role' ">
              <div class="my-4">
                <input required type="text" v-model="roles.nom" placeholder="Taper le role"  class="px-4 py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent" >
                <!-- <div v-for="nom in errors.nom" :key="nom.id" class="text-red-500 text-sm   py-2 font-bold"> {{nom}} </div> -->
              </div>
          
              <div class="my-4">
                <multiselect v-model="roles.value" tag-placeholder="Ajouter un type utilisateur" placeholder="Ajouter une permissions" label="nom" track-by="nom"  :selectLabel="'Appuyez sur Entrée pour sélectionner'" :deselectLabel="'Appuyez sur Entrée pour supprimer'"  :options="permisions" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
                <!-- <div v-for="role in errors.roles" :key="role.id" class="text-red-500 text-sm   py-2 font-bold"> {{role}} </div> -->
              </div>

              <div class="py-2 my-4 flex justify-center space-x-8">
                <vbutton  type="submit" template="success">Creer un role </vbutton>
                <vbutton type="reset" template="danger" @close="close"> annuler </vbutton>
              </div>
            </form>
            <form v-if="title =='Modifier un role' ">
              <div class="my-4">
                <input required type="text" v-model="saveUpdate.nom" placeholder="Taper le role"  class="px-4 py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent" >
                <!-- <div v-for="nom in errors.nom" :key="nom.id" class="text-red-500 text-sm   py-2 font-bold"> {{nom}} </div> -->
              </div>
          
              <div class="my-4">
                <multiselect v-model="saveUpdate.permissions" tag-placeholder="Ajouter un type utilisateur" placeholder="Ajouter une permissions" label="nom" track-by="nom"  :selectLabel="'Appuyez sur Entrée pour sélectionner'" :deselectLabel="'Appuyez sur Entrée pour supprimer'"  :options="permisions" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
                <!-- <div v-for="role in errors.roles" :key="role.id" class="text-red-500 text-sm   py-2 font-bold"> {{role}} </div> -->
              </div>

              <div class="py-2 my-4 flex justify-center space-x-8">
                <vbutton  type="submit" template="success">Modifier</vbutton>
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
                      <th scope="col" class="text-sm font-semibold text-gray-900 px-6 py-4">
                        #
                      </th>
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
                    <tr v-for="(data,index) in datas" :key="index" class="bg-white border-b">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> {{index}} </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                       {{data.nom}}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                        <div class="grid grid-cols-8 gap-4 items-center ">
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
                          <div   class="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
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

import { mapActions, mapMutations, mapGetters} from "vuex";
import extractFormData from '@/utils/extract-data'

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
          datas: [
            {nom:'Administrateur',permissions:[{nom:"creer"},{nom:"modifier"},{nom:"supprimer"},{nom:"lire"},{nom:"commenter"},{nom:"signer"}, {nom:"banir"},{nom:"lire"},{nom:"commenter"},{nom:"signer"}, {nom:"banir"},{nom:"lire"},{nom:"commenter"},{nom:"signer"}, {nom:"banir"},{nom:"lire"},{nom:"commenter"},{nom:"signer"}, {nom:"banir"},{nom:"lire"},{nom:"commenter"},{nom:"signer"}, {nom:"banir"},{nom:"lire"},{nom:"commenter"},{nom:"signer"}, {nom:"banir"},{nom:"lire"},{nom:"commenter"},{nom:"signer"}, {nom:"banir"}]},
            {nom:'MOD',permissions:[{nom:"creer"},{nom:"modifier"},{nom:"supprimer"},{nom:"lire"},{nom:"commenter"},]},
            {nom:'Unite de gestion',permissions:[{nom:"creer"},{nom:"modifier"},{nom:"supprimer"},{nom:"lire"},{nom:"commenter"},{nom:"signer"},]},
            {nom:'Entreprise',permissions:[{nom:"creer"},{nom:"modifier"},{nom:"supprimer"},{nom:"lire"},{nom:"commenter"},{nom:"creer checklist"},{nom:"voir checklit"}]},
          ],
          uniteeDeGestionAttributs : ['nom', 'email', 'contact', 'programmeId'],
          showModal:false,
          title:'',
          saveUpdate:{},
          permisions: [
            {nom:"creer"},
            {nom:"modifier"},
            {nom:"supprimer"},
            {nom:"lire"},
            {nom:"commenter"},
            {nom:"signer"},
            {nom:"creer checklist"},
            {nom:"lire checklist"},

          ],
          roles:{
            nom:'',
            value:[]
          }
          
      };
    },
  
    computed: {

      //importation des variables du module auths

      ...mapGetters({
        hasErrors : "GET_ERREURS",
        isLoading : "IS_LOADING",
        uniteeDeGestion: "uniteeDeGestions/getUniteeDeGestion",
        uniteeDeGestions: "uniteeDeGestions/getUniteeDeGestions",
        programmes: "programmes/getProgrammes"
      })
    },

    methods: {

      ...mapMutations({
        setErrors: 'SET_ERRORS_MESSAGE', // map `this.setErrors()` to `this.$store.commit('SET_ERRORS_MESSAGE')`,
        setUniteeDeGestion: 'uniteeDeGestions/FILL' // map `this.CREATE_INSTANCE_PROGRAMME()` to `this.$store.commit('CREATE_INSTANCE_PROGRAMME')`
      }),

      ...mapActions('uniteeDeGestions', {
        fetchUniteeDeGestions: "FETCH_LIST_UNITEE_DE_GESTION",
        saveUniteeDeGestion: "STORE_UNITEE_DE_GESTION",
        updateUniteeDeGestion: "UPDATE_UNITEE_DE_GESTION",
        deleteUniteeDeGestion: "DESTROY_UNITEE_DE_GESTION"
      }),

      ...mapActions('programmes', { fetchProgrammes: 'FETCH_LIST_PROGRAMME' }),

        addTag (newTag) {
          const tag = {
            nom: newTag,
          }
          this.options.push(tag)
          this.value.push(tag)
        },
      modifier(data) {
        this.title = "Modifier un role"
        this.showModal = true
        this.saveUpdate = data
      },
      addRole() {
        this.title='Creer un nouveau role'
        this.showCloseModal(true)
      },

      async supprimer(uniteeDeGestion) {
        if(window.confirm("Voulez-vous supprimer cette unitee de gestion  " + uniteeDeGestion.nom))
          await this.deleteUniteeDeGestion(uniteeDeGestion.id)
      },
    
      close() {
        this.showCloseModal()

        this.resetForm()
      }, 
    
      showCloseModal(value = false) {
        this.showModal = value
      },

      resetForm(){

        this.champs = this.champs.map(item => { item.data = ''; return item})
        
        window.document.getElementById('vform')?.reset()

        this.setUniteeDeGestion({})
      },

      async updateInputData(id, attribut, value) {
        
          await this.updateUniteeDeGestion({uniteeDeGestion: {[attribut] : value}, id : id}).catch((value, status) => {
            if(this.hasErrors[attribut] !== undefined)
              alert(this.hasErrors[attribut])            
          }).finally(() => {
            $('#' + "dataTable").load(location.href + '#' + id + '>*', '')
          })

      },

      sendForm() {

        this.champs = this.champs.map(item => { item.errors = []; return item})

        let uniteeDeGestion = extractFormData(this.champs, this.uniteeDeGestionAttributs)

        if(typeof uniteeDeGestion.programmeId === 'object')
          uniteeDeGestion.programmeId = uniteeDeGestion.programmeId.id

        if(this.uniteeDeGestion?.id)
        {

          this.updateProgramme({uniteeDeGestion: uniteeDeGestion, id : this.uniteeDeGestion?.id}).then(response => {
            
            if(response.status == 200 || response.status == 201){

              this.close()
            }

          })

        }
        else
        {
          
          this.saveUniteeDeGestion(uniteeDeGestion).then(response => {
            if(response.status == 200 || response.status == 201){
                this.close()
            }

          })
        }
      }
    },

    watch: {
      isLoading: function(value) {
          //this.loading = value
      },

      hasErrors: function(errors) {
        this.champs.forEach((value) => {value.errors = errors[value.key]})
        //this.errors = errors
      }

    },

    mounted() {
      
    }
  }
</script>

<style scoped>

</style>