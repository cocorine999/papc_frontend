<template>
  <div class="flex flex-wrap">
    <side-bar></side-bar>

  </div>
</template>

<script>
  import Navbar from '@/components/sidebar/Navbar.vue'

  export default {
    name: "Dashboard",
    components: {
      Navbar
    }
  }
</script>