<template>
  <div class="">
    <div class="grid grid-cols-3 gap-4">
      <div class="bg-white shadow p-3">
        <h2 class="text-indigo-700 font-semibold">Taux d'execution physique</h2>
        <h4 class="text-2xl text-black font-bold mt-3">{{ projet.tep }}%</h4>
        <div class="mt-6 flex justify-between">
          <div class="flex items-center space-x-3">
            <span class="text-gray-700">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                version="1.1"
                viewBox="0 0 16 16"
                height="1.5em"
                width="1.5em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.707 6.293l-5-5c-0.39-0.391-1.024-0.391-1.414 0l-5 5c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l3.293-3.293v9.586c0 0.552 0.448 1 1 1s1-0.448 1-1v-9.586l3.293 3.293c0.195 0.195 0.451 0.293 0.707 0.293s0.512-0.098 0.707-0.293c0.391-0.391 0.391-1.024 0-1.414z"
                ></path>
              </svg>
            </span>
            <span class="text-sm text-green-700 font-semibold">{{ projet.tepByAnnee }}% </span>
          </div>
          <p class="text-gray-700 text-sm font-semibold">Depuis le 1 janvier</p>
        </div>
      </div>

      <div class="bg-white shadow p-3">
        <h2 class="text-indigo-700 font-semibold">Taux d'execution financier</h2>
        <h4 class="text-2xl text-black font-bold mt-3">{{ projet.taux_financier.tef }}%</h4>
        <div class="mt-6 flex justify-between">
          <div v-if="projet.taux_financier.percent <= 100"  class="flex items-center space-x-3">
            <span class="text-gray-700">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                version="1.1"
                viewBox="0 0 16 16"
                height="1.5em"
                width="1.5em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.707 6.293l-5-5c-0.39-0.391-1.024-0.391-1.414 0l-5 5c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l3.293-3.293v9.586c0 0.552 0.448 1 1 1s1-0.448 1-1v-9.586l3.293 3.293c0.195 0.195 0.451 0.293 0.707 0.293s0.512-0.098 0.707-0.293c0.391-0.391 0.391-1.024 0-1.414z"
                ></path>
              </svg>
            </span>
            <span class="text-sm text-green-700 font-semibold"> {{ projet.taux_financier.percent }} </span>
          </div>
          <div v-else  class="flex items-center space-x-3">
            <span class="text-gray-700">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                version="1.1"
                viewBox="0 0 16 16"
                height="1.5em"
                width="1.5em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.707 9.707l-5 5c-0.39 0.391-1.024 0.391-1.414 0l-5-5c-0.391-0.391-0.391-1.024 0-1.414s1.024-0.391 1.414 0l3.293 3.293v-9.586c0-0.552 0.448-1 1-1s1 0.448 1 1v9.586l3.293-3.293c0.195-0.195 0.451-0.293 0.707-0.293s0.512 0.098 0.707 0.293c0.391 0.391 0.391 1.024 0 1.414z"
                ></path>
              </svg>
            </span>
            <span  class="text-sm text-red-700 font-semibold"> {{ projet.taux_financier.percent }} </span>
          </div>

          <p class="text-gray-700 text-sm font-semibold">Depuis le 1 janvier</p>
        </div>
      </div>

      <div class="bg-white shadow p-3">
        <h2 class="text-indigo-700 font-semibold">Taux de decaissement</h2>
        <h4 class="text-2xl text-black font-bold mt-3">{{ projet.taux_decaissement.taux }}%</h4>
        <div class="mt-6 flex justify-between">
          <div v-if="projet.taux_decaissement.percent <= 100" class="flex items-center space-x-3">
            <span class="text-gray-700">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                version="1.1"
                viewBox="0 0 16 16"
                height="1.5em"
                width="1.5em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.707 9.707l-5 5c-0.39 0.391-1.024 0.391-1.414 0l-5-5c-0.391-0.391-0.391-1.024 0-1.414s1.024-0.391 1.414 0l3.293 3.293v-9.586c0-0.552 0.448-1 1-1s1 0.448 1 1v9.586l3.293-3.293c0.195-0.195 0.451-0.293 0.707-0.293s0.512 0.098 0.707 0.293c0.391 0.391 0.391 1.024 0 1.414z"
                ></path>
              </svg>
            </span>
            <span  class="text-sm text-green-700 font-semibold">{{ projet.taux_decaissement.percent }} </span>
          </div>
          <div v-else class="flex items-center space-x-3">
            <!-- boxicons -->
            <i class="bx bx-chevron-up bx-sm"></i>
            <!-- <span class="text-gray-700">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                version="1.1"
                viewBox="0 0 16 16"
                height="1.5em"
                width="1.5em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.707 9.707l-5 5c-0.39 0.391-1.024 0.391-1.414 0l-5-5c-0.391-0.391-0.391-1.024 0-1.414s1.024-0.391 1.414 0l3.293 3.293v-9.586c0-0.552 0.448-1 1-1s1 0.448 1 1v9.586l3.293-3.293c0.195-0.195 0.451-0.293 0.707-0.293s0.512 0.098 0.707 0.293c0.391 0.391 0.391 1.024 0 1.414z"
                ></path>
              </svg>
            </span> -->
            <span  class="text-sm text-red-700 font-semibold">{{ projet.taux_decaissement.percent }} </span>
          </div>
          <p class="text-gray-700 text-sm font-semibold">Depuis le 1 janvier</p>
        </div>
      </div>
    </div>
    <div class="bg-white my-3 shadow">
      <div class="p-3">
        <div>
          <p class="border border-gray-100 shadow rounded-md">
             <img v-if="image != null || image != undefined" 
                class=" max-h-52 w-full object-cover transition-transform duration-300 transform group-hover:scale-100"
                :src="`${base_url}${image.url}`">
              <img v-else class=" max-h-52 w-full object-cover transition-transform duration-300 transform group-hover:scale-100"
                src="@/assets/images/login/logo-gouv.webp"
                alt="">
          </p>
          <!-- divide OBJECTIF -->
          <div class="border-b-2 border-gray-700 mx-4 mb-8 relative p-4">
            <span class="w-full -mx-4 font-bold absolute bg-gray-700 px-4 py-1 text-white border-2 border-gray-700">Durée du projet : <span class="">du {{ projet.debut }} au {{ projet.fin }} </span></span> 
          </div>
          <!-- divide OBJECTIF -->
          <div class="border-b-2 border-blue-500 mx-4 mb-8 relative p-4">
            <span class="font-bold absolute bg-blue-500 px-4 py-1 text-white border-2 border-blue-500 rounded-lg">OBJECTIF GLOBALE</span>
          </div>
          <p class="p-4 font-bold text-sm text-justify">
            {{ projet.objectifGlobaux }}
          </p>
          <!-- <div class="flex justify-center">
            <button class="bg-blue-500 text-white px-4 py-2 uppercase outiline-none hover:bg-blue-500 transition-all duration-700 ">cadre logique</button>
          </div> -->
        </div>
        <!-- divide PROJET -->
        <div class="border-b-2 border-blue-500 mx-4 mb-8 relative p-4">
          <span class="font-bold absolute bg-blue-500 px-4 py-1 text-white border-2 border-blue-500 rounded-lg">DESCRIPTION DU PROJET</span>
        </div>
        <div class="p-4">
          <p class="h-36 overflow-hidden text-sm italic text-justify">
            {{projet.description}}
          </p>
          <button class="font-semibold bg-gray-700 text-white px-4 py-2 mt-4 hover:bg-blue-500">Lire plus</button>
        </div>
      </div>

      <!-- divide company -->
      <div class="border-b-2 mx-4 mb-8 relative p-4">
        <span class="absolute bg-white px-4 py-1 text-gray-500 border-2 rounded-lg">Entreprises</span>
      </div>

      <div class="w-5/6 mx-auto p-1">
        <vueper-slides 
          class="no-shadow "
          :bullets="false"
          :visible-slides="3"
          :slide-ratio="1 / 4"
          :gap="3"
          autoplay
          arrows-inside
        :pause-on-hover="pauseOnHover"
        @autoplay-pause="internalAutoPlaying = false"
        @autoplay-resume="internalAutoPlaying = true"
        
        :dragging-distance="70">

         <vueper-slide v-for="i in slide" :key="i" :title="i.title" :content="i.content"  :image="i.image" />
         </vueper-slides>
      </div>

      
      <!-- <img
              src="https://www.swissinfo.ch/resource/image/45678668/landscape_ratio16x9/1920/1080/8914355889303749b83cba6d80068f11/EEE9C8149B01C4A1D2D2E7165FED96B2/image_20200409phf9002.jpg"
              class="w-full h-52 object-cover py-2"
              alt=""
            /> -->

      <div class="grid grid-cols-3 mt-4">
        <div class="h-2 w-full bg-green-700"></div>
        <div class="h-2 w-full bg-yellow-500"></div>
        <div class="h-2 w-full bg-red-700"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {API_BASE_URL} from "@/services/configs/environment.js";
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
export default {
  name: 'Description',
  props:['projet','image'],
  components: {
    VueperSlides, 
    VueperSlide
  },
  data() {
    return {
      base_url:API_BASE_URL,
      pauseOnHover: true,
      autoPlaying: true,
     internalAutoPlaying: true,
    slide : [
      {
        image: 'https://www.gouv.bj/upload/images/articles/0751086001657376878.jpeg', 
      },
      {
        image: 'https://live.staticflickr.com/65535/52203050725_5541f81dc9_b.jpg',
      
             
      },
      {
        image: 'https://live.staticflickr.com/65535/52202575368_6fc5719f32_b.jpg',
             
      },
      {
        image: 'https://live.staticflickr.com/65535/52202555101_01232fe4d6_b.jpg',
             
      },
      {
        image: 'https://live.staticflickr.com/65535/52201567167_260ab83654_b.jpg',
             
      }
    ]
    };
  },

  computed: {},

  methods: {
  },

  created() {
    
  }

};
</script>

<style >
/*le carousel*/
.vueperslide--active {
 
  opacity: 1;
  border: 3px solid black;
  border-radius: 12px;
  border-color: #000 ;
}
.vueperslides__arrow svg {
  color: rgb(0, 26, 255);
  font-size: 16px;
  stroke-width: 2;
  width: 14px;
}
/* fin de la partie carousel*/
</style>
