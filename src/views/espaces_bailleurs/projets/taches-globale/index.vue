<template>
  <dashboard espace="bailleur">
     <div class="w-full">
        <modal-top-right v-if="showModal" :title="title" v-on:close="close">
          <form action="" @submit.prevent="save" class="p-0 w-full">
            <div class="form-group my-2">
              <label
                class="text-xs font-semibold text-gray-500 uppercase md:text-sm block text-light"
                >Nom de la tache
                <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label
              >
              <input
                required
                class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2 focus:border-transparent"
                type="text"
                placeholder="Entrer le nom du composante"
              />
            </div>
            <div class="form-group my-2">
              <label
                class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light"
                >Description
                <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label
              >
              <input
                required
                class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2 focus:border-transparent"
                type="text"
                placeholder="Entrer la description"
              />
            </div>
            <div class="form-group my-2">
              <label
                class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light"
                >Selectionner une activité
                <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label
              >
              <select
                class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2 focus:border-transparent"
                name=""
                id=""
              >
                <option v-for="i in 5" :key="i.id" value="">
                  activité{{ i * 3 }}
                </option>
              </select>
            </div>
            <div class="form-group my-2">
              <label
                class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light"
                >Poids
                <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label
              >
              <input
                required
                class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2 focus:border-transparent"
                type="number"
                placeholder="Entrer le poids"
              />
            </div>
            <div class="form-group my-2">
              <label
                class="text-xs font-semibold text-gray-500 uppercase md:text-sm text-light"
                >Position
                <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label
              >
              <select
                class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2 focus:border-transparent"
                name=""
                id=""
              >
                <option v-for="i in 5" :key="i.id" value="">{{ i }}</option>
              </select>
            </div>
            <div class="form-group my-2">
              <label
                class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light"
                >Status
                <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label
              >
              <select
                class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2 focus:border-transparent"
                name=""
                id=""
              >
                <option value="">En cours</option>
                <option value="">En attente</option>
                <option value="">En terminer</option>
              </select>
            </div>

            <div
              class="grid grid-cols-2 gap-2"
              v-for="date in dates"
              :key="date.id"
            >
              <div class="form-group my-2">
                <label
                  class="text-xs font-semibold block text-gray-500 uppercase md:text-sm text-light"
                  >Date debut<span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700"
                    >*</span
                  ></label
                >
                <input
                  required
                  class="px-3 py-2 mt-1 border-2 border-gray-300 focus:outline-none focus:ring-2 w-full focus:border-transparent"
                  type="date"
                />
              </div>
              <div class="form-group my-2">
                <label
                  class="text-xs font-semibold block text-gray-500 uppercase md:text-sm text-light"
                  >Date fin
                  <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label
                >
                <div class="flex space-x-2 items-center">
                  <input
                    required
                    class="px-3 py-2 mt-1 border-2 border-gray-300 focus:outline-none focus:ring-2 w-full focus:border-transparent"
                    type="date"
                  />
                  <span
                    title="ajouter une nouvelle date"
                    @click="addDate"
                    class="text-primary"
                    ><svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 16 16"
                      height="1.5em"
                      width="1.5em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
                      ></path></svg
                  ></span>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-center gap-4 pt-5 pb-5 my-4">
              <button
                v-if="
                  title == 'Ajouter une tache' ||
                  title == 'Dupliquer un sous composant'
                "
                type="submit"
                class="w-auto p-1 font-medium text-white shadow-xl bg-blue-500 hover:opacity-80"
              >
                <span
                  class="mx-2 text-sm font-semibold uppercase"
                  v-if="loading == false"
                >
                  Enregistrer et fermer
                </span>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>

              <button
                v-if="title == 'Modifier une activite'"
                type="submit"
                class="w-full px-1 py-2 font-medium text-white shadow-xl bg-blue-500 hover:opacity-80"
              >
                <span
                  class="mx-2 text-xs font-semibold uppercase"
                  v-if="loading == false"
                >
                  Modifier
                </span>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>

              <button
                v-if="
                  title == 'Ajouter une tache' || title == 'Dupliquer une tache'
                "
                type="submit"
                class="w-auto p-1 font-medium text-white shadow-xl bg-primary hover:opacity-80"
              >
                <span
                  class="mx-2 text-sm font-semibold uppercase"
                  v-if="loading == false"
                >
                  Enregistrer et ajouter
                </span>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            </div>
          </form>
        </modal-top-right>

    <!--  <vmodal v-if="showModal2" :title="title"  v-on:close="close2">
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
    </vmodal> -->

    <nav
      class="mb-2 text-xs md:text-sm font-semibold flex justify-between items-center"
      aria-label="Breadcrumb"
    >
      <div>
        <ol class="inline-flex p-0 list-none">
          <li class="flex items-center">
            <router-link to="" class="text-gray-600">dashboard</router-link>
            <svg
              class="w-3 h-3 mx-3 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path
                d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
              />
            </svg>
          </li>
          <li class="flex items-center">
            <router-link to="/dashboard/projets" class="text-gray-600"
              >projets</router-link
            >
            <svg
              class="w-3 h-3 mx-3 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path
                d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
              />
            </svg>
          </li>
          <li class="flex items-center text-blue-500">
            <router-link to="/dashboard/projets/taches-globale" class=""
              >taches</router-link
            >
          </li>
        </ol>
      </div>
      <div>
        <search-bar></search-bar>
      </div>
    </nav>
    <div class="flex justify-start mt-2">
      <div class="flex items-center">
        <span
          title="vue en mosaique"
          @click="switch1"
          :class="{ 'border-2': mosaique }"
          class="p-2 cursor-pointer border-gray-500 text-gray-700 hover:text-gray-500"
          ><svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            height="1.8em"
            width="1.8em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path
              d="M3 5v14a2 2 0 002 2h6V3H5a2 2 0 00-2 2zm16-2h-6v8h8V5c0-1.1-.9-2-2-2zm-6 18h6c1.1 0 2-.9 2-2v-6h-8v8z"
            ></path></svg
        ></span>
        <span
          title="vue en ligne"
          @click="switch2"
          :class="{ 'border-2': line }"
          class="p-2 text-gray-700 border-gray-500 cursor-pointer hover:text-gray-500"
          ><svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            height="1.8em"
            width="1.8em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path
              d="M3 14h4v-4H3v4zm0 5h4v-4H3v4zM3 9h4V5H3v4zm5 5h13v-4H8v4zm0 5h13v-4H8v4zM8 5v4h13V5H8z"
            ></path></svg
        ></span>
      </div>
    </div>
    <div class="flex items-center justify-between my-2" >
      <div class="flex space-x-4">
        <span
          :class="{ 'border-primary border-b-8 font-bold': seeTache }"
          @click="gotoTache()"
          class="inline-block cursor-pointer text-xs sm:text-sm  md:text-base uppercase border-primary py-2"
          >taches</span
        >
       
      </div>

      <button
        v-if="seeTache"
        @click="addTache"
        title="ajouter une activite"
        class="p-2 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline"
      >
        <span
          ><svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            height="1.5em"
            width="1.5em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0V0z"></path>
            <path
              d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM17 11h-4v4h-2v-4H7V9h4V5h2v4h4v2z"
            ></path></svg
        ></span>
        <span class="mx-2 text-xs  md:text-sm font-semibold">ajouter une tache</span>
      </button>
    </div>
   
    <!-- le filtre -->
    <div v-if="seeTache">
      <div class="p-2 my-4 rounded-sm shadow-md bg-gray-50">
          <div class="flex items-center justify-between ">
          <!--Filtre sur projet -->
          <div class="w-2/5 flex items-center space-x-2">
            <multiselect v-model="valueFiltre" :options="options" :custom-label="selectActivite"  placeholder="selectionnez une activité" label="name" track-by="name"></multiselect>
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
      <div
        v-if="mosaique"
        class="my-4 grid lg:grid-cols-3 md:grid-cols-2 sm:gap-5"
      >
        <div v-for="(tache,index) in taches" :key="index">
        <!-- cards Tâches -->
          <div class="relative p-4 bg-white sm:rounded-lg overflow-hidden ">
            <!-- dots -->
            <span class="absolute right-0 cursor-pointer">
              <i class='bx bx-dots-vertical-rounded bx-md pr-2'></i>
              </span>
            <!-- ./dots -->
            <span class="absolute uppercase rounded-lg text-sm text-white bg-primary px-3 py-1 font-semibold">
              <i class='bx bx-coin-stack mr-1'></i>BOAD</span>
            <!--  -->
            <div class="cursor-pointer">
              <span class="absolute bottom-0 left-0 w-full bg-primary h-10 text-white font-bold leading-3 px-8 py-3 text-right">Poids:  {{tache.Poids}} </span>

              <span class="absolute bottom-10 right-0 _rounded-lg text-sm text-white bg-yellow-500 px-3 py-1 font-semibold">En
                cours<i class='bx bx-time-five ml-1'></i></span>

              <p class="my-2 uppercase text-normal text-lg font-medium text-gray-600 mt-16 line-clamp-2 normal-case">{{tache.libelle}} </p>
              <!--  -->
              <div class="flex items-center mt-2 pt-2 text-gray-600 dark:text-gray-400 border-t-2">
                <i class='bx bxs-wallet bx-sm'></i>
                <div class="ml-4 text-md tracking-wide font-semibold w-4/6 truncate">EMP : 
                  <span class="font-bold italic text-lg"> {{tache.MontantEPM}} </span><span class="ml-2 uppercase font-bold">fcfa</span>
                </div>
              </div>
              <div class="flex items-center mt-1 text-gray-600 dark:text-gray-400 mb-6">
                <i class='bx bxs-wallet bx-sm'></i>
                <div class="ml-4 text-md tracking-wide font-semibold w-4/6 truncate">BN : 
                  <span class="font-bold italic text-lg">{{tache.MontantNE}}</span>
                  <span class="ml-2 uppercase font-bold">fcfa</span>
                </div>
              </div>
            </div>
          </div>
      <!-- End cards Tâches -->
        </div>
      </div>
      <div v-if="line" class="line my-4">
        <div
          class="align-middle inline-block w-full overflow-hidden pt-3 rounded-bl-lg rounded-br-lg"
        >
          <table class="w-full">
            <thead>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider"
              >
                #
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider"
              >
                tache
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider"
              >
                Description
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider"
              >
                BN
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider"
              >
                EPM-PRET
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider"
              >
                poids
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider"
              >
                Structure resp
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider"
              >
                Structure assoc
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider"
              >
                status
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider"
              >
                Actions
              </th>
            </thead>
            <tbody>
              <tr class="bg-white" v-for="(i, index) in 10" :key="index">
                <td
                  class="px-2 py-4 whitespace-no-wrap border-b border-gray-500"
                >
                  {{ i }}
                </td>
                <td
                  class="px-2 py-4 whitespace-no-wrap border-b border-gray-500"
                >
                  tache {{ index }} ~activite {{ index + 1 * 6 }}
                </td>
                <td
                  class="px-2 py-4 whitespace-no-wrap border-b border-gray-500"
                >
                  Lorem ipsum dolor sit amet
                </td>
                <td
                  class="px-2 py-4 whitespace-no-wrap border-b border-gray-500"
                >
                  100M
                </td>
                <td
                  class="px-2 py-4 whitespace-no-wrap border-b border-gray-500"
                >
                  1000M
                </td>
                <td
                  class="px-2 py-4 whitespace-no-wrap border-b border-gray-500"
                >
                  {{ i * 5 }}
                </td>
                <td
                  class="px-2 py-4 whitespace-no-wrap border-b border-gray-500"
                >
                  Structure resp {{ index }}
                </td>
                <td
                  class="px-2 py-4 whitespace-no-wrap border-b border-gray-500"
                >
                  Structure assoc {{ index }}
                </td>
                <td
                  class="px-2 py-4 whitespace-no-wrap border-b border-gray-500"
                >
                  <span
                    class="bg-green-500 p-1 rounded-md text-white font-semibold px-2 text-xs"
                    >en cours</span
                  >
                </td>
                <td
                  class="px-2 py-4 whitespace-no-wrap border-b border-gray-500"
                >
                  <dropdown :option="optionActivite"></dropdown>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  
  </div>
  </dashboard>
 
</template>

<script>
import Multiselect from 'vue-multiselect'
import SearchBar from '@/components/SearchBar'
import Titre from '@/components/Titre'
import Vmodal from '@/components/Vmodal'
import ModalTopRight from '@/components/ModalTopRight'
import Dashboard from '@/layouts/Dashboard'
export default {
  components: {
    Dashboard,
    Vmodal,
    Titre,
    SearchBar,
    ModalTopRight,
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
      showModal: false,
      showModal2: false,
      loading: false,
      line: false,
      mosaique: true,
      isStateChange: false,
      seePlan: false,
      seeTache: true,
      options:[
        {name:'activite 1'},
        {name:'activite 2'},
        {name:'activite 3'},
        {name:'activite 4'},
        {name:'activite 5'},
      ],
      option: [
        { name: "supprimer" },
        { name: "modifier" },
        { name: "dupliquer" },
      ],
      taches :[
        {
          libelle: "Suivi de l'exécution des travaux trimestre 1",
          MontantNE : " ",
          MontantEPM :"",
          Poids : 19,
        },
          {
            libelle: "Suivi de l'exécution des travaux trimestre 2",
            MontantNE : " ",
            MontantEPM :"",
            Poids : 19,
          },
          {
            libelle: "Suivi de l'exécution des travaux trimestre 3",
            MontantNE : " ",
            MontantEPM :"",
            Poids : 19,
          },
          {
            libelle: "Suivi de l'exécution des travaux trimestre 4",
            MontantNE : " ",
            MontantEPM :"",
            Poids : 7,
          },
        ],
      dates: [{}],
    };
  },
  methods: {
    filtreRange(value){
      this.rangeValue = value
    },
    selectActivite ({ name}) {
      return `${name}`
    },
    gotoTache() {
      this.seePlan = false;
      this.seeTache = true;
    },
    gotoPlan() {
      this.seePlan = true;
      this.seeTache = false;
    },
    addDate() {
      this.dates.push({});
    },

    switch1() {
      this.mosaique = true;
      this.line = false;
    },
    switch2() {
      this.mosaique = false;
      this.line = true;
    },
    close() {
      this.showModal = false;
    },
    close2() {
      this.showModal2 = false;
    },
    addPlan() {
      this.title = "Ajouter un plan decaissement";
      this.showModal2 = true;
    },
    modifierPlan() {
      this.title = "Modifier un plan de decaissement";
      this.showModal2 = true;
    },
    dupliquerPlan() {
      this.title = "Dupliquer un plan decaissement";
      this.showModal2 = true;
    },
    addTache() {
      this.title = "Ajouter une tache";
      this.showModal = true;
    },
    modifier() {
      this.title = "Modifier une tache";
      this.showModal = true;
    },
    dupliquer() {
      this.title = "Dupliquer une tache";
      this.showModal = true;
    },
    gotoNext() {
      this.$router.push(
        "/dashboard/projets/composantes/sous-composantes/activites/taches"
      );
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
  },
};
</script>

<style></style>
