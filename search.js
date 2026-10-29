/**
 * Plantae World — Site Search
 * Adds a search icon to the header (and Ctrl/⌘+K or "/" shortcut) that opens a
 * full-screen search over window.PLANTAE_SEARCH_INDEX (see search-index.js).
 * Also handles "arrival" behaviour: scrolling to and highlighting the section a
 * search result points to, including the Design & Build process tabs.
 */
(function () {
  'use strict';

  var INDEX = window.PLANTAE_SEARCH_INDEX || [];
  var STOP = { the:1, a:1, an:1, for:1, in:1, to:1, of:1, and:1, my:1, i:1, we:1, want:1, need:1, do:1, does:1, you:1, your:1, how:1, can:1, me:1, with:1, on:1, at:1, is:1, are:1, what:1, get:1, looking:1, find:1, near:1, please:1, would:1, like:1, have:1, help:1, some:1 };
  var CHIPS = ['Terrace garden', 'Balcony garden', 'Vertical garden', 'Irrigation', 'Garden maintenance', 'Lighting', 'Get a quote'];
  var POPULAR_TITLES = ['Request a Call & Quote', 'Terrace & Sky Gardens', 'Balcony Gardens', 'Vertical Living Walls', 'Annual Maintenance (AMC)', 'Our Projects & Portfolio'];

  /* ------------------------------------------------------------ text helpers */
  function norm(s) {
    return String(s || '').toLowerCase().replace(/&amp;/g, ' ').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  }
  function stem(w) {
    if (w.length > 5 && /ing$/.test(w)) return w.slice(0, -3);
    if (w.length > 4 && /ies$/.test(w)) return w.slice(0, -3) + 'y';
    if (w.length > 4 && /es$/.test(w)) return w.slice(0, -2);
    if (w.length > 3 && /s$/.test(w)) return w.slice(0, -1);
    return w;
  }
  function words(s) {
    return norm(s).split(' ').filter(Boolean).map(stem);
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function editDistance(a, b, max) {
    if (Math.abs(a.length - b.length) > max) return max + 1;
    var prev = [], cur = [], i, j;
    for (j = 0; j <= b.length; j++) prev[j] = j;
    for (i = 1; i <= a.length; i++) {
      cur = [i];
      var rowMin = i;
      for (j = 1; j <= b.length; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        if (cur[j] < rowMin) rowMin = cur[j];
      }
      if (rowMin > max) return max + 1;
      prev = cur;
    }
    return prev[b.length];
  }

  /* ----------------------------------------------------------- prepared index */
  var prepared = INDEX.map(function (e) {
    var tw = words(e.t), kw = words(e.k || '');
    var rawAll = norm(e.t + ' ' + (e.k || '')).split(' ').filter(Boolean);
    return {
      e: e,
      titleWords: tw,
      kwWords: kw,
      rawAll: rawAll,
      rawText: ' ' + rawAll.join(' ') + ' ',
      kwText: ' ' + kw.join(' ') + ' ',
      titleText: ' ' + tw.join(' ') + ' ',
      descText: norm(e.d),
      descWords: norm(e.d).split(' ').filter(Boolean),
      all: tw.concat(kw)
    };
  });

  /* tok = { raw: what was typed, st: stemmed form }. Works from the first letter. */
  function scoreToken(p, tok) {
    var best = 0, i, w, r = tok.raw, s = tok.st;
    // Title words: exact, then prefix (even a single letter), then inside-word
    for (i = 0; i < p.titleWords.length; i++) {
      w = p.titleWords[i];
      if (w === s || w === r) best = Math.max(best, 12);
      else if (w.indexOf(r) === 0 || w.indexOf(s) === 0) best = Math.max(best, r.length > 1 ? 8 : 4);
      else if (r.length > 2 && w.indexOf(r) !== -1) best = Math.max(best, 4);
    }
    // Keyword words (stemmed list)
    for (i = 0; i < p.kwWords.length; i++) {
      w = p.kwWords[i];
      if (w === s || w === r) best = Math.max(best, 9);
      else if (w.indexOf(r) === 0 || w.indexOf(s) === 0) best = Math.max(best, r.length > 1 ? 6 : 2);
    }
    // Raw keywords: catches half-typed words like "lightin" or "gardeni", and words inside words
    for (i = 0; i < p.rawAll.length; i++) {
      w = p.rawAll[i];
      if (w.indexOf(r) === 0) best = Math.max(best, r.length > 1 ? 6 : 2);
      else if (r.length > 2 && w.indexOf(r) !== -1) best = Math.max(best, 3);
    }
    // Description words
    if (best < 2) {
      for (i = 0; i < p.descWords.length; i++) {
        if (p.descWords[i].indexOf(r) === 0 || (r.length > 3 && p.descWords[i].indexOf(r) !== -1)) { best = 2; break; }
      }
    }
    // Typos
    if (best === 0 && r.length >= 4) {
      var max = r.length >= 8 ? 2 : 1;
      for (i = 0; i < p.all.length; i++) {
        if (p.all[i].length >= 4 && editDistance(s, p.all[i], max) <= max) { best = 3; break; }
      }
      if (best === 0) {
        for (i = 0; i < p.rawAll.length; i++) {
          if (p.rawAll[i].length >= 4 && editDistance(r, p.rawAll[i], max) <= max) { best = 3; break; }
        }
      }
    }
    return best;
  }

  function search(query) {
    var q = norm(query);
    if (!q) return [];
    var parts = q.split(' ').filter(Boolean);
    var meaningful = parts.filter(function (t) { return !STOP[t]; });
    // Keep a short prefix when it is the only search term, but ignore filler in a full question.
    if (!meaningful.length) meaningful = parts;
    var toks = meaningful.map(function (t) { return { raw: t, st: stem(t) }; });
    var qStem = toks.map(function (t) { return t.st; }).join(' ');
    var strict = [], loose = [];
    prepared.forEach(function (p) {
      var total = 0, matched = 0;
      toks.forEach(function (t) {
        var s = scoreToken(p, t);
        if (s > 0) { matched++; total += s; }
      });
      if (!matched) return;
      if (toks.length > 1 && (p.titleText.indexOf(' ' + qStem + ' ') !== -1 || p.kwText.indexOf(' ' + qStem + ' ') !== -1)) total += 12;
      if (matched === toks.length) strict.push({ p: p, s: total + matched * 2 });
      else if (matched >= Math.ceil(toks.length * 0.6) && total >= 5) loose.push({ p: p, s: total * matched / toks.length });
    });
    strict.sort(function (a, b) { return b.s - a.s; });
    loose.sort(function (a, b) { return b.s - a.s; });
    // Every full match first, then partial matches, so nothing relevant is hidden
    return strict.concat(loose).slice(0, 12).map(function (r) { return r.p.e; });
  }

  /* ------------------------------------------------------------ navigation */
  function currentPage() {
    var seg = (location.pathname.split('/').pop() || 'index').replace(/\.html$/, '');
    return seg || 'index';
  }
  function parseTarget(u) {
    var hashIdx = u.indexOf('#');
    var hash = hashIdx > -1 ? u.slice(hashIdx) : '';
    var page = (hashIdx > -1 ? u.slice(0, hashIdx) : u).replace(/\.html$/, '');
    return { page: page || 'index', hash: hash };
  }
  function go(entry) {
    if (entry.a === 'quote') {
      close();
      if (window.openConsultModal) window.openConsultModal(entry.s || '');
      else window.location.href = 'contact.html';
      return;
    }
    var t = parseTarget(entry.u);
    if (t.page === currentPage()) {
      close();
      arrive(entry.hl || '', t.hash);
      if (t.hash && history.replaceState) history.replaceState(null, '', t.hash);
      return;
    }
    var url = t.page + '.html' + (entry.hl ? '?hl=' + encodeURIComponent(entry.hl) : '') + t.hash;
    window.location.href = url;
  }

  /* -------------------------------------------------------- arrival behaviour */
  function flash(el) {
    if (!el) return;
    var card = el.closest('.service-card, article, .hp-card, .db-step-card, .category-card') || el;
    card.classList.add('ps-flash');
    setTimeout(function () { card.classList.remove('ps-flash'); }, 2800);
  }
  function scrollToEl(el) {
    var header = document.querySelector('.site-header');
    var offset = (header ? header.offsetHeight : 0) + 24;
    var top = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: top, behavior: 'smooth' });
  }
  function arrive(hl, hash) {
    var target = null;

    // Portfolio results point to their actual cards, including when a filter was selected.
    if (hl && currentPage() === 'selected-works') {
      var cards = document.querySelectorAll('.project-card[data-project-title]');
      for (var j = 0; j < cards.length; j++) {
        if (norm(cards[j].getAttribute('data-project-title')) === norm(hl)) {
          var allFilter = document.querySelector('.portfolio-filter-btn[data-filter="all"]');
          if (allFilter) allFilter.click();
          target = cards[j];
          break;
        }
      }
    }

    // Design & Build process tabs: #track-<name> switches to that tab
    if (hash && /^#track-/.test(hash)) {
      var key = hash.replace('#track-', '');
      var tab = document.querySelector('.db-track-tab[data-track-target="' + key + '"]');
      if (tab) {
        tab.click();
        target = document.getElementById('process-journey');
      }
    }
    if (!target && hl) {
      var needle = norm(hl);
      var heads = document.querySelectorAll('h1, h2, h3, h4, .service-title, .cluster-title, .arrangement-title');
      for (var i = 0; i < heads.length; i++) {
        if (norm(heads[i].textContent).indexOf(needle) !== -1) { target = heads[i]; break; }
      }
    }
    if (!target && hash && hash.length > 1) {
      try { target = document.querySelector(hash); } catch (e) { target = null; }
    }
    if (target) {
      setTimeout(function () { scrollToEl(target); if (hl) flash(target); }, 350);
    }
  }
  function arriveFromUrl() {
    var params = new URLSearchParams(location.search);
    var hl = params.get('hl') || '';
    if (hl || /^#track-/.test(location.hash)) {
      var run = function () { arrive(hl, location.hash); };
      if (document.readyState === 'complete') setTimeout(run, 400);
      else window.addEventListener('load', function () { setTimeout(run, 400); });
    }
  }

  /* ------------------------------------------------------------------- UI */
  var overlay, input, resultsEl, hintEl, activeIdx = -1, current = [], lastFocus = null;

  function build() {
    if (overlay) return;
    overlay = document.createElement('div');
    overlay.className = 'ps-overlay';
    overlay.id = 'siteSearchOverlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Search Plantae World');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML =
      '<div class="ps-panel">' +
        '<div class="ps-bar">' +
          '<svg class="ps-bar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>' +
          '<input id="siteSearchInput" class="ps-input" type="search" autocomplete="off" spellcheck="false" placeholder="Search services, e.g. terrace garden, waterfall, maintenance…" aria-label="Search the site" aria-controls="siteSearchResults" />' +
          '<button class="ps-close" type="button" aria-label="Close search">Esc</button>' +
        '</div>' +
        '<div class="ps-body">' +
          '<div class="ps-chips" id="siteSearchChips"></div>' +
          '<ul class="ps-results" id="siteSearchResults" role="listbox"></ul>' +
          '<p class="ps-hint" id="siteSearchHint"></p>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);

    input = overlay.querySelector('#siteSearchInput');
    resultsEl = overlay.querySelector('#siteSearchResults');
    hintEl = overlay.querySelector('#siteSearchHint');

    var chipsEl = overlay.querySelector('#siteSearchChips');
    chipsEl.innerHTML = CHIPS.map(function (c) {
      return '<button type="button" class="ps-chip" data-q="' + esc(c) + '">' + esc(c) + '</button>';
    }).join('');

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay || e.target.closest('.ps-close')) { close(); return; }
      var chip = e.target.closest('.ps-chip');
      if (chip) {
        input.value = chip.getAttribute('data-q');
        render();
        input.focus();
        return;
      }
      var li = e.target.closest('.ps-result');
      if (li) go(current[+li.getAttribute('data-i')]);
    });
    overlay.addEventListener('mousemove', function (e) {
      var li = e.target.closest('.ps-result');
      if (li) setActive(+li.getAttribute('data-i'));
    });
    input.addEventListener('input', render);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive(Math.min(activeIdx + 1, current.length - 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(Math.max(activeIdx - 1, 0)); }
      else if (e.key === 'Enter') {
        e.preventDefault();
        if (current[activeIdx]) go(current[activeIdx]);
      }
    });
    overlay.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.stopPropagation(); close(); }
      if (e.key === 'Tab') {
        var f = overlay.querySelectorAll('input, button, a');
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  function setActive(i) {
    activeIdx = i;
    var items = resultsEl.querySelectorAll('.ps-result');
    items.forEach(function (el, n) {
      var on = n === i;
      el.classList.toggle('is-active', on);
      el.setAttribute('aria-selected', on ? 'true' : 'false');
      if (on && el.scrollIntoView) el.scrollIntoView({ block: 'nearest' });
    });
  }

  function highlight(text, toks) {
    var out = esc(text);
    toks.forEach(function (t) {
      if (t.length < 3) return;
      try {
        out = out.replace(new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark>$1</mark>');
      } catch (e) {}
    });
    return out;
  }

  function resultHTML(e, i, toks) {
    var arrow = e.a === 'quote' ? 'phone' : 'arrow';
    var icon = arrow === 'phone'
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
    return '<li class="ps-result" role="option" data-i="' + i + '" aria-selected="false">' +
      '<div class="ps-result-main">' +
        '<div class="ps-result-heading"><span class="ps-title">' + highlight(e.t, toks) + '</span>' +
        '<span class="ps-cat">' + esc(e.c) + '</span></div>' +
        '<span class="ps-desc">' + esc(e.d) + '</span>' +
      '</div>' +
    '</li>';
  }

  function render() {
    var q = input.value;
    var toks = norm(q).split(' ').filter(Boolean);
    var chipsEl = overlay.querySelector('#siteSearchChips');

    if (!norm(q)) {
      chipsEl.style.display = '';
      current = POPULAR_TITLES.map(function (t) {
        return INDEX.filter(function (e) { return e.t === t; })[0];
      }).filter(Boolean);
      resultsEl.innerHTML = '<li class="ps-group-label" aria-hidden="true">Popular</li>' +
        current.map(function (e, i) { return resultHTML(e, i, []); }).join('');
      hintEl.textContent = 'Try “rooftop”, “pond”, “gardener”, “pest control” or “price”.';
      setActive(-1);
      return;
    }

    chipsEl.style.display = 'none';
    current = search(q);
    if (!current.length) {
      resultsEl.innerHTML =
        '<li class="ps-empty">' +
          '<p>No exact match for “' + esc(q) + '”.</p>' +
          '<p class="ps-empty-sub">Tell us what you have in mind and a Plantae specialist will call you with a quote.</p>' +
          '<div class="ps-empty-actions">' +
            '<button type="button" class="ps-btn" id="psEmptyQuote">Request a Call &amp; Quote</button>' +
            '<a class="ps-btn ps-btn-ghost" href="services.html">Browse all services</a>' +
          '</div>' +
        '</li>';
      var b = resultsEl.querySelector('#psEmptyQuote');
      if (b) b.addEventListener('click', function () { close(); if (window.openConsultModal) window.openConsultModal(); });
      hintEl.textContent = '';
      setActive(-1);
      return;
    }
    resultsEl.innerHTML = current.map(function (e, i) { return resultHTML(e, i, toks); }).join('');
    hintEl.textContent = '↑ ↓ to move · Enter to open · Esc to close';
    setActive(0);
  }

  function open(prefill) {
    build();
    lastFocus = document.activeElement;
    if (typeof window.closeNavDrawer === 'function') window.closeNavDrawer();
    if (typeof window.closeConsultModal === 'function') window.closeConsultModal();
    input.value = prefill || '';
    render();
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { input.focus(); }, 60);
  }
  function close() {
    if (!overlay || !overlay.classList.contains('is-open')) return;
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) {} }
  }
  window.openSiteSearch = open;
  window.closeSiteSearch = close;

  /* -------------------------------------------------- header button & hotkeys */
  function injectHeaderButton() {
    var actions = document.querySelector('.site-header .header-actions');
    if (!actions || actions.querySelector('.header-search-btn')) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'header-action-btn header-search-btn';
    btn.setAttribute('aria-label', 'Search the site');
    btn.setAttribute('aria-haspopup', 'dialog');
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>';
    actions.insertBefore(btn, actions.firstChild);
  }

  document.addEventListener('click', function (e) {
    if (e.target.closest('.header-search-btn, [data-open-search]')) {
      e.preventDefault();
      open();
    }
  });
  document.addEventListener('keydown', function (e) {
    var tag = (e.target && e.target.tagName) || '';
    var typing = /INPUT|TEXTAREA|SELECT/.test(tag) || (e.target && e.target.isContentEditable);
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      open();
    } else if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) {
      e.preventDefault();
      open();
    }
  });

  function init() {
    injectHeaderButton();
    arriveFromUrl();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
