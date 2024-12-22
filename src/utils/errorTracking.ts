export function initErrorTracking() {
  if (typeof window === 'undefined') return;

  // Track route changes
  window.addEventListener('popstate', () => {
    console.log('Route changed:', window.location.pathname);
  });

  // Track resource loading errors
  window.addEventListener('error', (event) => {
    if (event.target && 'tagName' in event.target) {
      const target = event.target as HTMLElement;
      console.error('Resource loading error:', {
        tagName: target.tagName,
        source: (target as HTMLImageElement | HTMLScriptElement).src || (target as HTMLLinkElement).href
      });
    }
  }, true);

  // Track network errors
  const originalFetch = window.fetch;
  window.fetch = async function(...args) {
    try {
      const response = await originalFetch.apply(this, args);
      if (!response.ok) {
        console.error('Fetch error:', {
          url: args[0],
          status: response.status,
          statusText: response.statusText
        });
      }
      return response;
    } catch (error) {
      console.error('Fetch network error:', {
        url: args[0],
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  };
}