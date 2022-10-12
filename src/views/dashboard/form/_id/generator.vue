<template>
  <div class="p-4">
    <div class="my-4">
      <form @submit.prevent="sendForm">
        <div class="flex justify-center">
          <div class="w-3/4">
            <div class="border border-dashed border-gray-400 py-6">
              <div class="w-full flex justify-evenly">
                <div class="w-1/5">
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
                <div class="w-1/5">
                  <label class="block py-2 text-sm font-semibold" for="">
                    Site
                    <span class="px-2 text-lg font-black text-red-700">*</span>
                  </label>
                  <select
                    id="pet-select"
                    class="px-4 py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent"
                    v-model="siteId"
                  >
                    <option value="" disabled selected hidden>
                      Veuillez choisir un site
                    </option>
                    <option v-for="(item, i) in sites" :key="i" :value="item.id">{{item.nom}}</option>
                  </select>
                </div>
                <div class="w-1/5">
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
                    <option v-for="(item, i) in utilisateurs" :key="i" :value="item.id">{{item.nom}} {{item.prenom}}</option>
                  </select>
                </div>
                <div class="w-1/5">
                  <label class="block py-2 text-sm font-semibold" for="">
                    Date de collecte
                    <span class="px-2 text-lg font-black text-red-700">*</span>
                  </label>

                  <input
                      id="vrai"
                      name="verite"
                      type="date"
                    class="px-4 py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent"
                    v-model="date"
                    />
                </div>
              </div>
              <div class="w-full flex justify-evenly">
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
                <div class="my-3 w-4/5" v-if="form.inputType=='file'">
                  <input type="text" v-model="form.nom" class="px-2 py-2  text-sm border border-primary w-full outline-none block " placeholder="Televerser un fichier">
                  <input  type="file" @change=" previewFiles" class="px-2 py-2  text-sm border border-primary w-2/3 outline-none block " placeholder="Saisissez votre libellé">
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
      image:'',
      file:'',
      images:[],
      fichiers:[]
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
      sites: "sites/getSites",
      currentUser: "auths/GET_AUTHENTICATE_USER",
    }),
  },
  methods: {
    previewImage(event) {
      this.image = event.target.files[0];
      this.images.push({image:this.image})
      console.log(this.images)
     
    },
    previewFiles(event) {
      this.file = event.target.files;
      this.images.push({fichier:this.file})
      console.log(this.fichiers)
    },
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

    ...mapActions("sites", {
      fetchSites: "FETCH_LIST_SITE",
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
            "siteId": this.siteId,
            "formulaireId": this.$route.params.id ,
            "date":this.date
          };

          console.log(form);

          this.saveESuivi(form)
        });
      });

      this.$router.go(-1)
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

    console.log("Fetching entreprises executantes ...");
    this.fetchEntreprisesExecutante();

    console.log("Fetching users ...");
    this.fetchUtilisateurs()

    console.log("Fetching sites ...")
    this.fetchSites(this.currentUser?.programme?.id)
  },
};
</script>

<style></style>
