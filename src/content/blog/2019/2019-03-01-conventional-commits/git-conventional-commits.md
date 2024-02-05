---
title: Enhance your git log with conventional commits
slug: git-conventional-commits
language: en
date: 2019-03-01
imageShare: ./git-conventional-commits-share.png
cover: ./cover.jpg
tags:
  - Git
---

Git is a very powerful tool installed on most of our machines. As developer, we use it every day.
But, unfortunately, at first glance, this tool is not very developer friendly. That's why a lot of
people bypass the command line interface (CLI) with a graphical user interface (GUI).  
It's like using a framework without knowing the language itself. It can be OK at the beginning but,
sooner or later you, you will have problems.

Let's take an example:

```
$ git log --oneline ./src/components/button/

daccff1f test should pass
3fff19f6 test should pass
5b998d9a add disabled property for button
06faab4d fix lint
186cce90 refactor button
4b99d91a fix spinner component
5b998d9a fix css
263288a5 test should pass
c3fb85af Create Button component
```

There's might be nothing wrong for you with this log. Let me show you the issues I've found with
this log:

- It's hard to understand the Component's history. We might repeat errors already fixed.
- There are unnecessary commits which pollute logs and make history hard to read. Also,
  functionalities like `git blame` become irrelevant.
- It seems that a feature was added by a few commits. Which commit should I include if I want to
  revert this operation?
- `4b99d9a` say something about a different component. Is it an unwanted change? Again, what if we
  need to revert?
- ...

I think we shouldn't confound `git commit` with `ctrl` + `s`. A `git log` should be like **reading a
story**. By reading the log, I should be able to understand in ~10s the whole file history.

What if we had something like this:

```
$ git log --oneline ./src/components/button/

06faab4d revert: feat: add disabled property
186cce90 feat: add disabled property
5b998d9a test: add scenario for readonly property
263288a5 fix: fix css when hover
c3fb85af feat: add button component
```

Way cleaner, isn't it? That something called **Conventional Commits**.

## Conventional commits

Conventional commits is a Git commit convention made by the
[Angular team](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit). Basically,
every pull request should end up with one commit and a standardized commit message.

The message should follow this regex:

```
/^(revert: )?(feat|fix|docs|style|refactor|perf|test|chore)(\(.+\))?: .{1,50}/
```

Types of commit:

- **feat**: Add a new feature (equivalent to a `MINOR` in
  [Semantic Versioning](https://semver.org)).
- **fix**: Fix a bug (equivalent to a `PATCH` in [Semantic Versioning](https://semver.org)).
- **docs**: Documentation changes.
- **style**: Code style change (semicolon, indentation...).
- **refactor**: Refactor code without changing public API.
- **perf**: Update code performances.
- **test**: Add test to an existing feature.
- **chore**: Update something without impacting the user (ex: bump a dependency in `package.json`).

Project that uses this convention: [Angular](https://github.com/angular/angular),
[Vue.js](https://github.com/vuejs/vue), [Gatsby (almost)](https://github.com/gatsbyjs/gatsby),
[Lerna (almost)](https://github.com/lerna/lerna), [jest (almost)](https://github.com/facebook/jest).

## Benefits

**Project/code understandability**  
Commits are more descriptives and it's easier to understand the project's history. It became also
easier and to contribute.  
For example, I never contributed to the Angular's http package. But,
[reading the repo's git log](https://github.com/angular/angular/commits/master/packages/http) helps
me to better understand this package's history.

**Usability**  
If you have one action per commit, it became easier to revert a change. Same if you have git
conflict...

**Master your Git skills**  
Because not all Git-repository manager have a "squash and merge" option, you sometimes have to do
this operation by yourself. So, you will learn how to "squash" your commits, how to "fixup" a
commit, how to remove a specific commit... It's always important to know what's going on under the
hood!

## See also

- [conventionalcommits.org](https://www.conventionalcommits.org/en/v1.0.0-beta.2/)
- [Vue.js commit convention](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md)
- [github.com/conventional-changelog/conventional-changelog](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular) -
  A nice tool to generate changelog based on the git message.
- [github.com/conventional-changelog/commitlint](https://github.com/conventional-changelog/commitlint) -
  A git commit linter. Use it with Husky.
