# Troubleshooting API 405 Error on Production

## Issue: Getting 405 (Method Not Allowed) Error

If you're getting a 405 error when calling the chatbot API on production, follow these steps:

## Step 1: Check Vercel Functions Dashboard

1. Go to your Vercel Dashboard
2. Select your project
3. Go to the **Functions** tab
4. Check if `/api/chat` is listed as a serverless function

**If it's NOT listed:**
- The function isn't being deployed
- Check that `api/chat.js` exists in your repository
- Make sure you've pushed the latest code to GitHub
- Redeploy on Vercel

**If it IS listed:**
- The function is deployed but might have an issue
- Click on `/api/chat` to view logs
- Check for any error messages

## Step 2: Check Function Logs

1. In Vercel Dashboard → Your Project → **Functions** → `/api/chat`
2. Click on **Logs** or **Runtime Logs**
3. Look for:
   - Error messages
   - The log message: "API Request Method: POST" (should appear if function is called)
   - Any stack traces

**Common Issues:**
- Missing `GROQ_API_KEY` environment variable
- Import errors (missing dependencies)
- File system errors (knowledge base not found)

## Step 3: Verify Environment Variables

1. Go to Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Verify `GROQ_API_KEY` is set
3. Make sure it's set for **Production** environment
4. **Important**: After adding/updating env vars, you need to **redeploy**

## Step 4: Test the API Directly

You can test the API endpoint directly:

**Using curl:**
```bash
curl -X POST https://www.terrellglenn.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"test"}'
```

**Using browser DevTools:**
```javascript
fetch('https://www.terrellglenn.com/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'test' })
}).then(r => r.json()).then(console.log)
```

**Expected responses:**
- ✅ 200 OK with chatbot response → Working!
- ❌ 405 Method Not Allowed → Function not recognizing POST
- ❌ 500 Internal Server Error → Check function logs
- ❌ 404 Not Found → Function not deployed

## Step 5: Check Build Configuration

Verify your `vercel.json` includes:
- ✅ `functions` configuration for `api/**/*.js`
- ✅ `rewrites` rule for `/api/:path*` (if needed)

## Step 6: Force Redeploy

1. Go to Vercel Dashboard → Your Project → **Deployments**
2. Click the **3 dots** (⋮) on your latest deployment
3. Click **Redeploy**
4. Or push a new commit to trigger a new deployment

## Step 7: Check URL in Frontend Code

Verify your `ChatWindow.jsx` is using the correct URL:

```javascript
// In production, should use relative path:
const apiUrl = import.meta.env.DEV 
  ? 'https://www.terrellglenn.com/api/chat'  // Dev
  : '/api/chat';  // Production
```

## Common Solutions

### Solution 1: Redeploy After Adding Environment Variable

**Problem:** Added `GROQ_API_KEY` but function still fails

**Fix:**
1. Make sure env var is set in Vercel
2. **Redeploy** the project (env vars only apply to new deployments)
3. Wait for deployment to complete

### Solution 2: Check Function Export

The function must export a default handler:

```javascript
export default async function handler(req, res) {
  // ...
}
```

### Solution 3: Verify API Folder Structure

```
your-project/
├── api/
│   └── chat.js  ← Must be here
├── src/
├── vercel.json
└── package.json
```

### Solution 4: Check for Build Errors

1. Go to Vercel Dashboard → Your Project → **Deployments**
2. Click on the latest deployment
3. Check **Build Logs** for any errors
4. Make sure build completes successfully

## Debugging Steps

1. **Check Vercel Logs** (Dashboard → Functions → Logs)
2. **Test API directly** (using curl or fetch)
3. **Verify environment variables** are set
4. **Check function is deployed** (Functions tab)
5. **Redeploy** if you made changes

## Still Not Working?

If after trying all these steps it still doesn't work:

1. Check Vercel Community Forums: https://community.vercel.com
2. Review Vercel Function Logs for specific error messages
3. Try deploying a simple test function to verify Vercel is working:
   
   Create `api/test.js`:
   ```javascript
   export default async function handler(req, res) {
     return res.status(200).json({ message: 'Test successful', method: req.method });
   }
   ```
   
   Deploy and test: `https://www.terrellglenn.com/api/test`

## Quick Checklist

- [ ] `api/chat.js` exists in repository
- [ ] Function is listed in Vercel Functions tab
- [ ] `GROQ_API_KEY` is set in Vercel environment variables
- [ ] Project has been redeployed after adding env var
- [ ] Build completed successfully
- [ ] No errors in Function Logs
- [ ] Testing with POST request (not GET)


