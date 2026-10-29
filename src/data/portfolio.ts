/**
 * Single source of truth for all visible portfolio content.
 * The site is bilingual: every string lives in `content.es` / `content.en`.
 * Edit this file to update the site — components consume it through `useLanguage()`.
 */

export type Lang = 'es' | 'en'

export interface NavItem {
  label: string
  href: string
}

export interface Project {
  title: string
  subtitle: string
  bullets: string[]
  tags: string[]
  /** Repository URL. Omit when the code is not published yet. */
  url?: string
  /** Short status label rendered instead of the repo link (e.g. "En desarrollo"). */
  status?: string
}

export interface SkillGroup {
  label: string
  skills: string[]
}

export interface SocialLink {
  label: string
  href: string
}

export interface ExperienceItem {
  role: string
  org: string
  /** Dates, rendered in mono — the anchor of the entry. */
  period: string
  place: string
  mode: string
  bullets: string[]
}

export interface EducationItem {
  title: string
  org: string
  period: string
}

export interface Highlight {
  value: string
  label: string
}

export interface CvLink {
  label: string
  /** File name inside `public/`. Resolved against the Vite base URL at render time. */
  file: string
  lang: Lang
}

export interface Portfolio {
  meta: {
    title: string
    description: string
  }
  nav: NavItem[]
  hero: {
    greeting: string
    headline: string
    /** Stack manifest — rendered as its own line, not folded into the headline. */
    stack: string[]
    location: string
    availability: string
    ctaProjects: string
    ctaCv: string
    ctaContact: string
  }
  about: {
    title: string
    paragraphs: string[]
    highlights: Highlight[]
  }
  experience: {
    title: string
    items: ExperienceItem[]
  }
  projects: {
    title: string
    intro: string
    items: Project[]
  }
  skills: {
    title: string
    groups: SkillGroup[]
  }
  education: {
    title: string
    intro: string
    items: EducationItem[]
    certificationsLabel: string
    certifications: string[]
  }
  contact: {
    title: string
    text: string
    cta: string
    availability: string
    email: string
    socials: SocialLink[]
    cvLabel: string
    cvs: CvLink[]
  }
  ui: {
    skipLink: string
    navLabel: string
    homeLabel: string
    menuOpen: string
    menuClose: string
    languageLabel: string
    themeLabel: string
    themeToLight: string
    themeToDark: string
    opensNewTab: string
    repoLink: string
    footerNote: string
    builtWith: string
  }
}

const socials: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rocio-sanchez-suarez' },
  { label: 'GitHub', href: 'https://github.com/Rocioj433' },
]

const cvs: CvLink[] = [
  { label: 'CV Español', file: 'CV_RocioSanchez.pdf', lang: 'es' },
  { label: 'CV English', file: 'CV_RocioSanchez_EN.pdf', lang: 'en' },
]

export const email = 'rocioj433@gmail.com'

export const content: Record<Lang, Portfolio> = {
  es: {
    meta: {
      title: 'Rocío Sánchez Suárez | Desarrolladora Full Stack',
      description:
        'Portfolio de Rocío Sánchez Suárez, Desarrolladora Full Stack con 3 años de experiencia en React.js, Go, PHP/Symfony y Python (FastAPI). Experiencia, proyectos, formación y contacto.',
    },
    nav: [
      { label: 'Sobre mí', href: '#sobre-mi' },
      { label: 'Experiencia', href: '#experiencia' },
      { label: 'Proyectos', href: '#proyectos' },
      { label: 'Habilidades', href: '#habilidades' },
      { label: 'Formación', href: '#formacion' },
      { label: 'Contacto', href: '#contacto' },
    ],
    hero: {
      greeting: 'Hola, soy',
      headline:
        'Desarrolladora Full Stack. Construyo y mantengo la plataforma web regional de 3M, con presencia en LATAM y Europa.',
      stack: ['React.js', 'Go', 'PHP/Symfony', 'Python (FastAPI)', 'SQL', 'Docker'],
      location: 'Buenos Aires, Argentina',
      availability: 'Disponibilidad para híbrido en CABA y remoto',
      ctaProjects: 'Ver proyectos',
      ctaCv: 'Descargar CV',
      ctaContact: 'Hablemos',
    },
    about: {
      title: 'Sobre mí',
      paragraphs: [
        'Soy desarrolladora full stack con 3 años de experiencia construyendo y manteniendo una plataforma web regional para 3M, con presencia en múltiples mercados de LATAM y Europa.',
        'Me especializo en frontend con React.js, JavaScript, HTML/CSS y Material UI, y trabajo de forma transversal en backend con Go y PHP (Symfony), SQL/MySQL, AWS (S3) y Docker. Actualmente curso la Tecnicatura en Análisis de Sistemas y desarrollo proyectos propios con Python (FastAPI) e IA.',
      ],
      highlights: [
        { value: '3 años', label: 'experiencia comercial' },
        { value: '3M', label: 'plataforma regional' },
        { value: 'LATAM + Europa', label: 'mercados en producción' },
        { value: 'Full Stack', label: 'frontend + backend' },
      ],
    },
    experience: {
      title: 'Experiencia',
      items: [
        {
          role: 'Frontend Developer / Full Stack Web Developer',
          org: 'MKT Baires',
          period: 'Ene 2023 a Mar 2026',
          place: 'Buenos Aires, Argentina',
          mode: 'Híbrido',
          bullets: [
            'Desarrollé y evolucioné funcionalidades frontend de una plataforma web regional para 3M presente en múltiples mercados de LATAM y Europa, con React.js, JavaScript, HTML/CSS y Material UI.',
            'Implementé e integré funcionalidades sobre servicios backend en Go y PHP (Symfony), ampliando el alcance del producto más allá del frontend.',
            'Escribí y optimicé consultas SQL/MySQL para la información que consume la plataforma.',
            'Resolví incidencias en producción de forma autónoma mediante análisis de causa raíz, sosteniendo la continuidad operativa.',
            'Gestioné el flujo de desarrollo y despliegue con Docker, Git y GitLab, e incorporé GitHub Copilot como asistencia diaria, trabajando con equipos multidisciplinarios bajo Scrum.',
          ],
        },
      ],
    },
    projects: {
      title: 'Proyectos',
      intro:
        'Proyectos propios donde aplico el stack completo: producto, API, persistencia y automatización.',
      items: [
        {
          title: 'Control de Gastos',
          subtitle: 'Finanzas personales con motor de automatización',
          url: 'https://github.com/Rocioj433/Project-Control-Gastos',
          bullets: [
            'App móvil de control de gastos en React Native (Expo) con backend propio en Python (FastAPI) y persistencia en SQLite vía SQLAlchemy.',
            'Pipeline de importación que extrae el texto de los resúmenes de tarjeta en PDF, parsea los movimientos y los clasifica por reglas o con un LLM.',
            'Sincronización con Google Sheets mediante service account (credenciales JWT) y exportación a Excel.',
          ],
          tags: ['React Native', 'FastAPI', 'SQLite', 'pdfplumber', 'OpenAI', 'Google Sheets'],
        },
        {
          title: 'CV Generator',
          subtitle: 'Datos en YAML, salida ATS en PDF',
          url: 'https://github.com/Rocioj433/cv-yaml-version',
          bullets: [
            'Generador de CV que separa los datos (YAML) de la presentación (HTML/CSS), con editor web y preview en vivo.',
            'Exportación a PDF con Playwright y agente integrado con nodos de guardrail, sanitización, ATS checker y métricas.',
          ],
          tags: ['YAML', 'Node.js', 'JavaScript', 'Playwright', 'HTML/CSS'],
        },
        {
          title: 'Transcriptor de Audio',
          subtitle: 'Diarización de hablantes y export multi-formato',
          url: 'https://github.com/Rocioj433/Transcriptor-IA',
          bullets: [
            'Estudio de transcripción local-first para audio y video: convierte una grabación en texto e identifica qué hablante dice cada fragmento.',
            'Orquestación en FastAPI con cola de trabajos, worker pool, progreso por SSE y cancelación cooperativa; Whisper y PyAnnote detrás de interfaces inyectables.',
            'Ocho formatos de exportación (TXT, SRT, VTT, DOCX, PDF, JSON, CSV, MD) con 116 tests en pytest y goldens byte-stable.',
          ],
          tags: ['Python', 'FastAPI', 'Faster-Whisper', 'PyAnnote', 'pytest'],
        },
      ],
    },
    skills: {
      title: 'Habilidades',
      groups: [
        {
          label: 'Frontend',
          skills: ['React.js', 'JavaScript (ES6+)', 'React Native', 'HTML5', 'CSS3', 'Material UI'],
        },
        {
          label: 'Backend',
          skills: ['Go (Golang)', 'PHP', 'Symfony', 'Python', 'FastAPI', 'APIs REST', 'MVC'],
        },
        {
          label: 'Datos y cloud',
          skills: ['MySQL', 'SQL', 'Optimización de consultas', 'AWS (S3)', 'Docker'],
        },
        {
          label: 'Metodologías y herramientas',
          skills: [
            'Scrum',
            'Git',
            'GitHub',
            'GitLab',
            'Jira',
            'Trello',
            'pytest',
            'GitHub Copilot',
            'Claude Code',
          ],
        },
      ],
    },
    education: {
      title: 'Formación',
      intro:
        'Formación técnica en curso, compaginada con el trabajo full time. Las certificaciones son las que respaldan el stack que uso a diario.',
      items: [
        {
          title: 'Analista de Sistemas (Tecnicatura Superior)',
          org: 'IFTS, CABA',
          period: 'Desde feb 2024',
        },
        {
          title: 'Técnico en Computación',
          org: 'Escuela Técnica N.º 7 D.E. 5.º "Dolores Lavalle de Lavalle", CABA',
          period: '2015 a 2020',
        },
      ],
      certificationsLabel: 'Certificaciones',
      certifications: [
        'React JS, Coderhouse 2022',
        'Desarrollo Front-End, Guayerd 2021',
        'Landing Page con HTML, CSS y JavaScript, Udemy 2021',
        'IA para Todas, AWS / TIDWIT 2026',
      ],
    },
    contact: {
      title: 'Contacto',
      text: 'Estoy abierta a posiciones full stack y frontend, híbridas en CABA o remotas. Escribime y te respondo.',
      cta: 'Escribime',
      availability: 'Buenos Aires, Argentina · híbrido en CABA o remoto (UTC-3)',
      email,
      socials,
      cvLabel: 'Descargar CV',
      cvs,
    },
    ui: {
      skipLink: 'Saltar al contenido principal',
      navLabel: 'Navegación principal',
      homeLabel: 'Ir al inicio',
      menuOpen: 'Abrir menú de navegación',
      menuClose: 'Cerrar menú de navegación',
      languageLabel: 'Idioma del sitio',
      themeLabel: 'Tema de color',
      themeToLight: 'Cambiar a tema claro',
      themeToDark: 'Cambiar a tema oscuro',
      opensNewTab: 'se abre en una pestaña nueva',
      repoLink: 'Ver repositorio',
      footerNote:
        'Hecho con React, TypeScript y Vite. Sin frameworks de CSS, sin fuentes externas.',
      builtWith: 'Buenos Aires, Argentina',
    },
  },

  en: {
    meta: {
      title: 'Rocío Sánchez Suárez | Full Stack Developer',
      description:
        'Portfolio of Rocío Sánchez Suárez, Full Stack Developer with 3 years of experience in React.js, Go, PHP/Symfony and Python (FastAPI). Experience, projects, education and contact.',
    },
    nav: [
      { label: 'About', href: '#sobre-mi' },
      { label: 'Experience', href: '#experiencia' },
      { label: 'Projects', href: '#proyectos' },
      { label: 'Skills', href: '#habilidades' },
      { label: 'Education', href: '#formacion' },
      { label: 'Contact', href: '#contacto' },
    ],
    hero: {
      greeting: "Hi, I'm",
      headline:
        "Full Stack Developer. I build and maintain 3M's regional web platform, live across LATAM and Europe.",
      stack: ['React.js', 'Go', 'PHP/Symfony', 'Python (FastAPI)', 'SQL', 'Docker'],
      location: 'Buenos Aires, Argentina',
      availability: 'Open to hybrid roles in CABA and remote positions (UTC-3)',
      ctaProjects: 'See projects',
      ctaCv: 'Download CV',
      ctaContact: "Let's talk",
    },
    about: {
      title: 'About me',
      paragraphs: [
        'I am a full stack developer with 3 years of experience building and maintaining a regional web platform for 3M, used across multiple LATAM and European markets.',
        'My strongest side is frontend (React.js, JavaScript, HTML/CSS and Material UI), and I also work across the backend with Go and PHP (Symfony), SQL/MySQL, AWS (S3) and Docker. I am currently pursuing a Higher Technical Degree in Systems Analysis while building independent projects with Python (FastAPI) and AI.',
      ],
      highlights: [
        { value: '3 years', label: 'commercial experience' },
        { value: '3M', label: 'regional platform' },
        { value: 'LATAM + Europe', label: 'markets in production' },
        { value: 'Full Stack', label: 'frontend + backend' },
      ],
    },
    experience: {
      title: 'Experience',
      items: [
        {
          role: 'Frontend Developer / Full Stack Web Developer',
          org: 'MKT Baires',
          period: 'Jan 2023 to Mar 2026',
          place: 'Buenos Aires, Argentina',
          mode: 'Hybrid',
          bullets: [
            'Developed and enhanced frontend features for a regional web platform for 3M used across multiple LATAM and European markets, with React.js, JavaScript, HTML/CSS and Material UI.',
            'Implemented and integrated features on backend services built in Go and PHP (Symfony), extending the product beyond the frontend layer.',
            'Wrote and optimized SQL/MySQL queries for the data consumed by the platform.',
            'Resolved production incidents autonomously through root-cause analysis, maintaining service continuity.',
            'Managed the development and deployment workflow with Docker, Git and GitLab, and adopted GitHub Copilot as a daily development aid, working with cross-functional teams under Scrum.',
          ],
        },
      ],
    },
    projects: {
      title: 'Projects',
      intro:
        'Side projects where I apply the full stack: product, API, persistence and automation.',
      items: [
        {
          title: 'Expense Tracker',
          subtitle: 'Personal finance app with an automation engine',
          url: 'https://github.com/Rocioj433/Project-Control-Gastos',
          bullets: [
            'Mobile expense-tracking app in React Native (Expo) with its own Python (FastAPI) backend and SQLite persistence through SQLAlchemy.',
            'Import pipeline that extracts text from credit card statement PDFs, parses the transactions and classifies them with rules or an LLM.',
            'Google Sheets sync through a service account (JWT credentials) plus Excel export.',
          ],
          tags: ['React Native', 'FastAPI', 'SQLite', 'pdfplumber', 'OpenAI', 'Google Sheets'],
        },
        {
          title: 'CV Generator',
          subtitle: 'YAML data, ATS-ready PDF output',
          url: 'https://github.com/Rocioj433/cv-yaml-version',
          bullets: [
            'CV generator that separates data (YAML) from presentation (HTML/CSS), with a web editor and live preview.',
            'PDF export through Playwright and an integrated agent with guardrail nodes, sanitization, an ATS checker and metrics.',
          ],
          tags: ['YAML', 'Node.js', 'JavaScript', 'Playwright', 'HTML/CSS'],
        },
        {
          title: 'Audio Transcriber',
          subtitle: 'Speaker diarization and multi-format export',
          url: 'https://github.com/Rocioj433/Transcriptor-IA',
          bullets: [
            'Local-first transcription studio for audio and video: turns a recording into text and identifies which speaker said each segment.',
            'FastAPI orchestration with a job queue, worker pool, SSE progress and cooperative cancellation; Whisper and PyAnnote behind injectable interfaces.',
            'Eight export formats (TXT, SRT, VTT, DOCX, PDF, JSON, CSV, MD) covered by 116 pytest tests and byte-stable goldens.',
          ],
          tags: ['Python', 'FastAPI', 'Faster-Whisper', 'PyAnnote', 'pytest'],
        },
      ],
    },
    skills: {
      title: 'Skills',
      groups: [
        {
          label: 'Frontend',
          skills: ['React.js', 'JavaScript (ES6+)', 'React Native', 'HTML5', 'CSS3', 'Material UI'],
        },
        {
          label: 'Backend',
          skills: ['Go (Golang)', 'PHP', 'Symfony', 'Python', 'FastAPI', 'REST APIs', 'MVC'],
        },
        {
          label: 'Data and cloud',
          skills: ['MySQL', 'SQL', 'Query optimization', 'AWS (S3)', 'Docker'],
        },
        {
          label: 'Methodologies and tooling',
          skills: [
            'Scrum',
            'Git',
            'GitHub',
            'GitLab',
            'Jira',
            'Trello',
            'pytest',
            'GitHub Copilot',
            'Claude Code',
          ],
        },
      ],
    },
    education: {
      title: 'Education',
      intro:
        'Technical studies in progress, alongside full-time work. These are the certifications behind the stack I use every day.',
      items: [
        {
          title: 'Systems Analyst (Higher Technical Degree)',
          org: 'IFTS, CABA',
          period: 'Since Feb 2024',
        },
        {
          title: 'Computer Technician',
          org: 'Escuela Técnica N.º 7 D.E. 5.º "Dolores Lavalle de Lavalle", CABA',
          period: '2015 to 2020',
        },
      ],
      certificationsLabel: 'Certifications',
      certifications: [
        'React JS, Coderhouse 2022',
        'Front-End Development, Guayerd 2021',
        'Landing Page with HTML, CSS and JavaScript, Udemy 2021',
        'AI for Everyone, AWS / TIDWIT 2026',
      ],
    },
    contact: {
      title: 'Contact',
      text: 'I am open to full stack and frontend roles, hybrid in CABA or fully remote. Reach out and I will get back to you.',
      cta: 'Email me',
      availability: 'Buenos Aires, Argentina · hybrid in CABA or remote (UTC-3)',
      email,
      socials,
      cvLabel: 'Download CV',
      cvs,
    },
    ui: {
      skipLink: 'Skip to main content',
      navLabel: 'Main navigation',
      homeLabel: 'Back to top',
      menuOpen: 'Open navigation menu',
      menuClose: 'Close navigation menu',
      languageLabel: 'Site language',
      themeLabel: 'Color theme',
      themeToLight: 'Switch to light theme',
      themeToDark: 'Switch to dark theme',
      opensNewTab: 'opens in a new tab',
      repoLink: 'View repository',
      footerNote: 'Built with React, TypeScript and Vite. No CSS frameworks, no external fonts.',
      builtWith: 'Buenos Aires, Argentina',
    },
  },
}

export const name = 'Rocío Sánchez Suárez'
export const defaultLang: Lang = 'es'
