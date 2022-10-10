<template>
  <dashboard>
    <div v-if="institutionVisible" class="w-full px-4">
      <div v-if="showModal">
        <ModalTopRight  :title="title"  v-on:close="close">
          <div class="px-4">
            <vform template="default" :champs="champs" :cols="cols" :submitText="submitText" @sendForm="sendForm" @closeModal="close"></vform>
          </div>
        </ModalTopRight>
      </div>
      
      <nav class="mb-2 mt-4 text-sm font-semibold flex justify-between items-center " aria-label="Breadcrumb">
        <div>
          <ol class="inline-flex p-0 list-none">
            <li class="flex items-center text-blue-500">
              <router-link to="" class="text-gray-600">dashboard</router-link>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
            </li>
            <li class="flex items-center ">
              <router-link to="" class="text-gray-600">institutions</router-link>
            </li>
          </ol>
        </div>
        <div>
          <div class="w-full flex text-gray-600">
              <input @input="$emit('search',$event.target.value)" class="h-10  w-full px-5 pr-16 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none" v-model="search" type="text" name="search" placeholder="Rechercher" >
              <button type="submit" class="relative  right-10 ">
              <svg class="w-4 h-4 text-gray-600 fill-current" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
                    viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve"
                    width="512px" height="512px">
                 <path
                    d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
             </button>
           </div>        
        </div>
      </nav> 

      <div class="flex justify-start mt-2">
        <div class="flex  items-center ">
        <span title="vue en mosaique" @click="switchBetweenCode({mosaique: true, line: false})" :class="{'border-2':mosaique}" class="p-2  cursor-pointer border-gray-500 text-gray-700 hover:text-gray-500"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.8em" width="1.8em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M3 5v14a2 2 0 002 2h6V3H5a2 2 0 00-2 2zm16-2h-6v8h8V5c0-1.1-.9-2-2-2zm-6 18h6c1.1 0 2-.9 2-2v-6h-8v8z"></path></svg></span>
          <span title="vue en ligne" @click="switchBetweenCode({mosaique:false, line: true})" :class="{'border-2':line}" class="p-2 text-gray-700 border-gray-500 cursor-pointer hover:text-gray-500 "><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.8em" width="1.8em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M3 14h4v-4H3v4zm0 5h4v-4H3v4zM3 9h4V5H3v4zm5 5h13v-4H8v4zm0 5h13v-4H8v4zM8 5v4h13V5H8z"></path></svg></span>
        </div>
      </div>
      <div class="flex items-center justify-between my-2" >
        <titre>Les Institution </titre>
          <button v-if="institutionVisible" @click="addInstitution" title="ajouter une instutitions"   class="py-2 px-4 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase bg-primary focus:outline-none focus:shadow-outline">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
            <span class="mx-2 text-xs md:text-sm font-semibold">Ajouter </span>
          </button>
      </div>

      <div v-if="mosaique" class="grid grid-cols-1 my-4 lg:grid-cols-3 md:grid-cols-2 sm:gap-5">
          <div v-for="(institution,index) in filteredInstitution()" :key="index">

            <div
              class="relative"
            >
                <div class="absolute right-1 top-4 z-10  cursor-pointer">
                  <dropdown v-if="institutionDelete && institutionUpdate " @gotoNext="gotoNext" @supprimer="supprimerInstitution(institution)"  @modifier="modifierInstitution(institution)" @duplicate='dupliquerInstitution(institution)' :option="option"></dropdown>
                  <dropdown v-if="!institutionDelete && institutionUpdate " @gotoNext="gotoNext"   @modifier="modifierInstitution(institution)" @duplicate='dupliquerInstitution(institution)' :option="optionUpdate"></dropdown>
                  <dropdown v-if="institutionDelete && !institutionUpdate " @gotoNext="gotoNext" @supprimer="supprimerInstitution(institution)"   @duplicate='dupliquerInstitution(institution)' :option="optionD"></dropdown>
                </div>
                
                <div class="relative p-6 max-w-80 bg-white sm:rounded-lg overflow-hidden _shadow-md">
                    <span class="absolute text-4xl sm:text-5xl text-white tracking-tight font-bold bg-pink-500 px-4 py-2 rounded-lg uppercase"><i class='bx bx-coin-stack bx-md'></i>{{institution.nom}}</span>
                    
                    <p class="my-2 text-normal text-sm sm:text-base font-medium text-gray-600 mt-16 truncate">{{ institution.nom }}</p>
          
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
                      <div class="ml-4 text-md tracking-wide font-semibold w-full truncate">{{ institution.contact }}</div>
                    </div>
          
                    <div class="flex items-center mb-8 text-gray-600 dark:text-gray-400">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" class="w-8 h-8 text-gray-500">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div class="ml-4 text-md tracking-wide font-semibold w-full truncate">{{ institution.email }}</div>
                    </div>
              </div>
            </div>
          </div>
      </div>
        
        <div v-if="line"  class="line my-4">
          <vtable 
          v-if="institutionDelete && institutionUpdate"
          :headers="headers" 
          :datas="institutions"
          :actions="actions"
          @updateInputData="updateInputData"
          @supprimer="supprimerInstitution" 
          @modifier="modifierInstitution"></vtable>
           <vtable 
           v-if="!institutionDelete && institutionUpdate"
          :headers="headers" 
          :datas="institutions"
          @updateInputData="updateInputData"
          @modifier="modifierInstitution"></vtable>
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
  import Dropdown from '@/components/Dropdown'
  import Dashboard from '@/layouts/Dashboard'
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  import extractFormData from "@/utils/extract-data";

  export default {
      props: {
      },

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
          mosaique: true,
          line:false,
          title: '',    
          search:'',
          submitText: "Enrégistrer une nouvelle institution",
          institutionAttributs: ["nom", "email", "contact"],
          champs:[
            {name:'Nom', key:'nom', type:'text', placeholdere:"", isSelect:false, isTextArea:false, data:'', required:true, errors: []},
            {name:'Email', key:'email', type:'email', placeholdere:"", isSelect:false, isTextArea:false, data:'', required:true, errors: []},
            {name:'Contact', key:'contact', type:'number', placeholdere:"", isSelect:false, isTextArea:false, data:'', required:true, errors: []},

            {name:'Logo', key:'logo', type:'file',placeholdere:'Votre logo',isSelect:false, isTextArea:false, data:'', required:true, errors: []}
          ],

          actions:[
            {name:'modifier',iconne:''},
            {name:'supprimer',iconne:''},
          ],
          actionsD:[
            {name:'modifier',iconne:''},
            {name:'supprimer',iconne:''},
          ],
          actionsUpdate:[
            {name:'modifier',iconne:''},
            {name:'supprimer',iconne:''},
          ],

          cols:1,
          option:[
            {name:'supprimer'},
            {name:'modifier'},
          ],
          
          headers:[

            {name:'Nom', cle: 'nom'},
            {name:'Email', cle: 'email', edit : false},
            {name:'Contact', cle: 'contact'},

            {name:'Date de creation', cle:'created_at', edit : false},

          ],
          institutionVisible:false,
          institutionAdd:false,
          institutionDelete:false,
          institutionUpdate:false,
        }
      },

      computed:{
          ...mapGetters({
            hasErrors : "GET_ERREURS",
            isLoading : "IS_LOADING",
            institution: "institutions/getInstitution",
            institutions: "institutions/getInstitutions",
            currentUser : 'auths/GET_AUTHENTICATE_USER'
          }),
          ...mapGetters('auths', {currentUser : 'GET_AUTHENTICATE_USER'})
      },
      methods: {

        ...mapMutations({
          setErrors: 'SET_ERRORS_MESSAGE', // map `this.setErrors()` to `this.$store.commit('SET_ERRORS_MESSAGE')`,
          setInstitution: 'institutions/FILL' // map `this.CREATE_INSTANCE_PROGRAMME()` to `this.$store.commit('CREATE_INSTANCE_PROGRAMME')`
        }),

         getPermission() {
          this.currentUser.role[0].permissions.forEach(element => {
            if(element.slug ==='voir-une-institution') {
              this.institutionVisible = true
            }
            if(element.slug === 'modifier-une-institution') {
              this.institutionAdd = true
            }
            if(element.slug === 'modifier-un-pap') {
              this.institutionUpdate = true
            }
            if(element.slug ==='supprimer-une-institution') {
              this.institutionDelete = true
            }
           
          });

          },

        ...mapActions('institutions', {
          fetchInstitutions: "FETCH_LIST_INSTITUTION",
          saveInstitution: "STORE_INSTITUTION",
          updateInstitution: "UPDATE_INSTITUTION",
          deleteInstitution: "DESTROY_INSTITUTION"
        }),

        switchBetweenCode({mosaique, line}) {
          this.mosaique = mosaique
          this.line = line 
        },
      
        addInstitution() {
          this.title='Ajouter une nouvelle institution'

          this.submitText = "Enrégistrer"

          this.showCloseModal(true)
        },

        modifierInstitution(institution) {

          this.title = "Modification de l'institution {institution.nom}"

          this.submitText = "Modifier"

          this.setInstitution(institution)

          this.institutionAttributs.forEach((item) => {

            this.champs.find((value, index) => {

              if(value.key === item){
                this.champs[index]['data'] = this.institution.user[item]
              }

            })

          })

          this.showCloseModal(true)
        },

        filteredInstitution(){
        var self = this;

        return this.institutions.filter(function (institution){
          return institution.email.toLowerCase().indexOf(self.search.toLowerCase()) >= 0 ||
                 institution.nom.toLowerCase().indexOf(self.search.toLowerCase()) >= 0;
        });
      },

        supprimerInstitution(institution) {
          if(window.confirm("Voulez-vous vraiment supprimer l'institution " + institution.nom))
            this.deleteInstitution(institution.id)
        },

        dupliquerInstitution() {
          this.title = "Dupliquer l'institution"
          this.showCloseModal()
        },
          
        close() {
          this.showCloseModal()

          this.resetForm()
        }, 
      
        showCloseModal(value = false) {
          this.showModal = value
        },

        resetForm(){

          this.champs = this.champs.map(item => { item.data = ''; return item})
            
          window.document.getElementById('vform')?.reset()

          this.setInstitution({})
        },

        async updateInputData(id, attribut, value) {
            await this.updateInstitution({institution: {[attribut] : value}, id : id}).catch((value, status) => {
              if(this.hasErrors[attribut] !== undefined)
                alert(this.hasErrors[attribut])            
            })
        },

        sendForm() {

            this.champs = this.champs.map(item => { item.errors = []; return item})

            let institution = extractFormData(this.champs, this.institutionAttributs)

            institution.programmeId = this.currentUser?.programme?.id

            if(this.institution?.id)
            {

              this.updateInstitution({institution: institution, id : this.institution?.id})
                .then(response => {
                  
                  if(response.status == 200 || response.status == 201){

                    this.close()
                  }

                })
                .catch((value) => {
                  if(value.response.data.errors.programmeId !== undefined)
                    alert(value.response.data.errors.programmeId[0])
                })

            }
            else
            {
              
              this.saveInstitution(institution)
                .then(response => {
                  if(response.status == 200 || response.status == 201){
                      this.close()
                  }

                })
                .catch((value) => {
                  alert(value.response.data.errors.programmeId[0])
                })
            }
        },

        gotoNext(){

        }
  },
  
      watch: {
        isLoading: function(value) {
          //this.loading = value
        },

        hasErrors: function(errors) {
          this.champs.forEach((value) => {value.errors = errors[value.key]})
          //this.errors = errors
        }

      },
      
      mounted() {
        this.getPermission()
        console.log("Fetching institutions ...")
        this.fetchInstitutions()
      }
  }
</script>

<style>

</style>