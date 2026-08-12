# Jaymeebaaby — Website Redesign

Static HTML/CSS/JS rebuild of jaymeebaaby.com, rebuilt around one job: **turn traffic into
booked weddings, corporate events and private parties at higher prices.**

---

## The audit — what was wrong with the old site

Ranked by revenue impact, not by how bad it looked.

| # | Problem | Why it costs money |
|---|---------|--------------------|
| 1 | **No prices anywhere** | Buyers who can't find a number either bounce or treat you as interchangeable. Publishing a floor price filters out tire-kickers *and* anchors you above the $1,200 DJ. |
| 2 | **Zero testimonials or reviews** | Social proof is the #1 conversion driver for wedding vendors. The old site had none — on any page. |
| 3 | **Homepage led with "MEET JAYMEEBAABY"** | The first screen was an About section. A homepage's job is to state the offer and capture the lead, not introduce the artist. |
| 4 | **Elite credentials buried in body copy** | Outside Lands, 99.7 NOW, SF Giants, A's, Bay FC, NWSL Championship, Adobe, Salesforce, LinkedIn — all real, all crammed into one paragraph. This is the single biggest pricing lever and it was invisible. |
| 5 | **Nightlife branding repelled the day-market** | Neon graffiti logo + dark club photography reads "club DJ" to a wedding planner or a corporate events manager. JayByDay existed but was buried on a subpage with two paragraphs and no photos. |
| 6 | **One page for weddings AND corporate** | Three different buyers, three different budgets, three different objection sets, one generic page. |
| 7 | **Empty contact page** | Just "Connect with me" over a HoneyBook iframe. No urgency, no reason to act, no idea what happens next. |
| 8 | **Broken SEO fundamentals** | Leftover Wix template titles (`Contact Us \| Keep on Dancing`). No schema markup. Not ranking for "Bay Area wedding DJ", which is the money keyword. |
| 9 | **No process, no FAQ** | Every unanswered question ("do you MC?", "is ceremony sound extra?", "what if you get sick?") is a reason to email a different DJ instead. |

---

## What was built

Six pages, mobile-first, no framework, no build step.

```
index.html        Homepage — hero, proof, 3 services w/ pricing, testimonials,
                  inclusions, process, gallery, FAQ, CTA
weddings.html     3 published packages, day-of timeline, wedding FAQ
corporate.html    3 packages + a procurement section (COI, W-9, net-30, AV coordination)
parties.html      3 packages, genre breakdown, party FAQ
about.html        Credits, brands, the Jaymeebaaby/JayByDay story
contact.html      HoneyBook embed slot + "what happens next"
assets/css/styles.css
assets/js/main.js
sitemap.xml, robots.txt
```

### The five highest-priority changes

1. **Three named tiers per vertical**, middle tier visually featured because that's the one
   you want booked. The tiers currently differentiate on *scope* (hours, guest count,
   ceremony sound, lighting, production) rather than price — see "Pricing" below.
2. **"Check My Date" as the single CTA**, in the sticky header, in every section, and in a
   mobile sticky bar. One verb, repeated, low-commitment.
3. **Credentials promoted to the first screen** — hero fact bar plus a scrolling client
   marquee (Adobe, Salesforce, LinkedIn, Macy's, Giants, A's, Bay FC).
4. **Split into three service pages** so each buyer reads a page written for them.
   Corporate gets insurance and invoicing; couples get ceremony sound and MC.
5. **SEO rebuilt**: real title tags targeting "Bay Area wedding DJ" / "corporate event DJ
   Bay Area", meta descriptions, canonical URLs, LocalBusiness + Service + Person schema,
   FAQ content that matches how people actually search.

### Design direction — "Ivory Neon"

The typography does the positioning work. Her brand is genuinely two things, so the type
system is two things:

- **Instrument Serif** — elegance. Weddings, corporate, the JayByDay side.
- **Archivo 800 uppercase** — energy. Nightlife, festivals, the Jaymeebaaby side.

**Light base**: warm off-white (`#F7F5F0`) with pure-white alternating sections. Violet and
magenta appear as accents, not as fill. Champagne for emphasis.

Dark is used in exactly four places, where it earns attention:

| Where | Why |
|---|---|
| Final CTA band | The one dark block on a light page pulls the eye straight to the conversion moment |
| Footer | Anchors the bottom of the page |
| "Most booked" package card | Makes the middle tier the obvious default |
| — | The hero is deliberately **not** dark (see below) |

The hero was originally a full-bleed dark photo. It's now a light split layout with the
photo contained in a frame. Two reasons: it keeps the first impression airy, and since
every photo she has is a dark club or stadium shot, containing them stops the page reading
as "nightclub" to a wedding or corporate buyer.

**How the theme works:** dark blocks re-scope the colour tokens (`--fg`, `--surface`,
`--line`, etc.) rather than overriding every child rule. To make any block dark, add
`class="on-dark"` — everything inside adapts. To add another alternating light section,
add `class="light"`. Cards pick up `--surface-alt` automatically, so they stay distinct
from whichever section they sit in without any per-section overrides.

---

## ⚠️ Launch checklist — do these before going live

### Blocking

- [ ] **Replace all testimonial placeholders.** Every quote currently has a bracketed
      attribution like `[Couple names]` / `[Venue · Month Year]`. The quote text is
      realistic *template* copy — **it is not from real clients and must not ship as-is.**
      Pull real reviews from HoneyBook, The Knot, WeddingWire, Google or past client
      emails. Search `BUILD NOTE` in `index.html`, `weddings.html`, `corporate.html`.
- [ ] **Verify the service claims.** The copy asserts things that need to be true:
      $1M liability insurance, COI issuance, W-9, net-30, backup equipment on site,
      24-hour reply time, 30% retainer, "never missed a booking." Confirm each with Jaymee
      and delete anything that isn't accurate.

### Pricing — deferred, by request

No dollar figures appear anywhere on the site. The tiers differentiate on scope, and every
page promises a written quote within 24 hours instead of a published rate.

That promise is now doing the work a price would have done, so **the 24-hour reply has to
be real** — it's stated on the homepage, all three service pages and the contact page.

When the rate card is ready, adding it back is a contained edit:

- Each package card has a `.svc__body` — drop a `<div class="price">Starting at<b>$X</b></div>`
  in above the `<ul class="feats">`. The `.price` CSS is still in `styles.css` and styled
  for both light and dark cards.
- Homepage service cards: the `.svc__meta` row currently holds a full-width button; it was
  built as a two-slot row (price left, link right).
- Re-add `priceSpecification` to the JSON-LD `Offer` blocks at the top of each page — Google
  can show a price range in search results, which is worth having.
- Reinstate the pricing FAQ answer on `index.html` ("How much does a DJ actually cost?").

**Recommendation:** publish a floor price ("weddings from $X") once she's settled on one.
It filters out tire-kickers before they hit her inbox and anchors her above the commodity
DJs — it was the single biggest gap in the old site. But it should be her number, not mine.

### Contact form — deferred, by request

`contact.html` has a marked embed slot with instructions in an HTML comment. HoneyBook →
Tools → Contact Form → Publish → copy the snippet → replace the `.embed-slot` div. The rest
of the page (the "what happens next" column, the helpful-to-include list) works regardless.

### Important

- [ ] **Re-host the images.** Every photo currently points at her Wix CDN
      (`static.wixstatic.com`) so the design is viewable immediately. Those URLs break if
      the Wix site is taken down. Export the originals and drop them in `assets/img/`.
- [ ] **Shoot daytime photography.** This is the biggest remaining asset gap. Every usable
      photo is a dark club or stadium shot. A wedding buyer needs to see her at a wedding:
      ceremony setup, cocktail hour, a full reception dance floor, her in event-appropriate
      dress. Same for a corporate ballroom. Until those exist the wedding and corporate
      pages are working against their own copy.
- [ ] Add a phone number if she wants calls (the mobile sticky bar currently links to
      pricing instead of `tel:`).
- [ ] Update `sitemap.xml` URLs if the final paths differ from `/weddings`, `/corporate`, etc.
- [ ] Add Google Analytics / Meta Pixel and set up conversion tracking on form submit.
- [ ] Claim and fill out a Google Business Profile — for local search this matters more
      than the website itself.

### Nice to have

- [ ] Swap the text client marquee for monochrome SVG logos (text was chosen over the old
      mismatched logo PNGs, which looked cheap — only swap if you have clean SVGs).
- [ ] Add real venue names she's played to the weddings page; venue names are strong
      long-tail SEO ("wedding DJ Cavallo Point").
- [ ] Embed 2–3 vertical video clips of packed dance floors.

---

## Running it locally

```bash
python3 -m http.server 4321
```

Then open http://localhost:4321.

## Deploying

It's plain static files — Netlify, Vercel, Cloudflare Pages or GitHub Pages will all host
it for free. Drag the folder into Netlify, then point the `jaymeebaaby.com` DNS at it and
cancel Wix.

If she'd rather stay on Wix, this repo works as the design and copy spec — but Wix will
fight the typography and the layout, and it's the reason the current site loads slowly.
Moving off it is the recommendation.
