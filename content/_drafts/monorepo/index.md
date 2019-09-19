


Pros:

* single source of truth
  which repository is it? which branch?

* simplify dependencies
  Diamond dependency problem: https://www.youtube.com/embed/W71BTkUbdqE?start=1189
  make backward compatible changes easily, in one commit

* favor contribution: because you already have the code.
If you want to fix something, don't need to clone the repo beforehand.

* better overview of the whole system.  
Don't need to go to the repo url, then clone it and realising.
a plain old ctrl + F is enough

lead to another point --> remove unused code with confidence

* super easy to add new package. To need to ask to someone the authorisation...


Cons:

* Clean usage of git: squash commit + forks.
  * unreadable git log.
  * unreasonable git branches
* if build is broken, it impacts everybody!
* 📈cost for CI
* hidden changes. Some repo are usually more sensitive than other. It's easy to add a small piece of code with a big impact.
==> Do not neglect your CI!
* if you work with 10% of the codebase, you probably don't care about the 90% remaining


Tools (JavaScript)

git submodules ==> NO WAY!
Lerna
Yarn workspaces