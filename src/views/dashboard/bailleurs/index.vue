<template>
  <dashboard>
    <div  class="w-full px-4">
      <div v-if="showModal">
        <modal-top-right :title="title" v-on:close="close">
          <div class="px-4">
            <vform
              v-if="!isUpdate"
              template="default"
              @getImage="getImage"
              :champs="champs"
              :cols="cols"
              :submitText="submitText"
              @sendForm="sendForm"
              :sendRequest="sendRequest"
              @closeModal="close" 
            ></vform>
             <vform
              v-else
              template="default"
              @getImage="getImage"
              :champs="champsUpdate"
              :cols="cols"
              :sendRequest="sendRequest"
              :submitText="submitText"
              @sendForm="sendForm"
              @closeModal="close" 
            ></vform>
          </div>
        </modal-top-right>
      </div>
      <div v-if="showUpdateImage">
        <vmodal title="changer le logo" v-on:close="showUpdateImage = false">
          <div style="width:500px" title="cliquer pour changer" @click="isChange = true" v-if="!isChange" class="cursor-pointer">
           <img v-if="logo != null || logo != undefined" 
              class=" max-h-52 w-full object-cover transition-transform duration-300 transform group-hover:scale-100"
              :src="`${base_url}${logo.url}`">
            <img v-else class=" max-h-52 w-full object-cover transition-transform duration-300 transform group-hover:scale-100"
              src="@/assets/images/login/logo-gouv.webp"
              alt="">
          </div>
          <div v-else class="px-6" style="width: 60vw !important">
            <vform
              template="default"
              :champs="champsLogo"
              :sendRequest="sendRequest"
               @getImage="getImage" 
              submitText="Changer"
              @sendForm="saveImage"
            ></vform>
          </div>
        </vmodal>
      </div>
      <div class="w-full p-4">
          <nav
          class="mb-2 text-sm font-semibold flex justify-between items-center"
          aria-label="Breadcrumb"
        >
          <div>
            <ol class="inline-flex p-0 list-none">
              <li class="flex items-center text-blue-500">
                <router-link to="" class="text-gray-600">dashboard</router-link>
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
              <li class="flex items-center">
                <router-link to="" class="text-gray-600">bailleurs</router-link>
              </li>
            </ol>
          </div>
          <div>
            <div class="flex justify-center w-full text-gray-600">
            <input @input="$emit('search',$event.target.value)" class="h-10  w-full px-5 pr-16 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none" v-model="search" type="text" name="search" placeholder="Rechercher" >
            <button type="submit" class="relative  right-10 ">
            <svg class="w-4 h-4 text-gray-600 fill-current" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
            viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve"
            width="512px" height="512px">
           <path
            d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
           </svg>
           </button>
  </div>
          </div>
          </nav>
        
        <div v-if="bailleurAdd" class="flex items-center justify-between my-2">
          <titre>Les bailleurs </titre>
          <button
            v-if="bailleurAdd"
            @click="addBailleur"
            title="ajouter un bailleur"
            class="px-4 py-2 flex overflow-hidden items-center text-xs font-semibold text-white uppercase bg-primary focus:outline-none focus:shadow-outline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              style="fill: rgba(255, 255, 255, 1); transform: ; msfilter: "
            >
              <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
            </svg>
            <span class="mx-2 text-sm font-semibold">Ajouter </span>
          </button>
        </div>

        <div  class="grid grid-cols-1 my-4 lg:grid-cols-3 md:grid-cols-2 sm:gap-5" >
          <div v-for="(bailleur, index) in filteredBailleur()" :key="index">
            <div class="relative" >
              <div v-if="bailleurUpdate" class="absolute right-1 top-4 z-10  cursor-pointer">
                <dropdown  @modifier="modifier(bailleur)" @couverture="changeLogo(bailleur)" :option="optionUp"></dropdown>
              </div>
              
              <div v-if="bailleurDelete" class="absolute right-1 top-4 z-10  cursor-pointer">
                <dropdown @supprimer="supprimer(bailleur)" :option="optionD"></dropdown>
              </div>

              <div v-if="bailleurUpdate && bailleurDelete " class="absolute right-1 top-4 z-10  cursor-pointer">
                <dropdown @supprimer="supprimer(bailleur)" @couverture="changeLogo(bailleur)" @modifier="modifier(bailleur)"  :option="option"></dropdown>
              </div>
              
              <div class="relative p-6 max-w-80 bg-white sm:rounded-lg overflow-hidden _shadow-md">
                <span class="absolute bottom-0 left-0 w-full h-8 text-white font-semibold leading-3 px-8 py-2 text-right "><p>Code : {{ bailleur.code }}</p></span>
                <div class="flex h-20 top-0 absolute  text-4xl sm:text-5xl text-white tracking-tight font-bold  py-2 rounded-lg uppercase">
               
                   <img v-if="bailleur.logo != null || bailleur.logo != undefined" 
                    class=" max-h-52 w-full object-contain transition-transform duration-300 transform group-hover:scale-100"
                    :src="`${base_url}${bailleur.logo.url}`">
                  <img v-else class=" max-h-52 w-full object-contain transition-transform duration-300 transform group-hover:scale-100"
                    src="@/assets/images/login/logo-gouv.webp"
                    alt="">
                </div>
                <!-- dots 
                <span class="absolute right-0 cursor-pointer"
                  ><i class="bx bx-dots-vertical-rounded bx-md pr-2"></i
                ></span>
                 ./dots -->
                <p
                  class="my-2 text-normal text-lg sm:text-2xl font-medium text-gray-600 mt-16 truncate"
                >
                  {{ bailleur.user.nom }}
                </p>

                <div class="flex items-center mt-8 text-gray-600">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    class="w-8 h-8 text-gray-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div
                    class="ml-4 text-md tracking-wide font-semibold w-full truncate"
                  >
                    {{ bailleur.pays }}
                  </div>
                </div>

                <div
                  class="flex items-center mt-1 text-gray-600 dark:text-gray-400"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    class="w-8 h-8 text-gray-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <div
                    class="ml-4 text-md tracking-wide font-semibold w-full truncate"
                  >
                    {{ bailleur.user.contact }}
                  </div>
                </div>

                <div
                  class="flex items-center mb-8 text-gray-600 dark:text-gray-400"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    class="w-8 h-8 text-gray-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div
                    class="ml-4 text-md tracking-wide font-semibold w-full truncate"
                  >
                    {{ bailleur.user.email }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
       
<!-- 
        <div v-if="line" class="line my-4">
          <vtable id="datatable"
            :headers="headers"
            :datas="bailleurs"
            :actions="actions"
            @supprimer="supprimer"
            @modifier="modifier"
            @updateInputData="updateInputData" 
          ></vtable>
        </div> -->
      </div>
    </div>
  </dashboard>
</template>

<script>
  import ModalTopRight from "@/components/ModalTopRight";
  import SearchBar from "@/components/SearchBar";
  import CardBailleur from "@/components/CardBailleur";
  import Titre from "@/components/Titre";
  import Vtable from "@/components/Vtable";
  import Vform from "@/components/Vform";
  import Vmodal from "@/components/Vmodal";
  import Dashboard from "@/layouts/Dashboard";
  import Dropdown from '@/components/Dropdown.vue'
  import { mapGetters, mapMutations, mapActions } from "vuex";
  import extractFormData from "@/utils/extract-data";
  import {API_BASE_URL} from "@/services/configs/environment.js";
  import BailleurService from "@/services/modules/bailleur.service.js";
  import PermissionsService from "@/services/modules/permission.service.js";
  export default {
    components: {
      Vtable,
      Dashboard,
      Vmodal,
      Vform,
      CardBailleur,
      Titre,
      SearchBar,
      ModalTopRight,
      Dropdown
    },
    
    data() {
      return {
        base_url:API_BASE_URL,
        isUpdate:false,
        bailleurAttributs: ["nom", "email", "contact", "code", "pays", "sigle"],
        showModal: false,
        champsLogo:[
          {name: 'Changer le logo', type: 'file', placeholdere: 'Changer le logo',isImage:true, isSelect: false, isTextArea: false, data:'', required: false, errors : []},
        ],
        image:{},
        showUpdateImage:false,
        programmeId: this.currentUser?.programme?.id,
        title: "Ajouter un nouveau bailleur",
        submitText: "Enrégistrer",
        search:"",
        bailleurUpdate:false,
        headers: [
          { name: "Bailleurs", props: "user", cle: "nom"},
          { name: "Code PTA", cle: "code", edit : false },
          { name: "Pays", cle: "pays", edit: true },
        ],

        actions: [
          { name: "modifier", iconne: "" },
          { name: "supprimer", iconne: "" },
        ],

        champs: [
          {
            name: "Nom",
            type: "text",
            key: "nom",
            placeholdere: "Nom du bailleur",
            isSelect: false,
            isTextArea: false,
            data: "",
            required: true,
            errors: [],
          },
          {
            name: "Code",
            type: "number",
            key: "code",
            placeholdere: "Code du bailleur",
            isSelect: false,
            isTextArea: false,
            data: "",
            required: true,
            errors: [],
          },
          {
            name: "Sigle",
            type: "text",
            key: "sigle",
            placeholdere: "Sigle du bailleur",
            isSelect: false,
            isTextArea: false,
            data: "",
            required: true,
            errors: [],
          },
          {
            name: "Email",
            type: "email",
            key: "email",
            placeholdere: "Votre Email",
            isSelect: false,
            isTextArea: false,
            data: "",
            required: true,
            errors: [],
          },
          {
            name: "Contact",
            type: "number",
            key: "contact",
            placeholdere: "Votre contact",
            isSelect: false,
            isTextArea: false,
            data: "",
            required: true,
            errors: [],
          },
          {
            name: "Pays",
            type: "text",
            key: "pays",
            placeholdere: "Pays du bailleur",
            isSelect: false,
            isTextArea: false,
            data: "",
            required: true,
            errors: [],
          },

          {name:'Logo',type:'file',isImage:true,placeholdere:'Votre logo ',isSelect:false,isTextArea:false,data:'',required:true, errors: []},
        ],
        champsUpdate: [
          {
            name: "Nom",
            type: "text",
            key: "nom",
            placeholdere: "Nom du bailleur",
            isSelect: false,
            isTextArea: false,
            data: "",
            required: true,
            errors: [],
          },
          {
            name: "Code",
            type: "number",
            key: "code",
            placeholdere: "Code du bailleur",
            isSelect: false,
            isTextArea: false,
            data: "",
            required: true,
            errors: [],
          },
          {
            name: "Sigle",
            type: "text",
            key: "sigle",
            placeholdere: "Sigle du bailleur",
            isSelect: false,
            isTextArea: false,
            data: "",
            required: true,
            errors: [],
          },
          {
            name: "Email",
            type: "email",
            key: "email",
            placeholdere: "Votre Email",
            isSelect: false,
            isTextArea: false,
            data: "",
            required: true,
            errors: [],
          },
          {
            name: "Contact",
            type: "number",
            key: "contact",
            placeholdere: "Votre contact",
            isSelect: false,
            isTextArea: false,
            data: "",
            required: true,
            errors: [],
          },
          {
            name: "Pays",
            type: "text",
            key: "pays",
            placeholdere: "Pays du bailleur",
            isSelect: false,
            isTextArea: false,
            data: "",
            required: true,
            errors: [],
          },

        ],
        cols: 1,
        optionLogo: [{name:'couverture'}],
        optionD: [{ name: "supprimer" }],
        optionUp: [{ name: "modifier" },{name:'couverture'}],
        option: [{ name: "supprimer" }, { name: "modifier" },{name:'changer logo'}],
        bailleurVisible:false,
        bailleurAdd:false,
        bailleurDelete:false,
        bailleurUpdate:false,
        isChange:false,
        logo:{},
        idBailleur:'',
        sendRequest: false,
        code:''
       
      };
    },

    computed: {
      ...mapGetters({
        hasErrors: "GET_ERREURS",
        isLoading: "IS_LOADING",
        bailleur: "bailleurs/getBailleur",
        bailleurs: "bailleurs/getBailleurs",
        currentUser : 'auths/GET_AUTHENTICATE_USER'
      }),
      ...mapGetters('auths', {currentUser : 'GET_AUTHENTICATE_USER'})
    },

    methods: {
    getImage(data) {
      this.image = data
     
    },
    saveImage() {
      if(this.sendRequest == false) {
        this.sendRequest = true
        const formData = new FormData();
        formData.append('logo',this.image)
        formData.append('code',this.code)
        formData.append('programmeId',this.programmeId)
        BailleurService.update(this.idBailleur,formData).then(() => {
        this.$toast.success('Le logo  à éte bien changer')
        this.showUpdateImage = false 
        this.sendRequest = false
        }).catch((error) => {
          this.sendRequest = false
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
      }
    },
    changeLogo(data) {
      this.logo = data.logo
      this.idBailleur = data.id
      this.code = data.code
      console.log(data)
      this.showUpdateImage = true
    },
    active() {
        this.$store.dispatch('active')
    },
    disabled() {
        this.$store.dispatch('disabled')
    },
    ...mapMutations({
        setErrors: "SET_ERRORS_MESSAGE", // map `this.setErrors()` to `this.$store.commit('SET_ERRORS_MESSAGE')`,
        setBailleur: "bailleurs/FILL", // map `this.CREATE_INSTANCE_PROGRAMME()` to `this.$store.commit('CREATE_INSTANCE_PROGRAMME')`
      }),
     
    getPermission() {
         this.currentUser.role[0].permissions.forEach(element => {
            if(element.slug ==='voir-un-bailleur') {
              this.bailleurVisible = true
            }
            if(element.slug === 'creer-un-bailleur') {
              this.bailleurAdd = true
            }
            if(element.slug === 'modifier-un-bailleur') {
              this.bailleurUpdate = true
            }
            if(element.slug ==='supprimer-un-bailleur') {
              this.bailleurDelete = true
            }
          });
    },

    ...mapActions("bailleurs", {
        fetchBailleurs: "FETCH_LIST_BAILLEUR_OF_PROGRAMME",
        saveBailleur: "STORE_BAILLEUR",
        updateBailleur: "UPDATE_BAILLEUR",
        deleteBailleur: "DESTROY_BAILLEUR",
      }),

    switchBetweenCode({mosaique, line}) {
        this.mosaique = mosaique
        this.line = line
    },

    addBailleur() {
        this.title = "Ajouter un bailleur";

        this.submitText = "Enrégistrer";

        this.showCloseModal(true);
    },

    modifier(bailleur) {
        this.title = "Modifier le bailleur";
        this.isUpdate = true
        this.submitText = "Modifier";

        this.setBailleur(bailleur);

        this.bailleurAttributs.forEach((item) => {
          this.champsUpdate.find((value, index) => {
            if (value.key === item) {
              if (item === "nom" || item === "email" || item === "contact")
                this.champsUpdate[index]["data"] = this.bailleur.user[item];
              else this.champsUpdate[index]["data"] = this.bailleur[item];
            }
          });
        });

        this.showCloseModal(true);
    },

    supprimer(bailleur) {
        console.log(bailleur)
        if (
          window.confirm("Voulez-vous supprimer le bailleur " + bailleur.user.nom)
        )
          this.deleteBailleur(bailleur.id);
    },

    dupliquer() {
        this.title = "Dupliquer un bailleur";
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

        this.setBailleur({});
    },

    async updateInputData(id, attribut, value) {
        await this.updateBailleur({bailleur: {[attribut] : value}, id : id}).then((value) => {
          this.setBailleur({})
        }).catch((value, status) => {
          if(this.hasErrors[attribut] !== undefined)
            alert(this.hasErrors[attribut])        
        })
    },

    filteredBailleur(){
        var self = this;

        return this.bailleurs.filter(function (bailleur){
          return bailleur.sigle.toLowerCase().indexOf(self.search.toLowerCase()) >= 0 || 
                 bailleur.user.email.toLowerCase().indexOf(self.search.toLowerCase()) >= 0 ||
                 bailleur.user.nom.toLowerCase().indexOf(self.search.toLowerCase()) >= 0;
        });
    },

    sendForm() {
        
        this.champs = this.champs.map((item) => {
          item.errors = [];
          return item;
        });
        let bailleur ={}
        if(this.isUpdate) {
          bailleur = extractFormData(this.champsUpdate, this.bailleurAttributs);
        }else {
           bailleur = extractFormData(this.champs, this.bailleurAttributs);
        }

        bailleur.programmeId = this.programmeId;
        if(this.sendRequest == false) {
          this.sendRequest = true
          if (this.bailleur?.id) {
            this.updateBailleur({ bailleur: bailleur, id: this.bailleur?.id }).then(
              (response) => {
                if (response.status == 200 || response.status == 201) {
                  this.close();
                  this.sendRequest = false
                }
              }
            ).catch((error) => {
              this.sendRequest = false
              if (error.response) {
                // Requête effectuée mais le serveur a répondu par une erreur.
                const message = error.response.data.message
                this.$toast.error(message)
              } else if (error.request) {
             
              } else {
              
              }
              })
      

          } else {
            const demo = {
              "nom": bailleur.nom,
              "email": bailleur.email,
              "contact": bailleur.contact,
              "code": bailleur.code,
              "pays": bailleur.pays,
              "sigle": bailleur.sigle,
            }
          
            const formData = new FormData();
            formData.append('nom',demo.nom)
            formData.append('email',demo.email)
            formData.append('contact',demo.contact)
            formData.append('code',demo.code)
            formData.append('pays',demo.pays)
            formData.append('sigle',demo.sigle)
            formData.append('logo',this.image)
            formData.append('programmeId',this.programmeId)
            
            this.saveBailleur(formData).then((response) => {
              if (response.status == 200 || response.status == 201) {
                this.close();
                this.sendRequest = false
              }
            }).catch((error) => {
            this.sendRequest = false
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
          }
        }
    },
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
      }
    },

    created() {
      console.log("current users",this.currentUser)
      console.log("Fetching bailleurs ...");
      this.programmeId = this.currentUser.programme.id
      if(this.programmeId){
        this.fetchBailleurs(this.programmeId)
      }
      
    },

    mounted(){
      this.getPermission()
      if(!this.bailleurVisible) {
        this.$router.push('/401-non-autorise')
      } 
     
    }
  };
</script>

<style></style>
