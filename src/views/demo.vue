<template>
  <div>
    <div  class="flex justify-center" v-for="(i,index) in 10 " :key="index">
       <div class="w-1/2">
          <input class="block w-full text-xs md:text-sm text-gray-900 bg-gray-50  border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 placeholder:text-xs md:placeholder:text-sm" aria-describedby="file_input_help" id="file_input" accept="image/png, image/gif, image/jpeg" type="file" @change="previewImage">
      </div>
    </div>
     <pre>
       {{images}}
     </pre>
  
  </div>
</template>

<script>

import Multiselect from 'vue-multiselect'
import Chat from '@/components/Chat.vue'
import ModalChat from '@/components/ModalChat'
export default {
  components:{Multiselect,Chat,ModalChat},
  data() {
    return {
      value: '',
      projets:[
        {id:'1',nom:'projet 1'},
        {id:'2',nom:'projet 2'},
        {id:'3',nom:'projet 3'},
        {id:'4',nom:'projet 4'},
        {id:'5',nom:'projet 5'},
        {id:'6',nom:'projet 6'},
        {id:'7',nom:'projet 7'},
      ],
      file:[],
      images:[]
    }
  },
  methods:{
    customLabel ({ nom }) {
      return `${nom}`
    },
    previewImage(event) {
      this.image = event.target.files[0];
      this.images.push({image:this.image})
      console.log(this.images)
     
    }
   
  },
  mounted() {
    this.value = {id:'8',nom:'projet 8'}
  }
}
</script>

<style>

</style>