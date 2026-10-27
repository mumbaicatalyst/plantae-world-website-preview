/**
 * Plantae World — Navigation & Header Controller
 * Handles transparent-to-scrolled header transitions and luxury slide-in drawer.
 */
(() => {
  const header = document.querySelector('.site-header');
  const openBtn = document.getElementById('openNavDrawer');
  const closeBtn = document.getElementById('closeNavDrawer');
  const drawer = document.getElementById('navDrawer');
  const backdrop = document.getElementById('navDrawerBackdrop');

  // 1. Transparent Header Scroll Transition (Multi-Source & IntersectionObserver)
  function getScrollPosition() {
    return window.scrollY || window.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop) || 0;
  }

  function handleHeaderScroll() {
    const el = header || document.querySelector('.site-header');
    if (!el) return;
    const y = getScrollPosition();
    if (y > 20) {
      el.classList.add('is-scrolled');
    } else {
      el.classList.remove('is-scrolled');
    }
  }

  // Bind to all possible scroll dispatch targets
  window.addEventListener('scroll', handleHeaderScroll, { passive: true, capture: true });
  document.addEventListener('scroll', handleHeaderScroll, { passive: true, capture: true });
  if (document.body) {
    document.body.addEventListener('scroll', handleHeaderScroll, { passive: true, capture: true });
  }
  window.addEventListener('wheel', () => requestAnimationFrame(handleHeaderScroll), { passive: true });
  window.addEventListener('touchmove', () => requestAnimationFrame(handleHeaderScroll), { passive: true });
  window.addEventListener('resize', handleHeaderScroll, { passive: true });

  // IntersectionObserver fallback (guaranteed trigger even if scroll event is throttled or consumed)
  if ('IntersectionObserver' in window) {
    let sentinel = document.getElementById('scroll-sentinel');
    if (!sentinel) {
      sentinel = document.createElement('div');
      sentinel.id = 'scroll-sentinel';
      sentinel.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:24px;pointer-events:none;visibility:hidden;z-index:-1;';
      if (document.body) {
        document.body.prepend(sentinel);
      }
    }
    if (sentinel) {
      const observer = new IntersectionObserver(([entry]) => {
        const el = header || document.querySelector('.site-header');
        if (!el) return;
        if (!entry.isIntersecting) {
          el.classList.add('is-scrolled');
        } else if (getScrollPosition() <= 20) {
          el.classList.remove('is-scrolled');
        }
      }, { threshold: [0, 1] });
      observer.observe(sentinel);
    }
  }

  handleHeaderScroll();

  // 2. Off-Canvas Drawer Open / Close Functions
  function openDrawer() {
    const d = drawer || document.getElementById('navDrawer');
    const b = backdrop || document.getElementById('navDrawerBackdrop');
    if (!d || !b) return;
    d.classList.add('is-open');
    b.classList.add('is-open');
    d.setAttribute('aria-hidden', 'false');
    b.setAttribute('aria-hidden', 'false');
    if (openBtn) openBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    const d = drawer || document.getElementById('navDrawer');
    const b = backdrop || document.getElementById('navDrawerBackdrop');
    if (!d || !b) return;
    d.classList.remove('is-open');
    b.classList.remove('is-open');
    d.setAttribute('aria-hidden', 'true');
    b.setAttribute('aria-hidden', 'true');
    if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  // Expose globally for inline onclick fallbacks
  window.openNavDrawer = openDrawer;
  window.closeNavDrawer = closeDrawer;

  if (openBtn) openBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  // Document-level delegated click listener for robustness
  document.addEventListener('click', (e) => {
    if (e.target.closest('#openNavDrawer, .header-menu-btn')) {
      e.preventDefault();
      openDrawer();
    } else if (e.target.closest('#closeNavDrawer, .nav-drawer-close')) {
      e.preventDefault();
      closeDrawer();
    }
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const d = drawer || document.getElementById('navDrawer');
      if (d && d.classList.contains('is-open')) {
        closeDrawer();
      }
    }
  });

  // Close when any drawer navigation link is clicked
  if (drawer) {
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });
  }

  // Smooth scroll to top when clicking Home link while already on home page
  document.querySelectorAll('a[href="index.html"], a[href="./"], a[href="/"], .footer-emblem-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const path = (window.location.pathname || '').replace(/\/+$/, '') || '/';
      const isHome = document.body.classList.contains('homepage') ||
                     path === '/' ||
                     path.endsWith('/index.html') ||
                     path.endsWith('/index');
      if (isHome && (!link.hash || link.hash === '#')) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        closeDrawer();
      }
    });
  });

  // Support direct test query parameters (?drawer=1, ?scrolled=1)
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('drawer') === '1') {
      setTimeout(openDrawer, 120);
    }
    if (params.get('scrolled') === '1') {
      if (header) header.classList.add('is-scrolled');
      window.scrollTo(0, 300);
    }
  } catch (err) {}
})();

/* ==========================================================================
   Plantae World — Global Consultation Modal Controller
   Provides the complimentary site visit / quote modal card across all pages.
   ========================================================================== */
(function initGlobalConsultModal() {
  function injectModalHTML() {
    if (document.getElementById('consultModal')) return;

    var backdrop = document.createElement('div');
    backdrop.className = 'consult-modal-backdrop';
    backdrop.id = 'consultModalBackdrop';
    backdrop.setAttribute('aria-hidden', 'true');
    backdrop.onclick = window.closeConsultModal;

    var modal = document.createElement('div');
    modal.className = 'consult-modal';
    modal.id = 'consultModal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'consultModalTitle');
    modal.setAttribute('aria-hidden', 'true');

    modal.innerHTML = 
      '<div class="consult-modal-card">' +
        '<button class="consult-modal-close" type="button" aria-label="Close consultation modal" onclick="closeConsultModal()">' +
          '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>' +
        '</button>' +
        '<div class="consult-modal-header">' +
          '<p class="kicker">Complimentary Onsite Consultation</p>' +
          '<h2 class="consult-modal-title" id="consultModalTitle">Schedule a <em>Site Visit</em></h2>' +
          '<p class="consult-modal-subtitle">' +
            'Our principal landscape architects visit your property across Mumbai, Alibaug, and the Western Ghats at zero charge to assess sunlight, drainage, soil conditions, and architectural potential.' +
          '</p>' +
        '</div>' +
        '<form class="consult-modal-form" id="consultationModalForm" data-consultation-form action="https://api.web3forms.com/submit" method="POST">' +
          '<input type="hidden" name="access_key" value="760f1a7f-5c61-480c-81d3-ba9c7e1a1189" />' +
          '<input type="hidden" name="subject" value="New Consultation Request — Plantae World" />' +
          '<input type="hidden" name="from_name" value="Plantae World Website" />' +
          '<input type="checkbox" name="botcheck" class="hidden" style="display: none;" />' +
          '<div class="field">' +
            '<label for="modal-name">Your Name</label>' +
            '<input id="modal-name" name="Name" autocomplete="name" placeholder="Full name" minlength="2" maxlength="80" required />' +
          '</div>' +
          '<div class="field">' +
            '<label for="modal-phone">Phone Number</label>' +
            '<input id="modal-phone" type="tel" name="Phone" autocomplete="tel" inputmode="tel" placeholder="+91 00000 00000" maxlength="20" pattern="^(\\+?[0-9\\s\\-()]{7,20})$" title="Please enter a valid phone number" required />' +
          '</div>' +
          '<div class="field full">' +
            '<label for="modal-email">Email Address</label>' +
            '<input id="modal-email" type="email" name="Email" autocomplete="email" placeholder="name@domain.com" maxlength="100" required />' +
          '</div>' +
          '<div class="field">' +
            '<label for="modal-city">Project Location</label>' +
            '<input id="modal-city" name="Location" placeholder="Neighbourhood / City (e.g. Worli, Alibaug, Lonavala)" maxlength="100" required />' +
          '</div>' +
          '<div class="field">' +
            '<label for="modal-scope">Discipline / Project Type</label>' +
            '<select id="modal-scope" name="Enquiry type">' +
              '<option>Full Design &amp; Build (Turnkey Architecture)</option>' +
              '<option>Apartment &amp; High-Rise Balcony Design</option>' +
              '<option>Expert Plant Selection &amp; Botanical Curation</option>' +
              '<option>Vertical Living Green Wall</option>' +
              '<option>Terrace or Penthouse Sky Garden</option>' +
              '<option>Water Feature, Waterfall or Smart Irrigation</option>' +
              '<option>Country Estate / Farmhouse Grounds</option>' +
              '<option>Annual Horticultural Stewardship &amp; AMC</option>' +
            '</select>' +
          '</div>' +
          '<div class="field full">' +
            '<label for="modal-message">About Your Space &amp; Requirements</label>' +
            '<textarea id="modal-message" name="Project details" rows="3" placeholder="Approximate area, current stage of construction or renovation, and design goals." maxlength="2000"></textarea>' +
          '</div>' +
          '<div class="field full consult-form-submit-row">' +
            '<button class="submit" type="submit">Submit Request</button>' +
            '<a class="whatsapp-contact" href="https://wa.me/917400077765?text=Hi%20Plantae%20World%2C%20I%20would%20like%20to%20schedule%20a%20complimentary%20onsite%20consultation" target="_blank" rel="noopener noreferrer">' +
              '<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>' +
              '<span>Prefer WhatsApp? Message directly</span>' +
            '</a>' +
          '</div>' +
        '</form>' +
      '</div>';

    document.body.appendChild(backdrop);
    document.body.appendChild(modal);
    bindModalFormSubmit(modal.querySelector('#consultationModalForm'));
  }

  function bindModalFormSubmit(form) {
    if (!form || form.dataset.bound === 'true') return;
    form.dataset.bound = 'true';

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var submitBtn = form.querySelector('button[type="submit"]');
      var originalText = submitBtn ? submitBtn.textContent : 'Submit Request';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting Request...';
      }

      var formData = new FormData(form);

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        if (data.success) {
          form.reset();
          if (submitBtn) {
            submitBtn.textContent = 'Request Sent!';
            submitBtn.style.background = '#243c28';
          }
          var card = form.closest('.consult-modal-card');
          if (card) {
            var oldConf = card.querySelector('.consult-confirmation-view');
            if (oldConf) oldConf.remove();

            var confirmation = document.createElement('div');
            confirmation.className = 'consult-confirmation-view';
            confirmation.style.cssText = 'padding: 40px 10px; text-align: center;';
            confirmation.innerHTML = 
              '<div style="width: 52px; height: 52px; border-radius: 50%; background: #eef6f0; color: #243c28; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">' +
                '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>' +
              '</div>' +
              '<h3 style="font-family: var(--serif, Georgia, serif); font-size: 1.9rem; margin: 0 0 10px; color: #162619; font-weight: 500;">Consultation Request Received</h3>' +
              '<p style="font-size: 0.96rem; color: #4a5d4d; line-height: 1.6; max-width: 480px; margin: 0 auto 24px;">Thank you! Your project details have been received. Shruti and our principal landscape architects will review your space and be in touch within 24 hours.</p>' +
              '<div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">' +
                '<button type="button" class="button fill" onclick="closeConsultModal()" style="min-height: 44px; padding: 0 24px; background: #243c28; color: #fff; border: none; cursor: pointer;">Close Window</button>' +
                '<a class="button glass" href="https://wa.me/917400077765?text=Hello%20Plantae%20World!%20I%20just%20submitted%20a%20site%20visit%20request%20on%20your%20website." target="_blank" rel="noopener noreferrer" style="min-height: 44px; padding: 12px 22px; color: #162619; border: 1px solid rgba(22,38,25,0.3); text-decoration: none; display: inline-flex; align-items: center;">Need Instant Reply? WhatsApp Us</a>' +
              '</div>';
            form.style.display = 'none';
            card.appendChild(confirmation);
          }
        } else {
          throw new Error(data.message || 'Submission failed');
        }
      })
      .catch(function(err) {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
        var errorBanner = form.querySelector('.consult-error-banner');
        if (!errorBanner) {
          errorBanner = document.createElement('p');
          errorBanner.className = 'consult-error-banner';
          errorBanner.style.cssText = 'color: #a02b18; font-size: 0.85rem; margin-top: 12px; text-align: center; line-height: 1.5; width: 100%;';
          form.appendChild(errorBanner);
        }
        errorBanner.innerHTML = 'There was a network issue. Please message us directly on WhatsApp at <a href="https://wa.me/917400077765" target="_blank" rel="noopener noreferrer" style="text-decoration: underline; font-weight: 600; color: inherit;">+91 74000 77765</a> or email <a href="mailto:shruti@plantaeworld.com" style="text-decoration: underline; color: inherit;">shruti@plantaeworld.com</a>.';
      });
    });
  }

  function openConsultModal(scopeValue) {
    injectModalHTML();
    var m = document.getElementById('consultModal');
    var b = document.getElementById('consultModalBackdrop');
    if (m && b) {
      if (typeof window.closeNavDrawer === 'function') {
        window.closeNavDrawer();
      }

      // Reset confirmation view if reopened
      var card = m.querySelector('.consult-modal-card');
      var form = m.querySelector('#consultationModalForm');
      var conf = card ? card.querySelector('.consult-confirmation-view') : null;
      if (conf) conf.remove();
      if (form) form.style.display = 'grid';

      if (scopeValue && form) {
        var select = form.querySelector('#modal-scope');
        if (select) {
          for (var i = 0; i < select.options.length; i++) {
            if (select.options[i].text.toLowerCase().indexOf(scopeValue.toLowerCase()) !== -1 || 
                select.options[i].value.toLowerCase().indexOf(scopeValue.toLowerCase()) !== -1) {
              select.selectedIndex = i;
              break;
            }
          }
        }
      }

      m.classList.add('is-open');
      m.setAttribute('aria-hidden', 'false');
      b.classList.add('is-open');
      b.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      var firstInput = m.querySelector('input:not([type="hidden"])');
      if (firstInput) setTimeout(function() { firstInput.focus(); }, 120);
    }
  }

  function closeConsultModal() {
    var m = document.getElementById('consultModal');
    var b = document.getElementById('consultModalBackdrop');
    if (m && b) {
      m.classList.remove('is-open');
      m.setAttribute('aria-hidden', 'true');
      b.classList.remove('is-open');
      b.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  window.openConsultModal = openConsultModal;
  window.closeConsultModal = closeConsultModal;

  // Global delegated click listener: intercepts any link or button for consultation/site visit
  document.addEventListener('click', function(e) {
    var trigger = e.target.closest('a[href*="consultation.html"], button.drawer-quote-btn, .js-open-consult, [data-open-consult-modal]');
    if (trigger) {
      e.preventDefault();
      var scope = trigger.getAttribute('data-scope') || '';
      openConsultModal(scope);
    }
  });

  // Close modal on Escape
  window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeConsultModal();
    }
  });

  // Ensure modal elements are ready when DOM loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectModalHTML);
  } else {
    injectModalHTML();
  }
})();
