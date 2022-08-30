<template>
  <dashboard>
    <div class="p-4">
       <nav class="mb-2 mt-4 text-sm font-semibold flex justify-between items-center " aria-label="Breadcrumb">
      <div>
        <ol class="inline-flex p-0 list-none">
          <li class="flex items-center text-blue-500">
            <router-link to="" class="text-gray-600">dashboard</router-link>
            <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
          </li>
          <li class="flex items-center ">
            <router-link to="" class="text-gray-600">backup</router-link>
          </li>
        </ol>
      </div>
      <div>
        <search-bar ></search-bar>
      </div>
    </nav> 
    <div class="my-6 flex justify-between">
      <titre> mes sauvegardes </titre>
       <button @click="getBackup" title="sauvegardez " class="px-4 py-2 space-x-3 flex overflow-hidden items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
          <span><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 6.854-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5a.5.5 0 0 1 1 0v3.793l1.146-1.147a.5.5 0 0 1 .708.708z"></path></svg></span>
          <span>Creer une sauvegarde</span>
        </button>
    </div>
    <div class="overflow-x-auto mt-8 relative shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="py-3 px-6">
                        Fichier
                    </th>
                    <th scope="col" class="py-3 px-6">
                        Taille
                    </th>
                    <th scope="col" class="py-3 px-6">
                       Date de sauvegarde
                    </th>
                  
                    <th scope="col" class="py-3 px-6">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="i in 10" :key="i" class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      demo.gz
                    </th>
                    <td class="py-4 px-6">
                       70 M
                    </td>
                    <td class="py-4 px-6">
                        25-08-2022
                    </td>
                   
                    <td class="py-4 px-6">
                      <button class="flex bg-blue-500 px-3 border border-blue-500 text-white items-center text-sm font-semibold py-2 space-x-2">
                        <span><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 6.854-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5a.5.5 0 0 1 1 0v3.793l1.146-1.147a.5.5 0 0 1 .708.708z"></path></svg></span>
                        <span>Telecharger</span>
                      </button>
                    </td>
                </tr>
                
            </tbody>
        </table>
    </div>

    </div>
  </dashboard>
</template>

<script>

import SearchBar from '@/components/SearchBar'
import Titre from '@/components/Titre'
import Dashboard from '@/layouts/Dashboard'
import BackupService from "@/services/modules/backup.service.js";
export default {
  components: {
    Dashboard,
    Titre,
    SearchBar,
  },
  data() {
    return {
     
    }
  },
  methods: {
        getBackup() {
        BackupService.getBackup().then(() => {
            this.$toast.success("Sauvegarde effectué!")
        }).catch((e) => {
          this.$toast.error(e)
        })
      },
  }

}
</script>

<style>

</style>