module.exports = {
  siteTitle: 'Maxence Poutord',
  siteDescription: 'Software engineer • Public speaker • Nomadic worker',
  authorName: 'Maxence Poutord',
  twitterUsername: '_maxpou',
  authorAvatar: 'avatar.jpeg',
  defaultLang: 'en', // show flag if lang is not default. Leave empty to enable flags in post lists
  authorDescription: `
  Hey, I'm Maxence Poutord, a software engineer specialized in web technologies. 
  In my day-to-day job, I'm working as a senior front-end engineer at VSware.
  As a digital nomad, I'm living where the WiFi and sun are!
  `,
  siteUrl: 'https://www.maxpou.fr/',
  // Prefixes all links. For cases when deployed to maxpou.fr/gatsby-starter-morning-dew/
  pathPrefix: '/', // Note: it must *not* have a trailing slash.
  siteCover: 'cover.jpg',
  googleAnalyticsId: '',
  background_color: '#ffffff',
  theme_color: '#222222',
  display: 'standalone',
  icon: 'content/images/icon.jpeg',
  postsPerPage: 10,
  headerTitle: 'maxpou.fr',
  headerLinks: [
    {
      label: 'Blog',
      url: '/',
    },
    {
      label: 'Speaking',
      url: '/speaking',
    },
    {
      label: 'About',
      url: '/about',
    },
  ],
  // Footer information (ex: Github, Netlify...)
  websiteHost: {
    name: 'GitHub',
    url: 'https://github.com',
  },
  footerLinks: [
    {
      sectionName: 'Explore',
      links: [
        {
          label: 'Blog',
          url: '/',
        },
        {
          label: 'Speaking',
          url: '/speaking',
        },
        {
          label: 'Portfolio',
          url: '/portfolio',
        },
        {
          label: 'Uses',
          url: '/uses',
        },
        {
          label: 'About',
          url: '/about',
        },
        {
          label: 'Resume',
          url: '/cv',
        },
      ],
    },
    {
      sectionName: 'Follow me',
      links: [
        {
          label: 'GitHub',
          url: 'https://github.com/maxpou',
          rel: 'me',
        },
        {
          label: 'Twitter',
          url: 'https://twitter.com/_maxpou',
          rel: 'me',
        },
        {
          label: 'LinkedIn',
          url: 'https://www.linkedin.com/in/maxpou/',
        },
        {
          label: 'Nomad List',
          url: 'https://nomadlist.com/@maxpou',
        },
        {
          label: 'Dev.to',
          url: 'https://dev.to/maxpou',
        },
        {
          label: 'RSS',
          url: '/rss',
        },
      ],
    },
  ],
}
