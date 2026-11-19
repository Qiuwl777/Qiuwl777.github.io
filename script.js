(function () {
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('siteNav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    nav.addEventListener('click', function (event) {
      if (event.target.tagName === 'A') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  var links = Array.prototype.slice.call(document.querySelectorAll('.site-nav a'));

  if ('IntersectionObserver' in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-35% 0px -55% 0px' });

    sections.forEach(function (section) { sectionObserver.observe(section); });

    var revealTargets = document.querySelectorAll('.project, .mini-card, .experience, .skill-card, .info-card, .contact-card');
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    Array.prototype.forEach.call(revealTargets, function (el) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      el.classList.add('reveal');
      revealObserver.observe(el);
    });
  }

  var lightbox = null;

  function closeLightbox() {
    if (!lightbox) return;
    document.body.removeChild(lightbox);
    lightbox = null;
  }

  Array.prototype.forEach.call(document.querySelectorAll('.gallery-item, .figure-item'), function (item) {
    item.addEventListener('click', function (event) {
      event.preventDefault();
      closeLightbox();

      var thumb = item.querySelector('img');
      lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.setAttribute('role', 'dialog');
      lightbox.setAttribute('aria-modal', 'true');

      var img = document.createElement('img');
      img.src = item.getAttribute('href');
      img.alt = thumb ? thumb.alt : '';

      var caption = document.createElement('p');
      caption.textContent = item.getAttribute('data-caption') || '';

      var close = document.createElement('button');
      close.type = 'button';
      close.textContent = '关闭';

      lightbox.appendChild(img);
      lightbox.appendChild(caption);
      lightbox.appendChild(close);
      document.body.appendChild(lightbox);

      lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox || e.target === img || e.target === caption) closeLightbox();
      });
      close.addEventListener('click', function (e) {
        e.stopPropagation();
        closeLightbox();
      });
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeLightbox();
  });

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
