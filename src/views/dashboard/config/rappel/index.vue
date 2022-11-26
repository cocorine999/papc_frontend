<template>
  <dashboard>
    <div class="w-full">
    <div v-if="showModal">
      <modal-top-right  :title="title"  v-on:close="close">
         <div class="w-full px-4">
            <vform
              template="default"
              :champs="champs"
              cols="1"
              :submitText="submitText"
              @sendForm="sendForm"
              @closeModal="close" 
            ></vform>
        </div>
      </modal-top-right>
    </div>
    <nav class="mb-2 mt-4 text-sm font-semibold flex justify-between items-center 	" aria-label="Breadcrumb">
      <div>
        <ol class="inline-flex p-0 list-none">
          <li class="flex items-center ">
            <router-link to="#" class="text-gray-600">dashboard</router-link>
            <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
          </li>
          
          <li class="flex items-center text-blue-500 ">
            <router-link to="" class="">rappels</router-link>
          </li>
        </ol>
      </div>
      <div>
        <search-bar ></search-bar>
      </div>
    </nav>
    
    <div class="my-2 flex justify-between items-center ">
      <titre>rappels alert  </titre>
       <button  @click="addRappel" title="ajouter un rappel"   class="py-2 px-4  overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
        <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg></span>
        <span class="mx-2 text-xs  md:text-sm font-semibold">Ajouter un rappel</span>
      </button>
    </div>
    
  
     <div class="align-middle inline-block w-full  overflow-auto  pt-3 rounded-bl-lg rounded-br-lg">
      <table class="w-full p-4">
        <thead>
          <tr>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Nom</th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Description</th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Date avant rappel</th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Date rappel </th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Frequence</th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-center text-sm leading-4 text-primary tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="(rappel,index) in rappels" :key="index">
            <td :class="{'bg-green-500 text-white p-2':isSelect==true && indexSelect == index}" class="px-6 py-4 whitespace-no-wrap border-b border-gray-500"> {{rappel.nom}} </td>
            <td-description :data="rappel.description"></td-description>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500"> {{rappel.dateAvant}} </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">  </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500"> {{rappel.frequence}} </td>
            <td class="px-6 py-4 whitespace-no-wrap text-center border-b border-gray-500 text-sm leading-5">
              <div class="flex item-center justify-center">
                
                <div @click="modifierRappel(rappel,index)" class="w-4 mr-2 cursor-pointer text-blue-500 transform hover:text-blue-800 hover:scale-110" >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
               <div   class="w-4 mr-2 transform hover:text-red-700 text-red-500 hover:scale-110"  @click="supprimerRappel(rappel,index)">
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
import SearchBar from '@/components/SearchBar'
import Titre from '@/components/Titre'
import Vmodal from '@/components/Vmodal'
import Vform from '@/components/Vform'
import TdDescription from '@/components/TdDescription'
import Dashboard from '@/layouts/Dashboard'
import rappelService from "@/services/modules/rappel.service.js";

export default {
  components: {
    Dashboard,
    Vmodal,
    Titre,
    SearchBar,
    ModalTopRight,
    Vform,
    TdDescription
  },
  data() {
      return ({
        rappels:[],
        saveData:{},
        showModal:false,
        title:'ajouter une alerte',
        submitText:'ajouter',
        isSelect:false,
        indexSelect:0,
      
        champs:[
            {name: 'libelle', key: "libelle", type: 'text', placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
            {name: 'Frequence (jours)', key: "frequence", type: 'number', placeholdere: "cette valeur est en nombre de jour", isSelect: false, isTextArea: false, data:'', required: true, errors : []}, 
            {name: 'Date avant rappel', key: "dateAvant", type: 'date', placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []}, 
            {name: 'Date du rappel', key: "dateDuRappel", type: 'date', placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []}, 
            {name: 'Description', key: "description", type: '', placeholdere: "", isSelect: false, isTextArea: true, data:'', required: true, errors : []}, 
        ],
        
        
      });
    },
    methods: {
        close() {
            this.showModal = false
            this.isSelect = false
            this.saveData = {}
            this.champs[0].data = ''
            this.champs[1].data =''
            this.champs[2].data = ''
            this.champs[3].data = ''
            this.champs[4].data = ''
        },
       
      
        addRappel() {
            this.title = "Ajouter un rappel"
            this.submitText = "Ajouter"
            this.showModal = true
            
        },
        supprimerRappel(data,index) {
            if ( window.confirm("Voulez-vous supprimez ce rappel " ) ) {
                rappelService.destroy(data.id).then(() => {
               this.$toast.success("suppression effectué avec success !")
                this.rappels.splice(index, 1);
                }).catch((e) => {
                    console.log(e)
                })
            }
            
        },
        modifierRappel(data,index) {
            this.title = "Modifier un rappel"
            this.submitText = "Modifier"
            this.indexSelect = index
            this.saveData = data
            this.champs[0].data = data.nom
            this.champs[1].data = data.frequence
            this.champs[2].data = data.dateAvant
            this.champs[3].data = data.dateDeRappel
            this.champs[4].data = data.description
            this.showModal = true
            this.isSelect = true
            
        },
        saveUpdate() {
            const data = {
                nom:this.champs[0].data,
                description:this.champs[4].data,
                frequence:this.champs[1].data,
                dateDeRappel:this.champs[3].data,
                dateAvant:this.champs[2].data
            }
            rappelService.update(this.saveData.id,data).then(() => {
                this.$toast.success("Operation effectué avec success !")
                this.getRappel()
                this.close()
                this.saveData = {}
                this.champs = []
            }).catch((e) => {
               this.$toast.error(e)
            })
        },
        getRappel() {
            rappelService.get().then((data) => {
                const datas = data.data.data
                this.rappels = datas
            }).catch((e) => {
                console.log(e)
            })
        },
        sendForm() {
           const data = {
                nom:this.champs[0].data,
                description:this.champs[4].data,
                frequence:this.champs[1].data,
                dateDeRappel:this.champs[3].data,
                dateAvant:this.champs[2].data
            }
            rappelService.create(data).then(() => {
                this.$toast.success("nouveau rappel creer !")
                this.getRappel()
                this.close()
            }).catch((e) => {
               this.$toast.error(e)
            })
        }
    },
   
  mounted() {
   this.getRappel()
  },

}
</script>

<style scoped>

</style>