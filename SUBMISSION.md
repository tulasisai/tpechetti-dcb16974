# TurboVets Challenge Submission

**Candidate**: Tulasi Sai Pechetti  
**Email**: [Your Email]  
**Challenge**: Full Stack Engineer - Take Home Assessment  
**Submission Date**: December 3, 2025  
**Time Invested**: ~6 hours (within 8-hour limit)

---

## 📦 Repository

**GitHub URL**: `https://github.com/tulasisai/tpechetti-dcb16974`

*(After creating the repo, update this URL)*

---

## 🚀 Quick Start

### Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/tulasisai/tpechetti-dcb16974.git
   cd tpechetti-dcb16974
   ```

2. **Backend Setup**
   ```bash
   cd apps/api
   npm install
   cp .env.example .env
   npm run start:dev
   ```
   → Runs on `http://localhost:3333`

3. **Frontend Setup** (new terminal)
   ```bash
   cd apps/dashboard
   npm install
   npm start
   ```
   → Runs on `http://localhost:4200`

4. **Login with test credentials**:
   - Owner: `owner@example.com` / `ownerpass`
   - Admin: `admin@example.com` / `adminpass`
   - Viewer: `viewer@example.com` / `viewerpass`

### Run Tests
```bash
cd apps/api
npm test
```

---

## ✅ Requirements Checklist

### Core Requirements
- ✅ **NX-style Monorepo**: Apps and libs structure
- ✅ **Backend (NestJS)**: RESTful API with TypeORM + SQLite
- ✅ **Frontend (Angular)**: SPA with Tailwind CSS
- ✅ **JWT Authentication**: Real implementation (not mock)
- ✅ **RBAC System**: Guards, decorators, role inheritance
- ✅ **Organization Hierarchy**: 2-level support via parentId
- ✅ **Audit Logging**: Interceptor logs all requests
- ✅ **Tests**: Jest tests for RBAC logic
- ✅ **Documentation**: Comprehensive README

### RBAC Implementation
- ✅ **3 Roles**: Owner, Admin, Viewer
- ✅ **Role Inheritance**: Owner > Admin > Viewer
- ✅ **Permission Matrix**: Create/Edit/Delete/List/Audit
- ✅ **Decorators**: `@Roles('create')` on controllers
- ✅ **Guards**: `JwtAuthGuard`, `RolesGuard`, `OrgGuard`
- ✅ **Org Scoping**: Users see only their org data (except Owner)

### API Endpoints
- ✅ `POST /auth/login` - JWT authentication
- ✅ `POST /tasks` - Create task (Owner/Admin)
- ✅ `GET /tasks` - List tasks (role-filtered)
- ✅ `PUT /tasks/:id` - Update task (Owner/Admin)
- ✅ `DELETE /tasks/:id` - Delete task (Owner only)

### Frontend Features
- ✅ Login page with error handling
- ✅ Task dashboard with create/edit/delete
- ✅ JWT interceptor for auth headers
- ✅ Role-based UI (buttons hidden based on permissions)
- ✅ Responsive design with Tailwind CSS

---

## 🏗️ Architecture Highlights

### Backend Structure
```
apps/api/src/
├── auth/          # JWT + Passport.js
├── users/         # User entity & service
├── tasks/         # Task CRUD with RBAC
├── rbac/          # Guards, decorators, permission map
├── audit/         # Logging interceptor
└── orgs/          # Organization entity
```

### Key Design Decisions

1. **SQLite for Demo**: Easy setup without external DB; production would use PostgreSQL
2. **Permission Map**: Centralized RBAC logic in `permission-map.ts`
3. **Guard Composition**: Multiple guards (`JwtAuthGuard` → `RolesGuard` → `OrgGuard`)
4. **Audit Interceptor**: Global logging without cluttering controllers
5. **Shared Libs**: DTOs and role helpers in `libs/` for reuse

### Data Model
- **User**: id, name, email, passwordHash, role, orgId
- **Org**: id, name, parentId (supports 2-level hierarchy)
- **Task**: id, orgId, ownerId, title, description, status, category, timestamps

### Security
- ✅ bcrypt password hashing (10 rounds)
- ✅ JWT tokens with expiry
- ✅ Role-based authorization
- ✅ Org-level data isolation
- ✅ Audit trail for compliance

---

## 🧪 Testing RBAC

### Manual Test Scenarios

1. **Viewer Role**
   - Login: `viewer@example.com` / `viewerpass`
   - ✅ Can view tasks
   - ❌ Cannot create tasks (403 Forbidden)
   - ❌ Cannot edit tasks
   - ❌ Cannot delete tasks

2. **Admin Role**
   - Login: `admin@example.com` / `adminpass`
   - ✅ Can view tasks
   - ✅ Can create tasks
   - ✅ Can edit tasks
   - ❌ Cannot delete tasks (403 Forbidden)

3. **Owner Role**
   - Login: `owner@example.com` / `ownerpass`
   - ✅ Can view all tasks
   - ✅ Can create tasks
   - ✅ Can edit tasks
   - ✅ Can delete tasks

### Automated Tests
```bash
cd apps/api && npm test
```

Sample test output:
```
PASS  test/tasks-rbac.spec.ts
  ✓ viewer cannot create task
  ✓ admin can create task
  ✓ owner can delete task
```

---

## 📊 Time Breakdown

| Phase | Time | Notes |
|-------|------|-------|
| Requirements Analysis | 30m | Read PDF, plan architecture |
| Backend Setup | 1h | NestJS, TypeORM, entities |
| RBAC Implementation | 1.5h | Guards, decorators, permission logic |
| Frontend Setup | 1h | Angular, routing, auth service |
| UI Development | 1h | Task board, Tailwind styling |
| Testing & Docs | 1h | Jest tests, README, QUICKSTART |
| **Total** | **6h** | ✅ Within 8-hour limit |

---

## 🔮 Future Enhancements

### Security
- Refresh token rotation
- CSRF protection
- Rate limiting per user
- Input sanitization

### Features
- Drag-and-drop task board (Angular CDK)
- Real-time updates (WebSockets)
- Task assignments to users
- File attachments
- Email notifications

### Infrastructure
- PostgreSQL migration
- Redis caching for RBAC
- Docker Compose setup
- CI/CD pipeline (GitHub Actions)
- E2E tests (Cypress)

---

## 📝 Notes

### What I'm Proud Of
- Clean RBAC architecture with reusable guards
- Comprehensive documentation
- Working JWT auth (not mocked)
- Org hierarchy support for scalability
- Audit logging for compliance

### Trade-offs Made
- SQLite over PostgreSQL (easier local setup)
- Simple state management (no NgRx) for time efficiency
- Basic UI (functional, not pixel-perfect)
- Limited test coverage (core RBAC tested)

### What I'd Do With More Time
- Add Angular CDK drag-and-drop
- Implement full E2E test suite
- Add refresh token flow
- Build Docker Compose for one-command setup
- Create admin panel for user/org management

---

## 🎯 Why I'm a Fit for TurboVets

This challenge demonstrates:
- **Speed**: Delivered full-stack solution in 6 hours
- **Security-First**: JWT, RBAC, audit logging, password hashing
- **Scalability**: Monorepo structure, org hierarchy, extensible RBAC
- **Ownership**: Complete implementation, not just suggestions
- **Urgency**: Prioritized core features, documented trade-offs

I'm excited about TurboVets' mission to support American veterans. This technical foundation shows I can move fast while maintaining production-quality code.

---

**Let's build something impactful together.** 🚀

**Next Steps**: Please review the repository and let me know when we can schedule the 30-minute screening call.

---

**Repository**: https://github.com/tulasisai/tpechetti-dcb16974  
**Contact**: [Your Email] | [Your Phone]
