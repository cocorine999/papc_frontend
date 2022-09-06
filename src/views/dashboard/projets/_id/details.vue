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
      projet: null
    }
  },

  computed:{

  },

  methods: {
    
    ...mapActions('projets', {
      detailsProjet: "GET_DETAILS_PROJET"
    }),
  },

  created() {
    this.detailsProjet(this.$route.params.id).then((response) => {
      this.projet = response.data.data

      console.log(this.projet)
    })
  },
};



</script>
<style scoped>

</style>