import DockerSymfonyImg from '../assets/projects/docker-symfony.png'
import MorningDewImg from '../assets/projects/morning-dew.png'
import MaxpouFrImg from '../assets/projects/website.jpg'
import YoutubeMateImg from '../assets/projects/youtube-mate.jpg'

export const projects = [
  {
    name: 'Youtube-Mate',
    image: YoutubeMateImg,
    description:
      'An AI assistant that generates summaries of YouTube videos and saves you precious time!',
    url: 'https://www.youtube-mate.com',
    ghIcon: false,
  },
  {
    name: 'gatsby-starter-morning-dew',
    image: MorningDewImg,
    description: 'A starter to build lightning-fast websites!',
    url: 'https://github.com/maxpou/gatsby-starter-morning-dew',
    ghIcon: true,
  },
  {
    name: 'docker-symfony',
    image: DockerSymfonyImg,
    description:
      'A Docker setup for developing applications with the Symfony framework. My most popular GitHub project!',
    url: 'https://github.com/maxpou/docker-symfony',
    ghIcon: true,
  },
  {
    name: 'maxpou.fr',
    image: MaxpouFrImg,
    description: 'This website! Built with Astro and Tailwind.',
    url: 'https://github.com/maxpou/maxpou.fr',
    ghIcon: true,
  },
]
