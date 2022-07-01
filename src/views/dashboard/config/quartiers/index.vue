<template>
  <div class="p-4">
   
    <RouteName />

    <div class="flex items-center justify-between">
      <titre>Les quartiers </titre>
      <div class="form-group my-2">
        <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">quartiers</label>
        <input v-model="choix" class="px-3 py-2 mt-1 border-2 border-gray-300 uppercase focus:outline-none focus:ring-2 w-full  focus:border-transparent" />
      </div>
    </div>

     <div class="align-middle inline-block w-full  overflow-hidden  pt-3 rounded-bl-lg rounded-br-lg">
      <table class="w-full">
        <thead>
          <tr>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-center text-sm leading-4 text-primary tracking-wider">#</th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-center text-sm leading-4 text-primary tracking-wider">Quartiers</th>

          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="(item, i) in list" :key="i">
            
            <td v-if="item.quartiers.search(choix.toUpperCase()) !== -1 || choix == ''" class="px-6 py-4 whitespace-no-wrap text-center border-b border-gray-500"> {{i+1}} </td>
            <td v-if="item.quartiers.search(choix) !== -1 || choix == ''" class="px-6 py-4 whitespace-no-wrap text-center border-b border-gray-500">{{item.quartiers}}</td>
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
      ...mapState(['config'])
    },
    data() {
      return ({
        dep:"",
        list: [],
        choix: '',
      });
    },
    mounted() {
      this.$store.dispatch('setquartiers');
      this.config.forEach(x => {
        x.communes.forEach(y => {
          y.arrondissements.forEach(z => {
            z.quartiers.forEach(element => {
              this.list = this.list.concat({
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