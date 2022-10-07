<template>
  <div class="w-full px-4">
    
    <nav class="mb-2 mt-4 text-sm font-semibold flex justify-between items-center 	" aria-label="Breadcrumb">
      <div>
        <ol class="inline-flex p-0 list-none">
          <li class="flex items-center ">
            <router-link to="/dashboard" class="text-gray-600">dashboard</router-link>
            <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
          </li>

          <li class="flex items-center text-blue-500 ">
            <router-link to="" class="">ppm</router-link>
          </li>
        </ol>
      </div>
      <div>
        <search-bar ></search-bar>
      </div>
    </nav> 
    
    <div class="flex space-x-4">
      <span :class="{'border-primary border-b-8 font-bold':seeActivite}" @click="gotoActivite()" class="inline-block cursor-pointer  text-base uppercase    border-primary py-2">Activités</span>
      <span :class="{'border-primary border-b-8 font-bold':seePlan}" @click="gotoPlan()" class="inline-block cursor-pointer text-lg uppercase  py-2">Plan d'ecaissement </span>
      <span :class="{'border-primary border-b-8 font-bold':seeSuivi}" @click="gotoSuivi()" class="inline-block cursor-pointer text-lg uppercase  py-2">Le suivi evaluation </span>
    </div>
   
    <div v-if="seeActivite">
     
      <div   class="line my-4">
        <div class="align-middle inline-block w-full  overflow-hidden  pt-3 rounded-bl-lg rounded-br-lg">
          <table class="w-full">
            <thead>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider"># </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Activité </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Description </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">BN </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">EPM-PRET</th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">poids</th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Structure resp</th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Structure assoc</th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">status</th>
            </thead>
            <tbody>
              <tr class="bg-white" v-for="(i,index) in 10" :key="index">
                <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  "> {{i}} </td>
                <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  ">activité {{index}} </td>
                <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  ">Lorem ipsum dolor sit amet </td>
                <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  ">100M </td>
                <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  ">1000M </td>
                <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  "> {{i*5}} </td>
                <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  "> Structure resp {{index}} </td>
                <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  "> Structure assoc {{index}} </td>
                <td class=" px-2 py-4 whitespace-no-wrap border-b border-gray-500 ">
                  <span class="bg-green-500 p-1 rounded-md text-white font-semibold px-2  text-xs">en cours</span>
                </td>
               
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div v-if="seePlan">
      
      <div  class="line my-4">
        <div class="align-middle inline-block w-full  overflow-hidden  pt-3 rounded-bl-lg rounded-br-lg">
          <table class="w-full">
            <thead>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider"># </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Année </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Trimestre </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Activité </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">BN </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">EPM-PRET</th>
            

              
            </thead>
            <tbody>
              <tr class="bg-white" v-for="(i,index) in 4" :key="index">
                <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  "> {{i}} </td>
                <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  "> {{2018 +index}} </td>
                <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  "> trimestre {{index}} </td>
                <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  "> activité {{index}} </td>
                <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  ">100M </td>
                <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  ">1000M </td>
               
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div v-if="seeSuivi">
        <div class="align-middle inline-block w-full  overflow-hidden  pt-3 rounded-bl-lg rounded-br-lg">
          <table class="w-full">
            <thead>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider"># </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Activité </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Description </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">BN </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">EPM-PRET</th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">poids</th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Structure resp</th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Structure assoc</th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">status</th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Actions</th> 
            </thead>
            <tbody>
              <tr class="bg-white" v-for="(i,index) in 10" :key="index">
                <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  "> {{i}} </td>
                <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500 ">
                  <span v-if="showInput" >activité {{index}} </span>
                  <input v-if="!showInput" type="text" class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent">
                  
                  
                </td>
                <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  ">
                  <span v-if="showInput"> Lorem ipsum dolor sit amet </span>
                   <input v-if="!showInput" type="text" class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent">
                  </td>
                <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  ">
                  <span v-if="showInput"> 100M</span>
                   <input v-if="!showInput" type="text" class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent">
                </td>
                <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  ">
                  <span v-if="showInput">1000M </span>
                   <input v-if="!showInput" type="text" class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent">
                </td>
                <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  "> 
                  <span v-if="showInput"> {{i*5}}</span>
                 
                   <input v-if="!showInput" type="text" class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent">
                </td>
                <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  ">
                  <span v-if="showInput"> Structure resp {{index}}</span>
                  
                   <input v-if="!showInput" type="text" class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent">
                </td>
                <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  "> 
                  <span v-if="showInput">Structure assoc {{index}}</span>
                   <input v-if="!showInput" type="text" class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent">
                </td>
                <td class=" px-2 py-4 whitespace-no-wrap border-b border-gray-500 ">
                  <span v-if="showInput" class="bg-green-500 p-1 rounded-md text-white font-semibold px-2  text-xs">en cours</span>
                  <select v-else  @change="isStateChange = false" class="outine-none" name="" id="">
                      <option value="">cree</option>
                      <option value="">en attente</option>
                      <option value="">en cours</option>
                      <option value="">en terminer</option>
                    </select>
                </td>
                <td class="px-2 py-4 whitespace-no-wrap text-center border-b border-gray-500 text-sm leading-5">
                  <div class="flex item-center justify-center">
                      <!-- <div title="details"  class="cursor-pointer w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div> -->
                      
                      <button @click="showInput = true" v-if="!showInput" class="text-sm bg-green-500 px-2 py-1 text-white outline-none">enregistrer</button>
                      <div v-if="showInput" class="w-4 mr-2 transform hover:text-blue-500 hover:scale-110"  @click="editerSuivi()">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </div>
                      <div  v-if="showInput" class="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
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
</template>

<script>
export default {
  layout:'dashboard',
  data() {
    return {
      showModal:false,
      showModal2:false,
      loading:false,
      line:false,
      mosaique:true,
      showInput:true,
      isStateChange:false,
      seePlan:false,
      seeActivite:true,
      seeSuivi:false,
      option:[
        
        {name:"supprimer"},
        {name:"modifier"},
        {name:"dupliquer"},
       
      ],
      optionActivite:[
        {name:"Voir plan decaissement"},
        {name:"supprimer"},
        {name:"modifier"},
        {name:"dupliquer"},
        {name:"continuer"},
      ],
      dates:[
        {}
      ],
     
    }
    
  },
  methods: {
    gotoActivite() {
      this.seePlan = false
      this.seeActivite = true
      this.seeSuivi = false
    },
    gotoPlan() {
      this.seePlan = true
      this.seeActivite = false
      this.seeSuivi = false
    },
    gotoSuivi() {
      this.seeSuivi = true
      this.seePlan = false
      this.seeActivite = false
    },
    addDate() {
      this.dates.push({})
    },
    
    switch1() {
      this.mosaique = true
      this.line = false
    },
    switch2() {
      this.mosaique = false
      this.line = true
    },
    close() {
      this.showModal = false
    },
    close2() {
      this.showModal2 = false
    },
    addPlan() {
      this.title ="Ajouter un plan decaissement"
      this.showModal2 = true
    },
    modifierPlan() {
      this.title ="Modifier un plan de decaissement"
      this.showModal2 = true
    },
    dupliquerPlan() {
      this.title ="Dupliquer un plan decaissement"
      this.showModal2 = true
    },
    addActivite() {
      this.title ="Ajouter une activité"
      this.showModal = true
    },
    modifier() {
      this.title ="Modifier une activité"
      this.showModal = true
    },
    dupliquer() {
      this.title ="Dupliquer une activité"
      this.showModal = true
    },
    gotoNext() {
      this.$router.push('/dashboard/projets/composantes/sous-composantes/activites/taches')
    },
    editerSuivi() {
      this.showInput = false
      
    }
  }
}
</script>

<style>

</style>