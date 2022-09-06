<template>
  <div class="p-4">
    <div class="my-4">
      <form @submit.prevent="sendForm">
        <div class="flex justify-center">
          <div class="w-3/4">
            
            <div
              v-for="(checklist, index) in formulaire"
              :key="index"
              class="border border-dashed border-gray-400 p-6"
            >
              
              <div>
                <div v-if="checklist.inputType == 'edit'">
                  <label class="block py-2 text-sm font-semibold" for="">
                    {{ checklist.nom }}
                    <span class="px-2 text-lg font-black text-red-700">*</span>
                  </label>
                  <input
                    type="text"
                    v-model="checklist.content"
                    class="px-4 py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent"
                  />
                </div>
                <div v-if="checklist.inputType == 'photos'">
                  <label class="block py-2 text-sm font-semibold" for="">
                    {{ checklist.nom }}
                    <span class="px-2 text-lg font-black text-red-700">*</span>
                  </label>
                  <input
                    type="file"
                    accept="png,jpg"
                    class="px-4 py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent"
                  />
                </div>
                <div v-if="checklist.inputType == 'boolean'">
                  <label
                    for="name"
                    class="my-4 block text-xl font-medium text-gray-700"
                    >{{ checklist.label }}</label
                  >
                  <div class="flex items-center my-4">
                    <label
                      for="vrai"
                      class="px-4 block text-sm uppercase font-medium text-gray-700"
                    >
                      <input
                        id="vrai"
                        name="verite"
                        v-model="checklist.content"
                        type="radio"
                        class="focus:ring-indigo-500 h-4 w-4 text-primary border-gray-300"
                      />
                      realiser
                    </label>
                    <label
                      for="faux"
                      class="px-4 block text-sm uppercase font-medium text-gray-700"
                    >
                      <input
                        id="faux"
                        name="verite"
                        v-model="checklist.content"
                        type="radio"
                        class="focus:ring-indigo-500 h-4 w-4 text-primary border-gray-300"
                      />
                      non realiser
                    </label>
                  </div>
                </div>
                <div class="" v-if="checklist.inputType == 'multiple'">
                  <label
                    for="name"
                    class="my-4 block text-xl font-medium text-gray-700"
                    >{{ checklist.nom }}</label
                  >
                  <label
                    v-for="answers in Answers"
                    :key="answers.id"
                    class="px-4 text-sm uppercase font-medium text-gray-700"
                  >
                    <input
                      name="multiple"
                      v-model="checklist.content"
                      type="radio"
                      class="focus:ring-indigo-500 h-4 w-4 text-primary border-gray-300"
                    />
                    {{ answers.label }} /
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="py-2 my-2 flex justify-center space-x-8">
          <vbutton type="submit" template="success">Enregistrer </vbutton>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Vform from "@/components/Vform";
import Vbutton from "@/components/Vbutton";
import { mapGetters, mapMutations, mapActions, mapState } from "vuex";
export default {
  components: {
    Vform,
    Vbutton,
  },
  data() {
    return {
      seeChecklist: true,
      seeForm: false,
      showModal: false,
      champs: [],
      formulaire: [],
      userId: "",
      date:"",
      entrepriseId: "",
      headers: [
        { name: "Libelle activite", props: "libelle" },
        { name: "Code activite", props: "code" },
        { name: "Programme", props: "programme" },
        { name: "Date debut", props: "debut" },
        { name: "Date fin", props: "fin" },
        { name: "Date de creation", props: "created_at" },
      ],
      actions: [
        { name: "modifier", iconne: "" },
        { name: "supprimer", iconne: "" },
      ],
    };
  },
  computed: {
    ...mapState({
      identifiant: (state) => state.auths.identifiant,
      loading: (state) => state.loading,
      errors: (state) => state.errors,
      statuts: (state) => state.statuts,
    }),

    ...mapGetters({
      hasErrors: "GET_ERREURS",
      isLoading: "IS_LOADING",
      utilisateurs: "utilisateurs/getUtilisateurs",
      entreprises: "entreprisesExecutante/getEntreprisesExecutante",
      currentUser: "auths/GET_AUTHENTICATE_USER",
    }),
  },
  methods: {
    ...mapActions("formulaires", {
      getFormulaire: "GET_FORMULAIRE",
    }),

    ...mapActions("eSuivis", {
      saveESuivi: "STORE_ESUIVI",
    }),

    ...mapActions("entreprisesExecutante", {
      fetchEntreprisesExecutante: "FETCH_LIST_ENTREPRISE_EXECUTANTE",
    }),

    ...mapActions("utilisateurs", {
      fetchUtilisateurs: "FETCH_LIST_UTILISATEUR",
    }),

    sendForm() {
      this.formulaire.forEach((element) => {
        element.data.forEach((data) => {
          let form = {
            "checkListId": data.id,
            "valeur": data.content,
            "formulaireId": this.$route.params.id ,
            "date":this.date
          };

          console.log(form);

          this.saveESuivi(form)
        });
      });

      

      
    },
  },
  mounted() {
    console.log("Getting formulaire ...");
    this.getFormulaire(this.$route.params.id).then((response) => {
      this.formulaire = response;

      /*this.formulaire = response.map((element) => {
        element = JSON.parse(element);
        return element;
      });*/
    });
  },
};
</script>

<style></style>
