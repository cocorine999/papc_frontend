<template>
  <dashboard>
    <div>
      <pre>
       la data  {{data}}
      </pre>
     <div class="my-4">
                <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light"> Selectionnez un trimestre <span class="px-2 text-lg font-black text-red-700">*</span></label>
                <div class="flex justify-between my-3">
                  <div>
                    <input type="radio" v-model="data"  id="T1" name="trimestre" value="T1" >
                    <label class="px-2" for="T1">T1</label>
                  </div>
                  <div>
                    <input type="radio" v-model="data" id="T2" name="trimestre" value="T2">
                    <label class="px-2" for="T2">T2</label>
                  </div>
                  <div>
                    <input type="radio" v-model="data" id="T3" name="trimestre" value="T3">
                    <label class="px-2" for="T3">T3</label>
                  </div>
                  <div>
                    <input type="radio" v-model="data" id="T4" name="trimestre" value="T4">
                    <label class="px-2" for="T4">T4</label>
                  </div>
                </div>

              </div>
   </div>
  </dashboard>
</template>

<script>
import Dashboard from '@/layouts/Dashboard.vue'
import Vform from '@/components/Vform'
export default {
  components: {
    Dashboard,Vform
  },
  data() {
    return {
      data:'',
      champs:[],
        cols:1,
        options:[]
    }
  },
  methods: {
    sendForm() {

    },
    selectData ({ name}) {
      return `${name}`
    },
     selectData2 ({ nom}) {
      return `${nom}`
    },
  },
  mounted() {
    const demo = [{name:'papc'},{name:'pool'},{name:'demo'}]
    const demo2 = [{nom:'BM'},{nom:'pool'},{nom:'demo'}]
    const inputs = [
        {name:'Nom',type:'text',placeholdere:"Nom de  l'unité de gestion",isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Email',type:'email',placeholdere:"Votre Email",isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Contact',type:'',placeholdere:'Votre contact',isSelect:false,isTextArea:false,data:'',required:true,},
        {name:'Programme',type:'',placeholdere:'Choisir un programme',isSelect:true,isTextArea:false,data:'',options:demo,required:true,methode:this.selectData},
        {name:'bailler',type:'',placeholdere:'Choisir un programme',isSelect:true,isTextArea:false,data:'',options:demo2,required:true,methode:this.selectData2},
      ]
   
    this.champs = inputs
  }
}
</script>

<style>

</style>