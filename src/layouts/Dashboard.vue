<script>
  // import Navbar from '@/components/sidebar/NavBar.vue'
  import SideBar from '../components/sidebar/SideBar.vue'
  import { mapState } from 'vuex'

  export default {
    name: "Dashboard",
    components: {
      // Navbar,
      SideBar,
    },
    computed: {
      ...mapState(['sideBarOpen'])
    },
  }
</script>

<template>
  <div class="flex flex-wrap">
    <side-bar></side-bar>
    <div class="w-full bg-gray-100 pl-0 lg:pl-64 min-h-screen" :class="sideBarOpen ? 'overlay' : ''" id="main-content">

      <navbar></navbar>

      <div class=" bg-gray-100 mb-20">
        <!-- <nuxt /> -->
      </div>
    </div>
  </div>
</template>
