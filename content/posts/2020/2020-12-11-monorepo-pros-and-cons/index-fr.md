---
title: "Monorepo: est-ce que ça vaut le coup?"
slug: monorepo-pros-and-cons-fr
language: fr
date: 2020-12-22
cover: ./cover.jpg
tags: ['Architecture', 'Git']
unlisted: true
published: false
translations:
  - link: './monorepo-pros-and-cons'
    language: English
    hreflang: en
---


La tendance actuelle est de diviser nos codebases. Ces dernières années, on a vu apparaître des concepts comme microservices, micro-frontends...

Et puis, à contre courant, on voit aussi des entreprises ou des gros projets open-source mettre tout sur un seul repository git. Ce concept architectural c'est les monorepos (ou monorepository).

![mono vs. multiple repository](./mono-vs-multi.png)


Ça va faire pas loin de deux ans maintenant que j’en utilise et maintient un. Cet article est un condensé de ce que j’aime et n’aime pas avec les monorepos.

_Contexte: le monorepo sur lequel je travaille contient ~ 40 packages (npm), principalement des applications vue.js. Toutes ces petites applications font partie d’une plus grande application. Nous avons décidé de diviser une énorme application en plus petites, car la maintenance était devenue ingérable. On est à peu près 15 à travailler sur ce monorepo (pas à plein temps)._

## Avatages

### 🤝 Teamwork

**Favorise les contributions**:  
Lorsque vous avez déjà le code, c'est plus facile de contribuer. Vous n'avez pas besoin de rechercher le repo dans toute l'organisation, de le cloner et de l'installer au préalable.


**Meilleure vue d'ensemble de l'ensemble du système**:  
Une fois cloné, vous avez tout le code source. Vous n'avez donc pas besoin de trouver l'URL du repo, clonez-la.
Un bon vieux ctrl + F suffit.


**Privilégie les grands refactoring**:  
Disons que vous voulez changer quelque chose dans un package utilisé partout ailleurs. Vous pouvez mettre à jour tous les packages en un seul commit!


**Supprimez le code mort en toute confiance**:  
Combien de fois avez-vous voulu supprimer du code, mais vous ne l'avez pas fait parce que vous ne saviez pas si le code était utilisé ailleurs?
C'est un avantage de plus d'avoir tout le code sous la main.


**Source unique de vérité**:  
Le projet sur lequel je travaille avait un nom très étrange pour la branche principale. Et puis un jour on a décidé d’utiliser un autre nom tout aussi étrange pour le remplacer. Certains repos étaient mis à jour et d’autres non.

### 👨‍👩‍👧 Dependencies

**Plus de place sur le disque dur**:  
Si vous êtes familiers avec l’écosystème JavaScript, vous savez probablement que le dossier node_module peut être [extrêmement lourd]((https://www.reddit.com/r/ProgrammerHumor/comments/6s0wov/heaviest_objects_in_the_universe/)). Lorsque nous avions environ 30 applications / packages, cela prenait 12 Go sur le disque dur. Oui, 12 Go! Nous avions des dépendances comme Vue.js installées 30 fois. Heureusement, certains outils (comme yarn) créent un lien symbolique _(symlinks)_ entre les dépendances redondantes lorsque les workspaces sont activés. Grâce à cette fonctionnalité, [nous sommes passés de 12 Go à 1.7 Go](https://twitter.com/_maxpou/status/1263426573379739651).

![dependency-management](./dependency-management.png)
_Note: Je sais que npm 7.0 supporte maintenant les workspaces. Cependant, c'est encore un petit peu tôt et [certaines commandes ne sont pas encore supportées](https://github.com/npm/rfcs/pull/117/files)._

**hot-reload entre les packages**:  
Certains outils lient automatiquement les dépendances locales entre elles. Ce qui signifie que si package-a est utilisé dans package-b, vous pouvez travailler sur package-a et voir le résultat en direct dans package-b.

**Ajouter un package est plus simple**:  
Pour nous, tous nos packages sont dans un dossier `packages`. L'ajout d'un nouveau package est très simple. Pas besoin de paramétrer l'intégration continue (CI) et registry npm, pas besoin de redéfinir les permissions du GitLab... tout est déjà fait!


## Inconvénients

### 🛠 Git & code hosting platforms (GitLab/GitHub...)

**Authorization**:  
Quand on met des permissions de lecture/ecriture sur GitLab/GitHub/etc., c'est generalement pour le repo tout entier. 

**💡 Tip:** You can also create a [CODEOWNERS file](https://docs.gitlab.com/ee/user/project/code_owners.html) to define specific ownership rule.
```md
# .gitlab/CODEOWNERS
packages/app-1 @user1
packages/app-2 @user2
```
*With the example above, if user2 opens a merge request to change app-1, user1 will have to approve it.*


**Git log may become unreadable**:  
If merge requests are merged "as is", with no squashing option (with 10-15 commits), the `git log` will quickly become unreadable, and so unusable.

**💡 Tip:** You can use [conventional commit](git-conventional-commits) and put in parenthesis the name of the package. So if you want to retrieve one old commit, it becomes straightforward.
```bash
# will list all feature added in package-B
git log --all --grep="feat(package-B):"

# or:
git log --all path/to/package-b
```


**Git log peut devenir inutilisable**:  
Si vous avez beaucoup de commits / branches / tags, cela signifie que vous aurez beaucoup d'objets git stockés. git peinera peut-être lorsque vous souhaitez obtenir l'historique (git log/git blame).

**Oubliez vos branches de longue durée**:  
Si la branche principale est la seule source de vérité, vous ne pouvez pas avoir de branche suivante. Si vous souhaitez que certaines fonctionnalités ne soient disponibles que pour un environnement spécifique, je vous recommande d'utiliser des indicateurs de fonctionnalité.

**Repository may become oversized**:  
Le répertoire `.git` a la racine du monorepo va peut-être atteindre quelque Gb.

**💡 Tip:** Voici 2 options si vous souhaitez économiser un peu d'espace disque
  ```bash
  # truncate the history
  git clone --depth 1 <repo-url> 

  # 1. clone un repo vide et sans historique 
  # 2. pull le package desire
  git clone \
    --depth 1 \
    --no-checkout \
    --filter=blob:none \
    <repo-url>
  git checkout main -- packages/package-a
  ```

_Note: Si vous souhaitez en apprendre plus sur le [partial cloning (en anglais)](https://docs.gitlab.com/ee/topics/git/partial_clone.html)._

### 🤖 Continuous Integration (CI)

**Quand c'est cassé, tout le monde est bloqué!**  
Si la branche `main` est marquée en rouge par votre intégration continue, tout le monde est impacté. Vous ne pouvez pas mettre ce problème sous le tapis. Ça doit être traité immédiatement.

**Le dilemme de l'intégration continue**:  
Si les bases de code sont mutualisées, vous avez plus de code. Et plus de code signifie plus de travail pour l'intégration continue (CI) pour des tâches comme les tests, le peluchage, la construction ...

Lorsqu'il s'agit de CI, le temps et la fiabilité sont au cœur du problème. D'une part, vous voulez qu'il soit le plus rapide possible mais, d'autre part, vous voulez qu'il soit fiable. Je veux dire, quand mon CI me donne le feu vert, je suis plus confiant pour fusionner mon travail.

Il peut être tentant de réduire le nombre de colis analysés pour gagner du temps. Mais l'intégration continue perdra son intérêt car elle ne pourra pas repérer une régression «cross-référentiel».

|                                        | Toute la codebase  | Package sélectionné | Packages affecté |
|----------------------------------------|--------------------|---------------------|------------------|
| Build/lint/test vitesse                | 🐌 Lent            | 🚀 Rapide           | 🚗 Normal         |
| detecte cross-packages<br/>regression? | ✅ Oui             | ❌ Non              | ✅ Oui            |
| Facile à mettre en place?              | 😀 Oui             | 😀 Oui              | 😟 Non            |


La 3e option est, à mon avis, la plus viable. Mais vous devrez tout faire manuellement.
Une 4ème option pourrait utiliser des filtres. Les packages étiquetés "importants" utilisent la 1ère stratégie et les autres utilisent la 2ème stratégie.

**💡 Astuces:**
  * Je vous recommande d'ajouter un label spécifique pour shunter la CI. Si vous modifiez une typo dans le README, vous n'avez pas besoin d'exécuter toute une batterie de tests. Ajouter un label "NO_CI" a votre pull request et une condition dans votre script Jenkins/action GitHub/...
  * Si votre pipeline (CI) comporte des tâches parallèles, n'oubliez pas d'activer l'option "fail-fast".


### 🤝 Teamwork

**Changements cachés**:  
Certains repos sont parfois plus "sensibles" que d'autres. Il est facile d'ajouter un petit morceau de code avec un grand impact. Cela peut être problématique si c'est fait par erreur.


**La quantité de code peut être intimidante**:  
La première fois que j'ai "git pull" le code source de Gatsby.js, j'ai extrait l'historique complet d'environ 90 paquets. Au premier coup d'œil, je me sentais dépassé. Parce qu'il m'a fallu des siècles pour cloner le référentiel complet (avec toute l'histoire). Et aussi, parce que la quantité de code était énorme!

Si vous travaillez avec 10% d'une base de code, vous ne vous souciez probablement pas des 90% restants.

## Conclusion

![un monorepo devient pertinent lorsque les packages sont connectés et écrits dans le même langage](./relevant-monorepo.png)

Dans l'ensemble, je pense qu'utiliser un monorepo peut être une bonne chose.

Dans notre cas, cela nous facilite grandement la vie. Tous nos packages font partie de la même grande application et sont écrits dans le même langage. Parce qu'ils font partie de la même application, ils «communiquent entre eux». De plus, nous sommes une équipe à taille humaine qui y travaille.
En