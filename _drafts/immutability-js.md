---
layout: post
title: Immutability in JS
lang: en
image:
    feature: articles/2017/immutability-js/banner.jpg
---

## Immutability? Kezako?

variable = something which can change, can mute, depending on the time. 

Immutables = the opposite. Once created, a constant cannot change. I like me you come from the OOP world, you probably already use them to store un change data (ie `const PI = 3.14`).

If you follow the JavaScript trends, you probably heard about functionnal programming. It's getting popular since the ES2015 version of JavaScript. Immutability is one pilliar of this paradigm. It means, there is no more variables in FP, only constants. You're manipulating a list of users? Put them into a constant. You want to update your users? Create this new list into another constant. 

## Why you need to embrace Immutability?

### We no longer need variables

Libraries/framework oriented component (i.e. React, VueJS...) push developer to create stateless components for dumb/presentational components. For presentational components, the state management is delegated to a state container (such as Redux, Flux, Vuex...).

If you embrace this philosophy, there is no more need for you to use variables.

TODO: React include immutability in components?

### Unwanted mutations

Moment is a really nice library to manage your date in JS. The first time I was using it, I fall into a classic trap: an unwanted mutation. Look:

```js
const today = moment()
const nextYear = today.add(1, 'years')

today === nextYear // true
```

By mistake -and because I didn't read the full documentation :) - I changed the value of today (see last line).

### Mutables variables give you headache

Given a function `changeBillsCurrency()` like the following one.

```js
function changeBillsCurrency (bills) {
  for (var i = 0; i < bills.length; i++) {
    bill[i].currency = 'USD'
    bill[i].amount = bill[i].amount * 1.12
  }
  return bills
}
```

and a code like this:

```js
// ...
doSomething(bills)
// ...
changeBillsCurrency(bills) // bring bills mutation
// ...
doSomethingElse(bills)
// ..
print(bills)
```

The previous examples bring severals problems:
* after mutation, the variable's name and her associated values doesn't match anymore. I mean the initial structure behind `bills` are changed. `changeBillsCurrency()` function change data behind bills. So the values associated to bills doesnt represent bills.
* we can't to reorder the functions call order. For example, I cannot start by printing the bill, then using the `doSomething()` and finish with `doSomethingElse()`.


### Thread safety

Due to the browser, JavaScript is fully asynchronous.


## Pitfalls & Misconceptions

### `const` is not about immutability

ES2015 came with a new nice keyword: `const`.

> Constants are block-scoped, much like variables defined using the let statement. The value of a constant cannot change through re-assignment, and it can't be redeclared.  
— **[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)**


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

hero.name: 'Daredevil'

console.log(hero) // Object {name: "Daredevil"}
```

The object signature is still the same, only his parameters change. But it's not an excuse for not using it!


### mutables states inside `map()`

map() vs forEach(). forEach create side effect while map prevent them by creating a new structure. Cool! So I can do some operations with my objects in a Array.map() loop, and it will preserve my initial values! Well... not exactly!

```js
const newHeroes = heroes.map(h => {
  h.toString = h.name.toUpperCase()
  return h
})

console.table(newHeroes) // newHeroes now contains toString attribute
console.table(heroes)    // heroes now contains toString attribute 😓
```

As expected, I created a new structure of heroes with a toString property. 
But Javascript always pass variables by value... except when this variable refer to an object. In the map() loop, `h` refer to the object reference. That why I have updated the heroes 

## Solutions

### Object.freeze() & Object.seal() & Object.assign()

Hopefully, the language offer severals quick win to create immutables structures. I'm gonna use the following structure for this functions 

```js
const hero = {
  name: 'Daredevil',
  location: {
    city: 'New York',
    district: 'Kitchen Hell'
  }
}
```

* **Object.freeze()**: freeze the given object (only the first level)

    ```js
    Object.freeze(hero)

    hero.name = 'Jessica Jones'
    console.log(hero.name === 'Jessica Jones') // false

    hero.location.city = 'Dublin'
    console.log(hero.location.city === 'Dublin') // true
    ```

    To freeze the object and his subobjects, we need to create a deepFreeze method (by using recursion).

* **Object.seal()**

    ```js

    ```

* **Object.assign()**: create copy

    ```js
    const copy = Object.assign({}, hero)
    ```


Only one level
Performances

### Immutable.js

![]({{ site.url }}/images/articles/2017/immutability-js/immutable.png)

### Mori (?)

## Under the hood: Persistent data structure

<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>F</kbd> + "Object.assign" ➡ "no results found"

https://medium.com/@dtinth/immutable-js-persistent-data-structures-and-structural-sharing-6d163fbd73d2

https://www.youtube.com/watch?v=K2NYwP90bNs
