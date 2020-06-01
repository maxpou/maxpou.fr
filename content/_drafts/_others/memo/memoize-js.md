---
layout: post
title: JS & Memoize
lang: en
---

## Javascript and Memoization

```js
function fact (n) {
  return n > 0 ? n * fact(n - 1) : 1
}
```

Evil way (global var)

```js
var cache = []
function fact (n) {
  return n > 0 ? n * fact(n - 1) : 1
}
```


Good way

```js
function fact (n) {
  if (!fact.cache[n]) {
    fact.cache[n] = n > 0 ? n * fact(n - 1) : 1
    console.log(`compute ${n} ${fact.cache[n]}`)
  }
  return fact.cache[n]
}
fact.cache = []
```

```js
function fact (n) {
  if (typeof fact.cache === 'undefined') {
    fact.cache = []
  }

  if (!fact.cache[n]) {
    fact.cache[n] = n > 0 ? n * fact(n - 1) : 1
  }
  return fact.cache[n]
}
```

of also: put cache inside the function object (without subproperty cache)

```js
function fact (n) {
  if (!fact[n]) {
    fact[n] = n > 0 ? n * fact(n - 1) : 1
    console.log(`compute ${n} ${fact[n]}`)
  }
  return fact[n]
}

fact(5) // ...
Object.keys(fact) // ["0", "1", "2", "3", "4", "5"]
```


Note: in Javascript functions are objects.

```js
var myFunct = () => true
typeof myFunct.__proto__ // "function"
typeof myFunct.__proto__.__proto__ // "object"
```
