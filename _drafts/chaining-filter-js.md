---
layout: post
title: Chaining Javascript filters recursively
tags: ["Javascript"]
lang: en
---

I recently realize a POC with [VueJs](https://github.com/maxpou/find-a-room-vuejs2). I was confronted to this problem: how to apply an unknown number of filter to a collection.
Given the following data:

```javascript
const heros = [
  { id: 1, name: 'Wolverine',    family: 'Marvel'    },
  { id: 2, name: 'Deadpool',     family: 'Marvel'    },
  { id: 3, name: 'Magneto',      family: 'Marvel'    },
  { id: 4, name: 'Batman',       family: 'DC Comics' },
  { id: 4, name: 'Harley Quinn', family: 'DC Comics' },
  { id: 5, name: 'Legolas',      family: 'Tolkien'   },
  { id: 6, name: 'Gandalf',      family: 'Tolkien'   }
];
```

And the following filters:

```js
// not DC Comics
const f1 = h => h.family !== 'DC Comics'
// no evil hero
const f2 = h => h.name !== 'Magneto' && h.name !== 'Harley Quinn'
```

I can now chain the filters like this:

```js
heros.filter(f1)
     .filter(f2)
     .filter(whatever)
```

But what if I have to apply severals filters on the same data?

```js
const activeFilters = [f1, f2]
```

Looping inside an array can be a solution:

```js
var filteredHeros = heros
for (let filterIndex in activeFilters) {
  filteredHeros = filteredHeros.filter(activeFilters[filterIndex])
}
```

But it isn't stateless at all. I mean, it's not very functionnal because `filteredHeros` is a mutating variable...
A better solution is to use a functionnal approach by using recursion:

```js
function recursive_filter (data, arrayFilters, index = 0) {
    if (arrayFilters.length === 0) {
        return data
    }
    if (index === arrayFilters.length - 1) {
        return data.filter(arrayFilters[index])
    }
    return recursive_filter(data.filter(arrayFilters[index]), arrayFilters, (index + 1))
}
```

```js
const filteredHeros = recursive_filter(heros, activeFilters)
```
