# Predicare Expozitivă

Site-ul atelierelor de predicare expozitivă din România, organizate în parteneriat cu [Charles Simeon Trust](https://simeontrust.org/).

Atelierele echipează predicatori, păstori și lideri de studii biblice cu instrumente practice pentru a mânui corect Cuvântul lui Dumnezeu, folosind o metodologie sistematică în 7 pași — de la analiza structurii textuale până la formularea unei predici expozitive.

## 🛠 Tech Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS** — utility-first styling, tokenuri editoriale în `app/globals.css` (albastru royal, cupru, Playfair Display + Source Sans 3)
- **shadcn/ui** — component library (Radix primitives)
- **Framer Motion** — doar meniul mobil și lightbox-ul galeriei
- **Formspree** — contact form backend
- **Brevo** — newsletter / email list for subscriptions

## 📁 Project Structure

```
app/
├── page.tsx                    # Home (metadata)
├── HomePage.tsx                # Home page component
├── layout.tsx                  # Root layout (fonts, providers)
├── globals.css                 # Global styles
├── not-found.tsx               # 404 page
├── {route}/
│   ├── page.tsx                # Metadata (server component)
│   └── {Route}Page.tsx         # UI component (client component)

src/components/
├── Logo.tsx                    # Mark (5/7 linii) + Wordmark
├── PageHeader.tsx              # Antet tipografic pe bandă albastră
├── SiteHeader.tsx / SiteFooter.tsx
├── SubscribeForm.tsx           # Formularul Brevo, refolosit pe / și /abonare
└── FeaturePlugs.tsx            # Butoanele de final de pagină
├── events/[eventId]/
│   ├── EventLayout.tsx         # Event context provider + nav
│   ├── EventHub.tsx            # Event landing card
│   ├── layout.tsx              # Next.js layout wrapper
│   ├── page.tsx                # Hub page
│   ├── grupe/                  # Small groups sub-page
│   ├── orar/                   # Schedule sub-page
│   └── participanti/           # Participants sub-page
└── api/subscribe/route.ts      # Brevo subscription API

src/
├── components/                 # Shared UI components (Header, Footer, Layout…)
│   └── ui/                     # shadcn/ui primitives
├── hooks/                      # Custom React hooks
└── lib/                        # Utility functions (cn)

public/
├── gallery/                    # Workshop photos (marquee on /despre)
├── og.png                      # Imagine Open Graph (1200×630)
├── favicon.svg                 # Marca „schița în șapte linii”
└── data/
    ├── evenimente.json         # Global event registry & metadata
    └── events/{EVENT_ID}/      # Per-event data
        ├── participants.json
        └── orar.json
```

## 🌐 Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero banner and overview |
| `/despre` | About the workshops — methodology, testimonials, photo gallery |
| `/evenimente` | List of upcoming and past events |
| `/events/{id}` | Event micro-site with schedule, participants, and small groups |
| `/ghid` | Preparation guide for participants |
| `/resurse` | Recommended resources |
| `/contact` | Contact form (Formspree) |
| `/abonare` | Newsletter sign-up (Brevo) |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## 🔑 Environment Variables

Create a `.env.local` file at the project root:

```
BREVO_API_KEY=your_api_key
BREVO_LIST_ID=your_list_id
```

Or pull from Vercel directly:

```bash
vercel env pull .env.local
```

## ➕ Adding a New Event

1. Add an entry in `public/data/evenimente.json` with a unique `eventId`, metadata, and Tally form URLs.
2. Create a folder `public/data/events/{eventId}/` with:
   - `participants.json` — participant list
   - `orar.json` — schedule data
3. The event micro-site is automatically available at `/events/{eventId}`.

## 🖼 Gallery Photos

Workshop photos are stored in `public/gallery/` and listed by `app/api/gallery/route.ts`. They appear as a grid with lightbox on `/despre`; the home page uses `photo-05.jpeg` (hero), `CJ-1.jpeg` and `CJ-3.jpeg` directly. To add new photos, drop them in the folder.

## 📬 Contact Form

The contact form on `/contact` uses [Formspree](https://formspree.io). Formspree handles delivery without requiring a custom backend. The form endpoint ID is configured in `app/contact/ContactPage.tsx`.

## 📧 Newsletter / Abonare

The subscription form on `/abonare` posts to the `/api/subscribe` route, which calls the [Brevo](https://www.brevo.com) API to add contacts to a list. The API key and list ID are stored as environment variables — never in client code.

## 📄 License

Private — All rights reserved.
