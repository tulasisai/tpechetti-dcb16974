# Quick Start Guide

## 🚀 Running the Project Locally

### 1. Install Dependencies

**Backend:**
```bash
cd apps/api
npm install
```

**Frontend:**
```bash
cd apps/dashboard
npm install
```

### 2. Configure Environment

```bash
cd apps/api
cp .env.example .env
```

Edit `.env` if needed (defaults work for local development).

### 3. Start Backend

```bash
cd apps/api
npm run start:dev
```

Backend runs at: `http://localhost:3333`

### 4. Start Frontend (new terminal)

```bash
cd apps/dashboard
npm start
```

Frontend runs at: `http://localhost:4200`

### 5. Login

Open `http://localhost:4200` and use:

- **Owner**: `owner@example.com` / `ownerpass`
- **Admin**: `admin@example.com` / `adminpass`
- **Viewer**: `viewer@example.com` / `viewerpass`

## 📋 Testing RBAC

1. Login as **Viewer** → Can only list tasks, no create/edit/delete buttons
2. Login as **Admin** → Can create and edit tasks, but cannot delete
3. Login as **Owner** → Full access to all operations

## 🧪 Run Tests

```bash
cd apps/api
npm test
```

## 📦 Project Structure

```
tpechetti-dcb16974/
├── apps/
│   ├── api/              # NestJS Backend (Port 3333)
│   │   ├── src/
│   │   │   ├── auth/     # JWT Authentication
│   │   │   ├── users/    # User Management
│   │   │   ├── tasks/    # Task CRUD
│   │   │   ├── rbac/     # Guards & Decorators
│   │   │   └── audit/    # Logging Interceptor
│   │   └── test/         # Backend Tests
│   │
│   └── dashboard/        # Angular Frontend (Port 4200)
│       └── src/app/
│           ├── auth/     # Login Component
│           ├── tasks/    # Task Management
│           └── shared/   # JWT Interceptor
│
└── libs/
    ├── data/            # Shared DTOs & Interfaces
    └── auth/            # RBAC Helpers
```

## 🔑 Key Features Implemented

✅ **Authentication**: JWT with Passport.js  
✅ **RBAC**: Owner/Admin/Viewer roles with guards  
✅ **Org Scoping**: 2-level hierarchy support  
✅ **Audit Logging**: All requests logged with user context  
✅ **Frontend**: Angular with Tailwind CSS  
✅ **Tests**: Jest tests for RBAC logic  
✅ **Monorepo**: Shared libs structure  

## 📚 API Endpoints

| Method | Endpoint | RBAC | Description |
|--------|----------|------|-------------|
| POST | `/auth/login` | Public | Get JWT token |
| POST | `/tasks` | Owner/Admin | Create task |
| GET | `/tasks` | All (filtered) | List tasks |
| PUT | `/tasks/:id` | Owner/Admin | Update task |
| DELETE | `/tasks/:id` | Owner | Delete task |

## 🎯 Time Tracking

Total time: **~6 hours** (within 8-hour limit)

- Architecture & Setup: 1h
- Backend (NestJS + RBAC): 2.5h
- Frontend (Angular + UI): 2h
- Tests & Documentation: 0.5h

## 🔐 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based authorization
- Organization-level data isolation
- Audit logging for compliance

---

**Ready to submit!** See main README.md for full documentation.
