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

            <vmodal v-if="showRapport" @close="showRapport = false">

                <div style="width:60vw"> {{ rapport }}</div>

            </vmodal>

            <div class="p-4">
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
                        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
                    </div>



                    <div class="py-2 my-4 flex justify-end space-x-8">
                        <button type="submit" title="enregistrer un nouveau template" v-title
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

                        <button title="envoyer le contenu du rapport par mail" v-title
                            class="bg-primary  flex space-x-2  items-center text-white px-4 py-2 border border-primary font-semibold uppercase">
                            <span class="text-sm font-semibold uppercase" v-if="!chargement" @click="modalMail()">
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

            <div class="align-middle inline-block  bg-white overflow-x-auto p-3 rounded-sm rounded-br-lg w-full">
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

                <table class="w-full border-t border-gray-200">
                    <!--Il s'agit d'un tableau decomposé alors filter vos donnée avant de 'integretrer par bailleur' -->

                    <tbody v-if="voirExempleMail" class="bg-white" id="table1" >

                        <!--Specifier le nombre de ligne +1 de la table -->

                        <tr v-for="(rapport, index) in rapports" :key="index"
                           :class="{'bg-white': voirHistorique }" class="border-b border-gray-200 hover:shadow  hover:bg-gray-50" title="Cliquer pour éditer"
                            v-title>

                            <td class="p-3 whitespace-no-wrap  text-xs" ref="mail"
                                @click="useRapport(rapport.rapport, index)">
                                {{ rapport.nom }}
                            </td>


                        </tr>

                    </tbody>

                    <tbody v-if="voirHistorique" class="bg-white">

                        <!--Specifier le nombre de ligne +1 de la table -->
                        <tr v-for="(email, index2) in emails" :key="index2" class="border-b bg-white border-gray-200 hover:shadow  hover:bg-gray-50">

                            <td class="p-3 whitespace-no-wrap  text-xs" @click="showModalRapport(email.rapport)">Objet : {{
                                email.objet }} </td>

                            <td class="p-3 whitespace-no-wrap  text-xs" @click="showModalRapport(email.rapport)">
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

            <div class="relative" v-for=" (email, index2 ) in emails" :key="index2">
                <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="true"
                    :paginate-elements-by-height="1400" filename="Mail" :pdf-quality="2" :manual-pagination="true"
                    pdf-format="a4" pdf-orientation="landscape" pdf-content-width="100vw" @progress="onProgress($event)"
                    @hasStartedGeneration="hasStartedGeneration()" @hasGenerated="hasGenerated($event)" ref="element">

                    <section  slot="pdf-content" class="flex justify-center items-center m-4 p-4 h-auto">
                        <div :id="index2" class="p-3 flex justify-center items-center text-justify" ></div>
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
            showModal: false,
            showSendMail: false,
            showRapport: false,
            title: '',
            nom: '',
            objet: '',
            bcc: '',
            rapport: '',
            users: [],
            rapports: [
                {
                    "id": "W5NQoYrXzkQ0qEWXLaKj87nA6PewBgMWaxO4y9mRYpDodlJvZ1rN52VG82OKvy61",
                    "rapport": "<p>Contenu du rapport.</p>",
                    "userId": 2,
                    "created_at": "2023-02-27T19:30:31.000000Z",
                    "updated_at": "2023-02-27T19:30:31.000000Z",
                    "nom": "Test"
                },
                {
                    "id": "4927OPKge7Ny5LAWzQ2vR1JDKVXj40xXDxEYlpqn8PZgkBdOGw9a6omr6DjVEvpG",
                    "rapport": "<p>Contenu du rapport 2</p>",
                    "userId": 2,
                    "created_at": "2023-02-27T19:49:57.000000Z",
                    "updated_at": "2023-02-27T19:49:57.000000Z",
                    "nom": "Test 2"
                },
                {
                    "id": "BpDjPmLVndYEJvgVNZKORaGwmeqkl6bP8bzW9LB2o85Qjr10X4Ay7DpPQRywn579",
                    "rapport": "<p>Il s'agit d'un rapport pour tester le troisieme enregistrement</p>",
                    "userId": 2,
                    "created_at": "2023-02-27T19:50:44.000000Z",
                    "updated_at": "2023-02-27T19:50:44.000000Z",
                    "nom": "Test 3"
                },
                {
                    "id": "gkLwdBEvPn7pZQLBO4ADgqlaYy6o0wbopME19K5XjGdvr8J2mRzkWeVN8yZ5nOXz",
                    "rapport": "<p>Il s'agit d'un rapport pour tester le troisieme enregistrementbjgggugu</p>",
                    "userId": 2,
                    "created_at": "2023-02-27T19:53:07.000000Z",
                    "updated_at": "2023-02-27T19:53:07.000000Z",
                    "nom": "Test 4"
                },
                {
                    "id": "X4gaoE6mEAkLnJOYodemX5VzKNP4w73lExQr8lvD2p0qg1BjaR6yG9WZ1YeqpJPd",
                    "rapport": "<ol><li>&nbsp;</li><li><i><strong>Contenu du rapport 2</strong></i></li></ol><figure class=\"table\"><table><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table></figure>",
                    "userId": 2,
                    "created_at": "2023-02-27T20:01:48.000000Z",
                    "updated_at": "2023-02-27T20:01:48.000000Z",
                    "nom": "Test 4"
                },
                {
                    "id": "qRJ8Kw0Y5XgkBa1DrAlvznjK6dNO4q3k9bEy8JpWoRVYe7ZmP2Lw09QGA47V5lN9",
                    "rapport": "<p>Contenu du rapport.j'ai subit une modification</p>",
                    "userId": 2,
                    "created_at": "2023-03-01T14:03:17.000000Z",
                    "updated_at": "2023-03-01T14:03:17.000000Z",
                    "nom": "Modification 1"
                },
                {
                    "id": "9Vl4ePnGAXz8yDJG9wRQgaPKLNYd6m3npbOpjvWq2o4Enl5Bk1eZVr708ELDJkmA",
                    "rapport": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",
                    "userId": 2,
                    "created_at": "2023-03-01T14:18:49.000000Z",
                    "updated_at": "2023-03-01T14:18:49.000000Z",
                    "nom": "Lorem Upsum"
                }
            ],
            emails: [
                {
                    "id": "mMyDek2lNvxJMOrZknEBQgXKo5m4Rqp9R8D967LbAl1jwaedY23yG0zVQoznbYEg",
                    "objet": "Test",
                    "rapport": "<p>Contenu du rapport.</p>",
                    "destinataires": "yannkellyolou@gmail.com",
                    "userId": 2,
                    "created_at": "2023-02-28T16:35:50.000000Z",
                    "updated_at": "2023-02-28T16:35:50.000000Z"
                },
                {
                    "id": "kELQowZRyJgRE2z6ea03YKxOBrZn9G8QXpMk7jAdXLDwNQ41oblm5vqVayD09X43",
                    "objet": "Test2",
                    "rapport": "<p>Contenu du rapport.</p>",
                    "destinataires": "yannkellyolou@gmail.com",
                    "userId": 2,
                    "created_at": "2023-02-28T16:39:19.000000Z",
                    "updated_at": "2023-02-28T16:39:19.000000Z"
                },
                {
                    "id": "Ny7Kzq5M09EnZyekYlvgNxKDzjdV1a84aWrq2Oo5AQ7m6LBMbJXwGR34Gr4ZxjXL",
                    "objet": "Test2",
                    "rapport": "<p>Contenu du rapport.</p>",
                    "destinataires": "yannkellyolou@gmail.com",
                    "userId": 2,
                    "created_at": "2023-02-28T16:40:26.000000Z",
                    "updated_at": "2023-02-28T16:40:26.000000Z"
                },
                {
                    "id": "NmXJrgzDqkY792gOGJLrXb3NdRzKEVpBO8o0Max6yDZn1BlvAme54jwQ3YEMdx5B",
                    "objet": "Test2",
                    "rapport": "<p>Contenu du rapport.</p>",
                    "destinataires": "yannkellyolou@gmail.com, yann.olou@imsp-uac.org",
                    "userId": 2,
                    "created_at": "2023-02-28T16:41:06.000000Z",
                    "updated_at": "2023-02-28T16:41:06.000000Z"
                },
                {
                    "id": "GX2Bwjo1jyAknbNZEr09LMq2mGogdVpMepYeO4a61xz3D5BlK7wJQRvXVgJyO3K9",
                    "objet": "Demande",
                    "rapport": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",
                    "destinataires": "a@gmail.com",
                    "userId": 2,
                    "created_at": "2023-03-01T14:22:19.000000Z",
                    "updated_at": "2023-03-01T14:22:19.000000Z"
                },
                {
                    "id": "KegR09NvrL9JQvz7ZlX1j0w4nMKbaYWnLpyDe3VONdB5RmoExqk2A6gGOGbZk4jr",
                    "objet": "test2",
                    "rapport": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",
                    "destinataires": "alao@moutawakil.com",
                    "userId": 2,
                    "created_at": "2023-03-01T18:46:04.000000Z",
                    "updated_at": "2023-03-01T18:46:04.000000Z"
                }
            ],
            editor: ClassicEditor,
            editorData: '<p>Contenu du rapport.</p>',
            editorConfig: {
                // The configuration of the editor.
            },
            voirExempleMail: true,
            voirHistorique: false,
            selectMail: false,


        }
    },
    computed: {
    },
    methods: {
        modalMail() {
            this.showSendMail = true;
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

        // Tabulation

        showMail() {

            this.voirExempleMail = true;

            this.voirHistorique = false;

        },

        showHistory() {

            this.voirExempleMail = false;

            this.voirHistorique = true;
          
        },

        // Fin Tabulation

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
            if (this.chargement == false) {
                this.chargement = true

                this.users = this.bcc.split(',').map((email) => email.trim());

                var form = {
                    objet: this.objet,
                    destinataires: this.users,
                    rapport: this.editorData
                }
                ProgrammeService.sendMailRapport(form).then((data) => {

                    this.chargement = false
                    this.$toast.success('Email envoyé')
                    this.emails = data.data.data
                    this.showSendMail = false
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

        showModalRapport(data) {
            this.rapport = data

            this.showRapport = true
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

    }
}
</script>
  
<style scoped></style>