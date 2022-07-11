<template>
  <div>
    <div>
      <div>
        <div v-if="isVisible" class="cursor-pointer" @click="edit">
          <span class="text-xs"> {{data}}</span>
        </div>
        <input type="text" v-else v-model="data" @keyup.enter="update" :name="objet.attribut" class="border w-full border-primary py-1 px-2 text-xs "/>
      </div>
      <!-- 
        <div class="">
          <span @click="status=false" v-if="data =='en cours' && status " class="text-xs cursor-pointer bg-green-500 text-white p-1 border-green-500 outline-none "> {{data}}</span>
          <span @click="status=false" v-else-if="data =='terminer' && status " class="text-xs cursor-pointer bg-red-500 text-white p-1 border-red-500 outile-none "> {{data}}</span>
          <span @click="status=false" v-else-if="data =='en attente' && status " class="text-xs cursor-pointer bg-yellow-500 text-white p-1 border-yellow-500 outile-none "> {{data}}</span>
          <span @click="isVisible=false" v-if="data !='en cours' && data != 'terminer' && data != 'en attente' && isVisible  " class="text-xs cursor-pointer"> {{data}} </span>
        </div>
        <input @click="isVisible=true" type="text" v-if="!isVisible" v-model="data" @keyup.enter="isVisible=true" class="border w-full border-primary py-1 px-2 text-xs "/>
        <select name="" v-model="data"  @change="hideSelect(data)" v-if="!status" id="">
          <option value="">en cours</option>
          <option value="">en attente</option>
          <option value="">terminer</option>
        </select> 
      -->
    </div>
  </div>
</template>

<script>
export default {
  props:['data', 'objet', 'isEditable'],
  data() {
    return {
      isVisible:true,
      isSelct:false,
      status:true
    }
  },
   methods: {

      edit()
      {
        if(this.isEditable) 
          this.isVisible = false
      },
      
      update() {
        
        this.isVisible = true

        this.$emit('update', this.objet?.id, this.objet?.attribut, this.data)
      },

      showSelect() {
          this.status = true
          this.isVisible = false
      },
      
      hideSelect(data) {
          this.status = true
      }
  }
}
</script>

<style>

</style>