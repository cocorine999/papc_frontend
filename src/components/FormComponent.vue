<template>
  <form class="p-4" @submit.prevent="sender">

    <div class="form-group my-2" v-for="(item, i) in form" :key="i">
      <label class="text-xs font-semibold block text-gray-500 uppercase md:text-sm text-light">{{item.label}}<span class="px-2 text-lg font-black text-red-700">*</span></label>
      <input v-if="item.type !== 'select'" v-model="item.value" required class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2 w-full focus:border-transparent" :type="item.type" :placeholder="'Entrer '+item.label" />
      <select multiple v-if="item.type === 'select'" v-model="item.value" class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2 w-full  focus:border-transparent">
         <option v-for="(ite, j) in item.options" :key="j" :value="ite.value">{{ite.label}}</option>
      </select>
    </div>

    <div class="w-full mt-10 flex justify-center">
      <button type="submit" class="p-2 mr-2 overflow-hidden text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
        <span class="mx-2 text-sm font-semibold">Enrégistrer & Fermer</span>
      </button> 
      <button class="p-2 ml-2 overflow-hidden text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
        <span class="mx-2 text-sm font-semibold">Enrégistrer & Ajouter</span>
      </button> 
    </div>
    
  </form>
</template>

<script>
import { emit } from "process"

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
