<template>
    <div class="sticky top-0 z-40">
      <div class="w-full h-20 px-6 bg-primary border-b flex items-center justify-between">
        <!-- left navbar -->
        <div class="flex">

                <!-- mobile hamburger -->
                <div class="lg:hidden flex items-center mr-4">
                  <button class="hover:text-blue-500 hover:border-white focus:outline-none navbar-burger" @click="toggleSidebar()">
                    <svg class="h-5 w-5" v-bind:style="{ fill: 'black' }" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                  </button>
                </div>
               

              
        </div>
        <!-- right navbar -->
        <div class="flex items-center relative">
                <div class="absolute inset-y-0 right-0 flex space-x-3 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <router-link class="text-white" to="/dashboard/fileManager"><svg stroke="currentColor" fill="currentColor" class="h-6 w-6" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M13 9h-2v3H8v2h3v3h2v-3h3v-2h-3z"></path><path d="M20 5h-8.586L9.707 3.293A.996.996 0 0 0 9 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zM4 19V7h16l.002 12H4z"></path></svg></router-link>
                  <button class="bg-gray-100 p-1 rounded-full text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">

                    <!-- Heroicon name: outline/bell -->
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </button>

                  <!-- Profile dropdown -->
                  <div class="ml-3 relative">
                    <div>
                      
                      <button @click="openMenu = !openMenu" type="button" class=" text-sm rounded-full outline-none " id="user-menu" aria-expanded="false" aria-haspopup="true">
                        <div class="flex items-center  mx-2 justify-center w-10 h-10 bg-blue-400 rounded-full shadow-lg cursor-pointer"  >
                          <span class="text-sm font-bold text-white uppercase"> {{ cigle }} </span>
                        </div>

              
                      </button>
                    </div>

                    <div v-if="openMenu"  class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                      <router-link to="/dashboard/profil" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem"> {{ currentUser.nom }} {{ currentUser.prenom }} </router-link>
                      <router-link to="/admin/settings" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Parametre</router-link>
                      <span @click.prevent="deconnecter"  class="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Se deconnecter</span>
                    </div>
                  </div>
                </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import getCigle from '../utils/get-cigle'
export default {
    name: 'Navbar',
    computed: {
        ...mapState(['sideBarOpen']),
        ...mapGetters('auths', {currentUser : 'GET_AUTHENTICATE_USER'})
    },
    data() {
        return {
            cigle : null,
            dropDownOpen: false,
            openMenu:false
        }
    },
    methods: {
      //Charger les fonctions 
      ...mapActions('auths', { logout: "LOGOUT" }),

      toggleSidebar() {
          this.$store.dispatch('toggleSidebar')
      },

      deconnecter() {

        this.logout().then((response) => {
          
          if (response.statut === "success" || response.status === 200) {
            
            window.location.href ='/'

            this.$toast.show({
              type: 'success',
              title: 'Success',
              message: "Vous etes deconnecter"
            })

          }else{
            this.$toast.show({
              type: 'error',
              title: 'Erreur de déconnexion',
              message: response.message
            })
          }
        })
      }
 
    },

    mounted() {

    let nom

    if(this.currentUser.nom != undefined)
      nom = this.currentUser.nom

    if(this.currentUser.prenom != undefined)
      nom += this.currentUser.prenom

    this.cigle = getCigle(nom)
    
    /* const usersInfo = JSON.parse(localStorage.getItem('usersInfos'))
      if(usersInfo) {
        this.currentUsers = usersInfo
         this.userRule = this.currentUsers.role
        
        console.log('role', this.userRule)
        
      } */
    
  },
}
</script>

 