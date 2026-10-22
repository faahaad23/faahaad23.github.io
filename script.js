/*
  Portfolio interactions: no framework required.
  Beginner note: each feature is kept small and separate so you can edit it later.
*/
document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation menu
  const menuButton = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuButton && navLinks) {
    menuButton.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
      menuButton.textContent = isOpen ? '×' : '☰';
    });
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation menu');
      menuButton.textContent = '☰';
    }));
  }

  // Scroll reveals. Content remains visible if IntersectionObserver isn't available.
  const revealTargets = document.querySelectorAll('main section, .project, .experience-item, .skill-card, .photo-frame');
  revealTargets.forEach((item, index) => {
    item.classList.add('js-reveal');
    item.style.transitionDelay = `${(index % 4) * 55}ms`;
  });
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          activeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealTargets.forEach(item => observer.observe(item));
  } else {
    revealTargets.forEach(item => item.classList.add('is-visible'));
  }

  // Expandable case-study notes on the existing project cards.
  const caseStudies = [
    {
      title: 'Urban Road Pollution Monitoring',
      summary: 'Case study focus',
      detail: 'Problem: fixed or expensive monitoring can leave gaps in street-level environmental information. Approach: explore an IoT workflow for collecting noise, CO₂ and temperature readings across selected Dhaka roads, then analyze the time-series data. Next step: add validated results, system diagrams and repository/demo links when they are ready.'
    },
    {
      title: 'Digital MIS Training & Support',
      summary: 'Case study focus',
      detail: 'Focus: explain digital workflows clearly, support users with system tasks and help people adopt MIS tools. Add the exact platform names, training materials and measurable outcomes here when you have them.'
    },
    {
      title: 'Data-driven Analysis',
      summary: 'Case study focus',
      detail: 'Focus: prepare data, explore patterns, compare analytical approaches and communicate findings through clear visualizations. Add the dataset, evaluation metrics and verified results for each published analysis.'
    },
    {
      title: 'Research Mentoring',
      summary: 'Case study focus',
      detail: 'Focus: support research planning, technical implementation and academic project development. Add a specific example, your role and any public output before presenting this as a completed case study.'
    }
  ];
  document.querySelectorAll('.project').forEach(card => {
    const title = card.querySelector('h3')?.textContent.trim();
    const item = caseStudies.find(entry => entry.title === title);
    if (!item || card.querySelector('.project-details')) return;
    const details = document.createElement('details');
    details.className = 'project-details';
    const summary = document.createElement('summary');
    summary.textContent = item.summary;
    const paragraph = document.createElement('p');
    paragraph.textContent = item.detail;
    details.append(summary, paragraph);
    card.append(details);
  });

  // Accessible photography lightbox for the 15 named JPG files.
  const galleryImages = Array.from(document.querySelectorAll('.photo-frame img'));
  const lightbox = document.querySelector('#photo-lightbox');
  if (lightbox && galleryImages.length) {
    const lightboxImage = lightbox.querySelector('img');
    const caption = lightbox.querySelector('.lightbox-caption');
    const closeButton = lightbox.querySelector('.lightbox-close');
    let currentIndex = 0;
    let previousFocus = null;
    const showImage = index => {
      currentIndex = (index + galleryImages.length) % galleryImages.length;
      const source = galleryImages[currentIndex];
      lightboxImage.src = source.currentSrc || source.src;
      lightboxImage.alt = source.alt || `Photography ${currentIndex + 1}`;
      caption.textContent = source.alt || `PHOTOGRAPHY ${String(currentIndex + 1).padStart(2, '0')}`;
    };
    const openLightbox = index => {
      previousFocus = document.activeElement;
      showImage(index);
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      closeButton.focus();
    };
    const closeLightbox = () => {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      lightboxImage.src = '';
      document.body.style.overflow = '';
      if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
    };
    galleryImages.forEach((img, index) => {
      const frame = img.closest('.photo-frame');
      frame.setAttribute('role', 'button');
      frame.setAttribute('tabindex', '0');
      frame.setAttribute('aria-label', `Open ${img.alt || 'photograph'} in viewer`);
      frame.addEventListener('click', () => openLightbox(index));
      frame.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openLightbox(index); }
      });
    });
    closeButton.addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', () => showImage(currentIndex - 1));
    lightbox.querySelector('.lightbox-next').addEventListener('click', () => showImage(currentIndex + 1));
    lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', event => {
      if (!lightbox.classList.contains('is-open')) return;
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') showImage(currentIndex - 1);
      if (event.key === 'ArrowRight') showImage(currentIndex + 1);
    });
  }

  // Set current year automatically in the footer.
  const footer = document.querySelector('footer .footer-inner > div:first-child');
  if (footer) footer.textContent = `© ${new Date().getFullYear()} SHARIF ABDULLA AL FAHAD`;
});
