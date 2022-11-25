<template>
  <dashboard>
    <div class="w-full">
      <div v-if="showModal">
        <modal-top-right :title="title" v-on:close="showModal = false">
          <div class="px-4 overflow-y-auto">
            <form action="" @submit.prevent="sendForm" class="w-full"  >
       
              <div class="my-4">
                <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light"> Site <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
                <input required v-model="nom" class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="text" placeholder="Entrer le nom de l'activite" />
              </div>


              <div class="my-4">
                <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light">Bailleur <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
                <select  v-model="bailleur" class="px-3 py-2 mt-1 border-2 border-gray-300  focus:outline-none focus:ring-2 w-full  focus:border-transparent" placeholder="selectionnez une entreprise" :selectLabel="'Appuyez sur Entrée pour sélectionner'" :deselectLabel="'Appuyez sur Entrée pour supprimer'">
                  <option v-for="(item, i) in bailleurs" :key="i" :value="item.id">{{item.sigle}}</option>
                </select>
              </div>
            
              <div class="my-4">
                <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light"> Selectionnez les entreprises <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
                <multiselect v-model="value" tag-placeholder="selectionnez une entreprise" placeholder="selectionnez une entreprise" label="nom" track-by="nom"  :selectLabel="'Appuyez sur Entrée pour sélectionner'" :deselectLabel="'Appuyez sur Entrée pour supprimer'" :options="entreprises"  :multiple="true" :taggable="true" @tag="addTag"></multiselect>
              </div>

            <div class="my-4">
              <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light">Longitude <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
              <input required v-model="longitude" class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="number" step="0.01" placeholder="Entrer la longitude" />
            </div>

            <div class="my-4">
              <label class="text-xs font-semibold text-gray-500 uppercase block md:text-sm text-light">Latitude <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span></label>
              <input required v-model="latitude" class="px-3 py-2 mt-1 border-2 border-gray-300 w-full focus:outline-none focus:ring-2  focus:border-transparent" type="number" step="0.01" placeholder="Entrer la latitude" />
            </div>
          

          <div class='flex items-center justify-center gap-4 pt-5 pb-5 my-4 md:gap-8'>
            <button type="submit" class='w-auto px-4 py-2 font-medium text-white  shadow-xl bg-blue-500 hover:opacity-80'> 
              Creer le site 
            </button>

            <button type="submit" class='w-auto px-4 py-2 font-medium text-white  shadow-xl bg-red-500 hover:opacity-80'> 
              Annuler
            </button>

          </div>
        </form>
        </div>
        </modal-top-right>
      </div>
      <nav class="mb-2 mt-4 text-sm font-semibold flex items-center " aria-label="Breadcrumb">
        <div>
          <ol class="inline-flex p-0 list-none">
            <li class="flex items-center">
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
              <router-link to="" class="">Site</router-link>
            </li>
          </ol>
        </div>
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
        </div>
      </nav>
      <div class="flex items-center justify-between my-2" >
        <div class="flex space-x-4">
          <span
            class="inline-block cursor-pointer border-b-8 font-bold text-base uppercase border-primary py-2"
            >Tableau recapitulatif
          </span>
        </div>
        <button
          @click="addSite"
          v-if="siteAdd"
          title="ajouter un tabelau"
          class="py-2 px-4 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase _rounded bg-primary focus:outline-none focus:shadow-outline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            style="fill: rgba(255, 255, 255, 1); transform: ; msfilter: "
          >
            <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
          </svg>
          <span class="mx-2 text-xs md:text-sm font-semibold">Ajouter </span>
        </button>
      </div>
      <div id="dataTable">
        <vtable
          v-if="siteDelete && !siteUpdate"
          :headers="headers"
          :datas="filteredSite"
          :actions="actionsD"
          @supprimer="supprimer"
        >
         </vtable>
         <vtable
          v-if="!siteDelete && siteUpdate"
          :headers="headers"
          :datas="filteredSite"
          :actions="actionsD"
          @updateInputData="updateInputData"
        >
         </vtable>
         <vtable
          v-if="siteDelete && siteUpdate"
          :headers="headers"
          :datas="filteredSite"
          :actions="actions"
          @supprimer="supprimer"
          @updateInputData="updateInputData"
        >
        </vtable>
      </div>
    </div>
  </dashboard>
</template>

<script>
import ModalTopRight from "@/components/ModalTopRight";
import SearchBar from "@/components/SearchBar";
import Vtable from "@/components/Vtable";
import Vform from "@/components/Vform";
import Vmodal from "@/components/Vmodal";
import Dashboard from "@/layouts/Dashboard";
import Multiselect from 'vue-multiselect';

import { mapActions, mapMutations, mapGetters, mapState } from "vuex";
import extractFormData from "@/utils/extract-data";

export default {
  components: {
    Vtable,
    Dashboard,
    Vmodal,
    Vform,
    SearchBar,
    ModalTopRight,
    Multiselect,
  },

  data() {
    return {
      showModal: false,
      loading: false,
      showInput: true,
      title: "",
      cols: 1,
      value:[],
      search:'',
      headers: [
        { name: 'Site', cle: 'nom' },
        { name: 'Entreprise', cle: 'entreprise' },
        { name: 'Bailleur', cle: 'bailleur' },
        { name: 'Longitude', cle: 'longitude' },
        { name: 'Latitude', cle: 'latitude' },
      ],

      actions: [
        { name: 'modifier', iconne: '' },
        { name: 'supprimer', iconne: '' },
      ],
      actionsD: [
        { name: 'supprimer', iconne: '' },
      ],
      actionsUp: [
        { name: 'modifier', iconne: '' },
      ],
      siteVisible:false,
      siteAdd:false,
      siteDelete:false,
      siteUpdate:false,      
    };
  },

  computed: {
     //importation des variables du module auths
    ...mapState({
      identifiant: state => state.auths.identifiant,
      loading : state => state.loading,
      errors : state => state.errors
    }),

    ...mapGetters({
      hasErrors: "GET_ERREURS",
      isLoading: "IS_LOADING",
      site: "sites/getSite",
      sites: "sites/getSites",
      entreprises: "entreprisesExecutante/getEntreprisesExecutante",
      bailleurs: "bailleurs/getBailleurs",
      currentUser: "auths/GET_AUTHENTICATE_USER",
    }),

    filteredSite(){
        var self = this;

        return this.sites.filter(function (site){
          return site.nom.toLowerCase().indexOf(self.search.toLowerCase()) >= 0 ||
                 site.entreprise?.toLowerCase().indexOf(self.search.toLowerCase()) >= 0 ||
                 site.bailleur.toLowerCase().indexOf(self.search.toLowerCase()) >= 0;
        });
    },

  },

  methods: {
    // call action
    ...mapActions("sites", {
      fetchSites: "FETCH_LIST_SITE",
      saveSite: "STORE_SITE",
      updateSite: "UPDATE_SITE",
      deleteSite: "DESTROY_SITE",
    }),

    ...mapActions('bailleurs', { fetchBailleurs: 'FETCH_LIST_BAILLEUR' }),

    ...mapActions("entreprisesExecutante", {
      fetchEntreprisesExecutante: "FETCH_LIST_ENTREPRISE_EXECUTANTE",
    }),

    //Charger les fonctions de communication avec le serveur
    ...mapMutations({
      setErrors: "SET_ERRORS_MESSAGE", // map `this.setErrors()` to `this.$store.commit('SET_ERRORS_MESSAGE')`,
      setSite: "Sites/FILL", // map `this.CREATE_INSTANCE_ANO()` to `this.$store.commit('CREATE_INSTANCE_ANO')`
    }),

     getPermission() {
        this.currentUser.role[0].permissions.forEach(element => {
            if(element.slug ==='voir-un-site') {
              this.siteVisible = true
            }
            if(element.slug === 'creer-un-site') {
              this.siteAdd = true
            }
            if(element.slug === 'modifier-un-site') {
              this.siteUpdate = true
            }
            if(element.slug ==='supprimer-un-site') {
              this.siteDelete = true
            }
            
          });

      },

    async updateInputData(id, attribut, value) {
        console.log('update');
          await this.updateSite({site: {[attribut] : value}, id : id}).catch((value, status) => {
            if(this.hasErrors[attribut] !== undefined)
              alert(this.hasErrors[attribut])            
          }).finally(() => {
            $('#' + "dataTable").load(location.href + '#' + id + '>*', '')
          })
    },

    sendForm() {
      var entrepriseExecutantId = []
      
      this.entreprises.forEach(element => {
          entrepriseExecutantId.push(element.id)
        });

      let site = {
        "nom" : this.nom,
        "longitude" : this.longitude,
        "latitude" : this.latitude,
        "bailleurId" : this.bailleur,
        "entrepriseExecutantId" : entrepriseExecutantId
      }

      console.log(site);

      
        this.saveSite(site).then((response) => {
          if (response.status == 200 || response.status == 201) {
            this.close();
          }
        });
      
    },

    showCloseModal(value = false) {
      this.showModal = value
    },

    addTag (newTag) {
      const tag = {
        nom: newTag,
      }
      this.options.push(tag)
      this.value.push(tag)
    },

    addSite() {
      this.title='Ajouter un nouveau site'
      this.showCloseModal(true)
    },

    async supprimer(site) {
      if (window.confirm("Voulez-vous supprimer ce  site ?" + site.nom))
        await this.deleteSite(site.id);
    },

    close() {
      this.showModal = false;
    },
  },

  mounted() {
    this.getPermission()
    if(!this.siteVisible) {
      this.$router.push('/401-non-autorise')
    } 
    console.log("Fetching sites ...")
    this.fetchSites(this.currentUser?.programme?.id)

    console.log("Fetching entreprises executantes ...");
    this.fetchEntreprisesExecutante();

    console.log("Fetching list of bailleurs...")
    this.fetchBailleurs()
  },

  watch: {
    loading: function (value) {
      //this.loading = value
    },

    entreprises: function (entreprises) {
      this.entreprises.map((item) => {
        item.nom = item.user.nom
        return item;
        
      });
    }
  },
};
</script>

<style></style>
