import AvionImg from '../assets/projects/avion.png'
import DictionaryGameImg from '../assets/projects/dictionary-game.png'
import DockerSymfonyImg from '../assets/projects/docker-symfony.png'
import GitVubImg from '../assets/projects/gitvub.png'
import MorningDewImg from '../assets/projects/morning-dew.png'
import RecipesImg from '../assets/projects/recipes.jpg'
import MaxpouFrImg from '../assets/projects/website.jpg'
import YoutubeMateImg from '../assets/projects/youtube-mate.png'

export const projects = [
  {
    name: 'YoutubeMate',
    image: YoutubeMateImg,
    description:
      'An AI assistant that generates summaries of YouTube videos and saves you precious time!',
    url: 'https://www.youtube-mate.com',
    ghIcon: false,
    highlighted: true,
  },
  {
    name: 'Avion',
    image: AvionImg,
    description: 'Experience the thrill of flying in this 3D flight simulator.',
    url: 'https://air-max.netlify.app',
    ghIcon: false,
    highlighted: true,
  },
  {
    name: "Max's Kitchen",
    image: RecipesImg,
    description:
      'A collection of my favorite recipes, open-sourced for everyone to enjoy.',
    url: '/recipes',
    ghIcon: false,
    highlighted: true,
  },
  {
    name: 'gatsby-starter-morning-dew',
    image: MorningDewImg,
    description: 'A Gatsby.js starter to build lightning-fast websites!',
    url: 'https://github.com/maxpou/gatsby-starter-morning-dew',
    ghIcon: true,
    highlighted: true,
    isDead: true,
  },
  {
    name: 'docker-symfony',
    image: DockerSymfonyImg,
    description:
      'A complete stack to run a Symfony app into multiple containers (PHP, Nginx, MySQL, ELK, Redis) by using Docker compose. My most popular GitHub project!',
    url: 'https://github.com/maxpou/docker-symfony',
    ghIcon: true,
    highlighted: true,
  },
  {
    icon: '🏃',
    name: 'Runner Dashboard',
    description:
      'A dashboard I use to calculate pace, estimate finish times, and plan nutrition during a race.',
    url: '/apps/runner-dashboard',
  },
  {
    icon: '💰',
    name: 'Compound Interest Calculator',
    description:
      'See how your investments can grow over time with the power of compound interest.',
    url: '/apps/compound-interest-calculator',
  },
  {
    name: 'maxpou.fr',
    image: MaxpouFrImg,
    description: 'This website! Built with Astro and Tailwind.',
    url: 'https://github.com/maxpou/maxpou.fr',
    ghIcon: true,
  },
  {
    name: 'GitVub',
    image: GitVubImg,
    description:
      'A Progressive Web App (PWA) based on GitHub API. User can fetch GitHub repositories and read README.md files. An offline mode is also available.',
    url: 'https://github.com/maxpou/gitvub',
    ghIcon: true,
    isDead: true,
  },
  {
    name: 'Dictionary Game',
    image: DictionaryGameImg,
    description:
      'a Vue.js application created to improve my english vocabulary (fr/en). Words are stored in Firebase database.',
    url: 'https://github.com/maxpou/dictionary-game',
    ghIcon: true,
    isDead: true,
  },
  {
    icon: '🍺',
    name: 'Symfony Rest Beer Edition',
    description:
      "An application to showcase REST's best practices (HATEOAS, Swagger, etc.). The application uses PHP and Symfony 2.",
    url: 'https://github.com/maxpou/symfony-rest-beer-edition',
    ghIcon: true,
    isDead: true,
  },
]
