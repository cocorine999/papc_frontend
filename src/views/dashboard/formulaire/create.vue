<template>
  <dashboard>
    <div class="px-4">
      <div v-if="isNotGenere" class="container mx-auto">
        <div class="my-8 flex space-x-5 justify-between">
          <div class="w-full">
            <h3 class="p-4 bg-gray-400 text-sm font-bold uppercase shadow-sm ">Configurer le formulaire</h3>
            <div class="my-3 w-full" >
              <label for="" class="block mb-4 text-primary text-sm uppercase font-semibold px-2 py-2">Nom du formulaire </label>
              <input type="text" v-model="nomFormulaire"  class="px-2 py-2 w-full  text-sm border border-primary  outline-none block " placeholder="Nom du formulaire ">
            </div>
            <div class="border border-dashed border-gray-300 my-4 px-8 py-4" >
              <fieldset  class="border border-dashed border-gray-300 p-3 my-2">
                <legend class="text-sm uppercase">Creation de la checklist </legend>
                
                <div v-for="(form,index)  in Forms" :key="index">
                  <div class="flex justify-between w-full items-center ">
                    <div class="my-3 w-4/5" v-if="form.inputType=='edit'">
                      <label for="" class=" block mb-4 text-primary text-sm uppercase font-semibold px-2 py-2">{{form.nom}} </label>
                      <input  type="text" v-model="form.nom" class="px-2 py-2 w-full  text-sm border border-primary  outline-none block " placeholder="Saisissez votre libellé du text ">
                      
                    </div>

                    <div class="my-3 w-4/5" v-if="form.inputType=='photos'">
                      <label for="" class=" block mb-4 text-primary text-sm uppercase font-semibold px-2 py-2">{{form.nom}} </label>
                      <input type="text" v-model="form.nom" class="px-2 py-2  text-sm border border-primary w-full outline-none block " placeholder="Saisissez votre libellé de photos">
                      <input type="file"  class="px-2 py-2  text-sm border border-primary w-2/3 outline-none block " placeholder="Saisissez votre libellé">
                    </div>

                    <div class="my-3 w-4/5" v-if="form.inputType=='boolean'">
                      <label for="" class=" block mb-4 text-primary text-sm uppercase font-semibold px-2 py-2">{{form.nom}} </label>
                      <input type="text" v-model="form.nom" class="px-2 py-2  text-sm border border-primary w-full outline-none block  " placeholder="Saisissez votre libellé vrai ou faux ">
                      <label for="" class="px-4 uppercase text-sm"><input class="uppercase mx-2" type="radio" name="answers" id="answers_true">vrai</label>
                      <label for="" class="px-4 uppercase text-sm"><input class="uppercase mx-2" type="radio" name="answers" id="answers_false">faux</label>
                    </div>
                    <div class="my-3 w-4/5" v-if="form.inputType=='multiple'">
                      <div class="">
                        <label for="" class=" block mb-4 text-primary text-sm uppercase font-semibold px-2 py-2">{{form.nom}} </label>
                        <input type="text" v-model="form.nom" class="px-2 py-2  text-sm border border-primary w-full outline-none block" placeholder="Saisissez votre libellé multiple">
                      </div>
                      <div class="my-4 flex justify-between items-center " v-for="(answers,index) in Answers" :key="index">
                        <label for="" class="px-4  block mb-4 text-primary text-sm uppercase font-semibold  py-2">
                          <input class="mx-2" type="radio" name="answers" id="answers_true">{{answers.label}}
                        </label>
                        <span  @click.prevent.stop="deleteAnswers(index)" class="text-gray-800  cursor-pointer "> 
                          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></svg>
                        </span>
                      </div>
                      <div class="my-4">
                        <input type="text" class="px-2 py-2 border text-sm outile-none border-gray-700 w-full" placeholder="ajoutez des propositions de reponse" v-model="multiple_val" >
                        <button class="bg-blue-500 text-white px-4 py-2 shadow-xs my-2 rounded-sm focus:outline-none" @click="addResponse">Ajouter</button>
                      </div>
                    </div>
                    <div class="my-3">
                      <span @click.prevent.stop="deleteItems(index)" class="text-red-500  cursor-pointer "> 
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="2.5em" width="2.5em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></svg>
                      </span>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div> 
          </div>
          <div class="w-full sticky top-20" style="height:200px">
            <h3 class="p-4 bg-gray-400 text-sm uppercase font-bold shadow-sm ">Les options</h3>
            <div class="grid grid-cols-3 my-2 gap-2">
              <button @click="btn_edit" class="inline-block bg-gray-700 text-white uppercase rounded-sm  text-sm font-bold shadow-sm px-2 py-1">text</button>
              <button @click="btn_photo" class="inline-block bg-gray-700 text-white uppercase rounded-sm  text-sm font-bold shadow-sm px-2 py-1">photos</button>
              <button @click="btn_multiple" class="inline-block bg-gray-700 text-white uppercase rounded-sm  text-sm font-bold shadow-sm px-2 py-1">choix multiple</button>
              <button @click="btn_boolean" class="inline-block bg-gray-700 text-white uppercase rounded-sm  text-sm font-bold shadow-sm px-2 py-1">vrai ou faux</button>
            </div>
          </div>
        </div>
        
        <div>
          <button  @click="isNotGenere =false" class="bg-blue-500 text-white px-4 py-2">Generer le formulaire</button>
        </div>
        
      </div>
    
      <div v-else class="container mx-auto">
        <form @submit.prevent="sendForm">
          <div class="flex justify-center ">
            <div class="w-3/4 border border-dashed border-gray-700 p-6">
              <h1 class="text-lg font-semibold uppercase text-center py-2">Formulaire generer</h1>
              <div v-for="form in Forms" :key="form.id">
                <div v-if="form.inputType=='edit'">
                    <label   class=" block py-2 text-sm font-semibold " for="">
                      {{form.nom}} <span  class="px-2 text-lg font-black text-red-700">*</span>
                    </label>
                    <input  type="text"   class="px-4 py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent"  />
                </div>
                <div v-if="form.inputType=='photos'">
                  <label   class=" block py-2 text-sm font-semibold " for="">
                    {{form.nom}} <span  class="px-2 text-lg font-black text-red-700">*</span>
                  </label>
                  <input  type="file" accept="png,jpg"   class="px-4 py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent"  />
                </div>
                <div v-if="form.inputType=='boolean'">
                  <label for="name" class="my-4 block text-xl font-medium text-gray-700">{{form.nom}}</label>
                  <div class="flex items-center my-4">
                    <label for="vrai" class="px-4 block text-sm uppercase font-medium text-gray-700">
                      <input id="vrai" name="verite" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-primary border-gray-300"/>
                      vrai
                    </label>
                    <label for="faux" class="px-4 block text-sm uppercase font-medium text-gray-700">
                      <input id="faux" name="verite" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-primary border-gray-300"/>
                      faux
                    </label>
                  </div>
                </div>
                <div class="" v-if="form.inputType=='multiple'">
                  <label for="name" class="my-4 block text-xl font-medium text-gray-700">{{form.nom}}</label>
                  <label v-for="answers in Answers" :key="answers.id" class="px-4  text-sm uppercase font-medium text-gray-700">
                    <input  name="multiple" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-primary border-gray-300"/>
                    {{answers.label}} /
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="py-2 my-2 flex justify-center space-x-8">
            <vbutton  type="submit" template="success">Enregistrer </vbutton>
            <button @click="isNotGenere = true" class="text-white bg-red-500 px-4 py-2 outline-none border-red-500 font-semibold" > retour en arriere </button>
          </div>
        </form>
      </div>
    </div>
  </dashboard>
</template>

<script>
import Dashboard from '@/layouts/Dashboard'
import Vbutton from '@/components/Vbutton'
import { mapGetters, mapMutations, mapActions, mapState } from "vuex"
export default {
  layout:'dashboard',
  components: {Vbutton,Dashboard},
   data() {
    
    return {
      Answers:[],
      multiple_val:'',
      isNotGenere:true,
      nomFormulaire:'',
      Forms:[],

    }
  },
  computed: {
    //importation des variables du module auths
    ...mapState({
      identifiant: state => state.auths.identifiant,
      formulaire: state => state.formulaires.formulaire,
      loading : state => state.loading,
      errors : state => state.errors
    }),

    ...mapGetters({
      hasErrors: "GET_ERREURS",
      isLoading: "IS_LOADING",
      uniteesDeMesure:"uniteesDeMesure/getUniteesDeMesure",
      currentUser: "auths/GET_AUTHENTICATE_USER",
    }),
  },
  methods: {
    
    ...mapActions("formulaires", {
      saveFormulaire: "STORE_FORMULAIRE",
    }),

    ...mapActions("uniteesDeMesure", {
      fetchUnite: "FETCH_LIST_UNITEE_DE_MESURE",
    }),
    btn_edit() {
      this.Forms.push({id:null,inputType:'edit',nom:null,content:null})
    },
    btn_boolean() {
      this.Forms.push({id:null,inputType:'boolean',nom:null,checked:null})
    },
    btn_multiple() {
      this.Forms.push({id:null,inputType:'multiple',nom:null,reponse:this.Answers})
    },
    btn_photo() {
      this.Forms.push({id:null,inputType:'photos',nom:null,images:null})
    },
    addResponse() {
      /*this.Answers.push({label:this.multiple_val})
      this.multiple_val = ''*/
    },
    deleteItems(index) {
      this.Forms.splice(index,1)
    },
    
    deleteAnswers(index) {
      this.Answers.splice(index,1)
    },
    sendForm() {

      let formulaire = 
        {
          "nom" : this.nomFormulaire,
          "json" : this.Forms,
          "type" : 1
        }
      

      console.log(formulaire)
      
      this.saveFormulaire(formulaire).then(response => {
        if(response.status == 200 || response.status == 201){
          this.$router.push('/dashboard/formulaire')
        }

      })

    },
  },
  mounted() {
    
    console.log("Fetching unuite de mesure")
    this.fetchUnite()
  }
  
}
</script>

<style>

</style>