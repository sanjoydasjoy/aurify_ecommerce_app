# aurify_ecommerce_app



## How to Run


**Prerequisites:**

<br>
If you have nodejs installed, proceed with the following steps to run the application:



1. **Clone/Download this Repository:**
   ```bash
   git clone <repository-url>

2. **Access the frontend folder in terminal:**

    ```bash
   cd frontend
3. **Install the dependencies:**

    ```bash
   npm install

4. **Run the frontend:**

    ```bash
    npm run dev

5. **Access the backend folder in new terminal:**

    ```bash
   cd backend

5. **Install the dependencies:**

    ```bash
   npm install

6. **Run the backend:**

    ```bash
    nodemon server.js
    
7. **Access the admin folder in terminal:**

    ```bash
    cd admin
    
8. **Install the dependencies:**

    ```bash
   npm install

9. **Run the admin:**

    ```bash
    npm run dev
___

## Deployment (Vercel + Railway)

Deploy in this order:

1. Backend to Railway
2. Frontend to Vercel
3. Admin to Vercel

### 1. Deploy Backend to Railway

1. Push this repo to GitHub.
2. In Railway, create a new project from your GitHub repo.
3. Set service **Root Directory** to `backend`.
4. Railway will use `backend/railway.json` and run `npm run start`.
5. Add backend environment variables from `backend/.env.example`:
    - `mongodb_url`
    - `cloudinary_name`
    - `cloudinary_api_key`
    - `cloudinary_secret_key`
    - `JWT_SECRET`
    - `admin_email`
    - `admin_password`
    - `FRONTEND_URL` (set after frontend deploy; update and redeploy once frontend URL is known)
    - Optional: `STRIPE_SECRET_KEY`, `OPENAI_API_KEY`, `OPENAI_MODEL`
6. Deploy and copy your Railway backend URL, for example:
    - `https://your-backend.up.railway.app`

### 2. Deploy Frontend to Vercel

1. In Vercel, import the same GitHub repository.
2. Set project **Root Directory** to `frontend`.
3. Framework preset: `Vite`.
4. Add environment variable:
    - `VITE_BACKEND_URL=https://your-backend.up.railway.app`
5. Deploy.

Notes:
- `frontend/vercel.json` already includes SPA rewrite so refresh on routes works.

### 3. Deploy Admin to Vercel

1. Create another Vercel project from the same repo.
2. Set project **Root Directory** to `admin`.
3. Framework preset: `Vite`.
4. Add environment variable:
    - `VITE_BACKEND_URL=https://your-backend.up.railway.app`
5. Deploy.

Notes:
- `admin/vercel.json` already includes SPA rewrite.

### 4. Final Production Wiring

1. Copy your deployed frontend URL from Vercel, e.g. `https://aurify-store.vercel.app`.
2. In Railway backend env, set:
    - `FRONTEND_URL=https://aurify-store.vercel.app`
3. Redeploy Railway backend.
4. In Vercel (frontend/admin), keep `VITE_BACKEND_URL` pointed to Railway backend URL.

### Quick Health Checks

- Backend health: open `https://your-backend.up.railway.app/` and confirm `Api working`.
- Frontend API wiring: try login and load products.
- Admin API wiring: login to admin and test add/list products.

### Environment Templates

- Backend template: `backend/.env.example`
- Frontend template: `frontend/.env.example`
- Admin template: `admin/.env.example`
