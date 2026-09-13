---
title: PHP et Programmation fonctionnelle
description: 'Les concepts clefs de la programmation fonctionnelle appliqués à PHP : immuabilité, récursion, fonctions d''ordre supérieur, fonctions pures et mémoïsation.'
tags: ['PHP', 'FunctionalProgramming']
date: 2016-12-11
language: fr
slug: programmation-fonctionnelle-php
cover: ./banner.png
---

Depuis quelque temps, j'entends de plus en plus parler d'un autre paradigme de programmation : la
**programmation fonctionnelle** (ou _PF_ pour les intimes). Bon, je ne vais pas vous faire une
introduction à la programmation fonctionnelle, des
[articles](https://medium.com/@cscalfani/so-you-want-to-be-a-functional-programmer-part-1-1f15e387e536)/conférences
sur la toile le font très bien. L'idée est plutôt de reprendre des concepts clefs et voir ce que
l'on peut en faire avec dans notre merveilleux monde de PHP.

## Immuabilité (ou immutabilité)

Une variable est une valeur qui peut être amenée à être modifiée dans le temps. Elle va _varier_, en
passant d'un état à un autre. Un des concepts clefs de la PF est de supprimer cette notion de temps
(d'état) ou du moins, de la minimiser. On va parler d'**immuabilité**.

Ce qui veut dire, exit les variables à qui on assigne un entier puis un tableau... un peu comme ceci
:

```php
<?php
$wtf  = 10;
$wtf += 5;
// puis plus loin
$wtf  = "cinq";
// et enfin
$wtf  = new Banana();
```

Il en va de même pour les enrichissements de tableaux dans des boucles... pensez **stateless** !

Dans PHP, le support des variables immuables n'est pas dingue-dingue. On va avoir :

- [define](http://php.net/manual/en/function.define.php) : qui associera à un nom une constante au
  moment de l'exécution;
- [const](http://php.net/manual/en/language.oop5.constants.php) : pour les constantes de classe.
  Attention, ces constantes ne peuvent pas être déclarées de manière dynamique (dans un if).

Autant const est intéressante, mais define elle est différente car l'assignation se fait via une
fonction. D'un point de vue personnel, j'ai du mal à m'affranchir du bon vieux `$maVariable`. Donc
une fois que ma variable est assignée, je n'y touche plus (mais rien ne m'assure que c'est vrai).

## Immuabilité et porté des variables

En PHP, la portée d'une variable de s'étend pas jusque dans une fonction. Ce qui veut dire que si
vous tentez d'exécuter ce bout de code:

```php
<?php
$ten = 10;

function someFunction($value)
{
    return $value + $ten;
}

someFunction(12);
```

Un message d'erreur de type notice renverra ceci: **Notice: Undefined variable: ten in myscript.php
on line 5**. En effet, la variable `$ten` n'est pas accessible dans le scope de la fonction (pas
comme en JS!).

Pour accéder à la variable `$ten` à l'intérieur de la fonction, il faudra utiliser le système de
Closure (une fonction lambda qui peut accéder à des éléments extérieurs à son scope de création) :

```php
<?php
$ten = 10;

$someFunction = function ($value) use ($ten) {
    $ten = 21;
    return $value + $ten;
};

echo $someFunction(12); // 33
echo $ten;              // 10
```

Note: la variable `$ten` est passée par valeur. Pour la passer par référence, il faut utiliser le
symbole **&amp;** comme ceci : `&$ten` lors de la déclaration de la variable dans la fonction. Le
`echo $ten` renverra alors 21 mais surtout, le code perdra son immuabilité.

Vous noterez que c'est sur ce système de closure que s'appuient les frameworks
[Silex](http://silex.sensiolabs.org/doc/master/usage.html#example-get-route) et
[Laravel](https://laravel.com/docs/5.1/routing#basic-routing) pour leurs systèmes de routing.

## Immuabilité et Objets

Il n'y a rien de plus facile que de faire évoluer une variable en PHP. Mais qu'en est-il pour nos
objets ?  
Et bien, le concept d'immuabilité n'existe pas non plus en PHP OO. On aurait vite tendance à croire
qu'en mettant un attribut final à une classe et en supprimant les setters, le tour est joué... mais
en PHP, on peut appeler un constructeur autant de fois que l'on veut !

```php
<?php
final class Fruit
{
    private $name;

    public function __construct($name) {
        $this->name = $name;
    }
}
$fruit = new Fruit('Banana');
$fruit->__construct('Kiwi');
```

On pourrait aussi rendre le constructeur privé... mais avec la
[réflexion](http://php.net/manual/en/class.reflectionclass.php) le concept d'immuabilité en OO est
devenu complètement impossible :

```php
<?php
$fruit       = new Fruit('Banana');
$refObject   = new ReflectionObject($fruit);
$refProperty = $refObject->getProperty('name');
$refProperty->setAccessible(true);
$refProperty->setValue($fruit, 'Apple');
```

Bref, l'immuabilité est donc juste une histoire de conventions.

## Récursion

![loop](./loop.gif)

Quand il y a dans votre code une notion de parenté qui s'étend à plusieurs niveaux, il peut-être
intéressant de créer des fonctions qui s'appelleront elles-même. On va en trouver dans différents
cas d'usage : fonctions mathématiques (exemple ci-après avec la suite de Fibonacci), rechercher un
fichier dans un file system... C'est une bonne alternative aux bons vieux while/for bien crades (qui
utilisent des variables).

```php
<?php
function fibonacci(int $n): int
{
    return $n < 2 ? $n : fibonacci($n-1) + fibonacci($n-2);
}
```

Notez cependant qu'utiliser la récursion peut s'évérer assez gourmande en ressources si la fonction
s'appelle elle-même un très grand nombre de fois. Attention aussi aux boucles infinies :) _(une fois
sur deux j'oublie le return et c'est la catastrophe !)_

## Fonction de premier ordre et fonction d'ordre supérieur

PHP supporte depuis PHP 5.3 (2009), les fonctions de première classe _(first-class functions)_. Ce
qui veut dire que l'on peut attribuer une fonction à une variable. Une fonction d'ordre supérieur
_(high order function)_ est une fonction qui peut accepter au moins une fonction comme paramètre
et/ou retourner une autre fonction (callable).

Exemple:

```php
<?php
$addTen = function($item) {
    return $item + 10;
};
$addTen(32); //42
```

L'intérêt de ce type de fonctions, c'est que vos fonctions seront plus composables, paramétrables et
réutilisables (et aussi faciles à tester !). On pourra aussi facilement les coupler avec des
fonctions de type :

- [array_map](http://php.net/manual/en/function.array-map.php) : pour parcourir le tableau et
  appliquer une transformation à chacun des éléments. Conserve l'ordre et ne supprime pas les
  valeurs;
- [array_filter](http://php.net/manual/en/function.array-filter.php) : pour supprimer des entrées.
  Conserve l'ordre et les valeurs;
- [array_reduce](http://php.net/manual/en/function.array-reduce.php) : pour réduire le tableau à une
  seule valeur.

Exemple:

```php
<?php
$input = [1, 2, 3, 4, 5, 6];
$inputAddTen = array_map($addTen, $input); // [11, 12, 13, 14, 15, 16]
```

Si vous êtes perdus, voici une petite anti-sèche:

<blockquote class="twitter-tweet" data-lang="fr"><p lang="en" dir="ltr">Map/filter/reduce in a tweet:<br/><br/>map([🌽, 🐮, 🐔], cook)<br/>=&gt; [🍿, 🍔, 🍳]<br/><br/>filter([🍿, 🍔, 🍳], isVegetarian)<br/>=&gt;  [🍿, 🍳]<br/><br/>reduce([🍿, 🍳], eat)<br/>=&gt; 💩</p>&mdash; Steven Luscher (@steveluscher) <a href="https://twitter.com/steveluscher/status/741089564329054208">10 juin 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Autre utilisation des fonctions d'ordre supérieur : créer une fonction qui retourne une fonction.

```php
<?php
function greaterThan(int $n): callable {
    return function(int $m) use (int $n): boolean {
        return $m > $n;
    };
}

$greaterThan10 = greaterThan(10);
$greaterThan10(11); //true
$greaterThan10(9);  //false
```

Bon par contre **deux points noirs** :

- dans ces fonctions, la position du callback est différente d'une fonction à l'autre :
  array_filter($array, **$callback**) et array_map(**$callback\*\*, $array);
- le chaînage n'est pas possible et sa variante n'est vraiment pas sexy :

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

La notion de pureté est très importante car elle permet d'éviter les effets de bord _(side
effects)_. Elle devra donc renvoyer toujours le même lorsqu'on l'appelle avec les mêmes arguments.
Elle ne doit donc pas interagir avec des devices d'I/O ou même des éléments mémoire.

```php
<?php
$myNumber = 1;
function add($number)
{
    global $myNumber;
    return $myNumber = $myNumber + $number;
}

echo add(5); //6
echo add(5); //11
```

Cette fonction n'est pas pure car elle ne renvoie pas toujours le même résultat pour le même
paramètre d'entrée.

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

Cette fonction n'est en effet pas pure car elle interagit avec un élément d'I/O, à savoir : le
logger. Bon du coup si on supprime le logger, on peut dire que cette fonction est pure. Vous l'aurez
compris, une fonction pure va de pair avec l'acronyme _KISS (Keep It Simple, Stupid)_. Comme vu dans
la partie sur l'immuabilité, PHP nous protège pas mal des effets de bord. Essayez donc au maximum de
mettre un maximum de fonctions pures dans votre code et de limiter celles avec des effets de bord.
Vous gagnerez grandement en testabilité !

Pour les développeurs OO, il faudra aussi éviter de trop jouer avec le `$this`.

## Mémoization

Parfois on a des calculs assez conséquents au sein d'une fonction et cette dernière est susceptible
d'être rappelée ultérieurement avec les mêmes paramètres. C'est à ce moment que le concept de
mémoization entre en jeu. Pour éviter de patienter une deuxième fois pour un calcul déjà fait, il
est possible de créer un **pseudo-cache à l'intérieur même de votre fonction**.

```php
<?php
$memoMD5 = function ($value) {
    static $cache = [];
    if (isset($cache[$value])) {
        echo "memoize - ";
        return $cache[$value];
    }

    sleep(5); //imaginez ici un long calcul
    $cache[$value] = md5($value);

    return $cache[$value];
};

echo $memoMD5(1); // affiche après ~5s: c4ca4238a0b923820dcc509a6f75849b
echo $memoMD5(2); // affiche après ~5s: c81e728d9d4c2f636f067f89cc14862c
echo $memoMD5(1); // affiche après ~0s: memoize - c4ca4238a0b923820dcc509a6f75849b
```

## Le mot de la fin

Je n'ai pas abordé tous les concepts de la PF dans cet article. Sachez qu'il existe des solutions
_full-PHP_ qui implémentent les concepts de [monad](https://github.com/ircmaxell/monad-php),
[currying](https://github.com/matteosister/php-curry)...

PHP n'est pas vraiment le meilleur langage qui se prête à la programmation fonctionnelle. Écrire
avec un style fonctionnel ne sera pas aussi propre à lire qu'en JavaScript (surtout depuis ES6),
Scala, Haskell... Mais ce n'est pas pour autant qu'il faut le laisser de côté ce paradigme.

Par exemple, entre ces deux exemples, je préfère de loin celui qui adopte un style
fonctionnel&nbsp;:

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

Vous améliorerez grandement la qualité de votre en utilisant des variables immuables et des
fonctions pures. La récursion est très utile, même si elle peut s'avérer triviale lors de débug.
Pour le reste, c'est au cas par cas.

**Mais pourquoi est-ce si étranger en PHP ?**

Adopter un style fonctionnel est nécessaire dans un langage où les zones mémoires peuvent être
partagées. C'est d'ailleurs pour celà que l'immuabilité et la pureté des fonctions sont si
primordiales.  
PHP a été conçu pour afficher des pages web en un temps inférieur à 1s. Une fois que la page est
chargée, toute la mémoire qui a été nécessaire pour afficher la page disparaît. On est dans une
**Share Nothing Architecture**, ce qui veut dire que chaque processus qui est chargé d'afficher une
page en PHP ne va pas partager sa mémoire avec un autre (pas comme en Java où certains threads
partagent de la mémoire).  
C'est pour ces raisons que l'on entend si peu parler de Programmation Fonctionnelle en PHP.
