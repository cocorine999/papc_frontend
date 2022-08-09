<template>
  <div class="md:grid md:grid-cols-2 block">
    <div class="absolute bg-cercle "> <img src="/img/cercle.png" width="500px" height="500px" alt=""></div>
    <div  class="hidden relative md:px-8  bg-primary md:flex justify-center items-center">
      <div class="hidden md:block lg:w-4/5 xl:w-1/2 mx-auto mt-[40vh]">
        <h1 class="text-4xl font-bold text-white mb-5">
          Mot de <br />
          Passe Oublié
        </h1>

        <p class=" text-sm text-white">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit. Exercitation
          veniam consequat sunt nostrud amet.
        </p>
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
        Votre mot de passe à été réinitialisé avec succès
      </h1>

      <p
        class="text-center text-xs xl:text-base mb-4 sm:mb-5 text-[#52575C] w-3/5"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel
        facilisis sapien, bibendum consectetur quam. Morbi at nulla et erat
        varius porta et id nunc. Donec viverra
      </p>

      <!-- button de retour  -->

      <div>
        <button type="submit" class="mb-3 mt-5 sm:mt-10 py-3 border px-4 bg-primary text-white text-sm md:text-base xl:text-lg">
          <nuxt-link to="/login"> Retour à l'écran de connexion </nuxt-link>
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

