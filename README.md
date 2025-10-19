# AI Legal Learning Platform – MVP

This repository contains the Phase 1 scaffold for an AI-powered, adaptive legal learning platform for Iran's bar exam (وکالت). It is a monorepo that bundles the Next.js web client, the FastAPI backend, shared packages, and local infrastructure resources.

## Repository Structure

```
ai-legal-learning/
├─ apps/
│  ├─ web/                      # Next.js frontend (App Router, TypeScript, Tailwind, RTL)
│  └─ api/                      # FastAPI backend (quiz engine, summarizer, analytics)
├─ packages/
│  └─ shared/                   # Shared TypeScript utilities (OpenAPI client placeholder)
├─ infra/
│  ├─ docker-compose.yml        # Local stack (Postgres, Redis, MinIO, API, Web)
│  └─ alembic/                  # Database migrations scaffold
├─ .env.example                 # Environment template for local development
└─ README.md
```

## Getting Started

### 1. Clone & Install

```bash
git clone <repo>
cd ai-legal-learning
cp .env.example .env
```

### 2. Start Local Infrastructure

```bash
cd infra
docker compose up -d
```

### 3. Backend (FastAPI)

```bash
cd ../apps/api
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 4. Frontend (Next.js)

```bash
cd ../../apps/web
npm install
npm run dev
```

The web client is available at `http://localhost:3000` and communicates with the FastAPI backend running at `http://localhost:8000`.

## Key Features in the MVP Scaffold

- Extractive summarizer API (`POST /summaries/extract`) using a deterministic TextRank-inspired heuristic.
- Adaptive quiz engine with a rule-based difficulty adjuster (3 correct → harder, 3 incorrect → easier).
- Dashboard UI with placeholder analytics charts and heatmap using Chart.js.
- Quiz player UI wired to the adaptive endpoints via a proxy route.
- Shared TypeScript package stub for future OpenAPI client generation.
- Docker Compose stack covering Postgres, Redis, MinIO, the API, and the web client.

## Next Steps

1. Flesh out authentication with NextAuth.js and secure JWT exchange with the API.
2. Implement file uploads to S3-compatible storage with presigned URLs and integrate the summarizer flow.
3. Build the admin review UI and RQ worker pipeline for human-in-the-loop question curation.
4. Expand analytics endpoints and connect them to real data sources.
5. Implement Alembic migrations and seed scripts (1400–1403 bar exam questions).

Refer to the `/infra`, `/apps/api`, and `/apps/web` directories for detailed documentation and code comments guiding further development.
