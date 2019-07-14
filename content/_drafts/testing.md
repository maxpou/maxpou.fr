# Frontend testing strategies

## Table of contents

1. Why?
2. static code analysis
3. unit tests
    1. the case of snapshot testing
    2. what about coverage?
4. e2e
    1. `chrome --headless`, a new game changer?
    2. Cypress
5. performances?
6. the importance of automation
7. Final thoughs


## Why not to test?

* "We don't have time to test!"
* "Test slow me down!" (creation + maintenance)
* "We don't know how to test and what to test!"


## Why you should test?

Gives **confidence** that software works as expected. So it's easier to remove/refactor code
Document codebase (unit) and application behavior (e2e).
Might helps to write better code (i.e. "wtf I did when I wrote this function?")
Reduce maintenance app so the Money (see cost of bug). 
Deploy to prod on Friday..? why not!


## Static analysis: easy and cheap

eslint.
unify code. 1 shared style guide ≃ 1 way to do things
This code is like this... so it's probably written by xxx.
can catch dead code/unused variables => reduce surface of code => reduce bugs


## Unit test: How to test component?

Treat your component as a black box with several contracts (public interface):

* properties
* interaction events (click, select...)
* lifecycle events (mounted, destroyed...)
* event emitted
* output (DOM)
* properties pass to subcomponents / event listened from subcomponents

Forget about the rest (component internal state, computed properties...)

Testing before coding? only if you have a clear idea of what you're doing. Otherwise you're wasting your time!


## Definition of a good test

**Common:**
* Is easily readable and to understandable. Tests also documents the code!
* Cover the most common usages. It's OK not to cover 100% lines. 
* Must be red at the beginning. Otherwise, how can you be sure that your test is working? :)
Example: `it('should display a formatted username', () => { /** ... **/ })`
* It must run fast. Nobody like to wait!

**UI component:**
* it doesn't mock everything. Every time we mock, we diverge from the real world scenario. Favour mock for external calls (HTTP GET/POST/...) and browsers API (local/session storage, navigator...)
* it doesn't test internal state/methods... You should be able to refactor the component internal without breaking any test!
* it doesn't test the framework/libraries. 
Example: If a component redirect to another page threw router, don't test if the URL had changed. Instead, test that `$router.push()` have been called.
* avoid shallow rendering. By isolating too much a component, we reduce the amount of bug we can catch with the test. 

**Data mutation test:**
* A good approach for mutation state:
    1. set initial state
    2. dispatch action
    3. expect state to change


...Also remember that we write tests to **catch bugs**!



## File architecture

A component oriented application usually follow a similar structure.

```
├── components/ (aka "dumb" components)
│   ├── TodoItem.js (or .vue)
│   ├── ...
├── pages/      (aka containers)
├── routes/
├── services/   (api, data formaters, validators...)
├── store/
├── tests/      (replicate parent structure)
│   ├── components/
│   │   ├── TodoItem.specs.js
│   │   ├── ...
│   ├── pages/
│   ├── etc...
```

An other approach consist in putting tests files alongside the components/pages... both of these approaches can make sence.
I personnally prefer the first one to get a better separation and to get folder less crowded.

* components: unit tests
* pages: integration tests
* routes: unit tests? e2e? or simply nothing. Tests are written to catch bugs. Router



## Snapshot testing

Writing tests like the following can be redundant and time consuming:

```js
const wrapper = mount(MyComponent);
const buttons = wrapper.findAll('button')
expect(buttons.at(0).text()).toMatch('Bim')
expect(buttons.at(1).text()).toMatch('Bam')
expect(buttons.at(2).text()).toMatch('Bingo')
```

What if we could test the whole DOM in one unique assertion?
That's the idea behind Snapshot testing. Snapshot testing provides a good way to test component rendering by comparing 2 different output.

```js
const wrapper = mount(MyComponent);
const template = wrapper.html();
expect(template).toMatchSnapshot();
```

With this, Jest is going to create a file (like `MyComponent.spec.js.snap`) under a folder call `__snapshots__`. From now, everytime jest will run, it will compare the output with the one in the snap file.
one file that we commit in our sourcecontrol


Snapshot are great. But it tends to be irrelevant on big components. Don't overuse it.
https://blog.kentcdodds.com/effective-snapshot-testing-e0d1a2c28eca
Babel plugin use it => 👍

with new version of Jest, snapshot are inline. Its good. Enforce to use small snapshot.


![jest snapshot flow](http://slides.maxpou.fr/vuejs-training/img/jest-snapshot-flow-3.png)

**Warning:**
* The purpose of behind snapshot testing is not to replace existing assertions. It's an easy and lazy way to provide test where there's not!
* snapshot & visual regression testing are 2 differents things!
* Please, never update a snapshot manually. Let Jest do it for you!
* Don’t fall into the temptation of quickly update snapshot without checking the real change!
* If working with external component, use shallowMount instead of mount. You don't want to test external components!


## Code coverage

Covering 100% is time-consuming!

![testing - effort vs. value](https://jeroenmols.com/img/blog/coverageproblem/effortvalue.png)


Funny stuff I saw when I aimed 100% cc:

**Write code for tests**

```js
function foo(a, unitTest = false) {
  // code

  if (weirdAndHardToTestCondition || unitTest) {
    // code
  }

  return bar;
}

```

Code coverage != quality of tests


**Focus too much on coverage instead of quality**

```js
function divide(a, b = 0) {
  return a / b;
}

describe('divide', () => {
  it('should divide two numbers', () => {
    expect(divide(6, 2)).toBe(3);
  });
});
```

## When unit test aren't enough

![Unit testers be like: “Looks like it’s working”](https://cdn-images-1.medium.com/max/800/0*eCs8GoVZVksoQtQx.gif)

[testing trophy (© kentcdodds)](https://pbs.twimg.com/media/DVUoM94VQAAzuws.jpg)

> Write tests. Not too many. Mostly integration. -[Guillermo Rauch](https://twitter.com/rauchg/status/807626710350839808)

A LOT of bug can be catched by Static analysis tools (eslint).


## e2e tests

[`chrome --headless`](https://developers.google.com/web/updates/2017/04/headless-chrome)

```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.maxpou.fr');
  await page.screenshot({path: 'screenshot.png'});

  await browser.close();
})();

// and after comparing pixel by pixel screenshot.png with another one.
// you can do it with percy.io
```


also, the object page contain an interesting subobject: coverage 🎉 (https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagecoverage)
It can allow you to know how much % of code is used!


## The importance of automation

"You forget a semicolon", "Indendation is wrong", "test is broken"...

There is 2 problems here:
* the person who write this is doing a robot job. If a robot can do your jobm there's something wrong.
* this kind of comments are annoying and hurt developpers.

That's why, it's very important to delegate this ungrateful job to a robot.

Then reviewers will get more time to check the quality of the PR, talk about implementation. And person who submit de PR will feel better.
"when crossing road, I don't feel hurt when the sign say no."


## About performances

Warning with benchmarks: https://twitter.com/dan_abramov/status/1013823489609011200
Testing your app on an iPhone X + Wifi is not relevant: 
  * Average price for a mobile: 200e
  * 53% of world population is still with a 2g network


## Resources

* ["Write tests. Not too many. Mostly integration." - Kent C. Dodds](https://blog.kentcdodds.com/write-tests-not-too-many-mostly-integration-5e8c7fff591c)
* ["Vue NYC - Component Tests with Vue.js" - Matt O'Connell](https://www.youtube.com/watch?v=OIpfWTThrK8) ([slides](http://slides.com/mattoconnell/deck#/7))
* ["Establishing testing patterns with software design principles" - Aaron Abramov](https://www.youtube.com/watch?v=_pnW-JjmyXE)
