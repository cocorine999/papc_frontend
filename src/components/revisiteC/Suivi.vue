<template>
  <div>
    <vtable id="datatable"
      :headers="headers"
      :datas="dataTable"
      :sendRequest="sendRequest"
      :actions="actions"
      @supprimer="supprimer">
    </vtable>
  </div>
</template>

<script>
import Vtable from '@/components/Vtable'
import ComposanteService from "@/services/modules/composante.service.js";
export default {
  components:{Vtable},
  data(){
    return {
        headers: [
        { name: "Composante", cle: "composante"},
        { name: "code pta", cle: "codePta"},
        { name: "poids initial", cle:'poidsInitial'},
        { name: "poids actuel", cle:'poidsActuel'},
        { name: "date de creation", cle:'created_at'},
      ],
      dataTable:[],
    }
  },
  methods:{
    getSuivi() {
      ComposanteService.getSuivi().then((data) => {
        const datas = data.data.data
        datas.forEach(element => {
          const composante = element.composante.nom
          const codePta = element.tache.codePta
          const poidsInitial = element.tache.poids
          const poidsActuel = element.poidsActuel
          const created_at = element.created_at
          this.dataTable.push({composante:composante,codePta:codePta,poidsInitial:poidsInitial,poidsActuel:poidsActuel,created_at:created_at})
        })
        console.log("les suiivs",this.dataTable)
       
      }).catch((e) => {
        console.log(e)
      })
    },
  },
  mounted() {
    this.getSuivi()
  }
}
</script>

<style>

</style>