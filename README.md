# KUMA Paris — Website

Static three-page site (Home / Menu / Visit & Contact) for KUMA, the Japanese curry & donburi counter in Paris.
Trilingual (EN / FR / 日本語), lightweight, and self-contained — just HTML, CSS, and vanilla JS.

## What's in this version (updated)

Content has been aligned to the real KUMA:

- **Established 2019** (confirmed from the staff T-shirt in the Instagram photos).
- **Two locations, real addresses:**
  - KUMA Marais — 5 rue des Écouffes, 75004 Paris
  - KUMA Cadet — 8 rue Cadet, 75009 Paris
- **Walk-in only / Sans réservation** — this is stated in the Instagram bio, so the site no longer
  has a reservation form or a Click & Collect order flow. The contact page now handles press,
  group visits, and general inquiries only.
- **Instagram handle:** [@kumaparis](https://www.instagram.com/kumaparis/)
- **Menu:** the confirmed items (Katsu, Karaage, Chicken Katsu and Yasai curries; Karaage Don and
  Teriyaki Eggplant Don; nitamago, miso soup; black sesame cheesecake and mango mochi; yuzu
  lemonade, sencha, Japanese beer). Prices are typical (13–14 € for mains) — verify with KUMA
  before publishing.
- **Photos** are 10 real dishes / kitchen shots pulled from the Instagram archive you provided,
  stored locally in `images/`. No external image hosts.

## Structure

```
kuma-paris-website/
├── index.html            # Home — hero, story, favourites, locations, gallery
├── menu.html             # Full menu (rendered from KUMA_MENU in js/app.js)
├── contact.html          # Visit + press / general inquiries form
├── css/style.css         # Design system + polish additions
├── js/i18n.js            # EN / FR / JA strings + language switcher
├── js/app.js             # Menu data + rendering + mobile nav
└── images/               # Real KUMA photos (from Instagram archive)
```

## Editing content

- **Menu items and prices** — edit the `KUMA_MENU` array at the top of `js/app.js`.
- **All display copy** (headlines, taglines, footer, form labels) — edit the `I18N` object in
  `js/i18n.js`. Each key exists in `en`, `fr`, and `ja`.
- **Locations and addresses** — hard-coded in `index.html` and `contact.html`.
- **Photos** — replace files in `images/` (keep the same names, or update the `src` attributes).

## Contact form (contact.html)

The form POSTs to `https://formspree.io/f/YOUR_FORM_ID`. To make it work:

1. Sign up at [formspree.io](https://formspree.io/) (free plan is fine for low volume).
2. Create a new form, copy the endpoint URL.
3. Replace `YOUR_FORM_ID` in `contact.html`.

## Before you publish — a checklist

Things to confirm with KUMA directly (I couldn't verify these from the sources):

- **Exact prices** — the site uses 13–14 € based on reviews, but menu prices change.
- **Opening days and hours** — nothing is displayed on the site (KUMA doesn't publish exact
  hours anywhere I could find). Add them once confirmed — either on the location cards
  (`index.html`) or on the contact page.
- **Whether they want a contact form at all**, or would prefer a plain email address.
- **Any dishes I've missed** — the menu changes seasonally, so add or remove items in
  `js/app.js`.
- **Photo permissions** — the images bundled here come from their Instagram. If this is a
  personal / student project it's fine; if it's going live, get explicit written permission
  from KUMA to use them.

## Design notes

- **Fonts:** Playfair Display (headlines), Inter (body), Noto Serif JP (Japanese accents).
- **Palette:** warm cream surface (`--surface`), soft ink black (`--ink`), red used only as
  an accent (`--red`). No pure white or pure black.
- **No frameworks** — pure HTML/CSS/JS, so it's ~1 minute to host anywhere (GitHub Pages,
  Netlify, a static bucket).
# kuma-website
