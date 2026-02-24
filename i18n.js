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
        'about.p1': 'Con más de <strong>14 años de experiencia</strong> en desarrollo de software en diversas industrias como <strong>retail, comercio electrónico, minería y televisión</strong>, aporto un fuerte enfoque en la calidad, las mejores prácticas y la innovación.',
        'about.p2': 'Destaco en impulsar la <strong>mejora continua</strong>, promover el trabajo en equipo eficiente y fomentar un ambiente laboral positivo y colaborativo para entregar soluciones impactantes.',
        'about.languages': 'Español (Nativo) · Inglés (C1)',

        // Experience
        'exp.title': 'Experiencia <span class="accent">Profesional</span>',
        'exp.sonda.role': 'Desarrollador Full Stack',
        'exp.sonda.date': 'Dic 2024 — Presente',
        'exp.sonda.d1': 'Creación de web responsiva para declaración y gestión de impuestos para el SII, con Vue.js y Java Spring Boot 3, implementando cálculos tributarios complejos.',
        'exp.sonda.d2': 'Desarrollo del proceso de pago anual a la Tesorería General de la República para Sernageomin, usando .NET Core 7, React y SQL Server 2019.',
        'exp.sonda.d3': 'Mantenimiento de API basada en OCDS para ChileCompra (.NET Framework 4.8 y SQL Server 2019).',
        'exp.sonda.d4': 'Modernización del sitio web de Ohio National / AuguStar Seguros con PHP, WordPress y MySQL.',

        'exp.rda.role': 'Analista QA / Automatización',
        'exp.rda.date': 'Ene 2023 — Oct 2024',
        'exp.rda.d1': 'Diseño y ejecución de casos de prueba completos para garantizar calidad y fiabilidad del software.',
        'exp.rda.d2': 'Pruebas exhaustivas de UI y API para validar funcionalidad y rendimiento.',
        'exp.rda.d3': 'Scripts de automatización robustos con Cypress y TypeScript.',
        'exp.rda.d4': 'Implementación de pipelines CI/CD con Azure DevOps.',

        'exp.ab.role': 'Desarrollador Full Stack · Analista de Proyectos',
        'exp.ab.date': 'Nov 2017 — Dic 2021',
        'exp.ab.d1': 'Líder de proyectos con gestión y entrega de soluciones complejas.',
        'exp.ab.d2': 'Desarrollo completo de sisenior.cl con PHP, WordPress y MySQL.',
        'exp.ab.d3': 'Proyecto de software de cobranzas con .NET ASP y SQL Server.',
        'exp.ab.d4': 'Sistema de distribución personalizado para Minera Las Cenizas con PHP, Laravel y MySQL.',

        'exp.vmica.role': 'Desarrollador Full Stack · Analista de Proyectos',
        'exp.vmica.date': 'Feb 2014 — Oct 2017',
        'exp.vmica.d1': 'Desarrollador líder en solución propietaria en .NET ASP/C# y PL/SQL para la división DTH de Entel.',
        'exp.vmica.d2': 'Servicios web con WebLogic Java para Entel y Claro.',
        'exp.vmica.d3': 'Servicios de informes y carga de datos en Unix con scripts Bash.',
        'exp.vmica.d4': 'Equipos Agile/Scrum entregando soluciones alineadas con objetivos del cliente.',

        'exp.retail.role': 'Desarrollador .Net · Analista de Proyectos',
        'exp.retail.date': 'Jun 2011 — Ene 2014',
        'exp.retail.d1': 'Soluciones retail con .NET, FoxPro y MS SQL Server.',
        'exp.retail.d2': 'Integraciones con plataformas de pago: Transbank, Multicaja y S4M.',
        'exp.retail.d3': 'Implementación de sistemas retail en múltiples supermercados.',
        'exp.retail.d4': 'Integración de DTE en software propietario, compatible con diversos ERP.',
        'exp.retail.d5': 'Soluciones móviles e integración de hardware (balanzas, colectores de datos, impresoras).',

        'exp.cst.role': 'Desarrollador .Net',
        'exp.cst.date': 'May 2010 — May 2011',
        'exp.cst.d1': 'Soluciones retail con .NET Mobile y SQL Server CE, incluyendo apps móviles para gestión de inventarios.',
        'exp.cst.d2': 'Implementación de sistemas en múltiples cadenas de supermercados.',
        'exp.cst.d3': 'Soporte integral al cliente garantizando alta satisfacción.',

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

        // References
        'refs.title': 'Referencias <span class="accent">Profesionales</span>',

        // Footer
        'footer.role': 'Desarrollador Full Stack',
        'footer.rights': '© 2025 Claudio Meneses Donoso. Todos los derechos reservados.',
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
        'about.p1': 'With over <strong>14 years of experience</strong> in software development across diverse industries such as <strong>retail, e-commerce, mining, and television</strong>, I bring a strong focus on quality, best practices, and innovation.',
        'about.p2': 'I excel at driving <strong>continuous improvement</strong>, promoting efficient teamwork, and fostering a positive and collaborative work environment to deliver impactful solutions.',
        'about.languages': 'Spanish (Native) · English (C1)',

        // Experience
        'exp.title': 'Professional <span class="accent">Experience</span>',
        'exp.sonda.role': 'Full Stack Developer',
        'exp.sonda.date': 'Dec 2024 — Present',
        'exp.sonda.d1': 'Built responsive web application for tax declaration and management for Chile\'s Internal Revenue Service (SII), using Vue.js and Java Spring Boot 3, implementing complex tax calculations.',
        'exp.sonda.d2': 'Developed the annual payment process for the General Treasury of the Republic for Sernageomin, using .NET Core 7, React, and SQL Server 2019.',
        'exp.sonda.d3': 'Maintained OCDS-based API for ChileCompra (.NET Framework 4.8 and SQL Server 2019).',
        'exp.sonda.d4': 'Modernized the Ohio National / AuguStar Insurance website using PHP, WordPress, and MySQL.',

        'exp.rda.role': 'QA Analyst / Automation',
        'exp.rda.date': 'Jan 2023 — Oct 2024',
        'exp.rda.d1': 'Designed and executed comprehensive test cases to ensure software quality and reliability.',
        'exp.rda.d2': 'Thorough UI and API testing to validate functionality and performance.',
        'exp.rda.d3': 'Built robust automation scripts using Cypress and TypeScript.',
        'exp.rda.d4': 'Implemented CI/CD pipelines using Azure DevOps.',

        'exp.ab.role': 'Full Stack Developer · Project Analyst',
        'exp.ab.date': 'Nov 2017 — Dec 2021',
        'exp.ab.d1': 'Project leader with experience in managing and delivering complex solutions.',
        'exp.ab.d2': 'Complete development of sisenior.cl using PHP, WordPress, and MySQL.',
        'exp.ab.d3': 'Collections software project using .NET ASP and SQL Server.',
        'exp.ab.d4': 'Custom distribution system for Minera Las Cenizas using PHP, Laravel, and MySQL.',

        'exp.vmica.role': 'Full Stack Developer · Project Analyst',
        'exp.vmica.date': 'Feb 2014 — Oct 2017',
        'exp.vmica.d1': 'Lead developer on proprietary solution in .NET ASP/C# and PL/SQL for Entel\'s DTH television division.',
        'exp.vmica.d2': 'Web services using WebLogic Java for Entel and Claro.',
        'exp.vmica.d3': 'Reporting and data loading services on Unix using Bash scripts.',
        'exp.vmica.d4': 'Agile/Scrum teams delivering innovative solutions aligned with client goals.',

        'exp.retail.role': '.Net Developer · Project Analyst',
        'exp.retail.date': 'Jun 2011 — Jan 2014',
        'exp.retail.d1': 'Retail solutions using .NET, FoxPro, and MS SQL Server.',
        'exp.retail.d2': 'Integrations with payment platforms: Transbank, Multicaja, and S4M.',
        'exp.retail.d3': 'Deployment of retail systems across multiple supermarkets.',
        'exp.retail.d4': 'Integration of electronic tax documents (DTE) in proprietary software, compatible with various ERPs.',
        'exp.retail.d5': 'Mobile solutions and hardware integration (scales, data collectors, label printers).',

        'exp.cst.role': '.Net Developer',
        'exp.cst.date': 'May 2010 — May 2011',
        'exp.cst.d1': 'Retail solutions using .NET Mobile and SQL Server CE, including mobile apps for inventory management.',
        'exp.cst.d2': 'System deployment across multiple supermarket chains.',
        'exp.cst.d3': 'Comprehensive client support ensuring high satisfaction.',

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

        // References
        'refs.title': 'Professional <span class="accent">References</span>',

        // Footer
        'footer.role': 'Full Stack Developer',
        'footer.rights': '© 2025 Claudio Meneses Donoso. All rights reserved.',
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
