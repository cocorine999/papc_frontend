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
        <span class="font-bold absolute bg-blue-500 px-4 py-1 text-white border-2 border-blue-500 rounded-lg uppercase">
          <span class="clr bg-white p-1 rounded-md">Titre:</span> {{ nom_questionnaire }} </span>
      </div>
    </div>

    <div class="w-full bg-white border-grey-light border mt-4">
      <accordion title="Cliquer pour voir les informations contenu dans cette souscription"
        v-for=" item in souscription ">

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


      var d1 = {}


      var edit = {
      }

      var allitem = []

      for (let item = 0; item < table.length; item++) {

        for (let i in table[item]) {

          // if (i == "start") { 
          //   d1[i] = table[item][i] 
          //   Reflect.deleteProperty(table[item], 'start');
          // }

          // if (i == "end") { 
          //   d1[i] = table[item][i] 
          //   Reflect.deleteProperty(table[item], 'end');
          // }

          // if (i == "today") { 
          //   d1[i] = table[item][i] 
          //   Reflect.deleteProperty(table[item], 'today');
          // }
          // if (i == "username") { 
          //   d1[i] = table[item][i] 
          //   Reflect.deleteProperty(table[item], 'username');
          // }
          // if (i == "deviceid") { 
          //   d1[i] = table[item][i] 
          //   Reflect.deleteProperty(table[item], 'deviceid');
          // }
          // if (i == "phonenumber") { 
          //   d1[i] = table[item][i] 
          //   Reflect.deleteProperty(table[item], 'phonenumber');
          // }
          // if (i == "audit") { 
          //   d1[i] = table[item][i] 
          //   Reflect.deleteProperty(table[item], 'audit');
          // }
          // if (i == "__version__") { 
          //   d1[i] = table[item][i] 
          //   Reflect.deleteProperty(table[item], '__version__');
          // }
          // if (i == "_id") { 
          //   d1[i] = table[item][i] 
          //   Reflect.deleteProperty(table[item], '_id');
          // }
          // if (i == "_submitted_by") { 
          //   d1[i] = table[item][i] 
          //   Reflect.deleteProperty(table[item], '_submitted_by');
          // }

          // if (i == "formhub/uuid") { 
          //   d1[i] = table[item][i] 
          //   Reflect.deleteProperty(table[item], 'formhub/uuid');
          // }


          // if (i == "_uuid") { 
          //   d1[i] = table[item][i] 
          //   Reflect.deleteProperty(table[item], '_uuid');
          // }

          // if (i == "meta/instanceID") { 
          //   d1[i] = table[item][i] 
          //   Reflect.deleteProperty(table[item], 'meta/instanceID');
          // }

          // if (i == "_xform_id_string") { 
          //   d1[i] = table[item][i] 
          //   Reflect.deleteProperty(table[item], '_xform_id_string');
          // }

          var slash = i.indexOf("/");
          var j = ""

          if (slash !== -1) {

            j = i.slice(slash + 1)

            edit[j] = table[item][i]


          } else {
            edit[i] = table[item][i]
          }


        }

        allitem.push(edit)
      }


      this.souscription = allitem

      console.log(this.souscription)

      this.metaData = d1

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
  color:#000000;
}
</style>