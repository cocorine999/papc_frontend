<template>
  <div class="p-4 w-full">
   
    <RouteName />

    <div class="flex items-center justify-between flex-wrap">
      <titre>Les arrondissements </titre>
      <div class="form-group my-2">
        <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Arrondissements</label>
        <select v-model="choix" class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2 w-full  focus:border-transparent">
          <option value="TOUT">{{choix}}</option>
          <option v-for="(item, i) in arrondissements" :key="i" :value="item">{{item}}</option>
        </select>
      </div>
    </div>

     <div class="align-middle inline-block w-full  overflow-hidden  pt-3 rounded-bl-lg rounded-br-lg">
      <table class="w-full p-4">
        <thead>
          <tr>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">#</th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Arrondissements</th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Quartiers</th>

          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="(item, i) in list" :key="i">
            
            <td v-if="choix == item.arrondissements || choix == 'TOUT'" class="px-6 py-4 whitespace-no-wrap border-b border-gray-500"> {{i+1}} </td>
            <td v-if="choix == item.arrondissements || choix == 'TOUT'" class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{{item.arrondissements}}</td>
            <td v-if="choix == item.arrondissements || choix == 'TOUT'" class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{{item.quartiers}}</td>
          </tr>              
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import RouteName from "../../../../components/RouteName.vue";

import { mapState } from 'vuex'
export default {
    layout: "dashboard",
    components: { RouteName },
    computed: {
      ...mapState(['config', 'arrondissements'])
    },
    data() {
      return ({
        list: [],
        choix: 'TOUT',
      });
    },
    mounted() {
      this.$store.dispatch('setarrondissements');
      this.config.forEach(x => {
        x.communes.forEach(y => {
          y.arrondissements.forEach(z => {
            z.quartiers.forEach(element => {
              this.list = this.list.concat({
                arrondissements: z.lib_arrond,
                quartiers: element.lib_quart
              })
            });
          });
        });
      });
    },
    methods: {
      
    }
}
</script>

<style scoped>

</style>