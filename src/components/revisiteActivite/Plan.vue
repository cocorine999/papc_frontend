<template>
  <div>
    <modal-top-right v-if="showModal2" :title="title" v-on:close="close2">
      <div class="p-4 overflow-auto">
        <vform
          template="default"
          :champs="champs2"
          :cols="cols"
          :submitText="submitText"
          :sendRequest="sendRequest"
          @sendForm="savePlanDecaissement"
          @closeModal="close2">
        </vform>
      </div> 
    </modal-top-right>
    <div class="p-4 my-4 rounded-sm shadow-md bg-gray-50">
      <div class="flex items-center justify-between">
        <!--Filtre sur projet -->
        <div class="w-2/5 flex items-center space-x-2">
          <multiselect
            v-model="activiteFiltre"
            :options="activites"
            :preselect-first="true"
            placeholder="selectionnez une activite"
            label="nom"
            track-by="id">
          </multiselect>
        </div>   
      </div>
    </div>

    <div class="my-4 grid grid-cols-4 gap-4">
      <div v-for="(planDeDecaissement, index) in planDeDecaissements" :key="index">
        <card>
          <div class="p-2">
            <div class="flex justify-between">
                  <h1 class="font-base font-bold text-gray-900">
                    {{ planDeDecaissement.annee }}
                  </h1>
                  <div>
                    <dropdown
                      @modifier="modifierPlan(planDeDecaissement)"
                      @supprimer="supprimerPlan(planDeDecaissement)"
                      :option="optionActivite"
                    ></dropdown>
                  </div>
            </div>
            <div class="my-2">
              <p class="text-sm font-semibold py-1">
                <span class="font-bold">Activité :</span>
                <span class="text-gray-700"> {{ planDeDecaissement.activite.nom }} </span>
              </p>
              <p class="text-sm font-semibold py-1">
                <span class="font-bold">Trimestre :</span>
                <span class="text-gray-700"> {{ planDeDecaissement.trimestre }} </span>
              </p>
              <p class="text-sm font-semibold py-1">
                <span class="font-bold">Montant BN :</span>
                <span class="text-gray-700"> {{ planDeDecaissement.budgetNational }}</span>
              </p>
              <p class="text-sm font-semibold py-1">
                <span class="font-bold">Montant EPM-PRET :</span>
                <span class="text-gray-700"> {{ planDeDecaissement.pret }}</span>
              </p>
              <p class="text-sm font-semibold py-1">
                <span class="font-bold pr-2">De</span> {{ planDeDecaissement.debut }}
                <span class="font-bold px-2">Au</span> {{ planDeDecaissement.fin }}
              </p>
              <div class="flex justify-between">
                <div></div>
              </div>
            </div>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>

<script>

import Multiselect from "vue-multiselect";
import ModalTopRight from "@/components/ModalTopRight";
import Dropdown from "@/components/Dropdown";
import Card from "@/components/Card";
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
import { extractFormData, getStringValueOfStatutCode } from "@/utils/index";

import moment from 'moment'
export default {
  components: {
    ModalTopRight,
    Card,
    Multiselect,
    Dropdown,
  },
  data() {
    return {
      planDeDecaissementAttributs : [ 'annee', 'trimestre', 'pret', 'budgetNational'],
      champs2:[
        {name: 'Année de base', key: "annee", type: 'date', placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Trimestre', key: "trimestre", type: '', placeholdere: 'Selectionnez le trimestre du plan', isSelect: true, isTextArea: false, data:'', required: true, options: this.$store.state.trimestres, cle: 'valeur', value: 'trimestre',  errors : []},
        {name: 'Pret', type: 'number', key: "pret", placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
        {name: 'Budget National', key: "budgetNational", type: 'number', placeholdere: "", isSelect: false, isTextArea: false, data:'', required: true, errors : []},
      ],
      showModal2: false,
    }
  },
  methods: {

    addPlan() {
      this.title ="Ajouter un un plan de decaissement"
      this.submitText="Enregistrer"
      this.showModal2 = true;
    },

    modifierPlan(planDeDecaissement) {
      this.title = "Modifier un plan de decaissement";

      this.submitText="Modifier"
      
      this.setPlanDeDecaissement(planDeDecaissement)

      this.planDeDecaissementAttributs.forEach((item) => {

        this.champs2.find((value, index) => {

          if( value.key === "trimestre" && item === "trimestre"){

            this.$store.state.trimestres.map((value) => {
              if(value.valeur === planDeDecaissement[item]){
                this.champs2[index]['data'] = value
              }
            });

          }
          else if( value.key === 'annee' ){
            console.log(  moment( planDeDecaissement.annee + "/" + planDeDecaissement.trimestre + '/01').format("YYYY-MM-DD") )
            this.champs2[index]['data'] = moment( planDeDecaissement.annee + "/" + planDeDecaissement.trimestre + '/01').format("YYYY-MM-DD")
          }
          else if(value.key === item){
            this.champs2[index]['data'] = planDeDecaissement[item]
          }

        });

      });

      
      this.showModal2 = true;
    },

    supprimerPlan(plan){
      if(window.confirm("Voulez-vous supprimer ce plan de décaissement ")){
        if(this.sendRequest === false){
          this.sendRequest = true;
          this.deletePlanDeDecaissement(plan.id).finally((value) => {
              if (response.status === 200 || response.status === 201) {
                this.sendRequest = false;
                this.fetchPlanDeDecaissements(this.activiteFiltre.id);
              }
          })
        }
      }
    },

    savePlanDecaissement() {
      if (this.sendRequest === false) {

        this.sendRequest = true;

        this.champs2 = this.champs2.map((item) => {
          item.errors = [];
          return item;
        });

        let planDeDecaissement = extractFormData(this.champs2, this.planDeDecaissementAttributs);

        planDeDecaissement['activiteId'] = this.activiteFiltre.id;

        planDeDecaissement.annee = moment(planDeDecaissement.annee).format('YYYY')

        planDeDecaissement.trimestre = planDeDecaissement.trimestre.valeur;

        if (this.planDeDecaissement?.id) {
          this.updatePlanDeDecaissement({ planDeDecaissement: planDeDecaissement, id: this.planDeDecaissement?.id })
            .then((response) => {
              if (response.status === 200 || response.status === 201) {
                this.fetchPlanDeDecaissements(this.activiteFiltre.id);
                this.close2();
              }
            })
            .finally((error) => {              
              this.sendRequest = false;
            });
        } else {
          this.savePlanDeDecaissement(planDeDecaissement)
            .then((response) => {
              if (response.status === 200 || response.status === 201) {
                this.fetchPlanDeDecaissements(this.activiteFiltre.id);
                this.close2();
              }
            })
            .finally((error) => {              
              this.sendRequest = false;
            });
        }
      }
    },

    close2() {
      this.showModal2 = false;
      this.resetForm2();
      this.sendRequest = false;
    },

    resetForm2(){
      this.champs2 = this.champs2.map(item => { item['data'] = ''; item['errors'] = []; return item})
      window.document.getElementById('vform').reset()
      this.setPlanDeDecaissement({})
    },

  }
}
</script>

<style>

</style>