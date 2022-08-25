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
      this.active()
      resetService.verify(this.$route.params.identifiant).then((data) => {
        this.$router.push('/change-password')
        const resetInfo = {
            token:this.$route.params.identifiant,
            email:data.data.data.email,
           
          }
          localStorage.setItem('resetInfo',JSON.stringify(resetInfo))
          this.$toast.success(response.message)
          this.disabled()
      }).catch((e) => {
        this.$toast.error(e)
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
