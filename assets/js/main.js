/* Jaymeebaaby — site interactions */
(function () {
  'use strict';

  /* Sticky header state */
  var hdr = document.querySelector('.hdr');
  var bar = document.querySelector('.stickybar');
  function onScroll() {
    var y = window.scrollY;
    if (hdr) hdr.classList.toggle('is-stuck', y > 24);
    if (bar) bar.classList.toggle('is-up', y > 620);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile nav */
  var burger = document.querySelector('.burger');
  var mnav = document.querySelector('.mnav');
  if (burger && mnav) {
    burger.addEventListener('click', function () {
      var open = mnav.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mnav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mnav.classList.remove('is-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* Scroll reveal */
  var rv = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window && rv.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0, rootMargin: '0px 0px -60px 0px' });
    rv.forEach(function (el, i) {
      el.style.transitionDelay = (Math.min(i % 4, 3) * 90) + 'ms';
      io.observe(el);
    });
  } else {
    rv.forEach(function (el) { el.classList.add('in'); });
  }

  /* Marquee: duplicate track content so the loop is seamless */
  document.querySelectorAll('.marq__track').forEach(function (t) {
    t.innerHTML += t.innerHTML;
  });

  /* Accordion: only one FAQ open at a time */
  document.querySelectorAll('.faq').forEach(function (faq) {
    var items = faq.querySelectorAll('details');
    items.forEach(function (d) {
      d.addEventListener('toggle', function () {
        if (!d.open) return;
        items.forEach(function (o) { if (o !== d) o.open = false; });
      });
    });
  });

  /* Animated stat counters */
  var nums = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && nums.length) {
    var nio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        nio.unobserve(el);
        var target = parseFloat(el.dataset.count);
        var suffix = el.dataset.suffix || '';
        var prefix = el.dataset.prefix || '';
        var dur = 1400, t0 = performance.now();
        (function tick(now) {
          var p = Math.min((now - t0) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          var val = target % 1 === 0
            ? Math.round(target * eased)
            : (target * eased).toFixed(1);
          el.textContent = prefix + val + suffix;
          if (p < 1) requestAnimationFrame(tick);
        })(t0);
      });
    }, { threshold: 0.5 });
    nums.forEach(function (n) { nio.observe(n); });
  }

  /* Prefill the inquiry page when a service card is used as the entry point */
  document.querySelectorAll('[data-service]').forEach(function (a) {
    a.addEventListener('click', function () {
      try { sessionStorage.setItem('jb_service', a.dataset.service); } catch (err) {}
    });
  });
  var noted = document.querySelector('[data-service-note]');
  if (noted) {
    try {
      var s = sessionStorage.getItem('jb_service');
      if (s) noted.textContent = 'Inquiring about: ' + s;
    } catch (err) {}
  }
})();
