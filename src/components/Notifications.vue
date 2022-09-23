<template>
  <div >
   
    <div @click.stop="$emit('closeNotifModal')"  class="fixed top-0 right-0 left-0 bottom-0 bg-gray-900 z-40 bg-opacity-60 ">
     
      <div style="height:50vh"  class="absolute w-full md:w-2/5  position-card-notif z-50 shadow overflow-auto transform translate-x-0 transition ease-in-out duration-700" id="notification" ref="notification">
        
        <div @click.stop="$emit('openNotif')" class=" shadow-2xl w-full h-full rounded-2xl  bg-white overflow-y-auto p-8 absolute left-0 right-0">
          <div class="flex items-center justify-between">
            <div @click="$emit('closeNotifModal')" class="absolute -top-3 -left-0 z-50">
               <div class="py-4  text-red-500  ">
               <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></svg>
            </div>
            </div>
            <p tabindex="0" class="focus:outline-none mt-4 text-2xl font-semibold leading-6 ">
              Notifications
            </p>
            <div class="mt-4">
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
          <div class="mt-4 flex justify-end ">
            <button @click="gotoNotification" class="bg-blue-200 p-2 text-primary border text-xs font-bold hover:bg-primary hover:text-white border-blue-200 transition-all duration-500 uppercase">voir tout  </button>
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
      show: true,
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
    gotoNotification() {
      this.$router.push('/dashboard/notification')
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
