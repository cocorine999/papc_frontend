<template>
    <div>
        <div v-if="modal2" class="bg2 flex justify-center items-center">
            <div class="bg-white rounded flex flex-col justify-center items-center relative">

                <button class=" mx-2 p-2 flex absolute -right-2.5 -top-1" title="fermer le modal 2" v-title @click="close2">
                    <svg stroke="currentColor" fill="#FF0000" stroke-width="0" viewBox="0 0 16 16" height="1.5em"
                        width="1.5em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                        <path
                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z">
                        </path>
                    </svg>
                </button>

                <div class="p-7 flex flex-col justify-between items-center">
                    <p>je suis le contenu du modal2. fermer les modals pour revenir en arrière</p>
                </div>

            </div>
        </div>
        <div v-if="modal1" class="bg flex justify-center items-center">
            <div class="bg-white rounded flex flex-col justify-center items-center relative">

                <button class=" mx-2 p-2 flex absolute -right-2.5 -top-1" title="fermer le modal 1" v-title @click="close">
                    <svg stroke="currentColor" fill="#FF0000" stroke-width="0" viewBox="0 0 16 16" height="1.5em"
                        width="1.5em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                        <path
                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z">
                        </path>
                    </svg>
                </button>

                <div class="p-7 flex flex-col justify-between items-center">
                    <p>je suis le contenu du modal1</p>
                    <button @click="openModal2" title="essayer le modal2" v-title
                        class="p-2  mx-auto my-2 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase _rounded bg-primary focus:outline-none focus:shadow-outline">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;">
                            <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
                        </svg>
                        <span class="mx-2 text-xs  font-semibold">Open modal 2 </span>
                    </button>
                </div>

            </div>
        </div>
        <dashboard>

            <div class="w-full">
                <nav class="text-xs md:text-sm font-semibold flex items-center justify-between flex-wrap "
                    aria-label="Breadcrumb">
                    <div class="mb-2">
                        <ol class="inline-flex p-0 list-none">
                            <li class="flex items-center ">
                                <router-link to="#" class="text-gray-600">dashboard</router-link>
                                <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 320 512">
                                    <path
                                        d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                                </svg>
                            </li>

                            <li class="flex items-center text-blue-500 ">
                                <router-link to="" class="">KoboToolsbox</router-link>
                            </li>
                        </ol>
                    </div>

                </nav>
                <!-- component -->
                <div class="flex items-center justify-between my-2">
                    <titre>Listes des questionnaires déployés </titre>
                    <button @click="reload" title="mettre à jour"
                        class="px-4 py-2 flex overflow-hidden items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
                        <svg height="20px" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve">
                            <g>
                                <g id="spin">
                                    <g>
                                        <path style="fill:#ffffff;" d="M25.883,6.086l-2.82,2.832C24.953,10.809,26,13.324,26,16c0,5.516-4.484,10-10,10v-2l-4,4l4,4v-2
    				c7.719,0,14-6.281,14-14C30,12.254,28.539,8.734,25.883,6.086z" />
                                        <path style="fill:#ffffff;" d="M20,4l-4-4v2C8.281,2,2,8.281,2,16c0,3.746,1.461,7.266,4.117,9.914l2.82-2.832
    				C7.047,21.191,6,18.676,6,16c0-5.516,4.484-10,10-10v2L20,4z" />
                                    </g>
                                </g>
                            </g>
                        </svg>
                        <span class="mx-2 text-sm font-semibold uppercase">Actualiser</span>
                    </button>
                </div>
                <div class=" overflow-x-auto my-2">
                    <table class="min-w-full table-auto">
                        <thead class="border-b bg-gray-300">
                            <tr>
                                <th>
                                    <label
                                        class="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-1 rounded-lg cursor-pointer">
                                        <input type="checkbox" class="form-checkbox focus:outline-none focus:shadow-outline"
                                            @click="selectAllCheckbox($event)">
                                    </label>
                                </th>
                                <th v-for="(head, index) in header" :key="index"
                                    class="text-xs md:text-sm whitespace-nowrap font-medium text-gray-900 py-2 px-4 text-left">
                                    <span>{{ head }}</span>
                                </th>
                                <th class="text-xs md:text-sm font-medium text-gray-900 py-2 px-4 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b border-gray-300 hover:bg-gray-200" v-for="(data, index) in kobo_data"
                                :key="index">
                                <td>
                                    <label
                                        class="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                                        <input type="checkbox"
                                            class="form-checkbox rowCheckbox focus:outline-none focus:shadow-outline"
                                            :name="index">
                                    </label>
                                </td>
                                <td>
                                    <span class="text-xs w-full">
                                        {{ data.name }}
                                    </span>
                                </td>
                                <td>
                                    <span class="text-xs w-full">
                                        {{ data.settings.description }}
                                    </span>
                                </td>
                                <td class="flex text-xs w-full items-center justify-center">
                                    {{ data.deployment__submission_count }}
                                </td>

                                <td>
                                    <span class="text-xs w-full">
                                        {{ data.date_created }}
                                    </span>
                                </td>
                                <td>
                                    <span class="text-xs w-full">
                                        {{ data.date_modified }}
                                    </span>
                                </td>
                                <td class="flex justify-center py-auto ">
                                    <div title="consulter les souscriptions"
                                        class=" my-3 cursor-pointer transform hover:text-blue-500 hover:scale-110"
                                        @click="detail(index, data)">
                                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20"
                                            height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                                            <path fill-rule="evenodd"
                                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                                clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="m-4">
                    <p class="text-3xl mb-3">Modals in modals</p>
                    <button @click="openModal" title="ouvrir modal 1" v-title
                        class="p-2  overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase _rounded bg-primary focus:outline-none focus:shadow-outline">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;">
                            <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
                        </svg>
                        <span class="mx-2 text-xs  font-semibold">Open modal 1 </span>
                    </button>
                </div>

            </div>
        </dashboard>
    </div>
</template>

<script>
import Dashboard from '@/layouts/Dashboard'
import Titre from "@/components/Titre";
import ProgrammeService from '@/services/modules/programme.service';



export default {
    components: {
        Dashboard,
        Titre
    },

    data() {
        return {
            kobo_data: [],
            header: ["Nom", "Description", "Total de souscription", "Créer le", "Modifié le",],
            selectedRows: [],
            listeSelection: [],
            modal1: false,
            modal2: false
        }
    },
    mounted() {
        ProgrammeService.kobo().then(response => {
            for (let i = 0; i < response.data.data.length; i++) {
                if (response.data.data[i].status == 'public') {
                    this.kobo_data.push(response.data.data[i])
                }
            }

        })
    },
    computed: {

    },

    methods: {
        detail(index, data) {
            var questionnaire = {
                id: index,
                contenu: data
            }
            this.$store.commit("setQuestionnaire", questionnaire);
            this.$router.push({ name: 'questionnaire_id_details', params: { id: index, questionnaire: data } })

        },
        reload() {
            ProgrammeService.updatekobo().then(response => {
                for (let i = 0; i < response.data.data.length; i++) {
                if (response.data.data[i].status == 'public') {
                    this.kobo_data.push(response.data.data[i])
                }
            }})
        },
        close() {
            this.modal1 = false
        },
        close2() {
            this.modal2 = false
        },
        openModal() {
            this.modal1 = true
        },
        openModal2() {
            this.modal2 = true
        },
        selectAllCheckbox($event) {
            alert('ok')
            let columns = document.querySelectorAll('.rowCheckbox');
            this.listeSelection = [];
            if ($event.target.checked == true) {
                columns.forEach(column => {
                    column.checked = true
                    this.listeSelection.push(parseInt(column.name))

                });
            } else {
                columns.forEach(column => {
                    column.checked = false
                });
                this.listeSelection = [];
            }

        },

    },
}
</script>

<style scoped>
.animation {
    animation: vibration infinite .3s;
}

.bg {
    background-color: #00000080;
    opacity: 0, 3;
    position: absolute;
    width: 100%;
    backdrop-filter: blur(2px);
    height: 100%;
    z-index: 100000000;
}

.bg2 {
    background-color: #00000080;
    opacity: 0, 3;
    position: absolute;
    width: 50%;
    backdrop-filter: blur(5px);
    height: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100000002;
}


@keyframes vibration {
    to {
        transform: rotate(0deg);
        transition: all 0.3s ease-in-out;
    }

    from {
        transform: rotate(3deg);
        transition: all 0.3s ease-in-out;
    }
}
</style>