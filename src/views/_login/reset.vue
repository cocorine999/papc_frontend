<template>
  <div class="md:grid md:grid-cols-2 block relative">
    <div class="absolute bg-cercle">
      <img src="/img/cercle.png" width="500px" height="500px" alt="" />
    </div>
    <div
      class="hidden relative md:px-8 bg-primary md:flex justify-center items-center"
    >
      <div class="hidden md:block lg:w-4/5 xl:w-1/2 mx-auto mt-[40vh]">
        <h1 class="text-4xl font-bold text-white mb-5">
          Mot de <br />
          Passe Oublié
        </h1>
        <p class="text-white">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit. Exercitation
          veniam consequat sunt nostrud amet.
        </p>
      </div>
    </div>

    <!-- Partie input -->
    <div class="h-screen flex relative z-50">
      <div class="h-screen w-full px-5 flex flex-col justify-center relative">
        <h1
          class="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-16 sm:mb-32 text-center text-[#52575C]"
        >
          Réinitialisation du Mot de passe
        </h1>
        <form @submit.prevent="save" class="w-full">
          <div class="relative my-4">
            <input
              class="appearance-none border-b-2 w-full leading-tight border-[#939393] focus:outline-none focus:border-b-gray-500 focus:bg-white text-gray-700 placeholder:text-[#939393] placeholder:text-sm pb-2"
              type="password"
              v-model.trim="$v.password.$model"
              name="password"
              id="password"
              placeholder="Nouveau mot de passe"
            />
            <div
              class="text-red-500 text-sm py-2 font-extralight"
              v-if="!$v.password.required && soumettre"
            >
              Ce champs est obligatoire
            </div>
            <div
              class="text-red-500 text-sm py-2 font-extralight"
              v-if="!$v.password.minLength && soumettre"
            >
              mots de passe tres court
            </div>
          </div>
          <div class="relative my-4">
            <input
              class="appearance-none border-b-2 w-full leading-tight border-[#939393] focus:outline-none focus:border-b-gray-500 focus:bg-white text-gray-700 placeholder:text-[#939393] placeholder:text-sm pb-2"
              type="password"
              v-model="confirmPassword"
              name="password"
              id="password"
              placeholder="Confirmer votre mot de passe"
            />
            <div
              class="text-red-500 py-2 font-extralight"
              v-if="!$v.confirmPassword.sameAs && soumettre"
            >
              Le mots de passe ne correspond pas
            </div>
          </div>

          <!-- button de retour  -->

          <div class="flex justify-center">
            <button
              type="submit"
              class="mb-3 mt-5 w-full sm:mt-10 py-3 border bg-primary text-white text-sm md:text-base xl:text-lg"
            >
              Envoyer
            </button>
          </div>
        </form>
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
export default {
  data() {
    return {
      password: "",
      confirmPassword: "",
      soumettre: false,
      login: this.$route.params.login,
      code: this.$route.params.code,
    };
  },
  methods: {
    async save() {
      this.soumettre = true;
      if (!this.$v.password.$invalid && !this.$v.confirmPassword.$invalide) {
        try {
          const data = {
            contact: this.login,
            codeVerification: this.code,
            new_password: this.password,
            new_password_confirmation: this.confirmPassword,
          };
          const response = await this.$axios.$post(
            `reinitialisation-de-mot-de-passe`,
            data
          );

          this.$toast.sucess(response.message);
          this.$router.push("/login/validate");
        } catch (error) {
          if (error.response) {
            // Requête effectuée mais le serveur a répondu par une erreur.
            const message = error.response.data.message;
            const statut = error.response.status;

            console.log("le message erreur", message);
            console.log("le statut", statut);
            this.$toast.error(message);
          } else if (error.request) {
            // Demande effectuée mais aucune réponse n'est reçue du serveur.
            console.log(error.request);
          } else {
            // Une erreur s'est produite lors de la configuration de la demande
            console.log("dernier message", error.message);
          }
        }
      }
    },
  },
  validations: {
    password: {
      required,
      minLength: minLength(6),
    },
    confirmPassword: {
      sameAs: sameAs("password"),
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
</style>
