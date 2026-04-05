import resumePdf from '../../Orion_Hoch_Resume_Climate_Copy.pdf';
import type { VisualizationSequenceId } from './visualizationSequences';

export interface PortfolioItem {
  title: string;
  organization?: string;
  organizationHref?: string;
  organizationExternal?: boolean;
  dates?: string;
  visualizationStepId?: string;
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

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface ContentTab {
  id: string;
  label: string;
  layout: 'about' | 'list' | 'contacts';
  intro?: string;
  actionLabel?: string;
  actionHref?: string;
  actionExternal?: boolean;
  visualizationSequenceId?: VisualizationSequenceId;
  visualizationLabel?: string;
  photo?: string;
  photoLabel?: string;
  alternatePhoto?: string;
  alternatePhotoLabel?: string;
  primaryPhotoButtonLabel?: string;
  alternatePhotoButtonLabel?: string;
  bio?: string[];
  headerImage?: string;
  headerImageLabel?: string;
  items?: PortfolioItem[];
  secondaryTitle?: string;
  secondaryIntro?: string;
  secondaryItems?: PortfolioItem[];
  contacts?: ContactItem[];
  skillGroups?: SkillGroup[];
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
    accent: '#b87018',
    tabs: [
      {
        id: 'profile',
        label: 'Profile',
        layout: 'about',
        intro: 'Orion Hoch || Cornell Class of 2028',
        photoLabel: 'Main Portrait Area',
        photo: '/images/about/headshot.jpeg',
        alternatePhoto: '/images/about/casual.jpg',
        alternatePhotoLabel: 'Casual Photo Area',
        primaryPhotoButtonLabel: 'Click for Serious Photo',
        alternatePhotoButtonLabel: 'Click for Casual Photo',
        bio: [
          'I build interfaces, systems, and prototypes with a bias toward clarity, atmosphere, and strong structure. I like work that feels intentional instead of over-decorated, and I care a lot about how people move through information.',
          'Most of my projects live at the intersection of design and engineering. That usually means taking something abstract, shaping it into a coherent system, and then carrying it through implementation without flattening the original point of view.',
        ],
        skillGroups: [
          {
            title: 'Languages and Libraries',
            items: ['Python', 'R', 'Java', 'C++', 'OCaml', 'JavaScript', 'ArcPy', 'RSGISLib', 'cartopy', 'CloudComPy'],
          },
          {
            title: 'Operational Skills',
            items: ['ArcGIS', 'QGIS', 'CloudCompare', 'Google Earth Engine', 'Mass Spectrometry', 'Gas Chromatography', 'CESM 2.2', 'Fusion360', 'Blender'],
          },
          {
            title: 'Courses',
            items: ['Python in Climate Science', 'Programming in Java', 'GIS and Remote Sensing', 'Climate Modeling (CESM)', 'Data Structures and Algorithms', 'Intro Meteorology', 'Linear Alegbra', 'Statistics', 'Object Oriented Programming'],
          },
        ],
      },
    ],
  },

  projects: {
    title: 'Projects',
    kicker: 'Power Plant',
    accent: '#a06818',
    tabs: [
      {
        id: 'projects',
        label: 'Projects',
        layout: 'list',
        intro: 'Technical projects, research, and field work collected in one archive.',
        visualizationSequenceId: 'projects',
        visualizationLabel: 'Personal Walkthrough',
        headerImageLabel: 'Projects Header Image',
        headerImage: '/inspiration/Xpbl_e6.png',
        items: [
          {
            title: 'Lidar Gap Analysis of Post-Hurricane Canopy Disturbance',
            visualizationStepId: 'project-lidar',
            imageLabel: 'Research Image',
            description: 'Use this row for a concise description of the question, method, and resulting artifact or takeaway.',
            skills: ['Research', 'Systems', 'Analysis'],
          },
          {
            title: 'NBA Computer Vision Shot Quality Quantifier',
            visualizationStepId: 'project-shot-quality-overview',
            imageLabel: 'Project Image',
            description: 'A short summary of what the project is, why it exists, and what makes it worth showing.',
            skills: ['Computer Vision', 'Analytics', 'Design'],
          },
          {
            title: 'Lichen Paleoclimate Reconstruction with Mass Spectrometry and Monte Carlo Modeling',
            visualizationStepId: 'project-lichen',
            imageLabel: 'Research Image',
            description: 'A third slot for another experiment, publication, or line of inquiry.',
            skills: ['Writing', 'Experimentation', 'Design'],
          },

          {
            title: 'OpenGauntlet',
            visualizationStepId: 'project-opengauntlet-overview',
            imageLabel: 'Project Image',
            description: 'A more atmospheric and interaction-heavy build focused on systems, tone, and world feel.',
            skills: ['Creative Coding', 'Graphics', 'Interaction'],
          },
          {
            title: 'Buoy Weather Station',
            visualizationStepId: 'project-buoy-overview',
            imageLabel: 'Project Image',
            description: 'A field hardware and environmental sensing build centered on monitoring under real deployment constraints.',
            skills: ['Hardware', 'Weather', 'Monitoring'],
          },
          {
            title: 'Oregon Flood Analysis',
            visualizationStepId: 'project-flood-overview',
            imageLabel: 'Project Image',
            description: 'A geospatial and hydrologic analysis project focused on flood behavior and clearer mapping outputs.',
            skills: ['GIS', 'Hydrology', 'Mapping'],
          },
        ],
      },
    ],
  },

  contact: {
    title: 'Contact',
    kicker: 'Radio Tower',
    accent: '#8a5810',
    tabs: [
      {
        id: 'contacts',
        label: 'Contacts',
        layout: 'contacts',
        headerImageLabel: 'Contact Header Image',
        headerImage: '/inspiration/ss_495bc8e7336d46580963d482375de37047a86006.1920x1080.jpg',
        intro: 'The best way to contact me is through email! Currently in Ithaca during the school year, but I will always call the Pacific Northwest home.',
        contacts: [
          { label: 'Email', value: 'ogh6@cornell.edu', href: 'mailto:ogh6@cornell.edu' },
          { label: 'GitHub', value: 'github.com/orion-hoch', href: 'https://github.com/orion-hoch' },
          { label: 'LinkedIn', value: 'linkedin.com/in/orion-hoch/', href: 'https://www.linkedin.com/in/orion-hoch/' },
          { label: 'Trivia Site', value: 'oriontrivia.org', href: 'https://oriontrivia.org'},
          { label: 'Location', value: 'Ithaca, NY / Portland, OR' },
        ],
      },
    ],
  },

  resume: {
    title: 'Experience',
    kicker: 'Bunker',
    accent: '#7a4c10',
    tabs: [
      {
        id: 'experience',
        label: 'Experience',
        layout: 'list',
        intro: 'list of research, internship, and team leadership experience.',
        headerImageLabel: 'Experience Header Image',
        headerImage: '/inspiration/vBrFyWe.jpg',
        actionLabel: 'Download Resume',
        actionHref: resumePdf,
        items: [
          {
            title: 'Geospatial Software Intern',
            organization: 'GCS Geospatial',
            organizationHref: 'https://www.gcsgeospatial.com/',
            dates: 'May 2026 - Aug 2026',
            imageLabel: 'Experience Image',
            image: '/images/experience/GCS_Geospatial.jpeg',
            description: 'Geospatial software internship focused on applied mapping and analysis of LiDAR and Geospatial workflows for Defense Contracting. Currently in Progress...',
            skills: ['Geospatial Software', 'Mapping', 'Analysis'],
          },
          {
            title: 'Research Assistant - Biosphere Modeling and Monitoring',
            organization: 'BIOM2 Lab',
            organizationHref: 'https://xiangtaoxu.eeb.cornell.edu/',
            dates: 'Sep 2025 - Present',
            image: '/images/experience/lab_custom.png',
            imageLabel: 'Experience Image',
            description: 'Analyzed NASA G-LiHT airborne LiDAR data to quantify canopy gaps and post-hurricane disturbance, transformed raw returns into canopy height models with CRS alignment, and supported deployment of terrestrial, airborne, and mobile sensing systems for field experiments.',
            skills: ['LiDAR', 'CloudComPy', 'GIS', 'CloudCompare'],
          },
            {
            title: 'Environmental Engineering Team Lead',
            organization: 'CU GeoData Project Team',
            organizationHref: 'https://www.cugeodata.com/',
            dates: 'Oct 2024 - Present',
            image: '/images/experience/geodata.jpg',
            imageLabel: 'Experience Image',
            description: 'Manage a multidisciplinary Cornell project team of 40 engineers, leading hardware, software, sensing, and energy-management efforts for autonomous environmental monitoring systems including in-house sensors, weather stations, buoy platforms, and Raspberry Pi edge nodes.',
            skills: ['Leadership', 'Sensor Networks', 'Raspberry Pi', 'Environmental Modeling'],
          },
          {
            title: 'Research Assistant - Climate and Ecosystem Modeling',
            organization: 'Cornell Stable Isotope Lab',
            organizationHref: 'https://cobsil.cornell.edu/',
            dates: 'May 2025 - Aug 2025',
            image: '/images/experience/COIL.png',
            imageLabel: 'Experience Image',
            description: 'Helped design and run greenhouse CO2-collar experiments on fungal hyphae impacts on nitrogen fixation, processed gas and biological samples with chromatography, mass spectrometry, and stable isotope workflows, and collaborated on isotopic analysis for paleoclimate reconstruction using a historic lichen collection and Monte Carlo gas modeling.',
            skills: ['Mass Spectrometry', 'Gas Chromatography', 'Stable Isotopes', 'Climate Modeling'],
          },

          {
            title: 'Intern - Meteorological and Hydrological Modeling',
            organization: 'National Weather Forecast Office',
            organizationHref: 'https://www.weather.gov/pqr/',
            dates: 'May 2023 - Aug 2023',
            image: '/images/experience/weather_service.png',
            imageLabel: 'Experience Image',
            description: 'Built vector, LiDAR, raster, and hydrograph maps in QGIS and ArcGIS for emergency and NWS use, and analyzed hydrologic sensor records across the Columbia River Basin to study historical flood inundation and support StoryMap creation with ArcPy.',
            skills: ['QGIS', 'ArcGIS', 'ArcPy', 'Hydrologic Modeling'],
          },
        ],
        secondaryTitle: 'Additional Work',
        secondaryIntro: 'Not super applicable to the work I do for a career, but still important parts of my life that I thought are worth sharing!',
        secondaryItems: [
          {
            title: 'Sports Statistician',
            organization: 'Cornell Athletics',
            organizationHref: 'https://cornellbigred.com/',
            imageLabel: 'Experience Image',
            image: '/images/experience/Cornell_sports_logo.png',
            description: 'Covering live sports statistics, game-day tracking, and support for athletic events.',
            skills: ['Sports Statistics', 'Live Data', 'Game Day Operations'],
          },
          {
            title: 'Broadcaster',
            organization: 'WVBR Radio',
            organizationHref: 'https://wvbr.com/',
            imageLabel: 'Experience Image',
            image: '/images/experience/wvbr.avif',
            description: 'on-air broadcasting, commentary, production, and station work for a Sports Radio Show.',
            skills: ['Broadcasting', 'Audio', 'Communication'],
          },
                    {
            title: 'Server and Recreation Events Coordinator',
            organization: 'The Springs at Carman Oaks',
            organizationHref: 'https://www.thespringsliving.com/senior-living/lake-oswego/oregon/carman-oaks',
            imageLabel: 'Experience Image',
            image: '/images/experience/springs.webp',
            description: 'My first job working as a server at the restaraunt. Eventually fazed out of serving and focused more on creating recreation events for the seniors and facillitating high schoolers to volunteer their time and spend time with the residents. Also birthed my first time hosting trivia!',
            skills: ['Broadcasting', 'Audio', 'Communication'],
          },
        ],
      },
    ],
  },

  games: {
    title: 'Creative',
    kicker: 'Ferris Wheel',
    accent: '#c07820',
    tabs: [
      {
        id: 'creative',
        label: 'Creative',
        layout: 'list',
        intro: 'A smaller archive for the more expressive and web-facing work.',
        visualizationSequenceId: 'creative',
        visualizationLabel: 'Personal Walkthrough',
        headerImageLabel: 'Creative Work Header Image',
        headerImage: '/inspiration/DnUZLdw.jpg',
        items: [
          {
            title: 'NFL/NBA Balatro',
            visualizationStepId: 'creative-trivia-overview',
            imageLabel: 'Project Image',
            description: 'Another compact row for a side project, tool, prototype, or game-adjacent experiment.',
            skills: ['Three.js', 'UI', 'Motion'],
          },
          {
            title: 'NFL/NBA Multiplayer Games',
            visualizationStepId: 'creative-trivia-overview',
            imageLabel: 'Project Image',
            description: 'Another compact row for a side project, tool, prototype, or game-adjacent experiment.',
            skills: ['Three.js', 'UI', 'Motion'],
          },
          {
            title: 'NFL/NBA Trivia Games',
            visualizationStepId: 'creative-trivia-overview',
            imageLabel: 'Project Image',
            description: 'Another compact row for a side project, tool, prototype, or game-adjacent experiment.',
            skills: ['Three.js', 'UI', 'Motion'],
          },
          {
            title: '3D Personal Website',
            visualizationStepId: 'creative-website-overview',
            imageLabel: 'Project Image',
            description: 'A third row for another personal build with a clear one-paragraph explanation.',
            skills: ['Creative Coding', 'Graphics', 'Interaction'],
          },
        ],
      },
    ],
  },
};
