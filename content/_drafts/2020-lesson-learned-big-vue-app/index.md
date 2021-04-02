---
layout: post
title: 2020-lesson-learned-big-vue-app
slug: lesson-learned-big-vue-app
date: 2021-03-17
cover: ./cover.png
language: en
tags: ["Vue.js"]
---
## How big?

monorepo/app

```
252 073 (74913+177160) loc vue
402 287 (273396+128891) loc js
2 479 (1320+1159) js files
2 947 (615+2332) vue files
1 big app divided in 35 apps
```


* Team communication
  * Communicate and make things **consistents**
  * Avoid hype driven development (i.e. rxjs).

* common architectural points:
  * find architectural style that matches your style (i.e. smart&dumb component)
  * try to modularise your app. 1 module = 1 business part of the app. Consider module as a silo.
  * [program for today, don't think too much about future](https://twitter.com/dhh/status/623598101127897088?lang=en)
  * no global (js and css)
  * discuss and document tech decision.
  * be strict with your dependencies
    * track size. Some libraries allow tree-shaking, use it! (i.e `import foo from 'lodash/foo'` instead `import { foo } from 'lodash'`)
    * you probably don't need library for simple things
  * adding code is easy, deleting is hard.


* Design system & Component library
  * slots are great. Use it!
  * have a centralised design system. In one place put all common components (buttons, checkboxes...), icons, fonts and colors.
  * Storybook is a great tool to visualize your components

* components

* Store (Vuex): 
  * [Don’t overuse your Vuex store](https://www.maxpou.fr/3-tips-scaling-vue-application#tip-3-be-kind-with-your-store-vuex)
  * store make your app harder to test
  * store are hard to unregister. Unecessary information can be kept in memory

* Testing: test your app!
  * lint your code. No one like comment like "you forgot a semicolon" on pull requests. Find a rule and follow it blindly. If you start to discuss about it, you open a door for bikeshedding.
  * unit test business part or tricky functions
  * integration test for the rest!
  * keep code coverage for dashboard-oriented-manager. Consider uncovered code untested and covered code potentially tested.

* Automation
  * use CI


* Conclusion

Your app will never be perfect and it's fine.
Keep it simple.