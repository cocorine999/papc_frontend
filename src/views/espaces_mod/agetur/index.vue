<template>
  <dashboard espace="mod">
    <div class="px-4">
      <modal-top-right v-if="showModal" :title="title" v-on:close="close">
        <form action="" @submit.prevent="save" class="p-4" >
          <div class="form-group my-2">
            <div class="form-group my-2">
              <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Bailleurs <span class="px-2 text-lg font-black text-red-700">*</span></label>
              <select class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" name="" id="">
                <option value="">BM</option>
                <option value="">AFD</option>
                <option value="">BAD</option>
                <option value="">BOAD</option>
              </select>
            </div>
          </div>
          <div class="form-group my-2">
            <label class="text-xs font-semibold text-gray-500 uppercase md:text-sm block text-light">Collecteurs <span class="px-2 text-lg font-black text-red-700">*</span></label>
            <input required class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="text" placeholder="" />
          </div>
          <div class="form-group my-2">
            <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Lots <span class="px-2 text-lg font-black text-red-700">*</span></label>
            <div class="flex items-center  justify-evenly">
              <label class=""> <input  class="px-3 mx-2 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2  focus:border-transparent" name="lot" id="travaux" value="travaux" type="radio" />Travaux</label>
              <label class=""> <input  class="px-3 mx-2 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2  focus:border-transparent" name="lot" id="maitrise d'oeuvre" value="travaux" type="radio" />Maitrise d'oeuvre</label>
            </div>
          </div>
          <div class="form-group my-2">
            <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Attributaires <span class="px-2 text-lg font-black text-red-700">*</span></label>
            <input required class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="text" />
          </div>
          <div class="form-group my-2">
            <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Estimation de l'accord financement <span class="px-2 text-lg font-black text-red-700">*</span></label>
            <input required class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="text" />
          </div>
          <div class="form-group my-2">
            <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Engagements (FCFA HT) <span class="px-2 text-lg font-black text-red-700">*</span></label>
            <input required class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="text" />
          </div>
          <div class="form-group my-2">
            <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">References contrats <span class="px-2 text-lg font-black text-red-700">*</span></label>
            <input required class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="text" />
          </div>
          <div class="form-group my-2">
            <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Taux decaissement (%) <span class="px-2 text-lg font-black text-red-700">*</span></label>
            <input required class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="text" />
          </div>
        
          <div class='flex items-center justify-center gap-4 pt-5 pb-5 my-4 '>
              <button v-if="title == 'Ajouter un element'" type="submit" class='w-auto p-1 font-medium text-white  shadow-xl bg-blue-500 hover:opacity-80'> 
                <span  class="mx-2 text-sm font-semibold uppercase" v-if="loading == false">
                Enregistrer et fermer
                </span>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>

              <button v-if="title == 'Modifier une activite'" type="submit" class='w-full px-1 py-2 font-medium text-white  shadow-xl bg-blue-500 hover:opacity-80'> 
                <span  class="mx-2 text-xs font-semibold uppercase" v-if="loading == false">
                  Modifier
                </span>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>

              <button v-if="title == 'Ajouter un element'" type="submit" class='w-auto p-1 font-medium text-white  shadow-xl bg-primary hover:opacity-80'> 
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
      <nav class="mb-2 text-sm font-semibold  " aria-label="Breadcrumb">
        <div>
          <ol class="inline-flex p-0 list-none">
            <li class="flex items-center ">
              <router-link to="/dashboard" class="text-gray-600">dashboard</router-link>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
            </li>

            <li class="flex items-center text-blue-500 ">
              <router-link to="" class="">collecteur</router-link>
            </li>
          </ol>
        </div> 
      </nav>
      <div class="flex items-center justify-between mt-2 mb-8">
        <div class="flex space-x-4">
          <span  class="inline-block cursor-pointer  text-lg uppercase  border-b-8 font-bold  border-primary py-2">Tableau recapitulatif </span>
        </div>
        
        <button  @click="createTable" title="ajouter un tabelau"  class="p-2 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase rounded bg-primary focus:outline-none focus:shadow-outline">
          <span><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM17 11h-4v4h-2v-4H7V9h4V5h2v4h4v2z"></path></svg></span>
          <span class="mx-2 text-sm font-semibold">Ajouter un tableau recapitulatif</span>
        </button>
        
      </div>
      <div class="my-3 flex items-center space-x-3" >
        <button  title="exporter en excel"   class="p-2 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase rounded bg-primary focus:outline-none focus:shadow-outline">
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path d="M11 16h2V7h3l-4-5-4 5h3z"></path><path d="M5 22h14c1.103 0 2-.897 2-2v-9c0-1.103-.897-2-2-2h-4v2h4v9H5v-9h4V9H5c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2z"></path></svg>
          <span class="mx-2 text-sm font-semibold">Export Excel</span>
        </button>

        <button  title="exporter en excel"   class="p-2 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase rounded bg-primary focus:outline-none focus:shadow-outline">
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path d="M11 16h2V7h3l-4-5-4 5h3z"></path><path d="M5 22h14c1.103 0 2-.897 2-2v-9c0-1.103-.897-2-2-2h-4v2h4v9H5v-9h4V9H5c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2z"></path></svg>
          <span class="mx-2 text-sm font-semibold">Export Excel</span>
        </button>
      </div>
      <div class="align-middle inline-block w-full bg-white overflow-x-auto pt-3 rounded-bl-lg rounded-br-lg">
        <table class="w-full">
          <thead>
            <tr>
              <th class="p-3 border border-gray-500 text-left  whitespace-nowrap leading-4 text-primary tracking-wider" >Bailleurs</th>
              <th class="p-3 border border-gray-500 text-left  whitespace-nowrap leading-4 text-primary tracking-wider">Collecteurs</th>
              <th class="p-3 border border-gray-500 text-left  whitespace-nowrap leading-4 text-primary tracking-wider">Lots</th>
              <th class="p-3 border border-gray-500 text-left  whitespace-nowrap leading-4 text-primary tracking-wider">Attributaires</th>
              <th class="p-3 border border-gray-500 text-left  whitespace-nowrap leading-4 text-primary tracking-wider">Estimations de l'accord de financement</th>
              <th class="p-3 border border-gray-500 text-left  whitespace-nowrap leading-4 text-primary tracking-wider">Engagment</th>
              <th class="p-3 border border-gray-500 text-left  whitespace-nowrap leading-4 text-primary tracking-wider">Reference contrats</th>
              <th class="p-3 border border-gray-500 text-left  whitespace-nowrap leading-4 text-primary tracking-wider">Taux de decaissement(%) </th>
              <th class="p-3 border border-gray-500 text-left  whitespace-nowrap leading-4 text-primary tracking-wider">Commentaires </th>
              <th class="p-3 border border-gray-500 text-center  whitespace-nowrap leading-4 text-primary tracking-wider">Actions</th>
            </tr>
          </thead>
           <!--Il s'agit d'un tableau decomposé alors filter vos donnée avant de 'integretrer par bailleur' -->
          <tbody class="bg-white">
             <!--Specifier le nombre de ligne +1 de la table -->
            <tr>
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs" rowspan="6" >BM</td>
            </tr>
            <tr v-for="i in 5" :key="i.id">
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs">Collecteur{{i}} </td>
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs">lot</td>
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs">Attritubaire</td>
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs">Estimations</td>
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs">Engagment</td>
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs">Reference</td>
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs">taux</td>
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs">
                <span v-if="showInput">Commentaires</span>
                <input v-if="!showInput" type="text" class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent">
              </td>
              <td class="p-3 whitespace-no-wrap text-center border border-gray-500 text-xs  leading-5">
                <div class="flex item-center justify-center">
                  <!-- <div title="details"  class="cursor-pointer w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div> -->
                  <button @click="showInput=true" v-if="!showInput" class="text-xs px-3 py-1 bg-green-500 text-white">Enregistrer</button>
                  <div v-if="showInput" class="w-4 mr-2 transform hover:text-blue-500 hover:scale-110"  @click="editer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  <div v-if="showInput"  class="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </div>
                </div>      
              </td>
            </tr> 
            <!--Specifier le nombre de ligne +1 de la table -->
            <tr>
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs" rowspan="6" >BEI</td>
            </tr>
            <tr v-for="i in 5" :key="i.id">
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs">Collecteur</td>
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs">lot</td>
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs">Attritubaire</td>
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs">Estimations</td>
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs">Engagment</td>
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs">Reference</td>
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs">taux</td>
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs">Commentaires</td>
              <td class="p-3 whitespace-no-wrap text-center border border-gray-500 text-xs  leading-5">
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
            <tr>
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs" rowspan="6" >BID</td>
            </tr>
            <tr v-for="i in 5" :key="i.id">
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs">Collecteur</td>
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs">lot</td>
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs">Attritubaire</td>
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs">Estimations</td>
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs">Engagment</td>
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs">Reference</td>
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs">taux</td>
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs">Commentaires</td>
              <td class="p-3 whitespace-no-wrap text-center border border-gray-500 text-xs  leading-5">
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
import Dashboard from '@/layouts/Dashboard'
export default {
  components: {
    Dashboard,
    SearchBar,
    ModalTopRight
  },
  data() {
    return {
      showModal:false,
      loading:false,
      seeAgetur:true,
      seeFileManager:false,
      showInput:true,
      uploadFile:false,
      title:'',
      dataTable:[
        {baileur:'BM'},
        {baileur:'AFD'},
        {baileur:'BAD'},
        {baileur:'BOAD'},
        {baileur:'BEI'},
      ]
    }
    
  },
  methods: {
    createTable() {
      this.title = 'Ajouter un element'
      this.showModal = true
    },
    
    gotoTable() {
      this.seeFileManager = false
      this.seeAgetur = true
    },
    gotoFileManager() {
      this.seeFileManager = true
      this.seeAgetur = false
    },
    editer() {
      this.showInput = false
    },
    close() {
      this.showModal = false
    },
    
  }
}
</script>

<style>

</style>