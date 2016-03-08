---
layout: post
title: Elasticsearch
description: ""
tags: ["Elasticsearch", "Symfony", "PHP"]
---

# Elasticsearch

Elasticsearch est un moteur de recherche libre et open source (licence Apache) basé sur la librairie Lucene. Cette dernière, développée par la fondation Apache, permet de rechercher et d'indexer du texte.

Elasticsearch va vous permettre de rechercher ce que vous voulez rechercher dans application en un temps reccord.
Pour détailler mes dires, voici comment ça a commencé :
On m'a demandé cette semaine de développer la partie recherche d'une application web. Comme Google Search Appliant (GSA pour les intimes) ne pouvait être utilisé, on a décider d'utiliser Elasticsearch. Tout le monde en parle, mais personne dans l'équipe ne l'a utilisé. Je décide donc de partir à l'aventure et d'aller rencontrer la bête. Par mesure de précaution, j'ai annoncé un POC de 1 jour. A midi, le POC était déjà validé. Ce qui est un exploit en soi, compte tenu de la configuration  de nos postes (proxy en carton, pas les droits d'admin sur les postes, que des outils portables...).
Ensuite, on m'a demandé combien de temps, il me fallait pour développer l'API de recherche de l'application (web). Encore une fois, j'ai pris des gants en annonçant 2 à 3 jours. Le soir même, j'étais à 80% de ma tâche.

Tout ça pour dire, Elasticsearch est vraiment simple à mettre en oeuvre.

Bon, maintenant je vais vous prouver que c'est simple à mettre en oeuvre :)


## Pourquoi Elasticsearch ?

SGBD ne sait pas faire :
* scaling (vertical seulement)
* pertinence lors d'une recherche
Obligé de faire les index à la main...

Donc ES parce que c'est facile à configurer, dispose d'une web api pour requêter, scalable


## Installation

Avant tout, vérifiez que java est bien présent sur votre machine (`java -version`). Si ce n'est pas le cas, les ressources se trouvent sur le [site d'Oracle](http://docs.oracle.com/javase/8/docs/technotes/guides/install/install_overview.html).

Ensuite, récupérez l'archive et dézippez-la.
```
curl -L -O https://download.elastic.co/elasticsearch/elasticsearch/elasticsearch-1.7.5.tar.gz
tar -xvf elasticsearch-1.7.5.tar.gz
cd cd elasticsearch-1.7.5/bin
```

Il ne reste plus qu'à lancer l'application : `./elasticsearch` (ou le .bat sur Windows). Une série d'instructions devrait apparaitre à l'écran. Notez qu'à un endroit



## Utilisation

```js
GET http://localhost:9200/contenus/_search?q=artic~&publie:false

{
  "took": ​27,
  "timed_out": false,
  "_shards":{
    "total": ​5,
    "successful": ​5,
    "failed": ​0
  },
  "hits": {
    "total": ​1123,
    "max_score": ​0.2184605,
    "hits": [
      {
        "_index": "contenus",
        "_type": "dossier",
        "_id": "728",
        "_score": ​0.2184605,
        "_source": {
          "titre": "Nobis maiores quis et sint illo.",
          "corps": "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
          "publie": true
        }
      }, {
        "_index": "contenus",
        "_type": "chiffrescles",
        "_id": "95",
        "_score": ​0.2184605,
        "_source": {
          "titre": "1295",
          "corps": "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
          "publie": true
        }
      },
      { /*...*/ },
      { /*...*/ },
      { /*...*/ },
      { /*...*/ },
      { /*...*/ },
      { /*...*/ },
      { /*...*/ },
      { /*...*/ }
    ]
  }
}
```

## Plugin

Head:
Il faut activer CORS : dans elasticsearch.yml, mettre la `propriété http.cors.enabled` à true.
Permet de visualiser les données, de requêter...

Sense (plugin Chrome):
Permet uniquement de requêter. Possède autocomplétion, indique quand le JSON n'est pas bien formé.


## Requêtes de base


```
# Structure de la requête
http://host:port/[index]/[type]/[_action|id]

# Exemple :

## recherche de l'occurence elastic sur tous les types de contenus
http://localhost:9200/contenus/_search?q=elastic

## recherche de l'occurence commençant par elastic sur tous les types de contenus
http://localhost:9200/contenus/article/_search?q=elastic*

## recherche de l'occurence correspondant à peu près à elstic
http://localhost:9200/contenus/article/_search?q=elstic*

## recherche sur une propriete (TODO: Vérifier)
http://localhost:9200/contenus/article/_search?q=publie:true

## Combo !
http://localhost:9200/contenus/_search?q=elastic&publie:true
http://localhost:9200/contenus/article,interview/_search?q=elastic
http://localhost:9200/contenus/_search?q=elas~&publie:true&from:10&size:30
```

Plus d'informations ici : https://www.elastic.co/guide/en/elasticsearch/reference/current/search-uri-request.html

## Requêtes avancées

Quand on fait ça :

```
GET http://localhost:9200/contenus/_search?q=premier article
```

C'est comme faire :

```
POST http://localhost:9200/contenus/_search

{
  "query": {
    "bool": {
      "must": [{
        "query_string": {
          "default_field": "_all",
          "query": "elastic"
        }
      }],
      "must_not": [],
      "should": []
    }
  },
  "from": 0,
  "size": 10,
  "sort": [],
  "aggs": {}
}
```


## Notion de filtre et de requêtable

**Requête** : chaque argument va impacter le score.
Ex : je recherche un article qui a pour titre "bim" et qui a dans son corps "bam" avec comme tag "bingo"

**Filtre*** : va filtrer les résultats.
Ex: l'article doit être publié, la date de création doit-être entre 2014 et 2015.
