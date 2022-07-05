<template>
  <div class="w-full p-4">
    <modal-top-right v-if="showModal" :title="title" v-on:close="close">
      <form action="" @submit.prevent="save" class="p-4">
        <div class="form-group my-2">
          <label
            class="text-xs font-semibold text-gray-500 uppercase md:text-sm block text-light"
            >Nom de la tache
            <span class="px-2 text-lg font-black text-red-700">*</span></label
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
            <span class="px-2 text-lg font-black text-red-700">*</span></label
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
            >Poids
            <span class="px-2 text-lg font-black text-red-700">*</span></label
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
            <span class="px-2 text-lg font-black text-red-700">*</span></label
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
            <span class="px-2 text-lg font-black text-red-700">*</span></label
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
              >Date debut<span class="px-2 text-lg font-black text-red-700"
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
              <span class="px-2 text-lg font-black text-red-700">*</span></label
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
      class="mb-2 text-sm font-semibold flex justify-between items-center"
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
          <li class="flex items-center">
            <router-link to="/dashboard/projets/composantes" class="text-gray-600"
              >composantes</router-link
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
          <li class="flex items-center">
            <router-link
              to="/dashboard/projets/composantes/sous-composantes"
              class="text-gray-600"
              >sous composantes</router-link
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
            <router-link
              to="/dashboard/projets/composantes/sous-composantes/activites"
              class="text-gray-600"
              >activites</router-link
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
            <router-link
              to="/dashboard/projets/composantes/sous-composantes/activites/taches"
              class=""
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
    <div class="flex items-center justify-between my-2">
      <div class="flex space-x-4">
        <span
          :class="{ 'border-primary border-b-8 font-bold': seeTache }"
          @click="gotoTache()"
          class="inline-block cursor-pointer text-lg uppercase border-primary py-2"
          >taches</span
        >
        <span
          :class="{ 'border-primary border-b-8 font-bold': seePlan }"
          @click="gotoPlan()"
          class="inline-block cursor-pointer text-lg uppercase py-2"
          >Plan execution
        </span>
      </div>

      <button
        v-if="seeTache"
        @click="addTache"
        title="ajouter une activite"
        class="p-2 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase rounded bg-primary focus:outline-none focus:shadow-outline"
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
        <span class="mx-2 text-sm font-semibold">ajouter une tache</span>
      </button>
    </div>
    <div v-if="seeTache">
      <div
        v-if="mosaique"
        class="my-4 grid lg:grid-cols-3 md:grid-cols-2 sm:gap-5"
      >
        <div v-for="(i, index) in 10" :key="index">
          <card>
            <div class="p-2">
              <div class="flex justify-between">
                <h1 class="font-base font-bold text-gray-900">
                  Tache {{ index }}
                </h1>
                <div>
                    <dropdown
                      @modifier="modifier"
                      @duplicate="dupliquer"
                      :option="option"
                    ></dropdown>
                  </div>
                
              </div>
              <div class="border-b border-gray-300 relative ">
                <p class="text-justify font-semibold leading-6 text-sm my-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Assumenda iste dignissimos quasi quos laborum sequi!
                </p>
                <div class="absolute bottom-0 right-0">
                  <span
                    v-if="!isStateChange"
                    @click="isStateChange = true"
                    class="text-white cursor-pointer bg-green-500 rounded p-1"
                    >en cours</span
                  >
                  <select
                    v-else
                    @change="isStateChange = false"
                    class="outine-none"
                    name=""
                    id=""
                  >
                    <option value="">cree</option>
                    <option value="">en attente</option>
                    <option value="">en cours</option>
                    <option value="">en terminer</option>
                  </select>
                </div>
              </div>
              
              <div class="my-2">
                <p class="text-sm font-semibold py-1">
                  <span class="font-bold">Montant BN :</span>
                  <span class="text-gray-700">100M</span>
                </p>
                <p class="text-sm font-semibold py-1">
                  <span class="font-bold">Montant EPM-PRET :</span>
                  <span class="text-gray-700">1000M</span>
                </p>
                <p class="text-sm font-semibold py-1">
                  <span class="font-bold">Poids :</span>
                  <span class="text-gray-700">100</span>
                </p>

               
              </div>
            </div>
          </card>
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
                Activité
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
                  tache {{ index }}
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

    <div v-if="seePlan">
      <h1 class="p-4 text-4xl font-semibold">En cours de dev</h1>
      <div v-if="mosaique && false" class="my-4 grid grid-cols-4 gap-4">
        <div v-for="(i, index) in 4" :key="index">
          <card>
            <div class="p-2">
              <div class="flex justify-between">
                <h1 class="font-base font-bold text-gray-900">
                  année {{ 2018 + index }}
                </h1>
                <span
                  class="cursor-pointer text-gray-900 rounded p-1 font-semibold"
                >
                  Trimestre {{ index }}
                </span>
              </div>

              <div class="my-2">
                <p class="text-sm font-semibold py-1">
                  <span class="font-bold">Activité :</span>
                  <span class="text-gray-700"> {{ index }} </span>
                </p>
                <p class="text-sm font-semibold py-1">
                  <span class="font-bold">Montant BN :</span>
                  <span class="text-gray-700">100M</span>
                </p>
                <p class="text-sm font-semibold py-1">
                  <span class="font-bold">Montant EPM-PRET :</span>
                  <span class="text-gray-700">1000M</span>
                </p>
                <p class="text-sm font-semibold py-1">
                  <span class="font-bold pr-2">De</span> 01/01/2019
                  <span class="font-bold px-2">Au</span> 31/12/2025
                </p>
                <div class="flex justify-between">
                  <div></div>

                  <!-- <div class="flex space-x-2">
                      <span title="supprimer" class="text-red-500 cursor-pointer "><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z"></path></svg></span>
                      <span title="modifer" class="text-blue-500 cursor-pointer"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 000-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg></span>
                      <span title="dupliquer" class="cursor-pointer"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"></path></svg></span>
                      <span title="continuer" class="cursor-pointer" ><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1z"></path></svg></span>
                    </div> -->
                  <div>
                    <dropdown
                      @modifier="modifierPlan"
                      @duplicate="dupliquerPlan"
                      :option="option"
                    ></dropdown>
                  </div>
                </div>
              </div>
            </div>
          </card>
        </div>
      </div>
      <div v-if="line && false" class="line my-4">
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
                Année
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider"
              >
                Trimestre
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider"
              >
                Activité
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
                Actions
              </th>
            </thead>
            <tbody>
              <tr class="bg-white" v-for="(i, index) in 4" :key="index">
                <td
                  class="px-2 py-4 whitespace-no-wrap border-b border-gray-500"
                >
                  {{ i }}
                </td>
                <td
                  class="px-2 py-4 whitespace-no-wrap border-b border-gray-500"
                >
                  {{ 2018 + index }}
                </td>
                <td
                  class="px-2 py-4 whitespace-no-wrap border-b border-gray-500"
                >
                  trimestre {{ index }}
                </td>
                <td
                  class="px-2 py-4 whitespace-no-wrap border-b border-gray-500"
                >
                  activité {{ index }}
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
                  <dropdown :option="optionP"></dropdown>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "dashboard",
  data() {
    return {
      showModal: false,
      showModal2: false,
      loading: false,
      line: false,
      mosaique: true,
      isStateChange: false,
      seePlan: false,
      seeTache: true,
      option: [
        { name: "supprimer" },
        { name: "modifier" },
        { name: "dupliquer" },
      ],

      dates: [{}],
    };
  },
  methods: {
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
  },
};
</script>

<style></style>
