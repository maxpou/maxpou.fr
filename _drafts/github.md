---
layout: post
title: Github Tips&tricks
tags: ["GitHub"]
lang: en
image:
    feature: articles/github-tips-tricks/banner.png
    credit: Github.com
    creditlink: https://enterprise.github.com/aws
---

Summary:

* [GitHub = git + hub / Manage your repo by CLI](#)
* [GitHub = git + hub / Manage your repo by CLI](#)
* [GitHub = git + hub / Manage your repo by CLI](#)
* [GitHub = git + hub / Manage your repo by CLI](#)
* [GitHub = git + hub / Manage your repo by CLI](#)
* [GitHub = git + hub / Manage your repo by CLI](#)
* [GitHub = git + hub / Manage your repo by CLI](#)



## GitHub = git + hub (Manage your repo by CLI)

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

```bash
#~/.zshrc file
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

## GFM: a markdown on steroid

Github use his own version of markdown: Github Flavored Markdown (GFM). It provides severals additionnals features such as:

* Task lists (`- [ ] <task description>`). On the issue summary, a task list will also appear ([example](https://github.com/maxpou-slides/github-tips-tricks/issues))

    ```markdown
    Todo:
    - [x] Write an article about Github tips and tricks
    - [ ] Conquer the world
    ```

    ![]({{ site.url }}/images/articles/github-tips-tricks/tasklist.gif)

* Tables:

    ```markdown
    | First Header  | Second Header |
    | ------------- | ------------- |
    | Content Cell  | Content Cell  |
    | Content Cell  | Content Cell  |
    ```

* Syntax color

    ```markdown
        ```javascript
        console.log("youpi")
        ```
    ```
* reference commits/issues/PR ...

* Other interesting HTML tags such as details/summary tags (kind of spoiler tag)

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
    The output will be like this: *(click on License)*
    <details>
      <summary>License (MIT)</summary>
      The MIT License (MIT) <br>
      Copyright (c) 2017 Maxence POUTORD<br>
      Permission is hereby granted, free of charge, to any person obtaining a copy
      of this software and associated documentation files (the "Software")
      [...]
    </details>



## URL shortener

Github provides an URL shortener such as bit.ly for your GitHub repositories: https://git.io/


## Gist an other kind of repository

Each [gist](https://gist.github.com/) is a Github repository. So you can clone and fork them, exactly like a Github repository:

```
git clone https://gist.github.com/maxpou/e6cad8d4699f731c86df628358cba3d6
```

By the way, if you are not logged into Github while creating this gist, it will be an Anonymous gist. Note that Anonymous gists are hard to delete (need to contact Github).

## Issue/Pull request Templates

Everyone who maintain an open source project on Github had already get this kind of message:

> User1: It's not working on my Machines
> You: Can you provide the version? And the steps to reproduce?
>
> User2: It's not working...
> You: Can you provide the version? And the steps to reproduce?

To avoid this repetitive task, you can add an issue template to your repository.

```markdown

| Q                | A
| ---------------- | -----
| Bug report?      | yes/no
| Feature request? | yes/no
| BC Break report? | yes/no
| RFC?             | yes/no
| Tool version     | x.y.z

**Description**

**Version concerned**

**Steps to reproduce the issue:**
1.
2.
3.

**Expected Results:**


**Actual Results:**

**Additional details:**
```

Now you can ensure that each contributors will provide the corrects informations!
You can do exactly the same with Pull-request content (*"what does it fix? Tests status?"*).

## Github Pages

Github can host severals type of websites:

* plain old HTML pages: https://github.com/maxpou-slides/maxpou-slides.github.io
* websites which use [Jekyll](https://jekyllrb.com/) (like this website)
example: my blog where you read this lines :) (https://github.com/maxpou/maxpou.github.io)

There is severals url pattern:
* <username/organisationName>.github.io
* <username/organisationName>.github.io/projectname. In this case, you need to push the HTML/Jekyll files in a branch call gh-pages.
* ... or whatever custom domain. In this case, put a CNAME file on your repository. Further more informations are availables in the documentation (https://help.github.com/articles/using-a-custom-domain-with-github-pages/).

You can also [secure your Github Pages site with HTTPS](https://help.github.com/articles/securing-your-github-pages-site-with-https/). Unfortunately it is not compatible with custom domains.

I'am a big fan of Github Pages! They currently host this website ([www.maxpou.fr](http://www.maxpou.fr/)), an other one dedicated to my slides ([slides.maxpou.fr](http://slides.maxpou.fr/)), some Proof of Concepts (ie: my [Dictionary Game](https://github.com/maxpou/dictionary-game)) and all of my slides (I put them into an [organization](https://github.com/maxpou-slides) for a better visibility).

For managing dependencies, I recommend you to use [Git submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules). For instance my slides repositories use [RevealsJS](https://github.com/hakimel/reveal.js/). I don't want to manage this library inside each repositories.
It is exactly the same for my [Vim plugins](https://github.com/maxpou/dotfiles/tree/master/vim/bundle). I prefer stock a reference to the repositories in my dotfiles instead of the repository itself.


## Sign your commits

As you may know, every body can hijack your job. You just need to change your git config and that it!

```
$ git config --global user.name 'Linus Torvalds'
$ git config --global user.email linus@fake.com
```

Now, you can usurp the identity of someone else! To avoid this, you can sign a commit (with GPG key).

![]({{ site.url }}/images/articles/github-tips-tricks/gpgsign.png)


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

![]({{ site.url }}/images/articles/github-tips-tricks/keyboard-shortcuts-help.png)


## Emoji

Yes, you can use emoji (almost) everywhere on Github!  
But they aren't only present to decorate your text. For example, I prefix everything related to Docker (repositories/commits) with a whale icon.

A better implementation is the [Atom contributing's style guides](https://github.com/atom/atom/blob/master/CONTRIBUTING.md#styleguides):

![]({{ site.url }}/images/articles/github-tips-tricks/commit-message-atom.png)



Here's a [cheat sheet](http://www.webpagefx.com/tools/emoji-cheat-sheet/)


## Disable whitespace on code review

If a commit is polluted by whitespace simply add `?w=1` at the end of the URI.

![]({{ site.url }}/images/articles/github-tips-tricks/whitespace.gif)

Example: [with](https://github.com/maxpou-slides/github-tips-tricks/commit/2616cbecc713389f8455b066711bc74891a593a6) and [without](https://github.com/maxpou-slides/github-tips-tricks/commit/2616cbecc713389f8455b066711bc74891a593a6?w=1) whitespace pollution.


## Filtering commits

?author=maxpou



## Highlight lines

click on the line number to highlight one line. For multiple, press shift.

https://github.com/maxpou/dictionary-game/blob/77df749b615b76d661a6bead1084be5650fd438e/.travis.yml#L3-L5


## Not only for your code

PDF, 3D visualisation

## API (~REST or GraphQL)



## The power of Webhooks

## Bonus: Octodex

Octodex is a kind of Octocat gallery, the mascot fot GitHub.
https://octodex.github.com/
