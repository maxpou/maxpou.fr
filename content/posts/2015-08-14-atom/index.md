---
layout: post
title: Atom, un éditeur qui vous veut du bien
description: "Retour d'expérience avec l'éditeur de texte Atom"
slug: atom
date: 2015-08-14
modified: 2016-11-18
tags: ["Atom", "GitHub"]
cover: ./atom-mark.png
---

> [18/11/2016] : ajout de ma configuration perso + quelques plugins  
> [26/08/2015] : ajout de la gestion des favoris  
> [24/11/2015] : l'éditeur est beaucoup plus stable qu'avant

# Atom, un éditeur qui vous veut du bien

## C'est quoi ?

Atom est un éditeur de texte développé par GitHub destiné aux développeurs. Il a été développé avec [Electron](http://electron.atom.io/), un framework permettant de développer des applications cross-platform avec des technologies web, dont le triptyque gagnant : HTML, CSS et JavaScript. Electron fournit un support natif de NodeJS.  
Atom est très proche de SublimeText... vous y trouverez plusieurs points communs (palette de commandes, sélection multiple, plugins, ...).
Si vous utilisiez SublimeText en mode démo, c'est-à-dire, sans payer les $70 de licence, vous aurez un message vous invitant à acheter une licence tous les 10 enregistrements de fichiers. Avec Atom, vous n'aurez pas ce problème vu qu'il est open source ! Vous serez donc en conformité avec la loi (ça ne ferait pas de mal à certaines entreprises).

Si vous êtes toujours là, je vous invite à télécharger cet outil sur [son site officiel](https://atom.io/).

## Quelques packages

A l'instar de Sublime, Atom possède pléthore de packages (plugins).  
Pour installer un packages, tout se fait en ligne de commande. J'ai cherché pendant pas mal de temps la console de l'éditeur... pour finalement comprendre qu'il n'y en avait pas. Il faut passer par le shell de votre OS :-)

Voici la commandes à exécuter pour installer un ou plusieurs package :

`apm install monPackage`  
`apm install monPackage monAutrePackage`

La liste complète des packages disponibles est accessible [sur le site officiel d'Atom](https://atom.io/packages/list?direction=desc&sort=stars).
Mais je vous ai un peu prémâché le travail en vous sélectionnant quelques *must have* packages.

* [Minimap](https://atom.io/packages/minimap) : ajoute une minimap façon SublimeText.
* [file-icons](https://atom.io/packages/file-icons) : ajoute des petites icônes dans la *menubar*
* [highlight-line](https://atom.io/packages/highlight-line) : permet de surligner la ligne courante
* [Sublime-Style-Column-Selection](https://atom.io/packages/sublime-style-column-selection) : permet de faire des sélection rectangulaires façon SublimeText.
* [atom-alignment](https://atom.io/packages/atom-alignment) : aligne votre code.  

Exemple :

```
var a = b;
var ab = c;
var abcd = d;
var ddddd =d;
```

Deviendra (après un ctrl + alt + A) :

```
var a     = b;
var ab    = c;
var abcd  = d;
var ddddd = d;
```

* [docblockr](https://atom.io/packages/docblockr) : va générer la PHPDoc/JSDoc/... comme ci-dessous :
![docblockr](https://i.github-camo.com/75520d0785add27aad25b9111d5fbfe49eb85214/68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f4e696b68696c4b616c6967652f646f63626c6f636b722f6d61737465722f7265736f75726365732f66756e6374696f6e2d74656d706c6174652e676966)


* [linter](https://atom.io/packages/linter) : affiche les erreurs dans votre code.
* [linter-php](https://atom.io/packages/linter-php) : Vous indique vos erreurs PHP (soyez sûrs d'avoir PHP dans votre PATH).
* [linter-phpcs](https://atom.io/packages/linter-phpcs) : PHP CS pour PHP CodeSniffer. Sniffera votre code pour vous dire là où vous n'êtes pas en conformité avec les normes PSR. Fonctionne avec Linter.
* [Emmet](https://atom.io/packages/emmet) : Doit-je le présenter ? ;-)
* [Project Manager](https://atom.io/packages/project-manager) : Permet d'ouvrir rapidement ses projets en cours
* [Material UI](https://atom.io/themes/atom-material-ui) : une UI de type *matérial design*

Et parce que parfois notre métier n'est pas toujours simple, voici un thème pour les nerveux : [Activate Power Mode](https://atom.io/packages/activate-power-mode).  
![](https://i.github-camo.com/b1d03b9b7a9d7dc9a32d1eab307b5378f8c59a7b/68747470733a2f2f636c6f75642e67697468756275736572636f6e74656e742e636f6d2f6173736574732f3638383431352f31313631353536352f31306631363435362d396336352d313165352d386166342d3236356630316663383361302e676966)

## A propos des snippets

De nombreux snippets sont nativement présents dans Atom (exemple : [PHP](https://github.com/atom/language-php/blob/master/snippets/language-php.cson), [JavaScript](https://github.com/atom/language-javascript/blob/master/snippets/language-javascript.cson)). Pour avoir la liste des snippets disponibles, faites la combinaison suivante : Alt + Shift + S.
Vous pouvez aussi créer vos propres snippets (File > Open Your Snippets). Ces snippets sont écrits dans un fichier [CSON](https://github.com/bevry/cson#what-is-cson).

En voici un exemple :

```
'.source.php':
  'var_dump("…");die();':
    'prefix': 'vdie'
    'body': 'var_dump($1);die();$0'
```

Ce snippet transforme l'expression `vdie` en `var_dump();die();` après avoir appuyé sur tab (oui, on est d'accord, on débug plus comme ça en PHP depuis longtemps !). Le *source.php* indique que ce n'est valable que pour les fichier PHP.

Il vous est aussi possible de l'écrire sur plusieurs lignes :

```
'.source.php':
  'var_dump("…");die();':
    'prefix': 'vdie'
    'body': """
        var_dump($1);
        die();P
        $0
        """
```

Si vous le souhaitez, vous pouvez aussi écraser des snippets existants.

## Features natives intéressantes

### Intégration de Git

Je vous l'ai dit plus haut, Atom est un produit créé par GitHub. Donc c'est pas un grande surprise que d'apprendre que les fonctions Git sont présentes nativement. Les plugins [git-time-machine](https://atom.io/packages/git-time-machine) et [merge-conflicts](https://atom.io/packages/merge-conflicts) sont intéressants.  
Mais côté pratique, je préfère de loin utiliser [GitHub Desktop](https://desktop.github.com/) ou bien [SourceTree](https://www.sourcetreeapp.com/) (si vous n'êtes pas sur GitHub).

### Recherche rapide partielle

Comme pour Sublime, Atom propose une recherche partielle. Par exemple, si vous souhaitez utiliser la commande ```Editor: Upper Case```, vous n'êtes pas obligé de tout écrire. Contentez vous simplement de taper ```upca```.
![Recherche rapide partielle](./partial-quick-search.png)

### Markdown preview

Atom permet de prévisualiser vos fichier de syntaxe Markdown.
Pour l'activer : Ctrl + Shift + P > Markdown preview: Toogle
![Markdown preview](./markdown.png)


### Gestion des favoris

Si vous êtes allés sur le répo des packages, vous avez dû voir une petite étoile à côté des packages. Ce chiffre correspond au nombre de favoris. Je vous recommande vous aussi de mettre en favoris les packages que vous appréciez.
Vous pouvez le faire via deux moyens :

* Sur le répository des packages en cliquant sur l'étoile (vous devrez-être connectés avec votre compte GitHub)
* En ligne de commande (possibilité de mettre plusieurs étoiles)

`apm login`  
`apm star linter minimap anotherPackage`  

> Pourquoi faire ?

C'est simple, si un jour vous changez de poste de travail, vous n'aurez qu'à faire :
`apm stars --install` pour installer vos favoris  
`apm stars --user maxpou --install` pour installer les favoris d'un autre utilisateur (les miens dans ce cas présent).  

Pour **lister** les packages favoris d'un autre utilisateur, supprimez l'annotation `--install`.

## Raccourcis claviers

Vous les retrouverez tous dans File > Settings > Keybindings (avec la possibilité de faire des recherches).

`Ctrl + Shift + P` : Affiche palette des commandes  
`Ctrl + P` : Recherche fichier dans le projet  
`Ctrl + R` : Recherche dans la page  
`Ctrl + G + [numéro de ligne]` : Se déplace à la ligne  
`Ctrl + flèche haut/bas` : Déplace la ligne en haut/bas  
`Ctrl + shift + D` : duplique la ligne courante  
`Ctrl + D` : sélectionne une autre occurrence du mot déjà sélectionné  
`Ctrl + /` : Commente la ligne  
`Ctrl + J` : Joint la ligne courante et la suivante  
`Ctrl + C/X (sans sélection)` : Copie/coupe la ligne courante  
`Ctrl + tab` : Change d'onglet  


## Limites

Si Atom a souffert d'horribles latences à son tout début, on peut dire qu'il est beaucoup plus stable aujourd'hui. Cependant, il se peut que l'éditeur ne réponde plus si vous souhaitez ouvrir un fichier trop volumineux (un bon vieux fichier de logs par exemple). Bah oui, ce n'est pas non plus VI !  
![Error](./error.PNG)  

Si vous avez un clavier français et que vous n'arrivez pas à écrire ces caractère "]", "}" et "€", allez dans file > Open Your Keymap.
Un fichier CSON va s'ouvrir. Ajoutez ces quelques lignes ci-dessous et enregistrez (pour surcharger le snippet existant).

```
'atom-workspace atom-text-editor:not([mini])':
  'ctrl-alt-[': 'unset!'
  'ctrl-alt-]': 'unset!'

'atom-workspace atom-pane':
  'ctrl-alt-=': 'unset!'

'atom-workspace':
    'ctrl-alt-e': 'unset!'
```

## Le mot de la Fin

Le passage de SublimeText vers Atom a *presque* été indolore pour moi. Beaucoup de raccourcis claviers, concepts... sont identiques (cas échéant, il vous est possible d'adapter le fichier de keymap).  
La quantité de packages et de thèmes est impressionnante, il y en a pour tous les goûts. A vrai dire, je suis étonné que si peu de mes collègues l'utilisent.  

Et vous, vous en avez pensé quoi de cet éditeur ?

## Bonus : ma conf perso :)

Voir mes [Dotfiles (répo GitHub)](https://github.com/maxpou/dotfiles/tree/master/atom).
