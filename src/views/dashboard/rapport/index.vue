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
                <h1 class="text-3xl">Template de rapport</h1>
                <form action="" @submit.prevent="saveRapport"  class="p-5 w-full">
                    <div class="form-group my-2">
                        <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Nom
                            <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
                        <input v-model="nom" required
                            class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent"
                            type="text" />
                    </div>

                    <div class="form-group my-2">
                        <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Contenu du rapport
                            <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span>
                        </label>
                        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
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
                    </div>
                </form>
            </div>     
            
            <div class="align-middle inline-block w-full bg-white overflow-x-auto pt-3 rounded-bl-lg rounded-br-lg">                  
                <table class="w-full">
                    <thead>
                        <tr>
              
                            <th class="p-3 border border-gray-500 text-left  whitespace-nowrap leading-4 text-primary tracking-wider">
                
                                Nom</th>              
            
                            </tr>
                        
                    </thead>
          
                    <!--Il s'agit d'un tableau decomposé alors filter vos donnée avant de 'integretrer par bailleur' -->
          
                    <tbody class="bg-white">
          
                        <!--Specifier le nombre de ligne +1 de la table -->

          
                        <tr v-for="(rapport, index) in rapports" :key="index">
          
                            <td class="p-3 whitespace-no-wrap border border-gray-500 text-xs" @click="useRapport(rapport.rapport)">{{ rapport.nom }} </td>
              
          
                        </tr>
                        
                    </tbody>
        
                </table>

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
import Dropdown from '@/components/Dropdown.vue'
import ProgrammeService from "@/services/modules/programme.service.js";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import ExportPdf from '@ckeditor/ckeditor5-export-pdf/src/exportpdf';





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
            chargement: false,
            showModal: false,
            title: '',
            nom:'',
            rapports:[],
            editor: ClassicEditor,
            editorData: '<p>Contenu du rapport.</p>',
            editorConfig: {
                // The configuration of the editor.
            }

        }
    },
    computed: {
    },
    methods: {
        getRapports() {
            ProgrammeService.rapports().then((data) => {
                this.rapports = data.data.data
                
            }).catch((error) => {
        
                if (error.response) {
                    // Requête effectuée mais le serveur a répondu par une erreur.
                    const message = error.response.data.message
                    this.$toast.error(message)
                } else if (error.request) {
                    // Demande effectuée mais aucune réponse n'est reçue du serveur.
                   //console.log(error.request);
                } else {
                    // Une erreur s'est produite lors de la configuration de la demande
                   //console.log('dernier message', error.message);
                }
            })
    
        },
        saveRapport() {
            if (this.chargement == false) {
                this.chargement = true

                var form = {
                    nom: this.nom,
                    rapport: this.editorData
                }
                ProgrammeService.rapport(form).then((data) => {
          
                    this.chargement = false          
                    this.$toast.success('nouveau element')                    
                    this.getRapports()        
                }).catch((error) => {
        
                    this.chargement = false
        
                    if (error.response) {        
                        // Requête effectuée mais le serveur a répondu par une erreur.    
                        const message = error.response.data.message        
                        this.$toast.error(message)                
                    } else if (error.request) {
        
                        // Demande effectuée mais aucune réponse n'est reçue du serveur.
        
                        //console.log(error.request);
        
                    } 
        
                })
      
            }
    
        },   
        useRapport(data)     
        {
            this.editorData = data
        }
    },
    created() {
        this.getRapports()

        
        /*ClassicEditor.create( document.querySelector( '#editor' ), {
        
            plugins: [CloudServices, ExportPdf],
            
            toolbar: ['exportPdf'],
    
        exportPdf: {
    
            stylesheets: [ 'EDITOR_STYLES' ],
    
            fileName: 'document.pdf',
    
            converterUrl: 'https://pdf-converter.cke-cs.com/v1/convert',
    
            converterOptions: {
    
                format: 'A4',
    
                margin_top: '0mm',
    
                margin_bottom: '0mm',
    
                margin_right: '0mm',
    
                margin_left: '0mm',
    
                page_orientation: 'portrait',
    
                header_html: undefined,
    
                footer_html: undefined,
    
                header_and_footer_css: undefined,
    
                wait_for_network: true,
    
                wait_time: 0
    
            },
    
            dataCallback: ( editor ) => editor.getData()
    
        }
  
    } )*/

    //.then( /* ... */ )

    //.catch( /* ... */ )     
       
     }
}
</script>
  
<style></style>