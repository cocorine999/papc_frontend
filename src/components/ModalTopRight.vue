<template>
  <!-- give the sidebar z-50 class so its higher than the navbar if you want to see the logo -->
  <!-- you will need to add a little "X" button next to the logo in order to close it though -->
  <div
    style="width: 30%"
    class="fixed z-50 h-128 overflow-auto bg-white border-r shadow-lg md:bottom-0 md:right-0 scrollbar-thumb-blue scrollbar-thumb-rounded lg:block"
    id="main-nav"
  >
    <div class="flex items-center w-full py-2 bg-gray-100 border-b relative">
      <p class="px-6 font-bold text-primary uppercase">{{ title }}</p>
      <span
        @click="closeModal"
        class="absolute w-6 h-6 mx-2 text-white bg-red-600 rounded-full shadow-sm cursor-pointer top-12 -left-2 flex justify-center"
        ><svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 1024 1024"
          height="1.4em"
          width="1.6em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"
          ></path>
          <path
            d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
          ></path></svg
      ></span>
    </div>

   

    <slot></slot>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "modalTopRight",
  props: ["title"],
  data() {
    return {};
  },

  computed: {
    ...mapState(["sideBarOpen1"]),
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>
<style scoped></style>
