# HavenBridge Home Care Platform

A modern, full-stack web platform combining marketing website and functional care management application.

## Features

- **Marketing Website**: High-conversion pages for services, about, and resources
- **Appointment Booking**: Clients can book appointments online
- **Career Applications**: Job seekers can apply and upload resumes
- **Contact Management**: General inquiries with admin reply capability
- **Admin Dashboard**: Secure dashboard for managing appointments, applications, and messages
- **Local Database**: SQLite database via Prisma ORM
- **Authentication**: JWT-based admin authentication

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite (via Prisma ORM)
- **Authentication**: JWT + bcrypt
- **Validation**: Zod + React Hook Form
- **Email**: NodeMailer (optional)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone or navigate to the project directory

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Initialize database:
```bash
npm run prisma:generate
npm run prisma:migrate
```

5. Seed initial admin user (optional):
```bash
npm run seed
```

6. Start development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
havenbridge-platform/
├── app/                          # Next.js App Router pages
│   ├── api/                      # API routes
│   ├── admin/                    # Admin dashboard
│   ├── appointments/             # Appointment booking
│   ├── careers/                  # Career applications
│   ├── contact/                  # Contact form
│   └── ...                       # Other pages
├── components/                   # React components
│   ├── layout/                   # Layout components (Navbar, Footer)
│   ├── forms/                    # Form components
│   └── ui/                       # UI components
├── lib/                          # Utility functions
│   ├── utils/                    # Helper functions
│   └── validations/              # Zod schemas
├── prisma/                       # Prisma schema and migrations
└── public/                       # Static files
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

## API Endpoints

### Public APIs
- `POST /api/appointments` - Submit appointment request
- `POST /api/careers/apply` - Submit job application
- `POST /api/contact` - Submit contact message

### Admin APIs (Protected)
- `POST /api/admin/login` - Admin login
- `GET /api/admin/appointments` - List appointments
- `PUT /api/admin/appointments/:id` - Update appointment
- `POST /api/admin/appointments/:id/reply` - Reply to appointment
- `GET /api/admin/careers` - List applications
- `PUT /api/admin/careers/:id/status` - Update application status
- `GET /api/admin/messages` - List messages
- `POST /api/admin/messages/:id/reply` - Reply to message

## Database Schema

- **admins** - Admin users
- **appointments** - Appointment requests
- **career_applications** - Job applications
- **contact_messages** - Contact form submissions
- **audit_logs** - Admin action logs

## Security

- HTTPS enforcement
- JWT authentication
- Password hashing (bcrypt)
- Input validation (Zod)
- File upload restrictions
- Role-based access control
- Audit logging

## Future Enhancements

- Client portal
- Staff scheduling
- Billing & invoicing
- EHR integration
- Advanced reporting

## License

ISC
