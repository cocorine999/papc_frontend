<template>
  <div>
    <h1>demo select</h1>
    <p> {{value}} </p>
    <select name="" v-model="value" class="px-4 py-2 border " id="">
      <option value="jacob">jacob</option>
      <option value="gomez">gomez</option>
      <option  value="ambroise" selected>ambroise</option>
     
    </select>
     <multiselect v-model="value" :options="projets" :custom-label="customLabel" :preselect-first="true" placeholder="selectionnez un projet" label="nom" track-by="id"></multiselect>

       <input class="block w-full text-sm text-gray-900 bg-gray-50  border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" multiple type="file" @change="previewFiles">
       <preview></preview>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import Preview from '@/components/Preview.vue'
export default {
  components:{Multiselect,Preview},
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