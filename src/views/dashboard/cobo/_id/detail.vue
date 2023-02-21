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

        <div class=" flex">
          <input placeholder="Date debut" v-model="date.dateDebut" class="m-3" type="date">
          <input placeholder="Date fin" v-model="date.dateFin" class="m-3" type="date">
          <button @click="recherche" class="clr text-white p-3 "> Rechercher </button>
        </div>

      </nav>

      <div class="border-b-2 border-blue-500 mx-4 mb-8 relative p-4">
        <span
          class="font-bold absolute clr bg-blue-500 px-4 py-1 text-white border-2 border-blue-500 rounded-lg uppercase">
          <span class="  p-1 rounded-md">Titre:</span> {{ nom_questionnaire }} </span>
      </div>
    </div>

    <div class="w-full bg-white border-grey-light border mT-2" v-for=" (item, index ) in souscription" :key="index">
      <accordion :title="'Soumission du ' + new Date(item._submission_time)">
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

    <h1 class="m-2 text-xl"> Résultat de la recherche</h1>

    <div  class="w-full bg-white border-grey-light border mT-2" v-for=" (item, index2 ) in filtre"
      :key="index2">
      <accordion :title="'Soumission du ' + new Date(item._submission_time)">
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
    <div>
      <pre>{{ souscription }}</pre>
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
      search: "",
      searching: false,
      souscription:
        [
          {
            "_id": 99320683,
            "_notes": [],
            "_uuid": "6bbf49af-cdfb-488e-a381-d7f1eb8e412f",
            "group_sx4dc10/Fonction_de_la_personne_rencontr_e": "Maçon",
            "_validation_status": {},
            "_xform_id_string": "aYN7a8XPfv5zFsNL3DGqCK",
            "group_lq1gc77/Coordonn_es_g_ographiques_du_site": "6.36661 2.397079 0 0",
            "group_os0ta89/Preambule": "Bonjour. Cette collecte de données vise à avoir des informations sur les activités qui se mènent sur le terrain pour connaître le niveau d'avancement du Programme PAPC. Veuillez vous présentez s'il vous plaît.",
            "_submitted_by": null,
            "group_lq1gc77/Arrondissement": "4_me",
            "group_lq1gc77/Ville": "Cotonou",
            "group_po4rn22/Si_IEC_sensibilisat_participants_femmes": "45",
            "group_po4rn22/Nature_de_l_activit_sur_le_si": "iec__sensibilisation__mobilisation_socia",
            "meta/instanceID": "uuid:6bbf49af-cdfb-488e-a381-d7f1eb8e412f",
            "group_os0ta89/Date_de_la_collecte_de_donn_es": "2021-06-07",
            "formhub/uuid": "3d7703b5749b40389c5364f35d4fe09d",
            "group_lq1gc77/Quartier_concern": "Sodjatimè",
            "group_lq1gc77/Pays": "Bénin",
            "end": "2021-06-07T09:36:25.412+02:00",
            "group_po4rn22/Photo_du_site": "DSC_2729-scaled-9_36_12.jpg",
            "group_os0ta89/Nom_et_Pr_nom_de_l_agent_de_collecte": "AGBA Léon",
            "group_po4rn22/Si_IEC_sensibilisat_participants_hommes": "30",
            "_attachments": [
              {
                "mimetype": "image/jpeg",
                "download_small_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/99320683/attachments/36502530/",
                "download_large_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/99320683/attachments/36502530/",
                "download_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/99320683/attachments/36502530/",
                "filename": "agba78/attachments/3d7703b5749b40389c5364f35d4fe09d/6bbf49af-cdfb-488e-a381-d7f1eb8e412f/DSC_2729-scaled-9_36_12.jpg",
                "instance": 99320683,
                "download_medium_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/99320683/attachments/36502530/",
                "id": 36502530,
                "xform": 691496
              }
            ],
            "start": "2021-06-07T09:26:37.244+02:00",
            "group_sx4dc10/Nom_de_la_personne_rencontr_e": "DOSSOU Jean",
            "group_sx4dc10/Num_ro_de_t_l_phone_personne_rencontr_e": "+22996030456",
            "_geolocation": [
              6.36661,
              2.397079
            ],
            "_submission_time": "2021-06-07T07:36:44",
            "_status": "submitted_via_web",
            "__version__": "v5MaDnQaTEQdvgpgeABRKz",
            "_tags": []
          },
          {
            "_id": 99322282,
            "_notes": [],
            "group_po4rn22/Si_collecteur_longu_collecteur_construit": "200",
            "group_sx4dc10/Fonction_de_la_personne_rencontr_e": "Entrepreneur BTP",
            "_validation_status": {},
            "_uuid": "9e8e851d-dbe1-4fc6-b4e4-f9c4f6c92219",
            "group_lq1gc77/Coordonn_es_g_ographiques_du_site": "6.34293 2.407522 0 0",
            "group_os0ta89/Preambule": "Bonjour. Cette collecte de données vise à avoir des informations sur les activités qui se mènent sur le terrain pour connaître le niveau d'avancement du Programme PAPC. Veuillez vous présentez s'il vous plaît.",
            "_submission_time": "2021-06-07T07:50:59",
            "_submitted_by": null,
            "group_lq1gc77/Arrondissement": "12_me",
            "group_lq1gc77/Ville": "Cotonou",
            "_xform_id_string": "aYN7a8XPfv5zFsNL3DGqCK",
            "group_po4rn22/Nature_de_l_activit_sur_le_si": "travaux_de_construction_d_ouvrages",
            "meta/instanceID": "uuid:9e8e851d-dbe1-4fc6-b4e4-f9c4f6c92219",
            "group_os0ta89/Date_de_la_collecte_de_donn_es": "2021-06-07",
            "group_po4rn22/Si_collecteur_longu_de_collecteur_pr_vu": "2000",
            "formhub/uuid": "3d7703b5749b40389c5364f35d4fe09d",
            "group_lq1gc77/Quartier_concern": "Aïbatin",
            "group_lq1gc77/Pays": "Bénin",
            "end": "2021-06-07T09:50:44.136+02:00",
            "group_po4rn22/Photo_du_site": "DSC_2729-scaled-9_50_36.jpg",
            "group_os0ta89/Nom_et_Pr_nom_de_l_agent_de_collecte": "AGBA Léon",
            "group_po4rn22/Si_Travaux_de_construction_qu": "collecteur",
            "start": "2021-06-07T09:36:25.561+02:00",
            "group_sx4dc10/Nom_de_la_personne_rencontr_e": "Koffan Dieudonnée",
            "group_sx4dc10/Num_ro_de_t_l_phone_personne_rencontr_e": "+22966322145",
            "_geolocation": [
              6.34293,
              2.407522
            ],
            "_attachments": [
              {
                "mimetype": "image/jpeg",
                "download_small_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/99322282/attachments/36503405/",
                "download_large_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/99322282/attachments/36503405/",
                "download_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/99322282/attachments/36503405/",
                "filename": "agba78/attachments/3d7703b5749b40389c5364f35d4fe09d/9e8e851d-dbe1-4fc6-b4e4-f9c4f6c92219/DSC_2729-scaled-9_50_36.jpg",
                "instance": 99322282,
                "download_medium_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/99322282/attachments/36503405/",
                "id": 36503405,
                "xform": 691496
              }
            ],
            "_status": "submitted_via_web",
            "__version__": "v5MaDnQaTEQdvgpgeABRKz",
            "_tags": []
          },
          {
            "_id": 99325977,
            "_notes": [],
            "group_sx4dc10/Fonction_de_la_personne_rencontr_e": "Contrôleur de chantier",
            "_validation_status": {},
            "_uuid": "cd502ce3-2802-42bd-a5e7-9ea8eba5241a",
            "group_po4rn22/Si_Travaux_de_construction_qu": "bassin_de_r_tention",
            "group_os0ta89/Preambule": "Bonjour. Cette collecte de données vise à avoir des informations sur les activités qui se mènent sur le terrain pour connaître le niveau d'avancement du Programme PAPC. Veuillez vous présentez s'il vous plaît.",
            "group_po4rn22/Si_bassin_de_r_tenti_lume_du_bassin_pr_vu": "86",
            "_submitted_by": null,
            "group_lq1gc77/Arrondissement": "4_me",
            "group_lq1gc77/Ville": "Cotonou",
            "_xform_id_string": "aYN7a8XPfv5zFsNL3DGqCK",
            "group_po4rn22/Nature_de_l_activit_sur_le_si": "travaux_de_construction_d_ouvrages activit_s_de_pges",
            "meta/instanceID": "uuid:cd502ce3-2802-42bd-a5e7-9ea8eba5241a",
            "group_os0ta89/Nom_et_Pr_nom_de_l_agent_de_collecte": "AGBA Léon",
            "_status": "submitted_via_web",
            "group_po4rn22/Photo_du_site": "DSC_2729-scaled-10_18_52.jpg",
            "group_lq1gc77/Quartier_concern": "Enagnon",
            "group_lq1gc77/Pays": "Bénin",
            "__version__": "v5MaDnQaTEQdvgpgeABRKz",
            "end": "2021-06-07T10:18:56.534+02:00",
            "group_lq1gc77/Coordonn_es_g_ographiques_du_site": "6.371225 2.393401 0 0",
            "group_os0ta89/Date_de_la_collecte_de_donn_es": "2021-06-07",
            "group_sx4dc10/Nom_de_la_personne_rencontr_e": "AGOSSOU Bienvenu",
            "_attachments": [
              {
                "mimetype": "image/jpeg",
                "download_small_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/99325977/attachments/36505596/",
                "download_large_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/99325977/attachments/36505596/",
                "download_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/99325977/attachments/36505596/",
                "filename": "agba78/attachments/3d7703b5749b40389c5364f35d4fe09d/cd502ce3-2802-42bd-a5e7-9ea8eba5241a/DSC_2729-scaled-10_18_52.jpg",
                "instance": 99325977,
                "download_medium_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/99325977/attachments/36505596/",
                "id": 36505596,
                "xform": 691496
              }
            ],
            "start": "2021-06-07T09:50:44.294+02:00",
            "group_po4rn22/Si_activit_s_Plan_de_it_d_arbres_plant_s": "463",
            "group_sx4dc10/Num_ro_de_t_l_phone_personne_rencontr_e": "+22970020568",
            "_geolocation": [
              6.371225,
              2.393401
            ],
            "_submission_time": "2021-06-07T08:19:10",
            "group_po4rn22/Si_bassin_de_r_tenti_ume_du_bassin_r_alis": "500",
            "group_po4rn22/Si_activit_s_Plan_de_ordures_install_s": "49",
            "formhub/uuid": "3d7703b5749b40389c5364f35d4fe09d",
            "_tags": []
          },
          {
            "_id": 99599521,
            "_notes": [],
            "_uuid": "ca45e3f7-4f27-41f5-adc6-8f0d69d6b2a8",
            "group_sx4dc10/Fonction_de_la_personne_rencontr_e": "Agent de la mairie",
            "_validation_status": {},
            "_xform_id_string": "aYN7a8XPfv5zFsNL3DGqCK",
            "group_po4rn22/Si_Travaux_de_construction_qu": "canniveaux autre_type_d_ouvrage___pr_ciser",
            "group_os0ta89/Preambule": "Bonjour. Cette collecte de données vise à avoir des informations sur les activités qui se mènent sur le terrain pour connaître le niveau d'avancement du Programme PAPC. Veuillez vous présentez s'il vous plaît.",
            "_submitted_by": "agba78",
            "group_lq1gc77/Arrondissement": "5_me",
            "group_lq1gc77/Ville": "Cotonou",
            "group_po4rn22/Si_autre_type_d_ouvrage_veuil": "Mur",
            "group_po4rn22/Nature_de_l_activit_sur_le_si": "travaux_de_construction_d_ouvrages",
            "meta/instanceID": "uuid:ca45e3f7-4f27-41f5-adc6-8f0d69d6b2a8",
            "group_os0ta89/Nom_et_Pr_nom_de_l_agent_de_collecte": "AGBA Léon",
            "group_po4rn22/Photo_du_site": "1623169469605.jpg",
            "group_po4rn22/Si_canniveaux_longu_de_canniveaux_pr_vus": "65.0",
            "group_lq1gc77/Quartier_concern": "Enagnon",
            "group_lq1gc77/Pays": "Bénin",
            "__version__": "v5MaDnQaTEQdvgpgeABRKz",
            "end": "2021-06-08T17:24:51.108+01:00",
            "group_lq1gc77/Coordonn_es_g_ographiques_du_site": "6.3458059 2.4035749 27.154179422859077 20.0",
            "_submission_time": "2021-06-08T16:24:55",
            "group_os0ta89/Date_de_la_collecte_de_donn_es": "2021-06-08",
            "group_po4rn22/Si_canniveaux_longu_canniveaux_r_alis_s": "53.0",
            "group_po4rn22/Informations_sur_l_ouvrage": "Prévue :2 Réalisée : 1",
            "start": "2021-06-08T17:21:15.323+01:00",
            "group_sx4dc10/Nom_de_la_personne_rencontr_e": "AGODO Fabrice",
            "group_sx4dc10/Num_ro_de_t_l_phone_personne_rencontr_e": "97807644",
            "_geolocation": [
              6.3458059,
              2.4035749
            ],
            "_attachments": [
              {
                "mimetype": "image/jpeg",
                "download_small_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/99599521/attachments/36660834/",
                "download_large_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/99599521/attachments/36660834/",
                "download_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/99599521/attachments/36660834/",
                "filename": "agba78/attachments/3d7703b5749b40389c5364f35d4fe09d/ca45e3f7-4f27-41f5-adc6-8f0d69d6b2a8/1623169469605.jpg",
                "instance": 99599521,
                "download_medium_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/99599521/attachments/36660834/",
                "id": 36660834,
                "xform": 691496
              }
            ],
            "_status": "submitted_via_web",
            "formhub/uuid": "3d7703b5749b40389c5364f35d4fe09d",
            "_tags": []
          },
          {
            "_id": 101574285,
            "start": "2021-06-08T14:27:53.832+01:00",
            "end": "2022-10-26T18:07:30.528+01:00",
            "group_os0ta89/Date_de_la_collecte_de_donn_es": "2021-06-21",
            "group_os0ta89/Nom_et_Pr_nom_de_l_agent_de_collecte": "AGBA Léon",
            "group_os0ta89/Preambule": "Bonjour. Cette collecte de données vise à avoir des informations sur les activités qui se mènent sur le terrain pour connaître le niveau d'avancement du Programme PAPC. Veuillez vous présentez s'il vous plaît.",
            "group_sx4dc10/Nom_de_la_personne_rencontr_e": "AGBOTON Fabrice",
            "group_sx4dc10/Num_ro_de_t_l_phone_personne_rencontr_e": "96044556",
            "group_sx4dc10/Fonction_de_la_personne_rencontr_e": "Chef Chantier",
            "group_lq1gc77/Pays": "Bénin",
            "group_lq1gc77/Ville": "Cotonou",
            "group_lq1gc77/Arrondissement": "8_me",
            "group_lq1gc77/Quartier_concern": "Gbèdjromèdé",
            "group_lq1gc77/Coordonn_es_g_ographiques_du_site": "6.382928 2.416277 0 0",
            "group_po4rn22/Nature_de_l_activit_sur_le_si": "iec__sensibilisation__mobilisation_socia",
            "group_po4rn22/Si_IEC_sensibilisat_participants_hommes": "45",
            "group_po4rn22/Si_IEC_sensibilisat_participants_femmes": "66",
            "group_po4rn22/Photo_du_site": "Photo visite collecteur Y-18_7_24.jpg",
            "meta/instanceID": "uuid:13145aea-6e86-4aaa-8ad3-03a87b4933de",
            "meta/deprecatedID": "uuid:b259e5b7-ebd0-49db-ac57-ed2357aef48e",
            "formhub/uuid": "3d7703b5749b40389c5364f35d4fe09d",
            "__version__": "v5MaDnQaTEQdvgpgeABRKz",
            "_xform_id_string": "aYN7a8XPfv5zFsNL3DGqCK",
            "_uuid": "13145aea-6e86-4aaa-8ad3-03a87b4933de",
            "_attachments": [
              {
                "download_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/101574285/attachments/83664875/",
                "download_large_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/101574285/attachments/83664875/",
                "download_medium_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/101574285/attachments/83664875/",
                "download_small_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/101574285/attachments/83664875/",
                "mimetype": "image/jpeg",
                "filename": "agba78/attachments/3d7703b5749b40389c5364f35d4fe09d/13145aea-6e86-4aaa-8ad3-03a87b4933de/Photo_visite_collecteur_Y-18_7_24.jpg",
                "instance": 101574285,
                "xform": 691496,
                "id": 83664875
              },
              {
                "download_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/101574285/attachments/37649617/",
                "download_large_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/101574285/attachments/37649617/",
                "download_medium_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/101574285/attachments/37649617/",
                "download_small_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/101574285/attachments/37649617/",
                "mimetype": "image/jpeg",
                "filename": "agba78/attachments/3d7703b5749b40389c5364f35d4fe09d/b259e5b7-ebd0-49db-ac57-ed2357aef48e/Cotonou-9_57_50.jpg",
                "instance": 101574285,
                "xform": 691496,
                "id": 37649617
              }
            ],
            "_status": "submitted_via_web",
            "_geolocation": [
              6.382928,
              2.416277
            ],
            "_submission_time": "2021-06-21T08:58:03",
            "_tags": [],
            "_notes": [],
            "_validation_status": {},
            "_submitted_by": null
          },
          {
            "_id": 220136267,
            "formhub/uuid": "3d7703b5749b40389c5364f35d4fe09d",
            "start": "2023-02-17T16:42:59.670+01:00",
            "end": "2023-02-17T16:48:20.112+01:00",
            "group_os0ta89/Date_de_la_collecte_de_donn_es": "2023-02-17",
            "group_os0ta89/Nom_et_Pr_nom_de_l_agent_de_collecte": "Agba Léon",
            "group_os0ta89/Preambule": "Bonjour. Cette collecte de données vise à avoir des informations sur les activités qui se mènent sur le terrain pour connaître le niveau d'avancement du Programme PAPC. Veuillez vous présentez s'il vous plaît.",
            "group_sx4dc10/Nom_de_la_personne_rencontr_e": "GNANGLE Hebert",
            "group_sx4dc10/Fonction_de_la_personne_rencontr_e": "Mission de contrôle",
            "group_lq1gc77/Pays": "Bénin",
            "group_lq1gc77/Ville": "Cotonou",
            "group_lq1gc77/Arrondissement": "5_me",
            "group_lq1gc77/Quartier_concern": "Akpakpa Dodomè",
            "group_lq1gc77/Coordonn_es_g_ographiques_du_site": "6.3578213 2.4519644 29.299999237060547 4.747",
            "group_po4rn22/Nature_de_l_activit_sur_le_si": "travaux_de_construction_d_ouvrages",
            "group_po4rn22/Si_Travaux_de_construction_qu": "pavage_de_rues",
            "group_po4rn22/Si_pavage_de_rues_l_e_de_rue_pav_e_pr_vu": "300.0",
            "group_po4rn22/Si_pavage_de_rues_l_de_rue_pav_e_r_alis": "295.0",
            "group_po4rn22/Photo_du_site": "1676648739407.jpg",
            "__version__": "v5MaDnQaTEQdvgpgeABRKz",
            "meta/instanceID": "uuid:0db4064f-88de-4109-af9f-7738eb021624",
            "_xform_id_string": "aYN7a8XPfv5zFsNL3DGqCK",
            "_uuid": "0db4064f-88de-4109-af9f-7738eb021624",
            "_attachments": [
              {
                "download_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/220136267/attachments/97374637/",
                "download_large_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/220136267/attachments/97374637/",
                "download_medium_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/220136267/attachments/97374637/",
                "download_small_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/220136267/attachments/97374637/",
                "mimetype": "image/jpeg",
                "filename": "agba78/attachments/3d7703b5749b40389c5364f35d4fe09d/0db4064f-88de-4109-af9f-7738eb021624/1676648739407.jpg",
                "instance": 220136267,
                "xform": 691496,
                "id": 97374637
              }
            ],
            "_status": "submitted_via_web",
            "_geolocation": [
              6.3578213,
              2.4519644
            ],
            "_submission_time": "2023-02-19T19:44:40",
            "_tags": [],
            "_notes": [],
            "_validation_status": {},
            "_submitted_by": "agba78"
          },
          {
            "_id": 220183453,
            "formhub/uuid": "3d7703b5749b40389c5364f35d4fe09d",
            "start": "2023-02-17T17:49:09.623+01:00",
            "end": "2023-02-17T17:51:58.699+01:00",
            "group_os0ta89/Date_de_la_collecte_de_donn_es": "2023-02-17",
            "group_os0ta89/Nom_et_Pr_nom_de_l_agent_de_collecte": "AGBA LÉON ",
            "group_os0ta89/Preambule": "Bonjour. Cette collecte de données vise à avoir des informations sur les activités qui se mènent sur le terrain pour connaître le niveau d'avancement du Programme PAPC. Veuillez vous présentez s'il vous plaît.",
            "group_sx4dc10/Nom_de_la_personne_rencontr_e": "Gnanglè Hebert",
            "group_sx4dc10/Fonction_de_la_personne_rencontr_e": "Mission.de contrôle ",
            "group_lq1gc77/Pays": "Bénin",
            "group_lq1gc77/Ville": "Cotonou",
            "group_lq1gc77/Arrondissement": "10_me",
            "group_lq1gc77/Quartier_concern": "Setovi",
            "group_lq1gc77/Coordonn_es_g_ographiques_du_site": "6.3787892 2.3851719 33.5 3.9",
            "group_po4rn22/Nature_de_l_activit_sur_le_si": "travaux_de_construction_d_ouvrages",
            "group_po4rn22/Si_Travaux_de_construction_qu": "pavage_de_rues",
            "group_po4rn22/Si_pavage_de_rues_l_de_rue_pav_e_r_alis": "800.0",
            "group_po4rn22/Photo_du_site": "1676652702660.jpg",
            "__version__": "v5MaDnQaTEQdvgpgeABRKz",
            "meta/instanceID": "uuid:ca30c924-6d47-4ec6-b48e-14e3fc7665c8",
            "_xform_id_string": "aYN7a8XPfv5zFsNL3DGqCK",
            "_uuid": "ca30c924-6d47-4ec6-b48e-14e3fc7665c8",
            "_attachments": [
              {
                "download_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/220183453/attachments/97413003/",
                "download_large_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/220183453/attachments/97413003/",
                "download_medium_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/220183453/attachments/97413003/",
                "download_small_url": "https://kf.kobotoolbox.org/api/v2/assets/aYN7a8XPfv5zFsNL3DGqCK/data/220183453/attachments/97413003/",
                "mimetype": "image/jpeg",
                "filename": "agba78/attachments/3d7703b5749b40389c5364f35d4fe09d/ca30c924-6d47-4ec6-b48e-14e3fc7665c8/1676652702660.jpg",
                "instance": 220183453,
                "xform": 691496,
                "id": 97413003
              }
            ],
            "_status": "submitted_via_web",
            "_geolocation": [
              6.3787892,
              2.3851719
            ],
            "_submission_time": "2023-02-20T06:45:52",
            "_tags": [],
            "_notes": [],
            "_validation_status": {},
            "_submitted_by": "agba78"
          }
        ],
      nom_questionnaire: "",
      metaData: {},
      response: {},
      filtre: [],
      table: true,
      date: {
        dateDebut: Date,
        dateFin: Date,
      },
      test: [1, 2, 3, 4, 5, 6, 7,]


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
      this.souscription = table

      this.response = this.souscription


    })


  },

  watch: {
       date: {
      handler(newValue) {
        if(  new Date(newValue.dateDebut).getTime() !== NaN  && new Date(newValue.dateFin).getTime() !== NaN ){
                console.log(newValue)
        }
      },
      deep: true
    }
  },
  methods: {

    recherche() {


      var start = new Date(this.date.dateDebut).getTime()
      console.log(start)
      var end = new Date(this.date.dateFin).getTime()

      // this.filtre = [];

      // this.filtre = this.souscription.filter(function (a) {
      //   a._submission_time = new Date(a._submission_time).getTime()
      //   if (a._submission_time >= start && a._submission_time <= end) {
      //     return true
      //   }
      // });
     
     
    }

  }

};



</script>
<style scoped>
.clr {
  background-color: #0E406E;
}

.sd-container {
  position: relative;
  float: left;
}

.sd {
  padding: 5px 10px;
  height: 30px;
  width: 150px;
}

.open-button {
  position: absolute;
  top: 10px;
  right: 11px;
  width: 25px;
  height: 25px;
  background: #fff;
  pointer-events: none;
}

.open-button button {
  border: none;
  background: transparent;
}
</style>