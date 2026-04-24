import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  // Disable browser scroll restoration on mount
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Instant scroll on route change - runs synchronously
  useEffect(() => {
    // Immediate scroll without any delay
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  // Also hide content briefly to prevent flash
  useEffect(() => {
    const html = document.documentElement;
    html.style.scrollBehavior = "auto";
    
    // Force scroll at multiple timings
    const scrollTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    
    scrollTop();
    requestAnimationFrame(scrollTop);
    setTimeout(scrollTop, 0);
    
    return () => {
      html.style.scrollBehavior = "";
    };
  }, [pathname]);

  return null;
}
