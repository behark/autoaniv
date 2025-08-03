# 🚀 AutoAni Deployment Guide

This guide will help you deploy the AutoAni website to production using Netlify for the frontend and various cloud services for the backend.

## 📋 Deployment Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API    │    │   Database      │
│   (Netlify)     │────│   (Railway/      │────│   (MongoDB      │
│   autoani.com   │    │    Render)       │    │    Atlas)       │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                       ┌──────────────────┐
                       │   Admin Panel    │
                       │   (Netlify)      │
                       │   admin.autoani  │
                       └──────────────────┘
```

## 🎯 Step 1: Create GitHub Repository

### 1.1 Initialize and Push to GitHub
```bash
cd "/home/behar/Desktop/AutoAni CoPilot"

# Set up Git
git add .
git commit -m "Initial commit: AutoAni website"

# Create repository on GitHub (replace with your username)
# Go to https://github.com/behark and create new repository named "autoani-website"

# Add remote and push
git remote add origin https://github.com/behark/autoani-website.git
git branch -M main
git push -u origin main
```

## 🌐 Step 2: Deploy Frontend to Netlify

### 2.1 Deploy Main Website
1. **Go to Netlify**: https://app.netlify.com/teams/behark/projects
2. **Click "New site from Git"**
3. **Choose GitHub** and select your `autoani-website` repository
4. **Configure build settings**:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
   - **Node version**: `18`

5. **Set environment variables** in Netlify dashboard:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   VITE_UPLOAD_URL=https://your-backend-url.com/uploads
   VITE_SITE_URL=https://your-site.netlify.app
   ```

6. **Deploy**: Netlify will automatically build and deploy

### 2.2 Deploy Admin Dashboard (Separate Site)
1. **Create another Netlify site** from the same repository
2. **Configure build settings**:
   - **Base directory**: `admin`
   - **Build command**: `npm run build`
   - **Publish directory**: `admin/dist`

3. **Set environment variables**:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```

## 🔧 Step 3: Deploy Backend API

### Option A: Railway (Recommended)

1. **Go to Railway**: https://railway.app
2. **Connect GitHub** repository
3. **Create new project** from your repo
4. **Configure service**:
   - **Root directory**: `backend`
   - **Build command**: `npm run build`
   - **Start command**: `npm start`

5. **Set environment variables**:
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/autoani
   JWT_SECRET=your-super-secret-jwt-key
   JWT_REFRESH_SECRET=your-super-secret-refresh-key
   CLIENT_URL=https://your-frontend.netlify.app
   ADMIN_URL=https://your-admin.netlify.app
   PORT=5000
   ```

6. **Add MongoDB addon** or use external MongoDB Atlas

### Option B: Render

1. **Go to Render**: https://render.com
2. **Connect GitHub** repository
3. **Create Web Service**:
   - **Root directory**: `backend`
   - **Build command**: `npm install && npm run build`
   - **Start command**: `npm start`

4. **Set environment variables** (same as Railway)

### Option C: Heroku

1. **Install Heroku CLI**
2. **Create Heroku app**:
   ```bash
   heroku create autoani-api
   heroku git:remote -a autoani-api
   ```

3. **Set environment variables**:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=your-mongodb-connection
   # ... other variables
   ```

4. **Deploy**:
   ```bash
   git subtree push --prefix backend heroku main
   ```

## 🗄️ Step 4: Setup Database (MongoDB Atlas)

### 4.1 Create MongoDB Atlas Cluster
1. **Go to MongoDB Atlas**: https://cloud.mongodb.com
2. **Create free cluster**
3. **Create database user**
4. **Whitelist IP addresses** (0.0.0.0/0 for all IPs)
5. **Get connection string**

### 4.2 Setup Database Collections
```javascript
// Connect to MongoDB and create sample data
use autoani;

// Create brands collection
db.brands.insertMany([
  {
    name: "Mercedes-Benz",
    logo: "/brands/mercedes.png",
    description: "Luxury German automotive manufacturer",
    featured: true,
    vehicleCount: 15
  },
  {
    name: "BMW",
    logo: "/brands/bmw.png",
    description: "Premium German luxury vehicles",
    featured: true,
    vehicleCount: 12
  },
  {
    name: "Audi",
    logo: "/brands/audi.png",
    description: "German luxury automobile manufacturer",
    featured: true,
    vehicleCount: 10
  }
]);

// Create sample vehicle
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
  images: [
    {
      url: "vehicles/mercedes-s63-1.jpg",
      alt: "Mercedes S63 AMG Front View",
      isPrimary: true,
      order: 1
    }
  ],
  status: "Available",
  featured: true,
  slug: "mercedes-benz-s-class-s63-amg",
  seoTitle: "Mercedes-Benz S63 AMG - Luxury Sedan for Sale",
  seoDescription: "Premium Mercedes-Benz S63 AMG with 630hp. Luxury sedan with exceptional performance.",
  seoKeywords: ["Mercedes", "S63", "AMG", "luxury", "sedan"]
});
```

## 🔄 Step 5: Update Frontend URLs

After deploying the backend, update your frontend environment variables:

### 5.1 Update Netlify Environment Variables
1. **Go to your Netlify site** → Site settings → Environment variables
2. **Update VITE_API_URL** to your deployed backend URL
3. **Redeploy** the site

### 5.2 Update Admin Environment Variables
1. **Update admin site** environment variables
2. **Redeploy** admin dashboard

## 🎨 Step 6: Custom Domain (Optional)

### 6.1 Configure Custom Domain on Netlify
1. **Go to Domain settings** in Netlify
2. **Add custom domain**: `autoani.com`
3. **Configure DNS** with your domain provider:
   ```
   Type: CNAME
   Name: www
   Value: your-site.netlify.app

   Type: A
   Name: @
   Value: 104.198.14.52
   ```

4. **Enable HTTPS** (automatic with Netlify)

### 6.2 Admin Subdomain
1. **Add subdomain**: `admin.autoani.com`
2. **Point to admin Netlify site**

## 📱 Step 7: Final Configuration

### 7.1 Update CORS Settings
In your backend, ensure CORS allows your domain:
```javascript
app.use(cors({
  origin: [
    'https://autoani.com',
    'https://www.autoani.com',
    'https://admin.autoani.com',
    'https://your-frontend.netlify.app',
    'https://your-admin.netlify.app'
  ],
  credentials: true
}));
```

### 7.2 Test Everything
1. **Test main website**: All pages load correctly
2. **Test admin dashboard**: Can manage vehicles/brands
3. **Test API**: All endpoints work
4. **Test mobile responsiveness**
5. **Test multilingual functionality**

## 🚀 Deployment Checklist

- [ ] GitHub repository created and code pushed
- [ ] Frontend deployed to Netlify
- [ ] Admin dashboard deployed to Netlify
- [ ] Backend API deployed (Railway/Render/Heroku)
- [ ] MongoDB Atlas database configured
- [ ] Environment variables set correctly
- [ ] CORS configured for production domains
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificates enabled
- [ ] All functionality tested

## 🎯 Quick Deploy Commands

```bash
# 1. Prepare and push to GitHub
cd "/home/behar/Desktop/AutoAni CoPilot"
git add .
git commit -m "Production ready: AutoAni website"
git push origin main

# 2. Your sites will auto-deploy on Netlify when you push to GitHub
```

## 🔧 Maintenance

### Regular Updates
- **Monitor site performance** on Netlify analytics
- **Update dependencies** regularly
- **Backup database** regularly
- **Monitor API usage** and costs

### Adding New Vehicles
1. **Use admin dashboard** at admin.autoani.com
2. **Upload vehicle images**
3. **Add vehicle details**
4. **Publish to make visible**

## 📞 Support

After deployment, your AutoAni website will be live and ready for customers! The architecture is scalable and production-ready.

**Your deployed URLs will be:**
- **Main Website**: https://autoani.netlify.app (or custom domain)
- **Admin Dashboard**: https://admin-autoani.netlify.app
- **API**: https://your-backend.railway.app/api

🎉 **Congratulations! Your AutoAni website is now live!** 🚗
