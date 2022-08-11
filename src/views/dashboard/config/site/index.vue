<template>
  <dashboard>
    <div class="px-4">
      <div v-if="showModal">
        <modal-top-right :title="title" v-on:close="showModal = false">
          <div class="px-4 overflow-y-auto">
            <vform
              template="default"
              isAllPairSaufDescrip="true"
              :champs="champs"
              :cols="cols"
              submitText="Creer un Site"
              @sendForm="sendForm"
            ></vform>
          </div>
        </modal-top-right>
      </div>
      <nav class="mb-2 mt-4 text-sm font-semibold" aria-label="Breadcrumb">
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
      </nav>
      <div class="flex items-center justify-between my-2">
        <div class="flex space-x-4">
          <span
            class="inline-block cursor-pointer border-b-8 font-bold text-lg uppercase border-primary py-2"
            >Tableau recapitulatif
          </span>
        </div>
        <button
          @click="addTypeAno"
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
          <span class="mx-2 text-sm font-semibold">Ajouter </span>
        </button>
      </div>
      <div id="dataTable">
        <vtable
          :headers="headers"
          :datas="typeAnos"
          :actions="actions"
          @supprimer="supprimer"
          @modifier="modifier"
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

import { mapActions, mapMutations, mapGetters } from "vuex";
import extractFormData from "@/utils/extract-data";

export default {
  components: {
    Vtable,
    Dashboard,
    Vmodal,
    Vform,
    SearchBar,
    ModalTopRight,
  },

  data() {
    return {
      typeAnoAttributs: ["duree", "nom"],
      showModal: false,
      loading: false,
      showInput: true,
      title: "",
      champs: [
        {
          name: "Site",
          key: "nom",
          type: "text",
          placeholdere: "Saissisez un site",
          isSelect: false,
          isTextArea: false,
          data: "",
          required: true,
          errors: [],
        },
        {
          name: "Entreprise",
          key: "",
          type: "",
          placeholdere: "Selectionnez une valeur",
          isSelect: true,
          isTextArea: false,
          data: "",
          options: this.$store.state.statuts,
          cle: "id",
          value: "nom",
          required: true,
          errors: [],
        },

        {
          name: "Latitude",
          key: "nom",
          type: "number",
          placeholdere: "Entrée la latitude",
          isSelect: false,
          isTextArea: false,
          data: "",
          required: true,
          errors: [],
        },

        {
          name: "Longitude",
          key: "duree",
          type: "number",
          placeholdere: "Duree",
          isSelect: false,
          isTextArea: false,
          data: "",
          required: true,
          errors: [],
        },
      ],
      cols: 1,
      headers: [
        { name: "Site", cle: "nom" },
        { name: "Entreprise", cle: "nom" },
        { name: "Longitude", cle: "nom" },
        { name: "Latitude", cle: "nom" },
      ],

      actions: [
        { name: "modifier", iconne: "" },
        { name: "supprimer", iconne: "" },
      ],
    };
  },

  computed: {
    //importation des variables du module auths

    ...mapGetters({
      hasErrors: "GET_ERREURS",
      isLoading: "IS_LOADING",
      typeAno: "typeAnos/getTypeAno",
      typeAnos: "typeAnos/getTypeAnos",
      currentUser: "auths/GET_AUTHENTICATE_USER",
    }),
  },

  methods: {
    // call action
    ...mapActions("typeAnos", {
      fetchTypeAnos: "FETCH_LIST_TYPE_ANO",
      saveTypeAno: "STORE_TYPE_ANO",
      updateTypeAno: "UPDATE_TYPE_ANO",
      deleteTypeAno: "DESTROY_TYPE_ANO",
    }),

    //Charger les fonctions de communication avec le serveur
    ...mapMutations({
      setErrors: "SET_ERRORS_MESSAGE", // map `this.setErrors()` to `this.$store.commit('SET_ERRORS_MESSAGE')`,
      setTypeAno: "TypeAnos/FILL", // map `this.CREATE_INSTANCE_ANO()` to `this.$store.commit('CREATE_INSTANCE_ANO')`
    }),

    ...mapActions("typeAnos", { fetchTypeAnos: "FETCH_LIST_TYPE_ANO" }),

    resetForm() {
      //delete data in form after submit
      this.champs = this.champs.map((item) => {
        item.data = "";
        return item;
      });
      window.document.getElementById("vform")?.reset();
      this.setTypeAno({});
    },

    sendForm() {
      this.champs = this.champs.map((item) => {
        item.errors = [];
        return item;
      });
      let typeAno = extractFormData(this.champs, this.typeAnoAttributs);

      console.log(typeAno);

      if (this.typeAno?.id) {
        this.updateTypeAno({ typeAno: typeAno, id: this.typeAno?.id }).then(
          (response) => {
            if (response.status == 200 || response.status == 201) {
              this.close();
            }
          }
        );
      } else {
        this.saveTypeAno(typeAno).then((response) => {
          if (response.status == 200 || response.status == 201) {
            this.close();
          }
        });
      }
    },

    addTypeAno() {
      this.title = "Ajouter un site";
      this.showModal = true;
    },

    modifier(typeAno) {
      this.title = "Modifier ano {{ ano.nom }}";
      this.submitText = "Modifier";
      this.setTypeAno(ano);
      this.anoAttributs.forEach((item) => {
        this.champs.find((value, index) => {
          if (value.key === item) {
            this.champs[index]["data"] = this.typeAno[item];
          }
        });
      });
      this.showCloseModal(true);
    },

    async supprimer(typeAno) {
      if (window.confirm("Voulez-vous supprimer ce Type d'ano ?" + typeAno.nom))
        await this.deleteTypeAno(typeAno.id);
    },

    close() {
      this.showModal = false;
    },
  },

  mounted() {
    console.log("Fetching type anos ...");
    this.fetchTypeAnos();
  },

  watch: {
    loading: function (value) {
      //this.loading = value
    },

    errors: function (errors) {
      this.champs.forEach((value) => {
        value.errors = errors[value.key];
      });
      //this.errors = errors
    },

    typeAnos: function (typeAnos) {},
  },
};
</script>

<style></style>
