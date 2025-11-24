import { useState, useRef } from 'react';

export const ChatbotButton = ({ onClick, onLongPress }) => {
  const [isHovered, setIsHovered] = useState(false);
  const longPressTimerRef = useRef(null);
  const isLongPressRef = useRef(false);
  const hasHandledPressRef = useRef(false);
  const LONG_PRESS_DURATION = 500; // 500ms for long press

  const handlePressStart = (e) => {
    // Prevent default touch behavior to avoid delayed clicks
    if (e.type === 'touchstart') {
      e.preventDefault();
    }
    
    hasHandledPressRef.current = false;
    isLongPressRef.current = false;
    
    longPressTimerRef.current = setTimeout(() => {
      isLongPressRef.current = true;
      hasHandledPressRef.current = true;
      if (onLongPress) {
        console.log('Long press detected - opening with debug mode');
        onLongPress();
      }
    }, LONG_PRESS_DURATION);
  };

  const handlePressEnd = (e) => {
    // Prevent default to avoid delayed click on mobile
    if (e.type === 'touchend') {
      e.preventDefault();
    }
    
    const wasLongPress = isLongPressRef.current;
    
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    
    // Only trigger onClick if it wasn't a long press and we haven't handled it yet
    if (!wasLongPress && !hasHandledPressRef.current && onClick) {
      hasHandledPressRef.current = true;
      onClick();
    }
    
    // Reset flags after a short delay to allow onClick to fire if needed
    setTimeout(() => {
      isLongPressRef.current = false;
      hasHandledPressRef.current = false;
    }, 100);
  };

  const handlePressCancel = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    isLongPressRef.current = false;
    hasHandledPressRef.current = false;
  };

  // Explicitly handle click events to prevent double-firing on mobile
  const handleClick = (e) => {
    // If we've already handled this as a touch event, prevent the click
    if (hasHandledPressRef.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    
    // For mouse clicks (not touch), handle normally
    if (!isLongPressRef.current && onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      onTouchCancel={handlePressCancel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        handlePressCancel();
      }}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full shadow-lg hover:shadow-xl active:scale-95 hover:scale-110 transition-all duration-300 flex items-center justify-center touch-target min-h-[56px] min-w-[56px] focus:outline-none focus:ring-4 focus:ring-blue-500/50"
      aria-label="Open chatbot (long press for debug mode)"
      style={{ touchAction: 'manipulation' }}
    >
      {/* Robot Icon SVG */}
      <svg
        className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-white transition-transform duration-300 ${isHovered ? 'animate-bounce' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
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
      {/* Pulse animation ring */}
      {isHovered && (
        <span className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20" />
      )}
    </button>
  );
};

