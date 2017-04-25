---
layout: page
title: Projets Open-source
description: "Projet personnels open-source"
share: true
image:
    feature: articles/opensource/bg.png
---

([english version](/project/en/))

# Projets personnels open-source

## Docker-Symfony

Sources du projet : [github.com/maxpou/docker-symfony](https://github.com/maxpou/docker-symfony)

Docker-symfony est une stack complète permettant de faire tourner une application Symfony dans plusieurs conteneurs Docker (PHP7-FPM - NGINX - MySQL - ELK - REDIS) avec docker compose. J'ai rédigé [un article](http://www.maxpou.fr/docker-pour-symfony/) détaillant la démarche qui m'a permis de réaliser cet ensemble.

## Symfony Rest Beer Edition

Sources du projet : [github.com/maxpou/symfony-rest-beer-edition](https://github.com/maxpou/symfony-rest-beer-edition)

La Symfony Rest Beer Edition est une application Symfony 2.8 (LTS) reprenant beaucoup de bonnes pratiques REST pour un projet Symfony :

* Implémentation d'HATEOAS;
* Utilisation des bons verbes HTTP
* Documentation au format Swagger
* Gestion des formulaires...

J'essaye de maintenir un degré de qualité ainsi qu'une couverture de tests assez forte pour ce projet.

## MEAN APISpark Beer

Sources du projet : [github.com/maxpou/mean-apispark-beer](https://github.com/maxpou/mean-apispark-beer)

Ce projet est un POC qui m'a permis de découvrir diverses technologies. Ce projet est décomposé en 3 étapes :

* step 1 : Découverte du Framework AngularJS. Affiche une page permettant de gérer des bières. Les données sont chargées à partir d'un fichier JSON. Elles ne sont pas persistées.
* step 2 : Même application que la step 1 sauf que les données proviennent de la plateforme APISpark (de RESTlet). La persistance est maintenant assurée.
* step 3 : L'application AngularJS est intégrée dans une Stack MEAN (Mongodb, Express, AngularJs & Node.js). Réalisation de tests avec mocha.

## Scotchbox

Source du projet : [github.com/maxpou/scotch-box](https://github.com/maxpou/scotch-box)

Ce projet est un fork [de la box Vagrant](https://box.scotch.io/) réalisée par le site Scotch.io. La plus-value de ce fork réside dans le répertoire 'pimpMyBox' qui apporte quelques customisations.

## analyticsCNIL

Sources du projet : [github.com/maxpou/analyticsCNIL](https://github.com/maxpou/analyticsCNIL)

Certains outils de mesure d'audience web (Piwik, Google Analytics...) utilisent des cookies. Or pour déposer sur les navigateurs des cookies à des fins de tracking, vous devez préalablement obtenir le consentement du visiteur.  
[analyticsCNIL](https://github.com/maxpou/analyticsCNIL) est un plugin Javascript qui génère un bandeau sur une page web indiquant à l'utilisateur que le site utilise des cookies. Le plugin dispose de plusieurs modes :

* 'normal' : le visiteur peut accepter ou refuser le tracking.
* 'minimal' : le visiteur n'a pas d'autres choix que d'accepter. Le tracking commence dès que le visiteur clique sur le bouton.
* 'dontCare' : le bandeau est uniquement présent à titre indicatif. Le visiteur est quand même tracké.

Il est aussi possible de prendre en compte l'option DoNotTrack du navigateur. Si cette option est activée, l'utilisateur ne verra pas le bandeau. Le mode "dontCare" ne tient pas compte de cette option.

## pomodoro-ninja.gadget

Sources du projet : [github.com/maxpou/pomodoro-ninja.gadget](https://github.com/maxpou/pomodoro-ninja.gadget)

Pomodoro-ninja.gadget est un gadget Windows pour Vista et 7 (les widgets n'existent plus sur les versions supérieures à Windows 8). Ce widget vous fournit un timer pour travailler avec la [technique du Pomodoro](http://www.maxpou.fr/productivite-ninja/#la-technique-du-pomodoro).  
