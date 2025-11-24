import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

export const ChatMessage = ({ message, isUser, links = [], messageId, onFeedback }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[80%] sm:max-w-[75%] md:max-w-[70%] rounded-xl p-3 md:p-4 ${
          isUser
            ? 'bg-blue-600/30 border border-blue-500/50 text-gray-50'
            : 'bg-gray-800/80 border border-gray-700/50 text-gray-100'
        }`}
      >
        {/* Message content with markdown support */}
        <div className="prose prose-invert prose-sm max-w-none">
          <ReactMarkdown
            components={{
              // Custom link component to handle internal routes
              a: ({ href, children }) => {
                // Check if it's an internal route
                if (href && (href.startsWith('/') || href.startsWith('#'))) {
                  return (
                    <Link
                      to={href}
                      className="text-blue-300 hover:text-blue-200 underline transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                      onClick={() => {
                        // Scroll to section if it's a hash link
                        if (href.startsWith('#')) {
                          const element = document.querySelector(href);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }
                      }}
                    >
                      {children}
                    </Link>
                  );
                }
                // External links
                return (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:text-blue-200 underline transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                  >
                    {children}
                  </a>
                );
              },
              // Style paragraphs
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
              // Style lists
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>
              ),
              // Style code blocks
              code: ({ inline, children }) => (
                <code
                  className={`${
                    inline
                      ? 'bg-gray-900 px-1.5 py-0.5 rounded text-sm text-gray-200'
                      : 'block bg-gray-900 p-2 rounded my-2 overflow-x-auto text-gray-200'
                  }`}
                >
                  {children}
                </code>
              ),
            }}
          >
            {message}
          </ReactMarkdown>
        </div>

        {/* Links section for bot messages */}
        {!isUser && links && links.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-700/50">
            <p className="text-xs text-gray-300 mb-2">Learn more:</p>
            <div className="flex flex-wrap gap-2">
              {links.map((link, index) => (
                <Link
                  key={index}
                  to={link.url}
                  className="inline-block bg-blue-600/30 hover:bg-blue-600/40 text-blue-300 px-3 py-1.5 rounded-full text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  {link.text} →
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Feedback buttons for bot messages */}
        {!isUser && messageId && onFeedback && (
          <div className="mt-3 pt-3 border-t border-gray-700/50 flex items-center gap-2">
            <span className="text-xs text-gray-400">Was this helpful?</span>
            <button
              onClick={() => onFeedback(messageId, 'up')}
              className="p-1.5 hover:bg-gray-700/50 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
              aria-label="Thumbs up"
            >
              <svg className="w-4 h-4 text-gray-400 hover:text-green-400 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.834a1 1 0 001.364.97l5.108-2.222a1 1 0 00.55-.894V8.667a1 1 0 00-.55-.894L7.364 5.551A1 1 0 006 6.52v3.813z" />
              </svg>
            </button>
            <button
              onClick={() => onFeedback(messageId, 'down')}
              className="p-1.5 hover:bg-gray-700/50 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
              aria-label="Thumbs down"
            >
              <svg className="w-4 h-4 text-gray-400 hover:text-red-400 transition-colors" fill="currentColor" viewBox="0 0 20 20" style={{ transform: 'rotate(180deg)' }}>
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.834a1 1 0 001.364.97l5.108-2.222a1 1 0 00.55-.894V8.667a1 1 0 00-.55-.894L7.364 5.551A1 1 0 006 6.52v3.813z" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

