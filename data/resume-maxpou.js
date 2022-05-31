module.exports = {
  basics: {
    name: 'Maxence Poutord',
    title: 'Software Engineer',
    email: 'hello@maxpou.fr',
    nationality: 'French',
    age: '32',
    website: 'https://www.maxpou.fr',
    cvUrl: 'https://www.maxpou.fr/cv',
    phone: '+353838667354',
    location: 'Remote, Europe (Berlin/Paris)',
    description: `
      I'm Maxence, a French Software Engineer with 10 years of experience developing web-based applications. 
      I am a dedicated, hardworking, ambitious person that gets things done, both on my own initiative and within a team. 
      I enjoy challenges and I am not afraid of getting my hands dirty.
      Because knowledge sharing matters to me, I spend a non-negligible part of my time sharing things through blog posts, mentoring sessions or conferences.
    `,
    lastUpdate: 'May 2022',
    profiles: [
      {
        network: 'Twitter',
        url: 'https://twitter.com/_maxpou',
      },
      {
        network: 'GitHub',
        url: 'https://github.com/maxpou',
      },
      {
        network: 'LinkedIn',
        url: 'https://www.linkedin.com/in/maxpou',
      },
    ],
  },

  skills: [
    {
      category: 'Proficient',
      content: [
        'JavaScript',
        'Vue.js',
        'Git',
        'Testing (Jest&Testing library)',
        'Web Accessibility (A11Y)',
      ],
    },
    {
      category: 'Comfortable',
      content: [
        'React.js',
        'Gatsby.js',
        'CI/CD',
        'Web Performances',
        'Node.js',
        'TypeScript',
        'GraphQL',
      ],
    },
    {
      category: 'Familiar',
      content: ['Docker', 'Firebase', 'Functional Programming'],
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
        'Migrated a web application to Typescript/React',
        'Led the migration of the main application from a REST-style to GraphQL',
      ],
    },
    {
      company: 'VSware',
      position: 'Senior Software Engineer',
      period: 'May 2018 - May 2021',
      location: 'Remote (Europe/Asia)',
      activities: [
        'Improved the frontend infrastructure of a massive Vue.js application (~5k vue&js files / ~650k lines of codes). Frontend rely on a big monorepo',
        'Software designed and planned major architecture changes',
        'Introduced and maintaining a testing culture (from 0 to 3.1k unit & integration tests)',
        'Working on accessibility (A11Y) to meet WCAG AA conformance',
        'Maintaining decent performances optimisation',
        'Mentoring developers',
      ],
    },
    {
      company: 'Hostelworld',
      position: 'Software Engineer',
      period: 'November 2016 - April 2018',
      location: 'Dublin, Ireland',
      activities: [
        'Co-led the frontend migration of hostelworld.com from jQuery to Vue.js.',
        'Architecture definition, development and maintenance of the main website (back+front)',
        'Train and mentor team to modern JavaScript and Vue.js',
      ],
    },
    {
      company: 'Conserto',
      position: 'Consultant',
      period: 'May 2015 - April 2016',
      location: 'Nantes, France',
      activities: [
        'Architecture definition, development and maintenance of various web applications',
        'Build proof of concepts/research and development',
        'Draft and give training in PHP, Symfony2',
      ],
    },
    {
      company: 'Energy Formation (ENGIE Group)',
      position: 'Web Developer/Project Manager',
      period: 'October 2011 - January 2015',
      location: 'Nantes, France',
      activities: [
        'Creation of a web application based on the Symfony2 Framework (expose/consume API)',
        'Led a project which aims to reduce paper consumption by supplying dematerialized documentation to customers',
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
      language: ['English'],
    },
    {
      level: 'Native',
      language: ['French'],
    },
    {
      level: 'Intermediate',
      language: ['Spanish'],
    },
  ],

  hobbies: `
    Canyoning (I guide group), hiking, cooking, travelling, 
    video games (Age of Empire II).
  `,

  values: ['knowledge sharing', 'user privacy', 'diversity'],
}
