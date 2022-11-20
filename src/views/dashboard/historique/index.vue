<template>
  <dashboard>
    <div class="time-line">
      <nav class="text-xs md:text-sm font-semibold flex flex-wrap justify-between items-center " aria-label="Breadcrumb">
        <div>
          <ol class="inline-flex p-0 list-none">
            <li class="flex items-center text-blue-500">
              <router-link to="" class="text-gray-600">dashboard</router-link>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
            </li>
            <li class="flex items-center ">
              <router-link to="" class="text-gray-600">programme</router-link>
            </li>
          </ol>
        </div>
      </nav> 

    <div class="flex items-center justify-between my-2">
      <titre>Historiques du flux activité </titre>
    </div>
    <div class="log">
      <ol class="relative  border-l-4 border-primary dark:border-gray-700">                  
        <li v-for="historique in historiques" :key="historique.id" class="ml-4 my-6">
            <div class="absolute w-3 h-3 bg-primary rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"> {{historique.created_at}} </time>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">  {{historique.action}}  a partir {{historique.ip}} </h3>
            <p class="text-base font-normal text-gray-500 dark:text-gray-400"> {{historique.description}} </p>
            <p class="text-base font-normal text-gray-500 dark:text-gray-400"> <span class="font-bold px-2 ">Depuis </span> {{historique.agent}} </p>
        </li>
      </ol>
    </div>
    
    </div>
  </dashboard>
</template>

<script>
  import Dashboard from '@/layouts/Dashboard'
  import Titre from '@/components/Titre'
  import moment from 'moment'
  moment.locale('fr');
  console.log(moment.locale());
  import HistoriqueService from "@/services/modules/historique.service.js";
  export default {
    layout:'dashboard',
    components:{ 
      Dashboard,
      Titre,
      moment
      },
    data() {
      return {
        historiques:[]
      }
    },
    methods: {
      active() {
        this.$store.dispatch('active')
      },
      disabled() {
        this.$store.dispatch('disabled')
      },
      getHistorique() {
        this.active()
        HistoriqueService.get().then((data) => {
          const datas = data.data.data
          datas.forEach(element => {
           this.disabled()
            element.created_at = moment(element.created_at).format('LLL')
            console.log(element.created_at)
          });
         console.log(datas)
          this.historiques = datas
          this.disabled()
          console.log("les suiivs",this.dataTable)
        }).catch((e) => {
          console.log(e)
          this.disabled()
        })
      },
    },
    mounted() {
      this.getHistorique()
    }
  }
</script>

<style>

</style>