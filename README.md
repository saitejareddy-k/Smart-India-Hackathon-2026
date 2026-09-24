# KisanConnect

**An AI-powered agri-marketplace connecting farmers directly to buyers — accessible from a smartphone, a basic phone, or through a field agent.**

---

## Overview

KisanConnect is an agri-marketplace built around a shared backend architecture that serves farmers through three distinct access paths, regardless of the device or connectivity they have available:

- **Smartphone app / PWA** — for farmers with internet-connected smartphones
- **Basic-phone IVR / SMS** — for farmers without smartphone or data access
- **FPO / field-agent assisted entry** — for farmers who prefer or need human assistance

All three channels converge into the same underlying marketplace, AI, logistics, trust/payment, and analytics infrastructure, so every farmer gets the same access to buyers and fair pricing, no matter how they connect.

## Core Principle

> A farmer should never have to understand a complex form.

The system is designed to reduce every farmer interaction to a small set of structured fields — **crop, quantity, availability, and location** — with everything else (demand prediction, buyer matching, routing, pricing) handled by the platform.

## Demo Flow

```
Farmer
  → Telugu voice / FPO entry
  → Produce listing
  → AI demand prediction
  → Buyer match
  → Multi-farmer allocation
  → Route optimization
  → Delivery
  → Farmer payout
```

## Languages

**Launch languages:**
- English
- Telugu
- Hindi

**Planned:**
- Tamil
- Kannada
- Marathi

## Tech Stack

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS
- PWA support
- i18next (internationalization)
- Leaflet (maps)

### Backend
- Python
- FastAPI
- REST APIs
- JWT / OTP authentication

### AI / Machine Learning
- Python, Pandas, scikit-learn
- Demand forecasting
- OR-Tools (route and allocation optimization)
- Speech / NLP (for voice-based listing entry)

### Database
- PostgreSQL
- Redis (optional, for caching / sessions)

### External Integrations
- OpenStreetMap
- OSRM (routing engine)
- Government market data (mandi prices, etc.)
- Weather API
- SMS / IVR gateway
- Voice services
- Payment gateway

## Architecture

All three farmer-facing channels (app, IVR/SMS, FPO-assisted) feed into a common set of backend services:

| Layer | Responsibility |
|---|---|
| Marketplace | Produce listings, buyer discovery, offers |
| AI | Demand prediction, price guidance, multi-farmer allocation |
| Logistics | Route optimization, delivery scheduling |
| Trust & Payment | Verification, escrow, farmer payouts |
| Analytics | Market insights, platform usage, reporting |

This keeps the farmer-facing experience simple while the complexity lives in shared, reusable services underneath.

## Getting Started

> Setup instructions will depend on the final repo structure. Suggested outline once the codebase is in place:

```bash
# Clone the repository
git clone <repo-url>
cd kisanconnect

# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend
cd frontend
npm install
npm run dev
```

## Project Status

This is an early-stage specification. Contributions, structure, and scope are expected to evolve as the architecture is implemented.

## License

Add license information here.
