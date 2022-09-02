<template>
  <div>
    <vtable
      id="datatable"
      :headers="headers"
      :datas="suivis"
      :actions="[]"
      >
    </vtable>
  </div>
</template>

<script>
import Vtable from '@/components/Vtable'
export default {
  components:{Vtable},

  props: ['suivis'],
  data() {
    return {
        headers: [
        { name: "Activite", cle: "activite"},
        { name: "code pta", cle: "codePta"},
        { name: "poids initial", cle:'poidsInitial'},
        { name: "poids actuel", cle:'poidsActuel'},
        { name: "date de creation", cle:'created_at'},
      ]
    }
  }
}
</script>

<style>

</style>