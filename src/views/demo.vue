<template>
  <div>
      <modal-chat v-if="true" title="espace commentaire" v-on:close="false">
        <chat></chat>
      </modal-chat>
  
  </div>
</template>

<script>
import ModalChat from '@/components/ModalChat'
import Multiselect from 'vue-multiselect'
import Chat from '@/components/Chat.vue'
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
      fichiers:[]
    }
  },
  methods:{
    customLabel ({ nom }) {
      return `${nom}`
    },
    previewFiles(event) {
      this.file = event.target.files;
       for (const property in this.file) {
        this.fichiers.push(this.file[property])
      }
      this.fichiers.pop()
      this.fichiers.pop()
    },
  },
  mounted() {
    this.value = {id:'8',nom:'projet 8'}
  }
}
</script>

<style>

</style>