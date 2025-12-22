export const cvData = {
  info: {
    name: 'Maxence Poutord',
    title: 'Software Engineer',
    email: 'maxence.poutord@gmail.com',
    nationality: 'French',
    age: '34',
    website: 'https://www.maxpou.fr',
    cvUrl: 'https://www.maxpou.fr/cv',
    phone: '+33767786250',
    location: 'Paris, France / Remote',
    description: `
      I'm Maxence, a French Software Engineer with +15 years of experience building high-value web applications. 
      I am a dedicated team player who takes initiative to meet customer needs and ensure successful project completion. 
      A dedicated team player, I take initiative to overcome challenges and get customer-facing features deployed
      I dedicate time to knowledge sharing via blog posts, mentoring, and conferences.
    `,
    lastUpdate: 'December 2025',
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
      category: 'Proficient',
      content: [
        'JavaScript',
        'React.js',
        'Vue.js',
        'Git',
        'Testing (Jest&Testing library)',
        'Web Accessibility (A11Y)',
      ],
    },
    {
      category: 'Comfortable',
      content: [
        'Node.js',
        'NestJS',
        'TypeScript',
        'CI/CD',
        'Web Performances',
        'TailwindCSS',
        'GraphQL',
        'ElasticSearch',
      ],
    },
    {
      category: 'Familiar',
      content: ['Docker', 'Supabase', 'AWS/Azure'],
    },
  ],

  highlights: [
    {
      description: 'Write technical blog posts in French & English',
      url: 'https://www.maxpou.fr',
    },
    {
      description:
        'Mentor junior developers and people who want to retrain as a developer',
      url: '',
    },
    {
      description: 'Tech trainer and public speaker',
      url: 'https://www.maxpou.fr/speaking',
    },
    {
      description: 'Open sources lover and occasional contributor',
      url: 'https://github.com/maxpou',
    },
  ],

  experiences: [
    {
      company: 'Orderfox',
      position: 'Senior Software Engineer',
      period: 'May 2021 - Present',
      location: 'Remote (Europe)',
      activities: [
        'Migrated a legacy web application to TypeScript and React, boosting team velocity by 3x (measured by sprint story point completion)',
        'Improved backend performance for Partfox search, reducing response time from ~25s to ~300 ms',
        'Improved frontend performance index (50 to 90 lighthouse score)',
      ],
    },
    {
      company: 'VSware',
      position: 'Senior Software Engineer',
      period: 'May 2018 - May 2021',
      location: 'Remote (Europe/Asia)',
      activities: [
        'Improved the frontend infrastructure of a massive Vue.js application (~5k vue&js files / ~650k lines of codes). Frontend relies on a big monorepo (~40 packages)',
        'Software designed and planned major architecture changes towards micro-frontends',
        'Introduced and maintained a testing culture (from 0 to 3.1k unit & integration tests)',
        'Worked on accessibility (A11Y) to meet WCAG AA conformance',
        'Mentored junior developers',
      ],
    },
    {
      company: 'Hostelworld',
      position: 'Software Engineer',
      period: 'November 2016 - April 2018',
      location: 'Dublin, Ireland',
      activities: [
        'Led the frontend migration of hostelworld.com from jQuery to Vue.js.',
        'Architecture definition, development and maintenance of the main website (back+front)',
        'Trained and mentored team to modern JavaScript and Vue.js',
      ],
    },
    {
      company: 'Conserto',
      position: 'Consultant',
      period: 'May 2015 - April 2016',
      location: 'Nantes, France',
      activities: [
        // 'Architecture definition, development and maintenance of various web applications',
        // 'Build proof of concepts/research and development',
        // 'Draft and give training in PHP, Symfony2',
      ],
    },
    {
      company: 'Energy Formation (ENGIE Group)',
      position: 'Web Developer/Project Manager',
      period: 'October 2011 - January 2015',
      location: 'Nantes, France',
      activities: [
        // 'Creation of a web application based on the Symfony2 Framework (expose/consume API)',
        // 'Led a project which aims to reduce paper consumption by supplying dematerialized documentation to customers',
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
        'Concepteur Développeur Informatique / IT developer designer (bachelor degree)',
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
      level: 'Advanced',
      languages: ['English'],
    },
    {
      level: 'Native',
      languages: ['French'],
    },
    {
      level: 'Intermediate',
      languages: ['Spanish'],
    },
  ],

  interests: `
    Canyoning (I guide group), running (100km/month), cycling, hiking, cooking, travelling (Asia, Europe), 
    video games (Age of Empire II).
  `,
}
