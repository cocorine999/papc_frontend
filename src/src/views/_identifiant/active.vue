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
        this.$router.push('/changer-mots-de-passe')
        this.$toast.success(response.message)
        this.disabled()
      }).catch((e) => {
          this.disabled()
        this.$toast.error(e)
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
