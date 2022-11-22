<template>
  <dashboard>
    <div class="p-0 w-full">
      <vmodal v-if="showRapport" @close="showRapport = false">
        <div style="width:60vw">
          <preview template="audit" :datas="sendRapportFile" @previewFile="previewFile"></preview>
        </div>
      </vmodal>
     
      <modal-top-right v-if="showModal" :title="title" v-on:close="close">
        <form action="" @submit.prevent="saveAudit" v-if="title=='Ajouter'" class="p-3 w-full" >
          <div class="form-group my-2">
            <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Prestataire <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
            <input  v-model="audit.entreprise" required class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="text" />
          </div>
          <div class="form-group my-2">
            <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Contact <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
            <input v-model="audit.entrepriseContact" required class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="number" />
          </div>
          <div class="form-group my-2">
            <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Année Audit <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
            <input v-model="audit.annee"  required class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="number" />
          </div>
         
          <div class="form-group my-2">
            <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Date de transmission <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
            <input v-model="audit.dateDeTransmission" required class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="date" />
          </div>

          <div class="form-group my-2">
            <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Etat avancement <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
            <input v-model="audit.etat" required class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="text" />
          </div>
          <div>
            <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Rapport <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
            <input class="block w-full text-sm text-gray-900 bg-gray-50  border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" multiple type="file" @change="getFile">
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PDF,WORD(MAX. 20 MO)</p>
          </div>
          <div class="form-group my-2">
            <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Statut <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
            <select v-model="audit.statut" class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" name="" id="">
              <option value="1"> Terminer </option>
              <option value="0"> En cours </option>
              <option value="-1"> En attente </option>
              
            </select>
          </div>
          <div class="form-group my-2">
            <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Projets <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
            <multiselect v-model="audit.projetId" :options="projets"  :preselect-first="true" placeholder="selectionnez un projet" label="nom" track-by="id"></multiselect>
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
        <form v-else action="" @submit.prevent="updateAudit"  class="p-3 w-full" >
          <div class="form-group my-2">
            <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Prestataire <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
            <input  v-model="saveUpdate.entreprise" required class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="text" />
          </div>
          <div class="form-group my-2">
            <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Contact <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
            <input v-model="saveUpdate.entrepriseContact" required class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="number" />
          </div>
          <div class="form-group my-2">
            <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Année Audit <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
            <input v-model="saveUpdate.annee"  required class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="number" />
          </div>
         
          <div class="form-group my-2">
            <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Date de transmission <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
            <input v-model="saveUpdate.dateDeTransmission" required class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="date" />
          </div>

          <div class="form-group my-2">
            <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Etat avancement <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
            <input v-model="saveUpdate.etat" required class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="text" />
          </div>
          <div>
            <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Rapport <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
            <input class="block w-full text-sm text-gray-900 bg-gray-50  border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" multiple type="file" @change="getFile">
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PDF,WORD(MAX. 20 MO)</p>
          </div>
          <div class="form-group my-2">
            <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Statut <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
            <div v-if="!showStatut">
              <input v-if="saveUpdate.statut==1" value="Terminer" @click="showStatut = true" required class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="text" />
              <input v-if="saveUpdate.statut==-1" value="En attente" @click="showStatut = true" required class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="text" />
              <input v-if="saveUpdate.statut==0" value="En cours" @click="showStatut = true" required class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="text" />
            </div>
           
            <select v-model="audit.statut" v-else class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" name="" id="">
              <option value="1"> Terminer </option>
              <option value="0"> En cours </option>
              <option value="-1"> En attente </option>
            </select>
          </div>
          <div class="form-group my-2">
            <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Projets <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
           
            <multiselect v-model="audit.projetId"  :options="projets"  :preselect-first="true" placeholder="selectionnez un projet" label="nom" track-by="id"></multiselect>
          </div>

          <div class="py-2 my-4 flex justify-center space-x-8">
            <button type="submit" class="bg-primary  flex space-x-2  items-center text-white px-4 py-2 border border-primary font-semibold uppercase">
              <span class="text-sm font-semibold uppercase" v-if="!chargement">
                modifier
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
              <router-link to="/dashboard" class="text-gray-600">dashboard</router-link>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
            </li>

            <li class="flex items-center text-blue-500 ">
              <router-link to="" class="">audit</router-link>
            </li>
          </ol>
        </div> 
      </nav>
      
      <div class="flex items-center justify-between mt-2 mb-8">
        <div class="flex space-x-4">
          <span  class="inline-block cursor-pointer  text-base uppercase  border-b-8 font-bold  border-primary py-2">Tableau recapitulatif </span>
        </div>
        
        <button  @click="createAudit" title="ajouter un audit"  class="p-2 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
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

    
     
     
      <div class="align-middle inline-block w-full bg-white overflow-x-auto pt-3 rounded-bl-lg rounded-br-lg">
        <table class="w-full">
          <thead>
            <tr>
              <th class="p-3 border border-gray-500 text-left  whitespace-nowrap leading-4 text-primary tracking-wider" >Projet</th>
              <th class="p-3 border border-gray-500 text-left  whitespace-nowrap leading-4 text-primary tracking-wider" >Prestataire</th>
              <th class="p-3 border border-gray-500 text-left  whitespace-nowrap leading-4 text-primary tracking-wider" >Contact</th>
              <th class="p-3 border border-gray-500 text-left  whitespace-nowrap leading-4 text-primary tracking-wider">année audit</th>
              <th class="p-3 border border-gray-500 text-left  whitespace-nowrap leading-4 text-primary tracking-wider">Date de transmission</th>
              <th class="p-3 border border-gray-500 text-left  whitespace-nowrap leading-4 text-primary tracking-wider">Etat avancement</th>
              <th class="p-3 border border-gray-500 text-left  whitespace-nowrap leading-4 text-primary tracking-wider">Statut de l'audit</th>
              <th class="p-3 border border-gray-500 text-left  whitespace-nowrap leading-4 text-primary tracking-wider">Date de creation</th>
             
             <!--  <th class="p-3 border border-gray-500 text-left  whitespace-nowrap leading-4 text-primary tracking-wider">Rapport de l'audit</th> -->
              <th class="p-3 border border-gray-500 text-center  whitespace-nowrap leading-4 text-primary tracking-wider">Actions</th>
            </tr>
          </thead>
           <!--Il s'agit d'un tableau decomposé alors filter vos donnée avant de 'integretrer par bailleur' -->
          <tbody class="bg-white">
             <!--Specifier le nombre de ligne +1 de la table -->
           
            <tr v-for="(audit,index) in audits" :key="index">
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs">{{audit.projet.nom}} </td>
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs">{{audit.entreprise}} </td>
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs">{{audit.entrepriseContact}} </td>
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs">{{audit.annee}}</td>
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs">{{audit.dateDeTransmission}}</td>
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs">{{audit.etat}}</td>
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs">
                <span v-if="audit.statut == 1">Terminer</span>
                <span v-if="audit.statut == 0">En cours</span>
                <span v-if="audit.statut == -1">En attente</span>
                
              </td>
              <!-- <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs">
                <div class="flex space-x-1">
                  <span><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg></span>
                  <span><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg></span>
                  <span><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg></span>
                  <span><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg></span>
                </div>
              </td> -->
              
              <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs">{{audit.created_at}}</td>
              
              <td class="p-3 whitespace-no-wrap text-center border border-gray-500 text-xs  leading-5">
                <div class="flex item-center justify-center">
                  <div title="details" @click="previewRapport(audit.rapport[0])" class="cursor-pointer w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div class="w-4 mr-2 transform hover:text-red-500 hover:scale-110"  @click="supprimerAudit(audit)">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  </div>
                  <div class="w-4 mr-2 transform hover:text-blue-500 hover:scale-110"  @click="modifierAudit(audit)">
                    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                  </div>
                </div>      
              </td>
             
            </tr> 
            <!--Specifier le nombre de ligne +1 de la table -->
                      
          </tbody>
        </table>
        
      </div>
    
    </div>
  </dashboard>
</template>

<script>
import Vmodal from '@/components/Vmodal'
import Vform from "@/components/Vform";
import Multiselect from 'vue-multiselect'
import ModalTopRight from '@/components/ModalTopRight'
import SearchBar from '@/components/SearchBar'
import Preview from '@/components/Preview.vue'
import AuditService from "@/services/modules/audit.service.js";
import ProjetService from "@/services/modules/projet.service.js";
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
    Vmodal,
    Preview,
    Vform
  },
  data() {
    return {
      showModal:false,
      title:'',
      audit:{
        annee:'',
        entreprise:'',
        entrepriseContact:'',
        dateDeTransmission:'',
        etat:'',
        statut:'',
        projetId:''
      },
      projets:[],
      chargement:false,
      audits:[],
      showRapport:false,
      fichiers:[],
      sendRapportFile:null,
      showSelect:false,
      showStatut:false,
      saveUpdate:{}
    }
    
  },
  computed: {
      //importation des variables du module auths
      ...mapGetters('auths', {currentUser : 'GET_AUTHENTICATE_USER'})
    },
  methods: {
    active() {
      this.$store.dispatch('active')
    },
    disabled() {
      this.$store.dispatch('disabled')
    },
    supprimerAudit(data) {
      if ( window.confirm("Voulez-vous supprimer cette ligne ,operation est irreversible ") ){
          AuditService.destroy(data.id).then(() => {
            this.getAudit()
          }).catch((e) => {
            console.log(e)
          })
        }
    },
    updateAudit() {
      if(this.chargement == false) {
          this.chargement = true
          const data = this.saveUpdate
          const audit = this.audit
          audit.projetId = audit.projetId.id
          const formData = new FormData();
          formData.append('annee', data.annee)
          formData.append('entreprise', data.entreprise)
          formData.append('entrepriseContact', data.entrepriseContact)
          formData.append('dateDeTransmission', data.dateDeTransmission)
          formData.append('etat', data.etat)
          formData.append('statut', audit.statut)
          formData.append('projetId', audit.projetId)
          formData.append('rapport', this.fichiers)
          
          AuditService.update(data.id,formData).then((data) => {
            this.chargement = false
            this.$toast.success('operation effectuer ave success')
            this.showModal = false
            this.getAudit()
            data.annee = ''
            data.entreprise =''
            data.entrepriseContact = ''
            data.dateDeTransmission = ''
            data.etat = ''
            audit.statut = ''
            audit.projetId = null
            this.fichiers = ''
          }).catch((e) => {
            this.chargement = false  
            this.$toast.error(e)
          })
      }
    },
    modifierAudit(data) {
      this.saveUpdate = data
      this.audit.projetId = data.projet
      this.audit.statut = data.statut
      this.title='Modifier un audit'
      this.showModal = true
    },
    previewRapport(data) {
      this.showRapport = true
      this.sendRapportFile = data
    },
    getFile(event) {
      this.fichiers = event.target.files[0];
    },
    selectProjet ({ nom}) {
      return `${nom}`
    },
    saveAudit() {
      if(this.chargement == false) {
          this.chargement = true
          const data = this.audit
          data.projetId = data.projetId.id
          const formData = new FormData();
          formData.append('annee', data.annee)
          formData.append('entreprise', data.entreprise)
          formData.append('entrepriseContact', data.entrepriseContact)
          formData.append('dateDeTransmission', data.dateDeTransmission)
          formData.append('etat', data.etat)
          formData.append('statut', data.statut)
          formData.append('projetId', data.projetId)
          formData.append('rapport', this.fichiers)
          
          AuditService.create(formData).then((data) => {
            this.chargement = false
            this.$toast.success('nouveau element')
            this.showModal = false
            this.getAudit()
            this.audit.annee = ''
            this.audit.entreprise =''
            this.audit.entrepriseContact = ''
            this.audit.dateDeTransmission = ''
            this.audit.etat = ''
            this.audit.statut = ''
            this.audit.projetId = null
            this.fichiers = ''
          }).catch((e) => {
            this.chargement = false  
            this.$toast.error(e)
          })
      }
    },
    getAudit() {
      this.active()
      AuditService.get().then((data) => {
        this.audits = data.data.data
        this.disabled()
      }).catch((e) => {
        console.log(e)
        this.disabled()
      })
    },
    getProjet() {
      ProjetService.get().then((data) => {
        this.projets = data.data.data
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
    createAudit() {
      this.title = 'Ajouter'
      this.showModal = true
    },
    
    
    close() {
      this.showModal = false
    },
    
  },
  mounted() {
    this.getProjet()
    this.getAudit()
  }
}
</script>

<style>

</style>