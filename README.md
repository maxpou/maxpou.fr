# maxpou.github.io
[![Build Status](https://travis-ci.org/maxpou/maxpou.github.io.svg?branch=master)](https://travis-ci.org/maxpou/maxpou.github.io)

My blog using [HPSTR Jekyll Theme](https://github.com/mmistakes/hpstr-jekyll-theme) <3

## Installation (without Docker)

1. `gem install bundler`
2. `cd /var/www/public/maxpou.github.io`
3. `bundle install`
4. Adapt \_config.yml (url field)
5. `jekyll serve`

## Installation with Docker

1. Build container:

    ```
    docker build -t maxpou/maxpou.github.io --no-cache .
    ```

2. Run container:

    ```
    docker run --rm -v $PWD -p 4000:4000 maxpou/maxpou.github.io -H 0.0.0.0 --drafts
    ```

3. Retrieve IP adress: `# docker inspect -f '{{ .NetworkSettings.IPAddress }}' <containerId>`

4. Visit http://<ipAdress>:4000

**Note:** --watch option don't work :'(
