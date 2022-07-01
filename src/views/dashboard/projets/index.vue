<template>
  <div class="w-full p-4">
    <div v-if="showModal">
      <modal-top-right :title="title" v-on:close="close">
        <form class="p-4"  @submit.prevent="sender" >
          <div class="form-group my-2">
            <label class="text-xs font-semibold block text-gray-500 uppercase md:text-sm text-light">Nom projet <span class="px-2 text-lg font-black text-red-700">*</span></label>
            <input required v-model="form[0].value" class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2 w-full focus:border-transparent" type="text" placeholder="Entrer le nom du projet" />
          </div>
          <div class="form-group my-2">
            <label class="text-xs font-semibold block text-gray-500 uppercase md:text-sm text-light">Description <span class="px-2 text-lg font-black text-red-700">*</span></label>
            <input required v-model="form[1].value" class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2 w-full  focus:border-transparent" type="text" placeholder="Description" />
          </div>
          <div class="form-group my-2">
            <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Ville <span class="px-2 text-lg font-black text-red-700">*</span></label>
            <select v-model="form[2].value" name="" id="" class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2 w-full  focus:border-transparent">
              <option v-for="(item, i) in communes" :key="i" :value="item">{{item}}</option>
            </select>
          </div>
          <div class="form-group my-2">
            <label class="text-xs font-semibold block text-gray-500 uppercase md:text-sm text-light">Poids <span class="px-2 text-lg font-black text-red-700">*</span></label>
            <input required v-model="form[3].value" class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2 w-full  focus:border-transparent" type="number" placeholder="Poids du projet" />
          </div>
          <div class="form-group my-2">
            <label class="text-xs font-semibold block text-gray-500 uppercase md:text-sm text-light">Couleurs <span class="px-2 text-lg font-black text-red-700">*</span></label>
            <input required v-model="form[4].value" class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2 w-full  focus:border-transparent" type="color" placeholder="" />
          </div>
          <div class="form-group my-2">
            <label class="text-xs font-semibold text-gray-500  block uppercase md:text-sm text-light">Bailleurs <span class="px-2 text-lg font-black text-red-700">*</span></label>
            <select v-model="form[5].value" name="" id="" class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2 w-full  focus:border-transparent">
              <option v-for="(item, i) in options" :key="i" :value="item.id">{{item.nom}}</option>
            </select>
          </div>
          <div class="form-group my-2">
            <label class="text-xs font-semibold block text-gray-500 uppercase md:text-sm text-light">Montant (budget nationnal) <span class="px-2 text-lg font-black text-red-700">*</span></label>
            <input required v-model="form[6].value" class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2 w-full  focus:border-transparent" type="number" placeholder="Montant BN" />
          </div>
          <div class="form-group my-2">
            <label class="text-xs font-semibold block text-gray-500 uppercase md:text-sm text-light">Montant (EPM pret) <span class="px-2 text-lg font-black text-red-700">*</span></label>
            <input required v-model="form[7].value" class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2 w-full  focus:border-transparent" type="number" placeholder="Montant EPM pret" />
          </div>
          <div class="form-group my-2">
            <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Status <span class="px-2 text-lg font-black text-red-700">*</span></label>
            <select v-model="form[8].value" class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2 w-full  focus:border-transparent">
              <option value="en cours">en cours</option>
              <option value="en terminer">en terminer</option>
            </select>
          </div>
          <!-- <div class="form-group my-2">
            <label class="text-xs font-semibold block text-gray-500 uppercase md:text-sm text-light">Piece jointe <span class="px-2 text-lg font-black text-red-700">*</span></label>
            <input required class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2 w-full  focus:border-transparent" type="file" placeholder="uploader un ficher" />
          </div> -->
          <div class="grid grid-cols-2 gap-2" v-for="date in dates" :key="date.id">
            <div class="form-group my-2">
              <label class="text-xs font-semibold block text-gray-500 uppercase md:text-sm text-light">Date debut<span class="px-2 text-lg font-black text-red-700">*</span></label>
              <input required v-model="form[9].value" class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2 w-full  focus:border-transparent" type="date" />
            </div>
            <div class="form-group my-2">
              <label class="text-xs font-semibold block text-gray-500 uppercase md:text-sm text-light">Date fin <span class="px-2 text-lg font-black text-red-700">*</span></label>
              <div class="flex space-x-2 items-center">
                <input required v-model="form[10].value" class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2 w-full  focus:border-transparent" type="date"  />
                <span title="ajouter une nouvelle date" @click="addDate" class="text-primary"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"></path></svg></span>
              </div>
            </div>
          </div>
          <div class='flex items-center justify-center  gap-4  my-2 md:gap-2'>
            <button v-if="title == 'Ajouter un nouveau projet' || title== 'Dupliquer projet existant' " type="submit" class='w-auto px-1 py-2 font-medium text-white  shadow-xl bg-blue-500 hover:opacity-80'> 
              <span  class="mx-2 text-xs font-semibold uppercase" v-if="loading == false">
              Enregistrer et fermer
              </span>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>

            <button v-if="title == 'Modifier un nouveau projet'  " type="submit" class='w-auto px-1 py-2 font-medium text-white  shadow-xl bg-blue-500 hover:opacity-80'> 
              <span  class="mx-2 text-xs font-semibold uppercase" v-if="loading == false">
                Modifier
              </span>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>

            <button v-if="title == 'Ajouter un nouveau projet' || title== 'Dupliquer projet existant' " type="submit" class='w-auto p-1 py-2 font-medium text-white  shadow-xl bg-primary hover:opacity-80'> 
              <span  class="mx-2 text-xs font-semibold uppercase" v-if="loading == false">
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
          <li class="flex items-center text-blue-500">
            <nuxt-link to="/dashboard" class="text-gray-600">dashboard</nuxt-link>
            <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
          </li>
          <li class="flex items-center text-blue-500 ">
            <nuxt-link to="/dasboard/projet" class="">projets</nuxt-link>
          </li>
        </ol>
      </div>
      <div>
        <search-bar ></search-bar>
      </div>
    </nav> 
    <div class="flex justify-start mt-2">
      <div class="flex  items-center ">
       <span title="vue en mosaique" @click="switch1" :class="{'border-2':mosaique}" class="p-2  cursor-pointer border-gray-500 text-gray-700 hover:text-gray-500"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.8em" width="1.8em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M3 5v14a2 2 0 002 2h6V3H5a2 2 0 00-2 2zm16-2h-6v8h8V5c0-1.1-.9-2-2-2zm-6 18h6c1.1 0 2-.9 2-2v-6h-8v8z"></path></svg></span>
        <span title="vue en ligne" @click="switch2" :class="{'border-2':line}" class="p-2 text-gray-700 border-gray-500 cursor-pointer hover:text-gray-500 "><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.8em" width="1.8em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M3 14h4v-4H3v4zm0 5h4v-4H3v4zM3 9h4V5H3v4zm5 5h13v-4H8v4zm0 5h13v-4H8v4zM8 5v4h13V5H8z"></path></svg></span>
      </div>
    </div>
    <div class="flex items-center justify-between my-2">
      <div class="flex space-x-4">
        <span :class="{'border-primary border-b-8 font-bold':seeProjet}" @click="gotoProjet()" class="inline-block cursor-pointer  text-lg uppercase    border-primary py-2">Les projets </span>
        <span :class="{'border-primary border-b-8 font-bold':seeStatistique}" @click="gotoStatistique()" class="inline-block cursor-pointer text-lg uppercase  py-2">Statistiques </span>
      </div>
      
        <button @click="addProjet" v-if="seeProjet" title="ajouter un projet"   class="p-2 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase rounded bg-primary focus:outline-none focus:shadow-outline">
          <span><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM17 11h-4v4h-2v-4H7V9h4V5h2v4h4v2z"></path></svg></span>
          <span class="mx-2 text-sm font-semibold">ajouter</span>
        </button>
    </div>
    <div v-if="seeProjet">
      <div v-if="mosaique" class="grid grid-cols-1 my-4 lg:grid-cols-3 md:grid-cols-2 sm:gap-5">
        <div v-for="(item, i) in list" :key="i">
          <card :color="item.couleur">
            <div  class=" p-2">
              <div class="flex justify-between items-center p-2">
                <div class="flex space-x-2 items-center" >
                  <h1 @click.stop="gotoNext" class="cursor-pointer font-base font-bold text-gray-900">{{item.nom}}</h1>
                </div>
                <div>
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
                </div>
              </div>
              <div class="border-b border-gray-300 relative">
                <p class="text-justify p-2 font-semibold leading-6 text-sm my-2">{{item.description}}</p>
                <div class="absolute bottom-0 right-0">
                  <span v-if="!isStateChange" @click.stop="isStateChange = true" class="text-white cursor-pointer bg-green-500  p-1">{{item.statut}}</span>
                  <select v-else  @change.stop="isStateChange = false" class="outine-none" name="" id="">
                    <option value="">cree</option>
                    <option value="">en attente</option>
                    <option value="">en cours</option>
                    <option value="">en terminer</option>
                  </select>
                </div>
              </div>
              
             
              <div class="my-2 p-2">
                <p class="text-sm font-semibold py-1 flex justify-between items-center"> 
                  <span class="font-bold  ">Montant BM :</span> 
                  <span class="text-gray-700">{{item.budgetNational}}</span> 
                </p>
                <p class="text-sm font-semibold py-1 flex justify-between items-center"> 
                  <span class="font-bold">Montant EPM-PRET :</span> 
                  <span class="text-gray-700">{{item.pret}}</span>
                 </p>
                <div class="text-sm font-semibold py-1 flex justify-between items-center">
                  <span class="font-bold pr-2">Durée :</span> 
                  <p><span class="text-white bg-primary p-1 text-sm">{{item.debut[0]}}</span> Au   
                  <span class="text-white border bg-primary p-1 text-sm">{{item.fin[0]}} </span></p>  
                </div>
                <p class="text-sm font-semibold py-1 flex justify-between items-center "> 
                  <span class="font-bold">Ville :</span> 
                  <span class="text-gray-700">{{item.ville}}</span>
                </p>
            </div>
            </div>
            
          </card>
        </div>
      </div>
      <div v-if="line"  class="line my-4">
        <div class="align-middle inline-block w-full  overflow-hidden  pt-3 rounded-bl-lg rounded-br-lg">
          <table class="w-full">
            <thead>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider"># </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Projets/Bailleurs </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Description </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Pays </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">BN </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">EPM-PRET</th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">status</th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Date</th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Actions</th> 
            </thead>
            <tbody>
              <tr class="bg-white" v-for="(item, i) in list" :key="i">
                <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  "> {{i}} </td>
                <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  ">{{item.nom}}</td>
                <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  ">{{item.description}}</td>
                <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  ">{{item.ville}} </td>
                <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  ">{{item.budgetNational}} </td>
                <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  ">{{item.pret}} </td>
                <td class=" px-2 py-4 whitespace-no-wrap border-b border-gray-500 ">
                  <span class="bg-green-500 p-1 rounded-md text-white font-semibold px-2  text-xs">{{item.statut}}</span>
                  
                  </td>
                <td class=" px-2 py-4 whitespace-no-wrap border-b border-gray-500  ">{{item.debut[0]}} à {{item.fin[0]}} </td>
                <td class=" px-2 py-4 whitespace-no-wrap border-b border-gray-500 "> 
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
    </div>
    <div v-if="seeStatistique">
      <div class="">
        <select class="px-11 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2  focus:border-transparent" name="" id="">
          <option class="font-semibold"> Tous </option>
          <option class="font-semibold"  v-for="i in 5" :key="i.id" value=""> projet {{i}} </option>
        </select>
      </div>
      <div class="grid grid-cols-2 gap-8 my-6">
        <div>
          <apexchart width="80%" type="polarArea" :options="chartOptions" :series="chartOptions.series"></apexchart>
        </div>
         <div>
          <apexchart type="bar" height="350" :options="chartOptionsExBar" :series="series"></apexchart>
        </div>
        
        <div>
          <apexchart width="80%" type="polarArea" :options="chartOptionsFi" :series="chartOptionsFi.series"></apexchart>
        </div>
       
        <div>
          <apexchart type="bar" height="350" :options="chartOptionsFiBar" :series="series"></apexchart>
        </div>
      </div>
    </div>
    
    
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  modules: ['@nuxtjs/axios'],
  computed: {
      ...mapState(['baseURL', 'communes'])
  },
  layout:'dashboard',
  data() {
    return {
      showModal:false,
      loading:false,
      line:false,
      mosaique:true,
      isStateChange:false,
      seeProjet:true,
      seeStatistique:false,
      dates:[
        {}
      ],
      colors:[
        {color:' bg-yellow-500'},
        {color:' bg-red-500'},
        {color:' bg-blue-500'},
        {color:' bg-purple-500'},
        {color:' bg-pink-500'},
      ],
      option:[
        {name:'details'},
        {name:'supprimer'},
        {name:'modifier'},
        {name:'dupliquer'},
        {name:'continuer'},
      ],
     
     chartOptions: {
        series: [44, 55],
        colors: ['#4fd1c9', '#f7bb03'],
        labels: ["Executé","Non executé"],
        title: {
          text: "STATISTIQUE DU TAUX EXECUXION",
          align: 'left',
          style: {
            fontSize:  '18px',
          },
        },
        chart: {
          type: 'polarArea',
          stacked: true,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        
        stroke: {
          colors: ['#fff']
        },
        fill: {
          opacity: 0.8
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
      chartOptionsFi: {
        series: [44, 55],
        colors: ['#4f46e5', '#059669'],
        labels: ["Utilisé","Non utilisé"],
        title: {
          text: "STATISTIQUE TAUX FINANCIER",
          align: 'left',
          style: {
            fontSize:  '18px',
          },
        },
        chart: {
          type: 'polarArea',
          stacked: true,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        
        stroke: {
          colors: ['#fff']
        },
        fill: {
          opacity: 0.8
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
      series: [{
        name: 'Inflation',
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
      }],
      chartOptionsExBar: {
            chart: {
              height: 350,
              type: 'bar',
            },
            plotOptions: {
              bar: {
                borderRadius: 10,
                dataLabels: {
                  position: 'top', // top, center, bottom
                },
              }
            },
            dataLabels: {
              enabled: true,
              formatter: function (val) {
                return val + "%";
              },
              offsetY: -20,
              style: {
                fontSize: '12px',
                colors: ["#304758"]
              }
            },
            
            xaxis: {
              categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
              position: 'top',
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false
              },
              crosshairs: {
                fill: {
                  type: 'gradient',
                  gradient: {
                    colorFrom: '#D8E3F0',
                    colorTo: '#BED1E6',
                    stops: [0, 100],
                    opacityFrom: 0.4,
                    opacityTo: 0.5,
                  }
                }
              },
              tooltip: {
                enabled: true,
              }
            },
            yaxis: {
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false,
              },
              labels: {
                show: false,
                formatter: function (val) {
                  return val + "%";
                }
              }
            
            },
            title: {
              text: "Taux execution du projet",
              floating: true,
              offsetY: 330,
              align: 'center',
              style: {
                color: '#444'
              }
            }
      },
      chartOptionsFiBar: {
            chart: {
              height: 350,
              type: 'bar',
            },
            plotOptions: {
              bar: {
                borderRadius: 10,
                dataLabels: {
                  position: 'top', // top, center, bottom
                },
              }
            },
            dataLabels: {
              enabled: true,
              formatter: function (val) {
                return val + "%";
              },
              offsetY: -20,
              style: {
                fontSize: '12px',
                colors: ["#304758"]
              }
            },
            
            xaxis: {
              categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
              position: 'top',
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false
              },
              crosshairs: {
                fill: {
                  type: 'gradient',
                  gradient: {
                    colorFrom: '#D8E3F0',
                    colorTo: '#BED1E6',
                    stops: [0, 100],
                    opacityFrom: 0.4,
                    opacityTo: 0.5,
                  }
                }
              },
              tooltip: {
                enabled: true,
              }
            },
            yaxis: {
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false,
              },
              labels: {
                show: false,
                formatter: function (val) {
                  return val + "%";
                }
              }
            
            },
            title: {
              text: "Taux financier",
              floating: true,
              offsetY: 330,
              align: 'center',
              style: {
                color: '#444'
              }
            }
      },
      seriesBar: [
        {name: 'En cours',data: [30, 40, 45, 50, 49, 60, 70, 91]},
        {name: 'Terminer',data: [40, 45, 55, 50, 12, 60, 50, 91]},
        {name: 'En retard',data: [50, 50, 60, 50, 29, 60, 80, 91]},
      ],
      seriesDonut: [44, 55, 41, 17, 15],
      title:'',
      form: [
        { label: "nom", type: "text", value: null },
        { label: "description", type: "text", value: null },
        { label: "ville", type: "text", value: null },
        { label: "poids", type: "text", value: null },
        { label: "couleur", type: "text", value: null },
        { label: "userId", type: "text", value: null },
        { label: "budgetNational", type: "text", value: null },
        { label: "pret", type: "text", value: null },
        { label: "statut", type: "text", value: null },
        { label: "debut", type: "text", value: null },
        { label: "fin", type: "text", value: null },
      ],
      list: [],
      options: [],
      token: "",
      key: ''
    }
  },
  mounted() {
    this.$store.dispatch('setcommunes');
    this.token  = localStorage.getItem("token");
    this.$axios.setBaseURL(this.baseURL);
    this.$axios.setToken(this.token, 'Bearer');
    
    this.getprojets().then((response)=>{
      //console.log(response);
      this.list = response.data;
    })
    this.getusers().then((response)=>{
      //console.log(response);
      this.options = response.data;
    })
  },
  methods: {
    addDate() {
      this.dates.push({})
    },
    gotoProjet() {
      this.seeStatistique = false
      this.seeProjet = true
    },
    gotoStatistique() {
      this.seeStatistique = true
      this.seeProjet = false
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
    addProjet() {
      this.title ="Ajouter un nouveau projet"
      this.showModal = true
    },
    modifier() {
      this.title ="Modifier un nouveau projet"
      this.showModal = true
    },
    dupliquer() {
      this.title ="Dupliquer projet existant"
      this.showModal = true
    },
    gotoNext() {
      this.$router.push('/dashboard/projets/composantes')
    },
    sender(){
      let data = {};

      for (let i = 0; i < this.form.length; i++) {
        data[this.form[i].label] = (this.form[i].label === 'debut' || this.form[i].label === 'fin') ? [this.form[i].value]: this.form[i].value;
      }
      //console.log(data);
      switch (this.key) {
        case 'put':
          this.putprojets(data.id, data).then((response)=>{
            console.log(response);
          });
          break;

        case 'delete':
          this.deleteprojets(data.id).then((response)=>{
            console.log(response);
          });
          break;
      
        default:
          this.postprojets(data).then((response)=>{
            console.log(response);
          });
          break;
      }
      this.getprojets().then((response)=>{
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
      this.title ="Modifier un nouveau projet";
      for (let i = 0; i < this.form.length; i++) {
        this.form[i].value =  data[this.form[i].label];
      }
      this.form = this.form.concat({ label: "id", type: "hidden", value: data.id });
      
      this.showModal = true;
      this.key = 'put';
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
    async postprojets(data) {
      return await this.$axios.$post('/api/projets', data)
    },
    async getprojets() {
      return await this.$axios.$get('/api/projets')
    },
    async putprojets(id, data) {
      return await this.$axios.$put('/api/projets/'+id, data)
    },
    async deleteprojets(id) {
      return await this.$axios.$delete('/api/projets/'+id)
    },
    async getusers() {
      return await this.$axios.$get('/api/utilisateurs/bailleurs')
    },
  }
}
</script>

<style>

</style>