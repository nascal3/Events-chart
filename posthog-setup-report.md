# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Dev Events Next.js app. Here's a summary of all changes made:

- **`instrumentation-client.ts`** (new file): Initializes PostHog client-side using the `posthog-js` SDK with the EU host, reverse proxy ingestion, exception capture, and debug mode in development.
- **`next.config.ts`**: Added reverse proxy rewrites routing `/ingest/*` traffic through the Next.js server to `eu.i.posthog.com`, preventing ad blocker interference. Also set `skipTrailingSlashRedirect: true`.
- **`.env.local`**: Added `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` environment variables (gitignored).
- **`app/components/ExploreBtn.tsx`**: Added `explore_events_clicked` capture on the CTA button click.
- **`app/components/EventCard.tsx`**: Added `event_card_clicked` capture (with `title`, `slug`, `location`, `date` properties) when a user clicks an event card. Added `'use client'` directive.
- **`app/components/Navbar.tsx`**: Added `nav_link_clicked` captures (with `label` and `href` properties) on each navbar link. Added `'use client'` directive.

| Event | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicks the 'Explore Events' CTA button on the homepage | `app/components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicks on an event card to navigate to the event detail page | `app/components/EventCard.tsx` |
| `nav_link_clicked` | User clicks a navigation link in the top navbar | `app/components/Navbar.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](/dashboard/680593)
- [Event Card Clicks Over Time](/insights/lqqmMWeX)
- [Explore Events Button Clicks](/insights/YmruG97D)
- [Nav Link Clicks by Label](/insights/3tlpu1pj)
- [Explore to Event Card Conversion Funnel](/insights/3cjZps8F)
- [Total User Interactions](/insights/YchofJRi)

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
