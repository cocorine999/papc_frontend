<template>
  <dashboard>
    <dashboarde :projet="projet"></dashboarde>
  </dashboard>
</template>

<script>

import Dashboard from "@/layouts/Dashboard";

import { mapActions } from "vuex";


import Dashboarde from '@/components/Dashboarde.vue';


export default {
  components: {

    Dashboard,
    Dashboarde,
  },
  data() {
    return {
      showModal:false,
      projet: null,
      detailsProjetVisible:false,
    }
  },

  computed:{

  },

  methods: {
    
    ...mapActions('projets', {
      detailsProjet: "GET_DETAILS_PROJET"
    }),
    getPermission() {
      this.currentUser.role[0].permissions.forEach(element => {
        if(element.slug ==='voir-un-dashboard') {
          this.detailsProjetVisible = true
        }  
        });
    },
  },

  created() {
    this.getPermission()
    if(!this.detailsProjetVisible) {
      this.$router.push('/401-non-autorise')
    } 
    this.detailsProjet(this.$route.params.id).then((response) => {
      this.projet = response.data.data

      console.log(this.projet)
    })
  },
};



</script>
<style scoped>

</style>