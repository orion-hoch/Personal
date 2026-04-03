export interface PortfolioItem {
  title: string;
  image?: string;
  imageLabel: string;
  description: string;
  skills: string[];
  href?: string;
  external?: boolean;
}

export interface ContactItem {
  label: string;
  value: string;
  href?: string;
}

export interface ContentTab {
  id: string;
  label: string;
  layout: 'about' | 'list' | 'contacts';
  intro?: string;
  photo?: string;
  photoLabel?: string;
  bio?: string[];
  headerImage?: string;
  headerImageLabel?: string;
  items?: PortfolioItem[];
  contacts?: ContactItem[];
}

export interface InteriorContent {
  title: string;
  kicker: string;
  accent: string;
  tabs: ContentTab[];
}

export const interiorContent: Record<string, InteriorContent> = {
  about: {
    title: 'About Me',
    kicker: 'Camp',
    accent: '#56655d',
    tabs: [
      {
        id: 'profile',
        label: 'Profile',
        layout: 'about',
        intro: 'A short personal introduction and space for a portrait.',
        photoLabel: 'Portrait Placeholder',
        bio: [
          'I work across design and engineering, usually with projects that need a strong visual identity and a solid interactive structure.',
          'Most of my work sits somewhere between product thinking, interface design, and prototype implementation. I like systems that feel deliberate, readable, and a little atmospheric without getting in the way of the actual content.',
          'This section is meant to stay simple: one image, one biography, and room to explain who I am in a direct way.',
        ],
      },
    ],
  },

  projects: {
    title: 'Research',
    kicker: 'Power Plant',
    accent: '#4b5751',
    tabs: [
      {
        id: 'research',
        label: 'Research',
        layout: 'list',
        intro: 'A header image followed by a compact list of research projects, papers, or investigations.',
        headerImageLabel: 'Research Header Image',
        items: [
          {
            title: 'Research Project One',
            imageLabel: 'Project Image',
            description: 'Use this slot for a short summary of the research question, contribution, and result.',
            skills: ['Research', 'Prototyping', 'Analysis'],
          },
          {
            title: 'Research Project Two',
            imageLabel: 'Project Image',
            description: 'A second compact row for another publication, prototype, or study.',
            skills: ['Interaction Design', 'Hardware', 'Evaluation'],
          },
          {
            title: 'Research Project Three',
            imageLabel: 'Project Image',
            description: 'A third row if you want another paper, system, or collaboration listed here.',
            skills: ['Systems', 'Writing', 'Experimentation'],
          },
        ],
      },
    ],
  },

  contact: {
    title: 'Contact',
    kicker: 'Radio Tower',
    accent: '#5b6961',
    tabs: [
      {
        id: 'contacts',
        label: 'Contacts',
        layout: 'contacts',
        intro: 'Keep this one direct: a compact list of ways to reach me.',
        contacts: [
          { label: 'Email', value: 'hello@example.com', href: 'mailto:hello@example.com' },
          { label: 'GitHub', value: 'github.com/yourname', href: 'https://github.com' },
          { label: 'LinkedIn', value: 'linkedin.com/in/yourname', href: 'https://linkedin.com' },
          { label: 'Location', value: 'City, State or Remote' },
        ],
      },
    ],
  },

  resume: {
    title: 'Experience',
    kicker: 'Bunker',
    accent: '#4f564f',
    tabs: [
      {
        id: 'experience',
        label: 'Experience',
        layout: 'list',
        intro: 'A condensed experience list with role, summary, and the main skills used.',
        items: [
          {
            title: 'Role Title / Team',
            imageLabel: 'Role Image',
            description: 'Short description of the responsibility, the work you did, and the result.',
            skills: ['Frontend', 'Systems', 'Collaboration'],
          },
          {
            title: 'Role Title / Lab',
            imageLabel: 'Role Image',
            description: 'Use a second entry for another internship, lab, or experience line item.',
            skills: ['Research', 'Prototyping', 'Testing'],
          },
        ],
      },
    ],
  },

  games: {
    title: 'Personal Projects',
    kicker: 'Ferris Wheel',
    accent: '#5f7066',
    tabs: [
      {
        id: 'projects',
        label: 'Projects',
        layout: 'list',
        intro: 'A condensed list of personal projects with image, summary, and skills used.',
        items: [
          {
            title: 'Project Name One',
            imageLabel: 'Project Image',
            description: 'A short description of the project, what it does, and why it matters.',
            skills: ['React', 'TypeScript', 'Design'],
          },
          {
            title: 'Project Name Two',
            imageLabel: 'Project Image',
            description: 'Another compact entry for a personal build, prototype, or experiment.',
            skills: ['Three.js', 'UI', 'Motion'],
          },
          {
            title: 'Project Name Three',
            imageLabel: 'Project Image',
            description: 'A third slot for another side project, game, tool, or concept.',
            skills: ['Creative Coding', 'Graphics', 'Interaction'],
          },
        ],
      },
    ],
  },
};
