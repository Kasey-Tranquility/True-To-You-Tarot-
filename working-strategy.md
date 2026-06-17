# True to You Tarot Working Strategy

Last updated: 2026-06-03

This document captures the working memory of the True to You Tarot / Clear Field landing page, the research we have done so far, and the rough plan for turning the current page into a real funnel for paid traffic.

## Current Direction

True to You Tarot is being shaped as a premium, creator-led tarot and angelic clearing offer. The vibe should feel calm, luminous, emotionally intelligent, angelic, and premium. It should not feel like a psychic hotline, fear-based soulmate funnel, or aggressive direct-response prediction product.

The core offer is not simply "get a tarot reading." The stronger positioning is:

> Reflective tarot and angelic clearing for clarity, release, and self-trust. No fixed-future predictions. No fear. No pressure.

The current best headline direction is:

> Stop pulling cards on the same question.

Why this works:

- It speaks directly to tarot users.
- It names a real behavior: repeating pulls, rereading signs, circling the same issue.
- It creates curiosity without fear.
- It avoids making risky personal-attribute claims in ad copy.
- It bridges naturally into a deeper paid session.

## Audience Hypothesis

The likely ICP is spiritually open women, roughly 30-55, who are emotionally self-aware and already familiar with tarot, astrology, energy work, journaling, or intuitive guidance.

They are not looking for a cheap psychic prediction. They are looking for clarity around a relationship, decision, repeating emotional pattern, life transition, or energetic residue they cannot quite shake.

They may be thinking:

- "I keep pulling cards on this and I still do not feel clear."
- "Part of me already knows something has to change."
- "I want spiritual guidance, but I do not want to be scared or told what to do."
- "I need to separate what is mine from what I am carrying for someone else."
- "I want someone grounded and intuitive to hold this with me."

## Offer Ladder

The strongest ladder from the research is:

1. Free Clear Field 3-Card Reflection
   - Interactive Root / Mirror / Movement card pull.
   - User chooses an intention and emotional tone.
   - Email capture unlocks the deeper synthesis, prompts, and next-step recommendation.

2. $19 Clear Field Mini Reading
   - Low-ticket tripwire.
   - Written or audio one-question reading delivered within 48 hours.
   - Purpose: prove paid intent from strangers before asking cold traffic to buy $111 or $333.

3. $111 Focused Angel Card Pull
   - 30-minute private session.
   - One focused question.
   - 3-card Root / Mirror / Movement spread.
   - Angel message, one grounded next step, and short written recap.
   - Best for decisions, relationship check-ins, or "what am I not seeing?"

4. $333 Signature Angel-Led Tarot Clearing
   - Flagship offer.
   - 75-90 minute private Zoom session.
   - Pre-session intake.
   - Custom tarot spread.
   - Angel-led clearing / energetic release in session.
   - Integration conversation.
   - Recording when possible.
   - Written Clarity Map within 72 hours: core pattern, card themes, what to release, what to trust, next 7-day practice.

5. $897 Clear Field Arc
   - Three-session backend container over 6-8 weeks.
   - Best for repeating relationship patterns, major transitions, closure, intuitive self-trust, or creative/spiritual thresholds.

6. Optional future membership
   - $33-$44/month.
   - Monthly collective reading, journal prompts, short clearing audio, ritual notes, and member-only mini-spreads.

## Funnel Plan

The recommended funnel is:

1. Meta / Instagram ad
2. Landing page
3. Free Clear Field 3-Card Reflection
4. Email capture for full reflection
5. Thank-you / result page
6. $19 written or audio mini reading
7. Email sequence
8. $111 Focused Angel Card Pull
9. $333 Signature Angel-Led Tarot Clearing
10. $897 Clear Field Arc or membership

Current static MVP status:

- The card pull now asks for intention and emotional tone.
- The on-page card result shows the first layer after three cards are selected.
- First name and email hand off the result into `result.html` using session storage.
- `result.html` shows the deeper Root / Mirror / Movement reflection, light/shadow notes, prompts, practices, and a recommended next step.
- Routing currently sends focused/urgent/clarity-style pulls toward `$111` and deeper/tangled/release/new-chapter pulls toward `$333`.
- This is still a local/static prototype. It does not yet send real email, create CRM records, or track analytics events.

The strategic point: cold traffic should usually not be asked to jump straight into $333. The free pull and $19 mini reading should warm the lead, prove interest, and create trust in Kasey's specific reading style.

## Current Page Status

The current page has a strong visual direction and a functional card pull using real Rider-Waite-Smith cards.

Completed / improved:

- Page exists at `index.html`.
- Main styling is in `styles.css`.
- Card interaction is in `script.js`.
- Deck data is in `card-data.js`.
- Fonts restored to Cormorant Garamond and Inter after a font experiment felt worse.
- The deck now uses real RWS major arcana card images from `assets/rws/`.
- Selected cards now render as real card images in the three-card panel.
- The awkward "RWS Tarot" label on selected spread cards was removed.
- The page currently uses the $111 / $333 price structure.

Current limitations:

- The email form is a demo and does not actually capture leads.
- Booking links are `mailto:` links, not real checkout/calendar links.
- No thank-you page yet.
- No Stripe, Square, Calendly, Acuity, or similar booking/payment infrastructure.
- No real Meta Pixel / CAPI / GA4 tracking yet.
- No testimonials or case studies yet.
- No real privacy policy, terms, refund/cancellation policy, or checkout disclaimer.
- No sample paid reading deliverable.
- The card pull gives away the reflection before email capture, so visitors can leave without entering the funnel.
- The page needs stronger copy and more concrete offer deliverables.

## Research Synthesis

### Tarot and Spiritual Funnel References

Useful references found:

- Biddy Tarot: quiz segmentation, education funnel, $19 tripwire, authority ecosystem.
- Ethony Tarot: clear reading tiers, deliverables, testimonials, paid reading ladder.
- Labyrinthos: tarot as self-discovery, daily ritual, journaling, app habit loop.
- CHANI: premium spiritual tone, founder-led authority, subscription and ritual model.
- The Pattern: self-understanding language and relationship/pattern framing.
- Moon Reading: low-ticket personalized report ladder, useful mechanics but less premium.
- The Sisters Enchanted: ethical spiritual education/community funnel.
- Aulani Alchemy: strong $333 Akashic/session comp, 90-min session, integration, recording, higher package.
- The Blonde Mystic: angel-number pricing ladder around $111 / $222 / $333.
- Spiritual Society: low-ticket reading ladder and membership, but some copy is too aggressive for this brand.

Businesses and patterns to avoid copying too closely:

- Psychic marketplace sites.
- Soulmate initials / urgent love prediction hooks.
- "Chosen one" or destiny-warning funnels.
- Claims that imply guaranteed answers, future certainty, or fear-based urgency.
- Landing pages that feel cheap, cluttered, or manipulative.

### Strong Funnel Patterns

The stronger funnels tend to use:

- A quiz, card pull, or personalized report before a paid offer.
- Email capture before the full interpretation.
- A low-ticket bridge before higher-ticket work.
- Clear deliverables and fulfillment expectations.
- Repeated touchpoints through email or app-style ritual.
- Trust near the price: testimonials, reader credibility, session format, policy clarity.
- A backend offer, membership, or repeat-purchase mechanism.

### Strong Copy Patterns

The page should:

- Lead with a specific emotional situation, not a modality.
- Agitate the loop, not the person.
- Use curiosity ethically.
- Make the session tangible.
- Put proof near CTAs and pricing.
- Sequence CTAs by readiness.
- Make Kasey's authority more concrete.

Good copy directions:

- "Stop pulling cards on the same question."
- "Clear the question your mind keeps returning to."
- "When the answer feels tangled, clear the field around it."
- "A private tarot clearing for the pattern you are ready to stop carrying."
- "The cards name the pattern. The clearing helps you release what is not yours."
- "When the emotional static clears, the next step usually gets quieter and more obvious."

Avoid:

- "Submit"
- "Learn more"
- "Unlock your destiny"
- "Guaranteed answers"
- "Finally know the truth"
- "Your soulmate is..."
- Any ad or page copy that implies the advertiser knows the visitor's private attributes, fears, relationship status, mental state, or future.

## Better Card Pull / Quiz Flow

The current card pull should evolve into a guided lead magnet.

Recommended flow:

1. Entry screen
   - "Receive a 3-card Clear Field Reflection."
   - Ask: "What kind of clarity would feel supportive today?"
   - Options: Relationship, Decision, Release, Self-trust, New chapter.

2. Micro-intake
   - Ask: "What is the tone of this question?"
   - Options: Tender, tangled, urgent, hopeful, tired.
   - Optional first name.

3. Ritual interaction
   - Shuffle.
   - Breathe.
   - Select 3 cards.
   - Reveal card names and short position meanings on-page.

4. Lead gate
   - "Your deeper reflection is ready: light/shadow notes, one journal prompt per card, and a grounded next step."
   - Capture first name + email.
   - Optional checkbox for weekly reflections.

5. Personalized result
   - Full Root / Mirror / Movement synthesis.
   - Recommended next container:
     - Focused question: $111 Angel Card Pull.
     - Repeating pattern / release point: $333 Signature Clearing.

6. Follow-up sequence
   - Email 1: full result.
   - Email 2: what the Root card may be asking you to stop carrying.
   - Email 3: Kasey's story / authority / session philosophy.
   - Email 4: invitation to $111 or $333 session.

## Meta / Paid Traffic Considerations

Meta reviews both ads and landing pages, so the page has to be compliance-aware.

Safer angles:

- "Try a free 3-card tarot reflection."
- "A gentle card pull for clarity, release, and your next grounded step."
- "A private tarot reading and angel-led clearing."
- "Reflective tarot without fixed-future predictions."
- "For one question you are ready to hold more clearly."

Riskier angles:

- "Are you stuck in a painful relationship?"
- "You are blocked."
- "Your angels have an urgent message."
- "Find out if they are thinking of you."
- "Your soulmate's initials."
- "You keep attracting unavailable partners."

Ad concepts to test:

1. Free 3-card reflection for one decision.
2. Stop over-reading the same question.
3. Relationship clarity without fixed-future predictions.
4. A grounded tarot session for release and next steps.
5. Try the Root / Mirror / Movement spread.

## Validation Plan

Do not scale ads until the funnel proves purchase intent.

Suggested MVP test:

- Duration: 14 days.
- Budget: $500-$1,500.
- Goal: prove strangers will opt in, buy a low-ticket reading, and ascend into $111 / $333.

Track:

- Landing page views.
- Card pull starts.
- Card pull completions.
- Email opt-ins.
- Thank-you page views.
- $19 purchases.
- $111 booking clicks and purchases.
- $333 booking clicks and purchases.
- Completed sessions.
- Testimonials / referrals / upsells.

Pass marks:

- 25-40% opt-in from ad click.
- 5-10% of opt-ins buy the $19 mini reading.
- 3-5% of opt-ins book the $111 session.
- $333 purchase rate of 0.3-0.7% from visitors, or sell $333 mainly from warm $111 buyers.
- CAC under $35 for $111, under $100 for $333 unless repeat purchase data supports more.
- At least 10 paid stranger purchases before scaling.
- At least 3 testimonials with permission.

## What The Page Needs Next

Highest-priority page changes:

1. Rewrite hero around the stronger angle.
   - Headline: "Stop pulling cards on the same question."
   - Subhead: name the relationship / decision / emotional pattern loop.
   - Add a trust line: "75-90 minutes · private Zoom · tarot, angelic clearing, integration notes."

2. Make the card pull a better lead magnet.
   - Add intention and tone selection.
   - Reveal partial result before opt-in.
   - Email-gate the deeper interpretation.
   - Recommend $111 or $333 based on user path.

3. Rewrite the offer cards.
   - Make $333 the flagship.
   - Make $111 a focused doorway.
   - Add "best for" and "you receive" bullets.

4. Add proof.
   - Testimonials.
   - Real Kasey photo or video.
   - Session examples.
   - Tranquility Wellness credibility.

5. Add infrastructure.
   - Stripe or Square checkout.
   - Calendly or Acuity booking.
   - Email platform.
   - Thank-you page.
   - Pixel/CAPI/GA4.
   - Privacy, terms, cancellation, refund, disclaimer.

6. Add a sample deliverable.
   - Example Clarity Map.
   - Example written mini reading.
   - Example aftercare email.

## Open Decisions

These are the decisions still needed before the funnel can become real:

- Should the $19 tripwire be written, audio, or AI-assisted with Kasey review?
- Should the primary CTA lead to $333 or to the free reflection for paid traffic?
- Which booking/payment tool should be used?
- Which email platform should own the lead magnet and nurture sequence?
- Should there be a separate paid-traffic landing page variant with softer Meta-safe copy?
- What real proof can be gathered now: testimonials, case examples, screenshots, client language?
- What photo/video assets of Kasey are available?
- What exact session policy will be used for refunds, rescheduling, and no-shows?

## Recommended Next Session

The next build session should focus on turning the current page into the MVP funnel:

1. Rewrite the landing page copy around the sharper positioning.
2. Redesign the card pull into intention + tone + card selection + lead gate.
3. Add a result/recommendation block that routes users to $111 or $333.
4. Add proof placeholders and a more concrete Kasey credibility section.
5. Add a basic thank-you page shell.
6. Add placeholders for checkout, calendar, privacy, terms, and tracking.

The working standard: the page should no longer just look good. It should make a stranger understand what this is, feel the style of the reading, leave an email, and know exactly which paid step is right for them.
