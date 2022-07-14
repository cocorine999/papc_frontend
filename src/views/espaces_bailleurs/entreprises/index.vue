<template>
  <dashboard espace="bailleur">
    <div class="p-4">
      <route-name title="entreprises" />
      <div v-if="showModal">
        <modal-top-right title="Ajouter un entreprise" v-on:close="close">
          <form-component :form="form" @send="sender" />
        </modal-top-right>
      </div>
      <div class="flex items-center justify-between">
        <titre>Les entreprises </titre>
          <button @click="showModal=true" title="ajouter un bailleur" class="py-2  px-4 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase bg-primary focus:outline-none focus:shadow-outline">
            <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg></span>
            <span class="mx-2 text-sm font-semibold">ajouter</span>
          </button>
      </div>
      <div class="align-middle inline-block w-full  overflow-hidden  pt-3 rounded-bl-lg rounded-br-lg">
        <table class="w-full">
          <thead>
            <tr>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">#</th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Nom</th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Description</th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Email</th>

              <th class="px-6 py-3 border-b-2 border-gray-300 text-center text-sm leading-4 text-primary tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr v-for="i in 5" :key="i.id">
              
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500"> {{i}} </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500"> AGETUR </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis, modi...</td>
              <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">johndoe@gmail.com </td>
              
              <td class="px-6 py-4 whitespace-no-wrap text-center border-b border-gray-500 text-sm leading-5">
                <div class="flex item-center justify-center">
                  <!-- <div title="details"  class="cursor-pointer w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div> -->
                  <div class="w-4 mr-2 transform hover:text-blue-500 hover:scale-110"  @click="editer({nom: 'John', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis, modi..', email: 'johndoe@gmail.com', password: '123'})">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  <div   class="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </div>
                </div>      
              </td>
            </tr>              
          </tbody>
        </table>
      </div>
    </div>
  </dashboard>
</template>

<script>
  import Dashboard from '@/layouts/Dashboard'
  import RouteName from '@/components/RouteName'
  import ModalTopRight from '@/components/ModalTopRight'
  import FormComponent from '@/components/FormComponent'
  import Titre from '@/components/Titre'

export default {
  components: {
    ModalTopRight,
    Dashboard,
    RouteName,
    FormComponent,
    Titre
  },
    data() {
      return ({
        showModal:false,
        form: [
          { label: "nom", type: "text", value: null },
          { label: "description", type: "text", value: null },
          { label: "email", type: "email", value: null },
          { label: "password", type: "password", value: null },
        ]
      });
    },
    mounted() {
    },
    methods: {
      sender(){
        let data = {};

        for (let i = 0; i < this.form.length; i++) {
          data[this.form[i].label] = this.form[i].value;
        }
        alert(JSON.stringify(data))
      },
      editer(data){
        for (let i = 0; i < this.form.length; i++) {
          this.form[i].value =  data[this.form[i].label];
        }
        this.showModal = true;
      },
      
      close() {
        this.showModal = false
      }
    }
}
</script>

<style scoped>

</style>