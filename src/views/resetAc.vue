<template>
  <div class="md:grid md:grid-cols-2 block relative">
    <div class="absolute bg-cercle">
      <img src="/img/cercle.png" width="500px" height="500px" alt="" />
    </div>
    <div
      class="hidden relative md:px-8 bg-primary md:flex justify-center items-center"
    >
      <div class="hidden md:block lg:w-4/5 xl:w-3/4 mx-auto mt-[40vh]">
        <h1 class="text-4xl font-bold text-white mb-5">Configuration</h1>
        <p class="text-white">
          Veuillez choisir un mot de Passe pour finaliser le processus.
        </p>
      </div>
    </div>

    <!-- Partie input -->
    <div class="h-screen flex relative z-50">
      <div class="h-screen w-full px-5 flex flex-col justify-center relative">
        <h1
          class="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-16 sm:mb-32 text-center text-[#52575C]"
        >
          Configuration de votre mot de passe
        </h1>
        <form @submit.prevent="save" class="w-full p-4">
       
          <div class="relative my-4 w-3/5 mx-auto">
            <input
              class="appearance-none border-b-2 w-full leading-tight border-[#939393] focus:outline-none focus:border-b-gray-500 focus:bg-white text-gray-700 placeholder:text-[#939393] placeholder:text-sm pb-2"
              :type="statePassword"
              v-model.trim="$v.password.$model"
              name="password"
              id="password"
              placeholder="Nouveau mot de passe"
            />
            <span @click="invisible" v-if="show" class="text-red-500 cursor-pointer absolute right-0 top-2"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1.8em" width="1.6em" xmlns="http://www.w3.org/2000/svg"><defs><clipPath><path fill="none" d="M124-288l388-672 388 672H124z" clip-rule="evenodd"></path></clipPath></defs><path d="M508 624a112 112 0 0 0 112-112c0-3.28-.15-6.53-.43-9.74L498.26 623.57c3.21.28 6.45.43 9.74.43zm370.72-458.44L836 122.88a8 8 0 0 0-11.31 0L715.37 232.23Q624.91 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 0 0 0 51.5q56.7 119.43 136.55 191.45L112.56 835a8 8 0 0 0 0 11.31L155.25 889a8 8 0 0 0 11.31 0l712.16-712.12a8 8 0 0 0 0-11.32zM332 512a176 176 0 0 1 258.88-155.28l-48.62 48.62a112.08 112.08 0 0 0-140.92 140.92l-48.62 48.62A175.09 175.09 0 0 1 332 512z"></path><path d="M942.2 486.2Q889.4 375 816.51 304.85L672.37 449A176.08 176.08 0 0 1 445 676.37L322.74 798.63Q407.82 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 0 0 0-51.5z"></path></svg></span>
            <span @click="invisible" v-if="!show" class="text-red-500 cursor-pointer absolute right-0 top-2"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1.8em" width="1.6em" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"></path><path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"></path></svg></span>
            <div
              class="text-red-500 text-sm py-2 font-extralight"
              v-if="!$v.password.required && soumettre"
            >
              Ce champs est obligatoire
            </div>
            <div v-for="password in errors.new_password" :key="password.id" class="text-red-500 text-sm   py-2 font-bold"> {{password}} </div>
            <div
              class="text-red-500 text-sm py-2 font-extralight"
              v-if="!$v.password.minLength && soumettre"
            >
              mots de passe tres court
            </div>
          </div>

          <div class="relative my-4 w-3/5 mx-auto">
            <input
              class="appearance-none border-b-2 w-full leading-tight border-[#939393] focus:outline-none focus:border-b-gray-500 focus:bg-white text-gray-700 placeholder:text-[#939393] placeholder:text-sm pb-2"
              :type="statePassword1"
              v-model="confirmPassword"
              name="password"
              id="password"
              placeholder="Confirmer votre mot de passe"
            />
             <span @click="invisible1" v-if="show1" class="text-red-500 cursor-pointer absolute right-0 top-2"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1.8em" width="1.6em" xmlns="http://www.w3.org/2000/svg"><defs><clipPath><path fill="none" d="M124-288l388-672 388 672H124z" clip-rule="evenodd"></path></clipPath></defs><path d="M508 624a112 112 0 0 0 112-112c0-3.28-.15-6.53-.43-9.74L498.26 623.57c3.21.28 6.45.43 9.74.43zm370.72-458.44L836 122.88a8 8 0 0 0-11.31 0L715.37 232.23Q624.91 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 0 0 0 51.5q56.7 119.43 136.55 191.45L112.56 835a8 8 0 0 0 0 11.31L155.25 889a8 8 0 0 0 11.31 0l712.16-712.12a8 8 0 0 0 0-11.32zM332 512a176 176 0 0 1 258.88-155.28l-48.62 48.62a112.08 112.08 0 0 0-140.92 140.92l-48.62 48.62A175.09 175.09 0 0 1 332 512z"></path><path d="M942.2 486.2Q889.4 375 816.51 304.85L672.37 449A176.08 176.08 0 0 1 445 676.37L322.74 798.63Q407.82 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 0 0 0-51.5z"></path></svg></span>
            <span @click="invisible1" v-if="!show1" class="text-red-500 cursor-pointer absolute right-0 top-2"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1.8em" width="1.6em" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"></path><path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"></path></svg></span>
            <div
              class="text-red-500 py-2 font-extralight"
              v-if="!$v.confirmPassword.sameAs && soumettre"
            >
              Le mots de passe ne correspond pas
            </div>
          </div>

          <!-- button de retour  -->
    
          <p class="text-xs text-red-500 italic text-center ">*** Le nouveau mot de passe doit contenir au moins un symbole.</p>
          <p class="text-xs text-red-500 italic text-center ">*** Le nouveau mot de passe doit contenir au moins une lettre majuscule et une lettre minuscule.</p>
          <div class="flex w-3/5 mx-auto justify-center my-4 relative z-50">
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
        </form>
        <div class="flex justify-center">
          <router-link to="/" class="text-md font-semibold text-primary mt-7"
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
      password: "",
      confirmPassword: "",
      email:'',
      soumettre: false,
      chargement:false,
      statePassword:"password",
      statePassword1:"password",
      errors:{new_password:''},
      show : false,
      show1 : false,
      login: this.$route.params.login,
      code: this.$route.params.code,
    };
  },
  methods: {
    invisible () {
      this.statePassword = !this.show ? 'text' : 'password'
      this.show = !this.show;
      //this.$toast.success('Profile saved',)
    },
     invisible1 () {
      this.statePassword1 = !this.show1 ? 'text' : 'password'
      this.show1 = !this.show1;
      //this.$toast.success('Profile saved',)
    },
    async save() {
      this.soumettre = true;
      if ( !this.$v.password.$invalid && !this.$v.confirmPassword.$invalide) {
        const resetInfo = JSON.parse(localStorage.getItem("resetInfo"));
        if(resetInfo != null || resetInfo != undefined) {
            const data = {
              token: resetInfo.token ,
              //email: resetInfo.email,
              new_password: this.password,
              new_password_confirmation: this.confirmPassword,
            }

            this.chargement = true
            if(this.chargement === true) {
              resetService.create(data).then(() => {
                this.chargement = false
                this.$toast.success('operation effectuer avec sucess')
                localStorage.removeItem('resetInfo');
                this.$router.push('/')
              }).catch((error) => {
                this.chargement = false
                if (error.response) {
                  const errorMessage = error.response.data.errors
                  if(errorMessage != undefined){
                  this.errors.new_password = errorMessage['new_password']
                }
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
        else {
          this.$toast.error("veuillez d'abord activer votre compte")
          this.$router.push('/')
        }
      
      }
    },
  },
  validations: {
    password: {
      required,
      minLength: minLength(6),
    },
    email: {
      required,
      email
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
