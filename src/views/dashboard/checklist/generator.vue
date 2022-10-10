<template>
 <div class="px-4">
  <div  class="my-4">
    <form action="">
      <div class="flex justify-center ">
            <div class="w-3/4">
              <div v-for="checklist in checklists" :key="checklist.id" class=" border border-dashed border-gray-400 p-6">
                <div class="flex justify-between">
                  <h1 class="text-lg font-semibold uppercase text-center py-2">{{checklist.activite}}</h1>
                  <div class="flex items-center my-4">
                    <label for="vrai" class="px-4 block text-sm uppercase font-medium text-gray-700">
                        <input id="vrai" name="verite" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-primary border-gray-300"/>
                        realiser
                    </label>
                    <label for="faux" class="px-4 block text-sm uppercase font-medium text-gray-700">
                        <input id="faux" name="verite" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-primary border-gray-300"/>
                      non realiser
                    </label>
                  </div>
                </div>
              <div v-for="form in checklist.data" :key="form.id">
                <div v-if="form.type=='edit'">
                    <label   class=" block py-2 text-sm font-semibold " for="">
                      {{form.label}} <span  class="px-2 text-lg font-black text-red-700">*</span>
                    </label>
                    <input  type="text"   class="px-4 py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent placeholder:text-sm"  />
                </div>
                <div v-if="form.type=='photos'">
                  <label   class=" block py-2 text-sm font-semibold " for="">
                    {{form.label}} <span  class="px-2 text-lg font-black text-red-700">*</span>
                  </label>
                  <input  type="file" accept="png,jpg"   class="px-4 py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent placeholder:text-sm"  />
                </div>
                <div v-if="form.type=='boolean'">
                  <label for="name" class="my-4 block text-xl font-medium text-gray-700">{{form.label}}</label>
                  <div class="flex items-center my-4">
                    <label for="vrai" class="px-4 block text-sm uppercase font-medium text-gray-700">
                      <input id="vrai" name="verite" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-primary border-gray-300"/>
                      realiser
                    </label>
                    <label for="faux" class="px-4 block text-sm uppercase font-medium text-gray-700">
                      <input id="faux" name="verite" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-primary border-gray-300"/>
                      non realiser
                    </label>
                  </div>
                </div>
                <div class="" v-if="form.type=='multiple'">
                  <label for="name" class="my-4 block text-xl font-medium text-gray-700">{{form.label}}</label>
                  <label v-for="answers in Answers" :key="answers.id" class="px-4  text-sm uppercase font-medium text-gray-700">
                    <input  name="multiple" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-primary border-gray-300"/>
                    {{answers.label}} /
                  </label>
                </div>
              </div>
              </div>
            </div>
      </div>
      <div class="py-2 my-2 flex justify-center space-x-8">
        <vbutton  type="submit" template="success">Enregistrer </vbutton>
      </div>
    </form>
  </div>
  </div>
</template>

<script>
  import Vform from '@/components/Vform'
  import Vbutton from '@/components/Vbutton'
export default {
  components: {
    Vform,
    Vbutton,
  },
  data() {
    return {
      seeChecklist:true,
      seeForm:false,
      showModal:false,
      champs:[],
      headers:[
          {name:'Libelle activite',props:'libelle'},
          {name:'Code activite',props:'code'},
          {name:'Programme',props:'programme'},
          {name:'Date debut',props:'debut'},
          {name:'Date fin',props:'fin'},
          {name:'Date de creation',props:'created_at'},
        ],
        checklists:[
          {
            "activite": "Preparer et faire valider par le Mo et MOD un PGESC",
            "data": [
              {
                "type": "edit",
                "label": "Date de validation",
                "content": null
              },
              {
                "type": "edit",
                "label": "Plaquette validée et/ou notification de la validation",
                "content": null
              }
            ]
          },
          {
            "activite": "Preparer et faire valider par le Mo et MOD un PAE",
            "data": [
              {
                "type": "edit",
                "label": "Date de validation",
                "content": null
              },
              {
                "type": "edit",
                "label": "PAE approuvé",
                "content": null
              }
            ]
          },
          {
            "activite": "Preparer et faire valider par le Mo et MOD un PPGED",
            "data": [
              {
                "type": "edit",
                "label": "Date de validation",
                "content": null
              },
              {
                "type": "edit",
                "label": "PPGED approuvé",
                "content": null
              }
            ]
          },
          {
            "activite": "Preparer et faire valider par le Mo et MOD un PPSPS",
            "data": [
              {
                "type": "edit",
                "label": "Date de validation",
                "content": null
              },
              {
                "type": "edit",
                "label": "PPSPS approuvé",
                "content": null
              }
            ]
          },
        ],
        actions:[
          {name:'modifier',iconne:''},
          {name:'supprimer',iconne:''},
        ],
    }
  },
  methods: {
    
   
  },
  mounted() {
    
  }
}
</script>

<style>

</style>