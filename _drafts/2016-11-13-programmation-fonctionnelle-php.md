---
layout: post
title: PHP et Programmation fonctionnelle
tags: ["PHP", "Functional Programming"]
image:
    feature: articles/functional-php/banner.png
---

Depuis quelques temps déjà, j'entends de plus en plus parler d'un autre paradigme de programmation: la **programmation fonctionnelle** (*PF*). Pourtant ce concept n'est pas tout neuf, puisqu'il remonte même au siècle dernier. L'idée ici n'est pas de vous faire une introduction à la programmation fonctionnelle, beaucoup d'articles/conférences sur la toile le font très bien. Je vais plutôt de reprendre des concepts clefs de la PF et de voir ce que l'on peut en faire avec PHP.

Si vous n'en avez jamais entendu parler, voici ce que vous devez retenir :

* C'est que c'est un autre paradigme de programmation, tout comme l'est la Programmation Orientée Objet (POO). Ça peut sembler rebutant au premier abord... mais souvenez-vous qu'au début, le polymorphisme, l'héritage... n'étaient que de vilains gros mots !
* Ces deux paradigmes ne sont pas incompatibles entre eux.
* On prévilégie l'évaluation de fonctions pour éviter les changements d'état.
* Adopter un style fonctionnel réduit le nombre de bugs potentiels et diminue les effets de bord. Ça améliore donc potentiellement la qualité du code.


## Immutabilité (ou immuabilité)

Une variable est une valeur qui peut-être amenée à être modifiée dans le temps. Elle va *varier*, en passant d'un état à un autre. Un des concepts clefs de la PF est de supprimer cette notion de temps (d'état) ou du moins, de la minimiser. On va donc parler d'**immutabilité**.

En PHP pour pouvoir accéder à une variable à l'intérieur d'une fonction, il faut que cette variable soit passée en paramètre d'une fonction. Il est aussi possible d'utiliser les variables globales (mais c'est pas bien de faire ça en PHP!).

Ce qui veut dire que si vous tentez d'exécuter ce bout de code:

```php
<?php
$ten = 10;

function someFunction($value)
{
    return $value + $ten;
}

someFunction(12);
```

Un message d'erreur de type notice renverra ceci: **Notice: Undefined variable: ten in myscript.php on line 5**. En effet, la variable `$ten` n'est pas défini dans le scope de la fonction. Avec un langage comme le Javascript, on accède à la variable ten par sa référence à l'intérieur d'une fonction (on peut aussi la modifier). C'est pour celà que les [iife](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression) sont monnaie courante en JS.

Pour accéder à la variable `$ten` à l'intérieur de la fonction, il faudra utiliser le système de Closure (une fonction lambda qui peut accéder à des éléments extérieurs à son scope de création) :

```php
<?php
$ten = 10;

$someFunction = function ($value) use ($ten) {
    $ten = 21;
    return $value + $ten;
};

someFunction(12); // 33
echo $ten;        // 10
```

Note: la variable `$ten` est passée par valeur. Pour la passer par référence, il faut utiliser le symbole **&amp;** comme ceci : `&$ten` lors de la déclaration de la variable dans la fonction. Le `echo $ten` renverra 21 mais surtout, le code perdra son immutabilité.

Vous noterez que c'est sur ce système de closure que s'appuient les frameworks [Silex](http://silex.sensiolabs.org/doc/master/usage.html#example-get-route) et [Laravel](https://laravel.com/docs/5.1/routing#basic-routing) pour leurs systèmes de routing.

## Récursion

Quand il y a dans votre code une notion de parenté qui s'étend à plusieurs niveaux, il peut-être intéressant de créer des fonctions qui s'appelleront elles-même. On va en trouver dans différents cas d'usage: fonction mathématiques (exemple ci-après avec la suite de Fibonacci), la recherche d'un fichier dans un file system... C'est une bonne alternative aux bons vieux while/for bien crades (qui utilisent des variables).

```php
<?php
function fibonacci(int $n): int
{
   return $n < 2 ? $n : fibonacci($n-1) + fibonacci($n-2);
}
```

Notez cependant qu'utiliser la récursion peut s'évérer assez gourmande en ressources si la fonction s'appelle elle-même un très grand nombre de fois. Attention aussi au boucles infinies :) *(une fois sur deux j'oublie le return et c'est la catastrophe!)*

## Fonction de premier ordre et fonction d'ordre supérieur

PHP supporte depuis PHP 5.3 (2009), les fonctions de première classe *(first-class functions)*. Ce qui veut dire que l'on peut attribuer une fonction à une variable. Une fonction d'ordre supérieur *(high order function)* est une fonction qui peut accepter au moins une fonction comme paramètre et/ou retourner une autre fonction.

Exemple:

```php
<?php
$addTen = function($item) {
    return $item + 10;
};
$addTen(32); //42
```

L'intérêt de ce type de fonctions, c'est que vos fonctions seront plus composables, paramétrables et réutilisables (et aussi faciles à tester !).
On pourra aussi facilement les coupler avec des fonctions de type :

* [array_map](http://php.net/manual/en/function.array-map.php) : pour parcourir le tableau et appliquer une transformation à chacun des éléments. Conserve l'ordre et ne supprime pas les valeurs;
* [array_filter](http://php.net/manual/en/function.array-filter.php) : pour supprimer des entrées. Conserve l'ordre et les valeurs;
* [array_reduce](http://php.net/manual/en/function.array-reduce.php) : pour réduire le tableau à une seule valeur.

Exemple:

```php
<?php
$input = [1, 2, 3, 4, 5, 6];
$inputAddTen = array_map($addTen, $input); // [11, 12, 13, 14, 15, 16]
```

Si vous êtes perdus, voici une petite anti-sèche:

<blockquote class="twitter-tweet" data-lang="fr"><p lang="en" dir="ltr">Map/filter/reduce in a tweet:<br><br>map([🌽, 🐮, 🐔], cook)<br>=&gt; [🍿, 🍔, 🍳]<br><br>filter([🍿, 🍔, 🍳], isVegetarian)<br>=&gt;  [🍿, 🍳]<br><br>reduce([🍿, 🍳], eat)<br>=&gt; 💩</p>&mdash; Steven Luscher (@steveluscher) <a href="https://twitter.com/steveluscher/status/741089564329054208">10 juin 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Autre utilisation des fonctions d'ordre supérieur, créer une fonction qui retourne une fonction.

```php
<?php
function greaterThan($n) {
    return function($m) use ($n) {
        return $m > $n;
    };
}

$greaterThan10 = greaterThan(10);
$greaterThan10(11); //true
$greaterThan10(9);  //false
```

Bon par contre **deux points noirs** :

* dans ces fonctions, la position du callback est différente d'une fonction à l'autre : array_filter($array, **$callback**) et array_filter(**$callback**, $array);
* le chaînage n'est pas possible et sa variante n'est vraiment pas sexy :

```php
<?php
$addTen = function($item) {
    return $item + 10;
};
$isEven = function($v) {
    return $v%2 == 0
};

array_map($addTen,
          array_filter([1, 2, 3, 4, 5, 6], $isEven));
```


## Fonctions pures

La notion de pureté est très importante car elle permet d'éviter les effets de bord *(side effects)*. Elle devra donc renvoyer toujours le même lorsqu'on l'appelle avec les mêmes arguments. Elle ne doit donc pas interagir avec des devices d'I/O ou même des éléments mémoire.

```php
<?php
$myNumber = 1;
function add($number)
{
    global $myNumber;
    return $myNumber = $myNumber + $number;
}

add(5); //6
add(5); //11
```

Cette fonction n'est pas pure car elle ne renvoie pas toujours le même résultat pour le même paramètre d'entrée.

```php
<?php
function sum($a, $b)
{
    $logger = $this->get('logger');
    $logger->info('sum', $a, $b);
    return $a + $b;
}

sum(3,7); //10
sum(3,7); //10
```

Cette fonction n'est en effet pas pure car elle interagit avec un élément d'I/O, à savoir : le logger. Bon du coup si on supprime le logger, on peut dire que cette fonction sera pure. Par ailleurs, n'hésitez pas à exploiter pleinement les nouveautés de [PHP 7](http://php.net/manual/en/migration70.new-features.php#migration70.new-features.return-type-declarations) et [PHP 7.1](http://php.net/manual/en/migration71.new-features.php#migration71.new-features.nullable-types) améliorent grandement le typage de fonctions.

Vous l'aurez compris, une fonction pure va de paire avec l'acronyme *KISS (Keep It Simple, Stupid)*. Comme vu dans la partie sur l'immuabilité, PHP nous protège pas mal des effets de bord. Essayez donc au maximum de mettre dans votre code un maximum de fonctions pures et de limiter celles avec des effets de bord. En plus c'est plus facilement testable !  

## Mémoization

L'idée derrière ce concept est de créer un **pseudo cache à l'intérieur même de votre fonction**. Parfois on a des calcul assez important dans une fonction et cette dernière est susceptible d'être rappelée ultérieurement avec les mêmes paramètres. Au lieu de repatienter une seconde fois, la

```php
<?php
$memoMD5 = function ($value) {
    static $cache = [];
    if (isset($cache[$value])) {
        echo "memoize - ";
        return $cache[$value];
    }

    sleep(5);
    $cache[$value] = md5($value);

    return $cache[$value];
};

echo $memoMD5(1); // affiche après ~5s: c4ca4238a0b923820dcc509a6f75849b
echo $memoMD5(2); // affiche après ~5s: c81e728d9d4c2f636f067f89cc14862c
echo $memoMD5(1); // affiche après ~0s: memoize - c4ca4238a0b923820dcc509a6f75849b
```

## Conclusion

Je n'ai pas abordé tous les concepts de la PF dans ce billet de blog. Sachez néanmoins qu'il existe des solutions qui implémentent les concepts de [monad](https://github.com/ircmaxell/monad-php), [currying](https://github.com/matteosister/php-curry)...

PHP n'est pas vraiment le meilleure langage qui se prête à la programmation fonctionnelle. Ecrire avec un style fonctionnel ne sera pas aussi propre à lire qu'en JavaScript (surtout depuis ES6) ou Scala. Mais ce n'est pas pour autant qu'il faut le laisser de côté ce paradigme.

Par exemple, entre ces deux exemples, je préfère de loin celui qui adopte un style fonctionnel :

```php
<?php
$input = [1, 2, 3, 4, 5, 6];

// style procédural
$odds = [];
for($i=0; $i < count($input); $i++) {
    if($input[$i] % 2 != 0) {
        $odds[] = $input[$i];
    }
}

// style fonctionnel
$odds = array_filter($input, function($v) {
    return $v % 2 !== 0;
});
```

**Mais pourquoi est-ce si étranger en PHP ?**  

Adopter un style fonctionnel est nécessaire dans un langage où les zones mémoires peuvent-être partagées. C'est d'ailleurs pour celà que l'immutabilité et la pureté des fonctions est si primordiale.  
PHP a été conçu pour afficher des pages web en un temps inférieur à 1s. Une fois que la page est chargée, toute la mémoire qui a été nécessaire pour afficher la page disparaît. On est dans une **Share Nothing Architecture**, ce qui veut dire que chaque processus qui est chargé d'afficher une page en PHP ne va pas partager sa mémoire avec un autre (pas comme en Java où certains threads partagent de la mémoire).  
C'est pour ces raisons que l'on entend si peu parler de Programmation Fonctionnelle en PHP.
