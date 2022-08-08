<template>
  <div class="md:grid md:grid-cols-2 block ">
    <div class="absolute bg-cercle "> <img src="/img/cercle.png" width="500px" height="500px" alt=""></div>
    <div class="hidden relative md:px-8  bg-primary md:flex justify-center items-center">
    <div class=" mt-[40vh] ">
      <h1 class="text-4xl font-bold text-white mb-5">
        Mot de <br />
        Passe Oublié
      </h1>

      <p class=" md:block text-sm text-white">
        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
        sint. Velit officia consequat duis enim velit mollit. Exercitation
        veniam consequat sunt nostrud amet.
      </p>
    </div>
  </div>

  <div class=" h-screen flex justify-center relative"
  >
    <div
      class="w-full  h-screen flex flex-col justify-center items-center relative"
    >
      <img class="w-48 xl:w-96" src="/img/layer.svg" alt="" />
      <h1 class="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-3 mt-10 sm:mb-8 text-center text-[#52575C]">
        Mot de passe oublié
      </h1>
      <form @submit.prevent="sendNumber" v-if="!isSendNumber" class="w-full flex justify-center">
        <div class="w-full md:px-0 px-4 md:w-3/5">
          <input
            class="appearance-none invalide border-b-2 relative z-50 w-full leading-tight border-[#939393] focus:outline-none focus:border-b-gray-500 focus:bg-white text-gray-700 placeholder:text-[#939393] placeholder:text-sm pb-2"
            type="text"
            v-model.trim='$v.login.$model'
            name="password"
            id="password"
            pattern="[0-9]{8,12}"
            placeholder="Entrez votre numéro de telephone"
          />
          <div class="text-red-500 text-sm   py-2 font-extralight" v-if='!$v.login.required && soumettre' >
            Ce champs est obligatoire
          </div>

          <div class="flex justify-center my-3 relative z-50">
            <button type="submit" class="w-full md:my-3 my-1 hover:opacity-75 transition-all  duration-500 py-1  md:py-3 border bg-primary text-white text-sm md:text-base xl:text-lg"> Envoyer</button>
          </div>
        </div>
        
      <!-- button de retour  -->

        
      </form>
      <form v-if="isSendNumber" @submit.prevent="validateCode" class="w-full flex justify-center">
        <div class="w-full md:px-0 px-4 md:w-3/5">
          <input
            class="appearance-none invalide border-b-2 relative z-50 w-full leading-tight border-[#939393] focus:outline-none focus:border-b-gray-500 focus:bg-white text-gray-700 placeholder:text-[#939393] placeholder:text-sm pb-2"
            type="text"
            v-model.trim='$v.code.$model'
            name="code"
            id="code"
           
            placeholder="Entrez un code à 6 caracteres"
          />
          

           <div class="text-red-500 text-sm   py-2 font-extralight " v-if='!$v.code.minLength && soumettre' >
           code tres court (6 caracteres)
          </div>

          <div class="flex justify-center my-3 relative z-50">
            <button type="submit" class="w-full md:my-3 my-1 hover:opacity-75 transition-all  duration-500 py-1  md:py-3 border bg-primary text-white text-sm md:text-base xl:text-lg"> Envoyer</button>
          </div>
        </div>

      </form>
     
    </div>
  </div>
 </div>
</template>

<script>
import { required, minLength, numeric,  email, sameAs } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      login: "",
      code:null,
      soumettre :false,
      isSendNumber:false,
    }
  },
  methods: {
    async sendNumber() {
      this.soumettre = true
      if(!this.$v.login.$invalid) {
        try {
          const response = await this.$axios.$post(`mot-de-passe-oublie`,{contact:this.login})
          this.isSendNumber = true
          this.$toast.success(response.message)
        } catch (error) {
           if (error.response) {
            // Requête effectuée mais le serveur a répondu par une erreur.
            const message = error.response.data.message
            const statut = error.response.status
           
            console.log("le message erreur",message)
            console.log("le statut",statut)
            this.$toast.error(message)
            
          
          } else if (error.request) {
            // Demande effectuée mais aucune réponse n'est reçue du serveur.
            console.log(error.request);
          } else {
            // Une erreur s'est produite lors de la configuration de la demande
            console.log('dernier message', error.message);
          }
        }
      }
    },
    async validateCode() {
      this.soumettre = true
    
      if(!this.$v.code.$invalid) {
        try {
          const response = await this.$axios.$post(`verification-du-compte`,{
            contact:this.login,
            codeVerification:this.code
          })
           this.$toast.success(response.message)
          this.$router.push({name:'login-login-reset___fr',params:{login:this.login,code:this.code}})
        } catch (error) {
           if (error.response) {
            // Requête effectuée mais le serveur a répondu par une erreur.
            const message = error.response.data.message
            const statut = error.response.status
            
            console.log("le message erreur",message)
            console.log("le statut",statut)
            this.$toast.error(message)
            
          
          } else if (error.request) {
            // Demande effectuée mais aucune réponse n'est reçue du serveur.
            console.log(error.request);
          } else {
            // Une erreur s'est produite lors de la configuration de la demande
            console.log('dernier message', error.message);
          }
        }
       
      }
    },
  },
  validations: {
    login: {
      required,
    },
    code: {
      required,
      minLength: minLength(6)
    },
    
    
   
  }
}

</script>
<style scoped>
.bg-cercle {
  z-index: 20;
  right: 25%;
  top:5%
}

.invalide:invalid {
  border-bottom: #ff2b58 solid 1px;
  outline:none
}
.invalide:valid {
  border-bottom: #05a944 solid 1px;
  outline:none
}
</style>

