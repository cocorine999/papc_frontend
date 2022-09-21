<template>
  <div class="dropdown">
    <button class="text-sm font-bold text-center text-gray-900  rounded-md ">
      <i class="bx bx-dots-vertical-rounded bx-md pr-2"></i>
    </button>
    <div class="dropdown-content">
    <span class="option cursor-pointer" @click.stop="actions(link.name)" v-for="(link, indice) in option" :key="indice">{{link.name}}</span>
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
        this.$emit('dupliquer')
      }
       if(option == 'supprimer') {
        this.$emit('supprimer')
      }
      if(option == 'modifier') {
        this.$emit('modifier')
      }
      if(option == 'prolonger') {
        this.$emit('prolonger')
      }
      if(option == 'mes suivis') {
        this.$emit('suivre')
      }
      if(option == 'changer logo') {
        this.$emit('couverture')
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