# Vercel Deployment Guide for Portfolio Chatbot

## Important: You DON'T Need the Next.js Template

The template at https://vercel.com/templates/ai/nextjs-ai-chatbot is for **Next.js projects only**. Your portfolio is built with **Vite + React**, which we've already configured with serverless functions.

## Step-by-Step Vercel Deployment

### Step 1: Install Vercel CLI (if not already installed)

```bash
npm i -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

This will open your browser to authenticate with Vercel.

### Step 3: Link Your Project

From your project root directory:

```bash
vercel link
```

This will:
1. Ask if you want to link to an existing project or create a new one
2. **Select "Create a new project"** (or link to existing if you already have one)
3. Ask for project name (e.g., `terrell-glenn-portfolio` or `my-portfolio`)
4. Link to your Git repository (GitHub, GitLab, or Bitbucket)

### Step 4: Set Environment Variables in Vercel

**Option A: Via Vercel CLI (Recommended)**

```bash
vercel env add GROQ_API_KEY
```

When prompted:
- **Environment**: Select all (Production, Preview, Development)
- **Value**: Paste your Groq API key

**Option B: Via Vercel Dashboard**

1. Go to [vercel.com](https://vercel.com)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Set:
   - **Name**: `GROQ_API_KEY`
   - **Value**: Your Groq API key
   - **Environments**: Select all (Production, Preview, Development)
6. Click **Save**

### Step 5: Deploy to Vercel

**First Deployment (Production):**

```bash
vercel --prod
```

**For future deployments**, you can also:
- Push to your main branch (auto-deploys if connected to Git)
- Use `vercel` for preview deployments

### Step 6: Verify Deployment

1. After deployment, Vercel will provide you with a URL (e.g., `https://your-project.vercel.app`)
2. Visit the URL
3. Test the chatbot by clicking the robot icon in the bottom-right corner
4. Try asking: "What projects has Terrell worked on?"

### Step 7: Update Custom Domain (Optional)

If you want to use `TerrellGlenn.com`:

1. Go to **Settings** → **Domains** in your Vercel project
2. Add your domain
3. Follow Vercel's DNS configuration instructions

## Project Structure for Vercel

Your project is already configured correctly:

```
my-portfolio/
├── api/               # ✅ Vercel serverless functions
│   └── chat.js       # Chat API endpoint
├── src/              # ✅ React app
├── vercel.json       # ✅ Vercel configuration
├── vite.config.js    # ✅ Vite configuration
└── package.json      # ✅ Build scripts
```

Vercel will automatically:
- Detect it as a Vite project
- Run `npm run build` to build the app
- Serve static files from `dist/`
- Deploy `api/` functions as serverless functions

## Troubleshooting

### Build Errors

If you encounter build errors:

1. **Check Node.js version**: Vercel uses Node.js 18.x by default
   - You can set it in `package.json`:
   ```json
   {
     "engines": {
       "node": "18.x"
     }
   }
   ```

2. **Check build output**: Run `npm run build` locally first
   ```bash
   npm run build
   ```

### API Function Not Working

1. **Check environment variables**:
   ```bash
   vercel env ls
   ```

2. **Check function logs**:
   - Go to Vercel Dashboard → Your Project → **Functions** tab
   - Click on `/api/chat` to see logs

3. **Test API endpoint directly**:
   ```
   https://your-project.vercel.app/api/chat
   ```
   Should return 405 (Method Not Allowed) for GET - that's expected!

### Chatbot Not Appearing

1. **Check browser console** for errors
2. **Verify components are imported** in `src/App.jsx`
3. **Check that build succeeded** in Vercel dashboard

## Alternative: Deploy via GitHub Integration

If you prefer to deploy via GitHub:

1. Push your code to GitHub (make sure `.env.local` is in `.gitignore`)
2. Go to [vercel.com](https://vercel.com)
3. Click **Add New** → **Project**
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Vite (should auto-detect)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (should auto-detect)
   - **Output Directory**: `dist` (should auto-detect)
6. Add environment variable `GROQ_API_KEY`
7. Click **Deploy**

After first deployment, every push to your main branch will auto-deploy.

## Environment Variables Summary

You need to set **one environment variable** in Vercel:

- `GROQ_API_KEY` - Your Groq API key (get from https://console.groq.com/)

Make sure it's set for **all environments** (Production, Preview, Development).

## Next Steps After Deployment

1. ✅ Test the chatbot on the live site
2. ✅ Verify all routes work correctly
3. ✅ Test on mobile devices
4. ✅ Monitor Vercel function logs for any errors
5. ✅ Update your README with the live URL

## Cost Considerations

- **Vercel Hobby Plan**: Free for personal projects
- **Groq API**: Free tier with generous limits
- **Total Cost**: $0 for typical portfolio usage

---

Need help? Check Vercel logs:
```bash
vercel logs
```

Or view in dashboard: **Settings** → **Logs**

