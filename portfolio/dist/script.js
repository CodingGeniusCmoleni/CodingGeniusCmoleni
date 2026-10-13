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
