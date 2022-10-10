<template>
  <div
    class="w-1/2 md:w-1/3 lg:w-64 fixed md:top-0 md:left-0 h-screen scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter _scrollbar-w-2 _scrolling-touch o lg:block bg-primary z-30 no-scrollbar overflow-y-auto"
    :class="sideBarOpen ? '' : 'hidden'"
    id="main-nav"
  >
   
    <div class="w-full h-20 flex px-4 items-center mb-8">
      <p class="font-semibold text-3xl text-blue-400 pl-4">PAPC </p>
    </div>

    <div v-if="currentRole ==='bailleur'" class="mb-1 px-4 flex items-center text-white cursor-pointer">
      <router-link
        to="/dashboard"
        style="width: 100%"
        class="flex space-x-3 items-center px-2 py-2 z-10 relative text-white hover:font-bold transition ease-in-out duration-500 cursor-pointer"
      >
        <span class=" ">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            height="1.3em"
            width="1.3em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0V0z"></path>
            <path
              d="M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9 17v2H5v-2h4M21 3h-8v6h8V3zM11 3H3v10h8V3zm10 8h-8v10h8V11zm-10 4H3v6h8v-6z"
            ></path>
          </svg>
        </span>
        <span class="font-semibold text-xs uppercase">Dashboard</span>
      </router-link>
    </div>

    <div v-if="programmeVisible" class="mb-1 px-4 flex items-center text-white cursor-pointer">
      <router-link
        to="/dashboard/programme"
        style="width: 100%"
        class="flex space-x-3 items-center px-2 py-2 z-10 relative text-white hover:font-bold transition ease-in-out duration-500 cursor-pointer"
      >
        <span class=" ">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            height="1.3em"
            width="1.3em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0V0z"></path>
            <path
              d="M18.92 12c.04.33.08.66.08 1 0 2.08-.8 3.97-2.1 5.39-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H7v-2h2c.55 0 1-.45 1-1V8h2c1.1 0 2-.9 2-2V3.46c-.95-.3-1.95-.46-3-.46C5.48 3 1 7.48 1 13s4.48 10 10 10 10-4.48 10-10c0-.34-.02-.67-.05-1h-2.03zM10 20.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L8 16v1c0 1.1.9 2 2 2v1.93zM22 4v-.5a2.5 2.5 0 00-5 0V4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h5c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zm-1 0h-3v-.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V4z"
            ></path>
          </svg>
        </span>
        <span class="font-semibold text-xs uppercase">Programme</span>
      </router-link>
    </div>

    <div v-if="uniteeDeGestionVisible" class="mb-1 px-4 flex items-center text-white cursor-pointer">
      <router-link
        to="/dashboard/unite-gestion"
        style="width: 100%"
        class="flex space-x-3 items-center px-2 py-2 z-10 relative text-white hover:font-bold transition ease-in-out duration-500 cursor-pointer"
      >
        <span class=" ">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            height="1.3em"
            width="1.3em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0V0z"></path>
            <path
              d="M16.49 15.5v-1.75L14 16.25l2.49 2.5V17H22v-1.5h-5.51zm3.02 4.25H14v1.5h5.51V23L22 20.5 19.51 18v1.75zM9.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5.75 8.9L3 23h2.1l1.75-8L9 17v6h2v-7.55L8.95 13.4l.6-3C10.85 12 12.8 13 15 13v-2c-1.85 0-3.45-1-4.35-2.45l-.95-1.6C9.35 6.35 8.7 6 8 6c-.25 0-.5.05-.75.15L2 8.3V13h2V9.65l1.75-.75"
            ></path>
          </svg>
        </span>
        <span class="font-semibold text-xs uppercase">Unite de gestion</span>
      </router-link>
    </div>

    <div v-if="bailleursVsisible" class="mb-1 px-4 flex items-center text-white cursor-pointer">
      <router-link
        to="/dashboard/bailleurs"
        style="width: 100%"
        class="flex space-x-3 items-center px-2 py-2 z-10 relative text-white hover:font-bold transition ease-in-out duration-500 cursor-pointer"
      >
        <span class=" ">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            height="1.3em"
            width="1.3em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"
            ></path>
          </svg>
        </span>
        <span class="font-semibold text-xs uppercase">Bailleurs</span>
      </router-link>
    </div>

    <div v-if="anoVisible || currentRole ==='bailleur'" class="mb-1 px-4 flex items-center text-white cursor-pointer">
      <router-link
        to="/dashboard/ano"
        style="width: 100%"
        class="flex space-x-3 items-center px-2 py-2 z-10 relative text-white hover:font-bold transition ease-in-out duration-500 cursor-pointer"
      >
        <span class=" ">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            height="1.3em"
            width="1.3em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"
            ></path>
          </svg>
        </span>
        <span class="font-semibold text-xs uppercase">ANO</span>
      </router-link>
    </div>

   

    <!-- <div v-if="currentRole ==='bailleur'" class="mb-3 px-4 flex items-center text-white  cursor-pointer ">
      <router-link   to="/dashboard/projets/composantes-globale" style="width:100%" class="flex items-center  px-2 py-2 z-10 relative space-x-4 text-white hover:font-bold  transition ease-in-out duration-500  cursor-pointer">
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" t="1569683753031" viewBox="0 0 1024 1024" version="1.1" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><defs></defs><path d="M312.1 591.5c3.1 3.1 8.2 3.1 11.3 0l101.8-101.8 86.1 86.2c3.1 3.1 8.2 3.1 11.3 0l226.3-226.5c3.1-3.1 3.1-8.2 0-11.3l-36.8-36.8c-3.1-3.1-8.2-3.1-11.3 0L517 485.3l-86.1-86.2c-3.1-3.1-8.2-3.1-11.3 0L275.3 543.4c-3.1 3.1-3.1 8.2 0 11.3l36.8 36.8z"></path><path d="M904 160H548V96c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H120c-17.7 0-32 14.3-32 32v520c0 17.7 14.3 32 32 32h356.4v32L311.6 884.1c-3.7 2.4-4.7 7.3-2.3 11l30.3 47.2v0.1c2.4 3.7 7.4 4.7 11.1 2.3L512 838.9l161.3 105.8c3.7 2.4 8.7 1.4 11.1-2.3v-0.1l30.3-47.2c2.4-3.7 1.3-8.6-2.3-11L548 776.3V744h356c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32z m-40 512H160V232h704v440z"></path></svg>
        <span class="font-semibold text-xs uppercase">Composantes</span>
      </router-link>
    </div>

    <div v-if="currentRole ==='bailleur'" class="mb-3 px-4 flex items-center text-white  cursor-pointer">
      <router-link  to="/dashboard/projets/sous-composantes-globale" style="width:100%" class="flex items-center  px-2 py-2 z-10 relative space-x-4 text-white hover:font-bold  transition ease-in-out duration-500  cursor-pointer">
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" t="1569683753031" viewBox="0 0 1024 1024" version="1.1" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><defs></defs><path d="M312.1 591.5c3.1 3.1 8.2 3.1 11.3 0l101.8-101.8 86.1 86.2c3.1 3.1 8.2 3.1 11.3 0l226.3-226.5c3.1-3.1 3.1-8.2 0-11.3l-36.8-36.8c-3.1-3.1-8.2-3.1-11.3 0L517 485.3l-86.1-86.2c-3.1-3.1-8.2-3.1-11.3 0L275.3 543.4c-3.1 3.1-3.1 8.2 0 11.3l36.8 36.8z"></path><path d="M904 160H548V96c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H120c-17.7 0-32 14.3-32 32v520c0 17.7 14.3 32 32 32h356.4v32L311.6 884.1c-3.7 2.4-4.7 7.3-2.3 11l30.3 47.2v0.1c2.4 3.7 7.4 4.7 11.1 2.3L512 838.9l161.3 105.8c3.7 2.4 8.7 1.4 11.1-2.3v-0.1l30.3-47.2c2.4-3.7 1.3-8.6-2.3-11L548 776.3V744h356c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32z m-40 512H160V232h704v440z"></path></svg>
        <span class="font-semibold text-xs uppercase">Sous composantes</span>
      </router-link>
    </div>

    <div v-if="currentRole ==='bailleur'" class="mb-3 px-4 flex items-center text-white  cursor-pointer">
      <router-link  to="/dashboard/projets/activites-globale" style="width:100%" class="flex items-center  px-2 py-2 z-10 relative space-x-4 text-white hover:font-bold  transition ease-in-out duration-500  cursor-pointer">
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" t="1569683753031" viewBox="0 0 1024 1024" version="1.1" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><defs></defs><path d="M312.1 591.5c3.1 3.1 8.2 3.1 11.3 0l101.8-101.8 86.1 86.2c3.1 3.1 8.2 3.1 11.3 0l226.3-226.5c3.1-3.1 3.1-8.2 0-11.3l-36.8-36.8c-3.1-3.1-8.2-3.1-11.3 0L517 485.3l-86.1-86.2c-3.1-3.1-8.2-3.1-11.3 0L275.3 543.4c-3.1 3.1-3.1 8.2 0 11.3l36.8 36.8z"></path><path d="M904 160H548V96c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H120c-17.7 0-32 14.3-32 32v520c0 17.7 14.3 32 32 32h356.4v32L311.6 884.1c-3.7 2.4-4.7 7.3-2.3 11l30.3 47.2v0.1c2.4 3.7 7.4 4.7 11.1 2.3L512 838.9l161.3 105.8c3.7 2.4 8.7 1.4 11.1-2.3v-0.1l30.3-47.2c2.4-3.7 1.3-8.6-2.3-11L548 776.3V744h356c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32z m-40 512H160V232h704v440z"></path></svg>
        <span class="font-semibold text-xs uppercase">Activités</span>
      </router-link>
    </div>  
  

    <div v-if="currentRole ==='bailleur'" class="mb-3 px-4 flex items-center text-white  cursor-pointer ">
      <router-link  to="/dashboard/projets/taches-globale" style="width:100%" class="flex items-center  px-2 py-2 z-10 relative space-x-4 text-white  hover:font-bold  transition ease-in-out duration-500  cursor-pointer">
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" t="1569683753031" viewBox="0 0 1024 1024" version="1.1" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><defs></defs><path d="M312.1 591.5c3.1 3.1 8.2 3.1 11.3 0l101.8-101.8 86.1 86.2c3.1 3.1 8.2 3.1 11.3 0l226.3-226.5c3.1-3.1 3.1-8.2 0-11.3l-36.8-36.8c-3.1-3.1-8.2-3.1-11.3 0L517 485.3l-86.1-86.2c-3.1-3.1-8.2-3.1-11.3 0L275.3 543.4c-3.1 3.1-3.1 8.2 0 11.3l36.8 36.8z"></path><path d="M904 160H548V96c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H120c-17.7 0-32 14.3-32 32v520c0 17.7 14.3 32 32 32h356.4v32L311.6 884.1c-3.7 2.4-4.7 7.3-2.3 11l30.3 47.2v0.1c2.4 3.7 7.4 4.7 11.1 2.3L512 838.9l161.3 105.8c3.7 2.4 8.7 1.4 11.1-2.3v-0.1l30.3-47.2c2.4-3.7 1.3-8.6-2.3-11L548 776.3V744h356c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32z m-40 512H160V232h704v440z"></path></svg>
        <span class="font-semibold text-xs uppercase">Taches</span>
      </router-link>
    </div> -->

    <div v-if="projetVisible || composanteVisible || composanteReVisible || activiteVisible || activiteReVisible  || planDecaissementVisible || tacheVisible || tacheReVisible  "  class="mb-1 px-6 relative">
      <input
        class="w-full absolute z-10 cursor-pointer opacity-0 h-5 top-0"
        type="checkbox"
        id="chck1"
      />
      <header
        class="flex justify-between items-center mb-3 cursor-pointer select-none tab-label"
        for="chck1"
      >
        <div class="flex space-x-3">
          <span class="text-white">
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              t="1569683753031"
              viewBox="0 0 1024 1024"
              version="1.1"
              height="1.3em"
              width="1.3em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs></defs>
              <path
                d="M312.1 591.5c3.1 3.1 8.2 3.1 11.3 0l101.8-101.8 86.1 86.2c3.1 3.1 8.2 3.1 11.3 0l226.3-226.5c3.1-3.1 3.1-8.2 0-11.3l-36.8-36.8c-3.1-3.1-8.2-3.1-11.3 0L517 485.3l-86.1-86.2c-3.1-3.1-8.2-3.1-11.3 0L275.3 543.4c-3.1 3.1-3.1 8.2 0 11.3l36.8 36.8z"
              ></path>
              <path
                d="M904 160H548V96c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H120c-17.7 0-32 14.3-32 32v520c0 17.7 14.3 32 32 32h356.4v32L311.6 884.1c-3.7 2.4-4.7 7.3-2.3 11l30.3 47.2v0.1c2.4 3.7 7.4 4.7 11.1 2.3L512 838.9l161.3 105.8c3.7 2.4 8.7 1.4 11.1-2.3v-0.1l30.3-47.2c2.4-3.7 1.3-8.6-2.3-11L548 776.3V744h356c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32z m-40 512H160V232h704v440z"
              ></path>
            </svg>
          </span>
          <p class="text-white text-xs font-semibold uppercase">Projets</p>
        </div>
        <!-- <div class="rounded-full border border-gray h-6 w-6 flex items-center justify-center test">
          <svg aria-hidden="true" class="" data-reactid="266" fill="none" height="24" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div> -->
        <i class="bx bx-chevron-down bx-sm text-white"></i>
      </header>

      <div class="tab-content mb-3 bg-white">
        <div v-if="projetVisible " class="mb-1 flex items-center text-gray-700 cursor-pointer">
          <router-link
            to="/dashboard/projets"
            style="width: 100%"
            class="flex items-center px-2 py-2 z-10 relative space-x-4 text-gray-700 hover:font-bold transition ease-in-out duration-500 cursor-pointer"
          >
            <span class="font-semibold text-xs">Projets</span>
          </router-link>
        </div>

        <div v-if="composanteVisible || composanteReVisible" class="mb-1 flex items-center text-gray-700 cursor-pointer">
          <router-link
            to="/dashboard/projets/composantes-globale"
            style="width: 100%"
            class="flex items-center px-2 py-2 z-10 relative space-x-4 text-gray-700 hover:font-bold transition ease-in-out duration-500 cursor-pointer"
          >
            <span class="font-semibold text-xs">Composantes</span>
          </router-link>
        </div>

        <div v-if="composanteVisible || composanteReVisible" class="mb-1 flex items-center text-gray-700 cursor-pointer">
          <router-link
            to="/dashboard/projets/sous-composantes-globale"
            style="width: 100%"
            class="flex items-center px-2 py-2 z-10 relative space-x-4 text-gray-700 hover:font-bold transition ease-in-out duration-500 cursor-pointer"
          >
            <span class="font-semibold text-xs">Sous composantes</span>
          </router-link>
        </div>

        <div v-if="activiteVisible || activiteReVisible || planDecaissementVisible" class="mb-1 flex items-center text-gray-700 cursor-pointer">
          <router-link
            to="/dashboard/projets/activites-globale"
            style="width: 100%"
            class="flex items-center px-2 py-2 z-10 relative space-x-4 text-gray-700 hover:font-bold transition ease-in-out duration-500 cursor-pointer"
          >
            <span class="font-semibold text-xs">Activités</span>
          </router-link>
        </div>

        <div v-if="tacheVisible || tacheReVisible " class="mb-1 flex items-center text-gray-700 cursor-pointer">
          <router-link
            to="/dashboard/projets/taches-globale"
            style="width: 100%"
            class="flex items-center px-2 py-2 z-10 relative space-x-4 hover:font-bold transition ease-in-out duration-500 cursor-pointer"
          >
            <span class="font-semibold text-xs">Taches</span>
          </router-link>
        </div>
      </div>
    </div>

    <div v-if="indicateurVisible || suiviIndicateurVisible  " class="mb-1 px-6 relative">
      <input
        class="w-full absolute z-10 cursor-pointer opacity-0 h-5 top-0"
        type="checkbox"
        id="chck3"
      />
      <header
        class="flex justify-between mb-3 items-center cursor-pointer select-none tab-label"
        for="chck3"
      >
        <div class="flex space-x-3">
          <span class="text-white">
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="1.3em"
              width="1.3em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                d="M20 15H4v-2h16v2zm0 2H4v2h16v-2zm-5-6l5-3.55V5l-5 3.55L10 5 4 8.66V11l5.92-3.61L15 11z"
              ></path>
            </svg>
          </span>
          <p class="text-white text-xs font-semibold uppercase">Indicateurs</p>
        </div>
        <!-- <div class="rounded-full border border-gray h-6 w-6 flex items-center justify-center test">
          <svg aria-hidden="true" class="" data-reactid="266" fill="none" height="24" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div> -->
        <i class="bx bx-chevron-down bx-sm text-white"></i>
      </header>
      <div v-if="indicateurVisible" class="tab-content mb-3 bg-white">
        <div class="mb-1 flex items-center text-gray-700 cursor-pointer">
          <router-link
            to="/dashboard/indicateurs/"
            style="width: 100%"
            class="flex items-center px-2 py-2 z-10 relative space-x-4 text-gray-700 hover:font-bold transition ease-in-out duration-500 cursor-pointer"
          >
            <span class="font-semibold text-xs">Indicateurs</span>
          </router-link>
        </div>

        <div v-if="suiviIndicateurVisible" class="mb-1 flex items-center text-gray-700 cursor-pointer">
          <router-link
            to="/dashboard/indicateurs/suivi"
            style="width: 100%"
            class="flex items-center px-2 py-2 z-10 relative space-x-4 text-gray-700 hover:font-bold transition ease-in-out duration-500 cursor-pointer"
          >
            <span class="font-semibold text-xs">Suivi</span>
          </router-link>
        </div>
      </div>
    </div>

    <div v-if="indicateurModVisible || suiviIndicateurModVisible  " class="mb-1 px-6 relative">
      <input
        class="w-full absolute z-10 cursor-pointer opacity-0 h-5 top-0"
        type="checkbox"
        id="chck33"
      />
      <header
        class="flex justify-between mb-3 items-center cursor-pointer select-none tab-label"
        for="chck3"
      >
        <div class="flex space-x-3">
          <span class="text-white">
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="1.3em"
              width="1.3em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                d="M20 15H4v-2h16v2zm0 2H4v2h16v-2zm-5-6l5-3.55V5l-5 3.55L10 5 4 8.66V11l5.92-3.61L15 11z"
              ></path>
            </svg>
          </span>
          <p class="text-white text-xs font-semibold uppercase">Indicateurs MOD</p>
        </div>
        <!-- <div class="rounded-full border border-gray h-6 w-6 flex items-center justify-center test">
          <svg aria-hidden="true" class="" data-reactid="266" fill="none" height="24" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div> -->
        <i class="bx bx-chevron-down bx-sm text-white"></i>
      </header>
      <div v-if="indicateurModVisible" class="tab-content mb-3 bg-white">
        <div class="mb-1 flex items-center text-gray-700 cursor-pointer">
          <router-link
            to="/dashboard/indicateurs-mod"
            style="width: 100%"
            class="flex items-center px-2 py-2 z-10 relative space-x-4 text-gray-700 hover:font-bold transition ease-in-out duration-500 cursor-pointer"
          >
            <span class="font-semibold text-xs">Indicateurs</span>
          </router-link>
        </div>

        <div v-if="suiviIndicateurModVisible" class="mb-1 flex items-center text-gray-700 cursor-pointer">
          <router-link
            to="/dashboard/indicateurs/suivi-mod"
            style="width: 100%"
            class="flex items-center px-2 py-2 z-10 relative space-x-4 text-gray-700 hover:font-bold transition ease-in-out duration-500 cursor-pointer"
          >
            <span class="font-semibold text-xs">Suivi</span>
          </router-link>
        </div>
      </div>
    </div>

    <div v-if="currentRole ==='bailleur'|| decaissementVisible || planDecaissementVisible  || pointFinancierVisible || suiviFinancierVisible "  class="mb-1 px-6 relative">
      <input
        class="w-full absolute z-10 cursor-pointer opacity-0 h-5 top-0"
        type="checkbox"
        id="chck5"
      />
      <header
        class="flex justify-between items-center mb-3 cursor-pointer select-none tab-label"
        for="chck5"
      >
        <div class="flex space-x-3">
          <span class="text-white">
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 512 512"
              height="1.3em"
              width="1.3em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M298.9 24.31c-14.9.3-25.6 3.2-32.7 8.4l-97.3 52.1-54.1 73.59c-11.4 17.6-3.3 51.6 32.3 29.8l39-51.4c49.5-42.69 150.5-23.1 102.6 62.6-23.5 49.6-12.5 73.8 17.8 84l13.8-46.4c23.9-53.8 68.5-63.5 66.7-106.9l107.2 7.7-1-112.09-194.3-1.4zM244.8 127.7c-17.4-.3-34.5 6.9-46.9 17.3l-39.1 51.4c10.7 8.5 21.5 3.9 32.2-6.4 12.6 6.4 22.4-3.5 30.4-23.3 3.3-13.5 8.2-23 23.4-39zm-79.6 96c-.4 0-.9 0-1.3.1-3.3.7-7.2 4.2-9.8 12.2-2.7 8-3.3 19.4-.9 31.6 2.4 12.1 7.4 22.4 13 28.8 5.4 6.3 10.4 8.1 13.7 7.4 3.4-.6 7.2-4.2 9.8-12.1 2.7-8 3.4-19.5 1-31.6-2.5-12.2-7.5-22.5-13-28.8-4.8-5.6-9.2-7.6-12.5-7.6zm82.6 106.8c-7.9.1-17.8 2.6-27.5 7.3-11.1 5.5-19.8 13.1-24.5 20.1-4.7 6.9-5.1 12.1-3.6 15.2 1.5 3 5.9 5.9 14.3 6.3 8.4.5 19.7-1.8 30.8-7.3 11.1-5.5 19.8-13 24.5-20 4.7-6.9 5.1-12.2 3.6-15.2-1.5-3.1-5.9-5.9-14.3-6.3-1.1-.1-2.1-.1-3.3-.1zm-97.6 95.6c-4.7.1-9 .8-12.8 1.9-8.5 2.5-13.4 7-15 12.3-1.7 5.4 0 11.8 5.7 18.7 5.8 6.8 15.5 13.3 27.5 16.9 11.9 3.6 23.5 3.5 32.1.9 8.6-2.5 13.5-7 15.1-12.3 1.6-5.4 0-11.8-5.8-18.7-5.7-6.8-15.4-13.3-27.4-16.9-6.8-2-13.4-2.9-19.4-2.8z"
              ></path>
            </svg>
          </span>
          <p class="text-white text-xs font-semibold uppercase">Finances</p>
        </div>
        <!-- <div class="rounded-full border border-gray h-6 w-6 flex items-center justify-center test">
          <svg aria-hidden="true" class="" data-reactid="266" fill="none" height="24" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div> -->
        <i class="bx bx-chevron-down bx-sm text-white"></i>
      </header>
      <div class="tab-content mb-3 bg-white">
        <div v-if="decaissementVisible || currentRole ==='bailleur'" class="mb-1 flex items-center text-gray-700 cursor-pointer">
          <router-link
            to="/dashboard/finances/decaissement"
            style="width: 100%"
            class="flex items-center px-2 py-2 z-10 relative space-x-4 text-gray-700 hover:font-bold transition ease-in-out duration-500 cursor-pointer"
          >
            <span class="font-semibold text-xs">Décaissement</span>
          </router-link>
        </div>

        <div v-if="planDecaissementVisible || currentRole ==='bailleur'" class="mb-1 flex items-center text-gray-700 cursor-pointer">
          <router-link
            to="/dashboard/finances/plan_decaissement"
            style="width: 100%"
            class="flex items-center px-2 py-2 z-10 relative space-x-4 text-gray-700 hover:font-bold transition ease-in-out duration-500 cursor-pointer"
          >
            <span class="font-semibold text-xs">Plan de decaissement</span>
          </router-link>
        </div>

        <div v-if="pointFinancierVisible || currentRole ==='bailleur'" class="mb-1  flex items-center text-gray-700  cursor-pointer ">
          <router-link to="/dashboard/finances/point-financier" style="width:100%" class="flex items-center  px-2 py-2 z-10 relative space-x-4 text-gray-700 hover:font-bold  transition ease-in-out duration-500  cursor-pointer">
            <span class="font-semibold text-xs">Point financier</span>
          </router-link>
        </div>

        

        <div v-if="suiviFinancierVisible || currentRole ==='bailleur'" class="mb-1  flex items-center text-gray-700  cursor-pointer">
          <router-link to="/dashboard/finances/suivi" style="width:100%" class="flex items-center  px-2 py-2 z-10 relative space-x-4 text-gray-700 hover:font-bold  transition ease-in-out duration-500  cursor-pointer">
            <span class="font-semibold text-xs">Suivi financier</span>
          </router-link>
        </div>
      </div>
    </div>

    <div v-if="activiteEnVisible || entrepriseExecutanteVisible || formulaireVisible " class="mb-1 px-6 relative">
      <input
        class="w-full absolute z-10 cursor-pointer opacity-0 h-5 top-0"
        type="checkbox"
        id="chck5"
      />
      <header
        class="flex justify-between items-center mb-1 cursor-pointer select-none tab-label"
        for="chck5"
      >
        <div class="flex space-x-3">
          <span class="text-white">
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 512 512"
              height="1.3em"
              width="1.3em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M161.563 19.28c10.093 10.734 16.743 23.678 20.562 37.657 6.202 22.707 5.806 48.148 3.72 74.094-4.176 51.894-14.58 106.512-2.44 140.407 11.396 31.814 29.668 50.71 49.94 60 8.72 3.998 17.9 6.21 27.186 6.782 22.195-65.084 17.46-148.144-19.06-204.283 48.352 48.234 71.19 121.068 56.436 197.407l-8.78 3.53c2.723-.808 5.42-1.763 8.093-2.843 41.783-16.87 75.975-66.253 61.75-138.655-6.536-33.265-28.966-80.165-66.5-116.5-32.472-31.432-75.827-55.212-130.908-57.594zM445.53 202.813c-.84 12.1-4.638 23.528-10.56 33.907-10.353 18.14-26.448 33.757-43.876 48.593-34.856 29.67-75.057 57.156-88.313 85.218-12.555 26.583-12.884 49.252-6.186 67.283 2.92 7.86 7.21 14.894 12.625 20.968 53.708-26.787 101.73-80.91 113.81-138.03.076 59.646-30.63 118.687-86.624 156.906 35.802 14.545 86.282 5.034 121.72-47.75 16.418-24.456 31.558-67.3 30.812-112.875-.634-38.688-12.264-79.23-43.407-114.217zm-424.874 73.47c-9.483 45.878.708 86.832 19.5 120.656 22.136 39.84 56.682 69.376 83.125 82.343 57.07 27.988 105.514 10.968 129.25-19.53-67.59-5.1-123.692-40.873-153.436-92.563 39.02 43.428 107.658 66.29 167.562 62.625 1.654-7.963 1.87-16.204.47-24.468-3.214-18.965-14.87-38.447-39.032-55.188-25.505-17.67-74.045-21.36-119.063-29.625-22.508-4.13-44.247-9.59-62.28-20.124-10.323-6.03-19.314-14.06-26.094-24.125z"
              ></path>
            </svg>
          </span>
          <p class="text-white text-xs font-semibold uppercase">
            Activité Environnement
          </p>
        </div>
        <!-- <div class="rounded-full border border-gray h-6 w-6 flex items-center justify-center test">
          <svg aria-hidden="true" class="" data-reactid="266" fill="none" height="24" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div> -->
        <i class="bx bx-chevron-down bx-sm text-white"></i>
      </header>
      <div class="tab-content mb-3 bg-white">
        <div v-if="activiteEnVisible || entrepriseExecutanteVisible || formulaireVisible"  class="mb-1 flex items-center text-gray-700 cursor-pointer">
          <router-link
            to="/dashboard/unite-gestion/checklist"
            style="width: 100%"
            class="flex items-center p-2 z-10 relative space-x-4 text-gray-700 hover:font-bold transition ease-in-out duration-500 cursor-pointer"
          >
            <span class="font-semibold uppercase text-xs"
              >unité de gestion</span
            >
          </router-link>
        </div>
         <div v-if="activiteEnVisible || entrepriseExecutanteVisible || formulaireVisible" class="mb-1 flex items-center cursor-pointer">
          <router-link
            to="/dashboard/mod/checklist"
            style="width: 100%"
            class="flex items-center p-2 z-10 relative space-x-4 text-gray-700 hover:font-bold transition ease-in-out duration-500 cursor-pointer">
            <span class="font-semibold uppercase text-primary text-xs">MOD</span>
          </router-link>
        </div>
        <div v-if="activiteEnVisible || entrepriseExecutanteVisible || formulaireVisible" class="mb-1 flex items-center cursor-pointer">
          <router-link to="/dashboard/mission-controle/checklist" style="width: 100%" class="flex items-center p-2 z-10 relative space-x-4 text-gray-700 hover:font-bold transition ease-in-out duration-500 cursor-pointer">
            <span class="font-semibold uppercase text-primary text-xs">Mission de controle</span>
            </router-link>
          </div>
          <div v-if="activiteEnVisible || entrepriseExecutanteVisible || formulaireVisible" class="mb-1 flex items-center cursor-pointer">
            <router-link
              to="/dashboard/entreprise/checklist"
              style="width: 100%"
              class="flex items-center p-2 z-10 relative space-x-4 text-gray-700 hover:font-bold transition ease-in-out duration-500 cursor-pointer">
              <span class="font-semibold uppercase text-primary text-xs" >Entreprise</span>
            </router-link>
          </div>
      </div>
    </div>

    <div v-if="voirPtaVisible || voirPpmVisible" class="mb-1 px-4 flex items-center text-white cursor-pointer">
      <router-link
        to="/dashboard/pta"
        style="width: 100%"
        class="flex space-x-3 items-center px-2 py-2 z-10 relative text-white hover:font-bold transition ease-in-out duration-500 cursor-pointer"
      >
        <span class=" ">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            height="1.3em"
            width="1.3em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path
              d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V6h5.17l2 2H20v10zm-2-6H6v-2h12v2zm-4 4H6v-2h8v2z"
            ></path>
          </svg>
        </span>
        <span class="font-semibold text-xs uppercase">PTAB</span>
      </router-link>
    </div>

    <div v-if="maitriseOeuvreVisible" class="mb-1 px-4 flex items-center text-white cursor-pointer">
      <router-link
        to="/dashboard/collecteur"
        style="width: 100%"
        class="flex space-x-3 items-center px-2 py-2 z-10 relative text-white hover:font-bold transition ease-in-out duration-500 cursor-pointer"
      >
        <span class=" ">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            height="1.3em"
            width="1.3em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path
              d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V6h5.17l2 2H20v10zm-2-6H6v-2h12v2zm-4 4H6v-2h8v2z"
            ></path>
          </svg>
        </span>
        <span class="font-semibold text-xs uppercase">Collecteur</span>
      </router-link>
    </div>

    <div v-if="entrepriseExecutanteVisible ||  modVsisible || missionControleVisible" class="mb-1 px-6 relative">
      <input
        class="w-full absolute z-10 cursor-pointer opacity-0 h-5 top-0"
        type="checkbox"
        id="chck4"
      />
      <header
        class="flex justify-between mb-3 items-center cursor-pointer select-none tab-label"
        for="chck4"
      >
        <div class="flex space-x-3">
          <span class="text-white">
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="1.3em"
              width="1.3em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V6h5.17l2 2H20v10zm-2-6H6v-2h12v2zm-4 4H6v-2h8v2z"
              ></path>
            </svg>
          </span>
          <p class="text-white text-xs font-semibold uppercase">Entreprises</p>
        </div>
        <!-- <div class="rounded-full border border-gray h-6 w-6 flex items-center justify-center test">
          <svg aria-hidden="true" class="" data-reactid="266" fill="none" height="24" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div> -->
        <i class="bx bx-chevron-down bx-sm text-white"></i>
      </header>
      <div class="tab-content mb-3 bg-white">
        <div v-if="modVsisible" class="mb-1 flex items-center text-gray-700 cursor-pointer">
          <router-link
            to="/dashboard/mod"
            style="width: 100%"
            class="flex items-center px-2 py-2 z-10 relative space-x-4 text-gray-700 hover:font-bold transition ease-in-out duration-500 cursor-pointer"
          >
            <span class="font-semibold text-xs">MOD</span>
          </router-link>
        </div>

        <div v-if="missionControleVisible" class="mb-1 flex items-center text-gray-700 cursor-pointer">
          <router-link
            to="/dashboard/mission-controle"
            style="width: 100%"
            class="flex items-center px-2 py-2 z-10 relative space-x-4 text-gray-700 hover:font-bold transition ease-in-out duration-500 cursor-pointer"
          >
            <span class="font-semibold text-xs">Mission de controle</span>
          </router-link>
        </div>

        <div v-if="entrepriseExecutanteVisible" class="mb-1 flex items-center text-gray-700 cursor-pointer">
          <router-link
            to="/dashboard/entreprises"
            style="width: 100%"
            class="flex items-center px-2 py-2 z-10 relative space-x-4 text-gray-700 hover:font-bold transition ease-in-out duration-500 cursor-pointer"
          >
            <span class="font-semibold text-xs">Entreprises exécutante</span>
          </router-link>
        </div>
      </div>
    </div>

    <div v-if="institutionVisible" class="mb-1 px-4 flex items-center text-white cursor-pointer">
      <router-link
        to="/dashboard/instutitions"
        style="width: 100%"
        class="flex space-x-3 items-center px-2 py-2 z-10 relative text-white hover:font-bold transition ease-in-out duration-500 cursor-pointer"
      >
        <span class=" ">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            height="1.3em"
            width="1.3em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0V0z"></path>
            <path
              d="M17 7h2v2h-2zM17 11h2v2h-2zM17 15h2v2h-2zM1 11v10h6v-5h2v5h6V11L8 6l-7 5zm12 8h-2v-5H5v5H3v-7l5-3.5 5 3.5v7z"
            ></path>
            <path d="M10 3v1.97l2 1.43V5h9v14h-4v2h6V3z"></path>
          </svg>
        </span>
        <span class="font-semibold text-xs uppercase">Instutitions</span>
      </router-link>
    </div>

    <div class="mb-1 px-4 flex items-center text-white cursor-pointer">
      <router-link
        to="/dashboard/formulaire"
        style="width: 100%"
        class="flex space-x-3 items-center px-2 py-2 z-10 relative text-white hover:font-bold transition ease-in-out duration-500 cursor-pointer"
      >
        <span class=" ">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 448 512"
            height="1.3em"
            width="1.3em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M448 75.2v361.7c0 24.3-19 43.2-43.2 43.2H43.2C19.3 480 0 461.4 0 436.8V75.2C0 51.1 18.8 32 43.2 32h361.7c24 0 43.1 18.8 43.1 43.2zm-37.3 361.6V75.2c0-3-2.6-5.8-5.8-5.8h-9.3L285.3 144 224 94.1 162.8 144 52.5 69.3h-9.3c-3.2 0-5.8 2.8-5.8 5.8v361.7c0 3 2.6 5.8 5.8 5.8h361.7c3.2.1 5.8-2.7 5.8-5.8zM150.2 186v37H76.7v-37h73.5zm0 74.4v37.3H76.7v-37.3h73.5zm11.1-147.3l54-43.7H96.8l64.5 43.7zm210 72.9v37h-196v-37h196zm0 74.4v37.3h-196v-37.3h196zm-84.6-147.3l64.5-43.7H232.8l53.9 43.7zM371.3 335v37.3h-99.4V335h99.4z"
            ></path>
          </svg>
        </span>
        <span class="font-semibold text-xs uppercase">Rapports</span>
      </router-link>
    </div>

    <div v-if="papVisible" class="mb-1 px-4 flex items-center text-white cursor-pointer">
      <router-link
        to="/dashboard/PAP"
        style="width: 100%"
        class="flex space-x-3 items-center px-2 py-2 z-10 relative text-white hover:font-bold transition ease-in-out duration-500 cursor-pointer"
      >
        <span class=" ">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            height="1.3em"
            width="1.3em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path
              d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V6h5.17l2 2H20v10zm-2-6H6v-2h12v2zm-4 4H6v-2h8v2z"
            ></path>
          </svg>
        </span>
        <span class="font-semibold text-xs uppercase">PAPs</span>
      </router-link>
    </div>

    <div v-if="historiqueVisible" class="mb-1 px-4 flex items-center text-white cursor-pointer">
      <router-link
        to="/dashboard/historique"
        style="width: 100%"
        class="flex space-x-3 items-center px-2 py-2 z-10 relative text-white hover:font-bold transition ease-in-out duration-500 cursor-pointer"
      >
        <span class=" ">
         <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><desc></desc><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><polyline points="12 8 12 12 14 14"></polyline><path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5"></path></svg>
        </span>
        <span class="font-semibold text-xs uppercase">Flux Activités</span>
      </router-link>
    </div>

    
    <div v-if="backupVisible" class="mb-1 px-4 flex items-center text-white cursor-pointer">
      <router-link
        to="/dashboard/backup"
        style="width: 100%"
        class="flex space-x-3 items-center px-2 py-2 z-10 relative text-white hover:font-bold transition ease-in-out duration-500 cursor-pointer"
      >
        <span class=" ">
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M19.35 10.04A7.49 7.49 0 0012 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 000 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path></svg>        </span>
        <span class="font-semibold text-xs uppercase">Sauvegarde  </span>
      </router-link>
    </div> 
    
     <div v-if="roleVisible" class="mb-1 px-4 flex items-center text-white cursor-pointer">
      <router-link
        to="/dashboard/roles"
        style="width: 100%"
        class="flex space-x-3 items-center px-2 py-2 z-10 relative text-white hover:font-bold transition ease-in-out duration-500 cursor-pointer"
      >
        <span class=" ">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            height="1.3em"
            width="1.3em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"
            ></path>
          </svg>
        </span>
        <span class="font-semibold text-xs uppercase">Role et permissions</span>
      </router-link>
    </div>

    <div v-if="utilisateurVisible " class="mb-1 px-4 flex items-center text-white cursor-pointer">
      <router-link
        to="/dashboard/utilisateurs"
        style="width: 100%"
        class="flex space-x-3 items-center px-2 py-2 z-10 relative text-white hover:font-bold transition ease-in-out duration-500 cursor-pointer"
      >
        <span class=" ">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            height="1.3em"
            width="1.3em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path
              d="M20 9V6h-2v3h-3v2h3v3h2v-3h3V9h-3zM9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm6.39 8.56C13.71 13.7 11.53 13 9 13s-4.71.7-6.39 1.56A2.97 2.97 0 001 17.22V20h16v-2.78c0-1.12-.61-2.15-1.61-2.66zM15 18H3v-.78c0-.38.2-.72.52-.88C4.71 15.73 6.63 15 9 15c2.37 0 4.29.73 5.48 1.34.32.16.52.5.52.88V18z"
            ></path>
          </svg>
        </span>
        <span class="font-semibold text-xs uppercase">Utilisateur</span>
      </router-link>
    </div>

    <div v-if=" currentRole ==='unitee-de-gestion' " class="px-6 mb-10 relative">
      <input
        class="w-full absolute z-10 cursor-pointer opacity-0 h-5 top-0"
        type="checkbox"
        id="chck2"
      />
      <header
        class="flex justify-between mb-3 items-center cursor-pointer select-none tab-label"
        for="chck2"
      >
        <div class="flex space-x-3">
          <span class="text-white">
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="1.3em"
              width="1.3em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path
                d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"
              ></path>
            </svg>
          </span>
          <p class="text-white text-xs font-semibold uppercase">Config</p>
        </div>
        <!-- <div class="rounded-full border border-gray h-6 w-6 flex items-center justify-center test">
          <svg aria-hidden="true" class="" data-reactid="266" fill="none" height="24" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div> -->
        <i class="bx bx-chevron-down bx-sm text-white"></i>
      </header>
      <div class="tab-content bg-white mb-16">
        <!-- <div class="mb-1 flex items-center text-gray-700  cursor-pointer my-1 ">
          <router-link to="/dashboard/config" style="width:100%" class="flex items-center  px-2 py-2 z-10 relative space-x-4  hover:font-bold  transition ease-in-out duration-500  cursor-pointer">
            <span class="font-semibold text-xs">Pays</span>
          </router-link>
        </div>

        <div class="mb-1  flex items-center text-gray-700  cursor-pointer  ">
          <router-link to="/dashboard/config/departements" style="width:100%" class="flex items-center  px-2 py-2 z-10 relative space-x-4 text-gray-700 hover:font-bold  transition ease-in-out duration-500  cursor-pointer">
            <span class="font-semibold text-xs">Sites</span>
          </router-link>
        </div>

         -->
        <div v-if="uniteDeMesureVisible" class="mb-1 flex items-center text-gray-700 cursor-pointer">
          <router-link
            to="/dashboard/config/unites"
            style="width: 100%"
            class="flex items-center px-2 py-2 z-10 relative space-x-4 text-gray-700 hover:font-bold transition ease-in-out duration-500 cursor-pointer"
          >
            <span class="font-semibold text-xs">Unité de mesures</span>
          </router-link>
        </div>

        <div v-if="categorieVisible" class="mb-1 flex items-center mt-2 text-gray-700 cursor-pointer">
          <router-link
            to="/dashboard/config/categories"
            style="width: 100%"
            class="flex items-center px-2 py-2 z-10 relative space-x-4 hover:font-bold transition ease-in-out duration-500 cursor-pointer"
          >
            <span class="font-semibold text-xs">Catégories</span>
          </router-link>
        </div>

        <div  class="mb-1 flex items-center mt-2 text-gray-700 cursor-pointer">
          <router-link
            to="/dashboard/config/main_oeuvre"
            style="width: 100%"
            class="flex items-center px-2 py-2 z-10 relative space-x-4 hover:font-bold transition ease-in-out duration-500 cursor-pointer"
          >
            <span class="font-semibold text-xs">Main d'oeuvre</span>
          </router-link>
        </div>

       
         <div v-if="siteVisible" class="mb-1 flex items-center mt-2 text-gray-700 cursor-pointer">
          <router-link
            to="/dashboard/config/sites"

            style="width: 100%"
            class="flex items-center px-2 py-2 z-10 relative space-x-4 hover:font-bold transition ease-in-out duration-500 cursor-pointer"
          >
            <span class="font-semibold text-xs">Sites</span>
          </router-link>
        </div>
         <div class="mb-1 flex items-center mt-2 text-gray-700 cursor-pointer">
          <router-link
            to="/dashboard/config/backup"

            style="width: 100%"
            class="flex items-center px-2 py-2 z-10 relative space-x-4 hover:font-bold transition ease-in-out duration-500 cursor-pointer"
          >
            <span class="font-semibold text-xs">Frequence de sauvegarde</span>
          </router-link>
        </div>
        <div v-if="alertVisible" class="mb-1 flex items-center mt-2 text-gray-700 cursor-pointer">
          <router-link
            to="/dashboard/config/alert"

            style="width: 100%"
            class="flex items-center px-2 py-2 z-10 relative space-x-4 hover:font-bold transition ease-in-out duration-500 cursor-pointer"
          >
            <span class="font-semibold text-xs">Alert systeme</span>
          </router-link>
        </div>
        <div class="mb-10 flex items-center mt-2 text-gray-700 cursor-pointer">
          <router-link
            to="/dashboard/config/rappel"

            style="width: 100%"
            class="flex items-center px-2 py-2 z-10 relative space-x-4 hover:font-bold transition ease-in-out duration-500 cursor-pointer"
          >
            <span class="font-semibold text-xs">Rappel taches</span>
          </router-link>
        </div>
      </div>
      <!-- <div style="width:100%" class=" flex items-center relative z-50 mt-12 mb-16   px-2 py-2 text-white hover:font-bold  transition ease-in-out duration-500  cursor-pointer">
        <button @click="logout"  class="w-full bg-Primary text-white p-2 font-medium text-xs flex items-center space-x-3 ">
          <span class="">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M17 8l-1.41 1.41L17.17 11H9v2h8.17l-1.58 1.58L17 16l4-4-4-4zM5 5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h7v-2H5V5z"></path></svg>
          </span>
          <span class="font-semibold text-xs uppercase">Deconnexion</span>
        </button>
      </div> -->
    </div>
  </div>
</template>
<script>
import PermissionsService from "@/services/modules/permission.service.js";
import { mapState, mapGetters, mapActions } from 'vuex'
import forEach from 'ramda/src/forEach';
import uniteeDeGestions from '@/store/modules/uniteeDeGestions';
export default {
  name: "sidebar",
  computed: {
    ...mapState(['sideBarOpen']),
    ...mapGetters('auths', {currentUser : 'GET_AUTHENTICATE_USER'})
  },
  data() {
    return {
      currentRole:'',
      permissions: [],
      programmeVisible:false,
      uniteeDeGestionVisible:false,
      bailleursVsisible:false,
      roleVisible:false,
      anoVisible:false,
      projetVisible:false,
      composanteVisible:false,
      composanteReVisible:false,
      activiteVisible:false,
      activiteReVisible:false,
      tacheVisible:false,
      tacheReVisible:false,
      suiviTacheVisible:false,
      suiviTacheReVisible:false,
      indicateurVisible:false,
      indicateurModVisible:false,
      planDecaissementVisible:false,
      modVsisible:false,
      missionControleVisible:false,
      entrepriseExecutanteVisible:false,
      suiviFinancierVisible:false,
      checklistVisible:false,
      pointFinancierVisible:false,
      decaissementVisible:false,
      papVisible:false,
      utilisateurVisible:false,
      voirPtaVisible:false,
      voirPpmVisible:false,
      institutionVisible:false,
      dashboardProjetVisible:false,
      raccourcieElementVisible:false,
      statistiqueActiviteVisible:false,
      statistiqueActiviteReVisible:false,
      voirDecaissementVisible:false,
      suiviIndicateurVisible:false,
      suiviIndicateurModVisible:false,
      revisionVisible:false,
      listeEntrepriseModVisible:false,
      listeEntrepriseMoVisible:false,
      activiteEnvMoVisible:false,
      listeEntrepriseExecVisible:false,
      passationModVisible:false,
      passationMissionVisible:false,
      passationEntrepriseVisible:false,
      checklistModVisible:false,
      gouvernementVisible:false,
      activiteEnVisible:false,
      formulaireVisible:false,
      uniteDeMesureVisible:false,
      categorieVisible:false,
      siteVisible:false,
      alertVisible:false,
      historiqueVisible:false,
      backupVisible:false,
      maitriseOeuvreVisible:false,
    }
  },
  methods: {
    getPermission() {
       this.currentUser.role[0].permissions.forEach(element => {
            if(element.slug ==='voir-un-utilisateur') {
              this.utilisateurVisible = true
            }
            if(element.slug ==='voir-une-institution') {
              this.institutionVisible = true
            }
            if(element.slug ==='voir-un-ptab') {
              this.voirPtaVisible = true
            }
            if(element.slug ==='voir-un-ppm') {
              this.voirPpmVisible = true
            }
           
            if(element.slug ==='voir-un-decaissement') {
              this.decaissementVisible = true
            }
            if(element.slug ==='voir-un-pap') {
              this.papVisible = true
            }
            if(element.slug ==='voir-un-programme') {
              this.programmeVisible = true
            }
            if(element.slug ==='voir le point financier des activites') {
              this.programmeVisible = true
            }
            if(element.slug ==='voir-une-checklist') {
              this.checklistVisible = true
            }
            if(element.slug ==='voir-une-unitee-de-gestion') {
              this.uniteeDeGestionVisible = true
            }
            if(element.slug ==='voir-un-mod') {
              this.modVsisible = true
            }
            if(element.slug ==='voir-une-mission-de-controle') {
              this.missionControleVisible = true
            }
            if(element.slug ==='voir-une-entreprise-executante') {
              this.entrepriseExecutanteVisible = true
            }
            if(element.slug ==='voir-un-suivi-financier') {
              this.suiviFinancierVisible = true
            }
            if(element.slug ==='voir-un-bailleur') {
              this.bailleursVsisible = true
            }
            if(element.slug ==='voir-un-ano') {
              this.anoVisible = true
            }
            if(element.slug ==='voir-un-role') {
              this.roleVisible = true
            }
            if(element.slug ==='voir-un-projet') {
              this.projetVisible = true
            }
            if(element.slug ==='voir-une-composante') {
              this.composanteVisible = true
            }
            if(element.slug ==='voir-une-composante-revise') {
              this.composanteReVisible = true
            }
            if(element.slug ==='voir-une-activite') {
              this.activiteVisible = true
            }
            if(element.slug ==='voir-une-activite-revise') {
              this.activiteReVisible = true
            }
            if(element.slug ==='voir-une-tache') {
              this.tacheVisible = true
            }
            if(element.slug ==='voir-un-suivi-tache') {
              this.suiviTacheVisible = true
            }
            if(element.slug ==='voir-une-tache-revise') {
              this.tacheReVisible = true
            }
            if(element.slug ==='voir-un-suivi-tache-revise') {
              this.suiviTacheReVisible = true
            }
            if(element.slug ==='voir-un-indicateur') {
              this.indicateurVisible = true
            }
            if(element.slug ==='voir-un-indicateur-mod') {
              this.indicateurModVisible = true
            }

            if(element.slug ==='voir-un-suivi-indicateur') {
              this.suiviIndicateurVisible = true
            }
            if(element.slug ==='voir-un-suivi-indicateur-mod') {
              this.suiviIndicateurModVisible = true
            }
            
            if(element.slug ==='voir-un-plan-de-decaissement') {
              this.planDecaissementVisible = true
            }
            if(element.slug ==='voir-un-dashboard') {
              this.dashboardProjetVisible = true
            }
            if(element.slug ==='voir-raccourcir-composante-activite-tache') {
              this.raccourcieElementVisible = true
            }
            if(element.slug ==='voir-une-statistique') {
              this.statistiqueActiviteVisible = true
            }
            if(element.slug ==='voir-une-statistique-revise') {
              this.statistiqueActiviteReVisible = true
            }
            if(element.slug ==='voir-un-decaissement') {
              this.decaissementVisible = true
            }
            if(element.slug ==='voir-une-revision') {
              this.revisionVisible = true
            }
            if(element.slug ==='voir-un-point-financier') {
              this.pointFinancierVisible = true
            }
            if(element.slug ==='voir-une-liste-entreprise-mod') {
              this.listeEntrepriseModVisible = true
            }
            if(element.slug ==='voir-une-liste-entreprise-mission-de-controle') {
              this.listeEntrepriseMoVisible = true
            }
            if(element.slug ==='voir-activite-environnementale-mission-de-controle') {
              this.activiteEnvMoVisible= true
            }
            if(element.slug ==='voir-activite-environnementale-mission-de-controle') {
              this.activiteEnvMoVisible= true
            }
            if(element.slug ==='voir-une-liste-entreprise-entreprise-exec') {
              this.listeEntrepriseExecVisible = true
            }
            if(element.slug ==='voir-passation-mission-de-controle') {
              this.passationMissionVisible = true
            }
            if(element.slug ==='voir-passation-entreprise-executante') {
              this.passationEntrepriseVisible = true
            }
            if(element.slug ==='voir-passation-mod') {
              this.passationModVisible = true
            }
            if(element.slug ==='voir-une-checklist-mod') {
              this.checklistModVisible = true
            }
            if(element.slug ==='voir-un-gouvernement') {
              this.gouvernementVisible = true
            }
            if(element.slug === 'voir-une-activite-environnementale') {
              this.activiteEnVisible = true
            }
            if(element.slug ==='voir-un-formulaire') {
              this.formulaireVisible = true
            }
            if(element.slug ==='voir-une-configuration-alerte') {
              this.alertVisible = true
            }
            if(element.slug ==='voir-un-site') {
              this.siteVisible = true
            }
            if(element.slug ==='voir-une-categorie') {
              this.categorieVisible = true
            }
            if(element.slug ==='voir-une-unite-de-mesure') {
              this.uniteeDeGestionVisible = true
            }
            if(element.slug ==='voir-un-historique') {
              this.historiqueVisible = true
            }
            if(element.slug ==='faire-un-backup') {
              this.backupVisible = true
            }
            if(element.slug === 'voir-une-maitrise-oeuvre') {
              this.maitriseOeuvreVisible = true
            }
           

          });

    },

  },
  mounted() {
    this.getPermission()
     if(this.currentUser != undefined) {
        this.currentRole = this.currentUser.type
        console.log("role courant",this.currentUser)
     }
  }
};
</script>

<style scoped>
.router-link-exact-active {
  color: #fff;
  font-weight: bold;
  padding: 10px 18px;
  background-color: #00acee;
}
.scrollbar-w-2::-webkit-scrollbar {
  width: 0.8rem;
  height: 0.8rem;
}

.scrollbar-track-blue-lighter::-webkit-scrollbar-track {
  background-color: #ccc;
}

.scrollbar-thumb-blue::-webkit-scrollbar-thumb {
  --bg-opacity: 1;
  background-color: #2d3748;
  background-color: rgba(45, 55, 72, var(--bg-opacity));
}

.scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
  border-radius: 0rem;
}
.tab {
  overflow: hidden;
}
.tab-content {
  max-height: 0vh;
  display: none;
}
input:checked + .tab-label .test {
  background-color: rgb(255, 255, 255);
}
input:checked + .tab-label .test svg {
  transform: rotate(180deg);
  stroke: #000;
}
input:checked + .tab-label::after {
  transform: rotate(90deg);
}
input:checked ~ .tab-content {
  max-height: 100vh;
  display: block;
  transition: all 0.5s;
}
.bx.bx-chevron-down {
  font-weight: 700;
}
</style>
