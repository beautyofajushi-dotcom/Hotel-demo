(() => {
  'use strict';
  document.documentElement.classList.add('js');

  // Add the official WhatsApp Business number in international format when available.
  // Until then, enquiry links open WhatsApp's share flow rather than a direct chat.
  const HOST_WHATSAPP = '';
  const page = document.body.dataset.page || 'home';
  const mobileLabel = page === 'dining' ? 'Ask about a meal' : page === 'our-home' ? 'Ask a host' : page === 'experiences' ? 'Plan a Braj day' : 'Ask about a stay';
  const mobileEnquiry = page === 'dining' ? 'Dining enquiry' : page === 'experiences' ? 'Braj morning walk' : '';

  const navItems = [
    { key: 'home', label: 'The house', href: 'index.html' },
    { key: 'stays', label: 'Rooms & stays', href: 'stays.html' },
    { key: 'our-home', label: 'Our home', href: 'our-home.html' },
    { key: 'experiences', label: 'Braj days', href: 'experiences.html' },
    { key: 'dining', label: 'The table', href: 'dining.html' },
  ];

  const headerMarkup = `
    <div class="scroll-progress" aria-hidden="true"><span data-scroll-progress></span></div>
    <header class="site-header" data-header>
      <div class="header-inner">
        <a class="brand" href="index.html" aria-label="Aangan House home"><span class="brand-mark" aria-hidden="true">A</span><span class="brand__text">AANGAN<small>A HOME IN BRAJ</small></span></a>
        <nav class="primary-nav" id="primary-navigation" aria-label="Main navigation">
          ${navItems.map((item) => `<a href="${item.href}"${item.key === page ? ' aria-current="page"' : ''}>${item.label}</a>`).join('')}
        </nav>
        <div class="header-actions"><span class="header-locale">BRAJ&nbsp; / &nbsp;IN</span><button class="header-book" type="button" data-open-booking>Ask about a stay <span aria-hidden="true">↗</span></button></div>
        <button class="menu-toggle" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="primary-navigation" data-menu-toggle><span></span><span></span></button>
      </div>
    </header>`;

  const footerMarkup = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-main">
          <div class="footer-brand"><a class="brand" href="index.html" aria-label="Aangan House home"><span class="brand-mark" aria-hidden="true">A</span><span class="brand__text">AANGAN<small>A HOME IN BRAJ</small></span></a><p>A family home with a few rooms to share, in the heart of Braj.</p></div>
          <div><p class="footer-title">Find your way</p><nav class="footer-links" aria-label="Footer navigation">${navItems.map((item) => `<a href="${item.href}">${item.label}</a>`).join('')}</nav></div>
          <div><p class="footer-title">A little closer</p><div class="footer-contact"><p>Braj · Mathura<br>Uttar Pradesh, India</p><a href="experiences.html">Get to know the neighbourhood ↗</a></div></div>
          <div><p class="footer-title">Come over</p><div class="footer-contact"><p>Thinking about a few days away? Tell us what you have in mind.</p><button class="underlink" type="button" data-open-booking>Talk to a host <span aria-hidden="true">↗</span></button></div></div>
        </div>
        <div class="footer-bottom"><span>© <span data-current-year></span> Aangan House. A design preview.</span><span>BRAJ · MATHURA · UTTAR PRADESH</span><a href="index.html#top">Back to the beginning ↑</a></div>
      </div>
    </footer>`;

  const bookingMarkup = `
    <div class="booking-modal" id="booking-modal" hidden>
      <div class="modal-scrim" data-close-booking></div>
      <section class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="booking-title" aria-describedby="booking-description">
        <button class="modal-close" type="button" aria-label="Close enquiry form" data-close-booking>×</button>
        <div data-booking-view>
          <p class="eyebrow"><span class="eyebrow__rule"></span> AANGAN HOUSE · BRAJ</p>
          <h2 id="booking-title">Come stay awhile.</h2>
          <p class="modal-lead" id="booking-description">Share a few details and a host can help you find the right room and dates.</p>
          <form class="booking-form" data-booking-form>
            <div class="booking-form__row"><label>Your name<input name="name" type="text" autocomplete="name" placeholder="How should we address you?" required></label><label>Email or mobile<input name="contact" type="text" autocomplete="email" placeholder="Where can we reach you?" required></label></div>
            <div class="booking-form__row"><label>Arriving<input name="arrival" type="date" data-booking-arrival required></label><label>Leaving<input name="departure" type="date" data-booking-departure required></label></div>
            <div class="booking-form__row"><label>People<select name="guests"><option value="2">2 people</option><option value="1">1 person</option><option value="3">3 people</option><option value="4">4 people</option><option value="5">5 people</option><option value="6">6 people</option></select></label><label>What are you thinking about?<select name="room"><option value="Any room or stay enquiry">A room or a stay</option><option value="The Neem Room">The Neem Room</option><option value="The Gulmohar Room">The Gulmohar Room</option><option value="The Aangan Suite">The Aangan Suite</option><option value="Braj morning walk">A morning walk in Braj</option><option value="Braj storyteller walk">A local storyteller</option><option value="Home cooking experience">Cooking at home</option><option value="A slow day at Aangan">A quiet day at home</option><option value="Dining enquiry">A meal at the house</option><option value="Other enquiry">Something else</option></select></label></div>
            <label class="checkline"><input type="checkbox" name="whatsappOptIn"><span>If possible, I’d like to continue the conversation on WhatsApp</span></label>
            <button class="button button--plum" type="submit">Save my enquiry <span aria-hidden="true">↗</span></button>
            <p class="booking-note">This website preview saves enquiries in this browser only. A live booking inbox or reservation system must be connected before launch.</p>
          </form>
        </div>
        <div class="booking-success" data-booking-success hidden>
          <span class="booking-success__mark" aria-hidden="true">✓</span><p class="eyebrow"><span class="eyebrow__rule"></span> A NOTE FOR THE HOSTS</p><h2 tabindex="-1">Enquiry saved.</h2><p data-booking-summary></p><p>Your details are saved in this browser preview only; nothing has been sent to Aangan House.</p><div class="booking-success__actions"><a href="https://wa.me/" target="_blank" rel="noreferrer" data-booking-whatsapp>Continue in WhatsApp ↗</a><button class="underlink" type="button" data-close-booking>Back to the house <span aria-hidden="true">↗</span></button></div>
        </div>
      </section>
    </div>
    <dialog class="floorplan-dialog" id="floorplan-dialog" aria-labelledby="floorplan-title"><div class="floorplan-dialog__inner"><div class="floorplan-dialog__top"><div><p class="eyebrow"><span class="eyebrow__rule"></span> A SENSE OF SPACE</p><h2 id="floorplan-title">Room layout</h2><p data-floorplan-size>Illustrative layout · dimensions on request</p></div><button class="floorplan-dialog__close" type="button" aria-label="Close room layout" data-close-floorplan>×</button></div><div class="floorplan-drawing" data-floorplan-drawing aria-label="Illustrative room layout"></div><div class="floorplan-dialog__legend"><span><i></i> Sleeping / living</span><span><i></i> Bath / dressing</span><span>Not to scale</span></div><p class="floorplan-dialog__foot">Room layouts are illustrative and may vary. Ask your host about access, connecting rooms or specific needs.</p></div></dialog>
    <button class="mobile-booking" type="button" data-open-booking${mobileEnquiry ? ` data-room-name="${mobileEnquiry}"` : ''}>${mobileLabel} <span aria-hidden="true">↗</span></button>`;

  document.body.insertAdjacentHTML('afterbegin', headerMarkup);
  document.body.insertAdjacentHTML('beforeend', footerMarkup + bookingMarkup);

  const header = document.querySelector('[data-header]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const primaryNav = document.querySelector('#primary-navigation');
  const bookingModal = document.querySelector('#booking-modal');
  const bookingForm = document.querySelector('[data-booking-form]');
  const bookingView = document.querySelector('[data-booking-view]');
  const bookingSuccess = document.querySelector('[data-booking-success]');
  const bookingSummary = document.querySelector('[data-booking-summary]');
  const floorplanDialog = document.querySelector('#floorplan-dialog');
  const progressLine = document.querySelector('[data-scroll-progress]');
  let lastFocused = null;
  let scrollFrame = 0;

  document.querySelectorAll('[data-current-year]').forEach((node) => { node.textContent = String(new Date().getFullYear()); });

  const localISODate = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const addDays = (date, days) => { const next = new Date(date.getFullYear(), date.getMonth(), date.getDate()); next.setDate(next.getDate() + days); return next; };
  const dateLabel = (value) => value ? new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(`${value}T12:00:00`)) : 'dates to be confirmed';

  function setDateDefaults() {
    const today = new Date();
    const tomorrow = addDays(today, 1);
    const afterTomorrow = addDays(today, 3);
    document.querySelectorAll('[data-availability-arrival], [data-booking-arrival]').forEach((input) => {
      input.min = localISODate(today);
      if (!input.value) input.value = localISODate(tomorrow);
      input.addEventListener('change', () => {
        const departure = input.closest('form')?.querySelector('[data-availability-departure], [data-booking-departure]');
        if (!departure || !input.value) return;
        const firstValid = localISODate(addDays(new Date(`${input.value}T12:00:00`), 1));
        departure.min = firstValid;
        if (departure.value && departure.value <= input.value) departure.value = firstValid;
      });
    });
    document.querySelectorAll('[data-availability-departure], [data-booking-departure]').forEach((input) => {
      input.min = localISODate(tomorrow);
      if (!input.value) input.value = localISODate(afterTomorrow);
    });
  }
  setDateDefaults();

  function savePreview(key, record) {
    try {
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      const records = Array.isArray(existing) ? existing : [];
      records.push(record);
      localStorage.setItem(key, JSON.stringify(records.slice(-20)));
      return true;
    } catch (_error) { return false; }
  }
  function whatsappUrl(message) {
    const suffix = `?text=${encodeURIComponent(message)}`;
    return HOST_WHATSAPP ? `https://wa.me/${HOST_WHATSAPP}${suffix}` : `https://wa.me/${suffix}`;
  }

  function openBooking(trigger, preset = {}) {
    if (!bookingModal || !bookingForm) return;
    lastFocused = trigger || document.activeElement;
    bookingForm.reset();
    bookingView.hidden = false;
    bookingSuccess.hidden = true;
    const roomValue = preset.room || trigger?.dataset.roomName;
    if (roomValue) {
      const select = bookingForm.elements.room;
      const exact = Array.from(select.options).find((option) => option.value === roomValue);
      if (exact) select.value = exact.value;
      else if (/dining|meal|table/i.test(roomValue)) select.value = 'Dining enquiry';
      else select.value = 'Other enquiry';
    }
    const arrival = preset.arrival || localISODate(addDays(new Date(), 1));
    let departure = preset.departure || localISODate(addDays(new Date(), 3));
    bookingForm.elements.arrival.min = localISODate(new Date());
    bookingForm.elements.arrival.value = arrival;
    bookingForm.elements.departure.min = localISODate(addDays(new Date(`${arrival}T12:00:00`), 1));
    if (departure <= arrival) departure = bookingForm.elements.departure.min;
    bookingForm.elements.departure.value = departure;
    if (preset.guests) bookingForm.elements.guests.value = String(preset.guests);
    bookingModal.hidden = false;
    document.body.classList.add('modal-open');
    window.setTimeout(() => bookingForm.querySelector('input[name="name"]')?.focus(), 25);
  }
  function closeBooking() {
    if (!bookingModal || bookingModal.hidden) return;
    bookingModal.hidden = true;
    document.body.classList.remove('modal-open');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  document.addEventListener('click', (event) => {
    const bookingTrigger = event.target.closest('[data-open-booking]');
    if (bookingTrigger) { event.preventDefault(); openBooking(bookingTrigger); return; }
    if (event.target.closest('[data-close-booking]')) closeBooking();
    if (event.target.closest('[data-close-floorplan]') && floorplanDialog?.open) floorplanDialog.close();
  });

  document.querySelectorAll('[data-availability-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const arrival = form.elements.arrival.value;
      const departure = form.elements.departure.value;
      if (departure <= arrival) {
        form.elements.departure.setCustomValidity('Choose a leaving date after your arrival.');
        form.elements.departure.reportValidity();
        form.elements.departure.setCustomValidity('');
        return;
      }
      openBooking(form.querySelector('button[type="submit"]'), { arrival, departure, guests: form.elements.guests.value });
    });
  });

  bookingForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!bookingForm.reportValidity()) return;
    const arrival = bookingForm.elements.arrival.value;
    const departure = bookingForm.elements.departure.value;
    if (departure <= arrival) {
      bookingForm.elements.departure.setCustomValidity('Choose a leaving date after your arrival.');
      bookingForm.elements.departure.reportValidity();
      bookingForm.elements.departure.setCustomValidity('');
      return;
    }
    const enquiry = {
      name: bookingForm.elements.name.value.trim(),
      contact: bookingForm.elements.contact.value.trim(),
      arrival,
      departure,
      guests: bookingForm.elements.guests.value,
      request: bookingForm.elements.room.value,
      whatsappOptIn: bookingForm.elements.whatsappOptIn.checked,
      createdAt: new Date().toISOString(),
    };
    const stored = savePreview('aangan-preview-stay-enquiries', enquiry);
    bookingSummary.textContent = `${enquiry.name}, your note about “${enquiry.request}” for ${enquiry.guests} ${enquiry.guests === '1' ? 'person' : 'people'} from ${dateLabel(arrival)} to ${dateLabel(departure)} is ${stored ? 'saved in this browser preview' : 'ready in this preview'}.`;
    const share = document.querySelector('[data-booking-whatsapp]');
    share.href = whatsappUrl(`Namaste Aangan House, I would like to ask about a stay.\nName: ${enquiry.name}\nDates: ${dateLabel(arrival)} to ${dateLabel(departure)}\nPeople: ${enquiry.guests}\nRequest: ${enquiry.request}\nWhatsApp follow-up: ${enquiry.whatsappOptIn ? 'preferred' : 'not requested'}.`);
    share.textContent = HOST_WHATSAPP ? 'Message Aangan House on WhatsApp ↗' : 'Continue in WhatsApp ↗';
    bookingView.hidden = true;
    bookingSuccess.hidden = false;
    bookingSuccess.querySelector('h2')?.focus();
  });

  bookingModal?.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') { event.preventDefault(); closeBooking(); }
    if (event.key === 'Tab' && !bookingModal.hidden) {
      const focusable = Array.from(bookingModal.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled])')).filter((node) => node.offsetParent !== null);
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
  });

  if (header && menuToggle && primaryNav) {
    const updateHeader = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 22);
      if (progressLine) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        progressLine.style.width = `${maxScroll > 0 ? Math.min(100, window.scrollY / maxScroll * 100) : 0}%`;
      }
      document.querySelectorAll('[data-parallax], [data-parallax-image]').forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.bottom < -40 || rect.top > window.innerHeight + 40) return;
        const offset = Math.max(-15, Math.min(15, (rect.top + rect.height / 2 - window.innerHeight / 2) * -.025));
        element.style.setProperty('--parallax-y', `${offset}px`);
      });
    };
    menuToggle.addEventListener('click', () => {
      const open = header.classList.toggle('is-menu-open');
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    });
    primaryNav.addEventListener('click', (event) => {
      if (event.target.closest('a')) { header.classList.remove('is-menu-open'); menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.setAttribute('aria-label', 'Open navigation menu'); }
    });
    window.addEventListener('scroll', () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => { updateHeader(); scrollFrame = 0; });
    }, { passive: true });
    updateHeader();
    window.addEventListener('resize', updateHeader, { passive: true });
  }

  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealElements.length) {
    const observer = new IntersectionObserver((entries, current) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); current.unobserve(entry.target); } });
    }, { threshold: .12, rootMargin: '0px 0px -26px 0px' });
    revealElements.forEach((element) => observer.observe(element));
  } else revealElements.forEach((element) => element.classList.add('is-visible'));

  const counters = document.querySelectorAll('[data-count]');
  const animateCounter = (node) => {
    const end = Number(node.dataset.count);
    const suffix = node.textContent.trim().endsWith('%') ? '%' : '';
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { node.textContent = `${end}${suffix}`; return; }
    const start = performance.now();
    const duration = 950;
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      node.textContent = `${Math.round(end * eased)}${suffix}`;
      if (progress < 1) window.requestAnimationFrame(tick);
    };
    window.requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window && counters.length) {
    const counterObserver = new IntersectionObserver((entries, current) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { animateCounter(entry.target); current.unobserve(entry.target); } });
    }, { threshold: .65 });
    counters.forEach((counter) => counterObserver.observe(counter));
  }

  // Subtle cursor-led motion on the hero image, disabled for touch and reduced-motion users.
  const hero = document.querySelector('.hero-home');
  const heroMedia = document.querySelector('.hero__media');
  if (hero && heroMedia && window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    hero.addEventListener('pointermove', (event) => {
      const bounds = hero.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - .5) * 8;
      const y = ((event.clientY - bounds.top) / bounds.height - .5) * 6;
      heroMedia.style.setProperty('--hero-x', `${x}px`);
      heroMedia.style.setProperty('--hero-y', `${y}px`);
    });
    hero.addEventListener('pointerleave', () => { heroMedia.style.setProperty('--hero-x', '0px'); heroMedia.style.setProperty('--hero-y', '0px'); });
  }

  const roomGrid = document.querySelector('[data-room-grid]');
  if (roomGrid) {
    const cards = Array.from(roomGrid.querySelectorAll('[data-view][data-bed]'));
    const viewFilter = document.querySelector('[data-filter-view]');
    const bedFilter = document.querySelector('[data-filter-bed]');
    const count = document.querySelector('[data-room-count]');
    const empty = document.querySelector('[data-room-empty]');
    const filterRooms = () => {
      const view = viewFilter?.value || 'all'; const bed = bedFilter?.value || 'all'; let visible = 0;
      cards.forEach((card) => {
        const match = (view === 'all' || card.dataset.view === view) && (bed === 'all' || card.dataset.bed === bed);
        card.hidden = !match; if (match) visible += 1;
      });
      if (count) count.textContent = `Showing ${visible} ${visible === 1 ? 'room' : 'rooms'}`;
      if (empty) empty.hidden = visible !== 0;
    };
    viewFilter?.addEventListener('change', filterRooms);
    bedFilter?.addEventListener('change', filterRooms);
  }

  const experienceFilterButtons = Array.from(document.querySelectorAll('[data-experience-filter]'));
  const experienceCards = Array.from(document.querySelectorAll('[data-experience-type]'));
  const experienceEmpty = document.querySelector('[data-experience-empty]');
  experienceFilterButtons.forEach((button) => button.addEventListener('click', () => {
    const filter = button.dataset.experienceFilter;
    experienceFilterButtons.forEach((item) => { const active = item === button; item.classList.toggle('is-active', active); item.setAttribute('aria-pressed', String(active)); });
    let shown = 0;
    experienceCards.forEach((card) => { const visible = filter === 'all' || card.dataset.experienceType === filter; card.hidden = !visible; if (visible) shown += 1; });
    if (experienceEmpty) experienceEmpty.hidden = shown > 0;
  }));

  const carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    document.querySelector('[data-carousel-prev]')?.addEventListener('click', () => carousel.scrollBy({ left: -carousel.clientWidth * .72, behavior: 'smooth' }));
    document.querySelector('[data-carousel-next]')?.addEventListener('click', () => carousel.scrollBy({ left: carousel.clientWidth * .72, behavior: 'smooth' }));
  }

  document.querySelectorAll('[data-menu-tabs]').forEach((tabList) => {
    const tabs = Array.from(tabList.querySelectorAll('[data-menu-tab]'));
    const panels = Array.from(document.querySelectorAll('[data-menu-panel]'));
    const activate = (tab) => {
      tabs.forEach((item) => { const active = item === tab; item.setAttribute('aria-selected', String(active)); item.tabIndex = active ? 0 : -1; });
      panels.forEach((panel) => { panel.hidden = panel.dataset.menuPanel !== tab.dataset.menuTab; });
    };
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(tab));
      tab.addEventListener('keydown', (event) => {
        if (!['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : event.key === 'ArrowRight' ? (index + 1) % tabs.length : (index - 1 + tabs.length) % tabs.length;
        tabs[next].focus(); activate(tabs[next]);
      });
    });
  });

  const floorplanTitle = document.querySelector('#floorplan-title');
  const floorplanSize = document.querySelector('[data-floorplan-size]');
  const floorplanDrawing = document.querySelector('[data-floorplan-drawing]');
  const layouts = {
    room: '<div class="plan-room plan-room--entry">ENTRY</div><div class="plan-room plan-room--bed">KING / TWIN ROOM</div><div class="plan-room plan-room--sitting">WINDOW SEAT</div><div class="plan-room plan-room--bath">BATHROOM</div><div class="plan-room plan-room--terrace">WARDROBE</div>',
    family: '<div class="plan-room plan-room--entry">ENTRY</div><div class="plan-room plan-room--bed">KING BEDROOM</div><div class="plan-room plan-room--sitting">SITTING</div><div class="plan-room plan-room--bath">BATHROOM</div><div class="plan-room plan-room--terrace">TWIN SLEEPING NOOK</div>',
  };
  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-open-floorplan]');
    if (!trigger || !floorplanDialog) return;
    if (floorplanTitle) floorplanTitle.textContent = trigger.dataset.roomName || 'Room layout';
    if (floorplanSize) floorplanSize.textContent = `${trigger.dataset.roomSize || ''} · Illustrative layout, dimensions on request`;
    if (floorplanDrawing) { floorplanDrawing.classList.toggle('floorplan-drawing--family', trigger.dataset.plan === 'family'); floorplanDrawing.innerHTML = layouts[trigger.dataset.plan] || layouts.room; }
    if (typeof floorplanDialog.showModal === 'function') floorplanDialog.showModal();
  });
  floorplanDialog?.addEventListener('click', (event) => { if (event.target === floorplanDialog) floorplanDialog.close(); });
})();
