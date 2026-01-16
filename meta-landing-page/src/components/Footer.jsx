import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content container">
        <div className="footer-section">
          <h3 className="footer-heading">Built With</h3>
          <ul className="footer-list">
            <li>React 18 + Vite 5</li>
            <li>Kiro CLI (AI-assisted development)</li>
            <li>Modern CSS (Flexbox, Grid, Animations)</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-heading">Resources</h3>
          <ul className="footer-list">
            <li>
              <a 
                href="https://github.com/yourusername/meta-landing-page" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-link"
              >
                GitHub Repository
              </a>
            </li>
            <li>
              <a 
                href="https://vitejs.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-link"
              >
                Vite Documentation
              </a>
            </li>
            <li>
              <a 
                href="https://react.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-link"
              >
                React Documentation
              </a>
            </li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-heading">About</h3>
          <p className="footer-text">
            This landing page was created as a demonstration of AI-assisted frontend development. 
            Built in under an hour using iterative prompting and rapid prototyping techniques.
          </p>
        </div>
      </div>
      
      <div className="footer-bottom container">
        <p className="footer-copyright">
          © {new Date().getFullYear()} Meta Landing Page. Created with AI collaboration.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
