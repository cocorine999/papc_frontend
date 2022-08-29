<template>
  <div class="p-4">
   
    <RouteName />

    <div class="flex items-center justify-between">
      <titre>Pays </titre>
    </div>

    <div class="align-middle inline-block w-full  overflow-hidden  pt-3 rounded-bl-lg rounded-br-lg">
      <table class="w-full">
        <thead>
          <tr>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">#</th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Départements</th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Communes</th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Arrondissements</th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Quartiers</th>

          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="(item, i) in list" :key="i">
            
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500"> {{i+1}} </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{{item.departements}}</td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{{item.communes}}</td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{{item.arrondissements}}</td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{{item.quartiers}}</td>
          </tr>              
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import RouteName from "../../../components/RouteName.vue";

import { mapState } from 'vuex'
export default {
    layout: "dashboard",
    components: { RouteName },
    computed: {
      ...mapState(['config'])
    },
    data() {
      return ({
        dep:"",
        list: [],
      });
    },
    mounted() {
      this.config.forEach(x => {
        x.communes.forEach(y => {
          y.arrondissements.forEach(z => {
            z.quartiers.forEach(element => {
              this.list = this.list.concat({
                departements: x.lib_dep,
                communes: y.lib_com,
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