<template>
  <div>
      
  </div>
</template>
<script>

import actionService from "@/services/modules/accountActivation.service.js";

export default {
  data() {
    return {
      login: "",
      soumettre: false,
    };
  },
  methods: {
     active() {
        this.$store.dispatch('active')
      },
      disabled() {
        this.$store.dispatch('disabled')
      },
    async activation() {
      this.active()
      actionService.activerCompte(this.$route.params.identifiant).then((data) => {
        this.$router.push('/change-password-activer')
        this.$toast.success("compte activer")
        this.disabled()
      }).catch((error) => {
          this.disabled()
         if (error.response) {
              // Requête effectuée mais le serveur a répondu par une erreur.
              const message = error.response.data.message
              this.$toast.error(message)
              } else if (error.request) {
                // Demande effectuée mais aucune réponse n'est reçue du serveur.
                //console.log(error.request);
              } else {
              // Une erreur s'est produite lors de la configuration de la demande
              //console.log('dernier message', error.message);
              }
        this.$router.push('/')
      })
    },
  },
  mounted() {
      this.activation()
  }
 
};
</script>
<style scoped>

</style>
