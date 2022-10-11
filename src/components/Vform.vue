<template>
  <form @submit.prevent="save" id="vform">
    <div v-for="champ in champs" :key="champ.id">
      <div :class="`grid grid-cols-1 gap-4`">
         <div v-if="champ.isSelect ===false && champ.isTextArea ===false" >
          <label   class=" block py-2 
text-xs  md:text-sm font-semibold " for="">
          {{champ.name}} <span v-if="champ.required" class="px-2 w-full text-lg font-black text-red-700">*</span>
          </label>
          <input v-if="champ.type !='file'" :required="champ.required" v-model='champ.data' :min="champ.type === 'number' ? '0' : ''" :placeholder="champ.placeholdere" :type="champ.type"    class="px-2 py-1 md:px-4 md:py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent placeholder:text-xs md:placeholder:text-sm"  />
          
           <div v-else class="">
              <div v-if="champ.isImage">
                <input class="block w-full text-sm text-gray-900 bg-gray-50  border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" accept="image/png, image/gif, image/jpeg" type="file" @change="previewImage">
              </div>
              <div v-else>
                <input class="block w-full text-sm text-gray-900 bg-gray-50  border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" multiple type="file" @change="previewFiles">
              </div>
            </div>
           
          <div  v-for="(error, key) in champ.errors" :key="key">
              <span class="text-red-500 absolute right-4 top-2"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1.8em" width="1.6em" xmlns="http://www.w3.org/2000/svg"><path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z"></path></svg></span>
              <div class="text-red-500 text-sm   py-2 font-semibold">
                  {{ error }}
              </div>
          </div>
        </div>

        <div v-else-if="champ.isSelect ===true && champ.isTextArea ===false">
          <label  class=" block py-2 
text-xs  md:text-sm font-semibold " for="">
          {{champ.name}}  <span v-if="champ.required" class="px-2 text-lg font-black text-red-700">*</span>
          </label>
          <multiselect v-model="champ.data" :required="champ.required" :preselect-first="true" :options="champ.options" :custom-label="champ.methode" :placeholder="champ.placeholdere" :label="champ.value" :track-by="champ.cle"></multiselect>
          <div  v-for="(error, key) in champ.errors" :key="key">
            <span class="text-red-500 absolute right-4 top-2"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1.8em" width="1.6em" xmlns="http://www.w3.org/2000/svg"><path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z"></path></svg></span>
            <div class="text-red-500 text-sm   py-2 font-semibold">
              {{ error }}
            </div>
          </div>

        </div>
        <div v-else-if="champ.isSelect ===false && champ.isTextArea ===true">
          <label  class=" block py-2 
text-xs  md:text-sm font-semibold " for="">
            {{champ.name}} <span v-if="champ.required" class="px-2 text-lg font-black text-red-700">*</span>
          </label>
          <textarea v-model='champ.data' class="px-2 py-1 md:px-4 md:py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent placeholder:text-xs md:placeholder:text-sm" required rows="3"></textarea>
          <div  v-for="(error, key) in champ.errors" :key="key">
              <span class="text-red-500 absolute right-4 top-2"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1.8em" width="1.6em" xmlns="http://www.w3.org/2000/svg"><path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z"></path></svg></span>
              <div class="text-red-500 text-sm   py-2 font-semibold">
                  {{ error }}
              </div>
          </div>
        </div>
        <div v-else-if="champ.isCheckbox ===true" class="my-2">
          <label class="text-sm font-semibold   block uppercase md:text-sm text-light"> {{champ.name}} <span class="px-2 text-lg font-black text-red-700">*</span></label>
          <div class="flex items-center  justify-evenly">
            <label v-for="item in champ.items" :key="item.id" class=""> <input  v-model="champ.data" class="px-3 mx-2 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2  focus:border-transparent" name="lot" id="travaux" :value="item.name" type="radio" /> {{item.name}} </label>
          </div>
          <div  v-for="(error, key) in champ.errors" :key="key">
              <span class="text-red-500 absolute right-4 top-2"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1.8em" width="1.6em" xmlns="http://www.w3.org/2000/svg"><path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z"></path></svg></span>
              <div class="text-red-500 text-sm   py-2 font-semibold">
                {{ error }}
              </div>
          </div>
        </div>
      </div>
    </div>


    <div class="py-2 my-2 flex justify-center space-x-8">
      <vbutton  type="submit" :isloading="sendRequest" template="success"> {{submitText}} </vbutton>
      <vbutton type="reset" template="danger" @close="close"> annuler </vbutton>
    </div>
  </form>
</template>

<script>
import Multiselect from 'vue-multiselect'
import Vbutton from '@/components/Vbutton'
export default {

  props:['template','champs', 'cols', 'submitText', 'sendRequest', 'isAllPairSaufDescrip','attrs'],
  components: {
    Vbutton,
    Multiselect
  },
  datas() {
    return {
      file:'',
      image:''
    }
  },
  methods: {
   
    save() {
      if(this.sendRequest !== undefined && this.sendRequest === false){
        this.$emit('sendForm')
      }else{

        this.$emit('sendForm')
      }
    },

    close(){
      this.$emit('closeModal')
    },

    previewFiles(event) {
      this.file = event.target.files;
      this.$emit('getFile',this.file)
      console.log('les fichiers',this.file)
    },
    previewImage(event) {
      this.image = event.target.files[0];
      this.$emit('getImage',this.image)
    }
  
  },
  computed: {
    Inputs(){
      let datas = []
      if(this.champs!= undefined || this.champs != null) {
        this.champs.forEach(element => {
          if(element.isSelect ===false && element.isTextArea ===false) {
            datas.push(element)
          }
        });
      }
      
      
      return datas
    },
    Selects(){
      let datas = []
      if(this.champs!= undefined || this.champs != null) {
        this.champs.forEach(element => {
          if(element.isSelect ===true && element.isTextArea ===false) {
            datas.push(element)
          }
        });
      }
      return datas
    },
    TextArea(){
      let datas = []
      if(this.champs!= undefined || this.champs != null) {
        this.champs.forEach(element => {
          if(element.isTextArea ===true && element.isSelect ===false) {
            datas.push(element)
          }
        });
      }
      return datas
    },
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>