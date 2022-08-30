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
              <button
                type="submit"
                class="w-full md:my-3 my-1 hover:opacity-75 transition-all duration-500 py-1 md:py-3 border bg-primary text-white text-sm md:text-base xl:text-lg text-center"
              >
                Envoyer
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
    };
  },
  methods: {
    async send() {
      this.soumettre = true;
      if (!this.$v.login.$invalid) {
        resetService.get(this.login).then(() => {
          this.$toast.success("Operation effectué avec success !")
          this.$router.push('/info')
        }).catch((e) => {
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
