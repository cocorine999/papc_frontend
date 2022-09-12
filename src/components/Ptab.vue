<template>
 <div>

<div class="flex ">

       <!-- fixer les trois premiers collones -->

   <div class="w-screen  pl-5 py-5"> 
    <table class="w-full  border-collaspe">
      <thead>
        <tr class="ligne1">
          <th class="border-2 border-black th_bailleur" rowspan="3">Sélection</th>
          <th class="border-2 border-black " rowspan="3">Code PTA</th>
          <th class="border-2 border-black " rowspan="3">
            Composantes/Sous-composantes/Activités/Tâches
          </th>
          
        </tr>
        
      
      </thead>
      <tbody>
        <tr class="font-bold ligne2a">
          <td class="border-2 border-black bg-white">PAPC</td>
          <td class="border-2 border-black">4.1.1.3</td>
          <td class="border-2 border-black">PROGRAMME ASSAINISSEMENT PLUVIAL DE</td>
          
        </tr>
        <tr class=" font-bold ligne3a">
          <td class="border-2 border-black bg-white">BM</td>
          <td class="border-2 border-black">4.1.1.3.1</td>
          <td class="border-2 border-black">
            Composante 1: Investissement dans l'assainissement pluvial et
          </td>
          
        </tr>
        <tr class=" font-bold ligne4a">
          <td class="border-2 border-black bg-white">BM</td>
          <td class="border-2 border-black">4.1.1.3.1.1</td>
          <td class="border-2 border-black">
            Sous-composante 1.1 : Construction d'infrastructures de
          </td>
          
          
        </tr>
        <tr class="ligne5a">
          <td class="border-2 border-black intrus ">Bm</td>
          <td class="border-2 border-black">4.1.1.3.1.1.1</td>
          <td class="border-2 border-black">
            Construire les collecteurs d'assainissemntpluvial et aménager les
          </td>
          
        </tr>
        <tr>
          <td class="border-2 border-black">Bm</td>
          <td class="border-2 border-black ">4.1.1.3.1.1.1.1</td>
          <td class="border-2 border-black ">
            Construire les collecteurs d'assainissement pluvial et aménager les 
          </td>
          
        </tr>
         <tr>
          <td class="border-2 border-black">Bm</td>
          <td class="border-2 border-black text-red-500">4.1.1.3.1.1.1.1.1
          </td>
          <td class="border-2 border-black text-red-500">
            Suivi de l'exécution des travaux trimestre 1
          </td>
        </tr>
         <tr>
          <td class="border-2 border-black">Bm</td>
          <td class="border-2 border-black text-red-500">4.1.1.3.1.1.1.1.2
          </td>
          <td class="border-2 border-black text-red-500">
            Suivi de l'exécution des travaux trimestre 2
          </td>
        </tr>
         <tr>
          <td class="border-2 border-black">Bm</td>
          <td class="border-2 border-black text-red-500">4.1.1.3.1.1.1.1.3
          </td>
          <td class="border-2 border-black text-red-500">
            Suivi de l'exécution des travaux trimestre 3
          </td>
        </tr>
         <tr>
          <td class="border-2 border-black">Bm</td>
          <td class="border-2 border-black text-red-500">4.1.1.3.1.1.1.1.4
         </td>
          <td class="border-2 border-black text-red-500">
            Suivi de l'exécution des travaux trimestre 4
          </td>
        </tr>
        <tr>
          <td class="border-2 border-black">Bm</td>
          <td class="border-2 border-black text-red-500">4.1.1.3.1.1.1.1.5
          </td>
          <td class="border-2 border-black text-red-500">
            Suivi du paiement des décomptes trimestre 1

          </td>
        </tr>
        <tr>
          <td class="border-2 border-black">Bm</td>
          <td class="border-2 border-black text-red-500">4.1.1.3.1.1.1.1.6

          </td>
          <td class="border-2 border-black text-red-500">
            Suivi du paiement des décomptes trimestre 2

          </td>
        </tr>
        <tr>
          <td class="border-2 border-black">Bm</td>
          <td class="border-2 border-black text-red-500">4.1.1.3.1.1.1.1.7

          </td>
          <td class="border-2 border-black text-red-500">
            Suivi du paiement des décomptes trimestre 3

          </td>
        </tr>
      </tbody>
    </table>
  </div> 


  <!-- Le reste du tableau -->

  <div class="w-full overflow-x-scroll pr-5 py-5"> 
    <table class="w-screen table-auto border-collaspe">
      <thead>
        <tr class="ligne1">
          <th class="border-2 border-black w-64" colspan="3">Montant</th>
          <th class="border-2 border-black w-64" colspan="3">Montant</th>
          <th class="border-2 border-black w-24" rowspan="3">Poids</th>
          <th class="border-2 border-black th_planing" colspan="12">Planning</th>
          <th class="border-2 border-black w-48" rowspan="3">Structure Res</th>
          <th class="border-2 border-black w-48" rowspan="3">Structure Associés</th>
          <th class="border-2 border-black w-48" colspan="2">Trimestre 1</th>
          <th class="border-2 border-black w-48" colspan="2">Trimestre 2</th>
          <th class="border-2 border-black w-48" colspan="2">Trimestre 3</th>
          <th class="border-2 border-black w-48" colspan="2">Trimestre 4</th>
        </tr>
        <tr class="ligne2">
          <th class="border-2 border-black " colspan="2">Sources</th>
          <th class="border-2 border-black " rowspan="2">Total</th>
          <th class="border-2 border-black " colspan="2">Sources</th>
          <th class="border-2 border-black " rowspan="2">Total</th>
          <th class="border-2 border-black " rowspan="2">Jan</th>
          <th class="border-2 border-black " rowspan="2">Fév</th>
          <th class="border-2 border-black " rowspan="2">Mars</th>
          <th class="border-2 border-black " rowspan="2">Avril</th>
          <th class="border-2 border-black " rowspan="2">Mai</th>
          <th class="border-2 border-black " rowspan="2">Juin</th>
          <th class="border-2 border-black " rowspan="2">Juil</th>
          <th class="border-2 border-black " rowspan="2">Aout</th>
          <th class="border-2 border-black " rowspan="2">Sept</th>
          <th class="border-2 border-black " rowspan="2">Oct</th>
          <th class="border-2 border-black " rowspan="2">Nov</th>
          <th class="border-2 border-black " rowspan="2">Dec</th>

          <th class="border-2 border-black" colspan="2">Sources</th>
          <th class="border-2 border-black" colspan="2">Sources</th>
          <th class="border-2 border-black" colspan="2">Sources</th>
          <th class="border-2 border-black" colspan="2">Sources</th>
        </tr>
        <tr class="ligne3">
          <th class="border-2 border-black">BN</th>
          <th class="border-2 border-black">EMP</th>

          <th class="border-2 border-black">BN</th>
          <th class="border-2 border-black">EMP</th>

          <th class="border-2 border-black">BN</th>
          <th class="border-2 border-black">EMP</th>
          <th class="border-2 border-black">BN</th>
          <th class="border-2 border-black">EMP</th>
          <th class="border-2 border-black">BN</th>
          <th class="border-2 border-black">EMP</th>
          <th class="border-2 border-black">BN</th>
          <th class="border-2 border-black">EMP</th>
        </tr>
      </thead>
      <tbody>
        <tr class="ligne2a font-bold">
         
          <td class="border-2 border-black">
            5 316 742,941

          </td>
          <td class="border-2 border-black">
            208 453 615,393

          </td>
          <td class="border-2 border-black">
            213 770 358,334

          </td>
          <td class="border-2 border-black">
            1 644 000,000

          </td>
          <td class="border-2 border-black">
            53 169 044,870

          </td>
          <td class="border-2 border-black">
            54 813 044,870

          </td>
          <td class="border-2 border-black">

          </td>
          <td class="border-2 border-black">

          </td>
          <td class="border-2 border-black">

          </td>
          <td class="border-2 border-black">

          </td>
          <td class="border-2 border-black">

          </td>
          <td class="border-2 border-black">

          </td>
          <td class="border-2 border-black">

          </td>
          <td class="border-2 border-black">

          </td>
          <td class="border-2 border-black">

          </td>
          <td class="border-2 border-black">

          </td>
          <td class="border-2 border-black">

          </td>
          <td class="border-2 border-black">

          </td>
          <td class="border-2 border-black">

          </td>
          <td class="border-2 border-black">PAPC/ACVDT</td>
          <td class="border-2 border-black">

          </td>
          <td class="border-2 border-black">
            201 000,000

          </td>
          <td class="border-2 border-black">
            15 058 193,265

          </td>
          <td class="border-2 border-black">
            1 040 000,000

          </td>
          <td class="border-2 border-black">
            20 054 213,097

          </td>
          <td class="border-2 border-black">
            200 000,000

          </td>
          <td class="border-2 border-black">
            14 794 375,424

          </td>
          <td class="border-2 border-black">
            203 000,000

          </td>
          <td class="border-2 border-black">
            3 262 263,084

          </td>
        </tr>
        <tr class="ligne3a  font-bold">
         
          <td class="border-2 border-black">
            1 561 078,941

          </td>
          <td class="border-2 border-black">
             45 833 473,42 

          </td>
          <td class="border-2 border-black">
             47 394 552,36 

          </td>
          <td class="border-2 border-black">
            500 000,000

          </td>
          <td class="border-2 border-black">
            11 318 656,514

          </td>
          <td class="border-2 border-black">
            11 818 656,514

          </td>
          <td class="border-2 border-black">100.00</td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black">
            0,000

          </td>
          <td class="border-2 border-black">
            2 136 653,437

          </td>
          <td class="border-2 border-black">
            500 000,000

          </td>
          <td class="border-2 border-black">
            4 617 723,449

          </td>
          <td class="border-2 border-black">
            0,000

          </td>
          <td class="border-2 border-black">
            3 658 066,378

          </td>
          <td class="border-2 border-black">
            0,000

          </td>
          <td class="border-2 border-black">
            906 213,250

          </td>
        </tr>
        <tr class="ligne4a font-bold">
         
          <td class="border-2 border-black">
            1 561 078,941

          </td>
          <td class="border-2 border-black">
             42 598 138,77 

          </td>
          <td class="border-2 border-black">
             44 159 217,71 

          </td>
          <td class="border-2 border-black">
            500 000,000

          </td>
          <td class="border-2 border-black">
            9 795 093,864

          </td>
          <td class="border-2 border-black">
            10 295 093,864

          </td>
          <td class="border-2 border-black">72.00</td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black">
            0,000

          </td>
          <td class="border-2 border-black">
            1 993 223,437

          </td>
          <td class="border-2 border-black">
            500 000,000

          </td>
          <td class="border-2 border-black">
            4 291 638,449

          </td>
          <td class="border-2 border-black">
            0,000

          </td>
          <td class="border-2 border-black">
            3 448 076,378

          </td>
          <td class="border-2 border-black">
            0,000

          </td>
          <td class="border-2 border-black">
            62 155,600

          </td>
        </tr>
        <tr class="ligne5a font-bold">
          
          <td class="border-2 border-black">
            0,000

          </td>
          <td class="border-2 border-black">
            42 234 952,369

          </td>
          <td class="border-2 border-black">
            42 234 952,369

          </td>
          <td class="border-2 border-black">
            0,000

          </td>
          <td class="border-2 border-black">
            9 663 642,264

          </td>
          <td class="border-2 border-black">
            9 663 642,264

          </td>
          <td class="border-2 border-black">52.000</td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black">
            0,000

          </td>
          <td class="border-2 border-black">
            1 981 115,437

          </td>
          <td class="border-2 border-black">
            0,000

          </td>
          <td class="border-2 border-black">
            4 249 594,449

          </td>
          <td class="border-2 border-black">
            0,000

          </td>
          <td class="border-2 border-black">
            3 432 932,378

          </td>
          <td class="border-2 border-black">
            0,000

          </td>
          <td class="border-2 border-black">
            0,000

          </td>
        </tr>
        <tr>
          
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black">
             20 034 864,60 

          </td>
          <td class="border-2 border-black">
             20 034 864,60 

          </td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black">
            5 128 224,71

          </td>
          <td class="border-2 border-black">
            5 128 224,710

          </td>
          <td class="border-2 border-black">19.00</td>
          <td class="border-2 border-black bg-blue-500"></td>
          <td class="border-2 border-black bg-blue-500"></td>
          <td class="border-2 border-black bg-blue-500"></td>
          <td class="border-2 border-black bg-blue-500"></td>
          <td class="border-2 border-black bg-blue-500"></td>
          <td class="border-2 border-black bg-blue-500"></td>
          <td class="border-2 border-black bg-blue-500"></td>
          <td class="border-2 border-black bg-blue-500"></td>
          <td class="border-2 border-black bg-blue-500"></td>
          <td class="border-2 border-black bg-blue-500"></td>
          <td class="border-2 border-black bg-blue-500"></td>
          <td class="border-2 border-black bg-blue-500"></td>
          <td class="border-2 border-black">Pool PAPC</td>
          <td class="border-2 border-black">AGETUR</td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black">
            1 709 408,237

          </td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black">
            1 709 408,237

          </td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black">
            1 709 408,237

          </td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
        </tr>
        <tr>
          
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black ">19.00</td>
          <td class="border-2 border-black bg-red-500"></td>
          <td class="border-2 border-black bg-red-500"></td>
          <td class="border-2 border-black bg-red-500"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
        </tr>
        <tr>
          
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black ">19.00</td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black bg-red-500"></td>
          <td class="border-2 border-black bg-red-500"></td>
          <td class="border-2 border-black bg-red-500"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
        </tr>
        <tr>
          
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black ">19.00</td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black bg-red-500"></td>
          <td class="border-2 border-black bg-red-500"></td>
          <td class="border-2 border-black bg-red-500"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
        </tr>
        <tr>
          
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black ">19.00</td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black bg-red-500"></td>
          <td class="border-2 border-black bg-red-500"></td>
          <td class="border-2 border-black bg-red-500"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
        </tr>
        <tr>
          
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black ">19.00</td>
          <td class="border-2 border-black bg-red-500"></td>
          <td class="border-2 border-black bg-red-500"></td>
          <td class="border-2 border-black bg-red-500"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
        </tr>
        <tr>
          
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black ">19.00</td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black bg-red-500"></td>
          <td class="border-2 border-black bg-red-500"></td>
          <td class="border-2 border-black bg-red-500"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
        </tr>
        <tr>
          
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black ">19.00</td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black bg-red-500"></td>
          <td class="border-2 border-black bg-red-500"></td>
          <td class="border-2 border-black bg-red-500"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
          <td class="border-2 border-black"></td>
        </tr>
      </tbody>
    </table>
  </div> 

</div> 








 
</div>
</template>

<script>

</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.th_bailleur{
  height: 138px;
}
.th_planing {
  width: 600px;
}
.mois{
  width: 50px;
}
.tab_body{
  margin-left: -1px;
}
.td_montant{
  width: 96px;
}
.main{
  height: 97vh;
  width: 97vw;
  margin: auto;
}
.big_table {
  width: 95 vw;
  height: 95 vh;
  padding: 15px;
}
.ligne1{
  background: #ADB9CA;
}
.ligne2a{
  background: #f7caac;
}
.ligne3a{
  background: #FFD965;
}
.ligne4a{
  background: #BDD6EE;
}
.ligne5a{
  background: #ADB9CA;
}
.ligne2{
  background: #ADB9CA;
  opacity: 70%;
}
.ligne3{
  background: #ADB9CA;
  opacity: 30%;
}
td{
  padding: 10px;
}
th {
  padding: 10px;
}
.intrus{
  background: white;
}
</style>