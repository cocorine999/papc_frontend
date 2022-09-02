<template>
  <dashboard>
   <div v-if="composanteVisible" class="p-4">
    <div class="select w-52">
      <select id="choice" v-model="version" @change="choiceVersion(version)" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option selected>Choisir une version</option>
        <option value="current">version courante</option>
        <option value="rv1">version RV1</option>
        <option value="rv2">version RV2</option>
        <option value="rv3">version RV3</option>
        <option value="rv4">version RV4</option>
      </select>
    </div>
    <div class="border my-4 rounded-lg border-gray-300 shadow-md">
        <composante-current v-if="currentPage"></composante-current>
        <revisite v-else></revisite>
    </div>
   </div>
  </dashboard>
</template>

<script>

import ComposanteCurrent from "@/components/ComposanteCurrent";
import Revisite from "@/components/revisiteTache/Revisite.vue";
import Dashboard from "@/layouts/Dashboard";
import { mapGetters, mapActions, mapMutations, mapState} from "vuex";
export default {
  components: {
    Dashboard,
    ComposanteCurrent,
    Revisite
  },
  data() {
    return {
      currentPage:true,
      version:'current',
      composanteVisible:false
    }
  },
  computed: {
    ...mapGetters('auths', {currentUser : 'GET_AUTHENTICATE_USER'})
  },
  methods: {
    getPermission() {
      this.currentUser.role[0].permissions.forEach(element => {
        if(element.slug ==='voir-une-composante') {
            this.composanteVisible = true
          }
        });
    },
    choiceVersion(version) {
      if(version ==='current') {
        this.currentPage = true
      }
      this.currentPage = false
    }
  },
  mounted() {
    this.getPermission()
  }

};
</script>

<style></style>
