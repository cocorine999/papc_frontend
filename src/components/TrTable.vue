<template>
  <div>
    <div>
      <div class="">
        <span @click="changeState" v-if="attribut =='en cours' && status " class="text-xs cursor-pointer bg-green-500 text-white p-1 border-green-500 outline-none "> {{attribut}}</span>
        <span @click="changeState" v-else-if="attribut =='terminer' && status " class="text-xs cursor-pointer bg-red-500 text-white p-1 border-red-500 outile-none "> {{attribut}}</span>
        <span @click="changeState" v-else-if="attribut =='en attente' && status " class="text-xs cursor-pointer bg-yellow-500 text-white p-1 border-yellow-500 outile-none "> {{attribut}}</span>
        <div @click.stop="updateData" :class="{'whitespace-nowrap':depliment}" v-if="attribut !='en cours' && attribut != 'terminer' && attribut != 'en attente' && isVisible  " class="text-xs cursor-pointer">
          <p v-if="!depliment" class="cursor-pointer font-semibold"> {{attribut? attribut.substring(0,30) : ''}} <span @click="deplier" class=" cursor-pointer font-black text-xl px-1 rounded-md" v-if="attribut ? attribut.length > 30 : 0" :title="attribut" >...</span></p>
          <p v-else class="cursor-pointer font-semibold flex space-x-2"> 
            <span> {{ attribut }}</span>
            <span @click="depliment=false" >
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M8 7v4L2 6l6-5v4h5a8 8 0 1 1 0 16H4v-2h9a6 6 0 1 0 0-12H8z"></path></g></svg>
            </span>
          </p>
        </div>
      </div>
      <input  type="text" v-if="!isVisible" v-model="attribut" @keyup.enter="update" class="border w-full  border-primary py-1 px-2 text-xs "/>
      <select name="" v-model="attribut"  @change="hideSelect(attribut)" v-if="!status" id="">
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
      attribut: this.data,
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
    
        if(this.data !== this.attribut){
            this.$emit('update', this.objet?.id, this.objet?.extra, this.objet?.attribut, this.attribut)
            //this.data = this.attribut
        }
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
        
        if(this.isEditable){ 
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