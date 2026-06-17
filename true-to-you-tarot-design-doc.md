# True to You Tarot Funnel Design Doc

Last updated: 2026-06-05

## Purpose

This document captures the current direction for the True to You Tarot / Tranquility Wellness funnel: what we researched, what we decided, what is already built, and what should happen next.

The current goal is to turn the landing page and card pull into a real paid funnel for ads, email capture, a low-ticket tripwire, and premium private readings with Kasey.

## Brand Direction

True to You Tarot should feel calm, angelic, grounded, human, and premium.

It should not feel like:

- A psychic hotline
- A cheap soulmate/ex-back funnel
- A fear-based prediction product
- An AI-generated spiritual worksheet
- A marketplace for generic readers

The operating philosophy:

> Tarot as a mirror, not a verdict.

The reading style should emphasize:

- Card-based interpretation
- Self-trust
- Reflection
- Emotional pattern recognition
- Angel-led guidance
- Grounded next steps
- No fixed-future prediction
- No health, legal, financial, or guaranteed outcome claims

## Core Audience

The likely buyer is already spiritually open. They may use tarot, astrology, journaling, energy work, or intuitive guidance.

They are not mainly looking for novelty. They are looking for a moment of clarity around a question that keeps looping.

Likely internal language:

- "I keep pulling cards about this and still do not feel clear."
- "I need someone grounded to read this with me."
- "I want spiritual guidance without being scared or pressured."
- "I need help naming the pattern."
- "I want to know what to do next without being told my fate."

## Research Summary

### Best Comparable: Taro's Tarot

Taro's Tarot is the most useful model mechanically.

What it does well:

- Free tarot reading tools first
- Paid deeper reports second
- Simple one-time purchases around $12.99-$14.99
- Many specific report angles
- Free reading creates the desire for more interpretation
- Paid offer feels like the continuation of the free pull

What not to copy:

- Overly relationship-anxious hooks
- "Hidden feelings" / "what they are not telling you" as the main brand position
- Large report library before validating one offer

### PerfectLove

Useful because it has a simple quiz-to-paid-unlock model:

- Free quiz
- Preview result
- $6.99 paid unlock
- Email delivery
- Stripe/Supabase-style app infrastructure

Weakness:

- Thin public footprint
- More generic mystical/productized feel
- More aggressive soulmate/future framing than we want

### Other Relevant Funnels

Biddy Tarot:

- Strong ethical quiz-to-tripwire model
- $19 product after quiz result
- Good example of a result page selling a concrete next artifact

Moon Reading / Numerologist:

- Free personalized result first
- Deeper paid report second
- Strong direct-response mechanics
- More plastic/aggressive than the desired brand, but useful for architecture

Spiritual Society:

- Low-ticket readings around $19.99-$24
- Membership ladder
- Some useful pricing proof, but copy can be too predictive

## Strategic Decision

The funnel should copy the Taro's Tarot structure, not the vibe.

The structure:

> Free card pull -> paid deeper card reading -> live session

The first paid offer should be directly about the cards they pulled. Avoid abstract names like "Clarity Letter" or "Clear Field Map" as the main purchase label.

The user should understand:

> I pulled cards. I can pay to get Casey's deeper take on these cards.

## Current Offer Ladder

### 1. Free 3-Card Pull

Working name:

> Free 3-Card Reading

Current method:

> Root / Mirror / Movement

Purpose:

- Capture attention
- Let the user experience the deck and reading style
- Collect name, email, question, intention, tone, selected cards
- Create a natural reason to buy the deeper interpretation

The free result should include:

- Three card images
- Card names and positions
- A first-layer synthesis
- A simple reflection
- A soft prompt toward the paid card reading

It should not give away every light/shadow/prompt/practice detail before the paid offer.

### 2. $19 Personalized Card Reading Video

This is the current preferred tripwire.

Working offer:

> Get Casey's quick take on your cards.

CTA:

> Get my video reading - $19

Format:

- 60-120 second personalized video
- Based on the exact three cards pulled
- Generated from their question, intention, tone, and cards
- Delivered by private link/email

What it includes:

- Their name/question or intention
- Their three cards shown on screen
- The main pattern in the spread
- One thing to notice
- One reflection prompt or next step
- Soft bridge to the $111 reading

What it is not:

- Not a live session
- Not a full written report
- Not a prediction
- Not a claim that Kasey personally hand-recorded every video if AI is used

Positioning language:

> A short personalized video reading of the cards you pulled.

The video can be AI-assisted as long as the framing is honest. Kasey's live personal attention should remain reserved for the $111 and $333 offers.

### 3. $111 Focused Angel Reading

Purpose:

- Core live conversion after the tripwire
- 30-minute private session
- One focused question
- Good for people who want to talk through the spread with Kasey

Current positioning:

> If you want to talk it through.

Better buyer-facing language:

> Book a focused private reading.

Includes:

- One primary question
- Root / Mirror / Movement or similar focused spread
- Angel-led interpretation
- One grounded next step

### 4. $333 Signature Angel-Led Tarot Reading

Purpose:

- Premium flagship offer
- Deeper live session for repeating patterns, transitions, release, and angelic clearing

Includes:

- Pre-session intake
- Custom spread
- Angel-led tarot reading
- Energetic clearing / release work in session
- Integration conversation
- Possible recording
- Written follow-up / clarity map

Positioning should emphasize depth, not just more minutes.

## AI Video Tripwire Plan

### MVP Fulfillment

Start semi-automated:

1. User completes card pull.
2. User clicks $19 video reading offer.
3. Stripe payment is taken.
4. System stores reading data.
5. AI generates a short script using Kasey's approved tone and the card meanings.
6. System generates a simple branded video:
   - Card images
   - Calm background
   - Text overlays
   - Optional voiceover or subtitle-first format
7. Video is delivered by email as a private link.
8. Kasey manually reviews early examples before full automation.

### Cost / Profit Logic

The $19 offer can work if:

- AI/video generation costs stay under roughly $1-$3 per video
- Delivery is automated
- The video stays short
- Kasey is not personally spending several minutes per order unless volume is tiny
- The primary profit still comes from $111/$333 conversions

If Kasey personally records the video, $19 is only viable as a very short, low-volume test. If she records manually, a $47 recorded reading makes more sense.

### Honesty / Disclosure

Avoid implying:

- Kasey personally hand-recorded every video if she did not
- AI is psychic
- The video predicts a guaranteed outcome

Safer phrasing:

> A short personalized card reading video based on your pull.

If needed:

> Created from Kasey's card-reading framework and the cards you selected.

## Current Site / Technical State

The project currently includes:

- `index.html`: main landing page and card pull
- `result.html`: result page
- `script.js`: card pull interaction and result submission
- `result.js`: result rendering and recommendation logic
- `card-data.js`: deck/card data
- `server.js`: lightweight backend
- `styles.css`: site styling

The backend currently:

- Serves static files
- Saves readings to `data/readings/{uuid}.json`
- Appends lead summaries to `data/leads.jsonl`
- Supports `POST /api/readings`
- Supports `GET /api/readings/:id`

The local backend has been tested at:

> http://127.0.0.1:4174/index.html

The result flow has been tested with a generated reading ID.

## Recent Page Changes

The result page was changed from a direct $111/$333 ask into a more natural funnel:

> Free layer -> $19 card reading -> $111 session bridge

Current result-page offer language:

> Your spread, read card by card.

Current $19 card:

> Full written card reading

This should now evolve into:

> Personalized card reading video

The page should be updated so the $19 package is no longer described primarily as written if we commit to the AI-assisted video tripwire.

## Recommended Next Build

### Step 1: Update Site Copy For Video Tripwire

Change result-page $19 offer from "Full written card reading" to:

> Personalized card reading video

Suggested copy:

> Get a short personalized video reading of the cards you pulled.

Bullets:

- Your three cards shown on screen
- Casey's quick take on the spread
- The pattern the cards seem to be pointing toward
- One reflection prompt or next step
- Delivered by private link

CTA:

> Get my video reading - $19

Status: implemented on `result.html` / `result.js` as the primary result-page tripwire.

### Step 2: Add Stripe Payment

MVP options:

1. Fastest: Stripe Payment Link
2. Better: `POST /api/checkout` creates Stripe Checkout session

Recommended first:

- Use Stripe Payment Link if validating manually
- Move to Checkout API when automation begins

Current MVP scaffold:

- `POST /api/video-checkout` accepts a saved reading ID.
- The route marks the reading as `payment.status = "checkout_started"`.
- The route sets `payment.product = "personalized-card-video"` and `payment.amount = 1900`.
- The route sets `video.status = "pending"`.
- The route returns `/success.html?id=...`.

This is not real Stripe yet. It is the local placeholder flow before live payment credentials are connected.

### Step 3: Add Paid Fulfillment State

Extend reading data with:

```json
{
  "payment": {
    "status": "unpaid",
    "amount": 1900,
    "currency": "usd",
    "stripeSessionId": null,
    "paidAt": null
  },
  "video": {
    "status": "pending",
    "script": null,
    "url": null,
    "emailedAt": null
  }
}
```

### Step 4: Create Success / Delivery Pages

Add:

- `success.html`: confirms purchase and sets delivery expectation
- `video.html?id=...&token=...`: private video/result page

MVP can use a placeholder delivery flow:

> Thanks, your video reading is being prepared. We will email it to you.

Status: `success.html` exists for the local MVP. `video.html` is still future work.

### Step 5: Email / CRM

Start simple:

- Airtable or Google Sheets for lead/order tracking
- Resend, Postmark, Brevo, or MailerLite for email
- No Supabase until the product needs accounts, dashboards, saved history, or multiple purchases per customer

Fields to track:

- Reading ID
- Name
- Email
- Question
- Intention
- Tone
- Cards
- Paid/unpaid
- Video status
- Recommended $111/$333 path
- Booking click

### Step 6: Analytics

Track:

- Page view
- Started pull
- Completed pull
- Email submitted
- Result viewed
- Clicked $19 offer
- Checkout started
- Purchase completed
- Video viewed
- Clicked $111 booking
- Clicked $333 booking

## Paid Traffic / Meta Compliance

Safer ad hooks:

- "Pull three cards for the question you keep coming back to."
- "A short tarot reflection for your next step."
- "Choose three cards and see what the spread reflects."
- "A gentle card reading for clarity and self-reflection."

Avoid:

- "Your ex is thinking about you."
- "The angels have an urgent warning."
- "You were meant to see this."
- "Find out what they are hiding."
- "Remove your blocks instantly."
- "Guaranteed accurate."
- "Your future changes after this."

Landing page must make clear:

- Tarot is for reflection/spiritual insight/entertainment
- No guaranteed outcomes
- Not medical/legal/financial/mental health advice
- Price is visible before payment
- One-time purchase if one-time
- No fake scarcity or countdowns

## Infrastructure Decision

Do not set up Supabase yet unless the funnel becomes a real app.

Use:

- Current Node backend for local MVP
- Stripe for payment
- Airtable/Google Sheets for lead/order tracking
- Email provider for delivery

Add Supabase later only if needed for:

- User accounts
- Customer dashboard
- Saved video/report library
- Purchase history
- Admin interface
- More complex fulfillment automation

## Open Questions

1. Will the $19 video be voiceover, subtitle-only, or both?
2. If voiceover is used, will it be Kasey's real recorded voice, AI voice with consent/disclosure, or generic narration?
3. What AI video tool will be used?
4. How fast should delivery be promised: instant, within 1 hour, or within 24 hours?
5. Should the first paid test be manually reviewed by Kasey?
6. Should the $19 purchase credit toward the $111 session?
7. What is the exact email provider and Stripe account setup?

## Immediate Next Step

Update the result-page offer from written reading to:

> $19 Personalized Card Reading Video

Then connect the CTA to a Stripe test payment flow and create a simple success page.
