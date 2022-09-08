<template>

    <div class="p-4">
      <!--Modal de filtre -->
      <div v-if="showModal ">
        <vmodal title="Filtre projet" v-on:close="showModal = false">
          <div class="px-6" style="width: 60vw !important">
            <vform
              template="default"
              isAllPairSaufDescrip="true"
              :champs="champsRecherche"
              :cols="cols"
              submitText="Rechercher"
              @sendForm="filtre"
            ></vform>
          </div>
        </vmodal>
      </div>
      <!--Fin Modal de filtre -->

       <!--La navigation  -->
      <nav v-if="currentRole!='bailleur'" class="mb-2 text-sm font-semibold" aria-label="Breadcrumb">
        <div>
          <ol class="inline-flex p-0 list-none">
            <li class="flex items-center text-blue-500">
              <router-link to="/dashboard" class="text-gray-600">dashboard</router-link>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/>
              </svg>
            </li>
            <li class="flex items-center text-blue-500">
              <router-link to="/dashboard/projets" class="text-gray-600">projets</router-link>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/>
              </svg>
            </li>
            <li class="flex items-center text-blue-500">
              <router-link to="/dashboard/projets" class="">projet</router-link>
            </li>
          </ol>
        </div>
      </nav>

      <!--Fin navigation -->

      <!--filte et button de modification  -->

      <div class="flex items-center justify-between ">
        <div v-if="currentRole!='bailleur'" class="flex space-x-2 items-center">
          <button title="editer un projet" class="py-2 px-4 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase bg-primary focus:outline-none focus:shadow-outline">
            <span>
              <svg class="mr-1" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 000-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
              </svg>
            </span>
            <span class="mx-2 text-xs font-semibold uppercase">editer un projet</span>
          </button>

          <button title="filtre" @click="showModal = true" class="bg-primary text-white px-2 py-1">
            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
          </button>
        </div>
        <div class="border border-gray-300 p-2 bg-white shadow">
          <router-link class="text-sm font-semibold" to="/dashboard/projets/composantes-globale">Composantes /</router-link>
          <router-link class="text-sm font-semibold" to="/dashboard/projets/activites-globale">Activités /</router-link>
          <router-link class="text-sm font-semibold" to="/dashboard/projets/taches-globale">Taches</router-link>
        </div>
      </div>

      <!--fin filte et button de modification  -->

      <!-- partie description et budgetaire  -->
      <div class="stat gap-2 mb-6 mt-8">
        <description :projet="projet"></description>
        <budgetaire :projet="projet"></budgetaire>
      </div>
      <!-- fin partie description et budgetaire -->

      <!--  graphe et indicateurs -->
      <div class="stat2 my-6 gap-2 ">
        <graphes></graphes>
        <indicateurs :suivis_indicateurs="projet.suivis_indicateurs"></indicateurs>
      </div>

      <!-- graphe et indicateurss -->

      <!--  partie env -->
      <div>
        <environnement></environnement>
      </div>
      <!-- fin  partie  env -->

      <!--  autre partie et map  -->
        <div class="grid my-3 grid-cols-2">
          <other-graphe></other-graphe>
          <div class="bg-white  p-2 shadow-sm">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d31720.122491100385!2d2.470358215345265!3d6.3920254790700195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbj!4v1661191892386!5m2!1sen!2sbj"  class="w-full h-full" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
       

      <!--  fin autre partie et map  -->

    </div>

</template>

<script>
import SearchBar from "@/components/SearchBar";
import Titre from "@/components/Titre";
import Vtable from "@/components/Vtable";
import Vform from "@/components/Vform";
import Vmodal from "@/components/Vmodal";


import { mapGetters, mapMutations, mapActions } from "vuex";
import Budgetaire from '@/components/Budgetaire.vue';
import Description from '@/components/Description.vue';
import Graphes from '@/components/Graphes.vue';
import Indicateurs from '@/components/Indicateurs.vue';
import Environnement from '@/components/Environnement.vue';
import OtherGraphe from '@/components/OtherGraphe.vue';

export default {
 props:['projet'],
  components: {
    Vtable,
    Vmodal,
    Vform,
    Titre,
    SearchBar,
    Description,
    Budgetaire,
    Graphes,
    Indicateurs,
    Environnement,
    OtherGraphe
  },
  data() {
    return {
      showModal:false,
      currentRole:''
    
    }
  },

  computed: {
     ...mapGetters('auths', {currentUser : 'GET_AUTHENTICATE_USER'})
  },
  mounted(){
     if(this.currentUser != undefined) {
       this.currentRole = this.currentUser.type
        console.log("role courant",this.currentUser)
     }
  }

 
};



</script>
<style scoped>
.stat {
  display:grid;
  grid-template-columns: 6fr 4fr;
}
.stat2 {
  display:grid;
  grid-template-columns: 7fr 5fr;
}
</style>