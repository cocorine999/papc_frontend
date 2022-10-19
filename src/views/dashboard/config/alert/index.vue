<template>
  <dashboard>
    <div class="p-0">
      <div v-if="showModal">
        <modal-top-right  :title="title"  v-on:close="close">
          <div class="px-4">
              <vform
                template="default"
                :champs="champs"
                cols="1"
                submitText="modifer"
                @sendForm="sendForm"
                @closeModal="close" 
              ></vform>
          </div>
        </modal-top-right>
      </div>
      <nav class="mb-2 text-sm font-semibold flex justify-between items-center " aria-label="Breadcrumb">
        <div>
          <ol class="inline-flex p-0 list-none">
            <li class="flex items-center ">
              <router-link to="/dashboard" class="text-gray-600">dashboard</router-link>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
            </li>
            
            <li class="flex items-center text-blue-500 ">
              <router-link to="" class="">alert</router-link>
            </li>
          </ol>
        </div>
        <div>
          <search-bar ></search-bar>
        </div>
      </nav>
    
      <div class="my-8 flex justify-between items-center ">
        <titre>alert systeme  </titre>
      </div>
    
   
      <div class="align-middle inline-block w-full  overflow-hidden  pt-3 rounded-bl-lg rounded-br-lg">
        <table class="w-full">
          <thead>
            <tr>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Module</th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Nbre de jours avant alert</th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Frequence</th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-center text-sm leading-4 text-primary tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr v-for="(alert,index) in alerts" :key="index">
              <td :class="{'bg-green-500 text-white p-2':isSelect==true && indexSelect == index}" class="px-6 py-4 whitespace-no-wrap border-b border-gray-500"> {{alert.module}} </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500"> {{alert.nombreDeJourAvant}} </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500"> {{alert.frequence}} </td>
              <td class="px-6 py-4 whitespace-no-wrap text-center border-b border-gray-500 text-sm leading-5">
                <div class="flex item-center justify-center">
                  
                  <div v-if="alertUpdate" @click="modifierAlert(alert,index)" class="w-4 mr-2 cursor-pointer text-blue-500 transform hover:text-blue-800 hover:scale-110" >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
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
import Dashboard from '@/layouts/Dashboard'
import alertService from "@/services/modules/alert.service.js";

export default {
  components: {
    Dashboard,
    Vmodal,
    Titre,
    SearchBar,
    ModalTopRight,
    Vform,
  },
  data() {
      return ({
        alerts:[],
        saveData:{},
        showModal:false,
        title:'Modifier une alert',
        isSelect:false,
        indexSelect:0,
        champs:[
            {name: 'Nbre de jours avant alert', key: "nbre", type: 'number', placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
            {name: 'Frequence', key: "frequence", type: 'number', placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []}, 
        ],
        alertVisible:false,
        alertAdd:false,
        alertDelete:false,
        alertUpdate:false,      
        
      });
    },
    methods: {
      close() {
          this.showModal = false
          this.isSelect = false
      },
      modifierAlert(data,index) {
            this.indexSelect = index
            this.saveData = data
            this.champs[0].data = data.nombreDeJourAvant
            this.champs[1].data = data.frequence
            this.showModal = true
            this.isSelect = true
      },
      getPermission() {
          this.currentUser.role[0].permissions.forEach(element => {
            if(element.slug ==='voir-une-configuration-alerte') {
              this.alertVisible = true
            }
            if(element.slug === 'creer-une-configuration-alerte') {
              this.alertAdd = true
            }
            if(element.slug === 'modifier-une-configuration-alerte') {
              this.alertUpdate = true
            }
            if(element.slug ==='supprimer-une-configuration-alerte') {
              this.alertDelete = true
            }
            
          });

      },
      getAlert() {
            alertService.get().then((data) => {
                const datas = data.data.data
                this.alerts = datas
            }).catch((e) => {
                console.log(e)
            })
      },
      sendForm() {
            const data = {
                nombreDeJourAvant: this.champs[0].data,
                frequence:this.champs[1].data
            }
             alertService.update(this.saveData.id,data).then((data) => {
                this.$toast.success("Mise à jours effectué avec success !")
                this.getAlert()
               this.close()
            }).catch((e) => {
                console.log(e)
            })
      }
    },
   
  mounted() {
    this.getPermission()
    if(!this.alertVisible) {
      this.$router.push('/401-non-autorise')
    } 
   this.getAlert()
  },

}
</script>

<style scoped>

</style>