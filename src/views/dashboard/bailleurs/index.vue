<template>
  <dashboard>
    <div class="w-full px-4">
      <div v-if="showModal">
        <modal-top-right :title="title" v-on:close="close">
          <div class="px-4">
            <vform
              template="default"
              :champs="champs"
              :cols="cols"
              :submitText="submitText"
              @sendForm="sendForm"
              @closeModal="close" 
            ></vform>
          </div>
        </modal-top-right>
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
            <search-bar></search-bar>
          </div>
        </nav>

        <div class="flex justify-start mt-2">
          <div class="flex items-center">
            <span
              title="vue en mosaique"
              @click="switchBetweenCode({mosaique: true, line: false})"
              :class="{ 'border-2': mosaique }"
              class="p-2 cursor-pointer border-gray-500 text-gray-700 hover:text-gray-500"
              ><svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                height="1.8em"
                width="1.8em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  d="M3 5v14a2 2 0 002 2h6V3H5a2 2 0 00-2 2zm16-2h-6v8h8V5c0-1.1-.9-2-2-2zm-6 18h6c1.1 0 2-.9 2-2v-6h-8v8z"
                ></path></svg
            ></span>
            <span
              title="vue en ligne"
              @click="switchBetweenCode({mosaique: false, line: true})"
              :class="{ 'border-2': line }"
              class="p-2 text-gray-700 border-gray-500 cursor-pointer hover:text-gray-500"
              ><svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                height="1.8em"
                width="1.8em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  d="M3 14h4v-4H3v4zm0 5h4v-4H3v4zM3 9h4V5H3v4zm5 5h13v-4H8v4zm0 5h13v-4H8v4zM8 5v4h13V5H8z"
                ></path></svg
            ></span>
          </div>
        </div>

        <div class="flex items-center justify-between my-2">
          <titre>Les bailleurs </titre>
          <button
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

        <div v-if="mosaique" class="grid grid-cols-1 my-4 lg:grid-cols-3 md:grid-cols-2 sm:gap-5" >
          <div v-for="(bailleur, index) in bailleurs" :key="index">
            <div class="relative" >
              <div class="absolute right-1 top-4 z-10  cursor-pointer">
                <dropdown @supprimer="supprimer(bailleur)" @modifier="modifier(bailleur)" @duplicate='dupliquer(bailleur)' :option="option"></dropdown>
              </div>
              
              <div class="relative p-6 max-w-80 bg-white sm:rounded-lg overflow-hidden _shadow-md">
                <span class="absolute bottom-0 left-0 w-full h-8 text-white font-semibold leading-3 px-8 py-2 text-right "><p>Code : {{ bailleur.code }}</p></span>
                <div class="flex h-20 top-0 absolute  text-4xl sm:text-5xl text-white tracking-tight font-bold  py-2 rounded-lg uppercase">
                  <img  class="w-full object-contain " src="@/assets/images/login/logo-gouv.webp" alt="AFD">
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
        bailleurAttributs: ["nom", "email", "contact", "code", "pays", "sigle"],
        showModal: false,
        programmeId: this.currentUser?.programme?.id,
        line: false,
        mosaique: true,
        title: "Ajouter un nouveau bailleur",
        submitText: "Enrégistrer",
        headers: [
          { name: "Bailleurs", props: "user", cle: "nom"},
          { name: "Sigle", cle: "sigle"},
          { name: "Code PTA", cle: "code", edit : false },
          { name: "Pays", cle: "pays", edit: true },
          { name: "Date creation", cle: "created_at", edit : false },
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

          {name:'Logo',type:'file',placeholdere:'Votre logo ',isSelect:false,isTextArea:false,data:'',required:true, errors: []},
        ],
        cols: 1,

        option: [{ name: "supprimer" }, { name: "modifier" }],
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
    },

    methods: {
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

        this.submitText = "Modifier";

        this.setBailleur(bailleur);

        this.bailleurAttributs.forEach((item) => {
          this.champs.find((value, index) => {
            if (value.key === item) {
              if (item === "nom" || item === "email" || item === "contact")
                this.champs[index]["data"] = this.bailleur.user[item];
              else this.champs[index]["data"] = this.bailleur[item];
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

      sendForm() {
        
        this.champs = this.champs.map((item) => {
          item.errors = [];
          return item;
        });

        let bailleur = extractFormData(this.champs, this.bailleurAttributs);

        bailleur.programmeId = this.programmeId;

        if (this.bailleur?.id) {
          this.updateBailleur({ bailleur: bailleur, id: this.bailleur?.id }).then(
            (response) => {
              if (response.status == 200 || response.status == 201) {
                this.close();
              }
            }
          );
        } else {
          this.saveBailleur(bailleur).then((response) => {
            if (response.status == 200 || response.status == 201) {
              this.close();
            }
          });
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
      
      console.log("Fetching bailleurs ...");
      this.programmeId = this.currentUser.programme.id
      if(this.programmeId){
        this.fetchBailleurs(this.programmeId)
      }
      
    },

    mounted(){
      
     
    }
  };
</script>

<style></style>
