<template>
  <dashboard>
    <div class=" mb-4 py-8 md:px-6 px-4 xl:px-16">
      <h1 class="text-primary text-2xl py-8 font-bold">Informations de l'utilisateur</h1>
      <div class="block px-2 w-full ">

       
        
        <form @submit.prevent="updateUsers">
          <div class="grid grid-cols-1 w-full  gap-4">
                <div class="form-group mb-6">
                  <label for="firstName" class="text-md text-primary my-3">Nom complet</label>
                  <input type="text" v-model="fullName" class="form-control
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                   bg-white
                    text-gray-700
                     bg-clip-padding
                    border border-solid border-primary
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" value="John">
                </div>
               
          </div>
          <div class="form-group mb-6">
                <label for="email" class="text-md text-primary my-3">Adresse Email</label>
                <input type="email" title="vous ne pouvez pas changer d'email" disabled v-model="email"  class="form-control
                  block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                 bg-white
                text-gray-700
                bg-gray-500
                cursor-pointer
                  bg-clip-padding
                  border border-solid border-primary
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" value="johndoe@gmail.com"
                >
          </div>
          <div class="form-group mb-6">
            <label for="telephone"  class="text-md text-primary my-3">Numero de telephone</label>
              <input  type="text"  v-model="contact"  class="form-control
                block
               w-full
                px-3
                py-1.5
                text-base
                font-normal
                bg-white
                text-gray-700
                 bg-clip-padding
                border border-solid border-primary
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" value="66766805"
              >
          </div>
          <div class="py-2 my-4 flex justify-center space-x-8">
                <button type="submit" class="bg-primary  flex space-x-2 rounded-md  items-center text-white px-4 py-2 border border-primary font-semibold uppercase">
                  <span class="text-xs font-semibold uppercase" v-if="!chargement">
                    enregistrer
                  </span>
                  <span v-else class="flex items-center space-x-2">
                    <span class="text-xs px-4 font-semibold ">
                      envoi ...
                    </span>
                    <svg  xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-center animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </span>
                </button>
                <vbutton type="reset" template="danger" > annuler </vbutton>
              </div>
        </form>
      </div>
      
    </div>

    <!-- <div class=" px-4 md:px-6 py-8 xl:px-16">
      <h1 class="text-primary text-2xl font-bold">Details du compte</h1>

      <div class="informaions">
        <div class="block py-6 px-0 w-full md:max-w-4xl ">
            <form>
              <div class="form-group mb-6">
                    <label for="email" class="text-md text-primary my-3">Mots de passe actuel</label>
                    <input type="password"  class="form-control
                      block
                      w-full
                      px-3
                      py-1.5
                      text-base
                      font-normal
                     bg-white
                      text-gray-700
                      bg-clip-padding
                      border border-solid border-primary
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" value="johndoe@gmail.com"
                      >
              </div>

              <div class="grid md:grid-cols-2 gap-4">
                  <div class="form-group mb-6">
                    <label for="firstName" class="text-md text-primary my-3">Nouveau mots de passe</label>
                    <input type="password" class="form-control
                      block
                      w-full
                      px-3
                      py-1.5
                      text-base
                      font-normal
                     bg-white
                      text-gray-700
                      bg-clip-padding
                      border border-solid border-primary
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                      >
                  </div>
                  
                  <div class="form-group mb-6">
                    <label for="firstName" class="text-md text-primary my-3">Confirmation de mots de passe</label>
                    <input type="password" class="form-control
                      block
                      w-full
                      px-3
                      py-1.5
                      text-base
                      font-normal
                     bg-white
                      text-gray-700
                      bg-clip-padding
                      border border-solid border-primary
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"                       >
                  </div>
              </div>
              <div class="my-6">
                <button class="px-20 py-2 w-full md:w-auto bg-primary hover:opacity-80 font-bold text-white text-center border border-primary rounded-md">Enregistrer</button>
              </div>
            </form>
        </div>
      </div>
    </div> -->
  </dashboard>
</template>

<script>
import Dashboard from '@/layouts/Dashboard'
import Vbutton from '@/components/Vbutton'
import { mapGetters, mapMutations, mapActions } from "vuex";
import UtilisateurService from "@/services/modules/utilisateur.service.js";
export default {
  components: {Dashboard,Vbutton},
  data() {
    return {
      fullName:'',
      contact:'',
      email:'',
      chargement:false,
    }
  },
  computed:{
    ...mapGetters('auths', { currentUser: 'GET_AUTHENTICATE_USER' })
  },
  methods:{
    updateUsers() {
        if (this.chargement == false) {
          this.chargement = true
          
          const data = {
            nom:this.fullName,
            email:this.email,
            
            contact:this.contact
          }
          UtilisateurService.update(this.currentUser.id,data).then((data) => {
            this.$toast.success('Mise à jours effectué')
            this.chargement = false
            window.location.reload(true)
          }).catch((e) => {
            this.chargement = false
            this.$toast.error(e)
          })

        }
        
      },
  },
  mounted() {
    this.fullName =  this.currentUser.nom
    this.contact =  this.currentUser.contact
    this.email =  this.currentUser.email
  },
}
</script>

<style scoped>

</style>