<template>
  <div >
    <div class="">
      <div title="cliquer ici" class="relative cursor-pointer" @click="active">
        <!-- <span> <img class="h-9 w-7 md:w-8" src="/img/cloche.gif" /> </span> -->
        <span v-if="true" class="" ><svg stroke="currentColor" class=" h-7 w-7 " fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M427.68 351.43C402 320 383.87 304 383.87 217.35 383.87 138 343.35 109.73 310 96c-4.43-1.82-8.6-6-9.95-10.55C294.2 65.54 277.8 48 256 48s-38.21 17.55-44 37.47c-1.35 4.6-5.52 8.71-9.95 10.53-33.39 13.75-73.87 41.92-73.87 121.35C128.13 304 110 320 84.32 351.43 73.68 364.45 83 384 101.61 384h308.88c18.51 0 27.77-19.61 17.19-32.57zM320 384v16a64 64 0 01-128 0v-16"></path></svg></span>
        <span  class="bg-red-500 md:w-5 md:h-5 w-4 h-4 text-white text-xs text-center font-semibold px-1 shadow rounded-full position-notif">5</span>
      </div>
    </div>
    <div v-if="show && closeNotifBox" @click="closeNotifModal" class="fixed top-0 right-0 left-0 bottom-0 bg-gray-900 z-40 bg-opacity-60 ">
      <div style="height:50vh" class="absolute w-full md:w-2/5  position-card-notif z-50 shadow overflow-auto transform translate-x-0 transition ease-in-out duration-700" id="notification" ref="notification">
        <div class=" shadow-2xl w-full h-full rounded-2xl  bg-white overflow-y-auto p-8 absolute left-0 right-0">
          <div class="flex items-center justify-between">
            <p tabindex="0" class="focus:outline-none text-2xl font-semibold leading-6 ">
              Notifications
            </p>
            <div>
              <button class="bg-blue-200 p-2 text-primary border text-xs font-bold hover:bg-primary hover:text-white border-blue-200 transition-all duration-500  ">Effacer tout</button>
            </div>
          </div>
          <div class="my-2  h-1 bg-gray-200 "></div>

          <div  class="w-full p-3 mt-4 bg-white rounded ">
            <h2 class="text-gray-700 text-sm mt-2 font-semibold mb-3">Aujourd'hui</h2>
            <div  class="pl-3 my-3 flex items-center justify-between" >
              <div class="flex space-x-3">
                <p class="w-8 h-8 bg-blue-900 rounded-full"></p>
                <p class="w-3/5 focus:outline-none text-sm leading-none">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, expedita?
                </p>
              </div>
              <p class="focus:outline-none hover:text-red-500  transition-all duration-500  -mt-1 text-gray-700 leading-3 p-2 ">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M7 4V2h10v2h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4h5zM6 6v14h12V6H6zm3 3h2v8H9V9zm4 0h2v8h-2V9z"></path></g></svg>
              </p>
            </div>
            <div  class="pl-3 my-3 flex items-center justify-between" >
              <div class="flex space-x-3">
                <p class="w-8 h-8 bg-blue-900 rounded-full"></p>
                <p class="w-3/5 focus:outline-none text-sm leading-none">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, expedita?
                </p>
              </div>
              <p class="focus:outline-none hover:text-red-500  transition-all duration-500  -mt-1 text-gray-700 leading-3 p-2 ">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M7 4V2h10v2h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4h5zM6 6v14h12V6H6zm3 3h2v8H9V9zm4 0h2v8h-2V9z"></path></g></svg>
              </p>
            </div>
          </div>
          <div  class="w-full p-3 mt-4 bg-white rounded ">
            <h2 class="text-gray-700 text-sm mt-2 font-semibold mb-3">11 Mars 2022</h2>
            <div  class="pl-3 my-3 flex items-center justify-between" >
              <div class="flex space-x-3">
                <p class="w-8 h-8 bg-blue-900 rounded-full"></p>
                <p class="w-3/5 focus:outline-none text-sm leading-none">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, expedita?
                </p>
              </div>
              <p class="focus:outline-none hover:text-red-500  transition-all duration-500  -mt-1 text-gray-700 leading-3 p-2 ">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M7 4V2h10v2h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4h5zM6 6v14h12V6H6zm3 3h2v8H9V9zm4 0h2v8h-2V9z"></path></g></svg>
              </p>
            </div>
            <div  class="pl-3 my-3 flex items-center justify-between" >
              <div class="flex space-x-3">
                <p class="w-8 h-8 bg-blue-900 rounded-full"></p>
                <p class="w-3/5 focus:outline-none text-sm leading-none">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, expedita?
                </p>
              </div>
              <p class="focus:outline-none hover:text-red-500  transition-all duration-500  -mt-1 text-gray-700 leading-3 p-2 ">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M7 4V2h10v2h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4h5zM6 6v14h12V6H6zm3 3h2v8H9V9zm4 0h2v8h-2V9z"></path></g></svg>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
     
  </div>
</template>

<script>

export default {
  data() {
    return {
      show: false,
      notifications:[],
      closeNotifBox:true,
    };
  },
  methods: {
    closeNotifModal(){
      if(this.show == true) {
        this.closeNotifBox = false
      }
    },
    active() {
      this.show = true
      this.closeNotifBox = true
    },
    notificationHandler(flag3) {
      let notification = this.$refs.notification;
      let checdiv = this.$refs.chec;
      // let flag3 = false;
     
      if (!flag3) {
        notification.classList.add("translate-x-full");
        notification.classList.remove("translate-x-0");
        setTimeout(function () {
          checdiv.classList.add("hidden");
        }, 1000);
        flag3 = true;
        this.show = false
      } else {
        setTimeout(function () {
          notification.classList.remove("translate-x-full");
          notification.classList.add("translate-x-0");
        }, 1000);
        checdiv.classList.remove("hidden");
        flag3 = false;
        this.show = true
       
      }
    },
  },
  mounted() {
    
  }
 
 
};
</script>

<style scoped>
  .position-notif {
    position: absolute;
    top: -2px;
    right: -4px;

  }

.position-card-notif {
  top: 105px;
  right: 60px;
 
}
  @media screen and (max-width:915px ) {
    .position-card-notif {
      top: 105px;
      right: 20px;
  
    }
  }
  @media screen and (max-width:500px ) {
    .position-card-notif {
      top: 105px;
      left: 5px;
    }
  }
  @media screen and (max-width:1280px ) {
    .position-card-notif {
    top: 105px;
    right: 48px;
  
  }
}
</style>
