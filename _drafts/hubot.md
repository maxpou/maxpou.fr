---
layout: post
title: Hubot
tags: ["GitHub", "Bot"]
image:
    feature: articles/2017/hubot/hubot_shema.jpg
---

Je regardais l'autre jour cette conférence d'Alain Hélaïli à propos sur le fonctionnement interne de [Github.com](https://github.com). Autant, je connaissais bien l'outil, mais pas du tout l'entreprise derrière. Bon il s'avère, qu'ils sont ~600 githubber et pour une bonne partie, éparpillés aux quatre coins du globe. Arrivé à ce moment de la présentation de la boîte, je me suis dit que ça devait-être assez chaud patate côté communication (sans compter les problèmes de timezone)... Et bien en fait non ! Ils déploient même en production plusieurs dizaines de fois par jour, les doigts dans le nez !

![Hubot]({{ site.url }}/images/articles/2017/hubot/hubot.jpg)

Bon en fait, le secret de Github c'est **Hubot**, AKA l'*employé le plus productif de Github*. N'allez pas chercher son profil Linkedin puisque Hubot est un bot. Pour faire simple, ce robot va exécuter tout un panel de scripts qu'on lui aura demandé de faire, via son client de chat préféré (Slack, Skype, XMPP...).

![Slack exemple]({{ site.url }}/images/articles/2017/hubot/slack.png)
*exemple d'intégration avec Slack*

Et Parmi les types de scripts on pourra trouver :

* des trucs funs : trouve moi des photos de chats (va ensuite chercher sur Google Image), trouve moi des gif d'animaux rogolos, affiche moi le dernier CommitStrips, où sont les restos dans le quartier qui sont ouverts...
* des utilitaires : traduit moi cette phrase en serbe, dessine moi le plan de Dublin...
* des graphs : statistiques de fréquentation du site, statistiques de temps de réponse, taux d'erreurs...
* des outils métiers internes à la boîte : qui est malade aujourd'hui ? où est le bureau de tel collègue...
* des outils ops : déploie-moi tout ça en production (ou sur un serveur en particulier), création automatique d'issue si un [test du singe a cassé](https://github.com/marmelab/gremlins.js/)...

Bref, il n'y a pas vraiment de limites.
L'objectif du **ChatOps** c'est de s'affranchir de tous ces différents portails pour interagir via un chat, de manière ouverte et transparente.


## Super, on commence quand ?

Après cette introduction, on va rentrer un peu plus dans le technique.
Hubot a besoin de NodeJS pour tourner. Pour ne pas polluer sa machine avec un NodeJS qui change de version tous les quatre matins, j'ai créé une image Docker qui fait tourner le tout : [github.com/maxpou/hubot-docker](https://github.com/maxpou/hubot-docker).

Voici le processus d'installation :

```bash
git clone https://github.com/maxpou/hubot-docker
cd hubot-docker
# construction de l'image
docker build -t hubot --rm .
# création + exécution du conteneur
docker run -it -v $PWD/hubot:/hubot hubot bash
# A l'intérieur du conteneur, on lance le générateur Yéoman
yo hubot
```

Répondez ce que vous voulez aux questions du générateur.

```bash
docker@100dc27cbdb2:/hubot$ yo hubot
                     _____________________________  
                    /                             \
   //\              |      Extracting input for    |
  ////\    _____    |   self-replication process   |
 //////\  /_____\   \                             /
 ======= |[^_/\_]|   /----------------------------  
  |   | _|___@@__|__                                
  +===+/  ///     \_\                               
   | |_\ /// HUBOT/\\                             
   |___/\//      /  \\                            
         \      /   +---+                            
          \____/    |   |                            
           | //|    +===+                            
            \//      |xx|                            

? Owner John DOE
? Bot name mybot
? Description my superhero
? Bot adapter slack
# et après, tout plein de npm info pour dire que ça télécharge/installe
```

Dans cet exemple, j'ai utilisé le provider de slack. Pour l'utilisation que l'on va en avoir, vous pouvez vous créer un compte gratos.
Une fois fait, allez dans `/apps`, recherchez hubot, cliquez sur installer et donnez lui un petit nom comme demandé.
Ensuite, copier dans le presse papier le token généré. Retournez dans la console et éxécutez ceci : `HUBOT_SLACK_TOKEN=xoxb-119480690023-J6sFQXo0jE1VKQW7dWLVsDxi bin/hubot --adapter slack`.

Surprise, vous voyez dans Slack un nouvel invité, c'est **Hubot**. Invitez le ("/invite hubot") dans une room et commencez à papoter.

![Une conversation très intéressante]({{ site.url }}/images/articles/2017/hubot/slack-blabla.png)

Et voilà le travail ! C'est tout !

![Slack exemple]({{ site.url }}/images/articles/2017/hubot/bb8_thumbsup.gif)

## Pimp my bot

Bon si vous voulez un peu pimper votre bot c'est pas bien compliqué. La communauté a fournit pas mal de scripts sur étagère que l'on peut trouver ici: https://github.com/hubot-scripts.  
Si ce n'est pas suffisant ou si vous voulez créer le votre commencez par ouvrir le fichier scripts/example.coffee. Comme pas mal de projets de Github, le Javascript est compilé à partir de [CoffeeScript](http://coffeescript.org/). Mais vous pouvez aussi écrire votre code en JS !

La [documentation officielle](https://hubot.github.com/docs/scripting/) est aussi un très bon point de départ.


Ho pendant que j'y suis, voici la conférence en question :

<iframe width="560" height="315" src="https://www.youtube.com/embed/jCwzf9adAtE" frameborder="0" allowfullscreen></iframe>
