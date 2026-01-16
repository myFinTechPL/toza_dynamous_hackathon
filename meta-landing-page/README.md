# Meta Landing Page - PIV Loop Demo

An interactive demonstration of the **PIV Loop** (Plan-Implement-Validate) - the iterative AI development cycle. This single-page React application showcases how AI coding agents systematically work through complex tasks by continuously planning, implementing, and validating until all requirements are met.

## 🎯 Project Overview

This landing page features an **interactive PIV Loop simulator** that demonstrates:

- **Plan Phase**: AI reasoning and strategy formulation
- **Implement Phase**: Real-time action execution and code changes
- **Validate Phase**: Requirement verification and pass/fail checks
- **Iterative Refinement**: Continuous improvement until success

Built with React + Vite, it features:

- **Interactive Demo**: Fully functional PIV Loop simulator with controls
- **Real-time Visualization**: Watch the loop progress through phases
- **Modern React Architecture**: Component-based design with hooks
- **Responsive Design**: Fully responsive across all devices
- **Smooth Animations**: Phase transitions and scroll effects
- **Zero Dependencies**: No external UI libraries - pure React and CSS

## 🔄 PIV Loop Features

### User Input Section
- Task/goal description text area
- Requirements field for acceptance criteria
- Max iterations setting to prevent infinite loops
- Start button to initiate the loop

### Loop Visualization
- Current phase indicator (Plan → Implement → Validate)
- Iteration counter showing progress
- Status badges (running, paused, completed, failed)
- Animated phase transitions

### Plan Display
- AI reasoning for current step
- Planned actions before execution
- Strategy breakdown

### Implementation Log
- Real-time output of actions
- Code changes and file modifications
- Tool calls and results
- Auto-scrolling log view

### Validation Results
- Pass/Fail status for each check
- Error messages with context
- Comparison of actual vs expected results
- Visual feedback with color coding

### Controls
- Pause/Resume functionality
- Stop button to halt execution
- Reset to start over
- Export results as JSON

### History & State
- Complete log of all iterations
- Timestamped entries
- Color-coded by type (info, success, warning, error)
- Export capability for analysis

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm installed
- A modern web browser

### Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   Navigate to `http://localhost:5173` (or the port shown in terminal)

4. **Try the PIV Loop**:
   - Enter a task like "Build a user authentication system"
   - Add requirements like "Users can register, login, and logout securely"
   - Click "Start Loop" and watch it work!

### Build for Production

Generate optimized production files:

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

Test the production build locally:

```bash
npm run preview
```

## 📦 Deployment

This project is optimized for deployment to free static hosting platforms. Choose your preferred platform:

### Deploy to Netlify

#### Option 1: Netlify CLI

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Build and deploy**:
   ```bash
   npm run build
   netlify deploy --prod
   ```

3. **Follow prompts**:
   - Choose "Create & configure a new site"
   - Publish directory: `dist`

#### Option 2: Netlify Web UI

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy via Netlify Dashboard**:
   - Go to [netlify.com](https://www.netlify.com/)
   - Drag and drop the `dist` folder
   - Your site is live!

#### Option 3: Git Integration

1. **Push to GitHub/GitLab/Bitbucket**

2. **Connect to Netlify**:
   - Go to [netlify.com](https://www.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Connect your repository

3. **Configure build settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 18 or higher

4. **Deploy**: Netlify will automatically build and deploy on every push

### Deploy to Render

#### Option 1: Render Web UI

1. **Push to GitHub/GitLab**

2. **Create new Static Site**:
   - Go to [render.com](https://render.com/)
   - Click "New" → "Static Site"
   - Connect your repository

3. **Configure build settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Auto-Deploy**: Yes (optional)

4. **Deploy**: Render will build and deploy your site

#### Option 2: render.yaml Configuration

Create a `render.yaml` file in your project root:

```yaml
services:
  - type: web
    name: meta-landing-page
    env: static
    buildCommand: npm install && npm run build
    staticPublishPath: ./dist
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

Then connect your repository to Render and it will automatically detect the configuration.

## 🛠️ Technology Stack

- **React 18**: Modern React with hooks and state management
- **Vite 5**: Next-generation frontend tooling
- **CSS3**: Modern CSS with custom properties, flexbox, and grid
- **Intersection Observer API**: Scroll-triggered animations

## 📁 Project Structure

```
meta-landing-page/
├── src/
│   ├── App.jsx                    # Main application component
│   ├── main.jsx                   # Vite entry point
│   ├── components/
│   │   ├── Hero.jsx              # Hero section
│   │   ├── PIVLoop.jsx           # Interactive PIV Loop demo
│   │   ├── WorkflowSection.jsx   # Reusable workflow content
│   │   ├── Footer.jsx            # Footer with credits
│   │   └── ScrollIndicator.jsx   # Scroll progress bar
│   └── styles/
│       ├── App.css               # Global styles
│       ├── index.css             # Base styles
│       └── PIVLoop.css           # PIV Loop component styles
├── public/                        # Static assets
├── index.html                     # HTML entry point
├── package.json                   # Dependencies and scripts
├── vite.config.js                # Vite configuration
└── README.md                      # This file
```

## 🎨 Features

### PIV Loop Interactive Demo
- **Real-time simulation**: Watch the Plan-Implement-Validate cycle in action
- **User controls**: Start, pause, resume, stop, and reset
- **Phase visualization**: Animated indicators for current phase
- **Implementation logging**: See actions as they happen
- **Validation feedback**: Pass/fail checks with detailed results
- **History tracking**: Complete audit trail of all iterations
- **Export functionality**: Download results as JSON

### Visual Design
- Cohesive color palette with complementary colors
- Clear typography hierarchy
- Smooth transitions and hover effects
- Responsive layout across all devices
- Gradient backgrounds and animated elements

### Content Sections
- **Hero**: Introduction to PIV Loop concept
- **PIV Loop Demo**: Interactive simulator
- **Tools & Setup**: AI coding agents and IDE configuration
- **Prompting Strategy**: Techniques for effective AI prompting
- **Validation & Iteration**: Testing and refinement process
- **Footer**: Credits and links

### Animations
- Fade-in animations on scroll
- Phase transition animations
- Smooth scroll progress indicator
- Interactive hover effects
- Real-time log updates

## 🔑 Key Validation Rules

The PIV Loop exits when:
- ✅ All requirements pass validation
- ⚠️ Max iterations reached
- ❌ Unrecoverable error occurs
- 🛑 User manually stops the process

## 🧪 Testing

This project uses manual testing for rapid development:

- **Browser DevTools**: Test responsive layouts at different breakpoints
- **Cross-browser**: Verify in Chrome, Firefox, and Safari
- **Mobile devices**: Test on actual devices or emulators
- **Lighthouse**: Check performance, accessibility, and SEO scores

## 📝 Development Notes

### AI-Assisted Development
This project demonstrates the **PIV Loop methodology**:
- **Plan**: AI analyzes requirements and formulates strategy
- **Implement**: Execute planned actions with real-time feedback
- **Validate**: Check results against acceptance criteria
- **Iterate**: Refine until all requirements pass

The interactive demo shows how AI coding agents work systematically through complex tasks.

### Design Decisions
- **No UI libraries**: Keeps bundle size minimal and deployment simple
- **No routing**: Single-page design for simplicity
- **No backend**: Static site for free hosting compatibility
- **Interactive demo**: Educational tool for understanding AI workflows
- **Real-time feedback**: Simulates actual AI agent behavior

## 🤝 Contributing

This is a demonstration project, but feel free to:
- Fork and customize for your own use
- Use as a template for similar projects
- Learn from the AI-assisted development approach

## 📄 License

MIT License - feel free to use this project as a template or learning resource.

## 🔗 Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Netlify Documentation](https://docs.netlify.com/)
- [Render Documentation](https://render.com/docs)

---

**Built with the PIV Loop** | Interactive AI Development Demo | Zero configuration required
