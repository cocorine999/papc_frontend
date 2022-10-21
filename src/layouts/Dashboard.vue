<template>
  <div>
    <!-- <modal-chat v-if="showCommentaire" title="espace commentaire" v-on:close="showCommentaire=false">
      <chat @sendMessage="sendMessage" :isOnlyRead="false"></chat>
    </modal-chat> -->
    <notification></notification>
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

      <div class="w-full bg-gray-100 pl-0 lg:pl-64 min-h-screen " :class="sideBarOpen ? 'relative' : ''"
        id="main-content">
        <vue-element-loading :active="isActive" :is-full-screen="false" />
        <navbar></navbar>
        <!-- <div class="m-2  flex justify-between items-center "> -->
        <div class="w-full p-4">
          <slot></slot>
          <!--  <div title="laissez un commentaire" @click="showCommentaire = true" class="fixed cursor-pointer  z-50 bottom-5 text-blue-500 animation  right-6 ">
            <svg stroke="currentColor" class="h-10 w-10" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M416 192c0-88.4-93.1-160-208-160S0 103.6 0 192c0 34.3 14.1 65.9 38 92-13.4 30.2-35.5 54.2-35.8 54.5-2.2 2.3-2.8 5.7-1.5 8.7S4.8 352 8 352c36.6 0 66.9-12.3 88.7-25 32.2 15.7 70.3 25 111.3 25 114.9 0 208-71.6 208-160zm122 220c23.9-26 38-57.7 38-92 0-66.9-53.5-124.2-129.3-148.1.9 6.6 1.3 13.3 1.3 20.1 0 105.9-107.7 192-240 192-10.8 0-21.3-.8-31.7-1.9C207.8 439.6 281.8 480 368 480c41 0 79.1-9.2 111.3-25 21.8 12.7 52.1 25 88.7 25 3.2 0 6.1-1.9 7.3-4.8 1.3-2.9.7-6.3-1.5-8.7-.3-.3-22.4-24.2-35.8-54.5z"></path></svg>
          </div> -->
        </div>
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
import Chat from '@/components/Chat.vue'
import ModalChat from '@/components/ModalChat'
import Notification from '@/components/Notification'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  props: ['espace'],
  name: "Dashboard",
  components: {
    Navbar,
    Sidebar,
    SidebarBailleur,
    SidebarMod,
    SidebarMo,
    VueElementLoading,
    Notification
  },
  data() {
    return {
      currentRole: '',
      showCommentaire: false,
    }
  },
  computed: {
    ...mapState(['sideBarOpen', 'isActive']),
    ...mapGetters('auths', { currentUser: 'GET_AUTHENTICATE_USER' })
  },
  methods: {
    sendMessage(data) {
      alert(data + ' envoyé')
    }
  },
  mounted() {
    if (this.currentUser != undefined) {
      this.currentRole = this.currentUser.type
    }
  }
}
</script>
<style>
* {
  font-family: 'Inter', sans-serif;
}
</style>
