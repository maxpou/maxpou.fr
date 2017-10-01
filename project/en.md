---
layout: page
title: Open-source Projects
description: "Personal projects open-source"
share: true
image:
    feature: articles/opensource/bg.png
---

# Personal projects open-source

## Docker-Symfony

Project's source: [github.com/maxpou/docker-symfony](https://github.com/maxpou/docker-symfony)

Docker-symfony is a complete stack to run a Symfony app into multiple containers (PHP7-FPM - NGINX - MySQL - ELK - REDIS) by using Docker compose. I've written [an article (in french sorry)](http://www.maxpou.fr/docker-pour-symfony/) to explain each steps to realize this whole.


## Symfony Rest Beer Edition

Project's source: [github.com/maxpou/symfony-rest-beer-edition](https://github.com/maxpou/symfony-rest-beer-edition)

Symfony Rest Beer Edition is an application to present some REST's best practices by using Symfony 2.8 (LTS).

* HATEOAS Implementation;
* Use plain olds HTTP verbs
* A self generated documentation with swagger format;
* Symfony's forms...

I try to maintain a high quality degree with a strong code coverage.


## MEAN APISpark Beer

Project's source: [github.com/maxpou/mean-apispark-beer](https://github.com/maxpou/mean-apispark-beer)

This project is a POC to test some technologies. There is 3 parts/steps inside:

* step 1: Contain an AngularJS app to manage beers. There is no real persistence because if you press F5 you will lost everything.
* step 2: Take 1st step and add a persistence with APISpark service (by RESTlet).
* step 3: Take 2nd step, remove APISpark and integrate all this application into a MEAN Stack (Mongodb, Express, AngularJs & Node.js).
There is also tests with mocha.


## Scotchbox

Project's source: [github.com/maxpou/scotch-box](https://github.com/maxpou/scotch-box)

This is a fork from [Scotch.io's Vagrant box](https://box.scotch.io/). If you want the real capital gain, checkout the 'pimpMyBox' folder. There is some customization insite (how to install PHP7, setup aliases, add a custom virtual host).


## analyticsCNIL

Project's source: [github.com/maxpou/analyticsCNIL](https://github.com/maxpou/analyticsCNIL)

In France, you must advertise your visitors if you track down yours users with web analytics tools like Piwik and Google Analytics. You must also propose to users if they wants to be track down (but nobody do it correctly).
[analyticsCNIL](https://github.com/maxpou/analyticsCNIL) is a Javascript plugin to generate this headband and offer 3 modes:

* 'normal': visitor can accept or refuse tracking.
* 'minimal': visitor has no choice (accept or ignore this headband). Tracking start when the visitor press the OK button.
* 'dontCare': the headband is only present to inform user that he is track down. Tracking start when the page is loaded.

There is also an option which recognize the DoNotTrack browser's option. If she active, user will never see this headband. Obviously, you can't use this option with the dontCare mod.


## pomodoro-ninja.gadget

Project's source: [github.com/maxpou/pomodoro-ninja.gadget](https://github.com/maxpou/pomodoro-ninja.gadget)

You are using the Pomodoro technique? This Windows 7/Vista widget is for you!
If you are a french reader, I wrote an article [about Pomodoro technique](http://www.maxpou.fr/productivite-ninja/#la-technique-du-pomodoro).  
