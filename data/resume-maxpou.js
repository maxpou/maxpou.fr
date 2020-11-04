module.exports = {
  basics: {
    name: "Maxence Poutord",
    title: "Software Engineer",
    email: "hello@maxpou.fr",
    nationality: "French",
    age: "31",
    website: "https://www.maxpou.fr",
    cvUrl: "https://www.maxpou.fr/cv",
    phone: "+353838667354",
    location: "Berlin, Germany",
    description: `
      I'm Maxence, a French Software Engineer with 10 years of experience developing web-based applications. 
      I am a dedicated, hardworking, ambitious person that gets things done, both on my own initiative and within a team. 
      I enjoy challenges and I am not afraid of getting my hands dirty.
      Because knowledge sharing matters to me, I spend a non-negligible part of my time sharing things through blog posts, mentoring sessions or conferences.
    `,
    lastUpdate: "4 November 2020",
    profiles: [
      {
        network: "Twitter",
        url: "https://twitter.com/_maxpou",
      },
      {
        network: "GitHub",
        url: "https://github.com/maxpou",
      },
      {
        network: "LinkedIn",
        url: "https://www.linkedin.com/in/maxpou",
      },
    ],
  },

  skills: [
    {
      category: "Proficient",
      content: ["JavaScript", "Vue.js", "Git", "Testing (Jest&Testing library)"],
    },
    {
      category: "Comfortable",
      content: ["React.js", "Gatsby.js", "CI/CD", "Web Accessibility (A11Y)", "Web Performances", "Functional Programming"],
    },
    {
      category: "Familiar",
      content: ["Node.js", "Docker", "Firebase", "GraphQL"],
    },
  ],

  highlights: [
    {
      description: "Write technical blog posts in French & English",
      url: "https://www.maxpou.fr",
    },
    {
      description: "Mentor junior developers and people who want to retrain as a developer",
      url: "",
    },
    {
      description: "Tech trainer and public speaker",
      url: "https://www.maxpou.fr/speaking",
    },
    {
      description: "Open sources lover and contributor",
      url: "https://github.com/maxpou",
    },
  ],

  experiences: [
    {
      company: "VSware",
      position: "Senior Software Engineer",
      period: "May 2018 - Present",
      location: "Remote",
      activities: [
        "Improving the frontend infrastructure of a massive Vue.js application (~5k vue&js files / ~650k lines of codes). Frontend part rely on a big monorepo",
        "Working on the application architecture",
        "Introduced and maintaining a testing culture (for unit and integration testing)",
        "Working on application accessibility (A11Y) to meet AA criteria (WCAG)",
        "Maintaining decent performances optimisation",
        "Mentoring developers",
      ],
    },
    {
      company: "Hostelworld",
      position: "Software Engineer",
      period: "November 2016 - April 2018",
      location: "Dublin, Ireland",
      activities: [
        "Architecture definition, development and maintenance of the main website (back+front)",
        "Co-refactor complete frontend architecture of the main website (from jQuery to Vue.js)",
        "Train and mentor team to modern JavaScript and Vue.js",
      ],
    },
    {
      company: "Conserto",
      position: "Consultant",
      period: "May 2015 - April 2016",
      location: "Nantes, France",
      activities: [
        "Architecture definition, development and maintenance of various web applications",
        "Build proof of concepts/research and development",
        "Draft and give training in PHP, Symfony2",
      ],
    },
    {
      company: "Energy Formation (ENGIE Group)",
      position: "Web Developer/Project Manager",
      period: "October 2011 - January 2015",
      location: "Nantes, France",
      activities: [
        "Creation of a web application based on the Symfony Framework (expose/consume API)",
        "Lead a project which aims to reduce paper consumption by supplying dematerialized documentation to customers",
        'Monitor project that empowers technical people of Storengy. Project awarded by the "transverse award (prix transverse)" at innovation challenge of Storengy',
      ],
    },
  ],

  education: [
    {
      school: "ENI Ecole Informatique",
      degree: "Architecte Logiciel / Software Architect (master degree)",
      period: "2013 - 2015",
      location: "St Herblain, France",
      detail: [],
    },
    {
      school: "ENI Ecole Informatique",
      degree: "Concepteur Développeur Informatique / IT developer designer (bachelor degree)",
      period: "2011 - 2013",
      location: "St Herblain, France",
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
      level: "Advanced",
      language: ["English"],
    },
    {
      level: "Native",
      language: ["French"],
    },
    {
      level: "Intermediate",
      language: ["Spanish"],
    },
  ],

  hobbies: `
    Personal development, canyoning (I guide), running, hiking, cinema (especially Danish), 
    cooking, travelling.
  `,

  values: ['knowledge sharing', 'user privacy', 'diversity']
}
