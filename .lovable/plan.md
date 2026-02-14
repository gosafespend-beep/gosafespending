
# Convert send-waitlist-email to Newsletter Email

## Overview
Repurpose the existing `send-waitlist-email` edge function into `send-newsletter-email`, create a new `NewsletterSignup` component, and place it between FinalCTA and Footer on the landing page.

## What Changes

### 1. Rename and rewrite the edge function
- Delete `supabase/functions/send-waitlist-email/index.ts`
- Create `supabase/functions/send-newsletter-email/index.ts` with a shorter, newsletter-focused confirmation email (subject: "You're in! Finance tips from Safe Spend")
- Uses the same Resend setup with `info@gosafespend.com`

### 2. Update `supabase/config.toml`
- Replace `[functions.send-waitlist-email]` with `[functions.send-newsletter-email]`

### 3. Database migration
- Update the waitlist table's INSERT RLS policy to also allow `status = 'newsletter'` (currently only allows `'waitlist'`)

### 4. New component: `src/components/landing/NewsletterSignup.tsx`
- Subtle section with `bg-muted/30` background
- Headline like "Stay in the loop" with a short description
- Inline email input + submit button (validated with zod)
- On submit: inserts into the `waitlist` table with `status = 'newsletter'`, then calls `send-newsletter-email`
- Loading state, success toast, duplicate/error handling
- Framer Motion entrance animation (respects reduced motion)

### 5. Update `src/pages/Index.tsx`
- Import `NewsletterSignup` and add it between `FinalCTA` and `Footer`

## Technical Details

### RLS Policy Change (SQL Migration)
```sql
DROP POLICY "Anyone can join waitlist with valid email" ON public.waitlist;
CREATE POLICY "Anyone can join waitlist with valid email"
  ON public.waitlist FOR INSERT
  WITH CHECK (
    email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND (status IS NULL OR status = 'waitlist' OR status = 'newsletter')
  );
```

### Edge Function Flow
- Receives `{ email }` in POST body
- Sends a concise welcome email via Resend (shorter than the waitlist version -- focused on tips and updates, not early access/trial messaging)
- Returns success/error JSON

### Component Behavior
- Email validation via zod before submission
- Inserts into `waitlist` table with `status = 'newsletter'`
- Calls the edge function to send confirmation
- Handles duplicate emails gracefully (shows friendly message)
- Success toast: "You're subscribed! Check your inbox."
