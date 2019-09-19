---
title: "The reason why it's hard to loose code with Git"
slug: git-cant-loose-code
language: en
date: 2019-09-12
tags: 
    - git
---

> Oh no I lose my code with git...


## Git & Immutability



## Anatomy of a commit

Let's take a random commit.

> commit 7b6ea7210e5ad4eede67db60f6ca9475e49eac37 (HEAD -> master)  
> Author: Maxence Poutord <maxence.poutord[a]gmail.com>  
> Date:   Mon Jul 22 22:05:12 2019 +0200
> 
> feat: allow user to change name 


A Git commit tell you 4 things: 
* when this change was made;
* who changed it;
* what changed (you can see the detail with `git show <commit-SHA1>`);
* and why.

If you struggle with the why, [I wrote this post](https://www.maxpou.fr/git-conventional-commits). Since I use the conventional commit, I stopped worrying about the message.


## 3 States

In git, a file go threw 3 different

![3 states](./git-state.png)

* **Modified**: you've modified the file locally and it's saved on your IDE/Text editor.
* **Staged** After a `git add`. File is marked as modified, and should be added in the next commit.
* **Committed** The file is saved in your local DB.



## Rewriting the past

// ...

## Git reflog

## Caveat

When `git reflog` doesn't work:
* you git pull someone else code;
* `rm -rf ../myrepo && git clone github.com/myrepo`