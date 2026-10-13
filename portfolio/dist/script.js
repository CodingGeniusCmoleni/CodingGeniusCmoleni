'use strict';
const projects = {
  palacio: {
    title: 'Palacio de Mewic', category: '01 / HOSPITALITY · FULL STACK',
    intro: 'A digital front door to a place that feels like home.',
    idea: 'Bring an eight-room lodge in Lilongwe online, with a clear path from discovering a room to requesting a reservation.',
    features: ['Room listings and individual room pages.', 'Guest accounts and reservation management.', 'A staff dashboard for room availability, bookings, and rates.', 'Database rules that prevent overlapping room reservations.'],
    context: 'The current build uses Next.js, React, Tailwind CSS, and a Postgres-backed authentication and booking system. Online payments are planned; the site currently arranges payment with the lodge. The public GitHub repository contains an earlier iteration.',
    url: 'https://palacio-de-mewic-web.vercel.app', label: 'Visit the website ↗'
  },
  dreamtracks: {
    title: 'DreamTracks', category: '02 / EDITORIAL WEB · FRONT END',
    intro: 'A space for the energy and stories of sport.',
    idea: 'Explore a responsive editorial layout for stories across racing, horse riding, and track events.',
    features: ['Image-led article cards with category labels.', 'Category filtering for browsing the post collection.', 'A dedicated article page layout.', 'Responsive styling built with HTML, CSS, and JavaScript.'],
    context: 'An early front-end learning project. The repository includes sample article content and interface placeholders; it is presented as a prototype rather than a live publishing platform.',
    url: 'https://github.com/CodingGeniusCmoleni/DreamTracks', label: 'View source on GitHub ↗'
  },
  malawi: {
    title: 'Malawi Abroad', category: '03 / INTERFACE EXPLORATION · FRONT END',
    intro: 'A small starting point for a wider community.',
    idea: 'Explore a student login and registration experience around the idea of Malawians living and studying abroad.',
    features: ['Login and registration form layouts.', 'JavaScript transitions between the two views.', 'Responsive styling and native form validation.'],
    context: 'A front-end prototype built with HTML, CSS, and JavaScript. It explores the interface only; the public repository does not implement production authentication or a student database.',
    url: 'https://github.com/CodingGeniusCmoleni/malawi-abroad-web', label: 'View source on GitHub ↗'
  }
};
const dialog = document.getElementById('project-dialog');
let lastTrigger;
for (const button of document.querySelectorAll('[data-project]')) {
  button.addEventListener('click', () => {
    const project = projects[button.dataset.project];
    if (!project) return;
    if (typeof dialog.showModal !== 'function') { window.location.assign(project.url); return; }
    lastTrigger = button;
    for (const field of ['title', 'category', 'intro', 'idea', 'context']) {
      document.getElementById('dialog-' + field).textContent = project[field];
    }
    const list = document.getElementById('dialog-features');
    list.replaceChildren(...project.features.map(feature => {
      const item = document.createElement('li'); item.textContent = feature; return item;
    }));
    const link = document.getElementById('dialog-link');
    link.href = project.url; link.textContent = project.label;
    dialog.showModal(); dialog.scrollTop = 0;
  });
}
document.getElementById('close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
dialog.addEventListener('close', () => lastTrigger?.focus());
document.getElementById('year').textContent = new Date().getFullYear();
const copyButton = document.getElementById('copy-email');
let resetTimer;
copyButton.addEventListener('click', async () => {
  const status = document.getElementById('copy-status');
  try {
    await navigator.clipboard.writeText('molenichisomomw@gmail.com');
    copyButton.textContent = 'COPIED ✓'; status.textContent = 'Email address copied.';
  } catch {
    copyButton.textContent = 'SELECT EMAIL'; status.textContent = 'Copy unavailable. The email address is selected; use your device’s copy command.';
    const range = document.createRange(); range.selectNodeContents(document.querySelector('.email'));
    const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
  }
  clearTimeout(resetTimer); resetTimer = setTimeout(() => { copyButton.textContent = 'COPY ↗'; }, 3500);
});

// Cinematic enhancement. Content stays visible if JavaScript or motion is disabled.
(() => {
  const root = document.documentElement;
  const themeButton = document.getElementById('theme-toggle');
  const motionButton = document.getElementById('motion-toggle');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const systemTheme = matchMedia('(prefers-color-scheme: dark)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const readPreference = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const savePreference = (key, value) => { try { localStorage.setItem(key, value); } catch { /* Private browsing may block persistence. */ } };
  let motion = !reduceMotion.matches && readPreference('cm-motion') !== 'off';
  let observer;
  let framePending = false;
  const setTheme = theme => {
    root.dataset.theme = theme;
    const dark = theme === 'dark';
    themeButton.setAttribute('aria-pressed', String(dark));
    themeButton.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    themeButton.querySelector('.theme-label').textContent = dark ? 'Day' : 'Night';
    document.querySelector('meta[name="theme-color"]').content = dark ? '#111310' : '#f2efe8';
  };
  setTheme(root.dataset.theme || (systemTheme.matches ? 'dark' : 'light'));
  themeButton.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    savePreference('cm-theme', next);
    const bounds = themeButton.getBoundingClientRect();
    root.style.setProperty('--theme-x', (bounds.left + bounds.width / 2) + 'px');
    root.style.setProperty('--theme-y', (bounds.top + bounds.height / 2) + 'px');
    if (document.startViewTransition && motion) {
      try { document.startViewTransition(() => setTheme(next)); } catch { setTheme(next); }
    } else setTheme(next);
  });
  systemTheme.addEventListener('change', e => { if (!readPreference('cm-theme')) setTheme(e.matches ? 'dark' : 'light'); });

  function splitText(element, characters = false) {
    // One accessible label prevents screen readers from spelling the animation spans.
    element.setAttribute('aria-label', element.innerText.replace(/\s+/g, ' ').trim());
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    let index = 0;
    for (const node of nodes) {
      const fragment = document.createDocumentFragment();
      for (const token of node.textContent.split(/(\s+)/)) {
        if (!token) continue;
        if (/^\s+$/.test(token)) { fragment.append(document.createTextNode(token)); continue; }
        const mask = document.createElement('span');
        mask.className = characters ? 'type-mask' : 'type-word-mask';
        mask.setAttribute('aria-hidden', 'true');
        for (const part of characters ? Array.from(token) : [token]) {
          const inner = document.createElement('span');
          inner.className = characters ? 'type-char' : 'type-word';
          inner.style.setProperty(characters ? '--char-index' : '--word-index', index++);
          inner.textContent = part;
          mask.append(inner);
        }
        fragment.append(mask);
      }
      node.replaceWith(fragment);
    }
  }
  splitText(document.getElementById('hero-title'), true);
  for (const heading of document.querySelectorAll('.section-heading h2, .about h2, .contact-title h2')) {
    splitText(heading); heading.classList.add('reveal-heading');
  }
  const revealItems = document.querySelectorAll('.project-copy, .small .project-top, .small-heading, .small .project-description, .about-copy, .about-details, .toolbox, .contact-bottom, .all-work');
  revealItems.forEach(element => element.classList.add('reveal-item'));
  const targets = document.querySelectorAll('.reveal-item, .reveal-heading, .project-visual');
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.add('is-visible'); observer.unobserve(entry.target);
      }
    }, { threshold: .12, rootMargin: '0px 0px -20px 0px' });
    targets.forEach(element => observer.observe(element));
  } else targets.forEach(element => element.classList.add('is-visible'));

  const hero = document.querySelector('.hero');
  const scene = document.querySelector('.cinema-scene');
  const lines = [...document.querySelectorAll('.scene-line')];
  const counter = document.querySelector('.scene-counter');
  const progress = document.querySelector('.reading-progress');
  const clamp = (value, low, high) => Math.min(high, Math.max(low, value));
  function renderScroll() {
    framePending = false;
    const viewport = window.innerHeight;
    const scrollable = document.documentElement.scrollHeight - viewport;
    progress.style.transform = 'scaleX(' + (scrollable > 0 ? clamp(window.scrollY / scrollable, 0, 1) : 0) + ')';
    if (!motion) return;
    const heroBounds = hero.getBoundingClientRect();
    if (heroBounds.bottom > 0) hero.style.setProperty('--hero-drift', clamp(-heroBounds.top * .085, -18, 28) + 'px');
    const rect = scene.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < viewport) {
      const position = clamp(-rect.top / Math.max(1, rect.height - viewport), 0, 1);
      lines.forEach((line, index) => {
        const amount = clamp(position * 3.6 - index + .45, 0, 1);
        line.style.setProperty('--line-opacity', .16 + amount * .84);
        line.style.setProperty('--line-x', (1 - amount) * 24 + 'px');
      });
      counter.textContent = String(Math.min(3, Math.floor(position * 3) + 1)).padStart(2, '0') + ' / 03';
      scene.style.setProperty('--orbit-rotation', position * 115 + 'deg');
      scene.style.setProperty('--orbit-scale', .8 + position * .5);
    }
  }
  function requestScroll() { if (!framePending) { framePending = true; requestAnimationFrame(renderScroll); } }
  function applyMotion() {
    root.classList.toggle('motion-active', motion);
    motionButton.setAttribute('aria-pressed', String(!motion));
    motionButton.setAttribute('aria-label', motion ? 'Pause animations' : (reduceMotion.matches ? 'Animations disabled by device preference' : 'Enable animations'));
    motionButton.querySelector('span').textContent = motion ? 'on' : 'off';
    motionButton.disabled = reduceMotion.matches;
    if (!motion) {
      targets.forEach(element => element.classList.add('is-visible'));
      document.querySelector('.film-intro')?.remove();
    }
    requestScroll();
  }
  motionButton.addEventListener('click', () => { motion = !motion && !reduceMotion.matches; savePreference('cm-motion', motion ? 'on' : 'off'); applyMotion(); });
  reduceMotion.addEventListener('change', () => { motion = !reduceMotion.matches && readPreference('cm-motion') !== 'off'; applyMotion(); });
  applyMotion();
  window.addEventListener('scroll', requestScroll, { passive: true });
  window.addEventListener('resize', requestScroll, { passive: true });
  window.addEventListener('load', requestScroll, { once: true });
  setTimeout(() => document.querySelector('.film-intro')?.remove(), 1800);
  // Subtle depth and magnetism only on precision pointers; never capture scrolling.
  for (const card of document.querySelectorAll('.project-visual')) {
    let pointerFrame = 0;
    card.addEventListener('pointermove', event => {
      if (!motion || !finePointer.matches) return;
      cancelAnimationFrame(pointerFrame);
      const x = event.clientX, y = event.clientY;
      pointerFrame = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--tilt-x', -(y - r.top - r.height / 2) / r.height * 3 + 'deg');
        card.style.setProperty('--tilt-y', (x - r.left - r.width / 2) / r.width * 3 + 'deg');
      });
    });
    card.addEventListener('pointerleave', () => { cancelAnimationFrame(pointerFrame); card.style.setProperty('--tilt-x', '0deg'); card.style.setProperty('--tilt-y', '0deg'); });
  }
  const contact = document.querySelector('.contact-title');
  contact.addEventListener('pointermove', event => {
    if (!motion || !finePointer.matches) return;
    const r = contact.getBoundingClientRect();
    contact.style.setProperty('--magnet-x', clamp((event.clientX - r.right + 70) * .08, -14, 14) + 'px');
    contact.style.setProperty('--magnet-y', clamp((event.clientY - r.top - r.height / 2) * .1, -14, 14) + 'px');
  });
  contact.addEventListener('pointerleave', () => { contact.style.setProperty('--magnet-x', '0px'); contact.style.setProperty('--magnet-y', '0px'); });
})();
