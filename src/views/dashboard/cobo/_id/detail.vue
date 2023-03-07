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
        <div>
          <div class=" flex">
            <div class="flex items-center mr-3 ">
              <span class=" mr-3">Date de début:</span> <input placeholder="Date debut" v-model="date.dateDebut"
                class="p-2 text-xs inputDate" type="date">
            </div>
            <div class="flex items-center">
              <span class="mr-3">Date de fin:</span> <input placeholder="Date fin" v-model="date.dateFin"
                class="p-2 text-xs inputDate" type="date">
            </div>
            <button class="inputDate mx-2 p-2 flex" title="vider les champs" v-title @click="clear">
              <svg stroke="currentColor" fill="#FFFFFF" stroke-width="0" viewBox="0 0 16 16" height="1.5em" width="1.5em"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                <path
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z">
                </path>
              </svg>
            </button>
          </div>

          <div class=" p-2 text-red-400" v-if="error">
            <p> La date de fin doit est supérieur à la date de début </p>
          </div>
        </div>

      </nav>
      <div class="flex justify-between my-2 items-center">
        <div class="border-b-2 border-blue-500 mx-4 mb-8 relative p-4 w-10/12">
          <span
            class="font-bold absolute clr bg-blue-500 px-4 py-1 text-white border-2 border-blue-500 rounded-lg uppercase">
            <span class="  p-1 rounded-md">Titre:</span> {{ nom_questionnaire }} </span>
        </div>
        <button title="exporter toute les soumissions" v-title @click="downloadAllFile()"
          class="h-9 w-2/12 py-1 px-2 space-x-1 text-xs font-semibold text-white uppercase bg-indigo-500 focus:outline-none focus:shadow-outline">
          <svg class="inline" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24"
            height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 16h2V7h3l-4-5-4 5h3z"></path>
            <path
              d="M5 22h14c1.103 0 2-.897 2-2v-9c0-1.103-.897-2-2-2h-4v2h4v9H5v-9h4V9H5c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2z">
            </path>
          </svg>
          <span class="text-xs font-semibold">Export Excel</span>
        </button>
      </div>

    </div>


    <div v-if="table" class="w-full bg-white border-grey-light border mT-2" v-for=" (item, index ) in souscription"
      :key="index">
      <accordion :title="'Soumission du ' + new Date(item._submission_time)" @generate-pdf="generateReport(index)"
        @generate-excel="downloadFile(item)">
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

    <div v-if="searching">
      <h1 class="m-2 text-xl"> Résultat de la recherche</h1>
      <div class="w-full bg-white border-grey-light border mT-2" v-for=" (item, index2 ) in filtre" :key="index2">
        <accordion :title="'Soumission du ' + new Date(item._submission_time)" @generate-pdf="generateReport(index2)"
          @generate-excel="downloadFile(item)">
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
    </div>

    <div class="relative" v-for=" (item, index ) in souscription" :key="index">
      <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="true"
        :paginate-elements-by-height="1400" :filename="'Soumission du ' + new Date(item._submission_time)"
        :pdf-quality="2" :manual-pagination="true" pdf-format="a4" pdf-orientation="landscape" pdf-content-width="100vw"
        @progress="onProgress($event)" @hasStartedGeneration="hasStartedGeneration()" @hasGenerated="hasGenerated($event)"
        ref="element">

        <section slot="pdf-content">
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
        </section>
      </vue-html2pdf>
    </div>


  </Dashboard>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf'
import exportFromJSON from "export-from-json";
import Dashboard from "@/layouts/Dashboard";
import ProgrammeService from '@/services/modules/programme.service';
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
import accordion from "@/components/accordion.vue";
import Objectif_speficique from '../../cadre_logique/objectif_speficique.vue';

export default {
  components: {
    Dashboard,
    accordion,
    VueHtml2pdf,
  },
  data() {
    return {
      search: "",
      searching: false,
      souscription: {},
      nom_questionnaire: "",
      metaData: {},
      response: {},
      filtre: [],
      table: true,
      error: false,
      date: {
        dateDebut: "",
        dateFin: "",
      },
      match: true,
      pdf_id: "",
      suiviVisible: false,
      labelData:{},
      deployedId: "",
    }
  },
  computed: {
    ...mapGetters('auths', { currentUser: 'GET_AUTHENTICATE_USER' })
  },
  mounted() {
    this.getPermission()
    if (!this.suiviVisible) {
      this.$router.push('/401-non-autorise')
    }

   
    this.souscription = this.copyKeyInArray(this.souscription)

    console.log(this.copyKeyInArray(this.souscription))

    this.deployedId = this.$store.getters.getquestionnaire.deployed_version_id
    ProgrammeService.getLabel({ deployed_version_id: this.deployedId, url: this.$store.getters.getquestionnaire.contenu.url }).then(response => {
      this.labelData = response.data.data
    })

    this.nom_questionnaire = this.$store.getters.getquestionnaire.contenu.name

    ProgrammeService.createKobo({
      url: this.$store.getters.getquestionnaire.contenu.url
    }).then(response => {
      var table = response.data.data
      this.souscription = this.copyKeyInArray(table)
      // this.response = this.souscription
    })




  },

  watch: {
    date: {
      handler(newValue) {
        if (this.date.dateDebut !== "" && this.date.dateFin !== "") {

          this.searching = true
          this.table = false
          this.recherche()

        } else {
          this.searching = false
          this.table = true
        }

      },
      deep: true
    },

  },
  methods: {
    downloadFile(json) {
      var table = []
      table.push(json)


      const data = table;

      const fileName = "Soumission du " + new Date(data[0]._submission_time);
      const exportType = exportFromJSON.types.csv;

      if (data) exportFromJSON({ data, fileName, exportType });
    },

    downloadAllFile() {
      const data = this.souscription;
      const fileName = this.nom_questionnaire;
      const exportType = exportFromJSON.types.csv;

      if (data) exportFromJSON({ data, fileName, exportType });
    },

    recherche() {
      var start = new Date(this.date.dateDebut).getTime()

      var end = new Date(this.date.dateFin).getTime()

      if (end < start) {
        this.error = true
      } else {
        this.error = false
        this.filtre = [];

        this.filtre = this.souscription.filter(function (a) {
          a._submission_time = new Date(a._submission_time).getTime()
          if (a._submission_time >= start && a._submission_time <= end) {
            return true
          }
        });
      }
    },

    getPermission() {
      this.currentUser.role[0].permissions.forEach(element => {

        if (element.slug === 'voir-suivi-kobo') {
          this.suiviVisible = true
        }

      });
    },
    clear() {
      this.date.dateDebut = "";
      this.date.dateFin = "";
    },
    generateReport(data) {
      this.$refs.element[data].generatePdf()
    },

    // new fonctions

    findValueInObject(obj, key, value) {
      let result1 = null;

      for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          const propValue = obj[prop];

          if (prop === key && propValue === value) {
            return obj.label[0];
          } else if (typeof propValue === "object") {
            result1 = this.findValueInObject(propValue, key, value);
            if (result1) {
              return result1;
            }
          }
        }
      }


    },



    copyKeyInArray(arr) {
      const newArr = [];

      for (let i = 0; i < arr.length; i++) {
        const obj = arr[i];
        const newObj = {};

        for (const prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            if (prop.includes("/")) {
              const keyParts = prop.split("/");
              const newKey = keyParts[keyParts.length - 1].split(":")[0];

              var result7 = this.findValueInObject(this.labelData, "$autoname", newKey);
              //console.log(result7); 
              if (result7 == null) {
                result7 = "instanceID";
              }

              newObj[result7] = obj[prop];
            } else {
              newObj[prop] = obj[prop];
            }
          }
        }

        newArr.push(newObj);
      }

      console.log(newArr)
      return newArr;
    },


  }
};



</script>
<style scoped>
.clr {
  background-color: #0E406E;
}


.inputDate {
  background-color: #0E406E;
  color: white;
}

input[type="date"]::-webkit-inner-spin-button,
input[type="date"]::-webkit-calendar-picker-indicator {
  display: block;
  background-image: url(@/assets/images/date-icon.svg);
  background-repeat: no-repeat;
  color: white;
  -webkit-appearance: none;
}

.np-list {
  padding: 2px 8px;
  margin: 12px 8px;
  border: 1px solid #107fda;
  background: #ffffff;
  border-radius: 6px;
  color: #107fda;
}

.np-btn {
  padding: 2px 8px;
  margin: 12px 8px;
  border: 1px solid #107fda;
  width: 110px;
  background: #107fda;
  border-radius: 6px;
  color: #ffffff;
  cursor: pointer;
}
</style>