# MyNunny - Connecting Clients with Reliable Nannies

A full-stack web application built with Next.js that connects clients with verified nannies across Kenya. The platform supports three user roles: Nunny, Client, and Admin, with comprehensive features for service matching, user management, and admin approval workflows.

## Features

### 🏠 For Clients
- Browse approved nannies in your area
- Post service requests with specific requirements
- Filter by county, constituency, and services
- Direct communication with nannies
- Transparent pricing and service descriptions

### 👩‍🍼 For Nunnies
- Create detailed profiles showcasing skills and experience
- Browse available client requests
- Set service offerings and contact information
- Admin approval system for quality assurance
- Local area matching (county and constituency)

### 👨‍💼 For Admins
- Review and approve nunny applications
- Manage user accounts and profiles
- Monitor platform activity
- Access to comprehensive user data

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT with bcrypt password hashing
- **Email**: Nodemailer with OTP verification
- **Testing**: Jest with React Testing Library

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mynunny
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   # Database
   DATABASE_URL="file:./dev.db"
   
   # JWT
   JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
   
   # Email (Ethereal for development)
   SMTP_HOST="smtp.ethereal.email"
   SMTP_PORT=587
   SMTP_USER="your-ethereal-username"
   SMTP_PASS="your-ethereal-password"
   SMTP_FROM="noreply@mynunny.com"
   
   # Cloudinary (optional - for profile pictures)
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   ```

4. **Set up the database**
   ```bash
   npx prisma db push
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Default Admin Account

The seed script creates a default admin account:
- **Username**: `admin`
- **Password**: `admin123`

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── admin/         # Admin-specific endpoints
│   │   └── ...
│   ├── admin/             # Admin dashboard pages
│   ├── client/            # Client dashboard pages
│   ├── nunny/             # Nunny dashboard pages
│   └── ...
├── components/            # Reusable UI components
│   └── ui/               # Basic UI components
├── contexts/             # React contexts
├── lib/                  # Utility functions and configurations
└── __tests__/           # Test files
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/verify-otp` - OTP verification
- `POST /api/auth/login` - User login

### Admin
- `GET /api/admin/nunnies` - Get all nunny applications
- `PATCH /api/admin/nunnies/[id]/approve` - Approve nunny
- `DELETE /api/admin/nunnies/[id]/reject` - Reject nunny

### General
- `GET /api/requests` - Get service requests
- `POST /api/requests` - Create service request
- `GET /api/nunnies` - Get approved nunnies
- `POST /api/contact` - Send contact form

## User Roles and Workflows

### Registration Flow
1. User selects role (Nunny or Client)
2. Fills out role-specific registration form
3. Receives OTP via email
4. Verifies OTP to complete registration
5. Nunnies start with 'PENDING' status

### Nunny Approval Process
1. Admin reviews nunny applications
2. Can approve (status: 'APPROVED') or reject (deletes user)
3. Approved nunnies can see and respond to client requests
4. Pending nunnies see approval message

### Service Matching
1. Clients post service requests with details
2. Approved nunnies browse available requests
3. Direct communication for service delivery
4. Local area matching by county/constituency

## Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Database Management

Reset the database:
```bash
npm run db:reset
```

Seed the database:
```bash
npm run db:seed
```

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Set environment variables in Vercel dashboard
   - Deploy automatically on push

3. **Database Setup for Production**
   - Use a production database (PostgreSQL recommended)
   - Update `DATABASE_URL` in environment variables
   - Run migrations: `npx prisma db push`

### Environment Variables for Production

```env
DATABASE_URL="postgresql://username:password@host:port/database"
JWT_SECRET="your-production-jwt-secret"
SMTP_HOST="your-smtp-host"
SMTP_PORT=587
SMTP_USER="your-smtp-username"
SMTP_PASS="your-smtp-password"
SMTP_FROM="noreply@yourdomain.com"
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@mynunny.com or create an issue in the repository.

## Roadmap

- [ ] Real-time messaging system
- [ ] Payment integration
- [ ] Rating and review system
- [ ] Mobile app
- [ ] Advanced search and filtering
- [ ] Background verification services
- [ ] Multi-language support