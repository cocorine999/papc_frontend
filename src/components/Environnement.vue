<template>
  <div>
      <h2 class="py-3 bg-primary text-white text-center  ">Données environnementales et sources   </h2>
      <div style="" class="relative  overflow-auto ">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase border-b border-gray-300 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="p-6">
                CHECKLIST
              </th>
              <th scope="col" class="p-6">
                STATUS
              </th>
              <th scope="col" class="p-6">
                  JUSTIFICATION
              </th>     
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in 5" :key="i" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <hover-ligne code="5555" libelle="lorem ipsum dolor"></hover-ligne>
              <td class="py-4 whitespace-nowrap text-green-500 px-6">
                  en cours
              </td>
              <td class="py-4 px-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, assumenda! 
              </td>
            </tr>
                      
          </tbody>
        </table>
      </div>
  </div>
</template>

<script>
import HoverLigne from "@/components/HoverLigne";
export default {
  components:{HoverLigne}
}
</script>


<style>

</style>