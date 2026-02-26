/* ===========================
   Internationalization (i18n)
   =========================== */

const translations = {
    es: {
        // Navigation
        'nav.about': 'Sobre mí',
        'nav.experience': 'Experiencia',
        'nav.skills': 'Skills',
        'nav.education': 'Educación',
        'nav.courses': 'Cursos',
        'nav.contact': 'Contacto',

        // Hero
        'hero.greeting': 'Hola, soy',
        'hero.title': 'Desarrollador Full Stack',
        'hero.live_badge': 'Actualmente en Sonda · Santiago',
        'hero.contact_btn': 'Contáctame',
        'hero.download_btn': 'Descargar CV',
        'hero.stat_years': 'Años de Experiencia',
        'hero.stat_companies': 'Empresas',
        'hero.stat_tech': 'Tecnologías',

        // About
        'about.title': 'Sobre <span class="accent">Mí</span>',
        'about.p1': 'Desarrollador Full Stack con más de <strong>14 años de trayectoria</strong> en industrias como <strong>retail, comercio electrónico, minería, telecomunicaciones y sector público</strong>. Me especializo en construir soluciones robustas y escalables con un fuerte compromiso con la calidad y las buenas prácticas de ingeniería.',
        'about.p2': 'A lo largo de mi carrera he liderado proyectos de alta complejidad, promovido la <strong>mejora continua</strong> y potenciado equipos de trabajo mediante metodologías ágiles, entregando software que genera impacto real en los negocios.',
        'about.languages': 'Español (Nativo) · Inglés (C1)',

        // Experience
        'exp.title': 'Experiencia <span class="accent">Profesional</span>',
        'exp.sonda.role': 'Desarrollador Full Stack',
        'exp.sonda.date': 'Dic 2024 — Presente',
        'exp.sonda.d1': 'Desarrollé una plataforma web responsiva para declaración y gestión de impuestos del SII, utilizando Vue.js y Java Spring Boot 3, integrando lógica tributaria compleja con alta precisión y rendimiento.',
        'exp.sonda.d2': 'Implementé el flujo completo de pago anual a la Tesorería General de la República para Sernageomin, con .NET Core 7, React y SQL Server 2019, garantizando integridad transaccional en procesos críticos de gobierno.',
        'exp.sonda.d3': 'Mantuve y optimicé una API de compras públicas basada en el estándar OCDS para ChileCompra, asegurando disponibilidad y compatibilidad con .NET Framework 4.8 y SQL Server 2019.',
        'exp.sonda.d4': 'Modernizé el sitio web corporativo de Ohio National / AuguStar Seguros (mercado estadounidense) con PHP, WordPress y MySQL, mejorando la experiencia de usuario y la gestión de contenidos.',
        'exp.sonda.d5': 'Lideré la adopción interna de Agentes de IA (Cursor, Claude, GitHub Copilot), impulsando un cambio cultural hacia el desarrollo asistido por IA que aceleró los ciclos de entrega del equipo.',

        'exp.rda.role': 'Analista QA / Automatización',
        'exp.rda.company': 'RDA Corporation · Remoto (US)',
        'exp.rda.date': 'Ene 2023 — Oct 2024',
        'exp.rda.d1': 'Diseñé y ejecuté casos de prueba exhaustivos para aplicaciones SaaS del mercado estadounidense, elevando la cobertura de calidad e identificando defectos críticos antes del lanzamiento.',
        'exp.rda.d2': 'Realicé pruebas de UI y API (REST) validando funcionalidad, rendimiento y contratos de datos en entornos de alta demanda.',
        'exp.rda.d3': 'Desarrollé un framework de automatización E2E con Cypress y TypeScript, reduciendo el tiempo de regresión manual y aumentando la confiabilidad de los releases.',
        'exp.rda.d4': 'Integré pipelines de CI/CD en Azure DevOps para ejecución automatizada de pruebas en cada despliegue, mejorando la velocidad y estabilidad del proceso de entrega continua.',

        'exp.ab.role': 'Desarrollador Full Stack · Analista de Proyectos',
        'exp.ab.date': 'Nov 2017 — Sep 2022',
        'exp.ab.d1': 'Lideré la gestión técnica y funcional de proyectos de software para clientes de diversos rubros, coordinando equipos, definiendo alcances y asegurando entregas de calidad en plazo.',
        'exp.ab.d2': 'Desarrollé íntegramente la plataforma sisenior.cl con PHP, WordPress y MySQL, cubriendo desde la arquitectura hasta el despliegue en producción.',
        'exp.ab.d3': 'Diseñé e implementé un sistema de software de cobranzas con .NET ASP y SQL Server, automatizando procesos clave de gestión de deuda para Pymes.',
        'exp.ab.d4': 'Construí un sistema de distribución y logística a medida para Minera Las Cenizas con PHP, Laravel y MySQL, optimizando la trazabilidad de operaciones mineras.',

        'exp.vmica.role': 'Desarrollador Full Stack · Analista de Proyectos',
        'exp.vmica.date': 'Feb 2014 — Oct 2017',
        'exp.vmica.d1': 'Actué como desarrollador líder en una solución propietaria de gestión de servicios DTH para Entel, construida en .NET ASP/C# y PL/SQL, soportando millones de transacciones de clientes de telecomunicaciones.',
        'exp.vmica.d2': 'Desarrollé e integré servicios web con WebLogic Java para clientes como Entel y Claro, garantizando alta disponibilidad e interoperabilidad entre plataformas.',
        'exp.vmica.d3': 'Implementé servicios de generación de informes y carga masiva de datos en entornos Unix mediante scripts Bash, automatizando procesos nocturnos críticos del negocio.',
        'exp.vmica.d4': 'Colaboré en equipos Agile/Scrum, participando en planificación de sprints y retrospectivas para alinear el desarrollo con los objetivos estratégicos del cliente.',

        'exp.retail.role': 'Desarrollador .Net · Analista de Proyectos',
        'exp.retail.date': 'Jun 2011 — Ene 2014',
        'exp.retail.d1': 'Desarrollé y mantuve soluciones de gestión comercial para el sector retail utilizando .NET, FoxPro y MS SQL Server, mejorando la eficiencia operativa de tiendas y cadenas de supermercados.',
        'exp.retail.d2': 'Integré el sistema propietario con pasarelas de pago nacionales (Transbank, Multicaja, S4M), habilitando múltiples medios de pago y reduciendo fricciones en el punto de venta.',
        'exp.retail.d3': 'Implementé y desplegué el sistema en múltiples locales de supermercados a lo largo de Chile, brindando capacitación técnica y soporte durante la puesta en marcha.',
        'exp.retail.d4': 'Integré la emisión de Documentos Tributarios Electrónicos (DTE) en el software propietario con compatibilidad multi-ERP, asegurando cumplimiento tributario según normativa del SII.',
        'exp.retail.d5': 'Desarrollé soluciones móviles e integré hardware especializado (balanzas, colectores de datos, impresoras de etiquetas) para optimizar la operación en sala y bodega.',

        'exp.cst.role': 'Desarrollador .Net',
        'exp.cst.date': 'May 2010 — May 2011',
        'exp.cst.d1': 'Desarrollé aplicaciones móviles de gestión de inventarios con .NET Mobile y SQL Server CE para el sector retail, permitiendo el control en tiempo real del stock en piso de venta.',
        'exp.cst.d2': 'Desplegué e implementé los sistemas en múltiples cadenas de supermercados, gestionando la instalación, configuración y capacitación de usuarios finales.',
        'exp.cst.d3': 'Brindé soporte técnico integral a clientes, logrando altos niveles de satisfacción mediante resolución oportuna de incidencias y acompañamiento post-implementación.',

        // Skills
        'skills.title': 'Skills <span class="accent">Técnicas</span>',
        'skills.databases': 'Bases de Datos',

        // Education
        'edu.title': 'Educación <span class="accent">& Idiomas</span>',
        'edu.degree': 'Técnico en Informática',
        'edu.date': 'Marzo 2005 — Diciembre 2007',
        'edu.languages_title': 'Idiomas',
        'edu.spanish': 'Español',
        'edu.native': 'Nativo',
        'edu.english': 'Inglés',
        'edu.advanced': 'C1 — Avanzado',

        // Certifications
        'certs.title': 'Formación <span class="accent">Adicional</span>',
        'certs.java.date': 'Udemy · Feb — Mar 2025',
        'certs.dataeng.date': 'Udemy · Ene — Feb 2025',
        'certs.nodejs.date': 'Udemy · Feb 2025',
        'certs.spring.date': 'Udemy · Ene 2025',
        'certs.bootstrap.date': 'Udemy · Mar 2025',
        'certs.aspnet.date': 'Udemy · Mar 2025',
        'certs.docker.date': 'Udemy · Mar 2025',
        'certs.oracle.date': 'Udemy · Ene 2025',

        // Skills
        'skills.title': 'Skills <span class="accent">Técnicas</span>',
        'skills.databases': 'Bases de Datos',
        'skills.devops': 'DevOps & QA',
        'skills.aitools': 'AI Tools',

        // References
        'refs.title': 'Referencias <span class="accent">Profesionales</span>',

        // Footer
        'footer.role': 'Desarrollador Full Stack',
        'footer.tagline': 'Construyendo software que importa, una línea a la vez.',
        'footer.nav_title': 'Navegación',
        'footer.contact_title': 'Contacto',
        'footer.open_badge': 'Disponible para nuevos proyectos',
        'footer.rights': '© 2026 Claudio Meneses Donoso. Todos los derechos reservados.',
        'footer.location': 'Ñuñoa, Santiago, Chile',
        'footer.made_with': 'Hecho con ❤️ en Santiago, Chile',
        'footer.source_code': '🔗 Ver proyecto en',
    },

    en: {
        // Navigation
        'nav.about': 'About',
        'nav.experience': 'Experience',
        'nav.skills': 'Skills',
        'nav.education': 'Education',
        'nav.courses': 'Courses',
        'nav.contact': 'Contact',

        // Hero
        'hero.greeting': 'Hi, I\'m',
        'hero.title': 'Full Stack Developer',
        'hero.live_badge': 'Currently at Sonda · Santiago',
        'hero.contact_btn': 'Contact Me',
        'hero.download_btn': 'Download CV',
        'hero.stat_years': 'Years of Experience',
        'hero.stat_companies': 'Companies',
        'hero.stat_tech': 'Technologies',

        // About
        'about.title': 'About <span class="accent">Me</span>',
        'about.p1': 'Full Stack Developer with over <strong>14 years of professional experience</strong> across industries including <strong>retail, e-commerce, mining, telecommunications, and the public sector</strong>. I specialize in building robust and scalable solutions with a strong commitment to engineering quality and best practices.',
        'about.p2': 'Throughout my career I have led high-complexity projects, championed <strong>continuous improvement</strong>, and empowered development teams through agile methodologies — consistently delivering software that creates real business impact.',
        'about.languages': 'Spanish (Native) · English (C1)',

        // Experience
        'exp.title': 'Professional <span class="accent">Experience</span>',
        'exp.sonda.role': 'Full Stack Developer',
        'exp.sonda.date': 'Dec 2024 — Present',
        'exp.sonda.d1': 'Delivered a responsive tax declaration and management platform for Chile\'s Internal Revenue Service (SII) using Vue.js and Java Spring Boot 3, incorporating complex tax calculation logic with high accuracy and performance.',
        'exp.sonda.d2': 'Engineered the end-to-end annual payment workflow for Sernageomin to the General Treasury of Chile using .NET Core 7, React, and SQL Server 2019, ensuring transactional integrity for a mission-critical government process.',
        'exp.sonda.d3': 'Maintained and optimized an OCDS-compliant public procurement API for ChileCompra, ensuring high availability and standard conformance using .NET Framework 4.8 and SQL Server 2019.',
        'exp.sonda.d4': 'Modernized the corporate website for Ohio National / AuguStar Insurance (US market) with PHP, WordPress, and MySQL, improving UX and content management capabilities.',
        'exp.sonda.d5': 'Led the internal adoption of AI-powered development agents (Cursor, Claude, GitHub Copilot), driving a cultural shift toward AI-assisted engineering that accelerated team delivery cycles.',

        'exp.rda.role': 'QA Analyst / Automation',
        'exp.rda.company': 'RDA Corporation · Remote (US)',
        'exp.rda.date': 'Jan 2023 — Oct 2024',
        'exp.rda.d1': 'Designed and executed comprehensive test suites for SaaS products in the US market, improving quality coverage and identifying critical defects prior to production releases.',
        'exp.rda.d2': 'Performed in-depth UI and REST API testing to validate functionality, data contracts, and performance under high-demand scenarios.',
        'exp.rda.d3': 'Built an end-to-end automation testing framework using Cypress and TypeScript, significantly reducing manual regression time and increasing release reliability.',
        'exp.rda.d4': 'Integrated automated test pipelines into Azure DevOps CI/CD workflows, enabling fast feedback loops and improving the stability of the continuous delivery process.',

        'exp.ab.role': 'Full Stack Developer · Project Analyst',
        'exp.ab.date': 'Nov 2017 — Sep 2022',
        'exp.ab.d1': 'Led technical and functional management of software projects for clients across multiple industries, coordinating development teams, defining scope, and ensuring on-time, high-quality delivery.',
        'exp.ab.d2': 'Developed the sisenior.cl platform end-to-end using PHP, WordPress, and MySQL — from architecture design through production deployment.',
        'exp.ab.d3': 'Designed and implemented a debt collection management system using .NET ASP and SQL Server, automating key billing and recovery workflows for SME clients.',
        'exp.ab.d4': 'Built a custom logistics and distribution system for Minera Las Cenizas using PHP, Laravel, and MySQL, enhancing operational traceability across mining supply chain processes.',

        'exp.vmica.role': 'Full Stack Developer · Project Analyst',
        'exp.vmica.date': 'Feb 2014 — Oct 2017',
        'exp.vmica.d1': 'Acted as lead developer on a proprietary service management system for Entel\'s DTH television division, built in .NET ASP/C# and PL/SQL, handling millions of customer transactions for one of Chile\'s largest telecoms.',
        'exp.vmica.d2': 'Developed and integrated high-availability web services using WebLogic Java for Entel and Claro, ensuring seamless interoperability across telecom platforms.',
        'exp.vmica.d3': 'Implemented automated reporting and bulk data loading services on Unix using Bash scripting, streamlining overnight batch processing critical to business operations.',
        'exp.vmica.d4': 'Collaborated within Agile/Scrum teams, contributing to sprint planning and retrospectives to keep development aligned with evolving client objectives.',

        'exp.retail.role': '.Net Developer · Project Analyst',
        'exp.retail.date': 'Jun 2011 — Jan 2014',
        'exp.retail.d1': 'Developed and maintained commercial management solutions for the retail sector using .NET, FoxPro, and MS SQL Server, improving operational efficiency for store chains and supermarkets.',
        'exp.retail.d2': 'Integrated the proprietary POS system with national payment gateways (Transbank, Multicaja, S4M), enabling multiple payment methods and reducing friction at the point of sale.',
        'exp.retail.d3': 'Deployed and rolled out the system across multiple supermarket locations throughout Chile, delivering on-site technical training and go-live support.',
        'exp.retail.d4': 'Integrated electronic tax document (DTE) issuance into proprietary software with multi-ERP compatibility, ensuring full compliance with Chile\'s Internal Revenue Service (SII) regulations.',
        'exp.retail.d5': 'Developed mobile applications and integrated specialized hardware (scales, data collectors, label printers) to optimize in-store and warehouse operations.',

        'exp.cst.role': '.Net Developer',
        'exp.cst.date': 'May 2010 — May 2011',
        'exp.cst.d1': 'Developed mobile inventory management applications using .NET Mobile and SQL Server CE for the retail sector, enabling real-time stock control directly on the sales floor.',
        'exp.cst.d2': 'Deployed and implemented systems across multiple supermarket chains, managing installation, configuration, and end-user onboarding.',
        'exp.cst.d3': 'Provided comprehensive technical support to clients, achieving high satisfaction levels through timely incident resolution and hands-on post-implementation assistance.',

        // Skills
        'skills.title': 'Technical <span class="accent">Skills</span>',
        'skills.databases': 'Databases',

        // Education
        'edu.title': 'Education <span class="accent">& Languages</span>',
        'edu.degree': 'IT Technician',
        'edu.date': 'March 2005 — December 2007',
        'edu.languages_title': 'Languages',
        'edu.spanish': 'Spanish',
        'edu.native': 'Native',
        'edu.english': 'English',
        'edu.advanced': 'C1 — Advanced',

        // Certifications
        'certs.title': 'Additional <span class="accent">Training</span>',
        'certs.java.date': 'Udemy · Feb — Mar 2025',
        'certs.dataeng.date': 'Udemy · Jan — Feb 2025',
        'certs.nodejs.date': 'Udemy · Feb 2025',
        'certs.spring.date': 'Udemy · Jan 2025',
        'certs.bootstrap.date': 'Udemy · Mar 2025',
        'certs.aspnet.date': 'Udemy · Mar 2025',
        'certs.docker.date': 'Udemy · Mar 2025',
        'certs.oracle.date': 'Udemy · Jan 2025',

        // Skills
        'skills.title': 'Technical <span class="accent">Skills</span>',
        'skills.databases': 'Databases',
        'skills.devops': 'DevOps & QA',
        'skills.aitools': 'AI Tools',

        // References
        'refs.title': 'Professional <span class="accent">References</span>',

        // Footer
        'footer.role': 'Full Stack Developer',
        'footer.tagline': 'Building software that matters, one line at a time.',
        'footer.nav_title': 'Navigation',
        'footer.contact_title': 'Contact',
        'footer.open_badge': 'Available for new projects',
        'footer.rights': '© 2026 Claudio Meneses Donoso. All rights reserved.',
        'footer.location': 'Ñuñoa, Santiago, Chile',
        'footer.made_with': 'Made with ❤️ in Santiago, Chile',
        'footer.source_code': '🔗 See project on',
    }
};

const CV_URLS = {
    es: 'https://rxresu.me/cmenesesd/claudio-meneses-esp',
    en: 'https://rxresu.me/cmenesesd/claudio-meneses-eng'
};

let currentLang = 'es';

function setLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];

    // Update text-only elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) {
            el.textContent = t[key];
        }
    });

    // Update elements with HTML content (spans, strong, etc.)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        if (t[key] !== undefined) {
            el.innerHTML = t[key];
        }
    });

    // Update CV download link
    const downloadCV = document.getElementById('downloadCV');
    if (downloadCV) {
        downloadCV.href = CV_URLS[lang];
    }

    // Update html lang attribute
    document.documentElement.lang = lang;

    // Update toggle button active state
    document.querySelectorAll('.lang-option').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.lang === lang);
    });

    // Store preference
    localStorage.setItem('preferred-lang', lang);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('preferred-lang');
    if (saved && translations[saved]) {
        setLanguage(saved);
    }

    // Language toggle click handler
    document.querySelectorAll('.lang-option').forEach(opt => {
        opt.addEventListener('click', () => {
            setLanguage(opt.dataset.lang);
        });
    });
});
