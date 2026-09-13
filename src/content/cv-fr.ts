import type { CvData, CvLabels } from './cv'

export const cvLabelsFr: CvLabels = {
  title: 'CV de Maxence Poutord',
  print: 'Imprimer',
  downloadPdf: 'Télécharger le PDF',
  about: 'Contact',
  skills: 'Compétences',
  languages: 'Langues',
  interests: 'Centres d’intérêt',
  highlights: 'En bref',
  see: 'voir',
  experience: 'Expériences',
  education: 'Formation',
  userManual: 'Personal user manual',
  otherLanguageUrl: '/cv',
  otherLanguageCode: 'en',
  otherLanguageLabel: 'English version',
}

export const cvDataFr: CvData = {
  info: {
    name: 'Maxence Poutord',
    title: 'Senior Software Engineer',
    email: 'maxence.poutord@gmail.com',
    website: 'https://www.maxpou.fr',
    cvUrl: 'https://www.maxpou.fr/cv-fr',
    phone: '+33767786250',
    location: 'Paris, France / Télétravail',
    description: `
      Je suis Maxence, ingénieur logiciel avec plus de 15 ans d'expérience dans le développement
      d'applications web. J'aime le travail d'équipe, je n'attends pas qu'on me dise quoi faire pour
      débloquer une situation, et ce qui compte pour moi c'est que les fonctionnalités arrivent
      jusqu'aux utilisateurs. À côté, je partage ce que j'apprends : blog, mentorat, conférences.
    `,
    lastUpdate: 'Août 2026',
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
      category: 'Maîtrisé',
      content: [
        'JavaScript',
        'TypeScript',
        'React.js',
        'Vue.js',
        'Git',
        'Tests (unitaires, intégration & e2e)',
        'Accessibilité web (A11Y)',
      ],
    },
    {
      category: 'À l’aise',
      content: [
        'Node.js',
        'NestJS',
        'CI/CD',
        'Performance web',
        'GraphQL',
        'ElasticSearch',
      ],
    },
    {
      category: 'Notions',
      content: ['Docker', 'Supabase', 'TailwindCSS', 'AWS/Azure'],
    },
  ],

  highlights: [
    {
      description: 'Je développe et maintiens des projets perso',
      links: ['https://pedalyze.bike', 'https://youtube-mate.com'],
    },
    {
      description:
        'J’écris des articles techniques sur mon blog, en français et en anglais',
      links: ['https://www.maxpou.fr'],
    },
    {
      description:
        'J’accompagne des devs juniors et des personnes en reconversion vers le développement',
      links: [],
    },
    {
      description: 'Formateur technique et conférencier',
      links: ['https://www.maxpou.fr/speaking'],
    },
  ],

  experiences: [
    {
      company: 'Orderfox',
      position: 'Senior Software Engineer',
      period: 'Mai 2021 - Aujourd’hui',
      location: 'Remote (Paris et Berlin)',
      activities: [
        'En charge de l’architecture de l’application et de l’infrastructure, et des grandes décisions techniques qui vont avec',
        'Migration vers TypeScript et React, menée de bout en bout : l’équipe livre 3 fois plus vite',
        'Moteur de recherche : temps de réponse passé de ~25 s à ~300 ms',
        'Performance frontend : score Lighthouse passé de 50 à 90',
        'Entretiens de recrutement et suivi des développeurs juniors',
      ],
    },
    {
      company: 'VSware',
      position: 'Senior Software Engineer',
      period: 'Mai 2018 - Mai 2021',
      location: 'Remote (Europe/Asie)',
      activities: [
        'Refonte de l’infrastructure frontend d’une très grosse application Vue.js (~5 000 fichiers vue & js, ~650 000 lignes de code, monorepo d’une quarantaine de packages)',
        'Conception et planification du passage aux micro-frontends',
        'Introduction des tests dans l’équipe : de 0 à 3 100 tests unitaires et d’intégration',
        'Mise en conformité accessibilité (A11Y) au niveau WCAG AA',
        'Mentorat de développeurs juniors',
      ],
    },
    {
      company: 'Hostelworld',
      position: 'Software Engineer',
      period: 'Novembre 2016 - Avril 2018',
      location: 'Dublin, Irlande',
      activities: [
        'Migration du frontend de hostelworld.com de jQuery vers Vue.js',
        'Architecture, développement et maintenance du site principal (back et front)',
        'Formation de l’équipe au JavaScript moderne et à Vue.js',
      ],
    },
    {
      company: 'Conserto',
      position: 'Consultant',
      period: 'Mai 2015 - Août 2016',
      location: 'Nantes, France',
      activities: [],
    },
    {
      company: 'Energy Formation (groupe ENGIE)',
      position: 'Développeur web / Chef de projet',
      period: 'Octobre 2011 - Janvier 2015',
      location: 'Nantes, France',
      activities: [],
    },
  ],

  education: [
    {
      school: 'ENI Ecole Informatique',
      degree: 'Architecte Logiciel (niveau master)',
      period: '2013 - 2015',
      location: 'St Herblain, France',
      detail: [],
    },
    {
      school: 'ENI Ecole Informatique',
      degree: 'Concepteur Développeur Informatique (niveau licence)',
      period: '2011 - 2013',
      location: 'St Herblain, France',
      detail: [],
    },
  ],

  languages: [
    {
      level: 'Courant',
      languages: ['Anglais'],
    },
    {
      level: 'Langue maternelle',
      languages: ['Français'],
    },
    {
      level: 'Intermédiaire',
      languages: ['Espagnol'],
    },
  ],

  interests: `
    Canyoning (j'encadre des groupes), course à pied (100 km/mois), vélo, randonnée, cuisine,
    voyages (Asie, Europe), jeux vidéo (Age of Empires II).
  `,
}
