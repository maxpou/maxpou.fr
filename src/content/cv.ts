export const cvData = {
  info: {
    name: 'Maxence Poutord',
    title: 'Software Engineer',
    email: 'hello@maxpou.fr',
    nationality: 'French',
    age: '34',
    website: 'https://www.maxpou.fr',
    cvUrl: 'https://www.maxpou.fr/cv',
    phone: '+33767786250',
    location: 'Paris, France / Remote',
    description: `
      I'm Maxence, a French Software Engineer with +10 years of experience developing web-based applications. 
      I am a dedicated, hardworking, ambitious person that gets things done, both on my own initiative and within a team. 
      I enjoy challenges and I am not afraid of getting my hands dirty.
      Because knowledge sharing matters to me, I spend a non-negligible part of my time sharing things through blog posts, mentoring sessions or conferences.
    `,
    lastUpdate: 'January 2024',
    social: {
      bluesky: 'https://bsky.app/profile/maxpou.bsky.social',
      twitter: 'https://twitter.com/_maxpou',
      github: 'https://github.com/maxpou',
      linkedin: 'https://www.linkedin.com/in/maxpou',
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
      ],
    },
    {
      category: 'Familiar',
      content: ['Docker', 'Supabase', 'Functional Programming'],
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
        'Improved performance index (50 to 90 lighthouse score)',
        'Led the migration from a REST-style to GraphQL',
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
        'Co-led the frontend migration of hostelworld.com from jQuery to Vue.js.',
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
    Canyoning (I guide group), running (100km/month), hiking, cooking, travelling (Asia, Europe), 
    video games (Age of Empire II).
  `,
}
