<template>
   <!-- component -->
    <main class="h-screen w-full flex flex-col justify-center items-center bg-gray-700">
        <h1 class="text-9xl font-extrabold text-white tracking-widest">401</h1>
        <div class="bg-yellow-700 px-2 text-sm rounded rotate absolute">
            Access refuser
        </div>
        <button class="mt-5">
        <a
            class="relative inline-block text-sm font-medium  group active:text-orange-500 focus:outline-none focus:ring"
        >
            <span
            class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-yellow-700 group-hover:translate-y-0 group-hover:translate-x-0"
            ></span>

            <span class="relative block px-8 py-3 bg-gray-700 text-yellow-700 hover:bg-yellow-700 hover:text-white transition-all duration-700 border border-current">
            <router-link to="/">Retour à la page de connexion</router-link>
            </span>
        </a>
        </button>
    </main>
</template>

<script>
export default {

}
</script>

<style scoped>
.rotate {
    transform: rotate(12deg);
}
</style>