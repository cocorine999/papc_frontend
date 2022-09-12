<template>
  <div>

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
import Ptab from '@/components/Ptab'
export default {
  components:{Ptab},
  data() {
    return {
      data: [
        {
            "bailleur": "BM",
            "projetId": 1,
            "nom": "Porojet 1",
            "code": "1.1",
            "budgetNational": 0,
            "pret": 123654789,
            "composantes": [
                {
                    "id": 1,
                    "nom": "Composante 1",
                    "code": "1.1.1",
                    "budgetNational": 0,
                    "pret": 13266,
                    "sousComposantes": [
                        {
                            "id": 2,
                            "nom": "Sous Composante 1",
                            "budgetNational": 0,
                            "pret": 1263,
                            "code": "1.1.1.1",
                            "activites": [
                                {
                                    "id": 1,
                                    "nom": "Activite 1",
                                    "code": "1.1.1.1.1",
                                    "budgetNational": 0,
                                    "pret": 1236,
                                    "taches": []
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "bailleur": "BM",
            "projetId": 1,
            "nom": "Porojet 1",
            "code": "1.1",
            "budgetNational": 0,
            "pret": 123654789,
            "composantes": [
                {
                    "id": 1,
                    "nom": "Composante 1",
                    "code": "1.1.1",
                    "budgetNational": 0,
                    "pret": 13266,
                    "trimestre1": {
                        "pret": 0,
                        "budgetNational": 0
                    },
                    "trimestre2": {
                        "pret": 0,
                        "budgetNational": 0
                    },
                    "trimestre3": {
                        "pret": 0,
                        "budgetNational": 0
                    },
                    "trimestre4": {
                        "pret": 0,
                        "budgetNational": 0
                    },
                    "budgetise": {
                        "pret": 0,
                        "budgetNational": 0
                    },
                    "poids": 12,
                    "sousComposantes": [
                        {
                            "id": 2,
                            "nom": "Sous Composante 1",
                            "budgetNational": 0,
                            "pret": 1263,
                            "trimestre1": {
                                "pret": 0,
                                "budgetNational": 0
                            },
                            "trimestre2": {
                                "pret": 0,
                                "budgetNational": 0
                            },
                            "trimestre3": {
                                "pret": 0,
                                "budgetNational": 0
                            },
                            "trimestre4": {
                                "pret": 0,
                                "budgetNational": 0
                            },
                            "budgetise": {
                                "pret": 0,
                                "budgetNational": 0
                            },
                            "poids": 12,
                            "code": "1.1.1.1",
                            "activites": [
                                {
                                    "id": 1,
                                    "nom": "Activite 1",
                                    "code": "1.1.1.1.1",
                                    "budgetNational": 0,
                                    "pret": 1236,
                                    "trimestre1": {
                                        "pret": 0,
                                        "budgetNational": 0
                                    },
                                    "trimestre2": {
                                        "pret": 0,
                                        "budgetNational": 0
                                    },
                                    "trimestre3": {
                                        "pret": 0,
                                        "budgetNational": 0
                                    },
                                    "trimestre4": {
                                        "pret": 0,
                                        "budgetNational": 0
                                    },
                                    "budgetise": {
                                        "pret": 0,
                                        "budgetNational": 0
                                    },
                                    "poids": 12,
                                    "durees": [1,1,1,1,0,0,0,0,0,1,1,1],
                                    "structureResponsable": "SOGEA",
                                    "structureAssocie": "SATOM",
                                    "taches": []
                                }
                            ]
                        }
                    ]
                }
            ]
        },

        {
            "bailleur": "DE",
            "projetId": 3,
            "nom": "projet gojanda",
            "code": "24.12",
            "composantes": [
                {
                    "id": 9,
                    "nom": "composante gojanda",
                    "code": "24.12.0",
                    "sousComposantes": []
                }
            ]
        },
        {
            "bailleur": "CH",
            "projetId": 6,
            "nom": "PROJET CH",
            "code": "24.6",
            "composantes": [
                {
                    "id": 18,
                    "nom": "23",
                    "code": "24.6.0",
                    "sousComposantes": []
                },
                {
                    "id": 15,
                    "nom": "Composante CH #1",
                    "code": "24.6.1",
                    "sousComposantes": []
                },
                {
                    "id": 16,
                    "nom": "Conposante CH #12",
                    "code": "24.6.2",
                    "sousComposantes": [
                        {
                            "id": 20,
                            "nom": "sous c 56478",
                            "code": "24.6.2.0",
                            "activites": [
                                {
                                    "id": 9,
                                    "nom": "Act-794378-843798347",
                                    "code": "24.6.2.0.0",
                                    "taches": [
                                        {
                                            "id": "J5RDkGaEYaKVv7WMJQjGmEXlqxwd4bnKpOR62kDy9Bo35pP0Ler1AZg80BLKgeYy",
                                            "nom": "taches-5435435-2454",
                                            "position": 0,
                                            "poids": 45,
                                            "activiteId": 9,
                                            "description": "Avant de poursuivre votre navigation, nous vous invitons \u00e0 nous communiquer vos pr\u00e9f\u00e9rences ci-dessous ou \u00e0 continuer sans accepter, ce qui \u00e9quivaut \u00e0 refuser les cookies. Vous pouvez mettre \u00e0 jour vos choix \u00e0 tout moment en cliquant sur le lien \"G\u00e9rer les Cookies\" en bas de notre site.",
                                            "created_at": "2022-09-09T11:26:32.000000Z",
                                            "updated_at": "2022-09-09T11:26:32.000000Z",
                                            "deleted_at": null,
                                            "durees": [
                                                {
                                                    "id": "gaDpKxw6P8jMJa4g9lORXryQ0bwp3VB3noGY2KNkZm7qAvD6zLxenW1dzR0WXJPO",
                                                    "debut": "2022-09-01",
                                                    "fin": "2022-09-13",
                                                    "dureeable_type": "App\\Models\\Tache",
                                                    "dureeable_id": 8,
                                                    "created_at": "2022-09-09T11:26:32.000000Z",
                                                    "updated_at": "2022-09-09T11:26:32.000000Z",
                                                    "deleted_at": null
                                                }
                                            ]
                                        },
                                        {
                                            "id": "GY6xWvREM8BDxlV7mAGWYoKk3eEg14z8kOjdX0qPbJawyr6RQv5Lp2Z97rq1ygaV",
                                            "nom": "tache-73267",
                                            "position": 0,
                                            "poids": 4,
                                            "activiteId": 9,
                                            "description": "Avant de poursuivre votre navigation, nous vous invitons \u00e0 nous communiquer vos pr\u00e9f\u00e9rences ci-dessous ou \u00e0 continuer sans accepter, ce qui \u00e9quivaut \u00e0 refuser les cookies. Vous pouvez mettre \u00e0 jour vos choix \u00e0 tout moment en cliquant sur le lien \"G\u00e9rer les Cookies\" en bas de notre site.",
                                            "created_at": "2022-09-09T11:27:00.000000Z",
                                            "updated_at": "2022-09-09T11:27:00.000000Z",
                                            "deleted_at": null,
                                            "durees": [
                                                {
                                                    "id": "wMq01PVaYgQa19m8AnGzlWNx43ZbjKEWGEML6XpeqkD7OrJvwy0PR2VdzXkNQO9J",
                                                    "debut": "2022-09-22",
                                                    "fin": "2022-09-27",
                                                    "dureeable_type": "App\\Models\\Tache",
                                                    "dureeable_id": 9,
                                                    "created_at": "2022-09-09T11:27:00.000000Z",
                                                    "updated_at": "2022-09-09T11:27:00.000000Z",
                                                    "deleted_at": null
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": 19,
                            "nom": "sous c 123",
                            "code": "24.6.2.1",
                            "activites": []
                        }
                    ]
                },
                {
                    "id": 17,
                    "nom": "12",
                    "code": "24.6.3",
                    "sousComposantes": []
                }
            ]
        }
      ],
    }
  },
  computed: {
    dataNew() {
      const  programme = []
      if (this.data != undefined && this.data !=null ) {
        this.data.forEach(element => {
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
  }
}
</script>

<style>

</style>