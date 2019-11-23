# VSware code review guide lines


## Benefits of PR

Discuss about the code
* spot potentials bugs
* (eventually) code style
* architecture

Be a better developper! Reading code is a good way to improve your coding skill!

## Definition of done

**Author**
* 1 issue, 1 PR.
* Build MUST be green.
* minimum 2 approvals before merge.
  * more reviewers don’t necessarily mean fewer defects
  * more reviewers spend less time
* UI/UX changes? add screenshots/capture. Need a tool? Use [Giphy](https://itunes.apple.com/us/app/giphy-capture-the-gif-maker/id668208984)!

**Reviewer**
* you don't see apparent bugs/regression
* you're able to maintain the code
* you fully understand the code and the underlying changes
* PR is thumbed up (GitLab + slack)
* Code is tested

Have some doubt? `git pull` the code and test it locally!
Don't forget to add a message to prevent merge.

## Flow

1. write code...
2. open a pull request and assign it to yourself
3. review your own code on Gitlab. Try to spot `console.debug`, `// dead code`...
4. post it on the #codereviewrequests Slack channel
5. get your 2 thumbs up and resolve conversation
6. assign to QA


## Best practices

* Code review should be about code and only the code.
* Keep your PR small.
  > ask a programmer to review 10 lines of codes, they'll fill 10 issues
  > ask them to review 500 lines of code, they will say it looks good.
* don't do someone else's job. 
  * "You forget a semicolon" => is a robot job. 
  * "Tests are failing" => GitLab is already complaining. Don't need to write another comment.
* big change? communicate! If your PR includes big change (framework version...), the team must be aware!
* Nitpicking comments? Prefix it with "nit" or "nitpicking"
* The code review's author is not a piñata. So, don't be a jerk.
  * Avoid: "your code is unreadable".
  * Instead, prefer proposing alternative implementations "it could be better to split this code into 2 different functions". (assume the author already considered them)
* No sneaky update. Don't take leverage of a big pull request to force or hide a change.
* Ask for clarification. ("I didn't understand. Can you clarify?"). Even if the PR had already been approved by someone else.
* Avoid ownership words ("mine", "not mine", "yours"). Once the code is merged, it's everybody's code. Not yours.
* Avoid statements words like "obviously", "everyone knows", "just"... something "simple" for you is not necessarily that simple for someone else
* Remember that you are here to provide feedback, not to be a gatekeeper.
* Remember that behind each Pull Request, there's a human who spent time to write this code (size of the PR is not necessarily correlated to the time spent on it).
* The pull request author is not a piñata.
* It's also valid for reviewer's comment. Try to respond to every comment.
* Your opinion is not necessary everybody's opinion.
* Final editorial control rests with the pull request author.
* When you add change, clean up your git log.
  * 1 commit for the changes
  * 1 commit for the requested changes. Reviewers don't want to go through 20 commits to see changes you did
  * If your PR got several commits, consider squashing (squash and merge)
* Favour one-to-one conversation
* You're not on a Reddit forum. Move philosophical/academic conversation to the weekly meeting (...or not!!!).
* You are not your code.
* If you find something you like, say it 👏


## List of valid reasons to 👎 a PR

* (none)

## Tips to better read code

* Use the hide whitespace option.
* If your PR is not ready, mark it as WIP (prefix it with `WIP:`). Don't waste someone else time!


Largely based on [thoughtbot code review guide](https://github.com/thoughtbot/guides/tree/master/code-review)