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

If you follow the JavaScript trends, you probably heard about **functionnal programming**. It's getting popular since the ES2015 version of JavaScript. Immutability is one pilliar of this paradigm. The notion behind is very simple: *"Forget about variables, everything is a constant"*. You're manipulating a list of users? Put them into a constant. You want to add an users? The list must be another structure. 

## Why you need to embrace Immutability?

### Time traveling

Because mutation hide change.
CQRS. No update/delete only create. Same for Git. 

<!--### We no longer need variables

Libraries/framework oriented component (i.e. React, VueJS...) push developer to create stateless components for dumb/presentational components. For presentational components, the state management is delegated to a state container (such as Redux, Flux, Vuex...).

If you embrace this philosophy, there is no more need for you to use variables.

TODO: React include immutability in components?-->

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
* after mutation, the variable's name and her associated values doesn't match anymore. I mean the initial structure behind `bills` are changed. `changeBillsCurrency()` function change data behind bills. So the values associated to bills doesnt represent bills anymore.
* we can't to reorder the functions call. For example, I cannot start by `print(bills)`, then using the `doSomething()bills` and finish with `doSomethingElse(bills)`. Theses function use differents version of the same variable.

if data is mutable, you have to know the order access of this data.

### Thread safety

One last advantage for moving into immutable object is the Thread safety. On a multi-threaded application, two threads can manipulate 2 differents versions of one data structure. However, JavaScript is concurent by default, so we're not really impected by this aspect (I didn't try with [parallel.js](https://parallel.js.org/)).


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

To loop an array, [forget about for/while loop](http://www.maxpou.fr/no-more-loop-in-js/) and start using Array.prototype.map(). Array.prototypeforEach() is a sibling to map() but it create side effect, while map prevent them by creating a new structure. So map() looks cool now right? So I can do some operations with my objects in a Array.map() loop, and it will preserve my initial values! Well... not exactly!

```js
const newHeroes = heroes.map(h => {
  h.name = h.name.toUpperCase()
  return h
})

console.table(newHeroes) // newHeroes now contains toString attribute 👍
console.table(heroes)    // heroes now contains toString attribute 👎
```

As expected, I created a new structure of heroes with a toString property.  
But Javascript always pass variables by value... (except when this variable refer to an object). In the map() loop, `h` refer to the object reference. That why I have updated the heroes


## Solutions

### Object.freeze() vs. Object.seal() vs. Object.assign()

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

* **[Object.freeze()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)**: freeze the given object (only the first level)

    ```js
    Object.freeze(hero)

    hero.name = 'Jessica Jones'
    console.log(hero.name === 'Jessica Jones') // false

    hero.location.city = 'Dublin'
    console.log(hero.location.city === 'Dublin') // true
    ```

    To freeze the object and his subobjects, we need to create a deepFreeze method (by using recursion).

* **[Object.seal()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)**: prevent adding new properties to a given object

    ```js
    Object.seal(hero)

    hero.name = 'Jessica Jones'
    console.log(hero.name === 'Jessica Jones') // true

    hero.weapon = 'staff'
    console.log(hero.weapon) // undefined
    ```

* **[Object.assign()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)**: create copy of a given object

    ```js
    const copy = Object.assign({}, hero)

    copy.name = 'Jessica Jones'
    console.log(hero.name === 'Jessica Jones') // false

    copy.location.city = 'Dublin'
    console.log(hero.location.city === 'Dublin') // true
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


Other
TO REORDER: Be consistent be predictable => be immutable.
Statelessness

