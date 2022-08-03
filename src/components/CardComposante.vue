<template>
  <div @mouseenter="showValidate = true" @mouseleave="showValidate = false" class="relative"> 
    <div class="absolute flex space-x-3 right-1 top-4 z-10  cursor-pointer">

      <span v-if="!isValidate" :title="composanteName != undefined ? composanteName.concat(' non valider') : 'Composante non valider' " class="text-red-300"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z" stroke="none"/><path d="M21 19.1H3V5h18v14.1zM21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" stroke="none"/><path fill="none" d="M21 19.1H3V5h18v14.1zM21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" stroke="none"/><path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41z" stroke="none"/></svg></span>

      <span v-if="isValidate" :title="composanteName != undefined ? composanteName.concat(' valider') : 'Composante valider' " class="text-green-500"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2 15.5V2a2 2 0 012-2h8a2 2 0 012 2v13.5a.5.5 0 01-.74.439L8 13.069l-5.26 2.87A.5.5 0 012 15.5zm8.854-9.646a.5.5 0 00-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 10-.708.708l1.5 1.5a.5.5 0 00.708 0l3-3z" stroke="none"/></svg></span>

      <dropdown @supprimer="$emit('supprimer')" @modifier="$emit('modifier')"  :option="option"></dropdown>
    </div>
    <!-- cards composantes -->
    <div class="relative p-4  bg-white sm:rounded-lg overflow-hidden">
      <span class="absolute bottom-0 left-0 w-full bg-primary h-10 text-white font-bold leading-3 px-8 py-3 text-right">Poids : {{ poids }} </span>
      <div class="absolute uppercase flex space-x-2 items-center">
        <div class="bg-primary rounded-lg text-sm text-white px-3 py-1 font-semibold ">
          <i class='bx bx-coin-stack mr-1'></i>
          <span>{{ bailleur }}</span>
        </div>

        <div v-if="!isValidate">
          <button :title="composanteName != undefined ? 'Valider la '.concat(composanteName) : 'Valider la composante' " v-if="showValidate" @click="validation" class="bg-green-500 rounded-lg text-sm   px-3 py-1 font-semibold text-white">Valider</button>
        </div>

      </div>

      <div v-if="statut.code >= -1 && statut.code <= 2 ">
          <span class="absolute bottom-12 right-3 rounded-lg text-sm text-white px-3 py-1 font-semibold" :class="statut.couleur"> {{ statut.libelle }}<i class='bx bx-time-five ml-1'></i></span>
      </div>
      
      <p class="my-2 uppercase text-normal text-md font-medium text-gray-600 mt-16 line-clamp-2"><span class="font-bold italic"><span class="underline mr-2">{{ composanteName !== undefined ? composanteName : 'COMPOSANTE' }}</span> {{ position }} :</span> {{ libelle }} </p>
      <div class="flex items-center mt-8 text-gray-600 dark:text-gray-400 mb-6">
        <i class='bx bxs-wallet bx-md' ></i>
        <div class="ml-4 text-md tracking-wide font-semibold w-4/6 truncate">EMP : <span class="font-bold italic text-lg">{{ montantEPM }}</span><span class="ml-2 uppercase font-bold">fcfa</span></div>
      </div>
    </div>
    <!-- End cards composantes -->
  </div>
</template>

<script>
import Dropdown from '@/components/Dropdown.vue'
export default {
  components: {Dropdown},
  props: ['libelle', 'code', 'montantEPM', 'position', 'bailleur', 'poids', 'composanteName', 'statut'],
   data() {
    return {
      option: [
        { name: "supprimer" },
        { name: "modifier" },
       
      ],
      showValidate:false,
      isValidate: this.statut.code > -2,
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