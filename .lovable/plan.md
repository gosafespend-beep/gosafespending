

# Messaging Update Plan: Remove Bank Connection References

## Overview

Safe Spend is a **manual-entry personal finance app** that does NOT connect to banks or financial institutions. This plan identifies all instances where the current messaging incorrectly implies bank connectivity and provides updated copy that accurately reflects the app's manual data entry approach.

---

## Files Requiring Updates

### 1. Hero Section (`src/components/landing/Hero.tsx`)

**Current Messaging (Line 114):**
- "Bank-level security"

**Issue:** While technically accurate about encryption, it implies bank integration.

**Updated Messaging:**
- "Enterprise-grade security"

---

### 2. Trust Badges (`src/components/landing/TrustBadges.tsx`)

**Current Messaging (Lines 8-15):**
```
{
  label: "256-bit Encryption",
  description: "Bank-level security",
},
{
  label: "Read-Only Access",
  description: "We never move your money",
}
```

**Issues:**
- "Bank-level security" implies bank integration
- "Read-Only Access" and "We never move your money" imply external account access

**Updated Messaging:**
```
{
  label: "256-bit Encryption",
  description: "Enterprise-grade protection",
},
{
  label: "Your Data, Secured",
  description: "Private and encrypted",
}
```

---

### 3. How It Works (`src/components/landing/HowItWorks.tsx`)

**Current Messaging (Lines 10-19):**
```
Step 1:
- description: "Create your free account and connect your financial accounts securely."
- details: ["No credit card required", "Secure bank connection", "2-minute setup"]

Step 2:
- description: "See all your finances in one place with automatic categorization and insights."
- details: ["Auto-categorized transactions", "Real-time sync", "Smart insights"]
```

**Issues:**
- "connect your financial accounts securely" implies bank linking
- "Secure bank connection" explicitly mentions banks
- "Auto-categorized transactions" and "Real-time sync" imply automatic bank feeds

**Updated Messaging:**
```
Step 1:
- description: "Create your free account and start tracking your finances in minutes."
- details: ["No credit card required", "Quick setup", "Instant access"]

Step 2:
- description: "Log your income and expenses to see your complete financial picture."
- details: ["Easy data entry", "Smart categorization", "Instant insights"]
```

---

### 4. Features Section (`src/components/landing/Features.tsx`)

**Current Messaging (Line 18):**
```
Expense Tracking:
- description: "Automatically categorize and track every transaction. Know exactly where your money goes."
```

**Issue:** "Automatically" implies bank-fed transactions

**Updated Messaging:**
```
Expense Tracking:
- description: "Easily log and categorize your transactions. Know exactly where your money goes."
```

---

### 5. FAQ Section (`src/components/landing/FAQ.tsx`)

**Current Messaging (Lines 30-38):**
```
Question: "How secure is my financial data?"
Answer: "We use bank-level 256-bit AES encryption for all data at rest and in transit. Your login credentials are never stored on our servers—we use secure tokenized connections through trusted partners."

Question: "Will Safe Spend connect to my bank?"
Answer: "Yes! We support thousands of financial institutions across North America and Europe through secure, read-only connections. We can only view your transactions—we can never move your money."
```

**Issues:**
- References to bank-level security and tokenized connections
- Entire FAQ about bank connections is completely inaccurate

**Updated Messaging:**
```
Question: "How secure is my financial data?"
Answer: "We use 256-bit AES encryption for all data at rest and in transit. Your information is stored securely and never shared with third parties. All data stays private between you and your account."

Question: "Do I need to connect my bank account?"
Answer: "No! Safe Spend is a manual-entry app—you're always in control of what data you add. Simply log your transactions, income, and accounts yourself. This keeps your banking credentials completely private and secure."
```

---

### 6. Privacy Policy (`src/pages/PrivacyPolicy.tsx`)

**Current Messaging (Lines 34-43, 92-95, 114):**
```
"When you connect your financial accounts, we may access:
- Transaction history
- Account balances
- Account names and types
- Institution names"

"Financial account aggregation (e.g., Plaid)"

"Withdraw consent: Disconnect financial accounts at any time"
```

**Issues:** Multiple references to connected accounts and Plaid integration

**Updated Messaging:**
```
"The financial data you choose to enter may include:
- Transaction records
- Account balances
- Account names and types
- Budget categories"

Remove Plaid reference entirely from third-party list

"Delete data: Remove your financial records at any time"
```

---

### 7. Terms of Service (`src/pages/TermsOfService.tsx`)

**Current Messaging (Line 28):**
```
"Connect and aggregate financial accounts"
```

**Issue:** Implies external account connections

**Updated Messaging:**
```
"Manually track accounts and organize financial data"
```

---

### 8. Cookies Policy (`src/pages/CookiesPolicy.tsx`)

**Current Messaging (Line 70):**
```
"Financial data aggregators (e.g., Plaid) for secure bank connections"
```

**Issue:** References Plaid and bank connections

**Updated Messaging:**
Remove this bullet point entirely, or replace with:
```
"Cloud infrastructure providers for secure data storage"
```

---

## Summary of Changes

| File | Changes Required |
|------|------------------|
| `Hero.tsx` | 1 text update |
| `TrustBadges.tsx` | 2 badge updates |
| `HowItWorks.tsx` | 2 step descriptions + 4 detail items |
| `Features.tsx` | 1 description update |
| `FAQ.tsx` | 2 complete Q&A rewrites |
| `PrivacyPolicy.tsx` | 3 section rewrites |
| `TermsOfService.tsx` | 1 list item update |
| `CookiesPolicy.tsx` | 1 list item removal/update |

**Total: 8 files, approximately 15-20 individual text changes**

---

## New Value Proposition Messaging

Since the app is manual-entry, we should emphasize these benefits:

- **Privacy First**: No bank credentials shared, ever
- **Complete Control**: You decide what data to track
- **Works Everywhere**: No bank compatibility issues
- **Simple & Fast**: Quick manual entry, no sync delays
- **Truly Private**: Your financial data stays with you

---

## Implementation Notes

1. All changes are text/copy only—no structural code changes needed
2. Changes should maintain the existing component structure and styling
3. The updates reinforce a privacy-focused, user-controlled narrative
4. Legal pages (Privacy Policy, Terms, Cookies) require careful review to ensure legal accuracy

