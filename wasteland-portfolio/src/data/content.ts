// Content for each building interior — Fallout 2 talking heads style

export interface DialogueOption {
  text: string;
  /** URL to navigate to, or 'close' to exit */
  action: string;
  /** If true, opens in new tab */
  external?: boolean;
}

export interface InteriorContent {
  /** Title shown in the viewport frame */
  title: string;
  /** Image URL for the main viewport (talking head area). Can be a local path or external URL */
  viewportImage?: string;
  /** Alt text / fallback label for viewport when no image */
  viewportLabel?: string;
  /** Main body text — supports multiple paragraphs */
  description: string[];
  /** Clickable dialogue-style response options */
  dialogueOptions: DialogueOption[];
  /** Bottom nav button labels (e.g., REVIEW, BARTER, etc.) mapped to actions */
  navButtons?: Array<{ label: string; action: string; external?: boolean }>;
}

export const interiorContent: Record<string, InteriorContent> = {
  about: {
    title: 'PERSONAL VAULT',
    viewportLabel: 'VAULT DWELLER',
    description: [
      'You step inside the reinforced bunker. The heavy vault door groans shut behind you.',
      '',
      'A figure sits at a workstation surrounded by glowing monitors and scattered notes.',
      '',
      '"Welcome, traveler. I\'m Orion — a builder, tinkerer, and survivor of the old world. I write code, design systems, and make things that probably shouldn\'t work, work."',
      '',
      '"What would you like to know?"',
    ],
    dialogueOptions: [
      { text: 'Tell me about your skills.', action: '#skills' },
      { text: 'What drives you?', action: '#motivation' },
      { text: 'I want to see your work.', action: '/projects' },
      { text: '[Leave the bunker]', action: 'close' },
    ],
    navButtons: [
      { label: 'GITHUB', action: 'https://github.com', external: true },
      { label: 'LINKEDIN', action: 'https://linkedin.com', external: true },
    ],
  },

  projects: {
    title: 'THE WORKSHOP',
    viewportLabel: 'WORKBENCH',
    description: [
      'Sparks fly from a welding torch. The workshop is alive with the hum of machinery and the smell of solder.',
      '',
      'Blueprints and half-finished prototypes cover every surface.',
      '',
      '"Each one of these started as a crazy idea. Some of them even turned into something useful."',
    ],
    dialogueOptions: [
      { text: 'Show me Project Alpha.', action: '#project-alpha' },
      { text: 'Show me Project Beta.', action: '#project-beta' },
      { text: 'What are you working on now?', action: '#current' },
      { text: '[Leave the workshop]', action: 'close' },
    ],
    navButtons: [
      { label: 'GITHUB', action: 'https://github.com', external: true },
    ],
  },

  contact: {
    title: 'RADIO TOWER',
    viewportLabel: 'TRANSMITTER',
    description: [
      'The radio tower hums with electricity. Banks of equipment blink and whir inside the equipment shed.',
      '',
      'A microphone sits on the console, its red light steady. Frequencies are scrawled on the wall in chalk.',
      '',
      '"You want to reach me? Pick a frequency. Or follow the signals to find me out there in the wasteland."',
    ],
    dialogueOptions: [
      { text: 'Send a radio message. [Email]', action: 'mailto:your@email.com', external: true },
      { text: 'Signal via bird. [Twitter/X]', action: 'https://twitter.com', external: true },
      { text: 'Leave a dead drop. [GitHub]', action: 'https://github.com', external: true },
      { text: 'Head to LinkedIn.', action: 'https://linkedin.com', external: true },
      { text: 'Head to CodePen.', action: 'https://codepen.io', external: true },
      { text: '[Walk away from the tower]', action: 'close' },
    ],
    navButtons: [
      { label: 'GITHUB', action: 'https://github.com', external: true },
      { label: 'LINKEDIN', action: 'https://linkedin.com', external: true },
    ],
  },

  resume: {
    title: 'THE BUNKER',
    viewportLabel: 'COMMANDER',
    description: [
      'The heavy blast door grinds open. Inside, the bunker is lined with maps, mission logs, and commendation plaques.',
      '',
      'A grizzled commander looks up from a field desk covered in tactical reports.',
      '',
      '"You want to know what I\'ve been through? Every deployment, every campaign — it\'s all here."',
      '',
      '"Which dossier do you need?"',
    ],
    dialogueOptions: [
      { text: 'Show me work experience.', action: '#experience' },
      { text: 'Show me education records.', action: '#education' },
      { text: 'What skills are on file?', action: '#skills' },
      { text: 'Download full dossier. [PDF]', action: '/resume.pdf', external: true },
      { text: '[Leave the bunker]', action: 'close' },
    ],
    navButtons: [
      { label: 'LINKEDIN', action: 'https://linkedin.com', external: true },
    ],
  },

  lighthouse: {
    title: 'THE LIGHTHOUSE',
    viewportLabel: 'BEACON',
    description: [
      'You climb the winding stairs of the lighthouse. Each step groans under your weight.',
      '',
      'At the top, the lantern room glows warm against the endless dark. You can see the entire compound from up here — every building, every road, every flickering light.',
      '',
      '"This is the heart of the settlement. The beacon that keeps the darkness at bay."',
      '',
      '"What brings you to the light?"',
    ],
    dialogueOptions: [
      { text: 'Who built this place?', action: '#origin' },
      { text: 'Tell me about the wasteland.', action: '#world' },
      { text: 'I want to look around the compound.', action: 'close' },
    ],
  },

  games: {
    title: 'THE FERRIS WHEEL',
    viewportLabel: 'FUN ZONE',
    description: [
      'The ferris wheel creaks and sways in the wind. Most of the cars are missing, but a few still dangle from rusted bolts.',
      '',
      'Someone has strung lights across the remaining structure. A hand-painted sign reads: "FUN GAMES — PLAY AT OWN RISK"',
      '',
      'A makeshift arcade has been set up in the shadow of the wheel. Salvaged screens flicker with playable distractions.',
      '',
      '"Step right up. What\'ll it be?"',
    ],
    dialogueOptions: [
      { text: 'Play Game One.', action: '#game-1' },
      { text: 'Play Game Two.', action: '#game-2' },
      { text: 'What games do you have?', action: '#list' },
      { text: '[Walk away from the wheel]', action: 'close' },
    ],
  },
};
