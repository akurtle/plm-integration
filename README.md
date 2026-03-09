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



---

## Database schema

### `infra/postgres/init.sql`
```sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'validator', 'viewer')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS drawings (
  id SERIAL PRIMARY KEY,
  plm_id VARCHAR(100) UNIQUE NOT NULL,
  drawing_number VARCHAR(100) NOT NULL,
  revision VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  lifecycle_state VARCHAR(100) NOT NULL,
  owner_name VARCHAR(255),
  material_code VARCHAR(100),
  validation_status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (validation_status IN ('pending', 'valid', 'warning', 'invalid')),
  validation_errors TEXT,
  last_synced_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS webhook_events (
  id SERIAL PRIMARY KEY,
  event_type VARCHAR(100) NOT NULL,
  plm_object_id VARCHAR(100) NOT NULL,
  payload JSONB NOT NULL,
  received_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (email, password_hash, role)
VALUES
('admin@example.com', '$2b$10$Vx0r6L6v4h4eS5A0X7E7eONqgQb7pjM4o8w8dV0P6m0Y9vQ89k4oW', 'admin'),
('validator@example.com', '$2b$10$Vx0r6L6v4h4eS5A0X7E7eONqgQb7pjM4o8w8dV0P6m0Y9vQ89k4oW', 'validator'),
('viewer@example.com', '$2b$10$Vx0r6L6v4h4eS5A0X7E7eONqgQb7pjM4o8w8dV0P6m0Y9vQ89k4oW', 'viewer')
ON CONFLICT (email) DO NOTHING;
