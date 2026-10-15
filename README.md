# Cloud 9 Physical Therapy

A redesigned site for [Cloud 9 Physical Therapy](https://cloud9physicaltherapy.com/), the one-to-one clinic at 5370 E. Thompson Rd, Suite G, Indianapolis.

Photographs come from the current site: the clinic, the real team, and one treatment photo of Dr. Skye with a patient. Stock and generated pictures of other people are not used. Seven service pages use object-only illustrations made for this site (no people, alt text says so) instead of repeating the same clinic photos. Hours, fees, services, and patient reviews are the clinic’s as well.

Appointment requests, insurance checks, and physician referrals open an email to contact@cloud9pt.com. They are not confirmed until the clinic replies.

## Run it

```bash
npm install
npm run dev
```

The dev server listens on [http://127.0.0.1:4317](http://127.0.0.1:4317).

## Pages

- `/` the practice
- `/services` and `/services/[slug]` the ten services
- `/about` the team
- `/gallery` clinic photographs
- `/visit` hours, map, fees, and questions
- `/book` visit request
- `/start` two questions that point at an existing service. A starting point, not medical advice
- `/insurance` Medicare, private plans, and self-pay, plus a benefits-check request
- `/refer` a referral a physician’s office can email or fax. Patients in Indiana do not need it
- `/first-visit` what to wear, the hour, cost, paperwork, and cancellation
- `/southside` the Thompson Road clinic for people searching physical therapy in Indianapolis

## Switching things on

- Google review buttons (homepage reviews and footer) stay hidden until `reviewUrl` in `lib/content.ts` holds the clinic's Google "write a review" link.
- The "Ask a question" assistant answers only from the clinic's FAQ, hours, fees, and service copy in `lib/content.ts` and `lib/answers.ts`.
- `/refer` has a print layout ("Print a one-page referral sheet") built from the clinic's contact details.
