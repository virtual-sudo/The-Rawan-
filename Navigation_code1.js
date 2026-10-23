/* =====================================================================
   THE RAWAN | Script 1: Core Shell (3DVista Injected Edition - Fix)
   Top bar, bottom thumbnail strip, scene list, and sidebar navigation.

   - The bottom pill dock is the default scene navigator.

   NOTE: 3DVista injects this script as an escaped string, which strips
   every backslash. Never use backslashes anywhere in this file.
   ===================================================================== */
(function () {

  /* ---------------------------------------------------------------
     1. SETTINGS & MANUAL SCENE LIST
     --------------------------------------------------------------- */
  var CONFIG = {
    logo: 'https://github.com/virtual-sudo/The-Rawan-/blob/main/Rawan%20Logo%20-%20Full%20Color_The%20Rawan%20Logo%20H%20-%20Gold.png?raw=true',   // Gold Logo URL
    logoText: 'The Rawan',
    credit: 'A Prestige Green Development by ARTHALAND'
  };

  /*
     Custom list of estate panoramas matched to their exact 3DVista indices.
     Optional `thumb`: image URL for the strip. Without it, the panorama's own
     3DVista thumbnail is used, and failing that a branded placeholder.
  */
  var CUSTOM_PANORAMAS = [
    { index: 0, title: 'EL NIDO' },
    { index: 1, title: 'WATERFALL OASIS' },
    { index: 2, title: 'DROP OFF' },
    { index: 3, title: 'COMMUNITY COURT' },
    { index: 4, title: 'WATERFALL OASIS' },
    { index: 5, title: 'RIVERINE WALK' },
    { index: 6, title: 'EL NIDO 2' },
    { index: 7, title: 'LIMESTONE TERRACE' },
    { index: 8, title: 'PLAY CANYON' }
  ];

  var TITLES = {
    scenes: 'Explore the estate',
    overview: 'Overview',
    units: 'Units'
  };

  /* Brand colours and fonts */
  var INK = '#2A2A38';
  var GOLD = '#C0B177';
  var CREAM = '#ECEBE3';
  var AVOCADO = '#D2DB12';
  var AVOCADO_HOVER = '#C1CA10';
  var SERIF = '"Rawan Sans","Cormorant Garamond",Georgia,serif';
  var SANS = '"DM Sans",system-ui,sans-serif';


  /* ---------------------------------------------------------------
     2. ICONS & PATTERNS
     --------------------------------------------------------------- */
  var STAR =
    '<svg viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">' +
    '<path d="M50 2C50 34 66 50 98 50C66 50 50 66 50 98C50 66 34 50 2 50C34 50 50 34 50 2Z"/></svg>';

  function lineIcon(paths) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + paths + '</svg>';
  }

  var ICONS = {
    overview: lineIcon('<rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><path d="M17 13.5v7M13.5 17h7"/>'),
    units: lineIcon('<path d="M5 21V4.5A1.5 1.5 0 0 1 6.5 3h8A1.5 1.5 0 0 1 16 4.5V21M16 9h2.5A1.5 1.5 0 0 1 20 10.5V21M3 21h18M9 7.5h3M9 11.5h3M9 15.5h3"/>'),
    fullscreen: lineIcon('<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>'),
    exitFullscreen: lineIcon('<path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/>'),
    close: lineIcon('<path d="M6 6l12 12M18 6L6 18"/>'),
    prev: lineIcon('<path d="M15 5l-7 7 7 7"/>'),
    next: lineIcon('<path d="M9 5l7 7-7 7"/>')
  };

  /* Background pattern imported from CODE2 design */
  var PATTERN_SCALE = 0.5;
  var PATTERN_W = 6400;
  var PATTERN_H = 3600;
  var PATTERN_SIZE = (PATTERN_W * PATTERN_SCALE) + 'px ' + (PATTERN_H * PATTERN_SCALE) + 'px';
  var PATTERN_CELL = 'M-28.03 -28.03h56.06v56.06h-56.06zM28.03 28.03A137.58 137.58 0 0 1 178.87 165.46M-28.03 28.03A137.58 137.58 0 0 0 122.81 165.46M28.03 28.03A154.17 154.17 0 0 1 122.81 165.46M28.03 28.03A154.17 154.17 0 0 0 122.81 165.46M28.03 -28.03A137.58 137.58 0 0 1 165.46 -178.87M28.03 28.03A137.58 137.58 0 0 0 165.46 -122.81M28.03 -28.03A154.17 154.17 0 0 1 165.46 -122.81M28.03 -28.03A154.17 154.17 0 0 0 165.46 -122.81';

  var PATTERN = (function () {
    var ax = 150.84, ay = 193.49;
    var tiles = [];
    for (var m = -30; m <= 30; m++) {
      for (var n = -30; n <= 30; n++) {
        var x = PATTERN_W / 2 + m * ax + n * ay;
        var y = PATTERN_H / 2 + m * ay - n * ax;
        if (x > -230 && x < PATTERN_W + 230 && y > -230 && y < PATTERN_H + 230) {
          tiles.push('<use href="#c" x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '"/>');
        }
      }
    }
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" ' +
      'width="' + (PATTERN_W * PATTERN_SCALE) + '" height="' + (PATTERN_H * PATTERN_SCALE) + '" viewBox="0 0 ' + PATTERN_W + ' ' + PATTERN_H + '">' +
      '<defs><path id="c" d="' + PATTERN_CELL + '"/></defs>' +
      '<g fill="none" stroke="#C0B177" stroke-width="2" opacity=".08">' + tiles.join('') + '</g></svg>';
    return 'url("data:image/svg+xml;utf8,' + encodeURIComponent(svg) + '")';
  })();


  /* ---------------------------------------------------------------
     3. STYLES
     --------------------------------------------------------------- */
  var CSS = '' +
    '#rw {' +
      '--i: ' + INK + '; --g: ' + GOLD + '; --c: ' + CREAM + '; --btn-bg: ' + AVOCADO + '; --btn-hover: ' + AVOCADO_HOVER + ';' +
      '--h: 64px;' +
      '--st: env(safe-area-inset-top, 0px); --sb: env(safe-area-inset-bottom, 0px);' +
      '--ease: cubic-bezier(.23, 1, .32, 1); --ease-drawer: cubic-bezier(.32, .72, 0, 1);' +
      'position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;' +
      'z-index: 999999 !important; pointer-events: none !important;' +
      'font: 400 14px ' + SANS + '; color: var(--c); -webkit-font-smoothing: antialiased;' +
    '}' +
    ':where(#rw) * { box-sizing: border-box; margin: 0; padding: 0; }' +
    ':where(#rw) button {' +
      'font: inherit; color: inherit; background: none; border: 0; cursor: pointer;' +
      'pointer-events: auto; -webkit-tap-highlight-color: transparent;' +
    '}' +
    '#rw :focus-visible { outline: 2px solid var(--btn-bg); }' +
    ':where(#rw) svg { display: block; }' +

    '#rwb {' +
      'position: absolute; top: 0; left: 0; right: 0;' +
      'height: calc(var(--h) + var(--st));' +
      'padding: var(--st) max(16px, env(safe-area-inset-right, 0px)) 0 max(16px, env(safe-area-inset-left, 0px));' +
      'display: flex; align-items: center; justify-content: space-between;' +
      'background: var(--i); border-bottom: 1px solid #C0B17780; pointer-events: auto;' +
    '}' +
    '#rw .rw-left  { display: flex; align-items: center; gap: 16px; min-width: 0; }' +
    '#rw .rw-right { display: flex; align-items: center; justify-content: flex-end; gap: 12px; }' +

    '#rwl {' +
      'display: flex; align-items: center; min-height: 32px; white-space: nowrap;' +
      'color: var(--g); font: 24px ' + SERIF + '; letter-spacing: .08em; text-transform: uppercase;' +
    '}' +
    '#rwl .rw-mark { position: relative; display: block; height: 38px; aspect-ratio: 3.72; }' +
    '#rwl .rw-mark img {' +
      'position: absolute; left: -12.5%; top: 50%; width: 125%; height: auto;' +
      'transform: translateY(-50%); pointer-events: none;' +
    '}' +

    '#rw .rw-tabs {' +
      'display: flex; align-items: center; gap: 2px; padding: 3px;' +
      'border: 1px solid #C0B17780; border-radius: 24px;' +
    '}' +
    '#rw .rw-btn {' +
      'display: flex; align-items: center; justify-content: center; gap: 8px;' +
      'height: 36px; min-width: 36px; padding: 0 16px 0 14px; border-radius: 18px;' +
      'font-size: 12px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; white-space: nowrap;' +
    '}' +
    '#rw .rw-btn svg { width: 18px; height: 18px; flex: none; transition: transform .2s ease; }' +
    '#rw .rw-btn.is-active { background: var(--btn-bg); color: var(--i); }' +

    '#rw .rw-btn.rw-icon { width: 42px; height: 42px; padding: 0; border-radius: 50%; border: 1px solid #C0B17780; }' +

    '#rw .rw-btn {' +
      'transition-property: background-color, color, border-color, transform;' +
      'transition-duration: .2s, .2s, .2s, .16s;' +
    '}' +
    '#rw .rw-btn:active, #rwi button:active { transform: scale(.97); }' +
    '@media (hover: hover) and (pointer: fine) {' +
      '#rw .rw-btn:not(.is-active):hover { background: rgba(210,219,18,0.2); color: var(--btn-bg); }' +
      '#rwi button:hover { background-color: #ECEBE314; }' +
      '#rwi button:hover span { transform: translateX(4px); }' +
      '#rwi button:hover i { opacity: 1; }' +
    '}' +

    '#rwk {' +
      'position: absolute; top: calc(var(--h) + var(--st)); left: 0; right: 0; bottom: 0;' +
      'background: transparent; pointer-events: none;' +
    '}' +
    '#rwk.is-open { pointer-events: auto; }' +

    '#rwd {' +
      'position: absolute; top: calc(var(--h) + var(--st)); bottom: 0; left: 0;' +
      'width: min(340px, 88%);' +
      'display: flex; flex-direction: column; overflow: hidden; pointer-events: auto;' +
      'background: var(--i); border-right: 1px solid #C0B17780;' +
      'border-top-right-radius: 28px;' +
      'transform: translateX(-102%); visibility: hidden;' +
      'transition: transform .28s var(--ease), visibility 0s .28s;' +
      'box-shadow: 12px 0 32px rgba(0,0,0,0.35);' +
    '}' +
    '#rwd.is-open {' +
      'transform: none; visibility: visible;' +
      'transition: transform .45s var(--ease-drawer);' +
    '}' +
    '#rwd::before {' +
      'content: ""; position: absolute; inset: 0; pointer-events: none;' +
      'background: ' + PATTERN + ' 50% 50% / ' + PATTERN_SIZE + ' no-repeat;' +
      '-webkit-mask-image: linear-gradient(180deg, #000, transparent 55%);' +
              'mask-image: linear-gradient(180deg, #000, transparent 55%);' +
    '}' +

    '#rwh { position: relative; padding: 22px 24px 18px 24px; border-bottom: 1px solid #C0B17780; }' +
    '#rwh h3 { font: 400 20px ' + SERIF + '; letter-spacing: .1em; text-transform: uppercase; color: var(--g); }' +

    '#rwi, #rwc {' +
      'position: relative; flex: 1; overflow: auto; overscroll-behavior: contain;' +
      'scrollbar-width: thin; scrollbar-color: #D2DB1259 transparent;' +
    '}' +
    '#rwd[data-mode=scenes] #rwc,' +
    '#rwd:not([data-mode=scenes]) #rwi { display: none; }' +
    '#rwi { padding: 10px; }' +
    '#rwc { padding: 18px 24px 24px; }' +

    '#rwi button {' +
      'position: relative; display: grid; grid-template-columns: 30px 1fr 11px; align-items: center;' +
      'width: 100%; min-height: 46px; padding: 8px 12px; border-radius: 10px;' +
      'text-align: left; font-size: 13px; transition: background-color .2s ease;' +
    '}' +
    '#rwi button i { font-style: normal; font-size: 11px; letter-spacing: .08em; opacity: .7; font-variant-numeric: tabular-nums; }' +
    '#rwi button span { transition: transform .3s var(--ease); }' +
    '#rwi button svg {' +
      'width: 11px; color: var(--btn-bg); opacity: 0; transform: scale(.6) rotate(-45deg);' +
      'transition: opacity .3s, transform .4s var(--ease);' +
    '}' +
    '#rwi .is-current { color: var(--btn-bg); font-weight: 600; }' +
    '#rwi .is-current i { opacity: 1; }' +
    '#rwi .is-current svg { opacity: 1; transform: none; }' +
    '#rwd.is-open #rwi button { animation: rw-slide-in .45s var(--ease) both; }' +
    '@keyframes rw-slide-in { from { opacity: 0; transform: translateX(-12px); } }' +

    '#rwd p.rw-credit {' +
      'position: relative; display: flex; align-items: center; gap: 10px;' +
      'padding: 12px 24px calc(18px + env(safe-area-inset-bottom, 0px));' +
      'font-size: 10px; line-height: 1.7; letter-spacing: .1em; text-transform: uppercase;' +
      'color: #ECEBE3d9; border-top: 1px solid #C0B17740;' +
    '}' +
    '#rwd p.rw-credit svg { width: 8px; flex: none; color: var(--btn-bg); }' +

    /* Bottom pill dock */
    '#rws {' +
      '--ph: 46px; --gap: 18px;' +
      'position: absolute; left: 50%; bottom: calc(var(--gap) + var(--sb));' +
      'max-width: min(1000px, calc(100% - 2 * var(--gap)));' +
      'display: flex; justify-content: center;' +
      'transform: translateX(-50%);' +
      'transition: transform .5s var(--ease-drawer), opacity .35s ease .1s, visibility 0s 0s;' +
    '}' +
    '#rw.has-drawer #rws, #rws.is-hidden {' +
      'opacity: 0; visibility: hidden; transform: translate(-50%, 32px);' +
      'transition: transform .35s var(--ease), opacity .2s ease, visibility 0s .35s;' +
    '}' +

    '#rws .rw-strip {' +
      'position: relative; max-width: 100%; display: flex; align-items: center; gap: 4px;' +
      'padding: 7px; border-radius: 999px; pointer-events: auto;' +
      'background: rgba(30, 31, 46, 0.72);' +
      'border: 1px solid rgba(255,255,255,.18);' +
      '-webkit-backdrop-filter: blur(28px) saturate(1.8); backdrop-filter: blur(28px) saturate(1.8);' +
      'box-shadow: 0 18px 48px rgba(10,10,20,.35), 0 2px 6px rgba(10,10,20,.2);' +
    '}' +
    '@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {' +
      '#rws .rw-strip { background: rgba(42,42,56,.92); }' +
    '}' +

    '#rws .rw-track {' +
      'position: relative; flex: 1; min-width: 0; display: flex; gap: 6px;' +
      'overflow-x: auto; overflow-y: hidden; scroll-snap-type: x proximity; scroll-behavior: smooth;' +
      'overscroll-behavior-x: contain; scrollbar-width: none; padding: 2px; border-radius: 999px;' +
      '--fl: 0px; --fr: 0px;' +
      '-webkit-mask-image: linear-gradient(90deg, transparent, #000 var(--fl), #000 calc(100% - var(--fr)), transparent);' +
              'mask-image: linear-gradient(90deg, transparent, #000 var(--fl), #000 calc(100% - var(--fr)), transparent);' +
    '}' +
    '#rws .rw-track::-webkit-scrollbar { display: none; }' +
    '#rws .rw-track.can-l { --fl: 28px; }' +
    '#rws .rw-track.can-r { --fr: 28px; }' +

    '#rws .rw-arrow {' +
      'flex: none; width: var(--ph); height: var(--ph); border-radius: 50%; display: grid; place-items: center;' +
      'background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.16); color: var(--c);' +
      'transition: background-color .2s, color .2s, opacity .2s, transform .16s;' +
    '}' +
    '#rws .rw-arrow svg { width: 16px; height: 16px; }' +
    '#rws .rw-arrow:disabled { opacity: .3; cursor: default; }' +
    '#rws .rw-arrow:not(:disabled):active { transform: scale(.94); }' +
    '#rws.no-overflow .rw-arrow { display: none; }' +
    '#rws.no-overflow .rw-track { justify-content: center; }' +

    '#rws .rw-thumb {' +
      'position: relative; flex: none; height: var(--ph); scroll-snap-align: center;' +
      'display: flex; align-items: center; padding: 0 22px;' +
      'border-radius: 999px; background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.12);' +
      'color: #F5F4EE; font-size: 12px; font-weight: 500; line-height: 1;' +
      'letter-spacing: .1em; text-transform: uppercase; white-space: nowrap;' +
      'text-shadow: 0 1px 2px rgba(0,0,0,.35);' +
      'transition: border-color .25s, background-color .25s, color .25s, box-shadow .25s, transform .16s;' +
    '}' +
    '#rws .rw-thumb:active { transform: scale(.97); }' +
    '#rws .rw-thumb.is-current {' +
      'background: var(--btn-bg); border-color: var(--btn-bg);' +
      'color: var(--i); font-weight: 600; text-shadow: none;' +
      'box-shadow: 0 6px 18px rgba(210,219,18,.35);' +
    '}' +

    '@media (hover: hover) and (pointer: fine) {' +
      '#rws .rw-arrow:not(:disabled):hover { background: rgba(255,255,255,.16); }' +
      '#rws .rw-thumb:not(.is-current):hover { background-color: rgba(255,255,255,.14); border-color: rgba(255,255,255,.26); }' +
    '}' +

    '#rw.is-phone #rwb {' +
      'padding-left: max(8px, env(safe-area-inset-left, 0px));' +
      'padding-right: max(8px, env(safe-area-inset-right, 0px));' +
    '}' +
    '#rw.is-phone .rw-btn span { display: none; }' +
    '#rw.is-phone .rw-right { gap: 6px; }' +
    '#rw.is-phone .rw-btn { padding: 0; }' +
    '#rw.is-phone .rw-tabs { padding: 2px; }' +
    '#rw.is-phone .rw-btn.rw-icon { width: 40px; height: 40px; }' +
    '#rw.is-phone #rwl { font-size: 18px; }' +
    '#rw.is-phone #rwl .rw-mark { height: 30px; }' +
    '#rw.is-phone #rws { --ph: 40px; --gap: 10px; }' +
    '#rw.is-phone #rws .rw-strip { padding: 5px; }' +
    '#rw.is-phone #rws .rw-arrow { display: none; }' +
    '#rw.is-phone #rws .rw-thumb { padding: 0 16px; font-size: 11px; }' +

    '@media (prefers-reduced-motion: reduce) {' +
      '#rwd, #rwd.is-open { transform: none; }' +
      '#rwd { opacity: 0; transition: opacity .2s ease, visibility 0s .2s; }' +
      '#rwd.is-open { opacity: 1; transition: opacity .2s ease; }' +
      '#rw * { animation: none !important; }' +
      '#rwi button span { transform: none !important; }' +
      '#rws { transition: none; }' +
      '#rws .rw-track { scroll-behavior: auto; }' +
    '}';


  /* ---------------------------------------------------------------
     4. SMALL HELPERS
     --------------------------------------------------------------- */
  var doc = document;

  function el(tag, attrs, html) {
    var node = doc.createElement(tag);
    for (var key in attrs || {}) node.setAttribute(key, attrs[key]);
    if (html != null) node.innerHTML = html;
    return node;
  }

  function setText(node, text) {
    node.textContent = text;
    return node;
  }

  function twoDigits(i) {
    return (i < 9 ? '0' : '') + (i + 1);
  }

  function emit(name, detail) {
    doc.dispatchEvent(new CustomEvent(name, { detail: detail }));
  }

  function titleCase(text) {
    return String(text).toLowerCase().replace(/(^| )[^ ]/g, function (c) { return c.toUpperCase(); });
  }


  /* ---------------------------------------------------------------
     5. FIND THE 3DVISTA PLAYLIST
     --------------------------------------------------------------- */
  function findPlaylist() {
    var tour = window.tour;
    if (tour && tour.mainPlayList) return tour.mainPlayList;

    var api = window.TDV && TDV.PlayerAPI;
    var player = (tour && tour.player) ||
      (api && typeof api.getCurrentPlayer === 'function' && api.getCurrentPlayer()) ||
      (api && typeof api.getCurrentPlayers === 'function' && (api.getCurrentPlayers() || [])[0]);
    if (!player) return null;

    if (player.mainPlayList) return player.mainPlayList;
    if (typeof player.getById === 'function') {
      var main = player.getById('mainPlayList');
      if (main) return main;
    }
    if (typeof player.getByClassName === 'function') {
      return (player.getByClassName('PlayList') || [])[0] || null;
    }
    return null;
  }


  /* ---------------------------------------------------------------
     6. BUILD THE UI
     --------------------------------------------------------------- */
  var mounted = false;

  function mount() {
    if (mounted) return;
    var targetBody = doc.body || doc.documentElement;
    if (!targetBody) return;
    mounted = true;

    doc.head.appendChild(setText(el('style'), CSS));
    var FONTS = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap';
    if (!doc.querySelector('link[href="' + FONTS + '"]')) {
      doc.head.appendChild(el('link', { rel: 'stylesheet', href: FONTS }));
    }

    var root = el('div', { id: 'rw' });
    var bar = el('div', { id: 'rwb' });
    var left = el('div', { 'class': 'rw-left' });
    var right = el('div', { 'class': 'rw-right' });

    var logo = el('div', { id: 'rwl' }, CONFIG.logo ? '<span class="rw-mark"><img src="' + CONFIG.logo + '" alt="' + CONFIG.logoText + '" decoding="async"></span>' : '');
    if (!CONFIG.logo) setText(logo, CONFIG.logoText);

    var scrim = el('div', { id: 'rwk' });
    var drawer = el('nav', { id: 'rwd', 'aria-label': 'Tour navigation', 'aria-hidden': 'true' });
    var header = el('div', { id: 'rwh' }, '<h3></h3>');
    var heading = header.querySelector('h3');
    var sceneList = el('div', { id: 'rwi' });
    var content = el('div', { id: 'rwc' });
    var credit = el('p', { 'class': 'rw-credit' }, STAR + '<span></span>');
    setText(credit.lastChild, CONFIG.credit);

    function navButton(iconKey, label, onClick) {
      var b = el('button', { 'class': 'rw-btn', 'aria-label': label, 'data-icon': iconKey }, ICONS[iconKey] + '<span>' + label + '</span>');
      b.onclick = onClick;
      return b;
    }

    var overviewBtn = navButton('overview', 'Overview', function () { toggle('overview', overviewBtn); });
    var unitsBtn = navButton('units', 'Units', function () { toggle('units', unitsBtn); });

    [overviewBtn, unitsBtn].forEach(function (b) {
      b.setAttribute('aria-expanded', 'false');
      b.setAttribute('aria-controls', 'rwd');
    });

    var fullBtn = el('button', { 'class': 'rw-btn rw-icon', 'aria-label': 'Enter fullscreen' }, ICONS.fullscreen);
    var tabs = el('div', { 'class': 'rw-tabs' });

    left.appendChild(logo);

    tabs.appendChild(overviewBtn);
    tabs.appendChild(unitsBtn);
    right.appendChild(tabs);
    right.appendChild(fullBtn);

    bar.appendChild(left);
    bar.appendChild(right);

    drawer.appendChild(header);
    drawer.appendChild(sceneList);
    drawer.appendChild(content);
    drawer.appendChild(credit);

    /* Bottom pill dock */
    var strip = el('div', { id: 'rws' });
    var stripPanel = el('div', { 'class': 'rw-strip', role: 'region', 'aria-label': 'Scenes' });
    var prevBtn = el('button', { 'class': 'rw-arrow', 'aria-label': 'Previous scenes' }, ICONS.prev);
    var nextBtn = el('button', { 'class': 'rw-arrow', 'aria-label': 'More scenes' }, ICONS.next);
    var track = el('div', { 'class': 'rw-track' });

    stripPanel.appendChild(prevBtn);
    stripPanel.appendChild(track);
    stripPanel.appendChild(nextBtn);
    strip.appendChild(stripPanel);

    root.appendChild(bar);
    root.appendChild(strip);
    root.appendChild(scrim);
    root.appendChild(drawer);

    targetBody.appendChild(root);
    fitToScreen(root, 760);


    /* -----------------------------------------------------------
       7. OPEN / CLOSE THE SIDEBAR
       ----------------------------------------------------------- */
    var activeBtn = null;
    var mode = null;

    function setActive(btn, on) {
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-expanded', on ? 'true' : 'false');

      if (btn.classList.contains('rw-btn')) {
        var svgNode = btn.querySelector('svg');
        if (svgNode) {
          var originalIconKey = btn.getAttribute('data-icon');
          svgNode.outerHTML = on ? ICONS.close : ICONS[originalIconKey];
        }
      }
    }

    function close() {
      if (!mode) return;
      var returnFocus = drawer.contains(doc.activeElement) && activeBtn;
      drawer.classList.remove('is-open');
      scrim.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      root.classList.remove('has-drawer');
      if (activeBtn) setActive(activeBtn, false);
      if (returnFocus) activeBtn.focus();
      activeBtn = mode = null;
    }

    function toggle(newMode, btn) {
      if (mode === newMode) return close();
      if (activeBtn) setActive(activeBtn, false);

      activeBtn = btn;
      mode = newMode;
      setActive(btn, true);

      drawer.dataset.mode = newMode === 'scenes' ? 'scenes' : 'content';
      setText(heading, TITLES[newMode]);

      drawer.classList.add('is-open');
      scrim.classList.add('is-open');
      drawer.removeAttribute('aria-hidden');
      root.classList.add('has-drawer');

      if (newMode === 'scenes') {
        var current = sceneList.querySelector('.is-current');
        if (current) current.scrollIntoView({ block: 'center' });
      } else {
        content.innerHTML = '';
        content.scrollTop = 0;
        emit('rw:open', { k: newMode, el: content });
      }
    }

    scrim.onclick = close;
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });


    /* -----------------------------------------------------------
       8. FULLSCREEN
       ----------------------------------------------------------- */
    var html = doc.documentElement;
    var requestFs = html.requestFullscreen || html.webkitRequestFullscreen;
    var exitFs = doc.exitFullscreen || doc.webkitExitFullscreen;

    function fullscreenElement() {
      return doc.fullscreenElement || doc.webkitFullscreenElement || null;
    }

    fullBtn.onclick = function () {
      if (fullscreenElement()) exitFs.call(doc);
      else requestFs.call(html);
    };

    function onFullscreenChange() {
      var fsEl = fullscreenElement();
      var on = !!fsEl;

      fullBtn.innerHTML = on ? ICONS.exitFullscreen : ICONS.fullscreen;
      fullBtn.setAttribute('aria-label', on ? 'Exit fullscreen' : 'Enter fullscreen');

      if (on && fsEl !== html && fsEl !== doc.body && !fsEl.contains(root)) {
        if (/^(CANVAS|VIDEO|IFRAME|IMG)$/.test(fsEl.tagName)) {
          Promise.resolve(exitFs.call(doc))
            .then(function () { return requestFs.call(html); })
            .catch(function () {});
        } else {
          fsEl.appendChild(root);
        }
      } else if (!on && root.parentNode !== targetBody) {
        targetBody.appendChild(root);
      }
    }

    doc.addEventListener('fullscreenchange', onFullscreenChange);
    doc.addEventListener('webkitfullscreenchange', onFullscreenChange);
    if (!requestFs) fullBtn.style.display = 'none';


    /* -----------------------------------------------------------
       9. BOTTOM PILL DOCK
       ----------------------------------------------------------- */
    function setStripOpen(open) {
      strip.classList.toggle('is-hidden', !open);
      if (open) updateArrows();
    }

    /* Fade edges + arrow state follow the scroll position */
    function updateArrows() {
      var max = track.scrollWidth - track.clientWidth;
      var x = track.scrollLeft;
      strip.classList.toggle('no-overflow', max <= 1);
      track.classList.toggle('can-l', x > 1);
      track.classList.toggle('can-r', x < max - 1);
      prevBtn.disabled = x <= 1;
      nextBtn.disabled = x >= max - 1;
    }

    function page(dir) {
      track.scrollBy({ left: dir * track.clientWidth * 0.8 });
    }
    prevBtn.onclick = function () { page(-1); };
    nextBtn.onclick = function () { page(1); };

    track.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);

    /* Mouse wheel scrolls the strip sideways on desktop */
    track.addEventListener('wheel', function (e) {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      if (track.scrollWidth <= track.clientWidth) return;
      e.preventDefault();
      track.scrollLeft += e.deltaY;
    }, { passive: false });

    function centerThumb(thumb, instant) {
      var left = thumb.offsetLeft - (track.clientWidth - thumb.offsetWidth) / 2;
      track.scrollTo({ left: Math.max(0, left), behavior: instant ? 'auto' : 'smooth' });
    }

    function buildStrip(playlist) {
      track.innerHTML = '';

      CUSTOM_PANORAMAS.forEach(function (item, i) {
        var name = titleCase(item.title);
        var thumb = setText(el('button', { 'class': 'rw-thumb' }), name);

        thumb.onclick = function () {
          if (playlist) playlist.set('selectedIndex', item.index);
          close();
        };
        track.appendChild(thumb);
      });

      requestAnimationFrame(updateArrows);
    }


    /* -----------------------------------------------------------
       10. BUILD SCENE LIST & SYNC 3DVISTA
       ----------------------------------------------------------- */
    function buildSceneList(playlist) {
      sceneList.innerHTML = '';

      CUSTOM_PANORAMAS.forEach(function (item, i) {
        var row = el('button', null, '<i>' + twoDigits(i) + '</i><span></span>' + STAR);
        setText(row.children[1], item.title);
        row.style.animationDelay = Math.min(i * 35, 420) + 120 + 'ms';

        row.onclick = function () {
          if (playlist) playlist.set('selectedIndex', item.index);
          close();
        };
        sceneList.appendChild(row);
      });

      buildStrip(playlist);

      /* Keep the drawer list and the strip highlighting the same scene */
      function markCurrent(rows, current) {
        var match = null;
        Array.prototype.forEach.call(rows, function (row, i) {
          var isMatching = !!(CUSTOM_PANORAMAS[i] && CUSTOM_PANORAMAS[i].index === current);
          row.classList.toggle('is-current', isMatching);
          if (isMatching) { row.setAttribute('aria-current', 'true'); match = i; }
          else row.removeAttribute('aria-current');
        });
        return match;
      }

      var shown = -1;
      var firstSync = true;
      setInterval(function () {
        var current = playlist ? playlist.get('selectedIndex') : 0;
        if (current === shown) return;
        shown = current;

        markCurrent(sceneList.children, current);
        var pos = markCurrent(track.children, current);
        if (pos != null) centerThumb(track.children[pos], firstSync);
        firstSync = false;
      }, 400);

      window.RawanTour = {
        find: function (target) {
          if (typeof target === 'number') return target;
          var t = String(target || '').trim().toLowerCase();
          if (!t) return -1;
          for (var i = 0; i < CUSTOM_PANORAMAS.length; i++) {
            if (CUSTOM_PANORAMAS[i].title.toLowerCase().indexOf(t) > -1) {
              return CUSTOM_PANORAMAS[i].index;
            }
          }
          return -1;
        },
        goTo: function (target) {
          var idx = this.find(target);
          if (idx < 0 || !playlist) return false;
          playlist.set('selectedIndex', idx);
          close();
          return true;
        },
        showStrip: function (open) { setStripOpen(open !== false); }
      };
    }

    function ready() {
      window.__rwReady = 1;
      emit('rw:ready');
    }

    var tries = 0;
    var waitForTour = setInterval(function () {
      var playlist = null;
      try { playlist = findPlaylist(); } catch (e) { }

      if (playlist) {
        clearInterval(waitForTour);
        buildSceneList(playlist);
        ready();
      } else if (++tries > 120) {
        clearInterval(waitForTour);
        buildSceneList(null);
        ready();
      }
    }, 250);
  }


  /* ---------------------------------------------------------------
     11. PHONE SIZING
     --------------------------------------------------------------- */
  function fitToScreen(node, phoneMaxWidth) {
    function update() {
      var meta = doc.querySelector('meta[name=viewport]');
      var match = meta && /initial-scale=([0-9.]+)/.exec(meta.content);
      var scale = match ? +match[1] : 1;
      if (!(scale > 0 && scale < 1)) scale = 1;

      node.style.zoom = scale < 1 ? String(1 / scale) : '';
      node.classList.toggle('is-phone', innerWidth * scale <= phoneMaxWidth);
    }

    update();
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    if (window.MutationObserver) {
      new MutationObserver(update).observe(doc.head, {
        childList: true, subtree: true, attributes: true, attributeFilter: ['content']
      });
    }
  }


  /* ---------------------------------------------------------------
     12. START
     --------------------------------------------------------------- */
  mount();
  var bootTimer = setInterval(function () {
    mount();
    if (mounted) clearInterval(bootTimer);
  }, 50);

})();