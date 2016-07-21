---
layout: post
title: Le bon et le mauvais testeur
---

## Le bon et le mauvais testeur, ou comment bien placer le curseur

![]({{ site.url }}/images/articles/software-quality-3-little-pigs/Quick-room-cleaning-curtain.gif)

C'est souvent le même débat qui revient sur la table : où placer le curseur entre le laxisme et le fanatisme. Dans une expérience passée, notre équipe avait fait le choix de viser les 100% de couverture de code. Ce qui veut dire qu'au moins un test doit passer dans chaque ligne de code. Si vous avez une condition (ex: if/else), un test doit passer dans le if et un autre dans le else.

Au début, nous étions super fier d'avoir nos (presque) 100% de couverture. Il n'y avait -presque- pas eu de résistance lorsque l'on a proposé ceci à l'équipe. En y regardant de plus près, je me suis aperçu que nous avions énormément de tests de ce type :

```php
<?php
$this->client->request('GET', '/api/contenus');
$this->assertEquals(200, $this->client->getResponse()->getStatusCode());
$this->client->request('GET', '/api/contenus?offset=0&limit=10&region=52');
$this->assertEquals(200, $this->client->getResponse()->getStatusCode());
```

Pour faire court, voici ce que ces tests vérifient :

* le premier test vérifie que l'API contenu retourne bien un code 200 (donc qu'il n'y a pas d'erreur);
* le second test vérifie que la pagination (champs filter/offset) et le filtre de région de l'API contenu renvoie bien un code 200.

Ok l'affichage fonctionne. Mais, qui me dit que l'API renvoie bien les 10 résultats attendus ? Qui me dit que l'API me renvoie bien les occurrences de la région 52 ? Et puis même, qui me dit que l'API me renvoie bien des contenus et pas des utilisateurs ? **Rien**.  
*Cerise sur le sunday*, c'est ce sont ces tests qui ont permis d'assurer la non régression de fonctionnalités clés,  pour ne pas dire la colonne vertébrale de l'application.

```php
<?php
$this->client->request('GET', '/api/search/google?mock=serverKo');
$this->assertEquals(200, $this->client->getResponse()->getStatusCode());
```

Là, parce que le développeur n'a pas réussi à passer dans un if/else, le code a été adapté pour passer les tests. Le développeur a dû modifier *a posteriori* son code pour mocker le résultat et donc que la couverture soit à 100%. On teste alors un cas qui ne se produira jamais, tout ça pour envisager le cas de figure où un serveur de Google tombe...

C'est quand j'ai vu ceci que j'ai réalisé que l'**objectif de 100% de couverture de code ne me garantissait rien du tout**.

> Tester : oui, mais pas comme un con !  
— **Moi :-)**

Ma conclusion personnelle : il vaut mieux tester à fond les fonctionnalités clés de l'application et laisser de côté celles qui sont annexes, plutôt que de faire semblant de tester pour dire que l'on fait des tests.
