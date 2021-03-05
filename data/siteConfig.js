module.exports = {
  siteTitle: 'Maxence Poutord',
  siteDescription: 'Software engineer • Public speaker • Nomadic worker',
  authorName: 'Maxence Poutord',
  twitterUsername: '_maxpou',
  authorAvatar: 'avatar.jpeg',
  defaultLang: 'en', // show flag if lang is not default. Leave empty to enable flags in post lists
  authorDescription: `
  Maxence Poutord is a software engineer specialized in web technologies. 
  On his day to day job, he is working as a senior front-end engineer at VSware.
  As a digital nomad, he lives where the WiFi and sun are!<br>
  You can also find him on Twitter <a href="https://twitter.com/_maxpou" rel="noopener" target="_blank">@_maxpou</a>.
  `,
  siteUrl: 'https://www.maxpou.fr/',
  disqusSiteUrl: 'https://www.maxpou.fr/',
  // Prefixes all links. For cases when deployed to maxpou.fr/gatsby-starter-morning-dew/
  pathPrefix: '/', // Note: it must *not* have a trailing slash.
  siteCover: 'cover.jpg',
  googleAnalyticsId: '',
  background_color: '#ffffff',
  theme_color: '#222222',
  display: 'standalone',
  icon: 'content/images/icon.jpeg',
  postsPerPage: 10,
  disqusShortname: 'maxpou',
  headerTitle: 'maxpou.fr',
  headerLinksIcon: '',
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
        },
        {
          label: 'Twitter',
          url: 'https://twitter.com/_maxpou',
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
