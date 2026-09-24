export type CvLabels = {
  title: string
  print: string
  downloadPdf: string
  about: string
  skills: string
  languages: string
  interests: string
  highlights: string
  see: string
  experience: string
  education: string
  userManual: string
  otherLanguageUrl?: string
  otherLanguageCode?: string
  otherLanguageLabel?: string
}

export const cvLabels: CvLabels = {
  title: 'Maxence Poutord Resume',
  print: 'Print',
  downloadPdf: 'Download PDF',
  about: 'About',
  skills: 'Skills',
  languages: 'Languages',
  interests: 'Interests',
  highlights: 'Projects & community',
  see: 'see',
  experience: 'Experience',
  education: 'Education',
  userManual: 'Personal user manual',
}

export const cvData = {
  info: {
    name: 'Maxence Poutord',
    title: 'Senior Software Engineer',
    email: 'maxence.poutord@gmail.com',
    website: 'https://www.maxpou.fr',
    cvUrl: 'https://www.maxpou.fr/cv',
    phone: '+33767786250',
    location: 'Paris, France',
    description: `
      Senior Software Engineer with 15 years of experience, specializing in React, Vue, and TypeScript.
      I own technical decisions for a six-developer team and deliver features across frontend, Node.js backends, and Azure infrastructure.
      My work includes full application migrations and a search rebuild that reduced average backend response time from ~30 seconds to ~250 ms.
    `,
    lastUpdate: 'September 2026',
    social: {
      bluesky: 'https://bsky.app/profile/maxpou.fr',
      twitter: 'https://twitter.com/_maxpou',
      github: 'https://github.com/maxpou',
      linkedin: 'https://www.linkedin.com/in/maxpou',
      readme: 'https://www.maxpou.fr/readme/',
    },
  },

  skills: [
    {
      category: 'Frontend',
      content: [
        'JavaScript',
        'TypeScript',
        'React.js',
        'Vue.js',
        'Next.js',
        'Tailwind CSS',
        'Web accessibility (WCAG)',
        'Web performance',
      ],
    },
    {
      category: 'Backend & infrastructure',
      content: [
        'Node.js',
        'NestJS',
        'GraphQL',
        'Elasticsearch',
        'Supabase',
        'Docker',
        'AWS / Azure',
      ],
    },
    {
      category: 'Quality & delivery',
      content: ['Unit, integration & end-to-end testing', 'CI/CD', 'Git'],
    },
    {
      category: 'AI development',
      content: [
        'LLM APIs & agents',
        'Model Context Protocol (MCP)',
        'AI-assisted development (Copilot, Claude Code)',
      ],
    },
  ],

  highlights: [
    {
      content: [
        { label: 'Pedalyze', url: 'https://pedalyze.bike' },
        ': Built and launched a bike-fitting app that turns rider photos into joint-angle measurements and position recommendations using AI pose estimation. Implemented video analysis in the browser to assess the full pedal stroke while keeping footage on the user’s device.',
      ],
    },
    {
      content: [
        { label: 'YoutubeMate', url: 'https://youtube-mate.com' },
        ': Built and launched a web app and Chrome extension that turn YouTube videos into multilingual AI summaries. Implemented enhanced transcripts and subscription billing, and maintain the live product.',
      ],
    },
    {
      content: [
        { label: 'Maxpou.fr', url: 'https://www.maxpou.fr' },
        ': Publish technical articles in French and English',
      ],
    },
    {
      content: [
        'Mentored junior developers and people retraining as developers',
      ],
    },
  ],

  experiences: [
    {
      company: 'Orderfox',
      position: 'Senior Software Engineer',
      period: 'May 2021 - Present',
      location: 'Remote (Paris and Berlin)',
      activities: [
        'Owned architecture and infrastructure decisions for a six-developer team building a CNC industry application',
        'Led the migration from an in-house JavaScript framework to React, TypeScript, and Vite, from transition planning to full legacy removal',
        'Rebuilt manufacturer search with Elasticsearch, reducing measured average backend response time from ~30 seconds to ~250 ms',
        'Built self-service Azure preview environments for developers, QA, and product managers, enabling feature validation before merge',
        'Improved web performance, raising Google Lighthouse’s performance score from 50 to 90 out of 100',
      ],
    },
    {
      company: 'VSware',
      position: 'Senior Software Engineer',
      period: 'May 2018 - May 2021',
      location: 'Remote (Europe/Asia)',
      activities: [
        'Improved frontend infrastructure for a Vue.js application spanning ~40 monorepo packages and ~650,000 lines of code',
        'Designed the architecture and migration plan for a move to micro-frontends',
        'Established automated testing practices, growing the suite from 0 to 3,100 unit and integration tests',
        'Improved accessibility toward WCAG AA conformance',
        'Mentored junior developers',
      ],
    },
    {
      company: 'Hostelworld',
      position: 'Software Engineer',
      period: 'November 2016 - April 2018',
      location: 'Dublin, Ireland',
      activities: [
        'Led the frontend migration of hostelworld.com from jQuery to Vue.js',
        'Designed, developed, and maintained frontend and backend features for the main website',
        'Trained and mentored the team in modern JavaScript and Vue.js',
      ],
    },
    {
      company: 'Conserto',
      position: 'Consultant',
      period: 'May 2015 - August 2016',
      location: 'Nantes, France',
      activities: [
        'Architecture definition, development and maintenance of various web applications',
        'Developed and delivered training in PHP, Symfony2',
      ],
    },
    {
      company: 'Energy Formation (ENGIE Group)',
      position: 'Web Developer/Project Manager',
      period: 'October 2011 - January 2015',
      location: 'Nantes, France',
      activities: [
        'Led a project to replace paper documentation with digital documents for customers',
      ],
    },
  ],

  education: [
    {
      school: 'ENI Ecole Informatique',
      degree: 'Architecte Logiciel / Software Architect (master degree)',
      period: '2013 - 2015',
      location: 'St Herblain, France',
      detail: [],
    },
    {
      school: 'ENI Ecole Informatique',
      degree:
        'Concepteur Développeur Informatique / Software Application Developer (bachelor degree)',
      period: '2011 - 2013',
      location: 'St Herblain, France',
      detail: [],
    },
    // {
    //   school: "S. de Mauléon",
    //   degree: "BTS Informatique de Gestion / IT management (technical degree)",
    //   period: "2009 - 2011",
    //   location: "Les Sables, France",
    //   detail: [],
    // },
  ],

  languages: [
    {
      language: 'English',
      level: 'Professional fluency',
    },
    {
      language: 'French',
      level: 'Native',
    },
    {
      language: 'Spanish',
      level: 'Intermediate',
    },
  ],

  interests: `
    Canyoning (group guide), running (100 km/month), cycling, cooking, and Age of Empires II.
  `,
}

export type CvData = typeof cvData
