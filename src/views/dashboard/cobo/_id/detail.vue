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
      <accordion :title="'Soumission du ' + new Date(item.submission_time)" @generate-pdf="generateReport(index)"
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
        <accordion :title="'Soumission du ' + new Date(item.submission_time)" @generate-pdf="generateReport(index2)"
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
      souscription: [],
      // souscription: [
      //   {
      //     "_id": 99320683,
      //     "_notes": [],
      //     "_uuid": "6bbf49af-cdfb-488e-a381-d7f1eb8e412f",
      //     "group_sx4dc10/Fonction_de_la_personne_rencontr_e": "Maçon",
      //     "_validation_status": {},
      //     "_xform_id_string": "aYN7a8XPfv5zFsNL3DGqCK",
      //     "group_lq1gc77/Coordonn_es_g_ographiques_du_site": "6.36661 2.397079 0 0",
      //     "group_os0ta89/Preambule": "Bonjour. Cette collecte de données vise à avoir des informations sur les activités qui se mènent sur le terrain pour connaître le niveau d'avancement du Programme PAPC. Veuillez vous présentez s'il vous plaît.",
      //     "_submitted_by": null,
      //     "group_lq1gc77/Arrondissement": "4_me",
      //     "group_lq1gc77/Ville": "Cotonou",
      //     "group_po4rn22/Si_IEC_sensibilisat_participants_femmes": "45",
      //     "group_po4rn22/Nature_de_l_activit_sur_le_si": "iec__sensibilisation__mobilisation_socia",
      //     "meta/instanceID": "uuid:6bbf49af-cdfb-488e-a381-d7f1eb8e412f",
      //     "group_os0ta89/Date_de_la_collecte_de_donn_es": "2021-06-07",
      //     "formhub/uuid": "3d7703b5749b40389c5364f35d4fe09d",
      //     "group_lq1gc77/Quartier_concern": "Sodjatimè",
      //     "group_lq1gc77/Pays": "Bénin",
      //     "end": "2021-06-07T09:36:25.412+02:00",
      //     "group_po4rn22/Photo_du_site": "DSC_2729-scaled-9_36_12.jpg",
      //     "group_os0ta89/Nom_et_Pr_nom_de_l_agent_de_collecte": "AGBA Léon",
      //     "group_po4rn22/Si_IEC_sensibilisat_participants_hommes": "30",
      //     "_attachments": [
      //       {
      //         "mimetype": "image/jpeg",
      //         "download_small_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/99320683/attachments/36502530/",
      //         "download_large_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/99320683/attachments/36502530/",
      //         "download_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/99320683/attachments/36502530/",
      //         "filename": "agba78/attachments/3d7703b5749b40389c5364f35d4fe09d/6bbf49af-cdfb-488e-a381-d7f1eb8e412f/DSC_2729-scaled-9_36_12.jpg",
      //         "instance": 99320683,
      //         "download_medium_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/99320683/attachments/36502530/",
      //         "id": 36502530,
      //         "xform": 691496
      //       }
      //     ],
      //     "start": "2021-06-07T09:26:37.244+02:00",
      //     "group_sx4dc10/Nom_de_la_personne_rencontr_e": "DOSSOU Jean",
      //     "group_sx4dc10/Num_ro_de_t_l_phone_personne_rencontr_e": "+22996030456",
      //     "_geolocation": [
      //       6.36661,
      //       2.397079
      //     ],
      //     "_submission_time": "2021-06-07T07:36:44",
      //     "_status": "submitted_via_web",
      //     "__version__": "v5MaDnQaTEQdvgpgeABRKz",
      //     "_tags": []
      //   },
      //   {
      //     "_id": 99322282,
      //     "_notes": [],
      //     "group_po4rn22/Si_collecteur_longu_collecteur_construit": "200",
      //     "group_sx4dc10/Fonction_de_la_personne_rencontr_e": "Entrepreneur BTP",
      //     "_validation_status": {},
      //     "_uuid": "9e8e851d-dbe1-4fc6-b4e4-f9c4f6c92219",
      //     "group_lq1gc77/Coordonn_es_g_ographiques_du_site": "6.34293 2.407522 0 0",
      //     "group_os0ta89/Preambule": "Bonjour. Cette collecte de données vise à avoir des informations sur les activités qui se mènent sur le terrain pour connaître le niveau d'avancement du Programme PAPC. Veuillez vous présentez s'il vous plaît.",
      //     "_submission_time": "2021-06-07T07:50:59",
      //     "_submitted_by": null,
      //     "group_lq1gc77/Arrondissement": "12_me",
      //     "group_lq1gc77/Ville": "Cotonou",
      //     "_xform_id_string": "aYN7a8XPfv5zFsNL3DGqCK",
      //     "group_po4rn22/Nature_de_l_activit_sur_le_si": "travaux_de_construction_d_ouvrages",
      //     "meta/instanceID": "uuid:9e8e851d-dbe1-4fc6-b4e4-f9c4f6c92219",
      //     "group_os0ta89/Date_de_la_collecte_de_donn_es": "2021-06-07",
      //     "group_po4rn22/Si_collecteur_longu_de_collecteur_pr_vu": "2000",
      //     "formhub/uuid": "3d7703b5749b40389c5364f35d4fe09d",
      //     "group_lq1gc77/Quartier_concern": "Aïbatin",
      //     "group_lq1gc77/Pays": "Bénin",
      //     "end": "2021-06-07T09:50:44.136+02:00",
      //     "group_po4rn22/Photo_du_site": "DSC_2729-scaled-9_50_36.jpg",
      //     "group_os0ta89/Nom_et_Pr_nom_de_l_agent_de_collecte": "AGBA Léon",
      //     "group_po4rn22/Si_Travaux_de_construction_qu": "collecteur",
      //     "start": "2021-06-07T09:36:25.561+02:00",
      //     "group_sx4dc10/Nom_de_la_personne_rencontr_e": "Koffan Dieudonnée",
      //     "group_sx4dc10/Num_ro_de_t_l_phone_personne_rencontr_e": "+22966322145",
      //     "_geolocation": [
      //       6.34293,
      //       2.407522
      //     ],
      //     "_attachments": [
      //       {
      //         "mimetype": "image/jpeg",
      //         "download_small_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/99322282/attachments/36503405/",
      //         "download_large_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/99322282/attachments/36503405/",
      //         "download_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/99322282/attachments/36503405/",
      //         "filename": "agba78/attachments/3d7703b5749b40389c5364f35d4fe09d/9e8e851d-dbe1-4fc6-b4e4-f9c4f6c92219/DSC_2729-scaled-9_50_36.jpg",
      //         "instance": 99322282,
      //         "download_medium_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/99322282/attachments/36503405/",
      //         "id": 36503405,
      //         "xform": 691496
      //       }
      //     ],
      //     "_status": "submitted_via_web",
      //     "__version__": "v5MaDnQaTEQdvgpgeABRKz",
      //     "_tags": []
      //   },
      //   {
      //     "_id": 99325977,
      //     "_notes": [],
      //     "group_sx4dc10/Fonction_de_la_personne_rencontr_e": "Contrôleur de chantier",
      //     "_validation_status": {},
      //     "_uuid": "cd502ce3-2802-42bd-a5e7-9ea8eba5241a",
      //     "group_po4rn22/Si_Travaux_de_construction_qu": "bassin_de_r_tention",
      //     "group_os0ta89/Preambule": "Bonjour. Cette collecte de données vise à avoir des informations sur les activités qui se mènent sur le terrain pour connaître le niveau d'avancement du Programme PAPC. Veuillez vous présentez s'il vous plaît.",
      //     "group_po4rn22/Si_bassin_de_r_tenti_lume_du_bassin_pr_vu": "86",
      //     "_submitted_by": null,
      //     "group_lq1gc77/Arrondissement": "4_me",
      //     "group_lq1gc77/Ville": "Cotonou",
      //     "_xform_id_string": "aYN7a8XPfv5zFsNL3DGqCK",
      //     "group_po4rn22/Nature_de_l_activit_sur_le_si": "travaux_de_construction_d_ouvrages activit_s_de_pges",
      //     "meta/instanceID": "uuid:cd502ce3-2802-42bd-a5e7-9ea8eba5241a",
      //     "group_os0ta89/Nom_et_Pr_nom_de_l_agent_de_collecte": "AGBA Léon",
      //     "_status": "submitted_via_web",
      //     "group_po4rn22/Photo_du_site": "DSC_2729-scaled-10_18_52.jpg",
      //     "group_lq1gc77/Quartier_concern": "Enagnon",
      //     "group_lq1gc77/Pays": "Bénin",
      //     "__version__": "v5MaDnQaTEQdvgpgeABRKz",
      //     "end": "2021-06-07T10:18:56.534+02:00",
      //     "group_lq1gc77/Coordonn_es_g_ographiques_du_site": "6.371225 2.393401 0 0",
      //     "group_os0ta89/Date_de_la_collecte_de_donn_es": "2021-06-07",
      //     "group_sx4dc10/Nom_de_la_personne_rencontr_e": "AGOSSOU Bienvenu",
      //     "_attachments": [
      //       {
      //         "mimetype": "image/jpeg",
      //         "download_small_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/99325977/attachments/36505596/",
      //         "download_large_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/99325977/attachments/36505596/",
      //         "download_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/99325977/attachments/36505596/",
      //         "filename": "agba78/attachments/3d7703b5749b40389c5364f35d4fe09d/cd502ce3-2802-42bd-a5e7-9ea8eba5241a/DSC_2729-scaled-10_18_52.jpg",
      //         "instance": 99325977,
      //         "download_medium_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/99325977/attachments/36505596/",
      //         "id": 36505596,
      //         "xform": 691496
      //       }
      //     ],
      //     "start": "2021-06-07T09:50:44.294+02:00",
      //     "group_po4rn22/Si_activit_s_Plan_de_it_d_arbres_plant_s": "463",
      //     "group_sx4dc10/Num_ro_de_t_l_phone_personne_rencontr_e": "+22970020568",
      //     "_geolocation": [
      //       6.371225,
      //       2.393401
      //     ],
      //     "_submission_time": "2021-06-07T08:19:10",
      //     "group_po4rn22/Si_bassin_de_r_tenti_ume_du_bassin_r_alis": "500",
      //     "group_po4rn22/Si_activit_s_Plan_de_ordures_install_s": "49",
      //     "formhub/uuid": "3d7703b5749b40389c5364f35d4fe09d",
      //     "_tags": []
      //   },
      //   {
      //     "_id": 99599521,
      //     "_notes": [],
      //     "_uuid": "ca45e3f7-4f27-41f5-adc6-8f0d69d6b2a8",
      //     "group_sx4dc10/Fonction_de_la_personne_rencontr_e": "Agent de la mairie",
      //     "_validation_status": {},
      //     "_xform_id_string": "aYN7a8XPfv5zFsNL3DGqCK",
      //     "group_po4rn22/Si_Travaux_de_construction_qu": "canniveaux autre_type_d_ouvrage___pr_ciser",
      //     "group_os0ta89/Preambule": "Bonjour. Cette collecte de données vise à avoir des informations sur les activités qui se mènent sur le terrain pour connaître le niveau d'avancement du Programme PAPC. Veuillez vous présentez s'il vous plaît.",
      //     "_submitted_by": "agba78",
      //     "group_lq1gc77/Arrondissement": "5_me",
      //     "group_lq1gc77/Ville": "Cotonou",
      //     "group_po4rn22/Si_autre_type_d_ouvrage_veuil": "Mur",
      //     "group_po4rn22/Nature_de_l_activit_sur_le_si": "travaux_de_construction_d_ouvrages",
      //     "meta/instanceID": "uuid:ca45e3f7-4f27-41f5-adc6-8f0d69d6b2a8",
      //     "group_os0ta89/Nom_et_Pr_nom_de_l_agent_de_collecte": "AGBA Léon",
      //     "group_po4rn22/Photo_du_site": "1623169469605.jpg",
      //     "group_po4rn22/Si_canniveaux_longu_de_canniveaux_pr_vus": "65.0",
      //     "group_lq1gc77/Quartier_concern": "Enagnon",
      //     "group_lq1gc77/Pays": "Bénin",
      //     "__version__": "v5MaDnQaTEQdvgpgeABRKz",
      //     "end": "2021-06-08T17:24:51.108+01:00",
      //     "group_lq1gc77/Coordonn_es_g_ographiques_du_site": "6.3458059 2.4035749 27.154179422859077 20.0",
      //     "_submission_time": "2021-06-08T16:24:55",
      //     "group_os0ta89/Date_de_la_collecte_de_donn_es": "2021-06-08",
      //     "group_po4rn22/Si_canniveaux_longu_canniveaux_r_alis_s": "53.0",
      //     "group_po4rn22/Informations_sur_l_ouvrage": "Prévue :2 Réalisée : 1",
      //     "start": "2021-06-08T17:21:15.323+01:00",
      //     "group_sx4dc10/Nom_de_la_personne_rencontr_e": "AGODO Fabrice",
      //     "group_sx4dc10/Num_ro_de_t_l_phone_personne_rencontr_e": "97807644",
      //     "_geolocation": [
      //       6.3458059,
      //       2.4035749
      //     ],
      //     "_attachments": [
      //       {
      //         "mimetype": "image/jpeg",
      //         "download_small_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/99599521/attachments/36660834/",
      //         "download_large_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/99599521/attachments/36660834/",
      //         "download_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/99599521/attachments/36660834/",
      //         "filename": "agba78/attachments/3d7703b5749b40389c5364f35d4fe09d/ca45e3f7-4f27-41f5-adc6-8f0d69d6b2a8/1623169469605.jpg",
      //         "instance": 99599521,
      //         "download_medium_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/99599521/attachments/36660834/",
      //         "id": 36660834,
      //         "xform": 691496
      //       }
      //     ],
      //     "_status": "submitted_via_web",
      //     "formhub/uuid": "3d7703b5749b40389c5364f35d4fe09d",
      //     "_tags": []
      //   },
      //   {
      //     "_id": 101574285,
      //     "start": "2021-06-08T14:27:53.832+01:00",
      //     "end": "2022-10-26T18:07:30.528+01:00",
      //     "group_os0ta89/Date_de_la_collecte_de_donn_es": "2021-06-21",
      //     "group_os0ta89/Nom_et_Pr_nom_de_l_agent_de_collecte": "AGBA Léon",
      //     "group_os0ta89/Preambule": "Bonjour. Cette collecte de données vise à avoir des informations sur les activités qui se mènent sur le terrain pour connaître le niveau d'avancement du Programme PAPC. Veuillez vous présentez s'il vous plaît.",
      //     "group_sx4dc10/Nom_de_la_personne_rencontr_e": "AGBOTON Fabrice",
      //     "group_sx4dc10/Num_ro_de_t_l_phone_personne_rencontr_e": "96044556",
      //     "group_sx4dc10/Fonction_de_la_personne_rencontr_e": "Chef Chantier",
      //     "group_lq1gc77/Pays": "Bénin",
      //     "group_lq1gc77/Ville": "Cotonou",
      //     "group_lq1gc77/Arrondissement": "8_me",
      //     "group_lq1gc77/Quartier_concern": "Gbèdjromèdé",
      //     "group_lq1gc77/Coordonn_es_g_ographiques_du_site": "6.382928 2.416277 0 0",
      //     "group_po4rn22/Nature_de_l_activit_sur_le_si": "iec__sensibilisation__mobilisation_socia",
      //     "group_po4rn22/Si_IEC_sensibilisat_participants_hommes": "45",
      //     "group_po4rn22/Si_IEC_sensibilisat_participants_femmes": "66",
      //     "group_po4rn22/Photo_du_site": "Photo visite collecteur Y-18_7_24.jpg",
      //     "meta/instanceID": "uuid:13145aea-6e86-4aaa-8ad3-03a87b4933de",
      //     "meta/deprecatedID": "uuid:b259e5b7-ebd0-49db-ac57-ed2357aef48e",
      //     "formhub/uuid": "3d7703b5749b40389c5364f35d4fe09d",
      //     "__version__": "v5MaDnQaTEQdvgpgeABRKz",
      //     "_xform_id_string": "aYN7a8XPfv5zFsNL3DGqCK",
      //     "_uuid": "13145aea-6e86-4aaa-8ad3-03a87b4933de",
      //     "_attachments": [
      //       {
      //         "download_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/101574285/attachments/83664875/",
      //         "download_large_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/101574285/attachments/83664875/",
      //         "download_medium_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/101574285/attachments/83664875/",
      //         "download_small_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/101574285/attachments/83664875/",
      //         "mimetype": "image/jpeg",
      //         "filename": "agba78/attachments/3d7703b5749b40389c5364f35d4fe09d/13145aea-6e86-4aaa-8ad3-03a87b4933de/Photo_visite_collecteur_Y-18_7_24.jpg",
      //         "instance": 101574285,
      //         "xform": 691496,
      //         "id": 83664875
      //       },
      //       {
      //         "download_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/101574285/attachments/37649617/",
      //         "download_large_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/101574285/attachments/37649617/",
      //         "download_medium_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/101574285/attachments/37649617/",
      //         "download_small_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/101574285/attachments/37649617/",
      //         "mimetype": "image/jpeg",
      //         "filename": "agba78/attachments/3d7703b5749b40389c5364f35d4fe09d/b259e5b7-ebd0-49db-ac57-ed2357aef48e/Cotonou-9_57_50.jpg",
      //         "instance": 101574285,
      //         "xform": 691496,
      //         "id": 37649617
      //       }
      //     ],
      //     "_status": "submitted_via_web",
      //     "_geolocation": [
      //       6.382928,
      //       2.416277
      //     ],
      //     "_submission_time": "2021-06-21T08:58:03",
      //     "_tags": [],
      //     "_notes": [],
      //     "_validation_status": {},
      //     "_submitted_by": null
      //   },
      //   {
      //     "_id": 220136267,
      //     "formhub/uuid": "3d7703b5749b40389c5364f35d4fe09d",
      //     "start": "2023-02-17T16:42:59.670+01:00",
      //     "end": "2023-02-17T16:48:20.112+01:00",
      //     "group_os0ta89/Date_de_la_collecte_de_donn_es": "2023-02-17",
      //     "group_os0ta89/Nom_et_Pr_nom_de_l_agent_de_collecte": "Agba Léon",
      //     "group_os0ta89/Preambule": "Bonjour. Cette collecte de données vise à avoir des informations sur les activités qui se mènent sur le terrain pour connaître le niveau d'avancement du Programme PAPC. Veuillez vous présentez s'il vous plaît.",
      //     "group_sx4dc10/Nom_de_la_personne_rencontr_e": "GNANGLE Hebert",
      //     "group_sx4dc10/Fonction_de_la_personne_rencontr_e": "Mission de contrôle",
      //     "group_lq1gc77/Pays": "Bénin",
      //     "group_lq1gc77/Ville": "Cotonou",
      //     "group_lq1gc77/Arrondissement": "5_me",
      //     "group_lq1gc77/Quartier_concern": "Akpakpa Dodomè",
      //     "group_lq1gc77/Coordonn_es_g_ographiques_du_site": "6.3578213 2.4519644 29.299999237060547 4.747",
      //     "group_po4rn22/Nature_de_l_activit_sur_le_si": "travaux_de_construction_d_ouvrages",
      //     "group_po4rn22/Si_Travaux_de_construction_qu": "pavage_de_rues",
      //     "group_po4rn22/Si_pavage_de_rues_l_e_de_rue_pav_e_pr_vu": "300.0",
      //     "group_po4rn22/Si_pavage_de_rues_l_de_rue_pav_e_r_alis": "295.0",
      //     "group_po4rn22/Photo_du_site": "1676648739407.jpg",
      //     "__version__": "v5MaDnQaTEQdvgpgeABRKz",
      //     "meta/instanceID": "uuid:0db4064f-88de-4109-af9f-7738eb021624",
      //     "_xform_id_string": "aYN7a8XPfv5zFsNL3DGqCK",
      //     "_uuid": "0db4064f-88de-4109-af9f-7738eb021624",
      //     "_attachments": [
      //       {
      //         "download_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/220136267/attachments/97374637/",
      //         "download_large_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/220136267/attachments/97374637/",
      //         "download_medium_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/220136267/attachments/97374637/",
      //         "download_small_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/220136267/attachments/97374637/",
      //         "mimetype": "image/jpeg",
      //         "filename": "agba78/attachments/3d7703b5749b40389c5364f35d4fe09d/0db4064f-88de-4109-af9f-7738eb021624/1676648739407.jpg",
      //         "instance": 220136267,
      //         "xform": 691496,
      //         "id": 97374637
      //       }
      //     ],
      //     "_status": "submitted_via_web",
      //     "_geolocation": [
      //       6.3578213,
      //       2.4519644
      //     ],
      //     "_submission_time": "2023-02-19T19:44:40",
      //     "_tags": [],
      //     "_notes": [],
      //     "_validation_status": {},
      //     "_submitted_by": "agba78"
      //   },
      //   {
      //     "_id": 220183453,
      //     "formhub/uuid": "3d7703b5749b40389c5364f35d4fe09d",
      //     "start": "2023-02-17T17:49:09.623+01:00",
      //     "end": "2023-02-17T17:51:58.699+01:00",
      //     "group_os0ta89/Date_de_la_collecte_de_donn_es": "2023-02-17",
      //     "group_os0ta89/Nom_et_Pr_nom_de_l_agent_de_collecte": "AGBA LÉON ",
      //     "group_os0ta89/Preambule": "Bonjour. Cette collecte de données vise à avoir des informations sur les activités qui se mènent sur le terrain pour connaître le niveau d'avancement du Programme PAPC. Veuillez vous présentez s'il vous plaît.",
      //     "group_sx4dc10/Nom_de_la_personne_rencontr_e": "Gnanglè Hebert",
      //     "group_sx4dc10/Fonction_de_la_personne_rencontr_e": "Mission.de contrôle ",
      //     "group_lq1gc77/Pays": "Bénin",
      //     "group_lq1gc77/Ville": "Cotonou",
      //     "group_lq1gc77/Arrondissement": "10_me",
      //     "group_lq1gc77/Quartier_concern": "Setovi",
      //     "group_lq1gc77/Coordonn_es_g_ographiques_du_site": "6.3787892 2.3851719 33.5 3.9",
      //     "group_po4rn22/Nature_de_l_activit_sur_le_si": "travaux_de_construction_d_ouvrages",
      //     "group_po4rn22/Si_Travaux_de_construction_qu": "pavage_de_rues",
      //     "group_po4rn22/Si_pavage_de_rues_l_de_rue_pav_e_r_alis": "800.0",
      //     "group_po4rn22/Photo_du_site": "1676652702660.jpg",
      //     "__version__": "v5MaDnQaTEQdvgpgeABRKz",
      //     "meta/instanceID": "uuid:ca30c924-6d47-4ec6-b48e-14e3fc7665c8",
      //     "_xform_id_string": "aYN7a8XPfv5zFsNL3DGqCK",
      //     "_uuid": "ca30c924-6d47-4ec6-b48e-14e3fc7665c8",
      //     "_attachments": [
      //       {
      //         "download_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/220183453/attachments/97413003/",
      //         "download_large_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/220183453/attachments/97413003/",
      //         "download_medium_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/220183453/attachments/97413003/",
      //         "download_small_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/220183453/attachments/97413003/",
      //         "mimetype": "image/jpeg",
      //         "filename": "agba78/attachments/3d7703b5749b40389c5364f35d4fe09d/ca30c924-6d47-4ec6-b48e-14e3fc7665c8/1676652702660.jpg",
      //         "instance": 220183453,
      //         "xform": 691496,
      //         "id": 97413003
      //       }
      //     ],
      //     "_status": "submitted_via_web",
      //     "_geolocation": [
      //       6.3787892,
      //       2.3851719
      //     ],
      //     "_submission_time": "2023-02-20T06:45:52",
      //     "_tags": [],
      //     "_notes": [],
      //     "_validation_status": {},
      //     "_submitted_by": "agba78"
      //   }
      // ],
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
      labelData: {},
      // labelData: {
      //   "schema": "1",
      //   "survey": [
      //     {
      //       "name": "start",
      //       "type": "start",
      //       "$kuid": "fAPthhhCc",
      //       "$autoname": "start"
      //     },
      //     {
      //       "name": "end",
      //       "type": "end",
      //       "$kuid": "2hZbiAaxi",
      //       "$autoname": "end"
      //     },
      //     {
      //       "name": "group_os0ta89",
      //       "type": "begin_group",
      //       "$kuid": "gv88s18",
      //       "label": [
      //         "Informations générales"
      //       ],
      //       "required": false,
      //       "$autoname": "group_os0ta89"
      //     },
      //     {
      //       "type": "date",
      //       "$kuid": "xb3cp99",
      //       "label": [
      //         "Date de la collecte de données"
      //       ],
      //       "required": false,
      //       "$autoname": "Date_de_la_collecte_de_donn_es"
      //     },
      //     {
      //       "type": "text",
      //       "$kuid": "xn9og59",
      //       "label": [
      //         "Nom et Prénom de l'agent de collecte "
      //       ],
      //       "required": false,
      //       "$autoname": "Nom_et_Pr_nom_de_l_agent_de_collecte"
      //     },
      //     {
      //       "name": "Preambule",
      //       "type": "text",
      //       "$kuid": "dl75j52",
      //       "label": [
      //         "Préambule"
      //       ],
      //       "default": "Bonjour. Cette collecte de données vise à avoir des informations sur les activités qui se mènent sur le terrain pour connaître le niveau d'avancement du Programme PAPC. Veuillez vous présentez s'il vous plaît.",
      //       "required": true,
      //       "$autoname": "Preambule",
      //       "appearance": "multiline"
      //     },
      //     {
      //       "type": "end_group",
      //       "$kuid": "/gv88s18"
      //     },
      //     {
      //       "name": "group_sx4dc10",
      //       "type": "begin_group",
      //       "$kuid": "zq5ft59",
      //       "label": [
      //         "Informations sur la personne rencontrée sur le site"
      //       ],
      //       "required": false,
      //       "$autoname": "group_sx4dc10"
      //     },
      //     {
      //       "type": "text",
      //       "$kuid": "yz87e81",
      //       "label": [
      //         "Nom de la personne rencontrée"
      //       ],
      //       "required": false,
      //       "$autoname": "Nom_de_la_personne_rencontr_e"
      //     },
      //     {
      //       "type": "text",
      //       "$kuid": "or59p48",
      //       "label": [
      //         "Numéro de téléphone de la personne rencontrée"
      //       ],
      //       "required": false,
      //       "$autoname": "Num_ro_de_t_l_phone_personne_rencontr_e"
      //     },
      //     {
      //       "type": "text",
      //       "$kuid": "km5mi87",
      //       "label": [
      //         "Fonction de la personne rencontrée"
      //       ],
      //       "required": false,
      //       "$autoname": "Fonction_de_la_personne_rencontr_e"
      //     },
      //     {
      //       "type": "end_group",
      //       "$kuid": "/zq5ft59"
      //     },
      //     {
      //       "name": "group_lq1gc77",
      //       "type": "begin_group",
      //       "$kuid": "yt0uu95",
      //       "label": [
      //         "Localisation géographique"
      //       ],
      //       "required": false,
      //       "$autoname": "group_lq1gc77"
      //     },
      //     {
      //       "type": "text",
      //       "$kuid": "lr34s45",
      //       "label": [
      //         "Pays"
      //       ],
      //       "default": "Bénin",
      //       "required": true,
      //       "$autoname": "Pays"
      //     },
      //     {
      //       "hint": [
      //         "Cotonou pour le PAPC"
      //       ],
      //       "type": "text",
      //       "$kuid": "ik6pw08",
      //       "label": [
      //         "Ville"
      //       ],
      //       "default": "Cotonou",
      //       "required": false,
      //       "$autoname": "Ville"
      //     },
      //     {
      //       "hint": [
      //         "Préciser l'arrondissement dans lequel se déroule les activités"
      //       ],
      //       "type": "select_multiple",
      //       "$kuid": "bs7ua48",
      //       "label": [
      //         "Arrondissement"
      //       ],
      //       "required": false,
      //       "$autoname": "Arrondissement",
      //       "select_from_list_name": "xu3eg95"
      //     },
      //     {
      //       "hint": [
      //         "Préciser le quartier concerné"
      //       ],
      //       "type": "text",
      //       "$kuid": "wj0xi59",
      //       "label": [
      //         "Quartier concerné"
      //       ],
      //       "required": false,
      //       "$autoname": "Quartier_concern"
      //     },
      //     {
      //       "type": "geopoint",
      //       "$kuid": "xj9pp05",
      //       "label": [
      //         "Coordonnées géographiques du site"
      //       ],
      //       "required": false,
      //       "$autoname": "Coordonn_es_g_ographiques_du_site"
      //     },
      //     {
      //       "type": "end_group",
      //       "$kuid": "/yt0uu95"
      //     },
      //     {
      //       "name": "group_po4rn22",
      //       "type": "begin_group",
      //       "$kuid": "as0ks16",
      //       "label": [
      //         "Données sur l'état d'avancement"
      //       ],
      //       "required": false,
      //       "$autoname": "group_po4rn22"
      //     },
      //     {
      //       "name": "Nature_de_l_activit_sur_le_si",
      //       "type": "select_multiple",
      //       "$kuid": "gk2bw85",
      //       "label": [
      //         "Nature de l'activité sur le site"
      //       ],
      //       "required": false,
      //       "$autoname": "Nature_de_l_activit_sur_le_si",
      //       "select_from_list_name": "up1fz48"
      //     },
      //     {
      //       "type": "text",
      //       "$kuid": "ak7fz63",
      //       "label": [
      //         "Si autres, veuillez préciser"
      //       ],
      //       "relevant": "selected(${Nature_de_l_activit_sur_le_si}, 'autres___pr_ciser')",
      //       "required": false,
      //       "$autoname": "Si_autres_veuillez_pr_ciser"
      //     },
      //     {
      //       "type": "integer",
      //       "$kuid": "dc0cw68",
      //       "label": [
      //         "Si IEC, sensibilisation et mobilisation sociale, nombre de participants hommes"
      //       ],
      //       "relevant": "selected(${Nature_de_l_activit_sur_le_si}, 'iec__sensibilisation__mobilisation_socia')",
      //       "required": false,
      //       "$autoname": "Si_IEC_sensibilisat_participants_hommes"
      //     },
      //     {
      //       "type": "integer",
      //       "$kuid": "be46f42",
      //       "label": [
      //         "Si IEC, sensibilisation et mobilisation sociale, nombre de participants femmes"
      //       ],
      //       "relevant": "selected(${Nature_de_l_activit_sur_le_si}, 'iec__sensibilisation__mobilisation_socia')",
      //       "required": false,
      //       "$autoname": "Si_IEC_sensibilisat_participants_femmes"
      //     },
      //     {
      //       "name": "Si_Travaux_de_construction_qu",
      //       "type": "select_multiple",
      //       "$kuid": "dd31y22",
      //       "label": [
      //         "Si Travaux de construction, quel type d'ouvrage?"
      //       ],
      //       "relevant": "selected(${Nature_de_l_activit_sur_le_si}, 'travaux_de_construction_d_ouvrages')",
      //       "required": false,
      //       "$autoname": "Si_Travaux_de_construction_qu",
      //       "select_from_list_name": "pf8bf81"
      //     },
      //     {
      //       "hint": [
      //         "Donner le nom de l'ouvrage (pont, mur, clôture, bâtiment, etc.)"
      //       ],
      //       "name": "Si_autre_type_d_ouvrage_veuil",
      //       "type": "text",
      //       "$kuid": "te4su57",
      //       "label": [
      //         "Si autre type d'ouvrage, veuillez préciser"
      //       ],
      //       "relevant": "selected(${Si_Travaux_de_construction_qu}, 'autre_type_d_ouvrage___pr_ciser')",
      //       "required": false,
      //       "$autoname": "Si_autre_type_d_ouvrage_veuil"
      //     },
      //     {
      //       "hint": [
      //         "Préciser ici: 1- la quantité prévue; 2: la quantité réalisée avec l'unité de mesure correspondante"
      //       ],
      //       "type": "text",
      //       "$kuid": "rj96l08",
      //       "label": [
      //         "Informations sur l'ouvrage"
      //       ],
      //       "relevant": "${Si_autre_type_d_ouvrage_veuil} != ''",
      //       "required": false,
      //       "$autoname": "Informations_sur_l_ouvrage"
      //     },
      //     {
      //       "hint": [
      //         "Exprimé en mètre linéaire"
      //       ],
      //       "type": "decimal",
      //       "$kuid": "su7ei00",
      //       "label": [
      //         "Si canniveaux, longueur de canniveaux prévus"
      //       ],
      //       "relevant": "selected(${Si_Travaux_de_construction_qu}, 'canniveaux')",
      //       "required": false,
      //       "$autoname": "Si_canniveaux_longu_de_canniveaux_pr_vus"
      //     },
      //     {
      //       "hint": [
      //         "Exprimé en mètre linéaire"
      //       ],
      //       "type": "decimal",
      //       "$kuid": "vj8qh58",
      //       "label": [
      //         "Si canniveaux, longueur de canniveaux réalisés"
      //       ],
      //       "relevant": "selected(${Si_Travaux_de_construction_qu}, 'canniveaux')",
      //       "required": false,
      //       "$autoname": "Si_canniveaux_longu_canniveaux_r_alis_s"
      //     },
      //     {
      //       "hint": [
      //         "Exprimé en mètre cube"
      //       ],
      //       "type": "decimal",
      //       "$kuid": "rp84d03",
      //       "label": [
      //         "Si bassin de rétention, volume du bassin réalisé"
      //       ],
      //       "relevant": "selected(${Si_Travaux_de_construction_qu}, 'bassin_de_r_tention')",
      //       "required": false,
      //       "$autoname": "Si_bassin_de_r_tenti_ume_du_bassin_r_alis"
      //     },
      //     {
      //       "hint": [
      //         "Exprimé en mètre cube"
      //       ],
      //       "type": "decimal",
      //       "$kuid": "zy5us94",
      //       "label": [
      //         "Si bassin de rétention, volume du bassin prévu"
      //       ],
      //       "relevant": "selected(${Si_Travaux_de_construction_qu}, 'bassin_de_r_tention')",
      //       "required": false,
      //       "$autoname": "Si_bassin_de_r_tenti_lume_du_bassin_pr_vu"
      //     },
      //     {
      //       "hint": [
      //         "Exprimé en mètre linéaire"
      //       ],
      //       "type": "decimal",
      //       "$kuid": "ak3hk71",
      //       "label": [
      //         "Si collecteur, longueur de collecteur prévu"
      //       ],
      //       "relevant": "selected(${Si_Travaux_de_construction_qu}, 'collecteur')",
      //       "required": false,
      //       "$autoname": "Si_collecteur_longu_de_collecteur_pr_vu"
      //     },
      //     {
      //       "hint": [
      //         "Exprimé en mètre linéaire"
      //       ],
      //       "type": "decimal",
      //       "$kuid": "ix5ry26",
      //       "label": [
      //         "Si collecteur, longueur de collecteur construit"
      //       ],
      //       "relevant": "selected(${Si_Travaux_de_construction_qu}, 'collecteur')",
      //       "required": false,
      //       "$autoname": "Si_collecteur_longu_collecteur_construit"
      //     },
      //     {
      //       "hint": [
      //         "Exprimé en mètre linéaire"
      //       ],
      //       "type": "decimal",
      //       "$kuid": "rx0ub58",
      //       "label": [
      //         "Si pavage de rues, linéaire de rue pavée prévu"
      //       ],
      //       "relevant": "selected(${Si_Travaux_de_construction_qu}, 'pavage_de_rues')",
      //       "required": false,
      //       "$autoname": "Si_pavage_de_rues_l_e_de_rue_pav_e_pr_vu"
      //     },
      //     {
      //       "type": "decimal",
      //       "$kuid": "ro32l72",
      //       "label": [
      //         "Si pavage de rues, linéaire de rue pavée réalisé"
      //       ],
      //       "relevant": "selected(${Si_Travaux_de_construction_qu}, 'pavage_de_rues')",
      //       "required": false,
      //       "$autoname": "Si_pavage_de_rues_l_de_rue_pav_e_r_alis"
      //     },
      //     {
      //       "type": "integer",
      //       "$kuid": "ok0li62",
      //       "label": [
      //         "Si activités Plan de Gestion Environnementale et Sociale (PGES), quantité d'arbres plantés"
      //       ],
      //       "relevant": "selected(${Nature_de_l_activit_sur_le_si}, 'activit_s_de_pges')",
      //       "required": false,
      //       "$autoname": "Si_activit_s_Plan_de_it_d_arbres_plant_s"
      //     },
      //     {
      //       "type": "integer",
      //       "$kuid": "kw2ec05",
      //       "label": [
      //         "Si activités Plan de Gestion Environnementale et Sociale (PGES), nombre de bacs à ordures installés"
      //       ],
      //       "relevant": "selected(${Nature_de_l_activit_sur_le_si}, 'activit_s_de_pges')",
      //       "required": false,
      //       "$autoname": "Si_activit_s_Plan_de_ordures_install_s"
      //     },
      //     {
      //       "type": "decimal",
      //       "$kuid": "go7ev15",
      //       "label": [
      //         "Si collecte de déchets, taux de collecte prévu"
      //       ],
      //       "relevant": "selected(${Nature_de_l_activit_sur_le_si}, 'collecte_de_d_chets')",
      //       "required": false,
      //       "$autoname": "Si_collecte_de_d_che_ux_de_collecte_pr_vu"
      //     },
      //     {
      //       "type": "decimal",
      //       "$kuid": "fx0ab43",
      //       "label": [
      //         "Si collecte de déchets, taux de collecte réalisé"
      //       ],
      //       "relevant": "selected(${Nature_de_l_activit_sur_le_si}, 'collecte_de_d_chets')",
      //       "required": false,
      //       "$autoname": "Si_collecte_de_d_che_x_de_collecte_r_alis"
      //     },
      //     {
      //       "hint": [
      //         "Prendre une photo du site où se déroule l'activité. L'image doit refléter l'activité qui s'y mène "
      //       ],
      //       "type": "image",
      //       "$kuid": "tl3sp35",
      //       "label": [
      //         "Photo du site"
      //       ],
      //       "required": false,
      //       "$autoname": "Photo_du_site",
      //       "parameters": "max-pixels=1024"
      //     },
      //     {
      //       "type": "end_group",
      //       "$kuid": "/as0ks16"
      //     }
      //   ],
      //   "choices": [
      //     {
      //       "name": "1er",
      //       "$kuid": "TF2YtVJ3J",
      //       "label": [
      //         "1er"
      //       ],
      //       "list_name": "xu3eg95",
      //       "$autovalue": "1er"
      //     },
      //     {
      //       "name": "2_me",
      //       "$kuid": "g8HUaebGq",
      //       "label": [
      //         "2ème"
      //       ],
      //       "list_name": "xu3eg95",
      //       "$autovalue": "2_me"
      //     },
      //     {
      //       "name": "3_me",
      //       "$kuid": "En34jgqWT",
      //       "label": [
      //         "3ème"
      //       ],
      //       "list_name": "xu3eg95",
      //       "$autovalue": "3_me"
      //     },
      //     {
      //       "name": "4_me",
      //       "$kuid": "1FnfYfwD4",
      //       "label": [
      //         "4ème"
      //       ],
      //       "list_name": "xu3eg95",
      //       "$autovalue": "4_me"
      //     },
      //     {
      //       "name": "5_me",
      //       "$kuid": "Z5IbatIFJ",
      //       "label": [
      //         "5ème"
      //       ],
      //       "list_name": "xu3eg95",
      //       "$autovalue": "5_me"
      //     },
      //     {
      //       "name": "6_me",
      //       "$kuid": "yL9WrrAZo",
      //       "label": [
      //         "6ème"
      //       ],
      //       "list_name": "xu3eg95",
      //       "$autovalue": "6_me"
      //     },
      //     {
      //       "name": "7_me",
      //       "$kuid": "QDptZc8E7",
      //       "label": [
      //         "7ème"
      //       ],
      //       "list_name": "xu3eg95",
      //       "$autovalue": "7_me"
      //     },
      //     {
      //       "name": "8_me",
      //       "$kuid": "J4JGtxuUp",
      //       "label": [
      //         "8ème"
      //       ],
      //       "list_name": "xu3eg95",
      //       "$autovalue": "8_me"
      //     },
      //     {
      //       "name": "9_me",
      //       "$kuid": "LH44GVDDy",
      //       "label": [
      //         "9ème"
      //       ],
      //       "list_name": "xu3eg95",
      //       "$autovalue": "9_me"
      //     },
      //     {
      //       "name": "10_me",
      //       "$kuid": "8BVIY1Sdc",
      //       "label": [
      //         "10ème"
      //       ],
      //       "list_name": "xu3eg95",
      //       "$autovalue": "10_me"
      //     },
      //     {
      //       "name": "11_me",
      //       "$kuid": "kbNSctXhx",
      //       "label": [
      //         "11ème"
      //       ],
      //       "list_name": "xu3eg95",
      //       "$autovalue": "11_me"
      //     },
      //     {
      //       "name": "12_me",
      //       "$kuid": "EgLDEYFgc",
      //       "label": [
      //         "12ème"
      //       ],
      //       "list_name": "xu3eg95",
      //       "$autovalue": "12_me"
      //     },
      //     {
      //       "name": "13_me",
      //       "$kuid": "NAAAluqvH",
      //       "label": [
      //         "13ème"
      //       ],
      //       "list_name": "xu3eg95",
      //       "$autovalue": "13_me"
      //     },
      //     {
      //       "name": "iec__sensibilisation__mobilisation_socia",
      //       "$kuid": "1cpJsXH1D",
      //       "label": [
      //         "IEC, sensibilisation et mobilisation sociale"
      //       ],
      //       "order": 0,
      //       "list_name": "up1fz48",
      //       "$autovalue": "iec__sensibilisation__mobilisation_socia"
      //     },
      //     {
      //       "name": "travaux_de_construction_d_ouvrages",
      //       "$kuid": "DdLqOJhg3",
      //       "label": [
      //         "Travaux de construction d'ouvrages"
      //       ],
      //       "order": 1,
      //       "list_name": "up1fz48",
      //       "$autovalue": "travaux_de_construction_d_ouvrages"
      //     },
      //     {
      //       "name": "activit_s_de_pges",
      //       "$kuid": "B2Z3cFizP",
      //       "label": [
      //         "Activités de Plan de Gestion Environnementale et Sociale (PGES)"
      //       ],
      //       "order": 2,
      //       "list_name": "up1fz48",
      //       "$autovalue": "activit_s_de_pges"
      //     },
      //     {
      //       "name": "collecte_de_d_chets",
      //       "$kuid": "b5vwFPiCM",
      //       "label": [
      //         "Collecte de déchets"
      //       ],
      //       "order": 3,
      //       "list_name": "up1fz48",
      //       "$autovalue": "collecte_de_d_chets"
      //     },
      //     {
      //       "name": "autres___pr_ciser",
      //       "$kuid": "y6fzNWnk6",
      //       "label": [
      //         "Autres"
      //       ],
      //       "order": 4,
      //       "list_name": "up1fz48",
      //       "$autovalue": "autres___pr_ciser"
      //     },
      //     {
      //       "name": "canniveaux",
      //       "$kuid": "5XSYSTacA",
      //       "label": [
      //         "Canniveaux"
      //       ],
      //       "list_name": "pf8bf81",
      //       "$autovalue": "canniveaux"
      //     },
      //     {
      //       "name": "bassin_de_r_tention",
      //       "$kuid": "1tgg9NhBz",
      //       "label": [
      //         "Bassin de rétention"
      //       ],
      //       "list_name": "pf8bf81",
      //       "$autovalue": "bassin_de_r_tention"
      //     },
      //     {
      //       "name": "collecteur",
      //       "$kuid": "WkpGv81Yu",
      //       "label": [
      //         "Collecteurs"
      //       ],
      //       "list_name": "pf8bf81",
      //       "$autovalue": "collecteur"
      //     },
      //     {
      //       "name": "pavage_de_rues",
      //       "$kuid": "5NcB5zOLA",
      //       "label": [
      //         "Pavage de rues"
      //       ],
      //       "list_name": "pf8bf81",
      //       "$autovalue": "pavage_de_rues"
      //     },
      //     {
      //       "name": "autre_type_d_ouvrage___pr_ciser",
      //       "$kuid": "Wa9dXEfc5",
      //       "label": [
      //         "Autre type d'ouvrage"
      //       ],
      //       "list_name": "pf8bf81",
      //       "$autovalue": "autre_type_d_ouvrage___pr_ciser"
      //     }
      //   ],
      //   "settings": {},
      //   "translated": [
      //     "hint",
      //     "label"
      //   ],
      //   "translations": [
      //     null
      //   ]
      // },
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


    // this.souscription = this.copyKeyInArray(this.souscription)

    // var tab = []

    // this.souscription.forEach((objet) => {
    //   // crée un nouvel objet pour stocker les clés mises à jour
    //   const nouvelObjet = {};

    //   // boucle sur les clés de l'objet en cours
    //   for (const cle in objet) {
    //     // supprime le caractère "_" de la clé
    //     const nouvelleCle = cle.replace("_", "");

    //     // ajoute la clé et la valeur dans le nouvel objet
    //     nouvelObjet[nouvelleCle] = objet[cle];
    //   }

    //   // remplace l'objet original par le nouvel objet avec les clés mises à jour

    //   tab.push(nouvelObjet)

    // });

    // this.souscription = tab;

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

      var tab = []

      this.souscription.forEach((objet) => {
        // crée un nouvel objet pour stocker les clés mises à jour
        const nouvelObjet = {};

        // boucle sur les clés de l'objet en cours
        for (const cle in objet) {
          // supprime le caractère "_" de la clé
          const nouvelleCle = cle.replace("_", "");

          // ajoute la clé et la valeur dans le nouvel objet
          nouvelObjet[nouvelleCle] = objet[cle];
        }

        // remplace l'objet original par le nouvel objet avec les clés mises à jour

        tab.push(nouvelObjet)

      });

      this.souscription = tab;
      console.log(this.souscription)

      this.response = this.souscription

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


      return newArr;
    },

    arranger(newData) {



    }


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