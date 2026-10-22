/* Portfolio interactions — plain JavaScript, no framework required. */
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  const closeMenu = () => {
    if (!navToggle || !navLinks) return;
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation menu');
    navToggle.textContent = '☰';
  };

  navToggle?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    navToggle.textContent = open ? '×' : '☰';
  });
  navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

  const updateNav = () => nav?.classList.toggle('scrolled', window.scrollY > 20);
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });

  // Reveal sections as they enter the viewport; keep all content visible if unsupported.
  const revealTargets = document.querySelectorAll('main section, .project, .experience-item, .education-item, .skill-card, .research-card, .photo-frame');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    revealTargets.forEach(element => element.classList.add('reveal'));
    revealTargets.forEach(element => observer.observe(element));
  }

  // Expandable project case-study summaries.
  const caseStudies = [
    'Goal: explore an affordable way to collect road-side noise, CO₂ and temperature readings. Approach: combine IoT sensors, timestamped data collection and analysis-ready CSV records. Next steps can include validation, visualization and carefully evaluated time-series models.',
    'Goal: help users understand MIS workflows. Work can include structured demonstrations, user guidance, troubleshooting and feedback to make system use clearer and more consistent.',
    'Goal: turn raw data into understandable findings. Typical workflow: inspect and clean data, explore patterns, visualize important relationships and compare suitable analytical approaches.',
    'Goal: support research ideas from planning through implementation. Activities can include defining the problem, reviewing relevant work, organizing experiments and communicating technical findings.'
  ];
  document.querySelectorAll('.project').forEach((card, index) => {
    const button = document.createElement('button');
    button.className = 'project-more';
    button.type = 'button';
    button.textContent = 'Explore case study +';
    button.setAttribute('aria-expanded', 'false');
    const details = document.createElement('div');
    details.className = 'project-details';
    details.textContent = caseStudies[index] || 'Add the project goal, your role, the approach, tools used and outcomes here.';
    card.append(button, details);
    button.addEventListener('click', () => {
      const expanded = card.classList.toggle('is-expanded');
      button.setAttribute('aria-expanded', String(expanded));
      button.textContent = expanded ? 'Close case study −' : 'Explore case study +';
    });
  });

  // Photography lightbox: click a gallery photo, use arrow keys or on-screen controls.
  const lightbox = document.getElementById('photo-lightbox');
  const lightboxImage = lightbox?.querySelector('img');
  const caption = lightbox?.querySelector('figcaption');
  const photoFrames = [...document.querySelectorAll('.photo-frame img')];
  const closeButton = lightbox?.querySelector('.lightbox-close');
  const prevButton = lightbox?.querySelector('.lightbox-prev');
  const nextButton = lightbox?.querySelector('.lightbox-next');
  let activePhoto = 0;
  let lastFocused = null;

  const showPhoto = index => {
    if (!photoFrames.length || !lightboxImage || !caption) return;
    activePhoto = (index + photoFrames.length) % photoFrames.length;
    const source = photoFrames[activePhoto];
    lightboxImage.src = source.currentSrc || source.src;
    lightboxImage.alt = source.alt || `Portfolio photograph ${activePhoto + 1}`;
    caption.textContent = source.closest('.photo-frame')?.querySelector('.photo-frame-label')?.textContent || source.alt;
  };
  const openPhoto = index => {
    if (!lightbox) return;
    lastFocused = document.activeElement;
    showPhoto(index);
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeButton?.focus();
  };
  const closePhoto = () => {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  };
  photoFrames.forEach((img, index) => {
    const frame = img.closest('.photo-frame');
    if (!frame) return;
    frame.setAttribute('tabindex', '0');
    frame.setAttribute('role', 'button');
    frame.setAttribute('aria-label', `Open ${img.alt || `photograph ${index + 1}`}`);
    frame.addEventListener('click', () => openPhoto(index));
    frame.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openPhoto(index); }
    });
  });
  closeButton?.addEventListener('click', closePhoto);
  prevButton?.addEventListener('click', () => showPhoto(activePhoto - 1));
  nextButton?.addEventListener('click', () => showPhoto(activePhoto + 1));
  lightbox?.addEventListener('click', event => { if (event.target === lightbox) closePhoto(); });
  document.addEventListener('keydown', event => {
    if (!lightbox?.classList.contains('is-open')) return;
    if (event.key === 'Escape') closePhoto();
    if (event.key === 'ArrowLeft') showPhoto(activePhoto - 1);
    if (event.key === 'ArrowRight') showPhoto(activePhoto + 1);
  });
});
