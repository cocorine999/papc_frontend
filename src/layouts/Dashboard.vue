<template>
  <div class="flex flex-wrap">
    <sidebar></sidebar>
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
  import { mapState } from 'vuex'

  export default {
    name: "Dashboard",
    components: {
      Navbar,
      Sidebar,
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
