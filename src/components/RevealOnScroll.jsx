import { useEffect, useRef } from "react";

export const RevealOnScroll = ({ children }) => {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Check if element is already visible on mount (important for mobile)
        const checkInitialVisibility = () => {
            if (element && !element.classList.contains("visible")) {
                const rect = element.getBoundingClientRect();
                const isInViewport = rect.top < window.innerHeight * 1.2 && rect.bottom > -100;
                if (isInViewport) {
                    element.classList.add("visible");
                }
            }
        };

        // Check immediately and after a short delay (for mobile rendering)
        checkInitialVisibility();
        const initialTimeout = setTimeout(checkInitialVisibility, 100);

        // Use more lenient settings for mobile devices
        const isMobile = window.innerWidth < 768;
        const threshold = isMobile ? 0.05 : 0.15;
        const rootMargin = isMobile ? "0px 0px -10% 0px" : "0px 0px -50px 0px";

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && element && !element.classList.contains("visible")) {
                    element.classList.add("visible");
                }
            }, 
            { threshold, rootMargin }
        );

        observer.observe(element);

        // Also check on scroll for better mobile support
        const handleScroll = () => {
            if (element && !element.classList.contains("visible")) {
                checkInitialVisibility();
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', checkInitialVisibility, { passive: true });

        return () => {
            clearTimeout(initialTimeout);
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', checkInitialVisibility);
        };
    }, []);

    return (
        <div ref={ref} className="reveal w-full">
            {children}
        </div>
    );
}