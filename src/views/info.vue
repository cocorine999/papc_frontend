<template>
  <div class="md:grid md:grid-cols-2 block">
    <div class="absolute bg-cercle "> <img src="/img/cercle.png" width="500px" height="500px" alt=""></div>
    <div  class="hidden relative md:px-8  bg-primary md:flex justify-center items-center">
      <div class="hidden md:block lg:w-4/5 xl:w-1/2 mx-auto mt-[40vh]">
        <h1 class="text-3xl whitespace-nowrap font-bold text-white mb-5">
          Mot de
          Passe Oublié
        </h1>

        
      </div>
    </div>

  <!-- Partie input -->
  <div class=" h-screen flex justify-center relative">
    <div class="h-screen flex flex-col justify-center items-center relative">
      <div class="relative m-10">
        <img
          class="w-36 absolute"
          src="/img/validation.gif "
          alt=""
        />
        <div class="w-36 h-28 bg-white/70 backdrop-blur-0"></div>
      </div>
      <h1
        class="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-3 sm:mb-5 text-center"
      >
        Email envoyé avec success
      </h1>

      <p
        class="text-center text-xs xl:text-base mb-4 sm:mb-5 text-[#52575C] w-3/5"
      >
      Consultez votre boite email et cliquer sur le lien de rensitialisation !
      </p>

      <!-- button de retour  -->

      <div>
        <button type="submit" class="mb-3 mt-5 sm:mt-10 py-3 border px-4 bg-primary text-white text-sm md:text-base xl:text-lg">
          <router-link to="/"> Retour à l'écran de connexion </router-link>
        </button>
      </div>
    </div>
  </div>
  </div>
</template>

<script></script>
<style scoped>
.bg-cercle {
  z-index: 55;
  right: 25%;
  top:5%
 
}
</style>

