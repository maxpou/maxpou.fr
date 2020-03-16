# Does Monorepo worth the trouble?

Trends today is to splits application. Microservices, microFrontends...  
<!-- a contrecourant --> some companies had decided to put multiple application/libraries under the same git repository.


## Pros

### Team work

* single source of truth
  which repository is it? which branch is the default?
  In my current company we used to have weird name for `master`. When we changed from a weird name to another one,some repo were updated, some were not (oversight). With a monorepo, we don't have this problem.

* favor contribution: because you already have the code.
If you want to fix something, don't need to clone the repo beforehand.

* better overview of the whole system.  
Don't need to go to the repo url, then clone it and realising.
a plain old ctrl + F is enough

* lead to another point --> remove unused code with confidence


### 👨‍👩‍👧 Dependencies

* simplify dependencies
  Diamond dependency problem: https://www.youtube.com/embed/W71BTkUbdqE?start=1189
  make backward compatible changes easily, in one commit you can revert change in multiple packages

* super easy to add new package. To need to ask to someone the authorisation...
* Some tools automatically symlinks local dependencies together. (so you can get hot-reload between local repos ✨)


## Cons

### 🍴 Git & code hosting platforms (GitLab/Hub...)

* Clean usage of git: squash commit + forks.
  * unreadable/unusable git log.
  * unreasonable git branches

**Tip:** I use [semantic commit]() and always put in parenthesis the name of the package. So if I want to retrieve one old commit, it's super easy
```bash
# will list all feature added in package-B
git log --all --grep="feat(package-B):"
```

* authorization. When you set user permission on GitLab/GitHub/etc., it's for the whole repo. You can't manage user permission per sub-package.


### 🤖 Continuous Integration

* if build is broken, it impacts everybody!
* 📈increase cost for CI. Because there's much more code to test/lint/build/...
**Tip:** 
  * If your pipeline is good enough and you have parralel tasks CI, enable the fail-fast option.
  * I reccomend you to add label that can skip the CI. Like if you change a typo in the README, you don't need to lint/test all the packages. (i.e. If the pull request have a "NO_CI" label, build will not be triggered)


### 🤝 Team work

* hidden changes. Some repo are usually more sensitive than other. It's easy to add a small piece of code with a big impact.
==> Do not neglect your CI!

* if you work with 10% of the codebase, you probably don't care about the 90% remaining


## Tools (JavaScript)

You might have heard about git submodules functionnality. 
I use it for my [VIM dotfiles](TODO) or to link reveal.js on my slides.
But generally speaking, please don't use them for a monorepo. It

Lerna combined with Yarn workspaces is a great combo.


## Conclusion

Overall I love monorepo. But it can become your worse nightmare if you don't follow simple rules like a good usage of git or