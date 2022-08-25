<template>
  <div class="bg-gray-100  grid lg:grid-cols-2 sm:grid-cols-1 relative">
    <!-- le formulaire de connexion -->
    <div class="flex justify-center items-center px-10 md:px-20 h-screen">
      <div class="formulaire sm:max-w-md ">
        <div class=" flex justify-center ">
          <img width="180" height="180" src="../assets/images/login/logo-gouv.webp">
        </div>
  
        <h1 class="xl:text-2xl text-lg text-center font-bold text-primary py-6 ">PROGRAMME  D’ASSAINISSEMMENT PLUVIAL DE COTONOU</h1>
        <p class="text-base font-bold text-center text-gray-700 py-6">Connectez-vous à votre compte . </p>
        <form @submit.prevent="save" action="">
          <div class="form-group my-3 relative">
            <input v-model.trim='$v.login.$model' type="text" class="w-full  bg-gray-100 outline-none border py-3 px-4 :placeholder-gray-500 text-sm font-semibold border-gray-300" placeholder="Taper votre Email">
            <span class="text-red-500 absolute right-4 top-2"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1.8em" width="1.6em" xmlns="http://www.w3.org/2000/svg"><path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z"></path></svg></span>
            <div class="text-red-500 text-sm   py-2 font-semibold" v-if='!$v.login.required && soumettre' >
              Ce champs est obligatoire
            </div>
            <div class="text-red-500 text-sm   py-2 font-semibold" v-if='!$v.login.email && soumettre' >
            Email invalide
            </div>
          </div>
          <div class="form-group my-3 relative">
            <input  v-model.trim='$v.password.$model' :type="statePassword" class="w-full bg-gray-100 outline-none border :placeholder-gray-500 py-3 px-4 text-sm font-semibold border-gray-300 " placeholder="Taper votre mots de passe">
            <span @click="invisible" v-if="show" class="text-red-500 cursor-pointer absolute right-4 top-2"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1.8em" width="1.6em" xmlns="http://www.w3.org/2000/svg"><defs><clipPath><path fill="none" d="M124-288l388-672 388 672H124z" clip-rule="evenodd"></path></clipPath></defs><path d="M508 624a112 112 0 0 0 112-112c0-3.28-.15-6.53-.43-9.74L498.26 623.57c3.21.28 6.45.43 9.74.43zm370.72-458.44L836 122.88a8 8 0 0 0-11.31 0L715.37 232.23Q624.91 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 0 0 0 51.5q56.7 119.43 136.55 191.45L112.56 835a8 8 0 0 0 0 11.31L155.25 889a8 8 0 0 0 11.31 0l712.16-712.12a8 8 0 0 0 0-11.32zM332 512a176 176 0 0 1 258.88-155.28l-48.62 48.62a112.08 112.08 0 0 0-140.92 140.92l-48.62 48.62A175.09 175.09 0 0 1 332 512z"></path><path d="M942.2 486.2Q889.4 375 816.51 304.85L672.37 449A176.08 176.08 0 0 1 445 676.37L322.74 798.63Q407.82 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 0 0 0-51.5z"></path></svg></span>
            <span @click="invisible" v-if="!show" class="text-red-500 cursor-pointer absolute right-4 top-2"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1.8em" width="1.6em" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"></path><path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"></path></svg></span>
            <div class="text-red-500 text-sm   py-2 font-semibold " v-if='!$v.password.required && soumettre' >
              Ce champs est obligatoire 
            </div>
            <div class="text-red-500 text-sm   py-2 font-semibold " v-if='!$v.password.minLength && soumettre' >
              mots de passe tres court
            </div>
          </div>
          <div class="py-2 my-4 flex justify-center space-x-8">
            <button type="submit" class="bg-primary text-white py-4  text-center w-full hover:opacity-80 transition-all duration-500 ">
                  <span class="text-sm font-semibold uppercase" v-if="!loading">
                    Se connecter
                  </span>
                  <span v-else class="flex justify-center items-center space-x-2">
                    <span class=" px-4 font-semibold ">
                      chargement ...
                    </span>
                    <svg  xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-center animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </span>
            </button>
          
          </div>
          
          <div class="flex justify-center mt-3">
            <router-link to="/changer-mots-de-passe" class="text-md font-semibold text-primary">Mots de passe oublié ? </router-link>
          </div>
        </form>

        <div class="partner flex space-x-4 py-8 items-center">
          <div class="img">
            <img src="../assets/images/login/partners/adf-logo.webp" alt="AFD">
          </div>
          <div class="img">
            <img src="../assets/images/login/partners/bad-logo.webp" alt="BAD">
          </div>
          <div class="img">
            <img src="../assets/images/login/partners/bei-logo.webp" alt="BEI">
          </div>
          <div class="img">
            <img src="../assets/images/login/partners/bid-logo.webp" alt="BID">
          </div>
          <div class="img">
            <img src="../assets/images/login/partners/boad-logo.webp" alt="BOAD">
          </div>
          <div class="img">
            <img src="../assets/images/login/partners/wb-logo.webp" alt="WB">
          </div>
        </div>

        <div>
          <p class="text-md font-semibold text-center text-gray-700">&copy; 2022 Banque Mondiale.Tout droit réservé </p>
        </div>
      </div>
    </div>
    <!-- fin du formulaire de connexion -->

     <!-- l'image de connexion -->
    <div class="bg-img hidden lg:block">
      <img src="../assets/images/login/login-illustration.svg" class="w-5/6 h-full object-contain" alt="">
    </div>

    <!-- fin de l'image de connexion -->
    <div class=" absolute right-2 top-4">
      <button @click="gotoValidate" v-if="true"  class="text-white bg-red-500 animation px-4 py-2 outline-none font-semibold text-center">Cliquez ici pour activez le compte</button>
    </div>
    <div class="drapeau absolute bottom-0 right-0 left-0 grid grid-cols-3">
      <div class="h-2 bg-green-700"></div>
      <div class="h-2 bg-yellow-500"></div>
      <div class="h-2 bg-red-700"></div>
    </div>
  </div>
</template>

<script>
import Vbutton from '@/components/Vbutton'
import { required, minLength, numeric,  email, sameAs } from 'vuelidate/lib/validators';
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'IndexPage',

  data() {
    return {
      statePassword:"password",
      show : false,
      login: "",
      password: "",
      soumettre :false,
      
    }
  },
  computed:{

    //importation des variables du module auths
    ...mapState({
      identifiant: state => state.auths.identifiant,
      loading : state => state.loading
    })
  },

  methods: {

    //Charger les fonctions de connexion au serveur 
    ...mapActions({
      authentification: "auths/LOGIN"
    }),
    chargement(bool) {
      this.$store.dispatch('SET_LOADER',bool)
    },
    gotoValidate() {
      this.$router.push({name:'resendLink',params:{identifiant:this.login}})
    },
    async save() {

      this.identifiant.email = this.login
      this.identifiant.password = this.password
      this.chargement(true)
      await this.authentification(this.identifiant).then((response, status) =>{
          if (response.statut === "success" || response.status === 200) {
            this.$router.push('/dashboard/bailleurs')
            this.$toast.success("vous etes connecté !")
            //window.location.assign(window.location.origin+"/dashboard/bailleurs")
          }else{
            this.$toast.success(response.message)

            
          }   
      })
      this.chargement(false)
      this.soumettre = true;
    },

    invisible () {
      this.statePassword = !this.show ? 'text' : 'password'
      this.show = !this.show;
      //this.$toast.success('Profile saved',)
    },
  },

  validations: {
    login: {
      required,
      email
    },
    
    password: {
      required,
      minLength: minLength(6)
    },
   
  },

  watch: {
    loading: function(params) {
      //this.loading = params
    }
  }

}
</script>
<style scoped>
  .animation {
    animation: vibration infinite .3s;
  }
  @keyframes vibration {
    to {
      transform: rotate(0deg);
      transition: all 0.3s ease-in-out;
    }
    from {
      transform: rotate(3deg);
      transition: all 0.3s ease-in-out;
    }
  }
</style>