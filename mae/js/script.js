// Day Jeneffer · Psicologia & Desenvolvimento
// Menu mobile + acordeão de FAQ + alternância de tema (claro/escuro)

document.addEventListener('DOMContentLoaded', function () {

  // ---------- Modo escuro ----------
  var THEME_KEY = 'day-jeneffer-theme';
  var root = document.documentElement;
  var themeToggle = document.getElementById('theme-toggle');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* localStorage indisponível */ }

    if (themeToggle) {
      var isDark = theme === 'dark';
      themeToggle.setAttribute('aria-checked', isDark ? 'true' : 'false');
      themeToggle.setAttribute('aria-label', isDark ? 'Ativar modo claro' : 'Ativar modo escuro');
    }
  }

  if (themeToggle) {
    // Reflete no botão o tema já definido pelo script inline no <head>
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

    themeToggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // Acompanha mudanças na preferência do sistema enquanto o usuário
  // não tiver escolhido manualmente um tema neste navegador.
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      var hasStoredPreference = false;
      try { hasStoredPreference = localStorage.getItem(THEME_KEY) !== null; } catch (err) { /* ignora */ }
      if (!hasStoredPreference) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // ---------- Menu mobile ----------
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.classList.toggle('is-active', isOpen);
    });

    // Fecha o menu ao clicar em um link
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---------- Acordeão FAQ ----------
  var questions = document.querySelectorAll('.faq-question');

  questions.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var answer = btn.nextElementSibling;
      var isOpen = btn.getAttribute('aria-expanded') === 'true';

      // Fecha os demais itens (comportamento de acordeão único)
      questions.forEach(function (otherBtn) {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          otherBtn.nextElementSibling.style.maxHeight = null;
        }
      });

      btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      answer.style.maxHeight = isOpen ? null : answer.scrollHeight + 'px';
    });
  });
});
