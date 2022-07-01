<template>
  <div class="w-full p-4">
    <div v-if="showModal">
      <vmodal  :title="title"  v-on:close="closeModal">
        <div class="px-4 overflow-auto" style="width:60vw !important;height: 500px;" >
          <div v-if="title =='Ajouter un programme'">
             <vform template="default" :champs="champs" :cols="cols" submitText="Enregistrer" @sendForm="sendForm" ></vform>
          </div>
          <div v-if="title =='Modifier un programme'">
             <vform template="default" :champs="champs" :cols="cols" submitText="Modifier" @sendForm="sendForm" ></vform>
          </div>
          <div v-if="title =='Dupliquer un programme'">
             <vform template="default" :champs="champs" :cols="cols" submitText="Enregistrer" @sendForm="sendForm" ></vform>
          </div>
         
        </div>
      </vmodal>
    </div>
    
    <nav class="mb-2 text-sm font-semibold flex justify-between items-center " aria-label="Breadcrumb">
      <div>
        <ol class="inline-flex p-0 list-none">
          <li class="flex items-center text-blue-500">
            <nuxt-link to="" class="text-gray-600">dashboard</nuxt-link>
            <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
          </li>
          <li class="flex items-center ">
            <nuxt-link to="" class="text-gray-600">programme</nuxt-link>
          </li>
        </ol>
      </div>
      <div>
        <search-bar ></search-bar>
      </div>
    </nav> 

    <div class="flex items-center justify-between my-2">
      <titre>Mes programmes </titre>
        <button @click="addProgramme" title="ajouter un programme"   class="p-2 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase rounded bg-primary focus:outline-none focus:shadow-outline">
          <span><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM17 11h-4v4h-2v-4H7V9h4V5h2v4h4v2z"></path></svg></span>
          <span class="mx-2 text-sm font-semibold">ajouter</span>
        </button>
    </div>
    <div  class="grid grid-cols-3 gap-4">

        <div v-for="programme in programmes" :key="programme.id">
          <card-programme
            :libelle="programme.nom"
            :code="programme.code"
            :dateDeb="programme.debut"
            :montantBN="programme.budgetNational"
            :dateFin="programme.fin"
            :description="programme.description"
            @supprimer="supprimer(programme.id)"
            @modifier="modifier"
            @dupliquer="dupliquer"
            > </card-programme>
        </div>

    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions, mapMutations, mapState} from "vuex";

export default {
  layout:'dashboard',
  data() {
    return {
      errors : [],
      showModal:false,
      loading:false,
      line:false,
      mosaique:true,
      title: '',
       champs:[
        {name:'Nom du programme', key: 'nom', type:'text', placeholdere:"Nom du programme",isSelect:false,isTextArea:false,data:'',required:true, errors : this.errors?.nom},
        {name:'Code', type:'number', key: 'code', placeholdere:"Code de l'indicateur",isSelect:false,isTextArea:false,data:'',required:true, errors : this.errors?.code},
        {name:'Date debut', type:'date', key: 'debut', placeholdere:'Date de debut',isSelect:false,isTextArea:false,data:'', required:true, errors : this.errors?.debut},
        {name:'Date fin', type:'date', key: 'fin', placeholdere:'Date de fin',isSelect:false,isTextArea:false,data:'', required:true, errors : this.errors?.fin},
        {name:'Description', type:'', key: 'description', placeholdere:'Description du programme', isSelect:false, isTextArea:true, data:'', required:true, errors : this.errors?.description},
        {name:'Objectif globaux', type:'text', key: 'objectifGlobaux', placeholdere:'Definir les objectifs',isSelect:false,isTextArea:false,data:'', required:true, errors :  this.errors?.objectifGlobaux },
        {name:'Budget national', type:'number', key: 'budgetNational', placeholdere:'Definir un budget',isSelect:false,isTextArea:false,cdata:'', required:true, errors : this.errors?.budgetNational }
      ],
      cols:2,
      option:[
        {name:'supprimer'},
        {name:'modifier'},
       
      ]
    }
  },
  
  computed: {
    ...mapGetters('programmes', {programmes: "LISTS_PROGRAMME"})
  },
  methods: {


    ...mapMutations({
      setErrors: 'SET_ERRORS_MESSAGE' // map `this.add()` to `this.$store.commit('increment')`
    }),

    ...mapActions('programmes', {fetchProgrammes: "FETCH_LIST_PROGRAMME", saveProgramme: "STORE_PROGRAMME", deleteProgramme: "DESTROY_PROGRAMME"}),

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
    
    extractData(data, keys, values = null)
    {
        //let valeur = values ? item[values[y]] : item[key] != undefined ? item[key] : 'data'

        //data.find((item) => item.key === key )['data']

        let objet = new Object;

        keys.map((key, y) => {

            let valeur = data.find((item) => item.key === key )

            let value = values ? valeur[values[y]] : valeur[key] != undefined ? valeur[key] : 'data'

            objet[key] = valeur[value]

            //return {[key] : valeur[value]}

        })

        return objet

    },

    formatDate(date, format) {
      let d = new Date(date);
      let month = (d.getMonth() + 1).toString();
      let day = d.getDate().toString();
      let year = d.getFullYear();
      if (month.length < 2) {
        month = '0' + month;
      }
      if (day.length < 2) {
        day = '0' + day;
      }

      let dateFormat = [];

      if(format?.year == 'year')
        dateFormat.push(year)

      if(format?.month == 'month')
        dateFormat.push(month)

      if(format?.day == 'day')
        dateFormat.push(day)

      return dateFormat.join('-');
    },

    sendForm() {

      let programme = this.extractData(this.champs, ['nom', 'code', 'description', 'debut', 'fin', 'objectifGlobaux', 'budgetNational'])
      
      programme['debut'] = this.formatDate(programme['debut'], {'year' : 'year' , 'month': 'month' })
      
      programme['fin'] = this.formatDate(programme['fin'], {'year' : 'year' , 'month': 'month' })

      this.saveProgramme(programme).then((response) => {
        if(response.status == 200 || response.status == 201)
          this.showModal = false
      }).catch((error) => {

        this.errors = error.response.data.errors

        this.setErrors(this.errors)

      })

    },

    addProgramme() {
      this.title='Ajouter un programme'
      this.showModal = true
    },

    modifier() {
      this.title='Modifier un programme'
      this.showModal = true
    },

    supprimer(idProgramme) {

        if(window.confirm("Voulez-vous supprimer ce programme"))
            this.deleteProgramme(idProgramme)
    },

    dupliquer() {
        this.title='Dupliquer un programme'
        this.showModal = true
    }

  },
  
  mounted() {
      console.log("fetch")
      this.fetchProgrammes()
  }

}
</script>

<style>

</style>