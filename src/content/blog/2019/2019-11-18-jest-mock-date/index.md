---
title: 'How to mock Date with Jest'
slug: jest-mock-date
description: 'A guide on how to deal with unit tests that uses the JavaScript Date object.'
cover: ./cover.jpg
language: en
date: 2019-11-18
tags:
  - JavaScript
  - Testing
---

_I spent too many hours trying to mock correctly the JavaScript's Date object. I tried a few things
I've found on Google... without success. I finally ended up with a kinda handcrafted solution._

> Every time we mock, we diverge from the real world scenario.

For this reason, I tend not to mock... but sometimes, there are not many choices. Fortunately, Date
is one good exception!

## Everybody on the same timezone!

To prevent problems related to timezones (e.g. date formating), you can set node timezone in jest
config file. Now you are sure all tests are executed on the same timezone no matter where your
colleagues or your CI server are.

```js
// jest.config.js
process.env.TZ = 'GMT'

module.exports = {
  // ...
}
```

See also:
[the full list of timezones (column _TZ database name_)](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

## Mock Date.now

Let's say I want to test a dashboard component which tells me "hello" with the date of the day. The
lazy way is to only test the Hello part (without the date). Because it changes every day. But you
won't test the date formatting part.

If you want to, you gonna have to mock `Date.now()` and put a default one.

```js
// your-test.spec.js

const RealNow = Date.now

beforeAll(() => {
  global.Date.now = jest.fn(() => new Date('2019-04-07T10:20:30Z').getTime())
})

afterAll(() => {
  global.Date.now = RealNow
})
```

Now in the same file, you can add something like the following:

```js
it('should show a formatted date of today', async () => {
  const dashboard = await Mount(<Dashboard />)
  expect(dashboard).toHaveText('Hi Max, today is 7 April 2019')
})
```

💡`RealDate` store "real" Date instance, so we can put it back afterwards.

## Using Moment.js?

You are probably using the very popular moment.js library. If so, mocking `Date.now`, will probably
not be enough. A workaround is to
[mock the entire node module](https://jestjs.io/docs/en/manual-mocks#mocking-node-modules).

```js
// <root>/__mocks__/moment.js
const moment = jest.requireActual('moment')

Date.now = () => new Date('2019-04-07T10:20:30Z').getTime()

module.exports = moment
```

With this solution, you don't need `beforeAll()`/`afterAll()` listener. This mock will be effective
for all tests. And, every time `moment()` is called, return date will be the same 🎉

> Big shout out to Avalander for pointing out some errors. https://dev.to/avalander/comment/ibc7
