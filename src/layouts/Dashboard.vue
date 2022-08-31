<template>
  <div class="flex flex-wrap">
    
    <div v-if="espace==undefined">
      <sidebar></sidebar>
    </div>
    <div v-if="espace=='bailleur' && currentRole=='bailleur' ">
      <sidebar-bailleur></sidebar-bailleur>
    </div>
    <div v-if="espace=='mod' && currentRole=='mod'">
      <sidebar-mod></sidebar-mod>
    </div>

     <div v-if="espace=='mo' && currentRole=='mission-de-controle'">
      <sidebar-mo></sidebar-mo>
    </div>
   
    <div class="w-full bg-gray-100 pl-0 lg:pl-64 min-h-screen " :class="sideBarOpen ? 'relative' : ''" id="main-content">
      <vue-element-loading :active="isActive" :is-full-screen="false"/>
      <navbar  ></navbar>
      <div  class=" bg-gray-100 mb-20">
        
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
  import Navbar from '@/components/Navbar'
  import Sidebar from '@/components/Sidebar'
  import SidebarBailleur from '@/components/SidebarBailleur'
  import SidebarMod from '@/components/SidebarMod'
  import SidebarMo from '@/components/SidebarMo'
  import VueElementLoading from 'vue-element-loading'
 import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    props:['espace'],
    name: "Dashboard",
    components: {
      Navbar,
      Sidebar,
      SidebarBailleur,
      SidebarMod,
      SidebarMo,
      VueElementLoading
    },
    data() {
      return {
        currentRole:''
      }
    },
    computed: {
    ...mapState(['sideBarOpen','isActive']),
    ...mapGetters('auths', {currentUser : 'GET_AUTHENTICATE_USER'})
    },
    mounted() {
      if(this.currentUser != undefined) {
       this.currentRole = this.currentUser.role[0].nom
        console.log("role courant",this.currentUser)
      }
    }
  }
</script>
<style>
* {
  font-family: 'Inter', sans-serif;
}


</style>
