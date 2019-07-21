module.exports = {
  siteTitle: 'Maxence Poutord',
  siteDescription: 'Software engineer • Public speaker • Nomadic worker',
  authorName: 'Maxence Poutord',
  twitterUsername: '_maxpou',
  authorAvatar: 'avatar.jpeg',
  multilangPosts: true, // enable/disable flags in post lists
  authorDescription: `
  For the last decade, Maxence Poutord has worked with a variety of web technologies. He is currently focused on front-end development.
  On his day to day job, he is working as a senior front-end engineer at VSware. He is also a tech speaker and mentor.
  As a digital nomad, he is living where the WiFi and sun is 😎 <br/>
  Do you want to know more? <a href="/about">Read this!</a>
  `,
  siteUrl: 'https://www.maxpou.fr/',
  disqusSiteUrl: 'https://www.maxpou.fr/',
  // Prefixes all links. For cases when deployed to maxpou.fr/gatsby-starter-morning-dew/
  pathPrefix: '/', // Note: it must *not* have a trailing slash.
  siteCover: 'cover.jpg',
  googleAnalyticsId: 'UA-67868977-1',
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
      label: 'About',
      url: '/about',
    },
    {
      label: 'Speaking',
      url: '/speaking',
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
          label: 'About',
          url: '/about',
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
          label: 'LinkedIn',
          url: 'https://www.linkedin.com/in/maxpou/',
        },
        {
          label: 'Twitter',
          url: 'https://twitter.com/_maxpou',
        },
        {
          label: 'Nomad List',
          url: 'https://nomadlist.com/@maxpou',
        },
        {
          label: 'Dev.to',
          url: 'https://dev.to/maxpou',
        },
      ],
    },
  ],
}
