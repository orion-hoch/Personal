import resumePdf from '../../Orion_Hoch_Resume_Climate_Copy.pdf';

export interface PortfolioItem {
  title: string;
  organization?: string;
  organizationHref?: string;
  organizationExternal?: boolean;
  dates?: string;
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
    accent: '#66747b',
    tabs: [
      {
        id: 'profile',
        label: 'Profile',
        layout: 'about',
        intro: 'A main portrait area, a direct introduction, and a compact read on how I tend to work.',
        photoLabel: 'Main Portrait Area',
        photo: '/images/about/headshot.jpeg',
        alternatePhoto: '/images/about/casual.jpg',
        alternatePhotoLabel: 'Casual Photo Area',
        primaryPhotoButtonLabel: 'Show Headshot',
        alternatePhotoButtonLabel: 'Show Casual Photo',
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
            items: ['ArcGIS', 'QGIS', 'CloudCompare', 'Google Earth Engine', 'Mass Spectrometry', 'CESM 2.2', 'Fusion360'],
          },
          {
            title: 'Courses',
            items: ['Python in Climate Science', 'Programming in Java', 'GIS and Remote Sensing', 'Climate Modeling (CESM)'],
          },
        ],
      },
    ],
  },

  projects: {
    title: 'Research',
    kicker: 'Power Plant',
    accent: '#738088',
    tabs: [
      {
        id: 'research',
        label: 'Research',
        layout: 'list',
        intro: 'A header image area followed by a restrained list of research work, papers, or investigations.',
        headerImageLabel: 'Research Header Image',
        headerImage: '/images/research/tree_no.png',
        items: [
          {
            title: 'Lidar Gap Analysis of Post-Hurricane Canopy Disturbance',
            imageLabel: 'Research Image',
            description: 'Use this row for a concise description of the question, method, and resulting artifact or takeaway.',
            skills: ['Research', 'Systems', 'Analysis'],
          },
          {
            title: 'Canopy Gap Driver Analysis with CloudCompare',
            imageLabel: 'Research Image',
            description: 'A second item for another paper, collaboration, or prototype-driven investigation.',
            skills: ['Interaction', 'Prototyping', 'Evaluation'],
          },
          {
            title: 'Lichen Paleoclimate Reconstruction with Mass Spectrometry and Monte Carlo Modeling',
            imageLabel: 'Research Image',
            description: 'A third slot for another experiment, publication, or line of inquiry.',
            skills: ['Writing', 'Experimentation', 'Design'],
          },
           {
            title: 'Regional Climate Modeling with HERBIE',
            imageLabel: 'Research Image',
            description: 'A third slot for another experiment, publication, or line of inquiry.',
            skills: ['Writing', 'Experimentation', 'Design'],
          },
          {
            title: 'Accuracy of Snowpiercer CESM 2.2 Simulations in the Pacific Northwest',
            imageLabel: 'Research Image',
            description: 'A third slot for another experiment, publication, or line of inquiry.',
            skills: ['Writing', 'Experimentation', 'Design'],
          },
        ],
      },
    ],
  },

  contact: {
    title: 'Contact',
    kicker: 'Radio Tower',
    accent: '#6b7880',
    tabs: [
      {
        id: 'contacts',
        label: 'Contacts',
        layout: 'contacts',
        intro: 'The best way to contact me is through email! Currently in Ithaca during the school year, but I will always call the Pacific Northwest home.',
        contacts: [
          { label: 'Email', value: 'ogh6@cornell.edu', href: 'mailto:ogh6@cornell.edu' },
          { label: 'GitHub', value: 'github.com/orion-hoch', href: 'https://github.com/orion-hoch' },
          { label: 'LinkedIn', value: 'linkedin.com/in/orion-hoch/', href: 'https://www.linkedin.com/in/orion-hoch/' },
          { label: 'Location', value: 'Ithaca, NY / Portland, OR' },
        ],
      },
    ],
  },

  resume: {
    title: 'Experience',
    kicker: 'Bunker',
    accent: '#616d74',
    tabs: [
      {
        id: 'experience',
        label: 'Experience',
        layout: 'list',
        intro: 'list of research, internship, and team leadership experience.',
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
        secondaryIntro: 'A second section for more public-facing, quirky, or unconventional roles that still matter to the overall story.',
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
        ],
      },
    ],
  },

  games: {
    title: 'Personal Projects',
    kicker: 'Ferris Wheel',
    accent: '#7a8790',
    tabs: [
      {
        id: 'projects',
        label: 'Projects',
        layout: 'list',
        intro: 'A condensed project list with just the essentials: image, name, description, and skills used.',
        items: [
          {
            title: 'NBA Computer Vision Shot Quality Quantifier',
            imageLabel: 'Project Image',
            description: 'A short summary of what the project is, why it exists, and what makes it worth showing.',
            skills: ['React', 'TypeScript', 'Design'],
          },
          {
            title: 'OrionTrivia.Org',
            imageLabel: 'Project Image',
            description: 'Another compact row for a side project, tool, prototype, or game-adjacent experiment.',
            skills: ['Three.js', 'UI', 'Motion'],
          },
          {
            title: 'OpenGauntlet',
            imageLabel: 'Project Image',
            description: 'A third row for another personal build with a clear one-paragraph explanation.',
            skills: ['Creative Coding', 'Graphics', 'Interaction'],
          },
          {
            title: 'Buoy Weather Station',
            imageLabel: 'Project Image',
            description: 'A third row for another personal build with a clear one-paragraph explanation.',
            skills: ['Creative Coding', 'Graphics', 'Interaction'],
          },
          {
            title: '3D Personal Website',
            imageLabel: 'Project Image',
            description: 'A third row for another personal build with a clear one-paragraph explanation.',
            skills: ['Creative Coding', 'Graphics', 'Interaction'],
          },
          {
            title: 'Oregon Flood Analysis',
            imageLabel: 'Project Image',
            description: 'A third row for another personal build with a clear one-paragraph explanation.',
            skills: ['Creative Coding', 'Graphics', 'Interaction'],
          },
          {
            title: 'Project Name Three',
            imageLabel: 'Project Image',
            description: 'A third row for another personal build with a clear one-paragraph explanation.',
            skills: ['Creative Coding', 'Graphics', 'Interaction'],
          },
        ],
      },
    ],
  },
};
