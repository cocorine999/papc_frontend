<template>
  <dashboard>
    <div>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, quo, eum numquam distinctio blanditiis commodi sit quibusdam, omnis natus provident repellendus quis nihil cum dolorum. Quis placeat et modi porro?
        <vform template="default" :champs="champs" :cols="cols" submitText="Creer à partir de" :attrs="selectData"  @sendForm="sendForm" ></vform>
   
    <pre>
      {{champs}}
    </pre>
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