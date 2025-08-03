# 🚀 AutoAni Netlify Deployment Guide - Step by Step

## 📋 Quick Start: Deploy AutoAni in 15 Minutes

Your GitHub repository is ready: **https://github.com/behark/autoaniv**

Follow these exact steps to deploy your AutoAni website:

---

## 🌐 STEP 1: Deploy Frontend Website (Main Site)

### 1.1 Open Netlify and Start Deployment
1. **Go to Netlify**: https://app.netlify.com
2. **Sign up/Login** (use GitHub for easier integration)
3. **Click "New site from Git"**
4. **Choose "GitHub"** as your Git provider
5. **Authorize Netlify** to access your GitHub account if prompted

### 1.2 Select Your Repository
1. **Search for**: `behark/autoaniv`
2. **Click on your repository** to select it
3. **Click "Deploy site"** (we'll configure settings next)

### 1.3 Configure Build Settings
After the repository is selected, configure these **EXACT** settings:

```
Repository: behark/autoaniv
Branch to deploy: main
Base directory: frontend
Build command: npm run build
Publish directory: frontend/dist
```

### 1.4 Set Environment Variables (Important!)
Before deploying, click **"Advanced build settings"** and add these environment variables:

```
VITE_API_URL=https://api-placeholder.com/api
VITE_UPLOAD_URL=https://api-placeholder.com/uploads
VITE_SITE_URL=https://your-site-name.netlify.app
```

*Note: We'll update these with real URLs after backend deployment*

### 1.5 Deploy Frontend
1. **Click "Deploy site"**
2. **Wait 3-5 minutes** for the build to complete
3. **Your main website will be live!**

**Expected URL**: `https://wonderful-name-123456.netlify.app`

---

## 👨‍💼 STEP 2: Deploy Admin Dashboard (Separate Site)

### 2.1 Create Second Netlify Site
1. **Go back to Netlify dashboard**
2. **Click "New site from Git"** again
3. **Choose "GitHub"** → Select `behark/autoaniv` (same repository)

### 2.2 Configure Admin Build Settings
Use these **EXACT** settings for the admin dashboard:

```
Repository: behark/autoaniv
Branch to deploy: main
Base directory: admin
Build command: npm run build
Publish directory: admin/dist
```

### 2.3 Set Admin Environment Variables
Add this environment variable:

```
VITE_API_URL=https://api-placeholder.com/api
```

### 2.4 Deploy Admin Dashboard
1. **Click "Deploy site"**
2. **Wait 3-5 minutes** for build
3. **Your admin dashboard will be live!**

**Expected URL**: `https://amazing-admin-654321.netlify.app`

---

## 🎯 STEP 3: Test Your Deployments

### 3.1 Test Frontend Website
Visit your frontend URL and check:
- ✅ Homepage loads with AutoAni branding
- ✅ Navigation menu works
- ✅ Pages load (About, Contact, Vehicles)
- ✅ Language switching (Albanian/English) works
- ✅ Responsive design on mobile

### 3.2 Test Admin Dashboard
Visit your admin URL and check:
- ✅ Admin interface loads
- ✅ Dashboard displays properly
- ✅ Navigation works
- ✅ Material-UI components render

---

## 🔧 STEP 4: Deploy Backend API (Railway - Recommended)

### 4.1 Deploy to Railway
1. **Go to Railway**: https://railway.app
2. **Sign up with GitHub**
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose**: `behark/autoaniv`

### 4.2 Configure Railway Service
1. **Select "backend" folder** as root directory
2. **Railway will auto-detect** Node.js
3. **Set these settings**:
   ```
   Root Directory: backend
   Build Command: npm install && npm run build
   Start Command: npm start
   ```

### 4.3 Add Environment Variables in Railway
Click **"Variables"** and add these:

```
NODE_ENV=production
PORT=5000
JWT_SECRET=autoani-super-secret-jwt-key-2025
JWT_REFRESH_SECRET=autoani-refresh-secret-key-2025
MONGODB_URI=mongodb+srv://autoani:autoani123@cluster0.mongodb.net/autoani?retryWrites=true&w=majority
CLIENT_URL=https://your-frontend.netlify.app
ADMIN_URL=https://your-admin.netlify.app
```

*Note: Replace the Netlify URLs with your actual URLs from steps 1 & 2*

### 4.4 Deploy Backend
1. **Click "Deploy"**
2. **Wait 5-10 minutes** for build
3. **Copy your Railway app URL** (e.g., `https://autoaniv-production.up.railway.app`)

---

## 🗄️ STEP 5: Setup Database (MongoDB Atlas)

### 5.1 Create Free MongoDB Cluster
1. **Go to**: https://cloud.mongodb.com
2. **Sign up for free account**
3. **Create new cluster** (choose free tier)
4. **Choose cloud provider**: AWS (default)
5. **Select region**: Closest to your users
6. **Cluster name**: `AutoAni-Cluster`

### 5.2 Configure Database Access
1. **Create database user**:
   - Username: `autoani`
   - Password: `autoani123`
2. **Add IP access**: Click "Add IP Address" → "Allow access from anywhere" (0.0.0.0/0)
3. **Get connection string**: Click "Connect" → "Connect your application" → Copy the connection string

### 5.3 Add Sample Data
Once connected, you can add sample vehicle data via the admin dashboard we built.

---

## 🔄 STEP 6: Connect Everything Together

### 6.1 Update Railway Environment Variables
1. **Go to Railway project** → Variables
2. **Update MONGODB_URI** with your Atlas connection string
3. **Update CLIENT_URL** and **ADMIN_URL** with your Netlify URLs

### 6.2 Update Netlify Environment Variables
For both frontend and admin sites:

1. **Go to each Netlify site** → Site settings → Environment variables
2. **Update variables**:
   ```
   VITE_API_URL=https://your-railway-url.up.railway.app/api
   VITE_UPLOAD_URL=https://your-railway-url.up.railway.app/uploads
   ```
3. **Redeploy both sites**: Deploys → Trigger deploy

---

## 🎉 FINAL RESULT

After completing all steps, you'll have:

### 🌐 **Main Website** (Frontend)
- **URL**: `https://your-autoani.netlify.app`
- **Features**:
  - Professional homepage with hero section
  - Vehicle listings and search
  - Brand showcase
  - Contact forms
  - Albanian & English languages
  - Fully responsive mobile design

### 👨‍💼 **Admin Dashboard**
- **URL**: `https://your-admin.netlify.app`
- **Features**:
  - Vehicle management (Add/Edit/Delete)
  - Brand management
  - Image upload system
  - Analytics dashboard
  - Material-UI interface

### 🔧 **Backend API**
- **URL**: `https://your-backend.up.railway.app`
- **Features**:
  - RESTful API endpoints
  - File upload handling
  - Database integration
  - Authentication system

### 🗄️ **Database**
- **MongoDB Atlas**: Free tier cluster
- **Collections**: Vehicles, Brands, Users
- **Global access**: Available worldwide

---

## ✅ Deployment Checklist

Copy this checklist and check off as you complete each step:

- [ ] **Step 1**: Frontend Netlify site created and deployed
- [ ] **Step 2**: Admin dashboard Netlify site created and deployed
- [ ] **Step 3**: Both sites tested and working
- [ ] **Step 4**: Backend API deployed to Railway
- [ ] **Step 5**: MongoDB Atlas database created and configured
- [ ] **Step 6**: All environment variables updated and sites redeployed
- [ ] **Final Test**: All components working together

---

## 🚨 Common Issues & Solutions

### Frontend Build Fails
```bash
# Check these settings:
Base directory: frontend (not blank)
Build command: npm run build
Publish directory: frontend/dist
Node version: 18 (in Site settings)
```

### Admin Build Fails
```bash
# Check these settings:
Base directory: admin (not blank)
Build command: npm run build
Publish directory: admin/dist
Node version: 18 (in Site settings)
```

### Backend Deploy Fails
```bash
# Check Railway settings:
Root directory: backend
All environment variables set
MONGODB_URI is correct format
```

### Sites Don't Connect
```bash
# Verify environment variables:
VITE_API_URL points to Railway URL + /api
Railway CLIENT_URL and ADMIN_URL point to Netlify URLs
CORS is properly configured
```

---

## 🎯 Ready to Go Live!

Once all steps are completed:

1. **Test your main website** - Vehicle browsing, contact forms
2. **Test your admin dashboard** - Add a vehicle, manage brands
3. **Share your URLs** with customers
4. **Start adding real vehicle inventory**

**🚗 AutoAni is now live and ready to revolutionize automotive sales! 🌟**

---

## 📞 Next Steps After Deployment

1. **Add your real vehicle inventory** via the admin dashboard
2. **Upload brand logos** and vehicle photos
3. **Customize content** (About page, contact info)
4. **Set up custom domain** (optional): autoani.com
5. **Configure social media** links and Instagram integration
6. **Add Google Analytics** for tracking visitors

**Your professional automotive website is now ready to drive sales! 🚗💨**
