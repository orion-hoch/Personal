export interface PageAction {
  label: string;
  href: string;
  external?: boolean;
  variant?: 'primary' | 'secondary';
}

export interface PageMetric {
  label: string;
  value: string;
}

export interface PageCard {
  eyebrow?: string;
  title: string;
  description: string;
  meta?: string;
  href?: string;
  external?: boolean;
  ctaLabel?: string;
}

export interface TimelineItem {
  period: string;
  title: string;
  subtitle?: string;
  description: string;
}

export interface PageSection {
  title: string;
  description?: string;
  paragraphs?: string[];
  bullets?: string[];
  metrics?: PageMetric[];
  cards?: PageCard[];
  timeline?: TimelineItem[];
}

export interface PageTab {
  id: string;
  label: string;
  intro?: string;
  sections: PageSection[];
}

export interface InteriorContent {
  title: string;
  kicker: string;
  intro: string;
  accent: string;
  actions: PageAction[];
  stats?: PageMetric[];
  tabs: PageTab[];
}

export const interiorContent: Record<string, InteriorContent> = {
  about: {
    title: 'About',
    kicker: 'Profile',
    intro:
      'I build interactive systems that sit between product design, visual storytelling, and technical prototyping. I like interfaces that feel deliberate, tactile, and a little cinematic.',
    accent: '#d98a3c',
    actions: [
      { label: 'Email', href: 'mailto:hello@example.com', external: true, variant: 'primary' },
      { label: 'GitHub', href: 'https://github.com', external: true },
      { label: 'LinkedIn', href: 'https://linkedin.com', external: true },
    ],
    stats: [
      { label: 'Primary lane', value: 'Design + engineering' },
      { label: 'Preferred work', value: 'Interfaces, systems, prototypes' },
      { label: 'Toolset', value: 'Web, 3D, hardware-adjacent' },
    ],
    tabs: [
      {
        id: 'overview',
        label: 'Overview',
        intro: 'A quick read on how I approach building and what kinds of problems I enjoy.',
        sections: [
          {
            title: 'Working style',
            paragraphs: [
              'I usually work from structure outward: define the system, pressure-test the interaction model, then give the final experience a strong visual point of view.',
              'That means I care as much about information architecture and implementation detail as I do about motion, typography, and atmosphere.',
            ],
            metrics: [
              { label: 'Strength', value: 'Turning fuzzy ideas into shippable structure' },
              { label: 'Bias', value: 'Small, focused systems over sprawling complexity' },
              { label: 'Taste', value: 'Utility with a clear visual identity' },
            ],
          },
          {
            title: 'Areas I keep returning to',
            bullets: [
              'Portfolio and product experiences with strong spatial or cinematic direction.',
              'Interfaces that bridge software with sensing, hardware, or real-world feedback.',
              'Design systems that stay expressive instead of flattening everything into the same template.',
              'Rapid prototypes that help answer whether an idea feels good before it is overbuilt.',
            ],
          },
        ],
      },
      {
        id: 'strengths',
        label: 'Strengths',
        intro: 'The skills I lean on most often when moving a project from concept to something real.',
        sections: [
          {
            title: 'Core capabilities',
            cards: [
              {
                eyebrow: 'Systems',
                title: 'Product structure',
                description: 'Mapping content, navigation, and interaction so a project feels obvious instead of crowded.',
              },
              {
                eyebrow: 'Design',
                title: 'Visual direction',
                description: 'Creating interfaces that feel distinct, intentional, and coherent across components.',
              },
              {
                eyebrow: 'Build',
                title: 'Prototype implementation',
                description: 'Using code as a design tool to validate motion, hierarchy, and interaction quality early.',
              },
              {
                eyebrow: 'Collaboration',
                title: 'Cross-disciplinary communication',
                description: 'Translating between design goals, technical constraints, and practical scope.',
              },
            ],
          },
        ],
      },
    ],
  },

  projects: {
    title: 'Research',
    kicker: 'Inquiry',
    intro:
      'A research-oriented view of my work: the questions I keep returning to, the systems I want to understand more deeply, and the experiments that shape how I design.',
    accent: '#ff7a1a',
    actions: [
      { label: 'Email', href: 'mailto:hello@example.com', external: true, variant: 'primary' },
      { label: 'CV', href: '/resume.pdf', external: true },
    ],
    stats: [
      { label: 'Themes', value: 'Embodied interaction, sensing, adaptive systems' },
      { label: 'Mode', value: 'Prototype-first research' },
      { label: 'Lens', value: 'Human-centered systems' },
    ],
    tabs: [
      {
        id: 'interests',
        label: 'Interests',
        intro: 'The areas I would most like to keep exploring through research, prototyping, and collaboration.',
        sections: [
          {
            title: 'Current questions',
            bullets: [
              'Wearable systems that blend into clothing or ordinary objects instead of announcing themselves as devices.',
              'Input and output models that move beyond standard screens, buttons, and purely visual feedback.',
              'Interfaces that augment perception by using haptics, environmental cues, or multi-sensory signals.',
              'Tools for making complex technical systems easier to inspect, debug, and understand in real time.',
            ],
          },
          {
            title: 'What that turns into in practice',
            paragraphs: [
              'I am especially interested in research that produces artifacts, not just conclusions. I like work that results in a testable object, a credible interaction, or a new design pattern people can actually learn from.',
            ],
          },
        ],
      },
      {
        id: 'publications',
        label: 'Highlights',
        intro: 'A few representative pieces of work and the kinds of questions they explore.',
        sections: [
          {
            title: 'Selected work',
            cards: [
              {
                eyebrow: 'Paper concept',
                title: 'Asynchronous hardware troubleshooting',
                description: 'Work centered on making complex hardware debugging easier to share, revisit, and reason about across time.',
                meta: 'Tooling, collaboration, technical understanding',
              },
              {
                eyebrow: 'Prototype concept',
                title: 'Capacitive garment interfaces',
                description: 'Exploring seams, textiles, and body placement as interaction surfaces for more natural sensing.',
                meta: 'Wearables, sensing, embodied interaction',
              },
              {
                eyebrow: 'Systems concept',
                title: 'Perception-shaping feedback loops',
                description: 'Studying how haptic or environmental feedback can change confidence, awareness, and response time.',
                meta: 'Human factors, multimodal design',
              },
            ],
          },
        ],
      },
      {
        id: 'recognition',
        label: 'Recognition',
        intro: 'The kinds of outcomes I care about most are clear insights, solid prototypes, and useful tools.',
        sections: [
          {
            title: 'What I optimize for',
            cards: [
              {
                eyebrow: 'Research value',
                title: 'Useful artifacts',
                description: 'Projects that leave behind something reusable: a framework, prototype, workflow, or interaction pattern.',
              },
              {
                eyebrow: 'Presentation',
                title: 'Clear communication',
                description: 'Research is strongest when the question, method, and takeaway are all legible to other people.',
              },
              {
                eyebrow: 'Collaboration',
                title: 'Cross-functional execution',
                description: 'The best work usually sits at the intersection of design, implementation, and domain expertise.',
              },
            ],
          },
        ],
      },
    ],
  },

  contact: {
    title: 'Contact',
    kicker: 'Reach Out',
    intro:
      'If you want to talk about a project, an internship, a research direction, or a weird prototype idea, this is the easiest place to start.',
    accent: '#d34f47',
    actions: [
      { label: 'Email me', href: 'mailto:hello@example.com', external: true, variant: 'primary' },
      { label: 'GitHub', href: 'https://github.com', external: true },
      { label: 'LinkedIn', href: 'https://linkedin.com', external: true },
    ],
    stats: [
      { label: 'Best for', value: 'Project inquiries, collaboration, research chat' },
      { label: 'Response style', value: 'Direct and detail-oriented' },
      { label: 'Availability', value: 'Open to strong-fit conversations' },
    ],
    tabs: [
      {
        id: 'connect',
        label: 'Connect',
        intro: 'A few straightforward ways to reach me or see more of my work.',
        sections: [
          {
            title: 'Where to find me',
            cards: [
              {
                eyebrow: 'Primary',
                title: 'Email',
                description: 'The best channel for detailed inquiries, project ideas, or introductions.',
                meta: 'hello@example.com',
                href: 'mailto:hello@example.com',
                external: true,
                ctaLabel: 'Send email',
              },
              {
                eyebrow: 'Work archive',
                title: 'GitHub',
                description: 'Code, experiments, technical notes, and implementation history.',
                href: 'https://github.com',
                external: true,
                ctaLabel: 'Open GitHub',
              },
              {
                eyebrow: 'Professional',
                title: 'LinkedIn',
                description: 'A good place for longer-form professional context and background.',
                href: 'https://linkedin.com',
                external: true,
                ctaLabel: 'Open LinkedIn',
              },
            ],
          },
        ],
      },
      {
        id: 'availability',
        label: 'Availability',
        intro: 'The types of conversations I am usually most excited to have.',
        sections: [
          {
            title: 'Good reasons to reach out',
            bullets: [
              'You are building something that needs both design sensitivity and technical execution.',
              'You want help shaping a portfolio, prototype, or interaction-heavy experience.',
              'You are exploring research or product work around embodied interfaces, sensing, or system design.',
              'You have a strange but promising idea and want a second brain on structure or direction.',
            ],
          },
        ],
      },
    ],
  },

  resume: {
    title: 'Experience',
    kicker: 'Timeline',
    intro:
      'A more standard view of my background: the environments I have worked in, the kinds of responsibilities I gravitate toward, and the toolsets I keep sharp.',
    accent: '#b38f53',
    actions: [
      { label: 'Download resume', href: '/resume.pdf', external: true, variant: 'primary' },
      { label: 'LinkedIn', href: 'https://linkedin.com', external: true },
    ],
    stats: [
      { label: 'Focus', value: 'Product thinking, prototypes, interface systems' },
      { label: 'Comfort zone', value: 'Ambiguous early-stage work' },
      { label: 'Working style', value: 'Iterative, structured, collaborative' },
    ],
    tabs: [
      {
        id: 'work',
        label: 'Work',
        intro: 'The kind of roles and project responsibilities I tend to be most effective in.',
        sections: [
          {
            title: 'Typical contributions',
            timeline: [
              {
                period: 'Recent',
                title: 'Interface design and prototyping',
                subtitle: 'Product and portfolio work',
                description: 'Turning loose ideas into clear flows, coherent visual systems, and working interactive prototypes.',
              },
              {
                period: 'Ongoing',
                title: 'Technical implementation',
                subtitle: 'Frontend, tooling, and experimentation',
                description: 'Building the actual thing when fidelity matters, especially for motion, layout, and interactive detail.',
              },
              {
                period: 'Across projects',
                title: 'Cross-functional communication',
                subtitle: 'Bridging design and engineering',
                description: 'Keeping projects grounded in scope while still pushing for quality and a distinct point of view.',
              },
            ],
          },
        ],
      },
      {
        id: 'education',
        label: 'Education',
        intro: 'The academic context behind the work and the areas I keep studying more deeply.',
        sections: [
          {
            title: 'Academic direction',
            timeline: [
              {
                period: 'Foundation',
                title: 'Computer science and design-adjacent practice',
                description: 'Building fluency in software systems while staying closely connected to interface design and communication.',
              },
              {
                period: 'Current pull',
                title: 'Research and interaction systems',
                description: 'Increasingly interested in work that blends technical rigor with human-centered experimentation.',
              },
            ],
          },
        ],
      },
      {
        id: 'toolkit',
        label: 'Toolkit',
        intro: 'A practical summary of the mediums and stacks I am most comfortable using.',
        sections: [
          {
            title: 'Capabilities',
            cards: [
              {
                eyebrow: 'Frontend',
                title: 'React and TypeScript',
                description: 'Component systems, stateful interfaces, and polished frontend implementation.',
              },
              {
                eyebrow: 'Visual',
                title: 'Creative UI and 3D',
                description: 'Motion, spatial layouts, WebGL-adjacent experiences, and presentation-focused interaction design.',
              },
              {
                eyebrow: 'Systems',
                title: 'Architecture and tooling',
                description: 'Structuring projects so they are maintainable, understandable, and easy to extend.',
              },
              {
                eyebrow: 'Hardware',
                title: 'Prototype-minded experimentation',
                description: 'Comfort working near sensors, devices, and physical interaction ideas when a concept calls for it.',
              },
            ],
          },
        ],
      },
    ],
  },

  games: {
    title: 'Personal Projects',
    kicker: 'Playground',
    intro:
      'The less formal side of my work: self-directed builds, experiments, small systems, and ideas I wanted to chase because they taught me something.',
    accent: '#8f6bd7',
    actions: [
      { label: 'GitHub', href: 'https://github.com', external: true, variant: 'primary' },
      { label: 'CodePen', href: 'https://codepen.io', external: true },
    ],
    stats: [
      { label: 'Why these exist', value: 'Curiosity, craft, iteration' },
      { label: 'Format', value: 'Small releases and focused experiments' },
      { label: 'Common thread', value: 'Trying to make software feel alive' },
    ],
    tabs: [
      {
        id: 'featured',
        label: 'Featured',
        intro: 'A handful of projects that best represent the style of work I like to pursue independently.',
        sections: [
          {
            title: 'Selected builds',
            cards: [
              {
                eyebrow: 'Interface experiment',
                title: 'Atmospheric portfolio scenes',
                description: 'Interactive environments that treat navigation, mood, and worldbuilding as part of the content experience.',
              },
              {
                eyebrow: 'Tool concept',
                title: 'Prototype-first idea labs',
                description: 'Quick systems for testing layout, motion, or interaction hypotheses before turning them into larger projects.',
              },
              {
                eyebrow: 'Creative code',
                title: 'Playable visual systems',
                description: 'Smaller experiments where graphics, feedback, and input all shape the tone of the experience.',
              },
              {
                eyebrow: 'Utility',
                title: 'Custom workflow helpers',
                description: 'Tiny purpose-built tools that reduce friction in research, design, or development workflows.',
              },
            ],
          },
        ],
      },
      {
        id: 'approach',
        label: 'Approach',
        intro: 'What I want personal work to do for me beyond just filling out a portfolio.',
        sections: [
          {
            title: 'What personal projects are for',
            bullets: [
              'Testing taste without needing permission or a committee to approve it.',
              'Learning which visual ideas still hold up once they have to become real interfaces.',
              'Exploring unusual mechanics, layouts, or atmospheres that might later inform more formal work.',
              'Building range while keeping the final result coherent and intentional.',
            ],
          },
        ],
      },
    ],
  },
};
