<template>
  <dashboard>
  <div class="p-4">
   
    <route-name title="entreprises" />
    <div v-if="showModal">
      <modal-top-right title="Ajouter un entreprise" v-on:close="close">
        <form-component :form="form" @send="sendForm" />
      </modal-top-right>
    </div>
    <div class="flex items-center justify-between">
      <titre>Les entreprises </titre>
        <button @click="addEntrepriseExecutante" title="ajouter un bailleur" class="p-2 overflow-hidden text-xs font-semibold text-white uppercase rounded bg-primary focus:outline-none focus:shadow-outline">
          <span class="mx-2 text-sm font-semibold">ajouter</span>
        </button>
    </div>
    <div class="align-middle inline-block w-full  overflow-hidden  pt-3 rounded-bl-lg rounded-br-lg">
      <table class="w-full">
        <thead>
          <tr>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">#</th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Nom</th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Contact</th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Email</th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Mod</th>

            <th class="px-6 py-3 border-b-2 border-gray-300 text-center text-sm leading-4 text-primary tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="entrepriseExecutante in entreprisesExecutante" :key="entrepriseExecutante.id">
            
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500"> {{i}} </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500"> {{ entrepriseExecutante.user.nom }} </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{{ entrepriseExecutante.user.contact }} </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5"> {{ entrepriseExecutante.user.email }} </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5"> {{ entrepriseExecutante.user.email }} </td>
            
            <td class="px-6 py-4 whitespace-no-wrap text-center border-b border-gray-500 text-sm leading-5">
              <div class="flex item-center justify-center">
                <!-- <div title="details"  class="cursor-pointer w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div> -->
                <div class="w-4 mr-2 transform hover:text-blue-500 hover:scale-110"  @click="modifierEntrepriseExecutante(entrepriseExecutante)">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <div   class="w-4 mr-2 transform hover:text-blue-500 hover:scale-110"  @click="supprimerEntrepriseExecutante(entrepriseExecutante)">
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
  import Dashboard from '@/layouts/Dashboard'
  import RouteName from '@/components/RouteName'
  import ModalTopRight from '@/components/ModalTopRight'
  import FormComponent from '@/components/FormComponent'
  import Titre from '@/components/Titre'
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  import extractFormData from "@/utils/extract-data"

export default {
  components: {
    ModalTopRight,
    Dashboard,
    RouteName,
    FormComponent,
    Titre
  },
    data() {
      return ({
        title: 'Ajouter une nouvelle entreprise executante',
        submitText: 'Ajouter',
        showModal:false,
        entrepriseExecutanteAttributs: ["nom", "email", "contact"],

        champs:[
          {name: 'Nom', key: 'nom', type: 'text', placeholdere: "", isSelect: false, isTextArea: false, data: '', required: true, errors: []},
          {name: 'Email', key: 'email', type: 'email', placeholdere: "", isSelect: false, isTextArea: false, data: '', required: true, errors: []},
          {name: 'Contact', key: 'contact', type: 'number', placeholdere: "", isSelect: false, isTextArea: false, data: '', required: true, errors: []}
        ],

        form: [
          { label: "nom", type: "text", value: null, errors: [] },
          { label: "contact", type: "number", value: null, errors: [] },
          { label: "email", type: "email", value: null, errors: [] },
          { label: "mod", type: "select", value: null, errors: [], options: [], cle: 'id', text: 'nom' }
        ]
      });
    },

    computed:{
        ...mapGetters({
          hasErrors : "GET_ERREURS",
          isLoading : "IS_LOADING",
          entrepriseExecutante: "entreprisesExecutante/getEntrepriseExecutante",
          entreprisesExecutante: "entreprisesExecutante/getEntreprisesExecutante",
          mods: "mods/getMods",
          currentUser : 'auths/GET_AUTHENTICATE_USER'
        })
    },

    methods: {

      ...mapMutations({
        setErrors: 'SET_ERRORS_MESSAGE', // map `this.setErrors()` to `this.$store.commit('SET_ERRORS_MESSAGE')`,
        setEntrepriseExecutante: 'entreprisesExecutante/FILL' // map `this.CREATE_INSTANCE_PROGRAMME()` to `this.$store.commit('CREATE_INSTANCE_PROGRAMME')`
      }),

      ...mapActions('entreprisesExecutante', {
        fetchEntreprisesExecutante: "FETCH_LIST_ENTREPRISE_EXECUTANTE",
        saveEntrepriseExecutante: "STORE_ENTREPRISE_EXECUTANTE",
        updateEntrepriseExecutante: "UPDATE_ENTREPRISE_EXECUTANTE",
        deleteEntrepriseExecutante: "DESTROY_ENTREPRISE_EXECUTANTE"
      }),
      
      ...mapActions('mods', {
        fetchMods: "FETCH_LIST_MOD"
      }),
    
      addEntrepriseExecutante() {
        this.title = "Ajouter une nouvelle entreprise executante"

        this.submitText = "Enrégistrer l'entreprise executante"
        
        this.showCloseModal(true)
      },

      modifierEntrepriseExecutante(entrepriseExecutante) {

        this.title = "Modifier une entreprise executante"

        this.submitText = "Modifier l'entreprise executante"

        this.setEntrepriseExecutante(entrepriseExecutante)

        this.entrepriseExecutanteAttributs.forEach((item) => {

          this.champs.find((value, index) => {

            if(value.key === item){
              if(item === "nom" || item === "email" || item === "contact" )
                this.champs[index]['data'] = this.entrepriseExecutante.user[item]
              else
                this.champs[index]['data'] = this.entrepriseExecutante[item]
            }

          })

        })

        this.showCloseModal(true)
      },

      supprimerEntrepriseExecutante(entrepriseExecutante) {
        if(window.confirm("Voulez-vous supprimer l'entreprise executante " + entrepriseExecutante.user.nom))
          this.deleteEntrepriseExecutante(entrepriseExecutante.id)
      },

      dupliquerEntrepriseExecutante() {

        this.title = "Dupliquer l'entreprise executante"

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

        this.setEntrepriseExecutante({})
      },

      sendForm() {

          this.champs = this.champs.map(item => { item.errors = []; return item})

          let entrepriseExecutante = {}

          this.form.forEach((item) => {
            entrepriseExecutante = Object.assign(entrepriseExecutante, {[item.label] : item.value});
          })

          entrepriseExecutante.programmeId = this.currentUser?.programme.id
          entrepriseExecutante.modId = entrepriseExecutante.mod
          if(this.entrepriseExecutante?.id)
          {

            this.updateEntrepriseExecutante({entrepriseExecutante: entrepriseExecutante, id : this.entrepriseExecutante?.id})
              .then(response => {
                
                if(response.status == 200 || response.status == 201){

                  this.close()
                }

              })
              .catch((value) => {
                alert(value.response.data.errors.programmeId[0])
              })

          }
          else
          {
            
            this.saveEntrepriseExecutante(entrepriseExecutante)
              .then(response => {
                if(response.status == 200 || response.status == 201){
                    this.close()
                }
              })
              .catch((value) => {
                alert(value.response.data.errors.programmeId[0])
              })
          }
      }
      
    },

    watch: {
      isLoading: function(value) {
        //this.loading = value
      },

      mods: function(mods) {
        this.form.map((item) => {
          if(item.label === "mod"){
            item.options = mods.map((mod) => {
              return {
                "id" : mod.id,
                "nom" : mod.user.nom
              }
            })
          }
          return item
        })

      },

      hasErrors: function(errors) {
        this.form.forEach((value) => {value.errors = errors[value.label]})
      }
    },
  
    mounted() {
      console.log("Fetching entreprises executantes ...")

      this.fetchEntreprisesExecutante().then((value) => {
          if(this.currentUser.role.some(role => role.name !== 'mod')){
            setTimeout(() => {
              this.fetchMods()
            }, 500);
          }
      })
    }
  }
</script>

<style scoped>

</style>