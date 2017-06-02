---
layout: post
title: Immutability in JS
lang: en
---

## Immutability? Kezako?

variable = something which can mute, depending on the time. 
Immutables structure are the opposite. Once created, they cannot change.

## Why you need to embrace Immutability?

### We no longer need variables

If you follow the JS trends, you probably heard about functionnal programming. It's getting popular since the ES2015 version.
Immutability is one pilliar of this paradigm.

Component oriented libraries/framework (i.e. React, VueJS...) enforce developer to create stateless component. The component's state is delegated to a state container such as Redux, Flux, Vuex...

If you embrace this philosophy, there is no more need for you to use variables.

### Mutables variables give you headache

Most of the time, when a variable change, there

```js
var bills = [{/* */}]
for (var i = 0; i < bills.length; i++) {
  bill[i].currency = 'USD'
  bill[i].amount = bill[i].amount * 1.12
}
```

An other example:

```js
const today = moment()
const nextYear = today.add(1, 'years')

today === nextYear // true
```

In these two examples, we got exactly the same error: after mutation, the variable's name and her associated values doesn't match anymore.

### 

## Pitfalls & Misconceptions

### `const` is not about immutability

ES6 came with a new nice keyword: const.

> Constants are block-scoped, much like variables defined using the let statement. The value of a constant cannot change through re-assignment, and it can't be redeclared.

- [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)

It means, once a constant is declared, you cannot change it.

```js
const meaningOfLife = 42
meaningOfLife = 'boom' // Uncaught TypeError: Assignment to constant variable
```

Then came a big confusion on the internets. People start to think that const was made for immutables structures.
In fact `const` only create an immutabe binding between the identifier and the value. If you assing an object as a value, you're free to change this object.

```js
const hero = {
  name: 'Batman'
}

const hero.name: 'Daredevil'

console.log(hero) // Object {name: "Daredevil"}
```

The object signature is still the same, only his parameters change. But it's not an excuse for not using it!


### mutables states inside map()

map() vs forEach(). forEach create side effect and map create new structure. Cool! So I can do some operations with my objects in a Array.map() loop, and it will preserve my initial values! Well... not exactly!

```js
const newHeroes = heroes.map(h => {
  h.toString = h.name.toUpperCase()
  return h
})

console.log(heroes) // heroes now contains toString attribute
```

Javascript always pass variables by value... except when this variable refer to an object. In my map loop, `h` is not a copy of heroes but an 


now all of my heroes objects contains a tostring attribute.

## Solutions

### Object.freeze() & Object.seal() & Object.assign

Only one level

### Immutable.js

### Mori (?)

## Under the hood: Persistent data structure

<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>F</kbd> + "Object.assign" ➡ "no results found"

https://medium.com/@dtinth/immutable-js-persistent-data-structures-and-structural-sharing-6d163fbd73d2

https://www.youtube.com/watch?v=K2NYwP90bNs
