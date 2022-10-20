<template>
  <div class="p-4 w-full">
    <div class="my-4">
      <form @submit.prevent="sendForm">
        <div class="flex justify-center">
          <div class="w-3/4">
            <div class="border border-dashed border-gray-400 py-6">
              <div class="w-full flex justify-evenly">
                <div class="w-1/5">
                  <label class="block py-2 text-sm font-semibold" for="">
                    Entreprise
                    <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span>
                  </label>
                  <select
                    id="pet-select"
                    class="px-2 py-1 md:px-4 md:py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent placeholder:text-xs md:placeholder:text-sm"
                    v-model="entrepriseId"
                    @change="getEntrepriseId(entrepriseId)"
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
                    <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span>
                  </label>
                  <select
                    id="pet-select"
                    class="px-2 py-1 md:px-4 md:py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent placeholder:text-xs md:placeholder:text-sm"
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
                    <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span>
                  </label>
                  <select
                    id="pet-select"
                    class="px-2 py-1 md:px-4 md:py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent placeholder:text-xs md:placeholder:text-sm"
                    v-model="userId"
                  >
                    <option value="" disabled selected hidden>
                      Veuillez choisir un responsable
                    </option>
                    <option v-for="(item, i) in usersListe" :key="i" :value="item.id">{{item.nom}} {{item.prenom}}</option>
                  </select>
                </div>
                <div class="w-1/5">
                  <label class="block py-2 text-sm font-semibold" for="">
                    Date de collecte
                    <span class="px-2 text-xs sm:text-sm  md:text-lg font-black text-red-700">*</span>
                  </label>

                  <input
                      id="vrai"
                      name="verite"
                      type="date"
                    class="px-2 py-1 md:px-4 md:py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent placeholder:text-xs md:placeholder:text-sm"
                    v-model="date"
                    />
                </div>
              </div>
              <div class="w-full flex justify-evenly">
              </div>
            </div>

            <pre>
              utilisateur par entreprise
              {{usersListe}}
            </pre>
            <div
              v-for="(checklist, index) in formulaire"
              :key="index"
              class="border border-dashed border-gray-400 p-6"
            >
              <form-checklist :checklist="checklist"></form-checklist>
              
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
import FormChecklist from "@/components/FormChecklist";
import ListeByEntreprise from "@/services/modules/entreprise.executante.service";
import Vbutton from "@/components/Vbutton";
import { mapGetters, mapMutations, mapActions, mapState } from "vuex";
export default {
  components: {
    Vform,
    Vbutton,
    FormChecklist
  },
  data() {
    return {
      seeChecklist: true,
      seeForm: false,
      showModal: false,
      champs: [],
      formulaire: [],
      userId: "",
      siteId:'',
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
      fichiers:[],
      usersListe:[]
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
    getEntrepriseId(id) {
      this.getUsers(id)
    },
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
    getUsers(id) {
      ListeByEntreprise.usersForEntreprise(id).then((data) => {
        this.usersListe = data.data.data
      }).catch((e) => {
        console.log(e)
      })
    },
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

    /* console.log("Fetching users ...");
    this.fetchUtilisateurs() */

    console.log("Fetching sites ...")
    this.fetchSites(this.currentUser?.programme?.id)
  },
};
</script>

<style></style>
