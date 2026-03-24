# Aurify Ecommerce App

Aurify is a full-stack ecommerce platform with a customer storefront, an admin management panel, and an API-first backend. It includes modern UI, role-based authentication, order workflows, and AI-powered product discovery features.

## Project Summary

- Customer app for browsing collections, cart, checkout, and order history.
- Admin app for secure product and order management.
- Backend API with JWT auth, MongoDB persistence, Cloudinary media handling, and modular routes.
- AI enhancements with semantic product search and stylist recommendations.

## Key Features

- User authentication and profile dashboard.
- Product catalog with filters, sorting, search, and category/subcategory controls.
- Cart management and order placement.
- Payment flow for demo-safe deployment.
- Admin authentication with protected product/order actions.
- AI Product Search endpoint with fallback ranking when AI key is absent.
- AI Stylist Assistant endpoint with product recommendations.
- Dark/light theme-ready premium UI across major pages.

## AI Integration

- AI Product Search:
  - Endpoint: POST /api/ai/search
  - Purpose: semantic query-to-product ranking
  - Behavior: uses OpenAI if configured, otherwise reliable keyword/category fallback

- AI Stylist Assistant:
  - Endpoint: POST /api/ai/stylist
  - Purpose: outfit suggestions plus matched products
  - Behavior: uses OpenAI if configured, otherwise fallback response + ranked picks

## Tech Stack

- Frontend/Admin: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Auth: JWT
- Media: Cloudinary
- Payments: Flow enabled, Stripe path available
- Deployment: Vercel (frontend/admin) + Railway (backend)

## Standard Folder Structure

```text
aurify_ecommerce_app/
├── README.md
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── railway.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vercel.json
└── admin/
     ├── public/
     ├── src/
     │   ├── assets/
     │   ├── components/
     │   ├── pages/
     │   ├── App.jsx
     │   └── main.jsx
     ├── package.json
     └── vercel.json
```

## Local Setup

Prerequisite: Node.js installed.

1. Clone repository.
2. Install backend dependencies and run backend.
3. Install frontend dependencies and run frontend.
4. Install admin dependencies and run admin.

Commands:

```bash
# Terminal 1
cd backend
npm install
npm run server

# Terminal 2
cd frontend
npm install
npm run dev

# Terminal 3
cd admin
npm install
npm run dev
```

## Environment Variables

Use template files:

- backend/.env.example
- frontend/.env.example
- admin/.env.example

Minimum required backend vars:

- mongodb_url
- cloudinary_name
- cloudinary_api_key
- cloudinary_secret_key
- JWT_SECRET
- admin_email
- admin_password

Frontend/Admin var:

- VITE_BACKEND_URL

Optional backend vars:

- STRIPE_SECRET_KEY
- OPENAI_API_KEY
- OPENAI_MODEL
- FRONTEND_URL

## Deployment

Recommended order:

1. Deploy backend on Railway (Root Directory: backend).
2. Deploy frontend on Vercel (Root Directory: frontend).
3. Deploy admin on Vercel (Root Directory: admin).

Production wiring:

- Set VITE_BACKEND_URL in both Vercel projects to Railway backend URL.
- Set FRONTEND_URL in Railway to storefront Vercel URL.




