/* ============================================================
   Vertex Sourcing Solutions — Shared JS
   Handles: nav injection, footer injection, scroll reveal
   ============================================================ */

/* ── Determine path prefix based on current page location ── */
const isInPages = window.location.pathname.includes('/pages/');
const root = isInPages ? '../' : './';

/* ── NAV HTML ── */
function renderNav(activePage) {
  const links = [
    { href: `${root}pages/about.html`,          label: 'About'          },
    { href: `${root}pages/capabilities.html`,   label: 'Capabilities'   },
    { href: `${root}pages/products.html`,        label: 'Products'       },
    { href: `${root}pages/sustainability.html`,  label: 'Sustainability' },
    { href: `${root}pages/compliance.html`,      label: 'Compliance'     },
  ];

  const linkHTML = links.map(l =>
    `<li><a href="${l.href}" ${l.label === activePage ? 'class="active"' : ''}>${l.label}</a></li>`
  ).join('\n    ');

  return `
<nav>
  <a class="nav-logo" href="${root}index.html">
    <img src="${root}images/logo.png" alt="Vertex Sourcing Solutions" />
  </a>
  <ul class="nav-links">
    ${linkHTML}
  </ul>
  <a href="${root}pages/contact.html" class="nav-cta">Get in Touch</a>
</nav>`;
}

/* ── FOOTER HTML ── */
function renderFooter() {
  return `
<footer>
  <a href="${root}index.html">
    <img src="${root}images/logo.png" alt="Vertex Sourcing Solutions" />
  </a>
  <ul class="footer-links">
    <li><a href="${root}pages/about.html">About</a></li>
    <li><a href="${root}pages/capabilities.html">Capabilities</a></li>
    <li><a href="${root}pages/products.html">Products</a></li>
    <li><a href="${root}pages/sustainability.html">Sustainability</a></li>
    <li><a href="${root}pages/compliance.html">Compliance</a></li>
    <li><a href="${root}pages/contact.html">Contact</a></li>
  </ul>
  <p class="footer-copy">
    Lahore, Pakistan &mdash; supplying <span>Europe, North America &amp; Australia</span><br>
    &copy; 2025 Vertex Sourcing Solutions. All rights reserved.
  </p>
</footer>`;
}

/* ── INJECT NAV & FOOTER ── */
document.addEventListener('DOMContentLoaded', () => {
  const activePage = document.body.dataset.page || '';

  const navEl = document.getElementById('nav-placeholder');
  if (navEl) navEl.outerHTML = renderNav(activePage);

  const footerEl = document.getElementById('footer-placeholder');
  if (footerEl) footerEl.outerHTML = renderFooter();

  /* ── SCROLL REVEAL ── */
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 6) * 70}ms`;
    io.observe(el);
  });
});
