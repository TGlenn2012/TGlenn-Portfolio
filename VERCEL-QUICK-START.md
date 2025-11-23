# Quick Start: Deploy to Vercel

## ⚠️ Important: Skip the Next.js Template

**DO NOT use** the Next.js AI chatbot template at https://vercel.com/templates/ai/nextjs-ai-chatbot

That template is for Next.js projects. Your portfolio is **Vite + React** and is already configured correctly!

## 🚀 Quick Deployment Steps

### Method 1: Via Vercel CLI (Recommended)

```bash
# 1. Install Vercel CLI (if needed)
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Link your project (creates new project)
vercel link

# 4. Add your Groq API key
vercel env add GROQ_API_KEY
# When prompted, select all environments (Production, Preview, Development)
# Paste your API key when asked

# 5. Deploy to production
vercel --prod
```

That's it! Your site will be live at the URL Vercel provides.

### Method 2: Via GitHub Integration

1. **Push code to GitHub** (make sure `.env.local` is NOT committed)
2. Go to [vercel.com](https://vercel.com)
3. Click **"Add New"** → **"Project"**
4. **Import your GitHub repository**
5. Configure:
   - **Framework Preset**: Vite (auto-detected)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)
6. **Add Environment Variable**:
   - Click **"Environment Variables"**
   - Add `GROQ_API_KEY` with your API key value
   - Select **all environments** (Production, Preview, Development)
7. Click **"Deploy"**

After this, every push to your main branch will auto-deploy!

## ✅ Verify It's Working

1. Visit your Vercel deployment URL
2. Click the **robot icon** in the bottom-right corner
3. Ask: "What projects has Terrell worked on?"
4. The chatbot should respond with information from your portfolio!

## 🔧 If Something Goes Wrong

### Check Build Locally First
```bash
npm run build
```
If this fails, fix the errors before deploying.

### View Logs
```bash
vercel logs
```

Or in Vercel Dashboard: **Settings** → **Logs** → Select your function

### Test API Endpoint
Visit: `https://your-project.vercel.app/api/chat`

Should return 405 (Method Not Allowed) for GET requests - this is expected!

## 📝 Environment Variables Checklist

✅ **Local Development**: `.env.local` with `GROQ_API_KEY`  
✅ **Vercel Production**: Environment variable `GROQ_API_KEY` set  
✅ **All Environments**: Make sure it's set for Production, Preview, AND Development

---

**Need more details?** See `DEPLOYMENT-GUIDE.md` for comprehensive instructions.

