# TurboVets Secure Task Management System

## Overview
Secure Task Management System implementing Role-Based Access Control (RBAC) in an NX-style monorepo structure.

**Tech Stack:**
- Backend: NestJS + TypeORM + SQLite + JWT
- Frontend: Angular 15 + Tailwind CSS
- Architecture: Monorepo with shared libraries

## Project Structure
```
tpechetti-dcb16974/
├── apps/
│   ├── api/              # NestJS Backend
│   └── dashboard/        # Angular Frontend
├── libs/
│   ├── data/            # Shared DTOs and Interfaces
│   └── auth/            # RBAC roles and helpers
├── README.md
└── package.json
```

## Setup Instructions

### Prerequisites
- Node.js 16+ and npm
- Git

### Backend Setup
```bash
cd apps/api
npm install
cp .env.example .env
npm run start
```

Backend will run on `http://localhost:3333`

### Frontend Setup
```bash
cd apps/dashboard
npm install
npm start
```

Frontend will run on `http://localhost:4200` with API proxy configured.

### Environment Variables
Create `apps/api/.env` with:
```
JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=3600s
PORT=3333
```

### Default Test Users
```
owner@example.com / ownerpass
admin@example.com / adminpass  
viewer@example.com / viewerpass
```

## Architecture

### Monorepo Structure
- **apps/api**: Backend application with authentication, RBAC, and task management
- **apps/dashboard**: Frontend SPA with login, task board, and state management
- **libs/data**: Shared DTOs and TypeScript interfaces
- **libs/auth**: Role definitions and RBAC helper functions

### Backend Architecture
- **Auth Module**: JWT-based authentication with Passport.js
- **Users Module**: User entity and service for credential verification
- **Tasks Module**: CRUD operations with RBAC enforcement
- **Orgs Module**: Organization entity supporting 2-level hierarchy
- **RBAC System**: Custom guards and decorators for permission checking
- **Audit Interceptor**: Logs all API requests with user context

### Frontend Architecture
- **Auth Service**: Handles login and JWT token management
- **Tasks Service**: HTTP client for task API operations
- **JWT Interceptor**: Automatically attaches JWT to outgoing requests
- **Routing**: Protected routes with login/tasks pages
- **State**: Simple service-based state management

## Data Model

### Entity Relationship Diagram
```
┌─────────────┐       ┌──────────────┐       ┌─────────────┐
│    User     │       │     Org      │       │    Task     │
├─────────────┤       ├──────────────┤       ├─────────────┤
│ id (uuid)   │───┐   │ id (string)  │   ┌───│ id (uuid)   │
│ name        │   │   │ name         │   │   │ orgId       │
│ email       │   └──>│ parentId     │<──┘   │ ownerId     │
│ passwordHash│       └──────────────┘       │ title       │
│ role        │                              │ description │
│ orgId       │                              │ status      │
└─────────────┘                              │ category    │
                                              │ createdAt   │
                                              │ updatedAt   │
                                              └─────────────┘
```

### Key Relationships
- **User → Org**: Each user belongs to one organization (1:N)
- **Org → Org**: Organizations support 2-level hierarchy via `parentId`
- **Task → User**: Each task has one owner (1:N)
- **Task → Org**: Tasks belong to organizations for scoping

## Access Control (RBAC)

### Role Hierarchy
```
Owner > Admin > Viewer
```

### Permission Matrix
| Role   | Create | Edit | Delete | List | View Audit |
|--------|--------|------|--------|------|------------|
| Owner  | ✔      | ✔    | ✔      | ✔    | ✔          |
| Admin  | ✔      | ✔    | ✖      | ✔    | ✔          |
| Viewer | ✖      | ✖    | ✖      | ✔    | ✖          |

### Implementation Details
- **Role Inheritance**: Owner inherits Admin and Viewer permissions
- **Org Scoping**: Viewers see only their org; Admins/Owners see hierarchy
- **Guards**: `JwtAuthGuard`, `RolesGuard`, `OrgGuard` protect endpoints
- **Decorators**: `@Roles('create')` decorator maps permissions to routes

### RBAC Components
```typescript
// Permission check in guard
const perms = PermissionMap[user.role];
if (required.includes("create") && perms.create) return true;

// Org-level access control
if (user.role === "Owner") return true; // Owners bypass org checks
return user.orgId === targetOrgId;      // Others must match org
```

## API Documentation

### Authentication
```
POST /auth/login
Body: { email: string, password: string }
Response: { access_token: string }
```

### Tasks
All task endpoints require JWT via `Authorization: Bearer <token>` header.

```
POST /tasks
Body: { title, description?, category?, status? }
RBAC: Owner/Admin only
Response: Created task object

GET /tasks
RBAC: All roles (filtered by org scope)
Response: Array of tasks

PUT /tasks/:id
Body: { title?, description?, category?, status? }
RBAC: Owner/Admin (same org only)
Response: Updated task object

DELETE /tasks/:id
RBAC: Owner only
Response: { success: true }
```

### Audit Logging
All requests are logged via `AuditInterceptor`:
```json
{
  "time": "2025-12-03T10:30:00.000Z",
  "user": "uuid-here",
  "method": "POST",
  "url": "/api/tasks"
}
```

## Testing

### Backend Tests
```bash
cd apps/api
npm test
```

**Test Coverage:**
- RBAC permission checks (Viewer cannot create, Admin can create, Owner can delete)
- JWT authentication flow
- Org scoping validation

**Sample Test:**
```typescript
it("viewer cannot create task", async () => {
  const viewer = { id: "v1", role: "Viewer", orgId: "org-root" };
  await expect(svc.create({ title: "x" }, viewer)).rejects.toBeDefined();
});
```

### Frontend Tests
```bash
cd apps/dashboard
npm test
```

### Manual Testing
1. Start backend: `cd apps/api && npm run start`
2. Start frontend: `cd apps/dashboard && npm start`
3. Login as different roles and verify:
   - Viewer: Can list tasks, cannot create/edit/delete
   - Admin: Can create/edit tasks, cannot delete
   - Owner: Full access to all operations

## Security Considerations

### Current Implementation
- ✔ JWT-based stateless authentication
- ✔ Password hashing with bcrypt (10 rounds)
- ✔ Role-based access control with guards
- ✔ Organization-level data isolation
- ✔ Audit logging for all API requests
- ✔ CORS enabled for cross-origin requests

### Production Recommendations
- **Refresh Tokens**: Implement refresh token rotation for longer sessions
- **CSRF Protection**: Add CSRF tokens for state-changing operations
- **Rate Limiting**: Implement request throttling per user/IP
- **HTTPS Only**: Enforce TLS in production environments
- **Secret Management**: Use environment-specific secrets (not in code)
- **Input Validation**: Add class-validator decorators to all DTOs
- **SQL Injection**: TypeORM provides parameterized queries (already protected)

## Future Considerations

### Scalability
- **Database**: Migrate from SQLite to PostgreSQL for production
- **Caching**: Add Redis for RBAC permission caching
- **Org Hierarchy**: Optimize recursive org graph lookups with materialized paths
- **Search**: Add full-text search for tasks (PostgreSQL tsvector or Elasticsearch)

### Features
- **Multi-tenancy**: Enhanced org isolation with row-level security
- **Task Assignment**: Assign tasks to specific users
- **Activity Feed**: Real-time task updates via WebSockets
- **File Attachments**: Support task-related file uploads
- **Notifications**: Email/SMS alerts for task changes
- **Dashboard Analytics**: Charts for task completion rates by org/user

### DevOps
- **CI/CD**: GitHub Actions for automated testing and deployment
- **Docker**: Containerize backend and frontend
- **Monitoring**: Add APM (Application Performance Monitoring)
- **Logging**: Centralized logging with structured output (JSON)
- **E2E Tests**: Cypress or Playwright for full workflow testing

## Development Workflow

### Running in Development
```bash
# Terminal 1: Backend with hot-reload
cd apps/api
npm run start:dev

# Terminal 2: Frontend with hot-reload
cd apps/dashboard
npm start
```

### Building for Production
```bash
# Backend
cd apps/api
npm run build

# Frontend
cd apps/dashboard
npm run build
```

### Code Quality
- ESLint configured for TypeScript
- Prettier for consistent formatting
- Pre-commit hooks recommended (husky + lint-staged)

## Troubleshooting

### Backend won't start
- Check Node version (16+)
- Verify `.env` file exists in `apps/api`
- Delete `node_modules` and `package-lock.json`, then `npm install`

### Frontend build errors
- Check Angular CLI version: `ng version`
- Clear Angular cache: `rm -rf .angular`
- Ensure backend is running before frontend (proxy dependency)

### Login fails
- Verify backend is running on port 3333
- Check browser console for CORS errors
- Confirm test credentials match database seed data

### Tasks not appearing
- Check JWT token in browser localStorage
- Verify user role and org in token payload (use jwt.io)
- Check backend logs for RBAC guard failures

## Contact & Submission

**Candidate**: Tulasi Sai Pechetti  
**Project**: TurboVets Full Stack Engineer Challenge  
**Repository**: tpechetti-dcb16974  
**Completion Date**: December 2025

---

Built with urgency, security, and scalability in mind. 🚀
