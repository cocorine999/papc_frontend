<template>
  <div class="p-4">
    
    <vmodal  v-if="showModal" title="Uploader des fichiers"  v-on:close="showModal=false">
        <form action="" @submit.prevent="save" class="px-12" style="width:60vw !important" >
          <div class="w-full mx-4">
            <dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" :destroyDropzone="true"></dropzone>
          </div>

          <div class="m-4">
            <label class="text-xs font-semibold text-gray-500 uppercase md:text-sm text-light">Partager à</label>
            <multiselect v-model="value" tag-placeholder="Ajouter une nouvelle personne" placeholder="Ajouter une nouvelle personne" label="firstName" track-by="lastName"  :selectLabel="'Appuyez sur Entrée pour sélectionner'" :deselectLabel="'Appuyez sur Entrée pour supprimer'"  :options="options" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
          </div>

          
          <div class='flex items-center justify-center gap-4 pt-5 pb-5 my-4 md:gap-8'>
            <button  type="submit" class='w-auto px-4 py-2 font-medium text-white  shadow-xl bg-blue-500 hover:opacity-80'> 
              <span  class="mx-2 text-sm font-semibold uppercase" v-if="loading == false">
              Enregistrer et fermer
              </span>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>

            <button type="submit" class='w-auto px-4 py-2 font-medium text-white  shadow-xl bg-primary hover:opacity-80'> 
              <span  class="mx-2 text-sm font-semibold uppercase" v-if="loading == false">
              Enregistrer et ajouter
              </span>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </form>
    </vmodal>

    <vmodal  v-if="showModal2" title="fichier.extention"  v-on:close="close">
      <div style="height: 70vh;width:80vw">
        <vue-pdf-app  :pdf="pdfFile"></vue-pdf-app> 
      </div>


    </vmodal>
    <vmodal  v-if="showModal3" title="fichier.extention"  v-on:close="closeImg">
      <div style="height: 70vh;width:80vw">
        <img :src="`${imageFile}` " class="w-full object-contain">
      </div>


    </vmodal>

    <nav class="mb-2 text-sm font-semibold  " aria-label="Breadcrumb">
      <div>
        <ol class="inline-flex p-0 list-none">
          <li class="flex items-center ">
            <nuxt-link to="/dashboard" class="text-gray-600">dashboard</nuxt-link>
            <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
          </li>

          <li class="flex items-center text-blue-500 ">
            <nuxt-link to="#" class="">gestionnaire de fichier</nuxt-link>
          </li>
        </ol>
      </div> 
    </nav>
    <div class="flex justify-start mt-2">
      <div class="flex  items-center ">
       <span title="vue en mosaique" @click="switch1" :class="{'border-2':mosaique}" class="p-2  cursor-pointer border-gray-500 text-gray-700 hover:text-gray-500"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.8em" width="1.8em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M3 5v14a2 2 0 002 2h6V3H5a2 2 0 00-2 2zm16-2h-6v8h8V5c0-1.1-.9-2-2-2zm-6 18h6c1.1 0 2-.9 2-2v-6h-8v8z"></path></svg></span>
        <span title="vue en ligne" @click="switch2" :class="{'border-2':line}" class="p-2 text-gray-700 border-gray-500 cursor-pointer hover:text-gray-500 "><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.8em" width="1.8em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M3 14h4v-4H3v4zm0 5h4v-4H3v4zM3 9h4V5H3v4zm5 5h13v-4H8v4zm0 5h13v-4H8v4zM8 5v4h13V5H8z"></path></svg></span>
      </div>
    </div>
    <!-- <div>
      <FileManager class="card-card rounded p-2" />
    </div> -->
    
    <div class="bg-white relative p-4 border hover:border-gray-300 shadow-inner my-6 ">
      <div class="flex justify-between items-center space-x-3 border-gray-300 border p-2">
        <div class="flex ">
          <button @click="uploadFile" title="uploader un fichier"   class="p-2 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase rounded bg-primary focus:outline-none focus:shadow-outline">
            <span><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M1 14.5a6.496 6.496 0 0 1 3.064-5.519 8.001 8.001 0 0 1 15.872 0 6.5 6.5 0 0 1-2.936 12L7 21c-3.356-.274-6-3.078-6-6.5zm15.848 4.487a4.5 4.5 0 0 0 2.03-8.309l-.807-.503-.12-.942a6.001 6.001 0 0 0-11.903 0l-.12.942-.805.503a4.5 4.5 0 0 0 2.029 8.309l.173.013h9.35l.173-.013zM13 13v4h-2v-4H8l4-5 4 5h-3z"></path></g></svg></span>
            <span class="mx-2 text-sm font-semibold">uploader un fichier</span>
          </button>
        </div>
        <div class="flex items-center space-x-3">
          <div>
            <select name="filtre" class="h-10  px-5  text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none">
              <option value="">Tous</option>
              <option value="">Word</option>
              <option value="">Excel</option>
              <option value="">Pdf</option>
              <option value="">Image</option>
            </select>
          </div>
        
          <div> 
            <search-bar ></search-bar>
          </div>
        </div>
        
        
      </div>
      
      <div class="p-2" v-if="mosaique">
        <div class="">
          <div class="grid grid-cols-6 gap-5 justify-center mt-4 items-center">
            <div  class="flex flex-col cursor-pointer " v-for="word in files[3].word" :key="word.id">
              <span class="text-blue-500">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24" height="3.0em" width="3.0em" xmlns="http://www.w3.org/2000/svg"><title></title><path d="M23.004 1.5q.41 0 .703.293t.293.703v19.008q0 .41-.293.703t-.703.293H6.996q-.41 0-.703-.293T6 21.504V18H.996q-.41 0-.703-.293T0 17.004V6.996q0-.41.293-.703T.996 6H6V2.496q0-.41.293-.703t.703-.293zM6.035 11.203l1.442 4.735h1.64l1.57-7.876H9.036l-.937 4.653-1.325-4.5H5.38l-1.406 4.523-.938-4.675H1.312l1.57 7.874h1.641zM23.0 21v-3h-15v3zm0-4.5v-3.75H12v3.75zm0-5.25V7.5H12v3.75zm0-5.25V3h-15v3Z"></path></svg>
              </span>
              <span class="text-sm font-semibold">{{word.title}}</span>
            </div>
          </div>
        </div>
        <div class="my-4">
          <div class="grid grid-cols-6 gap-5 justify-center mt-4 items-center">
            <div  @click="preview(pdf.url,'pdf')" class="flex flex-col cursor-pointer" v-for="pdf in files[1].pdf" :key="pdf.id">
              <span class="text-red-500">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="3.0em" width="3.0em" xmlns="http://www.w3.org/2000/svg"><path d="M5.523 12.424c.14-.082.293-.162.459-.238a7.878 7.878 0 0 1-.45.606c-.28.337-.498.516-.635.572a.266.266 0 0 1-.035.012.282.282 0 0 1-.026-.044c-.056-.11-.054-.216.04-.36.106-.165.319-.354.647-.548zm2.455-1.647c-.119.025-.237.05-.356.078a21.148 21.148 0 0 0 .5-1.05 12.045 12.045 0 0 0 .51.858c-.217.032-.436.07-.654.114zm3.025.939a3.881 3.881 0 0 1-.435-.41c.228.005.434.022.612.054.317.057.466.147.518.209a.095.095 0 0 1 .026.064.436.436 0 0 1-.06.2.307.307 0 0 1-.094.124.107.107 0 0 1-.069.015c-.09-.003-.258-.066-.498-.256zM8.278 6.97c-.04.244-.108.524-.2.829a4.86 4.86 0 0 1-.089-.346c-.076-.353-.087-.63-.046-.822.038-.177.11-.248.196-.283a.517.517 0 0 1 .145-.04c.013.03.028.092.032.198.005.122-.007.277-.038.465z"></path><path fill-rule="evenodd" d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3zM4.165 13.668c.09.18.23.343.438.419.207.075.412.04.58-.03.318-.13.635-.436.926-.786.333-.401.683-.927 1.021-1.51a11.651 11.651 0 0 1 1.997-.406c.3.383.61.713.91.95.28.22.603.403.934.417a.856.856 0 0 0 .51-.138c.155-.101.27-.247.354-.416.09-.181.145-.37.138-.563a.844.844 0 0 0-.2-.518c-.226-.27-.596-.4-.96-.465a5.76 5.76 0 0 0-1.335-.05 10.954 10.954 0 0 1-.98-1.686c.25-.66.437-1.284.52-1.794.036-.218.055-.426.048-.614a1.238 1.238 0 0 0-.127-.538.7.7 0 0 0-.477-.365c-.202-.043-.41 0-.601.077-.377.15-.576.47-.651.823-.073.34-.04.736.046 1.136.088.406.238.848.43 1.295a19.697 19.697 0 0 1-1.062 2.227 7.662 7.662 0 0 0-1.482.645c-.37.22-.699.48-.897.787-.21.326-.275.714-.08 1.103z"></path></svg>
              </span>
              <span class="text-sm font-semibold"> {{pdf.title}} </span>
            </div>
          </div>
        </div>
        <div class="my-4">
          <div class="grid grid-cols-6 gap-5 justify-center mt-4 items-center">
            <div  @click="previewImage(image.url,'image')"  class="flex flex-col cursor-pointer" v-for="image in files[0].images" :key="image.id">
              <span class="">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1" viewBox="0 0 48 48" enable-background="new 0 0 48 48" height="3.0em" width="3.0em" xmlns="http://www.w3.org/2000/svg"><polygon fill="#90CAF9" points="40,45 8,45 8,3 30,3 40,13"></polygon><polygon fill="#E1F5FE" points="38.5,14 29,14 29,4.5"></polygon><polygon fill="#1565C0" points="21,23 14,33 28,33"></polygon><polygon fill="#1976D2" points="28,26.4 23,33 33,33"></polygon><circle fill="#1976D2" cx="31.5" cy="24.5" r="1.5"></circle></svg>
              </span>
              <span class="text-sm font-semibold">{{image.title}}</span>
            </div>
          </div>
        </div>
        <div class="my-4">
          <div class="grid grid-cols-6 gap-5 justify-center mt-4 items-center">
            <div  class="flex flex-col cursor-pointer" v-for="excel in files[2].excel" :key="excel.id">
              <span class="text-green-500">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24" height="3.0em" width="3.0em" xmlns="http://www.w3.org/2000/svg"><title></title><path d="M23 1.5q.41 0 .7.3.3.29.3.7v19q0 .41-.3.7-.29.3-.7.3H7q-.41 0-.7-.3-.3-.29-.3-.7V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h5V2.5q0-.41.3-.7.29-.3.7-.3zM6 13.28l1.42 2.66h2.14l-2.38-3.87 2.34-3.8H7.46l-1.3 2.4-.05.08-.04.09-.64-1.28-.66-1.29H2.59l2.27 3.82-2.48 3.85h2.16zM14.25 21v-3H7.5v3zm0-4.5v-3.75H12v3.75zm0-5.25V7.5H12v3.75zm0-5.25V3H7.5v3zm8.25 15v-3h-6.75v3zm0-4.5v-3.75h-6.75v3.75zm0-5.25V7.5h-6.75v3.75zm0-5.25V3h-6.75v3Z"></path></svg>
              </span>
              <span class="text-sm font-semibold"> {{excel.title}} </span>
            </div>
          </div>
        </div>
      </div>
      <div class="p-2" v-if="line">
        <div class="grid grid-cols-4 gap-5 justify-center mt-4 items-center p-2 bg-gray-200">
          <p  @click="trieName" class="flex justify-between cursor-pointer">
            <span class="text-sm font-semibold"> Nom</span>
            <span v-if="filtreName" class=""><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path></svg></span>
            <span v-else><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path></svg></span>
          </p>
          <p @click="trieDate" class="flex justify-between cursor-pointer">
            <span class="text-sm font-semibold">Date de modification</span>
            <span v-if="filtreDate" class=""><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path></svg></span>
            <span v-else><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path></svg></span>
          </p>
          <p @click="trieType" class="flex justify-between cursor-pointer">
            <span class="text-sm font-semibold">Type de document</span>
            <span v-if="filtreType" class=""><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path></svg></span>
            <span v-else><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path></svg></span>
          </p>
          <p @click="trieTaille" class="flex justify-between cursor-pointer">
            <span class="text-sm font-semibold">Taille</span>
            <span v-if="filtreTaille" class=""><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path></svg></span>
            <span v-else><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path></svg></span>
          </p>
        </div>
        <div class="my-4">
          <div class="grid grid-cols-4 gap-5 justify-center mt-4 items-center" v-for="word in files[3].word" :key="word.id">
            <div class="flex space-x-2 cursor-pointer ">
              <span class="text-blue-500">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24" height="1.0em" width="1.0em" xmlns="http://www.w3.org/2000/svg"><title></title><path d="M23.004 1.5q.41 0 .703.293t.293.703v19.008q0 .41-.293.703t-.703.293H6.996q-.41 0-.703-.293T6 21.504V18H.996q-.41 0-.703-.293T0 17.004V6.996q0-.41.293-.703T.996 6H6V2.496q0-.41.293-.703t.703-.293zM6.035 11.203l1.442 4.735h1.64l1.57-7.876H9.036l-.937 4.653-1.325-4.5H5.38l-1.406 4.523-.938-4.675H1.312l1.57 7.874h1.641zM23.0 21v-3h-15v3zm0-4.5v-3.75H12v3.75zm0-5.25V7.5H12v3.75zm0-5.25V3h-15v3Z"></path></svg>
              </span>
              <span class="text-sm font-semibold">{{word.title}}</span>
            </div>
            <span class="text-sm font-semibold">19-05-2022 12:05</span>
            <span class="text-sm font-semibold">Document microsoft</span>
            <span class="text-sm font-semibold">80 ko</span>
          </div>
        </div>
        <div class="my-4">
          <div class="grid grid-cols-4 gap-5 justify-center mt-4 items-center" v-for="pdf in files[1].pdf" :key="pdf.id">
            <div class="flex space-x-2 cursor-pointer" @click="preview(pdf.url,'pdf')" >
              <span class="text-red-500">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1.0em" width="1.0em" xmlns="http://www.w3.org/2000/svg"><path d="M5.523 12.424c.14-.082.293-.162.459-.238a7.878 7.878 0 0 1-.45.606c-.28.337-.498.516-.635.572a.266.266 0 0 1-.035.012.282.282 0 0 1-.026-.044c-.056-.11-.054-.216.04-.36.106-.165.319-.354.647-.548zm2.455-1.647c-.119.025-.237.05-.356.078a21.148 21.148 0 0 0 .5-1.05 12.045 12.045 0 0 0 .51.858c-.217.032-.436.07-.654.114zm3.025.939a3.881 3.881 0 0 1-.435-.41c.228.005.434.022.612.054.317.057.466.147.518.209a.095.095 0 0 1 .026.064.436.436 0 0 1-.06.2.307.307 0 0 1-.094.124.107.107 0 0 1-.069.015c-.09-.003-.258-.066-.498-.256zM8.278 6.97c-.04.244-.108.524-.2.829a4.86 4.86 0 0 1-.089-.346c-.076-.353-.087-.63-.046-.822.038-.177.11-.248.196-.283a.517.517 0 0 1 .145-.04c.013.03.028.092.032.198.005.122-.007.277-.038.465z"></path><path fill-rule="evenodd" d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3zM4.165 13.668c.09.18.23.343.438.419.207.075.412.04.58-.03.318-.13.635-.436.926-.786.333-.401.683-.927 1.021-1.51a11.651 11.651 0 0 1 1.997-.406c.3.383.61.713.91.95.28.22.603.403.934.417a.856.856 0 0 0 .51-.138c.155-.101.27-.247.354-.416.09-.181.145-.37.138-.563a.844.844 0 0 0-.2-.518c-.226-.27-.596-.4-.96-.465a5.76 5.76 0 0 0-1.335-.05 10.954 10.954 0 0 1-.98-1.686c.25-.66.437-1.284.52-1.794.036-.218.055-.426.048-.614a1.238 1.238 0 0 0-.127-.538.7.7 0 0 0-.477-.365c-.202-.043-.41 0-.601.077-.377.15-.576.47-.651.823-.073.34-.04.736.046 1.136.088.406.238.848.43 1.295a19.697 19.697 0 0 1-1.062 2.227 7.662 7.662 0 0 0-1.482.645c-.37.22-.699.48-.897.787-.21.326-.275.714-.08 1.103z"></path></svg>
              </span>
              <span class="text-sm font-semibold">{{pdf.title}}</span>
            </div>
            <span class="text-sm font-semibold">19-05-2022 12:05</span>
            <span class="text-sm font-semibold">Document pdf</span>
            <span class="text-sm font-semibold">80 ko</span>
          </div>
        </div>
        <div class="my-4">
          <div class="grid grid-cols-4 gap-5 justify-center mt-4 items-center" v-for="image in files[0].images" :key="image.id">
            <div @click="previewImage(image.url,'image')" class="flex space-x-2 cursor-pointer" >
              <span class="">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1" viewBox="0 0 48 48" enable-background="new 0 0 48 48" height="1.0em" width="1.0em" xmlns="http://www.w3.org/2000/svg"><polygon fill="#90CAF9" points="40,45 8,45 8,3 30,3 40,13"></polygon><polygon fill="#E1F5FE" points="38.5,14 29,14 29,4.5"></polygon><polygon fill="#1565C0" points="21,23 14,33 28,33"></polygon><polygon fill="#1976D2" points="28,26.4 23,33 33,33"></polygon><circle fill="#1976D2" cx="31.5" cy="24.5" r="1.5"></circle></svg>
              </span>
              <span class="text-sm font-semibold">{{image.title}}</span>
            </div>
            <span class="text-sm font-semibold">19-05-2022 12:05</span>
            <span class="text-sm font-semibold">Document image</span>
            <span class="text-sm font-semibold">80 ko</span>
          </div>
        </div>
        <div class="my-4">
          <div class="grid grid-cols-4 gap-5 justify-center mt-4 items-center" v-for="excel in files[2].excel" :key="excel.id">
            <div class="flex space-x-2 cursor-pointer" >
              <span class="text-green-500">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24" height="1.0em" width="1.0em" xmlns="http://www.w3.org/2000/svg"><title></title><path d="M23 1.5q.41 0 .7.3.3.29.3.7v19q0 .41-.3.7-.29.3-.7.3H7q-.41 0-.7-.3-.3-.29-.3-.7V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h5V2.5q0-.41.3-.7.29-.3.7-.3zM6 13.28l1.42 2.66h2.14l-2.38-3.87 2.34-3.8H7.46l-1.3 2.4-.05.08-.04.09-.64-1.28-.66-1.29H2.59l2.27 3.82-2.48 3.85h2.16zM14.25 21v-3H7.5v3zm0-4.5v-3.75H12v3.75zm0-5.25V7.5H12v3.75zm0-5.25V3H7.5v3zm8.25 15v-3h-6.75v3zm0-4.5v-3.75h-6.75v3.75zm0-5.25V7.5h-6.75v3.75zm0-5.25V3h-6.75v3Z"></path></svg>
              </span>
              <span class="text-sm font-semibold">{{excel.title}}</span>
            </div>
            <span class="text-sm font-semibold">19-05-2022 12:05</span>
            <span class="text-sm font-semibold">Document microsoft</span>
            <span class="text-sm font-semibold">80 ko</span>
          </div>
        </div>
      </div>
      <div class="absolute bottom-2 right-2">
        <div class="flex  items-center ">
          <span title="vue en mosaique" @click="switch1" :class="{'border-2':mosaique}" class="p-1  cursor-pointer border-gray-500 text-gray-700 hover:text-gray-500"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M3 5v14a2 2 0 002 2h6V3H5a2 2 0 00-2 2zm16-2h-6v8h8V5c0-1.1-.9-2-2-2zm-6 18h6c1.1 0 2-.9 2-2v-6h-8v8z"></path></svg></span>
          <span title="vue en ligne" @click="switch2" :class="{'border-2':line}" class="p-1 text-gray-700 border-gray-500 cursor-pointer hover:text-gray-500 "><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M3 14h4v-4H3v4zm0 5h4v-4H3v4zM3 9h4V5H3v4zm5 5h13v-4H8v4zm0 5h13v-4H8v4zM8 5v4h13V5H8z"></path></svg></span>
          </div>
      </div>
    </div>

  </div>
</template>

<script>

import VuePdfApp from "vue-pdf-app";
// import this to use default icons for buttons
import "vue-pdf-app/dist/icons/main.css";
import Dropzone from 'nuxt-dropzone'
import 'nuxt-dropzone/dropzone.css'
import Multiselect from 'vue-multiselect'
import Users from '~/components/Users'
export default {
  layout:'dashboard',
  components: {Dropzone,Multiselect,VuePdfApp,},
  data() {
    return {
      
      showModal:false,
      showModal2:false,
      showModal3:false,
      loading:false,
      title:'',
      line:false,
      mosaique:true,
      filtreName:true,
      filtreType:true,
      filtreDate:true,
      filtreTaille:true,
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        dictDefaultMessage: "Uploader une (des) fichiers (image/*,pdf,excel,word) ",
        addRemoveLinks: true,
        acceptedFiles: 'image/*,application/pdf,application/vnd.ms-powerpoint,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword' ,
        maxFilesize: 2,
       
      },
      value: [],
      options: Users.users,
      files:[
        {
          images:[
            {url:'/upload/img/voiture1.jpg',title:'voiture1'},
            {url:'/upload/img/voiture2.jpg',title:'voiture2'},
          ]
        },
        {
          pdf:[
            {url:'/upload/pdf/CononDoyle_LeSigneDesQuatre.pdf',title:'Le Signe Des Quatre'},
            {url:'/upload/pdf/Doyle-chien.pdf',title:'Doyle-chien.pdf'},
            {url:'/upload/pdf/CononDoyle_UneEtudeEnRouge.pdf',title:'Une Etude en Rouge.pdf'},
          ]
        },
        {
          excel:[
            {url:'/upload/excel/gomez.xlsx',title:'gomez'},
            {url:'/upload/excel/planning_1_semestre.xlxs',title:'planning'},
          ]
        },
        {
          word:[
            {url:'/upload/word/BILAN ACTUELLE DU PROJET IZICONTROL.docx',title:'BILAN ACTUELLE...'},
            {url:'/upload/word/BILAN DES ACTIVITES DU MOIS DE JANVIER 2022.docx',title:'BILAN DES ACTIVITES ...'},
            {url:'/upload/word/BILAN MOIS DE MAI.docx',title:'BILAN MOIS DE MAI...'},
            {url:'/upload/word/test.docx',title:'test'},
          ]
        },
      ],
      pdfFile:'',
      typeFile:'',
      imagefile:''
    }
    
  },
  methods: {
    addTag (newTag) {
      const tag = {
        firstName: newTag,
        
      }
      this.options.push(tag)
      this.value.push(tag)
    },
    uploadFile() {
      this.showModal = true
    },
    trieTaille() {
      this.filtreTaille = !this.filtreTaille
    },
    trieDate() {
      this.filtreDate = !this.filtreDate
    },
    trieType() {
      this.filtreType = !this.filtreType
    },
    trieName() {
      this.filtreName = !this.filtreName
    },
    switch1() {
      this.mosaique = true
      this.line = false
    },
    switch2() {
      this.mosaique = false
      this.line = true
    },
    close() {
      this.showModal2 =false
  
      this.pdfFile = ''
    
    },
    closeImg() {
      this.showModal3 =false
      this.imageFile = ''
     
    },
    previewImage() {
      this.showModal3 =true
      this.imageFile = file
      
    },
    preview(file,type) {
      this.pdfFile = file
      this.showModal2 =true
    }
   
  },
  monted() {
    const instance = this.$refs.myVueDropzone.dropzone
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>

</style>