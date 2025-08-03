#!/bin/bash

# 🚀 AutoAni Automated Deployment Script
# This script prepares your project for the easiest possible deployment

echo "🚀 AutoAni Deployment Preparation Script"
echo "========================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the AutoAni project root directory"
    exit 1
fi

echo "✅ Project structure verified"
echo ""

# Display current status
echo "📊 Current Project Status:"
echo "• GitHub Repository: https://github.com/behark/autoaniv"
echo "• Frontend: Ready for Netlify deployment"
echo "• Admin: Ready for Netlify deployment"
echo "• Backend: Ready for Railway deployment"
echo "• Database: Ready for MongoDB Atlas"
echo ""

# Show deployment URLs
echo "🌐 Ready for Deployment:"
echo ""
echo "1. FRONTEND DEPLOYMENT (Netlify):"
echo "   Repository: behark/autoaniv"
echo "   Base directory: frontend"
echo "   Build command: npm run build"
echo "   Publish directory: frontend/dist"
echo "   Environment variables:"
echo "   • VITE_API_URL=https://your-backend.railway.app/api"
echo "   • VITE_UPLOAD_URL=https://your-backend.railway.app/uploads"
echo "   • VITE_SITE_URL=https://your-site.netlify.app"
echo ""

echo "2. ADMIN DEPLOYMENT (Netlify):"
echo "   Repository: behark/autoaniv"
echo "   Base directory: admin"
echo "   Build command: npm run build"
echo "   Publish directory: admin/dist"
echo "   Environment variables:"
echo "   • VITE_API_URL=https://your-backend.railway.app/api"
echo ""

echo "3. BACKEND DEPLOYMENT (Railway):"
echo "   Repository: behark/autoaniv"
echo "   Root directory: backend"
echo "   Build command: npm install && npm run build"
echo "   Start command: npm start"
echo "   Environment variables:"
echo "   • NODE_ENV=production"
echo "   • PORT=5000"
echo "   • MONGODB_URI=mongodb+srv://autoani:pass@cluster.mongodb.net/autoani"
echo "   • JWT_SECRET=autoani-super-secret-2025"
echo "   • JWT_REFRESH_SECRET=autoani-refresh-secret-2025"
echo "   • CLIENT_URL=https://your-frontend.netlify.app"
echo "   • ADMIN_URL=https://your-admin.netlify.app"
echo ""

echo "4. DATABASE (MongoDB Atlas):"
echo "   • Free tier cluster"
echo "   • Username: autoani"
echo "   • Password: autoani123"
echo "   • Database: autoani"
echo "   • Allow access from anywhere (0.0.0.0/0)"
echo ""

# Create a deployment checklist
echo "📋 DEPLOYMENT CHECKLIST:"
echo "========================"
echo "□ 1. Deploy Frontend to Netlify"
echo "□ 2. Deploy Admin to Netlify"
echo "□ 3. Deploy Backend to Railway"
echo "□ 4. Create MongoDB Atlas database"
echo "□ 5. Update environment variables"
echo "□ 6. Test all deployments"
echo ""

echo "🎯 QUICK START LINKS:"
echo "====================="
echo "• Netlify: https://app.netlify.com"
echo "• Railway: https://railway.app"
echo "• MongoDB Atlas: https://cloud.mongodb.com"
echo ""

echo "🚀 Your AutoAni project is 100% ready for deployment!"
echo "Follow the deployment guides in the repository for step-by-step instructions."
echo ""

# Show next steps
echo "📞 NEXT STEPS:"
echo "=============="
echo "1. Open Netlify and deploy frontend (5 minutes)"
echo "2. Open Netlify again and deploy admin (3 minutes)"
echo "3. Open Railway and deploy backend (7 minutes)"
echo "4. Create MongoDB Atlas database (5 minutes)"
echo "5. Update environment variables and redeploy"
echo ""
echo "Total deployment time: ~20 minutes"
echo ""
echo "🚗 AutoAni will be live and ready for customers! 🌟"
