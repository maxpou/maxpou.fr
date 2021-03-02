
## How big?

```sh
# number of files
find . -name "*.vue" -not -path "**/node_modules/**" | wc -l

# loc
find . -name '*.vue' -not -path "**/node_modules/**" | xargs wc -l
```

monorepo/app

```
252073 (74913+177160) loc vue
402287 (273396+128891) loc js
2479 (1320+1159) js files
2947 (615+2332) vue files
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

* components

* Store (Vuex): 
  * [Don’t overuse your Vuex store](https://www.maxpou.fr/3-tips-scaling-vue-application#tip-3-be-kind-with-your-store-vuex)
  * store make your app harder to test
  * store are hard to unregister.

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