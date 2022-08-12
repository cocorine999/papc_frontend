<template>
  <div class="p-4">
    <div class="my-4">
      <form @submit.prevent="sendForm">
        <div class="flex justify-center">
          <div class="w-3/4">
            <div class="border border-dashed border-gray-400 py-6">
              <div class="w-full flex justify-evenly">
                <div class="w-5/12">
                  <label class="block py-2 text-sm font-semibold" for="">
                    Entreprise
                    <span class="px-2 text-lg font-black text-red-700">*</span>
                  </label>
                  <select
                    id="pet-select"
                    class="px-4 py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent"
                    v-model="entrepriseId"
                  >
                    <option value="" disabled selected hidden>
                      Veuillez choisir une entreprise
                    </option>
                    <option v-for="(item, i) in entreprises" :key="i" :value="item.id">{{item.user.nom}}</option>
                  </select>
                </div>
                <div class="w-5/12">
                  <label class="block py-2 text-sm font-semibold" for="">
                    Responsable Enquete
                    <span class="px-2 text-lg font-black text-red-700">*</span>
                  </label>
                  <select
                    id="pet-select"
                    class="px-4 py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent"
                    v-model="userId"
                  >
                    <option value="" disabled selected hidden>
                      Veuillez choisir un responsable
                    </option>
                    <option v-for="(item, i) in utilisateurs" :key="i" :value="item.id">{{item.nom}}</option>
                  </select>
                </div>
              </div>
              <div class="w-full flex justify-evenly">
                <div class="w-5/12">
                  <label class="block py-2 text-sm font-semibold" for="">
                    Mois
                    <span class="px-2 text-lg font-black text-red-700">*</span>
                  </label>

                  <select
                    id="pet-select"
                    class="px-4 py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent"
                    v-model="mois"
                  >
                    <option value="" disabled selected hidden>
                      Veuillez choisir un mois
                    </option>
                    <option value="1">Janvier</option>
                    <option value="2">Février</option>
                    <option value="3">Mars</option>
                    <option value="4">Avril</option>
                    <option value="5">Mai</option>
                    <option value="6">Juin</option>
                    <option value="7">Juillet</option>
                    <option value="8">Août</option>
                    <option value="9">Septembre</option>
                    <option value="10">Octobre</option>
                    <option value="11">Novembre</option>
                    <option value="12">Décembre</option>
                  </select>
                </div>
                <div class="w-5/12">
                  <label class="block py-2 text-sm font-semibold" for="">
                    Année
                    <span class="px-2 text-lg font-black text-red-700">*</span>
                  </label>
                  <input
                    type="number"
                    min="2000"
                    class="px-4 py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent"
                    v-model="annee"
                  />
                </div>
              </div>
            </div>

            <div
              v-for="(checklist, index) in formulaire"
              :key="index"
              class="border border-dashed border-gray-400 p-6"
            >
              <div class="flex justify-between">
                <h1 class="text-lg font-semibold uppercase text-center py-2">
                  {{ checklist.activite.nom }}
                </h1>
                <div class="flex items-center my-4">
                  <label
                    for="vrai"
                    class="px-4 block text-sm uppercase font-medium text-gray-700"
                  >
                    <input
                      id="vrai"
                      name="verite"
                      type="radio"
                      class="focus:ring-indigo-500 h-4 w-4 text-primary border-gray-300"
                      value="1"
                      v-model="checklist.activite.statut"
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
                      type="radio"
                      class="focus:ring-indigo-500 h-4 w-4 text-primary border-gray-300"
                      value="0"
                      v-model="checklist.activite.statut"
                    />
                    non realiser
                  </label>
                </div>
              </div>
              <div v-for="(form, index) in checklist.data" :key="index">
                <div v-if="form.inputType == 'edit'">
                  <label class="block py-2 text-sm font-semibold" for="">
                    {{ form.nom }}
                    <span class="px-2 text-lg font-black text-red-700">*</span>
                  </label>
                  <input
                    type="text"
                    v-model="form.content"
                    class="px-4 py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent"
                  />
                </div>
                <div v-if="form.inputType == 'photos'">
                  <label class="block py-2 text-sm font-semibold" for="">
                    {{ form.nom }}
                    <span class="px-2 text-lg font-black text-red-700">*</span>
                  </label>
                  <input
                    type="file"
                    accept="png,jpg"
                    class="px-4 py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent"
                  />
                </div>
                <div v-if="form.inputType == 'boolean'">
                  <label
                    for="name"
                    class="my-4 block text-xl font-medium text-gray-700"
                    >{{ form.label }}</label
                  >
                  <div class="flex items-center my-4">
                    <label
                      for="vrai"
                      class="px-4 block text-sm uppercase font-medium text-gray-700"
                    >
                      <input
                        id="vrai"
                        name="verite"
                        v-model="form.content"
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
                        v-model="form.content"
                        type="radio"
                        class="focus:ring-indigo-500 h-4 w-4 text-primary border-gray-300"
                      />
                      non realiser
                    </label>
                  </div>
                </div>
                <div class="" v-if="form.inputType == 'multiple'">
                  <label
                    for="name"
                    class="my-4 block text-xl font-medium text-gray-700"
                    >{{ form.nom }}</label
                  >
                  <label
                    v-for="answers in Answers"
                    :key="answers.id"
                    class="px-4 text-sm uppercase font-medium text-gray-700"
                  >
                    <input
                      name="multiple"
                      v-model="form.content"
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
      mois: "",
      annee: 2000,
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
            "activiteId": element.activite.id,
            "checkListId": data.id,
            "valeur": data.content,
            "activiteStatut": element.activite.statut,
            "entrepriseExecutantId": this.entrepriseId,
            "userId": this.userId,
            "formulaireId": this.$route.params.id ,
            "mois": this.mois,
            "annee": this.annee,
          };

          console.log(form);

          this.saveESuivi(form)/*.then((response) => {
            if (response.status == 200 || response.status == 201) {
              this.close();
            }
          });*/
        });
      });

      

      
    },
  },
  mounted() {
    console.log("Getting formulaire ...");
    this.getFormulaire(this.$route.params.id).then((response) => {
      this.formulaire = response;

      this.formulaire = response.map((element) => {
        element = JSON.parse(element);
        return element;
      });
    });

    console.log("Fetching entreprises executantes ...");
    this.fetchEntreprisesExecutante();

    console.log("Fetching users ...");
    this.fetchUtilisateurs()
  },
};
</script>

<style></style>
