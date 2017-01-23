---
layout: post
title: Github Tips&tricks
tags: ["GitHub"]
lang: en
---

## github = git + hub

[Hub](https://hub.github.com) is a command line wrapper for Git. Once installed, you can use this new git commands:

* `pull-request`   Open a pull request on GitHub
* `fork`           Make a fork of a remote repository on GitHub and add as remote
* `create`         Create this repository on GitHub and add GitHub as origin
* `browse`         Open a GitHub page in the default browser ❤️
* `compare`        Open a compare page on GitHub
* `release`        List or create releases (beta)
* `issue`          List or create issues (beta)
* `ci-status`      Show the CI status of a commit

```sh
alias git=hub
```

Using ZSH? Don't forget to add the plugin!

```
~/.zshrc file
plugins=(git github ...)
```


## Github AKA SVNHub?

You're not using Git? It doesn't matter, GitHub also support Subversion!

```bash
# instead of using:
git clone https://github.com/user/repo
# you can do exactly the same with svn:
svn co --depth empty https://github.com/user/repo
```

...but who uses SVN anyway? ;-)

## URL shortener

Github provides an URL shortener such as bit.ly for your GitHub repositories: https://git.io/


## Clone everything you want

```
git clone https://gist.github.com/maxpou/e6cad8d4699f731c86df628358cba3d6
```

## Issue/Pull request Templates

## Github Pages

<username/organisationName>.github.io or create a gh-pages branch on your repository. Then http://<username/organisationName>.github.io/projectname/

simple HTML
or Jekyll (like this website)

CNAME
HTTPS!


## Sign your commits



## URL everywhere

One of GitHub's motto is: *to exist, each action must have a specific URL*. By action, I mean:

* commit
* pull request
* comment (on commit, issue, pull request...)
* ...

By the way, you can easily generate a diff/patch file by addind **.diff** or **.patch** at the end of the Pull-request/commit.  

Example:
* Original commit: https://github.com/maxpou/maxpou.github.io/commit/470da95b366bbb3efd8fa481308c906c955304db
* Diff: https://github.com/maxpou/maxpou.github.io/commit/470da95b366bbb3efd8fa481308c906c955304db.diff
* Patch: https://github.com/maxpou/maxpou.github.io/commit/470da95b366bbb3efd8fa481308c906c955304db.patch


## Keyboard shortcuts

Even if it's a web application, using your mouse isn't mandatory. In fact, GitHub offer a lot of differents shortcuts.
To see them, just press " ? " *(doesn't matter where you are!)*.

![](images/articles/github-tips-tricks/keyboard-shortcuts-help.png)


## Markdown on steroid (Github Flavored Markdown)

https://github.com/maxpou-slides/github-tips-tricks/issues/1

Taks lists, table, reference commits/issues/PR ...


This markdown also supports some HTML such as details/summary tags (kind of spoiler tag)

```HTML
<details>
  <summary>License (MIT)</summary>
  The MIT License (MIT)

  Copyright (c) 2017 Maxence POUTORD

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software")
  [...]
</details>
```


## Emoji

Yes, you can use emoji (almost) everywhere on Github!  
For my needs, I prefix everything related to Docker (repositories/commits) with the whale icon (![](https://assets-cdn.github.com/images/icons/emoji/unicode/1f433.png)).

A better implementation is the [Atom contributing's style guides](https://github.com/atom/atom/blob/master/CONTRIBUTING.md#styleguides).

Here's a [cheat sheet](http://www.webpagefx.com/tools/emoji-cheat-sheet/)




## Disable whitespace on code review

`?w=1`

Example:
https://github.com/maxpou-slides/github-tips-tricks/commit/42dd9a084b713ff35e5298453e1304047680a9e4
https://github.com/maxpou-slides/github-tips-tricks/commit/42dd9a084b713ff35e5298453e1304047680a9e4?w=1



## highlight lines

click on the line number to highlight one line. For multiple, press shift.

https://github.com/maxpou/dictionary-game/blob/77df749b615b76d661a6bead1084be5650fd438e/.travis.yml#L3-L5


## Not only for your code

PDF, 3D visualisation

## API (~REST or GraphQL)



## The power of Webhooks

## Bonus: Octodex

Octodex is a kind of Octocat gallery, the mascot fot GitHub.
https://octodex.github.com/
