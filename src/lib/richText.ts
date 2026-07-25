import { micromark } from 'micromark';
import { fromHtml } from 'hast-util-from-html';
import { toHtml } from 'hast-util-to-html';

/**
 * Renders a long-form CMS field to safe, semantic HTML restricted to the
 * approved formatting subset: bold, italics, bulleted/numbered lists, and
 * links (plus hard line breaks, which CommonMark treats as part of the same
 * inline-emphasis family). Nothing else is ever allowed through — not
 * headings, blockquotes, code, horizontal rules, images, tables, or raw
 * HTML — regardless of what a person types or pastes into the field.
 *
 * This is the single shared Markdown implementation for the Bartram Studio
 * site — it is used both by the live Astro pages (src/pages/*.astro) and by
 * the Decap CMS preview templates (src/pages/admin/index.astro), so authors
 * see the same restricted formatting in the CMS preview that visitors see
 * on the live site. Do not fork this logic into a second implementation.
 *
 * ── Two-stage pipeline ──────────────────────────────────────────────────
 * 1. micromark compiles Markdown to HTML using core CommonMark only (no GFM
 *    extension enabled). Raw HTML in the source is escaped, not executed —
 *    micromark only passes through raw HTML when `allowDangerousHtml: true`
 *    is set, which is never set here.
 * 2. That HTML is re-parsed into a hast (HTML syntax tree) and filtered
 *    against a strict element allowlist below, then re-serialized. This
 *    second stage — not the CMS toolbar, and not micromark's output alone —
 *    is the actual enforcement point for the approved formatting scope.
 *    Core CommonMark still recognizes headings, blockquotes, code
 *    spans/blocks, horizontal rules, and images regardless of which toolbar
 *    buttons the CMS shows; a person can always type or paste that syntax
 *    by hand. Hiding toolbar buttons is an authoring convenience, not a
 *    security or scope boundary — this filter is the actual boundary.
 *
 * Disallowed elements are unwrapped rather than deleted outright: their
 * text content is kept (nothing an author typed silently disappears), but
 * their tag is discarded, so a heading becomes plain inline text instead of
 * an <h2>, a blockquote's text stays but the <blockquote> wrapper is gone,
 * and so on. Elements with no meaningful text content when unwrapped —
 * images, horizontal rules — are effectively removed, since there is
 * nothing left to promote in their place.
 *
 * ── Why hast-util-from-html / hast-util-to-html and not a new package ──
 * Both already ship as transitive dependencies of Astro's own markdown
 * pipeline (@astrojs/markdown-remark) — see package-lock.json. Using them
 * here promotes existing, already-resolved dependencies to direct ones
 * rather than introducing a new HTML-sanitizing library. This also avoids
 * regex-based HTML filtering, which is not reliable for this purpose;
 * operating on a real parsed tree is.
 */

// The complete, exact set of elements this site's rich-text fields may ever
// render. Nothing outside this set reaches the page or the CMS preview.
const ALLOWED_TAGS = new Set(['p', 'strong', 'em', 'ul', 'ol', 'li', 'a', 'br']);

// A link is safe to keep only if its href has no scheme (a relative path,
// root-relative path, or in-page anchor) or an explicit http(s)/mailto
// scheme. This blocks javascript:, data:, vbscript:, and similar.
const HAS_SCHEME = /^[a-z][a-z\d+.-]*:/i;
const SAFE_SCHEME = /^(https?:|mailto:)/i;

function isSafeHref(href: unknown): href is string {
  if (typeof href !== 'string' || href.trim() === '') return false;
  const trimmed = href.trim();
  return !HAS_SCHEME.test(trimmed) || SAFE_SCHEME.test(trimmed);
}

// Recursively filters a hast node list against ALLOWED_TAGS. Disallowed
// elements are unwrapped (their filtered children take their place in the
// parent's children array) rather than dropped, so their text survives
// even though their tag does not. All properties are stripped except a
// verified-safe `href` on <a>, so no CMS-authored attribute (style, class,
// event handlers, etc.) can ever reach the rendered output — though
// CommonMark's own compiler would never emit those in the first place,
// this is a defensive backstop, not a workaround for a known gap.
function filterChildren(nodes: any[]): any[] {
  const out: any[] = [];
  for (const node of nodes) {
    if (node.type === 'text') {
      out.push(node);
      continue;
    }
    if (node.type !== 'element') {
      // Comments, doctypes, and anything else that isn't a text or element
      // node are dropped entirely — there is nothing safe to keep.
      continue;
    }

    const filteredKids = filterChildren(node.children || []);

    if (!ALLOWED_TAGS.has(node.tagName)) {
      out.push(...filteredKids);
      continue;
    }

    if (node.tagName === 'a') {
      const href = node.properties && node.properties.href;
      if (!isSafeHref(href)) {
        // No safe destination to link to — unwrap rather than ship a
        // dead or unsafe anchor.
        out.push(...filteredKids);
        continue;
      }
      out.push({
        type: 'element',
        tagName: 'a',
        properties: { href },
        children: filteredKids,
      });
      continue;
    }

    out.push({
      type: 'element',
      tagName: node.tagName,
      properties: {},
      children: filteredKids,
    });
  }
  return out;
}

export function renderMarkdown(input?: string | null): string {
  if (!input) return '';
  const rawHtml = micromark(input);
  const tree = fromHtml(rawHtml, { fragment: true }) as any;
  tree.children = filterChildren(tree.children || []);
  return toHtml(tree);
}
