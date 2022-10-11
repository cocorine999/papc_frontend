<template>
  <form class="p-4" @submit.prevent="sender" id="vform">

    <div class="form-group my-2" v-for="(item, i) in form" :key="i">
      <label class="text-xs font-semibold block text-gray-500 uppercase md:text-sm text-light">{{item.label}}<span class="px-2 text-lg font-black text-red-700">*</span></label>
      <input v-if="item.type !== 'select'" v-model="item.value" required class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2 w-full focus:border-transparent" :type="item.type" :placeholder="'Entrer '+item.label" />
      <select :multiple="item.mutiple" v-if="item.type === 'select'" v-model="item.value" class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2 w-full  focus:border-transparent">
         <option v-for="option in item.options" :key="option[item.cle]" :value="option[item.cle]">{{ option[item.text] }}</option>
      </select>

      <div  v-for="(error, key) in item.errors" :key="key">
        <span class="text-red-500 absolute right-4 top-2"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1.8em" width="1.6em" xmlns="http://www.w3.org/2000/svg"><path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z"></path></svg></span>
        <div class="text-red-500 text-sm   py-2 font-semibold">
          {{ error }}
        </div>
      </div>

    </div>

    <div class="w-full mt-10 flex justify-center">
      <button type="submit" class="p-2 mr-2 overflow-hidden text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
        <span class="mx-2 text-xs  md:text-sm font-semibold">Enrégistrer & Fermer</span>
      </button> 
      <button class="p-2 ml-2 overflow-hidden text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
        <span class="mx-2 text-xs  md:text-sm font-semibold">Enrégistrer & Ajouter</span>
      </button> 
    </div>
    
  </form>
</template>

<script>

export default {
  props: ["form"],
  data() {
    return({
      values: []
    })
  },
  mounted(){
    
  },
  methods: {
    sender(){
      this.$emit("send")
    }
  }
}
</script>

<style>

</style>
