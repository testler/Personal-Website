import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT = 768;
const MOBILE_QUERY = `(max-width: ${MOBILE_BREAKPOINT}px)`;

function checkMobile() {
  if (typeof window === 'undefined') return false;
  try {
    return window.matchMedia(MOBILE_QUERY).matches;
  } catch {
    return window.innerWidth <= MOBILE_BREAKPOINT;
  }
}

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(checkMobile);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const handler = () => setIsMobile(mql.matches);

    // Sync on mount in case initial state was stale
    handler();

    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return isMobile;
}
