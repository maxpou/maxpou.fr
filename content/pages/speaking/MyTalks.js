import React from 'react'
import {
  List,
  Link,
  Item,
  Event,
  Media,
} from '../../../src/components/TalkList'

const MyTalks = () => {
  return (
    <>
      <h2>Talks</h2>
      <List>
        <Item>
          <Link href="https://a11y-slides.netlify.app">
            🇬🇧 Web Accessibility 101
          </Link>
          <Event>🗓 09/2021, Orderfox, Zürich, Switzerland</Event>
          <Event>🗓 09/2020, Visma talk, Remote</Event>
        </Item>
        <Item>
          <Link href="https://slides.maxpou.fr/effective-frontend-testing/">
            🇬🇧 Effective Frontend testing
          </Link>
          <Event>🗓 09/2020, Vue.js Kenya, Remote</Event>
          <Event>🗓 11/2018, MadridJS, Madrid, Spain</Event>
          <Event>🗓 10/2018, VSware, Dublin, Ireland</Event>
        </Item>
        <Item>
          <Link href="https://slides.maxpou.fr/pwa-app-on-steroids/index.html">
            🇬🇧 Progressive Web Apps: Your web app on steroids
          </Link>
          <Event>🗓 09/2018, DublinJS, Dublin, Ireland</Event>
          <Event>
            🗓 06/2018, Devoxx, Kraków, Poland —{' '}
            <Media href="https://www.youtube.com/watch?v=6Qids36T7DA">
              🇬🇧 video (YouTube)
            </Media>
          </Event>
          <Event>🗓 05/2018, VSware, Dublin, Ireland</Event>
          <Event>
            🗓 03/2018, Voxxed Days, Vienna, Austria —{' '}
            <Media href="https://www.youtube.com/watch?v=sS6IDU6pVHo">
              🇬🇧 video (YouTube)
            </Media>
          </Event>
        </Item>
        <Item>
          <Link href="https://slides.maxpou.fr/vuejs-yet-another-js-framework/index.html">
            🇬🇧 Vue.js - Yet another JavaScript Framework (company conference)
          </Link>
          <Event>
            🗓 12/2017, Hostelworld Technology Submit, Dublin, Ireland
          </Event>
        </Item>
        <Item>
          <Link href="https://slides.maxpou.fr/immutability-js/index.html">
            🇬🇧 Immutability for functional JavaScript
          </Link>
          <Event>🗓 09/2017, DublinJS, Dublin, Ireland</Event>
        </Item>
        <Item>
          <Link href="https://slides.maxpou.fr/github-tips-tricks/index.html">
            🇬🇧 Github Tips&amp;Tricks
          </Link>
          <Event>
            🗓 02/2017, Open Source Meetup, Dublin, Ireland —{' '}
            <Media href="https://www.maxpou.fr/github-tips-and-tricks/">
              🇬🇧 blog post
            </Media>
          </Event>
        </Item>
        <Item>
          <Link href="https://slides.maxpou.fr/object-calisthenics/index.html">
            🇬🇧 Make your code great again with the Object Calisthenics
          </Link>
          <Event>
            🗓 06/2017, Web2Day, Nantes, France —{' '}
            <Media href="https://www.youtube.com/watch?v=7Hf7q1L8Nh8">
              🇫🇷 video (YouTube)
            </Media>
          </Event>
          <Event>
            🗓 05/2017, PHPTour, Nantes, France —{' '}
            <Media href="https://www.youtube.com/watch?v=aB9pmdtGZjE">
              🇫🇷 video (YouTube)
            </Media>
          </Event>
          <Event>🗓 02/2017, Dublin's PHP meetup, Dublin, Ireland</Event>
          <Event>🗓 11/2016, Hostelworld.com, Dublin, Ireland</Event>
        </Item>
        <Item>
          <Link href="https://slides.maxpou.fr/graphql-falcor-why-killing-rest/index.html">
            🇬🇧 GraphQL/Falcor: Why killing REST?
          </Link>
          <Event>🗓 04/2016, Human Talk, Nantes, France</Event>
        </Item>
        <Item>
          <Link href="https://slides.maxpou.fr/about-rest-symfony/index.html">
            🇬🇧 REST &amp; Symfony
          </Link>
          <Event>
            🗓 02/2016, SfPot, Nantes, France —{' '}
            <Media href="https://youtu.be/F0BRnczxTWQ?t=2220">
              🇫🇷 video (YouTube)
            </Media>
          </Event>
          <Event>🗓 02/2016, Conserto, Nantes, France</Event>
        </Item>
      </List>

      <h2>Trainings & Workshops</h2>
      <List>
        <Item>
          <Link href="https://slides.maxpou.fr/vue-workshop/index.html">
            🇬🇧 Vue.js Workshop - Build a StackOverflow app using Vue.js
          </Link>
          <Event>🗓 02/2018, DublinJS, Dublin, Ireland</Event>
        </Item>
        <Item>
          <Link href="https://slides.maxpou.fr/vuejs-training/index.html">
            🇬🇧 Vue.js Training
          </Link>
          <Link href="https://slides.maxpou.fr/vuejs-training/_book/docs/">
            🇬🇧 Vue.js Workshop
          </Link>
          <em>
            {' '}
            — Training for{' '}
            <Link href="http://www.hostelworld.com/">Hostelworld</Link>
          </em>
        </Item>
        <Item>
          <Link href="https://slides.maxpou.fr/symfony2-basics-conserto/index.html">
            🇬🇧 Symfony2 Basics
          </Link>{' '}
          —{' '}
          <em>
            PHP training for <a href="http://www.conserto.pro/">Conserto</a>{' '}
            &amp; <a href="http://www.laposte.fr">La Poste</a>
          </em>
        </Item>
        <Item>
          <Link href="https://slides.maxpou.fr/php-basics-conserto/index.html">
            🇬🇧 PHP Basics
          </Link>{' '}
          —{' '}
          <em>
            PHP training for <a href="http://www.conserto.pro/">Conserto</a>
          </em>
        </Item>
      </List>

      <h2>Others presentations</h2>
      <List>
        <Item>
          <Link href="https://npm-nodesmodules.netlify.app/index.html?slideIndex=0&stepIndex=0">
            🇬🇧 Package management with NPM
          </Link>{' '}
          — <em>Presentation for Orderfox (03/2022)</em>
        </Item>
        <Item>
          <Link href="https://slides.maxpou.fr/GraphQL-introduction/">
            🇬🇧 An introduction to GraphQL
          </Link>{' '}
          — <em>Presentation for Orderfox (11/2021)</em>
        </Item>
        <Item>
          <Link href="https://slides.maxpou.fr/js-today-2017/index.html">
            🇬🇧 JS Today - a (re-)introduction to JavaScript
          </Link>{' '}
          —{' '}
          <em>
            Presentation for{' '}
            <a href="https://www.hostelworld.com/">Hostelworld</a> (06/2017)
          </em>
        </Item>
        <Item>
          <Link href="https://slides.maxpou.fr/redis-doctrine-sf/index.html">
            🇫🇷 Redis et l'écosysteme Symfony
          </Link>{' '}
          —{' '}
          <em>
            Presentation for <a href="http://www.laposte.fr">La Poste</a>{' '}
            (03/2016) —{' '}
            <Media href="https://www.maxpou.fr/cache-doctrine-avec-redis/">
              🇫🇷 blog post
            </Media>
          </em>
        </Item>
        <Item>
          <Link href="https://slides.maxpou.fr/elasticsearch-php/index.html">
            🇫🇷 Présentation d'Elasticsearch
          </Link>{' '}
          —{' '}
          <em>
            Presentation for <a href="http://www.laposte.fr">La Poste</a>{' '}
            (03/2016)
          </em>
        </Item>
        <Item>
          <Link href="#">🇫🇷 Pourquoi utiliser un framework comme Symfony2</Link>{' '}
          —{' '}
          <em>
            Presentation for <a href="http://www.conserto.pro/">Conserto</a>{' '}
            clients
          </em>
        </Item>
        <Item>
          <Link href="https://slides.maxpou.fr/afcepf-soutenance-memoire/index.html">
            🇫🇷 Dissertation defence (Software Architect degree)
          </Link>
        </Item>
      </List>
    </>
  )
}

export default MyTalks
