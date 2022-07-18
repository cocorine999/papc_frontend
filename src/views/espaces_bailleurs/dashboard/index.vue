<template>
  <dashboard espace="bailleur">
    <div class="p-4">
      <div v-if="showModal">
      <vmodal  title="Filtre projet"  v-on:close="showModal = false">
        <div class="px-6" style="width:60vw !important">
          <vform template="default" isAllPairSaufDescrip="true" :champs="champsRecherche" :cols="cols" submitText="Rechercher" @sendForm="filtre" ></vform>
        </div>
      </vmodal>
      </div>
      <nav class="mb-2 text-sm font-semibold " aria-label="Breadcrumb">
        <div>
          <ol class="inline-flex p-0 list-none">
            <li class="flex items-center text-blue-500">
              <router-link to="/dashboard" class="text-gray-600">dashboard</router-link>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
            </li>
            <li class="flex items-center text-blue-500">
              <router-link to="/dashboard" class="text-gray-600">projet{{$route.params.id}}</router-link>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
            </li>
            <li class="flex items-center text-blue-500 ">
              <router-link to="/dasboard/projet" class="">details</router-link>
            </li>
          </ol>
        </div>
      </nav>
      <div class="flex justify-end mb-4">
        <div class="border border-gray-300 p-2 bg-white shadow">
          <router-link class="text-sm font-semibold" to="/dashboard/projets/composantes-globale">Composantes /</router-link>
          <router-link class="text-sm font-semibold" to="/dashboard/projets/activites-globale"> Activités /</router-link>
          <router-link class="text-sm font-semibold" to="/dashboard/projets/taches-globale">Taches</router-link>
        </div>
      </div>
      <div class="my-4">
        <div class="mb-4 flex justify-between">
          <div>
            <select  class="px-2 py-1 mt-1 border-2 border-gray-300 outile-none focus:outline-none focus:ring-2 w-full focus:ring-blue-500/50 focus:border-transparent">
              <option disabled value="">Selectionnez un projet </option>
              <option value="data" v-for="(data,index) in  5" :key="index">
                projet {{index}}
              </option>
            </select>
          </div>
          <div class="flex space-x-2 items-center ">
            <button  title="filtre" @click="showModal= true" class="bg-primary text-white px-2 py-1"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg></button>
              <button title="editer un projet"   class="p-2 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase rounded bg-primary focus:outline-none focus:shadow-outline">
             
             <span>
                <svg class="mr-1" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg">
                  <path fill="none" d="M0 0h24v24H0z"></path><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 000-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
                </svg>
              </span>
              <span class="mx-2 text-xs font-semibold uppercase">editer un projet</span>
            </button>
          </div>
          
        </div>

        <div class="my-4">
            <div class="grid  grid-cols-4 gap-3 ">
              <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                  <div class="p-3 rounded-full bg-indigo-600 bg-opacity-75">
                                          <svg class="h-8 w-8 text-white" viewBox="0 0 28 30" fill="none"
                                              xmlns="http://www.w3.org/2000/svg">
                                              <path
                                                  d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                                                  fill="currentColor"></path>
                                              <path
                                                  d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                                                  fill="currentColor"></path>
                                              <path
                                                  d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                                                  fill="currentColor"></path>
                                              <path
                                                  d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                                                  fill="currentColor"></path>
                                              <path
                                                  d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                                                  fill="currentColor"></path>
                                              <path
                                                  d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                                                  fill="currentColor"></path>
                                          </svg>
                  </div>
                  <div class="mx-5">
                    <h4 class="text-2xl font-semibold text-gray-700">8,282</h4>
                    <div class="text-gray-500">TEP</div>
                  </div>
              </div>

              <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                  <div class="p-3 rounded-full bg-indigo-600 bg-opacity-75">
                                          <svg class="h-8 w-8 text-white" viewBox="0 0 28 30" fill="none"
                                              xmlns="http://www.w3.org/2000/svg">
                                              <path
                                                  d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                                                  fill="currentColor"></path>
                                              <path
                                                  d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                                                  fill="currentColor"></path>
                                              <path
                                                  d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                                                  fill="currentColor"></path>
                                              <path
                                                  d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                                                  fill="currentColor"></path>
                                              <path
                                                  d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                                                  fill="currentColor"></path>
                                              <path
                                                  d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                                                  fill="currentColor"></path>
                                          </svg>
                  </div>
                  <div class="mx-5">
                    <h4 class="text-2xl font-semibold text-gray-700">8,282</h4>
                    <div class="text-gray-500">TEF</div>
                  </div>
              </div>

              <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                  <div class="p-3 rounded-full bg-indigo-600 bg-opacity-75">
                        <svg class="h-8 w-8 text-white" viewBox="0 0 28 30" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                                fill="currentColor"></path>
                            <path
                                d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                                fill="currentColor"></path>
                            <path
                                d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                                fill="currentColor"></path>
                            <path
                                d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                                fill="currentColor"></path>
                            <path
                                d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                                fill="currentColor"></path>
                            <path
                              d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                              fill="currentColor"></path>
                          </svg>
                  </div>
                  <div class="mx-5">
                    <h4 class="text-2xl font-semibold text-gray-700">8,282</h4>
                    <div class="text-gray-500"> Montants</div>
                  </div>
              </div>

              <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                  <div class="p-3 rounded-full bg-indigo-600 bg-opacity-75">
                                          <svg class="h-8 w-8 text-white" viewBox="0 0 28 30" fill="none"
                                              xmlns="http://www.w3.org/2000/svg">
                                              <path
                                                  d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                                                  fill="currentColor"></path>
                                              <path
                                                  d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                                                  fill="currentColor"></path>
                                              <path
                                                  d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                                                  fill="currentColor"></path>
                                              <path
                                                  d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                                                  fill="currentColor"></path>
                                              <path
                                                  d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                                                  fill="currentColor"></path>
                                              <path
                                                  d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                                                  fill="currentColor"></path>
                                          </svg>
                  </div>
                  <div class="mx-5">
                    <h4 class="text-2xl font-semibold text-gray-700">8,282</h4>
                    <div class="text-gray-500">Total emploi</div>
                  </div>
              </div>
            </div>
              
        </div>
        <div class="flex ">
          <div class="w-2/5 border-r  relative border-gray-300 bg-white shadow ">
            <div  class=" relative">
              <img class="object-cover w-full h-64"  src="https://mapiwee.com/wp-content/uploads/2020/07/Mapiwee-by-Maped-limportance-de-leau-expliqu%C3%A9-aux-enfants.jpeg" alt="">
              <div class="my-2">
                  <span v-if="!isStateChange" @click.stop="isStateChange = true" class="absolute rounded-lg px-3 py-1 top-3 left-3 bg-yellow-500 text-white cursor-pointer  font-semibold ">en cours</span>
                  <select v-else  @change.stop="isStateChange = false" class="outine-none" name="" id="">
                    <option value="">cree</option>
                    <option value="">en attente</option>
                    <option value="">en cours</option>
                    <option value="">en terminer</option>
                  </select>
              </div>
            </div>
            <div>
              <h1 class="text-lg uppercase p-4 font-bold bg-white ">Projet de recyclage des eaux du benin</h1>
            </div>
            <div style="height:50vh" class="p-4 overflow-auto content border-b border-gray-3 ">
              <h2 class="text-lg font-semibold py-2">Description du projet</h2>
              <p class="text-sm font-semibold  leading-6 text-justify">
                I didn't ask for a completely reasonable excuse! I asked you to get busy!
                Hey, tell me something. You've got all this money. How come you always dress like you're doing your laundry? What are their names? As an interesting side note, as a head without a body, I envy the dead.

                OK, this has gotta stop. I'm going to remind Fry of his humanity the way only a woman can. Say what? Bender, this is Fry's decision… and he made it wrong. So it's time for us to interfere in his life.

                When the lights go out, it's nobody's business what goes on between two consenting adults.
                I videotape every customer that comes in here, so that I may blackmail them later. Ah, the 'Breakfast Club' soundtrack! I can't wait til I'm old enough to feel ways about stuff! Tell them I hate them.

                All I want is to be a monkey of moderate intelligence who wears a suit… that's why I'm transferring to business school!
                Fry, you can't just sit here in the dark listening to classical music. I've been there. My folks were always on me to groom myself and wear underpants. What am I, the pope? Oh, all right, I am. But if anything happens to me, tell them I died robbing some old man.

                Fry! Stay back! He's too powerful! Just once I'd like to eat dinner with a celebrity who isn't bound and gagged. Who's brave enough to fly into something we all keep calling a death sphere? Who am I making this out to?

                Oh right. I forgot about the battle. Have you ever tried just turning off the TV, sitting down with your children, and hitting them? Large bet on myself in round one. Aww, it's true. I've been hiding it for so long.

                Guards! Bring me the forms I need to fill out to have her taken away! We need rest. The spirit is willing, but the flesh is spongy and bruised. Oh no! The professor will hit me! But if Zoidberg 'fixes' it… then perhaps gifts!

                Pansy. I don't want to be rescued. Oh, how I wish I could believe or understand that! There's only one reasonable course of action now: kill Flexo! You'll have all the Slurm you can drink when you're partying with Slurms McKenzie!

                WINDMILLS DO NOT WORK THAT WAY! GOOD NIGHT! I just want to talk. It has nothing to do with mating. Fry, that doesn't make sense. What kind of a father would I be if I said no? No, just a regular mistake.

                Hello Morbo, how's the family? Ummm…to eBay? Oh dear! She's stuck in an infinite loop, and he's an idiot! Well, that's love for you. Alright, let's mafia things up a bit. Joey, burn down the ship. Clamps, burn down the crew.

                Bender?! You stole the atom. And I'm his friend Jesus. Alright, let's mafia things up a bit. Joey, burn down the ship. Clamps, burn down the crew. You don't know how to do any of those. This is the worst kind of discrimination: the kind against me!
                WINDMILLS DO NOT WORK THAT WAY! GOOD NIGHT!
                Leela, Bender, we're going grave robbing.
                Yes. You gave me a dollar and some candy.
                That's the ONLY thing about being a slave. Goodbye, friends. I never thought I'd die like this. But I always really hoped. Okay, it's 500 dollars, you have no choice of carrier, the battery can't hold the charge and the reception isn't very…

                Your best is an idiot!
                Really?!
                Ask her how her day was.
                Fatal. No, I'm Santa Claus! It's just like the story of the grasshopper and the octopus. All year long, the grasshopper kept burying acorns for winter, while the octopus mooched off his girlfriend and watched TV. But then the winter came, and the grasshopper died, and the octopus ate all his acorns. Also he got a race car. Is any of this getting through to you?

                Yeah, lots of people did. Please, Don-Bot… look into your hard drive, and open your mercy file! Daddy Bender, we're hungry. I've got to find a way to escape the horrible ravages of youth. Suddenly, I'm going to the bathroom like clockwork, every three hours. And those jerks at Social Security stopped sending me checks. Now 'I'' have to pay ''them'!

                You, minion. Lift my arm. AFTER HIM! Man, I'm sore all over. I feel like I just went ten rounds with mighty Thor. Ask her how her day was. Guess again.

                Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium exercitationem sequi aliquid quo maiores voluptatum consequuntur dolorum perspiciatis laborum a!

              </p>
            </div>
            <div style="height:23vh" class="p-4 overflow-auto content border-b border-gray-3">
              <h2 class="text-lg font-semibold py-2">Objectifs globaux</h2>
              <p class="text-sm font-semibold  leading-6 text-justify">
                I didn't ask for a completely reasonable excuse! I asked you to get busy!
                Hey, tell me something. You've got all this money. 
              </p>
            </div>
            <div style="height:23vh" class="p-4 overflow-auto content border-b border-gray-3">
              <h2 class="text-lg font-semibold py-2">Objectifs Spécifiques</h2>
              <p class="text-sm font-semibold  leading-6 text-justify">
                I didn't ask for a completely reasonable excuse! I asked you to get busy!
                Hey, tell me something. You've got all this money. 
              </p>
            </div>
            <div style="height:23vh" class="p-4 overflow-auto content border-b border-gray-3">
              <h2 class="text-lg font-semibold py-2">Risques et hypothèses</h2>
              <p class="text-sm font-semibold  leading-6 text-justify">
                I didn't ask for a completely reasonable excuse! I asked you to get busy!
                Hey, tell me something. You've got all this money. 
              </p>
            </div>
            <div style="height:23vh" class="p-4 overflow-auto content border-b border-gray-3">
              <h2 class="text-lg font-semibold py-2">Cadre logique</h2>
              <p class="text-sm font-semibold  leading-6 text-justify">
                I didn't ask for a completely reasonable excuse! I asked you to get busy!
                Hey, tell me something. You've got all this money. 
              </p>
            </div> 
            <div style="height:23vh" class="p-4 overflow-auto content border-b border-gray-3">
              <h2 class="text-lg font-semibold py-2">Indicateurs</h2>
              <p class="text-sm font-semibold  leading-6 text-justify">
                I didn't ask for a completely reasonable excuse! I asked you to get busy!
                Hey, tell me something. You've got all this money. 
              </p>
            </div>

            <div style="" class="mt-2 mb-4 p-4 absolute bottom-4 left-4 right-4">
              <p class="text-sm border-b border-gray-300 font-semibold py-2 flex justify-between items-center"> 
                <span class="font-bold  ">Montant BN :</span> 
                <span class="text-gray-700">1000000000000</span> 
              </p>
              <p class="text-sm border-b border-gray-300 font-semibold py-2 flex justify-between items-center"> 
                <span class="font-bold">Montant EPM-PRET :</span> 
                <span class="text-gray-700">3000000000000</span>
              </p>
              <div class="text-sm border-b border-gray-300 font-semibold py-2 flex justify-between items-center">
                <span class="font-bold pr-2">Durée :</span> 
                <p class="flex items-center space-x-2">
                
                  <span class="p-2 mr-2  overflow-hidden flex items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline">  
                    <svg class="mr-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;">
                      <path d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm-1 15h-6v-6h6v6zm1-10H5V7h14v2z">
                      </path>
                    </svg>   28-06-2020 
                 </span>
                   au  
                   
                   <span class="p-2 overflow-hidden flex items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline"> 
                     <svg class="mr-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;">
                      <path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zm6-3.586-3.707-3.707 1.414-1.414L11 15.586l4.293-4.293 1.414 1.414L11 18.414zM5 7h14v2H5V7z">
                      </path>
                     </svg>   28-06-2025
                </span>
                </p>  
              </div>
              <p class="text-sm font-semibold py-2 border-b border-gray-300 flex justify-between items-center "> 
                <span class="font-bold">Ville :</span> 
                <span class="text-gray-700">Cotonou</span>
              </p>
            </div>
          </div>
          <div class="w-3/5 border-l  border-gray-300   bg-white shadow ">
            <ul class=" h-72 shadow mb-4 overflow-auto">
                <li class="flex items-center justify-between mb-4 p-2 px-4 bg-gray-100 hover:bg-gray-700 hover:text-gray-100 rounded shadow-md">
                  <div class='bg-indigo-700 self-stretch text-gray-100 py-3 px-2 rounded'>indicateur 1</div>
                  <div>
                    <div class="text-xl">10</div>
                    <div class="text-xs">valeur de base</div>
                  </div>
                  <div>
                    <div class="text-xl">100</div>
                    <div class="text-xs">valeue cible</div>
                  </div>
                  <div>
                    <div class="text-xl text-green-700">58</div>
                    <div class="text-xs">valeur actuel</div>
                  </div>
                  <div>En cours</div>
                </li>
                <li class="flex items-center justify-between mb-4 p-2 px-4 bg-gray-100 hover:bg-gray-700 hover:text-gray-100 rounded shadow-md">
                  <div class='bg-indigo-700 self-stretch text-gray-100 py-3 px-2 rounded'>indicateur 1</div>
                  <div>
                    <div class="text-xl">10</div>
                    <div class="text-xs">valeur de base</div>
                  </div>
                  <div>
                    <div class="text-xl">100</div>
                    <div class="text-xs">valeue cible</div>
                  </div>
                  <div>
                    <div class="text-xl text-green-700">58</div>
                    <div class="text-xs">valeur actuel</div>
                  </div>
                  <div>En cours</div>
                </li>
                <li class="flex items-center justify-between mb-4 p-2 px-4 bg-gray-100 hover:bg-gray-700 hover:text-gray-100 rounded shadow-md">
                  <div class='bg-indigo-700 self-stretch text-gray-100 py-3 px-2 rounded'>indicateur 1</div>
                  <div>
                    <div class="text-xl">10</div>
                    <div class="text-xs">valeur de base</div>
                  </div>
                  <div>
                    <div class="text-xl">100</div>
                    <div class="text-xs">valeue cible</div>
                  </div>
                  <div>
                    <div class="text-xl text-green-700">58</div>
                    <div class="text-xs">valeur actuel</div>
                  </div>
                  <div>En cours</div>
                </li>
                <li class="flex items-center justify-between mb-4 p-2 px-4 bg-gray-100 hover:bg-gray-700 hover:text-gray-100 rounded shadow-md">
                  <div class='bg-indigo-700 self-stretch text-gray-100 py-3 px-2 rounded'>indicateur 1</div>
                  <div>
                    <div class="text-xl">10</div>
                    <div class="text-xs">valeur de base</div>
                  </div>
                  <div>
                    <div class="text-xl">100</div>
                    <div class="text-xs">valeue cible</div>
                  </div>
                  <div>
                    <div class="text-xl text-green-700">58</div>
                    <div class="text-xs">valeur actuel</div>
                  </div>
                  <div>En cours</div>
                </li>
                <li class="flex items-center justify-between mb-4 p-2 px-4 bg-gray-100 hover:bg-gray-700 hover:text-gray-100 rounded shadow-md">
                  <div class='bg-indigo-700 self-stretch text-gray-100 py-3 px-2 rounded'>indicateur 1</div>
                  <div>
                    <div class="text-xl">10</div>
                    <div class="text-xs">valeur de base</div>
                  </div>
                  <div>
                    <div class="text-xl">100</div>
                    <div class="text-xs">valeue cible</div>
                  </div>
                  <div>
                    <div class="text-xl text-green-700">58</div>
                    <div class="text-xs">valeur actuel</div>
                  </div>
                  <div>En cours</div>
                </li>
              </ul>
              <div class="grid mt-6 shadow gap-2 grid-cols-2">
                  <div class="bg-white shadow ">
                      <apexchart type="radar" height="350" :options="chartOptions" :series="chartOptions.series"></apexchart>
                  </div>
                  <div class="bg-white flex items-center relative shadow "> 
                    <span class="absolute left-3 top-1 text-sm font-bold ">Taux de decaissement</span>
                    <div class="">
                      <apexchart type="pie" height="350" :options="chartOptions2" :series="chartOptions2.series"></apexchart>
                    </div>
                  </div> 
              </div>
            <div class="block w-full h-72 mt-4 mb-4 overflow-auto">
                <table class="items-center relative w-full bg-transparent border-collapse">
                  <thead class="relative">
                    <tr class="h-5 z-10 sticky top-0">
                      <th class="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Composantes</th>
                      <th class="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Nombre d'activites</th>
                      <th class="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">Taux</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="text-gray-700 dark:text-gray-100">
                      <th class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">Composante 1</th>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">45</td>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div class="flex items-center">
                          <span class="mr-2">70%</span>
                          <div class="relative w-full">
                            <div class="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                              <div style="width: 70%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"></div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>

                    <tr class="text-gray-700 dark:text-gray-100">
                      <th class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">Composante2</th>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">12</td>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div class="flex items-center">
                          <span class="mr-2">40%</span>
                          <div class="relative w-full">
                            <div class="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                              <div style="width: 40%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>

                    <tr class="text-gray-700 dark:text-gray-100">
                      <th class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">Composante2</th>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">12</td>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div class="flex items-center">
                          <span class="mr-2">40%</span>
                          <div class="relative w-full">
                            <div class="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                              <div style="width: 40%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr class="text-gray-700 dark:text-gray-100">
                      <th class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">Composante2</th>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">12</td>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div class="flex items-center">
                          <span class="mr-2">40%</span>
                          <div class="relative w-full">
                            <div class="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                              <div style="width: 40%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr class="text-gray-700 dark:text-gray-100">
                      <th class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">Composante2</th>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">12</td>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div class="flex items-center">
                          <span class="mr-2">40%</span>
                          <div class="relative w-full">
                            <div class="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                              <div style="width: 40%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>




                    <tr class="text-gray-700 dark:text-gray-100">
                      <th class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">Composante 3 </th>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">4</td>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div class="flex items-center">
                          <span class="mr-2">45%</span>
                          <div class="relative w-full">
                            <div class="overflow-hidden h-2 text-xs flex rounded bg-pink-200">
                              <div style="width: 45%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"></div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr class="text-gray-700 dark:text-gray-100">
                      <th class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">Composante 5</th>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">5</td>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div class="flex items-center">
                          <span class="mr-2">60%</span>
                          <div class="relative w-full">
                            <div class="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                              <div style="width: 60%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"></div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr class="text-gray-700 dark:text-gray-100">
                      <th class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">Composante</th>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">16</td>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div class="flex items-center">
                          <span class="mr-2">30%</span>
                          <div class="relative w-full">
                            <div class="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                              <div style="width: 30%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-700"></div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div class="my-4">  
               <div>
                  <apexchart type="line" height="350" :options="chartOptions1" :series="chartOptions.series"></apexchart>
                </div> 
              </div>
              <div class="p-3">
                <titre>Dernieres Suivi </titre>
                <div class="my-3">
                  <vtable :headers="headers" :datas="dataTable" :actions="actions" @supprimer="supprimer" @modifier="modifier"></vtable> 
                </div>
              </div>  
          </div>
        </div>

        <div  class="text-center mt-6  mb-8 text-5xl   font-semibold " >
          <div id='map' style="height:600px" class='map w-full'></div>
        </div>

      </div>
  
    </div>
  </dashboard>
 
</template>

<script>
import SearchBar from '@/components/SearchBar'
import Titre from '@/components/Titre'
import Vtable from '@/components/Vtable'
import Vform from '@/components/Vform'
import Vmodal from '@/components/Vmodal'
import Dashboard from '@/layouts/Dashboard'

export default {
  components: {
    Vtable,
    Dashboard,
    Vmodal,
    Vform,
    Titre,
    SearchBar,

  },
  data() {
    return {
      isStateChange:false,
      showModal:false,
      champsRecherche:[
          {name:'Date debut',type:'date',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,},
          {name:'Date fin',type:'date',placeholdere:"",isSelect:false,isTextArea:false,data:'',required:true,},
        ],
        cols:2,
      chartOptions1: {
            chart: {
              height: 350,
              type: 'line',
              zoom: {
                enabled: false
              }
            },
            chart: {
              height: 350,
              type: 'line',
              zoom: {
                enabled: false
              }
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'straight'
            },
            title: {
              text: "Taux d'execution ",
              align: 'left'
            },
            grid: {
              row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
              },
            },
            xaxis: {
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            }
      },
      chartOptions2: {
            series: [44, 55, 13, 43, 22],
            chart: {
              width: 380,
              type: 'pie',
            },
            labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
           
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
      },
      chartOptions: {
        series: [{
        name: 'Series 1',
        data: [80, 50, 30, 40, 100, 20],
      }],
      chart: {
        height: 350,
        type: 'radar',
      },
       title: {
          text: "Taux d'execution ",
          align: 'left'
        },
      xaxis: {
         categories: ['January', 'February', 'March', 'April', 'May', 'June']
      }
      },
          
      headers:[
          {name:'Activite',props:'activite',width:"w-24"},
          {name:'Description',props:'description',width:"w-24"},
          {name:'Budget national',props:'bn',width:"w-28"},
          {name:'Pret',props:'emp_pret',width:"w-28"},
          {name:'Poids',props:'poids',width:"w-40"},
          {name:'Structure responsable',props:'struct_responsable',width:"w-36"},
          {name:'Structure associé',props:'struct_asso',width:"w-36"},
          {name:'Status',props:'status',width:"w-36"},
          {name:'Date de creation',props:'created_at',width:"w-24"},
         
      ],
      dataTable:[
        {activite:'activite',description:'lorem',bn:'5555555555555',emp_pret:'600000000',poids:'5',struct_responsable:'agetur',struct_asso:'Neant',status:'en cours',created_at:"22-06-2022"},
        {activite:'activite2',description:'lorem',bn:'5555555555555',emp_pret:'600000000',poids:'5',struct_responsable:'agetur',struct_asso:'Neant',status:'en cours',created_at:"22-06-2022"},
        {activite:'activite3',description:'lorem',bn:'5555555555555',emp_pret:'600000000',poids:'5',struct_responsable:'agetur',struct_asso:'Neant',status:'en cours',created_at:"22-06-2022"},
        {activite:'activite4',description:'lorem',bn:'5555555555555',emp_pret:'600000000',poids:'5',struct_responsable:'agetur',struct_asso:'Neant',status:'en cours',created_at:"22-06-2022"},
        {activite:'activite5',description:'lorem',bn:'5555555555555',emp_pret:'600000000',poids:'5',struct_responsable:'agetur',struct_asso:'Neant',status:'en cours',created_at:"22-06-2022"}

          
          
      ],
      actions:[
        {name:'modifier',iconne:''},
        {name:'supprimer',iconne:''},
      ],

    }
  },
  mounted() {
    var map = tt.map({
      key: '0sJaQAQga6Y8A6ZOclM8AU6RqAhetXr7',
      container: 'map',
      
    });
    map.addControl(new tt.FullscreenControl());
    map.addControl(new tt.NavigationControl());
  }

}
</script>

<style>

</style>