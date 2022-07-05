<template>
  <div class="p-4">
    <div class="container mx-auto">
      <div class="my-8 flex space-x-5 justify-between">
        <div class="w-full">
          <h3 class="p-4 bg-gray-400 text-sm font-bold uppercase shadow-sm ">Configuration de la checklist</h3>
          <div class="border border-dashed border-gray-300 my-4 px-8 py-4" >
            <div v-for="(editer,index)  in Edit" :key="index" class="my-2">
              <label for="" class=" block mb-4 text-primary text-sm uppercase font-semibold px-2 py-2">{{editer.label}} </label>
              <div class="flex justify-between">
                <input type="text" v-model="editer.label" class="px-2 py-2  text-sm border border-primary w-2/3 outline-none block " placeholder="Saisissez votre libellé">
                <span  @click.prevent.stop="deleteItems(index)" class="text-red-500  cursor-pointer "> 
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></svg>
                </span>
              </div>
            </div>
            <div v-for="(toggle,index)  in Booleens" :key="index" class="my-2">
                <label for="" class=" block mb-4 text-primary text-sm uppercase font-semibold px-2 py-2">{{toggle.label}}</label>
                <div class="flex justify-between">
                  <input type="text" v-model="toggle.label" class="px-2 py-2  text-sm border border-primary w-2/3 outline-none block  " placeholder="Saisissez votre libellé">
                    <span  @click.prevent.stop="deleteToggle(index)" class="text-red-500  cursor-pointer "> 
                      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></svg>
                    </span>
                </div>
                <div class="my-4">
                  <label for="" class="px-4 uppercase text-sm"><input class="uppercase mx-2" type="radio" name="answers" id="answers_true">vrai</label>
                  <label for="" class="px-4 uppercase text-sm"><input class="uppercase mx-2" type="radio" name="answers" id="answers_false">faux</label>
                </div>
            </div>
            <div v-for="(photos,index)  in Photos" :key="index" >
                <label for="" class=" block mb-4 text-primary text-sm uppercase font-semibold px-2 py-2">{{photos.label}} </label>
                <div class="flex justify-between">
                  <input type="text" v-model="photos.label" class="px-2 py-2  text-sm border border-primary w-2/3 outline-none block  " placeholder="Saisissez votre libellé">
                    <span  @click.prevent.stop="deletePicure(index)" class="text-red-500  cursor-pointer "> 
                      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></svg>
                    </span>
                </div>
                <div class="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div class="space-y-1 text-center">
                        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <div class="flex text-sm text-gray-600">
                          <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              class="sr-only"
                            />
                          </label>
                          <p class="pl-1">or drag and drop</p>
                        </div>
                        <p class="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                </div>
            </div>
            <div v-for="(multiple,index) in Multiples" :key="index">
                <label for="" class=" block mb-4 text-primary text-sm uppercase font-semibold px-2 py-2">{{multiple.label}}</label>
                <div class="flex justify-between">
                  <input type="text" v-model="multiple.label" class="px-2 py-2  text-sm border border-primary w-2/3 outline-none block  " placeholder="Saisissez votre libellé">
                    <span  @click.prevent.stop="deleteMultiple(index)" class="text-red-500  cursor-pointer "> 
                      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></svg>
                    </span>
                </div>
                <div class="my-4 flex justify-between" v-for="(answers,index) in Answers" :key="index">
                  <label for="" class="px-4  block mb-4 text-primary text-sm uppercase font-semibold  py-2"><input class="form-checkbox mx-2" type="radio" name="answers" id="answers_true">{{answers.label}}</label>
                  <span  @click.prevent.stop="deleteAnswers(index)" class="text-red-500  cursor-pointer "> 
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></svg>
                  </span>
                </div>
                <div class="my-4">
                  <input type="text" class="px-2 py-2 border text-sm outile-none border-gray-700 w-2/3" placeholder="ajoutez des propositions de reponse" v-model="multiple_val" >
                  <button class="bg-blue-500 text-white px-4 py-2 shadow-xs rounded-sm focus:outline-none" @click="addResponse">Ajouter</button>
                </div>
            </div>
          </div> 
        </div>
        <div class="w-full">
          <h3 class="p-4 bg-gray-400 text-sm uppercase font-bold shadow-sm ">Les options</h3>
          <div class="grid grid-cols-3 my-2 gap-2">
            <button @click="btn_edit" class="inline-block bg-gray-700 text-white uppercase rounded-sm  text-sm font-bold shadow-sm px-2 py-1">edit</button>
            <button @click="btn_photo" class="inline-block bg-gray-700 text-white uppercase rounded-sm  text-sm font-bold shadow-sm px-2 py-1">photo</button>
            <button @click="btn_multiple" class="inline-block bg-gray-700 text-white uppercase rounded-sm  text-sm font-bold shadow-sm px-2 py-1">multiple</button>
            <button @click="btn_boolean" class="inline-block bg-gray-700 text-white uppercase rounded-sm  text-sm font-bold shadow-sm px-2 py-1">boolean</button>
          </div>
        </div>
      </div>
      <div>
        <button class="bg-blue-500 text-white px-4 py-2">voir le resultat</button>
      </div>
      
      <pre>
          {{total}}
      </pre>
    </div>
  </div>
</template>

<script>
export default {
  layout:'dashboard',
   data() {
    return {
      Edit:[],
      Photos:[],
      Multiples:[],
      Answers:[],
      Booleens:[],
      multiple_val:'',
      all:[]
    }
  },
  methods: {
    btn_edit() {
      this.Edit.push({label:null,content:null})
    },
    btn_boolean() {
      this.Booleens.push({label:null,checked:null})
    },
    btn_multiple() {
      this.Multiples.push({label:null,reponse:this.Answers})
    },
    btn_photo() {
      this.Photos.push({label:null,images:null})
    },
    addResponse() {
      this.Answers.push({label:this.multiple_val})
      this.multiple_val = ''
    },
    deleteItems(index) {
      this.Edit.splice(index,1)
    },
    deleteMultiple(index) {
      this.Multiples.splice(index,1)
    },
    deleteToggle(index) {
      this.Booleens.splice(index,1)
    },
    deletePicure(index) {
      this.Photos.splice(index,1)
    },
    deleteAnswers(index) {
      this.Answers.splice(index,1)
    }
  },
  computed:{
    total() {
      return [...this.Edit,...this.Photos,...this.Multiples,...this.Answers,...this.Booleens]
    }
  }
}
</script>

<style>

</style>