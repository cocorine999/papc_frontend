<template>
 <dashboard>
  <vmodal v-if="showLink" @close="showLink=false">
      <div class="m-2 p-2 bg-white shadow" style="width:60vw">
        <p class="p-2 bg-gray-300 border text-gray-700 font-semibold text-sm border-gray-600 text-center rounded-md">
          <a  title="cliquez ici" target="_blank" href="/form"> cliquer ici</a>
        </p>
      </div>
    </vmodal>
    <div class="px-4">
      <nav class="mb-2 mt-4 text-sm font-semibold  " aria-label="Breadcrumb">
        <div>
          <ol class="inline-flex p-0 list-none">
            <li class="flex items-center ">
              <router-link to="/dashboard" class="text-gray-600">dashboard</router-link>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
            </li>

            <li class="flex items-center text-blue-500 ">
              <router-link to="" class="">formulaire</router-link>
            </li>
          </ol>
        </div> 
      </nav>
      <div class="flex items-center justify-between my-4">
        <div class="flex space-x-4">
          <span  class="inline-block cursor-pointer  border-b-8 font-bold text-sm uppercase    border-primary py-2">Mes formulaires </span> 
        </div>
        <router-link to="/dashboard/formulaire-create"  title="ajouter une checklist"  class="p-2 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase rounded bg-primary focus:outline-none focus:shadow-outline">
          <span><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM17 11h-4v4h-2v-4H7V9h4V5h2v4h4v2z"></path></svg></span>
          <span class="mx-2 text-xs font-semibold">Ajouter </span>
        </router-link>
      </div>
      <div  class="grid grid-cols-3 gap-4">
        <div v-for="i in 6" :key="i.id">
          <card-checklist
            libelle="Formulaure"
            :code="i" 
            @supprimer="supprimer"
            @modifier="modifier"
            @dupliquer="dupliquer"
            @onlink="getlink(i)"
            @gotoDetails="gotoDetails(i)"
            > </card-checklist>
        </div>
      </div>
  </div>
 </dashboard>
</template>

<script>
  import Dashboard from '@/layouts/Dashboard'
  import CardChecklist from '@/components/CardChecklist'
  //import Vform from '@/components/Vform'
  import Vmodal from '@/components/Vmodal'
export default {
  layout:'dashboard',
  components:{ 
    Dashboard,
    CardChecklist,
    Vmodal

  },
  data() {
    return {
      showLink:false,
    }
  },
  methods: {
    gotoDetails(id) {
      this.$router.push({name:'formulaire_id_details',params:{id:id}})
    },
    getlink(i){
      this.showLink = true
    },
    modifier(data) {
      alert(data+ " à ete bien modifier")
    },
    supprimer(data) {
      alert(data+ " à ete bien supprimer")
    }
  }
}
</script>

<style>

</style>