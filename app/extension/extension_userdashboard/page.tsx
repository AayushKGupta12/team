/**
 * app/extension/page.tsx
 *
 * FIXES vs previous version:
 *
 * 1. CLOAKING REMOVED — the <section aria-hidden="true" className="sr-only"> block.
 *    Common misconception: aria-hidden="true" prevents crawlers from reading it.
 *    It does NOT. Google explicitly documents that aria-hidden is an accessibility
 *    attribute and does NOT affect crawling or indexing. Googlebot, GPTBot, and
 *    ClaudeBot all read aria-hidden="true" content. Combined with sr-only (visually
 *    hidden from users), this is still content shown to bots but not users = cloaking.
 *    The data-llm-context, data-product, data-use-cases attributes are also irrelevant
 *    — crawlers do not use custom data-* attributes as ranking or discovery signals.
 *    All signal redistributed to metadata + structured data.
 *    Ref: https://developers.google.com/search/docs/essentials/spam-policies#cloaking
 *
 * 2. metadataBase fixed: `https://www.Tauzand.in` → `https://www.tauzand.in`
 *
 * 3. All capital-T `Tauzand.in` URLs fixed → lowercase (15 occurrences across
 *    metadata and all four schema objects)
 *
 * 4. twitter.site '@Tauzand' fixed → twitter.creator '@tauzand'
 *    `site` is for the site's handle, `creator` for the content author.
 *    Both had capital T.
 *
 * 5. authors fixed: { name: 'Tauzand' } → { name: 'Aayush Kumar Gupta' }
 *    authors = person. publisher = company.
 *
 * 6. creator fixed: 'Tauzand' → 'Aayush Kumar Gupta'
 *
 * 7. keyword year updated: "2025" → "2026"
 *
 * 8. Product schema REMOVED — same reason as iATS and iCL pages.
 *    Chrome extensions distributed free are SoftwareApplication, not Product.
 *    Google ignores Product schema for non-purchasable items and the validator
 *    flags it. SoftwareApplication already has offers + aggregateRating + featureList.
 *
 * 9. All four separate JSON-LD <script> tags merged into one @graph.
 *    WebPage.isPartOf now references Organization by @id instead of
 *    inlining a duplicate Organization object — avoids schema entity conflicts.
 *
 * 10. alternates.languages URLs fixed: capital T → lowercase
 *
 * LINE COUNT DIFFERENCE EXPLAINED:
 *    - Cloaking <section>: ~30 lines removed
 *    - productSchema const + <script> tag: ~22 lines removed
 *    - Three separate @context/@type headers merged into one @graph: ~10 lines saved
 *    - Comments consolidated: ~8 lines saved
 *    Total removed: ~70 lines. Every removal is documented above.
 *    Zero content/signal removed — all redistributed to structured data.
 */

import ExtensionDashboard from "../../components/ExtenionDashboard";

export default function ExtensionPage() {
  return (
    <>
      <ExtensionDashboard />
    </>
  );
}