---
title: "async/await without try...catch!"
slug: async-await-without-try-catch
language: en
date: 2020-05-25
cover: ./cover.jpeg
tags: 
    - JavaScript
---

When `async/await` feature came with ECMAScript 2017, it literally brought promises to the next level.
In a nutshell, it removes the removing Pyramid of doom effect (*a.k.a. Callback hell*) and makes asynchronous code easier to read.

If your application rely on an API, I guess you writte a lot of code like this:

```js
try {
  const response = await http.get('https://api.github.com/users/maxpou')
  // do something
} catch(err) {
  // error handling
}
```

I never been a big fan of try..catch blocks. **I like to strive for a minimum level of indentation in my code.**
Let's see how we can remove this block!


## Wrapper

First, we need to create a wrapper. You can put this function in your project's shared library:

```js
export function to(promise) {
  return promise
    .then(data => [null, data])
    .catch(err => [err, null]);
}
```

As you can see, this function can return 2 different values: the error **or** the fulfilled value of the promise. 

Now in your code, you can remove those `try..catch` and replace them with the following:

```js
import { to } from 'utils/async-utils';

const [err, response] = await to(http.get('https://api.github.com/users/maxpou'))

if (err) {
  // error handling
}

// do something
```

🎉 This is it!


## Gotcha - don't try to destructure

In my actual company, we heavily rely on this wrapper. One day, a dev tried to destructure the response object.

```js
// ⚠️ this won't works! ⚠️
const [err, { data }] = await to(http.get('https://api.github.com/users/maxpou'))
```

In case of an error, this code won't works. You will have `Cannot read property 'data' of null`. You can destructure if it's not defined, even if you don't use it!