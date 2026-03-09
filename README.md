# PLM Integration Service

Enterprise-style demo project that syncs engineering drawing metadata from a PLM API into PostgreSQL, supports webhook-based updates, provides a validation UI, and enforces RBAC.

## Roles
- admin
- validator
- viewer

## Core flows
1. PLM sends webhook for drawing change.
2. API verifies signature and enqueues sync job.
3. Worker fetches drawing metadata from PLM API.
4. Worker maps fields and upserts drawing record.
5. Validator reviews any failed or warning records in the UI.

## Run
```bash
cp .env.example .env
docker compose up --build