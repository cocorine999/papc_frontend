<template>
  <div>
      
  </div>
</template>
<script>

import resetService from "@/services/modules/reinitialisationPassword.service.js";

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
    async confirmIdentifiant() {
      console.log(this.$route.params.identifiant)
      this.active()
      resetService.verify(this.$route.params.identifiant).then((data) => {
        const resetInfo = {
            token:this.$route.params.identifiant,
            email:data.data.data.email,
          }
          localStorage.setItem('resetInfo',JSON.stringify(resetInfo))
           this.$router.push('/change-password')
          this.$toast.success("compte verifier avec sucess")
          this.disabled()
      }).catch((error) => {
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
        this.$router.push('/changer-mots-de-passe')
        this.disabled()
      })
    },
  },
  mounted() {
    this.confirmIdentifiant()
  }
 
};
</script>
<style scoped>

</style>
