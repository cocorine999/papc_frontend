<template>
  <dashboard>
    <div class="p-4">
      <nav class="mb-2 text-sm font-semibold" aria-label="Breadcrumb">
        <div>
          <ol class="inline-flex p-0 list-none">
            <li class="flex items-center text-blue-500">
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
              <router-link to="/dashboard" class="text-gray-600"
                >projet{{ $route.params.id }}</router-link
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
              <router-link to="/dasboard/projet" class="">details</router-link>
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
              <router-link to="/dasboard/projet" class=""
                >Cadre logique</router-link
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
          </ol>
        </div>
      </nav>
      <div v-if="showModal">
        <modal-top-right :title="title" v-on:close="close">
          <div class="px-8">
            <div v-if="title == 'Ajouter une unité de gestion'">
              <form action="">
                <div class="flex justify-between">
                  <div>
                    <label class="block py-2 text-sm font-semibold" for=""
                      >Objectifs spécifiques</label
                    >
                    <input type="checkbox" name="" id="objectifs_spécifiques" />
                  </div>
                  <div>
                    <label
                      class="block py-2 text-sm font-semibold"
                      for="objectifs_globaux"
                      >Objectifs globaux</label
                    >
                    <input
                      type="checkbox"
                      name="objectifs_globaux"
                      id="objectifs_globaux"
                    />
                  </div>
                  <div>
                    <label
                      class="block py-2 text-sm font-semibold"
                      for="Résultats"
                      >Résultats</label
                    >
                    <input type="checkbox" name="" id="resultat" />
                  </div>
                </div>

                <div :class="`grid grid-cols-1 gap-4`">
                  <div v-for="input in Inputs" :key="input.id">
                    <label class="block py-2 text-sm font-semibold" for="">
                      {{ input.name }}
                      <span
                        v-if="input.required"
                        class="px-2 text-lg font-black text-red-700"
                        >*</span
                      >
                    </label>
                    <input
                      :required="input.required"
                      v-model="input.data"
                      :placeholder="input.placeholdere"
                      :type="input.type"
                      class="px-4 py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent"
                    />
                  </div>
                </div>

                <div v-for="area in TextArea" :key="area.id">
                  <label class="block py-2 text-sm font-semibold" for="">
                    {{ area.name }}
                    <span
                      v-if="area.required"
                      class="px-2 text-lg font-black text-red-700"
                      >*</span
                    >
                  </label>
                  <textarea
                    v-model="area.data"
                    class="px-4 py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent"
                    required
                    rows="3"
                  ></textarea>

                  <div v-for="(error, key) in area.errors" :key="key">
                    <span class="text-red-500 absolute right-4 top-2"
                      ><svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 512 512"
                        height="1.8em"
                        width="1.6em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z"
                        ></path></svg
                    ></span>
                    <div class="text-red-500 text-sm py-2 font-semibold">
                      error
                    </div>
                  </div>
                </div>

                <div class="py-2 my-2 flex justify-center space-x-8">
                  <vbutton type="submit" template="success">
                    Créer Cadre logique
                  </vbutton>
                  <vbutton type="reset" template="danger"> annuler </vbutton>
                </div>
              </form>

              <!-- <vform
                template="default"
                :champs="champs"
                :cols="cols"
                submitText="Enregistrer"
                @sendForm="sendForm"
              ></vform> -->
            </div>
            <div v-if="title == 'Modifier une unité de gestion'">
              <vform
                template="default"
                :champs="champs"
                :cols="cols"
                submitText="Modifier"
                @sendForm="sendForm"
              ></vform>
            </div>
          </div>
        </modal-top-right>
      </div>
      <div class="flex items-center justify-between">
        <titre>Cadre logique </titre>
        <button
          @click="addUnite"
          title="ajouter "
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
          <span class="mx-2 text-sm font-semibold">ajouter</span>
        </button>
      </div>
      <vtable
        :headers="headers"
        :datas="dataTable"
        :actions="actions"
        @supprimer="supprimer"
        @modifier="modifier"
      ></vtable>
    </div>
  </dashboard>
</template>

<script>
import ModalTopRight from "@/components/ModalTopRight";
import SearchBar from "@/components/SearchBar";
import Titre from "@/components/Titre";
import Vtable from "@/components/Vtable";
import Vform from "@/components/VformC";
import Vmodal from "@/components/Vmodal";
import Dashboard from "@/layouts/Dashboard";
import Multiselect from "vue-multiselect";
import Vbutton from "@/components/Vbutton";
export default {
  components: {
    Vtable,
    Dashboard,
    Vmodal,
    Vform,
    Titre,
    SearchBar,
    ModalTopRight,
    Vbutton,
    Multiselect,
  },
  data() {
    return {
      showModal: false,
      title: "",
      checkbox: false,
      champs: [
        {
          name: "Description",
          type: "",
          placeholdere: "Choisir un programme",
          isSelect: false,
          isTextArea: true,
          data: "",
          options: ["pool papc", "gouvernement"],
          required: true,
        },
        {
          name: "Indicateurs",
          type: "",
          placeholdere: "Choisir un programme",
          isSelect: false,
          isTextArea: true,
          data: "",
          options: ["pool papc", "gouvernement"],
          required: true,
        },
        {
          name: "Source de vérification",
          type: "",
          placeholdere: "Choisir un programme",
          isSelect: false,
          isTextArea: true,
          data: "",
          options: ["pool papc", "gouvernement"],
          required: true,
        },
        {
          name: "Hypothèse",
          type: "",
          placeholdere: "Choisir un programme",
          isSelect: false,
          isTextArea: true,
          data: "",
          options: ["pool papc", "gouvernement"],
          required: true,
        },
      ],
      cols: 1,

      headers: [
        { name: "Description du projet", props: "descriptions" },
        { name: "Indicateurs", props: "indicateurs" },
        { name: "Sources de vérification", props: "sources" },
        { name: "Hypothèse", props: "hypothèses" },
        { name: "Risque", props: "risques" },
      ],

      dataTable: [
        {
          descriptions: "Objectifs globaux -  ",
          indicateurs:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem cupiditate nihil corrupti obcaecati libero deleniti, ad magnam saepe quis enim, voluptas alias temporibus dignissimos explicabo natus quia ducimus dolor provident.  ",
          sources:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem cupiditate nihil corrupti obcaecati libero deleniti, ad magnam saepe quis enim, voluptas alias temporibus dignissimos explicabo natus quia ducimus dolor provident.",
          hypothèses:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem cupiditate nihil corrupti obcaecati libero deleniti, ad magnam saepe quis enim, voluptas alias temporibus dignissimos explicabo natus quia ducimus dolor provident.",
          risques:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem cupiditate nihil corrupti obcaecati libero deleniti, ad magnam saepe quis enim, voluptas alias temporibus dignissimos explicabo natus quia ducimus dolor provident.",
        },
        {
          descriptions:
            "Objectifs spécifique -avantages directs destinés au(x) groupe(s) cible(s)  ",
          indicateurs:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem cupiditate nihil corrupti obcaecati libero deleniti, ad magnam saepe quis enim, voluptas alias temporibus dignissimos explicabo natus quia ducimus dolor provident.",
          sources:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem cupiditate nihil corrupti obcaecati libero deleniti, ad magnam saepe quis enim, voluptas alias temporibus dignissimos explicabo natus quia ducimus dolor provident.",
          hypothèses:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem cupiditate nihil corrupti obcaecati libero deleniti, ad magnam saepe quis enim, voluptas alias temporibus dignissimos explicabo natus quia ducimus dolor provident.",
          risques:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem cupiditate nihil corrupti obcaecati libero deleniti, ad magnam saepe quis enim, voluptas alias temporibus dignissimos explicabo natus quia ducimus dolor provident.",
        },
        {
          descriptions:
            "Résultats – produits ou services tangibles apportés par le projet  ",
          indicateurs:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem cupiditate nihil corrupti obcaecati libero deleniti, ad magnam saepe quis enim, voluptas alias temporibus dignissimos explicabo natus quia ducimus dolor provident. ",
          sources:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem cupiditate nihil corrupti obcaecati libero deleniti, ad magnam saepe quis enim, voluptas alias temporibus dignissimos explicabo natus quia ducimus dolor provident.",
          hypothèses:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem cupiditate nihil corrupti obcaecati libero deleniti, ad magnam saepe quis enim, voluptas alias temporibus dignissimos explicabo natus quia ducimus dolor provident.",
          risques:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem cupiditate nihil corrupti obcaecati libero deleniti, ad magnam saepe quis enim, voluptas alias temporibus dignissimos explicabo natus quia ducimus dolor provident.",
        },
        {
          descriptions:
            "Activités – taches a réalisé pour obtenir les résultats souhaités  ",
          indicateurs: "En option ",
          sources:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem cupiditate nihil corrupti obcaecati libero deleniti, ad magnam saepe quis enim, voluptas alias temporibus dignissimos explicabo natus quia ducimus dolor provident.",
          hypothèses:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem cupiditate nihil corrupti obcaecati libero deleniti, ad magnam saepe quis enim, voluptas alias temporibus dignissimos explicabo natus quia ducimus dolor provident.",
          risques:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem cupiditate nihil corrupti obcaecati libero deleniti, ad magnam saepe quis enim, voluptas alias temporibus dignissimos explicabo natus quia ducimus dolor provident.",
        },
      ],
      actions: [{ name: "supprimer", iconne: "" }],
    };
  },
  computed: {
    Inputs() {
      let datas = [];
      if (this.champs != undefined || this.champs != null) {
        this.champs.forEach((element) => {
          if (element.isSelect === false && element.isTextArea === false) {
            datas.push(element);
          }
        });
      }

      return datas;
    },
    Selects() {
      let datas = [];
      if (this.champs != undefined || this.champs != null) {
        this.champs.forEach((element) => {
          if (element.isSelect === true && element.isTextArea === false) {
            datas.push(element);
          }
        });
      }
      return datas;
    },
    TextArea() {
      let datas = [];
      if (this.champs != undefined || this.champs != null) {
        this.champs.forEach((element) => {
          if (element.isTextArea === true && element.isSelect === false) {
            datas.push(element);
          }
        });
      }
      return datas;
    },
  },
  methods: {
    save() {
      this.$emit("sendForm");
    },

    checkbox() {
      if (type === "checkbox") {
        this.checkbox = true;
      }
    },
  },
  mounted() {},
  methods: {
    sendForm() {
      alert("donnée envoyer");
    },
    close() {
      this.showModal = false;
    },
    addUnite() {
      this.title = "Ajouter une unité de gestion";
      this.showModal = true;
    },
    modifier(data) {
      this.title = "Modifier une unité de gestion";
      this.showModal = true;
      alert(data + " à ete modifier");
    },
    supprimer(data) {
      alert(data + " à ete bien supprimer");
    },
  },
};
</script>

<style scoped></style>
