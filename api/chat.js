import Groq from 'groq-sdk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rate limiting: Store request counts per IP (in-memory for Vercel serverless)
// In production, consider using Vercel KV or Redis
const rateLimitMap = new Map();

// Rate limit: 20 requests per hour per IP
const RATE_LIMIT = 20;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

// Cache knowledge base
let knowledgeBaseCache = null;

// Load knowledge base
function loadKnowledgeBase() {
  // Return cached version if available
  if (knowledgeBaseCache) {
    return knowledgeBaseCache;
  }
  
  try {
    // Try multiple possible paths for Vercel compatibility
    const possiblePaths = [
      path.join(__dirname, '..', 'data', 'knowledge-base.json'),
      path.join(process.cwd(), 'data', 'knowledge-base.json'),
      path.join(process.cwd(), 'api', '..', 'data', 'knowledge-base.json'),
    ];
    
    let knowledgeBaseContent = null;
    for (const knowledgeBasePath of possiblePaths) {
      try {
        if (fs.existsSync(knowledgeBasePath)) {
          knowledgeBaseContent = fs.readFileSync(knowledgeBasePath, 'utf-8');
          break;
        }
      } catch (err) {
        // Try next path
        continue;
      }
    }
    
    if (!knowledgeBaseContent) {
      console.error('Could not find knowledge-base.json');
      return [];
    }
    
    knowledgeBaseCache = JSON.parse(knowledgeBaseContent);
    return knowledgeBaseCache;
  } catch (error) {
    console.error('Error loading knowledge base:', error);
    return [];
  }
}

// Simple text matching for semantic search (without embeddings for simplicity)
function findRelevantContent(query, knowledgeBase, topK = 3) {
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(/\s+/);
  
  // Score each knowledge base entry
  const scored = knowledgeBase.map((entry) => {
    let score = 0;
    const contentLower = entry.content.toLowerCase();
    const tagsLower = entry.metadata?.tags?.join(' ').toLowerCase() || '';
    const sourceLower = entry.source.toLowerCase();
    
    // Check for exact phrase matches
    if (contentLower.includes(queryLower)) {
      score += 10;
    }
    
    // Check for word matches
    queryWords.forEach((word) => {
      if (word.length > 2) {
        if (contentLower.includes(word)) score += 2;
        if (tagsLower.includes(word)) score += 3;
        if (sourceLower.includes(word)) score += 1;
      }
    });
    
    // Boost score for relevant tags
    entry.metadata?.tags?.forEach((tag) => {
      if (queryLower.includes(tag.toLowerCase()) || tag.toLowerCase().includes(queryLower)) {
        score += 5;
      }
    });
    
    return { ...entry, score };
  });
  
  // Sort by score and return top K
  return scored
    .sort((a, b) => b.score - a.score)
    .filter((item) => item.score > 0)
    .slice(0, topK);
}

// Sanitize user input
function sanitizeInput(text) {
  if (!text || typeof text !== 'string') return '';
  
  // Remove potential script tags and dangerous characters
  let sanitized = text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .trim();
  
  // Limit length
  if (sanitized.length > 500) {
    sanitized = sanitized.substring(0, 500);
  }
  
  return sanitized;
}

// Check rate limit
function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT - 1 };
  }
  
  // Reset if window expired
  if (now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT - 1 };
  }
  
  // Check if limit exceeded
  if (record.count >= RATE_LIMIT) {
    return { 
      allowed: false, 
      remaining: 0, 
      resetTime: record.resetTime 
    };
  }
  
  // Increment count
  record.count++;
  rateLimitMap.set(ip, record);
  return { allowed: true, remaining: RATE_LIMIT - record.count };
}

// Vercel serverless function handler
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    // Get IP address for rate limiting
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || 
               req.headers['x-real-ip'] || 
               req.connection?.remoteAddress || 
               'unknown';
    
    // Check rate limit
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      const resetSeconds = Math.ceil((rateLimit.resetTime - Date.now()) / 1000);
      return res.status(429).json({ 
        error: 'Rate limit exceeded',
        message: `You've reached the rate limit. Please try again in ${Math.ceil(resetSeconds / 60)} minutes.`,
        resetTime: rateLimit.resetTime
      });
    }
    
    // Get and sanitize user message
    const { message } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    const sanitizedMessage = sanitizeInput(message);
    if (!sanitizedMessage) {
      return res.status(400).json({ error: 'Invalid message' });
    }
    
    // Load knowledge base
    const knowledgeBase = loadKnowledgeBase();
    
    // Find relevant content
    const relevantContent = findRelevantContent(sanitizedMessage, knowledgeBase, 3);
    
    // Build context from relevant content
    let context = '';
    const links = [];
    
    if (relevantContent.length > 0) {
      context = relevantContent.map((item, index) => {
        links.push({
          text: item.source === 'Projects' ? item.content.split('.')[0] : item.section,
          url: item.route
        });
        return `[${index + 1}] ${item.content}`;
      }).join('\n\n');
    }
    
    // Get Groq API key
    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      console.error('GROQ_API_KEY not set');
      return res.status(500).json({ error: 'Server configuration error' });
    }
    
    // Initialize Groq
    const groq = new Groq({ apiKey: groqApiKey });
    
    // Build system prompt
    const systemPrompt = `You are a helpful AI assistant for Terrell Glenn's portfolio website. Your role is to answer questions about Terrell's work, skills, experience, education, and projects based on the provided context.

IMPORTANT RULES:
- Only answer questions related to Terrell Glenn, his portfolio, projects, skills, experience, or education
- If asked about something unrelated to the portfolio, politely redirect to portfolio-related topics
- Use the provided context to answer questions accurately
- If you don't know something from the context, say so rather than making up information
- Keep responses concise and friendly (2-4 sentences typically)
- Always include relevant links to portfolio sections when mentioning projects, skills, or experiences
- Format links using Markdown: [link text](url)

Context from portfolio:
${context || 'No specific context found, but you can answer general questions about the portfolio.'}`;
    
    // Call Groq API
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: sanitizedMessage
        }
      ],
      model: 'llama-3.1-70b-versatile',
      temperature: 0.7,
      max_tokens: 500,
      top_p: 1,
      stream: false
    });
    
    const assistantMessage = completion.choices[0]?.message?.content || 'I apologize, but I could not generate a response.';
    
    // Return response with links
    return res.status(200).json({
      message: assistantMessage,
      links: links.slice(0, 3), // Return top 3 links
      remaining: rateLimit.remaining
    });
    
  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: 'An error occurred while processing your request. Please try again later.'
    });
  }
}

