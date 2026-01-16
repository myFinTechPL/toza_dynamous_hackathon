import './styles/App.css'
import Hero from './components/Hero'
import WorkflowSection from './components/WorkflowSection'
import PIVLoop from './components/PIVLoop'
import Footer from './components/Footer'
import ScrollIndicator from './components/ScrollIndicator'

function App() {
  return (
    <div className="app">
      <ScrollIndicator />
      <Hero />
      
      {/* PIV Loop Interactive Demo */}
      <PIVLoop />
      
      {/* Original Workflow Sections */}
      <WorkflowSection 
        title="Tools & Setup"
        content="Built with Kiro CLI, an AI coding agent that transforms natural language into production code. The development environment uses VS Code with GitHub Copilot integration for intelligent code completion. React + Vite provides instant hot module replacement for rapid iteration, while modern CSS with Flexbox and Grid handles all layout needs—no Tailwind, no Bootstrap, just clean, maintainable styles."
        icon="🛠️"
      />
      <WorkflowSection 
        title="Prompting Strategy"
        content="Effective AI collaboration requires specificity. Instead of 'make it look good,' try 'use a dark slate background (#0f172a) with indigo accents (#6366f1) and smooth fade-in animations.' Reference real designs like Stripe's landing page or Linear's interface. Provide concrete examples: 'Add a gradient from purple to pink like Vercel's hero section.' The more specific your prompts, the better the results."
        icon="💬"
        reverse={true}
      />
      <WorkflowSection 
        title="Validation & Iteration"
        content="Manual testing in Chrome DevTools at 375px (mobile), 768px (tablet), and 1440px (desktop) ensures responsive design works everywhere. Test touch targets are at least 44px for mobile usability. Check color contrast ratios meet WCAG AA standards (4.5:1 for text). Run Lighthouse audits targeting 90+ performance scores. Mobile-first CSS with min-width media queries ensures the design scales up gracefully from small screens."
        icon="🔄"
      />
      <Footer />
    </div>
  )
}

export default App
