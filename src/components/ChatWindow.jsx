import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { getSuggestedQuestions, quickActions } from '../utils/chatSuggestions';

const STORAGE_KEY = 'terrell_portfolio_chat_history';

export const ChatWindow = ({ isOpen, onClose }) => {
  // Load conversation history from localStorage
  const loadHistory = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Only load if we have messages (not just the initial greeting)
        if (parsed && parsed.length > 1) {
          return parsed;
        }
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
    // Return initial message if no history
    return [{
      id: 1,
      text: "Hi! I'm an AI assistant for Terrell Glenn's portfolio. I can answer questions about his work, skills, projects, experience, and education. What would you like to know?",
      isUser: false,
      links: [],
    }];
  };

  const [messages, setMessages] = useState(loadHistory);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDebug, setShowDebug] = useState(false);
  const [debugLogs, setDebugLogs] = useState([]);
  const [suggestedQuestions, setSuggestedQuestions] = useState(getSuggestedQuestions([]));
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Save conversation history to localStorage whenever messages change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  }, [messages]);

  // Update suggested questions when messages change
  useEffect(() => {
    setSuggestedQuestions(getSuggestedQuestions(messages));
  }, [messages]);

  // Prevent body scroll when chat window is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

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

  // Handle quick action click
  const handleQuickAction = (question) => {
    setInput(question);
    // Auto-send after a brief delay for better UX
    setTimeout(() => {
      sendMessage(question);
    }, 100);
  };

  // Handle suggested question click
  const handleSuggestionClick = (question) => {
    sendMessage(question);
  };

  // Clear conversation history
  const clearHistory = () => {
    if (window.confirm('Clear conversation history?')) {
      const initialMessage = [{
        id: 1,
        text: "Hi! I'm an AI assistant for Terrell Glenn's portfolio. I can answer questions about his work, skills, projects, experience, and education. What would you like to know?",
        isUser: false,
        links: [],
        feedback: null,
      }];
      setMessages(initialMessage);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMessage));
      setSuggestedQuestions(getSuggestedQuestions([]));
    }
  };

  const sendMessage = async (messageText = null) => {
    const trimmedInput = messageText || input.trim();
    console.log('sendMessage called:', { trimmedInput, isLoading });
    
    if (!trimmedInput || isLoading) {
      console.log('Early return:', { hasInput: !!trimmedInput, isLoading });
      return;
    }

    // Check for debug password
    if (trimmedInput.toLowerCase() === 'debug') {
      setShowDebug((prev) => {
        const newState = !prev;
        const debugMessage = {
          id: Date.now(),
          text: `Debug mode ${newState ? 'enabled' : 'disabled'}.`,
          isUser: false,
          links: [],
          feedback: null,
        };
        setMessages((messagePrev) => [...messagePrev, debugMessage]);
        return newState;
      });
      setInput('');
      return;
    }

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

    // Add debug log entry
    const requestStartTime = Date.now();
    const debugLog = {
      id: Date.now(),
      type: 'request',
      timestamp: new Date().toISOString(),
      message: trimmedInput,
      status: 'pending',
    };
    setDebugLogs((prev) => [...prev, debugLog]);

    // Determine API URL
    let apiUrl;
    if (import.meta.env.VITE_API_URL) {
      apiUrl = import.meta.env.VITE_API_URL;
    } else if (import.meta.env.DEV || import.meta.env.MODE === 'development') {
      apiUrl = 'https://www.terrellglenn.com/api/chat';
    } else {
      apiUrl = '/api/chat';
    }

    try {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const debugInfo = {
        apiUrl,
        mode: import.meta.env.MODE,
        dev: import.meta.env.DEV,
        currentUrl: window.location.href,
        origin: window.location.origin,
        isMobile,
        userAgent: navigator.userAgent,
        isOnline: navigator.onLine,
      };
      console.log('Chat API Request:', debugInfo);
      
      setDebugLogs((prev) => prev.map((log) => 
        log.id === debugLog.id 
          ? { ...log, requestInfo: debugInfo }
          : log
      ));
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);
      
      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: trimmedInput }),
        credentials: 'same-origin',
        signal: controller.signal,
      };
      
      console.log('Making fetch request:', { apiUrl, method: fetchOptions.method, hasBody: !!fetchOptions.body });
      
      const response = await fetch(apiUrl, fetchOptions).finally(() => {
        clearTimeout(timeoutId);
      });
      
      console.log('Fetch response received:', { status: response.status, statusText: response.statusText, ok: response.ok });

      if (!response.ok) {
        let errorMessage = 'Failed to get response';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || `Server error (${response.status})`;
        } catch (e) {
          errorMessage = response.statusText || `Server error (${response.status})`;
        }
        
        if (response.status === 429) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.message || 'Rate limit exceeded. Please try again later.');
        }
        
        throw new Error(errorMessage);
      }

      let data;
      let responseText;
      try {
        responseText = await response.text();
        console.log('API Response (first 200 chars):', responseText.substring(0, 200));
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse response JSON:', parseError);
        
        const requestDuration = Date.now() - requestStartTime;
        setDebugLogs((prev) => prev.map((log) => 
          log.id === debugLog.id 
            ? { 
                ...log, 
                status: 'error',
                response: responseText?.substring(0, 500) || 'No response text',
                error: `JSON Parse Error: ${parseError.message}`,
                duration: requestDuration,
                statusCode: response.status,
              }
            : log
        ));
        
        throw new Error('Invalid response from server. Please try again.');
      }

      if (!data || typeof data !== 'object') {
        console.error('Invalid response data:', data);
        
        const requestDuration = Date.now() - requestStartTime;
        setDebugLogs((prev) => prev.map((log) => 
          log.id === debugLog.id 
            ? { 
                ...log, 
                status: 'error',
                response: responseText?.substring(0, 500) || 'No response text',
                error: 'Invalid response structure',
                duration: requestDuration,
                statusCode: response.status,
              }
            : log
        ));
        
        throw new Error('Unexpected response format from server.');
      }

      const requestDuration = Date.now() - requestStartTime;
      setDebugLogs((prev) => prev.map((log) => 
        log.id === debugLog.id 
          ? { 
              ...log, 
              status: 'success',
              response: responseText?.substring(0, 500) || JSON.stringify(data),
              responseData: data,
              duration: requestDuration,
              statusCode: response.status,
            }
          : log
      ));

      // Add bot response
      const botMessage = {
        id: Date.now() + 1,
        text: data.message || 'I apologize, but I could not generate a response.',
        isUser: false,
        links: data.links || [],
        feedback: null,
      };

      setMessages((prev) => [...prev, botMessage]);
      setError(null);
    } catch (err) {
      console.error('Chat error:', err);
      
      const errorDetails = {
        message: err.message,
        stack: err.stack,
        apiUrl: apiUrl,
        userAgent: navigator.userAgent,
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        isOnline: navigator.onLine,
        currentUrl: window.location.href,
        errorName: err.name,
      };
      console.error('Error details:', errorDetails);
      
      const requestDuration = Date.now() - requestStartTime;
      setDebugLogs((prev) => prev.map((log) => 
        log.id === debugLog.id 
          ? { 
              ...log, 
              status: 'error',
              error: err.message,
              errorDetails: errorDetails,
              duration: requestDuration,
            }
          : log
      ));
      
      let userFriendlyError = err.message || 'An error occurred. Please try again.';
      
      if (err.name === 'AbortError' || err.message.includes('aborted')) {
        userFriendlyError = 'Request timed out. Please check your internet connection and try again.';
      } else if (err instanceof TypeError && (err.message.includes('fetch') || err.message.includes('network'))) {
        userFriendlyError = 'Network error: Unable to connect to the server. Please check your internet connection and try again.';
      } else if (!navigator.onLine) {
        userFriendlyError = 'You appear to be offline. Please check your internet connection.';
      }
      
      setError(userFriendlyError);

      const errorMessage = {
        id: Date.now() + 1,
        text: `I'm sorry, but I encountered an error: ${userFriendlyError}`,
        isUser: false,
        links: [],
        feedback: null,
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSendClick = (e) => {
    e.preventDefault();
    sendMessage();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
      onClick={(e) => {
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
          <div className="flex items-center gap-2">
            {/* Clear history button */}
            {messages.length > 1 && (
              <button
                onClick={clearHistory}
                className="text-gray-300 hover:text-gray-50 transition-colors p-2 rounded-lg hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 touch-target min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Clear conversation history"
                title="Clear history"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
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

        {/* Quick Actions - Show when no messages or after first message */}
        {messages.length <= 1 && (
          <div className="px-3 sm:px-4 pt-2 pb-2 border-t border-gray-700/50">
            <p className="text-xs text-gray-400 mb-2">Quick actions:</p>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action.question)}
                  className="flex items-center gap-1.5 bg-gray-800/60 hover:bg-gray-700/60 border border-gray-700/50 text-gray-200 px-3 py-1.5 rounded-lg text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 touch-target min-h-[36px]"
                >
                  <span>{action.icon}</span>
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Suggested Questions - Show after bot responses */}
        {!isLoading && messages.length > 1 && suggestedQuestions.length > 0 && (
          <div className="px-3 sm:px-4 pt-2 pb-2 border-t border-gray-700/50">
            <p className="text-xs text-gray-400 mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(question)}
                  className="bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 px-3 py-1.5 rounded-full text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 touch-target min-h-[32px]"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Debug Panel */}
        {showDebug && (
          <div className="border-t border-gray-700/50 bg-gray-950/95 max-h-[200px] overflow-y-auto">
            <div className="p-3 border-b border-gray-700/50 flex items-center justify-between">
              <h4 className="text-sm font-bold text-yellow-400">🐛 Debug Panel</h4>
              <button
                onClick={() => setShowDebug(false)}
                className="text-gray-400 hover:text-gray-200 text-xs px-2 py-1"
                aria-label="Hide debug panel"
              >
                Hide
              </button>
            </div>
            <div className="p-3 space-y-2 text-xs">
              {debugLogs.length === 0 ? (
                <div className="text-gray-400">No debug logs yet. Send a message to see debug info.</div>
              ) : (
                debugLogs.slice(-5).reverse().map((log) => (
                  <div key={log.id} className="bg-gray-900/80 rounded p-2 border border-gray-700/50">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        log.status === 'success' ? 'bg-green-900/50 text-green-300' :
                        log.status === 'error' ? 'bg-red-900/50 text-red-300' :
                        'bg-yellow-900/50 text-yellow-300'
                      }`}>
                        {log.status?.toUpperCase() || 'PENDING'}
                      </span>
                      <span className="text-gray-400">{new Date(log.timestamp).toLocaleTimeString()}</span>
                      {log.duration && (
                        <span className="text-gray-500">({log.duration}ms)</span>
                      )}
                      {log.statusCode && (
                        <span className="text-gray-500">Status: {log.statusCode}</span>
                      )}
                    </div>
                    {log.message && (
                      <div className="text-gray-300 mb-1">
                        <strong>Message:</strong> {log.message}
                      </div>
                    )}
                    {log.requestInfo?.apiUrl && (
                      <div className="text-gray-400 mb-1 text-xs break-all">
                        <strong>API URL:</strong> {log.requestInfo.apiUrl}
                      </div>
                    )}
                    {log.error && (
                      <div className="text-red-300 mb-1">
                        <strong>Error:</strong> {log.error}
                      </div>
                    )}
                    {log.response && (
                      <details className="mt-1">
                        <summary className="text-blue-400 cursor-pointer hover:text-blue-300">
                          View Response ({log.response.length} chars)
                        </summary>
                        <pre className="mt-1 p-2 bg-gray-950 rounded text-xs text-gray-300 overflow-x-auto max-h-32 overflow-y-auto">
                          {typeof log.response === 'string' ? log.response : JSON.stringify(log.response, null, 2)}
                        </pre>
                      </details>
                    )}
                    {log.errorDetails && (
                      <details className="mt-1">
                        <summary className="text-red-400 cursor-pointer hover:text-red-300">
                          View Error Details
                        </summary>
                        <pre className="mt-1 p-2 bg-gray-950 rounded text-xs text-gray-300 overflow-x-auto max-h-32 overflow-y-auto">
                          {JSON.stringify(log.errorDetails, null, 2)}
                        </pre>
                      </details>
                    )}
                    {log.requestInfo && (
                      <details className="mt-1">
                        <summary className="text-gray-400 cursor-pointer hover:text-gray-300 text-xs">
                          Request Info
                        </summary>
                        <div className="mt-1 text-gray-400 text-xs space-y-0.5">
                          <div>Mode: {log.requestInfo.mode || 'N/A'}</div>
                          <div>Origin: {log.requestInfo.origin || 'N/A'}</div>
                          <div>Mobile: {log.requestInfo.isMobile ? 'Yes' : 'No'}</div>
                          <div>Online: {log.requestInfo.isOnline ? 'Yes' : 'No'}</div>
                        </div>
                      </details>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Input area */}
        <div className="p-3 sm:p-4 border-t border-gray-700/50">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about Terrell's work..."
              disabled={isLoading}
              autoComplete="off"
              className="flex-1 bg-gray-800/80 border border-gray-700/50 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-base text-gray-50 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-target min-h-[44px]"
            />
            <button
              type="button"
              onClick={handleSendClick}
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
