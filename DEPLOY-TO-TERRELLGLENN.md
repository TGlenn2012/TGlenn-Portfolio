# Deploy Your Portfolio + Chatbot to www.TerrellGlenn.com

## ✅ Good News: Chatbot is Already Part of Your Project!

The chatbot is **already integrated** into your portfolio. Looking at `src/App.jsx` lines 74-76, you can see:

```jsx
{/* Chatbot Components */}
<ChatbotButton onClick={() => setChatOpen(true)} />
<ChatWindow isOpen={chatOpen} onClose={() => setChatOpen(false)} />
```

This means:
- ✅ The chatbot button appears on **every page** of your portfolio
- ✅ It's part of the **same project** - no separate deployment needed
- ✅ When you deploy to Vercel, **everything deploys together**
- ✅ It will work on `www.TerrellGlenn.com` automatically

## 🚀 Deploy Everything Together to Vercel

### Step 1: Push Your Code to GitHub

```bash
git add .
git commit -m "Add AI chatbot to portfolio"
git push origin main  # or master, depending on your branch name
```

### Step 2: Deploy to Vercel

**Option A: Via Vercel Dashboard (Easiest)**

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New"** → **"Project"**
3. **Import your GitHub repository** (the one with your portfolio)
4. Vercel will auto-detect:
   - **Framework Preset**: Vite ✅
   - **Build Command**: `npm run build` ✅
   - **Output Directory**: `dist` ✅
5. **Add Environment Variable**:
   - Click **"Environment Variables"**
   - Add:
     - **Name**: `GROQ_API_KEY`
     - **Value**: Your Groq API key
     - **Environments**: Select **all** (Production, Preview, Development)
6. Click **"Deploy"**

**Option B: Via Vercel CLI**

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Link to your existing portfolio project (or create new)
vercel link

# 4. Add environment variable
vercel env add GROQ_API_KEY
# Select all environments, paste your API key

# 5. Deploy to production
vercel --prod
```

### Step 3: Connect Your Domain (www.TerrellGlenn.com)

1. In Vercel Dashboard, go to your project
2. Go to **Settings** → **Domains**
3. Click **"Add"** or **"Add Domain"**
4. Enter: `www.TerrellGlenn.com` (or `TerrellGlenn.com` or both)
5. Follow Vercel's DNS configuration instructions:

   **If you want both www and non-www:**
   - Add both `TerrellGlenn.com` and `www.TerrellGlenn.com`
   - Vercel will automatically redirect one to the other

   **DNS Configuration:**
   - Go to your domain registrar (where you bought TerrellGlenn.com)
   - Add a DNS record:
     - **Type**: `CNAME`
     - **Name**: `www` (or `@` for root domain)
     - **Value**: `cname.vercel-dns.com` (Vercel will show you the exact value)

6. Wait for DNS propagation (usually 5-30 minutes)

### Step 4: Verify Everything Works

1. Visit `www.TerrellGlenn.com`
2. You should see your portfolio with:
   - ✅ All your sections (Home, About, Projects, Contact)
   - ✅ The **robot icon button** in the bottom-right corner
3. Click the robot icon
4. Test the chatbot: "What projects has Terrell worked on?"
5. The chatbot should respond with information from your portfolio!

## 📁 What Gets Deployed

When you deploy this project to Vercel, **everything** deploys together:

```
Your Portfolio (www.TerrellGlenn.com)
├── Frontend (React + Vite)
│   ├── Home page
│   ├── About page
│   ├── Projects page
│   ├── Project details pages
│   └── Chatbot UI (button + chat window) ← Already integrated!
└── Backend (Vercel Serverless Functions)
    └── /api/chat ← Chatbot API endpoint
```

The chatbot API will be available at:
- `www.TerrellGlenn.com/api/chat`

## 🎯 Key Points

1. **Single Project**: Your portfolio AND chatbot are in the same codebase
2. **Single Deployment**: Deploy once, everything goes live together
3. **Same Domain**: Chatbot works on `www.TerrellGlenn.com` automatically
4. **No Separate Setup**: Just add the `GROQ_API_KEY` environment variable

## ✅ Checklist Before Deploying

- [ ] Code is pushed to GitHub
- [ ] `.env.local` is in `.gitignore` (should already be)
- [ ] You have a Groq API key
- [ ] You're ready to add the API key to Vercel environment variables
- [ ] Your domain (TerrellGlenn.com) is ready for DNS configuration

## 🔧 After Deployment

Once deployed, the chatbot will:
- ✅ Appear on **every page** of your portfolio
- ✅ Work on **all routes** (/, /microkarts, /storymakar, etc.)
- ✅ Be accessible at `www.TerrellGlenn.com`
- ✅ Call the API at `www.TerrellGlenn.com/api/chat`

## 🆘 Troubleshooting

### Chatbot Button Not Showing

1. Check browser console for errors (F12)
2. Verify components are in `src/App.jsx` (they should be!)
3. Check that build succeeded in Vercel dashboard

### Chatbot Not Responding

1. Check Vercel function logs:
   - Dashboard → Your Project → **Functions** tab → `/api/chat`
2. Verify `GROQ_API_KEY` is set in Vercel environment variables
3. Test API directly: Visit `www.TerrellGlenn.com/api/chat`
   - Should return 405 (Method Not Allowed) for GET - this is expected!

### Domain Issues

1. Wait for DNS propagation (can take up to 48 hours, usually much less)
2. Check DNS records in your domain registrar
3. Verify domain is added in Vercel Settings → Domains

---

**That's it!** Deploy this project to Vercel and connect your domain. The chatbot is already part of it and will work automatically on `www.TerrellGlenn.com`.

