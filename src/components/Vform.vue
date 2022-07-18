<template>
  <form @submit.prevent="save" id="vform">
    <div v-for="champ in champs" :key="champ.id">
      <div :class="`grid grid-cols-1 gap-4`">
         <div v-if="champ.isSelect ===false && champ.isTextArea ===false" >
          <label   class=" block py-2 text-sm font-semibold " for="">
          {{champ.name}} <span v-if="champ.required" class="px-2 w-full text-lg font-black text-red-700">*</span>
          </label>
          <input :required="champ.required" v-model='champ.data' :min="champ.type === 'number' ? '0' : ''" :placeholder="champ.placeholdere" :type="champ.type"    class="px-4 py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent"  />
          <div  v-for="(error, key) in champ.errors" :key="key">
              <span class="text-red-500 absolute right-4 top-2"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1.8em" width="1.6em" xmlns="http://www.w3.org/2000/svg"><path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z"></path></svg></span>
              <div class="text-red-500 text-sm   py-2 font-semibold">
                  {{ error }}
              </div>
          </div>
        </div>

        <div v-else-if="champ.isSelect ===true && champ.isTextArea ===false">
          <label  class=" block py-2 text-sm font-semibold " for="">
          {{champ.name}}  <span v-if="champ.required" class="px-2 text-lg font-black text-red-700">*</span>
          </label>
          <multiselect v-model="champ.data" :required="champ.required" :options="champ.options" :custom-label="champ.methode" :placeholder="champ.placeholdere" :label="champ.value" :track-by="champ.cle"></multiselect>
          <div  v-for="(error, key) in champ.errors" :key="key">
              <span class="text-red-500 absolute right-4 top-2"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1.8em" width="1.6em" xmlns="http://www.w3.org/2000/svg"><path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z"></path></svg></span>
              <div class="text-red-500 text-sm   py-2 font-semibold">
                  {{ error }}
              </div>
          </div>

        </div>
        <div v-else-if="champ.isSelect ===false && champ.isTextArea ===true">
          <label  class=" block py-2 text-sm font-semibold " for="">
            {{champ.name}} <span v-if="champ.required" class="px-2 text-lg font-black text-red-700">*</span>
          </label>
          <textarea v-model='champ.data' class="px-4 py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent" required rows="3"></textarea>
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
      <vbutton  type="submit" template="success"> {{submitText}} </vbutton>
      <vbutton type="reset" template="danger" @close="close"> annuler </vbutton>
    </div>
  </form>
</template>

<script>
import Multiselect from 'vue-multiselect'
import Vbutton from '@/components/Vbutton'
export default {

  props:['template','champs','cols','submitText','isAllPairSaufDescrip','attrs'],
  components: {
    Vbutton,Multiselect,
  },
  datas() {
    return {
       
    }
  },
  methods: {
   
    save() {
      this.$emit('sendForm')
    },

    close(){
      this.$emit('closeModal')
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

</style>