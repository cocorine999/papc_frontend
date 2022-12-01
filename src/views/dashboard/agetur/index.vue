<template>
  <dashboard>
    <div class="w-full">
      <modal-top-right v-if="showModal" :title="title" v-on:close="close">
        <form action="" @submit.prevent="createCollecteur" class="p-3 w-full" >
          <div class="form-group my-2">
             <div class="form-group my-2">
              <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light"> Collecteur  <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
              <input v-model="postData.nom" required class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="text" />
            </div>
            <div class="form-group my-2">
              <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Bailleurs <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
              <select v-model="postData.bailleurId" class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" name="" id="">
               <option v-for="(bailleur,index) in bailleurs " :key="index" :value="bailleur.id" > {{bailleur.sigle}} </option>
              </select>
            </div>
          </div>
          
          <div class="form-group my-2">
            <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Attributaires <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
            <multiselect v-model="value" tag-placeholder="Ajouter un type utilisateur" placeholder="Selectionez un attribut" label="name" track-by="name"  :selectLabel="'Appuyez sur Entrée pour sélectionner'" :deselectLabel="'Appuyez sur Entrée pour supprimer'"  :options="entreprises" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
          </div>
          <div class="form-group my-2">
            <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Estimation de l'accord financement <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
            <input v-model="postData.estimation" required class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="number" />
          </div>
          <div class="form-group my-2">
            <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Engagements (FCFA HT) <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
            <input v-model="postData.engagement" required class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="number" />
          </div>
          <div class="form-group my-2">
            <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">References contrats <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
            <input v-model="postData.reference" required class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="text" />
          </div>
          <div class="my-2">
            <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light"> Commentaires <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
            <textarea v-model="postData.commentaire" required class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent"  name="" id=""  rows="2"></textarea>
          </div>
          
          <div class="py-2 my-4 flex justify-center space-x-8">
            <button type="submit" class="bg-primary  flex space-x-2  items-center text-white px-4 py-2 border border-primary font-semibold uppercase">
                <span class="text-sm font-semibold uppercase" v-if="!chargement">
                  enregistrer
                </span>
                <span v-else class="flex items-center space-x-2">
                  <span class="text-xs px-4 font-semibold ">
                    envoi ...
                  </span>
                  <svg  xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-center animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </span>
            </button>
            <vbutton type="reset" template="danger" @close="close"> annuler </vbutton>
          </div>
        </form>
      </modal-top-right>
      <nav class="mb-2 text-sm font-semibold  " aria-label="Breadcrumb">
        <div>
          <ol class="inline-flex p-0 list-none">
            <li class="flex items-center ">
              <router-link to="#" class="text-gray-600">dashboard</router-link>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
            </li>

            <li class="flex items-center text-blue-500 ">
              <router-link to="" class="">collecteur</router-link>
            </li>
          </ol>
        </div> 
      </nav>
      <div v-if="showModal3">
        <vmodal title="Exportez les données "  v-on:close="showModal3 = false">
          <div style="width:40vw" class="p-4 flex items-center space-x-4 ">
            <div class="excel">
              <json-excel :data="SuivisIndicateurs" header="INDICATEUR SUIVI" type="xlsx" :name="title_csv()"  >
                <button  title="exporter en excel"   class="py-2  px-4 overflow-hidden  space-x-2 items-center text-xs font-semibold text-white uppercase bg-indigo-500 focus:outline-none focus:shadow-outline">
                  <span class="mx-2 text-xs  md:text-sm font-semibold">Exportez en excel </span>
                </button>
              </json-excel>
            </div>
          
            <div>
              <button @click="generateReport" class="py-2  px-4 overflow-hidden  space-x-2 items-center text-xs font-semibold text-white uppercase bg-indigo-500 focus:outline-none focus:shadow-outline">exportez en pdf</button>
            </div>
          </div>
        </vmodal>
      </div>
      <div class="flex items-center justify-between mt-2 mb-8">
        <div class="flex space-x-4">
          <span  class="inline-block cursor-pointer  text-base uppercase  border-b-8 font-bold  border-primary py-2">Tableau recapitulatif </span>
        </div>
        
        <button  @click="createTable" title="ajouter un tabelau"  class="p-2 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              style="fill: rgba(255, 255, 255, 1); transform: ; msfilter: "
            >
              <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg
          ></span>
          <span class="mx-2 text-xs  md:text-sm font-semibold">Ajouter</span>
        </button>
        
      </div>
      <div class="my-3 flex items-center space-x-3" >
        <button @click="showModal3 = true" title="exporter "   class="py-2  px-4 overflow-hidden  space-x-2 items-center text-xs font-semibold text-white uppercase bg-indigo-500 focus:outline-none focus:shadow-outline">
          <svg class="inline" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="2.0em" width="2.3em" xmlns="http://www.w3.org/2000/svg"><path d="M11 16h2V7h3l-4-5-4 5h3z"></path><path d="M5 22h14c1.103 0 2-.897 2-2v-9c0-1.103-.897-2-2-2h-4v2h4v9H5v-9h4V9H5c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2z"></path></svg>
          <span class="mx-2 text-xs  md:text-sm font-semibold">Exportez</span>
        </button>
      </div>
      <div class="align-middle inline-block w-full bg-white overflow-x-auto pt-3 rounded-bl-lg rounded-br-lg">
        <table class="w-full p-4">
          <thead>
            <tr>
              <th class="p-3 border border-gray-500 text-left  whitespace-nowrap leading-4 text-primary tracking-wider" >Bailleurs</th>
              <th class="p-3 border border-gray-500 text-left  whitespace-nowrap leading-4 text-primary tracking-wider">Collecteurs</th>
              <th class="p-3 border border-gray-500 text-left  whitespace-nowrap leading-4 text-primary tracking-wider">Attributaires</th>
              <th class="p-3 border border-gray-500 text-left  whitespace-nowrap leading-4 text-primary tracking-wider">Estimations de l'accord de financement</th>
              <th class="p-3 border border-gray-500 text-left  whitespace-nowrap leading-4 text-primary tracking-wider">Engagment</th>
              <th class="p-3 border border-gray-500 text-left  whitespace-nowrap leading-4 text-primary tracking-wider">Reference contrats</th>
              <th class="p-3 border border-gray-500 text-center  whitespace-nowrap leading-4 text-primary tracking-wider">Actions</th>
            </tr>
          </thead>
           <!--Il s'agit d'un tableau decomposé alors filter vos donnée avant de 'integretrer par bailleur' -->
          <tbody class="bg-white">
             <!--Specifier le nombre de ligne +1 de la table -->
           
            <tr v-for="i in 5" :key="i.id">
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs" >BM</td>
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs">Collecteur{{i}} </td>
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs">Attritubaire</td>
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs">Estimations</td>
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs">Engagment</td>
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs">
                <span v-if="showInput">Commentaires</span>
                <input v-if="!showInput" type="text" class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent">
              </td>
              <td class="p-3 whitespace-no-wrap text-center border border-gray-500 text-xs  leading-5">
                <div class="flex item-center justify-center">
                  <!-- <div title="details"  class="cursor-pointer w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div> -->
                  <button @click="showInput=true" v-if="!showInput" class="text-xs px-3 py-1 bg-green-500 text-white">Enregistrer</button>
                  <div v-if="showInput" class="w-4 mr-2 transform hover:text-blue-500 hover:scale-110"  @click="editer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  <div v-if="showInput"  class="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
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
import VueHtml2pdf from 'vue-html2pdf'
import JsonExcel from "vue-json-excel";
import Multiselect from 'vue-multiselect'
import ModalTopRight from '@/components/ModalTopRight'
import SearchBar from '@/components/SearchBar'
import CollecteurService from "@/services/modules/maitrise.oeuvres.service.js";
import BailleurService from "@/services/modules/bailleur.service.js";
import EntrepriseService from "@/services/modules/entreprise.executante.service.js";
import Dashboard from '@/layouts/Dashboard'
import Vbutton from '@/components/Vbutton'
import { mapGetters, mapActions, mapMutations, mapState} from "vuex";
export default {
  components: {
    Dashboard,
    SearchBar,
    ModalTopRight,
    Vbutton,
    Multiselect,
    VueHtml2pdf,
    JsonExcel
  },
  data() {
    return {
      showModal:false,
      showModal3:false,
      value:[],
      seeAgetur:true,
      seeFileManager:false,
      showInput:true,
      uploadFile:false,
      chargement:false,
      title:'',
      dataTable:[
        {baileur:'BM'},
        {baileur:'AFD'},
        {baileur:'BAD'},
        {baileur:'BOAD'},
        {baileur:'BEI'},
      ],
      collecteurs:[],
      programmeId:'',
      bailleurs:[],
      entreprises:[],
      postData:{
        nom:'',
        estimation:'',
        reference:'',
        engagement:'',
        commentaire:'',
        attributaire:[],
        bailleurId:''
      }
    }
    
  },
  computed: {
      //importation des variables du module auths
      ...mapGetters('auths', {currentUser : 'GET_AUTHENTICATE_USER'}),
      title_pdf() {
        const year = new Date().getFullYear() 
        return "suivi indicateur -" + year
      },
    },
  methods: {
    addTag (newTag) {
      const tag = {
        name: newTag,
      }
      this.options.push(tag)
      this.value.push(tag)
    },
    generateReport () {
      this.$refs.html2Pdf.generatePdf()
    },
    createCollecteur() {
        this.value.forEach(element => {
          this.postData.attributaire.push(element.id)
        })
        if(this.chargement == false) {
          this.chargement = true
          CollecteurService.create(this.postData).then((data) => {
            this.chargement = false
            this.$toast.success('nouveau element')
            this.showModal = false
            this.getCollection()
          }).catch((e) => {
            this.chargement = false  
            this.$toast.error(e)
          })
        }

    },
    getCollection() {
      CollecteurService.getDatas(this.programmeId).then((data) => {
        this.collecteurs = data.data.data
      }).catch((e) => {
        console.log(e)
      })
    },
    getBailleur() {
      BailleurService.bailleursOfProgramme(this.programmeId).then((data) => {
        this.bailleurs = data.data.data
      }).catch((e) => {
        console.log(e)
      })
    },
    getEntreprise() {
      EntrepriseService.get().then((data) => {
        const datas =  data.data.data 
        datas.forEach(element => {
          const id = element.id
          const name = element.user.nom
          this.entreprises.push({name,id})
        });
      }).catch((e) => {
        console.log(e)
      })
    },
    createTable() {
      this.title = 'Ajouter'
      this.showModal = true
    },
    
    gotoTable() {
      this.seeFileManager = false
      this.seeAgetur = true
    },
    gotoFileManager() {
      this.seeFileManager = true
      this.seeAgetur = false
    },
    editer() {
      this.showInput = false
    },
    close() {
      this.showModal = false
    },
    
  },
  mounted() {
    this.programmeId = this.currentUser.programme.id
    console.log(this.programmeId)
    this.getCollection()
    this.getBailleur()
    this.getEntreprise()
  }
}
</script>

<style>

</style>