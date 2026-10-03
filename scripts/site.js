(() => {
  'use strict';

  document.documentElement.classList.add('js');

  // Add the hotel's official WhatsApp Business number here in international format,
  // with country code and no +, spaces or punctuation, when one is available.
  const HOTEL_WHATSAPP = '';
  const page = document.body.dataset.page || 'home';
  const mobileBookingLabel = page === 'celebrations' ? 'Plan a celebration' : page === 'dining' ? 'Plan a dining experience' : page === 'experiences' ? 'Plan an experience' : 'Check availability';
  const mobileBookingRoom = page === 'celebrations' ? 'Celebration enquiry' : page === 'dining' ? 'Dining enquiry' : '';

  const navItems = [
    { key: 'home', label: 'The house', href: 'index.html' },
    { key: 'stays', label: 'Rooms & suites', href: 'stays.html' },
    { key: 'experiences', label: 'Experiences', href: 'experiences.html' },
    { key: 'celebrations', label: 'Celebrations', href: 'celebrations.html' },
    { key: 'dining', label: 'Dining', href: 'dining.html' },
  ];

  const headerMarkup = `
    <header class="site-header" data-header>
      <div class="header-inner">
        <a class="brand" href="index.html" aria-label="Māhira House home">
          <span class="brand-mark" aria-hidden="true">M</span>
          <span class="brand__name">MĀHIRA<small>LAKE PALACE · UDAIPUR</small></span>
        </a>
        <nav class="primary-nav" id="primary-navigation" aria-label="Main navigation">
          ${navItems.map((item) => `<a href="${item.href}"${item.key === page ? ' aria-current="page"' : ''}>${item.label}</a>`).join('')}
        </nav>
        <div class="header-actions">
          <span class="header-locale" aria-label="Language and currency">EN&nbsp; / &nbsp;INR</span>
          <button class="header-reserve" type="button" data-open-booking>Reserve a stay <span aria-hidden="true">↗</span></button>
        </div>
        <button class="menu-toggle" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="primary-navigation" data-menu-toggle><span></span><span></span></button>
      </div>
    </header>`;

  const footerMarkup = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-main">
          <div class="footer-brand">
            <a class="brand" href="index.html" aria-label="Māhira House home"><span class="brand-mark" aria-hidden="true">M</span><span class="brand__name">MĀHIRA<small>LAKE PALACE · UDAIPUR</small></span></a>
            <p>A quiet address on the water. A house that welcomes you to find your own pace.</p>
          </div>
          <div><p class="footer-title">Find your way</p><nav class="footer-links" aria-label="Footer navigation">${navItems.map((item) => `<a href="${item.href}">${item.label}</a>`).join('')}</nav></div>
          <div><p class="footer-title">Come closer</p><div class="footer-contact"><p>Lake Pichola<br>Udaipur, Rajasthan<br>India</p><a href="experiences.html">Getting here & local guide ↗</a></div></div>
          <div><p class="footer-title">A little more Māhira</p><div class="footer-contact"><p>For stays, celebrations and dining, our hosts are happy to help you plan ahead.</p><button class="text-link text-link--light" type="button" data-open-booking>Talk to our team <span aria-hidden="true">↗</span></button></div></div>
        </div>
        <div class="footer-bottom"><span>© <span data-current-year></span> Māhira House. Made for slower days.</span><span>UDAIPUR · RAJASTHAN · INDIA</span><a href="index.html#the-house">Back to the beginning ↑</a></div>
      </div>
    </footer>`;

  const bookingMarkup = `
    <div class="booking-modal" id="booking-modal" hidden>
      <div class="modal-scrim" data-close-booking></div>
      <section class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="booking-title" aria-describedby="booking-description">
        <button class="modal-close" type="button" aria-label="Close reservation form" data-close-booking>×</button>
        <div data-booking-view>
          <p class="eyebrow"><span class="eyebrow__line"></span> MĀHIRA RESERVATIONS</p>
          <h2 id="booking-title">Make this moment yours.</h2>
          <p class="modal-lead" id="booking-description">Tell us a little about your stay. We’ll make space for the details that matter to you.</p>
          <form class="booking-form" data-booking-form>
            <div class="booking-form__row"><label>Full name<input name="name" type="text" autocomplete="name" placeholder="Your name" required></label><label>Email or mobile<input name="contact" type="text" autocomplete="email" placeholder="How can we reach you?" required></label></div>
            <div class="booking-form__row"><label>Arrival<input name="arrival" type="date" data-booking-arrival required></label><label>Departure<input name="departure" type="date" data-booking-departure required></label></div>
            <div class="booking-form__row"><label>Guests<select name="guests"><option value="2">2 guests</option><option value="1">1 guest</option><option value="3">3 guests</option><option value="4">4 guests</option><option value="5">5 guests</option><option value="6">6 guests</option></select></label><label>Room or experience<select name="room"><option value="Any room or suite">Any room or suite</option><option value="The Pichola Suite">The Pichola Suite</option><option value="The Jharokha Room">The Jharokha Room</option><option value="The Haveli Residence">The Haveli Residence</option><option value="Family stay">Family stay</option><option value="Dining enquiry">Dining enquiry</option><option value="Celebration enquiry">Celebration enquiry</option><option value="First-light lake sail">First-light lake sail</option><option value="Wellness and house rituals">Wellness and house rituals</option><option value="Udaipur local experience">Udaipur local experience</option></select></label></div>
            <label class="checkline"><input name="whatsappOptIn" type="checkbox"><span>I’d like to continue the conversation on WhatsApp, if available</span></label>
            <button class="button button--dark" type="submit">Request availability <span aria-hidden="true">↗</span></button>
            <p class="booking-note">Website preview: this form saves your enquiry only in this browser. Connect a live booking engine or hotel reservations inbox before accepting real bookings.</p>
          </form>
        </div>
        <div class="booking-success" data-booking-success hidden>
          <span class="booking-success__mark" aria-hidden="true">✓</span>
          <p class="eyebrow"><span class="eyebrow__line"></span> YOUR STAY, IN THE MAKING</p>
          <h2>Enquiry saved.</h2>
          <p data-booking-summary></p>
          <p>Your details are saved in this browser preview only; nothing has been sent to the hotel. Connect a booking engine or reservations inbox before launch.</p>
          <div class="booking-success__actions"><a href="https://wa.me/" target="_blank" rel="noreferrer" data-booking-whatsapp>Continue in WhatsApp ↗</a><button class="text-link" type="button" data-close-booking>Back to the house <span aria-hidden="true">↗</span></button></div>
        </div>
      </section>
    </div>
    <dialog class="floorplan-dialog" id="floorplan-dialog" aria-labelledby="floorplan-title">
      <div class="floorplan-dialog__inner">
        <div class="floorplan-dialog__top"><div><p class="eyebrow"><span class="eyebrow__line"></span> A SENSE OF SPACE</p><h2 id="floorplan-title">Room floorplan</h2><p data-floorplan-size>Illustrative layout · dimensions on request</p></div><button class="floorplan-dialog__close" type="button" aria-label="Close floorplan" data-close-floorplan>×</button></div>
        <div class="floorplan-drawing" data-floorplan-drawing aria-label="Illustrative room floorplan"></div>
        <div class="floorplan-dialog__legend"><span><i></i> Sleeping & living</span><span><i></i> Bath & dressing</span><span>Not to scale</span></div>
        <p class="floorplan-dialog__foot">Layouts are illustrative and may vary by room. Please ask our team about accessible and connecting options.</p>
      </div>
    </dialog>
    <button class="mobile-booking" type="button" data-open-booking${mobileBookingRoom ? ` data-room-name="${mobileBookingRoom}"` : ''}>${mobileBookingLabel} <span aria-hidden="true">↗</span></button>`;

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
  let lastFocused = null;

  document.querySelectorAll('[data-current-year]').forEach((node) => { node.textContent = String(new Date().getFullYear()); });

  function localISODate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  function addDays(date, days) {
    const next = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    next.setDate(next.getDate() + days);
    return next;
  }
  function setDateDefaults() {
    const today = new Date();
    const tomorrow = addDays(today, 1);
    const following = addDays(today, 3);
    const minimum = localISODate(today);
    document.querySelectorAll('[data-availability-arrival], [data-booking-arrival], [data-event-date]').forEach((input) => {
      input.min = minimum;
      if (!input.value && input.matches('[data-availability-arrival], [data-booking-arrival]')) input.value = localISODate(tomorrow);
    });
    document.querySelectorAll('[data-availability-departure], [data-booking-departure]').forEach((input) => {
      input.min = localISODate(tomorrow);
      if (!input.value) input.value = localISODate(following);
    });
    document.querySelectorAll('[data-availability-arrival], [data-booking-arrival]').forEach((arrival) => {
      arrival.addEventListener('change', () => {
        const departure = arrival.closest('form')?.querySelector('[data-availability-departure], [data-booking-departure]');
        if (!departure) return;
        const nextMinimum = localISODate(addDays(new Date(`${arrival.value}T12:00:00`), 1));
        departure.min = nextMinimum;
        if (departure.value && departure.value <= arrival.value) departure.value = nextMinimum;
      });
    });
  }
  setDateDefaults();

  function safeStore(key, entry) {
    try {
      const stored = JSON.parse(localStorage.getItem(key) || '[]');
      const next = Array.isArray(stored) ? stored : [];
      next.push(entry);
      localStorage.setItem(key, JSON.stringify(next.slice(-20)));
      return true;
    } catch (_error) {
      return false;
    }
  }
  function buildWhatsAppUrl(message) {
    const encoded = encodeURIComponent(message);
    return HOTEL_WHATSAPP ? `https://wa.me/${HOTEL_WHATSAPP}?text=${encoded}` : `https://wa.me/?text=${encoded}`;
  }
  function dateLabel(value) {
    if (!value) return 'dates to be confirmed';
    const parsed = new Date(`${value}T12:00:00`);
    return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(parsed);
  }

  function openBooking(trigger, values = {}) {
    if (!bookingModal) return;
    lastFocused = trigger || document.activeElement;
    bookingForm.reset();
    bookingView.hidden = false;
    bookingSuccess.hidden = true;
    const requestedRoom = values.room || trigger?.dataset.roomName;
    if (requestedRoom) {
      const roomSelect = bookingForm.elements.room;
      const matchingOption = Array.from(roomSelect.options).find((option) => option.value === requestedRoom);
      if (matchingOption) roomSelect.value = matchingOption.value;
      else if (requestedRoom.toLowerCase().includes('celebr')) roomSelect.value = 'Celebration enquiry';
      else if (requestedRoom.toLowerCase().includes('family')) roomSelect.value = 'Family stay';
      else if (requestedRoom.toLowerCase().includes('dining')) roomSelect.value = 'Dining enquiry';
      else roomSelect.value = 'Any room or suite';
    }
    const arrival = values.arrival || localISODate(addDays(new Date(), 1));
    let departure = values.departure || localISODate(addDays(new Date(), 3));
    const guests = values.guests || '';
    bookingForm.elements.arrival.min = localISODate(new Date());
    bookingForm.elements.arrival.value = arrival;
    bookingForm.elements.departure.min = localISODate(addDays(new Date(`${arrival}T12:00:00`), 1));
    if (departure <= arrival) departure = bookingForm.elements.departure.min;
    bookingForm.elements.departure.value = departure;
    if (guests) bookingForm.elements.guests.value = String(guests);
    bookingModal.hidden = false;
    document.body.classList.add('modal-open');
    window.setTimeout(() => bookingForm.querySelector('input[name="name"]')?.focus(), 20);
  }

  function closeBooking() {
    if (!bookingModal || bookingModal.hidden) return;
    bookingModal.hidden = true;
    document.body.classList.remove('modal-open');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  document.addEventListener('click', (event) => {
    const bookingTrigger = event.target.closest('[data-open-booking]');
    if (bookingTrigger) {
      event.preventDefault();
      openBooking(bookingTrigger);
      return;
    }
    if (event.target.closest('[data-close-booking]')) closeBooking();
    if (event.target.closest('[data-close-floorplan]') && floorplanDialog?.open) floorplanDialog.close();
  });

  document.querySelectorAll('[data-availability-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const arrival = form.elements.arrival.value;
      const departure = form.elements.departure.value;
      if (!form.reportValidity()) return;
      if (departure <= arrival) {
        form.elements.departure.setCustomValidity('Please choose a departure date after your arrival.');
        form.elements.departure.reportValidity();
        form.elements.departure.setCustomValidity('');
        return;
      }
      openBooking(form.querySelector('button[type="submit"]'), {
        arrival,
        departure,
        guests: form.elements.guests.value,
      });
    });
  });

  bookingForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const arrival = bookingForm.elements.arrival.value;
    const departure = bookingForm.elements.departure.value;
    if (!bookingForm.reportValidity()) return;
    if (departure <= arrival) {
      bookingForm.elements.departure.setCustomValidity('Please choose a departure date after your arrival.');
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
      room: bookingForm.elements.room.value,
      whatsappOptIn: bookingForm.elements.whatsappOptIn.checked,
      createdAt: new Date().toISOString(),
    };
    safeStore('mahira-preview-booking-enquiries', enquiry);
    bookingSummary.textContent = `${enquiry.name}, your ${enquiry.room.toLowerCase()} enquiry is saved for ${dateLabel(arrival)} to ${dateLabel(departure)} (${enquiry.guests} guest${enquiry.guests === '1' ? '' : 's'}).`;
    const shareLink = document.querySelector('[data-booking-whatsapp]');
    const message = `Hello Māhira House, I would like to enquire about a stay.\nName: ${enquiry.name}\nDates: ${dateLabel(arrival)} to ${dateLabel(departure)}\nGuests: ${enquiry.guests}\nRoom: ${enquiry.room}\nPreferred WhatsApp follow-up: ${enquiry.whatsappOptIn ? 'Yes' : 'No'}.`;
    shareLink.href = buildWhatsAppUrl(message);
    shareLink.textContent = HOTEL_WHATSAPP ? 'WhatsApp our reservations team ↗' : 'Continue in WhatsApp ↗';
    bookingView.hidden = true;
    bookingSuccess.hidden = false;
    bookingSuccess.querySelector('h2')?.focus?.();
  });

  bookingModal?.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeBooking();
    }
    if (event.key === 'Tab' && !bookingModal.hidden) {
      const focusable = Array.from(bookingModal.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled])')).filter((node) => node.offsetParent !== null);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
  });

  if (menuToggle && header && primaryNav) {
    menuToggle.addEventListener('click', () => {
      const open = header.classList.toggle('is-menu-open');
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    });
    primaryNav.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        header.classList.remove('is-menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation menu');
      }
    });
    const syncHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
    syncHeader();
    window.addEventListener('scroll', syncHeader, { passive: true });
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealItems.length) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  document.querySelectorAll('.hero__image').forEach((image) => {
    if (image.complete) image.classList.add('is-ready');
    else image.addEventListener('load', () => image.classList.add('is-ready'), { once: true });
  });

  const roomGrid = document.querySelector('[data-room-grid]');
  const roomViewFilter = document.querySelector('[data-filter-view]');
  const roomBedFilter = document.querySelector('[data-filter-bed]');
  if (roomGrid && roomViewFilter && roomBedFilter) {
    const roomCards = Array.from(roomGrid.querySelectorAll('[data-view][data-bed]'));
    const countText = document.querySelector('[data-room-count]');
    const emptyNotice = document.createElement('p');
    emptyNotice.className = 'empty-state';
    emptyNotice.textContent = 'No stays match those filters. Try a different view or bed configuration.';
    emptyNotice.hidden = true;
    roomGrid.after(emptyNotice);
    const applyRoomFilters = () => {
      const view = roomViewFilter.value;
      const bed = roomBedFilter.value;
      let visible = 0;
      roomCards.forEach((card) => {
        const matches = (view === 'all' || card.dataset.view === view) && (bed === 'all' || card.dataset.bed === bed);
        card.hidden = !matches;
        if (matches) visible += 1;
      });
      emptyNotice.hidden = visible !== 0;
      if (countText) countText.textContent = `Showing ${visible} ${visible === 1 ? 'stay' : 'stays'}`;
    };
    roomViewFilter.addEventListener('change', applyRoomFilters);
    roomBedFilter.addEventListener('change', applyRoomFilters);
  }

  const carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    document.querySelector('[data-carousel-prev]')?.addEventListener('click', () => carousel.scrollBy({ left: -carousel.clientWidth * .72, behavior: 'smooth' }));
    document.querySelector('[data-carousel-next]')?.addEventListener('click', () => carousel.scrollBy({ left: carousel.clientWidth * .72, behavior: 'smooth' }));
  }

  document.querySelectorAll('[data-menu-tabs]').forEach((tabList) => {
    const tabs = Array.from(tabList.querySelectorAll('[data-menu-tab]'));
    const panels = Array.from(document.querySelectorAll('[data-menu-panel]'));
    const activate = (tab) => {
      tabs.forEach((item) => {
        const active = item === tab;
        item.setAttribute('aria-selected', String(active));
        item.tabIndex = active ? 0 : -1;
      });
      panels.forEach((panel) => { panel.hidden = panel.dataset.menuPanel !== tab.dataset.menuTab; });
    };
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(tab));
      tab.addEventListener('keydown', (event) => {
        if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        let nextIndex = index;
        if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = tabs.length - 1;
        tabs[nextIndex].focus();
        activate(tabs[nextIndex]);
      });
    });
  });

  const capacityInput = document.querySelector('[data-guest-count]');
  if (capacityInput) {
    const output = document.querySelector('[data-guest-output]');
    const venueCards = Array.from(document.querySelectorAll('[data-venue-card]'));
    const capacityNote = document.querySelector('[data-capacity-note]');
    const eventGuestSelect = document.querySelector('[data-event-guests]');
    const updateCapacity = () => {
      const guests = Number(capacityInput.value);
      if (output) output.textContent = guests >= 500 ? '500+' : String(guests);
      venueCards.forEach((card) => card.classList.remove('is-recommended'));
      const fit = venueCards.filter((card) => guests >= Number(card.dataset.min) && guests <= Number(card.dataset.max)).sort((a, b) => Number(a.dataset.max) - Number(b.dataset.max))[0];
      if (fit) {
        fit.classList.add('is-recommended');
        const badge = fit.querySelector('[data-venue-fit]');
        if (badge) badge.textContent = 'BEST FIT';
        venueCards.filter((card) => card !== fit).forEach((card) => {
          const label = card.querySelector('[data-venue-fit]');
          if (label) label.textContent = guests < Number(card.dataset.min) ? 'MORE SPACE' : 'ALSO AN OPTION';
        });
        const venueName = fit.querySelector('h3')?.textContent || 'a Māhira venue';
        if (capacityNote) capacityNote.textContent = `Best first fit for ${guests >= 500 ? '500+' : guests} guests: ${venueName}. We’ll shape a floor plan around your celebration.`;
      } else {
        if (capacityNote) capacityNote.textContent = `For a gathering of ${guests} guests, our celebrations team can combine spaces and plan a bespoke layout.`;
      }
      if (eventGuestSelect) {
        const value = guests <= 100 ? '50–100' : guests <= 200 ? '100–200' : guests <= 300 ? '200–300' : '300–500+';
        eventGuestSelect.value = value;
      }
      document.querySelectorAll('[data-whatsapp]').forEach((link) => {
        const message = `${link.dataset.message || 'Hello Māhira House.'}\nEstimated guests: ${guests}.`;
        link.href = buildWhatsAppUrl(message);
        link.textContent = HOTEL_WHATSAPP ? 'WhatsApp our celebrations team ↗' : 'Continue in WhatsApp ↗';
      });
    };
    capacityInput.addEventListener('input', updateCapacity);
    updateCapacity();
  } else {
    document.querySelectorAll('[data-whatsapp]').forEach((link) => {
      link.href = buildWhatsAppUrl(link.dataset.message || 'Hello Māhira House, I would love to make an enquiry.');
      link.textContent = HOTEL_WHATSAPP ? 'WhatsApp our team ↗' : 'Continue in WhatsApp ↗';
    });
  }

  const eventDate = document.querySelector('[data-event-date]');
  if (eventDate) eventDate.min = localISODate(new Date());
  const eventForm = document.querySelector('[data-event-form]');
  eventForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!eventForm.reportValidity()) return;
    const enquiry = {
      name: eventForm.elements.name.value.trim(),
      contact: eventForm.elements.contact.value.trim(),
      date: eventForm.elements.date.value,
      guests: eventForm.elements.guests.value,
      eventType: eventForm.elements.eventType.value,
      whatsappOptIn: eventForm.elements.whatsappOptIn.checked,
      createdAt: new Date().toISOString(),
    };
    safeStore('mahira-preview-celebration-enquiries', enquiry);
    const status = document.querySelector('[data-event-status]');
    if (status) {
      status.textContent = `Preview enquiry saved on this device for ${enquiry.guests} guests on ${dateLabel(enquiry.date)}. Nothing has been sent to the hotel.`;
      status.classList.add('is-success');
    }
    eventForm.querySelector('button[type="submit"]').textContent = 'Enquiry saved ✓';
  });

  const floorplanTitle = document.querySelector('#floorplan-title');
  const floorplanSize = document.querySelector('[data-floorplan-size]');
  const floorplanDrawing = document.querySelector('[data-floorplan-drawing]');
  const planMarkup = {
    suite: '<div class="plan-room plan-room--entry">ENTRY</div><div class="plan-room plan-room--bed">KING BEDROOM</div><div class="plan-room plan-room--sitting">SITTING ROOM</div><div class="plan-room plan-room--bath">BATH & DRESSING</div><div class="plan-room plan-room--terrace">LAKE BALCONY</div>',
    room: '<div class="plan-room plan-room--entry">ENTRY</div><div class="plan-room plan-room--bed">SLEEPING AREA</div><div class="plan-room plan-room--sitting">WINDOW SEAT</div><div class="plan-room plan-room--bath">BATHROOM</div><div class="plan-room plan-room--terrace">WARDROBE</div>',
    residence: '<div class="plan-room plan-room--entry">ENTRY</div><div class="plan-room plan-room--bed">PRIMARY BEDROOM</div><div class="plan-room plan-room--sitting">FAMILY LOUNGE</div><div class="plan-room plan-room--bath">BATHROOM</div><div class="plan-room plan-room--terrace">TWIN BEDROOM</div>',
  };
  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-open-floorplan]');
    if (!button || !floorplanDialog) return;
    if (floorplanTitle) floorplanTitle.textContent = button.dataset.roomName || 'Room floorplan';
    if (floorplanSize) floorplanSize.textContent = `${button.dataset.roomSize || ''} · Illustrative layout, dimensions on request`;
    if (floorplanDrawing) floorplanDrawing.innerHTML = planMarkup[button.dataset.plan] || planMarkup.suite;
    if (typeof floorplanDialog.showModal === 'function') floorplanDialog.showModal();
  });
  floorplanDialog?.addEventListener('click', (event) => {
    if (event.target === floorplanDialog) floorplanDialog.close();
  });
})();
