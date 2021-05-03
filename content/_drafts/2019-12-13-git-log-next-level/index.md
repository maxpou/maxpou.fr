---
title: 'Bringing git log to the next level'
slug: git-log-next-level
language: en
date: 2019-12-22
cover: ./cover.jpg
tags:
  - Git
---

I recently published my [Git Cheat Sheet](https://dev.to/maxpou/git-cheat-sheet-advanced-3a17) where
I shared all my tips for git. This year, I wrote 6 posts and 3 about Git so, I thought this one
would be the last one. But, it was before
[I saw this suggestion](https://dev.to/vadorequest/comment/ikap).

I used to list my commits with `git log --oneline --decorate --graph`

## The basic: oneline + decorate + graph

```bash
git log --oneline --decorate --graph
# aliased by
alias glog='git log --oneline --decorate --graph'
```

![git log --oneline --decorate --graph](./basic.png)

Small and consise: everything I like. I found this command perfect until I found the next one!

## glol: git log on steroids

```bash
glol
# aliased by
alias glol='git log --graph --pretty='\''%Cred%h%Creset -%C(auto)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset'\'
```

![git log --oneline --decorate --graph](./git-log-advanced.png)

## glols: the same but with diff included

glols = Git log + ls

```bash
glols
# aliased by
glols='git log --graph --pretty='\''%Cred%h%Creset -%C(auto)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset'\'' --stat'
```

![](./git-log-with-files.png)

If you use oh-my-zsh, these commands should be here by default
