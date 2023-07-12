---
title: 'How to mock Axios HTTP calls with Jest'
slug: jest-mock-axios-calls
cover: ./cover.jpeg
language: en
date: 2020-06-09
tags: [JavaScript, Testing]
---

Axios is a very popular library you can use to perform HTTP calls. Because it's not framework
specific, you can easily use it in your Vue.js / React / Vanilla applications.

But how do you test your application that has HTTP calls?

When it comes to testing, I always apply this simple rule:
["Only mock what you can’t control"](/10-tips-write-better-tests#4---only-mock-what-you-cant-control).
Because we usually can't control an external API, I recommend you to mock it.

The first time I had to test a functionality with an API call, I was surprised to see packages on
npm for testing Axios calls. **I don't think we should rely on a npm package for something as simple
as an API call**.

Let's do it without any package!

## How to structure our code

I like to have a file where I have all my API calls. In a wink, I can get all the endpoints my
application is using.

```js
// src/services/swapi.api.js
import axios from 'axios'

export function getStarship(id) {
  return axios.get(`https://swapi.dev/api/starships/${id}/`)
}
```

Now in your test, you can do the following:

```js
// test/your-test.js
import { getStarships, getStarship } from '../../src/services/swapi.api'
import fakeData from '../__fixtures__/swapi.getStarship.12.json'
jest.mock('../../src/services/swapi.api')

beforeEach(() => {
  getStarship.mockResolvedValue({ data: fakeData })
})

afterEach(jest.resetAllMocks)
```

Here are few interesting points:

- I usually put my fake data in a `__fixtures__` folder;
- I like to get the URL path the file name;
- I use an `afterEach()` statement to clean up mocks after each test.

```js
// test/your-test.js
it('should do something', async () => {
  await render(App)
  expect(getStarships).toHaveBeenCalledTimes(1)
})
```

In your test you can, if it makes sense to you, add assertion with this call.

## Working with code coverage?

Although I think [you shouldn't pay too much attention to your code coverage](/code-coverage), you
can add the following line in your `jest.config.js`:

```js{5}
// jest.config.js
module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/services/*.api.js',
  ],
}
```

All files following this pattern in this folder will be ignored!

And that's it for today :)
