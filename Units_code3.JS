/* =====================================================================
   THE RAWAN | Script 3: Overview + Units sidebar content
   Direct Image Links Edition
   ===================================================================== */
(function () {

  /* ---------------------------------------------------------------
     1. CONTENT DATA WITH YOUR GITHUB IMAGE URLS
     --------------------------------------------------------------- */
  var DATA = {
    overview: {
      img: 'https://github.com/virtual-sudo/The-Rawan-/blob/main/bg.png?raw=true', 
      text: 'The Rawan is designed to sustain how you live, so your imagination continues to spark the way you live.',
      pillarsTitle: 'The way of life',
      pillars: [
        ['Everyday discovery', 'Wellness, dining, retail, and coworking woven into daily movement.'],
        ['Shared exploration', 'Walkable, people-centered spaces that invite interaction.'],
        ['Nature that inspires', 'Green corridors and open spaces make nature part of life.'],
        ['Open to more', 'New experiences keep everyday life curious and open.']
      ],
      galleryTitle: 'Gallery',
      gallery: [
        'https://github.com/virtual-sudo/The-Rawan-/blob/main/WATERFALL%20OASIS.png?raw=true',
        'https://github.com/virtual-sudo/The-Rawan-/blob/main/bg.png?raw=true'
      ], 
      ctaTitle: 'Experience The Rawan',
      ctaText: 'Discover master planned living in Cebu City. Connect with our estate specialists today.',
      ctaButton: 'Inquire Now'
    },

    units: [
      { name: 'Studio',    size: 'Size to be confirmed', img: '', href: '' },
      { name: '1 Bedroom', size: 'Size to be confirmed', img: '', href: '' },
      { name: '2 Bedroom', size: 'Size to be confirmed', img: '', href: '' },
      { name: '3 Bedroom', size: 'Size to be confirmed', img: '', href: '' }
    ]
  };

  /* Brand colours and fonts */
  var INK = '#2A2A38';
  var GOLD = '#C0B177';
  var CORAL = '#F28361';
  var PEACH = '#F3AE8E';
  var SERIF = '"Rawan Sans","Cormorant Garamond",Georgia,serif';
  var SANS = '"DM Sans",sans-serif';


  /* ---------------------------------------------------------------
     2. ICONS
     --------------------------------------------------------------- */
  var STAR =
    '<svg viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">' +
    '<path d="M50 2C50 34 66 50 98 50C66 50 50 66 50 98C50 66 34 50 2 50C34 50 50 34 50 2Z"/></svg>';

  var ARROW_RIGHT =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';


  /* ---------------------------------------------------------------
     3. STYLES
     --------------------------------------------------------------- */
  var CSS = '' +
    '#rwc { --ease: cubic-bezier(.23, 1, .32, 1); }' +

    '#rwc::-webkit-scrollbar { width: 3px; }' +
    '#rwc::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.03); }' +
    '#rwc::-webkit-scrollbar-thumb { background: rgba(248, 247, 242, 0.15); border-radius: 2px; }' +
    '#rwc::-webkit-scrollbar-thumb:hover { background: rgba(248, 247, 242, 0.35); }' +

    '#rwc {' +
      'scrollbar-width: thin;' +
      'scrollbar-color: rgba(248, 247, 242, 0.15) rgba(255, 255, 255, 0.03);' +
    '}' +

    '#rwc > * { animation: rw-fade-up .5s var(--ease) both; }' +
    '@keyframes rw-fade-up { from { opacity: 0; transform: translateY(8px); } }' +

    '#rwc h4 { font: 400 15px ' + SERIF + '; letter-spacing: .1em; text-transform: uppercase; color: ' + GOLD + '; }' +
    '#rwc .rw-section { display: flex; align-items: center; gap: 12px; margin: 26px 0 6px; }' +
    '#rwc .rw-section::after { content: ""; flex: 1; height: 1px; background: #C0B17725; }' +

    '#rwc .rw-image {' +
      'position: relative; display: grid; place-items: center; overflow: hidden;' +
      'aspect-ratio: 16 / 10; border-radius: 10px;' +
      'background: linear-gradient(135deg, #4d4c66, ' + INK + ');' +
      'border: 1px dashed #C0B17750;' +
      'transition: border-color .3s ease;' +
    '}' +
    '#rwc .rw-image.is-tall { aspect-ratio: 4 / 5; }' +
    '#rwc .rw-image.has-photo { border: 0; }' +
    '#rwc .rw-image img {' +
      'position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;' +
      'opacity: 0; transition: opacity .5s ease, transform .8s var(--ease);' +
    '}' +
    '#rwc .rw-image img.is-loaded { opacity: 1; }' +
    '#rwc .rw-placeholder {' +
      'display: flex; flex-direction: column; align-items: center; gap: 6px;' +
      'color: ' + GOLD + '; font-size: 10px; letter-spacing: .14em; text-transform: uppercase;' +
    '}' +
    '#rwc .rw-placeholder svg { width: 24px; opacity: .7; }' +

    '#rwc .rw-intro { margin: 16px 0 4px; font-size: 14px; font-weight: 300; line-height: 1.7; }' +

    '#rwc .rw-pillar { display: flex; gap: 14px; padding: 14px 0; border-top: 1px solid #C0B17725; }' +
    '#rwc .rw-section + .rw-pillar { border-top: 0; }' +
    '#rwc .rw-pillar b { font: 400 18px ' + SERIF + '; color: ' + GOLD + '; font-variant-numeric: tabular-nums; }' +
    '#rwc .rw-pillar h5 { font-size: 13px; font-weight: 700; letter-spacing: .04em; }' +
    '#rwc .rw-pillar p { margin-top: 3px; font-size: 12.5px; line-height: 1.55; opacity: .8; }' +

    '#rwc .rw-gallery { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 12px; }' +

    '#rwc .rw-overview-cta {' +
      'margin-top: 28px; padding: 20px; border-radius: 12px;' +
      'background: rgba(255, 255, 255, 0.02);' +
      'border: 1px solid #C0B17735;' +
      'display: flex; flex-direction: column; gap: 12px;' +
    '}' +
    '#rwc .rw-overview-cta p { font-size: 12.5px; line-height: 1.6; opacity: .85; }' +

    '#rwc .rw-btn-orange {' +
      'display: inline-flex; align-items: center; justify-content: center; gap: 10px;' +
      'width: 100%; height: 44px; margin-top: 4px; padding: 0 20px;' +
      'border: 0; border-radius: 22px; cursor: pointer;' +
      'background: ' + CORAL + '; color: ' + INK + ';' +
      'font: 700 12px/1 ' + SANS + '; letter-spacing: .1em; text-transform: uppercase;' +
      'box-shadow: 0 8px 24px rgba(242, 131, 97, 0.25);' +
      'transition: transform .2s ease, background-color .2s ease, box-shadow .2s ease;' +
    '}' +
    '#rwc .rw-btn-orange svg { width: 16px; height: 16px; transition: transform .25s var(--ease); }' +
    '#rwc .rw-btn-orange:active { transform: scale(.98); background: ' + PEACH + '; }' +

    '@media (hover: hover) and (pointer: fine) {' +
      '#rwc .rw-btn-orange:hover {' +
        'background: ' + PEACH + ';' +
        'box-shadow: 0 10px 28px rgba(242, 131, 97, 0.38);' +
      '}' +
      '#rwc .rw-btn-orange:hover svg { transform: translateX(4px); }' +
    '}' +

    '#rwc .rw-unit {' +
      'position: relative; padding: 16px; border-radius: 10px;' +
      'background: rgba(255, 255, 255, 0.02);' +
      'border: 1px solid #C0B17725;' +
      'cursor: pointer;' +
      'transition: background-color .25s ease, border-color .25s ease;' +
    '}' +
    '#rwc .rw-unit + .rw-unit { margin-top: 14px; }' +

    '#rwc .rw-unit:hover {' +
      'background: rgba(192, 177, 119, 0.05);' +
      'border-color: #C0B17760;' +
    '}' +
    '#rwc .rw-unit:active {' +
      'transform: scale(.995);' +
    '}' +

    '#rwc .rw-unit-row {' +
      'margin-top: 12px;' +
    '}' +
    '#rwc .rw-unit-row small { display: block; margin-bottom: 4px; font-size: 10px; letter-spacing: .14em; opacity: .5; font-variant-numeric: tabular-nums; }' +
    '#rwc .rw-unit-row p { margin-top: 4px; font-size: 12px; opacity: .7; }' +

    '@media (hover: hover) and (pointer: fine) {' +
      '#rwc .rw-unit:hover .rw-image img { transform: scale(1.03); }' +
    '}' +

    '@media (prefers-reduced-motion: reduce) {' +
      '#rwc > * { animation: rw-fade .2s ease both; }' +
      '#rwc .rw-image img { transition: opacity .3s ease; }' +
    '}' +
    '@keyframes rw-fade { from { opacity: 0; } }';


  /* ---------------------------------------------------------------
     4. SMALL HELPERS
     --------------------------------------------------------------- */
  var doc = document;

  function el(tag, className, html) {
    var node = doc.createElement(tag);
    if (className) node.className = className;
    if (html != null) node.innerHTML = html;
    return node;
  }

  function textEl(tag, className, text) {
    var node = el(tag, className);
    node.textContent = text;
    return node;
  }

  function twoDigits(i) {
    return (i < 9 ? '0' : '') + (i + 1);
  }

  function imageFrame(src, label, extraClass) {
    var frame = el('div', 'rw-image' + (src ? ' has-photo' : '') + (extraClass ? ' ' + extraClass : ''));

    if (src) {
      var img = el('img');
      img.alt = label;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.onload = function () { img.classList.add('is-loaded'); };
      img.onerror = function () { 
        frame.classList.remove('has-photo');
        frame.innerHTML = '<div class="rw-placeholder">' + STAR + '<span>' + label + '</span></div>';
      };
      img.src = src;
      if (img.complete) img.classList.add('is-loaded');
      frame.appendChild(img);
    } else {
      var ph = el('div', 'rw-placeholder', STAR);
      ph.appendChild(textEl('span', null, label));
      frame.appendChild(ph);
    }
    return frame;
  }

  function stagger(container) {
    Array.prototype.forEach.call(container.children, function (child, i) {
      child.style.animationDelay = Math.min(i * 45, 360) + 80 + 'ms';
    });
  }


  /* ---------------------------------------------------------------
     5. OVERVIEW RENDER FUNCTION
     --------------------------------------------------------------- */
  function renderOverview(container) {
    var o = DATA.overview;

    container.appendChild(imageFrame(o.img, 'Entrance'));
    container.appendChild(textEl('p', 'rw-intro', o.text));

    container.appendChild(textEl('h4', 'rw-section', o.pillarsTitle));
    o.pillars.forEach(function (pillar, i) {
      var row = el('div', 'rw-pillar', '<b>' + twoDigits(i) + '</b>');
      var body = el('div');
      body.appendChild(textEl('h5', null, pillar[0]));
      body.appendChild(textEl('p', null, pillar[1]));
      row.appendChild(body);
      container.appendChild(row);
    });

    container.appendChild(textEl('h4', 'rw-section', o.galleryTitle));
    var gallery = el('div', 'rw-gallery');

    gallery.appendChild(imageFrame(o.gallery[0], 'Waterfall Oasis', 'is-tall'));
    gallery.appendChild(imageFrame(o.gallery[1], 'Entrance', 'is-tall'));
    container.appendChild(gallery);

    /* Orange Inquire CTA */
    var ctaBox = el('div', 'rw-overview-cta');
    ctaBox.appendChild(textEl('h4', null, o.ctaTitle));
    ctaBox.appendChild(textEl('p', null, o.ctaText));

    var btn = el('button', 'rw-btn-orange', '<span>' + o.ctaButton + '</span>' + ARROW_RIGHT);
    btn.setAttribute('aria-label', o.ctaButton);
    btn.onclick = function () {
      doc.dispatchEvent(new CustomEvent('rw:inquire', { detail: { source: 'overview' } }));
    };

    ctaBox.appendChild(btn);
    container.appendChild(ctaBox);
  }


  /* ---------------------------------------------------------------
     6. UNITS RENDER FUNCTION
     --------------------------------------------------------------- */
  function renderUnits(container) {
    var total = DATA.units.length;

    DATA.units.forEach(function (unit, i) {
      var card = el('div', 'rw-unit');
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', 'View details for ' + unit.name);

      card.appendChild(imageFrame(unit.img, unit.name));

      var info = el('div');
      info.appendChild(textEl('small', null, twoDigits(i) + ' / ' + twoDigits(total - 1)));
      info.appendChild(textEl('h4', null, unit.name));
      info.appendChild(textEl('p', null, unit.size));

      var row = el('div', 'rw-unit-row');
      row.appendChild(info);
      card.appendChild(row);

      card.onclick = function () {
        doc.dispatchEvent(new CustomEvent('rw:inquire', { detail: { unit: unit } }));
        if (unit.href) window.open(unit.href, '_blank', 'noopener');
      };

      card.onkeydown = function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      };

      container.appendChild(card);
    });
  }


  /* ---------------------------------------------------------------
     7. LISTEN FOR SIDEBAR OPEN EVENT
     --------------------------------------------------------------- */
  var stylesAdded = false;

  doc.addEventListener('rw:open', function (e) {
    if (!stylesAdded) {
      var style = el('style');
      style.textContent = CSS;
      doc.head.appendChild(style);
      stylesAdded = true;
    }

    var container = e.detail.el;
    if (e.detail.k === 'overview') renderOverview(container);
    else if (e.detail.k === 'units') renderUnits(container);
    stagger(container);
  });

})();