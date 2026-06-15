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
    // 1. SCROLL PROGRESS BAR
    // ================================================
    const scrollProgress = document.getElementById('scrollProgress');
    window.addEventListener('scroll', () => {
        const total = document.body.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / total) * 100;
        if (scrollProgress) scrollProgress.style.width = progress + '%';
    }, { passive: true });


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
        window.addEventListener('resize', resizeCanvas, { passive: true });

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
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < maxDist) {
                        const alpha = (1 - dist / maxDist) * 0.3;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(${particleRGB}, ${alpha})`;
                        ctx.lineWidth = 0.5;
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

        window.addEventListener('resize', initParticles, { passive: true });
    }


    // ================================================
    // 3. TYPING ANIMATION (Hero Title)
    // ================================================
    const typingEl = document.getElementById('typingText');
    if (typingEl && !prefersReducedMotion) {
        const phrases = [
            'Full Stack Developer',
            'Desarrollador Full Stack',
            'Backend Engineer',
            'Frontend Engineer',
            'QA / Automation',
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingTimer;

        function type() {
            const current = phrases[phraseIndex];
            if (isDeleting) {
                typingEl.textContent = current.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingEl.textContent = current.substring(0, charIndex + 1);
                charIndex++;
            }

            let delay = isDeleting ? 60 : 100;

            if (!isDeleting && charIndex === current.length) {
                delay = 2200;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                delay = 400;
            }
            typingTimer = setTimeout(type, delay);
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
    let ringX = 0, ringY = 0, dotX = 0, dotY = 0;
    let ringActive = false;

    if (cursorDot && cursorRing && !prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
        document.body.classList.add('custom-cursor');

        document.addEventListener('mousemove', (e) => {
            dotX = e.clientX;
            dotY = e.clientY;
            cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
        }, { passive: true });

        function animateRing() {
            ringX += (dotX - ringX) * 0.22;
            ringY += (dotY - ringY) * 0.22;
            cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
            requestAnimationFrame(animateRing);
        }
        animateRing();

        document.querySelectorAll('a, button, .cert-card, .skill-category, .timeline-content').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorRing.classList.add('expanded');
                cursorDot.classList.add('hidden');
            });
            el.addEventListener('mouseleave', () => {
                cursorRing.classList.remove('expanded');
                cursorDot.classList.remove('hidden');
            });
        });

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
    // 6. SCROLL REVEAL ANIMATION
    // ================================================
    const revealElements = document.querySelectorAll('.reveal');

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
    // 7. NAVBAR SCROLL BEHAVIOR
    // ================================================
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    }, { passive: true });


    // ================================================
    // 8. MOBILE NAV TOGGLE
    // ================================================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    function setMenuOpen(open) {
        navToggle.classList.toggle('active', open);
        navMenu.classList.toggle('active', open);
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-controls', 'navMenu');

    navToggle.addEventListener('click', () => {
        setMenuOpen(!navMenu.classList.contains('active'));
    });

    document.querySelectorAll('.nav-link').forEach(link => {
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
    // 9. SMOOTH SCROLL
    // ================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        });
    });


    // ================================================
    // 10. ACTIVE NAV LINK ON SCROLL
    // ================================================
    const sections = document.querySelectorAll('section[id]');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) link.classList.add('active');
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: `-${getComputedStyle(document.documentElement).getPropertyValue('--nav-height')} 0px -50% 0px`
    });

    sections.forEach(section => sectionObserver.observe(section));


    // ================================================
    // 11. ANIMATE LANGUAGE BARS
    // ================================================
    const languageFills = document.querySelectorAll('.language-fill');

    const langObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => { entry.target.style.width = width; });
                });
                langObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    languageFills.forEach(fill => langObserver.observe(fill));


    // ================================================
    // 12. PARALLAX HERO ORBS (Mouse)
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
    // 13. TILT EFFECT ON CARDS
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
    // 14. MAGNETIC BUTTONS
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
    // 15. SKILL BAR ANIMATIONS
    // ================================================
    const skillBars = document.querySelectorAll('.skill-bar-fill');

    const skillBarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                setTimeout(() => {
                    entry.target.style.width = width + '%';
                }, 200);
                skillBarObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => skillBarObserver.observe(bar));


    // ================================================
    // 16. THEME TOGGLE (Light / Dark)
    // ================================================
    const themeToggle = document.getElementById('themeToggle');
    const root = document.documentElement;

    function setTheme(theme) {
        root.setAttribute('data-theme', theme);
        localStorage.setItem('preferred-theme', theme);
    }

    const savedTheme = localStorage.getItem('preferred-theme');
    if (savedTheme) setTheme(savedTheme);
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) setTheme('light');

    themeToggle.addEventListener('click', () => {
        const current = root.getAttribute('data-theme');
        setTheme(current === 'light' ? 'dark' : 'light');
    });

    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
        if (!localStorage.getItem('preferred-theme')) setTheme(e.matches ? 'light' : 'dark');
    });

    // ================================================
    // 17. PDF CV DOWNLOAD
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
            v: parseInt(it.querySelector('.skill-bar-fill').getAttribute('data-width'), 10) || 0
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
            pct:      parseFloat(li.querySelector('.language-fill').style.width) || 0
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
    const lang   = currentLang;
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

    function skillBar(name, pct) {
        const fw = +(pct * 0.62).toFixed(1);
        const ew = +((100 - pct) * 0.62).toFixed(1);
        return {
            columns: [
                { text: name, width: 108, fontSize: 8, color: BODY },
                { text: pct + '%', width: 26, fontSize: 8, color: ACCENT, bold: true, alignment: 'right' },
                { canvas: [
                    { type: 'rect', x: 0, y: 4, w: Math.max(fw, 1), h: 5, r: 2, color: ACCENT },
                    { type: 'rect', x: fw + 1, y: 4, w: Math.max(ew, 1), h: 5, r: 2, color: LGRAY }
                ], width: 68 }
            ],
            margin: [0, 2, 0, 2]
        };
    }

    function langBar(label, sublabel, pct) {
        const fw = +(pct * 0.95).toFixed(1);
        const ew = +((100 - pct) * 0.95).toFixed(1);
        return {
            columns: [
                { text: label, width: 52, fontSize: 8, color: BODY },
                { text: sublabel, width: 72, fontSize: 8, color: MUTED },
                { canvas: [
                    { type: 'rect', x: 0, y: 4, w: Math.max(fw, 1), h: 5, r: 2, color: ACCENT },
                    { type: 'rect', x: fw + 1, y: 4, w: Math.max(ew, 0.5), h: 5, r: 2, color: LGRAY }
                ], width: 98 }
            ],
            margin: [0, 2, 0, 2]
        };
    }

    // --- Header (name/contact are static; the role tracks the current position) ---
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
                { text: 'Nuñoa, Santiago, Chile', color: BODY }
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
                    { text: (lang === 'es' ? 'Educación' : 'Education').toUpperCase(), bold: true, fontSize: 9, color: DARK, margin: [0, 0, 0, 4] },
                    { text: edu.degree, bold: true, fontSize: 9, color: DARK },
                    { text: edu.school, fontSize: 8.5, color: BODY },
                    { text: edu.date, fontSize: 8, color: MUTED, margin: [0, 1, 0, 0] }
                ]
            },
            {
                width: '50%',
                stack: [
                    { text: (lang === 'es' ? 'Idiomas' : 'Languages').toUpperCase(), bold: true, fontSize: 9, color: DARK, margin: [0, 0, 0, 4] },
                    ...edu.languages.map(l => langBar(l.label, l.sublabel, l.pct))
                ]
            }
        ],
        columnGap: 20,
        margin: [0, 0, 0, 6]
    };

    // --- Certifications ---
    const certHeader = [
        { text: lang === 'es' ? 'Curso' : 'Course', bold: true, fontSize: 8.5, fillColor: '#ede9ff', color: DARK },
        { text: lang === 'es' ? 'Horas' : 'Hours', bold: true, fontSize: 8.5, fillColor: '#ede9ff', color: DARK, alignment: 'center' },
        { text: lang === 'es' ? 'Institución / Fecha' : 'Institution / Date', bold: true, fontSize: 8.5, fillColor: '#ede9ff', color: DARK }
    ];
    const certRows = certs.map((cert, i) => [
        { text: cert.name, fontSize: 8, color: BODY, fillColor: i % 2 === 0 ? '#ffffff' : ROALT },
        { text: cert.hours, fontSize: 8, color: ACCENT, alignment: 'center', fillColor: i % 2 === 0 ? '#ffffff' : ROALT },
        { text: cert.date, fontSize: 8, color: MUTED, fillColor: i % 2 === 0 ? '#ffffff' : ROALT }
    ]);
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
        if (span) span.textContent = currentLang === 'es' ? 'Generando PDF...' : 'Generating PDF...';
        try {
            await loadPdfMake();
            const doc = buildCvDoc();
            const fname = currentLang === 'es' ? 'Claudio-Meneses-CV-ES.pdf' : 'Claudio-Meneses-CV-EN.pdf';
            pdfMake.createPdf(doc).download(fname);
        } catch (err) {
            console.error('PDF generation error:', err);
            window.open(CV_URLS[currentLang], '_blank');
        } finally {
            delete btn.dataset.generating;
            if (span) span.textContent = originalText;
        }
    });
}
