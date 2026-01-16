import { useEffect, useRef, useState } from 'react';
import './WorkflowSection.css';

function WorkflowSection({ title, content, icon, reverse = false }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`workflow-section ${isVisible ? 'visible' : ''} ${reverse ? 'reverse' : ''}`}
    >
      <div className="workflow-section-container container">
        <div className="workflow-section-icon">
          <span className="icon-display">{icon}</span>
        </div>
        <div className="workflow-section-content">
          <h2 className="workflow-section-title">{title}</h2>
          <div className="workflow-section-text">{content}</div>
        </div>
      </div>
    </section>
  );
}

export default WorkflowSection;
