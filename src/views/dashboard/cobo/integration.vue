<template>
    <dashboard>
        <div class="w-full">
            <nav class="text-xs md:text-sm font-semibold flex items-center justify-between flex-wrap "
                aria-label="Breadcrumb">
                <div class="mb-2">
                    <ol class="inline-flex p-0 list-none">
                        <li class="flex items-center ">
                            <router-link to="#" class="text-gray-600">dashboard</router-link>
                            <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
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
        </div>
    </dashboard>
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