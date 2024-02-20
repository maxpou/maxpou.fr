---
title: 'Utiliser async/await sans bloc try...catch !'
slug: async-await-without-try-catch-fr
language: fr
unlisted: true
date: 2020-05-27
cover: ./cover.jpeg
tags: [JavaScript]
translations:
  - link: '../async-await-without-try-catch'
    language: English
    hreflang: en
---

Lorsque la fonctionnalité `async/await` est sortie avec ECMAScript 2017, ca a littéralement donné un
bons gros coup de boost au promises (promesses). En deux mots, grâce aux fonctions asynchrones
(`async`), on supprime l'effet Pyramid of doom (_a.k.a. Callback hell_) lié aux promises telles
qu'elles avait ete definies en ECMAScript 2015 (ES6). Le code asynchrone est tout de suite plus
facile à lire.

Si votre application utilise des API, je suppose que vous écrivez beaucoup de code comme ceci:

```js
try {
  const response = await http.get('https://api.github.com/users/maxpou')
  // faire quelque chose avec response
} catch (err) {
  // gestion d'erreur
}
```

Mais bon, je n'ai jamais été grand fan des blocs try...catch. Quand je code, **j'essaye de toujours
garder un niveau d'indentation le plus petit possible**. Voyons comment retirer ce bloc.

## Le wrapper

Tout d'abord, on il nous faudra créer un "wrapper". Une fonction utilitaire que l’on placera ensuite
dans un espace partagé. Le voici :

```js
// utils/async-utils.js
export function to(promise) {
  return promise.then(data => [null, data]).catch(err => [err, null])
}
```

Comme vous pouvez le voir, cette fonction retourne un tableau avec plusieurs valeurs possibles:

- `null` **et** la valeur de la promesse resolue;
- l'erreur de la promesse **et** `null`.

Maintenant si on reprend le premier bout de code, on peut retirer le `try...catch` and le remplacer
par :

```js
import { to } from 'utils/async-utils'

const [err, response] = await to(http.get('https://api.github.com/users/maxpou'))

if (err) {
  // gestion d'erreur
}

// faire quelque chose avec response
```

🎉 Et voilà!

## Attention, n'essayez pas de "destructurer"

Dans mon entreprise on utilise énormément ce petit bout de code. Un jour, un de mes collegues a
essaye de
["destructurer"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring)
l’objet response pour economiser une ligne de code :

```js
// ⚠️ this won't works! ⚠️
const [err, { data }] = await to(http.get('https://api.github.com/users/maxpou'))
```

En cas d'erreur, ce code ne marchera pas. On aura dans la console
`Cannot read property 'data' of null`. En effet, si la promesse échoue on retourne l'erreur et
`null`. Et on ne peut pas destructurer cette deuxième valeur, même si on en a pas besoin !
