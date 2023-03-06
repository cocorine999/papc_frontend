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

            <vmodal v-if="showSendMail" @close="showSendMail = false">

                <div style="width:60vw">

                    <form action="" @submit.prevent="sendRapport" class="p-5 w-full">

                        <div class="form-group my-2">

                            <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Objet

                                <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span>
                            </label>

                            <input v-model="objet" required
                                class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent"
                                type="text" />

                        </div>


                        <div class="form-group my-2">

                            <label
                                class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Destinataire

                                <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span>

                            </label>

                            <input v-model="bcc" required
                                class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent"
                                type="text" />

                        </div>


                        <div class="py-2 my-4 flex justify-center space-x-8">

                            <button type="submit"
                                class="bg-primary  flex space-x-2  items-center text-white px-4 py-2 border border-primary font-semibold uppercase">
                                <span class="text-sm font-semibold uppercase" v-if="!chargement">

                                    envoyer

                                </span>
                                <span v-else class="flex items-center space-x-2">

                                    <span class="text-xs px-4 font-semibold ">

                                        envoi ...

                                    </span>

                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-center animate-spin"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />

                                    </svg>

                                </span>

                            </button>

                        </div>

                    </form>

                </div>

            </vmodal>

            <vmodal v-if="showRapport"  @close="showRapport = false">

                <div style="width:60vw" v-html="rapport" class="custom-ck" >
                    
                </div>

            </vmodal>

            <!-- formulaire -->
            <div v-if="!Update" class="p-4">
                <h1 class="text-3xl">Production de rapport</h1>

                <form action="" @submit.prevent="saveRapport" class="p-5 w-full">
                    <div class="form-group my-2">
                        <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Titre du
                            rapport
                            <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
                        <input v-model="nom" required
                            class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent"
                            type="text" />
                    </div>

                    <div class="form-group my-2">
                        <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Contenu du
                            rapport
                            <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span>
                        </label>
                        <ckeditor class="ck-editor" :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
                    </div>
                    <div class="py-2 my-4 flex justify-end space-x-8">
                        <button type="submit" title="enregistrer un nouveau template" v-title
                            class="bg-primary  flex space-x-2  items-center text-white px-4 py-2 border border-primary font-semibold uppercase">
                            <span class="text-sm font-semibold uppercase" v-if="!chargement">
                                enregistrer
                            </span>
                            <span v-else class="flex items-center space-x-2">
                                <span class="text-xs px-4 font-semibold ">
                                    en cour ...
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-center animate-spin" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </span>
                        </button>

                        <button title="envoyer le contenu du rapport par mail" v-title
                            class="bg-primary  flex space-x-2  items-center text-white px-4 py-2 border border-primary font-semibold uppercase">
                            <span class="text-sm font-semibold uppercase" v-if="!chargement2" @click="modalMail()">
                                Envoyer le mail
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

            <div v-else class="p-4">
                <h1 class="text-3xl">Modification de rapport</h1>
                <form action="" @submit.prevent="saveEditRapport" class="p-5 w-full">
                    <div class="form-group my-2">
                        <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Titre du
                            rapport
                            <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
                        <input v-model="edit.nom" required
                            class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent"
                            type="text" />
                    </div>

                    <div class="form-group my-2">
                        <label class="text-xs font-semibold text-gray-500 block uppercase md:text-sm text-light">Contenu du
                            rapport
                            <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span>
                        </label>
                        <ckeditor class="ck-editor" :editor="editor" v-model="edit.Data" :config="editorConfig"></ckeditor>
                    </div>
                    <div class="py-2 my-4 flex justify-end space-x-8">
                        <button type="submit" title="enregistrer un nouveau template" v-title
                            class="bg-primary  flex space-x-2  items-center text-white px-4 py-2 border border-primary font-semibold uppercase">
                            <span class="text-sm font-semibold uppercase" v-if="!chargement3">
                                Modifier
                            </span>
                            <span v-else class="flex items-center space-x-2">
                                <span class="text-xs px-4 font-semibold ">
                                    en cour ...
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-center animate-spin" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </span>
                        </button>

                        <button title="envoyer le contenu du rapport par mail" v-title
                            class="bg-primary  flex space-x-2  items-center text-white px-4 py-2 border border-primary font-semibold uppercase">
                            <span class="text-sm font-semibold uppercase" v-if="!chargement2" @click="modalMail()">
                                Envoyer le mail
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

            <!-- fin formulaire -->

            <!-- tableau -->

            <div class="align-middle inline-block  bg-white overflow-x-auto p-3 rounded-sm rounded-br-lg w-full">

                <!-- header -->

                <table class="w-1/2">
                    <thead>
                        <tr>
                            <th
                                class="pb-0  hover:bg-gray-200 text-left  whitespace-nowrap leading-4 text-primary tracking-wider">

                                <span @click="showMail" :class="{ 'border-primary border-b-4': voirExempleMail }"
                                    class=" mx-2 inline-block cursor-pointer text-base uppercase font-bold ">

                                    Exemplaire de rapport

                                </span>
                            </th>

                            <th
                                class="pb-0  hover:bg-gray-200 text-left  whitespace-nowrap leading-4 text-primary tracking-wider">
                                <span @click="showHistory" :class="{ 'border-primary border-b-4': voirHistorique }"
                                    class=" mx-2 inline-block cursor-pointer text-base uppercase font-bold ">

                                    Historique d'envoie

                                </span>
                            </th>

                        </tr>

                    </thead>

                </table>
                <!-- fin header -->


                <table  class="w-full border-t border-gray-200">
                    <!--Il s'agit d'un tableau decomposé alors filter vos donnée avant de 'integretrer par bailleur' -->

                    <tbody v-if="voirExempleMail" class="bg-white" id="table1">

                        <!--Specifier le nombre de ligne +1 de la table -->

                        <tr v-for="(rapport, index) in rapports" :key="index" :class="{ 'bg-white': voirHistorique }"
                            class="border-b border-gray-200 hover:shadow hover:bg-gray-50" title="Cliquer pour voir"
                            v-title>
                            <td class="p-3 whitespace-no-wrap  text-xs" ref="mail"
                                @click="useRapport(rapport.rapport, index)">
                                {{ rapport.nom }}
                            </td>
                            <td class="flex items-center justify-center">
                                <span class=" mr-2 cursor-pointer transform hover:text-blue-500 hover:scale-110"
                                    title="modifier le rapport" v-title @click="editRapport(rapport)">
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24"
                                        height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg">
                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                        <path
                                            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 000-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z">
                                        </path>
                                    </svg>
                                </span>

                                <span @click="deleteRapport(rapport.id)"
                                    class=" mr-2 cursor-pointer transform hover:text-red-500 hover:scale-110"
                                    title="supprimer" v-title>
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024"
                                        height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z">
                                        </path>
                                    </svg>
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table v-if="voirHistorique" class="w-full">
                    <tbody class="bg-white">
                        <!--Specifier le nombre de ligne +1 de la table -->
                        <tr v-for="(email, index2) in emails" :key="index2"
                            class="border-b bg-white border-gray-200 hover:shadow  hover:bg-gray-50">

                            <td class="p-3 whitespace-no-wrap  text-xs" @click="showModalRapport(emai, index2)">
                                Objet : {{
                                    email.objet }} </td>

                            <td class="p-3 whitespace-no-wrap  text-xs" @click="showModalRapport(email, index2)">
                                Enyoyé à : {{ email.destinataires }}
                            </td>

                            <td>
                                <button title="générer pdf" v-title
                                    class="h-auto py-1 px-2 space-x-1 text-xs font-semibold text-white uppercase bg-primary focus:outline-none focus:shadow-outline"
                                    @click="generateReport(index2, email.rapport)">
                                    <span class="mx-2 text-sm font-semibold">generer pdf </span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- fin tableau -->

            <div class="relative" v-for=" (email, index2 ) in emails" :key="index2">
                <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="true"
                    :paginate-elements-by-height="1400" filename="Mail" :pdf-quality="2" :manual-pagination="true"
                    pdf-format="a4" pdf-orientation="landscape" pdf-content-width="100vw" @progress="onProgress($event)"
                    @hasStartedGeneration="hasStartedGeneration()" @hasGenerated="hasGenerated($event)" ref="element">

                    <section slot="pdf-content" class="flex justify-center items-center m-4 p-4 h-auto">
                        <div :id="index2" class="p-3 custom-ck"></div>
                    </section>
                </vue-html2pdf>
            </div>

        </div>
    </dashboard>
</template>


<script>

import Multiselect from 'vue-multiselect'
import Vmodal from '@/components/Vmodal'

import SearchBar from '@/components/SearchBar'
import Dashboard from '@/layouts/Dashboard'
import Vbutton from '@/components/Vbutton'

//add import
import Dropdown from '@/components/Dropdown.vue'
import ProgrammeService from "@/services/modules/programme.service.js";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import VueHtml2pdf from 'vue-html2pdf'
//import ExportPdf from '@ckeditor/ckeditor5-export-pdf/src/exportpdf';

export default {
    components: {
        Dashboard,
        SearchBar,
        Vmodal,
        Vbutton,
        Multiselect,
        Dropdown,
        VueHtml2pdf,

    },
    data() {
        return {
            savedInput: [],
            chargement: false,
            chargement2: false,
            chargement3: false,
            showModal: false,
            showSendMail: false,
            showRapport: false,
            update: false,
            Update: false,
            title: '',
            nom: '',
            objet: '',
            bcc: '',
            rapport: '',
            objetRapport: '',
            users: [],
            // rapports: [
            //     {
            //         "id": "W5NQoYrXzkQ0qEWXLaKj87nA6PewBgMWaxO4y9mRYpDodlJvZ1rN52VG82OKvy61",
            //         "rapport": "<p>Contenu du rapport.</p>",
            //         "userId": 2,
            //         "created_at": "2023-02-27T19:30:31.000000Z",
            //         "updated_at": "2023-02-27T19:30:31.000000Z",
            //         "nom": "Test"
            //     },
            //     {
            //         "id": "4927OPKge7Ny5LAWzQ2vR1JDKVXj40xXDxEYlpqn8PZgkBdOGw9a6omr6DjVEvpG",
            //         "rapport": "<p>Contenu du rapport 2</p>",
            //         "userId": 2,
            //         "created_at": "2023-02-27T19:49:57.000000Z",
            //         "updated_at": "2023-02-27T19:49:57.000000Z",
            //         "nom": "Test 2"
            //     },
            //     {
            //         "id": "BpDjPmLVndYEJvgVNZKORaGwmeqkl6bP8bzW9LB2o85Qjr10X4Ay7DpPQRywn579",
            //         "rapport": "<p>Il s'agit d'un rapport pour tester le troisieme enregistrement</p>",
            //         "userId": 2,
            //         "created_at": "2023-02-27T19:50:44.000000Z",
            //         "updated_at": "2023-02-27T19:50:44.000000Z",
            //         "nom": "Test 3"
            //     },
            //     {
            //         "id": "gkLwdBEvPn7pZQLBO4ADgqlaYy6o0wbopME19K5XjGdvr8J2mRzkWeVN8yZ5nOXz",
            //         "rapport": "<p>Il s'agit d'un rapport pour tester le troisieme enregistrementbjgggugu</p>",
            //         "userId": 2,
            //         "created_at": "2023-02-27T19:53:07.000000Z",
            //         "updated_at": "2023-02-27T19:53:07.000000Z",
            //         "nom": "Test 4"
            //     },
            //     {
            //         "id": "X4gaoE6mEAkLnJOYodemX5VzKNP4w73lExQr8lvD2p0qg1BjaR6yG9WZ1YeqpJPd",
            //         "rapport": "<ol><li>&nbsp;</li><li><i><strong>Contenu du rapport 2</strong></i></li></ol><figure class=\"table\"><table><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table></figure>",
            //         "userId": 2,
            //         "created_at": "2023-02-27T20:01:48.000000Z",
            //         "updated_at": "2023-02-27T20:01:48.000000Z",
            //         "nom": "Test 4"
            //     },
            //     {
            //         "id": "qRJ8Kw0Y5XgkBa1DrAlvznjK6dNO4q3k9bEy8JpWoRVYe7ZmP2Lw09QGA47V5lN9",
            //         "rapport": "<p>Contenu du rapport.j'ai subit une modification</p>",
            //         "userId": 2,
            //         "created_at": "2023-03-01T14:03:17.000000Z",
            //         "updated_at": "2023-03-01T14:03:17.000000Z",
            //         "nom": "Modification 1"
            //     },
            //     {
            //         "id": "9Vl4ePnGAXz8yDJG9wRQgaPKLNYd6m3npbOpjvWq2o4Enl5Bk1eZVr708ELDJkmA",
            //         "rapport": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",
            //         "userId": 2,
            //         "created_at": "2023-03-01T14:18:49.000000Z",
            //         "updated_at": "2023-03-01T14:18:49.000000Z",
            //         "nom": "Lorem Upsum"
            //     }
            // ],
            // emails: [
            //     {
            //         "id": "mMyDek2lNvxJMOrZknEBQgXKo5m4Rqp9R8D967LbAl1jwaedY23yG0zVQoznbYEg",
            //         "objet": "Test",
            //         "rapport": "<p>Contenu du rapport.</p>",
            //         "destinataires": "yannkellyolou@gmail.com",
            //         "userId": 2,
            //         "created_at": "2023-02-28T16:35:50.000000Z",
            //         "updated_at": "2023-02-28T16:35:50.000000Z"
            //     },
            //     {
            //         "id": "kELQowZRyJgRE2z6ea03YKxOBrZn9G8QXpMk7jAdXLDwNQ41oblm5vqVayD09X43",
            //         "objet": "Test2",
            //         "rapport": "<p>Contenu du rapport.</p>",
            //         "destinataires": "yannkellyolou@gmail.com",
            //         "userId": 2,
            //         "created_at": "2023-02-28T16:39:19.000000Z",
            //         "updated_at": "2023-02-28T16:39:19.000000Z"
            //     },
            //     {
            //         "id": "Ny7Kzq5M09EnZyekYlvgNxKDzjdV1a84aWrq2Oo5AQ7m6LBMbJXwGR34Gr4ZxjXL",
            //         "objet": "Test2",
            //         "rapport": "<p>Contenu du rapport.</p>",
            //         "destinataires": "yannkellyolou@gmail.com",
            //         "userId": 2,
            //         "created_at": "2023-02-28T16:40:26.000000Z",
            //         "updated_at": "2023-02-28T16:40:26.000000Z"
            //     },
            //     {
            //         "id": "NmXJrgzDqkY792gOGJLrXb3NdRzKEVpBO8o0Max6yDZn1BlvAme54jwQ3YEMdx5B",
            //         "objet": "Test2",
            //         "rapport": "<p>Contenu du rapport.</p>",
            //         "destinataires": "yannkellyolou@gmail.com, yann.olou@imsp-uac.org",
            //         "userId": 2,
            //         "created_at": "2023-02-28T16:41:06.000000Z",
            //         "updated_at": "2023-02-28T16:41:06.000000Z"
            //     },
            //     {
            //         "id": "GX2Bwjo1jyAknbNZEr09LMq2mGogdVpMepYeO4a61xz3D5BlK7wJQRvXVgJyO3K9",
            //         "objet": "Demande",
            //         "rapport": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",
            //         "destinataires": "a@gmail.com",
            //         "userId": 2,
            //         "created_at": "2023-03-01T14:22:19.000000Z",
            //         "updated_at": "2023-03-01T14:22:19.000000Z"
            //     },
            //     {
            //         "id": "KegR09NvrL9JQvz7ZlX1j0w4nMKbaYWnLpyDe3VONdB5RmoExqk2A6gGOGbZk4jr",
            //         "objet": "test2",
            //         "rapport": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",
            //         "destinataires": "alao@moutawakil.com",
            //         "userId": 2,
            //         "created_at": "2023-03-01T18:46:04.000000Z",
            //         "updated_at": "2023-03-01T18:46:04.000000Z"
            //     }
            // ],

            rapports: [],
            emails: [],
            editor: ClassicEditor,
            editorData: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
            editorConfig: {
                // The configuration of the editor.
            },
            voirExempleMail: true,
            voirHistorique: false,
            selectMail: false,
            rapportId: '',
            edit: {
                nom: "",
                Data: "",
                id: "",
            }


        }
    },
    computed: {
    },
    methods: {
        modalMail() {
            this.showSendMail = true;
            this.chargement2 = false
        },

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

        generateReport(data, content) {
            console.log(content)
            document.getElementById(data).innerHTML = content
            this.$refs.element[data].generatePdf()

        },

        showMail() {

            this.voirExempleMail = true;

            this.voirHistorique = false;

        },

        showHistory() {

            this.voirExempleMail = false;

            this.voirHistorique = true;

        },

        getEmails() {
            ProgrammeService.emailRapports().then((data) => {
                this.emails = data.data.data

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

        sendRapport() {
            if (this.chargement2 == false) {
                this.chargement2 = true

                this.users = this.bcc.split(',').map((email) => email.trim());

                var form = {
                    objet: this.objet,
                    destinataires: this.users,
                    rapport: this.editorData
                }
                ProgrammeService.sendMailRapport(form).then((data) => {

                    this.chargement2 = false
                    this.$toast.success('Email envoyé')
                    this.emails = data.data.data
                    this.showSendMail = false
                }).catch((error) => {

                    this.chargement2 = false

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

        useRapport(data, index) {
            this.editorData = data
            for (var i = 0; i < this.rapports.length; i++) {

                if (i == index) {

                    this.$refs.mail[index].style.backgroundColor = '#8400ffa4';

                } else {

                    this.$refs.mail[i].style.backgroundColor = '#ffffff';
                }

            }

        },

        showModalRapport(data, index2) {
    
            this.rapportId = index2
            this.rapport = data
            
            console.log(data)
            this.showRapport = true
            // console.log(this.$refs.modalRapport)

            // this.$refs.modalRapport[index2].innerHTML = data
        },

        editRapport(data) {

            this.Update = true;
            console.log(data)
            this.edit.nom = data.nom
            this.edit.Data = data.rapport
            this.edit.id = data.id
        },

        saveEditRapport() {
            if (this.chargement3 == false) {
                this.chargement3 = true

                var form = {
                    nom: this.edit.nom,
                    rapport: this.edit.Data
                }
                ProgrammeService.updateRapports(this.edit.id, form).then((data) => {

                    this.chargement3 = false
                    this.$toast.success('element modifié avec success')

                    this.Update = false;
                    this.getRapports()
                }).catch((error) => {

                    this.chargement3 = false

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
        deleteRapport(data) {
            ProgrammeService.deleteRapport(data).then((data) => {

                this.$toast.success('element supprimé avec success')
                this.getRapports()

            }).catch((error) => {
                this.$toast.error('erreur suppression')
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

    created() {
        this.getRapports()

        this.getEmails()
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

    },


}
</script>
  
<style>
.custom-ck {
    text-align: left;
    word-wrap: break-word;
    background: transparent;
    border: 0;
    margin: 0;
    padding: 0;
    text-decoration: none;
    transition: none;
    vertical-align: middle;
    margin: 0.9em 0;
}

.custom-ck h2 {
    display: block;
    font-size: 24px;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}


.custom-ck h3 {
    display: block;
    font-size: 18.72px;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}

.custom-ck h4 {
    display: block;
    margin-block-start: 21.28px;
    margin-block-end: 21.28px;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}

.custom-ck p {
    display: block;
}

.custom-ck strong {
    font-weight: bold;
}

.custom-ck i {
    font-style: italic;
}

.custom-ck a {
    text-decoration: underline;
    cursor: pointer;
    color: #0000EE;
}

.custom-ck ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 16px;
    margin-block-end: 16px;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
}

.custom-ck li {
    display: list-item;
    text-align: -webkit-match-parent;
}

.custom-ck ol {
    display: block;
    list-style-type: decimal;
    margin-block-start: 16px;
    margin-block-end: 16px;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;

}

.custom-ck blockquote {
    display: block;
    margin-block-start: 16px;
    margin-block-end: 16px;
    margin-inline-start: 40px;
    margin-inline-end: 40px;
    border-left: 5px solid #ccc;
    font-style: italic;
    margin-left: 0;
    margin-right: 0;
    overflow: hidden;
    padding-left: 24px;
    padding-right: 24px;
}

.custom-ck figure {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 40px;
    margin-inline-end: 40px;
}

.custom-ck table {
    border: 1px double #b3b3b3;
    border-collapse: collapse;
    border-spacing: 0;
    height: 100%;
    width: 100%;
    text-indent: initial;
    box-sizing: border-box;
    text-indent: initial;
    text-align: left;
}

.custom-ck tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
}

.custom-ck tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
}

.custom-ck td {
    display: table-cell;
    vertical-align: inherit;
}

.custom-ck figure {
    display: block;
    position: relative;
    margin-block-start: 16px;
    margin-block-end: 16px;
    margin-inline-start: 40px;
    margin-inline-end: 40px;
    clear: both;
    outline: 3px solid #dedede;
    margin: 14.4px 0;
    min-width: 240px;
}

.custom-ck iframe {
    overflow-clip-margin: content-box !important;
    border-top-width: 0px;
    border-bottom-width: 0px;
    border-left-width: 0px;
    border-right-width: 0px;
    border-style: inset;
    border-color: initial;
    border-image: initial;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
</style>