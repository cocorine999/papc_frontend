<template>
  <dashboard>
    <div class="w-full">
 
      <modal-top-right v-if="showModal" :title="title" v-on:close="close">
        <form action="" @submit.prevent="createObjectif" class="p-3 w-full" >
          <div class="form-group my-2">
            <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Nom <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
            <input  v-model="objectif.nom" required class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="text" />
          </div>
          
          
          <div class="form-group my-2">
            <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Projets <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
            <multiselect v-model="objectif.projetId" :options="projets" :custom-label="customLabel" :preselect-first="true" placeholder="selectionnez un projet" label="nom" track-by="id"></multiselect>
          </div>

          <div>
            <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Description <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
            <textarea name="" v-model="objectif.description" id="" class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" rows="3"></textarea>
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
      </modal-top-right>
      <nav class="mb-2 mt-4 text-sm font-semibold flex justify-between items-center 	" aria-label="Breadcrumb">
        <div>
          <ol class="inline-flex p-0 list-none">
            <li class="flex items-center ">
              <router-link to="#" class="text-gray-600">dashboard</router-link>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
            </li>
            
            <li class="flex items-center text-blue-500 ">
              <router-link to="" class="">objectif specifique</router-link>
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
    
      <div class="my-2 flex justify-between items-center ">
      
        <titre>Objectif specifique</titre>
        <button  @click="addObjectif" title="ajouter un objectif"   class="py-2 px-4  overflow-hidden flex items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
          <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg></span>
          <span class="mx-2 text-xs  md:text-sm font-semibold">ajouter un objectif </span>
        </button>
      </div>

      <div class="align-middle inline-block w-full  overflow-hidden  pt-3 rounded-bl-lg rounded-br-lg">
        <table class="w-full p-4">
          <thead>
            <tr>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">#</th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Nom</th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Description</th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Projet</th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Date creation</th>
             
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr v-for="(objectif, i) in objectifSpecifique" :key="i">
              
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500"> {{i+1}} </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{{objectif.nom}}</td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{{objectif.description}}</td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{{objectif.projet.nom}}</td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{{objectif.created_at}}</td>

            </tr>              
          </tbody>
        </table>
      </div>
    </div>
  </dashboard>
</template>

<script>
import ModalTopRight from '@/components/ModalTopRight'
import SearchBar from '@/components/SearchBar'
import Titre from '@/components/Titre'
import Vmodal from '@/components/Vmodal'
import Vform from '@/components/Vform'
import Dashboard from '@/layouts/Dashboard'
import Multiselect from 'vue-multiselect'
import { mapGetters, mapMutations, mapActions } from "vuex"
import Vbutton from '@/components/Vbutton'
import objectifSpecifiqueService from "@/services/modules/objectif.specifique.service.js";
import ProjetService from "@/services/modules/projet.service.js";
export default {
  components: {
    Dashboard,
    Vmodal,
    Titre,
    SearchBar,
    ModalTopRight,
    Vform,
    Multiselect,
    Vbutton
  },
  data() {
      return ({
        showModal:false,
        objectif:{
        nom:'',
        description:'',
        projetId:''
      },
      projets:[],
      chargement:false,
      objectifSpecifique:[],
      });
    },
    computed: {
    ...mapGetters({
      currentUser: "auths/GET_AUTHENTICATE_USER",
    }),
  },
  methods: {
    addObjectif() {
      this.title = 'Ajouter'
      this.showModal = true
    },
    createObjectif() {
        if(this.chargement == false) {
          this.chargement = true
          const data = this.objectif
          data.projetId = data.projetId.id
          const formData = new FormData();
          formData.append('nom', data.nom)
          formData.append('description', data.description)
          formData.append('projetId', data.projetId)
         
          
          objectifSpecifiqueService.create(formData).then((data) => {
            this.chargement = false
            this.$toast.success('nouveau element')
            this.showModal = false
            this.getObjectif()
            this.objectif.nom = ''
            this.objectif.description =''
          
            this.audit.projetId = null
           
          }).catch((e) => {
            this.chargement = false  
            this.$toast.error(e)
          })
        }
    },
    getProjet() {
      ProjetService.get().then((data) => {
        this.projets = data.data.data
      }).catch((e) => {
        console.log(e)
      })
    },
    getObjectif() {
      objectifSpecifiqueService.get().then((data) => {
        this.objectifSpecifique = data.data.data
      }).catch((e) => {
        console.log(e)
      })
    },

    close() {
      this.showModal = false
    },

  },

 
  mounted() {
   this.getObjectif()
   this.getProjet()
   
  },

}
</script>

<style scoped>

</style>