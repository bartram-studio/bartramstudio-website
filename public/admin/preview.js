/* =============================================================
   BARTRAM STUDIO — Decap CMS Preview Templates
   Registers visual previews for: home, about, contact, shop, products
   Brand Settings (typography) excluded from Phase 1.
   ============================================================= */

(function () {
  'use strict';

  // Guard: CMS global must be available (loaded by decap-cms.js before this)
  if (typeof CMS === 'undefined') {
    console.warn('[preview.js] CMS global not found — preview templates not registered.');
    return;
  }

  var h = window.h; // Decap ships Preact; h = Preact.h (hyperscript)

  // ── Inject preview stylesheet ──────────────────────────────────────────────
  CMS.registerPreviewStyle('/admin/preview.css');

  // ── Helpers ───────────────────────────────────────────────────────────────

  function bgClass(value) {
    if (!value) return '';
    return 'bg-' + value;
  }

  // Image placeholder SVG
  var imgPlaceholderSVG = h('svg', {
    viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: '1'
  }, [
    h('rect', { x: '3', y: '3', width: '18', height: '18', rx: '2', key: 'r' }),
    h('circle', { cx: '8.5', cy: '8.5', r: '1.5', key: 'c' }),
    h('polyline', { points: '21 15 16 10 5 21', key: 'p' })
  ]);

  // Person placeholder SVG (for About photo)
  var personPlaceholderSVG = h('svg', {
    viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: '1'
  }, [
    h('path', { d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', key: 'b' }),
    h('circle', { cx: '12', cy: '7', r: '4', key: 'h' })
  ]);

  // ── ABOUT PAGE ─────────────────────────────────────────────────────────────
  CMS.registerPreviewTemplate('about', function AboutPreview(props) {
    var entry = props.entry;
    var get = function (key) { return entry.getIn(['data', key]); };

    var heroClass = 'page-hero ' + bgClass(get('heroBg'));
    var paragraphs  = get('introParagraphs')  || [];
    var steps       = get('processSteps')     || [];
    var values      = get('valuesParagraphs') || [];

    return h('div', { className: 'preview-wrap' },

      // Page Hero
      h('section', { className: heroClass },
        h('div', { className: 'container' },
          h('p', { className: 'page-hero__eyebrow' }, get('pageEyebrow')),
          h('h1', null, get('pageTitle')),
          h('p', { className: 'intro' }, get('pageIntro'))
        )
      ),

      // Intro — 2-col
      h('section', { className: 'section' },
        h('div', { className: 'container' },
          h('div', { className: 'about-intro' },

            // Left — photo placeholder
            h('div', { className: 'about-frame-wrap' },
              h('div', { className: 'about-frame' },
                personPlaceholderSVG,
                h('span', null, 'A photo of Amanda')
              ),
              h('div', { className: 'about-frame-accent' })
            ),

            // Right — text
            h('div', { className: 'about-intro__text' },
              h('p', { className: 'section-eyebrow' }, get('introEyebrow')),
              h('h2', null, get('introTitle')),
              paragraphs.map(function (para, i) {
                return h('p', { key: i }, para.get ? para.get('paragraph') : para);
              })
            )
          )
        )
      ),

      // Craft / Process steps
      h('section', { className: 'section craft-section' },
        h('div', { className: 'container' },
          h('div', { className: 'section-head' },
            h('p', { className: 'section-eyebrow' }, get('craftEyebrow')),
            h('h2', null, get('craftTitle')),
            h('p', null, get('craftText'))
          ),
          h('div', { className: 'process-grid' },
            steps.map(function (step, i) {
              var title = step.get ? step.get('title') : step.title;
              var body  = step.get ? step.get('body')  : step.body;
              return h('div', { className: 'process-step', key: i },
                h('div', { className: 'process-step__number' },
                  String(i + 1).padStart(2, '0')
                ),
                h('h3', null, title),
                h('p', null, body)
              );
            })
          )
        )
      ),

      // Values + Quote
      h('section', { className: 'section' },
        h('div', { className: 'container' },
          h('div', { className: 'values-inner' },
            h('div', { className: 'values-text' },
              h('p', { className: 'section-eyebrow' }, get('valuesEyebrow')),
              h('h2', null, get('valuesTitle')),
              values.map(function (v, i) {
                return h('p', { key: i }, v.get ? v.get('paragraph') : v);
              }),
              h('a', { href: '#', className: 'btn btn--outline', style: { marginTop: '1.25rem' } },
                'Browse the Shop'
              )
            ),
            h('div', { className: 'values-quote' },
              h('blockquote', null,
                h('p', null, '\u201C' + (get('quoteText') || '') + '\u201D'),
                h('cite', null, get('quoteCitation'))
              )
            )
          )
        )
      ),

      // Contact CTA strip
      h('section', { className: 'contact-strip' },
        h('div', { className: 'container' },
          h('div', { className: 'contact-strip__inner' },
            h('div', null,
              h('h3', null, get('contactCtaTitle')),
              h('p', null, get('contactCtaText'))
            ),
            h('a', { href: '#', className: 'btn btn--coral' }, get('contactCtaButtonText'))
          )
        )
      )
    );
  });

  // ── CONTACT PAGE ───────────────────────────────────────────────────────────
  CMS.registerPreviewTemplate('contact', function ContactPreview(props) {
    var entry = props.entry;
    var get = function (key) { return entry.getIn(['data', key]); };

    var heroClass    = 'page-hero ' + bgClass(get('heroBg'));
    var customParas  = get('customOrdersParagraphs') || [];
    var faqs         = get('faqItems') || [];

    return h('div', { className: 'preview-wrap' },

      // Page Hero
      h('section', { className: heroClass },
        h('div', { className: 'container' },
          h('p', { className: 'page-hero__eyebrow' }, get('pageEyebrow')),
          h('h1', null, get('pageTitle')),
          h('p', { className: 'intro' }, get('pageIntro'))
        )
      ),

      // Main content
      h('section', { className: 'section' },
        h('div', { className: 'container' },
          h('div', { className: 'contact-layout' },

            // Left — form
            h('div', { className: 'contact-form-wrap' },
              h('h2', null, get('formTitle')),
              h('p', { style: { marginBottom: '1.5rem' } }, get('formIntro')),
              h('div', { className: 'form-stack' },
                h('div', { className: 'form-row' },
                  h('div', { className: 'form-group' },
                    h('label', null, 'Your Name'),
                    h('input', { type: 'text', placeholder: 'Jane Smith', readOnly: true })
                  ),
                  h('div', { className: 'form-group' },
                    h('label', null, 'Email Address'),
                    h('input', { type: 'email', placeholder: 'jane@example.com', readOnly: true })
                  )
                ),
                h('div', { className: 'form-group' },
                  h('label', null, 'Subject'),
                  h('input', { type: 'text', placeholder: "What's on your mind?", readOnly: true })
                ),
                h('div', { className: 'form-group' },
                  h('label', null, "I'm interested in\u2026"),
                  h('select', { disabled: true },
                    h('option', null, 'Select an option')
                  )
                ),
                h('div', { className: 'form-group' },
                  h('label', null, 'Message'),
                  h('textarea', { placeholder: 'Tell me what you\u2019re looking for\u2026', readOnly: true })
                ),
                h('button', { className: 'btn btn--primary', type: 'button' }, 'Send Message')
              )
            ),

            // Right — sidebar
            h('aside', { className: 'contact-sidebar' },

              // Contact methods
              h('div', { className: 'sidebar-card' },
                h('h3', null, 'Other ways to reach me'),
                h('div', { className: 'contact-method' },
                  h('div', { className: 'contact-method__icon' },
                    h('svg', { width: '18', height: '18', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1.5' },
                      h('path', { d: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' }),
                      h('polyline', { points: '22,6 12,13 2,6' })
                    )
                  ),
                  h('div', null,
                    h('p', { className: 'contact-method__label' }, 'Email'),
                    h('span', { className: 'contact-method__value' }, get('email'))
                  )
                ),
                h('div', { className: 'contact-method' },
                  h('div', { className: 'contact-method__icon' },
                    h('svg', { width: '18', height: '18', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1.5' },
                      h('rect', { x: '2', y: '2', width: '20', height: '20', rx: '5', ry: '5' }),
                      h('path', { d: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' }),
                      h('line', { x1: '17.5', y1: '6.5', x2: '17.51', y2: '6.5' })
                    )
                  ),
                  h('div', null,
                    h('p', { className: 'contact-method__label' }, 'Instagram'),
                    h('span', { className: 'contact-method__value' }, get('instagramHandle'))
                  )
                ),
                h('div', { className: 'contact-method' },
                  h('div', { className: 'contact-method__icon' },
                    h('svg', { width: '18', height: '18', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1.5' },
                      h('path', { d: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z' }),
                      h('circle', { cx: '12', cy: '10', r: '3' })
                    )
                  ),
                  h('div', null,
                    h('p', { className: 'contact-method__label' }, 'Location'),
                    h('span', { className: 'contact-method__value' }, get('location'))
                  )
                )
              ),

              // Custom orders card
              h('div', { className: 'sidebar-card sidebar-card--accent' },
                h('h3', null, get('customOrdersTitle')),
                customParas.map(function (p, i) {
                  return h('p', { key: i, style: { marginBottom: '0.5rem' } },
                    p.get ? p.get('paragraph') : p
                  );
                }),
                get('responseTime') && h('p', { style: { marginTop: '0.75rem', fontSize: '0.82rem', color: 'var(--driftwood)' } },
                  'Typical response time: ',
                  h('strong', null, get('responseTime'))
                )
              ),

              // FAQ card
              faqs.size > 0 && h('div', { className: 'sidebar-card' },
                h('h3', null, 'Frequently Asked'),
                faqs.map(function (item, i) {
                  var q = item.get ? item.get('question') : item.question;
                  var a = item.get ? item.get('answer')   : item.answer;
                  return h('div', { className: 'faq', key: i },
                    h('p', { className: 'faq-question' }, q),
                    h('p', { className: 'faq-answer' }, a)
                  );
                })
              )
            )
          )
        )
      )
    );
  });

  // ── SHOP PAGE ──────────────────────────────────────────────────────────────
  CMS.registerPreviewTemplate('shop', function ShopPreview(props) {
    var entry = props.entry;
    var get = function (key) { return entry.getIn(['data', key]); };

    var heroClass = 'page-hero ' + bgClass(get('heroBg'));

    // Representative placeholder cards
    var sampleCards = [
      { title: 'Coastal Shell Shadow Box', cat: 'Coastal Decor', price: 95 },
      { title: 'Resin Shell Coaster Set',  cat: 'Resin Art',     price: 65 },
      { title: 'Sea Glass Serving Tray',   cat: 'Resin Art',     price: 110 },
    ];

    return h('div', { className: 'preview-wrap' },

      // Page Hero
      h('section', { className: heroClass },
        h('div', { className: 'container' },
          h('p', { className: 'page-hero__eyebrow' }, get('pageEyebrow')),
          h('h1', null, get('pageTitle')),
          h('p', { className: 'intro' }, get('pageIntro'))
        )
      ),

      // Filter bar + product grid
      h('section', { className: 'section section--sm' },
        h('div', { className: 'container' },
          h('div', { className: 'filter-bar' },
            h('div', { style: { display: 'flex', alignItems: 'center', gap: '0.75rem' } },
              h('p', { className: 'filter-bar__label' }, 'Filter by:'),
              h('span', { className: 'pill pill--active' }, 'All'),
              h('span', { className: 'pill' }, 'Resin Art'),
              h('span', { className: 'pill' }, 'Coastal Decor')
            ),
            h('p', { style: { fontSize: '0.8rem', color: 'var(--driftwood)' } }, '5 pieces')
          ),
          h('div', { className: 'product-grid-preview' },
            sampleCards.map(function (card, i) {
              return h('div', { className: 'product-card', key: i },
                h('div', { className: 'product-card__img-wrap' }, imgPlaceholderSVG),
                h('div', { className: 'product-card__body' },
                  h('p', { className: 'product-card__category' }, card.cat),
                  h('h2', { className: 'product-card__title' }, card.title),
                  h('p', { className: 'product-card__price' }, '$' + card.price)
                )
              );
            })
          )
        )
      ),

      // Custom CTA
      h('div', { className: 'shop-cta' },
        h('div', { className: 'container' },
          h('p', { className: 'tagline' }, "Don\u2019t see exactly what you\u2019re looking for?"),
          h('p', { style: { marginBottom: '1.25rem', marginInline: 'auto' } },
            'Custom orders are always welcome.'
          ),
          h('a', { href: '#', className: 'btn btn--coral' }, 'Request a Custom Piece')
        )
      )
    );
  });

  // ── HOME PAGE ──────────────────────────────────────────────────────────────
  CMS.registerPreviewTemplate('home', function HomePreview(props) {
    var entry = props.entry;
    var get = function (key) { return entry.getIn(['data', key]); };

    var heroBgClass = bgClass(get('heroBg'));
    var ctaBgClass  = bgClass(get('ctaBg'));

    var categories = ['Resin Art', 'Coastal Decor', 'Seasonal Crafts', 'Custom Pieces'];

    return h('div', { className: 'preview-wrap' },

      // Hero
      h('section', { className: 'home-hero ' + heroBgClass },
        h('div', { className: 'container' },
          h('p', { className: 'hero__eyebrow' }, get('heroEyebrow')),
          h('h1', { className: 'hero__title' },
            get('heroTitle'),
            get('heroTitleEmphasis') && h('em', null, get('heroTitleEmphasis'))
          ),
          h('p', { className: 'hero__lead' }, get('heroLead'))
        )
      ),

      // Featured section
      h('section', { className: 'section featured-section' },
        h('div', { className: 'container' },
          h('div', { className: 'home-section-head' },
            h('p', { className: 'section-eyebrow' }, get('featuredEyebrow')),
            h('h2', null, get('featuredTitle')),
            h('p', null, get('featuredText'))
          ),
          // Placeholder product grid
          h('div', { className: 'product-grid-preview' },
            ['Featured Piece 1', 'Featured Piece 2', 'Featured Piece 3'].map(function (name, i) {
              return h('div', { className: 'product-card', key: i },
                h('div', { className: 'product-card__img-wrap' }, imgPlaceholderSVG),
                h('div', { className: 'product-card__body' },
                  h('p', { className: 'product-card__category' }, 'Resin Art'),
                  h('h2', { className: 'product-card__title' }, name),
                  h('p', { className: 'product-card__price' }, '$85')
                )
              );
            })
          )
        )
      ),

      // Categories section
      h('section', { className: 'section categories-section' },
        h('div', { className: 'container' },
          h('div', { className: 'home-section-head' },
            h('p', { className: 'section-eyebrow' }, get('categoriesEyebrow')),
            h('h2', null, get('categoriesTitle'))
          ),
          h('div', { className: 'category-grid' },
            categories.map(function (cat, i) {
              return h('div', { className: 'category-card', key: i },
                h('div', { className: 'category-card__icon' }),
                h('span', null, cat)
              );
            })
          )
        )
      ),

      // About strip
      h('section', { className: 'about-strip' },
        h('div', { className: 'container' },
          h('div', { className: 'about-strip__inner' },
            h('div', null,
              h('p', { className: 'section-eyebrow' }, get('aboutEyebrow')),
              h('h2', null, get('aboutTitle')),
              h('p', null, get('aboutText')),
              h('a', { href: '#', className: 'btn btn--outline', style: { marginTop: '1.25rem', borderColor: 'var(--tide-light)', color: 'var(--white)' } },
                'Learn More'
              )
            ),
            h('div', { className: 'about-strip__img' }, 'Studio photo')
          )
        )
      ),

      // CTA
      h('section', { className: 'cta-section ' + ctaBgClass },
        h('div', { className: 'container' },
          h('div', { className: 'cta-box' },
            h('h2', null,
              get('ctaTitle'),
              get('ctaTitleEmphasis') && h('em', null, get('ctaTitleEmphasis'))
            ),
            h('p', null, get('ctaText')),
            h('a', { href: '#', className: 'btn btn--primary' }, get('ctaButtonText'))
          )
        )
      )
    );
  });

  // ── PRODUCTS (detail page) ─────────────────────────────────────────────────
  CMS.registerPreviewTemplate('products', function ProductPreview(props) {
    var entry = props.entry;
    var get = function (key) { return entry.getIn(['data', key]); };

    var status   = get('status')   || 'available';
    var price    = get('price')    || '';
    var category = get('category') || '';
    var qty      = get('quantity');
    var customOk = get('customOrderAvailable');

    var badgeClass = 'badge badge--' + status;
    var badgeLabel = status === 'available' ? 'Available'
                   : status === 'pending'   ? 'Pending Sale'
                   : 'Sold';

    return h('div', { className: 'preview-wrap' },

      // Breadcrumb
      h('nav', { style: { padding: '0.875rem 0', background: 'var(--sand)', borderBottom: '1px solid var(--sand-dark)', fontSize: '0.78rem', color: 'var(--driftwood)' } },
        h('div', { className: 'container', style: { display: 'flex', gap: '0.5rem', alignItems: 'center' } },
          h('span', null, 'Home'),
          h('span', null, '\u203A'),
          h('span', null, 'Shop'),
          h('span', null, '\u203A'),
          h('span', { style: { color: 'var(--tide-dark)' } }, get('title') || 'Product')
        )
      ),

      // Product layout
      h('section', { className: 'section' },
        h('div', { className: 'container' },
          h('div', { className: 'product-layout' },

            // Left — gallery placeholder
            h('div', null,
              h('div', { className: 'gallery__main' },
                imgPlaceholderSVG,
                h('span', null, 'Product photo')
              )
            ),

            // Right — info
            h('div', { className: 'product-info' },
              h('p', { className: 'product-info__category' }, category),
              h('h1', { className: 'product-info__title' }, get('title')),

              h('div', { className: 'product-info__meta' },
                price && h('span', { className: 'product-info__price' }, '$' + price),
                h('span', { className: badgeClass }, badgeLabel),
                (qty > 1 && status === 'available') && h('span', { style: { fontSize: '0.75rem', color: 'var(--driftwood)' } }, qty + ' available')
              ),

              h('div', { className: 'divider' }, h('span', null, '\u2736')),

              h('div', { className: 'product-info__desc' },
                h('p', null, get('description'))
              ),

              customOk && h('div', { style: { display: 'flex', gap: '0.6rem', padding: '0.875rem 1rem', background: 'var(--sand)', borderLeft: '3px solid var(--tide)', marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--driftwood)' } },
                'Custom orders available for this style.'
              ),

              h('div', { className: 'product-actions' },
                status === 'available'
                  ? h('a', { href: '#', className: 'btn btn--primary' }, "I\u2019m Interested")
                  : h('button', { className: 'btn btn--ghost', disabled: true },
                      status === 'pending' ? 'Pending Sale' : 'Sold'
                    )
              ),

              h('div', { className: 'product-details' },
                h('h4', null, 'Details'),
                h('dl', null,
                  h('div', null, h('dt', null, 'Category'),     h('dd', null, category)),
                  h('div', null, h('dt', null, 'Availability'), h('dd', null, status)),
                  h('div', null, h('dt', null, 'Custom Orders'), h('dd', null, customOk ? 'Yes' : 'No'))
                )
              )
            )
          )
        )
      )
    );
  });

})();
