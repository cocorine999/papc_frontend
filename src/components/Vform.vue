<template>
  <form @submit.prevent="save">
    <div v-for="champ in champs" :key="champ.id">
      <div :class="`grid grid-cols-1 gap-4`">
         <div v-if="champ.isSelect ===false && champ.isTextArea ===false" >
          <label   class=" block py-2 text-sm font-semibold " for="">
          {{champ.name}} <span v-if="champ.required" class="px-2 w-full text-lg font-black text-red-700">*</span>
          </label>
          <input :required="champ.required" v-model='champ.data'  :placeholder="champ.placeholdere" :type="champ.type"    class="px-4 py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent"  />
        </div>

        <div v-else-if="champ.isSelect ===true && champ.isTextArea ===false">
          <label  class=" block py-2 text-sm font-semibold " for="">
          {{champ.name}}  <span v-if="champ.required" class="px-2 text-lg font-black text-red-700">*</span>
          </label>
          <multiselect v-model="champ.data" :required="champ.required" :options="champ.options" :custom-label="champ.methode"  :placeholder="champ.placeholdere" label="name" track-by="name"></multiselect>
        </div>
        <div v-else-if="champ.isSelect ===false && champ.isTextArea ===true">
          <label  class=" block py-2 text-sm font-semibold " for="">
            {{champ.name}} <span v-if="champ.required" class="px-2 text-lg font-black text-red-700">*</span>
          </label>
          <textarea v-model='champ.data' class="px-4 py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent" required rows="3"></textarea>
        </div>
        <div v-else-if="champ.isCheckbox ===true">
          <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Attributaires <span class="px-2 text-lg font-black text-red-700">*</span></label>
          <div class="flex items-center  justify-evenly">
            <label v-for="item in champ.items" :key="item.id" class=""> <input  class="px-3 mx-2 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2  focus:border-transparent" name="lot" id="travaux" :value="item.name" type="radio" /> {{item.name}} </label>
          </div>
        </div>
      </div>
    </div>


    <div class="py-2 my-2 flex justify-center space-x-8">
      <vbutton  type="submit" template="success"> {{submitText}} </vbutton>
      <vbutton  type="reset" template="danger"> annuler </vbutton>
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