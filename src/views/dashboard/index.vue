<template>
  <dashboard>
    <dashboarde v-if="currentRole ==='bailleur'" :projet="projet"></dashboarde>
  </dashboard>
</template>

<script>

import Dashboard from "@/layouts/Dashboard";
import { mapState, mapGetters, mapActions } from 'vuex'
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
    
    }
  },

  computed: {
  
    ...mapGetters('auths', {currentUser : 'GET_AUTHENTICATE_USER'})
  },

  methods: {
    
    ...mapActions('projets', {
      detailsProjet: "GET_DETAILS_PROJET"
    }),
  },

  created() {
    if(this.currentUser != undefined) {
       this.currentRole = this.currentUser.type
        console.log("role courant",this.currentUser)
     }
    const usersInfo = JSON.parse(localStorage.getItem("bailleurInfo"));
    if (usersInfo) {
        const idProjet = usersInfo.id
        this.detailsProjet(idProjet).then((response) => {
        this.projet = response.data.data

        console.log(this.projet)
        })
    }
   
  },
};



</script>
<style scoped>

</style>