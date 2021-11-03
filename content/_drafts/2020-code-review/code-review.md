---
title: 'Code Reviews made it Healthy'
slug: code-review-guidelines
language: en
date: 2020-10-01
cover: ./cover.jpeg
tags:
  - Code Quality
---

## Benefits of PR

- Discuss about the code: I have a problem, this is how I solved it;
- Spot potentials bugs;
- Discuss about the architecture.

And also be a better developer. **Reading code is probably the best way to improve your coding
skills**!

## Definition of Done

**Author**

- 1 issue, 1 PR.
- PR MUST be marked green by CI.
- 2 approvals before merging.
  - more reviewers don't necessarily mean fewer defects
  - more reviewers spend less time
- UI/UX changes? add screenshots/capture. Need a tool for video recording? Use
  [Giphy](https://itunes.apple.com/us/app/giphy-capture-the-gif-maker/id668208984)!
- Your PR is described and follow the template.

**Reviewer**

- You don't see apparent bugs/regression;
- You understand the problem and how the author solved it;
- You fully understand the code and the underlying changes (you can maintain the code);
- No dead code or TODOs;
- Code is consistent with the rest of the application;
- Code is tested and documented.

If everything looks good to you, thumbed up/approve the Pull Request.

Have some doubt? `git pull` the code and test it locally! (If so, you can add a message to prevent
merge when you're testing it).

## Flow

1. Write code...
2. Open a pull request and assign it to yourself
3. Review your own code on Gitlab. Try to spot `console.debug`, `// dead code`...
4. Remove the WIP status. Make sure you filled the description field / the pull request template
5. Post it on the #codereviewrequests Slack channel
6. Get your 2 thumbs up and resolve conversation
7. Merge it

_Feel free to invert 1 and 2. Opening a PR before writing code is a good way to show your colleagues
what you're working on!_

## Best practices

### For everybody

- Code review should be about code and only the code.
- Your opinion is not necessary everybody's opinion.
- PR are not a place to shine / show off with your coding skills.
- Final editorial control rests with the pull request author.
- Avoid ownership words ("mine", "not mine", "yours"). Once the code is merged, it's everybody's
  code. Not yours.
- Avoid statements words like "obviously", "everyone knows", "just"... something "simple" for you is
  not necessarily that simple for someone else.
- Favour one-to-one conversation.
- [Respectful Reviews === Useful Reviews](https://testing.googleblog.com/2019/11/code-health-respectful-reviews-useful.html)
- You're not on a Reddit forum. Move philosophical/academic conversation to the weekly meeting ...or
  not!
- You are not your code.
- If you find something you like, **say it** 👏

### For the author

- Keep your PR as small as posible.
  > ask a programmer to review 10 lines of codes, they'll fill 10 issues ask them to review 500
  > lines of code, they will say it looks good.
- Big change? communicate! If your PR includes big change (framework version...), the team must be
  aware!
- (Try to) respond to every comment.
- Don't do sneaky updates. Don't take leverage of a big pull request to force or hide a change.
  Same, don't add big changes after getting approvals! It's unfair!
- Provide context. It's ok to copy/paste code from somewhere, we all do. If you did or if you
  followed random tutorial, add the link to the pull request (or in a comment in the code).
- Keep the git log clean.
  - 1 commit for the requested changes. Reviewers don't want to go through 20 commits to see changes
    you did
  - `git rebase` and `git commit --amend --no-edit` are your friends
  - If your PR got several commits, consider squashing (squash and merge)

### For the reviewer

- Don't do someone else's job.
  - "You forget a semicolon" => Stop. It's worthless because it's a robot job, not a human job.
  - "Tests are failing" => Same. We have robots for that.
- Prefix _nitpicky comments_ with "nit" or "nitpicking".
- The code review's author is not a piñata. So, don't be a jerk.
  - Avoid: "your code is unreadable".
  - Prefer proposing alternative implementations "You can also split this code into 2 different
    functions. What do you think about?" (assume the author already considered them)
- Ask for clarification. ("I didn't understand xxx. Can you clarify?"). Do it, even if the PR had
  already been approved by someone else.
- Remember that you are here to provide feedback, not to be a gatekeeper.
- Remember that **behind each Pull Request, there's a human who spent time to write this code** (the
  size of the PR is not necessarily correlated to the time spent on it).
- Done is better than perfect.

## List of valid reasons to 👎 a PR

- (none)

Declining a PR can be really harsh for the author. It should be the very last call. Favor 1-to-1
conversation instead and let the author decline his own PR or do the changes.

If the pull request bring something you consider harmful for the project, you can add an "🚨" emoji
to prevent the merge.

## Tips for better code review

- To remove noise, you can use the "hide whitespace" option.
- If your PR is not ready, mark it as _in progress_ (prefix it with `WIP:` in GitLab). Don't waste
  someone else time!
- Asking junior to review your code first. If a senior developper review the PR first, the junior
  will be less eager to spot issues.

_Inspired by
[thoughtbot code review guide](https://github.com/thoughtbot/guides/tree/master/code-review)._
