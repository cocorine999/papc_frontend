<template>
  <div>
    <div class=" flex" >
      <div class="bg-white relative  shadow-lg border hover:border hover:border-gray-300 w-full hover:shadow-inner transition-shadow duration-300" style="max-height:350px" >
        <div class="p-2 ">
          <div class="flex justify-between">
            <h1 @click.stop="gotoNext" class="font-base font-bold cursor-pointer text-gray-900">{{libelle}} </h1>
            <div>
              <dropdown @gotoNext="gotoNext" @modifier="modifier" @duplicate='dupliquer' :option="option"></dropdown>
            </div>
          </div>
          <div class="border-b border-gray-300 relative">
            <p class="text-justify p-2 font-semibold leading-6 text-sm my-2">{{description}}</p>
              <div class="absolute bottom-0 right-0">
                <span v-if="!isStateChange" @click.stop="isStateChange = true" :class="{'bg-green-500':status==='en cours','bg-red-500':status==='terminer','bg-yellow-500':status==='en attente'}"  class="text-white cursor-pointer  p-1">{{status}}</span>
                <select v-else  @change.stop="isStateChange = false" class="outine-none" name="" id="">
                  <option value="">cree</option>
                  <option value="">en attente</option>
                  <option value="">en cours</option>
                  <option value="">en terminer</option>
                </select>
            </div>
          </div>          
          <div class="my-2">
            <p class="text-sm font-semibold py-1"> <span class="font-bold">Montant BN :</span>  <span class="text-gray-700">{{montantBN}}</span> </p>
            <p class="text-sm font-semibold py-1"> <span class="font-bold">Montant EPM-PRET :</span> <span class="text-gray-700">{{montantEPM}}</span> </p>
            <p class="text-sm font-semibold py-1"> <span class="font-bold">code PTA :</span> <span class="text-gray-700"> {{codePTA}} </span> </p>
          </div>
        </div>   
      
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  props: ['libelle','description','status','montantBN','montantEPM','codePTA','isGlobale'],
  data() {
    return {
      option:[
        {name:"supprimer"},
        {name:"modifier"},
        {name:"dupliquer"},
        {name:"continuer"},
      ],
    }
  }
}
</script>

<style>

</style>