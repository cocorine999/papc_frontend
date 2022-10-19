<template>
  <dashboard>
    <div v-if="isNotGenere" class="container mx-auto">
      
      <div class="py-8 flex space-x-5 justify-between">
        <div class="w-full">
          <h3 class="p-4 bg-gray-400 text-sm font-bold uppercase shadow-sm ">Configurer le formulaire</h3>
          
          <div class="border border-dashed border-gray-300 my-4 px-8 py-4" >
             <div class="my-3 w-full" >
                <label for="" class="block mb-4 text-primary text-sm uppercase font-semibold px-2 py-2">Nom du formulaire </label>
                <input type="text" v-model="nomFormulaire"  class="px-2 py-2 w-full  text-sm border border-primary  outline-none block " placeholder="Nom du formulaire ">
              </div>
             <button @click="createActivite" class="flex space-x-2 bg-blue-500 text-white border border-blue-500 uppercase items-center px-4 py-2">
                  <span><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path d="M2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2zm6.5 4.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3a.5.5 0 011 0z" stroke="none"/></svg></span>
                  <span class="text-bold">ajouter une activité</span>
              </button>
            
            <fieldset v-for="(activite,index)  in Forms" :key="index" class="border border-dashed border-gray-300 p-3 my-2">
              <legend class="text-sm uppercase">Creation de la checklist </legend>
              <div class="flex justify-between items-center">
                <div class="my-2 w-4/5">
                  <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Selectionner une activité <span class="px-2 mb-2 text-lg font-black text-red-700">*</span></label>
                  <multiselect v-model="activite.activite" :options="eActivites" :custom-label="selectActivite"  placeholder="selectionnez une activite" label="name" track-by="name"></multiselect>
                </div>
                <div class="my-2">
                  <span @click.prevent.stop="deleteElement(index)" class="text-red-500  cursor-pointer "> 
                      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="2.5em" width="2.5em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></svg>
                  </span>
                </div>
              </div>
              
              <div v-for="(form,index)  in activite.data" :key="index">
                <div class="flex justify-between w-full items-center ">
                  <div class="my-3 w-4/5" v-if="form.inputType=='edit'">
                     <div class="flex justify-between">
                      <label for="" class=" block mb-4 text-primary text-sm uppercase font-semibold px-2 py-2">Libelle : {{form.nom}} </label>
                       <select name="" v-model="form.uniteeId"  class="border  block my-1 border-primary py-1 px-2 text-xs "  id="">
                          <option v-for="(item, i) in uniteesDeMesure" :key="i" :value="item.id">{{item.nom}}</option>
                        </select>
                    </div>
                    <input  type="text" v-model="form.nom" class="px-2 py-2 w-full  text-sm border border-primary  outline-none block " placeholder="Saisissez votre libellé du text ">
                  </div>
                  <div class="my-3 w-4/5" v-if="form.inputType=='date'">
                    <input type="text" v-model="form.nom" class="px-2 py-2  text-sm border border-primary w-full outline-none block " placeholder="Saisissez une date">
                    <input  type="date" v-model="form.nom" class="px-2 py-2 w-full  text-sm border border-primary  outline-none block " placeholder="Saisissez votre libellé du text ">
                  </div>
                  <div class="my-3 w-4/5" v-if="form.inputType=='photos'">
                    
                    <input type="text" v-model="form.nom" class="px-2 py-2  text-sm border border-primary w-full outline-none block " placeholder="Saisissez votre libellé de photos">
                    <input type="file"  class="px-2 py-2  text-sm border border-primary w-2/3 outline-none block " placeholder="Saisissez votre libellé">
                  </div>

                  <div class="my-3 w-4/5" v-if="form.inputType=='boolean'">
                    
                    <input type="text" v-model="form.nom" class="px-2 py-2  text-sm border border-primary w-full outline-none block  " placeholder="Saisissez votre libellé vrai ou faux ">
                    <label for="" class="px-4 uppercase text-sm"><input class="uppercase mx-2" type="radio" name="answers" id="answers_true">Réaliser</label>
                    <label for="" class="px-4 uppercase text-sm"><input class="uppercase mx-2" type="radio" name="answers" id="answers_false">Non réaliser</label>
                  </div>
                  <div class="my-3 w-4/5" v-if="form.inputType=='file'">
                    <input type="text" v-model="form.nom" class="px-2 py-2  text-sm border border-primary w-full outline-none block " placeholder="Televerser un fichier">
                    <input  type="file"  class="px-2 py-2  text-sm border border-primary w-2/3 outline-none block " placeholder="Saisissez votre libellé">
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
          <div class="flex space-3 flew-wrap mt-6  gap-2">
            <button @click="btn_edit" :disabled="isActive" class="inline-block bg-gray-700 text-white uppercase rounded-sm  text-sm font-bold shadow-sm px-2 py-1">text</button>
            <button @click="btn_date" :disabled="isActive" class="inline-block bg-gray-700 text-white uppercase rounded-sm  text-sm font-bold shadow-sm px-2 py-1">date</button>
            <button @click="btn_photo" :disabled="isActive" class="inline-block bg-gray-700 text-white uppercase rounded-sm  text-sm font-bold shadow-sm px-2 py-1">photos</button>
            <button @click="btn_file" :disabled="isActive" class="inline-block bg-gray-700 text-white uppercase rounded-sm  text-sm font-bold shadow-sm px-2 py-1">fichiers</button>
            <button @click="btn_boolean" :disabled="isActive" class="inline-block bg-gray-700 text-white uppercase rounded-sm  text-sm font-bold whitespace-nowrap shadow-sm px-2 py-1">Réaliser ou non réaliser</button>
          </div>
        </div>
      </div>
      <div>
        <button  @click="isNotGenere =false" class="bg-blue-500 text-white px-4 py-2">Générer le formulaire</button>
      </div>
      
    </div>
   
    <div v-else class="container mx-auto">
      <form @submit.prevent="sendForm">
        <div class="flex justify-center ">
          <div class="w-3/4">
            <div v-for="activite in Forms" :key="activite.id" class="w-3/4 border border-dashed border-gray-700 p-6">
              <h1 class="text-lg font-semibold uppercase text-center py-2">{{activite.activite.libelle}}</h1>
              <div v-for="form in activite.data" :key="form.id">
                <div v-if="form.inputType=='edit'">
                    <label   class=" block py-2 
text-xs  md:text-sm font-semibold " for="">
                      {{form.nom}} <span  class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span>
                    </label>
                    <input  type="text"   class="px-2 py-1 md:px-4 md:py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent placeholder:text-xs md:placeholder:text-sm"  />
                </div>
                <div v-if="form.inputType=='date'">
                    <label   class=" block py-2 
text-xs  md:text-sm font-semibold " for="">
                      {{form.nom}} <span  class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span>
                    </label>
                    <input  type="date"   class="px-2 py-1 md:px-4 md:py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent placeholder:text-xs md:placeholder:text-sm"  />
                </div>
                <div v-if="form.inputType=='photos'">
                  <label   class=" block py-2 
text-xs  md:text-sm font-semibold " for="">
                    {{form.nom}} <span  class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span>
                  </label>
                  <input  type="file" accept="png,jpg"   class="px-2 py-1 md:px-4 md:py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent placeholder:text-xs md:placeholder:text-sm"  />
                </div>
                <div v-if="form.inputType=='boolean'">
                  <label for="name" class="my-4 block text-xl font-medium text-gray-700">{{form.nom}}</label>
                  <div class="flex items-center my-4">
                    <label for="Realiser" class="px-4 block text-sm uppercase font-medium text-gray-700">
                      <input id="vrai" name="verite" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-primary border-gray-300"/>
                      vrai
                    </label>
                    <label for="faux" class="px-4 block text-sm uppercase font-medium text-gray-700">
                      <input id="faux" name="verite" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-primary border-gray-300"/>
                      faux
                    </label>
                  </div>
                </div>
                <div class="" v-if="form.inputType=='file'">
                   <label   class=" block py-2 
text-xs  md:text-sm font-semibold " for="">
                    {{form.nom}} <span  class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span>
                  </label>
                  <input  accept="image/png, image/gif, image/jpeg" type="file" @change="previewImage"   class="px-2 py-1 md:px-4 md:py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent placeholder:text-xs md:placeholder:text-sm"  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="py-2 my-2 flex justify-center space-x-8">
          <vbutton  type="submit" template="success">Enrégistrer </vbutton>
          <button @click="isNotGenere = true" class="text-white bg-red-500 px-4 py-2 outline-none border-red-500 font-semibold" > retour en arrière </button>
        </div>
      </form>
    </div>
  </dashboard>
</template>

<script>
import Multiselect from 'vue-multiselect'
import Vbutton from '@/components/Vbutton'
import Dashboard from '@/layouts/Dashboard'
import { mapGetters, mapMutations, mapActions, mapState } from "vuex";
import utils from '@/utils/index';
export default {
  layout:'dashboard',
  components: {Dashboard,Multiselect,Vbutton},
   data() {
    return {
      Answers:[],
      multiple_val:'',
      valueFiltre:'',
      isActive:true,
      isNotGenere:true,
      currentIndex:0,
      currentIndexData:0,
      nomFormulaire:'',
      Forms:[
       
      ],
    }
  },

  computed: {
    //importation des variables du module auths
    ...mapState({
      identifiant: state => state.auths.identifiant,
      eActivite: state => state.eActivites.eActivite,
      formulaire: state => state.formulaires.formulaire,
      loading : state => state.loading,
      errors : state => state.errors
    }),

    ...mapGetters({
      hasErrors: "GET_ERREURS",
      isLoading: "IS_LOADING",
      eActivites: "eActivites/getEActivites",
      uniteesDeMesure:"uniteesDeMesure/getUniteesDeMesure",
      formulaires: "formulaires/getFormulaires",
      currentUser: "auths/GET_AUTHENTICATE_USER",
    }),
  },

  methods: {
    ...mapMutations({
      setErrors: 'SET_ERRORS_MESSAGE', // map `this.setErrors()` to `this.$store.commit('SET_ERRORS_MESSAGE')`,
      setEActivite: 'eActivites/FILL', // map `this.CREATE_INSTANCE_PROJET()` to `this.$store.commit('CREATE_INSTANCE_PROJET')`
      setFormulaire: 'formulaires/FILL' // map `this.CREATE_INSTANCE_PROJET()` to `this.$store.commit('CREATE_INSTANCE_PROJET')`
    }),

    ...mapActions("eActivites", {
      fetchEActivites: "FETCH_LIST_EACTIVITE",
    }),

    ...mapActions("formulaires", {
      saveFormulaire: "STORE_FORMULAIRE",
    }),

    ...mapActions("uniteesDeMesure", {
      fetchUnite: "FETCH_LIST_UNITEE_DE_MESURE",
    }),

    createActivite(){
      this.isActive = false
      this.Forms.push({activite:'',data:[]})
      this.currentIndex = this.Forms.length -1
    },
    selectActivite ({ nom}) {
      return `${nom}`
    },
    btn_edit() {
      this.Forms[this.currentIndex].data.push({id:null,inputType:'edit',nom:null,content:null,uniteeId:''})
    },
    btn_date() {
      this.Forms[this.currentIndex].data.push({id:null,inputType:'date',nom:null,content:null,uniteeId:''})
    },
    btn_boolean() {
      this.Forms[this.currentIndex].data.push({id:null,inputType:'boolean',nom:null,checked:null,uniteeId:''})
    },
    btn_file() {
      this.Forms[this.currentIndex].data.push({id:null,inputType:'file',nom:null,file:null,uniteeId:''})
    },
    btn_photo() {
      this.Forms[this.currentIndex].data.push({id:null,inputType:'photos',nom:null,images:null,uniteeId:''})
    },
    addResponse() {
      /* this.currentIndex = this.Forms[this.currentIndex].data.length -1
      this.Forms[this.currentIndex].data[this.currentIndexData].response.push({label:this.multiple_val})
      //this.Answers.push({label:this.multiple_val})
      this.multiple_val = ' */
    },
    deleteItems(index) {
      this.Forms[this.currentIndex].data.splice(index,1)
    },
     deleteElement(index) {
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
          "type" : 0
        }
      
      
      this.saveFormulaire(formulaire).then(response => {
        if(response.status == 200 || response.status == 201){
          this.$router.push('/dashboard/unite-gestion/checklist')
        }

      })

    },
  },

  mounted() {
    console.log("Fetching e-activites ...")
    this.fetchEActivites(this.currentUser?.programme?.id)
    setTimeout(() => { 
        console.log("Fetching unuite de mesure")
        this.fetchUnite()
    })
  }
  
}
</script>

<style>

</style>