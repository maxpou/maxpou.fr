# maxpou.github.io
[![Build Status](https://travis-ci.org/maxpou/maxpou.github.io.svg?branch=master)](https://travis-ci.org/maxpou/maxpou.github.io) [![Greenkeeper badge](https://badges.greenkeeper.io/maxpou/maxpou.github.io.svg)](https://greenkeeper.io/)

My blog using [HPSTR Jekyll Theme](https://github.com/mmistakes/hpstr-jekyll-theme) <3  
If you find a typo, pull request are welcome. Thank you so much!

## Installation (without Docker)

1. `gem install bundler`
2. `cd /var/www/public/maxpou.github.io`
3. `bundle install`
4. Adapt \_config.yml (url field)
5. `jekyll serve`

## Installation with Docker :whale:

1. Build container:

    ```
    docker build -t maxpou/maxpou.github.io --no-cache .
    ```

2. Run container:

    ```
    docker run --rm -v $PWD:/site -p 4000:4000 maxpou/maxpou.github.io -H 0.0.0.0 --draft
    ```

3. Retrieve IP adress:

  ```
  docker inspect -f '{{ .NetworkSettings.IPAddress }}' $(docker ps -f ancestor=maxpou/maxpou.github.io -q)
  ```

4. Visit `http://<ipAdress>:4000`
