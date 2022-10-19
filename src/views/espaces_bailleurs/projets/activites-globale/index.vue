<template>
  <dashboard espace="bailleur">
    <div class="w-full">
      <modal-top-right v-if="showModal" :title="title" v-on:close="close">
        <form action="" @submit.prevent="save" class="p-0" >
            <div class="form-group my-2">
              <label class="text-xs font-semibold text-gray-500 uppercase md:text-sm block text-light">Nom du activé <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
              <input required class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="text" placeholder="Entrer le nom du composante" />
            </div>
            <div class="form-group my-2">
              <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Description <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
              <input required   class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="text" placeholder="Entrer la description" />
            </div>
            <div class="form-group my-2">
              <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Selectionner un sous composant <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
              <select class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" name="" id="">
                <option v-for="i in 5" :key="i.id">sous composante {{i}}</option>
                
              </select>
            </div>
            <div class="form-group my-2">
              <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Poids <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
              <input required  class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="number" placeholder="Entrer le poids" />
            </div>
            <div class="form-group my-2">
              <label class="text-xs font-semibold text-gray-500 uppercase md:text-sm text-light">Position  <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
              <select class="px-3 py-2 mt-1 border-2 border-gray-300 w-full  focus:outline-none focus:ring-2  focus:border-transparent" name="" id="">
                <option v-for="i in 5" :key="i.id" value=""> {{i}} </option>
              </select>
            </div>
            <div class="form-group my-2">
              <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Status <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
              <select class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" name="" id="">
                <option value="">En cours</option>
                <option value="">En attente</option>
                <option value="">En terminer</option>
              </select>
            </div>

        
            <div class="form-group my-2">
              <label class="text-xs font-semibold text-gray-500 uppercase md:text-sm text-light block ">Montant BN <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
              <input required  class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="number" placeholder="Entrer le BN" />
            </div>
            <div class="form-group my-2">
              <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Montant EPM-PRET <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
              <input required   class="px-3 py-2 mt-1 border-2 w-full border-gray-300  focus:outline-none focus:ring-2  focus:border-transparent" type="number" placeholder="Entrer le EPM pret " />
            </div>

            <div class="form-group my-2">
              <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Struture associé <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
              <select class="px-3 py-2 mt-1 border-2 border-gray-300 w-full  focus:outline-none focus:ring-2  focus:border-transparent" name="" id="">
                <option v-for="i in 5" :key="i.id" value=""> Struture Associé {{i}} </option>
              </select>
            </div>

            <div class="form-group my-2">
              <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Struture responsable <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
              <select class="px-3 py-2 mt-1 border-2 border-gray-300 w-full  focus:outline-none focus:ring-2  focus:border-transparent" name="" id="">
                <option v-for="i in 5" :key="i.id" value=""> Struture responsable {{i}} </option>
              </select>
            </div>

            <div class="form-group my-2">
              <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Struture responsable <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
              <select class="px-3 py-2 mt-1 border-2 border-gray-300 w-full   focus:outline-none focus:ring-2  focus:border-transparent" name="" id="">
                <option v-for="i in 5" :key="i.id" value=""> responsable Pool {{i}} </option>
              </select>
            </div>

            <div class="grid grid-cols-2 gap-2" v-for="date in dates" :key="date.id">
              <div class="form-group my-2">
                <label class="text-xs font-semibold block text-gray-500 uppercase md:text-sm text-light">Date debut<span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
                <input required class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2 w-full  focus:border-transparent" type="date" />
              </div>
              <div class="form-group my-2">
                <label class="text-xs font-semibold block text-gray-500 uppercase md:text-sm text-light">Date fin <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
                <div class="flex space-x-2 items-center">
                  <input required class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2 w-full  focus:border-transparent" type="date"  />
                  <span title="ajouter une nouvelle date" @click="addDate" class="text-primary"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"></path></svg></span>
                </div>
              </div>
            </div>
            <div class='flex items-center justify-center gap-4 pt-5 pb-5 my-4 '>
              <button v-if="title == 'Ajouter une activité' || title== 'Dupliquer un sous composant' " type="submit" class='w-auto p-1 font-medium text-white  shadow-xl bg-blue-500 hover:opacity-80'> 
                <span  class="mx-2 text-sm font-semibold uppercase" v-if="loading == false">
                Enregistrer et fermer
                </span>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>

              <button v-if="title == 'Modifier une activite'  " type="submit" class='w-full px-1 py-2 font-medium text-white  shadow-xl bg-blue-500 hover:opacity-80'> 
                <span  class="mx-2 text-xs font-semibold uppercase" v-if="loading == false">
                  Modifier
                </span>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>

              <button v-if="title == 'Ajouter une activité' || title== 'Dupliquer une activité' " type="submit" class='w-auto p-1 font-medium text-white  shadow-xl bg-primary hover:opacity-80'> 
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

      <modal-top-right v-if="showModal2" :title="title"  v-on:close="close2">
        <form action="" @submit.prevent="save" class="px-12" style="width:60vw !important" >
          <div class="grid grid-cols-1 gap-5 mt-3 md:grid-cols-2 md:gap-8 mx-4">
            <div class="grid grid-cols-1">
              <label class="text-xs font-semibold text-gray-500 uppercase md:text-sm text-light">Entrer l'année base <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
              <input required class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2  focus:border-transparent" type="number"  />
            </div>
            <div class="grid grid-cols-1">
              <label class="text-xs font-semibold text-gray-500 uppercase md:text-sm text-light">Selectionner le trimestre <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
              <select class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2  focus:border-transparent" name="" id="">
                <option v-for="i in 4" :key="i.id" value="">Trimestre {{i}}</option>
              </select>
            </div>
          </div>

        
          <div class="grid grid-cols-1 gap-5 mt-3 md:grid-cols-2 md:gap-8 mx-4">
            <div class="grid grid-cols-1">
              <label class="text-xs font-semibold text-gray-500 uppercase md:text-sm text-light">Montant BN <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
              <input required  class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2  focus:border-transparent" type="number" placeholder="Entrer le BN" />
            </div>
            <div class="grid grid-cols-1">
              <label class="text-xs font-semibold text-gray-500 uppercase md:text-sm text-light">Montant EPM-PRET <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
              <input required   class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2  focus:border-transparent" type="number" placeholder="Entrer le EPM pret " />
            </div>
          </div>

          <div class="mx-4 mt-3">
            <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light">Selectionnez une activité <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
            <select class="px-3 py-2 mt-1 border-2 border-gray-300  w-full focus:outline-none focus:ring-2  focus:border-transparent" name="" id="">
            <option v-for="i in 5" :key="i.id" value=""> activité {{i}} </option>
            </select>
          </div>
          
          <div class='flex items-center justify-center gap-4 pt-5 pb-5 my-4 md:gap-8'>
            <button v-if="title == 'Ajouter un plan decaissement' || title== 'Dupliquer un plan decaissement' " type="submit" class='w-auto px-4 py-2 font-medium text-white  shadow-xl bg-blue-500 hover:opacity-80'> 
              <span  class="mx-2 text-sm font-semibold uppercase" v-if="loading == false">
              Enregistrer et fermer
              </span>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>

            <button v-if="title == 'Modifier un plan de decaissement'  " type="submit" class='w-full mx-4 px-1 py-2 font-medium text-white  shadow-xl bg-blue-500 hover:opacity-80'> 
              <span  class="mx-2 text-xs font-semibold uppercase" v-if="loading == false">
                Modifier
              </span>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>

            <button v-if="title == 'Ajouter un plan decaissement' || title== 'Dupliquer un plan decaissement' " type="submit" class='w-auto px-4 py-2 font-medium text-white  shadow-xl bg-primary hover:opacity-80'> 
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

      <nav class="mb-2 mt-4 text-sm font-semibold flex justify-between items-center 	" aria-label="Breadcrumb">
        <div>
          <ol class="inline-flex p-0 list-none">
            <li class="flex items-center ">
              <router-link to="/dashboard" class="text-gray-600">dashboard</router-link>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
            </li>
            <li class="flex items-center  ">
              <router-link to="/dashboard/projets" class="text-gray-600">projets</router-link>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
            </li>
            
            <li class="flex items-center text-blue-500 ">
              <router-link to="" class="">activites</router-link>
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
      <div class="flex items-center justify-between my-2" >
        <div class="flex space-x-4">
          <span :class="{'border-primary border-b-8 font-bold':seeActivite}" @click="gotoActivite()" class="inline-block cursor-pointer  text-base uppercase    border-primary py-2">Activités</span>
          <span :class="{'border-primary border-b-8 font-bold':seePlan}" @click="gotoPlan()" class="inline-block cursor-pointer text-lg uppercase  py-2">Plan d'ecaissement </span>
          <span :class="{'border-primary border-b-8 font-bold':seeSuivi}" @click="gotoSuivi()" class="inline-block cursor-pointer text-lg uppercase  py-2">Le suivi evaluation </span>
          <span :class="{'border-primary border-b-8 font-bold':seeStatistique}" @click="gotoStatistique()" class="inline-block cursor-pointer text-lg uppercase  py-2">Statistiques </span>
        </div>
        
        <button v-if="seeActivite" @click="addActivite" title="ajouter une activite"   class="p-2 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
           <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              style="fill: rgba(255, 255, 255, 1); transform: ; msfilter: "
            >
              <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg
          ></span>
          <span class="mx-2 text-xs  md:text-sm font-semibold">ajouter une activité</span>
        </button>
        <button v-if="seePlan" @click="addPlan" title="ajouter un plan d'ecaissement"   class="p-2 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
           <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              style="fill: rgba(255, 255, 255, 1); transform: ; msfilter: "
            >
              <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg
          ></span>
          <span class="mx-2 text-xs  md:text-sm font-semibold">ajouter un plan d'ecaissement</span>
        </button>
      </div>
     
      <div v-if="seeActivite">
        <div class="p-4 my-4 rounded-sm shadow-md bg-gray-50">
          <div class="flex items-center justify-between ">
          <!--Filtre sur projet -->
          <div class="w-2/5 flex items-center space-x-2">
            <multiselect v-model="valueFiltre" :options="options" :custom-label="selectProjet"  placeholder="selectionnez un projet" label="name" track-by="name"></multiselect>
            <button v-if="!showFiltre" title="filtre" @click="showFiltre = true" class="bg-primary flex items-center space-x-3 text-white px-2 py-1 text-sm">
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
            <span  @click="toggle2" :class="{'border-yellow-600 text-yellow-600' : pending}" class="inline-block px-4 py-2 font-semibold text-gray-700 uppercase border-b-8 border-transparent cursor-pointer  text-xs">
              attentes 
                <span class="px-2 text-base text-yellow-600 border border-yellow-600 rounded-full undefined ">
                5
                </span>
              </span>
              <span  @click="toggle" :class="{'border-green-600 text-green-600' : success}" class="inline-block px-4 py-2 font-semibold text-gray-700 uppercase border-b-8 border-transparent cursor-pointer  text-xs">
                validés 
                <span class="px-2 text-base text-green-600 border border-green-600 rounded-full undefined">
                9
                </span>
              </span>
              <span  @click="toggle3" :class="{'border-red-600 text-red-600' : rejected}" class="inline-block px-4 py-2 font-semibold text-gray-700 uppercase border-b-8 border-transparent cursor-pointer  text-xs">
                rejetés
                <span class="px-2 text-base text-red-600 border border-red-600 rounded-full undefined">
                8
                </span>
              </span>
            </nav>
          </div>
        </div>
        <div v-if="mosaique" class=" my-4 grid lg:grid-cols-3 md:grid-cols-2 sm:gap-5">
          <div v-for="(activite,index) in activites" :key="index">
            <div class="relative">
              <!-- dots -->
                <div class="absolute right-1 top-4 z-10  cursor-pointer">
                  <dropdown @gotoNext="gotoNext" @modifier="modifier" @duplicate='dupliquer' :option="option"></dropdown>
                  </div>
            <!-- cards Activités -->
              <div class="relative p-4 max-w-80 bg-white sm:rounded-lg overflow-hidden ">
                
                <!-- ./dots -->
                <span class="absolute uppercase rounded-lg text-sm text-white bg-primary px-3 py-1 font-semibold">
                  <i class='bx bx-coin-stack mr-1'></i>BOAD</span>
                <div class="cursor-pointer">
                  <span class="absolute z-10 bottom-0 left-0 w-full h-10 text-white font-bold leading-3 px-8 py-3 text-left">
                    <span><i class='bx bxs-calendar mr-2'></i>{{activite.debut}}</span> au
                    <span><i class='bx bxs-calendar mr-2'></i>{{activite.fin}}</span></span>
                  <span
                    class="absolute bottom-0 left-0 w-full bg-primary h-10 text-white font-bold leading-3 px-8 py-3 text-right">Poids
                    : {{activite.Poids}} </span>

                  <span class="absolute bottom-10 right-0 _rounded-lg text-sm text-white bg-yellow-500 px-3 py-1 font-semibold">En
                    cours<i class='bx bx-time-five ml-1'></i></span>

                  <p class="my-2 uppercase text-normal text-lg font-medium text-gray-600 mt-16 line-clamp-2 normal-case"><span
                      class="font-bold italic"><span class="underline mr-2">Activité</span>:</span> {{activite.libelle}} </p>
                  <!--  -->
                  <div class="flex items-center mt-8 pt-2 text-gray-600 dark:text-gray-400 mb-1 border-t-2">
                    <i class='bx bxs-pin bx-sm'></i>
                    <div class="ml-4 text-xs  md:text-md tracking-wide font-semibold w-full truncate">S. Responsable : 
                      <span class="font-bold italic text-lg uppercase"> {{activite.StructureAssociée}} </span></div>
                  </div>
                  <div class="flex items-center text-gray-600 dark:text-gray-400 mb-1">
                    <i class='bx bxs-pin bx-sm'></i>
                    <div class="ml-4 text-xs  md:text-md tracking-wide font-semibold w-full truncate">S. Associée : 
                      <span class="font-bold italic text-lg uppercase"> {{activite.StructureAssociée}} </span></div>
                  </div>
                  <!--  -->
                  <div class="flex items-center mt-2 pt-2 text-gray-600 dark:text-gray-400 border-t-2">
                    <i class='bx bxs-wallet bx-sm'></i>
                    <div class="ml-4 text-xs  md:text-md tracking-wide font-semibold w-full truncate">EMP : 
                      <span class="font-bold italic text-lg"> {{activite.montantEPM}} </span><span class="ml-2 uppercase font-bold">fcfa</span>
                    </div>
                  </div>
                  <div class="flex items-center mt-1 text-gray-600 dark:text-gray-400 mb-6">
                    <i class='bx bxs-wallet bx-sm'></i>
                    <div class="ml-4 text-xs  md:text-md tracking-wide font-semibold w-full truncate">BN : <span
                        class="font-bold italic text-lg">{{activite.montantBN}}</span><span class="ml-2 uppercase font-bold">fcfa</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        <!-- End cards Activités -->
          </div>
        </div>
        <div v-if="line"  class="line my-4">
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
                  <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  ">activité {{index}} ~ sous composante {{index}} </td>
                  <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  ">Lorem ipsum dolor sit amet </td>
                  <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  ">100M </td>
                  <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  ">1000M </td>
                  <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  "> {{i*5}} </td>
                  <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  "> Structure resp {{index}} </td>
                  <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  "> Structure assoc {{index}} </td>
                  <td class=" px-2 py-4 whitespace-no-wrap border-b border-gray-500 ">
                    <span class="bg-green-500 p-1 rounded-md text-white font-semibold px-2  text-xs">en cours</span>
                  </td>
                  <td class=" px-2 py-4 whitespace-no-wrap border-b border-gray-500 "> <dropdown :option="optionActivite" ></dropdown></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div v-if="seePlan">
        <div v-if="mosaique" class=" my-4 grid grid-cols-4 gap-4">
          <div v-for="(i,index) in 4" :key="index">
            <card >
              <div class="p-2">
                <div class="flex justify-between">
                  <h1 class="font-base font-bold text-gray-900">année {{2018 +index}} </h1>
                  <div>
                    <dropdown @modifier="modifier" @duplicate='dupliquer' :option="optionActivite"></dropdown>
                  </div>
                </div>  
                <div class="my-2">
                  <p class="text-sm font-semibold py-1"> <span class="font-bold">Activité :</span>  <span class="text-gray-700"> {{index}} </span> </p>
                  <p class="text-sm font-semibold py-1"> <span class="font-bold">Trimestre :</span>  <span class="text-gray-700"> {{index+1}} </span> </p>
                  <p class="text-sm font-semibold py-1"> <span class="font-bold">Montant BN :</span>  <span class="text-gray-700">100M</span> </p>
                  <p class="text-sm font-semibold py-1"> <span class="font-bold">Montant EPM-PRET :</span> <span class="text-gray-700">1000M</span> </p>
                  <p class="text-sm font-semibold py-1"><span class="font-bold pr-2">De</span> 01/01/2019 <span class="font-bold px-2">Au</span> 31/12/2025 </p>
                  <div class="flex justify-between">
                    <div></div>
                      
                    <!-- <div class="flex space-x-2">
                      <span title="supprimer" class="text-red-500 cursor-pointer "><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z"></path></svg></span>
                      <span title="modifer" class="text-blue-500 cursor-pointer"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 000-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg></span>
                      <span title="dupliquer" class="cursor-pointer"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"></path></svg></span>
                      <span title="continuer" class="cursor-pointer" ><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1z"></path></svg></span>
                    </div> -->
                    
                  </div>
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
                <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Année </th>
                <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Trimestre </th>
                <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Activité </th>
                <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">BN </th>
                <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">EPM-PRET</th>
              

                <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Actions</th> 
              </thead>
              <tbody>
                <tr class="bg-white" v-for="(i,index) in 4" :key="index">
                  <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  "> {{i}} </td>
                  <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  "> {{2018 +index}} </td>
                  <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  "> trimestre {{index}} </td>
                  <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  "> activité {{index}} </td>
                  <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  ">100M </td>
                  <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-500  ">1000M </td>
                  <td class=" px-2 py-4 whitespace-no-wrap border-b border-gray-500 "> <dropdown :option="optionP" ></dropdown></td>
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
      <div v-if="seeStatistique">
        <div class="">
          <select class="px-11 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2  focus:border-transparent" name="" id="">
            <option class="font-semibold"> Tous </option>
            <option class="font-semibold"  v-for="i in 5" :key="i.id" value=""> projet {{i}} </option>
          </select>
        </div>
        <div class="grid grid-cols-2 gap-8 my-6 items-center">
          <div>
            <apexchart width="80%" type="pie" :options="chartOptions" :series="chartOptions.series"></apexchart>
          </div>
          <div>
            <apexchart type="bar" height="350" :options="chartOptionsExBar" :series="series"></apexchart>
          </div>
          
          <div>
            <apexchart width="80%" type="pie" :options="chartOptionsFi" :series="chartOptionsFi.series"></apexchart>
          </div>
        
          <div>
            <apexchart type="bar" height="350" :options="chartOptionsFiBar" :series="series"></apexchart>
          </div>
        </div>
      </div>
    </div>
  </dashboard>
  
</template>

<script>
import Multiselect from 'vue-multiselect'
import Card from '@/components/Card'
import SearchBar from '@/components/SearchBar'
import Titre from '@/components/Titre'
import Vmodal from '@/components/Vmodal'
import ModalTopRight from '@/components/ModalTopRight'
import Dashboard from '@/layouts/Dashboard'

export default {
  components: {
    Dashboard,
    Vmodal,
    ModalTopRight,
    Titre,
    SearchBar,
    Card,
    Multiselect
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
        {name:'projet 1'},
        {name:'projet 2'},
        {name:'projet 3'},
        {name:'projet 4'},
        {name:'projet 5'},
      ],
      showModal:false,
      showModal2:false,
      loading:false,
      line:false,
      mosaique:true,
      showInput:true,
      isStateChange:false,
      seeStatistique:false,
      seePlan:false,
      seeActivite:true,
      seeSuivi:false,
      option:[
        
        {name:"supprimer"},
        {name:"modifier"},
        {name:"dupliquer"},
        {name:"continuer"},
       
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
       activites:[
            {
              libelle: "Construire les collecteurs d'assainissement pluvial et aménager les voies connexes dans les bassins Pa3 et Y",
              MontantNE : " ",
              MontantEPM :"20,034,864.60",
              Poids : 19,
              StructureResponsable : "Pool PAP",
              StructureAssociée : "Agetur",
              debut: "01-01-2022",
              fin: 31-12-2022
            },
            {
              libelle: "Construire les collecteurs d'assainissement pluvial et aménager les voies connexes dans le bassin AAc",
              MontantNE : " ",
              MontantEPM :" 20,416,551.77",
              Poids : 19,
              StructureResponsable : "Pool PAP",
              StructureAssociée : "Agetur",
              debut: "01-03-2022",
              fin: 31-12-2022
            },
          
           
              {
                libelle: "Organiser des réunions d'information des parties populations riveraines sur les activités du projet",
                MontantNE : " ",
                MontantEPM :"",
                Poids : 1,
                StructureResponsable : "Pool PAP",
                StructureAssociée : "Agetur",
                debut: "01-01-2022",
                fin: 31-12-2022
              },
              {
                libelle: "Recruter une ONG en charge du développement et de la mise en œuvre de la stratégie de facilitation sociale pour l’engagement communautaire dans sa globalité y compris le plan IEC",
                MontantNE : " ",
                MontantEPM :"72,000.00",
                Poids : 5,
                StructureResponsable : "Pool PAP",
                StructureAssociée : "",
                debut: "01-01-2022",
                fin: 31-12-2022
              }
       ],
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

      
      chartOptions: {
        series: [44, 55,],
            chart: {
              width: 380,
              type: 'pie',
            },
            labels: ['Executé', 'Non éxecute'],
            title: {
              text: "STATISTIQUE TAUX FINANCIER",
              align: 'left',
              style: {
                fontSize:  '18px',
              },
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
        series: [44, 55,],
            chart: {
              width: 380,
              type: 'pie',
            },
            labels: ['Utilisé', 'Non utilise'],
            title: {
              text: "STATISTIQUE TAUX FINANCIER",
              align: 'left',
              style: {
                fontSize:  '18px',
              },
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

     
     
    }
    
  },
  methods: {
    filtreRange(value){
      this.rangeValue = value
    },
    selectProjet ({ name}) {
      return `${name}`
    },
    gotoActivite() {
      this.seePlan = false
      this.seeActivite = true
      this.seeSuivi = false
      this.seeStatistique = false
    },
    gotoStatistique() {
      this.seePlan = false
      this.seeActivite = false
      this.seeSuivi = false
      this.seeStatistique = true
    },
    gotoPlan() {
      this.seePlan = true
      this.seeActivite = false
      this.seeSuivi = false
      this.seeStatistique = false
    },
    gotoSuivi() {
      this.seeSuivi = true
      this.seePlan = false
      this.seeActivite = false
      this.seeStatistique = false
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
      this.$router.push('/dashboard/projets/taches-globale')
    },
    editerSuivi() {
      this.showInput = false
      
    },
    toggle() {
      this.pending = false
      this.rejected = false
      this.success = true

    },
    toggle2() {
      this.success = false
      this.rejected = false
      this.pending = true
    },
    toggle3() {
      this.pending = false
      this.success = false
      this.rejected = true
    },
  }
}
</script>

<style>

</style>