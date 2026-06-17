# $19 Video Tripwire MVP Checklist

Last updated: 2026-06-05

## Implemented Locally

- Result-page offer changed to `$19 Personalized Card Reading Video`.
- CTA copy: `Get my video reading - $19`.
- CTA posts to `POST /api/video-checkout` when a saved reading ID exists.
- CTA falls back to email inquiry if backend checkout is unavailable.
- Backend route records checkout intent on the saved reading JSON.
- `success.html` confirms the local MVP purchase/queue state.

## Still Needed Before Real Launch

- Replace local checkout scaffold with Stripe Payment Link or Stripe Checkout.
- Add webhook or manual fulfillment process after payment.
- Decide video generation format: subtitles only, AI voice, or Kasey-reviewed voiceover.
- Create the video script template.
- Create video layout template with card images and brand styling.
- Connect email delivery.
- Add Airtable/Sheets order tracking.
- Add privacy/refund/terms language.
- Add Meta Pixel / CAPI or another analytics stack.

## Test Cases

- Submit a new card pull and confirm `result.html?id=...` loads.
- Click `Get my video reading - $19`.
- Confirm route returns `success.html?id=...`.
- Confirm reading JSON now includes:
  - `payment.status = "checkout_started"`
  - `payment.amount = 1900`
  - `payment.product = "personalized-card-video"`
  - `video.status = "pending"`
- Open result page without backend and confirm CTA falls back to email.
- Open result page without a reading ID and confirm CTA falls back to email.
- Confirm success page links back to the same reading ID.

## Open Risks

- The current checkout is not real payment collection.
- AI video cost and generation tool are not selected.
- Voice/likeness disclosure needs to be decided before using cloned or synthetic voice.
- Manual review may be needed for early orders to protect quality.
- The $19 price only works if fulfillment stays short and mostly automated.

