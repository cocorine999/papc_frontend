<template>
  <dashboard>
    
    <div class="w-full p-4">
      <nav class="mb-2 text-sm font-semibold flex justify-between items-center " aria-label="Breadcrumb">
        <div>
          <ol class="inline-flex p-0 list-none">
            <li class="flex items-center text-blue-500">
              <router-link to="" class="text-gray-600">dashboard</router-link>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
            </li>
            <li class="flex items-center ">
              <router-link to="" class="text-gray-600">entreprise</router-link>
            </li>
          </ol>
        </div>
        <div>
          <search-bar></search-bar>
        </div>
      </nav> 
    
     

      <div class="flex items-center justify-between my-2">
        <titre>Les entreprise executantes </titre>
         
      </div>

      <div class="grid grid-cols-1 my-4 lg:grid-cols-3 md:grid-cols-2 sm:gap-5">
        <div v-for="(bailleur,index) in bailleurs" :key="index">
          <div class="relative">
             <!-- dot -->
            <div class="absolute right-1 top-4 z-10  cursor-pointer">
              <dropdown @gotoNext="gotoNext" @modifier="modifier" @duplicate='dupliquer' :option="option"></dropdown>
            </div>
          <!-- dot -->
            <div class="relative p-6 max-w-80 bg-white sm:rounded-lg overflow-hidden _shadow-md">
              <span :class="bailleur.color" class="absolute bottom-0 left-0 w-full  h-8 text-white font-semibold leading-3 px-8 py-2 text-right"><p>Code : {{bailleur.code}} </p></span>
              <span :class="bailleur.color" class="absolute text-4xl sm:text-5xl text-white tracking-tight font-bold  px-4 py-2 rounded-lg uppercase"><i class='bx bx-coin-stack bx-md'></i>{{bailleur.sigle}}</span>
              
              <p class="my-2 text-normal text-lg sm:text-2xl font-medium text-gray-600 mt-16 truncate">Entreprise {{index}}</p>
        
              <div class="flex items-center mt-8 text-gray-600">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" class="w-8 h-8 text-gray-500">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div class="ml-4 text-md tracking-wide font-semibold w-full truncate">Dhaka, Street, State, Postal Code Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo quod sunt tempore iste eligendi unde molestias ipsum omnis dolorum totam!</div>
              </div>
        
              <div class="flex items-center mt-1 text-gray-600 dark:text-gray-400">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" class="w-8 h-8 text-gray-500">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div class="ml-4 text-md tracking-wide font-semibold w-full truncate">+880 1234567890</div>
              </div>
        
              <div class="flex items-center mb-8 text-gray-600 dark:text-gray-400">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" class="w-8 h-8 text-gray-500">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div class="ml-4 text-md tracking-wide font-semibold w-full truncate">info@demo.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
  </div>
  </dashboard>
</template>

<script>
import ModalTopRight from '@/components/ModalTopRight'
import SearchBar from '@/components/SearchBar'
import CardBailleur from '@/components/CardBailleur'
import Titre from '@/components/Titre'
import Vtable from '@/components/Vtable'
import Vform from '@/components/Vform'
import Vmodal from '@/components/Vmodal'
import Dashboard from '@/layouts/Dashboard'
import Dropdown from '@/components/Dropdown.vue'

export default {
  modules: ['@nuxtjs/axios'],
 
  components: {
    Vtable,
    Dashboard,
    Vmodal,
    Vform,
    CardBailleur,
    Titre,
    SearchBar,
    ModalTopRight,
    Dropdown

  },
  data() {
    return {
      showModal:false,
      loading:false,
      line:false,
      mosaique:true,
      title: '',
      headers:[
        {name:'Bailleurs',props:'bailleur'},
        {name:'Sigle',props:'sigle'},
        {name:'Code PTA',props:'code'},
        {name:'Date creation',props:'created_at'},
      ],
      bailleurs:[
         {
          bailleur:'Banque Mondiale ',
          sigle:'BM',
          code:"4.1.1.3.1",
          created_at:"22-06-2022",
          color:' bg-yellow-500'
          },
        {
        bailleur:'BANQUE AFRICAINE DE DEVELOPPEMENT-BAD',
        sigle:'BAD & AGTF',
        code:"4.1.1.3.2",
        created_at:"22-06-2022",
        color:' bg-red-500'
        },
        {
        bailleur:'BANQUE OUEST-AFRICAINE DE DEVELOPPEMENT-BOAD',
        sigle:'BOAD',
        code:"4.1.1.3.3",
        created_at:"22-06-2022",
        color:' bg-pink-500'
        },
        {
        bailleur:"BANQUE EUROPEENNE D'INVESTISSEMENT-BEI",
        sigle:'BEI',
        code:"4.1.1.3.4",
        created_at:"22-06-2022",
        color:' bg-blue-500'
        },
        {
        bailleur:"AGENCE FRANCAISE DE DEVELOPPEMENT-AFD",
        sigle:'AFD',
        code:"4.1.1.3.5",
        created_at:"22-06-2022",
        color:' bg-yellow-900'
        },
        {
        bailleur:"BANQUE BANQUE ISLAMIQUE DE DEVELOPPEMENT-BID",
        sigle:'BID',
        code:"4.1.1.3.6",
        created_at:"22-06-2022",
        color:' bg-indigo-500'
        },

      ],
      dataTable:[
        {bailleur:'Banque Mondiale ',sigle:'BM',code:"DFSDFDS525",created_at:"22-06-2022"},
        {bailleur:'Banque Mondiale ',sigle:'BM',code:"DFSDFDS525",created_at:"22-06-2022"},
        {bailleur:'Banque Mondiale ',sigle:'BM',code:"DFSDFDS525",created_at:"22-06-2022"},
        
          
      ],
      actions:[
        {name:'modifier',iconne:''},
        {name:'supprimer',iconne:''},
       
      ],
      champs:[
        {name:'Nom',type:'text',placeholdere:"Nom du bailleur",isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Email',type:'email',placeholdere:"Votre Email",isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Contact',type:'',placeholdere:'Votre contact',isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Sigle',type:'text',placeholdere:'Votre sigle',isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Logo',type:'file',placeholdere:'Votre logo ',isSelect:false,isTextArea:false,data:'',required:true,},
      ],
      cols:1,
      option:[
        {name:'supprimer'},
        {name:'modifier'},
        {name:'continuer',iconne:''},
      ]
    }
  },
  mounted() {
    
  },
  methods: {
    switch1() {
      this.mosaique = true
      this.line = false
    },
    switch2() {
      this.mosaique = false
      this.line = true
    },
    
    closeModal() {
      this.showModal=false
    },
    addBailleur() {
      this.title='Ajouter un nouveau bailleur'
      this.showModal = true
    },
    sendForm() {
      alert('donnée envoyer')
    },
    
    modifier(data) {
      this.title='Modifier un bailleur'
      this.showModal = true
    },

    gotoNext() {
       this.$router.push({name:'entreprise_checklist',params:{id:1}})
    },

    dupliquer(data) {
      alert(data+ " à ete bien supprimer")
    },
    
    supprimer(data) {
      alert(data +" à ete bien supprimer")
    },

    dupliquer(data) {
      this.showModal = true
      this.title='Dupliquer un bailleur'
      alert(data +" à ete bien dupliquer")
    },
   
  }
}
</script>

<style>

</style>