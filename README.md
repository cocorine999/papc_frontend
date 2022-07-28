[comment fonctionne la création des ressources]

[Pour la création de CRUD]

[1- créer le services] (=> go to services/modules <- )

[2- créer le module dans le store] (=> go to store/modules <- 
* actions.js
* getters.js
* actions.js
* actions.js
)

[2- créer le module dans le store] (=> go to store/modules <- )


## GUIDE DE PRIS EN MAIN DE L'ARCHITECTURE D'INTEGRATION DE L'API

Le but de cette architecture est de moduler le projet d'une manière qu'il soit lisible et maintenable au fur à mesure que le développement évolue

### DESCRIPTION DE LA STRUCTURE DU PROJET : 
Nous avons à la racine les dossiers

- assets
- components
- layouts
- plugins
- router
- services
- store
- utils
- views
Dans le cadre de ce tutoriel nous allons beaucoup plus nous interressé aux dossiers plugins, services, store, utils et views. C'est à dire expliquer à quoi ils servent et comment les utiliser.

Pour commencer nous allons pas le dossiers et son contenues

- src/plugins:
    
    Le dossier plugins nous permettra de configurer les différents packages/plugins externes qu'on aura à installer. Dans notre cas de figure on eu a installer le plugins axios


- src/services:

    Le dossier services contient les configurations ainsi que les requetes d'envoi api de l'ensemble du projet.

    Dans ce dossier on retrouvre les sous-dossiers :

        -   configs : 
            
            -   api.service.js : Ce fichier contient les requêtes d'appel API de base
            
            -   environment.js : Ce fichier contient les URLs de base


    -   modules

        Ce dossier contient l'ensemble des requetes api liés à chaque module du projet.
        Prenons l'exemple du module projet.service.js, pour ce projet on aura besoin :
            -   charger la liste des projets
            -   créer, modifier, supprimer
            -   charger la liste des composantes
        De ce faite toutes les requetes liées à un module devra être implémenter dans le fichier lié à celui-ci

- src/store:
    Le store est le magasin gestion de l'etat de notre application va nous permettre de redistribuer les données dans l'ensemble des pages du projet


- src/utils:

    Le dossier utils contiendra l'ensemble des fonctions réutilisable de notre projet. Comme vous pouvez le voir il y'a des fonctions de formatage de date, des fonctions d'extraction des données depuis le formulaire, une fonction de génération de cigle en se basant sur les initiaux du string qui sera passé en paramètres, etc.

    Donc si vous créer et utiliser plus d'une fois une fonction dans plusieurs fichier il serait preférable de le créer généralement dans ce dossier afin de pouvoir la réutiliser partout ou vous le souhaiteriez.

### COMMENT PROCEDER POUR METTRE EN PLACE : 

Pour commencer il faut
-   il faut accéder au sous-dossier module du dossier services, ensuite créer un fichier au nom du module puis définir les différentes fonctions d'appel API

- Accéder au sous-dossier module du store et créer un nouveau dossier portant le nom de votre module. Dans le nouveau dossier que venez de créér vous allez créer le fichier index.js ce fichier doit contenir les différents


- Définir les différentes requêtes liées au module dans le 