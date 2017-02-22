---
layout: post
title: No more loop in Javascript
tags: ["Javascript", "Functional Programming"]
lang: en
---

Few months ago, I start moving my Javascript code from a Oriented Object code to something close to Functional Programming.
In this paradigm, I found interesting concepts such as immutability and high order functions...

And few days ago, colleague submit a pull request with a javascript loop. And I suddenly remember how far was my last loop in Javascript.

Let's start from the beginning. With the following datas:

```js
var heros = [
  { name: 'Wolverine',      family: 'Marvel',    isEvil: false },
  { name: 'Deadpool',       family: 'Marvel',    isEvil: false },
  { name: 'Magneto',        family: 'Marvel',    isEvil: true  },
  { name: 'Charles Xavier', family: 'Marvel',    isEvil: false },
  { name: 'Batman',         family: 'DC Comics', isEvil: false },
  { name: 'Harley Quinn',   family: 'DC Comics', isEvil: true  },
  { name: 'Legolas',        family: 'Tolkien',   isEvil: false },
  { name: 'Gandalf',        family: 'Tolkien',   isEvil: false },
  { name: 'Saruman',        family: 'Tolkien',   isEvil: true  }
]

function slugifyHero(hero) {
  return encodeURIComponent(hero.family + '-' + hero.name)
}
```

The goal is to create a new squad of Heros which are good and not from DC Comics. I also want to create a new attribute slug (build from hero family&name).

## The plain old loop way

With a loop the code should be like this:

```js
var heroCount = heros.length
var squadAlpha = []
for (var i=0; i < heroCount; i++) {
  heros[i].slug = slugifyHero(heros[i])
  if (!heros[i].isEvil && heros[i].family !== 'DC Comics') {
      squadAlpha.push(heros[i])
  }
}
```

There is 3 problems here:

* after my loop, my datas are altered. After the loop, heros variable doesn't represent heros anymore. It breaks the S from SOLID.
* this code itsn't thread safe. What happen if you want to use your heros during the loop? With this kind of code, it can be risky to parallelize tasks.
* there is already 2 levels of indentation. Adding a third rule will probably add another level of indentation.

## Array.map and Array.filter to the rescue!

In a few words:

* Array.map: browse an array and apply something;
* Array.filter: filter an array.

Now the same code with this two high order functions:

```js
var sluggedHeros = heros.map(function(hero){
  hero.slug = slugifyHero(hero)
  return hero
})
var squadAlpha = sluggedHeros
  .filter(function(hero){
    return !hero.isEvil
  })
  .filter(function(hero){
    return hero.family !== 'DC Comics'
  })
```

If I don't need `sluggedHeros` outside this part of code, we can also add this to the chain:

```js
var squadAlpha = heros
  .filter(function(hero){
    return !hero.isEvil
  })
  .filter(function(hero){
    return hero.family !== 'DC Comics'
  })
  .map(function(hero){
    hero.slug = slugifyHero(hero)
    return hero
  })
```

## Embrace the power of es6 (or es2015)

First of all it is recommended to drop the `var` keyword in favor of `const`.
Then if you think that anonymous function reduce visibility and are redundant, I've a good new. es6 bring something call arrow functions. Arrow function provide an shortness way to write function.

```js
const squadAlpha = heros
  .filter(hero => {
    return !hero.isEvil
  })
  .filter(hero => {
    return hero.family !== 'DC Comics'
  })
  .map(hero => {
    hero.slug = slugifyHero(hero)
    return hero
  })
```

It's nicer but we can also go deeper with implicit return (drop the curly braces):

```js
const squadAlpha = heros
  .filter(hero => !hero.isEvil)
  .filter(hero => hero.family !== 'DC Comics')
  .map(hero => {
    hero.slug = slugifyHero(hero)
    return hero
  })
```

Now the this code is **trade safe**, the **initial datas aren't altered** and over all: it's **much more readable**.**

**Note:** with arrow function ugly you will also forget this ugly `var self = this`. But don't think that arrow function bind the this! It completely wrong!
In a nutshell, when you write function with the `function` keyword, this function redefine 4 things (this, arguments, new.target and super). With the arrow function, it redefine none of them. That's why `var self = this` isn't necessary anymore.

## Not enough?

I also enjoy [Array.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find). You can use it like this:

```js
// instead of:
let searchedItem
let i = 0
while (typeof searchedItem === 'undefined' && heros[i]) {
  if (heros[i].name === 'Gandalf') {
    searchedItem = heros[i]
  }
  i++
}

const searchedItem = heros.find(h => h.name === 'Gandalf')
```

An other function is always present when we speak about Functional programming & high order function: [Array.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

```js
const squadHeroes = [
  { name: 'Wolverine',      ennemiesKilled: 4  },
  { name: 'Magneto',        ennemiesKilled: 8  },
  { name: 'Charles Xavier', ennemiesKilled: 15 },
  { name: 'Batman',         ennemiesKilled: 16 },
  { name: 'Harley Quinn',   ennemiesKilled: 23 },
  { name: 'Gandalf',        ennemiesKilled: 42 }
];

var totalScore = 0
for (var i=0; i < squadHeroes.length; i++) {
  totalScore += squadHeroes[i].ennemiesKilled
}

var totalScore = squadHeroes.reduce(
  (accumulator, current) => accumulator + current.ennemiesKilled, 0)
```

## Set theory

If you want to deal with unique items, you should use the [Set object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set). It takes an iterable object as a parameter (such as an array). Then to convert a Set to a classic array, we use the [spread operator (...iterable)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator).

```js
const exampleSet = new Set([1, 2, 3, 1])
exampleSet.size // 3. On instantiation, the duplicated entry was removed (here 1)

// To transform a Set object into an array
const exampleArray = [...exampleSet] //[1, 2, 3]
```

Let's take the previous example and see

```js
const heros = [
  { name: 'Wolverine',      family: 'Marvel',    isEvil: false },
  { name: 'Deadpool',       family: 'Marvel',    isEvil: false },
  { name: 'Magneto',        family: 'Marvel',    isEvil: true  },
  { name: 'Charles Xavier', family: 'Marvel',    isEvil: false },
  { name: 'Batman',         family: 'DC Comics', isEvil: false },
  { name: 'Harley Quinn',   family: 'DC Comics', isEvil: true  },
  { name: 'Legolas',        family: 'Tolkien',   isEvil: false },
  { name: 'Gandalf',        family: 'Tolkien',   isEvil: false },
  { name: 'Saruman',        family: 'Tolkien',   isEvil: true  }
];

const tolkienHeros = heros.filter(h => h.family === 'Tolkien')
const evilHeros    = heros.filter(h => h.isEvil === true)

const tolkienHerosSet = new Set(tolkienHeros)
const evilHerosSet    = new Set(evilHeros)
```

![set theory]({{ site.url }}/images/articles/2017/no-more-loop/set-theory.png)

```js
// Union: tolkienHeros ∪ evilHeros
const union = new Set([...tolkienHerosSet, ...evilHerosSet])

// Intersection tolkienHeros ∩ evilHeros (element which are both in tolkienHeros and evilHeros)
const intersection = new Set([...tolkienHerosSet].filter(h => evilHerosSet.has(h)))

// Difference tolkienHeros \ evilHeros (objects from tolkienHeros which are not in evilHeros)
const difference = new Set([...tolkienHerosSet].filter(h => !evilHerosSet.has(h)))
```

Note: if the 2 arrays are built from different API, your object will probably not share the same reference. I mean `tolkienHeros[y] === evilHeros[y]`. In this case, your Set should only contain the object id.
