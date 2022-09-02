<template>
  <dashboard>
   <div v-if="activiteVisible || planDecaissementVisible" class="p-4">
    <div class="select w-52">
      <select id="choice" v-model="version" @change="choiceVersion(version)" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        
        <option value="" selected>Version actuelle</option>

        <option v-for="(scopePtab, index) in scopes" :key="index" :value="scopePtab.id"> {{scopePtab.nom}}</option>
      </select>
    </div>
    <div class="border my-4 rounded-lg border-gray-300 shadow-md">
        <activite-current v-if="currentPage"></activite-current>
        <revisite v-else :version="version"></revisite>
    </div>
   </div>
  </dashboard>
</template>

<script>

import ActiviteCurrent from "@/components/ActiviteCurrent";
import Revisite from "@/components/revisiteActivite/Revisite.vue";
import Dashboard from "@/layouts/Dashboard";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Dashboard,
    ActiviteCurrent,
    Revisite
  },
  data() {
    return {
      currentPage:true,
      version:'current',
      activiteVisible:false,
      planDecaissementVisible:false,
      version: '',
      scopes: []
    }
  },
   computed: {
    
    ...mapGetters({
      currentUser : 'auths/GET_AUTHENTICATE_USER',
    }),
     ...mapGetters('auths', {currentUser : 'GET_AUTHENTICATE_USER'})
  },
  
  methods: {

    ...mapActions("revisionPtab", {
      fetchProgrammeScopes: "FETCH_PROGRAMME_SCOPES"
    }),
    getPermission() {
        this.currentUser.role[0].permissions.forEach(element => {
          if(element.slug ==='voir-une-activite') {
            this.activiteVisible = true
          }
          if(element.slug ==='voir-un-plan-de-decaissement') {
            this.planDecaissementVisible= true
          }
        });
      },

    choiceVersion(version) {

      if(this.scopes.length > 0)
      {
        if('' === version ){
          this.currentPage = true
        }else{
          this.currentPage = false
        }
      }else{
        this.currentPage = true
      }
    }
  },
  

  created() {
    this.getPermission()
    if(this.currentUser.programme.id){
      this.fetchProgrammeScopes(this.currentUser.programme.id).then((response) => {
        this.scopes = response.data.data
      });
    }
  },

 
    
 


};
</script>

<style></style>
