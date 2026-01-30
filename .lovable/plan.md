
# SafeSpend Waitlist Implementation Plan

## Overview
Build a secure, scalable waitlist system for SafeSpend that captures user emails, prevents duplicates, and sends confirmation emails via Resend - all without requiring user authentication.

---

## Architecture Flow

```text
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│   Landing Page  │      │    Supabase     │      │  Edge Function  │
│                 │      │                 │      │                 │
│  ┌───────────┐  │      │  ┌───────────┐  │      │  ┌───────────┐  │
│  │ Waitlist  │──┼──────┼─▶│ waitlist  │  │      │  │  Resend   │  │
│  │   Form    │  │      │  │  table    │──┼──────┼─▶│   Email   │  │
│  └───────────┘  │      │  └───────────┘  │      │  └───────────┘  │
│        │        │      │       │         │      │        │        │
│        ▼        │      │       │         │      │        ▼        │
│  ┌───────────┐  │      │  ┌───────────┐  │      │  ┌───────────┐  │
│  │  Success  │  │      │  │    RLS    │  │      │  │ Welcome   │  │
│  │  Message  │  │      │  │  Policies │  │      │  │  Email    │  │
│  └───────────┘  │      │  └───────────┘  │      │  └───────────┘  │
└─────────────────┘      └─────────────────┘      └─────────────────┘
```

---

## Phase 1: Backend Setup

### 1.1 Enable Supabase Integration
First, we need to connect Lovable Cloud to enable Supabase functionality.

### 1.2 Database Schema
Create the `waitlist` table with proper constraints:

```sql
CREATE TABLE public.waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  source TEXT DEFAULT 'landing_page',
  status TEXT DEFAULT 'waitlist' CHECK (status IN ('waitlist', 'invited', 'active')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index for email lookups
CREATE INDEX idx_waitlist_email ON public.waitlist(email);

-- Add index for status filtering (future use)
CREATE INDEX idx_waitlist_status ON public.waitlist(status);
```

### 1.3 Row Level Security (RLS)
Secure the table to allow only anonymous inserts:

```sql
-- Enable RLS
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous inserts only
CREATE POLICY "Allow anonymous waitlist inserts"
ON public.waitlist
FOR INSERT
TO anon
WITH CHECK (true);

-- No SELECT, UPDATE, DELETE policies = no public access
-- Admins can still access via service role key
```

**Security Guarantee:**
- Emails can be added anonymously
- Emails cannot be read, updated, or deleted by public users
- Only service role (admin) can query the table

---

## Phase 2: Edge Function for Email Confirmation

### 2.1 Add Resend API Key Secret
You'll need to add the `RESEND_API_KEY` secret via the Lovable secrets manager.

### 2.2 Edge Function: `send-waitlist-confirmation`

**File:** `supabase/functions/send-waitlist-confirmation/index.ts`

```typescript
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WaitlistRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: WaitlistRequest = await req.json();

    if (!email || !email.includes("@")) {
      throw new Error("Valid email is required");
    }

    const { error } = await resend.emails.send({
      from: "SafeSpend <waitlist@safespend.app>",
      to: [email],
      subject: "You're on the SafeSpend waitlist 🎉",
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <h1 style="color: #1a1a2e; margin-bottom: 24px;">Welcome to SafeSpend!</h1>
          <p style="color: #4a4a68; font-size: 16px; line-height: 1.6;">
            Thank you for joining our waitlist. You're now in line for early access to SafeSpend - 
            your personal finance planning and budgeting companion.
          </p>
          <p style="color: #4a4a68; font-size: 16px; line-height: 1.6;">
            We'll notify you as soon as we're ready to welcome you aboard.
          </p>
          <div style="margin-top: 32px; padding: 20px; background: #f8f9fa; border-radius: 8px;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              <strong>What happens next?</strong><br/>
              We'll email you when early access opens. No spam, ever.
            </p>
          </div>
          <p style="color: #9ca3af; font-size: 12px; margin-top: 32px;">
            © 2025 SafeSpend. Your finances, simplified.
          </p>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      throw error;
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error sending waitlist email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
```

### 2.3 Update Supabase Config

**File:** `supabase/config.toml`

```toml
project_id = "safespend"

[functions.send-waitlist-confirmation]
verify_jwt = false
```

---

## Phase 3: Frontend Implementation

### 3.1 Supabase Client Setup

**File:** `src/integrations/supabase/client.ts`

Standard Supabase client initialization with anon key (no auth required).

### 3.2 Waitlist Hook

**File:** `src/hooks/useWaitlist.ts`

```typescript
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useWaitlist = () => {
  const [isLoading, setIsLoading] = useState(false);

  const joinWaitlist = async (email: string) => {
    setIsLoading(true);
    
    try {
      // Insert into waitlist table
      const { error: insertError } = await supabase
        .from("waitlist")
        .insert({ email, source: "landing_page" });

      if (insertError) {
        // Check for duplicate email
        if (insertError.code === "23505") {
          toast.success("You're already on the SafeSpend waitlist 🎉");
          return { success: true, alreadyExists: true };
        }
        throw insertError;
      }

      // Send confirmation email (non-blocking)
      supabase.functions
        .invoke("send-waitlist-confirmation", { body: { email } })
        .catch(console.error);

      toast.success("Thanks for joining SafeSpend! Check your email.");
      return { success: true, alreadyExists: false };
    } catch (error: any) {
      toast.error("Something went wrong. Please try again.");
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  return { joinWaitlist, isLoading };
};
```

### 3.3 Waitlist Form Component

**File:** `src/components/landing/WaitlistForm.tsx`

- Email input with Zod validation
- Submit button with loading state
- Success/error feedback via toast
- Keyboard accessible

### 3.4 Landing Page Components

| Component | Purpose |
|-----------|---------|
| `Navbar.tsx` | Fixed navigation with logo and CTA |
| `Hero.tsx` | Main headline, value prop, waitlist form |
| `Features.tsx` | Feature grid (6-8 key features) |
| `HowItWorks.tsx` | 3-step visual flow |
| `Footer.tsx` | Links, social, copyright |

### 3.5 Updated Index Page

**File:** `src/pages/Index.tsx`

Compose all landing components into the main page.

---

## Phase 4: Design System

### Color Palette (Finance-focused)
```css
:root {
  /* Primary - Trust Blue */
  --safespend-primary: 221 83% 53%;
  
  /* Accent - Growth Green */
  --safespend-accent: 142 76% 36%;
  
  /* Neutral Dark */
  --safespend-dark: 229 84% 5%;
}
```

### Visual Style
- Clean, professional, trustworthy
- Subtle gradients for depth
- Plenty of whitespace
- Mobile-first responsive design

---

## Files to Create

| File | Purpose |
|------|---------|
| `supabase/functions/send-waitlist-confirmation/index.ts` | Email confirmation edge function |
| `supabase/config.toml` | Edge function configuration |
| `src/hooks/useWaitlist.ts` | Waitlist submission logic |
| `src/components/landing/Navbar.tsx` | Navigation component |
| `src/components/landing/Hero.tsx` | Hero with waitlist form |
| `src/components/landing/WaitlistForm.tsx` | Email capture form |
| `src/components/landing/Features.tsx` | Feature showcase |
| `src/components/landing/HowItWorks.tsx` | 3-step process |
| `src/components/landing/Footer.tsx` | Site footer |
| `src/pages/Index.tsx` | Updated landing page |
| `src/index.css` | Add SafeSpend brand colors |

## Database Migration
| Migration | Purpose |
|-----------|---------|
| Create `waitlist` table | Store waitlist signups |
| Enable RLS | Secure insert-only access |
| Add indexes | Optimize email lookups |

---

## Security Summary

| Layer | Protection |
|-------|------------|
| Database | RLS: insert-only for anonymous users |
| API Key | Resend key stored server-side in secrets |
| Validation | Email validated client & server side |
| Duplicates | Unique constraint prevents duplicate signups |
| Privacy | No public SELECT access to email list |

---

## Future Compatibility

The schema supports future expansion:
- `status` field for invite workflow (`waitlist` → `invited` → `active`)
- Email can be matched to future user accounts
- `source` tracks marketing campaign effectiveness
- Easy to add referral system later

---

## Prerequisites Before Implementation

1. **Enable Lovable Cloud** - Required for Supabase database
2. **Add RESEND_API_KEY secret** - For email delivery
3. **Configure Resend domain** - Verify `safespend.app` or use `onboarding@resend.dev` for testing
