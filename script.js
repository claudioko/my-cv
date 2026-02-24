/* ===========================
   Main JavaScript — Creative Enhanced
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

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
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animFrame;
        const mouse = { x: null, y: null, radius: 120 };

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
                ctx.fillStyle = `rgba(108, 99, 255, ${this.opacity})`;
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
                        ctx.strokeStyle = `rgba(108, 99, 255, ${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            connectParticles();
            animFrame = requestAnimationFrame(animateParticles);
        }
        animateParticles();
        window.addEventListener('resize', initParticles, { passive: true });
    }


    // ================================================
    // 3. TYPING ANIMATION (Hero Title)
    // ================================================
    const typingEl = document.getElementById('typingText');
    if (typingEl) {
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

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));


    // ================================================
    // 5. CUSTOM CURSOR
    // ================================================
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    let ringX = 0, ringY = 0, dotX = 0, dotY = 0;
    let ringActive = false;

    if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
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

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });


    // ================================================
    // 9. SMOOTH SCROLL
    // ================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
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

    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        orbs.forEach((orb, i) => {
            const speed = (i + 1) * 12;
            orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    }, { passive: true });


    // ================================================
    // 13. TILT EFFECT ON CARDS
    // ================================================
    const tiltCards = document.querySelectorAll('.skill-category, .cert-card, .education-card, .reference-card');

    tiltCards.forEach(card => {
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

    magneticBtns.forEach(btn => {
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

});
