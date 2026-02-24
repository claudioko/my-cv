# 👨‍💻 Claudio Meneses Donoso — CV Web

> Personal CV website built with vanilla HTML, CSS and JavaScript. Features modern design with dark/light mode, bilingual support (ES/EN), and interactive animations.

**🔗 Live:** [claudioko.github.io/my-cv](https://claudioko.github.io/my-cv)

---

## ✨ Features

- 🌗 **Dark / Light mode** — auto-detects system preference, toggle in navbar
- 🌐 **Bilingual** — Spanish / English toggle with full i18n support
- 🎨 **Particle canvas background** — interactive mouse-reactive particles in the hero
- ⌨️ **Typing animation** — rotating role titles with cursor animation
- 📊 **Animated counters** — stat numbers count up on scroll
- 📈 **Skill progress bars** — animated on viewport entry
- 🖱️ **Custom cursor** — desktop-only magnetic effect
- 🃏 **Tilt effect on cards** — 3D hover on skill and cert cards
- 📱 **Fully responsive** — mobile-first, hamburger nav from 768px
- ♿ **Accessible** — semantic HTML5, ARIA labels, keyboard navigation

---

## 🗂️ Project Structure

```
my-cv/
├── index.html      # Main HTML — all sections
├── styles.css      # All styles & responsive media queries
├── script.js       # Animations, interactions & behaviour
├── i18n.js         # Translation strings (ES / EN)
└── resume.pdf      # Source resume (not served publicly)
```

---

## 🚀 Running Locally

No build step required. Just open the file:

```bash
# Option 1 — open directly
open index.html

# Option 2 — serve locally (avoids any CORS quirks)
npx serve .
# or
python3 -m http.server 8080
```

---

## 📐 Responsive Breakpoints

| Breakpoint | Width | Behaviour |
|:---|:---|:---|
| Desktop | ≥ 1200px | Full 2-column hero, social sidebar visible |
| Laptop | ≥ 1024px | Single column hero, nav stays horizontal |
| Tablet | ≥ 768px | Hamburger menu, grid adjustments |
| Mobile L | ≥ 480px | Stacked layout, reduced padding |
| Mobile S | ≤ 480px | 2-col stat grid, smaller typography |

---

## 🛠️ Tech Stack

| Layer | Tech |
|:---|:---|
| Markup | HTML5, Semantic elements |
| Styling | Vanilla CSS, CSS custom properties, Flexbox, Grid |
| Scripting | Vanilla JavaScript (ES2020+) |
| Fonts | Inter + Space Grotesk (Google Fonts) |
| Icons | Inline SVG |
| i18n | Custom JS i18n module |

---

## 📬 Contact

- **Email:** cmenesesd@gmail.com
- **LinkedIn:** [linkedin.com/in/claudio-meneses](https://www.linkedin.com/in/claudio-meneses/)
- **GitHub:** [github.com/claudioko](https://github.com/claudioko/)

---

<p align="center">Made with ❤️ and vanilla JS — no frameworks harmed in the making of this site.</p>
