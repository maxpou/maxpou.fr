---
layout: post
title: Utilisez Redis pour le cache Doctrine
description: ""
tags: ["Symfony", "Doctrine", "Redis"]
image:
    feature: doctrine-cache-redis/header.png
---

# Utilisez Redis pour le cache Doctrine

Dans mon actuelle mission, nous développons une application sous Symfony2 avec Doctrine comme ORM.
Voici grossièrement à quoi ressemble l'architecture globale :

![architecture globale]({{ site.url }}/images/articles/doctrine-cache-redis/architecture.png)

Comme vous le voyez, l'application est dédoublée sur deux serveur distincts qui ont interdiction de se parler, en dehors de la base de données. Nous avons été confrontés à des problématiques de performances qui nous ont contraint d'utiliser le **cache de Doctrine**.

Il faut savoir qu'il y a 3[ types de cache pour Doctrine](http://doctrine-orm.readthedocs.org/en/latest/reference/caching.html) :

* Query Cache
* Result Cache
* Metadata Cache

Si on regarde [la liste des drivers](http://doctrine-orm.readthedocs.org/en/latest/reference/caching.html#cache-drivers), on s'apperçoit qu'il n'est pas évident de mutualiser du cache entre plusieurs serveur (qui ne peuvent communiquer directement ensemble).

C'est là que Redis arrive.

En quelques mots, Redis (pour *REmote DIctionary Server*) est un SGBD **clé-valeur** qui s'inscrit dans la mouvance NoSQL. En plus d'être super simple d'utilisation, il fournit des performances qui feraient palir Usain Bolt (tout est sauvegardé dans le cache). Si vous doutez encore de cette dernière phrase, sachez que [YouPorn](http://highscalability.com/blog/2012/4/2/youporn-targeting-200-million-views-a-day-and-beyond.html), [Stack Overflow](http://nickcraver.com/blog/2016/02/17/stack-overflow-the-architecture-2016-edition/), [Github](https://github.com/blog/530-how-we-made-github-fast)... l'utilisent ;-)

Voici un exemple de fonctionnement :

```sh
> SET name "maxence"
OK
> GET name
"maxence"
> KEYS *
1) "name"
```

## Installation

L'installation de Redis est plutôt simple et se fait en quelques lignes de commande :

```
# download
wget http://download.redis.io/redis-stable.tar.gz
tar xvzf redis-stable.tar.gz
cd redis-stable
make
# install
sudo make install
# start
redis-server
```

Il va ensuite falloir installer les bons bundles :

```
composer require snc/redis-bundle 2.x-dev
composer require predis/predis ^1.0
```

Et on modifie le app/AppKernel.php:

{% highlight php %}
public function registerBundles()
{
    $bundles = array(
        // ...
        new Snc\RedisBundle\SncRedisBundle(),
        // ...
    );
    //...
}
{% endhighlight %}

Dans le config.yml :

{% highlight yml %}
imports:
    - { resource: redis.yml }

# Doctrine Configuration
doctrine:
    dbal:
        #...
    orm:
        auto_generate_proxy_classes: "%kernel.debug%"
        naming_strategy: doctrine.orm.naming_strategy.underscore
        # IMPORTANT!
        auto_mapping: true
        metadata_cache_driver: redis
        query_cache_driver: redis

# redis.yml
snc_redis:
    clients:
        default:
            type: predis
            alias: default
            dsn: redis://1.2.3.4
        doctrine:
            type: predis
            alias: doctrine
            dsn: redis://1.2.3.4
    doctrine:
        metadata_cache:
            client: doctrine
            entity_manager: default
            document_manager: default
        result_cache:
            client: doctrine
            entity_manager: default
        query_cache:
            client: doctrine
            entity_manager: default
{% endhighlight %}

Et voilà !

## Utilisation

Terminé les requêtes inlines dans le controlleur. Vous allez devoir utiliser le <abbr title="Doctrine Query Language">DQL</abbr> ou le QueryBuilder.
{% highlight php %}
public function findBeers()
{
    $query = $this->getEntityManager()
        ->createQuery(
            'select beers from MaxpouBeerBundle:Beers b'
        )
    ;

    $query->useQueryCache(true);
    $query->useResultCache(true);
    $query->setResultCacheLifetime(3600);

    return $query->getResult();
}
{% endhighlight %}

Maintenant, si l'on recharge la page, cette requête ne se fera plus via MySQL mais bien via Redis.
On peut vérifier tout cela en allant sur Redis et en rentrant la commande suivante : `KEYS *`.
Voici ce que l'on va avoir :
```
> KEYS *
1) "[LP\\ArticleBundle\\Entity\\ContenusMedias$CLASSMETADATA][1]"
2) "[809cd863587594a754a7ffda5c2c06ee4640ebe3][1]"
```

La première ligne va contenir les métadata de la classe. La seconde la requête **et** son résultat.
Si vous voulez avoir une clé un peu plus digeste, vous pouvez utiliser cette méthode `$query->setResultCacheId('my_wonderful_key');` ou même faire 1 pierre 3 coups : `$query->useResultCache(true, 3600, 'my_wonderful_key');`.


Pour nettoyer le cache, voici quelques commandes :
```
# Nettoyer cache des queries
php app/console doctrine:cache:clear-query
# Nettoyer cache des metadatas
php app/console doctrine:cache:clear-metadata
# Nettoyer cache des résultats
php app/console doctrine:cache:clear-result
# Vider la base redis
php app/console redis:flushdb
```

## Pour aller plus loin

Si vous voulez expérimenter Redis, le tutoriel interactif : http://try.redis.io/

## Tips

Utiliser les pipes unix avec le redis-cli : `echo  "KEYS *" | ./src/redis-cli | grep beer`
Vérifier le <abbr title="Time To Live">TTL</abbr> d'une clef: `TTL [beer-id-42][1]`
