# E-Commerce Platform

A full-stack online store: a customer storefront, an admin dashboard and a REST API.

| Folder    | What it is                                   | Tech                                           |
| --------- | -------------------------------------------- | ---------------------------------------------- |
| `client/` | Customer storefront                          | React 19, Vite, Tailwind CSS, Material UI      |
| `admin2/` | Admin dashboard (products, orders, users...) | React 19, Vite, Tailwind CSS, Material UI, Recharts |
| `server/` | REST API                                     | Node.js, Express 5, MongoDB (Mongoose)         |

## Features

**Customers**
- Register with email OTP verification, login, forgot / reset password
- Browse by category and sub category, search, sort, filter by price and rating
- Product page with image zoom, stock status, quick view
- Cart, wishlist, saved delivery addresses
- Checkout with cash on delivery or online payment (Chapa)
- Order history, order cancellation, profile and avatar

**Admin**
- Admin-only login (admin accounts are created with a script, there is no public admin sign-up)
- Products (add, edit, delete, up to 8 images), categories and sub categories, home slider
- Orders: change order and payment status, see customer and delivery details
- Users: activate or suspend accounts
- Dashboard with totals and a 12-month sales chart

**Security**: bcrypt password hashing, hashed OTP codes, JWT access and refresh tokens, role checks,
rate limiting on login/OTP routes, Helmet, CORS allow-list, prices and stock always checked on the server.

---

## Run it on your computer

Requirements: Node.js 20 or newer, and a MongoDB database (a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster is the easiest).

```bash
# 1. API
cd server
cp .env.example .env        # then open .env and fill in the values
npm install
npm run dev                  # http://localhost:8000  (check http://localhost:8000/health)

# 2. Create your admin account (once)
ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='ChooseAStrongOne1' ADMIN_NAME='Your Name' npm run create-admin

# 3. Storefront (new terminal)
cd client
cp .env.example .env
npm install
npm run dev                  # http://localhost:5173

# 4. Admin dashboard (new terminal)
cd admin2
cp .env.example .env
npm install
npm run dev -- --port 5174   # http://localhost:5174
```

Generate the two secret keys with:
`node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`

### Server environment variables

| Variable | Needed | Purpose |
| --- | --- | --- |
| `MONGODB_URI` | yes | MongoDB connection string |
| `SECRET_KEY_ACCESS_TOKEN`, `SECRET_KEY_REFRESH_TOKEN` | yes | Long random strings used to sign login tokens |
| `CLIENT_URL` | yes in production | Allowed front end origins, comma separated, no trailing slash |
| `EMAIL`, `BREVO_API_KEY` | for email | Sender address + Brevo API key (works on Render's free tier) |
| `EMAIL_PASS` | alternative | Gmail app password, for local development only |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | for images | Product, category, slider and avatar uploads |
| `CHAPA_SECRET_KEY` | optional | Turns on online payment. Leave empty for cash on delivery only |
| `SHIPPING_FEE` | optional | Flat delivery fee in ETB |

---

## Put it online (works on any phone or computer)

Everything below has a free tier.

### 1. Database: MongoDB Atlas
1. Create a free cluster, then **Database Access** -> add a user and password.
2. **Network Access** -> add `0.0.0.0/0` (Render's addresses change).
3. **Connect -> Drivers** -> copy the connection string. Put your database name in it
   (`...mongodb.net/ecommerce?retryWrites=true...`). This is `MONGODB_URI`.

### 2. Images: Cloudinary
Create a free account and copy the cloud name, API key and API secret from the dashboard.

### 3. Email: Brevo
Render's free plan **blocks SMTP (Gmail)**, so use Brevo's HTTP API: create a free account, verify a sender
email address (**Senders & IP**), and create an API key (**SMTP & API -> API Keys**).
Set `EMAIL` to the verified sender and `BREVO_API_KEY` to the key.

### 4. API: Render
1. Push this repo to GitHub. In Render choose **New -> Blueprint** and select the repo (it reads `render.yaml`),
   or create a **Web Service** by hand with root directory `server`, build `npm install`, start `npm start`.
2. Fill in the environment variables from the table above. Leave `CLIENT_URL` for step 6.
3. After the deploy, open `https://<your-api>.onrender.com/health` - it should answer `{"status":"ok"}`.
4. Open the Render **Shell** (or run locally with the same `MONGODB_URI`) and create the admin account:
   `ADMIN_EMAIL=... ADMIN_PASSWORD=... npm run create-admin`

> The free Render plan sleeps after 15 minutes without traffic, so the first request can take 30-60 seconds.
> A paid instance or a free uptime pinger on `/health` avoids that.

### 5. Storefront and admin: Vercel (or Netlify)
Create **two** projects from the same repo:

| Project | Root directory | Environment variable |
| --- | --- | --- |
| Storefront | `client` | `VITE_API_URL=https://<your-api>.onrender.com` |
| Admin | `admin2` | `VITE_API_URL=https://<your-api>.onrender.com` |

Framework preset **Vite**, build command `npm run build`, output `dist`. The included `vercel.json`
and `public/_redirects` make page refreshes and shared links work.

### 6. Connect them (CORS)
Back in Render set `CLIENT_URL` to both front end addresses, for example
`https://myshop.vercel.app,https://myshop-admin.vercel.app` (no trailing slashes) and redeploy the API.

### 7. Online payment (optional)
Create a Chapa account, copy the **secret key** into `CHAPA_SECRET_KEY`, redeploy. The "Pay online"
option then appears at checkout.

---

## Quick test checklist (do this before you show it to anyone)

1. `GET /health` returns ok.
2. Register -> a code arrives by email -> verify -> login.
3. Forgot password -> code -> new password -> login.
4. Admin: log in, create a category, a sub category, a product with images, a home slide.
5. Storefront: product appears on the home page, in the category, in search; open it, add to cart and wishlist.
6. Checkout with a new address using cash on delivery; the order shows under My orders.
7. Admin: open the order, set it to *shipped* then *delivered*; the customer sees the new status.
8. Try it on a phone, in the browser's responsive mode, and after a page refresh on `/my-orders`.

## Project structure

```
server/   controllers/ models/ routes/ middleware/ config/ utils/ scripts/createAdmin.js
client/   src/pages  src/components  src/api.js  (storefront)
admin2/   src/pages  src/components  src/api.js  (dashboard)
render.yaml   Render blueprint for the API
```

## Known limits

- Product reviews are not implemented (the rating shown is set by the admin).
- The Chapa payment flow confirms payment when the customer returns to *My orders*; there is no server webhook yet.
- Compare and social login were removed from the interface because they had no backend.

## Author

Abdisa Alemayehu Niguse - [GitHub](https://github.com/Abdisa-Aex) - [LinkedIn](https://www.linkedin.com/in/abdisa-alex-96ba03353/)
