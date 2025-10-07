
## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/employee_management.git
cd employee_management


# 🧑‍💼 Employee Management Frontend

cd frontend

# setup instructions

npm install

npm run dev

This is the **frontend application** for the **Employee Management System**.  
It is built using **React**, **Vite**, **React Query**, **Axios**, **React Hook Form**, and **Zod** for form validation.

It allows you to:
- 👤 View a list of employees
- ➕ Add new employees
- ✏️ Edit existing employees
- 🗑️ Delete employees
- 🔍 Search and filter employees
---

## 🚀 Tech Stack

| Technology | Purpose |
|------------|---------|
| React + Vite | Frontend framework |
| TypeScript | Type safety |
| React Query | Data fetching, caching, and mutations |
| Axios | API requests |
| React Hook Form | Form handling |
| Zod | Schema-based form validation |
| Tailwind CSS | Styling and responsive design |
| Lucide Icons | Modern icons |

---

## 🧰 Prerequisites

- Node.js 20+    
- npm or yarn  
- Employee Management Backend running locally or deployed


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





