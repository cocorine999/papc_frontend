<template>
  <div>
    <div>
      <div  class="">
        <span @click="changeState" v-if="data =='en cours' && status " class="text-xs cursor-pointer bg-green-500 text-white p-1 border-green-500 outline-none "> {{data}}</span>
        <span @click="changeState" v-else-if="data =='terminer' && status " class="text-xs cursor-pointer bg-red-500 text-white p-1 border-red-500 outile-none "> {{data}}</span>
        <span @click="changeState" v-else-if="data =='en attente' && status " class="text-xs cursor-pointer bg-yellow-500 text-white p-1 border-yellow-500 outile-none "> {{data}}</span>
        <div @click.stop="updateData" :class="{'whitespace-nowrap':depliment}" v-if="data !='en cours' && data != 'terminer' && data != 'en attente' && isVisible  " class="text-xs cursor-pointer">
          <p v-if="!depliment" class="cursor-pointer font-semibold"> {{data.substring(0,30)}} <span @click="deplier" class=" cursor-pointer font-black text-xl px-1 rounded-md" v-if="data.length > 30" :title="data" >...</span></p>
          <p v-else class="cursor-pointer font-semibold flex space-x-2"> 
            <span> {{data}}</span>
            <span @click="depliment=false" >
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M8 7v4L2 6l6-5v4h5a8 8 0 1 1 0 16H4v-2h9a6 6 0 1 0 0-12H8z"></path></g></svg>
            </span> 
          </p>
        </div>
      </div>
      <input  type="text" v-if="!isVisible" v-model="data" @keyup.enter="isVisible=true" class="border w-full  border-primary py-1 px-2 text-xs "/>
      <select name="" v-model="data"  @change="hideSelect(data)" v-if="!status" id="">
        <option value="">en cours</option>
        <option value="">en attente</option>
        <option value="">terminer</option>
      </select>
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
      status:true,
      delay: 700,
      clicks: 0,
      timer: null,
      depliment:false
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
      },

      deplier() {
        this.depliment = true
      },
      
      updateData(event) {
        this.clicks++;
        if (this.clicks === 1) {
          this.timer = setTimeout( () => {
            this.clicks = 0
          }, this.delay);
        } else {
          clearTimeout(this.timer);  
          this.isVisible = false
          this.clicks = 0;
        }         
      }, 

      changeState(event) {
        this.clicks++;
        if (this.clicks === 1) {
          this.timer = setTimeout( () => {
            this.clicks = 0
          }, this.delay);
        } else {
          clearTimeout(this.timer);  
          this.isVisible = false
          this.clicks = 0;
        }         
      }, 
      showSelect() {
          this.status = true
          this.isVisible = false
      }
  }
}
</script>

<style>

</style>