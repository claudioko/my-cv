/* ===========================
   Main JavaScript — Creative Enhanced
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

    // Respect users who prefer reduced motion (accessibility / battery)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Activate the web fonts, loaded non-render-blocking via media="print"
    const googleFonts = document.getElementById('googleFonts');
    if (googleFonts) googleFonts.media = 'all';

    // ================================================
    // 1. SCROLL PROGRESS BAR + NAVBAR STATE
    // ================================================
    const scrollProgress = document.getElementById('scrollProgress');
    const navbar = document.getElementById('navbar');
    function onScroll() {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollProgress) scrollProgress.style.width = (total > 0 ? window.scrollY / total * 100 : 0) + '%';
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();


    // ================================================
    // 2. PARTICLE CANVAS BACKGROUND (Hero)
    // ================================================
    const canvas = document.getElementById('particleCanvas');
    if (canvas && !prefersReducedMotion) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animFrame;
        const mouse = { x: null, y: null, radius: 120 };
        // Read accent color from CSS so the canvas matches the active theme
        const particleRGB = getComputedStyle(document.documentElement)
            .getPropertyValue('--accent-rgb').trim() || '108, 99, 255';

        function resizeCanvas() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
        resizeCanvas();

        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        }, { passive: true });
        canvas.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

        class Particle {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.baseX = this.x;
                this.baseY = this.y;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.2;
            }
            update() {
                if (mouse.x !== null) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouse.radius) {
                        const force = (mouse.radius - dist) / mouse.radius;
                        this.x += (dx / dist) * force * 3;
                        this.y += (dy / dist) * force * 3;
                    } else {
                        this.x += (this.baseX - this.x) * 0.05 + this.vx;
                        this.y += (this.baseY - this.y) * 0.05 + this.vy;
                    }
                } else {
                    this.x += this.vx;
                    this.y += this.vy;
                    this.baseX += this.vx;
                    this.baseY += this.vy;
                }
                if (this.x < 0 || this.x > canvas.width) { this.vx *= -1; this.baseX = this.x; }
                if (this.y < 0 || this.y > canvas.height) { this.vy *= -1; this.baseY = this.y; }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${particleRGB}, ${this.opacity})`;
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            const count = Math.min(120, Math.floor((canvas.width * canvas.height) / 8000));
            for (let i = 0; i < count; i++) particles.push(new Particle());
        }
        initParticles();

        function connectParticles() {
            const maxDist = 120;
            ctx.lineWidth = 0.5;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distSq = dx * dx + dy * dy;
                    if (distSq < maxDist * maxDist) {
                        const alpha = (1 - Math.sqrt(distSq) / maxDist) * 0.3;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(${particleRGB}, ${alpha})`;
                        ctx.stroke();
                    }
                }
            }
        }

        let running = false;
        function animateParticles() {
            if (!running) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            connectParticles();
            animFrame = requestAnimationFrame(animateParticles);
        }
        function startParticles() {
            if (running) return;
            running = true;
            animFrame = requestAnimationFrame(animateParticles);
        }
        function stopParticles() {
            running = false;
            if (animFrame) cancelAnimationFrame(animFrame);
        }

        // Only animate while the hero canvas is visible and the tab is focused
        let canvasInView = false;
        function syncParticles() {
            if (canvasInView && !document.hidden) startParticles();
            else stopParticles();
        }
        new IntersectionObserver((entries) => {
            canvasInView = entries[0].isIntersecting;
            syncParticles();
        }, { threshold: 0 }).observe(canvas);
        document.addEventListener('visibilitychange', syncParticles);
        syncParticles();

        window.addEventListener('resize', () => { resizeCanvas(); initParticles(); }, { passive: true });
    }


    // ================================================
    // 3. TYPING ANIMATION (Hero Title)
    // ================================================
    const typingEl = document.getElementById('typingText');
    if (typingEl && !prefersReducedMotion) {
        // The first phrase is the translated title, so it follows the language toggle
        const phrases = () => [
            translations[currentLang]['hero.title'],
            'Backend Engineer',
            'Frontend Engineer',
            'QA / Automation',
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const list = phrases();
            const current = list[phraseIndex];
            if (isDeleting) {
                typingEl.textContent = current.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingEl.textContent = current.substring(0, charIndex + 1);
                charIndex++;
            }

            let delay = isDeleting ? 60 : 100;

            // >= because a language switch can shorten the phrase mid-typing
            if (!isDeleting && charIndex >= current.length) {
                charIndex = current.length;
                delay = 2200;
                isDeleting = true;
            } else if (isDeleting && charIndex <= 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % list.length;
                delay = 400;
            }
            setTimeout(type, delay);
        }
        setTimeout(type, 1000);
    }


    // ================================================
    // 4. ANIMATED COUNTERS (Stat Cards)
    // ================================================
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1800;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            const current = Math.floor(eased * target);
            el.textContent = current + suffix;
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    if (prefersReducedMotion) {
        // Show final values instantly — no count-up animation
        statNumbers.forEach(el => {
            el.textContent = el.getAttribute('data-target') + (el.getAttribute('data-suffix') || '');
        });
    } else {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(el => counterObserver.observe(el));
    }


    // ================================================
    // 5. CUSTOM CURSOR
    // ================================================
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');

    if (cursorDot && cursorRing && !prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
        document.body.classList.add('custom-cursor');
        let ringX = 0, ringY = 0, dotX = 0, dotY = 0;
        let ringFrame = null;

        // The ring eases towards the dot; the loop stops once it has caught up
        function animateRing() {
            ringX += (dotX - ringX) * 0.22;
            ringY += (dotY - ringY) * 0.22;
            cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
            ringFrame = Math.abs(dotX - ringX) + Math.abs(dotY - ringY) > 0.5
                ? requestAnimationFrame(animateRing) : null;
        }

        document.addEventListener('mousemove', (e) => {
            dotX = e.clientX;
            dotY = e.clientY;
            cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
            if (!ringFrame) ringFrame = requestAnimationFrame(animateRing);
        }, { passive: true });

        const hoverTargets = 'a, button, .cert-card, .skill-category, .timeline-content';
        document.addEventListener('mouseover', (e) => {
            const hovering = !!e.target.closest(hoverTargets);
            cursorRing.classList.toggle('expanded', hovering);
            cursorDot.classList.toggle('hidden', hovering);
        }, { passive: true });

        document.addEventListener('mouseleave', () => {
            cursorDot.style.opacity = '0';
            cursorRing.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            cursorDot.style.opacity = '1';
            cursorRing.style.opacity = '1';
        });
    }


    // ================================================
    // 6. SCROLL REVEAL ANIMATION (+ skill / language bars)
    // ================================================
    // Bars grow to --w once they get the .visible class (see styles.css)
    document.querySelectorAll('[data-width]').forEach(bar => {
        bar.style.setProperty('--w', bar.dataset.width + '%');
    });

    const revealElements = document.querySelectorAll('.reveal, [data-width]');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // ================================================
    // 7. MOBILE NAV TOGGLE
    // ================================================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    function setMenuOpen(open) {
        navToggle.classList.toggle('active', open);
        navMenu.classList.toggle('active', open);
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    navToggle.addEventListener('click', () => {
        setMenuOpen(!navMenu.classList.contains('active'));
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => setMenuOpen(false));
    });

    // Close the mobile menu on Escape (restoring focus) or an outside click
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            setMenuOpen(false);
            navToggle.focus();
        }
    });
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            setMenuOpen(false);
        }
    });


    // ================================================
    // 8. ACTIVE NAV LINK ON SCROLL
    // ================================================
    const sections = document.querySelectorAll('section[id]');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const href = `#${entry.target.id}`;
                navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === href));
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: `-${getComputedStyle(document.documentElement).getPropertyValue('--nav-height')} 0px -50% 0px`
    });

    sections.forEach(section => sectionObserver.observe(section));


    // ================================================
    // 9. PARALLAX HERO ORBS (Mouse)
    // ================================================
    const orbs = document.querySelectorAll('.hero-orb');

    if (!prefersReducedMotion) {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            orbs.forEach((orb, i) => {
                const speed = (i + 1) * 12;
                orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        }, { passive: true });
    }


    // ================================================
    // 10. TILT EFFECT ON CARDS
    // ================================================
    const tiltCards = document.querySelectorAll('.skill-category, .cert-card, .education-card, .reference-card');

    if (!prefersReducedMotion) tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const rotX = ((e.clientY - cy) / (rect.height / 2)) * -6;
            const rotY = ((e.clientX - cx) / (rect.width / 2)) * 6;
            card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(8px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });


    // ================================================
    // 11. MAGNETIC BUTTONS
    // ================================================
    const magneticBtns = document.querySelectorAll('.btn');

    if (!prefersReducedMotion) magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (e.clientX - cx) * 0.3;
            const dy = (e.clientY - cy) * 0.3;
            btn.style.transform = `translate(${dx}px, ${dy}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });


    // ================================================
    // 12. THEME TOGGLE (Light / Dark)
    // ================================================
    const themeToggle = document.getElementById('themeToggle');
    const root = document.documentElement;
    const lightQuery = window.matchMedia('(prefers-color-scheme: light)');

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
    }

    applyTheme(localStorage.getItem('preferred-theme') || (lightQuery.matches ? 'light' : 'dark'));

    themeToggle.addEventListener('click', () => {
        const theme = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        applyTheme(theme);
        localStorage.setItem('preferred-theme', theme);
    });

    lightQuery.addEventListener('change', (e) => {
        if (!localStorage.getItem('preferred-theme')) applyTheme(e.matches ? 'light' : 'dark');
    });

    // ================================================
    // 13. PDF CV DOWNLOAD
    // ================================================
    initPdfDownload();

});


/* ===========================
   PDF CV Generation (pdfmake)
   =========================== */

/* DOM readers — the rendered page is the single source of truth, so the PDF
   can never drift from it and always matches the displayed language. */

function pdfText(el) {
    return el ? el.textContent.replace(/\s+/g, ' ').trim() : '';
}

function readExperience() {
    return [...document.querySelectorAll('#experience .timeline-item')].map(item => ({
        companyLine: pdfText(item.querySelector('.timeline-company')),
        role:        pdfText(item.querySelector('.timeline-role')),
        date:        pdfText(item.querySelector('.timeline-date')),
        bullets:     [...item.querySelectorAll('.timeline-details li')].map(pdfText),
        tags:        [...item.querySelectorAll('.timeline-tags .tag')].map(pdfText)
    }));
}

function readSkillGroups() {
    return [...document.querySelectorAll('#skills .skill-category')].map(cat => ({
        title: pdfText(cat.querySelector('.skill-category-header h3')),
        items: [...cat.querySelectorAll('.skill-item')].map(it => ({
            n: pdfText(it.querySelector('.skill-name')),
            v: parseInt(it.querySelector('.skill-bar-fill').dataset.width, 10) || 0
        }))
    }));
}

function readEducation() {
    const cards = [...document.querySelectorAll('#education .education-card')];
    const degreeCard = cards.find(c => c.querySelector('.education-school'));
    return {
        degree: pdfText(degreeCard && degreeCard.querySelector('h3')),
        school: pdfText(degreeCard && degreeCard.querySelector('.education-school')),
        date:   pdfText(degreeCard && degreeCard.querySelector('.education-date')),
        languages: [...document.querySelectorAll('#education .language-item')].map(li => ({
            label:    pdfText(li.querySelector('.language-info span')),
            sublabel: pdfText(li.querySelector('.language-level')),
            pct:      parseInt(li.querySelector('.language-fill').dataset.width, 10) || 0
        }))
    };
}

function readCerts() {
    return [...document.querySelectorAll('#certifications .cert-card')].map(card => {
        const name = pdfText(card.querySelector('h3'));
        const subtitle = pdfText(card.querySelector('p:not([data-i18n])'));
        return {
            name:  subtitle ? `${name} (${subtitle})` : name,
            hours: pdfText(card.querySelector('.cert-hours')),
            date:  pdfText(card.querySelector('p[data-i18n]'))
        };
    });
}

function readReferences() {
    return [...document.querySelectorAll('#references .reference-card')].map(card => ({
        name:    pdfText(card.querySelector('h3')),
        company: pdfText(card.querySelector('.reference-company')),
        email:   pdfText(card.querySelector('.reference-contact a'))
    }));
}

function loadPdfMake() {
    if (window.pdfMake) return Promise.resolve();
    return new Promise((resolve, reject) => {
        const s1 = document.createElement('script');
        s1.src = 'https://cdn.jsdelivr.net/npm/pdfmake@0.2.10/build/pdfmake.min.js';
        s1.integrity = 'sha384-vseuUuO/VRMn00lXYd5m/Pk4l/7RjMqhXGf6G0RALy+On0txYb39dQsUQDAd7q5L';
        s1.crossOrigin = 'anonymous';
        s1.onload = () => {
            const s2 = document.createElement('script');
            s2.src = 'https://cdn.jsdelivr.net/npm/pdfmake@0.2.10/build/vfs_fonts.js';
            s2.integrity = 'sha384-zmD5tDN2awbMigS/yVcxHObSsdXXKh/27Y/bSII38WfNl+D7O/aVCIteAXsLY3p3';
            s2.crossOrigin = 'anonymous';
            s2.onload = resolve;
            s2.onerror = reject;
            document.head.appendChild(s2);
        };
        s1.onerror = reject;
        document.head.appendChild(s1);
    });
}

function buildCvDoc() {
    const t      = translations[currentLang];
    const ACCENT = '#6c63ff';
    const DARK   = '#1a1a2e';
    const BODY   = '#333333';
    const MUTED  = '#555555';
    const LGRAY  = '#e0e0e0';
    const ROALT  = '#f5f5ff';

    const exp         = readExperience();
    const skillGroups = readSkillGroups();
    const edu         = readEducation();
    const certs       = readCerts();
    const refs        = readReferences();

    function sectionTitleText(id) {
        return pdfText(document.querySelector(`#${id} .section-title`));
    }

    function sectionTitle(text) {
        return { text: text.toUpperCase(), fontSize: 10, bold: true, color: ACCENT, margin: [0, 14, 0, 5] };
    }

    function hrLine() {
        return { canvas: [{ type: 'rect', x: 0, y: 0, w: 515, h: 0.5, color: LGRAY }], margin: [0, 0, 0, 8] };
    }

    // Text columns followed by a filled / empty bar `len` points long
    function barRow(cols, pct, len, width) {
        const fw = +(pct * len / 100).toFixed(1);
        const ew = +(len - fw).toFixed(1);
        const rects = [{ type: 'rect', x: 0, y: 4, w: Math.max(fw, 1), h: 5, r: 2, color: ACCENT }];
        if (ew > 0) rects.push({ type: 'rect', x: fw + 1, y: 4, w: Math.max(ew, 0.5), h: 5, r: 2, color: LGRAY });
        return { columns: [...cols, { canvas: rects, width }], margin: [0, 2, 0, 2] };
    }

    function skillBar(name, pct) {
        return barRow([
            { text: name, width: 108, fontSize: 8, color: BODY },
            { text: pct + '%', width: 26, fontSize: 8, color: ACCENT, bold: true, alignment: 'right' }
        ], pct, 62, 68);
    }

    function langBar(label, sublabel, pct) {
        return barRow([
            { text: label, width: 52, fontSize: 8, color: BODY },
            { text: sublabel, width: 72, fontSize: 8, color: MUTED }
        ], pct, 95, 98);
    }

    // --- Header (name/links are static; role and location come from the page) ---
    const headerBlock = [
        { text: 'Claudio Meneses Donoso', fontSize: 22, bold: true, color: ACCENT },
        { text: exp.length ? exp[0].role : '', fontSize: 12, color: ACCENT, margin: [0, 3, 0, 0] },
        { canvas: [{ type: 'rect', x: 0, y: 0, w: 515, h: 2, color: ACCENT }], margin: [0, 8, 0, 6] },
        {
            text: [
                { text: 'cmenesesd@gmail.com', color: ACCENT },
                { text: '   |   ', color: MUTED },
                { text: 'linkedin.com/in/claudio-meneses', color: ACCENT },
                { text: '   |   ', color: MUTED },
                { text: 'github.com/claudioko', color: ACCENT },
                { text: '   |   ', color: MUTED },
                { text: pdfText(document.querySelector('.hero-location')), color: BODY }
            ],
            fontSize: 8.5,
            margin: [0, 0, 0, 4]
        }
    ];

    // --- Experience ---
    const expContent = exp.map(e => {
        const tagParts = [];
        e.tags.forEach((tag, i) => {
            tagParts.push({ text: tag, color: ACCENT, fontSize: 7.5, background: '#ede9ff' });
            if (i < e.tags.length - 1) tagParts.push({ text: '  ', fontSize: 7.5 });
        });
        return {
            stack: [
                {
                    columns: [
                        { text: e.companyLine, bold: true, fontSize: 9.5, color: DARK, width: '*' },
                        { text: e.date, fontSize: 8.5, color: MUTED, alignment: 'right', width: 'auto' }
                    ],
                    margin: [0, 0, 0, 1]
                },
                { text: e.role, italics: true, fontSize: 9, color: MUTED, margin: [0, 0, 0, 3] },
                { ul: e.bullets, fontSize: 8.5, color: BODY, margin: [0, 0, 0, 4] },
                { text: tagParts, margin: [0, 0, 0, 0] }
            ],
            margin: [0, 0, 0, 10]
        };
    });

    // --- Skills (first two groups left, the rest right — mirrors the page layout) ---
    const leftSkills = [];
    const rightSkills = [];
    skillGroups.forEach((g, idx) => {
        const target = idx < 2 ? leftSkills : rightSkills;
        target.push({ text: g.title, bold: true, fontSize: 9, color: DARK, margin: [0, target.length ? 7 : 0, 0, 3] });
        g.items.forEach(s => target.push(skillBar(s.n, s.v)));
    });
    const skillsBlock = {
        columns: [
            { stack: leftSkills, width: '50%' },
            { stack: rightSkills, width: '50%' }
        ],
        columnGap: 20,
        margin: [0, 0, 0, 6]
    };

    // --- Education & Languages ---
    const eduLangBlock = {
        columns: [
            {
                width: '50%',
                stack: [
                    { text: t['nav.education'].toUpperCase(), bold: true, fontSize: 9, color: DARK, margin: [0, 0, 0, 4] },
                    { text: edu.degree, bold: true, fontSize: 9, color: DARK },
                    { text: edu.school, fontSize: 8.5, color: BODY },
                    { text: edu.date, fontSize: 8, color: MUTED, margin: [0, 1, 0, 0] }
                ]
            },
            {
                width: '50%',
                stack: [
                    { text: t['edu.languages_title'].toUpperCase(), bold: true, fontSize: 9, color: DARK, margin: [0, 0, 0, 4] },
                    ...edu.languages.map(l => langBar(l.label, l.sublabel, l.pct))
                ]
            }
        ],
        columnGap: 20,
        margin: [0, 0, 0, 6]
    };

    // --- Certifications ---
    const headCell = { bold: true, fontSize: 8.5, fillColor: '#ede9ff', color: DARK };
    const certHeader = [
        { ...headCell, text: t['pdf.course'] },
        { ...headCell, text: t['pdf.hours'], alignment: 'center' },
        { ...headCell, text: t['pdf.institution'] }
    ];
    const certRows = certs.map((cert, i) => {
        const fillColor = i % 2 === 0 ? '#ffffff' : ROALT;
        return [
            { text: cert.name, fontSize: 8, color: BODY, fillColor },
            { text: cert.hours, fontSize: 8, color: ACCENT, alignment: 'center', fillColor },
            { text: cert.date, fontSize: 8, color: MUTED, fillColor }
        ];
    });
    const certsBlock = {
        table: {
            headerRows: 1,
            widths: ['*', 55, 150],
            body: [certHeader, ...certRows]
        },
        layout: {
            hLineWidth: () => 0.5,
            vLineWidth: () => 0,
            hLineColor: () => '#dddddd'
        },
        margin: [0, 0, 0, 6]
    };

    // --- References ---
    const refsBlock = refs.length ? {
        columns: refs.map(r => ({
            width: '*',
            stack: [
                { text: r.name, bold: true, fontSize: 9, color: DARK },
                { text: r.company, fontSize: 8.5, color: MUTED },
                { text: r.email, fontSize: 8, color: ACCENT }
            ]
        })),
        columnGap: 10
    } : { text: '' };

    return {
        pageSize: 'A4',
        pageMargins: [40, 50, 40, 45],
        defaultStyle: { font: 'Roboto', color: BODY, fontSize: 9 },
        content: [
            ...headerBlock,
            sectionTitle(sectionTitleText('experience')),
            ...expContent,
            sectionTitle(sectionTitleText('skills')),
            skillsBlock,
            hrLine(),
            eduLangBlock,
            sectionTitle(sectionTitleText('certifications')),
            certsBlock,
            sectionTitle(sectionTitleText('references')),
            refsBlock
        ]
    };
}

function initPdfDownload() {
    const btn = document.getElementById('downloadCV');
    if (!btn) return;
    btn.addEventListener('click', async (e) => {
        e.preventDefault();
        const span = btn.querySelector('[data-i18n]');
        const originalText = span ? span.textContent : '';
        if (btn.dataset.generating) return;
        btn.dataset.generating = '1';
        if (span) span.textContent = translations[currentLang]['pdf.generating'];
        try {
            await loadPdfMake();
            pdfMake.createPdf(buildCvDoc()).download(`Claudio-Meneses-CV-${currentLang.toUpperCase()}.pdf`);
        } catch (err) {
            console.error('PDF generation error:', err);
            window.open(CV_URLS[currentLang], '_blank');
        } finally {
            delete btn.dataset.generating;
            if (span) span.textContent = originalText;
        }
    });
}
