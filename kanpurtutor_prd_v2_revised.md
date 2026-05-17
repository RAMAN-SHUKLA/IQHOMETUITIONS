# KanpurTutor — Revised Product Requirements Document
### Home Tuition Discovery Platform · Kanpur, UP, India
**Version:** 2.0 (Revised)
**Date:** May 2026
**Build Window:** 7 Days
**Status:** Ready for Development

---

## What Changed from v1.0

| v1.0 Assumption | v2.0 Reality |
|---|---|
| Teachers listed publicly with contact details | Teacher details are private; admin mediates |
| Parents contact teachers directly | Parents contact platform WhatsApp only |
| Database (PostgreSQL) | Google Sheets as data store |
| Dashboards for teachers and parents | No dashboards — online presence only |
| Payment gateway | Removed entirely |
| Auth / login system | Not needed |
| Booking calendar, reviews | Removed |
| Pricing info shown | Removed |
| Complex backend | Thin Node.js proxy only |

**The new model in one sentence:**
> KanpurTutor is a **SEO-first static marketing website** where parents discover that qualified home tutors are available in their Kanpur area, inquire via a single platform WhatsApp number, and teachers register through a form whose data flows into a private Google Sheet for admin review and manual matching.

---

## Table of Contents

1. [Vision and Objectives](#1-vision-and-objectives)
2. [How the Platform Works](#2-how-the-platform-works)
3. [Target Audience](#3-target-audience)
4. [Site Structure and Pages](#4-site-structure-and-pages)
5. [Features and Workflows](#5-features-and-workflows)
6. [Information Architecture (No Database)](#6-information-architecture)
7. [Technical Requirements](#7-technical-requirements)
8. [App Blueprint — React + Node.js](#8-app-blueprint)
9. [SEO Strategy](#9-seo-strategy)
10. [UI/UX and Design](#10-uiux-and-design)
11. [Non-Functional Requirements](#11-non-functional-requirements)
12. [7-Day Delivery Plan](#12-7-day-delivery-plan)
13. [Risks and Mitigation](#13-risks-and-mitigation)
14. [Appendices](#14-appendices)

---

## 1. Vision and Objectives

### 1.1 Vision

A fast, trustworthy, SEO-optimised website that positions KanpurTutor as the go-to directory for home tuition in Kanpur — without exposing teacher personal information publicly, without complex infrastructure, and without a database. The website generates leads for the platform operator, who then manually connects parents with suitable tutors via WhatsApp.

### 1.2 Core Model

```
TEACHER SIDE                          PARENT SIDE
─────────────                         ────────────
Teacher finds site                    Parent searches Google
        ↓                                     ↓
Fills registration form               Lands on area/subject page
        ↓                                     ↓
Data → Google Sheet (private)         Clicks "Find a Tutor" CTA
        ↓                                     ↓
Admin reviews sheet                   Platform WhatsApp opens
        ↓                             (pre-filled inquiry message)
Admin contacts teacher via WA                 ↓
        ↓                             Admin manually matches parent
Manual introduction made              with suitable teacher from sheet
                                              ↓
                                      Teacher and parent connect privately
```

### 1.3 Goals

**Business Goals**
- Rank on Page 1 of Google for 40+ Kanpur home tuition keywords within 3 months
- Collect 500+ teacher registrations in the Google Sheet within 6 months
- Generate 200+ parent WhatsApp inquiries per month by Month 4
- Build brand recognition as Kanpur's trusted tuition mediator

**Product Goals**
- Launch a working website in 7 calendar days
- Zero maintenance infrastructure (no DB to manage)
- Teacher data stays private and secure (Google Sheet access = admin only)
- Parents never see teacher phone numbers, names, or personal details
- Fast page loads; excellent Core Web Vitals scores

**Non-Goals (explicitly out of scope)**
- Online payments of any kind
- Teacher or parent login/accounts
- Public teacher profiles
- Direct teacher-to-parent contact on platform
- Pricing display
- Reviews or ratings
- Booking management

### 1.4 Success Metrics

| Metric | Month 1 | Month 3 | Month 6 |
|---|---|---|---|
| Google Page 1 Keywords | 3 | 20 | 50 |
| Monthly Organic Sessions | 300 | 2,000 | 8,000 |
| Teacher Form Submissions | 50 | 250 | 600 |
| Parent WhatsApp Inquiries | 30 | 150 | 400 |
| Avg Page Load (LCP) | < 2.5s | < 2.0s | < 1.8s |
| Mobile Lighthouse Score | > 85 | > 90 | > 92 |

---

## 2. How the Platform Works

### 2.1 The Three Actors

| Actor | Role | Privacy |
|---|---|---|
| **Teacher** | Registers interest; fills a form | Details stored privately in Google Sheet; NOT shown on site |
| **Parent / Student** | Discovers site; contacts platform via WhatsApp | Anonymous; no login needed |
| **Admin (Operator)** | Reviews Sheet; manually matches; communicates via WhatsApp | Has Sheet access and manages WhatsApp number |

### 2.2 Privacy-First Teacher Data Flow

```
Teacher Form (website)
        │
        ▼
POST /api/register (Node.js proxy)
        │  (validates, rate-limits, sanitises)
        ▼
Google Sheets API → Append row to private sheet
        │
        ▼
Admin opens sheet → reviews submission
        │
        ▼
Admin adds "Status" column: Pending / Contacted / Active / Rejected
        │
        ▼ (when parent inquiry arrives via WhatsApp)
Admin cross-references sheet → picks suitable teacher
        │
        ▼
Admin WhatsApps teacher → shares parent contact (with consent)
        │
        ▼
Teacher and parent connect directly off-platform
```

**What is NOT stored anywhere on the website:**
- Teacher names
- Teacher phone numbers
- Teacher addresses
- Any personal identifiers

### 2.3 Parent Inquiry Flow

```
Parent lands on page (Google search / referral)
        │
        ▼
Browses: "Tutors available in Civil Lines for Class 10 Maths"
        │
        ▼
Clicks "Find a Tutor on WhatsApp" button
        │
        ▼
wa.me/{PLATFORM_WHATSAPP}?text={pre-filled message}
Pre-filled: "Hi, I'm looking for a home tutor for
            Class [X], Subject [Y] in [Area], Kanpur."
        │
        ▼
Admin responds via platform WhatsApp
        │
        ▼
Admin checks Google Sheet → finds matches → introduces
```

**The platform WhatsApp number is the only contact published on the site.**

---

## 3. Target Audience

### 3.1 Teachers / Tutors

- College graduates, school teachers, professional tutors in Kanpur
- Tech level: WhatsApp-comfortable; can fill a web form on mobile
- Key motivation: Free listing; increased visibility; trust of a "platform" over flyers
- Primary areas: Civil Lines, Kakadeo, Swaroop Nagar, Kidwai Nagar, Kalyanpur, Govind Nagar, Arya Nagar, Indira Nagar, Harsh Nagar

### 3.2 Parents

- Parents of school-going children (Class 1–12)
- CBSE, UP Board, ICSE exam families
- Search behaviour: Google + WhatsApp recommendations
- Primary concern: Finding a trustworthy, local, qualified tutor
- Key decision triggers: Verification signal, local presence, easy contact

### 3.3 Students (Self-Search)

- Class 9–12, JEE/NEET aspirants, competitive exam students
- Comfortable searching on mobile
- Prefer WhatsApp-based inquiry over phone calls

### 3.4 Kanpur Market Context (Summary)

- Informal home tuition market: ₹120–180 crore annually in Kanpur
- Primary exam pressure: UP Board, CBSE, JEE, NEET, NDA
- No dominant hyper-local platform — SEO gap exists
- Primary discovery: Google Search, WhatsApp groups, Facebook groups

---

## 4. Site Structure and Pages

### 4.1 Sitemap

```
kanpurtutor.in/
│
├── /                              ← Homepage
├── /find-tutor                    ← Parent inquiry landing page
├── /register-tutor                ← Teacher registration form
│
├── /tutors/                       ← Subject hub pages (SEO)
│   ├── /tutors/maths              ← Maths tutors Kanpur
│   ├── /tutors/science            ← Science tutors Kanpur
│   ├── /tutors/physics
│   ├── /tutors/chemistry
│   ├── /tutors/biology
│   ├── /tutors/english
│   ├── /tutors/hindi
│   ├── /tutors/social-science
│   ├── /tutors/computer
│   ├── /tutors/accountancy
│   ├── /tutors/jee
│   ├── /tutors/neet
│   └── /tutors/spoken-english
│
├── /areas/                        ← Area hub pages (SEO — key priority)
│   ├── /areas/civil-lines
│   ├── /areas/kakadeo
│   ├── /areas/swaroop-nagar
│   ├── /areas/kidwai-nagar
│   ├── /areas/harsh-nagar
│   ├── /areas/kalyanpur
│   ├── /areas/govind-nagar
│   ├── /areas/arya-nagar
│   ├── /areas/indira-nagar
│   ├── /areas/shyam-nagar
│   ├── /areas/panki
│   ├── /areas/rawatpur
│   ├── /areas/barra
│   └── ... (35 total areas)
│
├── /blog/                         ← SEO blog listing
│   └── /blog/[slug]               ← Individual blog posts (MDX)
│
├── /about
├── /contact
├── /privacy-policy
└── /terms-of-service
```

### 4.2 Page Types and Rendering Strategy

| Page Type | Rendering | SEO Priority | Count |
|---|---|---|---|
| Homepage | Static (SSG) | Very High | 1 |
| Find Tutor | Static | High | 1 |
| Register Tutor | Static (form) | Medium | 1 |
| Subject Pages | Static (SSG) | Very High | 13 |
| Area Pages | Static (SSG) | Critical | 35 |
| Blog Posts | Static MDX (SSG) | Very High | 20+ |
| Blog Index | Static | High | 1 |
| About / Contact | Static | Low | 2 |
| Legal Pages | Static | Low | 2 |

**Total pages at launch: ~75 indexed pages**

---

## 5. Features and Workflows

### 5.1 Feature List (Complete Scope)

| # | Feature | Priority | Day |
|---|---|---|---|
| F1 | Homepage with search, areas, subjects | P0 | Day 2 |
| F2 | Area landing pages (35 pages, SSG) | P0 | Day 3 |
| F3 | Subject landing pages (13 pages, SSG) | P0 | Day 3 |
| F4 | WhatsApp CTA (platform number only) | P0 | Day 2 |
| F5 | Teacher registration form | P0 | Day 4 |
| F6 | Google Sheets form submission | P0 | Day 4 |
| F7 | Blog module (MDX static posts) | P1 | Day 5 |
| F8 | SEO metadata (per page) | P0 | Day 3 |
| F9 | Sitemap.xml auto-generation | P0 | Day 5 |
| F10 | robots.txt | P0 | Day 1 |
| F11 | Structured data (JSON-LD) | P1 | Day 5 |
| F12 | Mobile responsive layout | P0 | Day 2 |
| F13 | About and Contact pages | P2 | Day 6 |
| F14 | Privacy Policy and ToS pages | P1 | Day 6 |
| F15 | Cookie consent banner | P1 | Day 6 |
| F16 | Rate limiting on form endpoint | P0 | Day 4 |
| F17 | Success / error state on form | P0 | Day 4 |
| F18 | "Find Tutor" inquiry page | P0 | Day 3 |
| F19 | OG image and social preview tags | P1 | Day 5 |
| F20 | Google Analytics 4 integration | P1 | Day 6 |

---

### 5.2 Teacher Registration Form

**Purpose:** Collect tutor data into Google Sheets privately. No data is displayed on the website.

**Form Fields:**

```
Section 1 — Personal Details (kept private)
  Full Name *
  WhatsApp Number * (10 digits, Indian mobile)
  Gender (Male / Female / Other)
  Area of Residence in Kanpur * (dropdown — 35 areas)
  Years of Teaching Experience * (dropdown: 0–1, 1–3, 3–5, 5–10, 10+)

Section 2 — Teaching Details (used for admin matching only)
  Subjects You Teach * (multi-select checkboxes)
    [ ] Mathematics  [ ] Science     [ ] Physics
    [ ] Chemistry    [ ] Biology     [ ] English
    [ ] Hindi        [ ] Social Sci  [ ] Computer
    [ ] Accountancy  [ ] Economics   [ ] Sanskrit
    [ ] JEE Maths    [ ] JEE Physics [ ] JEE Chemistry
    [ ] NEET Biology [ ] NDA         [ ] UPSC
    [ ] CTET         [ ] Spoken English [ ] Other

  Classes You Teach * (multi-select)
    [ ] Class 1–5   [ ] Class 6–8   [ ] Class 9–10
    [ ] Class 11–12 [ ] JEE/NEET    [ ] Competitive Exams

  Board Expertise * (multi-select)
    [ ] CBSE  [ ] UP Board  [ ] ICSE  [ ] IGCSE

  Teaching Mode *
    ( ) Home Visit  ( ) Online  ( ) Both

Section 3 — Areas You Can Travel To
  Select up to 5 areas in Kanpur where you can travel:
  [Multi-select dropdown — 35 areas]

Section 4 — Availability
  Available Days (checkboxes: Mon Tue Wed Thu Fri Sat Sun)
  Available Time Slots:
    [ ] Morning (6am–12pm)
    [ ] Afternoon (12pm–5pm)
    [ ] Evening (5pm–9pm)

Section 5 — Additional
  Short Introduction (textarea, 50–300 characters)
  Do you have a degree/qualification? (Yes / No)
  Highest Qualification (text field)
  Consent checkbox *:
    "I agree that my details will be stored privately and
     used only to match me with potential students.
     My contact information will NOT be published on the website."

[Submit Registration] button
```

**Validation Rules:**
- WhatsApp number: 10 digits, starts with 6–9
- At least 1 subject selected
- At least 1 class selected
- At least 1 area selected
- Introduction: minimum 50 characters
- Consent: required

**After Submission:**
- Success screen: "Thank you! We have received your registration. Our team will contact you on WhatsApp within 24–48 hours."
- Admin receives new row in Google Sheet
- No email/SMS sent automatically (admin manually follows up)

---

### 5.3 Parent WhatsApp Inquiry Flow

**No form is shown to parents.** Contact is purely via WhatsApp button.

**WhatsApp CTA Behaviour:**

Each page generates a contextual pre-filled WhatsApp message:

| Page | Pre-filled WhatsApp Text |
|---|---|
| Homepage | "Hi, I'm looking for a home tutor in Kanpur. Can you help?" |
| Area page (e.g. Civil Lines) | "Hi, I need a home tutor in Civil Lines, Kanpur. Can you help?" |
| Subject page (e.g. Maths) | "Hi, I need a Maths home tutor in Kanpur. Can you help?" |
| Find Tutor page | "Hi, I'm looking for a home tutor in Kanpur. Please guide me." |

**WhatsApp URL format:**
```
https://wa.me/91XXXXXXXXXX?text=Hi%2C+I+need+a+home+tutor...
```

The platform WhatsApp number is set in a single `.env` variable.

**The WhatsApp number shown is the admin/platform number — never a teacher's number.**

---

### 5.4 Area Landing Pages

Each of the 35 area pages contains:

```
/areas/civil-lines

[H1] Home Tutors in Civil Lines, Kanpur
[Meta Title] Home Tutor in Civil Lines Kanpur | KanpurTutor
[Meta Description] Find verified home tutors in Civil Lines, Kanpur for
CBSE, UP Board, JEE, and NEET. Contact us on WhatsApp for free assistance.

[Hero section]
  "Qualified home tutors are available in Civil Lines, Kanpur"
  [WhatsApp CTA Button — contextual message]

[Subjects available in this area]
  Visual chips: Maths · Science · Physics · English · ...
  (These are static — not pulled from DB; all subjects shown for all areas)

[How it works — 3 steps]
  1. Send us a WhatsApp message
  2. Tell us your subject, class, and timing
  3. We connect you with a matched tutor

[Why KanpurTutor]
  ✓ Verified tutors only
  ✓ Free matching service
  ✓ Local to your area

[SEO content block — 150–200 words of unique text]
  "Civil Lines is one of Kanpur's most prominent residential
   and commercial areas... Home tuition in Civil Lines is in
   high demand for CBSE and UP Board students..."

[FAQ section — 4 questions with answers, targets rich snippets]
  Q: How do I find a home tutor in Civil Lines?
  Q: What subjects are available for home tuition in Civil Lines?
  Q: Is the first demo class free?
  Q: How quickly can I get a tutor in Civil Lines?

[Related areas] Civil Lines → Harsh Nagar · Swaroop Nagar · Mall Road

[CTA section]
  "Ready to find the right tutor?"
  [WhatsApp Button]
```

---

### 5.5 Subject Landing Pages

Each of the 13 subject pages contains:

```
/tutors/maths

[H1] Home Maths Tutor in Kanpur
[Meta] Home Maths Tutor in Kanpur | Expert Teachers | KanpurTutor

[Hero] "Find expert Maths home tutors across Kanpur"
  [WhatsApp CTA]

[Coverage — visual area chips]
  "Available in: Civil Lines · Kakadeo · Swaroop Nagar · ..."

[Class coverage — visual]
  Class 6–8 · Class 9–10 · Class 11–12 · JEE

[Board coverage]
  CBSE · UP Board · ICSE

[How it works — 3 steps]

[SEO content block — unique per subject, 150–200 words]
  "Mathematics is one of the most sought-after subjects
   for home tuition in Kanpur. Whether your child is
   preparing for UP Board exams or targeting JEE..."

[FAQ — 4 questions]
  Q: How much does a Maths home tutor cost in Kanpur?
  → "Please WhatsApp us and we'll guide you based on your requirements."
  Q: Are Maths tutors available for JEE in Kanpur?
  Q: Do you have female Maths tutors in Kanpur?
  Q: Can I get a demo class first?

[Related subjects] Physics · Science · Accountancy

[CTA] [WhatsApp Button]
```

**Note:** No pricing is shown anywhere. FAQ answers for pricing redirect to WhatsApp.

---

### 5.6 Blog Module

**Implementation:** MDX files (static, no CMS database)

**File structure:**
```
/content/blog/
  best-home-tutor-kanpur.mdx
  how-to-find-tutor-kanpur.mdx
  cbse-vs-up-board-kanpur.mdx
  jee-home-tuition-kanpur.mdx
  ...
```

**Each MDX file has frontmatter:**
```yaml
---
title: "How to Find the Best Home Tutor in Kanpur (2026 Guide)"
slug: "how-to-find-home-tutor-kanpur"
excerpt: "A complete guide to finding verified home tutors in Kanpur..."
publishedAt: "2026-05-10"
category: "tips"
tags: ["kanpur", "home tuition", "tips"]
metaTitle: "How to Find the Best Home Tutor in Kanpur | KanpurTutor"
metaDescription: "Looking for a home tutor in Kanpur? Read our..."
featuredImage: "/images/blog/find-tutor-kanpur.jpg"
---
```

**Blog features:**
- Blog listing page (card grid, sorted by date)
- Individual post pages (full article, related posts, WhatsApp CTA)
- Category and tag filtering
- Auto-included in sitemap.xml
- Schema markup: `Article` JSON-LD on each post

**Content plan (20 posts, written before launch):**
See Appendix A.

---

### 5.7 Find a Tutor Page (Inquiry Landing)

**URL:** `/find-tutor`

This page is a conversion-focused landing page. No form — pure WhatsApp funnel.

```
[H1] Find a Home Tutor in Kanpur — For Free

[Sub-headline]
Tell us your subject, class, and area.
We'll connect you with a verified local tutor via WhatsApp.

[3-step visual]
  Step 1: WhatsApp us your requirements
  Step 2: We search our verified tutor network
  Step 3: We introduce you to the right tutor (free)

[Large WhatsApp CTA]
  📱 WhatsApp Us Now — It's Free
  +91 XXXXXXXXXX

[Subject quick-links]
  [Maths] [Science] [Physics] [English] [JEE] [NEET] ...

[Area quick-links]
  [Civil Lines] [Kakadeo] [Swaroop Nagar] ...

[FAQ]
  Q: Is this service free for parents?
  Q: How soon will I get a tutor?
  Q: Are tutors verified?
  Q: What areas in Kanpur do you cover?
```

---

## 6. Information Architecture

### 6.1 No Database — Data Sources

| Data Type | Storage | Access |
|---|---|---|
| Teacher registrations | Google Sheets (private) | Admin only |
| Blog posts | MDX files in `/content/blog/` | Static build |
| Area data | TypeScript constant file | Static build |
| Subject data | TypeScript constant file | Static build |
| SEO content per page | TypeScript/MDX | Static build |
| Site config (WA number, etc.) | `.env` file | Build time |
| Analytics events | Google Analytics 4 | GA4 dashboard |

### 6.2 Google Sheets Schema

**Sheet Name:** `KanpurTutor_Teacher_Registrations`

| Column | Data | Example |
|---|---|---|
| A — Timestamp | Auto | 2026-05-16 14:32 |
| B — Full Name | Form input | Ravi Kumar |
| C — WhatsApp | Form input | 9876543210 |
| D — Gender | Form input | Male |
| E — Residence Area | Form input | Civil Lines |
| F — Experience | Form input | 3–5 years |
| G — Subjects | Form input (comma-sep) | Maths, Physics |
| H — Classes | Form input | Class 9–10, Class 11–12 |
| I — Boards | Form input | CBSE, UP Board |
| J — Teaching Mode | Form input | Home Visit |
| K — Travel Areas | Form input | Civil Lines, Harsh Nagar |
| L — Available Days | Form input | Mon, Tue, Wed, Thu, Fri |
| M — Time Slots | Form input | Morning, Evening |
| N — Introduction | Form input | Experienced Maths... |
| O — Qualification | Form input | B.Sc Mathematics |
| P — Has Degree | Form input | Yes |
| Q — IP Address | Server-captured | 103.x.x.x |
| R — User Agent | Server-captured | Mozilla/5.0... |
| S — Status (Admin) | Admin fills manually | Pending |
| T — Admin Notes | Admin fills manually | Called, interested |
| U — Date Contacted | Admin fills manually | 2026-05-17 |

**Sheet access:** Restricted to admin Google account only. No API read access from frontend.

### 6.3 Static Data Models (TypeScript Constants)

#### Areas Data (`/src/data/areas.ts`)
```typescript
export interface Area {
  id: number;
  name: string;
  slug: string;
  isPopular: boolean;
  seoContent: string;    // unique 150-word paragraph per area
  relatedAreas: string[]; // slugs
  faqs: FAQ[];
}

export const KANPUR_AREAS: Area[] = [
  {
    id: 1,
    name: "Civil Lines",
    slug: "civil-lines",
    isPopular: true,
    seoContent: "Civil Lines is Kanpur's most prominent...",
    relatedAreas: ["harsh-nagar", "swaroop-nagar", "mall-road"],
    faqs: [
      {
        question: "How do I find a home tutor in Civil Lines?",
        answer: "Simply WhatsApp us at our platform number..."
      }
    ]
  },
  // ... 34 more areas
];
```

#### Subjects Data (`/src/data/subjects.ts`)
```typescript
export interface Subject {
  id: number;
  name: string;
  slug: string;
  category: "school" | "competitive" | "language";
  classes: string[];      // e.g., ["Class 6–8", "Class 9–10"]
  boards: string[];
  seoContent: string;
  faqs: FAQ[];
  relatedSubjects: string[];
}

export const SUBJECTS: Subject[] = [
  {
    id: 1,
    name: "Mathematics",
    slug: "maths",
    category: "school",
    classes: ["Class 1–5", "Class 6–8", "Class 9–10", "Class 11–12"],
    boards: ["CBSE", "UP Board", "ICSE"],
    seoContent: "Mathematics is the most sought-after...",
    faqs: [...],
    relatedSubjects: ["physics", "science", "jee"]
  },
  // ... 12 more subjects
];
```

#### Site Config (`/src/config/site.ts`)
```typescript
export const SITE_CONFIG = {
  name: "KanpurTutor",
  tagline: "Find Verified Home Tutors in Kanpur",
  url: "https://kanpurtutor.in",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER!, // 91XXXXXXXXXX
  whatsappDefaultMessage: "Hi, I'm looking for a home tutor in Kanpur.",
  adminEmail: "admin@kanpurtutor.in",
  googleSheetsId: process.env.GOOGLE_SHEETS_ID!,
  gaTrackingId: process.env.NEXT_PUBLIC_GA_ID!,
};
```

### 6.4 Node.js API — Single Endpoint

The only backend endpoint is the teacher registration form submission.

**Endpoint:** `POST /api/register`

**Request body:**
```typescript
{
  fullName: string;          // required, 2–100 chars
  whatsapp: string;          // required, 10 digits
  gender: string;            // required
  residenceArea: string;     // required, valid area slug
  experience: string;        // required
  subjects: string[];        // required, min 1
  classes: string[];         // required, min 1
  boards: string[];          // required, min 1
  teachingMode: string;      // required
  travelAreas: string[];     // required, min 1, max 5
  availableDays: string[];   // required, min 1
  timeSlots: string[];       // required, min 1
  introduction: string;      // required, 50–300 chars
  qualification: string;     // required
  hasDegree: "yes" | "no";  // required
  consentGiven: boolean;     // required, must be true
}
```

**Server-side processing:**
```
1. Validate all fields (Zod schema)
2. Rate limit check: max 3 submissions per IP per 24 hours (Redis or in-memory)
3. Sanitise all string inputs (trim, strip HTML)
4. Append row to Google Sheet via Google Sheets API (service account)
5. Return success or structured error
```

**Response:**
```json
// Success
{ "success": true, "message": "Registration submitted successfully." }

// Validation error
{ "success": false, "error": "VALIDATION_ERROR", "fields": { "whatsapp": "Invalid number" } }

// Rate limit
{ "success": false, "error": "TOO_MANY_REQUESTS", "message": "Please try again tomorrow." }

// Server error
{ "success": false, "error": "SERVER_ERROR", "message": "Please try again shortly." }
```

---

## 7. Technical Requirements

### 7.1 Tech Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Framework** | Next.js 14 (App Router) | SSG for all pages; built-in SEO primitives; Vercel deployment |
| **Language** | TypeScript | Type safety; shared types across form + API |
| **Styling** | Tailwind CSS v3 | Utility-first; mobile-first; fast iteration |
| **UI Components** | shadcn/ui (Radix UI) | Accessible, unstyled, composable |
| **Forms** | React Hook Form + Zod | Performant validation; schema shared with API |
| **Backend** | Node.js (Next.js API Routes) | No separate server needed; same repo |
| **Data storage** | Google Sheets API | No DB to manage; admin-friendly |
| **Rate limiting** | In-memory (Map) + optional Upstash Redis | Simple; serverless-compatible |
| **Blog content** | MDX (next-mdx-remote or @next/mdx) | No CMS; files in repo; static build |
| **Sitemap** | next-sitemap | Auto-generates from pages + MDX |
| **Hosting** | Vercel (free tier sufficient at launch) | Zero config; auto SSL; CDN; perfect for Next.js |
| **Analytics** | Google Analytics 4 | Free; integrates with Search Console |
| **Error tracking** | Sentry (free tier) | Catch form submission errors |

### 7.2 Google Sheets API Integration

**Authentication method:** Service Account (recommended over OAuth for server-side)

**Setup steps:**
```
1. Create a Google Cloud project
2. Enable Google Sheets API
3. Create a service account → download JSON key
4. Share the target Google Sheet with the service account email
5. Store service account credentials in environment variables
6. Use `googleapis` npm package in API route
```

**Environment variables:**
```bash
# .env.local
NEXT_PUBLIC_WHATSAPP_NUMBER=91XXXXXXXXXX
GOOGLE_SHEETS_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms
GOOGLE_SERVICE_ACCOUNT_EMAIL=kanpurtutor@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n..."
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://kanpurtutor.in
RATE_LIMIT_MAX_PER_IP=3
RATE_LIMIT_WINDOW_MS=86400000
```

**Google Sheets append code (Node.js API route):**
```typescript
// /src/app/api/register/route.ts
import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';
import { registerSchema } from '@/lib/validations/register';
import { checkRateLimit } from '@/lib/rateLimit';

const getGoogleSheetsClient = () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  return google.sheets({ version: 'v4', auth });
};

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';

  // Rate limiting
  const allowed = checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { success: false, error: 'TOO_MANY_REQUESTS' },
      { status: 429 }
    );
  }

  const body = await req.json();

  // Validation
  const result = registerSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { success: false, error: 'VALIDATION_ERROR',
        fields: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const data = result.data;
  const timestamp = new Date().toISOString();

  const row = [
    timestamp,
    data.fullName,
    data.whatsapp,
    data.gender,
    data.residenceArea,
    data.experience,
    data.subjects.join(', '),
    data.classes.join(', '),
    data.boards.join(', '),
    data.teachingMode,
    data.travelAreas.join(', '),
    data.availableDays.join(', '),
    data.timeSlots.join(', '),
    data.introduction,
    data.qualification,
    data.hasDegree,
    ip,
    req.headers.get('user-agent') ?? '',
    'Pending',  // Status — admin fills
    '',         // Admin Notes
    '',         // Date Contacted
  ];

  try {
    const sheets = getGoogleSheetsClient();
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: 'Sheet1!A:U',
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [row] },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Sheets append error:', error);
    return NextResponse.json(
      { success: false, error: 'SERVER_ERROR' },
      { status: 500 }
    );
  }
}
```

### 7.3 Rate Limiting (Serverless-Compatible)

For Vercel serverless functions, use a simple in-memory map (effective for single-region deployment at MVP scale):

```typescript
// /src/lib/rateLimit.ts
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(
  ip: string,
  max = Number(process.env.RATE_LIMIT_MAX_PER_IP ?? 3),
  windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS ?? 86_400_000)
): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= max) return false;

  entry.count++;
  return true;
}
```

> **Note:** For production scale (Phase 2), replace with Upstash Redis (free tier, serverless KV).

### 7.4 Security Considerations

| Risk | Mitigation |
|---|---|
| Spam form submissions | Rate limiting (3/IP/day); honeypot field |
| Bot form fill | Cloudflare Turnstile (free) or simple honeypot |
| Data exposure | Google Sheet is private; no frontend read access |
| XSS | React escapes JSX by default; Zod sanitises inputs |
| CORS | API route restricted to same-origin only |
| Environment leakage | Server-only env vars (no `NEXT_PUBLIC_` prefix for secrets) |
| DDoS | Cloudflare proxy (free plan) |
| Sheet ID exposure | Never exposed in frontend; server-only env var |

**Honeypot field implementation:**
```tsx
// Hidden field — bots fill it; humans don't see it
<input
  type="text"
  name="website"  // bots fill this
  className="hidden"
  tabIndex={-1}
  aria-hidden="true"
/>
// API route: reject if `website` field has any value
```

---

## 8. App Blueprint

### 8.1 Project Structure

```
kanpurtutor/                         ← Root (single Next.js project)
│
├── src/
│   ├── app/                         ← Next.js App Router
│   │   ├── layout.tsx               ← Root layout (fonts, GA, cookie banner)
│   │   ├── page.tsx                 ← Homepage
│   │   ├── globals.css
│   │   │
│   │   ├── find-tutor/
│   │   │   └── page.tsx
│   │   │
│   │   ├── register-tutor/
│   │   │   └── page.tsx             ← Multi-step form
│   │   │
│   │   ├── areas/
│   │   │   └── [slug]/
│   │   │       └── page.tsx         ← SSG: generateStaticParams()
│   │   │
│   │   ├── tutors/
│   │   │   └── [subject]/
│   │   │       └── page.tsx         ← SSG: generateStaticParams()
│   │   │
│   │   ├── blog/
│   │   │   ├── page.tsx             ← Blog listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx         ← MDX post; generateStaticParams()
│   │   │
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── privacy-policy/page.tsx
│   │   ├── terms-of-service/page.tsx
│   │   │
│   │   └── api/
│   │       └── register/
│   │           └── route.ts         ← POST: form → Google Sheets
│   │
│   ├── components/
│   │   ├── ui/                      ← shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── select.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── card.tsx
│   │   │   └── ...
│   │   │
│   │   ├── layout/
│   │   │   ├── Header.tsx           ← Navbar (Logo, Find Tutor, Register, Blog)
│   │   │   ├── Footer.tsx
│   │   │   └── MobileMenu.tsx
│   │   │
│   │   ├── home/
│   │   │   ├── HeroSection.tsx      ← Search bar + WhatsApp CTA
│   │   │   ├── PopularAreas.tsx     ← Area cards grid
│   │   │   ├── SubjectGrid.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── WhyUs.tsx
│   │   │   └── BlogPreview.tsx
│   │   │
│   │   ├── shared/
│   │   │   ├── WhatsAppButton.tsx   ← Reusable CTA with dynamic message
│   │   │   ├── AreaCard.tsx
│   │   │   ├── SubjectCard.tsx
│   │   │   ├── FaqAccordion.tsx
│   │   │   ├── HowItWorksSteps.tsx
│   │   │   ├── SeoContent.tsx
│   │   │   ├── Breadcrumb.tsx
│   │   │   └── CookieBanner.tsx
│   │   │
│   │   ├── forms/
│   │   │   ├── RegisterForm.tsx     ← Multi-step container
│   │   │   ├── steps/
│   │   │   │   ├── Step1Personal.tsx
│   │   │   │   ├── Step2Teaching.tsx
│   │   │   │   ├── Step3Areas.tsx
│   │   │   │   ├── Step4Availability.tsx
│   │   │   │   └── Step5Consent.tsx
│   │   │   ├── FormProgress.tsx
│   │   │   └── SuccessScreen.tsx
│   │   │
│   │   └── blog/
│   │       ├── BlogCard.tsx
│   │       └── BlogLayout.tsx
│   │
│   ├── content/
│   │   └── blog/                    ← MDX blog posts
│   │       ├── best-home-tutor-kanpur.mdx
│   │       ├── how-to-find-tutor-kanpur.mdx
│   │       └── ... (20 posts)
│   │
│   ├── data/
│   │   ├── areas.ts                 ← 35 Kanpur areas with SEO content
│   │   ├── subjects.ts              ← 13 subjects with SEO content
│   │   └── faqs.ts                  ← Shared FAQ content
│   │
│   ├── lib/
│   │   ├── rateLimit.ts
│   │   ├── sheets.ts                ← Google Sheets client
│   │   ├── validations/
│   │   │   └── register.ts          ← Zod schema
│   │   └── utils.ts                 ← cn(), slugify(), WA URL builder
│   │
│   ├── config/
│   │   └── site.ts                  ← SITE_CONFIG constant
│   │
│   └── types/
│       └── index.ts
│
├── public/
│   ├── images/
│   ├── icons/
│   ├── og-image.png                 ← Social share preview
│   └── favicon.ico
│
├── next.config.ts
├── next-sitemap.config.js           ← Sitemap configuration
├── tailwind.config.ts
├── tsconfig.json
├── .env.local
├── .env.example
└── package.json
```

### 8.2 Key Component: WhatsApp Button

```tsx
// src/components/shared/WhatsAppButton.tsx
import { cn } from '@/lib/utils';
import { SITE_CONFIG } from '@/config/site';

interface WhatsAppButtonProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

export function WhatsAppButton({
  message = SITE_CONFIG.whatsappDefaultMessage,
  size = 'md',
  className,
  label = 'Contact on WhatsApp',
}: WhatsAppButtonProps) {
  const encodedMessage = encodeURIComponent(message);
  const href = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodedMessage}`;

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-2 rounded-lg font-semibold',
        'bg-[#25D366] text-white hover:bg-[#20BD5A]',
        'transition-colors duration-200 shadow-md',
        sizeClasses[size],
        className
      )}
      aria-label={`${label} — opens WhatsApp`}
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15..."  />
      </svg>
      {label}
    </a>
  );
}
```

### 8.3 Multi-Step Form State Management (No External State Library)

```tsx
// src/components/forms/RegisterForm.tsx
// Uses React useState only — no Zustand/Redux needed
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterFormData } from '@/lib/validations/register';

const STEPS = [
  { id: 1, title: 'Personal Details' },
  { id: 2, title: 'Teaching Details' },
  { id: 3, title: 'Areas' },
  { id: 4, title: 'Availability' },
  { id: 5, title: 'Submit' },
];

export function RegisterForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: { subjects: [], classes: [], boards: [],
                     travelAreas: [], availableDays: [], timeSlots: [] },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    setServerError(null);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        setIsSubmitted(true);
      } else {
        setServerError(json.message ?? 'Something went wrong. Please try again.');
      }
    } catch {
      setServerError('Network error. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) return <SuccessScreen />;

  return (
    <FormProvider {...methods}>
      <FormProgress steps={STEPS} current={currentStep} />
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {/* Honeypot */}
        <input type="text" name="website" className="hidden" tabIndex={-1} aria-hidden />
        {currentStep === 1 && <Step1Personal />}
        {currentStep === 2 && <Step2Teaching />}
        {currentStep === 3 && <Step3Areas />}
        {currentStep === 4 && <Step4Availability />}
        {currentStep === 5 && <Step5Consent isSubmitting={isSubmitting} error={serverError} />}
        <StepNavigation current={currentStep} total={5}
          onNext={() => setCurrentStep(s => s + 1)}
          onBack={() => setCurrentStep(s => s - 1)} />
      </form>
    </FormProvider>
  );
}
```

### 8.4 SEO Metadata Pattern (Per Page)

```tsx
// src/app/areas/[slug]/page.tsx
import { Metadata } from 'next';
import { KANPUR_AREAS } from '@/data/areas';
import { SITE_CONFIG } from '@/config/site';

export async function generateStaticParams() {
  return KANPUR_AREAS.map(area => ({ slug: area.slug }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const area = KANPUR_AREAS.find(a => a.slug === params.slug);
  if (!area) return {};

  return {
    title: `Home Tutor in ${area.name}, Kanpur | KanpurTutor`,
    description: `Find verified home tutors in ${area.name}, Kanpur for CBSE, UP Board, JEE, NEET. Free matching service. WhatsApp us today.`,
    openGraph: {
      title: `Home Tutor in ${area.name}, Kanpur`,
      description: `Verified home tutors available in ${area.name}, Kanpur.`,
      url: `${SITE_CONFIG.url}/areas/${area.slug}`,
      siteName: 'KanpurTutor',
      images: [{ url: `${SITE_CONFIG.url}/og-image.png` }],
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/areas/${area.slug}`,
    },
  };
}
```

### 8.5 JSON-LD Structured Data

```tsx
// src/components/shared/StructuredData.tsx
// Used on area/subject pages and blog posts

// For area pages — LocalBusiness schema
export const AreaStructuredData = ({ area }: { area: Area }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "KanpurTutor",
        "description": `Home tuition services in ${area.name}, Kanpur`,
        "url": `${SITE_CONFIG.url}/areas/${area.slug}`,
        "areaServed": {
          "@type": "Place",
          "name": `${area.name}, Kanpur, Uttar Pradesh, India`
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer support",
          "contactOption": "TollFree",
          "availableLanguage": ["Hindi", "English"]
        }
      })
    }}
  />
);

// For FAQ sections — FAQPage schema
export const FaqStructuredData = ({ faqs }: { faqs: FAQ[] }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      })
    }}
  />
);

// For blog posts — Article schema
export const ArticleStructuredData = ({ post }: { post: BlogPost }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": post.excerpt,
        "datePublished": post.publishedAt,
        "author": { "@type": "Organization", "name": "KanpurTutor" },
        "publisher": {
          "@type": "Organization",
          "name": "KanpurTutor",
          "logo": { "@type": "ImageObject", "url": `${SITE_CONFIG.url}/logo.png` }
        }
      })
    }}
  />
);
```

### 8.6 Deployment

```
DEVELOPMENT
  npm run dev
  → Next.js dev server on http://localhost:3000
  → Set up .env.local with Google Sheets credentials
  → Test form submission to a staging Sheet

PRODUCTION (Vercel — recommended)
  1. Push to GitHub (main branch)
  2. Connect repo to Vercel dashboard
  3. Set environment variables in Vercel dashboard
  4. Deploy — automatic on push to main
  5. Add custom domain: kanpurtutor.in
  6. Vercel handles: SSL, CDN, edge caching, auto-scaling

  vercel.json
  {
    "headers": [
      {
        "source": "/(.*)",
        "headers": [
          { "key": "X-Frame-Options", "value": "DENY" },
          { "key": "X-Content-Type-Options", "value": "nosniff" },
          { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
        ]
      }
    ]
  }

ALTERNATIVE (Self-hosted)
  → Build: npm run build
  → Serve: npm start (Node.js server)
  → Host on: DigitalOcean Droplet ($6/mo) + Nginx reverse proxy
  → SSL: Let's Encrypt / Cloudflare
```

---

## 9. SEO Strategy

### 9.1 SEO Architecture

This is the **most important product requirement** — SEO is why the site exists.

| SEO Element | Implementation |
|---|---|
| Page titles | Unique per page, keyword-first, < 60 chars |
| Meta descriptions | Unique per page, CTA-driven, < 160 chars |
| H1 tags | One per page; contains primary keyword |
| Canonical URLs | Set on every page |
| Sitemap | Auto-generated by `next-sitemap`; submitted to GSC |
| robots.txt | Allow all; block `/api/` |
| Structured data | FAQPage, Article, LocalBusiness JSON-LD |
| OG tags | All pages; custom OG image |
| Internal linking | Area → Subject; Blog → Area; Blog → Subject |
| Page speed | SSG = near-instant; Vercel CDN |
| Mobile-first | Responsive design; passes Core Web Vitals |
| HTTPS | Vercel handles automatically |
| URL structure | Clean slugs: `/areas/civil-lines`, `/tutors/maths` |

### 9.2 On-Page SEO — Title and Meta Patterns

| Page | Title Format | Meta Description Format |
|---|---|---|
| Homepage | Home Tutor in Kanpur \| KanpurTutor | Find verified home tutors in Kanpur for CBSE, UP Board, JEE & NEET. Free matching. WhatsApp us now. |
| Area page | Home Tutor in [Area], Kanpur \| KanpurTutor | Find home tutors in [Area], Kanpur. Expert teachers for CBSE, UP Board, Class 1–12. Contact us free on WhatsApp. |
| Subject page | [Subject] Home Tutor in Kanpur \| KanpurTutor | Looking for a [Subject] home tutor in Kanpur? Expert teachers for CBSE & UP Board. Free assistance. WhatsApp now. |
| Blog post | [Post Title] \| KanpurTutor | [First 155 chars of excerpt] |

### 9.3 Target Keyword Groups

**Group 1 — Homepage targets (high volume)**
- home tutor in kanpur
- home tuition kanpur
- best home tutor kanpur
- kanpur home tuition

**Group 2 — Area pages (high intent, low competition)**
- home tutor in civil lines kanpur
- home tuition kakadeo kanpur
- tutor in swaroop nagar kanpur
- home tutor kidwai nagar kanpur
- [Repeat for all 35 areas]

**Group 3 — Subject pages (high intent)**
- maths home tutor kanpur
- physics tutor kanpur
- english home tuition kanpur
- jee tutor kanpur home
- neet tutor kanpur home visit

**Group 4 — Blog targets (long-tail, informational)**
- how to find home tutor kanpur
- home tuition fees kanpur
- cbse home tutor kanpur
- up board tutor kanpur
- class 10 home tutor kanpur

**Group 5 — Compound (area + subject)**
- maths tutor civil lines kanpur
- science tutor kakadeo kanpur
- [Generated by internal links between area and subject pages]

### 9.4 Content Strategy (First 30 Days)

**Week 1 (Pre-launch):** Write 20 blog posts (see Appendix A)

**Week 2–4 (Post-launch):**
- Submit sitemap to Google Search Console
- Create Google Business Profile for "KanpurTutor"
- Build 5–10 backlinks (education forums, local directories, justdial listing)
- Share blog posts in Kanpur WhatsApp groups and Facebook groups
- Publish 2 new blog posts per week

**Ongoing:**
- 2 blog posts per week (keyword-targeted)
- Monthly: refresh area page SEO content
- Monitor Google Search Console for impressions and ranking progression

### 9.5 Sitemap Configuration

```javascript
// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://kanpurtutor.in',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/api/*'],
  additionalPaths: async (config) => [
    // High priority pages
    { loc: '/', priority: 1.0, changefreq: 'daily' },
    { loc: '/find-tutor', priority: 0.9, changefreq: 'weekly' },
    { loc: '/register-tutor', priority: 0.8, changefreq: 'weekly' },
  ],
};
```

### 9.6 robots.txt

```
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://kanpurtutor.in/sitemap.xml
```

---

## 10. UI/UX and Design

### 10.1 Design Direction

**Aesthetic:** Clean, professional, trustworthy — education-sector appropriate.
**Palette:**
- Primary: `#1E40AF` (deep blue — trust, education)
- WhatsApp CTA: `#25D366` (brand-recognisable; high click-through)
- Accent: `#F59E0B` (warm amber — attention, local warmth)
- Neutral: `#1F2937` / `#6B7280` / `#F3F4F6` / `#FFFFFF`
- Background: White with subtle blue-tinted sections

**Typography:**
- Headings: `Plus Jakarta Sans` (600/700) — modern, readable
- Body: `DM Sans` (400/500) — clean, legible at small sizes
- Both available free on Google Fonts

**Guiding principles:**
1. WhatsApp button is always visible; highest contrast CTA on every page
2. No pricing anywhere on the site
3. No teacher names, photos, or contact details visible anywhere
4. Mobile-first: test all layouts on 375px width first
5. Fast: images optimised; next/image for all; no heavy animations
6. Trust signals: verification language, "free service", "local experts"

### 10.2 Header (All Pages)

```
┌────────────────────────────────────────────────────┐
│  🎓 KanpurTutor       [Find Tutor] [Register] [Blog]│
│  ─────────────────────────────────── [Hamburger 📱] │
└────────────────────────────────────────────────────┘
Nav links:
  - Find a Tutor → /find-tutor
  - Register as Tutor → /register-tutor
  - Blog → /blog
  - About → /about

Mobile: Hamburger → slide-down menu (same links)
Sticky on scroll
```

### 10.3 Homepage Layout

```
┌────────────────────────────────────────────────────┐
│              HEADER (sticky)                        │
├────────────────────────────────────────────────────┤
│                                                    │
│  Find Verified Home Tutors in Kanpur               │ ← H1
│  Expert teachers · CBSE & UP Board · Local Areas  │
│                                                    │
│  [📱 WhatsApp Us to Find a Tutor — It's Free!]    │ ← Large WA button
│                                                    │
│  Or browse by:                                     │
│  [Area ▼] [Subject ▼]    [Search →]               │ ← Leads to /find-tutor
│                                                    │
├────────────────────────────────────────────────────┤
│  ⭐ Popular Areas in Kanpur                        │
│                                                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ...      │
│  │Civil Lines│ │ Kakadeo  │ │Swaroop Ng│           │
│  │ → Tutors  │ │ → Tutors │ │ → Tutors │           │
│  └──────────┘ └──────────┘ └──────────┘           │
│                   [View All 35 Areas →]            │
├────────────────────────────────────────────────────┤
│  📚 Browse by Subject                              │
│                                                    │
│  [Maths] [Science] [Physics] [Chemistry]           │
│  [Biology] [English] [JEE] [NEET] [CTET] ...      │
├────────────────────────────────────────────────────┤
│  How It Works                                      │
│                                                    │
│  1️⃣ WhatsApp us your requirement                  │
│  2️⃣ We find the right tutor from our network      │
│  3️⃣ We introduce you — completely free            │
│                                                    │
│  [📱 Get Started on WhatsApp]                     │
├────────────────────────────────────────────────────┤
│  Why KanpurTutor?                                  │
│  ✓ Verified teachers  ✓ Local to your area         │
│  ✓ Free matching      ✓ CBSE & UP Board experts    │
│  ✓ Quick response     ✓ No hidden charges          │
├────────────────────────────────────────────────────┤
│  Are you a tutor? Register your interest           │
│  [Register as a Tutor →]                          │
├────────────────────────────────────────────────────┤
│  Latest from Blog                                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │ Blog Card│ │ Blog Card│ │ Blog Card│           │
│  └──────────┘ └──────────┘ └──────────┘           │
├────────────────────────────────────────────────────┤
│  FOOTER                                            │
│  Quick Links | Areas | Subjects | Blog | Legal     │
│  © 2026 KanpurTutor | Privacy | Terms             │
└────────────────────────────────────────────────────┘
```

### 10.4 Teacher Registration Form (5 Steps)

```
[Progress: Step 2 of 5 ──────────── ]

Step 2: Teaching Details
────────────────────────────────────
Subjects you teach *
  [✓ Mathematics] [✓ Physics] [ Science]
  [ Chemistry]    [ Biology]  [ English]
  [ Hindi]        [ Computer] [ JEE]
  ... (chip-style multi-select)

Classes you teach *
  [✓ Class 9–10] [✓ Class 11–12] [ Class 6–8]
  [ Class 1–5]   [ JEE/NEET]    [ Competitive]

Board expertise *
  [✓ CBSE] [✓ UP Board] [ ICSE] [ IGCSE]

Teaching mode *
  (●) Home Visit  ( ) Online  ( ) Both

────────────────────────────────────
[← Previous]                [Next →]
```

### 10.5 Floating WhatsApp Button

A persistent floating WhatsApp button appears on all pages (bottom-right corner) on mobile, making it always accessible:

```tsx
// Visible on all pages via root layout
export function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(SITE_CONFIG.whatsappDefaultMessage)}`}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2
                 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg
                 hover:bg-[#20BD5A] transition-all md:bottom-8 md:right-8"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact KanpurTutor on WhatsApp"
    >
      <WhatsAppIcon className="w-6 h-6" />
      <span className="font-semibold hidden sm:inline">WhatsApp Us</span>
    </a>
  );
}
```

### 10.6 Responsive Breakpoints

| Width | Layout | Key Changes |
|---|---|---|
| < 640px (mobile) | Single column | Area chips scroll horizontally; hamburger nav; floating WA button always visible |
| 640–1024px (tablet) | 2 columns | Area grid 2-col; subject chips wrap |
| > 1024px (desktop) | 3–4 columns | Area grid 3-col; full nav; WA button in hero only |

### 10.7 Accessibility

- All interactive elements: minimum 44×44px touch target
- Colour contrast: 4.5:1 minimum for all text
- Focus indicators: visible (shadcn/ui defaults handle this)
- ARIA labels on icon-only buttons
- Form fields: associated `<label>` elements; `aria-required`; error `aria-describedby`
- Alt text on all images
- Skip-to-main-content link in HTML

---

## 11. Non-Functional Requirements

### 11.1 Performance

| Metric | Target |
|---|---|
| LCP (Largest Contentful Paint) | < 2.5s |
| INP (Interaction to Next Paint) | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| Mobile Lighthouse Score | ≥ 85 |
| Time to First Byte (TTFB) | < 200ms (SSG + Vercel CDN) |
| Total page weight (homepage) | < 200KB (JS) |

**Optimisations:**
- All pages are statically generated (SSG) — near-zero server latency
- Images: `next/image` with `lazy` loading; WebP auto-conversion; explicit width/height
- Fonts: `next/font` (self-hosted, no external font requests blocking)
- No unused shadcn/ui components (tree-shaking via Tailwind purge)
- No heavy animations or third-party libraries on critical path

### 11.2 Scalability

**Traffic capacity at Vercel free/pro tier:**
- Up to 100GB bandwidth/month (Pro: unlimited)
- 100,000+ static page requests/day — no server involved
- API route (form submission): max ~1,000 submissions/day — well within Vercel limits

**Google Sheets API limits:**
- 300 write requests/minute per project (per Google API quota)
- Expected max: ~50 teacher submissions/day — no throttling concern
- If submissions exceed limits: implement queue (Upstash QStash, Phase 2)

### 11.3 Reliability

- Vercel: 99.99% uptime SLA
- Google Sheets API: 99.9% uptime (Google infrastructure)
- No database = no DB outage risk
- Static pages served from CDN = no server required for browsing

### 11.4 Monitoring

| Tool | Purpose | Cost |
|---|---|---|
| Google Analytics 4 | Page views, events, conversions | Free |
| Google Search Console | Rankings, crawl errors, impressions | Free |
| Vercel Analytics | Core Web Vitals in production | Free (basic) |
| Sentry | API error tracking (form submissions) | Free tier |
| UptimeRobot | Homepage uptime check every 5 min | Free |

**Key events to track in GA4:**
- `whatsapp_click` — with page and context properties
- `form_start` — when user begins registration
- `form_step_complete` — on each step completion
- `form_submit` — successful registration
- `form_error` — submission error
- `area_page_view` — with area name
- `subject_page_view` — with subject name

### 11.5 Data Privacy (DPDPA Compliance — Simplified)

| Requirement | Implementation |
|---|---|
| Consent before data collection | Explicit consent checkbox on registration form (mandatory) |
| Data minimisation | Only collect fields needed for teacher matching |
| Data storage | Google Sheet (private, admin-only access) |
| No public exposure | Teacher data never sent to frontend or shown on site |
| Privacy policy | Published page at `/privacy-policy` |
| Cookie consent | Banner for GA4 analytics cookies |
| Right to erasure | Admin deletes row from Sheet on request (manual, acceptable at MVP scale) |
| Grievance officer | Contact email listed in Privacy Policy |

---

## 12. 7-Day Delivery Plan

### Assumptions

- 1 developer (full-stack) or 2 developers working in parallel
- Node.js, React, and Next.js experience
- Google Cloud account already created
- Domain (kanpurtutor.in) purchased and pointed to Vercel
- 20 blog posts written before Day 5 (content writer parallel workstream)
- 35 area SEO content paragraphs written before Day 3

---

### Day-by-Day Plan

#### Day 1 — Project Setup + Architecture

**Morning:**
- Initialise Next.js 14 project with TypeScript, Tailwind, shadcn/ui
- Set up ESLint, Prettier, TypeScript strict config
- Create project folder structure (as per Section 8.1)
- Initialise GitHub repo; set up Vercel project; connect domain
- Set up Google Cloud project; enable Sheets API; create service account
- Create Google Sheet with headers (Appendix B)

**Afternoon:**
- Build `src/data/areas.ts` — all 35 Kanpur areas with slugs and placeholder SEO content
- Build `src/data/subjects.ts` — all 13 subjects
- Build `src/config/site.ts`
- Build `src/lib/utils.ts` (cn, WA URL builder)
- Set up `.env.local` and `.env.example`
- Write Zod validation schema for registration form
- Write `src/lib/rateLimit.ts`

**End of Day 1:**
- Project runs locally; data constants defined; Google Sheets connected and tested

---

#### Day 2 — Core Layout + Homepage

**Morning:**
- Build `Header.tsx` (logo, nav links, mobile hamburger menu)
- Build `Footer.tsx` (links, areas, subjects, legal)
- Build `FloatingWhatsApp.tsx`
- Build root `layout.tsx` (fonts, GA4 script, cookie banner placeholder, floating WA)

**Afternoon:**
- Build Homepage (`/app/page.tsx`):
  - `HeroSection.tsx` (H1, WhatsApp CTA, area/subject quick filters)
  - `PopularAreas.tsx` (cards grid, link to /areas/slug)
  - `SubjectGrid.tsx` (chips linking to /tutors/slug)
  - `HowItWorks.tsx` (3-step section)
  - `WhyUs.tsx` (trust signals grid)
  - Tutor CTA section ("Are you a tutor?")

**End of Day 2:**
- Homepage is fully rendered and responsive on mobile and desktop

---

#### Day 3 — Area Pages + Subject Pages

**Morning:**
- Build `/app/areas/[slug]/page.tsx`:
  - `generateStaticParams()` from KANPUR_AREAS
  - `generateMetadata()` per area
  - Area page layout: Hero + WhatsApp CTA + Subjects chips + How It Works + SEO content block + FAQ + Related areas
  - `FaqAccordion.tsx` component (shadcn/ui Accordion)
  - `AreaStructuredData.tsx` (JSON-LD)
  - `FaqStructuredData.tsx` (JSON-LD)
- Test: all 35 area pages generate correctly

**Afternoon:**
- Build `/app/tutors/[subject]/page.tsx`:
  - `generateStaticParams()` from SUBJECTS
  - `generateMetadata()` per subject
  - Subject page layout: Hero + Areas covered + Classes + Boards + How It Works + SEO content + FAQ
- Build `/app/find-tutor/page.tsx` (conversion landing page)
- Test: all 13 subject pages generate correctly
- Wire area page "Related Areas" links

**End of Day 3:**
- 48 static SEO pages live (35 area + 13 subject + find-tutor)

---

#### Day 4 — Registration Form + Google Sheets API

**Morning:**
- Build `RegisterForm.tsx` multi-step container
- Build all 5 step components:
  - `Step1Personal.tsx` (name, WA, gender, area, experience)
  - `Step2Teaching.tsx` (subjects, classes, boards, mode)
  - `Step3Areas.tsx` (travel areas — multi-select)
  - `Step4Availability.tsx` (days and time slots grid)
  - `Step5Consent.tsx` (intro textarea, qualification, consent checkbox, submit)
- Build `FormProgress.tsx` (step indicator)
- Build `SuccessScreen.tsx`
- Build `/app/register-tutor/page.tsx`

**Afternoon:**
- Build `/app/api/register/route.ts` (POST handler)
- Integrate Google Sheets API client (`src/lib/sheets.ts`)
- Test end-to-end: form submission → row appears in Google Sheet
- Add honeypot field to form
- Test rate limiting (3 submissions per IP per day)
- Test all error states: validation errors, rate limit, server error

**End of Day 4:**
- Registration form fully functional; data flowing to Google Sheet

---

#### Day 5 — Blog Module + SEO Polish

**Morning:**
- Install and configure `next-mdx-remote` (or `@next/mdx`)
- Write 5 blog post MDX files (remaining 15 from content writer)
- Build `/app/blog/page.tsx` (blog listing with cards)
- Build `/app/blog/[slug]/page.tsx` (MDX rendering)
- Build `BlogCard.tsx` and `BlogLayout.tsx`
- `generateStaticParams()` from MDX files
- `generateMetadata()` from MDX frontmatter

**Afternoon:**
- Install and configure `next-sitemap`
- Configure `next-sitemap.config.js` with all page types
- Write `robots.txt`
- Add JSON-LD `ArticleStructuredData` to blog posts
- Add OG image tags to all pages
- Set canonical URLs on all pages
- Review and complete SEO content text for all 35 area pages and 13 subject pages
- Run Lighthouse audit; fix any score < 85

**End of Day 5:**
- Blog live; sitemap generated; SEO audit complete

---

#### Day 6 — Remaining Pages + Analytics + Cookie Consent

**Morning:**
- Build `/app/about/page.tsx`
- Build `/app/contact/page.tsx` (WhatsApp CTA + platform email)
- Build `/app/privacy-policy/page.tsx` (privacy policy text)
- Build `/app/terms-of-service/page.tsx`
- Build `CookieBanner.tsx` (simple accept/decline; stores preference in localStorage; shows/hides GA4)
- Add GA4 script to root layout (conditional on cookie consent)

**Afternoon:**
- Add Sentry error tracking to API route
- Set up GA4 custom events (whatsapp_click, form_submit, form_error)
- Submit sitemap to Google Search Console (if domain is live)
- Create Google Business Profile for KanpurTutor
- Add UptimeRobot check on homepage URL
- Set production environment variables in Vercel dashboard
- Deploy to production URL; test all pages on production

**End of Day 6:**
- All pages live; analytics tracking; cookie consent working

---

#### Day 7 — QA, Mobile Testing, Buffer

**Morning:**
- Full mobile QA (Chrome DevTools: iPhone SE 375px, Pixel 5 393px)
- Test all WhatsApp buttons — confirm correct pre-filled messages open
- Test registration form end-to-end on mobile
- Test all area pages (spot check 10 areas)
- Test all subject pages (all 13)
- Test blog list and 3 blog posts
- Check all internal links work

**Afternoon:**
- Run Lighthouse on 5 key pages (target: score > 85 all)
- Check Google PageSpeed Insights
- Fix any remaining issues
- Cross-browser test: Chrome, Safari, Firefox
- Final production deploy
- Submit sitemap to Bing Webmaster Tools
- Brief admin on how to use Google Sheet (status columns, workflow)
- Document WhatsApp response workflow for admin

**End of Day 7 — LAUNCH ✅**

---

### 7-Day Timeline Summary

```
Day 1  ░░░  Setup + Data Constants + Google Sheets connection
Day 2  ░░░  Layout (Header/Footer) + Homepage
Day 3  ░░░  35 Area Pages + 13 Subject Pages + Find Tutor page
Day 4  ░░░  Registration Form (5-step) + API Route + Sheets integration
Day 5  ░░░  Blog Module (MDX) + Sitemap + SEO polish
Day 6  ░░░  Remaining pages + GA4 + Cookie banner + Production deploy
Day 7  ░░░  QA + Mobile testing + Bug fixes + LAUNCH
```

### Resource Requirements

| Role | Effort |
|---|---|
| Full-Stack Developer | 1 person × 7 days (50–60 hours total) |
| Content Writer (SEO) | 1 person × 3 days (blog posts + area SEO content) |
| Product Owner | Review sessions end of Day 3 and Day 6 |
| **Total dev budget** | **~60 hours of engineering** |

### Infrastructure Cost at Launch

| Service | Cost |
|---|---|
| Vercel (Hobby) | Free |
| Google Sheets API | Free |
| Google Analytics 4 | Free |
| Google Search Console | Free |
| UptimeRobot | Free |
| Cloudflare (proxy + WAF) | Free |
| Domain (kanpurtutor.in) | ~₹800/year |
| **Total monthly** | **~₹0 + ₹67/month domain** |

---

## 13. Risks and Mitigation

| # | Risk | Probability | Impact | Mitigation |
|---|---|---|---|---|
| R1 | Google Sheets API quota exceeded | Low | High | 300 writes/min quota far exceeds expected volume; monitor via Google Cloud Console |
| R2 | Spam form submissions overwhelm Sheet | Medium | Medium | Rate limiting (3/IP/day) + honeypot field; Cloudflare bot protection |
| R3 | Content not ready for Day 5 | Medium | Medium | Start content writing on Day 1 in parallel; area SEO text can be AI-assisted |
| R4 | SEO rankings take too long | High | Medium | Expected — organic SEO takes 4–12 weeks; supplement with Google Business Profile and WhatsApp group sharing from Day 1 |
| R5 | WhatsApp number gets overwhelmed | Low | Medium | Admin sets up WhatsApp Business app with quick replies and labels |
| R6 | 7-day timeline slips | Medium | High | Day 7 is a buffer; if Day 6 is behind, cut About/Contact pages (not SEO-critical); launch with core pages only |
| R7 | Domain DNS propagation delays | Low | Medium | Set DNS on Day 1; allow 24–48hrs; test on Vercel preview URL during development |
| R8 | Service account credentials leaked | Low | Critical | Never commit .env to Git; add .env.local to .gitignore; rotate keys if leaked |
| R9 | MDX blog build errors | Low | Low | Test MDX rendering on Day 5 morning; fallback to simple JSON blog if MDX issues arise |
| R10 | Admin unable to manage WhatsApp volume | Medium | Medium | Prepare WhatsApp Business quick-reply templates before launch (Day 7) |

---

## 14. Appendices

### Appendix A — Blog Post Plan (20 Posts for Launch)

| # | Title | Target Keyword | Category |
|---|---|---|---|
| 1 | How to Find the Best Home Tutor in Kanpur (2026) | how to find home tutor kanpur | Tips |
| 2 | Home Tuition in Civil Lines, Kanpur — Complete Guide | home tuition civil lines kanpur | Area Guide |
| 3 | CBSE Home Tutor in Kanpur — What to Look For | cbse home tutor kanpur | Tips |
| 4 | UP Board Home Tuition in Kanpur — Everything You Need to Know | up board tuition kanpur | Tips |
| 5 | Best Maths Home Tutors in Kanpur | best maths tutor kanpur | Subject Guide |
| 6 | JEE Home Tuition in Kanpur — Is It Better Than Coaching? | jee home tuition kanpur | Subject Guide |
| 7 | NEET Home Tutor in Kanpur — How to Prepare at Home | neet home tutor kanpur | Subject Guide |
| 8 | Home Tuition in Kakadeo, Kanpur | home tuition kakadeo kanpur | Area Guide |
| 9 | Home Tuition in Swaroop Nagar, Kanpur | home tuition swaroop nagar kanpur | Area Guide |
| 10 | Class 10 Home Tutor in Kanpur — Tips for Board Exam Prep | class 10 home tutor kanpur | Tips |
| 11 | Class 12 Home Tutor Kanpur — Science, Commerce & Arts | class 12 home tutor kanpur | Tips |
| 12 | Why Home Tuition is Better Than Coaching Centres in Kanpur | home tuition vs coaching kanpur | Opinion |
| 13 | English Speaking Course Home Tutor in Kanpur | english home tutor kanpur | Subject Guide |
| 14 | Science Home Tutor in Kanpur — CBSE and UP Board | science home tutor kanpur | Subject Guide |
| 15 | Home Tuition in Kidwai Nagar, Kanpur | home tuition kidwai nagar kanpur | Area Guide |
| 16 | Chemistry Home Tutor in Kanpur for Class 11 and 12 | chemistry tutor kanpur | Subject Guide |
| 17 | How to Prepare for UP Board at Home in Kanpur | prepare up board at home kanpur | Tips |
| 18 | Home Tuition in Govind Nagar Kanpur | home tuition govind nagar kanpur | Area Guide |
| 19 | Physics Home Tutor in Kanpur — Tips for JEE & Board Students | physics home tutor kanpur | Subject Guide |
| 20 | Home Tuition in Kalyanpur, Kanpur | home tuition kalyanpur kanpur | Area Guide |

---

### Appendix B — Google Sheet Column Setup

**Sheet Tab Name:** `Registrations`

| Col | Header | Notes |
|---|---|---|
| A | Timestamp | Auto-filled by server |
| B | Full Name | Teacher's full name |
| C | WhatsApp | 10-digit number |
| D | Gender | Male / Female / Other |
| E | Residence Area | Area name |
| F | Experience | Range |
| G | Subjects | Comma-separated |
| H | Classes | Comma-separated |
| I | Boards | Comma-separated |
| J | Teaching Mode | Home Visit / Online / Both |
| K | Travel Areas | Comma-separated, up to 5 |
| L | Available Days | Comma-separated |
| M | Time Slots | Morning / Afternoon / Evening |
| N | Introduction | Short bio text |
| O | Qualification | Degree name |
| P | Has Degree | Yes / No |
| Q | IP Address | Server-captured |
| R | User Agent | Server-captured |
| S | **Status** | **Admin fills**: Pending / Contacted / Active / Rejected |
| T | **Admin Notes** | **Admin fills**: free text |
| U | **Date Contacted** | **Admin fills**: date |

**Formatting tips for admin:**
- Column S: Data Validation → Dropdown (Pending, Contacted, Active, Rejected)
- Row 1: Freeze header row
- Enable Filter on Row 1 to filter by Status, Area, Subject

---

### Appendix C — WhatsApp Business Quick Reply Templates (For Admin)

Set these up in WhatsApp Business app before launch:

**Template 1 — Greeting (when parent inquires)**
> "Hi! Thanks for reaching out to KanpurTutor. 😊 To help you find the right tutor, please tell us:
> 1. Subject needed
> 2. Class / standard
> 3. Your area in Kanpur
> 4. Preferred timing (morning/evening)
> We'll match you with a verified local tutor within a few hours!"

**Template 2 — Teacher Follow-up (from Sheet)**
> "Hi [Name]! I'm from KanpurTutor. You registered on our platform. We have a student looking for a [Subject] tutor in [Area]. Are you available? Please confirm."

**Template 3 — No Match Available**
> "Hi! Thanks for contacting KanpurTutor. We're checking our tutor network for your requirement in [Area]. We'll get back to you within 24 hours. 🙏"

**Template 4 — Introduction**
> "Hi [Parent Name]! We've found a great Maths tutor for you in [Area]. Their name is [Teacher Name] and they'll be in touch shortly. Please feel free to arrange a free demo class. Good luck! 🎓"

---

### Appendix D — shadcn/ui Components Needed

Install only what is used (tree-shaking ensures no extra bundle weight):

```bash
npx shadcn@latest init
npx shadcn@latest add button input label select textarea checkbox
npx shadcn@latest add accordion card badge separator progress
npx shadcn@latest add alert toast
```

---

### Appendix E — Environment Variables Reference

```bash
# .env.example — commit this file to repo (no secrets)

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=91XXXXXXXXXX

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Site URL
NEXT_PUBLIC_SITE_URL=https://kanpurtutor.in

# Google Sheets (server-only — no NEXT_PUBLIC prefix)
GOOGLE_SHEETS_ID=your_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nyour key here\n-----END RSA PRIVATE KEY-----"

# Rate Limiting
RATE_LIMIT_MAX_PER_IP=3
RATE_LIMIT_WINDOW_MS=86400000

# Sentry (optional)
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
```

---

*Document Version: 2.0 — Revised for 7-day build, no database, Google Sheets backend, WhatsApp-oriented, privacy-first.*
*Next action: Developer starts Day 1 setup. Content writer starts area SEO paragraphs and blog posts simultaneously.*

---
**END OF DOCUMENT**
*KanpurTutor Platform v2.0 | May 2026*
