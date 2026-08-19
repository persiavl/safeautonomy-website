/* safeautonomy — site behaviour
   No dependencies. Every enhancement degrades gracefully without JS. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- header shadow on scroll ---- */
  var header = document.querySelector('.header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- mobile nav ---- */
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
    });
  }

  /* ---- services dropdown (hover on desktop, click everywhere) ---- */
  var items = document.querySelectorAll('.nav__item');
  Array.prototype.forEach.call(items, function (item) {
    var toggle = item.querySelector('.nav__toggle');
    if (!toggle) return;

    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      var open = item.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    item.addEventListener('mouseenter', function () {
      if (window.innerWidth > 900) item.classList.add('is-open');
    });
    item.addEventListener('mouseleave', function () {
      if (window.innerWidth > 900) item.classList.remove('is-open');
    });
  });

  document.addEventListener('click', function (e) {
    if (window.innerWidth <= 900) return;
    Array.prototype.forEach.call(items, function (item) {
      if (!item.contains(e.target)) item.classList.remove('is-open');
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    Array.prototype.forEach.call(items, function (i) { i.classList.remove('is-open'); });
    if (nav) nav.classList.remove('is-open');
    if (burger) burger.setAttribute('aria-expanded', 'false');
  });

  /* ---- mark the current page in the nav ---- */
  var here = location.pathname.split('/').pop() || 'index.html';
  Array.prototype.forEach.call(document.querySelectorAll('[data-nav]'), function (link) {
    if (link.getAttribute('data-nav').split(' ').indexOf(here) !== -1) {
      link.classList.add('is-active');
    }
  });

  /* ---- scroll reveal ---- */
  var targets = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(targets, function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = parseInt(el.getAttribute('data-delay') || '0', 10);
        setTimeout(function () { el.classList.add('is-in'); }, delay);
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.06 });
    Array.prototype.forEach.call(targets, function (el) { io.observe(el); });
  }

  /* ---- responsive hero video: swap to a lighter file on small screens ---- */
  var isSmallScreen = window.matchMedia('(max-width: 700px)').matches;
  Array.prototype.forEach.call(document.querySelectorAll('video[data-mobile-src]'), function (v) {
    if (isSmallScreen && !reduceMotion) {
      v.setAttribute('src', v.getAttribute('data-mobile-src'));
      v.load();
    }
  });

  /* ---- hero video: don't autoplay when motion is reduced ---- */
  if (reduceMotion) {
    Array.prototype.forEach.call(document.querySelectorAll('.hero__video, .split-hero__media video'), function (v) {
      v.removeAttribute('autoplay');
      v.pause();
    });
  }

  /* ---- current year ---- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-year]'), function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---- blog: filter posts by topic ---- */
  var chips = document.querySelectorAll('[data-filter]');
  var posts = document.querySelectorAll('[data-topics]');
  if (chips.length && posts.length) {
    Array.prototype.forEach.call(chips, function (chip) {
      chip.addEventListener('click', function () {
        var want = chip.getAttribute('data-filter');

        Array.prototype.forEach.call(chips, function (c) {
          var on = c === chip;
          c.classList.toggle('tag--lime', on);
          c.classList.toggle('tag--plain', !on);
          c.setAttribute('aria-pressed', String(on));
        });

        Array.prototype.forEach.call(posts, function (post) {
          var topics = post.getAttribute('data-topics');
          var show = want === 'all' || topics.indexOf(want) !== -1;
          post.hidden = !show;
          if (!show) post.open = false;
        });
      });
    });
  }
})();
