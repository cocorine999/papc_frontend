<template>
  <dashboard>
    <modal-top-right v-if="showModal" :title="title"  v-on:close="showCloseModal">
      <form action="" @submit.prevent="save" class="px-4"  >
        <div class="grid grid-cols-1 gap-5 mt-3 ">
          <div class="grid grid-cols-1">
            <label class="text-xs font-semibold text-gray-500 uppercase md:text-sm text-light">Nom du composante <span class="px-2 text-lg font-black text-red-700">*</span></label>
            <input required v-model="composanteAttributs.nom" key="nom" class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2  focus:border-transparent" type="text" placeholder="Entrer le nom du composante" />
          </div>
          <div class="grid grid-cols-1">
            <label class="text-xs font-semibold text-gray-500 uppercase md:text-sm text-light">Description <span class="px-2 text-lg font-black text-red-700">*</span></label>
            <input v-model="composanteAttributs.description"  class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2  focus:border-transparent" type="text" placeholder="Entrer la description" />
          </div>
        </div>

        <div class="grid grid-cols-1 gap-5 mt-3 ">
          <div class="grid grid-cols-1">
            <label class="text-xs font-semibold text-gray-500 uppercase md:text-sm text-light">Position  <span class="px-2 text-lg font-black text-red-700">*</span></label>
            <select v-model="composanteAttributs.position" class="px-3 py-2 mt-1 border-2 border-gray-300 w-full  focus:outline-none focus:ring-2  focus:border-transparent" name="" id="">
              <option v-for="i in 5" :key="i.id" :value="i"> {{i}} </option>
            </select>
          </div>

          <div class="grid grid-cols-1">
            <label class="text-xs font-semibold text-gray-500 uppercase md:text-sm text-light">Selectionnez un projet <span class="px-2 text-lg font-black text-red-700">*</span></label>
            <select v-model="composanteAttributs.projetId" class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2  focus:border-transparent" name="" id="">
              <option v-for="projet in projets" :key="projet.id" :value="projet.id"> {{projet.nom}}</option>

            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-5 mt-3 ">
          <div class="grid grid-cols-1">
            <label class="text-xs font-semibold text-gray-500 uppercase md:text-sm text-light">Poids <span class="px-2 text-lg font-black text-red-700">*</span></label>
            <input v-model="composanteAttributs.poids" required  class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2  focus:border-transparent" type="number" placeholder="Entrer le poids" />
          </div>
          <div class="grid grid-cols-1">
            <label class="text-xs font-semibold text-gray-500 uppercase md:text-sm text-light">Status <span class="px-2 text-lg font-black text-red-700">*</span></label>
            <select v-model="composanteAttributs.statut" class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2  focus:border-transparent" name="" id="">
              <option :value="0">En cours</option>
              <option :value="-1">En attente</option>
              <option :value="2">En terminer</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-5 mt-3 ">
          <div class="grid grid-cols-1">
            <label class="text-xs font-semibold text-gray-500 uppercase md:text-sm text-light">Montant BN <span class="px-2 text-lg font-black text-red-700">*</span></label>
            <input v-model="composanteAttributs.budgetNational" required  class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2  focus:border-transparent" type="number" placeholder="Entrer le BN" />
          </div>
          <div class="grid grid-cols-1">
            <label class="text-xs font-semibold text-gray-500 uppercase md:text-sm text-light">Montant EPM-PRET <span class="px-2 text-lg font-black text-red-700">*</span></label>
            <input v-model="composanteAttributs.pret" required   class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2  focus:border-transparent" type="number" placeholder="Entrer le EPM pret " />
          </div>
        </div>

        
        

        <div class='flex items-center justify-center gap-4 pt-5 pb-5 my-4 md:gap-8'>
          <button v-if="title == 'Ajouter une nouvelle composante' || title== 'Dupliquer un projet existant' " type="submit" class='w-auto px-4 py-2 font-medium text-white  shadow-xl bg-blue-500 hover:opacity-80'> 
            <span  class="mx-2 text-sm font-semibold uppercase" v-if="loading == false">
            Enregistrer et fermer
            </span>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>

          <button v-if="title == 'Modifier un nouveau composant'  " type="submit" class='w-full px-1 py-2 font-medium text-white  shadow-xl bg-blue-500 hover:opacity-80'> 
            <span  class="mx-2 text-xs font-semibold uppercase" v-if="loading == false">
              Modifier
            </span>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>

          <button v-if="title == 'Ajouter un nouveau composant' || title== 'Dupliquer un projet existant' " type="submit" class='w-auto px-4 py-2 font-medium text-white  shadow-xl bg-primary hover:opacity-80'> 
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
    
    <nav class="mb-2 text-sm font-semibold flex justify-between items-center " aria-label="Breadcrumb">
      <div>
        <ol class="inline-flex p-0 list-none">
          <li class="flex items-center ">
            <router-link to="/dashboard" class="text-gray-600">dashboard</router-link>
            <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
          </li>
          <li class="flex items-center text-blue-500 ">
            <router-link to="/dashboard/projets" class="text-gray-600">projets</router-link>
             <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
          </li>
          <li class="flex items-center text-blue-500 ">
            <router-link to="/dashboard/projets/composantes-globale" class="">composantes</router-link>
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
        <span :class="{'border-primary border-b-8 font-bold':seeComposant}" @click="gotoComposante()" class="inline-block cursor-pointer  text-lg uppercase    border-primary py-2">les composantes </span>
        <span :class="{'border-primary border-b-8 font-bold':seeSuivi}" @click="gotoSuivi()" class="inline-block cursor-pointer text-lg uppercase  py-2">Le suivi evaluation </span>
      </div>
      
      <button v-if="seeComposant" @click="addComposante" title="ajouter une composante"   class="p-2 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase rounded bg-primary focus:outline-none focus:shadow-outline">
        <span><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM17 11h-4v4h-2v-4H7V9h4V5h2v4h4v2z"></path></svg></span>
        <span class="mx-2 text-sm font-semibold">ajouter une composante</span>
      </button>
     
    </div>
    
    <div v-if="seeComposant">
      <div class="p-4 my-4 rounded-sm shadow-md bg-gray-50">
        <div class="flex items-center justify-between ">
        <!--Filtre sur projet -->
        <div class="w-2/5 flex items-center space-x-2">
          <multiselect v-model="valueFiltre" :options="options" :custom-label="selectProjet"  placeholder="selectionnez un projet" label="name" track-by="name"></multiselect>
          <button v-if="!showFiltre" title="filtre" @click="showFiltre = true" class="bg-primary flex items-center space-x-3 text-white px-2 py-1">
            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
            <span>filtre</span>
          </button>
          <div v-else  class="px-6 w-full">
            <div class="bg-gray-300 h-2 w-full rounded-full relative">
              <span class="bg-white h-4 w-4 absolute top-0 -ml-2 -mt-1 z-10 shadow rounded-full cursor-pointer" :style="`left:${rangeValue}%`"></span>
              <span class="bg-green-500 h-2 absolute left-0 top-0 rounded-full"  :style="`width:${rangeValue}%`"></span>
            </div>
            <div class="flex justify-between mt-2 text-xs text-gray-600">
              <span @click="filtreRange(0)" class="w-8 cursor-pointer text-left">0%</span>
              <span @click="filtreRange(25)" class="w-8 cursor-pointer text-center">25%</span>
              <span @click="filtreRange(50)" class="w-8 cursor-pointer text-center">50%</span>
              <span @click="filtreRange(75)" class="w-8 cursor-pointer text-center">75%</span>
              <span @click="filtreRange(100)" class="w-8 cursor-pointer text-right">100%</span>
              <button @click="showFiltre = false" class="text-white bg-blue-300 p-1">revenir</button>
            </div>
          
          </div>
        </div>
      <!--Filtre sur projet -->
          <nav class="flex text-sm align-middle justify-evenly">
          <span  @click="toggle2" :class="{'border-yellow-600 text-yellow-600' : pending}" class="inline-block px-4 py-2 font-semibold text-gray-700 uppercase border-b-8 border-transparent cursor-pointer ">
            attentes 
              <span class="px-2 text-base text-yellow-600 border border-yellow-600 rounded-full undefined">
              5
              </span>
            </span>
            <span  @click="toggle" :class="{'border-green-600 text-green-600' : success}" class="inline-block px-4 py-2 font-semibold text-gray-700 uppercase border-b-8 border-transparent cursor-pointer ">
              validés 
              <span class="px-2 text-base text-green-600 border border-green-600 rounded-full undefined">
              9
              </span>
            </span>
            <span  @click="toggle3" :class="{'border-red-600 text-red-600' : rejected}" class="inline-block px-4 py-2 font-semibold text-gray-700 uppercase border-b-8 border-transparent cursor-pointer ">
              rejetés
              <span class="px-2 text-base text-red-600 border border-red-600 rounded-full undefined">
              8
              </span>
            </span>
          </nav>
        </div>
      </div>
      <div v-if="mosaique" class="grid grid-cols-1 my-4 lg:grid-cols-3 md:grid-cols-2 sm:gap-5">
        <div v-for="composante in composantes" :key="composante.id">
          <!-- cards composantes -->
          <div class="relative p-4  bg-white sm:rounded-lg overflow-hidden">
            <span class="absolute bottom-0 left-0 w-full bg-primary h-10 text-white font-bold leading-3 px-8 py-3 text-right">Code : {{composante.code}} </span>
            <!-- <span class="absolute text-4xl sm:text-5xl text-white tracking-tight font-bold bg-Primary px-4 py-2 rounded-lg uppercase"><i class='bx bx-coin-stack bx-md'></i>boad</span> -->

              <span class="absolute uppercase rounded-lg text-sm text-white bg-primary px-3 py-1 font-semibold"><i class='bx bx-coin-stack mr-1'></i>{{composante.sigle}}</span>
              <span v-if="composante.statut == 0" class="absolute bottom-12 right-3 rounded-lg text-sm text-white bg-yellow-500 px-3 py-1 font-semibold">En cours<i class='bx bx-time-five ml-1'></i></span>
              <span v-if="composante.statut == 2" class="absolute bottom-12 right-3 rounded-lg text-sm text-white bg-yellow-500 px-3 py-1 font-semibold">Terminer<i class='bx bx-time-five ml-1'></i></span>
              <span v-if="composante.statut == -1" class="absolute bottom-12 right-3 rounded-lg text-sm text-white bg-yellow-500 px-3 py-1 font-semibold">En attente<i class='bx bx-time-five ml-1'></i></span>

            <!-- dots -->
            <span class="absolute right-0 cursor-pointer"><i class='bx bx-dots-vertical-rounded bx-md pr-2'></i></span>
            <!-- ./dots -->
            <p class="my-2 uppercase text-normal text-md font-medium text-gray-600 mt-16 line-clamp-2 normal-case"><span class="font-bold italic"><span class="underline mr-2">COMPOSANTE</span>{{composante.position}} :</span> {{composante.nom}} </p>
            <div class="flex items-center mt-8 text-gray-600 dark:text-gray-400 mb-6">
              <i class='bx bxs-wallet bx-md' ></i>
              <div class="ml-4 text-md tracking-wide font-semibold w-4/6 truncate">EMP : <span class="font-bold italic text-lg">{{composante.pret}}</span><span class="ml-2 uppercase font-bold">fcfa</span></div>
            </div>
            <!-- End cards composantes -->
          </div>
        </div>
      </div>
      <div v-if="line"  class="line my-4">
        <div class="align-middle inline-block w-full  overflow-hidden  pt-3 rounded-bl-lg rounded-br-lg">
            <table class="w-full">
              <thead>
                <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider"># </th>
                <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Composantes </th>
                <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Description </th>
                <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">BN </th>
                <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">EPM-PRET</th>
                <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">poids</th>
                <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">status</th>
                <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Actions</th> 
              </thead>
              <tbody>
                <tr class="bg-white" v-for="composante in composantes" :key="composante.id">
                  <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  "> {{i}} </td>
                  <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  ">Composante {{composante.position}} ~ Projet {{index * 2}} </td>
                  <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  ">{{composante.description}} </td>
                  <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  ">{{composante.budgetNational}} </td>
                  <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  ">{{composante.pret}}</td>
                  <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  "> {{composante.poids}} </td>
                  <td class=" px-2 py-4 whitespace-no-wrap border-b border-gray-500 ">
                    <span v-if="composante.statut == 0" class="bg-green-500 p-1 rounded-md text-white font-semibold px-2  text-xs">En cours</span>
                    <span v-if="composante.statut == 2" class="bg-green-500 p-1 rounded-md text-white font-semibold px-2  text-xs">Terminer</span>
                    <span v-if="composante.statut == -1" class="bg-green-500 p-1 rounded-md text-white font-semibold px-2  text-xs">En retard</span>
                  </td>
                  <td class=" px-2 py-4 whitespace-no-wrap border-b border-gray-500 "> <dropdown :option="option" ></dropdown></td>
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
                <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Composantes </th>
                <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Description </th>
                <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">BN </th>
                <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">EPM-PRET</th>
                <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">poids actuel</th>
                <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">status</th>
                <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Actions</th> 
              </thead>
              <tbody>
                <tr class="bg-white" v-for="(i,index) in 10" :key="index">
                  <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500 "> {{i}} </td>
                  <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  ">
                    <span v-if="showInput"> Composante {{index}} </span>
                    <input v-if="!showInput" type="text" class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent">
                  </td>
                  <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  ">
                    <span v-if="showInput"> Lorem ipsum dolor sit amet </span>
                    <input v-if="!showInput" type="text" class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent">
                  </td>
                  <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  ">
                    <span v-if="showInput">100M</span>
                    <input v-if="!showInput" type="text" class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent">
                  </td>
                  <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  ">
                    <span v-if="showInput" >1000M</span>
                    <input v-if="!showInput" type="text" class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent">
                  </td>
                  <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  "> 
                   <span v-if="showInput"> {{i*5}} </span>
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
                      <div v-if="showInput" class="w-4 mr-2 transform hover:text-blue-500 hover:scale-110"  @click="editerSuivi(item)">
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
    
  </dashboard>
 
</template>

<script>
import ModalTopRight from '@/components/ModalTopRight'
import Multiselect from 'vue-multiselect'
import SearchBar from '@/components/SearchBar'
import Titre from '@/components/Titre'
import Vmodal from '@/components/Vmodal'
import Dashboard from '@/layouts/Dashboard'

import { mapGetters, mapActions, mapMutations, mapState} from "vuex";
import utils from '@/utils/index'

export default {
  components: {
    Dashboard,
    Vmodal,
    Titre,
    SearchBar,
    Multiselect,
    ModalTopRight
  },
  data() {
    return {
      valueFiltre:'',
      pending:false,
      success:true,
      rejected:false,
      rangeValue:0,
      showFiltre:false,
      options:[
        {name:'projet1'},
        {name:'projet2'},
        {name:'projet3'},
        {name:'projet4'},
        {name:'projet5'},
      ],
      showModal:false,
      loading:false,
      line:false,
      mosaique:true,
      isStateChange:false,
      seeComposant:true,
      seeSuivi:false,
      showInput:true,
      seeStatistique:false,
      option:[
        {name:"supprimer"},
        {name:"modifier"},
        {name:"dupliquer"},
        {name:"continuer"},
      ],
      
      dates:[
        {}
      ],
      composanteAttributs : [],
     
    }
    
  },
  computed:{

    //importation des variables du module auths
    ...mapState({
      identifiant: state => state.auths.identifiant,
      composante: state => state.composantes.composante,
      loading : state => state.loading,
      errors : state => state.errors
    }),

    ...mapGetters({
      composantes: "composantes/getComposantes", 
      composante: "getComposante",
      projets: "projets/getProjets"
      
    })
  },

  methods: {
        //Charger les fonctions de communication avec le serveur
    ...mapMutations({
      setErrors: 'SET_ERRORS_MESSAGE', // map `this.setErrors()` to `this.$store.commit('SET_ERRORS_MESSAGE')`,
      setComposante: 'composantes/FILL' // map `this.CREATE_INSTANCE_PROJET()` to `this.$store.commit('CREATE_INSTANCE_PROJET')`
    }),

    ...mapActions('composantes', {
      fetchComposantes: "FETCH_LIST_COMPOSANTE",
      saveComposante: "STORE_COMPOSANTE",
      updateComposante: "UPDATE_COMPOSANTE",
      deleteComposante: "DESTROY_COMPOSANTE"
    }),

    ...mapActions('projets', { fetchProjets: 'FETCH_LIST_PROJET' }),

    addDate() {
      this.dates.push({})
    },
     gotoSuivi() {
      this.seeSuivi = true
      this.seeComposant = false
    },
    gotoComposante() {
      this.seeSuivi = false
      this.seeComposant = true
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
    showCloseModal(value = false) {
      this.showModal = value
    },
    addComposante() {
      this.title='Ajouter une nouvelle composante'

      this.showCloseModal(true)
    },

    modifier(composante) {

      this.title = 'Modifier un composante'

      this.setComposante(composante)

      this.composanteAttributs.forEach((item) => {

        this.champs.find((value, index) => {

          if(value.key === item){
            if(value.key === 'debut' || value.key === 'fin')
            {
              this.champs[index]['data'] = this.composante[item] + "-01"
            }else{
                this.champs[index]['data'] = this.composante[item]
            }
          }

        })

      })

      this.showCloseModal(true)
    },

    async supprimer(composante) {
      if(window.confirm("Voulez-vous supprimer cette composante " + composante.nom))
        await this.deleteComposante(composante.id)
    },
    dupliquer() {
      this.title ="Dupliquer un composante existant"
      this.showModal = true
    },
    resetForm(){

      this.champs = this.champs.map(item => { item.data = ''; return item})
      
      window.document.getElementById('vform').reset()

      this.composante = {}
    },
    gotoNext() {
      this.$router.push('/dashboard/projets/sous-composantes-globale')
    },
     editerSuivi(index) {
      this.showInput = false
    },
    sendForm() {

      /*this.champs = this.champs.map(item => { item.errors = []; return item})

      let composante = utils.extractFormData(this.champs, this.projetAttributs)*/

      let composante = this.composanteAttributs
      
      if(this.composante?.id)
      {

        this.updateComposante({composante: composante, id : this.composante?.id}).then(response => {
          
          if(response.status == 200 || response.status == 201){

            this.close()
          }

        }).catch((error) => {

          this.setErrors({message: error?.response?.data?.message, errors: error.response.data.errors})

          this.champs.map(value => value.errors = this.erreurs[value.key])

        })

      }
      else
      {
        console.log(composante)
        
        this.saveComposante(composante).then(response => {
          if(response.status == 200 || response.status == 201){
              this.close()
          }

        })
      }
    }
    
  },
  watch: {
    loading: function(value) {
      //this.loading = value
    },

    errors: function(errors) {
      this.champs.forEach((value) => {value.errors = errors[value.key]})
      //this.errors = errors
    }

  },
  
  mounted() {
    console.log("Fetching list of composantes ...")
    this.fetchComposantes({id : 1}).then((value) => {
        setTimeout(() => {
          console.log("Fetching list of projets...")
          this.fetchProjets({id : 1})
        }, 1000);
    })
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>

</style>