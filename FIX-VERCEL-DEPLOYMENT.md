# Fix Vercel Deployment Error: "vite: command not found"

## Problem

You're getting this error:
```
sh: line 1: vite: command not found
Error: Command "vite build" exited with 127
```

This means Vercel is trying to run `vite` but can't find it because dependencies aren't installed.

## Issues to Fix

### Issue 1: Deploying from Wrong Branch

**Your deployment is using the `gh-pages` branch:**
```
Cloning github.com/TGlenn2012/TGlenn-Portfolio (Branch: gh-pages, Commit: 8588fb0)
```

**Problem:** The `gh-pages` branch is for GitHub Pages deployment, not Vercel. Your source code with `package.json` and `api/` folder should be on `main` or `master`.

**Solution:**
1. Go to Vercel Dashboard → Your Project → **Settings** → **Git**
2. Change **Production Branch** from `gh-pages` to `main` (or `master` if that's your main branch)
3. Make sure your main branch has:
   - `package.json`
   - `api/` folder with `chat.js`
   - `vercel.json`
   - `src/` folder with all your React code

### Issue 2: Vercel Not Installing Dependencies

**Problem:** Vercel should automatically install dependencies, but sometimes it doesn't detect the framework correctly.

**Solution:**
1. Updated `vercel.json` to explicitly specify:
   - `installCommand: "npm install"` - Ensures dependencies are installed
   - `framework: "vite"` - Tells Vercel it's a Vite project

### Issue 3: Dependencies Not in Repository

**Check:**
1. Make sure `package-lock.json` is committed to your repository (it should be)
2. Make sure `node_modules` is NOT committed (it's in `.gitignore` - that's correct)

## Step-by-Step Fix

### Step 1: Verify Your Main Branch Has All Files

Check that your `main` (or `master`) branch has:

```
your-repo/
├── api/
│   └── chat.js          ← Must exist
├── src/
│   └── ... (all React code)
├── package.json         ← Must exist
├── vercel.json          ← Must exist
├── vite.config.js       ← Must exist
├── package-lock.json    ← Should exist
└── data/
    └── knowledge-base.json
```

### Step 2: Update Vercel Project Settings

1. Go to **Vercel Dashboard** → Your Project
2. Go to **Settings** → **Git**
3. **Change Production Branch**:
   - Current: `gh-pages`
   - Change to: `main` (or `master`)
4. **Save** changes

### Step 3: Verify Build Settings

1. Go to **Settings** → **General**
2. **Build Command**: Should be `npm run build` (or leave auto-detect)
3. **Output Directory**: Should be `dist` (or leave auto-detect)
4. **Install Command**: Should be `npm install` (or leave auto-detect)

**Note:** The updated `vercel.json` now specifies these, so Vercel will use them.

### Step 4: Push Changes to Main Branch

Make sure your latest code (with chatbot) is on `main`:

```bash
# Check current branch
git branch

# If not on main, switch to main
git checkout main

# Make sure you have all changes
git status

# If needed, commit and push
git add .
git commit -m "Fix Vercel deployment configuration"
git push origin main
```

### Step 5: Redeploy

1. Go to Vercel Dashboard → Your Project
2. Go to **Deployments** tab
3. Click **Redeploy** on the latest deployment
4. **Or** push a new commit to trigger automatic deployment

### Step 6: Verify Build

After redeployment, check the build logs:

1. Go to **Deployments** → Click on the latest deployment
2. Check **Build Logs**
3. You should see:
   - ✅ Installing dependencies (`npm install`)
   - ✅ Building (`npm run build`)
   - ✅ Deploying functions (`api/chat.js`)

## What I Fixed

I updated `vercel.json` to include:

```json
{
  "installCommand": "npm install",
  "buildCommand": "npm run build",
  "framework": "vite",
  ...
}
```

This ensures:
- ✅ Dependencies are installed before build
- ✅ Build command is explicitly set
- ✅ Vercel recognizes it's a Vite project

## Common Mistakes

### ❌ Deploying from gh-pages branch
- **Why it's wrong:** `gh-pages` branch typically only has built files, not source code
- **Fix:** Deploy from `main` or `master` branch

### ❌ Missing package.json in deployed branch
- **Why it's wrong:** Vercel needs `package.json` to install dependencies
- **Fix:** Make sure `package.json` is committed to your main branch

### ❌ node_modules not ignored
- **Why it's wrong:** `node_modules` should never be committed
- **Fix:** Make sure `.gitignore` includes `node_modules` (it already does)

## Quick Checklist

Before redeploying:

- [ ] Main branch (`main` or `master`) has all source code
- [ ] `package.json` exists in main branch
- [ ] `api/chat.js` exists in main branch
- [ ] `vercel.json` exists in main branch (updated)
- [ ] `package-lock.json` is committed (optional but recommended)
- [ ] Vercel project is configured to deploy from `main` branch
- [ ] `GROQ_API_KEY` is set in Vercel environment variables

## Still Having Issues?

1. **Check Build Logs:**
   - Vercel Dashboard → Deployments → Latest → Build Logs
   - Look for any errors before the "vite: command not found" error

2. **Check Function Deployment:**
   - Vercel Dashboard → Functions tab
   - Should see `/api/chat` listed

3. **Clear Build Cache:**
   - Vercel Dashboard → Settings → General
   - Clear build cache and redeploy

4. **Check Node.js Version:**
   - Vercel uses Node.js 18.x by default
   - Add to `package.json` if needed:
   ```json
   {
     "engines": {
       "node": "18.x"
     }
   }
   ```

## After Fixing

Once deployed successfully:
- ✅ Check **Functions** tab - should see `/api/chat`
- ✅ Test API: `https://www.terrellglenn.com/api/chat`
- ✅ Test chatbot on your site

---

**Most Important:** Change your Vercel project to deploy from `main` branch, not `gh-pages`!


