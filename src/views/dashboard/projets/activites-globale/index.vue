<template>
  <dashboard>
    <div class="w-full p-4">
      <modal-top-right v-if="showModal" :title="title" v-on:close="close">
        <form action="" @submit.prevent="save" class="p-4" >
            <div class="form-group my-2">
              <label class="text-xs font-semibold text-gray-500 uppercase md:text-sm block text-light">Nom du activé <span class="px-2 text-lg font-black text-red-700">*</span></label>
              <input required class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="text" placeholder="Entrer le nom du composante" />
            </div>
            <div class="form-group my-2">
              <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Description <span class="px-2 text-lg font-black text-red-700">*</span></label>
              <input required   class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="text" placeholder="Entrer la description" />
            </div>
            <div class="form-group my-2">
              <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Selectionner un sous composant <span class="px-2 text-lg font-black text-red-700">*</span></label>
              <select class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" name="" id="">
                <option v-for="i in 5" :key="i.id">sous composante {{i}}</option>
                
              </select>
            </div>
            <div class="form-group my-2">
              <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Poids <span class="px-2 text-lg font-black text-red-700">*</span></label>
              <input required  class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="number" placeholder="Entrer le poids" />
            </div>
            <div class="form-group my-2">
              <label class="text-xs font-semibold text-gray-500 uppercase md:text-sm text-light">Position  <span class="px-2 text-lg font-black text-red-700">*</span></label>
              <select class="px-3 py-2 mt-1 border-2 border-gray-300 w-full  focus:outline-none focus:ring-2  focus:border-transparent" name="" id="">
                <option v-for="i in 5" :key="i.id" value=""> {{i}} </option>
              </select>
            </div>
            <div class="form-group my-2">
              <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Status <span class="px-2 text-lg font-black text-red-700">*</span></label>
              <select class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" name="" id="">
                <option value="">En cours</option>
                <option value="">En attente</option>
                <option value="">En terminer</option>
              </select>
            </div>

        
            <div class="form-group my-2">
              <label class="text-xs font-semibold text-gray-500 uppercase md:text-sm text-light block ">Montant BN <span class="px-2 text-lg font-black text-red-700">*</span></label>
              <input required  class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="number" placeholder="Entrer le BN" />
            </div>
            <div class="form-group my-2">
              <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Montant EPM-PRET <span class="px-2 text-lg font-black text-red-700">*</span></label>
              <input required   class="px-3 py-2 mt-1 border-2 w-full border-gray-300  focus:outline-none focus:ring-2  focus:border-transparent" type="number" placeholder="Entrer le EPM pret " />
            </div>

            <div class="form-group my-2">
              <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Struture associé <span class="px-2 text-lg font-black text-red-700">*</span></label>
              <select class="px-3 py-2 mt-1 border-2 border-gray-300 w-full  focus:outline-none focus:ring-2  focus:border-transparent" name="" id="">
                <option v-for="i in 5" :key="i.id" value=""> Struture Associé {{i}} </option>
              </select>
            </div>

            <div class="form-group my-2">
              <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Struture responsable <span class="px-2 text-lg font-black text-red-700">*</span></label>
              <select class="px-3 py-2 mt-1 border-2 border-gray-300 w-full  focus:outline-none focus:ring-2  focus:border-transparent" name="" id="">
                <option v-for="i in 5" :key="i.id" value=""> Struture responsable {{i}} </option>
              </select>
            </div>

            <div class="form-group my-2">
              <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Struture responsable <span class="px-2 text-lg font-black text-red-700">*</span></label>
              <select class="px-3 py-2 mt-1 border-2 border-gray-300 w-full   focus:outline-none focus:ring-2  focus:border-transparent" name="" id="">
                <option v-for="i in 5" :key="i.id" value=""> responsable Pool {{i}} </option>
              </select>
            </div>

            <div class="grid grid-cols-2 gap-2" v-for="date in dates" :key="date.id">
              <div class="form-group my-2">
                <label class="text-xs font-semibold block text-gray-500 uppercase md:text-sm text-light">Date debut<span class="px-2 text-lg font-black text-red-700">*</span></label>
                <input required class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2 w-full  focus:border-transparent" type="date" />
              </div>
              <div class="form-group my-2">
                <label class="text-xs font-semibold block text-gray-500 uppercase md:text-sm text-light">Date fin <span class="px-2 text-lg font-black text-red-700">*</span></label>
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
              <label class="text-xs font-semibold text-gray-500 uppercase md:text-sm text-light">Entrer l'année base <span class="px-2 text-lg font-black text-red-700">*</span></label>
              <input required class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2  focus:border-transparent" type="number"  />
            </div>
            <div class="grid grid-cols-1">
              <label class="text-xs font-semibold text-gray-500 uppercase md:text-sm text-light">Selectionner le trimestre <span class="px-2 text-lg font-black text-red-700">*</span></label>
              <select class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2  focus:border-transparent" name="" id="">
                <option v-for="i in 4" :key="i.id" value="">Trimestre {{i}}</option>
              </select>
            </div>
          </div>

        
          <div class="grid grid-cols-1 gap-5 mt-3 md:grid-cols-2 md:gap-8 mx-4">
            <div class="grid grid-cols-1">
              <label class="text-xs font-semibold text-gray-500 uppercase md:text-sm text-light">Montant BN <span class="px-2 text-lg font-black text-red-700">*</span></label>
              <input required  class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2  focus:border-transparent" type="number" placeholder="Entrer le BN" />
            </div>
            <div class="grid grid-cols-1">
              <label class="text-xs font-semibold text-gray-500 uppercase md:text-sm text-light">Montant EPM-PRET <span class="px-2 text-lg font-black text-red-700">*</span></label>
              <input required   class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2  focus:border-transparent" type="number" placeholder="Entrer le EPM pret " />
            </div>
          </div>

          <div class="mx-4 mt-3">
            <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light">Selectionnez une activité <span class="px-2 text-lg font-black text-red-700">*</span></label>
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

      <nav class="mb-2 text-sm font-semibold flex justify-between items-center " aria-label="Breadcrumb">
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
      
      <div class="flex items-center justify-between my-2">
        <div class="flex space-x-4">
          <span :class="{'border-primary border-b-8 font-bold':seeActivite}" @click="gotoActivite()" class="inline-block cursor-pointer  text-lg uppercase    border-primary py-2">Activités</span>
          <span :class="{'border-primary border-b-8 font-bold':seePlan}" @click="gotoPlan()" class="inline-block cursor-pointer text-lg uppercase  py-2">Plan d'ecaissement </span>
          <span :class="{'border-primary border-b-8 font-bold':seeSuivi}" @click="gotoSuivi()" class="inline-block cursor-pointer text-lg uppercase  py-2">Le suivi evaluation </span>
          <span :class="{'border-primary border-b-8 font-bold':seeStatistique}" @click="gotoStatistique()" class="inline-block cursor-pointer text-lg uppercase  py-2">Statistiques </span>
        </div>
        
        <button v-if="seeActivite" @click="addActivite" title="ajouter une activite"  class="px-4 py-2 flex overflow-hidden items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
          <span> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg></span>
          <span class="mx-2 text-xs font-semibold">ajouter une activité</span>
        </button>
        <button v-if="seePlan" @click="addPlan" title="ajouter un plan d'ecaissement"   class="p-2 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase rounded bg-primary focus:outline-none focus:shadow-outline">
          <span><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM17 11h-4v4h-2v-4H7V9h4V5h2v4h4v2z"></path></svg></span>
          <span class="mx-2 text-sm font-semibold">ajouter un plan d'ecaissement</span>
        </button>
      </div>
     
      <div v-if="seeActivite">
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
        <div  class=" my-4 grid lg:grid-cols-3 md:grid-cols-2 sm:gap-5">
          <div v-for="(activite,index) in activites" :key="index">
            <card-activite
              bailleur="BM"
              :libelle="activite.libelle"
              :poids="activite.poids"
              :montantEPM="activite.montantEPM"
              :montantNE="activite.montantNE"
              :debut="activite.debut"
              :fin="activite.fin"
            ></card-activite>
        <!-- End cards Activités -->
          </div>
        </div>
       
      </div>
      <div v-if="seePlan">
        <div class=" my-4 grid grid-cols-4 gap-4">
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
      </div>
      <div v-if="seeSuivi">
         <vtable id="datatable"
        :headers="headers"
        :datas="dataTable"
        :actions="actions"
        @supprimer="supprimerT">
      </vtable>
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
import Vtable from '@/components/Vtable'
import Multiselect from 'vue-multiselect'
import Dropdown from '@/components/Dropdown'
import Card from '@/components/Card'
import SearchBar from '@/components/SearchBar'
import Titre from '@/components/Titre'
import CardActivite from '@/components/CardActivite'
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
    Multiselect,
    Dropdown,
    CardActivite,
    Vtable
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
        
       
      ],
      optionActivite:[
        {name:"Voir plan decaissement"},
        {name:"supprimer"},
        {name:"modifier"},
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

      headers: [
        { name: "activite", props: "activite"},
        { name: "Budget Nationnal",props:'bn'},
        { name: "Pret",props:'pret'},
        { name: "Poids",props:'poids'},
        { name: "Structure responsable",props:'struct_resp'},
        { name: "Structure associé",props:'struct_assoc'},
        { name: "Status",props:'status'},
      ],
      dataTable:[
        {activite:"activite 1",bn:"200000000",pret:"9540000000",poids:"5",struct_resp:"agetur",struct_assoc:"",status:"en cours"}
      ],
      actions: [
        { name: "supprimer", iconne: "" },
      ],
     
     
    }
    
  },
  methods: {
    supprimerT() {

    },
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