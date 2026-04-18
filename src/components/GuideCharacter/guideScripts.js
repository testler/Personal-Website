const guideScripts = {
  resume: {
    initialPanels: [
      'The formal version.',
      'Structured. Concise. Optimized for applicant tracking systems.',
      "If you want the story behind any line - I'm happy to elaborate.",
    ],
    autoHideMs: 8000,
    panelMs: 2400,
  },
  about: {
    initialPanels: [
      'This is the longer version.',
      'How I think. Why I build. What I care about.',
    ],
    autoHideMs: 8000,
    panelMs: 2600,
  },
  projects: {
    initialPanels: [
      'These are the personal builds.',
      'The experiments. The systems I refine for fun.',
    ],
    autoHideMs: 7600,
    panelMs: 2600,
    projectPanels: {
      'Cyber Defense': [
        'This started as a focused learning build.',
        'Gameplay made the security concepts stick.',
      ],
      'Date Night Organizer': [
        'This started as a weekend experiment.',
        'Then it escalated into a full-stack planning system.',
      ],
      'The Movie App': [
        'This one taught me team coordination under pressure.',
        'Worth the refactors.',
      ],
      'The Cube Experiment': [
        'This one is pure interface experimentation.',
        'A lot of it fed directly into this site.',
      ],
    },
  },
};

export default guideScripts;
