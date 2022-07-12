<template>
  <dashboard>
    <div class="p-4">
    <div v-if="showModal2">
      <modal-top-right  :title="title"  v-on:close="showModal2 = false">
        <form action="" @submit.prevent="save" class="px-12" style="width:50vw !important" >
          <div class="grid grid-cols-1 gap-5 ">
            <div class="grid grid-cols-1">
              <label class="text-xs font-semibold block text-gray-500 uppercase md:text-sm text-light">libelle <span class="px-2 text-lg font-black text-red-700">*</span></label>
              <input required  v-model="libelle" class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2  focus:border-transparent" type="text" placeholder="Entrer le libelle " />
            </div>

            <div class="grid grid-cols-1">
              <label class="text-xs font-semibold block text-gray-500 uppercase md:text-sm text-light">Description <span class="px-2 text-lg font-black text-red-700">*</span></label>
              <textarea name="" id="" v-model="description" class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2  focus:border-transparent"  rows="5"></textarea>
            </div>
            
          </div>
          <div class="my-3 flex justify-center space-x-3 ">
            <button  type="submit" class='w-auto px-4 py-2 font-medium text-white  shadow-xl bg-blue-500 hover:opacity-80'> 
              <span  class="mx-2 text-sm font-semibold uppercase" v-if="loading == false">
              Enregistrer et fermer
              </span>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>

          <button type="submit" class='w-auto px-4 py-2 font-medium text-white  shadow-xl bg-primary hover:opacity-80'> 
            <span  class="mx-2 text-sm font-semibold uppercase" v-if="loading == false">
              Enregistrer et ajouter
            </span>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          </div>

        
        </form>
      </modal-top-right>
    </div>
    <nav class="mb-2 text-sm font-semibold flex justify-between items-center " aria-label="Breadcrumb">
      <div>
        <ol class="inline-flex p-0 list-none">
          <li class="flex items-center ">
            <router-link to="/dashboard" class="text-gray-600">dashboard</router-link>
            <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
          </li>
          
          <li class="flex items-center text-blue-500 ">
            <router-link to="" class="">categories</router-link>
          </li>
        </ol>
      </div>
      <div>
        <search-bar ></search-bar>
      </div>
    </nav>
    
    <div class="my-8 flex justify-between items-center ">
      <titre>les categories</titre>
      <button  @click="addCateg" title="ajouter une activite"   class="py-2 px-4  overflow-hidden flex items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
        <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg></span>
        <span class="mx-2 text-sm font-semibold">ajouter une categorie</span>
      </button>
    </div>


    
    <div class="align-middle inline-block w-full  overflow-hidden  pt-3 rounded-bl-lg rounded-br-lg">
      <table class="w-full">
        <thead>
          <tr>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">#</th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Nom</th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Description</th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-center text-sm leading-4 text-primary tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="(item, i) in unites" :key="i">
            
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500"> {{i+1}} </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{{item.libelle}}</td>
            <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{{item.description}}</td>

            
            <td class="px-6 py-4 whitespace-no-wrap text-center border-b border-gray-500 text-sm leading-5">
              <div class="flex item-center justify-center">
                <!-- <div title="details"  class="cursor-pointer w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div> -->
                
                <div class="w-4 mr-2 transform hover:text-blue-500 hover:scale-110"  @click="editer">
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
  </dashboard>
</template>

<script>
import ModalTopRight from '@/components/ModalTopRight'
import SearchBar from '@/components/SearchBar'
import Titre from '@/components/Titre'
import Vmodal from '@/components/Vmodal'
import Dashboard from '@/layouts/Dashboard'
export default {
  components: {
    Dashboard,
    Vmodal,
    Titre,
    SearchBar,
    ModalTopRight
  },
    data() {
      return ({
        
        showModal2:false,
        title:'',
        libelle:'',
        description:'',
        loading:false,
        form: [],
        unites : [
          {libelle: "categ1",description: "description 1",},
          {libelle: "categ2",description: "description 2",},
          {libelle: "categ3",description: "description 3",},
          {libelle: "categ4",description: "description 4",},
          {libelle: "categ5",description: "description 5",},
        ],
        
      });
    },
    mounted() {
    },
    methods: {
      save() {
        this.unites.push({libelle:libelle,description:description})
        this.showModal2 = false
      },
      addCateg() {
        this.showModal2 = true
        this.title = 'Ajouter une categorie'
        
      },
      editer() {
        this.showModal2 = true
        this.title = 'Modifier une categorie'
      }
    }
}
</script>

<style scoped>

</style>