<template>
  <div>

     <div v-if="openFiltre">
       <vmodal title="filtre"  v-on:close="openFiltre = false">
        <div  style="width:60vw !important">
          <form @submit.prevent="getPtaFiltre"  class="p-4">
            <div class="form-group">
              <label for="bailleur"  class="block my-2 font-semibold">Selectionnez un bailleur</label>
              <multiselect v-model="bailleur"  :options="bailleurs" :custom-label="customLabel" :preselect-first="true" placeholder="selectionnez un bailleur" label="nom" track-by="id"></multiselect>
            </div> 

            <div class="form-group">
              <label for="bailleur" class="block my-2 font-semibold">Année</label>
              <input v-model="annee" required type="number" min="2000" max="2100" class="px-4 py-2 border w-full border-gray-300" >
            </div>

            <div class="my-3">
              <button   class="bg-blue-500 px-4 py-2 shadow text-white border text-sm uppercase border-blue-500">
                <span class="text-sm font-semibold uppercase" v-if="!loading">
                  filtrer
                  </span>
                  <span v-else class="flex justify-center items-center space-x-2">
                    <span class=" px-4 font-semibold ">
                      chargement ...
                    </span>
                    <svg  xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-center animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </span>
               </button>
            </div>

          </form>
        </div>
      </vmodal>
    </div>
    
      
     <div class="my-3 px-3 py-1 justify-end flex space-x-4">
       <button v-if="filtrePpm" @click="openFiltre = !openFiltre"  title="filtrer les données"   class="py-2 px-4 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24m0 24H0"></path><path d="M4.25 5.61C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39A.998.998 0 0018.95 4H5.04c-.83 0-1.3.95-.79 1.61z"></path><path fill="none" d="M0 0h24v24H0V0z"></path></svg>
        <span class="mx-2 text-sm font-semibold">Filtre</span>
      </button>
       <button v-if="exporterSuiviPpm" @click="generateReport" title="filtrer les données"   class="py-2 px-4 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">
        <span class="mx-2 text-sm font-semibold">generer pdf </span>
      </button>
     </div>

    <div class="relative">
      <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="true"
        :paginate-elements-by-height="1400"
        :filename="title_pdf"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a3"
        pdf-orientation="landscape"
        pdf-content-width="100vw"
        @progress="onProgress($event)"
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
        ref="html2Pdf"
    >
        <section slot="pdf-content">
          <div class=" relative shadow-md sm:rounded-lg">
            <table class=" text-left text-gray-500 dark:text-gray-400">
            
                <thead class="text-small text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  
                  <tr class="">
                    <th scope="col" rowspan="2" class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700  ">
                        Bailleurs
                    </th>
                    <th scope="col" rowspan="2" class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700 ">
                      Code PTA
                    </th>
                    <th scope="col" rowspan="3" class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700 ">
                      programme
                    </th>
                    <th scope="col"  colspan="3"  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700 text-center ">
                      Montant projet
                    </th>
                    <th scope="col" colspan="3" class="p-1 text-small text-center border dark:bg-gray-800 dark:border-gray-700 ">
                    Montant  budgetisé
                    </th>  
                    <th scope="col" rowspan="2" class="p-1 text-small text-center border dark:bg-gray-800 dark:border-gray-700 ">
                    Poids
                    </th> 
                    <th scope="col" rowspan="2" class="p-1 text-small text-center border dark:bg-gray-800 dark:border-gray-700 ">
                    STRUCTURE ASSOCIER
                    </th> 
                      <th scope="col" rowspan="2" class="p-1 text-small text-center border dark:bg-gray-800 dark:border-gray-700 ">
                    STRUCTURE RESPONSABLE
                    </th> 
                    <th scope="col" colspan="12" class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700 text-center ">
                      PLANING
                    </th>
                    <th scope="col" colspan="3" class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700 text-center ">
                      TRIM 1
                    </th>

                    <th scope="col" colspan="3" class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700 text-center ">
                      TRIM 2
                    </th> 

                    <th scope="col" colspan="3" class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700 text-center ">
                      TRIM 3
                    </th> 

                    <th scope="col" colspan="3" class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700 text-center ">
                      TRIM 4
                    </th> 

                  
                  
                  </tr>

                  <tr class="">
                    
                    <th scope="col"  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700 text-center ">
                      BN
                    </th>
                    <th scope="col"  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700 text-center ">
                      EMP 
                    </th>
                    <th scope="col"  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700 text-center ">
                      TOTAL 
                    </th>
                    <th scope="col"  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700 text-center ">
                      BN
                    </th>
                    <th scope="col"  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700 text-center ">
                      EMP 
                    </th>
                    <th scope="col"  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700 text-center ">
                      TOTAL 
                    </th>
                    <th scope="col"  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700 text-center ">
                      JAV
                    </th>
                    <th scope="col"  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700 text-center ">
                      FEV
                    </th>
                    <th scope="col"  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700 text-center ">
                      MARS
                    </th>
                    <th scope="col"  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700 text-center ">
                      AVRIL
                    </th>
                    <th scope="col"  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700 text-center ">
                      MAI
                    </th>
                    <th scope="col"  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700 text-center ">
                      JUIN
                    </th>
                    <th scope="col"  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700 text-center ">
                      JUIl
                    </th>
                    <th scope="col"  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700 text-center ">
                      AOUT
                    </th>
                    <th scope="col"  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700 text-center ">
                      SEPT
                    </th>
                    <th scope="col"  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700 text-center ">
                      OCT
                    </th>
                    <th scope="col"  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700 text-center ">
                      NOV
                    </th>
                    <th scope="col"  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700 text-center ">
                      DECE
                    </th>
                    <th scope="col"  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700 text-center ">
                      BN
                    </th>
                    <th scope="col"  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700 text-center ">
                      EMP 
                    </th>
                    <th scope="col"  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700 text-center ">
                      TOTAL 
                    </th>
                    <th scope="col"  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700 text-center ">
                      BN 
                    </th>
                    <th scope="col"  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700 text-center ">
                      EMP
                    </th>
                    <th scope="col"  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700 text-center ">
                      TOTAL 
                    </th>
                    <th scope="col"  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700 text-center ">
                      BN 
                    </th>
                    <th scope="col"  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700 text-center ">
                      EMP 
                    </th>
                    <th scope="col"  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700 text-center ">
                      TOTAL 
                    </th>
                    <th scope="col"  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700 text-center ">
                      BN 
                    </th>
                    <th scope="col"  class="p-1 text-small  border dark:bg-gray-800 dark:border-gray-700 text-center ">
                      EMP 
                    </th>
                    <th scope="col"  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700 text-center ">
                      TOTAL 
                    </th>
                  
                  
                  </tr>

                </thead>
                <tbody>
                    <tr v-for="pta in dataNew" :key="pta.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="text-small p-1 font-medium text-gray-900  dark:text-white">
                        {{pta.bailleur}}
                        </th>
                        <td class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700">
                          <span v-if="pta.isProjet" class="font-bold "> {{pta.code}}</span>
                          <span v-if="pta.isComposante" class="text-blue-500 "> {{pta.code}}</span>
                          <span v-if="pta.isSC" class=" text-yellow-600 "> {{pta.code}}</span>
                          <span v-if="pta.isActivite" class="text-green-600 "> {{pta.code}}</span>
                          <span v-if="pta.isTache" class="text-red-600 "> {{pta.code}}</span>
                        </td>
                        <td  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700">
                          <span v-if="pta.isProjet" class="font-bold lowercase ">projet: {{pta.nom}}</span>
                          <span v-if="pta.isComposante" class="text-blue-500">composante: {{pta.nom}}</span>
                          <span v-if="pta.isSC" class=" text-yellow-600 ">sous composante: {{pta.nom}}</span>
                          <span v-if="pta.isActivite" class="text-green-600 ">activite: {{pta.nom}}</span>
                          <span v-if="pta.isTache" class="text-red-600 ">tache: {{pta.nom}}</span>
                          
                        </td>
                        <td  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700">
                        <span v-if="pta.bn != undefined" class="font-bold" >  {{pta.bn}}  </span>
                        <!--  <span v-else class="font-bold" >0 FCFA</span> -->
                        </td>
                        <td  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700">
                          <span v-if="pta.pret != undefined" class="font-bold" > {{pta.pret}}  </span>
                        <!--  <span v-else class="font-bold" >0 FCFA </span> -->
                        </td>
                        <td  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700">
                          <span v-if="pta.pret != undefined && pta.bn != undefined" class="font-bold" > {{pta.pret + pta.bn}}  </span>
                        <!--  <span v-else class="font-bold" >0 FCFA </span> -->
                        </td>

                        <!-- total budgetaire-->
                        
                      

                        <td  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700">
                        <span v-if="pta.tBn != undefined" class="font-bold" >  {{pta.tBn}}  </span>
                        <!--  <span v-else class="font-bold" >0 FCFA</span> -->
                        </td>
                        <td  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700">
                          <span v-if="pta.tPret != undefined" class="font-bold" > {{pta.tPret}}  </span>
                        <!--  <span v-else class="font-bold" >0 FCFA </span> -->
                        </td>
                        <td  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700">
                          <span v-if="pta.total != undefined" class="font-bold" > {{pta.total}}  </span>
                        <!--  <span v-else class="font-bold" >0 FCFA </span> -->
                        </td>

                        <td  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700">
                        <span v-if="pta.poids != undefined" class="font-bold" >  {{pta.poids}}  </span>
                        <!--  <span v-else class="font-bold" >0 FCFA</span> -->
                        </td>
                        <td  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700">
                        <span v-if="pta.structureAssocie != undefined" class="font-bold" >  {{pta.structureAssocie}}  </span>
                        <!--  <span v-else class="font-bold" >0 FCFA</span> -->
                        </td>
                        <td  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700">
                        <span v-if="pta.structureResponsable!= undefined" class="font-bold" >  {{pta.structureResponsable}}  </span>
                        <!--  <span v-else class="font-bold" >0 FCFA</span> -->
                        </td>
                        
                        <!--  Planing-->

                        <td  class="p-1 text-small border dark:bg-gray-800 relative dark:border-gray-700">
                          <p v-if="pta.planing != undefined &&  pta.planing.janvier!='' " class="font-bold block w-full   bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500  "  > 2  </p>
                          <!--  <span v-else class="font-bold block w-full  bg-red-500 text-red-500 " >0 FCFA</span> -->
                        </td>
                        <td  class="p-1 text-small border relative dark:bg-gray-800 dark:border-gray-700">
                          <p v-if="pta.planing != undefined &&  pta.planing.fevrier!='' " class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 " >  {{pta.planing.fevrier}}  </p>
                          <!--  <span v-else class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 " >0 FCFA</span> -->
                        </td>
                        <td  class="p-1 text-small border relative dark:bg-gray-800 dark:border-gray-700">
                          <p v-if="pta.planing != undefined &&  pta.planing.mars!='' " class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 " >  {{pta.planing.mars}}  </p>
                          <!--  <span v-else class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 " >0 FCFA</span> -->
                        </td>
                        <td  class="p-1 text-small border relative dark:bg-gray-800 dark:border-gray-700">
                          <p v-if="pta.planing != undefined &&  pta.planing.avril!='' " class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 " >  {{pta.planing.avril}}  </p>
                          <!--  <span v-else class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 " >0 FCFA</span> -->
                        </td>
                        <td  class="p-1 text-small border relative dark:bg-gray-800 dark:border-gray-700">
                          <p v-if="pta.planing != undefined &&  pta.planing.mai!='' " class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 " >  {{pta.planing.mai}}  </p>
                          <!--  <span v-else class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 " >0 FCFA</span> -->
                        </td>
                        <td  class="p-1 text-small border relative dark:bg-gray-800 dark:border-gray-700">
                          <p v-if="pta.planing != undefined &&  pta.planing.juin!='' " class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 " >  {{pta.planing.juin}}  </p>
                          <!--  <span v-else class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 " >0 FCFA</span> -->
                        </td>
                        <td  class="p-1 text-small border relative dark:bg-gray-800 dark:border-gray-700">
                          <p v-if="pta.planing != undefined &&  pta.planing.juillet!='' " class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 " >  {{pta.planing.juillet}}  </p>
                          <!--  <span v-else class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 " >0 FCFA</span> -->
                        </td>
                        <td  class="p-1 text-small border relative dark:bg-gray-800 dark:border-gray-700">
                          <p v-if="pta.planing != undefined &&  pta.planing.aout!='' " class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 " >  {{pta.planing.aout}}  </p>
                          <!--  <span v-else class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 " >0 FCFA</span> -->
                        </td>
                        <td  class="p-1 text-small border relative dark:bg-gray-800 dark:border-gray-700">
                          <p v-if="pta.planing != undefined &&  pta.planing.septembre!='' " class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 " >  {{pta.planing.septembre}}  </p>
                          <!--  <span v-else class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 " >0 FCFA</span> -->
                        </td>
                        <td  class="p-1 text-small border relative dark:bg-gray-800 dark:border-gray-700">
                          <p v-if="pta.planing != undefined &&  pta.planing.octobre!='' " class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 " >  {{pta.planing.octobre}}  </p>
                          <!--  <span v-else class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 " >0 FCFA</span> -->
                        </td>
                        <td  class="p-1 text-small border relative dark:bg-gray-800 dark:border-gray-700">
                          <p v-if="pta.planing != undefined &&  pta.planing.novembre!='' " class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 " >  {{pta.planing.novembre}}  </p>
                          <!--  <span v-else class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 " >0 FCFA</span> -->
                        </td>
                        <td  class="p-1 text-small border relative dark:bg-gray-800 dark:border-gray-700">
                          <p v-if="pta.planing != undefined &&  pta.planing.decembre!='' " class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 " >  {{pta.planing.decembre}}  </p>
                          <!--  <span v-else class="font-bold" >0 FCFA</span> -->
                        </td>




                      

                        <!--  planing -->

                        <td  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700">
                        <span v-if="pta.t1Bn != undefined" class="font-bold" >  {{pta.t1Bn}}  </span>
                        <!--  <span v-else class="font-bold" >0 FCFA</span> -->
                        </td>

                        <!--  planing -->
                        <td  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700">
                          <span v-if="pta.t1Pret != undefined" class="font-bold" > {{pta.t1Pret}}  </span>
                        <!--  <span v-else class="font-bold" >0 FCFA </span> -->
                        </td>

                        <td  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700">
                          <span v-if="pta.t1Pret != undefined && pta.t1Bn != undefined" class="font-bold" > {{pta.t1Pret + pta.t1Bn}}  </span>
                        <!--  <span v-else class="font-bold" >0 FCFA </span> -->
                        </td>
                      
                        <td  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700">
                        <span v-if="pta.t2Bn != undefined" class="font-bold" >  {{pta.t2Bn}}  </span>
                        <!--  <span v-else class="font-bold" >0 FCFA</span> -->
                        </td>
                        <td  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700">
                          <span v-if="pta.t2Pret != undefined" class="font-bold" > {{pta.t2Pret}}  </span>
                        <!--  <span v-else class="font-bold" >0 FCFA </span> -->
                        </td>

                        <td  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700">
                          <span v-if="pta.t2Pret != undefined && pta.t2Bn != undefined" class="font-bold" > {{pta.t2Pret + pta.t2Bn}}  </span>
                        <!--  <span v-else class="font-bold" >0 FCFA </span> -->
                        </td>
                        
                        <td  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700">
                        <span v-if="pta.t3Bn != undefined" class="font-bold" >  {{pta.t3Bn}}  </span>
                        <!--  <span v-else class="font-bold" >0 FCFA</span> -->
                        </td>
                        <td  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700">
                          <span v-if="pta.t3Pret != undefined" class="font-bold" > {{pta.t3Pret}}  </span>
                        <!--  <span v-else class="font-bold" >0 FCFA </span> -->
                        </td>
                          <td  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700">
                          <span v-if="pta.t3Pret != undefined && pta.t3Bn != undefined" class="font-bold" > {{pta.t3Pret + pta.t3Bn}}  </span>
                        <!--  <span v-else class="font-bold" >0 FCFA </span> -->
                        </td>
                        <td  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700">
                        <span v-if="pta.t4Bn != undefined" class="font-bold" >  {{pta.t4Bn}}  </span>
                        <!--  <span v-else class="font-bold" >0 FCFA</span> -->
                        </td>
                        <td  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700">
                          <span v-if="pta.t4Pret != undefined" class="font-bold" > {{pta.t4Pret}}  </span>
                        <!--  <span v-else class="font-bold" >0 FCFA </span> -->
                        </td>
                        <td  class="p-1 text-small border dark:bg-gray-800 dark:border-gray-700">
                          <span v-if="pta.t4Pret != undefined && pta.t4Bn != undefined" class="font-bold" > {{pta.t4Pret + pta.t4Bn}}  </span>
                        <!--  <span v-else class="font-bold" >0 FCFA </span> -->
                        </td>
                        
                    </tr>
                    
                </tbody>
            </table>
          </div>
        </section>
    </vue-html2pdf>
    </div>

    <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              
              <tr class="">
                <th scope="col" rowspan="2" class="py-3 px-6 border dark:bg-gray-800 dark:border-gray-700  whitespace-nowrap">
                    Bailleurs
                </th>
                <th scope="col" rowspan="2" class="py-3 px-6 border dark:bg-gray-800 dark:border-gray-700 whitespace-nowrap">
                  Code PTA
                </th>
                <th scope="col" rowspan="3" class="py-3 px-6 border dark:bg-gray-800 dark:border-gray-700 whitespace-nowrap">
                  Composantes / Sous-composantes / activiés / Taches
                </th>
                <th scope="col"  colspan="3"  class="py-3 px-6 border dark:bg-gray-800 dark:border-gray-700 text-center whitespace-nowrap">
                  Montant projet
                </th>
                 <th scope="col" colspan="3" class="py-3 px-6 text-center border dark:bg-gray-800 dark:border-gray-700 whitespace-nowrap">
                 Montant  budgetisé
                </th>  
                 <th scope="col" rowspan="2" class="py-3 px-6 text-center border dark:bg-gray-800 dark:border-gray-700 whitespace-nowrap">
                 Poids
                </th> 
                <th scope="col" rowspan="2" class="py-3 px-6 text-center border dark:bg-gray-800 dark:border-gray-700 whitespace-nowrap">
                 STRUCTURE ASSOCIER
                </th> 
                  <th scope="col" rowspan="2" class="py-3 px-6 text-center border dark:bg-gray-800 dark:border-gray-700 whitespace-nowrap">
                 STRUCTURE RESPONSABLE
                </th> 
                 <th scope="col" colspan="12" class="py-3 px-6 border dark:bg-gray-800 dark:border-gray-700 text-center whitespace-nowrap">
                  PLANING
                </th>
                <th scope="col" colspan="3" class="py-3 px-6 border dark:bg-gray-800 dark:border-gray-700 text-center whitespace-nowrap">
                  TRIMESTRE 1
                </th>

                <th scope="col" colspan="3" class="py-3 px-6 border dark:bg-gray-800 dark:border-gray-700 text-center whitespace-nowrap">
                  TRIMESTRE 2
                </th> 

                <th scope="col" colspan="3" class="py-3 px-6 border dark:bg-gray-800 dark:border-gray-700 text-center whitespace-nowrap">
                  TRIMESTRE 3
                </th> 

                <th scope="col" colspan="3" class="py-3 px-6 border dark:bg-gray-800 dark:border-gray-700 text-center whitespace-nowrap">
                  TRIMESTRE 4
                </th> 

               
               
              </tr>

              <tr class="">
                
                <th scope="col"  class="py-3 px-6 border dark:bg-gray-800 dark:border-gray-700 text-center whitespace-nowrap">
                   BN
                </th>
                <th scope="col"  class="py-3 px-6 border dark:bg-gray-800 dark:border-gray-700 text-center whitespace-nowrap">
                  EMP 
                </th>
                <th scope="col"  class="py-3 px-6 border dark:bg-gray-800 dark:border-gray-700 text-center whitespace-nowrap">
                  TOTAL 
                </th>
                <th scope="col"  class="py-3 px-6 border dark:bg-gray-800 dark:border-gray-700 text-center whitespace-nowrap">
                   BN
                </th>
                <th scope="col"  class="py-3 px-6 border dark:bg-gray-800 dark:border-gray-700 text-center whitespace-nowrap">
                  EMP 
                </th>
                <th scope="col"  class="py-3 px-6 border dark:bg-gray-800 dark:border-gray-700 text-center whitespace-nowrap">
                  TOTAL 
                </th>
                 <th scope="col"  class="py-3 px-6 border dark:bg-gray-800 dark:border-gray-700 text-center whitespace-nowrap">
                   JAV
                </th>
                 <th scope="col"  class="py-3 px-6 border dark:bg-gray-800 dark:border-gray-700 text-center whitespace-nowrap">
                   FEV
                </th>
                 <th scope="col"  class="py-3 px-6 border dark:bg-gray-800 dark:border-gray-700 text-center whitespace-nowrap">
                   MARS
                </th>
                 <th scope="col"  class="py-3 px-6 border dark:bg-gray-800 dark:border-gray-700 text-center whitespace-nowrap">
                   AVRIL
                </th>
                <th scope="col"  class="py-3 px-6 border dark:bg-gray-800 dark:border-gray-700 text-center whitespace-nowrap">
                   MAI
                </th>
                 <th scope="col"  class="py-3 px-6 border dark:bg-gray-800 dark:border-gray-700 text-center whitespace-nowrap">
                   JUIN
                </th>
                 <th scope="col"  class="py-3 px-6 border dark:bg-gray-800 dark:border-gray-700 text-center whitespace-nowrap">
                   JUILLET
                </th>
                <th scope="col"  class="py-3 px-6 border dark:bg-gray-800 dark:border-gray-700 text-center whitespace-nowrap">
                  AOUT
                </th>
                 <th scope="col"  class="py-3 px-6 border dark:bg-gray-800 dark:border-gray-700 text-center whitespace-nowrap">
                   SEPTEMBRE
                </th>
                 <th scope="col"  class="py-3 px-6 border dark:bg-gray-800 dark:border-gray-700 text-center whitespace-nowrap">
                   OCTOBRE
                </th>
                 <th scope="col"  class="py-3 px-6 border dark:bg-gray-800 dark:border-gray-700 text-center whitespace-nowrap">
                   NOVEMBRE
                </th>
                 <th scope="col"  class="py-3 px-6 border dark:bg-gray-800 dark:border-gray-700 text-center whitespace-nowrap">
                   DECEMBRE
                </th>
                <th scope="col"  class="py-3 px-6 border dark:bg-gray-800 dark:border-gray-700 text-center whitespace-nowrap">
                  BN
                </th>
                <th scope="col"  class="py-3 px-6 border dark:bg-gray-800 dark:border-gray-700 text-center whitespace-nowrap">
                  EMP 
                </th>
                 <th scope="col"  class="py-3 px-6 border dark:bg-gray-800 dark:border-gray-700 text-center whitespace-nowrap">
                  TOTAL 
                </th>
                <th scope="col"  class="py-3 px-6 border dark:bg-gray-800 dark:border-gray-700 text-center whitespace-nowrap">
                  BN 
                </th>
                <th scope="col"  class="py-3 px-6 border dark:bg-gray-800 dark:border-gray-700 text-center whitespace-nowrap">
                   EMP
                </th>
                <th scope="col"  class="py-3 px-6 border dark:bg-gray-800 dark:border-gray-700 text-center whitespace-nowrap">
                  TOTAL 
                </th>
                <th scope="col"  class="py-3 px-6 border dark:bg-gray-800 dark:border-gray-700 text-center whitespace-nowrap">
                   BN 
                </th>
                <th scope="col"  class="py-3 px-6 border dark:bg-gray-800 dark:border-gray-700 text-center whitespace-nowrap">
                  EMP 
                </th>
                 <th scope="col"  class="py-3 px-6 border dark:bg-gray-800 dark:border-gray-700 text-center whitespace-nowrap">
                  TOTAL 
                </th>
                <th scope="col"  class="py-3 px-6 border dark:bg-gray-800 dark:border-gray-700 text-center whitespace-nowrap">
                  BN 
                </th>
                <th scope="col"  class="py-3 px-6  border dark:bg-gray-800 dark:border-gray-700 text-center whitespace-nowrap">
                  EMP 
                </th>
                 <th scope="col"  class="py-3 px-6 border dark:bg-gray-800 dark:border-gray-700 text-center whitespace-nowrap">
                  TOTAL 
                </th>
               
               
              </tr>

            </thead>
            <tbody>
                <tr v-for="pta in dataNew" :key="pta.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                     {{pta.bailleur}}
                    </th>
                    <td class="py-4 px-6 whitespace-nowrap border dark:bg-gray-800 dark:border-gray-700">
                      <span v-if="pta.isProjet" class="font-bold text-lg"> {{pta.code}}</span>
                      <span v-if="pta.isComposante" class="text-blue-500 text-sm"> {{pta.code}}</span>
                      <span v-if="pta.isSC" class=" text-yellow-600 text-sm"> {{pta.code}}</span>
                      <span v-if="pta.isActivite" class="text-green-600 text-sm"> {{pta.code}}</span>
                      <span v-if="pta.isTache" class="text-red-600 text-sm"> {{pta.code}}</span>
                    </td>
                    <td  class="py-4 px-6 whitespace-nowrap border dark:bg-gray-800 dark:border-gray-700">
                      <span v-if="pta.isProjet" class="font-bold text-lg">projet: {{pta.nom}}</span>
                      <span v-if="pta.isComposante" class="text-blue-500 text-sm">composante: {{pta.nom}}</span>
                      <span v-if="pta.isSC" class=" text-yellow-600 text-sm">sous composante: {{pta.nom}}</span>
                      <span v-if="pta.isActivite" class="text-green-600 text-sm">activite: {{pta.nom}}</span>
                      <span v-if="pta.isTache" class="text-red-600 text-sm">tache: {{pta.nom}}</span>
                       
                    </td>
                    <td  class="py-4 px-6 whitespace-nowrap border dark:bg-gray-800 dark:border-gray-700">
                     <span v-if="pta.bn != undefined" class="font-bold" >  {{pta.bn}}  </span>
                    <!--  <span v-else class="font-bold" >0 FCFA</span> -->
                    </td>
                    <td  class="py-4 px-6 whitespace-nowrap border dark:bg-gray-800 dark:border-gray-700">
                      <span v-if="pta.pret != undefined" class="font-bold" > {{pta.pret}}  </span>
                     <!--  <span v-else class="font-bold" >0 FCFA </span> -->
                    </td>
                    <td  class="py-4 px-6 whitespace-nowrap border dark:bg-gray-800 dark:border-gray-700">
                      <span v-if="pta.pret != undefined && pta.bn != undefined" class="font-bold" > {{pta.pret + pta.bn}}  </span>
                     <!--  <span v-else class="font-bold" >0 FCFA </span> -->
                    </td>

                     <!-- total budgetaire-->
                    
                   

                    <td  class="py-4 px-6 whitespace-nowrap border dark:bg-gray-800 dark:border-gray-700">
                     <span v-if="pta.tBn != undefined" class="font-bold" >  {{pta.tBn}}  </span>
                    <!--  <span v-else class="font-bold" >0 FCFA</span> -->
                    </td>
                    <td  class="py-4 px-6 whitespace-nowrap border dark:bg-gray-800 dark:border-gray-700">
                      <span v-if="pta.tPret != undefined" class="font-bold" > {{pta.tPret}}  </span>
                     <!--  <span v-else class="font-bold" >0 FCFA </span> -->
                    </td>
                    <td  class="py-4 px-6 whitespace-nowrap border dark:bg-gray-800 dark:border-gray-700">
                      <span v-if="pta.total != undefined" class="font-bold" > {{pta.total}}  </span>
                     <!--  <span v-else class="font-bold" >0 FCFA </span> -->
                    </td>

                     <td  class="py-4 px-6 whitespace-nowrap border dark:bg-gray-800 dark:border-gray-700">
                     <span v-if="pta.poids != undefined" class="font-bold" >  {{pta.poids}}  </span>
                    <!--  <span v-else class="font-bold" >0 FCFA</span> -->
                    </td>
                    <td  class="py-4 px-6 whitespace-nowrap border dark:bg-gray-800 dark:border-gray-700">
                     <span v-if="pta.structureAssocie != undefined" class="font-bold" >  {{pta.structureAssocie}}  </span>
                    <!--  <span v-else class="font-bold" >0 FCFA</span> -->
                    </td>
                    <td  class="py-4 px-6 whitespace-nowrap border dark:bg-gray-800 dark:border-gray-700">
                     <span v-if="pta.structureResponsable!= undefined" class="font-bold" >  {{pta.structureResponsable}}  </span>
                    <!--  <span v-else class="font-bold" >0 FCFA</span> -->
                    </td>
                    
                    <!--  Planing-->

                     <td  class="py-4 px-6 whitespace-nowrap border dark:bg-gray-800 relative dark:border-gray-700">
                      <p v-if="pta.planing != undefined &&  pta.planing.janvier!='' " class="font-bold block w-full   bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 px-4 py-2 "  > 2  </p>
                      <!--  <span v-else class="font-bold block w-full  bg-red-500 text-red-500 px-4 py-2" >0 FCFA</span> -->
                    </td>
                    <td  class="py-4 px-6 whitespace-nowrap border relative dark:bg-gray-800 dark:border-gray-700">
                      <p v-if="pta.planing != undefined &&  pta.planing.fevrier!='' " class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 px-4 py-2" >  {{pta.planing.fevrier}}  </p>
                      <!--  <span v-else class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 px-4 py-2" >0 FCFA</span> -->
                    </td>
                    <td  class="py-4 px-6 whitespace-nowrap border relative dark:bg-gray-800 dark:border-gray-700">
                      <p v-if="pta.planing != undefined &&  pta.planing.mars!='' " class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 px-4 py-2" >  {{pta.planing.mars}}  </p>
                      <!--  <span v-else class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 px-4 py-2" >0 FCFA</span> -->
                    </td>
                    <td  class="py-4 px-6 whitespace-nowrap border relative dark:bg-gray-800 dark:border-gray-700">
                      <p v-if="pta.planing != undefined &&  pta.planing.avril!='' " class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 px-4 py-2" >  {{pta.planing.avril}}  </p>
                      <!--  <span v-else class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 px-4 py-2" >0 FCFA</span> -->
                    </td>
                    <td  class="py-4 px-6 whitespace-nowrap border relative dark:bg-gray-800 dark:border-gray-700">
                      <p v-if="pta.planing != undefined &&  pta.planing.mai!='' " class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 px-4 py-2" >  {{pta.planing.mai}}  </p>
                      <!--  <span v-else class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 px-4 py-2" >0 FCFA</span> -->
                    </td>
                    <td  class="py-4 px-6 whitespace-nowrap border relative dark:bg-gray-800 dark:border-gray-700">
                      <p v-if="pta.planing != undefined &&  pta.planing.juin!='' " class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 px-4 py-2" >  {{pta.planing.juin}}  </p>
                      <!--  <span v-else class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 px-4 py-2" >0 FCFA</span> -->
                    </td>
                    <td  class="py-4 px-6 whitespace-nowrap border relative dark:bg-gray-800 dark:border-gray-700">
                      <p v-if="pta.planing != undefined &&  pta.planing.juillet!='' " class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 px-4 py-2" >  {{pta.planing.juillet}}  </p>
                      <!--  <span v-else class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 px-4 py-2" >0 FCFA</span> -->
                    </td>
                    <td  class="py-4 px-6 whitespace-nowrap border relative dark:bg-gray-800 dark:border-gray-700">
                      <p v-if="pta.planing != undefined &&  pta.planing.aout!='' " class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 px-4 py-2" >  {{pta.planing.aout}}  </p>
                      <!--  <span v-else class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 px-4 py-2" >0 FCFA</span> -->
                    </td>
                    <td  class="py-4 px-6 whitespace-nowrap border relative dark:bg-gray-800 dark:border-gray-700">
                      <p v-if="pta.planing != undefined &&  pta.planing.septembre!='' " class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 px-4 py-2" >  {{pta.planing.septembre}}  </p>
                      <!--  <span v-else class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 px-4 py-2" >0 FCFA</span> -->
                    </td>
                     <td  class="py-4 px-6 whitespace-nowrap border relative dark:bg-gray-800 dark:border-gray-700">
                      <p v-if="pta.planing != undefined &&  pta.planing.octobre!='' " class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 px-4 py-2" >  {{pta.planing.octobre}}  </p>
                      <!--  <span v-else class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 px-4 py-2" >0 FCFA</span> -->
                    </td>
                    <td  class="py-4 px-6 whitespace-nowrap border relative dark:bg-gray-800 dark:border-gray-700">
                      <p v-if="pta.planing != undefined &&  pta.planing.novembre!='' " class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 px-4 py-2" >  {{pta.planing.novembre}}  </p>
                      <!--  <span v-else class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 px-4 py-2" >0 FCFA</span> -->
                    </td>
                    <td  class="py-4 px-6 whitespace-nowrap border relative dark:bg-gray-800 dark:border-gray-700">
                      <p v-if="pta.planing != undefined &&  pta.planing.decembre!='' " class="font-bold block w-full  bg-red-500 absolute top-0 bottom-0 right-0 left-0 text-red-500 px-4 py-2" >  {{pta.planing.decembre}}  </p>
                      <!--  <span v-else class="font-bold" >0 FCFA</span> -->
                    </td>




                  

                    <!--  planing -->

                    <td  class="py-4 px-6 whitespace-nowrap border dark:bg-gray-800 dark:border-gray-700">
                     <span v-if="pta.t1Bn != undefined" class="font-bold" >  {{pta.t1Bn}}  </span>
                    <!--  <span v-else class="font-bold" >0 FCFA</span> -->
                    </td>

                     <!--  planing -->
                    <td  class="py-4 px-6 whitespace-nowrap border dark:bg-gray-800 dark:border-gray-700">
                      <span v-if="pta.t1Pret != undefined" class="font-bold" > {{pta.t1Pret}}  </span>
                     <!--  <span v-else class="font-bold" >0 FCFA </span> -->
                    </td>

                     <td  class="py-4 px-6 whitespace-nowrap border dark:bg-gray-800 dark:border-gray-700">
                      <span v-if="pta.t1Pret != undefined && pta.t1Bn != undefined" class="font-bold" > {{pta.t1Pret + pta.t1Bn}}  </span>
                     <!--  <span v-else class="font-bold" >0 FCFA </span> -->
                    </td>
                  
                    <td  class="py-4 px-6 whitespace-nowrap border dark:bg-gray-800 dark:border-gray-700">
                     <span v-if="pta.t2Bn != undefined" class="font-bold" >  {{pta.t2Bn}}  </span>
                    <!--  <span v-else class="font-bold" >0 FCFA</span> -->
                    </td>
                    <td  class="py-4 px-6 whitespace-nowrap border dark:bg-gray-800 dark:border-gray-700">
                      <span v-if="pta.t2Pret != undefined" class="font-bold" > {{pta.t2Pret}}  </span>
                     <!--  <span v-else class="font-bold" >0 FCFA </span> -->
                    </td>

                    <td  class="py-4 px-6 whitespace-nowrap border dark:bg-gray-800 dark:border-gray-700">
                      <span v-if="pta.t2Pret != undefined && pta.t2Bn != undefined" class="font-bold" > {{pta.t2Pret + pta.t2Bn}}  </span>
                     <!--  <span v-else class="font-bold" >0 FCFA </span> -->
                    </td>
                    
                    <td  class="py-4 px-6 whitespace-nowrap border dark:bg-gray-800 dark:border-gray-700">
                     <span v-if="pta.t3Bn != undefined" class="font-bold" >  {{pta.t3Bn}}  </span>
                    <!--  <span v-else class="font-bold" >0 FCFA</span> -->
                    </td>
                    <td  class="py-4 px-6 whitespace-nowrap border dark:bg-gray-800 dark:border-gray-700">
                      <span v-if="pta.t3Pret != undefined" class="font-bold" > {{pta.t3Pret}}  </span>
                     <!--  <span v-else class="font-bold" >0 FCFA </span> -->
                    </td>
                      <td  class="py-4 px-6 whitespace-nowrap border dark:bg-gray-800 dark:border-gray-700">
                      <span v-if="pta.t3Pret != undefined && pta.t3Bn != undefined" class="font-bold" > {{pta.t3Pret + pta.t3Bn}}  </span>
                     <!--  <span v-else class="font-bold" >0 FCFA </span> -->
                    </td>
                    <td  class="py-4 px-6 whitespace-nowrap border dark:bg-gray-800 dark:border-gray-700">
                     <span v-if="pta.t4Bn != undefined" class="font-bold" >  {{pta.t4Bn}}  </span>
                    <!--  <span v-else class="font-bold" >0 FCFA</span> -->
                    </td>
                    <td  class="py-4 px-6 whitespace-nowrap border dark:bg-gray-800 dark:border-gray-700">
                      <span v-if="pta.t4Pret != undefined" class="font-bold" > {{pta.t4Pret}}  </span>
                     <!--  <span v-else class="font-bold" >0 FCFA </span> -->
                    </td>
                    <td  class="py-4 px-6 whitespace-nowrap border dark:bg-gray-800 dark:border-gray-700">
                      <span v-if="pta.t4Pret != undefined && pta.t4Bn != undefined" class="font-bold" > {{pta.t4Pret + pta.t4Bn}}  </span>
                     <!--  <span v-else class="font-bold" >0 FCFA </span> -->
                    </td>
                    
                </tr>
                
            </tbody>
        </table>
    </div>

  </div>
</template>

<script>
 import Multiselect from 'vue-multiselect'
 import Vmodal from '@/components/Vmodal'
import PtabService from "@/services/modules/pta.service.js";
import BailleursService from "@/services/modules/bailleur.service.js";
import VueHtml2pdf from 'vue-html2pdf'
import { mapGetters, mapMutations, mapActions,mapState } from "vuex";
export default {

  components:{Multiselect,Vmodal,VueHtml2pdf},
  data() {
    return {
      ptab:[],
     
      openFiltre:false,
      annee:null,
      bailleur:'',
      bailleurs:[],
      revisionAdd:false,
      revisionVisible:false,
      ptaVisible:false,
      filtrePta:false,
      filtrePpm:false,
      filtreRePta:false,
      filtreRePpm:false,
      planDecaissementPtaVisible:false,
      ppmVisible:false,
      exporterSuiviPpm:false,
      exporterSuiviPta:false,
      exporterSuiviRePpm:false,
      exporterSuiviRePta:false,
    }
  },
  computed: {
   ...mapGetters('auths', {currentUser : 'GET_AUTHENTICATE_USER'}),
       ...mapState({
      loading : state => state.loading
    }),
    title_pdf() {
        if(this.annee ==null) {
        const year = new Date().getFullYear() 
          return "ppm -" + year
        }else {
          return "pmp -" + this.annee
        }
    },
    dataNew() {
      const  programme = []
      if (this.ptab != undefined && this.ptab !=null ) {
        this.ptab.forEach(element => {
          const bailleur = element.bailleur
          const bn = element.budgetNational
          const pret = element.pret
            
          programme.push({bailleur,nom:element.nom,code:element.code,isProjet:true,bn,pret})
          element.composantes.forEach(composante => {
            const bn = composante.budgetNational
            const pret = composante.pret
            let poids = composante.poids
            let t1Bn =0
            let t1Pret =0
            let t2Bn =0
            let t2Pret =0
            let t3Bn =0
            let t3Pret =0
            let t4Bn =0
            let t4Pret =0
            let tBn = 0
            let tPret = 0
            let total =0
            if( composante.trimestre1 != undefined) {
              t1Pret = composante.trimestre1.pret
              t1Bn = composante.trimestre1.budgetNational
            }
            if( composante.trimestre2 != undefined) {
              t2Pret = composante.trimestre2.pret
              t2Bn = composante.trimestre2.budgetNational
            }
            if( composante.trimestre3 != undefined) {
              t3Pret = composante.trimestre3.pret
              t3Bn = composante.trimestre3.budgetNational
            }
            if( composante.trimestre4 != undefined) {
              t4Pret = composante.trimestre4.pret
              t4Bn = composante.trimestre4.budgetNational
            }
            tBn = t1Bn +  t2Bn + t3Bn + t4Bn
            tPret = t1Pret +  t2Pret + t3Pret + t4Pret
            total = tBn = tPret    
           
            programme.push({bailleur,nom:composante.nom,code:composante.code,poids,isComposante:true,bn,pret,t1Pret,t1Bn,t2Pret,t2Bn,t3Pret,t3Bn,t4Bn,t4Pret,tBn,tPret,total})
            composante.sousComposantes.forEach(sousComposante => {
              const bn = sousComposante.budgetNational
              const pret = sousComposante.pret
              let poids = sousComposante.poids
              let t1Bn =0
              let t1Pret =0
              let t2Bn =0
              let t2Pret =0
              let t3Bn =0
              let t3Pret =0
              let t4Bn =0
              let t4Pret =0
              let tBn = 0
              let tPret = 0
              let total =0
              if( sousComposante.trimestre1 != undefined) {
                t1Pret = sousComposante.trimestre1.pret
                t1Bn = sousComposante.trimestre1.budgetNational
              }
              if( sousComposante.trimestre2 != undefined) {
                t2Pret = sousComposante.trimestre2.pret
                t2Bn = sousComposante.trimestre2.budgetNational
              }
              if( sousComposante.trimestre3 != undefined) {
                t3Pret = sousComposante.trimestre3.pret
                t3Bn = sousComposante.trimestre3.budgetNational
              }
              if( sousComposante.trimestre4 != undefined) {
                t4Pret = sousComposante.trimestre4.pret
                t4Bn = sousComposante.trimestre4.budgetNational
              }
              tBn = t1Bn +  t2Bn + t3Bn + t4Bn
              tPret = t1Pret +  t2Pret + t3Pret + t4Pret
              total = tBn = tPret    
              programme.push({bailleur,nom:sousComposante.nom,code:sousComposante.code,poids,isSC:true,bn,pret,bn,pret,t1Pret,t1Bn,t2Pret,t2Bn,t3Pret,t3Bn,t4Bn,t4Pret,tBn,tPret,total})
              sousComposante.activites.forEach(activite => {
              const bn = activite.budgetNational
              const pret = activite.pret
              let poids = activite.poids
              let structureResponsable = activite.structureResponsable
              let structureAssocie = activite.structureAssocie
              let t1Bn =0
              let t1Pret =0
              let t2Bn =0
              let t2Pret =0
              let t3Bn =0
              let t3Pret =0
              let t4Bn =0
              let t4Pret =0
              let tBn = 0
              let tPret = 0
              let total =0
              const planing = {
                janvier:'',
                fevrier:'',
                mars:'',
                avril:'',
                mai:'',
                juin:'',
                juillet:'',
                aout:'',
                septembre:'',
                octobre:'',
                novembre:'',
                decembre:''
              }
              if( activite.trimestre1 != undefined) {
                t1Pret = activite.trimestre1.pret
                t1Bn = activite.trimestre1.budgetNational
              }
              if( activite.trimestre2 != undefined) {
                t2Pret = activite.trimestre2.pret
                t2Bn = activite.trimestre2.budgetNational
              }
              if( activite.trimestre3 != undefined) {
                t3Pret = activite.trimestre3.pret
                t3Bn = activite.trimestre3.budgetNational
              }
              if( activite.trimestre4 != undefined) {
                t4Pret = activite.trimestre4.pret
                t4Bn = activite.trimestre4.budgetNational
              }
               tBn = t1Bn +  t2Bn + t3Bn + t4Bn
              tPret = t1Pret +  t2Pret + t3Pret + t4Pret
              total = tBn = tPret 
         
              //extraire les activiteDuree[] des dates et le mettre dans un tableau
              const activiteDuree = activite.durees
              if(activiteDuree != undefined || activiteDuree != null) {
                 if(activiteDuree[0] == 1) {
                  planing.janvier = "ok"
                }
                if(activiteDuree[1] == 1) {
                  planing.fevrier = "ok"
                }
                if(activiteDuree[2] == 1) {
                  planing.mars = "ok"
                }
                if(activiteDuree[3] == 1) {
                  planing.avril = "ok"
                }
                if(activiteDuree[4] == 1) {
                  planing.mai = "ok"
                }
                if(activiteDuree[5] == 1) {
                  planing.juin = "ok"
                }
                if(activiteDuree[6] == 1) {
                  planing.juillet = "ok"
                }
                if(activiteDuree[7] == 6) {
                  planing.aout = "ok"
                }
                if(activiteDuree[8] == 1) {
                  planing.septembre = "ok"
                }
                if(activiteDuree[9] == 1) {
                  planing.octobre = "ok"
                }
                if(activiteDuree[10] == 1) {
                  planing.novembre = "ok"
                }
                if(activiteDuree[11] == 1) {
                  planing.decembre = "ok"
                }
              }
              
               programme.push({bailleur,nom:activite.nom,code:activite.code,poids,isActivite:true,bn,pret,t1Pret,t1Bn,t2Pret,t2Bn,t3Pret,t3Bn,t4Bn,t4Pret,tBn,tPret,total,structureResponsable,structureAssocie,planing})
                activite.taches.forEach(tache => {
                  let poids = tache.poids
                  programme.push({bailleur,nom:activite.nom,code:activite.code,poids,isTache:true,bn,pret,t1Pret,t1Bn,t2Pret,t2Bn,t3Pret,t3Bn,t4Bn,t4Pret})
                })
              })
            })
          })
         
       })
      }
      return programme
    }
  },
  methods:{
        generateReport () {
      this.$refs.html2Pdf.generatePdf()
    },
    chargement(bool) {
      this.$store.dispatch('SET_LOADER',bool)
    },
    customLabel ({  sigle }) {
      return ` ${sigle}`
    },
    
     getPermission() {
      this.currentUser.role[0].permissions.forEach(element => {
        if(element.slug ==='exporter-un-suivi-ppm') {
          this.exporterSuiviPpm = true
        }
       if(element.slug === 'exporter-un-suivi-ptab') {
        this.exporterSuiviPta = true
      }
      if(element.slug === 'exporter-un-suivi-ppm-revise') {
        this.exporterSuiviRePpm = true
      }
      if(element.slug ==='exporter-un-suivi-pta-revise') {
        this.exporterSuiviRePta = true
      }
      if(element.slug ==='voir-plan-decaissement-ptab') {
        this.planDecaissementPtaVisible= true
      }
      if(element.slug ==='exporter-un-suivi-financier') {
        this.exporterSuiviFinance = true
      }
      if(element.slug ==='voir-un-ptab') {
        this.ptaVisible = true
      }
      if(element.slug ==='voir-un-ppm') {
        this.ppmVisible = true
      }
      if(element.slug ==='voir-une-revision') {
        this.revisionVisible = true
      }
      if(element.slug ==='filtre-ptab') {
        this.filtrePta = true
      }
      if(element.slug ==='filtre-ppm') {
        this.filtrePpm = true
      }
      if(element.slug ==='filtre-ptab-revise') {
        this.filtreRePta = true
      }
      if(element.slug ==='filtre-ppm-revise') {
        this.filtreRePpm = true
      }

           
    });

    },


    getPtaFiltre() {
    
      this.chargement(true)
        const  data={
          bailleurId:this.bailleur.id,
          programmeId:this.currentUser.programme.id,
          annee:Number(this.annee),
          ppm: 2
        }
     
        PtabService.getFiltre(data).then((data) => {
         this.ptab =  data.data.data
         this.openFiltre = false
          this.chargement(false)
        }).catch((e) => {
          this.chargement(false)
          this.$toast.error(e)
         
        })
    },
    getPpm() {
         const  data={
          programmeId:this.currentUser.programme.id,
          annee:new Date().getFullYear() ,
          ppm: 2
        }
     
        PtabService.getFiltre(data).then((data) => {
         this.ptab =  data.data.data
        }).catch((e) => {
          this.$toast.error(e)
         
        })
    },
    getBailleur() {
        BailleursService.get().then((data) => {
          this.bailleurs = data.data.data
        }).catch((e) => {
            this.$toast.error(e)
          
        })
    },
  },
  mounted() {
    this.getPpm()
    this.getPermission()
    this.getBailleur()
  }
}
</script>

<style>

</style>