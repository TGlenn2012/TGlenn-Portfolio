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
function findRelevantContent(query, knowledgeBase, topK = 5) {
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(/\s+/).filter(w => w.length > 2);
  
  // Detect query type for better matching
  const isEducationQuery = /school|university|college|education|degree|phd|bachelor|master|graduate|undergraduate|attended|went to|studied/.test(queryLower);
  const isExperienceQuery = /work|job|experience|employer|company|microsoft|intel|purdue|flare/.test(queryLower);
  const isProjectQuery = /project|iot|ar|maker|story|microkart|robotic|arm/.test(queryLower);
  const isSkillQuery = /skill|technology|tool|language|programming|design|research/.test(queryLower);
  
  // Score each knowledge base entry
  const scored = knowledgeBase.map((entry) => {
    let score = 0;
    const contentLower = entry.content.toLowerCase();
    const tagsLower = entry.metadata?.tags?.join(' ').toLowerCase() || '';
    const sourceLower = entry.source.toLowerCase();
    const sectionLower = entry.section?.toLowerCase() || '';
    const entryType = entry.metadata?.type || '';
    
    // Check for exact phrase matches
    if (contentLower.includes(queryLower)) {
      score += 15;
    }
    
    // Boost for education queries matching education entries
    if (isEducationQuery && (entryType === 'education' || sectionLower.includes('education'))) {
      score += 20;
    }
    
    // Boost for experience queries matching experience entries
    if (isExperienceQuery && (entryType === 'experience' || sectionLower.includes('experience'))) {
      score += 20;
    }
    
    // Boost for project queries matching project entries
    if (isProjectQuery && entryType === 'project') {
      score += 20;
    }
    
    // Boost for skill queries matching skill entries
    if (isSkillQuery && entryType === 'skills') {
      score += 20;
    }
    
    // Check for word matches with better weighting
    queryWords.forEach((word) => {
      if (contentLower.includes(word)) {
        // Higher score for important words
        if (['purdue', 'morehouse', 'university', 'college', 'school'].includes(word)) {
          score += 5;
        } else {
          score += 2;
        }
      }
      // Special handling: "school" query should match "university" and "college"
      if (word === 'school' && (contentLower.includes('university') || contentLower.includes('college'))) {
        score += 8;
      }
      if (tagsLower.includes(word)) score += 4;
      if (sourceLower.includes(word)) score += 1;
      if (sectionLower.includes(word)) score += 3;
    });
    
    // Boost score for relevant tags
    entry.metadata?.tags?.forEach((tag) => {
      const tagLower = tag.toLowerCase();
      if (queryLower.includes(tagLower) || tagLower.includes(queryLower)) {
        score += 6;
      }
      // Special boost for education-related tags
      if (isEducationQuery && ['purdue', 'morehouse', 'phd', 'bachelors', 'education'].includes(tagLower)) {
        score += 10;
      }
    });
    
    // Boost for entries containing university/college names when asking about schools
    if (isEducationQuery) {
      if (contentLower.includes('purdue')) score += 8;
      if (contentLower.includes('morehouse')) score += 8;
      if (contentLower.includes('university')) score += 5;
      if (contentLower.includes('college')) score += 5;
    }
    
    return { ...entry, score };
  });
  
  // Sort by score and return top K
  const results = scored
    .sort((a, b) => b.score - a.score)
    .filter((item) => item.score > 0);
  
  // If we have education query but no high-scoring results, force include education entries
  if (isEducationQuery && results.length > 0 && results[0].score < 10) {
    const educationEntries = knowledgeBase.filter(e => 
      e.metadata?.type === 'education' || e.section?.toLowerCase().includes('education')
    );
    return [...educationEntries, ...results].slice(0, topK);
  }
  
  return results.slice(0, topK);
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
  // Set CORS headers first
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle OPTIONS preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Log method for debugging (remove in production if needed)
  console.log('API Request Method:', req.method);
  console.log('API Request URL:', req.url);
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method);
    return res.status(405).json({ 
      error: 'Method not allowed',
      method: req.method,
      allowed: ['POST']
    });
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
    
    // Detect query type early for special handling
    const queryLower = sanitizedMessage.toLowerCase();
    const isEducationQuery = /school|university|college|education|degree|phd|bachelor|master|graduate|undergraduate|attended|went to|studied/.test(queryLower);
    
    // Find relevant content (increased to 8 for better context)
    let relevantContent = findRelevantContent(sanitizedMessage, knowledgeBase, 8);
    
    // Force include ALL education entries for education queries
    if (isEducationQuery) {
      const allEducationEntries = knowledgeBase.filter(e => 
        e.metadata?.type === 'education' || e.section?.toLowerCase().includes('education')
      );
      
      console.log('All education entries in knowledge base:', allEducationEntries.length);
      allEducationEntries.forEach((e, i) => {
        console.log(`  Education entry ${i}: ${e.id} - ${e.content.substring(0, 60)}...`);
      });
      
      // Merge and deduplicate by ID
      const existingIds = new Set(relevantContent.map(e => e.id));
      const additionalEducation = allEducationEntries.filter(e => !existingIds.has(e.id));
      
      // ALWAYS prioritize education entries at the beginning, regardless of score
      relevantContent = [...allEducationEntries, ...relevantContent.filter(e => !allEducationEntries.some(ae => ae.id === e.id))].slice(0, 8);
      
      console.log('After forcing education entries, relevantContent length:', relevantContent.length);
      console.log('Education entries in final relevantContent:', relevantContent.filter(e => e.metadata?.type === 'education').length);
    }
    
    // Debugging logs
    console.log('=== CHAT DEBUG INFO ===');
    console.log('Query:', sanitizedMessage);
    console.log('Is Education Query:', isEducationQuery);
    console.log('Relevant content found:', relevantContent.length);
    console.log('Education entries:', relevantContent.filter(e => e.metadata?.type === 'education').length);
    relevantContent.forEach((item, i) => {
      console.log(`[${i}] Type: ${item.metadata?.type}, Score: ${item.score || 'N/A'}, Section: ${item.section}, Content preview: ${item.content.substring(0, 80)}...`);
    });
    console.log('=== END DEBUG INFO ===');
    
    // Build context from relevant content
    let context = '';
    const links = [];
    
    if (relevantContent.length > 0) {
      context = relevantContent.map((item, index) => {
        // Generate shorter link text
        let linkText = item.section;
        if (item.source === 'Projects') {
          // Extract project name (text before colon) or use first part of content
          const contentStart = item.content.split(':')[0];
          // If it's a reasonable length, use it; otherwise use route-based name
          if (contentStart.length <= 30) {
            linkText = contentStart.trim();
          } else {
            // Extract from route or use a mapping
            const routeToName = {
              '/microkarts': 'MicrokARts',
              '/sharediot': 'ShARed IoT',
              '/iotmaker': 'IoT Maker',
              '/storymakar': 'StoryMakAR',
              '/6dof': '6DOF Robotic Arm',
              '/iotcourse': 'IoT Course'
            };
            linkText = routeToName[item.route] || contentStart.substring(0, 20).trim();
          }
        }
        links.push({
          text: linkText,
          url: item.route
        });
        return `[${index + 1}] ${item.content}`;
      }).join('\n\n');
    }
    
    // Log the actual context being sent (first 500 chars)
    console.log('Context being sent to LLM (first 500 chars):', context.substring(0, 500));
    console.log('Full context length:', context.length);
    
    // Validate context contains expected information for education queries
    if (isEducationQuery) {
      const contextLower = context.toLowerCase();
      const hasPurdue = contextLower.includes('purdue');
      const hasMorehouse = contextLower.includes('morehouse');
      const hasEducation = contextLower.includes('education');
      console.log('Context validation - Has Purdue:', hasPurdue, 'Has Morehouse:', hasMorehouse, 'Has Education:', hasEducation);
      
      if (!hasPurdue && !hasMorehouse && !hasEducation) {
        console.error('❌ CRITICAL: Education query but context does not contain education information!');
        console.error('Relevant content IDs:', relevantContent.map(e => e.id));
        // Force rebuild context with ALL education entries
        const allEducationEntries = knowledgeBase.filter(e => 
          e.metadata?.type === 'education' || e.section?.toLowerCase().includes('education')
        );
        if (allEducationEntries.length > 0) {
          console.log('Rebuilding context with all education entries...');
          const educationContext = allEducationEntries.map((item, index) => {
            if (!links.some(l => l.url === item.route)) {
              links.push({
                text: item.section,
                url: item.route
              });
            }
            return `[${index + 1}] ${item.content}`;
          }).join('\n\n');
          context = educationContext + (context ? '\n\n' + context : '');
          console.log('New context (first 300 chars):', context.substring(0, 300));
        }
      }
    }
    
    // Get Groq API key
    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      console.error('GROQ_API_KEY not set');
      return res.status(500).json({ error: 'Server configuration error' });
    }
    
    // Initialize Groq
    const groq = new Groq({ apiKey: groqApiKey });
    
    // Build system prompt with few-shot examples
    const systemPrompt = `You are a helpful AI assistant for Terrell Glenn's portfolio website. You answer questions using ONLY the provided context below.

CRITICAL RULES - FOLLOW THESE EXACTLY:
1. The context below contains FACTUAL information from Terrell's portfolio
2. You MUST extract and use information from the context to answer the question
3. NEVER say "I don't know", "unfortunately", "the context doesn't mention", "context only mentions", "not available", or "no information" 
4. If the context contains relevant information, you MUST present it - even if it's not exactly what was asked
5. For education questions, the context WILL contain entries with "Education:", "Purdue University", "Morehouse College"
6. Keep responses concise and friendly (2-4 sentences typically)
7. Format links using Markdown: [link text](url)

EXAMPLES - FOLLOW THIS PATTERN:

Example 1:
User: "What school did Terrell go to?"
Context: [1] Education: Doctorate in Human-Computer Interaction (Mechanical Engineering) from Purdue University
[2] Education: Bachelor of Science in Physics from Morehouse College
Your Response MUST BE: "Terrell attended Purdue University, where he earned a Doctorate in Human-Computer Interaction (Mechanical Engineering), and Morehouse College, where he earned a Bachelor of Science in Physics."

Example 2:
User: "Where did Terrell work?"
Context: [1] Professional Experience: Hardware Engineer & Technical Product Manager at Microsoft Corporation (May 2022 - Aug 2025)
Your Response MUST BE: "Terrell worked at Microsoft Corporation as a Hardware Engineer & Technical Product Manager from May 2022 to August 2025."

IMPORTANT: The context below is GUARANTEED to contain relevant information. Your job is to extract and present it. Do NOT say the context doesn't have the information - it does.

Context from portfolio:
${context || 'No specific context found.'}

Now answer the user's question. Extract information from the context above and present it. Do NOT say you don't know.`;
    
    // Call Groq API with optimized parameters
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
      model: 'llama-3.3-70b-versatile',
      temperature: 0.3,  // Lower for more factual, deterministic answers
      max_tokens: 300,    // Shorter, more focused responses
      top_p: 0.9,        // More focused sampling
      stream: false
    });
    
    let assistantMessage = completion.choices[0]?.message?.content || 'I apologize, but I could not generate a response.';
    
    console.log('LLM Response (first 200 chars):', assistantMessage.substring(0, 200));
    
    // GENERAL VALIDATION: Check if LLM gave negative response when we have relevant context
    // This works for ALL query types, not just education
    if (relevantContent.length > 0 && context.length > 0) {
      const negativePhrases = [
        "don't know",
        "doesn't mention",
        "unfortunately",
        "not available",
        "not found",
        "no information",
        "can't find",
        "i don't have",
        "the provided context",
        "context doesn't",
        "context only mentions",
        "provided context only"
      ];
      
      const messageLower = assistantMessage.toLowerCase();
      const hasNegativePhrase = negativePhrases.some(phrase => messageLower.includes(phrase));
      
      console.log('General validation - Has negative phrase:', hasNegativePhrase);
      console.log('Relevant content available:', relevantContent.length, 'entries');
      
      if (hasNegativePhrase) {
        console.log('⚠️ LLM gave negative response despite having relevant context. Attempting extraction...');
        
        // Try to extract answer from context based on query type
        let extractedAnswer = null;
        
        // Education-specific extraction
        if (isEducationQuery) {
          const educationEntries = relevantContent.filter(e => e.metadata?.type === 'education');
          if (educationEntries.length > 0) {
            const purdueEntry = educationEntries.find(e => e.content.includes('Purdue University'));
            const morehouseEntry = educationEntries.find(e => e.content.includes('Morehouse College'));
            
            const schools = [];
            
            if (purdueEntry) {
              const purdueMatch = purdueEntry.content.match(/Education: ([^f]+) from Purdue University/i);
              if (purdueMatch) {
                schools.push(`Purdue University, where he earned a ${purdueMatch[1].trim()}`);
              } else {
                schools.push('Purdue University');
              }
            }
            
            if (morehouseEntry) {
              const morehouseMatch = morehouseEntry.content.match(/Education: ([^f]+) from Morehouse College/i);
              if (morehouseMatch) {
                schools.push(`Morehouse College, where he earned a ${morehouseMatch[1].trim()}`);
              } else {
                schools.push('Morehouse College');
              }
            }
            
            if (schools.length > 0) {
              extractedAnswer = `Terrell attended ${schools.join(' and ')}.`;
            }
          }
        }
        
        // General extraction: If no specific extraction worked, use the most relevant entry
        if (!extractedAnswer && relevantContent.length > 0) {
          // Find the highest scoring entry that matches the query
          const topEntry = relevantContent[0];
          if (topEntry && topEntry.content) {
            // Extract a concise answer from the top entry
            const content = topEntry.content;
            
            // For education queries, use hardcoded fallback if extraction failed
            if (isEducationQuery) {
              extractedAnswer = "Terrell attended Purdue University, where he earned a Doctorate in Human-Computer Interaction (Mechanical Engineering), and Morehouse College, where he earned a Bachelor of Science in Physics.";
            } else {
              // For other queries, use the content directly but make it more conversational
              extractedAnswer = content.length > 200 
                ? content.substring(0, 200) + '...' 
                : content;
            }
          }
        }
        
        if (extractedAnswer) {
          assistantMessage = extractedAnswer;
          console.log('✅ Generated response from extraction/fallback:', assistantMessage.substring(0, 100) + '...');
        } else {
          console.log('⚠️ Extraction failed, but keeping LLM response');
        }
      } else {
        console.log('✅ LLM response appears adequate (no negative phrases)');
      }
    } else {
      console.log('⚠️ No relevant content found, using LLM response as-is');
    }
    
    // Special handling for education queries if still no good answer
    if (isEducationQuery && relevantContent.length === 0) {
      console.log('⚠️ Education query but no relevant content - using hardcoded fallback');
      assistantMessage = "Terrell attended Purdue University, where he earned a Doctorate in Human-Computer Interaction (Mechanical Engineering), and Morehouse College, where he earned a Bachelor of Science in Physics.";
    }
    
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

