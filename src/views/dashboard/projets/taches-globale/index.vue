<template>
  <dashboard>
     <div class="w-full px-4">
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
                >Selectionner une activité
                <span class="px-2 text-lg font-black text-red-700">*</span></label
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
    
    <div class="flex items-center justify-between my-2">
      <div class="flex space-x-4">
        <span class="inline-block  border-b-8 font-bold cursor-pointer text-lg uppercase border-primary py-2">taches</span>
      </div>

      <button
        v-if="seeTache"
        @click="addTache"
        title="ajouter une activite"
       class="px-4 py-2 flex overflow-hidden items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
          <span> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg></span>
          <span class="mx-2 text-xs font-semibold">ajouter une tâche</span>
      </button>
    </div>
   
    <!-- le filtre -->
    <div v-if="seeTache">
      <div class="p-4 my-4 rounded-sm shadow-md bg-gray-50">
          <div class="flex items-center justify-between ">
          <!--Filtre sur projet -->
          <div class="w-2/5 flex items-center space-x-2">
            <multiselect v-model="valueFiltre" :options="options" :custom-label="selectActivite"  placeholder="selectionnez une activité" label="name" track-by="name"></multiselect>
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
      <div  class="my-4 grid lg:grid-cols-3 md:grid-cols-2 sm:gap-5">
        <div v-for="(tache,index) in taches" :key="index">
          <card-tache
            bailleur="BM"
            :poids="tache.Poids"
            :libelle="tache.libelle"
            :montantNE="tache.montantNE"
            :montantEPM="tache.montantEPM"
            @supprimer="supprimer"
            @modifier="modifier"
            @validation="validation"
          ></card-tache>
        </div>
      </div>
    </div>

  
  </div>
  </dashboard>
 
</template>

<script>
import Vtable from '@/components/Vtable'
import Multiselect from 'vue-multiselect'
import SearchBar from '@/components/SearchBar'
import Titre from '@/components/Titre'
import Vmodal from '@/components/Vmodal'
import ModalTopRight from '@/components/ModalTopRight'
import Dashboard from '@/layouts/Dashboard'
import CardTache from '@/components/CardTache.vue'
export default {
  components: {
    Dashboard,
    Vmodal,
    Titre,
    SearchBar,
    ModalTopRight,
    Multiselect,
    CardTache,
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
      headers: [
        { name: "Tache", props: "tache"},
        { name: "Description", props: "description"},
        { name: "Budget Nationnal",props:'bn'},
        { name: "Pret",props:'pret'},
        { name: "Poids",props:'poids'},
        { name: "Structure responsable",props:'struct_responsable'},
        { name: "Structure Associé",props:'struct_assoc'},
        { name: "Status",props:'status'},
      ],
      dataTable:[
        {tache:"tache 1",description:"lorem ipsum",bn:"200000000",pret:"9540000000",poids:"5",struct_responsable:"agetur",struct_assoc:"",status:"en cours"}
      ],
      actions: [
        { name: "supprimer", iconne: "" },
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
   
    addDate() {
      this.dates.push({});
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
    validation() {
      alert('tache valider')
    },
    supprimer() {
      alert('element à ete supprimer')
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
