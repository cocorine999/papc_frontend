<template>
  <Dashboard>
    <div class="w-full">
      <nav class="text-xs md:text-sm font-semibold flex justify-between items-center flex-wrap" aria-label="Breadcrumb">
        <div class="mb-2">
          <ol class="inline-flex p-0 list-none">
            <li class="flex items-center text-blue-500">
              <router-link to="#" class="text-gray-600">dashboard</router-link>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path
                  d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
              </svg>
            </li>
            <li class="flex items-center text-blue-500 ">
              <router-link to="/dashboard/projets" class="">Listes des souscriptions</router-link>
            </li>
          </ol>
        </div>
      </nav>

      <div class="border-b-2 border-blue-500 mx-4 mb-8 relative p-4">
        <span class="font-bold absolute clr bg-blue-500 px-4 py-1 text-white border-2 border-blue-500 rounded-lg uppercase">
          <span class="  p-1 rounded-md">Titre:</span> {{ nom_questionnaire }} </span>
      </div>
    </div>

    <div class="w-full bg-white border-grey-light border mt-4"  v-for=" (item , index ) in souscription" :key="index">
      <accordion :title="'Soumission du ' + item._submission_time"
       >

        <table class="min-w-full table-auto">
          <thead class="border-b bg-gray-300">
            <tr>
              <th class="text-xs md:text-sm whitespace-nowrap font-medium text-gray-900 py-2 px-4 text-left">
                Question
              </th>
              <th class="text-xs md:text-sm whitespace-nowrap font-medium text-gray-900 py-2 px-4 text-left">
                Réponse
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-gray-300 hover:bg-gray-200" v-for="(value, name) in item">


              <td class="text-sm text-gray-900 font-light py-2 px-4 ">
                {{ name }}
              </td>
              <td v-if="name == '_attachments'" class="text-sm text-gray-900 font-light py-2 px-4 ">
                <div v-for="(img, index) in value ">
                  <img :src="img.download_small_url" alt="img">
                </div>

              </td>

              <td v-else class="text-sm text-gray-900 font-light py-2 px-4 ">
                {{ value }}
              </td>
            </tr>
          </tbody>
        </table>
      </accordion>
    </div>
    <!-- <div> <pre>{{ souscription }}</pre></div> -->


</Dashboard>
</template>

<script>

import Dashboard from "@/layouts/Dashboard";
import ProgrammeService from '@/services/modules/programme.service';
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
import accordion from "@/components/accordion.vue";

export default {
  components: {
    Dashboard,
    accordion
  },
  data() {
    return {
      souscription: {},
      nom_questionnaire: "",
      metaData: {},
      response: {}
    }
  },
  computed: {
    ...mapGetters('auths', { currentUser: 'GET_AUTHENTICATE_USER' })
  },
  mounted() {

    this.nom_questionnaire = this.$store.getters.getquestionnaire.contenu.name

    ProgrammeService.createKobo({
      url: this.$store.getters.getquestionnaire.contenu.url
    }).then(response => {
      var table = response.data.data

      // var d1 = {}


      // var edit = {}

      // var allitem = []

      // for (let item = 0; item < table.length; item++) {

      //   console.log(table[item])
      //   for (let i in table[item]) {

      //     var slash = i.indexOf("/");
      //     var j = ""

      //     if (slash !== -1) {

      //       j = i.slice(slash + 1)

      //       edit[j] = table[item][i]


      //     } else {
      //       edit[i] = table[item][i]
      //     }


      //   }

        
      // }
      
      this.souscription = table

      this.response = this.souscription


    })
  },



  methods: {
    traitement(object) {

    }

  }

};



</script>
<style scoped>
.clr {
  background-color:#0E406E;
}
</style>