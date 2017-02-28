---
layout: post
title: No more loop in Javascript
tags: ["Javascript", "Functional Programming"]
lang: en
image:
    feature: articles/2017/no-more-loop/banner.jpg
---

Few months ago, I start moving my Javascript code from a Oriented Object/unorganized code to something much more close to Functional Programming.
In this paradigm, I found interesting concepts such as immutability and high order functions...

And few days ago, colleague submit a pull request with a javascript loop. And I suddenly remember how far was my last loop in Javascript...

Let's start from the beginning, with the following data and a default function:

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

function stringifyHero (hero) {
  var heroStatus = hero.isEvil ? "😈" : "😇"
  return `${heroStatus} ${hero.name} (${hero.family})`
}

// usage
stringifyHero(heros[0]) // "😇 Wolverine (Marvel)"
```

The goal is to create a new squad of Heros which are good and not from DC Comics. I also want to stringify each one.

## The plain old loop way

With a loop the code should be like this:

```js
var heroCount = heros.length
var squadAlpha = []
for (var i=0; i < heroCount; i++) {
  if (!heros[i].isEvil && heros[i].family !== 'DC Comics') {
      heros[i]['tostring'] = stringifyHero(heros[i])
      squadAlpha.push(heros[i])
  }
}
```

There is 3 problems here:

* after my loop, my datas are altered. After the loop, heros variable doesn't represent heros anymore. It breaks the S from SOLID.
* this code itsn't thread safe. What happen if you want to use your heros during the loop? With this kind of code, it can be risky to parallelize tasks.
* there is already 2 levels of indentation. Adding a third rule will probably add another level of indentation.

We call this approach: **imperative programming**. We explicitly declare **how** to get what we want, step by step.  
By opposition of this approach, we have the **declarative programming**. It consists in focusing on the **what**, without specifying how to get it...

## Array.map and Array.filter to the rescue!

In a few words:

* [Array.map](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/map): browse an array and apply on each element;
* [Array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter): filter an array.

Now the same code with this two high order functions:

```js
var squadAlpha = heros
  .filter(function(hero){
    return !hero.isEvil
  })
  .filter(function(hero){
    return hero.family !== 'DC Comics'
  })
// [Object, Object, Object, Object, Object]

var squadAlphaStr = squadAlpha.map(function(hero){
  return stringifyHero(hero)
})
//["😇 Wolverine (Marvel)", "😇 Deadpool (Marvel)", "😇 Charles Xavier (Marvel)", "😇 Legolas (Tolkien)", "😇 Gandalf (Tolkien)"]
```

If I don't need `squadAlpha` variable, we can chain everything:

```js
var squadAlphaStr = heros
  .filter(function(hero){
    return !hero.isEvil
  })
  .filter(function(hero){
    return hero.family !== 'DC Comics'
  })
  .map(function(hero){
    return stringifyHero(hero)
  })
// ["😇 Wolverine (Marvel)", "😇 Deadpool (Marvel)", "😇 Charles Xavier (Marvel)", "😇 Legolas (Tolkien)", "😇 Gandalf (Tolkien)"]
```

Now hero object isn't changed and herosExtended is a copy of hero which contain a new property.

## Embrace the power of ES6 (or es2015)

First of all, [it is recommended](https://medium.com/javascript-scene/javascript-es6-var-let-or-const-ba58b8dcde75#.vr0mzbszd) to drop the `var` keyword in favor of `const`.  
Then, if you think that anonymous function reduce visibility and are redundant, I've a good new! ES6 bring something call [Arrow functions](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions), a shortness way to write functions.

```js
const squadAlphaStr = heros
  .filter(hero => {
    return !hero.isEvil
  })
  .filter(hero => {
    return hero.family !== 'DC Comics'
  })
  .map(hero => {
    return stringifyHero(hero)
  })
// ["😇 Wolverine (Marvel)", "😇 Deadpool (Marvel)", "😇 Charles Xavier (Marvel)", "😇 Legolas (Tolkien)", "😇 Gandalf (Tolkien)"]
```

It's nicer but we can also go deeper with implicit return (drop the curly braces):

```js
const squadAlphaStr = heros
  .filter(hero => !hero.isEvil)
  .filter(hero => hero.family !== 'DC Comics')
  .map(hero => stringifyHero(hero))

// ["😇 Wolverine (Marvel)", "😇 Deadpool (Marvel)", "😇 Charles Xavier (Marvel)", "😇 Legolas (Tolkien)", "😇 Gandalf (Tolkien)"]
```

Now the this code is **trade safe**, the **initial datas aren't altered** and over all: it's **much more readable**. ❤️️

**Note:** with arrow function you will also forget this ugly hack: `var self = this`.
In fact, it did not bind the this. When you write function with the `function` keyword, this function redefine 4 things (this, arguments, new.target and super). With the arrow function, it redefine none of them.

## Not enough?

### Array.find

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
// Object {name: "Gandalf", family: "Tolkien", isEvil: false}
```

### Array.reduce

An other function is always present when we speak about Functional programming & high order function: [Array.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

```js
const squadHeroes = [
  { name: 'Wolverine',      family: 'Marvel',    ennemiesKilled: 4  },
  { name: 'Magneto',        family: 'Marvel',    ennemiesKilled: 8  },
  { name: 'Charles Xavier', family: 'Marvel',    ennemiesKilled: 15 },
  { name: 'Batman',         family: 'DC_Comics', ennemiesKilled: 16 },
  { name: 'Harley Quinn',   family: 'DC_Comics', ennemiesKilled: 23 },
  { name: 'Gandalf',        family: 'Tolkien',   ennemiesKilled: 42 }
]

// before
let squadScore = 0
for (let i=0; i < squadHeroes.length; i++) {
  squadScore += squadHeroes[i].ennemiesKilled
}

// after
const totalScore = squadHeroes.reduce(
  (accumulator, current) => accumulator + current.ennemiesKilled, 0)
```

An other use case, a bit less know, is to create custom objects from Array.reduce:

```js
const squadFamilies = squadHeroes.reduce((accumulator, current) => {
  if (typeof accumulator[current.family] === 'undefined') {
    accumulator[current.family] = 1
  } else {
    accumulator[current.family]++
  }
  return accumulator
}, {}) // Object {Marvel: 23, DC_Comics: 2, Tolkien: 1}
```


### Array.sort

Then sorting an array is also common in JS. In this case, we use [Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).

```js
const squadHeroesSortedByName = squadHeroes
  .sort((currentHero, nextHero) => currentHero.name > nextHero.name)
```

## Array and Immutability

It isn't recommended to alter the original object. But if we need to update it (add a property for instance), you should work with **a copy** of this object, to keep the original one immutable.
[Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) is fine for cloning, and it works like this:

```js
var originalObj = { prop: 1 }
var copy = Object.assign({}, originalObj)
obj.prop = 42
console.log(copy)    // { prop: 1 }
originalObj === copy // false
```

So in our case, adding a new property will produce a code like this (we need to copy each object):

```js
const herosExtended = heros
  .map(hero => Object.assign({}, hero))
  .map(hero => {
    hero.toStr = stringifyHero(hero)
    return hero
  })
```

## Set theory: union (∪), intersection (∩) and difference (∖)

If you want to deal with unique items, you should use the [Set object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set). It takes an iterable object as a parameter (such as an array). Then to convert a Set to a classic array, we use the [spread operator (`...iterable`)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator).

```js
const exampleSet = new Set([1, 2, 3, 1])
exampleSet.size // 3. On instantiation, the duplicated entry was removed (here 1)

// To transform a Set object into an array
const exampleArray = [...exampleSet] // [1, 2, 3]
```

Let's take the previous example and see how do it in JavaScript!

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
]

const tolkienHeros = heros.filter(h => h.family === 'Tolkien')
const evilHeros    = heros.filter(h => h.isEvil === true)

const tolkienHerosSet = new Set(tolkienHeros)
const evilHerosSet    = new Set(evilHeros)
```

If you cannot reminder what is the Set theory, here's a schema:

![set theory]({{ site.url }}/images/articles/2017/no-more-loop/set-theory-extended.png)

```js
// Union: tolkienHeros ∪ evilHeros
const union = new Set([...tolkienHerosSet, ...evilHerosSet])

// Intersection tolkienHeros ∩ evilHeros (element which are both in tolkienHeros and evilHeros)
const intersection = new Set([...tolkienHerosSet].filter(h => evilHerosSet.has(h)))

// Difference tolkienHeros ∖ evilHeros (objects from tolkienHeros which are not in evilHeros)
const difference = new Set([...tolkienHerosSet].filter(h => !evilHerosSet.has(h)))
```

**Notes:**

* if the 2 arrays are built from different API, your object will probably not share the same reference. I mean `tolkienHeros[y] === evilHeros[y]`. In this case, your Set should only contain the object id (to ensure unicity).
* the Set Object keep the objects references (no copy will be created on instantiation).
  ```js
  // I update an object property
  heros[7].name = "Gandalf the white"
  [...tolkienHerosSet].find(h => h.name === 'Gandalf') // undefined
  [...tolkienHerosSet].find(h => h.name === 'Gandalf the white') // Object {...}
  ```

## Bonus: console.table

When working with array, you can debug your array in something much more nicer than `console.log`: `console.table` (you can click on the header to sort the datas).

![console.table]({{ site.url }}/images/articles/2017/no-more-loop/console-table.png)
