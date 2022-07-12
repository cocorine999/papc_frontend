<template>
  <dashboard>
    <div class="w-full p-4">
      <div v-if="showModal">
        <vmodal  :title="title"  v-on:close="close">
          <div style="width:60vw" class="px-4">
            <div v-if="title =='Modifier un bailleur'">
              <vform template="default" :champs="champs" :cols="cols" submitText="Modifier" @sendForm="sendForm" ></vform>
            </div>
            <div v-if="title =='Ajouter un nouveau bailleur'">
              <vform template="default" :champs="champs" :cols="cols" submitText="Ajouter" @sendForm="sendForm" ></vform>
            </div>
            <div v-if="title =='Dupliquer un bailleur'">
              <vform template="default" :champs="champs" :cols="cols" submitText="Creer à partir de " @sendForm="sendForm" ></vform>
            </div>
          
          </div>
        </vmodal>
      </div>
      <nav class="mb-2 text-sm font-semibold flex justify-between items-center " aria-label="Breadcrumb">
        <div>
          <ol class="inline-flex p-0 list-none">
            <li class="flex items-center text-blue-500">
              <router-link to="" class="text-gray-600">dashboard</router-link>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
            </li>
            <li class="flex items-center ">
              <router-link to="" class="text-gray-600">bailleurs</router-link>
            </li>
          </ol>
        </div>
        <div>
          <search-bar ></search-bar>
        </div>
      </nav> 
      <div class="flex justify-start mt-2">
        <div class="flex  items-center ">
        <span title="vue en mosaique" @click="switch1" :class="{'border-2':mosaique}" class="p-2  cursor-pointer border-gray-500 text-gray-700 hover:text-gray-500"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.8em" width="1.8em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M3 5v14a2 2 0 002 2h6V3H5a2 2 0 00-2 2zm16-2h-6v8h8V5c0-1.1-.9-2-2-2zm-6 18h6c1.1 0 2-.9 2-2v-6h-8v8z"></path></svg></span>
          <span title="vue en ligne" @click="switch2" :class="{'border-2':line}" class="p-2 text-gray-700 border-gray-500 cursor-pointer hover:text-gray-500 "><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.8em" width="1.8em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M3 14h4v-4H3v4zm0 5h4v-4H3v4zM3 9h4V5H3v4zm5 5h13v-4H8v4zm0 5h13v-4H8v4zM8 5v4h13V5H8z"></path></svg></span>
        </div>
      </div>
      <div class="flex items-center justify-between my-2">
        <titre>Les bailleurs </titre>
          <button @click="addBailleur" title="ajouter un bailleur"   class="p-2 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase rounded bg-primary focus:outline-none focus:shadow-outline">
            <span><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM17 11h-4v4h-2v-4H7V9h4V5h2v4h4v2z"></path></svg></span>
            <span class="mx-2 text-sm font-semibold">ajouter</span>
          </button>
      </div>
      <div class="grid grid-cols-3 gap-4">
        
      <div v-for="(bailleur, i) in bailleurs" :key="i">
          <card-bailleur 
            :sigle="bailleur.sigle"
            :libelle="bailleur.user.nom" 
            description="Lorem ipsum dolor sit" 
            :codePTA="bailleur.code" 
            :pays="bailleur.user.pays" 
            @supprimer="supprimer(bailleur)"
            @modifier="modifier(bailleur)"
            @dupliquer="dupliquer(bailleur)"
          ></card-bailleur>
      </div>
      </div>
    </div>
  </dashboard>
</template>

<script>
import SearchBar from '@/components/SearchBar'
import CardBailleur from '@/components/CardBailleur'
import Titre from '@/components/Titre'
import Vtable from '@/components/Vtable'
import Vform from '@/components/Vform'
import Vmodal from '@/components/Vmodal'
import Dashboard from '@/layouts/Dashboard'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import extractFormData from "@/utils/extract-data";
export default {
  
  components: {
    Vtable,
    Dashboard,
    Vmodal,
    Vform,
    CardBailleur,
    Titre,
    SearchBar
  },
  data() {
    return {
      bailleurAttributs: ["nom", "email", "contact", "code", "pays", "sigle"],
      showModal: false,
      loading: false,
      line: false,
      mosaique: true,
      title: '',
      headers: [
        { name: "Bailleurs", props: "user", cle: "nom" },
        { name: "Sigle", props: "sigle" },
        { name: "Code PTA", props: "code" },
        { name: "Pays", props: "pays", edit: true },
        { name: "Date creation", props: "created_at" },
      ],

      actions:[
        {name:'modifier',iconne:''},
        {name:'supprimer',iconne:''},
      ],

      champs: [
        {
          name: "Nom",
          type: "text",
          key: "nom",
          placeholdere: "Nom du bailleur",
          isSelect: false,
          isTextArea: false,
          data: "",
          required: true,
          errors: [],
        },
        {
          name: "Code",
          type: "number",
          key: "code",
          placeholdere: "Code du bailleur",
          isSelect: false,
          isTextArea: false,
          data: "",
          required: true,
          errors: [],
        },
        {
          name: "Sigle",
          type: "text",
          key: "sigle",
          placeholdere: "Sigle du bailleur",
          isSelect: false,
          isTextArea: false,
          data: "",
          required: true,
          errors: [],
        },
        {
          name: "Email",
          type: "email",
          key: "email",
          placeholdere: "Votre Email",
          isSelect: false,
          isTextArea: false,
          data: "",
          required: true,
          errors: [],
        },
        {
          name: "Contact",
          type: "number",
          key: "contact",
          placeholdere: "Votre contact",
          isSelect: false,
          isTextArea: false,
          data: "",
          required: true,
          errors: [],
        },
        {
          name: "Pays",
          type: "text",
          key: "pays",
          placeholdere: "Pays du bailleur",
          isSelect: false,
          isTextArea: false,
          data: "",
          required: true,
          errors: [],
        },
      ],
      cols: 1,

      option:[
        {name:'supprimer'},
        {name:'modifier'},
      ]
    }
  },

  computed:{
      ...mapGetters({
        hasErrors : "GET_ERREURS",
        isLoading : "IS_LOADING",
        bailleur: "bailleurs/getBailleur",
        bailleurs: "bailleurs/getBailleurs"
      })
  },

  methods: {

      ...mapMutations({
        setErrors: 'SET_ERRORS_MESSAGE', // map `this.setErrors()` to `this.$store.commit('SET_ERRORS_MESSAGE')`,
        setBailleur: 'bailleurs/FILL' // map `this.CREATE_INSTANCE_PROGRAMME()` to `this.$store.commit('CREATE_INSTANCE_PROGRAMME')`
      }),

      ...mapActions('bailleurs', {
        fetchBailleurs: "FETCH_LIST_BAILLEUR",
        saveBailleur: "STORE_BAILLEUR",
        updateBailleur: "UPDATE_BAILLEUR",
        deleteBailleur: "DESTROY_BAILLEUR"
      }),

      switch1() {
        this.mosaique = true
        this.line = false
      },
      
      switch2() {
        this.mosaique = false
        this.line = true
      },
    
      addBailleur() {
        this.title='Ajouter un bailleur'
        this.showCloseModal(true)
      },

      modifier(bailleur) {

        this.title = 'Modifier un bailleur'

        this.setBailleur(bailleur)

        this.bailleurAttributs.forEach((item) => {

          this.champs.find((value, index) => {

            if(value.key === item){
              if(item === "nom" || item === "email" || item === "contact" )
                this.champs[index]['data'] = this.bailleur.user[item]
              else
                this.champs[index]['data'] = this.bailleur[item]
            }

          })

        })

        this.showCloseModal(true)
      },

      supprimer(bailleur) {
        if(window.confirm("Voulez-vous supprimer le bailleur " + bailleur.user.nom))
          this.deleteBailleur(bailleur.id)
      },

      dupliquer() {
        this.title='Dupliquer un bailleur'
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

        this.setBailleur({})
      },

      sendForm() {

        this.champs = this.champs.map(item => { item.errors = []; return item})

        let bailleur = extractFormData(this.champs, this.bailleurAttributs)

        if(this.bailleur?.id)
        {

          this.updateBailleur({bailleur: bailleur, id : this.bailleur?.id}).then(response => {
            
            if(response.status == 200 || response.status == 201){

              this.close()
            }

          })

        }
        else
        {
          
          this.saveBailleur(bailleur).then(response => {
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
    console.log("Fetching bailleurs ...")
    this.fetchBailleurs().then((value) => {
      console.log(value)
    })
  }
}
</script>

<style>

</style>