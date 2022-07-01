<template>
  <div class="relative p-4 ">
    <div>
      <h1 class="text-2xl font-semibold text-center uppercase ">Ma librairies de Composants</h1>
      <div class="card my-4">
        <h2 class="text-xl font-semibold uppercase py-4">Mes Cards</h2>
        <div class="list-card grid grid-cols-3 gap-4 ">
          <card-bailleur sigle="BM" libelle="Banque Mondiale" description="Lorem ipsum dolor sit" codePTA="1.3.3.2.1" pays="Benin"></card-bailleur>
          <card-projet sigleBailleur="BM" libelle="Projet1" description="lorem ipsum dolor sit" status="terminer" montantBN="1000005754" montantEPM="788000000000" dateDeb="01-01-2020" dateFin="31-12-2025" pays="Benin" color="bg-purple-500"></card-projet>
          <card-composante isGlobale="false" libelle="composante 1" description="lorem ipsum dolor set" status="en cours" codePTA="1.2.3.1" montantEPM="45780000000" montantBN="13500000"></card-composante>
          <card-activite libelle="Activité 1" description="lorem ipsum dolor sit" status="en attente" codePTA="1.2.5.8" montantBN="520000000000" montantEPM="25300000000" dateDeb="21-05-2022" dateFin="20-12-2025" structureResponsable="Agetur" structureAssocie="Non definit"></card-activite>
        </div>
      </div>
      <div class="button my-4">
        <h2 class="text-xl font-semibold uppercase py-4">Mes bouttons</h2>
        <div class="flex space-x-3 space-y-3 flex-wrap ">
          <vbutton   type="submit" template="success"  >button success</vbutton>
          <vbutton   type="submit" template="success" isloading="true" >button success</vbutton>
          <vbutton   type="submit" template="default"  >button default</vbutton>
          <vbutton   type="submit" template="default" isloading="true"  >button default</vbutton>
          <vbutton   type="submit" template="danger"  >button danger</vbutton>
          <vbutton   type="submit" template="danger" isloading="true" >button danger</vbutton>
          <vbutton  template="none" type="submit" padding="py-2 px-4" aroundi="rounded-md" textcolor="text-white" textsize="text-xs" graissage="font-bold" bgcolore="bg-blue-500">button personalisé</vbutton>
          <vbutton  template="none" type="submit" padding="py-2 px-4" aroundi="rounded-md" textcolor="text-white" textsize="text-xs" graissage="font-bold" bgcolore="bg-blue-500" :iconne="iconne">button personalisé + iconne</vbutton>
        </div>
      </div>
      <div class="input my-4">
        <h2 class="text-xl font-semibold uppercase py-4">Les champs de formulaire</h2>
        <div class="grid grid-cols-2 gap-3">
          <div class="form-group">
            <vinput 
              template="none"
              :vmodel="firstName" 
              label="Entrez votre nom"
              labelposition="y" 
              bordere="border border-gray-700" 
              bgcolor="bg-gray-500" 
              type="text" 
              padding="px-4 py-2" 
              aroundi="rounded-md" 
              textcolor="text-white" 
              textsize="text-sm" 
              graissage="font-semibold" 
              placeholdere="Entrez votre nom"  
              size="w-full" 
              required="required"
              @update="datas" />
          </div>
          <div class="form-group">
            <vinput 
              template="none"
              :vmodel="lastName" 
              label="Entrez votre prenom"
              labelposition="y" 
              bordere="border border-gray-700" 
              bgcolor="bg-gray-500" 
              type="text" 
              padding="px-4 py-2" 
              aroundi="rounded-md" 
              textcolor="text-white" 
              textsize="text-sm" 
              graissage="font-semibold" 
              placeholdere="Entrez votre prenom"  
              size="w-full" 
              required="required"
              @update="datas" />
          </div>
          <div class="form-group">
            <vinput 
              template="none"
              :vmodel="age" 
              label="Entrez votre age"
              labelposition="y" 
              bordere="border border-gray-700" 
              bgcolor="bg-gray-500" 
              type="number" 
              padding="px-4 py-2" 
              aroundi="rounded-md" 
              textcolor="text-white" 
              textsize="text-sm" 
              graissage="font-semibold" 
              placeholdere="Entrez votre age"  
              size="w-full" 
              required="required"
              @update="datas" />
          </div>
          <div class="form-group">
            <vinput 
              template="none"
              :vmodel="email2" 
              label="Entrez votre email"
              labelposition="y" 
              bordere="border border-gray-700" 
              bgcolor="bg-gray-500" 
              type="email" 
              padding="px-4 py-2" 
              aroundi="rounded-md" 
              textcolor="text-white" 
              textsize="text-sm" 
              graissage="font-semibold" 
              placeholdere="Entrez votre email"  
              size="w-full" 
              required="required"
              />
          </div>
        </div>
        <h3 class="text-lg font-semibold py-2">Input par defaut</h3>
        <div class="form-group">
          valeur par defaut{{email}}
          <vinput 
            template="default"
            :vmodel="email"
            placeholdere="Entrez votre email"   
            label="Entrez votre email"
            labelposition="y" 
            type="email" 
            @update="getEmail"
             />
          </div>
           <h3 class="text-lg font-semibold py-2">select par defaut</h3>
           <vselect 
            template="default"
            vmodel="demo"
            :datas="datas"
            placeholdere="Selectionner "   
            label="Changer de status"
            labelposition="y" 
            @update="getDatas" />
      </div>

      <div class="form my-4">
        <h2 class="text-xl font-semibold uppercase py-4">formulaire</h2>

        <vform template="default" :champs="champs" :cols="cols" ></vform>

      </div>

       <div class="form my-4">
        <h2 class="text-xl font-semibold uppercase py-4">tableau</h2>

        <vtable :headers="headers" :datas="dataTable" :actions="actions" @supprimer="supprimer" @modifier="modifier"></vtable>

      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  layout:'dashboard',
  data() {
    return {
      champs:[
        {name:'Nom',type:'text',placeholdere:'Entrez le nom',isSelect:false,data:''},
        {name:'Prenoms',type:'text',placeholdere:'Entrez le Prenoms',isSelect:false,data:''},
        {name:'age',type:'number',placeholdere:"Entrez votre age",isSelect:false,data:''},
        {name:'Pays',type:'',placeholdere:'Selectionner un pays',isSelect:true,data:'',options:['benin','togo','ghana']},
      ],
      cols:2,
      email:'',
      datas:['en cours','en attente','terminer'],
      getSelect:'',
      iconne:`<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM17 11h-4v4h-2v-4H7V9h4V5h2v4h4v2z"></path></svg>`,
      headers:[
        {name:'firstname',props:'firstName'},
        {name:'lastName',props:'lastName'},
        {name:'age',props:'age'},
        {name:'date de naissance',props:'dateNais'},
        {name:'ville',props:'ville'},
      ],
      dataTable:[
        {firstName:'Gomez ',lastName:'Jacob',age:29,dateNais:"28-12-xxxx",ville:'Cotonou'},
        {firstName:'Gomez1 ',lastName:'Jacob1',age:29,dateNais:"28-12-xxxx",ville:'Cotonou'},
        {firstName:'Gomez ',lastName:'Jacob',age:29,dateNais:"28-12-xxxx",ville:'Cotonou'},
        {firstName:'Gomez ',lastName:'Jacob',age:29,dateNais:"28-12-xxxx",ville:'Cotonou'},
        {firstName:'Gomez ',lastName:'Jacob',age:29,dateNais:"28-12-xxxx",ville:'Cotonou'},
        {firstName:'Gomez ',lastName:'Jacob',age:29,dateNais:"28-12-xxxx",ville:'Cotonou'},
        {firstName:'Gomez ',lastName:'Jacob',age:29,dateNais:"28-12-xxxx",ville:'Cotonou'},
        {firstName:'Gomez ',lastName:'Jacob',age:29,dateNais:"28-12-xxxx",ville:'Cotonou'},
        {firstName:'Gomez ',lastName:'Jacob',age:29,dateNais:"28-12-xxxx",ville:'Cotonou'},
        {firstName:'Gomez ',lastName:'Jacob',age:29,dateNais:"28-12-xxxx",ville:'Cotonou'},
        {firstName:'Gomez ',lastName:'Jacob',age:29,dateNais:"28-12-xxxx",ville:'Cotonou'},
        {firstName:'Gomez ',lastName:'Jacob',age:29,dateNais:"28-12-xxxx",ville:'Cotonou'},
      ],
      actions:[
        {name:'modifier',iconne:''},
        {name:'supprimer',iconne:''},
      ]
    } 
  },
  methods: {
    getDatas(data) {
      console.log(data)
      this.getSelect = data
    },
    getEmail(data) {
      this.email = data
    }
  }
}
</script>

<style>

</style>