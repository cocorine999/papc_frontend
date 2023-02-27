<template>
    <dashboard>
        <div class="p-0 w-full">
            <nav class="mb-2 text-sm font-semibold  " aria-label="Breadcrumb">
                <div>
                    <ol class="inline-flex p-0 list-none">
                        <li class="flex items-center ">
                            <router-link to="#" class="text-gray-600">dashboard</router-link>
                            <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                <path
                                    d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                            </svg>
                        </li>

                        <li class="flex items-center text-blue-500 ">
                            <router-link to="" class="">Rapport</router-link>
                        </li>
                    </ol>
                </div>
            </nav>

            

            <div class="p-4">
                <h1 class="text-3xl">Formulaire</h1>
                <form action="" @submit.prevent="saveAudit"  class="p-5 w-full">
                    <div class="form-group my-2">
                        <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Prestataire
                            <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
                        <input v-model="audit.entreprise" required
                            class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent"
                            type="text" />
                    </div>
                    <div class="form-group my-2">
                        <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Contact
                            <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
                        <input v-model="audit.entrepriseContact" required
                            class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent"
                            type="number" />
                    </div>
                    <div class="form-group my-2">
                        <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Exercice
                            Audité <span
                                class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
                        <input v-model="audit.annee" required
                            class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent"
                            type="text" />
                    </div>

                    <div class="form-group my-2">
                        <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Date de
                            transmission
                            <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
                        <input v-model="audit.dateDeTransmission" required
                            class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent"
                            type="date" />
                    </div>

                    <div class="form-group my-2">
                        <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Etat
                            avancement <span
                                class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
                        <input v-model="audit.etat" required
                            class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent"
                            type="text" />
                    </div>
                    <div>
                        <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Rapport
                            <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
                        <input
                            class="block w-full text-sm text-gray-900 bg-gray-50  border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            aria-describedby="file_input_help" id="file_input" multiple type="file" @change="getFile">
                        <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PDF,WORD(MAX. 20 MO)
                        </p>
                    </div>
                    <div class="form-group my-2">
                        <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Categorie
                            <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
                        <select v-model="audit.categorie"
                            class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent"
                            name="" id="">
                            <option value="0"> Audit comptable et financier </option>
                            <option value="1"> Audit de conformité environnementale et social </option>
                            <option value="2"> Audit des acquisitions </option>
                            <option value="3"> Audit techniques </option>

                        </select>
                    </div>
                    <div class="form-group my-2">
                        <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Statut
                            <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
                        <select v-model="audit.statut"
                            class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent"
                            name="" id="">
                            <option value="1"> Terminer </option>
                            <option value="0"> En cours </option>
                            <option value="-1"> En attente </option>

                        </select>
                    </div>
                   

                    <div class="py-2 my-4 flex justify-center space-x-8">
                        <button type="submit"
                            class="bg-primary  flex space-x-2  items-center text-white px-4 py-2 border border-primary font-semibold uppercase">
                            <span class="text-sm font-semibold uppercase" v-if="!chargement">
                                enregistrer
                            </span>
                            <span v-else class="flex items-center space-x-2">
                                <span class="text-xs px-4 font-semibold ">
                                    envoi ...
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-center animate-spin" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </span>
                        </button>
                        <vbutton type="reset" template="danger" @close="close"> annuler </vbutton>
                    </div>
                </form>
            </div>



        </div>
    </dashboard>
</template>
  
<script>

import Multiselect from 'vue-multiselect'
import ModalTopRight from '@/components/ModalTopRight'
import SearchBar from '@/components/SearchBar'
import Dashboard from '@/layouts/Dashboard'
import Vbutton from '@/components/Vbutton'

//add import
import BailleurService from "@/services/modules/bailleur.service";
import Dropdown from '@/components/Dropdown.vue'
import { extractFormData } from '@/utils/index'


export default {
    components: {
        Dashboard,
        SearchBar,
        ModalTopRight,
        Vbutton,
        Multiselect,
        Dropdown
    },
    data() {
        return {
            savedInput: [],
            showModal: false,
            title: '',
            audit: {
                annee: '',
                entreprise: '',
                entrepriseContact: '',
                dateDeTransmission: '',
                etat: '',
                statut: '',
                projetId: '',
                categorie: ''
            },

        }
    },
    computed: {
    },
    methods: {},
    mounted() { }
}
</script>
  
<style></style>