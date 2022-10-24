<template>
  <dashboard>
    
  <div class="w-full">
    <nav class="mb-2 mt-4 text-sm font-semibold  " aria-label="Breadcrumb">
      <div>
        <ol class="inline-flex p-0 list-none">
          <li class="flex items-center ">
            <router-link to="/dashboard" class="text-gray-600">dashboard</router-link>
            <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
          </li>

          <li class="flex items-center text-blue-500 ">
            <router-link to="" class="">Rapport entreprise</router-link>
          </li>
        </ol>
      </div> 
    </nav>
    <div class="flex items-center justify-between my-4">
      <div class="flex space-x-4">
        <span v-if="seeChecklist"  class="inline-block cursor-pointer text-lg utext-lg uppercase font-bold  border-primary border-b-8 py-2">Rapport entreprise </span>
        <span v-else  class="inline-block cursor-pointer text-lg utext-lg uppercase font-bold  border-primary border-b-8 py-2">Graphes d'analyse </span>
      </div>
      <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="true"
        :paginate-elements-by-height="1400"
        :filename="title_pdf()"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="landscape"
        pdf-content-width="800px"
        @progress="onProgress($event)"
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
        ref="html2Pdf"
    >
        <section slot="pdf-content">
            <!-- PDF Content Here -->
            <div class="m-12" >
      <div class="mt-4 mb-6 flex space-x-4 items-center">
        <div class="py-2 font-semibold">Date de collecte : <span class="font-bold px-2">{{entete.entete.date}}</span> </div>
      </div>
      
      <div class="grid grid-cols-4 w-3/4 mb-4">
        <div class="">
          <ul>
            <li class="text-base font-bold py-2">Entreprise</li>
            <li class="text-base font-bold py-2">Enquêté</li>
            <li class="text-base font-bold py-2">Post enquêté</li>
            <li class="text-base font-bold py-2">Contact enquité</li>
          </ul>
        </div>
        <div>
          <ul>
            <li class="text-base  py-2">: {{entete.entete.entreprise}}</li>
            <li class="text-base  py-2">: {{entete.entete.responsable}}</li>
            <li class="text-base  py-2">: {{entete.entete.poste}}</li>
            <li class="text-base  py-2">: {{entete.entete.contact}}</li>
          </ul>
        </div>
        <div>
          <ul>
            <li class="text-base font-bold py-2">Bailleur</li>
            <li class="text-base font-bold py-2">Site</li>
            <li class="text-base font-bold py-2">Missionaire</li>
            <li class="text-base font-bold py-2">Numero</li>
          </ul>
        </div>
        <div>
          <ul>
            <li class="text-base  py-2">: {{entete.entete.bailleur}}</li>
            <li class="text-base  py-2">: {{entete.entete.site}}</li>
            <li class="text-base  py-2">: {{entete.entete.missionaire}}</li>
            <li class="text-base  py-2">: {{entete.entete.numero}}</li>
          </ul>
        </div>
      </div>
       <!-- fin En tete de la checklist-->
      <div class=" overflow-x-auto">
        <table class="min-w-full">
          <thead class="border-b bg-gray-300">
            <tr>
              <th  scope="col" class="text-xs md:text-sm whitespace-nowrap font-medium text-gray-900 px-6 py-4 text-left"> Activité </th>
              <th  scope="col" class="text-xs md:text-sm whitespace-nowrap font-medium text-gray-900 px-6 py-4 text-left"> Status </th>
  
              <th scope="col" class=" text-xs md:text-sm font-medium text-gray-900 px-6 py-4 text-left">Justification</th>
            </tr>
          </thead>
          
          <tbody>
            <tr  class="border-b border-gray-300" v-for="(activites ,index) in formulaire" :key="index">
                
                <td  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <span class="font-bold">{{activites.activite.nom}}</span>
                  <tr class="" v-for="(data ,indexe) in activites.data" :key="indexe">
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                     <span class="font-bold">-</span> {{data.nom}}
                    </td>
                  </tr>
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                 <tr class="" v-for="(data ,indexe) in activites.data" :key="indexe">
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                     {{data.content}}
                    </td>
                  </tr>
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <tr class="" v-for="(data ,indexe) in activites.data" :key="indexe">
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      vide
                    </td>
                  </tr>
                </td>                 
            </tr>              
          </tbody>
        </table>
      </div>
    </div>
        </section>
    </vue-html2pdf>
    <button  title="exporter en excel" @click="generateReport()"    class="py-2  px-4 overflow-hidden  space-x-2 items-center text-xs font-semibold text-white uppercase bg-indigo-500 focus:outline-none focus:shadow-outline">
            <svg class="inline" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path d="M11 16h2V7h3l-4-5-4 5h3z"></path><path d="M5 22h14c1.103 0 2-.897 2-2v-9c0-1.103-.897-2-2-2h-4v2h4v9H5v-9h4V9H5c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2z"></path></svg>
            <span class="mx-2 text-xs  md:text-sm font-semibold">Export Pdf</span>
    </button>
      <button v-if="seeChecklist" @click="goForm" title="Voir le formulaire" class="bg-blue-500 text-white px-3 py-1 text-center">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="1.3em" height="1.3em" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
      </button>

      <button v-else @click="goChecklist" title="cacher le formulaire" class="bg-blue-500 text-white px-3 py-1 text-center">
       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="1.3em" height="1.3em" stroke-linecap="round" stroke-linejoin="round" class="icon icon-eye-off"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" x2="23" y1="1" y2="23"></line></svg>
      </button>
      
    </div>
    <!--En tete de la checklist-->
    <div v-if="seeChecklist" >
      <div class="mt-4 mb-6 flex space-x-4 items-center">
        <div class="py-2 font-semibold">Date de collecte : <span class="font-bold px-2">{{entete.entete.date}}</span> </div>
        
        <select id="pet-select" class="px-2 py-1 md:px-4 md:py-2 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent placeholder:text-xs md:placeholder:text-sm" v-model="valueFiltre">
          <option value="" disabled selected hidden>
                      Veuillez choisir une date
                    </option>
                    <option v-for="(item, i) in dates" :key="i" :value="item.date">{{item.date}}</option>
        </select>
        <button  @click="filtre" class="bg-primary text-white border-primary border px-4 py-2 shadow rounded">Filtrer </button>
      </div>
      
      <div class="grid grid-cols-4 w-3/4 mb-4">
        <div class="">
          <ul>
            <li class="text-base font-bold py-2">Entreprise</li>
            <li class="text-base font-bold py-2">Enquêté</li>
            <li class="text-base font-bold py-2">Post enquêté</li>
            <li class="text-base font-bold py-2">Contact enquité</li>
          </ul>
        </div>
        <div>
          <ul>
            <li class="text-base  py-2">: {{entete.entete.entreprise}}</li>
            <li class="text-base  py-2">: {{entete.entete.responsable}}</li>
            <li class="text-base  py-2">: {{entete.entete.poste}}</li>
            <li class="text-base  py-2">: {{entete.entete.contact}}</li>
          </ul>
        </div>
        <div>
          <ul>
            <li class="text-base font-bold py-2">Bailleur</li>
            <li class="text-base font-bold py-2">Site</li>
            <li class="text-base font-bold py-2">Missionaire</li>
            <li class="text-base font-bold py-2">Numero</li>
          </ul>
        </div>
        <div>
          <ul>
            <li class="text-base  py-2">: {{entete.entete.bailleur}}</li>
            <li class="text-base  py-2">: {{entete.entete.site}}</li>
            <li class="text-base  py-2">: {{entete.entete.missionaire}}</li>
            <li class="text-base  py-2">: {{entete.entete.numero}}</li>
          </ul>
        </div>
      </div>
       <!-- fin En tete de la checklist-->
      <div class=" overflow-x-auto">
        <table class="min-w-full">
          <thead class="border-b bg-gray-300">
            <tr>
              <th  scope="col" class="text-xs md:text-sm whitespace-nowrap font-medium text-gray-900 px-6 py-4 text-left"> Activité </th>
              <th  scope="col" class="text-xs md:text-sm whitespace-nowrap font-medium text-gray-900 px-6 py-4 text-left"> Status </th>
  
              <th scope="col" class=" text-xs md:text-sm font-medium text-gray-900 px-6 py-4 text-left">Justification</th>
            </tr>
          </thead>
          
          <tbody>
            <tr  class="border-b border-gray-300" v-for="(activites ,index) in formulaire" :key="index">
                
                <td  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <span class="font-bold">{{activites.activite.nom}}</span>
                  <tr class="" v-for="(data ,indexe) in activites.data" :key="indexe">
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                     <span class="font-bold">-</span> {{data.nom}}
                    </td>
                  </tr>
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                 <tr class="" v-for="(data ,indexe) in activites.data" :key="indexe">
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                     {{data.content}}
                    </td>
                  </tr>
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <tr class="" v-for="(data ,indexe) in activites.data" :key="indexe">
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      vide
                    </td>
                  </tr>
                </td>                 
            </tr>              
          </tbody>
        </table>
      </div>
    </div>
    <div v-else class="my-4 grid grid-cols-3 gap-4 ">
      <div v-for="graphe in graphes" :key="graphe.id" class="p-4 bg-white shadow" id="chart">
        <apexchart type="bar" height="350" :options="chartOptions(graphe)" :series="series(graphe)"></apexchart>
      </div>
    </div>
  </div>
  </dashboard>
</template>

<script>
  import Dashboard from '@/layouts/Dashboard'
  import CardChecklist from '@/components/CardChecklist'
  import Vtable from '@/components/Vtable'
  import Vform from '@/components/Vform'
  import Vbutton from '@/components/Vbutton'
  import VueHtml2pdf from 'vue-html2pdf'
  import { mapGetters, mapMutations, mapActions, mapState } from "vuex";
export default {
  components: {
    CardChecklist,
    Dashboard,
    Vtable,
    Vform,
    Vbutton,
    VueHtml2pdf
   
  },
  data() {
    return {
      valueFiltre: null,
      seeChecklist:true,
      seeForm:false,
      formulaire: [],
      dates: [],
      entete: [],
      graphes: [],
      headers:[
          {name:'Libelle activite',props:'libelle'},
          {name:'Code activite',props:'code'},
          {name:'Programme',props:'programme'},
          {name:'Date debut',props:'debut'},
          {name:'Date fin',props:'fin'},
          {name:'Date de creation',props:'created_at'},
      ],
      
      actions:[
          {name:'modifier',iconne:''},
          {name:'supprimer',iconne:''},
      ],
      entrepriseExecutanteVisible:false,
        
    }
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
      currentUser: "auths/GET_AUTHENTICATE_USER",
    }),
  },
  methods: {
    ...mapActions("formulaires", {
      getSuivi: "GET_SUIVI",
    }),
    ...mapActions("eSuivis", {
      getDates: "DATE",
    }),
    ...mapActions("eSuivis", {
      getGraphes: "GRAPHES",
    }),
    generateReport () {
      this.$refs.html2Pdf.generatePdf()
    },
    addActivite() {
      this.title = 'Creer une activité'
      this.showModal = true
    },
    goForm() {
      this.seeForm = true
      this.seeChecklist = false
    },
    goChecklist() {
      this.seeForm = false
      this.seeChecklist = true
    },
    selectData ({ name}) {
      return `${name}`
    },
    title_pdf() {
        return "checklist-" +"-" + new Date()
      },
    filtre(){
      if(this.valueFiltre != null)
      {
        var form = {
          "entrepriseId": this.$route.params.idE,
          "formulaireId": this.$route.params.idC,
          "date": this.valueFiltre
        }; 
      }

      else
      {
        var form = {
          "entrepriseId": this.$route.params.idE,
          "formulaireId": this.$route.params.idC,
        };
      }

      console.log("Getting suivi ...");
      this.getSuivi(form).then((response) => {
      this.formulaire = response.data.data;

       
       if(this.formulaire.length != 0)
       {
          this.entete = this.formulaire[0];
          this.formulaire.splice(0,1);

       }

       else
       {
        this.entete = {
          "entete": {
            "entreprise" : null,
            "responsable" : null,
            "poste" : null,
            "contact" : null,
            "site" : null,
            "date" : null,
            "bailleur" : null,
            "missionaire" : null,
            "numero" : null
          }
        };

        this.formulaire = [];
       }
    });
    if(this.valueFiltre != null)
      {
        var form = {
          "formulaireId": this.$route.params.idC,
          "date": this.valueFiltre
        }; 
      }

      else
      {
        var form = {
          "formulaireId": this.$route.params.idC,
          "date": this.dates[0]?.date
        };
      }

      console.log("Getting graphes ...");
      this.getGraphes(form).then((response) => {
      this.graphes = response;

    });

    this.valueFiltre= null;
    },
    series(graphe)
    {
      return [{
            data: graphe.valeurs
          }]
    },
    chartOptions(graphe)
    {
      return {
            chart: {
              height: 350,
              type: 'bar',
              events: {
                click: function(chart, w, e) {
                  // console.log(chart, w, e)
                }
              }
            },
            //colors: colors,
            plotOptions: {
              bar: {
                columnWidth: '45%',
                distributed: true,
              }
            },
            dataLabels: {
              enabled: false
            },
            title: {
              text: graphe.checklist,
              align: 'left'
            },
            legend: {
              show: false
            },
            xaxis: {
              categories: graphe.entreprises,
              labels: {
                style: {
                  //colors: colors,
                  fontSize: '12px'
                }
              }
            }
          }
    },
     getPermission() {
        this.currentUser.role[0].permissions.forEach(element => {
          if(element.slug ==='voir-un-suivi-environnementale') {
          this.entrepriseExecutanteVisible = true
        }
       
           
      });
    },
    
  },
  mounted() {
    this.getPermission()
     if( !this.entrepriseExecutanteVisible) {
        this.$router.push('/401-non-autorise')
      } 
    const programme = [{name:'papc'},{name:'pool'},{name:'demo'}]
    
    let form1 = {
      "type": 'entreprise',
      "typeId": this.$route.params.idE,
      "formulaireId": this.$route.params.idC
    };
    this.getDates(form1).then((response) => {
      this.dates = response;

      let form = {
      "entrepriseId": this.$route.params.idE,
      "formulaireId": this.$route.params.idC,
      "date": this.dates[0]?.date
    };

    console.log("Getting suivi ...");
    this.getSuivi(form).then((response) => {
      this.formulaire = response.data.data;

       
       if(this.formulaire.length != 0)
       {
          this.entete = this.formulaire[0];
          this.formulaire.splice(0,1);

       }

       else
       {
        this.entete = {
          "entete": {
            "entreprise" : null,
            "responsable" : null,
            "poste" : null,
            "contact" : null,
            "site" : null,
            "date" : null,
            "bailleur" : null,
            "missionaire" : null,
            "numero" : null
          }
        };

        this.formulaire = [];
       }
        console.log(this.formulaire);
      });

      var form3 = {
          "formulaireId": this.$route.params.idC,
          "date": this.dates[0]?.date
        };

      console.log("Getting graphes ...");
      this.getGraphes(form3).then((response) => {
      this.graphes = response;

    });
    });
  }
}
</script>

<style>

</style>