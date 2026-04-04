export type VisualizationSequenceId = 'research' | 'projects';

export type VisualizationShape =
  | 'terminal'
  | 'monolith'
  | 'archive'
  | 'dish'
  | 'frame'
  | 'capsule'
  | 'stack'
  | 'sensorRig'
  | 'weatherTower'
  | 'buoy'
  | 'scoreboard'
  | 'mapTable';

export interface VisualizationLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface VisualizationAssetDef {
  kind: 'glb' | 'shape';
  modelFile?: string;
  modelNodeName?: string;
  shape?: VisualizationShape;
  color?: string;
  targetSize?: number;
  height?: number;
}

export interface VisualizationDetail {
  image?: string;
  imageLabel: string;
  purpose: string;
  goals: string;
  results: string;
}

export interface VisualizationStep {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  asset: VisualizationAssetDef;
  links?: VisualizationLink[];
  tags?: string[];
  detail?: VisualizationDetail;
  cameraDistance?: number;
  cameraHeight?: number;
  cameraAngle?: number;
}

export interface VisualizationSequenceDef {
  id: VisualizationSequenceId;
  title: string;
  intro: string;
  accent: string;
  steps: VisualizationStep[];
}

const sharedAssets = {
  researchIntro: { kind: 'glb', modelFile: 'power_plant.glb', targetSize: 9 } satisfies VisualizationAssetDef,
  projectIntro: { kind: 'glb', modelFile: 'ferriswheel.glb', modelNodeName: 'Mesh_0', targetSize: 9 } satisfies VisualizationAssetDef,
};

export const visualizationSequences: Record<VisualizationSequenceId, VisualizationSequenceDef> = {
  research: {
    id: 'research',
    title: 'Research Walkthrough',
    intro: 'A guided visualization of the main research directions and the artifacts behind them.',
    accent: '#7b8d96',
    steps: [
      {
        id: 'research-intro',
        title: 'Research Hub',
        subtitle: 'Power Plant',
        description: 'This walkthrough translates the research tab into a guided chain of artifacts. Move through the route to see each investigation represented as a distinct object.',
        asset: sharedAssets.researchIntro,
        detail: {
          imageLabel: 'Research Hub Image',
          purpose: 'Turn the research tab into a visual route that can explain ideas as artifacts instead of only list entries.',
          goals: 'Keep the research material readable while still making the experience feel spatial and guided.',
          results: 'A sequence framework where each research topic can become its own stop with its own model, tags, and deeper explanation.',
        },
        cameraDistance: 15,
        cameraHeight: 6.5,
        cameraAngle: 0.3,
      },
      {
        id: 'research-lidar',
        title: 'LiDAR Gap Analysis',
        subtitle: 'Post-Hurricane Canopy Disturbance',
        description: 'Airborne LiDAR and canopy height modeling used to quantify hurricane-driven forest disturbance and canopy gaps.',
        asset: { kind: 'shape', shape: 'weatherTower', color: '#7e8c95', targetSize: 6.2, height: 5 },
        tags: ['LiDAR', 'Canopy Models'],
        links: [{ label: 'Lab', href: 'https://xiangtaoxu.eeb.cornell.edu/', external: true }],
        detail: {
          image: '/images/research/tree_no.png',
          imageLabel: 'LiDAR Gap Analysis',
          purpose: 'Study post-hurricane canopy disturbance through airborne LiDAR and canopy-height modeling.',
          goals: 'Identify canopy gaps, align the data correctly, and translate raw remote sensing into interpretable structure metrics.',
          results: 'Produced a clearer workflow for understanding disturbance patterns and structural forest change after major storms.',
        },
      },
      {
        id: 'research-cloudcompare',
        title: 'Canopy Gap Driver Analysis',
        subtitle: 'CloudCompare',
        description: 'Point-cloud and height-model analysis focused on understanding the structural drivers behind canopy openings.',
        asset: { kind: 'shape', shape: 'mapTable', color: '#6f7d86', targetSize: 5.8, height: 3.8 },
        tags: ['CloudCompare', 'Point Clouds'],
        detail: {
          image: '/images/research/tree_no.png',
          imageLabel: 'CloudCompare Workflow',
          purpose: 'Move beyond raw canopy openings and study what structural patterns are actually driving the gaps.',
          goals: 'Use point-cloud tools to compare conditions, isolate signals, and build a more interpretable analysis layer.',
          results: 'Improved the explanatory power of the LiDAR work by connecting geometry to ecological interpretation.',
        },
      },
      {
        id: 'research-lichen',
        title: 'Lichen Paleoclimate Reconstruction',
        subtitle: 'Stable Isotopes + Modeling',
        description: 'Historic lichen material, isotopic lab workflows, and Monte Carlo modeling combined into a paleoclimate reconstruction pipeline.',
        asset: { kind: 'shape', shape: 'archive', color: '#83919a', targetSize: 5.6, height: 3.6 },
        tags: ['Stable Isotopes', 'Monte Carlo'],
        detail: {
          image: '/images/experience/COIL.png',
          imageLabel: 'Paleoclimate Reconstruction',
          purpose: 'Use isotopic evidence from historic lichen material to reconstruct climate behavior across time.',
          goals: 'Pair lab measurement with modeling so the interpretation is more robust and less anecdotal.',
          results: 'A research path that connected laboratory technique, historic biological material, and climate inference.',
        },
      },
      {
        id: 'research-herbie',
        title: 'Regional Climate Modeling',
        subtitle: 'HERBIE + CESM',
        description: 'Climate-model output exploration focused on extracting readable regional behavior and evaluating simulation quality.',
        asset: { kind: 'shape', shape: 'terminal', color: '#738089', targetSize: 5.8, height: 3.8 },
        tags: ['HERBIE', 'CESM 2.2'],
        detail: {
          imageLabel: 'Climate Modeling Output',
          purpose: 'Explore how regional climate models behave and how their outputs can be made legible and useful.',
          goals: 'Study simulation behavior, evaluate reliability, and turn climate data into something easier to interpret.',
          results: 'A stronger understanding of climate modeling workflows and how to communicate simulated regional patterns.',
        },
      },
    ],
  },
  projects: {
    id: 'projects',
    title: 'Projects Walkthrough',
    intro: 'A guided visualization sequence for the main personal projects and builds.',
    accent: '#83929b',
    steps: [
      {
        id: 'projects-intro',
        title: 'Projects Hub',
        subtitle: 'Ferris Wheel',
        description: 'This route turns the projects tab into a structured visual sequence. Each stop represents one project with its own prop, summary, and external link if available.',
        asset: sharedAssets.projectIntro,
        detail: {
          imageLabel: 'Projects Hub Image',
          purpose: 'Create a visual route for project storytelling without replacing the original portfolio pages.',
          goals: 'Let each project become a checkpoint with room for narrative, visuals, and process explanation.',
          results: 'A reusable walkthrough system that can expand as you add more project models and richer process content.',
        },
        cameraDistance: 15,
        cameraHeight: 6.8,
        cameraAngle: 0.26,
      },
      {
        id: 'project-shot-quality-overview',
        title: 'NBA Shot Quality Quantifier',
        subtitle: 'Project Overview',
        description: 'A computer-vision project for interpreting shot quality through a clearer analytical and visual pipeline.',
        asset: { kind: 'shape', shape: 'scoreboard', color: '#7a8992', targetSize: 6, height: 4.4 },
        tags: ['Computer Vision', 'Analytics'],
        links: [{ label: 'GitHub', href: 'https://github.com/orion-hoch', external: true }],
        detail: {
          imageLabel: 'Shot Quality Overview',
          purpose: 'Estimate and communicate shot quality in a way that feels more interpretable than raw video or box-score analysis alone.',
          goals: 'Combine computer vision with a cleaner presentation layer so the project feels analytical and legible.',
          results: 'A sports analytics concept that connects model-driven insight with stronger visual explanation.',
        },
      },
      {
        id: 'project-shot-quality-pipeline',
        title: 'Shot Quality Pipeline',
        subtitle: 'How It Was Built',
        description: 'This step is meant to hold the internal pipeline: data flow, computer-vision steps, evaluation, and the interface layer that explains the output.',
        asset: { kind: 'shape', shape: 'terminal', color: '#718189', targetSize: 5.8, height: 3.8 },
        tags: ['Pipeline', 'Modeling'],
        detail: {
          imageLabel: 'Pipeline Diagram',
          purpose: 'Show how the project moves from raw input to meaningful shot-quality output.',
          goals: 'Give the viewer a place to understand system design, not just the final result.',
          results: 'A dedicated process node you can later replace with your actual model or visual pipeline artifact.',
        },
      },
      {
        id: 'project-trivia-overview',
        title: 'OrionTrivia.org',
        subtitle: 'Project Overview',
        description: 'A playful trivia build centered on pacing, clarity, and easy repeat play.',
        asset: { kind: 'shape', shape: 'frame', color: '#86949c', targetSize: 5.2, height: 3.6 },
        tags: ['Web', 'Interaction'],
        links: [{ label: 'Website', href: 'https://oriontrivia.org', external: true }],
        detail: {
          imageLabel: 'Trivia Project Overview',
          purpose: 'Build a lightweight but memorable trivia experience with a clearer sense of identity than a generic quiz app.',
          goals: 'Keep the loop intuitive while still making the interaction feel playful and replayable.',
          results: 'A focused web project that demonstrates pacing, UX clarity, and personality.',
        },
      },
      {
        id: 'project-trivia-flow',
        title: 'Trivia Interaction Flow',
        subtitle: 'Design Node',
        description: 'This node is intended for the visual structure of question flow, answer handling, timing, and feedback.',
        asset: { kind: 'shape', shape: 'frame', color: '#7f8e97', targetSize: 5.4, height: 3.8 },
        tags: ['UX', 'Flow Design'],
        detail: {
          imageLabel: 'Trivia Flow Diagram',
          purpose: 'Show how the project handles question pacing, interaction rhythm, and user feedback.',
          goals: 'Make the process legible so the walkthrough can explain the design work behind the final site.',
          results: 'A placeholder process stop ready to be replaced with your own mockups, diagrams, or in-world model.',
        },
      },
      {
        id: 'project-opengauntlet-overview',
        title: 'OpenGauntlet',
        subtitle: 'Project Overview',
        description: 'A more atmospheric and interaction-heavy experiment where worldbuilding and systems work together.',
        asset: { kind: 'shape', shape: 'capsule', color: '#70808b', targetSize: 5.4, height: 4.2 },
        tags: ['Design', 'Systems'],
        links: [{ label: 'GitHub', href: 'https://github.com/orion-hoch', external: true }],
        detail: {
          imageLabel: 'OpenGauntlet Overview',
          purpose: 'Explore a more expressive build where atmosphere and mechanics both matter to the result.',
          goals: 'Find a balance between unusual interaction ideas and a world that still feels coherent.',
          results: 'A project that pushes visual identity and interaction design farther than a typical utility-focused build.',
        },
      },
      {
        id: 'project-opengauntlet-process',
        title: 'OpenGauntlet Process',
        subtitle: 'Interaction and Worldbuilding',
        description: 'Use this node to show the progression from concept sketches and mechanics to the final interaction structure.',
        asset: { kind: 'shape', shape: 'capsule', color: '#6d7d87', targetSize: 5.2, height: 4 },
        tags: ['Mechanics', 'Worldbuilding'],
        detail: {
          imageLabel: 'OpenGauntlet Process',
          purpose: 'Explain how the final project emerged from smaller experiments in interaction, pacing, and tone.',
          goals: 'Give the walkthrough a place for sketches, prototypes, and build evolution.',
          results: 'A process stop ready for your own diagrams, test artifacts, or final design images.',
        },
      },
      {
        id: 'project-buoy-overview',
        title: 'Buoy Weather Station',
        subtitle: 'Project Overview',
        description: 'A project grounded in environmental sensing and field hardware rather than purely screen-based interaction.',
        asset: { kind: 'shape', shape: 'buoy', color: '#6e7d86', targetSize: 5.8, height: 4.5 },
        tags: ['Hardware', 'Weather'],
        detail: {
          imageLabel: 'Buoy Weather Station',
          purpose: 'Build an environmental sensing project that works under real deployment constraints instead of idealized lab conditions.',
          goals: 'Combine sensing, durability, and monitoring logic into one coherent artifact.',
          results: 'A hardware-heavy project that broadens the portfolio beyond purely digital interaction design.',
        },
      },
      {
        id: 'project-website-overview',
        title: '3D Personal Website',
        subtitle: 'Project Overview',
        description: 'This project itself: a portfolio treated like a navigable world instead of a flat stack of pages.',
        asset: { kind: 'shape', shape: 'monolith', color: '#71808a', targetSize: 5.4, height: 4.8 },
        tags: ['3D', 'Portfolio'],
        detail: {
          imageLabel: 'Website Overview',
          purpose: 'Reframe a personal site as a world with atmosphere, pacing, and memory instead of just a stack of polished cards.',
          goals: 'Balance readability with experimentation while still letting people access a more conventional view of the work.',
          results: 'A portfolio system that can support both standard analytical content and guided 3D storytelling.',
        },
      },
      {
        id: 'project-website-process',
        title: 'Website Visualization Framework',
        subtitle: 'How It Was Built',
        description: 'This node is for the site-building process itself: scene layout, UI tradeoffs, content systems, and world-driven navigation.',
        asset: { kind: 'shape', shape: 'terminal', color: '#6d7e89', targetSize: 5.5, height: 3.8 },
        tags: ['Architecture', 'UI Systems'],
        detail: {
          imageLabel: 'Website Process',
          purpose: 'Explain how the site architecture, 3D scene logic, and content system work together.',
          goals: 'Give future viewers a direct line into the design and engineering tradeoffs behind the site.',
          results: 'A process step you can later replace with actual diagrams, route plans, or worldbuilding assets.',
        },
      },
      {
        id: 'project-flood-overview',
        title: 'Oregon Flood Analysis',
        subtitle: 'GIS and Hydrology',
        description: 'A geospatial and hydrologic analysis project focused on flood behavior and clearer mapping outputs.',
        asset: { kind: 'shape', shape: 'mapTable', color: '#7c8790', targetSize: 5.8, height: 3.8 },
        tags: ['GIS', 'Hydrology'],
        detail: {
          imageLabel: 'Flood Analysis Overview',
          purpose: 'Study flooding behavior and make hydrologic information more readable through stronger geospatial outputs.',
          goals: 'Turn layered spatial data into maps and artifacts that support understanding and communication.',
          results: 'A practical GIS/hydrology project that ties environmental analysis to visual explanation.',
        },
      },
    ],
  },
};
