# 👨‍💻 Claudio Meneses Donoso — CV Web

> Personal CV website built with vanilla HTML, CSS and JavaScript. Features modern design with dark/light mode, bilingual support (ES/EN), interactive animations, and client-side PDF generation.

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
- 📄 **PDF CV download** — generates a professional, ATS-friendly PDF on the fly via pdfmake (vector text, selectable, bilingual)
- 📱 **Fully responsive** — mobile-first, hamburger nav from 768px
- ♿ **Accessible** — semantic HTML5, ARIA labels, keyboard navigation

---

## 🗂️ Project Structure

```
my-cv/
├── index.html      # Main HTML — all sections and content
├── styles.css      # All styles & responsive media queries
├── script.js       # Animations, interactions, PDF generation
└── i18n.js         # Translation strings (ES / EN) + CV_URLS
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
| PDF generation | [pdfmake](https://pdfmake.github.io/docs/) 0.2.10 (lazy-loaded via jsDelivr CDN) |
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
