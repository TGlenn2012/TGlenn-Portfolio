# AI Chatbot Implementation Guide

## Overview

This portfolio includes an AI-powered chatbot that allows visitors to ask questions about Terrell Glenn's work, skills, projects, experience, and education. The chatbot uses:

- **Groq API** (free tier) for fast AI responses
- **Vercel Serverless Functions** for secure API key handling
- **Semantic search** to find relevant portfolio content
- **Rate limiting** to prevent abuse (20 requests/hour per IP)

## Setup Instructions

### 1. Get a Groq API Key

1. Visit [Groq Console](https://console.groq.com/)
2. Sign up for a free account
3. Create an API key
4. Copy the API key

### 2. Configure Environment Variables

#### For Local Development

Create a `.env.local` file in the root directory:

```bash
GROQ_API_KEY=your_groq_api_key_here
```

#### For Vercel Deployment

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add a new environment variable:
   - **Name**: `GROQ_API_KEY`
   - **Value**: Your Groq API key
   - **Environments**: Production, Preview, Development (select all)
4. Save and redeploy your project

### 3. Deploy to Vercel

If you haven't already:

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project root
3. Follow the prompts to link your project
4. Deploy: `vercel --prod`

The chatbot API will be available at `/api/chat`.

## Features

### Chatbot Features

- **Floating Button**: Persistent robot icon button in the bottom-right corner
- **Chat Window**: Glass morphism styled chat interface matching portfolio design
- **Markdown Support**: Rich text formatting in responses
- **Link Generation**: Automatic links to relevant portfolio sections
- **Mobile Responsive**: Fully responsive design for all screen sizes
- **Rate Limiting**: 20 requests per hour per IP address
- **Error Handling**: Graceful error messages and loading states

### Security Features

- **Server-side API Keys**: All API keys stored server-side only
- **Input Sanitization**: All user inputs are sanitized to prevent XSS
- **Rate Limiting**: Prevents abuse and excessive API usage
- **System Prompts**: Restricts chatbot to portfolio-related topics only
- **CORS Configuration**: Proper CORS headers for API endpoints

## Knowledge Base

The chatbot is trained on content from:

- **About Section**: Bio, skills, education, certifications, experience
- **Projects Section**: All featured projects and their descriptions
- **Project Details**: Detailed case studies for each project
- **Home Section**: Introduction and role descriptions

The knowledge base is stored in `data/knowledge-base.json` and can be updated by editing that file.

## Customization

### Update Knowledge Base

Edit `data/knowledge-base.json` to add or modify content. Each entry should include:

- `id`: Unique identifier
- `content`: Text content to be indexed
- `source`: Source section (e.g., "About", "Projects")
- `route`: URL route to link to (e.g., "/#about", "/microkarts")
- `section`: Section name
- `metadata`: Tags and type information

### Modify Rate Limits

Edit `api/chat.js`:

```javascript
const RATE_LIMIT = 20; // Change this number
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // Change time window (milliseconds)
```

### Customize Styling

All chatbot components use Tailwind CSS and can be customized in:

- `src/components/ChatbotButton.jsx`: Floating button styling
- `src/components/ChatWindow.jsx`: Chat window styling
- `src/components/ChatMessage.jsx`: Message styling

## Troubleshooting

### Chatbot Not Appearing

1. Check browser console for errors
2. Verify `ChatbotButton` is imported in `src/App.jsx`
3. Check that `ChatWindow` component is rendered

### API Errors

1. Verify `GROQ_API_KEY` is set in environment variables
2. Check Vercel function logs: `vercel logs`
3. Test API endpoint directly: `curl -X POST http://localhost:3000/api/chat -H "Content-Type: application/json" -d '{"message":"test"}'`

### Rate Limit Errors

- The rate limit is 20 requests per hour per IP
- Wait for the rate limit window to reset (1 hour)
- For production, consider using Vercel KV for distributed rate limiting

## Cost Considerations

### Groq API (Free Tier)

- **Free Tier**: Generous free tier for personal use
- **Rate Limits**: Check Groq documentation for current limits
- **Cost**: Free for typical portfolio usage

### Vercel Serverless Functions

- **Free Tier**: 100GB-hours per month
- **Hobby Plan**: Free for personal projects
- **Cost**: Free for typical portfolio usage

## Future Enhancements

Potential improvements:

1. **Vector Embeddings**: Use embeddings for better semantic search
2. **Vercel KV**: Use KV for distributed rate limiting
3. **Conversation History**: Store conversation context
4. **Analytics**: Track popular questions
5. **Feedback System**: Collect user feedback on responses

## Support

For issues or questions:

1. Check Vercel function logs
2. Review browser console for errors
3. Verify environment variables are set correctly
4. Test API endpoint directly

