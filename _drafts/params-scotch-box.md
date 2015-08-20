---
layout: post
title: Paramétrer sa scotchbox
description: "Paramétrer sa scotchbox"
modified: 2015-08-19
tags: ["JavaScript"]
image:
    feature: abstract-2.jpg
    credit: dargadgetz
    creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

# Paramétrage de la scotch box

## Features et installation

L'ensemble des fonctionnalités sont disponibles [ici](https://box.scotch.io/).
Bien penser à cloner le fichier à partir de GitHub.

## Fichier host

Dans C:\Windows\System32\drivers\etc\ ouvrir le fichier host
Rajouter cette ligne : 192.168.33.10   dev.local

## Jekyll

* Installer Jekyll, bundler et intaller les composants
gem install jekyll
gem install bundler
bundle install

* Ajout de la redirection des ports + synchro des dossiers
config.vm.synced_folder "../../workspace/", "/var/www/public/", :nfs => { :mount_options => ["dmode=777","fmode=666"] }
config.vm.network "forwarded_port", guest: 4000, host: 4000
* lancer le serveur : jekyll serve -H 0.0.0.0 --drafts --force_polling
