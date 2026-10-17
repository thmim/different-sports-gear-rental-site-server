# 🚴 GearUp - Sports & Outdoor Equipment Rental Site Backend

GearUp is a full-stack rental platform backend for sports and outdoor equipment. Customers browse and rent gear, providers manage their inventory and fulfill orders, and admins oversee the whole platform. It features role-based access, JWT authentication, and **SSLCommerz payment integration** with server-side validation.

## 🚀 Live API

```
https://sports-gear-rental-site-server.vercel.app/
```
## 🚀 Postman Collection

```
https://documenter.getpostman.com/view/45092075/2sBY4LRMfv
```

---

## 🛠️ Tech Stack

| Layer | Technologies |
| --- | --- |
| **Language** | TypeScript |
| **Runtime & Framework** | Node.js, Express.js |
| **Database** | PostgreSQL |
| **ORM** | Prisma |
| **Authentication** | JWT (JSON Web Tokens) |
| **Payments** | SSLCommerz |
| **Deployment** | Vercel |
| **Frontend (client)** | Next.js, ShadCN UI |

---
## 🔑 Demo Admin Access

Use these credentials to explore the admin features:

| Field | Value |
| --- | --- |
| Email | `messi10@gmail.com` |
| Password | `messi10` |

---

## ✨ Features

### 🌍 Public
- Browse all available sports and outdoor gear
- Search and filter by category, price, brand and availability
- View gear details and specifications

### 🧑 Customer
- Register and log in as a customer
- Place rental orders by selecting gear and dates
- Pay securely through **SSLCommerz** when confirming an order
- View payment history and payment status
- Track rental order status from placement to return
- Leave reviews after returning gear
- Manage profile

### 🏪 Provider
- Register and log in as a provider
- Add, edit and remove gear from inventory
- Manage stock and availability
- View incoming rental orders
- Update order status (confirm, picked up, returned)

### 🛡️ Admin
- View and manage all users (suspend or activate accounts)
- View all gear listings and rental orders
- Manage gear categories

---


---

## 👥 Roles & Permissions

| Role | Description | Key Permissions |
| --- | --- | --- |
| **Customer** | Users who rent gear | Browse gear, place orders, pay, track status, leave reviews |
| **Provider** | Gear vendors and rental shops | Manage inventory, view orders, update order status |
| **Admin** | Platform moderators | Manage users, oversee rentals, manage categories |

---


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
Rental Status = RETURNED
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
PORT=

APP_URL=

BCRYPT_SALT_ROUND=

JWT_ACCESS_SECRET=

JWT_REFRESH_SECRET=

JWT_ACCESS_EXPIRES=

JWT_REFRESH_EXPIRES=

SSLC_STORED_ID=

SSLC_STORED_PASSWORD=

DATABASE_URL=
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
├── |
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
│   └── lib
│
├── app.ts
│
└── server.ts
```

---
## 🔒 Security Highlights

- JWT authentication with role-based route protection
- Server-side payment validation before any order status changes
- Permission-scoped workflows for each role (customer, provider, admin)
- Secrets and credentials kept in environment variables

## 👨‍💻 Author

**Taharim Hasan Mim**
Full Stack Developer | Khulna, Bangladesh

📧 mdtaharimmim1010@gmail.com
🔗 [LinkedIn](https://www.linkedin.com/in/th-mim10/) · [Portfolio](https://taharim-hasan.vercel.app/)


