# University Management System — Setup Guide

## Prerequisites
- Node.js 18+
- A Clerk account (free at clerk.com)
- A Neon account (free at neon.tech)
- A Stripe account (free at stripe.com)

---

## Step 1 — Install Dependencies

```bash
npm install
```

---

## Step 2 — Environment Variables

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

### Clerk
1. Go to [clerk.com](https://clerk.com) → Create Application
2. Name it "University MS", enable **Email + Password**
3. Copy `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`

### Neon (Database)
1. Go to [neon.tech](https://neon.tech) → Create Project
2. Name it "university-ms"
3. Go to **Connection Details** → copy the **Pooled connection string**
4. Paste as `DATABASE_URL`

### Stripe
1. Go to [stripe.com](https://stripe.com) → Developers → API Keys
2. Copy test keys
3. Create a Product: "University Tuition" → Add Price (e.g. ₦450,000)
4. Copy the `price_xxx` ID as `STRIPE_TUITION_PRICE_ID`

---

## Step 3 — Database Setup

```bash
npx prisma generate
npx prisma db push
```

This creates all tables in your Neon database.

---

## Step 4 — Clerk Webhook (for user sync to DB)

1. Go to Clerk Dashboard → **Webhooks** → Add Endpoint
2. URL: `https://your-domain.com/api/webhooks/clerk`
   (Use [ngrok](https://ngrok.com) for local: `ngrok http 3000`)
3. Subscribe to events: `user.created`, `user.updated`, `user.deleted`
4. Copy the **Signing Secret** → paste as `CLERK_WEBHOOK_SECRET`

---

## Step 5 — Stripe Webhook (for payment → student activation)

1. Go to Stripe Dashboard → **Developers** → Webhooks → Add Endpoint
2. URL: `https://your-domain.com/api/webhooks/stripe`
3. Subscribe to: `payment_intent.succeeded`, `payment_intent.payment_failed`
4. Copy Signing Secret → paste as `STRIPE_WEBHOOK_SECRET`

---

## Step 6 — Run Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Step 7 — Create Your First Admin User

1. Sign up at `/sign-up` — you'll land as STUDENT by default
2. Go to Clerk Dashboard → **Users** → find your user
3. Click Edit → **Public Metadata** → set:
   ```json
   { "role": "ADMIN" }
   ```
4. Sign out and back in — you'll now see the Admin dashboard

---

## Deployment (Vercel)

```bash
npm install -g vercel
vercel
```

Add all env vars in Vercel Dashboard → Project → Settings → Environment Variables.

For Stripe webhook on production: update the webhook URL to your Vercel domain.

---

## What's Been Built

### ✅ Complete
- Landing page with 3D hero scene (React Three Fiber)
- Clerk auth (sign-in, sign-up) with Academic Dark theme
- Role-based middleware (8 roles)
- Dashboard shell (sidebar + topbar) — role-aware navigation
- Student dashboard (all 9 pages)
- Admin dashboard (all 8 pages)
- Faculty dashboard (home + attendance)
- Registrar, Department Head, Advisor, Bursar dashboards (home pages)
- Prisma schema (complete — all models)
- Clerk webhook (user sync to DB)
- Stripe webhook (payment → PROVISIONAL → ACTIVE)
- `lib/db.ts`, `lib/auth.ts`, `lib/stripe.ts`

### 🔜 Next Phase (Backend wiring)
- Server Actions for all CRUD operations
- Connect dashboard pages to real DB data
- Stripe Checkout session creation
- Remaining role sub-pages (full implementation)
- Grade calculation + GPA engine
- Email notifications (Resend)
- File uploads (assignments)
