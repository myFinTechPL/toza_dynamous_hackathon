import { useEffect, useState } from 'react';
import './ScrollIndicator.css';

function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      // Calculate scroll percentage
      const scrollableHeight = documentHeight - windowHeight;
      const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
      
      setScrollProgress(progress);
    };

    // Calculate on mount
    calculateScrollProgress();

    // Add scroll event listener
    window.addEventListener('scroll', calculateScrollProgress, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', calculateScrollProgress);
    };
  }, []);

  return (
    <div className="scroll-indicator">
      <div 
        className="scroll-indicator-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-label={`Page scroll progress: ${Math.round(scrollProgress)}%`}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin="0"
        aria-valuemax="100"
      />
    </div>
  );
}

export default ScrollIndicator;
