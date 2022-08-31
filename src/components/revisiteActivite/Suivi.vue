<template>
  <div>
    <vtable
      id="datatable"
      :headers="headers"
      :datas="dataTable"
      :actions="actions"
      @supprimer="supprimerT"
      >
    </vtable>
  </div>
</template>

<script>
import ActiviteService from "@/services/modules/activite.service.js";
import Vtable from '@/components/Vtable'
export default {
  components:{Vtable},
  data() {
    return {
        headers: [
        { name: "Activite", cle: "activite"},
        { name: "code pta", cle: "codePta"},
        { name: "poids initial", cle:'poidsInitial'},
        { name: "poids actuel", cle:'poidsActuel'},
        { name: "date de creation", cle:'created_at'},
        
      ],
      dataTable:[],
    }
  },
  methods: {
    getSuivi() {
      ActiviteService.getSuivi().then((data) => {
        const datas = data.data.data
        datas.forEach(element => {
          const activite = element.activite.nom
          const codePta = element.tache.codePta
          const poidsInitial = element.tache.poids
          const poidsActuel = element.poidsActuel
          const created_at = element.created_at
          this.dataTable.push({activite:activite,codePta:codePta,poidsInitial:poidsInitial,poidsActuel:poidsActuel,created_at:created_at})
        })
        console.log('mes suivis',this.suivis)
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