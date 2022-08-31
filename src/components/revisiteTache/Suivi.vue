<template>
  <div>
    <vtable
            id="datatable"
            :headers="headers"
            :datas="dataTable"
            :actions="actions">
    </vtable>
  </div>
</template>

<script>
import Vtable from '@/components/Vtable'
import TacheService from "@/services/modules/tache.service.js";
export default {
  components:{Vtable},
  data() {
    return {
      headers: [
        { name: "Tache", cle: "tache"},
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
      TacheService.getSuivi().then((data) => {
        const datas = data.data.data
        datas.forEach(element => {
          const tache = element.tache.nom
          const codePta = element.tache.codePta
          const poidsInitial = element.tache.poids
          const poidsActuel = element.poidsActuel
          const created_at = element.created_at
          this.dataTable.push({tache:tache,codePta:codePta,poidsInitial:poidsInitial,poidsActuel:poidsActuel,created_at:created_at})
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