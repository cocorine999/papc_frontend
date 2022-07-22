<template>
  <!-- cards Tâches -->
  <div  @mouseenter="showValidate = true" @mouseleave="showValidate = false" class="relative">
    <!-- dots -->
    <div class="absolute right-1 flex space-x-3 top-4 z-10  cursor-pointer">
      <span v-if="!isValidate" title="tache non valider" class="text-red-300"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z" stroke="none"/><path d="M21 19.1H3V5h18v14.1zM21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" stroke="none"/><path fill="none" d="M21 19.1H3V5h18v14.1zM21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" stroke="none"/><path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41z" stroke="none"/></svg></span>
      <span v-if="isValidate" title="tache valider" class="text-green-500"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2 15.5V2a2 2 0 012-2h8a2 2 0 012 2v13.5a.5.5 0 01-.74.439L8 13.069l-5.26 2.87A.5.5 0 012 15.5zm8.854-9.646a.5.5 0 00-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 10-.708.708l1.5 1.5a.5.5 0 00.708 0l3-3z" stroke="none"/></svg></span>
      <dropdown @supprimer="$emit('supprimer')" @modifier="$emit('modifier')"  :option="option"></dropdown>
    </div>
     <!-- dots -->
    <!-- cards Activités -->
    <div class="relative p-4 max-w-80 bg-white sm:rounded-lg overflow-hidden ">  
      <!-- ./dots -->
      <div class="absolute uppercase flex space-x-2 items-center ">
        <div class="bg-primary rounded-lg text-sm text-white px-3 py-1 font-semibold ">
          <i class='bx bx-coin-stack mr-1'></i>
          <span>{{bailleur}}</span>
          </div>
        <button title="valider une activite" v-if="showValidate" @click="validation" class="bg-green-500 rounded-lg text-sm   px-3 py-1 font-semibold text-white">Valider</button>       
      </div>
      <div class="cursor-pointer">
        <span class="absolute z-10 bottom-0 left-0 w-full h-10 text-white font-bold leading-3 px-8 py-3 text-left">
          <span><i class='bx bxs-calendar mr-2'></i>{{debut}}</span> au
          <span><i class='bx bxs-calendar mr-2'></i>{{fin}}</span></span>
        <span class="absolute bottom-0 left-0 w-full bg-primary h-10 text-white font-bold leading-3 px-8 py-3 text-right">Poids: {{poids}} </span>
        <span class="absolute bottom-10 right-0 _rounded-lg text-sm text-white bg-yellow-500 px-3 py-1 font-semibold">En cours<i class='bx bx-time-five ml-1'></i></span>

          <p class="my-2 text-normal text-lg font-medium text-gray-600 mt-16 line-clamp-2 normal-case"><span class="font-bold italic"><span class="underline mr-2">Activité</span>:</span> {{libelle}} </p>
            
          <div class="flex items-center mt-8 pt-2 text-gray-600 dark:text-gray-400 mb-1 border-t-2">
            <i class='bx bxs-pin bx-sm'></i>
            <div class="ml-4 text-md tracking-wide font-semibold w-full truncate">S. Responsable : <span class="font-bold italic text-lg uppercase"> {{structureAssociée}} </span></div>
          </div>
                 
          <div class="flex items-center mt-2 pt-2 text-gray-600 dark:text-gray-400 border-t-2">
            <i class='bx bxs-wallet bx-sm'></i>
            <div class="ml-4 text-md tracking-wide font-semibold w-full truncate">EMP : 
              <span class="font-bold italic text-lg"> {{montantEPM}} </span><span class="ml-2 uppercase font-bold">fcfa</span>
            </div>
          </div>
          <div class="flex items-center mt-1 text-gray-600 dark:text-gray-400 mb-6">
            <i class='bx bxs-wallet bx-sm'></i>
            <div class="ml-4 text-md tracking-wide font-semibold w-full truncate">BN : <span
              class="font-bold italic text-lg">{{montantNE}}</span><span class="ml-2 uppercase font-bold">fcfa</span>
            </div>
          </div>
      </div>
    </div>
  </div>
 
  <!-- End cards Tâches -->
</template>

<script>
import Dropdown from '@/components/Dropdown.vue'
export default {
  props:['bailleur','poids','libelle','montantNE','montantEPM','structureAssociée','debut','fin'],
  components:{ Dropdown},
  data() {
    return {
      option: [
        { name: "supprimer" },
        { name: "modifier" },
        { name: "dupliquer" },
      ],
      showValidate:false,
      isValidate:false,
    }
  },
  methods:{
    validation(){
      this.isValidate=true
      this.$emit('validation')
    }
  }
}
</script>

<style>

</style>