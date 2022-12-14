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
      accountV() {
        this.$store.dispatch('accountV')
      },
      accountD() {
        this.$store.dispatch('accountD')
      },

    async activation() {
      this.active()
      actionService.activerCompte(this.$route.params.identifiant).then((data) => {
        const resetInfo = {
          token:this.$route.params.identifiant,
        }
        
        if(data.data.statutCode == 403 || data.data.statutCode ==500) {
          localStorage.setItem('activeCompte',true)
          this.$toast.success("Lien expirer !!!")
          this.$router.push('/')
          
        }
        else {
          localStorage.setItem('resetInfo',JSON.stringify(resetInfo))
          this.$router.push('/change-password-activer')
          this.$toast.success("compte activer")
          localStorage.removeItem('activeCompte')
        }

        
        this.disabled()
      }).catch((error) => {
          this.disabled()
          console.log('deeee')
         if (error.response) {
              // Requête effectuée mais le serveur a répondu par une erreur.
              const message = error.response.data.message
             
              this.accountV()
              this.$toast.error(message)
              } else if (error.request) {
                // Demande effectuée mais aucune réponse n'est reçue du serveur.
                //console.log(error.request);
              } else {
              // Une erreur s'est produite lors de la configuration de la demande
              //console.log('dernier message', error.message);
              }
               localStorage.setItem('activeCompte',true)
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
