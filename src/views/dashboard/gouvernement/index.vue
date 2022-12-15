<template>
    <dashboard>
      <div class="w-full">
        <nav class="mb-2 mt-4 
   text-xs md:text-sm font-semibold flex flex-wrap justify-between items-center " aria-label="Breadcrumb">
          <div>
            <ol class="inline-flex p-0 list-none">
              <li class="flex items-center text-blue-500">
                <router-link to="" class="text-gray-600">dashboard</router-link>
                <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
              </li>
              <li class="flex items-center ">
                <router-link to="" class="text-gray-600">gouvernement</router-link>
              </li>
            </ol>
          </div>
          <div>
            <search-bar ></search-bar>
          </div>
        </nav> 
        <div v-if="showModal">
          <modal-top-right :title="title" v-on:close="close">
          <div  class="w-full">
            <div v-if="title =='Ajouter un gouvernement'">
                <vform template="default" :champs="champs" :cols="cols" submitText="Enregistrer" @sendForm="sendForm" @closeModal="close"></vform>
            </div>
            <div v-if="title =='Modifier une unité de gestion'">
                <vform template="default" :champs="champs" :cols="cols" submitText="Modifier" @sendForm="sendForm" @closeModal="close"></vform>
            </div>
            
          </div>
          </modal-top-right>
        </div>
        <div class="flex items-center justify-between flex-wrap">
          <titre>Gouvernement </titre>
            <button v-if="gouvernementAdd" @click="addGouv" title="ajouter " class="px-4 py-2 flex overflow-hidden items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
              <span class="mx-2 text-xs  md:text-sm font-semibold">ajouter</span>
            </button>
        </div>
        <div  id="dataTable">
          <vtable v-if="actions != undefined && gouvernementDelete" :headers="headers" :datas="gouvernements" :actions="actions" @updateInputData="updateInputData" @supprimer="supprimer"></vtable>
          <vtable v-else :headers="headers" :datas="gouvernements"  @updateInputData="updateInputData" @supprimer="supprimer"></vtable>
        </div>
      </div>
    </dashboard>
  </template>
  
  <script>
  import ModalTopRight from '@/components/ModalTopRight'
  import SearchBar from '@/components/SearchBar'
  import Titre from '@/components/Titre'
  import Vtable from '@/components/Vtable'
  import Vform from '@/components/Vform'
  import Vmodal from '@/components/Vmodal'
  import Dashboard from '@/layouts/Dashboard'
  import PermissionsService from "@/services/modules/permission.service.js";
  import { mapActions, mapMutations, mapGetters} from "vuex";
  import extractFormData from '@/utils/extract-data'
  
    export default {
      components: {
        Vtable,
        Dashboard,
        Vmodal,
        Vform,
        Titre,
        SearchBar,
        ModalTopRight
      },
      data() {
          return {
            gouvernementAttributs : ['nom', 'email', 'contact', 'programmeId'],
            showModal:false,
            title:'',
            gouvernementVisible:false,
            gouvernementAdd:false,
            gouvernementDelete:false,
            gouvernementUpdate:false,
            champs:[
            {name:'Nom', key: 'nom', type:'text', placeholdere:"Nom du gouvernement", isSelect:false, isTextArea:false, data:'',required:true, errors : []},
            {name:'Email', key: 'email', type:'email', placeholdere:"Votre Email", isSelect:false, isTextArea:false, data:'', required:true, errors : []},
            {name:'Contact', key: 'contact', type:'number', placeholdere:'Votre contact', isSelect:false, isTextArea:false, data:'', required:true, errors : []},
            {name:'Programme', key: 'programmeId', type:'', placeholdere:'Choisir un programme', isSelect:true, isTextArea:false, data:'', options: this.programmes, cle: 'id', value: 'nom', required:true, errors : []}
          ],
          cols:1,
          headers:[
            {name:'Nom', props:'user', cle:'nom'},
            {name:'Email', props:'user', cle:'email', edit : false},
            {name:'Programme', props:'programme', cle:'nom', edit : false},
            {name:'Date de creation', cle:'created_at', edit : false},
  
          ],
         actions:[
            {name:'supprimer',iconne:''},
          ] 
        };
      },
    
      computed: {
  
        //importation des variables du module auths
  
        ...mapGetters({
          hasErrors : "GET_ERREURS",
          isLoading : "IS_LOADING",
          gouvernement: "gouvernements/getGouvernement",
          gouvernements: "gouvernements/getGouvernements",
          programmes: "programmes/getProgrammes"
        }),
        ...mapGetters('auths', {currentUser : 'GET_AUTHENTICATE_USER'})
      },
  
      methods: {
  
        ...mapMutations({
          setErrors: 'SET_ERRORS_MESSAGE', // map `this.setErrors()` to `this.$store.commit('SET_ERRORS_MESSAGE')`,
          setGouvernement: 'gouvernements/FILL' // map `this.CREATE_INSTANCE_PROGRAMME()` to `this.$store.commit('CREATE_INSTANCE_PROGRAMME')`
        }),
  
        ...mapActions('gouvernements', {
          fetchGouvernements: "FETCH_LIST_GOUVERNEMENT",
          saveGouvernement: "STORE_GOUVERNEMENT",
          updateGouvernement: "UPDATE_GOUVERNEMENT",
          deleteGouvernement: "DESTROY_GOUVERNEMENT"
        }),
  
        ...mapActions('programmes', { fetchProgrammes: 'FETCH_LIST_PROGRAMME' }),
  
        getPermission() {
          this.currentUser.role[0].permissions.forEach(element => {
              if(element.slug ==='voir-un-gouvernement') {
                this.gouvernementVisible = true
              }
              if(element.slug === 'creer-un-gouvernement') {
                this.gouvernementAdd = true
              }
              if(element.slug === 'modifier-un-gouvernement') {
                this.gouvernementUpdate = true
              }
              if(element.slug ==='supprimer-un-gouvernement') {
                this.gouvernementDelete = true
              }
             
            });
        },
      
        addGouv() {

          this.title='Ajouter un gouvernement'
  
          let formData = this.champs.map((value) => {
            if(value.key === 'programmeId'){ 
              value['options'] = this.programmes
            }
  
            return value
          })
  
          this.champs = [...formData]
  
          this.showCloseModal(true)
        },
  
        async supprimer(gouvernement) {
          if(window.confirm("Voulez-vous supprimer cet gouvernement  " + gouvernement.nom))
            await this.deleteGouvernement(gouvernement.id)
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
  
          this.setGouvernement({})
        },
  
        async updateInputData(id, attribut, value) {
          
            await this.updateGouvernement({gouvernement: {[attribut] : value}, id : id}).catch((value, status) => {
              if(this.hasErrors[attribut] !== undefined)
                alert(this.hasErrors[attribut])            
            }).finally(() => {
              $('#' + "dataTable").load(location.href + '#' + id + '>*', '')
            })
  
        },
  
        sendForm() {
  
          this.champs = this.champs.map(item => { item.errors = []; return item})
  
          let gouvernement = extractFormData(this.champs, this.gouvernementAttributs)
  
          if(typeof gouvernement.programmeId === 'object')
            gouvernement.programmeId = gouvernement.programmeId.id
  
          if(this.gouvernement?.id)
          {
  
            this.updateProgramme({gouvernement: gouvernement, id : this.gouvernement?.id}).then(response => {
              
              if(response.status == 200 || response.status == 201){
  
                this.close()
              }
  
            })
  
          }
          else
          {
            
            this.saveGouvernement(gouvernement).then(response => {
              if(response.status == 200 || response.status == 201){
                  this.close()
              }
  
            })
          }
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
       
        this.fetchProgrammes()
        this.getPermission()
        if(!this.gouvernementVisible) {
          this.$router.push('/401-non-autorise')
        } 
        this.fetchGouvernements().then((value) => {
          setTimeout(() => {
            this.fetchProgrammes()
          }, 100);
        })
      }
    }
  </script>
  
  <style scoped>
  
  </style>