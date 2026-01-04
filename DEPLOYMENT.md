# 🚀 Free Deployment Guide

Deploy your Zerodha Clone for **FREE** using Vercel, Render, and MongoDB Atlas.

---

## 📋 Prerequisites (All Free!)

1. **GitHub Account** - https://github.com/signup
2. **MongoDB Atlas Account** - https://www.mongodb.com/cloud/atlas/register
3. **Render Account** - https://render.com (sign up with GitHub)
4. **Vercel Account** - https://vercel.com (sign up with GitHub)

---

## Step 1: Setup MongoDB Atlas (Free Database)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for free
3. Create a **FREE M0 Cluster**:
   - Cloud Provider: AWS
   - Region: Choose closest to you
   - Cluster Tier: M0 Sandbox (FREE)
4. **Create Database User**:
   - Click "Database Access" → "Add New Database User"
   - Username: `zerodha_user`
   - Password: Generate a secure password (save it!)
   - Database User Privileges: Read and write to any database
5. **Whitelist All IPs**:
   - Click "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere"
   - IP Address: `0.0.0.0/0`
   - Confirm
6. **Get Connection String**:
   - Click "Database" → "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Example: `mongodb+srv://zerodha_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/zerodha`

---

## Step 2: Push Code to GitHub

1. Open PowerShell in your project folder:
   ```powershell
   cd C:\Users\q\.gemini\antigravity\scratch\zerodha-clone
   ```

2. Initialize Git (if not already done):
   ```powershell
   git init
   git add .
   git commit -m "Initial commit - Zerodha Clone"
   ```

3. Create a new repository on GitHub:
   - Go to https://github.com/new
   - Repository name: `zerodha-clone`
   - Make it Public
   - Don't initialize with README (we already have code)
   - Click "Create repository"

4. Push your code:
   ```powershell
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/zerodha-clone.git
   git push -u origin main
   ```

---

## Step 3: Deploy Backend on Render (Free)

1. Go to https://render.com
2. Sign in with GitHub
3. Click **"New +"** → **"Web Service"**
4. Click **"Connect a repository"** → Select your `zerodha-clone` repo
5. Configure the service:
   - **Name**: `zerodha-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free
6. Click **"Advanced"** → **"Add Environment Variable"**:
   - Key: `MONGO_URL`
   - Value: Your MongoDB Atlas connection string
   - Key: `PORT`
   - Value: `3002`
7. Click **"Create Web Service"**
8. Wait for deployment (5-10 minutes)
9. **Copy your backend URL**: `https://zerodha-backend-xxxx.onrender.com`

---

## Step 4: Deploy Frontend on Vercel (Free)

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click **"Add New..."** → **"Project"**
4. Import your `zerodha-clone` repository
5. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **"Environment Variables"**:
   - Key: `VITE_API_URL`
   - Value: Your Render backend URL (from Step 3)
   - Example: `https://zerodha-backend-xxxx.onrender.com`
7. Click **"Deploy"**
8. Wait for deployment (2-3 minutes)
9. **Your app is live!** 🎉

---

## Step 5: Initialize Database

1. Open your backend URL in browser: `https://zerodha-backend-xxxx.onrender.com`
2. You should see: `{"message":"Zerodha Clone API is running!"}`
3. To initialize the database, you need to run `initDB.js` once:
   - Option A: Use Render Shell (in Render dashboard → Shell tab)
   - Option B: Temporarily add to `package.json` scripts and trigger via Render

**Quick method:**
- Go to your Render dashboard
- Click on your backend service
- Go to "Shell" tab
- Run: `node initDB.js`

---

## Step 6: Test Your Deployed App

1. Open your Vercel URL: `https://your-app.vercel.app`
2. You should see the landing page
3. Click "Get Started"
4. Check if data loads from the backend
5. Try placing an order

---

## 🎉 Your App is Live!

**Share your link:**
- Frontend: `https://your-app.vercel.app`
- Anyone with this link can access your trading platform!

---

## 🔄 Future Updates

Whenever you make changes:

1. Commit and push to GitHub:
   ```powershell
   git add .
   git commit -m "Your update message"
   git push
   ```

2. **Vercel** and **Render** will automatically redeploy! 🚀

---

## 💰 Free Tier Limits

- **Vercel**: Unlimited deployments, 100GB bandwidth/month
- **Render**: 750 hours/month (enough for 1 service running 24/7)
- **MongoDB Atlas**: 512MB storage (plenty for this app)

All completely free, no credit card required!

---

## 🆘 Troubleshooting

**Backend not connecting to MongoDB:**
- Check your MongoDB Atlas connection string
- Make sure IP `0.0.0.0/0` is whitelisted
- Verify database user credentials

**Frontend not loading data:**
- Check `VITE_API_URL` environment variable in Vercel
- Make sure backend is running (check Render logs)
- Check browser console for CORS errors

**Render service sleeping:**
- Free tier services sleep after 15 minutes of inactivity
- First request may take 30-60 seconds to wake up
- Consider using a service like UptimeRobot to ping it every 14 minutes

---

## 📞 Need Help?

If you encounter any issues during deployment, check:
1. Render logs (in Render dashboard)
2. Vercel deployment logs
3. Browser console (F12)
