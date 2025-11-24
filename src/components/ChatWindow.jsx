import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';

export const ChatWindow = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm an AI assistant for Terrell Glenn's portfolio. I can answer questions about his work, skills, projects, experience, and education. What would you like to know?",
      isUser: false,
      links: [],
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: trimmedInput,
      isUser: true,
      links: [],
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      // Determine API URL - use production Vercel URL in development, or relative path in production
      // Always use relative path in production for better mobile compatibility
      let apiUrl;
      if (import.meta.env.VITE_API_URL) {
        apiUrl = import.meta.env.VITE_API_URL;
      } else if (import.meta.env.DEV || import.meta.env.MODE === 'development') {
        // Use production API during local development
        apiUrl = 'https://www.terrellglenn.com/api/chat';
      } else {
        // Use relative path in production (works on both desktop and mobile)
        apiUrl = '/api/chat';
      }
      
      // Log API URL for debugging (remove in production if not needed)
      console.log('Chat API Request:', {
        apiUrl,
        mode: import.meta.env.MODE,
        dev: import.meta.env.DEV,
        currentUrl: window.location.href,
        origin: window.location.origin,
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      });
      
      // Call chat API with timeout for mobile networks
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: trimmedInput }),
        credentials: 'same-origin', // Better mobile compatibility
        signal: controller.signal, // For timeout handling
      }).finally(() => {
        clearTimeout(timeoutId);
      });

      if (!response.ok) {
        // Try to get error details from response
        let errorMessage = 'Failed to get response';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || `Server error (${response.status})`;
        } catch (e) {
          // If response isn't JSON, use status text
          errorMessage = response.statusText || `Server error (${response.status})`;
        }
        
        if (response.status === 429) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.message || 'Rate limit exceeded. Please try again later.');
        }
        
        throw new Error(errorMessage);
      }

      // Parse response JSON with error handling for mobile
      let data;
      try {
        const responseText = await response.text();
        console.log('API Response (first 200 chars):', responseText.substring(0, 200));
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse response JSON:', parseError);
        throw new Error('Invalid response from server. Please try again.');
      }

      // Validate response structure
      if (!data || typeof data !== 'object') {
        console.error('Invalid response data:', data);
        throw new Error('Unexpected response format from server.');
      }

      // Add bot response
      const botMessage = {
        id: Date.now() + 1,
        text: data.message || 'I apologize, but I could not generate a response.',
        isUser: false,
        links: data.links || [],
      };

      setMessages((prev) => [...prev, botMessage]);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error('Chat error:', err);
      console.error('Error details:', {
        message: err.message,
        stack: err.stack,
        apiUrl: apiUrl,
        userAgent: navigator.userAgent,
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        isOnline: navigator.onLine,
        currentUrl: window.location.href
      });
      
      // Provide more helpful error messages
      let userFriendlyError = err.message || 'An error occurred. Please try again.';
      
      // Check if it's a network error or timeout
      if (err.name === 'AbortError' || err.message.includes('aborted')) {
        userFriendlyError = 'Request timed out. Please check your internet connection and try again.';
      } else if (err instanceof TypeError && (err.message.includes('fetch') || err.message.includes('network'))) {
        userFriendlyError = 'Network error: Unable to connect to the server. Please check your internet connection and try again.';
      } else if (!navigator.onLine) {
        userFriendlyError = 'You appear to be offline. Please check your internet connection.';
      }
      
      setError(userFriendlyError);

      // Add error message to chat for visibility
      const errorMessage = {
        id: Date.now() + 1,
        text: `I'm sorry, but I encountered an error: ${userFriendlyError}`,
        isUser: false,
        links: [],
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      // Always clear loading state, even on error
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
      onClick={(e) => {
        // Close on backdrop click (mobile-friendly)
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-gray-900/95 backdrop-blur-md rounded-xl border border-gray-700/50 w-full max-w-2xl h-[90vh] sm:h-[80vh] max-h-[90vh] sm:max-h-[600px] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
                <circle cx="9" cy="9" r="1.5" fill="currentColor" />
                <circle cx="15" cy="9" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-50">Portfolio Assistant</h3>
              <p className="text-xs text-gray-300">Ask me anything about Terrell's work</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-gray-50 transition-colors p-2 rounded-lg hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 touch-target min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close chatbot"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 overscroll-contain">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isUser={message.isUser}
              links={message.links}
            />
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-800/80 border border-gray-700/50 rounded-xl p-4">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          {error && (
            <div className="bg-red-900/70 border-2 border-red-500 rounded-xl p-4 text-red-200 text-sm sm:text-base shadow-lg">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div className="flex-1">
                  <strong className="font-semibold block mb-1">Error:</strong>
                  <div>{error}</div>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="text-red-300 hover:text-red-100 flex-shrink-0"
                  aria-label="Dismiss error"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="p-3 sm:p-4 border-t border-gray-700/50">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about Terrell's work..."
              disabled={isLoading}
              className="flex-1 bg-gray-800/80 border border-gray-700/50 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-base text-gray-50 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-target min-h-[44px]"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="bg-blue-500 hover:bg-blue-400 active:bg-blue-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 touch-target min-h-[44px] min-w-[44px] sm:min-w-[80px] flex items-center justify-center"
              aria-label="Send message"
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              )}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            Press Enter to send • Questions about portfolio only
          </p>
        </div>
      </div>
    </div>
  );
};

