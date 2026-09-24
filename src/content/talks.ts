type Language = 'en' | 'fr'

type TalkEvent = {
  date: string
  eventName: string
  city: string
  link?: { label: string; url: string; language: Language }
}

type Talk = {
  title: string
  language: Language
  link: string
  events: TalkEvent[]
}

type Training = {
  title: string
  language: Language
  url: string
  details?: string
  event?: Omit<TalkEvent, 'link'>
}

type Presentation = {
  title: string
  language: Language
  url?: string
  client?: string
  date?: string
}

export const talks: Talk[] = [
  {
    title: 'Web Accessibility 101',
    language: 'en',
    link: 'https://a11y-slides.netlify.app/',
    events: [
      {
        date: '09/2021',
        eventName: 'Orderfox',
        city: 'Zürich, Switzerland',
      },
      {
        date: '09/2020',
        eventName: 'Visma talk',
        city: 'Remote',
      },
    ],
  },
  {
    title: 'Effective Frontend testing',
    language: 'en',
    link: 'https://slides.maxpou.fr/effective-frontend-testing/',
    events: [
      {
        date: '09/2020',
        eventName: 'Vue.js Kenya',
        city: 'Remote',
      },
      {
        date: '11/2018',
        eventName: 'Visma talk',
        city: 'Madrid, Spain',
      },
      {
        date: '10/2018',
        eventName: 'VSware',
        city: 'Dublin, Ireland',
      },
    ],
  },
  {
    title: 'Progressive Web Apps: Your web app on steroids',
    language: 'en',
    link: 'https://slides.maxpou.fr/pwa-app-on-steroids/index.html',
    events: [
      {
        date: '09/2018',
        eventName: 'DublinJS',
        city: 'Remote',
      },
      {
        date: '06/2018',
        eventName: 'Devoxx',
        city: 'Kraków, Poland',
        link: {
          label: 'Video',
          language: 'en',
          url: 'https://www.youtube.com/watch?v=6Qids36T7DA',
        },
      },
      {
        date: '05/2018',
        eventName: 'VSware',
        city: 'Dublin, Ireland',
      },
      {
        date: '03/2018',
        eventName: 'Voxxed Days',
        city: 'Vienna, Austria',
        link: {
          label: 'Video',
          language: 'en',
          url: 'https://www.youtube.com/watch?v=sS6IDU6pVHo',
        },
      },
    ],
  },
  {
    title: 'Vue.js - Yet another JavaScript Framework (company conference)',
    language: 'en',
    link: 'https://slides.maxpou.fr/vuejs-yet-another-js-framework/index.html',
    events: [
      {
        date: '12/2017',
        eventName: 'Hostelworld Technology Submit',
        city: 'Dublin, Ireland',
      },
    ],
  },
  {
    title: 'Immutability for functional JavaScript',
    language: 'en',
    link: 'https://slides.maxpou.fr/immutability-js/index.html',
    events: [
      {
        date: '09/2017',
        eventName: 'DublinJS',
        city: 'Dublin, Ireland',
      },
    ],
  },
  {
    title: 'Github Tips&Tricks',
    language: 'en',
    link: 'https://slides.maxpou.fr/github-tips-tricks/index.html',
    events: [
      {
        date: '02/2017',
        eventName: 'Open Source Meetup',
        city: 'Dublin, Ireland',
        link: {
          label: 'Blog post',
          language: 'en',
          url: 'https://www.maxpou.fr/github-tips-and-tricks',
        },
      },
    ],
  },
  {
    title: 'Make your code great again with the Object Calisthenics',
    language: 'en',
    link: 'https://slides.maxpou.fr/object-calisthenics/index.html',
    events: [
      {
        date: '06/2017',
        eventName: 'Web2Day',
        city: 'Nantes, France',
        link: {
          label: 'Video',
          language: 'fr',
          url: 'https://www.youtube.com/watch?v=7Hf7q1L8Nh8',
        },
      },
      {
        date: '05/2017',
        eventName: 'PHPTour',
        city: 'Nantes, France',
        link: {
          label: 'Video',
          language: 'fr',
          url: 'https://www.youtube.com/watch?v=aB9pmdtGZjE',
        },
      },
      {
        date: '02/2017',
        eventName: 'PHP meetup',
        city: 'Dublin, Ireland',
      },
      {
        date: '11/2016',
        eventName: 'Hostelworld.com',
        city: 'Dublin, Ireland',
      },
    ],
  },
  {
    title: 'GraphQL/Falcor: Why killing REST?',
    language: 'en',
    link: 'https://slides.maxpou.fr/graphql-falcor-why-killing-rest/index.html',
    events: [
      {
        date: '04/2016',
        eventName: 'Human Talk',
        city: 'Nantes, France',
      },
    ],
  },
  {
    title: 'REST & Symfony',
    language: 'en',
    link: 'https://slides.maxpou.fr/about-rest-symfony/index.html',
    events: [
      {
        date: '02/2016',
        eventName: 'SfPot',
        city: 'Nantes, France',
        link: {
          label: 'Video',
          language: 'fr',
          url: 'https://www.youtube.com/watch?t=2220&v=F0BRnczxTWQ&feature=youtu.be',
        },
      },
      {
        date: '02/2016',
        eventName: 'Conserto',
        city: 'Nantes, France',
      },
    ],
  },
]

export const trainingsAndWorkshops: Training[] = [
  {
    title: 'Vue.js Workshop - Build a StackOverflow app using Vue.js',
    language: 'en',
    url: 'https://slides.maxpou.fr/vue-workshop/index.html#/',
    event: {
      date: '02/2018',
      eventName: 'DublinJS',
      city: 'Dublin, Ireland',
    },
  },
  {
    title: 'Vue.js training',
    language: 'en',
    details: 'for Hostelworld',
    url: 'https://slides.maxpou.fr/vuejs-training/index.html#/',
  },
  {
    title: 'Vue.js workshop',
    language: 'en',
    details: 'for Hostelworld',
    url: 'https://slides.maxpou.fr/vuejs-training/_book/docs/',
  },
  {
    title: 'Symfony2 Basics',
    language: 'en',
    details: 'for Conserto and La Poste',
    url: 'https://slides.maxpou.fr/symfony2-basics-conserto/index.html#/',
  },
  {
    title: 'PHP Basics',
    language: 'en',
    url: 'https://slides.maxpou.fr/php-basics-conserto/index.html#/',
  },
]

export const presentations: Presentation[] = [
  {
    title: 'Package management with NPM',
    language: 'en',
    client: 'Orderfox',
    date: '03/2022',
    url: 'https://npm-nodesmodules.netlify.app/index.html?slideIndex=0&stepIndex=0',
  },
  {
    title: 'An introduction to GraphQL',
    language: 'en',
    client: 'Orderfox',
    date: '11/2021',
    url: 'https://slides.maxpou.fr/GraphQL-introduction/?slideIndex=0&stepIndex=0',
  },
  {
    title: 'JS Today - a (re-)introduction to JavaScript',
    language: 'en',
    client: 'Hostelworld',
    date: '06/2017',
    url: 'https://slides.maxpou.fr/js-today-2017/index.html#/',
  },
  {
    title: "Redis et l'écosysteme Symfony",
    language: 'fr',
    client: 'La Poste',
    date: '03/2016',
    url: 'https://slides.maxpou.fr/redis-doctrine-sf/index.html#/',
  },
  {
    title: "Présentation d'Elasticsearch",
    language: 'fr',
    client: 'La Poste',
    date: '03/2016',
    url: 'https://slides.maxpou.fr/elasticsearch-php/index.html#/',
  },
  {
    title: 'Pourquoi utiliser un framework comme Symfony2',
    language: 'fr',
    client: 'Conserto clients',
  },
  {
    title: 'Dissertation defence (Software Architect degree)',
    language: 'fr',
    url: 'https://slides.maxpou.fr/afcepf-soutenance-memoire/index.html#/',
  },
]
