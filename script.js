(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* Year */
  $('#year').textContent = new Date().getFullYear();

  /* Scroll progress + nav state */
  var nav = $('#nav'), bar = $('#progress');
  function onScroll() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
    nav.classList.toggle('scrolled', h.scrollTop > 30);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  var btn = $('#menuBtn'), links = $('#navLinks');
  function closeMenu() { links.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
  btn.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
  $$('#navLinks a').forEach(function (a) { a.addEventListener('click', closeMenu); });

  /* Active nav link */
  var navAnchors = $$('#navLinks a:not(.nav-cta)');
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        navAnchors.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach(function (s) { spy.observe(s); });

  /* Reveal on scroll */
  var rv = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); rv.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  $$('.reveal').forEach(function (el, i) {
    el.style.transitionDelay = (i % 3) * 70 + 'ms';
    rv.observe(el);
  });

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Counters */
  var co = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target, to = +el.dataset.count, suf = el.dataset.suffix || '';
      var start = null, dur = 1400;
      function step(t) {
        if (!start) start = t;
        var p = Math.min((t - start) / dur, 1);
        el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + (p === 1 ? suf : '');
        if (p < 1) requestAnimationFrame(step);
      }
      reduce ? (el.textContent = to + suf) : requestAnimationFrame(step);
      co.unobserve(el);
    });
  }, { threshold: 0.6 });
  $$('[data-count]').forEach(function (el) { co.observe(el); });

  /* Project filters */
  var filters = $$('.filter'), cards = $$('.card');
  filters.forEach(function (f) {
    f.addEventListener('click', function () {
      filters.forEach(function (x) { x.classList.remove('active'); });
      f.classList.add('active');
      var cat = f.dataset.filter;
      cards.forEach(function (c) {
        var show = cat === 'all' || c.dataset.cat.split(' ').indexOf(cat) > -1;
        c.classList.toggle('hide', !show);
      });
    });
  });

  /* Lightbox */
  var tiles = $$('#gallery .g'), lb = $('#lightbox'), lbImg = $('#lbImg'), lbCount = $('#lbCount'), idx = 0;
  function show(i) {
    idx = (i + tiles.length) % tiles.length;
    var img = tiles[idx].querySelector('img');
    lbImg.src = tiles[idx].getAttribute('href');
    lbImg.alt = img.alt;
    lbCount.textContent = (idx + 1) + ' / ' + tiles.length;
  }
  function open(i) { show(i); lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; }
  function close() { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }
  tiles.forEach(function (t, i) {
    t.addEventListener('click', function (e) { e.preventDefault(); open(i); });
    var img = t.querySelector('img');
    img.addEventListener('error', function () { t.style.display = 'none'; });
  });
  $('#lbClose').addEventListener('click', close);
  $('#lbPrev').addEventListener('click', function () { show(idx - 1); });
  $('#lbNext').addEventListener('click', function () { show(idx + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });

  /* Contact form → opens email client (works on GitHub Pages, no backend needed) */
  var form = $('#contactForm'), note = $('#formNote');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var n = $('#fName'), m = $('#fEmail'), t = $('#fMsg'), ok = true;
    [n, m, t].forEach(function (f) { f.classList.remove('invalid'); });
    if (!n.value.trim()) { n.classList.add('invalid'); ok = false; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(m.value.trim())) { m.classList.add('invalid'); ok = false; }
    if (!t.value.trim()) { t.classList.add('invalid'); ok = false; }
    if (!ok) { note.textContent = 'Please fill in all fields correctly.'; return; }
    var subject = encodeURIComponent('Portfolio enquiry from ' + n.value.trim());
    var body = encodeURIComponent(t.value.trim() + '\n\n— ' + n.value.trim() + ' (' + m.value.trim() + ')');
    window.location.href = 'mailto:a.a.fahad0008@gmail.com?subject=' + subject + '&body=' + body;
    note.textContent = 'Opening your email app…';
  });
})();
