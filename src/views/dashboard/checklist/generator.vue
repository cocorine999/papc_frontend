<template>
  <div class="w-full">
    <div class="my-8 flex items-center justify-between md:justify-center relative">
      <span class="border-b-2 border-t-2 w-8 md:w-24 inline-block mr-2 rounded"></span>
      <h1 class="text-gray-800 md:text-2xl font-semibold text-center">
        Apperçu de la checklist
      </h1>
      <span class="border-b-2 border-t-2 w-8 md:w-24 inline-block ml-2 rounded"></span>
    </div>
    <router-link to="/users/checklist" title="editer la checklist" class="cursor-pointeur bg-gray-300 p-2 rounded-md block absolute top-1 right-0 mx-4">
      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" height="2.2em" width="2.2em" xmlns="http://www.w3.org/2000/svg"><path d="M8 5a1 1 0 1 0 0 2h5.586l-1.293 1.293a1 1 0 0 0 1.414 1.414l3-3a1 1 0 0 0 0-1.414l-3-3a1 1 0 1 0-1.414 1.414L13.586 5H8zm4 10a1 1 0 1 0 0-2H6.414l1.293-1.293a1 1 0 1 0-1.414-1.414l-3 3a1 1 0 0 0 0 1.414l3 3a1 1 0 0 0 1.414-1.414L6.414 15H12z" stroke="none"/></svg>
    </router-link>
    <form action="">
      <div class="my-4 px-10" v-for="checklist in checklists.data" :key="checklist.id">
        <label for="name" class="my-4 block text-xl font-medium text-gray-700">{{checklist.question}}</label>
        <div v-if="checklist.type === 'simple'">
          <div class="flex items-center my-4">
            <input id="push_everything" name="push_notifications" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-primary border-gray-300"/>
            <label for="push_everything" class="ml-3 block text-sm font-medium text-gray-700">
             vrai
            </label>
          </div>
          <div class="flex items-center my-4">
            <input id="push_everything" name="push_notifications" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-primary border-gray-300"/>
            <label for="push_everything" class="ml-3 block text-sm font-medium text-gray-700">
             faux
            </label>
          </div>
        </div>
        <div v-else-if="checklist.type === 'photo'">  
          <div class="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div class="space-y-1 text-center">
              <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <div class="flex text-sm text-gray-600">
                <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" class="sr-only"/>
                </label>
                <p class="pl-1">or drag and drop</p>
              </div>
              <p class="text-xs text-gray-500"> PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="flex items-center my-4" v-for="sub in checklist.subtitre" :key="sub.id">
            <input id="push_everything" name="push_notifications" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-primary border-gray-300"/>
            <label for="push_everything" class="ml-3 block text-sm font-medium text-gray-700">
             {{sub}}
            </label>
          </div>
        </div>
      </div>
      <div class="px-10 mt-4">
        <button class="uppercase px-4 py-2 rounded bg-primary outline-none focus:outline-none hover:opacity-75 text-white">valider</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  layout:'dashboard',
  data() {
    return {
      checklists:this.$route.params
    }
  },
}
</script>

<style>

</style>