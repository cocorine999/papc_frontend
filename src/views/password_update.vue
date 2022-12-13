<template>
  <div class="md:grid md:grid-cols-2 block">
    <div class="absolute bg-cercle">
      <img src="/img/cercle.png" width="500px" height="500px" alt="" />
    </div>
    <div
      class="hidden relative md:px-8 bg-primary md:flex justify-center items-center"
    >
      <div class="mt-[40vh] w-2/3 mx-auto">
        <h1 class="text-4xl font-bold text-white mb-5">Mot de Passe Oublié</h1>
        <p class="md:block text-sm text-white">
          Veuillez entrer votre adresse mail pour démarrer le processus. Le code
          secret envoyé à cette addresse vous sera demander pour la suite des
          opérations.
        </p>
      </div>
    </div>

    <div class="h-screen flex justify-center relative">
      <div
        class="w-full h-screen flex flex-col justify-center items-center relative"
      >
        <img class="w-48 xl:w-96" src="/img/layer.svg" alt="" />
        <h1
          class="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-3 mt-10 sm:mb-8 text-center text-[#52575C]"
        >
          Mot de passe oublié
        </h1>
        <form
          @submit.prevent="send"
          class="w-full flex justify-center"
        >
          <div class="w-full md:px-0 px-4 md:w-3/5">
            <input
              class="appearance-none invalide border-b-2 relative z-50 w-full leading-tight border-[#939393] focus:outline-none focus:border-b-gray-500 focus:bg-white text-gray-700 placeholder:text-[#939393] placeholder:text-sm pb-2"
              type="email"
              v-model.trim="$v.login.$model"
              name="password"
              id="password"
              placeholder="Entrez votre adresse mail"
            />
            <div
              class="text-red-500 text-sm py-2 font-extralight"
              v-if="!$v.login.required && soumettre"
            >
              Ce champs est obligatoire
            </div>

            <div class="flex justify-center my-10 relative z-50">
              <button type="submit" class="bg-primary  flex space-x-2 justify-center w-2/3 items-center text-white px-4 py-3 border border-primary font-semibold uppercase">
                  <span class="text-sm text-center font-semibold uppercase" v-if="!chargement">
                    envoyer
                  </span>
                  <span v-else class="flex items-center space-x-2">
                    <span class="text-xs px-4 text-center font-semibold ">
                      envoi ...
                    </span>
                    <svg  xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-center animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </span>
                </button>
            </div>
          </div>

          <!-- button de retour  -->
        </form>
        <div class="flex justify-center">
          <router-link to="/" class="text-md font-semibold text-red-500"
            >Renvoyer l'addresse de récupération ?</router-link
          >
        </div>
        <div class="flex justify-center">
          <router-link to="/" class="text-md font-semibold text-primary mt-10"
            >Retourner à l'écran de connexion</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  required,
  minLength,
  numeric,
  email,
  sameAs,
} from "vuelidate/lib/validators";
import resetService from "@/services/modules/reinitialisationPassword.service.js";

export default {
  data() {
    return {
      login: "",
      soumettre: false,
      chargement:false
    };
  },
  methods: {
    async send() {
      this.soumettre = true;
     
      if (!this.$v.login.$invalid) {
        this.chargement = true
        if(this.chargement == true) {
          resetService.get(this.login).then(() => {
            this.chargement = false
          this.$toast.success("Operation effectué avec success !")
          this.$router.push('/info')
        }).catch((error) => {
          this.chargement = false
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
        })
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
      minLength: minLength(6),
    },
  },
};
</script>
<style scoped>
.bg-cercle {
  z-index: 20;
  right: 25%;
  top: 5%;
}

.invalide:invalid {
  border-bottom: #ff2b58 solid 1px;
  outline: none;
}
.invalide:valid {
  border-bottom: #05a944 solid 1px;
  outline: none;
}
</style>
