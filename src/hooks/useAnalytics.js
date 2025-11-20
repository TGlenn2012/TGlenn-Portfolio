import { useEffect, useCallback } from 'react';
import { initGA, trackPageView, trackEvent } from '../utils/analytics';

// Custom hook for Google Analytics
export const useAnalytics = (measurementId) => {
  useEffect(() => {
    if (measurementId) {
      initGA(measurementId);
    }
  }, [measurementId]);

  const trackPage = useCallback((path) => {
    trackPageView(path, measurementId);
  }, [measurementId]);

  return {
    trackPageView: trackPage,
    trackEvent,
  };
};

// Hook to track page views on route changes
export const usePageTracking = (path) => {
  useEffect(() => {
    if (path && typeof window !== 'undefined' && window.gtag) {
      trackPageView(path);
    }
  }, [path]);
};

