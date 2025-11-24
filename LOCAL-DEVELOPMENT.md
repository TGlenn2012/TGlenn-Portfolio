# Local Development Setup for Chatbot

## Problem: API Endpoint Not Available Locally

When running `npm run dev` (Vite dev server), the `/api/chat` endpoint returns 404 because:
- Vercel serverless functions only run on Vercel's infrastructure
- Vite dev server doesn't execute serverless functions

## Solution Options

### Option 1: Use Production API During Development (Recommended)

The code is already configured to use your production API (`www.terrellglenn.com/api/chat`) during local development.

**How it works:**
- In development: Uses `https://www.terrellglenn.com/api/chat`
- In production: Uses `/api/chat` (relative path)

**This means:**
- ✅ You can develop locally and test the chatbot
- ✅ The chatbot will call your deployed Vercel function
- ✅ No additional setup needed

### Option 2: Use Vercel Dev (For Full Local Testing)

If you want to test serverless functions locally:

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Run Vercel Dev**:
   ```bash
   vercel dev
   ```

   This will:
   - Start a local server that mimics Vercel's environment
   - Execute your serverless functions locally
   - Use your local `.env.local` for environment variables

3. **Access your app**:
   - Frontend: `http://localhost:3000` (Vercel's default)
   - API: `http://localhost:3000/api/chat`

**Note:** Make sure you have `GROQ_API_KEY` in your `.env.local` file for this to work.

### Option 3: Custom API URL (Advanced)

If you want to specify a custom API URL:

1. **Create/update `.env.local`**:
   ```bash
   VITE_API_URL=https://your-vercel-url.vercel.app/api/chat
   ```

2. The code will use this URL instead of the default.

## Current Configuration

The `ChatWindow.jsx` component automatically:
- Uses production API (`www.terrellglenn.com/api/chat`) in development mode
- Uses relative path (`/api/chat`) in production builds

This means:
- ✅ **Local development**: Test against your deployed API
- ✅ **Production**: Use relative paths (works on any domain)

## Testing

### Test Locally

1. Run `npm run dev`
2. Open `http://127.0.0.1:5176`
3. Click the chatbot button
4. The chatbot will call your deployed Vercel function

### Test on Production

1. Visit `www.terrellGlenn.com`
2. Click the chatbot button
3. The chatbot will use the local API endpoint

## Troubleshooting

### Still Getting 404 in Development

If you're still getting 404 errors:

1. **Check your Vercel deployment**: Make sure the API is deployed
   - Visit: `https://www.terrellglenn.com/api/chat`
   - Should return 405 (Method Not Allowed) for GET - this is expected!

2. **Verify environment variable**: Make sure `GROQ_API_KEY` is set in Vercel

3. **Check CORS**: The API should allow requests from localhost (it's configured to allow all origins)

### Want to Test API Locally?

Use `vercel dev` instead of `npm run dev`:

```bash
vercel dev
```

This requires:
- Vercel CLI installed
- `.env.local` with `GROQ_API_KEY`
- Linked Vercel project (`vercel link`)

## Summary

- **For normal development**: Use `npm run dev` - it will use your production API
- **For full local testing**: Use `vercel dev` - it runs serverless functions locally
- **For production**: Deploy to Vercel - everything works automatically


