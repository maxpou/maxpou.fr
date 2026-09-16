import type { CvData, CvLabels } from './cv'

export const cvLabelsFr: CvLabels = {
  title: 'CV de Maxence Poutord',
  print: 'Imprimer',
  downloadPdf: 'Télécharger le PDF',
  about: 'Contact',
  skills: 'Compétences',
  languages: 'Langues',
  interests: 'Centres d’intérêt',
  highlights: 'Projets et communauté',
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
    location: 'Paris, France',
    description: `
      Je développe des applications web depuis 15 ans, principalement avec React, Vue et TypeScript.
      Chez Orderfox, je suis responsable des choix techniques d’une équipe de six développeurs. Je travaille aussi bien sur le frontend que sur le backend Node.js et l’infrastructure Azure.
      J’ai notamment mené des migrations complètes d’applications et refait un moteur de recherche dont le temps de réponse moyen côté backend est passé de ~30 secondes à ~250 ms.
    `,
    lastUpdate: 'Septembre 2026',
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
        'Accessibilité web (WCAG)',
        'Performance web',
      ],
    },
    {
      category: 'Backend et infrastructure',
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
      category: 'Tests et CI/CD',
      content: ['Tests unitaires, intégration et e2e', 'CI/CD', 'Git'],
    },
    {
      category: 'Développement IA',
      content: [
        'API de LLM et agents',
        'Model Context Protocol (MCP)',
        'Développement assisté par IA (Copilot, Claude Code)',
      ],
    },
  ],

  highlights: [
    {
      content: [
        { label: 'YoutubeMate', url: 'https://youtube-mate.com' },
        ' : j’ai créé et lancé cette application web et son extension Chrome pour résumer des vidéos YouTube en plusieurs langues avec l’IA. J’ai aussi développé les transcriptions enrichies et la gestion des abonnements. Je continue à maintenir le produit.',
      ],
    },
    {
      content: [
        { label: 'Pedalyze', url: 'https://pedalyze.bike' },
        ' : j’ai créé et lancé cette application pour aider les cyclistes à régler leur position sur le vélo. Elle utilise l’IA pour mesurer les angles des articulations sur des photos et proposer des ajustements. J’ai aussi ajouté l’analyse vidéo du mouvement de pédalage complet, directement dans le navigateur : les vidéos restent sur l’appareil de l’utilisateur.',
      ],
    },
    {
      content: [
        { label: 'Maxpou.fr', url: 'https://www.maxpou.fr' },
        ' : j’y partage ce que j’apprends dans des articles techniques, en français et en anglais',
      ],
    },
    {
      content: [
        'J’accompagne des développeurs juniors et des personnes en reconversion vers le développement',
      ],
    },
  ],

  experiences: [
    {
      company: 'Orderfox',
      position: 'Senior Software Engineer',
      period: 'Mai 2021 - Aujourd’hui',
      location: 'Télétravail (Paris et Berlin)',
      activities: [
        'Choix d’architecture et d’infrastructure pour une équipe de six développeurs, sur une application pour l’industrie CNC (usinage à commande numérique)',
        'Migration d’un framework JavaScript maison vers React, TypeScript et Vite, menée de bout en bout : du plan de migration au retrait de l’ancien framework',
        'Refonte du moteur de recherche de fabricants avec Elasticsearch : temps de réponse moyen mesuré côté backend passé de ~30 secondes à ~250 ms',
        'Création d’environnements de test Azure que les développeurs, la QA et les chefs de produit peuvent lancer eux-mêmes pour valider les fonctionnalités avant de merger le code',
        'Optimisation des performances web : score Google Lighthouse passé de 50 à 90 sur 100',
      ],
    },
    {
      company: 'VSware',
      position: 'Senior Software Engineer',
      period: 'Mai 2018 - Mai 2021',
      location: 'Télétravail (Europe/Asie)',
      activities: [
        'Amélioration de l’infrastructure frontend d’une application Vue.js : environ 40 packages en monorepo et 650 000 lignes de code',
        'Conception de l’architecture et du plan de migration vers les micro-frontends',
        'Introduction des tests automatisés dans l’équipe : de 0 à 3 100 tests unitaires et d’intégration',
        'Travail sur l’accessibilité pour se rapprocher du niveau WCAG AA',
        'Accompagnement de développeurs juniors',
      ],
    },
    {
      company: 'Hostelworld',
      position: 'Software Engineer',
      period: 'Novembre 2016 - Avril 2018',
      location: 'Dublin, Irlande',
      activities: [
        'Migration du frontend de hostelworld.com de jQuery vers Vue.js, menée avec l’équipe',
        'Conception, développement et maintenance des fonctionnalités du site principal, côté frontend et backend',
        'Formation et accompagnement de l’équipe au JavaScript moderne et à Vue.js',
      ],
    },
    {
      company: 'Conserto',
      position: 'Consultant',
      period: 'Mai 2015 - Août 2016',
      location: 'Nantes, France',
      activities: [
        'Architecture, développement et maintenance de plusieurs applications web',
        'Conception et animation de formations PHP et Symfony2',
      ],
    },
    {
      company: 'Energy Formation (groupe ENGIE)',
      position: 'Développeur web / Chef de projet',
      period: 'Octobre 2011 - Janvier 2015',
      location: 'Nantes, France',
      activities: [
        'Gestion d’un projet pour remplacer la documentation papier des clients par des documents numériques',
      ],
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
      language: 'Anglais',
      level: 'Courant (usage professionnel)',
    },
    {
      language: 'Français',
      level: 'Langue maternelle',
    },
    {
      language: 'Espagnol',
      level: 'Intermédiaire',
    },
  ],

  interests: `
    Canyoning (encadrement de groupes), course à pied (100 km/mois), vélo, cuisine et Age of Empires II.
  `,
}
