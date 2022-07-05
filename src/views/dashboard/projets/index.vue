<template>
  <dashboard>
    <div class="w-full p-4">
      <div v-if="showModal">
        <vmodal :title="title" v-on:close="close">
          <form style="width:60vw;height: 450px;" class="p-4 overflow-auto">
            <div v-if="title =='Ajouter un nouveau projet'">
              <vform template="default" isAllPairSaufDescrip="true" :champs="champs" :cols="cols" submitText="Enregistrer" @sendForm="sendForm" ></vform>
            </div>
            <div v-if="title =='Modifier un nouveau projet'">
              <vform template="default" :champs="champs" :cols="cols" submitText="Modifier" @sendForm="sendForm" ></vform>
            </div>
            <div v-if="title =='Dupliquer un nouveau projet'">
              <vform template="default" :champs="champs" :cols="cols" submitText="Enregistrer" @sendForm="sendForm" ></vform>
            </div>
          </form>
        </vmodal>
      </div>
      <nav class="mb-2 text-sm font-semibold flex justify-between items-center " aria-label="Breadcrumb">
        <div>
          <ol class="inline-flex p-0 list-none">
            <li class="flex items-center text-blue-500">
              <router-link to="/dashboard" class="text-gray-600">dashboard</router-link>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
            </li>
            <li class="flex items-center text-blue-500 ">
              <router-link to="/dasboard/projet" class="">projets</router-link>
            </li>
          </ol>
        </div>
        <div>
          <search-bar ></search-bar>
        </div>
      </nav> 
      
      <div class="flex items-center justify-between my-2">
        <div class="">
          <span  class="inline-block cursor-pointer  border-b-8 font-bold  text-sm uppercase    border-primary py-2">Les projets </span>
        </div>

        <button @click="addProjet"  title="ajouter un projet"   class="p-2 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase rounded bg-primary focus:outline-none focus:shadow-outline">
          <span><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM17 11h-4v4h-2v-4H7V9h4V5h2v4h4v2z"></path></svg></span>
          <span class="mx-2 text-xs font-semibold">ajouter</span>
        </button>
      </div>
      <div  class="grid grid-cols-1 my-4 lg:grid-cols-3 md:grid-cols-2 sm:gap-5">
        <div v-for="(projet,index) in projets" :key="index">
          <div @click="gotoDetails(index)" class="bg-white p-0 mb-6 transition duration-300 group transform hover:-translate-y-1 hover:shadow-lg cursor-pointer  shadow-md border-bottom border-indigo-500">
            <!-- <a href="#1" class="absolute opacity-0 top-0 right-0 left-0 bottom-0"></a> -->
            <div class="flex justify-center items-top p-4 bg-gray-600 bg-opacity-100 z-10 absolute top-0 left-0 w-full h-full text-white opacity-0 transition-all duration-300 transform group-hover:scale-105 text-lg group-hover:opacity-100">
              <p class="max-h-48 line-clamp-7 px-2">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis ipsam culpa aliquam repellat officiis sed voluptatem? Dolor similique,! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam cumque mollitia fugiat error dolorum corporis et neque corrupti fugit quos? Enim deleniti nostrum iusto adipisci eaque, ex possimus, maiores esse, ipsam qui ea. Excepturi placeat quisquam voluptates cupiditate quibusdam, recusandae repudiandae. Accusantium mollitia eos beatae velit fugit, error commodi iste! </p>
              <div class="absolute bottom-5 ">
                  <div class="uppercase text-sm flex items-center text-white bg-white text-primary px-4 py-3 font-bold">Voir plus<i class='bx bx-right-arrow-alt ml-1 icon-bold'></i></div>
                </div>
            </div>
            <div class="relative mb-2">
              <img class=" max-h-52 w-full object-cover transition-transform duration-300 transform group-hover:scale-100"
                :src="projet.link"
                alt="">
                <div class="absolute bottom-0 right-0">
                  <div v-if="projet.status=='en cours' " class=" text-sm flex items-center text-white bg-yellow-500 px-3 py-1 font-semibold">En cours<i class='bx bx-time-five ml-1'></i></div>
                  <div v-if="projet.status=='terminer' " class=" text-sm flex items-center text-white bg-green-500 px-3 py-1 font-semibold">Terminer<i class='bx bx-time-five ml-1'></i></div>
                  <div v-if="projet.status=='en attente' " class=" text-sm flex items-center text-white bg-gray-500 px-3 py-1 font-semibold">En attente <i class='bx bx-time-five ml-1'></i></div>
                </div>
                <div class="absolute top-2 left-2">
                  <div :class="projet.color" class="uppercase rounded-lg text-sm flex items-center text-white  px-3 py-1 font-semibold"><i class='bx bx-coin-stack mr-1'></i>{{projet.bailleur}}
                  </div>
                </div>
            </div>
            <div class="block px-4 pb-4">
              <span :class="projet.color" class="absolute bottom-0 left-0 w-full  h-2"></span>
              <h3 class="font-medium text-xl">
                <a href="#2"
                  class="block uppercase relative group-hover:text-gray-800 transition-colors duration-200 line-clamp-2 text-lg">{{projet.libelle}}
                </a>
              </h3>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </dashboard>
  
</template>

<script>
import SearchBar from '@/components/SearchBar'
import Titre from '@/components/Titre'
import Vtable from '@/components/Vtable'
import Vform from '@/components/Vform'
import Vmodal from '@/components/Vmodal'
import Dashboard from '@/layouts/Dashboard'

export default {
  components: {
    Vtable,
    Dashboard,
    Vmodal,
    Vform,
    Titre,
    SearchBar,
   
  },
  data() {
    return {
      showModal:false,
      loading:false,
      champs:[
        {name:'Nom du projet',type:'text',placeholdere:"Nom du projet",isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Poids',type:'number',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Pret',type:'number',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Budget Nationnal',type:'number',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Date debut',type:'date',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Date fin',type:'date',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Couleurs',type:'color',placeholdere:'Choississez une couleur',isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Piece jointe',type:'file',placeholdere:'Choississez une couverture',isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Ville',type:'',placeholdere:'Selectionnez une ville',isSelect:true,isTextArea:false,data:'',required:true,options:['cotonou','calavi','bohicon']},
        {name:'Bailleurs',type:'',placeholdere:'Selectionnez un bailleur',isSelect:true,isTextArea:false,data:'',required:true,options:['BM','BOA','Unesco']},
        {name:'Status',type:'',placeholdere:'Selectionnez un status',isSelect:true,isTextArea:false,data:'',required:true,options:['en cours','terminer','en attente']},
        {name:'Objectifs globaux',type:'',placeholdere:'',isSelect:false,isTextArea:true,data:'',required:true,},
        {name:'Description',type:'',placeholdere:'Description du projet',isSelect:false,isTextArea:true,data:'',required:true,},
        {name:'Objectif globaux',type:'text',placeholdere:'Definir les objectifs',isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Budget national',type:'number',placeholdere:'Definir un budget',isSelect:false,isTextArea:false,data:'',required:true,},
      ],
      cols:2,
      projets:[ {
        code: ":4.1.1.3.1" ,
        bailleur: "BM",
        nomBailleur: "Banque Mondiale",
        libelle: "PROJET DE GESTION DES EAUX PLUVIALES ET DE RÉSILIENCE URBAINE AU BÉNIN (BANQUE MONDIALE)",
        montant: "1,561,078.941",
        montantEPM: " 45,833,473.42",
        debut: "01-01-2022",
        fin: "31-12-2022",
        pays: "Benin",
        color:' bg-green-500',
        link:"https://mapiwee.com/wp-content/uploads/2020/07/Mapiwee-by-Maped-limportance-de-leau-expliqu%C3%A9-aux-enfants.jpeg",
        status:"en cours"
      },
{
          code: ":4.1.1.3.2" ,
          bailleur: "BAD & AGTPF",
          nomBailleur: "BANQUE AFRICAINE DE DEVELOPPEMENT-BAD",
          libelle: "PROJET D'APPUI AU PROGRAMME D'ASSAINISSEMENT PLUVIAL DE LA VILLE DE COTONOU (BANQUE AFRICAINE DE DEVELOPPEMENT-BAD)",
          montant: "1,826,908.000",
          montantEPM: "37,860,726.60",
          debut: "01-01-2022",
          fin: "31-12-2022",
          pays: "Benin",
          color:' bg-pink-500',
          link:"https://cappfm.com/wp-content/uploads/2021/06/Lignes-MCA03.jpg",
          status:"terminer"
        },
          {
            code: ":4.1.1.3.3" ,
            bailleur: "BOAD",
            nomBailleur: "BANQUE OUEST-AFRICAINE DE DEVELOPPEMENT-BOAD",
            libelle: "TRANCHE D'URGENCE DU PROGRAMME D'ASSAINISSEMENT PLUVIAL DE LA VILLE DE COTONOU (BANQUE OUEST-AFRICAINE DE DEVELOPPEMENT-BOAD)",
            montant: "328,000.000",
            montantEPM: "17,559,584.75",
            debut: "01-01-2022",
            fin: "31-12-2022",
            pays: "Benin",
            color:' bg-purple-500',
            link:"https://i0.wp.com/netafrique.net/wp-content/uploads/2020/05/caniveaux.jpg?w=650&ssl=1",
            status:"en attente"
          },
          {
            code: ":4.1.1.3.4" ,
            bailleur: "BEI",
            nomBailleur: "BANQUE EUROPEENNE D'INVESTISSEMENT-BEI",
            libelle: "DRAINAGE EAUX PLUVIALES COTONOU (BANQUE EUROPEENNE D'INVESTISSEMENT-BEI)",
            montant: "200,756.000",
            montantEPM: "25,420,255.50",
            debut: "01-01-2022",
            fin: "31-12-2022",
            pays: "Benin",
            color:' bg-blue-500',
            link:"https://upload.wikimedia.org/wikipedia/commons/a/a9/Avlopp_-_Ystad-2018.jpg",
            status:"en cours"
          },
          {
            code: ":4.1.1.3.5" ,
            bailleur: "AFD",
            nomBailleur: "AGENCE FRANCAISE DE DEVELOPPEMENT-AFD",
            libelle: "PROJET D'APPUI AU PROGRAMME D'ASSAINISSEMENT PLUVIAL DE LA VILLE DE COTONOU (AGENCE FRANCAISE DE DEVELOPPEMENT-AFD)",
            montant: "300,000.000",
            montantEPM: "26,493,910.00",
            debut: "01-01-2022",
            fin: "31-12-2022",
            pays: "Benin",
            color:' bg-red-500',
            link:"https://images.lpcdn.ca/924x615/201004/29/166792-lafrique-toujours-continent-plus-concerne.jpg",
            status:"terminer"
          },
          {
            code: ":4.1.1.3.6" ,
            bailleur: "BID",
            nomBailleur: "BANQUE BANQUE ISLAMIQUE DE DEVELOPPEMENT-BID",
            libelle: "PROJET DE DRAINAGE DES EAUX PLUVIALES DE COTONOU (BANQUE BANQUE ISLAMIQUE DE DEVELOPPEMENT-BID)",
            montant: "1,100,000.00",
            montantEPM: "55,285,665.13",
            debut: "01-01-2022",
            fin: "31-12-2022",
            pays: "Benin",
            color:' bg-yellow-500',
            link:"https://img.lemde.fr/2019/08/16/348/0/5472/2732/1440/720/60/0/fd35104_60h03rsCX47a59hsCnfKINuv.jpg",
            status:"terminer"
          },

      ],
     
      option:[
        {name:'supprimer'},
        {name:'modifier'},
        {name:'dupliquer'},
      ],
     
    
      title:''
    }
    
  },
  methods: {
    gotoDetails(id) {
      this.$router.push({name:'projets_id_details',params:{id:id}})
     
    },
    addDate() {
      this.dates.push({})
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
    }
  }
}
</script>

<style scoped>
.icon-bold{
  font-weight: 800;
}
</style>