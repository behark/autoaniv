# ✅ AutoAni Deployment Checklist

## Pre-Deployment Verification

- [x] Frontend built and ready (`frontend/dist/` exists)
- [x] Backend API endpoints configured
- [x] Admin dashboard prepared
- [x] Netlify configurations ready (`netlify.toml` & `admin-netlify.toml`)
- [x] Docker configurations available
- [x] Environment variables documented
- [x] Git repository initialized

## Deployment Steps

### 1. GitHub Repository

- [ ] Create repository at <https://github.com/new>
- [ ] Name: `autoani-website`
- [ ] Push code: `git remote add origin [your-repo-url]`
- [ ] Push: `git push -u origin main`

### 2. Frontend Deployment (Netlify)

- [ ] Visit <https://app.netlify.com>
- [ ] "New site from Git"
- [ ] Select GitHub repository
- [ ] Base directory: `frontend`
- [ ] Build command: `npm run build`
- [ ] Publish directory: `frontend/dist`
- [ ] Deploy site
- [ ] Note URL: ________________

### 3. Admin Dashboard (Netlify)

- [ ] "New site from Git" (second site)
- [ ] Same repository
- [ ] Base directory: `admin`
- [ ] Build command: `npm run build`
- [ ] Publish directory: `admin/dist`
- [ ] Deploy site
- [ ] Note URL: ________________

### 4. Backend API

**Railway (Recommended):**

- [ ] Visit <https://railway.app>
- [ ] "New Project" → "Deploy from GitHub repo"
- [ ] Select repository, choose backend folder
- [ ] Add environment variables (see below)
- [ ] Deploy
- [ ] Note URL: ________________

**OR Render:**

- [ ] Visit <https://render.com>
- [ ] "New" → "Web Service"
- [ ] Connect GitHub repository
- [ ] Root Directory: `backend`
- [ ] Build Command: `npm install`
- [ ] Start Command: `npm start`

### 5. Database Setup

- [ ] Create MongoDB Atlas account: <https://www.mongodb.com/cloud/atlas>
- [ ] Create free cluster
- [ ] Create database user
- [ ] Whitelist IP: 0.0.0.0/0
- [ ] Get connection string: ________________
- [ ] Update backend environment variables

### 6. Environment Variables (Backend)

```
NODE_ENV=production
MONGODB_URI=[your_mongodb_connection_string]
JWT_SECRET=[generate_random_string]
PORT=3001
FRONTEND_URL=[your_netlify_frontend_url]
ADMIN_URL=[your_netlify_admin_url]
```

### 7. Optional: Image Upload (Cloudinary)

- [ ] Create Cloudinary account: <https://cloudinary.com>
- [ ] Get API credentials
- [ ] Add to environment variables:

```
CLOUDINARY_CLOUD_NAME=[your_cloud_name]
CLOUDINARY_API_KEY=[your_api_key]
CLOUDINARY_API_SECRET=[your_api_secret]
```

### 8. Final Testing

- [ ] Frontend loads correctly
- [ ] Admin dashboard accessible
- [ ] API endpoints responding
- [ ] Contact form working
- [ ] Vehicle listings displaying
- [ ] Image uploads functioning
- [ ] Mobile responsive design
- [ ] Cross-browser compatibility

### 9. Domain & SEO (Optional)

- [ ] Add custom domain to Netlify
- [ ] Set up Google Analytics
- [ ] Submit to Google Search Console
- [ ] Add social media meta tags

## 🎯 Live URLs

After deployment, update these:

- **Frontend**: https://________________
- **Admin**: https://________________  
- **API**: https://________________

## 🆘 Troubleshooting

**Build Fails:**

- Check Node.js version (should be 18)
- Verify all dependencies in package.json
- Check build logs for specific errors

**API Connection Issues:**

- Verify environment variables
- Check CORS settings
- Ensure MongoDB connection string is correct

**Images Not Loading:**

- Verify Cloudinary configuration
- Check API endpoints
- Ensure proper file permissions

## 📞 Support

If you need help:

1. Check deployment logs
2. Verify environment variables
3. Test locally first: `npm run dev`
4. Check browser console for errors

## 🎉 Success

When all checkboxes are complete, your AutoAni website will be live and ready to help you sell vehicles online!

**Estimated time to complete: 25-30 minutes**
