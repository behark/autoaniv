# AutoAni Installation Guide

This guide will help you set up the AutoAni automotive dealership website on your local machine and deploy it to production.

## 🚀 Quick Start (Docker - Recommended)

### Prerequisites
- Docker and Docker Compose installed
- Git

### 1. Clone and Setup
```bash
git clone <your-repo-url> autoani
cd autoani
cp .env.example .env
```

### 2. Configure Environment
Edit the `.env` file with your settings:
```bash
# Update these values
JWT_SECRET=your-actual-super-secret-key
JWT_REFRESH_SECRET=your-actual-refresh-secret
```

### 3. Start All Services
```bash
docker-compose up -d
```

### 4. Access Applications
- **Main Website**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3001
- **API Documentation**: http://localhost:5000/api-docs
- **Database**: MongoDB on port 27017

## 🛠️ Manual Installation

### Prerequisites
- Node.js 18+ and npm
- MongoDB running locally
- Git

### 1. Clone Repository
```bash
git clone <your-repo-url> autoani
cd autoani
cp .env.example .env
```

### 2. Install Dependencies
```bash
npm run install:all
```

### 3. Start MongoDB
Make sure MongoDB is running on your system.

### 4. Start Development Servers
```bash
npm run dev
```

This will start:
- Frontend on http://localhost:3000
- Backend on http://localhost:5000
- Admin on http://localhost:3001

## 📁 Project Structure

```
autoani/
├── frontend/          # React website (Vite + TypeScript)
├── backend/           # Node.js API (Express + MongoDB)
├── admin/             # React Admin dashboard
├── docker-compose.yml # Container orchestration
├── nginx.conf         # Nginx configuration
└── .env.example       # Environment variables template
```

## 🔧 Configuration

### Frontend Environment Variables
Create `frontend/.env.local`:
```
VITE_API_URL=http://localhost:5000/api
VITE_UPLOAD_URL=http://localhost:5000/uploads
```

### Admin Environment Variables
Create `admin/.env.local`:
```
VITE_API_URL=http://localhost:5000/api
```

## 📦 Building for Production

### Using Docker
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Manual Build
```bash
npm run build
```

## 🌐 Deployment

### 1. VPS/Cloud Server Deployment

#### Prerequisites
- Ubuntu 20.04+ server
- Domain name pointed to your server
- SSL certificate (Let's Encrypt recommended)

#### Steps
1. **Install Docker**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
sudo usermod -aG docker $USER
```

2. **Clone and Configure**
```bash
git clone <your-repo-url> /var/www/autoani
cd /var/www/autoani
cp .env.example .env
# Edit .env with production values
```

3. **Setup SSL with Let's Encrypt**
```bash
sudo apt install certbot
sudo certbot certonly --standalone -d autoani.com -d www.autoani.com
```

4. **Deploy**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### 2. Hostinger/Shared Hosting

For shared hosting, you'll need to:
1. Build the frontend locally: `cd frontend && npm run build`
2. Upload the `dist` folder to your hosting public directory
3. Deploy the backend to a service like Railway, Render, or Heroku
4. Update the API URLs in your frontend build

## 🗄️ Database Setup

### Sample Data
To populate your database with sample vehicles and brands:

```bash
# Connect to MongoDB
docker exec -it autoani_mongo_1 mongosh

# Switch to autoani database
use autoani

# Insert sample brand
db.brands.insertOne({
  name: "Mercedes-Benz",
  logo: "/brands/mercedes.png",
  description: "Luxury German automotive manufacturer",
  featured: true,
  vehicleCount: 15
})

# Insert sample vehicle
db.vehicles.insertOne({
  title: "Mercedes-Benz S-Class S63 AMG",
  brand: "Mercedes-Benz",
  model: "S-Class",
  year: 2024,
  price: 120000,
  currency: "EUR",
  mileage: 5000,
  transmission: "Automatic",
  fuelType: "Petrol",
  bodyType: "Sedan",
  color: "Black",
  engineSize: 4.0,
  horsepower: 630,
  description: "Luxury sedan with exceptional performance and comfort",
  features: ["Leather Seats", "Navigation", "Sunroof", "Bluetooth"],
  images: [],
  status: "Available",
  featured: true,
  slug: "mercedes-benz-s-class-s63-amg"
})
```

## 🔐 Admin Access

1. Access the admin panel at http://localhost:3001
2. The admin uses React Admin for vehicle and brand management
3. Authentication will be implemented in future versions

## 📱 Features Included

### Public Website
- ✅ Responsive homepage with hero section
- ✅ Vehicle listings with filtering
- ✅ Vehicle detail pages
- ✅ Brand browsing
- ✅ Multilingual support (Albanian/English)
- ✅ Contact forms
- ✅ SEO optimization
- ✅ Social media integration ready

### Admin Dashboard
- ✅ Vehicle CRUD operations
- ✅ Brand management
- ✅ Image upload ready
- ✅ Dashboard analytics
- 🔄 User authentication (coming soon)
- 🔄 Content management (coming soon)

### API Features
- ✅ RESTful API design
- ✅ MongoDB integration
- ✅ Input validation
- ✅ Error handling
- ✅ Swagger documentation
- ✅ Image upload endpoints
- 🔄 Authentication & authorization (coming soon)

## 🚨 Production Checklist

Before deploying to production:

- [ ] Change all default secrets in `.env`
- [ ] Set up SSL certificates
- [ ] Configure production database
- [ ] Set up email service (SMTP)
- [ ] Configure Google Maps API
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy
- [ ] Test all functionality
- [ ] Set up domain and DNS

## 🆘 Troubleshooting

### Common Issues

1. **Port already in use**
```bash
# Check what's using the port
lsof -i :3000
# Kill the process
kill -9 <PID>
```

2. **MongoDB connection failed**
```bash
# Check if MongoDB is running
docker ps | grep mongo
# Check logs
docker logs autoani_mongo_1
```

3. **Frontend not loading**
```bash
# Check if all services are running
docker-compose ps
# Restart services
docker-compose restart
```

## 📞 Support

For support and customization requests, contact the development team.

## 📄 License

Proprietary - AutoAni Business. All rights reserved.
