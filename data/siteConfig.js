module.exports = {
  siteTitle: 'Maxence Poutord',
  siteDescription: 'Software engineer • Public speaker • Nomadic worker',
  authorName: 'Maxence Poutord',
  twitterUsername: '_maxpou',
  authorAvatar: 'avatar.jpeg',
  defaultLang: 'en', // show flag if lang is not default. Leave empty to enable flags in post lists
  authorDescription: `
  Hey, I'm Maxence Poutord, a passionate software engineer. 
  In my day-to-day job, I'm working as a senior front-end engineer at Orderfox.
  When I'm not working, you can find me travelling the world or cooking.
  `,
  seoDescription:
    'Personal site for Maxence Poutord, a software engineer who is specialised in Frontend development.',
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
    url: 'https://github.com/maxpou/maxpou.fr',
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
        {
          label: 'Readme',
          url: '/readme',
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
          label: 'Kitchen',
          url: './kitchen',
        },
        {
          label: 'RSS',
          url: '/rss',
        },
      ],
    },
  ],
}
