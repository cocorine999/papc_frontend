<template>
  <div class="dropdown">
    <button class="text-sm font-bold text-center text-gray-900  rounded-md ">
      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>
    </button>
    <div class="dropdown-content">
    <span class="option cursor-pointer" @click="actions(link.name)" v-for="link in option" :key="link.id">{{link.name}}</span>
  </div>
</div>
</template>

<script>
export default {
  props:['option'],
  data() {
    return {

    }
  },
  methods: {
    actions(option) {
      if(option == 'continuer') {
        this.$emit('gotoNext')
      }
      if(option == 'dupliquer') {
        this.$emit('duplicate')
      }
       if(option == 'supprimer') {
        this.$emit('supprimer')
      }
      if(option == 'modifier') {
        this.$emit('modifier')
      }
      
    }
  }
}
</script>

<style scoped>

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content .option {
  color: black;
  padding: 6px 16px;
  text-decoration: none;
  display: block;
  font-weight: 500;
}

.dropdown-content a:hover {background-color: #f1f1f1}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: #3e8e41;
}
</style>