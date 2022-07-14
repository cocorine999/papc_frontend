<template>
  <div class="flex flex-wrap">

    <div v-if="espace==undefined">
      <sidebar></sidebar>
    </div>
    <div v-if="espace=='bailleur'">
      <sidebar-bailleur></sidebar-bailleur>
    </div>
    <div v-if="espace=='mod'">
      <sidebar-mod></sidebar-mod>
    </div>

     <div v-if="espace=='mo'">
      <sidebar-mo></sidebar-mo>
    </div>
   
    <div class="w-full bg-gray-100 pl-0 lg:pl-64 min-h-screen" :class="sideBarOpen ? 'relative' : ''" id="main-content">
      <navbar></navbar>
      <div class=" bg-gray-100 mb-20">
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
  import { mapState } from 'vuex'

  export default {
    props:['espace'],
    name: "Dashboard",
    components: {
      Navbar,
      Sidebar,
      SidebarBailleur,
      SidebarMod,
      SidebarMo,
    },
    
    computed: {
      ...mapState(['sideBarOpen'])
    },
  }
</script>
<style>
* {
  font-family: 'Inter', sans-serif;
}


</style>
