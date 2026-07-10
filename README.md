# 🚴 GearUp - Sports & Outdoor Equipment Rental API

GearUp is a backend REST API for a sports and outdoor equipment rental platform. It allows customers to rent sports gear, providers to manage their equipment, and admins to oversee the entire platform.

## 🚀 Live API

> Add your deployed backend URL here

```
https://your-api-url.com
```

---

## 📂 GitHub Repository

> Add your GitHub repository link here

```
https://github.com/your-username/gearup-backend
```

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- SSLCommerz Payment Gateway
- bcrypt
- Zod Validation

---

## ✨ Features

### Authentication

- User Registration
- User Login
- JWT Authentication
- Get Current User
- Role-based Authorization

### Customer Features

- Browse all available gear
- View gear details
- Search and filter gear
- Create rental orders
- Track rental status
- Make secure payments
- Submit reviews

### Provider Features

- Add gear items
- Update gear information
- Delete own gear items
- View incoming rental orders
- Update rental status
- Manage inventory

### Admin Features

- Manage users
- Update user roles
- Manage categories
- View all rental orders
- Delete any gear item
- Moderate platform resources

---

## 📌 User Roles

- Customer
- Provider
- Admin

---

## 🗄️ Database Schema

### Users

- id
- name
- email
- password
- role
- status
- created_at
- updated_at

### Categories

- id
- category_name
- image
- description

### GearItems

- id
- provider_id
- category_id
- name
- description
- brand
- product_image
- daily_price
- quantity
- condition
- is_available

### RentalOrders

- id
- customer_id
- gearItem_id
- total_amount
- start_date
- end_date
- status

### Payments

- id
- rentalOrder_id
- customer_id
- amount
- transaction_id
- provider
- status
- currency
- paid_at

### Reviews

- id
- customer_id
- item_id
- rating
- comment

---

## 🔄 Rental Workflow

```
Browse Gear
      │
      ▼
Create Rental Order
      │
      ▼
Rental Status = PENDING
      │
      ▼
Payment
      │
      ▼
Rental Status = CONFIRMED
      │
      ▼
Provider Hands Over Gear
      │
      ▼
Rental Status = ACTIVE
      │
      ▼
Customer Returns Gear
      │
      ▼
Rental Status = COMPLETED
```

---

## 💳 Payment Workflow

- Customer creates a rental order
- SSLCommerz payment session is created
- Customer completes payment
- Payment is validated
- Rental order status is updated
- Gear quantity decreases
- If quantity becomes **0**, the gear becomes unavailable
- After return, quantity increases and the gear becomes available again

---

## 📦 Installation

Clone the repository

```bash
git clone https://github.com/your-username/gearup-backend.git
```

Move into the project

```bash
cd gearup-backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
DATABASE_URL=

JWT_SECRET=

BCRYPT_SALT_ROUNDS=

SSLC_STORE_ID=

SSLC_STORE_PASSWORD=

SSLC_PAYMENT_API=

SSLC_VALIDATION_API=

PORT=
```

Generate Prisma Client

```bash
npx prisma generate
```

Run Migration

```bash
npx prisma migrate dev
```

Start Development Server

```bash
npm run dev
```

---

## 📌 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get Current User |

---

### Users

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/users` | Get All Users (Admin) |
| PATCH | `/api/users/:id/role` | Update User Role |

---

### Categories

| Method | Endpoint |
|---------|----------|
| POST | `/api/categories` |
| GET | `/api/categories` |
| PATCH | `/api/categories/:id` |
| DELETE | `/api/categories/:id` |

---

### Gear Items

| Method | Endpoint |
|---------|----------|
| POST | `/api/gear` |
| GET | `/api/gear` |
| GET | `/api/gear/:id` |
| PATCH | `/api/gear/:id` |
| DELETE | `/api/gear/:id` |

---

### Rental Orders

| Method | Endpoint |
|---------|----------|
| POST | `/api/rentals` |
| GET | `/api/rentals` |
| GET | `/api/rentals/:id` |
| PATCH | `/api/rentals/:id/status` |

---

### Payments

| Method | Endpoint |
|---------|----------|
| POST | `/api/payments/init-payment/:orderId` |
| POST | `/api/payments/success` |
| POST | `/api/payments/fail` |
| POST | `/api/payments/cancel` |

---

### Reviews

| Method | Endpoint |
|---------|----------|
| POST | `/api/reviews` |
| GET | `/api/reviews/:gearId` |

---

## 🔐 Authentication

Protected routes require a JWT token.

```
Authorization: Bearer <access_token>
```

---

## 📁 Project Structure

```
src
│
├── app
│   ├── modules
│   │   ├── auth
│   │   ├── users
│   │   ├── gear
│   │   ├── categories
│   │   ├── rentals
│   │   ├── payments
│   │   └── reviews
│   │
│   ├── middlewares
│   ├── routes
│   ├── utils
│   └── config
│
├── prisma
│
└── server.ts
```

---

## 👨‍💻 Author

**Md Taharim Hasan Mim**


