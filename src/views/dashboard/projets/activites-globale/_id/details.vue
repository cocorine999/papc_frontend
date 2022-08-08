<template>
  <dashboard>
    <div class="p-4">
    
      <nav class="mb-2 text-sm font-semibold" aria-label="Breadcrumb">
        <div>
          <ol class="inline-flex p-0 list-none">
            <li class="flex items-center text-blue-500">
              <router-link to="/dashboard" class="text-gray-600"
                >dashboard</router-link
              >
              <svg
                class="w-3 h-3 mx-3 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
                />
              </svg>
            </li>
            <li class="flex items-center text-blue-500">
              <router-link to="#" class="text-gray-600"
                >indicateurs</router-link
              >
              <svg
                class="w-3 h-3 mx-3 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
                />
              </svg>
            </li>
            <li class="flex items-center text-blue-500">
              <router-link to="/dashboard/projets" class="">55 </router-link>
            </li>
          </ol>
        </div>
      </nav>

      <div class="flex justify-between items-center mt-8 mb-4">
        <div>
          <button @click="showDateInput = !showDateInput" class="bg-primary text-white px-4 py-2 border border-primary font-semibold uppercase ">ajouter une nouvelle date</button>
        </div>
        <div class="border border-gray-300 p-2 bg-white shadow">
          <router-link class="text-sm font-semibold" to="/dashboard/projets/taches-globale">Listes des taches </router-link>
        </div>
      </div>

      <div v-if="showDateInput">
        <form action="">
          <div  class="grid grid-cols-2 gap-2 my-2" v-for="(date,index) in dates" :key="index">
            <div class="form-group my-2">
              <label class="text-xs font-semibold block text-gray-500 uppercase md:text-sm text-light">Date debut<span class="px-2 text-lg font-black text-red-700">*</span></label>
              <input required class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2 w-full  focus:border-transparent" type="date" />
            </div>
            <div class="form-group my-2">
              <label class="text-xs font-semibold block text-gray-500 uppercase md:text-sm text-light">Date fin <span class="px-2 text-lg font-black text-red-700">*</span></label>
              <div class="flex space-x-2 items-center">
                <input required class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2 w-full  focus:border-transparent" type="date"  />
                <span title="ajouter une nouvelle date" @click="addDate" class="text-primary"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1.6em" width="1.6em" xmlns="http://www.w3.org/2000/svg"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"></path></svg></span>
                <span title="supprimer une date " @click="deleteItem(index)" class="bg-red-500 p-1 rounded-full text-white"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" stroke="none"/></svg></span>
              </div>
            </div>
          </div>
          <button class="bg-primary text-white px-4 py-2 border border-primary font-semibold uppercase">Enregistrer</button>
        </form>
      </div>

      <div class="my-4">
       
        <div class="flex">
          <div class="w-2/5 border-r relative border-gray-300 bg-white shadow">
            <div class="relative">
              <div class="my-2">
                <span
                  v-if="!isStateChange"
                  @click.stop="isStateChange = true"
                  class="absolute rounded-lg px-3 py-1 top-3 right-3 bg-yellow-500 text-white cursor-pointer font-semibold"
                  >en cours</span
                >
                <select
                  v-else
                  @change.stop="isStateChange = false"
                  class="outine-none"
                  name=""
                  id=""
                >
                  <option value="">cree</option>
                  <option value="">en attente</option>
                  <option value="">en cours</option>
                  <option value="">en terminer</option>
                </select>
              </div>
            </div>
            <div>
              <h1 class="text-lg uppercase p-4 font-bold bg-white">
                activite 2
              </h1>
            </div>
            <div class="p-4 overflow-auto content border-b border-gray-3">
              <h2 class="text-lg font-semibold py-2">Description de l'activite</h2>
              <p class="text-sm font-semibold leading-6 text-justify">
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos porro excepturi, culpa, debitis vero nisi quis obcaecati nulla fugit repudiandae reiciendis ab? Doloribus laudantium tempora hic facere excepturi officia amet!
              </p>
            </div>
            

            <div style="" class="mt-2 mb-4 p-4">
              <p class="text-sm border-b border-gray-300 font-semibold py-2 flex justify-between items-center">
                <span class="font-bold">Montant BN :</span>
                <span class="text-gray-700">2000000000000</span>
              </p>
              <p class="text-sm border-b border-gray-300 font-semibold py-2 flex justify-between items-center">
                <span class="font-bold">Montant EPM-PRET :</span>
                <span class="text-gray-700">50000000000</span>
              </p>
              <div class="text-sm border-b border-gray-300 font-semibold py-2 flex justify-between items-center">
                <span class="font-bold pr-2">Durée :</span>
                <p class="flex items-center space-x-2">
                  <span class="p-2 mr-2 overflow-hidden flex items-center text-xs font-semibold text-white uppercase bg-primary focus:outline-none focus:shadow-outline">
                    <svg
                      class="mr-1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      style="
                        fill: rgba(255, 255, 255, 1);
                        transform: ;
                        msfilter: ;
                      "
                    >
                      <path
                        d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm-1 15h-6v-6h6v6zm1-10H5V7h14v2z"
                      ></path>
                    </svg>
                   2018
                  </span>
                    au
                  <span class="p-2 overflow-hidden flex items-center text-xs font-semibold text-white uppercase bg-primary focus:outline-none focus:shadow-outline">
                    <svg
                      class="mr-1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      style="
                        fill: rgba(255, 255, 255, 1);
                        transform: ;
                        msfilter: ;
                      "
                    >
                      <path
                        d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zm6-3.586-3.707-3.707 1.414-1.414L11 15.586l4.293-4.293 1.414 1.414L11 18.414zM5 7h14v2H5V7z"
                      ></path>
                    </svg>
                   2020
                  </span>
                </p>
              </div>
              
            </div>
          </div>
          <div class="w-3/5 border-l border-gray-300 bg-white shadow">
            
            <div class="grid mt-6 shadow gap-2 grid-cols-2">
              <div class="bg-white shadow">
                <apexchart
                  type="radar"
                  height="350"
                  :options="chartOptions"
                  :series="chartOptions.series"
                ></apexchart>
              </div>
              <div class="bg-white flex items-center relative shadow">
                <span class="absolute left-3 top-1 text-sm font-bold"
                  >Taux de decaissement</span
                >
                <div class="">
                  <apexchart
                    type="pie"
                    height="350"
                    :options="chartOptions2"
                    :series="chartOptions2.series"
                  ></apexchart>
                </div>
              </div>
            </div>
          
            <div class="my-4">
              <div>
                <apexchart
                  type="line"
                  height="350"
                  :options="chartOptions1"
                  :series="chartOptions.series"
                ></apexchart>
              </div>
            </div>
            <div class="p-3">
              <titre>Dernieres Suivi </titre>
              <div class="my-3">
                <vtable
                  :headers="headers"
                  :datas="dataTable"
                  :actions="actions"
                  @supprimer="supprimer"
                  @modifier="modifier"
                ></vtable>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </dashboard>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import Titre from "@/components/Titre";
import Vtable from "@/components/Vtable";
import Vform from "@/components/Vform";
import Vmodal from "@/components/Vmodal";
import Dashboard from "@/layouts/Dashboard";

import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
import utils from "@/utils/index";
import Projet from "@/store/modules/projets/projet";

export default {
  components: {
    Vtable,
    Dashboard,
    Vmodal,
    Vform,
    Titre,
    SearchBar,
  },
  data() {
    return {
       dates:[
        {}
      ],
      showDateInput:false,
      isStateChange: false,
      showModal: false,
      stats: [],
      projet: new Projet(),
      champsRecherche: [
        {
          name: "Date debut",
          type: "date",
          placeholdere: "",
          isSelect: false,
          isTextArea: false,
          data: "",
          required: true,
        },
        {
          name: "Date fin",
          type: "date",
          placeholdere: "",
          isSelect: false,
          isTextArea: false,
          data: "",
          required: true,
        },
      ],
      cols: 2,
      tt: null,
      chartOptions1: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        title: {
          text: "Taux d'execution ",
          align: "left",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
          ],
        },
      },
      chartOptions2: {
        series: [44, 55, 13, 43, 22],
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],

        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
      chartOptions: {
        series: [
          {
            name: "Series 1",
            data: [80, 50, 30, 40, 100, 20],
          },
        ],
        chart: {
          height: 350,
          type: "radar",
        },
        title: {
          text: "Taux d'execution ",
          align: "left",
        },
        xaxis: {
          categories: ["January", "February", "March", "April", "May", "June"],
        },
      },

      headers: [
        { name: "Activite", props: "activite", width: "w-24" },
        { name: "Description", props: "description", width: "w-24" },
        { name: "Budget national", props: "bn", width: "w-28" },
        { name: "Pret", props: "emp_pret", width: "w-28" },
        { name: "Poids", props: "poids", width: "w-40" },
        {
          name: "Structure responsable",
          props: "struct_responsable",
          width: "w-36",
        },
        { name: "Structure associé", props: "struct_asso", width: "w-36" },
        { name: "Status", props: "status", width: "w-36" },
        { name: "Date de creation", props: "created_at", width: "w-24" },
      ],
      dataTable: [
        {
          activite: "activite",
          description: "lorem",
          bn: "5555555555555",
          emp_pret: "600000000",
          poids: "5",
          struct_responsable: "agetur",
          struct_asso: "Neant",
          status: "en cours",
          created_at: "22-06-2022",
        },
        {
          activite: "activite2",
          description: "lorem",
          bn: "5555555555555",
          emp_pret: "600000000",
          poids: "5",
          struct_responsable: "agetur",
          struct_asso: "Neant",
          status: "en cours",
          created_at: "22-06-2022",
        },
        {
          activite: "activite3",
          description: "lorem",
          bn: "5555555555555",
          emp_pret: "600000000",
          poids: "5",
          struct_responsable: "agetur",
          struct_asso: "Neant",
          status: "en cours",
          created_at: "22-06-2022",
        },
        {
          activite: "activite4",
          description: "lorem",
          bn: "5555555555555",
          emp_pret: "600000000",
          poids: "5",
          struct_responsable: "agetur",
          struct_asso: "Neant",
          status: "en cours",
          created_at: "22-06-2022",
        },
        {
          activite: "activite5",
          description: "lorem",
          bn: "5555555555555",
          emp_pret: "600000000",
          poids: "5",
          struct_responsable: "agetur",
          struct_asso: "Neant",
          status: "en cours",
          created_at: "22-06-2022",
        },
      ],
      actions: [
        { name: "modifier", iconne: "" },
        { name: "supprimer", iconne: "" },
      ],
    };
  },

  methods: {
    addDate() {
      this.dates.push({})
    },
    deleteItem(item) {
      this.dates.splice(item, 1);
      alert(item)
      
    }
  }

  
};
</script>

<style></style>
