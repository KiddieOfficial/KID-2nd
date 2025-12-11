
Donation Bridge Backend (CommonJS)
---------------------------------
This project contains a simple donation bridge backend with:
- /api/session          -> create session token for a universeId
- /api/tail?universeId  -> get last donation id for universe
- /api/poll?universeId&after=ID -> get donations after ID
- /api/donations?universeId&after=ID -> alias for poll
- /api/webhook/<platform>/<universeId> -> POST webhooks for saweria, sociabuzz, tako, bagibagi
- /api/triggerManualDonation -> Remote admin trigger (POST)

Storage:
- Default: in-memory (volatile). Suitable for local testing.
- Optional: Replace lib/donationStore.js to use Redis/Upstash or Vercel KV for persistence in production.

secretkey.json:
- Put API keys / secrets for external services here.

Deploy:
- Upload to GitHub and import into Vercel. Ensure `api/` is at repo root.
