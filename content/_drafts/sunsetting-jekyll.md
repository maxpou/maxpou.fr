# Hello X goodbye Jekyll

I ran this blog under Jekyll for 3 years.
Few days ago, I was in the DublinJS meetup. As usual, the talk I didn't came for was the most interesting! The talk was about ember-ghost. A static generation website using Ember (JavaScript).

## Jenkins pro and cons

What I like:
- hosted on GH for free (I just pay)
- "backend-less" = fully static.
- Simple to use. There's no over complicated administration panel... well, there's no administration at all!
- theme. I really like what @mmistakes did for the hpstr-jekyll-theme!
- write my post in markdown in my IDE, git commit+push and my post is published!
- ...people can potentially submit PR if there's a typo somewhere.
- easy to take over even without Ruby skills! (see index.html)
- good perf (lighthouse)
- MIT License

What I don't like:
- I don't want to install ruby locally. But it's mandatory to get it when working on site structure;
- jekyll watch mode is slow with docker (2/3 sec to detect a change + 2 sec to recompile everything)
- adding plugins is very complicated (last time I wanted to change the code colors, it tooks me ~4 hours to find/setup the correct plugin). The transformation markdown to html is handled by Jekyll.
- service worker management  => ☠️


What I want for my next bloggin platform:
- remove all the think I dislike and keep the things I like 😃
- easy to install/configure
- easily configurable
- keep the existing messages (disqs). URL pattern must be configurable
- ideally in JS. I'm working on a day to day with Vue. So, it could be nice if it's something different (React, Ember...)!
- ... and something that works beyon the classic getting started (i.e. manage pagination...). I've ~25 posts 

## new platform

Tools I tried:

* Vuepress. Good to generate documentation... but there's curently no support for blogging.
* Gatsby. Very
* Ghost ()
* Ember-Ghost:

## Winner Gastby

* I ❤️ GraphQL
* React is cool
* Regarding to Vue they're pretty similars. React is better integrated in VSCode but devtools are far behind Vue devtools
* There's some magic. I'm missing a plain old router to match routes with pages
