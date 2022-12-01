<template>
  <dashboard>
    <div class="w-full">
      <delete-alert v-if="deleteModal" type="danger" title="Confirm Action" width="sm" v-on:close="deleteModal = false">
        <p class="text-gray-800">
          voulez vous supprimer cet element?
        </p>

        <div class="text-right mt-4">
          <button @click="deleteModal = false" class="px-4 py-2 text-sm text-gray-600 focus:outline-none hover:underline">Annuler</button>
          <button class="mr-2 px-4 py-2 text-sm rounded text-white bg-red-500 focus:outline-none hover:bg-red-400" @click="deleteUniteDeMesure(deleteData)">Supprimer</button>
        </div>
      </delete-alert>

      <div v-if="showModal">
        <modal-top-right  :title="title"  v-on:close="close">

            <div class="w-full p-4">
              <vform
                template="default"
                :champs="champs"
                cols="1"
                :submitText="submitText"
                @sendForm="sendForm"
                @closeModal="close" 
              ></vform>
            </div>
        </modal-top-right>
      </div>
      <nav class="mb-2 mt-4 text-sm font-semibold flex justify-between items-center 	" aria-label="Breadcrumb">
        <div>
          <ol class="inline-flex p-0 list-none">
            <li class="flex items-center ">
              <router-link to="#" class="text-gray-600">dashboard</router-link>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
            </li>
            
            <li class="flex items-center text-blue-500 ">
              <router-link to="" class="">les unités de mesures</router-link>
            </li>
          </ol>
        </div>
        <div>
          <div class="w-full flex text-gray-600">
              <input @input="$emit('search',$event.target.value)" class="h-8 w-full px-5 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none relative -mr-9 block sm:block" v-model="search" type="text" name="search" placeholder="Rechercher" >
              <button type="submit" class="relative  p-2 rounded-lg">
              <svg class="w-4 h-4 text-gray-600 fill-current" xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
              viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve"
              width="512px" height="512px">
            <path
              d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
            </button>
    </div>      </div>
      </nav>
      
      <div class="my-2 flex justify-between items-center ">
        <titre>Les unités de mesure</titre>
        <button v-if="uniteAdd" @click="addUniteeDeMesure" title="ajouter une activite"   class="py-2 px-4  overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
          <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg></span>
          <span class="mx-2 text-xs  md:text-sm font-semibold">ajouter une unité de mesure</span>
        </button>
      </div>

      <div class="align-middle inline-block w-full  overflow-hidden  pt-3 rounded-bl-lg rounded-br-lg">
        <table class="w-full p-4">
          <thead>
            <tr>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">#</th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Nom</th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">Type</th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-center text-sm leading-4 text-primary tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr v-for="(uniteeDeMesure, i) in filteredUnite()" :key="i">
              
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500"> {{i+1}} </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{{uniteeDeMesure.nom}}</td>
              <td  v-if= "uniteeDeMesure.type" class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">Numérique</td>
              <td  v-if = "uniteeDeMesure.type == 0" class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">Non numérique</td>
              <td class="px-6 py-4 whitespace-no-wrap text-center border-b border-gray-500 text-sm leading-5">
                <div class="flex item-center justify-center">
                  <!-- <div title="details"  class="cursor-pointer w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div> -->
                  
                  <div v-if="uniteUpdate" class="w-4 mr-2 transform hover:text-blue-500 hover:scale-110"  @click="modifierUniteeDeMesure(uniteeDeMesure)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  <div v-if="uniteDelete"  class="w-4 mr-2 transform hover:text-blue-500 hover:scale-110"  @click="supprimerUniteeDeMesure(uniteeDeMesure)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </div>
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
import ModalTopRight from '@/components/ModalTopRight'
import SearchBar from '@/components/SearchBar'
import Titre from '@/components/Titre'
import Vmodal from '@/components/Vmodal'
import Dashboard from '@/layouts/Dashboard'
import Vform from '@/components/Vform'
import DeleteAlert from "@/components/DeleteAlert.vue";
import { mapGetters, mapMutations, mapActions } from "vuex"
import UniteDeMesureService from "@/services/modules/unitee.mesure.service";
import extractFormData from "@/utils/extract-data"

export default {
  components: {
    Dashboard,
    Vmodal,
    Titre,
    SearchBar,
    ModalTopRight,
    DeleteAlert,
    Vform,
  },
  data() {
    return ({
      showModal:false,
      title:'',
      submitText: 'Enrégistrer',
      search:'',
      champs: [
        {
          name: "Nom",
          type: "text",
          key: "nom",
          placeholdere: "Nom de l'unitee de mésure",
          isSelect: false,
          isTextArea: false,
          data: "",
          required: true,
          errors: [],
        },
        {
          name: "Type",
          type: "",
          key: "type",
          placeholdere: "Type de l'unitée",
          isSelect: true,
          isTextArea: false,
          options: [{id: 1, nom: "Numérique"}, {id:0, nom:"Non Numérique"}],
          data:"",
          cle: 'id',
          value:'nom',
          required: true,
          errors: [],
        }
      ],
      uniteeDeMesureAttributs: ['nom', 'type'] ,
      uniteVisible:false,
      uniteAdd:false,
      uniteDelete:false,
      uniteUpdate:false,
      deleteData:{},
      deleteModal:false,       
    });
  },

  computed: {
    ...mapGetters({
      hasErrors: "GET_ERREURS",
      isLoading: "IS_LOADING",
      uniteeDeMesure: "uniteesDeMesure/getUniteeDeMesure",
      uniteesDeMesure: "uniteesDeMesure/getUniteesDeMesure",
      currentUser: "auths/GET_AUTHENTICATE_USER",
    }),
  },

  methods: {
      getPermission() {
          this.currentUser.role[0].permissions.forEach(element => {
              if(element.slug ==='voir-une-unite-de-mesure') {
                this.uniteVisible = true
              }
              
              if(element.slug === 'creer-une-unite-de-mesure') {
                this.uniteAdd = true
              }
              if(element.slug === 'modifier-une-unite-de-mesure') {
                this.uniteUpdate = true
              }
              if(element.slug ==='supprimer-une-unite-de-mesure') {
                this.uniteDelete = true
              }
              
            });

      },
      ...mapMutations({
        setErrors: "SET_ERRORS_MESSAGE", // map `this.setErrors()` to `this.$store.commit('SET_ERRORS_MESSAGE')`,
        setUniteeDeMesure: "uniteesDeMesure/FILL", // map `this.CREATE_INSTANCE_PROGRAMME()` to `this.$store.commit('CREATE_INSTANCE_PROGRAMME')`
      }),

      ...mapActions("uniteesDeMesure", {
        fetchUniteesDeMesure: "FETCH_LIST_UNITEE_DE_MESURE",
        saveUniteeDeMesure: "STORE_UNITEE_DE_MESURE",
        updateUniteeDeMesure: "UPDATE_UNITEE_DE_MESURE",
        deleteUniteeDeMesure: "DESTROY_UNITEE_DE_MESURE",
      }),

      filteredUnite(){
        var self = this;

        return this.uniteesDeMesure.filter(function (unitee){
          return unitee.nom.toLowerCase().indexOf(self.search.toLowerCase()) >= 0;
        });
      },

      addUniteeDeMesure() {
        this.title = "Ajouter une nouvelle unitee de mésure";

        this.submitText = "Enrégistrer";

        this.showCloseModal(true);
      },

      modifierUniteeDeMesure (uniteeDeMesure) {
        this.title = "Modification de l'unitee de mésure " + uniteeDeMesure.nom;

        this.submitText = "Modifier";

        this.setUniteeDeMesure(uniteeDeMesure);

        this.uniteeDeMesureAttributs.forEach((item) => {
          this.champs.find((value, index) => {
            if (value.key === item) {
              this.champs[index]["data"] = this.uniteeDeMesure[item];
            }
          });
        });

        this.showCloseModal(true);
      },

    supprimerUniteeDeMesure(uniteeDeMesure,index) {
      this.deleteModal= true
      this.deleteData.data = uniteeDeMesure
      this.deleteData.index = index
    },

    deleteUniteDeMesure(data) {
        //this.filteredIndicateur.splice(data.index,1)
        this.deleteModal= false
        UniteDeMesureService.destroy(data.data.id).then((data) => {
          this.$toast.success("Operation effectué avec success !")
          this.fetchUniteesDeMesure()
        
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
          }
        }) 
    },

   

    dupliquer() {
        this.title = "Ajouter une nouvelle unitee de mésure";
        this.showCloseModal();
    },

    close() {
        this.showCloseModal();

        this.resetForm();
    },

    showCloseModal(value = false) {
        this.showModal = value;
    },

    resetForm() {
        this.champs = this.champs.map((item) => {
          item.data = "";
          return item;
        });

        window.document.getElementById("vform")?.reset();

        this.setUniteeDeMesure({});
    },

    async updateInputData(id, attribut, value) {
        await this.updateUniteeDeMesure({uniteeDeMesure: {[attribut] : value}, id : id}).then((value) => {
          this.setUniteeDeMesure({})
        }).catch((value, status) => {
          if(this.hasErrors[attribut] !== undefined)
            alert(this.hasErrors[attribut])        
        })
    },

    sendForm() {
        this.champs = this.champs.map((item) => {
          item.errors = [];
          return item;
        });

        let uniteeDeMesure = {
          nom:"",
          type:""
        }

        uniteeDeMesure.nom = this.champs[0].data

        uniteeDeMesure.type = this.champs[1].data.id

        console.log(uniteeDeMesure)
        
        if (this.uniteeDeMesure?.id) {
          this.updateUniteeDeMesure({ uniteeDeMesure: uniteeDeMesure, id: this.uniteeDeMesure?.id }).then(
            (response) => {
              if (response.status == 200 || response.status == 201) {
                this.fetchUniteesDeMesure()
                this.close();
              }
            }
          );
        } else {
          this.saveUniteeDeMesure(uniteeDeMesure).then((response) => {
            if (response.status == 200 || response.status == 201) {
              this.fetchUniteesDeMesure()
              this.close();
            }
          });
        }
    }
  },


  watch: {
    isLoading: function (value) {
      //this.loading = value
    },

    hasErrors: function (errors) {
      this.champs.forEach((value) => {
        value.errors = errors[value.key];
      });
      //this.errors = errors
    },
  },

  mounted() {
    this.getPermission();
    console.log('ajout')
    console.log(this.uniteAdd)
    if(!this.uniteVisible) {
      this.$router.push('/401-non-autorise')
    } 
    console.log("Fetching unitees de mesure ...");
    this.fetchUniteesDeMesure()
  },
}
</script>

<style scoped>

</style>