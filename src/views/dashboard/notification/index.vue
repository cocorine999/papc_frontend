<template>
 <dashboard>
    <div class="p-4">
      <div class="flex items-center justify-between flex-wrap">
        <p tabindex="0" class="focus:outline-none text-2xl font-semibold leading-6 text-gray-800 uppercase">Mes notifications</p>
      </div>
      <div  v-for="(data,index) in notifications" :key="index" class="w-full p-3 mt-4 bg-white rounded shadow flex flex-shrink-0">
        <div
           
              tabindex="0"
              aria-label="group icon"
              role="img"
              class="
                focus:outline-none
                w-8
                h-8
                border
                rounded-full
                border-gray-200
                flex flex-shrink-0
                items-center
                justify-center
              "
            >
             <svg stroke="currentColor" class="w-10 h-10  rounded-full" fill="currentColor" stroke-width="0" viewBox="0 0 496 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"></path></svg>
        </div>
        <div class="pl-3 w-full">
              <div class="flex items-center justify-between w-full">
                <p tabindex="0" class="focus:outline-none text-sm leading-6">
                  <span class="text-indigo-700 uppercase font-semibold">{{data.module}} :</span> {{data.texte}} par 
                  <span class="text-indigo-700 font-bold">Gomez jacob </span>
                </p>
                <div
                @click="viewNotification(data.id,index)"
                  tabindex="0"
                  aria-label="close icon"
                  role="button"
                  class="focus:outline-none cursor-pointer"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.5 3.5L3.5 10.5"
                      stroke="#4B5563"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M3.5 3.5L10.5 10.5"
                      stroke="#4B5563"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <p
                tabindex="0"
                class="focus:outline-none text-xs leading-3 pt-1 text-gray-500"
              >
                {{data.created_at}}
              </p>
        </div>
      </div>
  </div>
 </dashboard>
</template>

<script>
import Dashboard from "@/layouts/Dashboard";
import NotificationService from "@/services/modules/notification.service.js";
export default {
  components:{Dashboard},
  layout:'users',
  data() {
    return {
      notifications:[],
    }
  },
  methods: {
    getNotification() {
          NotificationService.get().then((data) => {
            const datas = data.data.data
           
            this.notifications = datas
          }).catch((e) => {
            console.log(e)
          })
    },
     viewNotification(id,index) {
      const data = {
        id:id
      }
      if (index > -1) { // only splice array when item is found
        this.notifications.splice(index, 1); // 2nd parameter means remove one item only
      }
      NotificationService.checkMessage(data).then((data) => {
          
          }).catch((e) => {
          console.log(e)
      })
    },
  },
  mounted() {
    this.getNotification()
  }
}
</script>

<style>

</style>