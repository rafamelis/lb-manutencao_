/* ═══════════════════════════════════════════════════════════════
   ZéFix — Marido de Aluguel | main.js
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ── Scroll Reveal ──────────────────────────────────────────────
   Observa elementos .reveal e adiciona .visible quando visíveis
   ─────────────────────────────────────────────────────────────── */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');

  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((el) => observer.observe(el));
}

/* ── Animated Counters ──────────────────────────────────────────
   Anima .stat-number do 0 até o valor em data-target
   Detecta automaticamente o sufixo (% ou +)
   ─────────────────────────────────────────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');

  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el     = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const label  = el.closest('.stat-item')?.querySelector('.stat-label')?.textContent ?? '';
        const suffix = label.includes('%') ? '%' : '+';
        let current  = 0;
        const step   = Math.ceil(target / 60);

        const tick = () => {
          current = Math.min(current + step, target);
          el.textContent = current + suffix;
          if (current < target) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => observer.observe(el));
}

/* ── Mobile Navbar Auto-close ───────────────────────────────────
   Fecha o menu hamburguer ao clicar em um link (mobile)
   ─────────────────────────────────────────────────────────────── */
function initNavbarAutoClose() {
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const toggler  = document.querySelector('.navbar-toggler');
  const collapse = document.querySelector('#navMenu');

  if (!toggler || !collapse) return;

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (collapse.classList.contains('show')) {
        toggler.click();
      }
    });
  });
}

/* ── Smooth Scroll para âncoras ─────────────────────────────────
   Garante scroll suave mesmo em browsers sem suporte nativo
   ─────────────────────────────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ── Navbar shadow on scroll ────────────────────────────────────
   Adiciona sombra extra na navbar ao rolar a página
   ─────────────────────────────────────────────────────────────── */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,.35)';
    } else {
      navbar.style.boxShadow = '0 2px 12px rgba(0,0,0,.25)';
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ── Scroll to top button ───────────────────────────────────────
   Mostra o botão após a seção hero e leva ao topo ao clicar
   ─────────────────────────────────────────────────────────────── */
function initScrollTopButton() {
  const btn = document.getElementById('scrollTopBtn');
  const hero = document.getElementById('hero');

  if (!btn || !hero) return;

  const toggleButton = () => {
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    btn.classList.toggle('show', window.scrollY > heroBottom);
  };

  toggleButton();
  window.addEventListener('scroll', toggleButton, { passive: true });
  window.addEventListener('resize', toggleButton);

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── Init ───────────────────────────────────────────────────────
   Inicializa todos os módulos após o DOM estar pronto
   ─────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initCounters();
  initNavbarAutoClose();
  initSmoothScroll();
  initNavbarScroll();
  initScrollTopButton();
});
