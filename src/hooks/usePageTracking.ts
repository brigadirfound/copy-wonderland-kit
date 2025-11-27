import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const trackPageView = async () => {
      try {
        const userAgent = navigator.userAgent;
        const referrer = document.referrer || null;
        
        await supabase.from('page_views').insert({
          page_path: location.pathname,
          user_agent: userAgent,
          referrer: referrer,
        });
      } catch (error) {
        // Silently fail - we don't want tracking errors to break the app
        console.error('Failed to track page view:', error);
      }
    };

    trackPageView();
  }, [location.pathname]);
};
