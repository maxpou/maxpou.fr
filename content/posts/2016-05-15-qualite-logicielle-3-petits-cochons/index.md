---
layout: post
title: La qualité logicielle et les trois petits cochons
description: "Un comparatif entre le conte pour enfants et la qualité logicielle"
tags: ["Qualité logicielle", "Gestion de projet"]
slug: qualite-logicielle-3-petits-cochons
date: 2016-05-15
cover: ./intro.jpg
generate-card: false
---

Il y a quelques temps, j'ai eu affaire à une situation un peu particulière à mon travail. Pendant le standing-up matinal, mon chef m'a fait remarquer que mes tickets avançaient moins qu'un autre collègue.
Bon rien de bien méchant en soi, nous n'avons pas tous la même vélocité à pondre des lignes de codes. Là où la réflexion est vexante, c'est que si mes tickets avançaient si lentement, c'est qu'une bonne partie de mon temps était consacrée repasser derrière le bon élève qui avance *visiblement* plus vite que moi. De plus, je suis partisan de faire les choses qu'une seule fois et de les faire bien (même si cela prend plus de temps).
En retournant à mon bureau, je me suis souvenu de cette histoire que l'on me racontait quand j'étais petit : les trois petits cochons...

## The (true?) story

**[Attention spoil !]**  
Ce conte raconte l'histoire de trois petits cochons qui doivent construire une maison. Seule contrainte : la maison doit-être assez solide pour résister au "Grand méchant loup". Les trois petits cochons entreprirent alors la construction de leur maison avec différents matériaux. Le premier construisa en un rien de temps une maison en paille. Le second mit un peu plus de temps pour construire sa maison en bois et le dernier construisa sa maison en brique (en un temps plus long).
Vient le "grand méchant loup", qui parvient à détruire les maisons des deux premiers et les dévore (en commençant par la maison en paille, la plus facile). Par contre, il ne vient pas à bout de la dernière maison en brique. Puis, par un habile ruse, le troisième cochon parvient à tuer le grand méchant loup.

![3e cochon](./third-pig.jpg)

Voilà pour l'histoire.  

## Mon rapprochement avec la qualité logicielle

Pour ne pas se faire dévorer, notre premier cochon aurait pu construire une 2e maison en paille pour s'y abriter le temps que le loup reprenne son souffle. Il aurait pu aussi essayer de mettre des rustines... Mais vous vous imaginez bien, qu'à force, il aurait dépensé plus de temps et donc d'énergie à maintenir sa maison debout, que le 3e.

Revenons maintenant à nos moutons... euh non, à nos cochons ! Pour faire le rapprochement, on va dire que les 3 petits cochons sont des développeurs et le grand méchant loup est un mixte entre : la **dette technique**, les bugs, failles de sécurité, un client concurrent...  
A l'instar des petits cochons, nous développeurs, sommes aussi des constructeurs. On construit des applications avec plus ou moins de soins et ce, en plus ou moins de temps.

![Velocité, temps et qualité](./dev-cost-maintenance.jpg)

Et bien dites-vous qu'en terme de qualité logicielle, c'est exactement pareil. Si vous n'apportez pas ou peu d'attention à la qualité de votre code, vous rendez votre application beaucoup plus vulnérable aux bugs, régressions fonctionnelles, failles... Alors, certes on peut avoir l'impression que le travail est bien fait parce que le développeur enchaîne les tickets. Mais, dites-vous bien, que vous voyez peut-être que le sommet de l'iceberg.

## Les clefs du succès (ou plutôt quelques-unes)

> Codez toujours en pensant que la personne qui maintiendra votre code est un violent psychopathe qui sait où vous habitez.  
— **Martin Golding**

Si vous cherchez la solution miracle, sachez qu'il existe quelques outils : certains vont s'assurer du bon respect des normes (framework et/ou langage), d'autres vont détecter le bon respect des règles de Clean Code (complexité cyclomatique, NPATH, nombre de lignes dupliquées, respect des principes SOLID...), des tests unitaires/comportementaux/singe...

En complément de ces outils, il existe quelques principes :

* **KISS** *(Keep It Simple Stupid)* : ne dit-on pas que les explications les plus simples sont les plus claires ? Et bien c'est pareil pour votre code ! Pondre du code archi-compliqué pour prouver aux autres que c'est vous la boss ne sert à rien.
Si vous doutez encore, rappelez-vous ce que disait Leonardo da Vinci : *"La simplicité est la sophistication ultime."*.

* **DRY** *(Don't Repeat Yourself)* ou son homologue DIE *(Duplication Is Evil)*. Que dire de plus&nbsp;? Si vous vous répétez, vous vous doutez bien qu'il y a un problème quelque part ! Un peu de (re-)factorisation ne fait jamais de mal !
* **YAGNI** *(You Ain't Gonna Need It/Vous n'en aurez pas besoin)* Si la fonctionnalité n'est pas dans les specs ça ne sert à rien de la rajouter (ou bien rajoutez-la dedans !). C'est déjà bien assez difficile de terminer un projet dans les temps, ne rajoutez pas un degré de complexité supplémentaire. En plus des risques d'overengineering, vous allez passer du temps à développer, maintenir, tester et documenter une fonctionnalité non demandée et sans doute inutile.

Maintenir un code de qualité est un travail qui se fait quotidiennement. Si vous laissez une qualité médiocre s'installer, le développeur va moins prendre soin de l'application. On appelle aussi ça la **[théorie de la vitre brisée](https://fr.wikipedia.org/wiki/Hypoth%C3%A8se_de_la_vitre_bris%C3%A9e)**. Pour y remédier, appliquez la règle du boy scout : *"Laissez le campement plus propre que vous ne l'avez trouvé en arrivant"*.  

Si vous travaillez en équipe, ne négligez pas le côté humain de notre métier, mis en avant par certaines pratiques agiles telles que les code reviews, le pair/mob programming...  

Enfin, dernier outil qu'il ne faut pas négliger : **tester (et automatiser) les tests de son application**


Si vous ne devez retenir qu'une seule chose : si vous ne vous préoccupez pas maintenant de la qualité de vos livrables, ça vous reviendra dans les dents puissance 10 (ou plus !). Parfois la dette technique est inévitable (deadline courte/lancement de produit...). Par contre, comme toute dette, vous devrez la rembourser un jour. Et pour être plus serein, prévoyez du temps pour la **rembourser** (c'est pas pour rien que l'on appelle ça une dette). Sinon un autre projet/fonctionnalité supplémentaire viendra se juxtaposer à la date de fin de projet et ce sera fini !
