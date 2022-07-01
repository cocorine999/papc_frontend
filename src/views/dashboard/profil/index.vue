<template>
  <div>
    <div class=" mb-4 bg-white border-white py-8 md:px-6 px-4 xl:px-16">
      <h1 class="text-primary text-2xl py-8 font-bold">Informations de l'utilisateur</h1>
      <div class="block px-2 w-full ">
        <form>
          <div class="grid grid-cols-2 w-full  gap-4">
                <div class="form-group mb-6">
                  <label for="firstName" class="text-md text-primary my-3">Nom</label>
                  <input type="text"  class="form-control
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    bg-blue-50
                    text-gray-700
                     bg-clip-padding
                    border border-solid border-primary
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" value="John">
                </div>
                <div class="form-group mb-6">
                  <label for="firstName"  class="text-md text-primary my-3">Prenoms</label>
                  <input type="text"  class="form-control
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    bg-blue-50
                    text-gray-700
                     bg-clip-padding
                    border border-solid border-primary
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" value="Doe"
                    >
                </div>
          </div>
          <div class="form-group mb-6">
                <label for="email" class="text-md text-primary my-3">Adresse Email</label>
                <input type="email"  class="form-control
                  block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  bg-blue-50
                text-gray-700
                  bg-clip-padding
                  border border-solid border-primary
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" value="johndoe@gmail.com"
                >
          </div>
          <div class="form-group mb-6">
                  <label for="telephone"  class="text-md text-primary my-3">Numero de telephone</label>
                  <input  type="text"   class="form-control
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    bg-blue-50
                    text-gray-700
                     bg-clip-padding
                    border border-solid border-primary
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" value="66766805"
                    >
          </div>
        </form>
      </div>
      
    </div>

     <div class=" my-4 bg-white border-white px-4 md:px-6 py-8 xl:px-16">
      <h1 class="text-primary text-2xl font-bold">Details du compte</h1>

      <div class="informaions">
        <div class="block py-6 px-0 w-full md:max-w-4xl ">
            <form>
              <div class="form-group mb-6">
                    <label for="email" class="text-md text-primary my-3">Mots de passe actuel</label>
                    <input type="password"  class="form-control
                      block
                      w-full
                      px-3
                      py-1.5
                      text-base
                      font-normal
                      bg-blue-50
                      text-gray-700
                      bg-clip-padding
                      border border-solid border-primary
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" value="johndoe@gmail.com"
                      >
              </div>

              <div class="grid md:grid-cols-2 gap-4">
                  <div class="form-group mb-6">
                    <label for="firstName" class="text-md text-primary my-3">Nouveau mots de passe</label>
                    <input type="password" class="form-control
                      block
                      w-full
                      px-3
                      py-1.5
                      text-base
                      font-normal
                      bg-blue-50
                      text-gray-700
                      bg-clip-padding
                      border border-solid border-primary
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                      >
                  </div>
                  
                  <div class="form-group mb-6">
                    <label for="firstName" class="text-md text-primary my-3">Confirmation de mots de passe</label>
                    <input type="password" class="form-control
                      block
                      w-full
                      px-3
                      py-1.5
                      text-base
                      font-normal
                      bg-blue-50
                      text-gray-700
                      bg-clip-padding
                      border border-solid border-primary
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"                       >
                  </div>
              </div>
              <div class="my-6">
                <button class="px-20 py-2 w-full md:w-auto bg-primary hover:opacity-80 font-bold text-white text-center border border-primary rounded-md">Enregistrer</button>
              </div>
            </form>
        </div>
        </div>


      
      
    </div>
  </div>
</template>

<script>
export default {
  layout:'dashboard',
  data() {
    return {
      currentUsers:{},
    }
  },
  mounted() {
    const usersInfo = JSON.parse(localStorage.getItem("usersInfo_carte_score"));
    if (usersInfo) {
      this.currentUsers = usersInfo;
      
    }
  },
}
</script>

<style scoped>

</style>