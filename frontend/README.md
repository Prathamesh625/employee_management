# Employee Management Backend

# setup instructions

cd backend

npm install

npx prisma init --datasource-provider sqlite --output ../generated/prisma

npx prisma migrate dev --name init

npm run dev

This is the **backend** for the Employee Management System, built using **Node.js**, **Express.js**, and **Prisma ORM**.  
It provides RESTful APIs to **create, read, update, and delete employees**, and is fully compatible with the React frontend.

---

## 🚀 Features

- CRUD operations for employees
- Input validation using **Zod**
- Modern RESTful API design
- sqlite database integration via **Prisma**
- Environment-based configuration


---

## 🧰 Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js + Express | Server & routing |
| Prisma ORM | Database management |
| sqlite | Relational database |
| Zod | Validation for forms & API input |
| JWT (optional) | Authentication & authorization |
| dotenv | Environment variables |

---

## ⚙️ Prerequisites

- Node.js 20+  
- npm  
- sqlite database  
- Git  

---
