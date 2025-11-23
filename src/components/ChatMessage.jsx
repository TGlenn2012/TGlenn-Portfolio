import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

export const ChatMessage = ({ message, isUser, links = [] }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[80%] sm:max-w-[75%] md:max-w-[70%] rounded-xl p-3 md:p-4 ${
          isUser
            ? 'bg-blue-500/20 border border-blue-500/30 text-gray-100'
            : 'glass border border-white/10 text-gray-300'
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
                      className="text-blue-400 hover:text-blue-300 underline transition-colors"
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
                    className="text-blue-400 hover:text-blue-300 underline transition-colors"
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
                      ? 'bg-gray-800 px-1.5 py-0.5 rounded text-sm'
                      : 'block bg-gray-800 p-2 rounded my-2 overflow-x-auto'
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
          <div className="mt-3 pt-3 border-t border-white/10">
            <p className="text-xs text-gray-400 mb-2">Learn more:</p>
            <div className="flex flex-wrap gap-2">
              {links.map((link, index) => (
                <Link
                  key={index}
                  to={link.url}
                  className="inline-block bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-3 py-1.5 rounded-full text-xs transition-colors"
                >
                  {link.text} →
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

