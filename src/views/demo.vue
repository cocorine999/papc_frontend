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
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
export default {
  components:{Multiselect},
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
      ]
    }
  },
  methods:{
    customLabel ({ nom }) {
      return `${nom}`
    },
  },
  mounted() {
    this.value = {id:'8',nom:'projet 8'}
  }
}
</script>

<style>

</style>