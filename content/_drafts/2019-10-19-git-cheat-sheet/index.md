---
title: "Git: Cheat Sheet (advanced)"
slug: git-cheat-sheet
language: en
date: 2019-10-19
cover: ./git-toolbox.png
tags: 
    - Git
---

If you find git confusing, I created this little cheat sheet! Please, note that I voluntary skipped the basic commands like `git commit`, `git pull/push`... This cheat sheet is intented for an advanced usage of git.

![Git Cheat Sheet](https://thepracticaldev.s3.amazonaws.com/i/ipejw88vw13j8rji8xjv.png)


## 🔍 Get the history

```bash
# Log in one line
git log --oneline

# Retrieve all commits by message
# Here all commit that contain 'homepage'
git log --all --grep='homepage'

# Retrieve all commit by author
git log --author="Maxence"
```

## 🙈Ooops #1: I reseted an unwanted commit. How to rollback?

```bash
# Get everything you did
git reflog

# then reset to the desired commit (i.e. HEAD@{4})
git reset HEAD@{4}
# ...or...
git reset --hard <commit-sha1>
```

For more detail about this command, I wrote another post:

{% post https://dev.to/maxpou/what-s-happens-when-you-git-commit-59n7 %}


## 🤦‍♀️Ooops #2: I mixed-up with my local repo. How to clean it?

```bash
git fetch origin
git checkout master
git reset --hard origin/master
# You're now up-to-date with master!
```

## 🕵🏻‍♂️Difference between my branch and `master`

```bash
git diff master..my-branch
```

## ✔ Custom commits

```bash
# Edit last commit
git commit --amend -m "A better message"

# Add something to the last commit without writing message again
git add . && git commit --amend --no-edit

# empty commit - can be useful to re-trigger CI build...
git commit --allow-empty -m "chore: re-trigger build"
```

## ♻️ Squash commit

*Let say I want to rebase the last 3 commits:*

1. `git rebase -i HEAD~3`
2. Leave the first "pick" and replace the rest by "squash"
3. Tidy up the commit message and save (`:wq` in vi).

{% youtube Waa9A_h4eHI %}


## 🎯Fixup

# TODO


## 📼Be kind rewind

You have multiple commit and you want to  

## TODO: graphic here!

```bash
# Rebase + run command on every commit ❤️
git rebase master --exec "npm run test"
```


## 🦋Stash

*Because it's not all about `git stash` and `git stash pop`* ;)

```bash
# save all tracked files
git stash save "your message"

# list your stashes
git stash list

# retrieve stash and delete
git stash apply stash@{1}
git stash drop stash@{1}
# ... or in 1 command
git stash pop stash@{1}
```

## 🗑 Clean

```bash
# remove branch that no longer exist on remote
git fetch -p

# remove all branch that contains "greenkeeper"
git fetch -p && git branch --remote | fgrep greenkeeper | sed 's/^.\{9\}//' | xargs git push origin --delete
```

## 🐙GitHub = `Git` + `Hub`

I use [Hub](https://github.com/github/hub) as a wrapper for git. To enable it you've to set hub as an alias for git (`alias git='hub'`).

```bash
# Open browser and go to the repository url (GitHub only)
git browse
```

Other commands [are available here](https://hub.github.com/hub.1.html).

## 🦄 Bonus: my favourite git aliases

```bash
alias g='git'
alias glog='git log --oneline --decorate --graph'
alias gst='git status'
alias gp='git push'
alias ga='git add'
alias gc='git commit -v'

# 🤘
alias yolo='git push --force'

# useful for daily stand-up
git-standup() {
    AUTHOR=${AUTHOR:="`git config user.name`"}

    since=yesterday
    if [[ $(date +%u) == 1 ]] ; then
        since="2 days ago"
    fi

    git log --all --since "$since" --oneline --author="$AUTHOR"
}
```
