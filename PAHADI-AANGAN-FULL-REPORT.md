# PAHADI AANGAN — Complete Project Report & Log

> **Generated:** June 24, 2026
> **Project:** Heritage Retreat Website — Kullu Valley, Himachal Pradesh
> **Framework:** Next.js 16.2.9 (App Router) + TypeScript + Tailwind CSS v4
> **Total Source Lines:** 10,262 lines (`.tsx` + `.ts` + `.css`)
> **Total Source Files:** 69 files under `src/`

---

## TABLE OF CONTENTS

1. [Project Overview](#1-project-overview)
2. [Architecture](#2-architecture)
3. [Route Map — All 36 Pages](#3-route-map--all-36-pages)
4. [Data Model](#4-data-model)
5. [Component Tree](#5-component-tree)
6. [Admin Panel](#6-admin-panel)
7. [Booking Flow](#7-booking-flow)
8. [Authentication System](#8-authentication-system)
9. [All Fixes & Changes Log](#9-all-fixes--changes-log)
10. [Known Limitations](#10-known-limitations)
11. [Setup & Deployment](#11-setup--deployment)

---

## 1. PROJECT OVERVIEW

Pahadi Aangan is a heritage retreat website for a traditional Himachali property in the Kullu Valley. The site showcases:

- **5 heritage rooms** with detailed individual pages
- **Online booking system** with 5-step wizard (Dates → Room → Details → Payment → Confirm)
- **Guest dashboard** for managing bookings
- **Admin panel** with 12 CRUD sections (rooms, bookings, menu, guests, reviews, analytics, offers, gallery, blog, events, staff, settings)
- **12 dining menu items** with Pahadi cuisine
- **8 spa treatments** with Ayurvedic therapies
- **8 experiences** (trekking, cooking class, yoga, paragliding, etc.)
- **4 event categories** (weddings, corporate, celebrations, cultural)
- **6 blog posts** about Himachali culture
- **12 gallery images** across architecture, rooms, dining, experiences
- **4 special offers** with promo codes
- **Guest reviews** section

**Target Audience:** Travelers seeking heritage stays, couples, families, corporate groups.

---

## 2. ARCHITECTURE

```
pahadi-aangan/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout (fonts, metadata, Toaster)
│   │   ├── page.tsx            # Homepage (server component)
│   │   ├── not-found.tsx       # 404 page
│   │   ├── globals.css         # Tailwind v4 + custom theme
│   │   ├── favicon.ico
│   │   ├── admin/              # Admin panel (14 pages)
│   │   ├── auth/               # Guest auth (login, signup, forgot-password)
│   │   ├── blog/               # Blog listing + [slug] detail
│   │   ├── booking/            # 5-step booking wizard
│   │   ├── guest/              # Guest dashboard + bookings
│   │   ├── rooms/              # Rooms listing + [slug] detail
│   │   ├── experiences/        # Experiences listing + [slug] detail
│   │   ├── about/
│   │   ├── contact/
│   │   ├── dining/
│   │   ├── events/
│   │   ├── gallery/
│   │   ├── location/
│   │   ├── offers/
│   │   └── spa/
│   ├── components/
│   │   ├── animations/         # FadeIn, StaggerContainer, PageTransition, AnimatedCounter
│   │   ├── layout/             # Navbar, Footer, PageLoader
│   │   ├── sections/           # Hero, AboutPreview, RoomsPreview, DiningPreview, etc.
│   │   └── ui/                 # Button, ConfirmModal, ErrorBoundary, LoadingSpinner, etc.
│   ├── lib/
│   │   ├── auth.ts             # Admin authentication (localStorage + cookie)
│   │   ├── data.ts             # All seed/default data (274 lines)
│   │   ├── icons.tsx           # Custom SVG icon components
│   │   ├── store.ts            # Generic localStorage CRUD for all entity types
│   │   ├── types.ts            # All TypeScript interfaces (170 lines)
│   │   └── utils.ts            # Utility functions (cn, formatPrice, formatDate, etc.)
│   └── proxy.ts                # Next.js 16 middleware — server-side admin route protection
├── public/                     # Static assets (SVG icons)
├── package.json
├── next.config.ts
├── tsconfig.json
├── setup.bat                   # Windows quick-setup script
├── postcss.config.mjs
├── eslint.config.mjs
└── pahadi-aangan.zip           # Portable archive (263 KB)
```

**Key Architectural Decisions:**
- **100% client-side** — All pages use `'use client'` except root layout and homepage
- **localStorage persistence** — No backend API, no database. All data stored in browser localStorage under `pa_data_*` keys
- **No external payment gateway** — Payment is simulated (2-second delay) with Card/UPI/Netbanking form
- **Admin auth via proxy.ts** — Next.js 16 middleware checks `admin_auth` cookie on every `/admin/*` request

---

## 3. ROUTE MAP — All 36 Pages

| # | Route | Type | Description |
|---|-------|------|-------------|
| 1 | `/` | Static | Homepage (Hero → About → Rooms → Experiences → Dining → Spa → Gallery → Reviews → CTA → Blog) |
| 2 | `/about` | Static | About page with stats counter, values, team, timeline |
| 3 | `/rooms` | Static | Room listing with category filters (All/Featured/Family/Mountain View/Orchard) |
| 4 | `/rooms/[slug]` | Dynamic | Room detail page (images, amenities, booking widget) |
| 5 | `/experiences` | Static | Experience listing with category filters (All/Culture/Food/Adventure/Wellness/Nature) |
| 6 | `/experiences/[slug]` | Dynamic | NEW — Experience detail page with included items, booking CTA |
| 7 | `/dining` | Static | Dining page with menu by category (Starters/Main Course/Specialty/Soups/Breads/Desserts/Beverages) |
| 8 | `/spa` | Static | Spa treatments with category filters (All/Massage/Ayurveda/Body/Steam/Couple) |
| 9 | `/events` | Static | Events page (Wedding/Corporate/Celebration/Cultural) |
| 10 | `/gallery` | Static | Gallery grid by category |
| 11 | `/blog` | Static | Blog listing with featured posts |
| 12 | `/blog/[slug]` | Dynamic | Blog post detail with share, related posts |
| 13 | `/booking` | Static | 5-step booking wizard (Dates → Room → Details → Payment → Confirm) |
| 14 | `/offers` | Static | Special offers with promo code copy |
| 15 | `/contact` | Static | Contact form (saves to localStorage) + map + social links |
| 16 | `/location` | Static | Location page with map embed |
| 17 | `/auth/login` | Static | Guest login |
| 18 | `/auth/signup` | Static | Guest registration |
| 19 | `/auth/forgot-password` | Static | Forgot password page |
| 20 | `/guest` | Static | Guest dashboard (stats, recent bookings, quick links) |
| 21 | `/guest/bookings` | Static | Full booking list with cancel action |
| 22 | `/admin` | Static | Admin login page |
| 23 | `/admin/dashboard` | Static | Admin dashboard (live stats, recent bookings, quick actions) |
| 24 | `/admin/bookings` | Static | Booking management (view, filter, update status, cancel) |
| 25 | `/admin/rooms` | Static | Room CRUD (add/edit/delete rooms) |
| 26 | `/admin/menu` | Static | Menu CRUD (add/edit/delete menu items) |
| 27 | `/admin/guests` | Static | Guest listing with search |
| 28 | `/admin/reviews` | Static | Review management (approve/reject/delete) |
| 29 | `/admin/analytics` | Static | Charts (booking trends line chart, occupancy pie chart, monthly revenue bar) |
| 30 | `/admin/offers` | Static | Offer CRUD (add/edit/delete offers) |
| 31 | `/admin/gallery` | Static | Gallery CRUD (add/edit/delete gallery items) |
| 32 | `/admin/blog` | Static | Blog CRUD (add/edit/delete, featured toggle) |
| 33 | `/admin/events` | Static | Event CRUD (add/edit/delete events) |
| 34 | `/admin/staff` | Static | Staff CRUD (add/edit/delete staff) |
| 35 | `/admin/settings` | Static | Site settings (hero, contact info) + reset all data |
| 36 | `/_not-found` | Static | Next.js built-in 404 |

---

## 4. DATA MODEL

### Core Types (from `src/lib/types.ts`)

```
Room          — id, slug, title, subtitle, description, longDescription, price, size,
                capacity, bedType, amenities[], images[], featured, available, traditional

Booking       — id, guestName, guestEmail, guestPhone, roomType, roomTitle,
                checkIn, checkOut, guests, status(pending|confirmed|checked-in|checked-out|cancelled),
                totalAmount, paymentStatus(pending|paid|refunded), createdAt, specialRequests?

Guest         — id, name, email, phone, totalStays, totalSpent, joinDate, status(active|inactive)

Staff         — id, name, role, email, phone, joinDate, status(active|inactive), image?

Review        — id, name, location, rating, text, date, approved

Offer         — id, title, description, discount, validUntil, code?, image?, featured?

Event         — id, title, description, capacity, pricing, icon, features[], category

MenuItem      — id, name, description, price, category, traditional?

BlogPost      — id, slug, title, excerpt, content, author, date, image, category, tags[], featured

GalleryItem   — id, title, url, caption?, category

Experience    — id, slug, title, subtitle, description, duration, price, images[], included[], category

SpaTreatment  — id, title, description, duration, price, image, category

DashboardStats — totalBookings, totalRevenue, activeGuests, occupancyRate, pendingBookings,
                 confirmedBookings, checkedIn, cancelledBookings

SiteSettings  — heroTitle, heroSubtitle, aboutText, aboutStory, address, addressFull,
                phones[], email, checkIn, checkOut
```

### Store Functions (from `src/lib/store.ts`)

Each entity has `getX()` and `saveX()` functions that read/write from `localStorage` under `pa_data_X` keys.

Special functions:
- `addBooking()` — Creates booking with auto-generated ID and createdAt timestamp
- `updateBookingStatus(id, status)` — Updates a booking's status
- `getStats()` — Returns dashboard stats
- `getSiteSettings()` / `saveSiteSettings()` — Site configuration
- `resetAllData()` — Clears all localStorage entries

### Auth System (from `src/lib/auth.ts`)

- **Admin login:** Stores `admin_auth=true` in both localStorage and cookie with 24-hour expiry
- **Admin logout:** Removes localStorage entry, clears cookie
- **Middleware:** `src/proxy.ts` checks cookie on every `/admin/*` request, redirects to `/admin` if absent
- **Guest login (public):** Stores `guest_auth` JSON in localStorage with name, email, phone
- **Default admin credentials:** `admin` / `admin123` (configurable via `NEXT_PUBLIC_ADMIN_*` env vars)

---

## 5. COMPONENT TREE

### Layout Components
```
RootLayout (src/app/layout.tsx)
├── Toaster (react-hot-toast)
├── Navbar (sticky, scroll-aware, responsive hamburger)
└── Footer (4-column grid: branding, links, traditions, contact)

AdminLayout (src/app/admin/layout.tsx)
├── Sidebar (13 links, dark theme, responsive overlay)
├── Top Header (page title, "View Site" link)
└── AnimatePresence page transitions
```

### Animation Components
```
PageTransition  — Wraps each page with fade + slide
FadeIn          — Opacity + Y animation on scroll
StaggerContainer — Staggered children animation
AnimatedCounter  — Number count-up animation
```

### UI Components
```
Button         — Variants: primary, outline, ghost. Sizes: sm, md, lg
ConfirmModal   — Generic confirm dialog with title/message/confirm variant
LoadingSpinner — Centered spinner
ErrorBoundary  — React error boundary
ScrollToTop    — Floating scroll-to-top button
SectionHeader  — Title + subtitle + description for sections
```

### Section Components (used on homepage)
```
Hero           — Full-screen hero with gradient overlay
AboutPreview   — About section with link to /about
RoomsPreview   — 3 featured room cards
ExperiencesPreview — 3 experience cards
DiningPreview  — Highlights with menu categories
SpaPreview     — Treatment categories
GalleryPreview — Image grid
ReviewsSlider  — Auto-scrolling review cards
CTASection     — Call-to-action with booking link
BlogPreview    — 3 latest blog posts
```

---

## 6. ADMIN PANEL

**Location:** `/admin` (login), `/admin/dashboard` (after login)
**Login:** `admin` / `admin123`

### Sidebar Sections (12 CRUD modules)

| Section | Entity | Operations |
|---------|--------|------------|
| Dashboard | Stats | View live stats, recent bookings, quick actions |
| Bookings | Booking | Filter by status, update status, confirm cancel modal |
| Rooms | Room | Add/edit with form modal, delete with confirm |
| Menu | MenuItem | Add/edit with form modal, delete with confirm |
| Guests | Guest | View/search guest list |
| Reviews | Review | Approve/reject toggle, delete with confirm |
| Analytics | Stats | Line chart, bar chart, pie chart (recharts) |
| Offers | Offer | Add/edit with form modal, delete with confirm |
| Gallery | GalleryItem | Add/edit with form modal, delete with confirm |
| Blog | BlogPost | Add/edit with rich form, featured toggle, delete with confirm |
| Events | Event | Add/edit with form modal, delete with confirm |
| Staff | Staff | Add/edit with form modal, delete with confirm |
| Settings | SiteSettings | Edit hero text, contact info, reset all data |

### Admin UX Features
- All CRUD operations show `toast.success()` / `toast.error()` notifications
- All deletes use `ConfirmModal` with red variant
- Loading spinners on form submissions
- Error recovery via try/catch/finally
- Empty states when no data exists
- Search/filter where applicable

---

## 7. BOOKING FLOW

```
Step 1: Dates       → Select check-in, check-out, number of guests
Step 2: Room        → Select from available rooms (radio selection with cards)
Step 3: Details     → Enter guest name, email, phone, special requests
Step 4: Payment     → Choose payment method (Card / UPI / Net Banking)
                      → Card: number, name, expiry, CVV with formatting
                      → UPI: UPI ID input with validation
                      → Net Banking: Bank dropdown
Step 5: Confirm     → Review booking summary + guest info + payment status
                      → Click "Confirm & Complete Booking"
                      → 2-second simulated payment processing
                      → Booking created with paymentStatus: 'paid'
                      → Redirect to /guest/bookings
```

**Integration points:**
- Room detail page (`/rooms/[slug]`) has a quick booking form that saves to `localStorage('pa_temp_booking')` and redirects to `/booking`
- Guest dashboard has "Book a Room" button linking to `/booking`
- Navbar has "Book Now" CTA linking to `/booking`

---

## 8. AUTHENTICATION SYSTEM

### Admin Auth
```
               Browser                             Server (proxy.ts)
                    │                                      │
  User visits ──────┤────── /admin/* ─────────────────────►│
  /admin/*          │                                      ├── Check admin_auth cookie
                    │                                      ├── Missing? Redirect to /admin
                    │                                      │   with ?redirect=/admin/*
                    │◄───── Redirect to /admin ────────────┤
                    │                                      │
  User sees         │                                      │
  login form at     │                                      │
  /admin            │
                    │
  User enters       │
  credentials ──────┤────── loginAdmin() ──────────────────┤
                    │       ├── localStorage.setItem        │
                    │       ├── document.cookie             │
                    │       └── router.push(/admin/dashboard)│
                    │                                      │
  Subsequent ───────┤────── /admin/* ─────────────────────►│
  requests          │                                      ├── Cookie valid? ✅
                    │◄───── Serve page ────────────────────┤
```

### Guest Auth (Public)
- Login: Any email/password combination creates a `guest_auth` localStorage entry
- Signup: Name, email, phone, password stored
- Dashboard: Shows bookings filtered by the guest's email
- No server-side protection (guest pages are public by design)

---

## 9. ALL FIXES & CHANGES LOG

### 🔴 Issue 1: Admin Layout Overlap (CRITICAL)
**Problem:** "Welcome Admin" heading and navbar were overlapping. `AnimatePresence mode="wait"` was breaking page transitions.
**Fix:** Completely rewrote `src/app/admin/layout.tsx`. Removed `AnimatePresence mode="wait"` from page wrapper. Clean header with dynamic page titles derived from sidebar links. Proper sidebar with active state highlighting. Removed redundant heading overlays.

### 🔴 Issue 2: Admin Dashboard Redundancy
**Problem:** Dashboard had duplicate heading (layout already shows page title). Static data, no loading/error states.
**Fix:** Rewrote `src/app/admin/page.tsx` (now at `/admin/dashboard`). Removed redundant heading. Added live stats from `getStats()`. Recent bookings from `getBookings()`. Loading spinner, error state with retry, empty state for no bookings.

### 🔴 Issue 3: Booking Cancel Without Confirmation
**Problem:** Cancel booking button called `updateBookingStatus(id, 'cancelled')` immediately with no warning.
**Fix:** Added `ConfirmModal` with title "Cancel Booking" to the bookings admin page.

### 🔴 Issue 4: toast.success Before Save (5 pages)
**Problem:** On offers, gallery, blog, events, staff admin pages, `toast.success()` was called BEFORE `saveX()` — if save failed, user saw false success and button got stuck in loading state.
**Fix:** Wrapped save logic in try/catch/finally. Moved `toast.success` after the save call. Added error toast on catch.

### 🔴 Issue 5: Analytics Page Errors
**Problem:** No loading state, used only hardcoded demo data, TypeScript error with `'completed'` status (not a valid booking status).
**Fix:** Added loading spinner. Charts now derive data from `getBookings()`/`getStats()` when data exists, fall back to demo data. Fixed type error by mapping `'checked-out'` to completed.

### 🔴 Issue 6: Admin Login at Wrong URL
**Problem:** Admin login was at `/admin/login` — user wanted `/admin` itself to show login.
**Fix:** Moved login page to `/admin/page.tsx`. Moved dashboard to `/admin/dashboard`. Updated `proxy.ts` to protect `/admin/*` routes (not `/admin`). Updated sidebar links. Removed old `/admin/login` directory. Updated logout redirect.

### 🔴 Issue 7: Hardcoded Credentials on Login Page
**Problem:** Login page showed "Default credentials: admin / admin123" below the form — security risk.
**Fix:** Removed the text. Changed error message from "Invalid credentials. Try admin / admin123" to "Invalid credentials".

### 🔴 Issue 8: Admin Auth Redirect Missing
**Problem:** After login, user was always redirected to `/admin` regardless of which page they originally tried to access.
**Fix:** `proxy.ts` now passes `?redirect=` query param. Login page reads `searchParams.get('redirect')` and redirects there.

### 🔴 Issue 9: Broken Experience Detail Links (404)
**Problem:** Experiences page had "Learn More" buttons linking to `/experiences/[slug]` — but no route existed → 404.
**Fix:** Created `src/app/experiences/[slug]/page.tsx` — full detail page with description, included items, sidebar with duration/price/booking CTA.

### 🔴 Issue 10: No Payment Step in Booking Flow
**Problem:** Booking flow had only 4 steps (Dates → Room → Details → Confirm) with no payment. `paymentStatus` was always 'pending'.
**Fix:** Added Payment step (step 4) with Card/UPI/Netbanking options. Card form with number/expiry/CVV formatting. UPI validation. Shifted Confirm to step 5. Simulated 2-second payment processing. Booking now created with `paymentStatus: 'paid'`.

### 🟡 Enhancement: Admin Route Protection
Added `proxy.ts` (Next.js 16 middleware) for server-side admin route protection. Checks `admin_auth` cookie on every `/admin/*` request. Unauthenticated users are redirected to `/admin`. Already-logged-in users bypass the login page.

### 🟡 Enhancement: Login Page Auto-Redirect
Added `useEffect` to check `isAdmin()` on login page load. If already authenticated, immediately redirects to `/admin/dashboard`. Auto-focuses username input. Shows loading spinner while checking session.

### 🟡 Enhancement: Portable Package
Created `pahadi-aangan.zip` (263 KB, 94 source files) and `setup.bat` for plug-and-play setup on any Windows machine. Copied to `F:\pahadi-aangan\` on TF card.

---

## 10. KNOWN LIMITATIONS

1. **No backend API** — All data is in browser localStorage. Refreshing clears admin-seeded data (returns to defaults from `data.ts`).
2. **No real payment** — Payment is simulated with 2-second delay. No Stripe/Razorpay/any gateway integration.
3. **No email notifications** — Booking confirmations, password resets, etc. are not sent.
4. **No database** — Cannot persist data across users or devices.
5. **Client-side only** — All pages use `'use client'`. No server-side rendering benefits.
6. **No image upload** — Gallery images are URL-based (Unsplash). No file upload functionality.
7. **Admin credentials hardcoded** — Default `admin/admin123` is in the env vars. No multi-admin support.
8. **No real-user auth** — Guest login just stores email in localStorage — no password verification.
9. **No internationalization** — English only. No i18n support.
10. **No PWA** — No service worker, no offline support, no manifest.
11. **No SEO metadata per page** — Most pages don't have custom `<head>` metadata.
12. **Accessibility** — Basic ARIA labels present but no comprehensive screen reader support.

---

## 11. SETUP & DEPLOYMENT

### Quick Start (Windows)
```
1. Extract pahadi-aangan.zip anywhere
2. Double-click setup.bat
3. Wait for npm install + build
4. Open http://localhost:3000
```

### Manual Setup
```bash
npm install
npm run build
npm start -p 3000
```

### Environment Variables
| Variable | Default | Purpose |
|----------|---------|---------|
| `NEXT_PUBLIC_ADMIN_USERNAME` | `admin` | Admin login username |
| `NEXT_PUBLIC_ADMIN_PASSWORD` | `admin123` | Admin login password |

### Production Build
```bash
npm run build    # Output in .next/
npm start -p 3000
```

### Admin Access
- **URL:** `http://localhost:3000/admin`
- **Login:** `admin` / `admin123`

---

*End of Report — 10,262 lines of source code across 69 files, 36 routes, 12 admin CRUD modules*
