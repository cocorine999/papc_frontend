<template>
  <form @submit.prevent="save">
    <div v-if="isAllPairSaufDescrip">
      <div :class="`grid grid-cols-${cols} gap-4`">
        <div  v-for="input in Inputs" :key="input.id">
          <label   class=" block py-2 text-sm font-semibold " for="">
          {{input.name}} <span v-if="input.required" class="px-2 text-lg font-black text-red-700">*</span>
          </label>
          <input :required="input.required" v-model='input.data'  :placeholder="input.placeholdere" :type="input.type"    class="px-4 py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent"  />
        </div>

        <div class="" v-for="select in Selects" :key="select.id">
          <label  class=" block py-2 text-sm font-semibold " for="">
          {{select.name}}  <span v-if="select.required" class="px-2 text-lg font-black text-red-700">*</span>
          </label>
          <select :required="select.required" v-model='select.data'    class="px-4 py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent">
            <option value=""> {{select.placeholdere}} </option>
            <option :value="data" v-for="(data,index) in  select.options" :key="index">
              {{data}}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div v-else>

      <div :class="`grid grid-cols-${cols} gap-4`">
        <div  v-for="input in Inputs" :key="input.id">
          <label   class=" block py-2 text-sm font-semibold " for="">
          {{input.name}} <span v-if="input.required" class="px-2 text-lg font-black text-red-700">*</span>
          </label>
          <input required v-model='input.data'  :placeholder="input.placeholdere" :type="input.type"    class="px-4 py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent"  />


          <div  v-for="(error, key) in input.errors" :key="key">
              <span class="text-red-500 absolute right-4 top-2"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1.8em" width="1.6em" xmlns="http://www.w3.org/2000/svg"><path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z"></path></svg></span>
              <div class="text-red-500 text-sm   py-2 font-semibold">
                error
              </div>
          </div>

        </div>
      </div>

      <div :class="`grid grid-cols-${cols} gap-4`">
        <div class="my-2" v-for="select in Selects" :key="select.id">
          <label  class=" block py-2 text-sm font-semibold " for="">
            {{select.name}}  <span v-if="select.required" class="px-2 text-lg font-black text-red-700">*</span>
          </label>
          <select :required="select.required" v-model='select.data'    class="px-4 py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent">
            <option value=""> {{select.placeholdere}} </option>
            <option :value="data" v-for="(data,index) in  select.options" :key="index">
              {{data}}
            </option>
          </select>

          <div  v-for="(error, key) in select.errors" :key="key">
              <span class="text-red-500 absolute right-4 top-2"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1.8em" width="1.6em" xmlns="http://www.w3.org/2000/svg"><path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z"></path></svg></span>
              <div class="text-red-500 text-sm   py-2 font-semibold">
                error
              </div>
          </div>

        </div>
      </div>

    </div>

    <div v-for="area in TextArea" :key="area.id">
        <label  class=" block py-2 text-sm font-semibold " for="">
          {{area.name}} <span v-if="area.required" class="px-2 text-lg font-black text-red-700">*</span>
        </label>
        <textarea v-model='area.data' class="px-4 py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent" required rows="3"></textarea>
        
        <div  v-for="(error, key) in area.errors" :key="key">
            <span class="text-red-500 absolute right-4 top-2"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1.8em" width="1.6em" xmlns="http://www.w3.org/2000/svg"><path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z"></path></svg></span>
            <div class="text-red-500 text-sm   py-2 font-semibold">
              error
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
import Vbutton from '@/components/Vbutton'
export default {
  props:['template','champs','cols','submitText','isAllPairSaufDescrip'],
  components: {
    Vbutton
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

<style>

</style>