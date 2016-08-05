---
layout: post
title: Vagrant, Symfony and Windows are not incompatibles
description: "en"
tags: ["Symfony", "CLI", "PHP"]
lang: en
image:
    feature: articles/vagrant-windows/header.png
---

# Vagrant, Symfony and Windows are not incompatibles

At work, I'm using Vagrant on my Windows 10 because Docker really sucks on windows :(  
So after promote [PuPHPet](https://puphpet.com/), I'm now using [Scotch Box](https://box.scotch.io/).

In a few words, this is some features already in this box:

* Ubuntu 14.04 LTS (Trusty Tahr)
* PHP 5.6
* Ruby 2.2.x
* MySQL, PostreSQL, SQLite, MongoDB
* Redis, Memcache, Memcached
* Vim, Git, cURL, Composer, Node, NPM, Mailcatcher, Bower, Grunt...
* ...

It is a good base.  
For my needs, I pimp this box (take a look on [my fork (on GitHub)](https://github.com/maxpou/scotch-box)). I found it pretty cool on my own linux... but on my Windows, it's **really SLOW!**

![]({{ site.url }}/images/articles/vagrant-windows/snail-1.gif)

*Before: running a Symfony app into a Vagrant box*

Here is some tip's to speed up your application.


## First step: Install plugins

1. Install [VirtualBox Guest plugin](https://github.com/dotless-de/vagrant-vbguest)

     ```
     vagrant plugin install vagrant-vbguest
     ```

2. Install [Vagrant WinNFSd plugin](https://github.com/winnfsd/vagrant-winnfsd)

    ```
    vagrant plugin install vagrant-winnfsd
    ```

I don't reinvent the wheel here. If you type `speed up vagrant on windows` you will see the same results.  
With this config I switch **from ~16s to ~4s for a page to load**.

![step 1]({{ site.url }}/images/articles/vagrant-windows/1.png)

## Second step: Install PHP7

In my case PHP7 really decrease page loading time. Be careful, installing PHP7 will remove php5.

**1. Update package list**

    {% highlight PowerShell %}
    sudo apt-get install python-software-properties
    sudo LC_ALL=C.UTF-8 add-apt-repository ppa:ondrej/php
    {% endhighlight %}

**2. Install PHP7 and remove PHP5**

    {% highlight PowerShell %}
    sudo apt-get update
    sudo apt-get purge php5-common -y
    sudo apt-get install -y \
        && php7.0 \
        && php7.0-fpm \
        && php7.0-mysql \
        && php-curl \
        && libapache2-mod-php7.0 \
        && php7.0-mbstring
    sudo apt-get --purge autoremove -y
    {% endhighlight %}

**3. Set timezone (i.e. date.timezone = Europe/Paris)**

    ```
    sudo vi /etc/php/7.0/cli/php.ini
    sudo vi /etc/php/7.0/apache2/php.ini
    ```

**4. Restart apache service**

```
sudo a2enmod php7.0
sudo service apache2 restart
```

Now my app **run in ~2s**.

![step 2]({{ site.url }}/images/articles/vagrant-windows/2.png)


## Third step: Don't sync cache/log folders with your windows host!

On Benjamin [Eberlei's blog](http://www.whitewashing.de/2013/08/19/speedup_symfony2_on_vagrant_boxes.html), I found this last tip: put yours logs and cache on non-shared folders.


```php
<?php
//app/AppKernel.php

public function getCacheDir()
{
    if (in_array($this->environment, array('dev', 'test'))) {
        return '/dev/shm/application-name/cache/' .  $this->environment;
    }

    return parent::getCacheDir();
}

public function getLogDir()
{
    if (in_array($this->environment, array('dev', 'test'))) {
        return '/dev/shm/application-name/logs';
    }

    return parent::getLogDir();
}
```

If you need, here is some aliases to help you.

```sh
# Remove cache
alias cache-clear='rm -rf /dev/shm/application-name/cache/'
# Copy logs into your Sf project
alias cplogs='cp -R /dev/shm/application-name/logs /var/www/application-name/public/app'
```


And... tadaaaa! It took Some hundred milliseconds ♥ (I also add some SQL request to MySQL... just for fun).

![step 3]({{ site.url }}/images/articles/vagrant-windows/3.png)

![]({{ site.url }}/images/articles/vagrant-windows/snail-2.gif)

*After: running a Symfony app into a Vagrant box*
