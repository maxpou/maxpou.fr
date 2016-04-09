---
layout: post
title: La qualité logicielle et les trois petits cochons
description: ""
tags: ["Qualité logicielle", "Gestion de projet"]
image:
    feature: articles/software-quality-3-little-pigs/intro.jpg
    credit: Phil Wilson
    creditlink: http://www.artrep1.com/2014/01/three-little-pigs-picture-book-by-phil-wilson/
---

# La qualité logicielle et les trois petits cochons

Il y a quelques semaine, j'ai eu affaire à une situation un peu particulière à mon travail. Pendant le standing-up matinal, mon chef m'a fait remarquer que mes tickets avançaient moins qu'un autre collègue.
Bon rien de bien méchant en soi, nous n'avons pas tous la même vélocité à *pisser des lignes de codes*. Là où la réflexion est vexante, c'est que si mes tickets avancent si lentement, c'est que je passe une bonne partie de mon temps à repasser derrière le bon élève qui avance *visiblement* plus vite que moi.  
En retournant à mon bureau, je me suis souvenu de cette histoire que l'on me comptait quand j'étais petit : les trois petits cochons...

## The (true?) story

**[Attention spoil !]**  
Ce compte raconte l'histoire de trois petits cochons qui doivent construire une maison. Seule contrainte : la maison doit-être assez solide pour résister au "Grand méchant loup". Les trois petits cochons entreprirent alors la construction de leur maison avec différents matériaux. Le premier construisa en un rien de temps une maison en paille. Le second mit un peu plus de temps pour construire sa maison en bois et le dernier construisa sa maison en brique (en un temps plus long).
Vient le "grand méchant loup", qui parvient à détruire les maisons des deux premiers et les dévore (en commençant par la maison en paille, la plus facile). Par contre, il ne vient pas à bout de la dernière maison en brique. Puis, par un habile ruse, le troisième cochon parvient à tuer le grand méchant loup.

![]({{ site.url }}/images/articles/software-quality-3-little-pigs/third-pig.jpg)

Voilà pour l'histoire.  

## Mon rapprochement avec la qualité logicielle

Pour ne pas se faire dévorer, notre premier cochon aurait pu construire une 2e maison en paille pour s'y abriter le temps que le loup reprenne son souffle. Mais vous vous imaginez bien, qu'à force, il aurait dépensé plus de temps et donc d'énergie à maintenir sa maison debout.

Revenons maintenant à nos moutons... euh non, à nos cochons ! Ici, les 3 petits cochons sont des développeurs et le grand méchant loup est un mixte entre la dette technique, les bugs, votre concurrent qui veut vous piquer le projet...  
A l'instar des petits cochons, nous développeurs, nous aussi nous sommes des constructeurs. Nous bâtissons des applications avec plus ou moins de soins et ce, plus ou moins de temps. Et aussi, nous ne sommes pas sans savoir que le grand méchant loup rôde dans les parages.  

**Quoi que l'on fasse, il va chercher à nous dévorer tout cru.**  

![Velocité, temps et qualité]({{ site.url }}/images/articles/software-quality-3-little-pigs/velocity-time-quora.png)

Et bien dites-vous qu'en termes de qualité logicielle, c'est exactement pareil. Si vous n'en avez rien à faire de la qualité de votre code, votre application sera de moins en moins maintenable. Et, viendra un moment où vos devis atteindront de tels sommets, que vous aurez perdu toute crédibilité. Alors, certes on peut avoir l'impression que le développeur est bon parce qu'il enchaîne les tickets. Mais, dites-vous bien que vous ne voyez probablement que le sommet de l'iceberg.

![](http://www.les-traducteurs-agiles.org/assets/organisation_compte/badLibrary.jpg)

Tenez par exemple, on pourrait dire que cette librairie est rangée. Pourtant, je n'aimerai pas être celui à qui on demande d'aller chercher un livre !


## Les clefs du succès

> Codez toujours en pensant que la personne qui maintiendra votre code est un violent psychopathe qui sait où vous habitez.  
— **Martin Golding**

Si vous cherchez la solution miracle, sachez qu'il existe quelques outils : certains vont s'assurer du bon respect des normes (du framework, langage), d'autres vont détecter le bon respect des règles de Clean Code (complexité cyclomatique, NPATH, nombre de lignes dupliquées, commentaires...), test unitaires/comportementaux/singe...

En complément de ces outils, il existe quelques principes :

* **KISS** *(Keep It Simple Stupid)* : ne dit-on pas que les explications les plus simples sont les plus claires ? Pondre du code archi-compliqué pour prouver aux autres que c'est vous la boss ne sert à rien. Si vous doutez encore, rappelez-vous ce que disait Leonardo da Vinci :
> "La simplicité est la sophistication ultime."

* **DRY** *(Don't Repeat Yourself)* ou son homologue DIE *(Duplication Is Evil)*. Que dire de plus ? Si vous vous répétez, c'est qu'il y a un problème. Il faut donc (re-)factoriser !
* **YAGNI** *(You Ain't Gonna Need It/Vous n'en aurez pas besoin)* Si la fonctionnalité n'est pas dans les specs ça ne sert à rien de la rajouter. L'objectif principal est de faire ce que vous avez à faire et dans les temps. S'il y a du temps en plus, blindez plutôt vos tests.  
Se dire que ça servira plus tard est une erreur à mon sens. Le développeur passera du temps à développer, maintenir, tester et documenter une fonctionnalité non demandée et sur un temps imputé au projet. Si votre application est parfaite, sans bugs... pourquoi pas jouer Madame Irma. Sinon vous tendez une belle perche à votre client pour qu'il vous décrédibilise.

Maintenir un code de qualité est un travail qui se fait quotidiennement. Si vous laissez une qualité médiocre s'installer, le développeur va moins prendre soin de l'application. On appelle aussi ça la **[théorie de la vitre brisée](https://fr.wikipedia.org/wiki/Hypoth%C3%A8se_de_la_vitre_bris%C3%A9e)**. Pour y remédier, appliquez la règle du boy scout : *"laissez la place plus propre que ce que vous avez trouvé"*.



## Le bon et le mauvais testeur, ou comment bien placer le curseur

![]({{ site.url }}/images/articles/software-quality-3-little-pigs/Quick-room-cleaning-curtain.gif)

C'est souvent le même débat qui revient sur la table : où placer le curseur entre le laxisme et le fanatisme. Nous avons fait l'erreur une fois de viser les 100% de couverture de code. Ce qui veut dire qu'au moins un test doit passer dans chaque ligne de code. Si vous avez une condition (ex: if/else), un test doit passer dans le if et un autre dans le else.

Au début, nous étions super fier d'avoir nos (presque) 100% de couverture. Il n'y avait -presque- pas eu de résistance lorsque l'on a proposé ceci à l'équipe. En y regardant de plus près, je me suis aperçu que nous avions énormément de tests de ce type :

{% highlight php %}
<?php
$this->client->request('GET', '/api/contenus');
$this->assertEquals(200, $this->client->getResponse()->getStatusCode());
$this->client->request('GET', '/api/contenus?offset=0&limit=10&region=52');
$this->assertEquals(200, $this->client->getResponse()->getStatusCode());
{% endhighlight %}

Pour faire court, voici ce que ces tests vérifient :

* le premier test vérifie que l'API contenu retourne bien un code 200 (donc qu'il n'y a pas d'erreur);
* le second test vérifie que la pagination (champs filter/offset) et le filtre de région de l'API contenu renvoie bien un code 200.

Ok l'affichage fonctionne. Mais, qui me dit que l'API renvoie bien les 10 résultats attendus ? Qui me dit que l'API me renvoie bien les occurrences de la région 52 ? Et puis même, qui me dit que l'API me renvoie bien des contenus ? Rien.  
*Cerise sur le sunday*, c'est ces tests qui permettent d'assurer la non régression de fonctionnalités clés, pour ne pas dire : la colonne vertébrale de l'application.

{% highlight php %}
<?php
$this->client->request('GET', '/api/search/google?mock=serverKo');
$this->assertEquals(200, $this->client->getResponse()->getStatusCode());
{% endhighlight %}

Là, parce que le développeur n'a pas réussi à passer dans un if/else, le code a été adapté pour passer les tests. Le développeur a dû modifier *a posteriori* son code pour mocker le résultat et donc que la couverture soit à 100%.

C'est quand j'ai vu ceci que j'ai réalisé que l'**objectif de 100% de couverture de code ne nous garantissait rien du tout**.

> Tester : oui, mais pas comme un con !  
— **Moi**

Ma conclusion personnelle : il vaut mieux tester à fond les fonctionnalités clés de l'application et laisser de côté celles qui sont annexes, plutôt que de faire semblant de tester pour dire que l'on fait des tests.

Si vous ne devez retenir qu'une seule chose : le grand méchant loup n'est pas loin, et il a faim :)
