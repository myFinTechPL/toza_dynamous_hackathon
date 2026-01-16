import { useState, useEffect, useRef } from 'react'
import './PIVLoop.css'

const Tooltip = ({ text, children }) => (
  <div className="tooltip-wrapper">
    {children}
    <div className="tooltip-content">{text}</div>
  </div>
)

const PIVLoop = () => {
  const [task, setTask] = useState('Build a user authentication system with secure login and registration')
  const [requirements, setRequirements] = useState('Users can register with email and password\nUsers can login with valid credentials\nPasswords are hashed and stored securely\nInvalid login attempts show appropriate error messages')
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [currentPhase, setCurrentPhase] = useState('idle')
  const [iteration, setIteration] = useState(0)
  const [maxIterations, setMaxIterations] = useState(5)
  const [history, setHistory] = useState([])
  const [currentPlan, setCurrentPlan] = useState('')
  const [implementationLog, setImplementationLog] = useState([])
  const [validationResults, setValidationResults] = useState([])
  const [status, setStatus] = useState('idle')
  const [elapsedTime, setElapsedTime] = useState(0)
  const [phaseTime, setPhaseTime] = useState(0)
  
  const logRef = useRef(null)
  const iterRef = useRef(0)
  const pausedRef = useRef(false)
  const runningRef = useRef(false)

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [implementationLog])

  useEffect(() => {
    let interval
    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setElapsedTime(p => p + 1)
        setPhaseTime(p => p + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, isPaused])

  useEffect(() => { pausedRef.current = isPaused }, [isPaused])
  useEffect(() => { runningRef.current = isRunning }, [isRunning])

  const formatTime = (s) => Math.floor(s/60) + ':' + (s%60).toString().padStart(2,'0')
  const sleep = (ms) => new Promise(r => setTimeout(r, ms))
  const addHistory = (msg, type) => setHistory(p => [...p, { timestamp: new Date().toLocaleTimeString(), message: msg, type }])

  const runIteration = async (n) => {
    if (pausedRef.current || !runningRef.current || n > maxIterations) {
      if (n > maxIterations) {
        setStatus('completed')
        setIsRunning(false)
        addHistory('Max iterations reached', 'warning')
      }
      return
    }
    iterRef.current = n
    setIteration(n)
    setCurrentPhase('plan')
    setPhaseTime(0)
    await sleep(1200)
    if (pausedRef.current || !runningRef.current) return
    setCurrentPlan(getPlan(n))
    addHistory('Iteration ' + n + ': Planning done', 'info')
    await sleep(1500)
    if (pausedRef.current || !runningRef.current) return
    setCurrentPhase('implement')
    setPhaseTime(0)
    setImplementationLog([])
    await sleep(600)
    const acts = getActions(n)
    for (let i = 0; i < acts.length; i++) {
      if (pausedRef.current || !runningRef.current) return
      const action = acts[i]
      setImplementationLog(currentLog => {
        if (currentLog.includes(action)) return currentLog
        return [...currentLog, action]
      })
      await sleep(700)
    }
    addHistory('Iteration ' + n + ': Implementation done', 'success')
    if (pausedRef.current || !runningRef.current) return
    setCurrentPhase('validate')
    setPhaseTime(0)
    await sleep(1200)
    const val = getValidation(n)
    setValidationResults(val)
    if (val.passed) {
      addHistory('Iteration ' + n + ': All passed!', 'success')
      setStatus('completed')
      setIsRunning(false)
      setCurrentPhase('idle')
      addHistory('PIV Loop complete!', 'success')
    } else {
      addHistory('Iteration ' + n + ': Failed, continuing...', 'error')
      await sleep(1200)
      if (!pausedRef.current && runningRef.current) runIteration(n + 1)
    }
  }

  const startLoop = () => {
    if (task.trim().length < 10 || !requirements.trim()) {
      alert('Enter task (10+ chars) and requirements')
      return
    }
    setIsRunning(true)
    runningRef.current = true
    setIsPaused(false)
    pausedRef.current = false
    setStatus('running')
    setIteration(0)
    iterRef.current = 0
    setHistory([])
    setCurrentPhase('idle')
    setElapsedTime(0)
    setPhaseTime(0)
    setImplementationLog([])
    setValidationResults([])
    setCurrentPlan('')
    addHistory('PIV Loop started', 'info')
    setTimeout(() => runIteration(1), 500)
  }

  const pauseLoop = () => { setIsPaused(true); pausedRef.current = true; setStatus('paused'); addHistory('Paused', 'warning') }
  const resumeLoop = () => { setIsPaused(false); pausedRef.current = false; setStatus('running'); addHistory('Resumed', 'info'); runIteration(iterRef.current) }
  const stopLoop = () => { setIsRunning(false); runningRef.current = false; setIsPaused(false); setStatus('idle'); setCurrentPhase('idle'); addHistory('Stopped', 'error') }
  const resetLoop = () => { setIsRunning(false); runningRef.current = false; setIsPaused(false); setStatus('idle'); setCurrentPhase('idle'); setIteration(0); setHistory([]); setCurrentPlan(''); setImplementationLog([]); setValidationResults([]); setElapsedTime(0); setPhaseTime(0) }

  const getPlan = (n) => {
    const plans = {
      1: 'ITERATION 1: Initial Setup\n\nTask: Build auth system\n\nStrategy:\n1. [Skill: Shards] Create worktree\n2. [MCP: aws-docs] Research patterns\n3. [Agent: Kiro] Setup structure\n4. [Sub-Agent: type-analyzer] Design models\n\nGaps: Security, error handling',
      2: 'ITERATION 2: Security Layer\n\nPrevious: Login works, Plain passwords\n\nStrategy:\n1. [MCP: security-scanner] Audit\n2. [Skill: crypto-helper] Bcrypt\n3. [Agent: Kiro] JWT tokens\n4. [Sub-Agent: test-analyzer] Tests',
      3: 'ITERATION 3: Error Handling\n\nPrevious: Hashed, Cryptic errors\n\nStrategy:\n1. [Sub-Agent: error-hunter] Find issues\n2. [MCP: sentry-docs] Patterns\n3. [Agent: Kiro] Friendly messages',
      4: 'ITERATION 4: Hardening\n\nPrevious: Errors handled, No rate limit\n\nStrategy:\n1. [MCP: owasp-scanner] Audit\n2. [Skill: rate-limiter] Throttle\n3. [Agent: Kiro] CSRF protection',
      5: 'ITERATION 5: Final Polish\n\nPrevious: Hardened, Final check\n\nStrategy:\n1. [MCP: coverage-reporter] Coverage\n2. [MCP: lighthouse] Performance\n3. [Hook: pre-deploy] Checks'
    }
    return plans[n] || plans[5]
  }

  const getActions = (n) => {
    const actions = {
      1: ['[Agent: Kiro] Initializing...', '[MCP: aws-docs] Fetching best practices...', '[Skill: Shards] Creating worktree: feature-auth', '[Sub-Agent: code-reviewer] Scanning codebase...', '[Hook: pre-install] Checking deps...', '[Agent: Kiro] Installing bcrypt, jwt...', '[MCP: filesystem] Creating User.js', '[MCP: filesystem] Creating auth.js', '[Hook: post-create] Linting...', '[Sub-Agent: type-analyzer] Checking types...', '[Agent: Kiro] Structure done!'],
      2: ['[Agent: Kiro] Security phase...', '[Sub-Agent: code-reviewer] Reviewing code...', '[MCP: security-scanner] Scanning...', '[Skill: crypto-helper] Bcrypt (10 rounds)', '[Sub-Agent: test-analyzer] Test cases...', '[MCP: filesystem] Creating validateAuth.js', '[Hook: on-save] Formatting...', '[Agent: Kiro] JWT with 24h expiry', '[Sub-Agent: comment-analyzer] Docs check...', '[MCP: npm-registry] Package audit...', '[Agent: Kiro] Security done!'],
      3: ['[Agent: Kiro] Error handling...', '[Sub-Agent: error-hunter] Finding exceptions...', '[MCP: sentry-docs] Error patterns...', '[Skill: error-patterns] Central handler', '[MCP: filesystem] Creating errorHandler.js', '[Hook: pre-commit] Validating...', '[Sub-Agent: code-simplifier] Simplifying...', '[Agent: Kiro] Friendly messages', '[Sub-Agent: test-analyzer] Unit tests...', '[MCP: jest-runner] 12 passed!', '[Agent: Kiro] Errors handled!'],
      4: ['[Agent: Kiro] Hardening...', '[MCP: owasp-scanner] Security audit...', '[Sub-Agent: code-reviewer] Deep review...', '[Skill: rate-limiter] 5 req/15min', '[Hook: security-check] Checking secrets...', '[MCP: filesystem] Security headers', '[Sub-Agent: type-analyzer] Token types...', '[Agent: Kiro] CSRF protection', '[MCP: redis-docs] Session config...', '[Sub-Agent: test-analyzer] 24 passed!', '[Agent: Kiro] Fort Knox!'],
      5: ['[Agent: Kiro] Final validation...', '[MCP: coverage-reporter] 94%!', '[Sub-Agent: code-reviewer] Ship it!', '[Sub-Agent: comment-analyzer] Docs verified', '[Skill: test-runner] 47/47 passed', '[Hook: pre-deploy] Build checks...', '[MCP: lighthouse] Score: 96/100', '[Sub-Agent: type-analyzer] Types clear!', '[MCP: bundle-analyzer] 42kb', '[Agent: Kiro] Production ready!', '[Hook: notify-slack] Notifying team...']
    }
    return actions[n] || actions[5]
  }

  const getValidation = (n) => {
    const validations = {
      1: { passed: false, checks: [{name:'Register',passed:true},{name:'Login',passed:true},{name:'Hashed',passed:false},{name:'Errors',passed:false}], message: 'Core works, security needed' },
      2: { passed: false, checks: [{name:'Register',passed:true},{name:'Login',passed:true},{name:'Hashed',passed:true},{name:'Errors',passed:false}], message: 'Security done, errors needed' },
      3: { passed: false, checks: [{name:'Register',passed:true},{name:'Login',passed:true},{name:'Hashed',passed:true},{name:'Errors',passed:true},{name:'Rate limit',passed:false}], message: 'Errors done, hardening needed' },
      4: { passed: false, checks: [{name:'Register',passed:true},{name:'Login',passed:true},{name:'Hashed',passed:true},{name:'Errors',passed:true},{name:'Rate limit',passed:true},{name:'Sessions',passed:false}], message: 'Almost there! Final polish' },
      5: { passed: true, checks: [{name:'Register',passed:true},{name:'Login',passed:true},{name:'Hashed',passed:true},{name:'Errors',passed:true},{name:'Rate limit',passed:true},{name:'Sessions',passed:true},{name:'Coverage',passed:true}], message: 'All passed! Production ready!' }
    }
    return validations[n] || validations[5]
  }

  const exportResults = () => {
    const r = { task, requirements, iterations: iteration, status, history, timestamp: new Date().toISOString() }
    const b = new Blob([JSON.stringify(r, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(b)
    a.download = 'piv-results-' + Date.now() + '.json'
    a.click()
  }

  // Get active component from last log entry
  const getActiveComponent = () => {
    if (!implementationLog.length) return null
    const lastLog = implementationLog[implementationLog.length - 1]
    // Match patterns like [Agent: Kiro], [MCP: aws-docs], [Skill: Shards], [Hook: pre-install], [Sub-Agent: code-reviewer]
    const match = lastLog.match(/\[(Agent|Sub-Agent|MCP|Skill|Hook): ([^\]]+)\]/)
    if (match) return { type: match[1], name: match[2] }
    return null
  }

  const activeComponent = getActiveComponent()

  const isActive = (type, name) => {
    if (!activeComponent) return false
    // Map Sub-Agent to agent type for highlighting
    const typeMap = { 'Agent': 'agent', 'Sub-Agent': 'agent', 'MCP': 'mcp', 'Skill': 'skill', 'Hook': 'hook' }
    return typeMap[activeComponent.type] === type && activeComponent.name === name
  }

  return (
    <div className="piv-loop">
      <div className="piv-header">
        <h2>PIV Loop Interactive Demo</h2>
        <p>Experience the Plan-Implement-Validate cycle in action</p>
      </div>
      <div className="piv-grid">
        <div className="piv-card input-section">
          <h3>Task Definition</h3>
          <Tooltip text="Describe what you want to build. Be specific!">
            <textarea placeholder="Task (min 10 chars)" value={task} onChange={e=>setTask(e.target.value)} disabled={isRunning} rows={3} />
          </Tooltip>
          <Tooltip text="Define success conditions checked each iteration.">
            <textarea placeholder="Acceptance criteria" value={requirements} onChange={e=>setRequirements(e.target.value)} disabled={isRunning} rows={3} />
          </Tooltip>
          <div className="input-controls">
            <Tooltip text="Safety limit to prevent infinite loops.">
              <label>Max Iterations: <input type="number" min="1" max="10" value={maxIterations} onChange={e=>setMaxIterations(parseInt(e.target.value))} disabled={isRunning} /></label>
            </Tooltip>
          </div>
        </div>
        <div className="piv-card visualization">
          <h3>Loop Status</h3>
          <div className="phase-indicator">
            <div className={'phase ' + (currentPhase==='plan'?'active':'')}><span className="phase-icon">P</span><span>Plan</span></div>
            <div className="arrow">-</div>
            <div className={'phase ' + (currentPhase==='implement'?'active':'')}><span className="phase-icon">I</span><span>Implement</span></div>
            <div className="arrow">-</div>
            <div className={'phase ' + (currentPhase==='validate'?'active':'')}><span className="phase-icon">V</span><span>Validate</span></div>
          </div>
          <div className="status-info">
            <div className="status-badge" data-status={status}>
              {status==='running' && 'RUNNING'}
              {status==='paused' && 'PAUSED'}
              {status==='completed' && 'DONE'}
              {status==='failed' && 'FAILED'}
              {status==='idle' && 'IDLE'}
            </div>
            <div className={'iteration-counter ' + (iteration>=maxIterations*0.7?'warning':'')}>Iteration: {iteration}/{maxIterations}</div>
          </div>
          <div className="time-display">
            <div>Total: {formatTime(elapsedTime)}</div>
            <div>Phase: {formatTime(phaseTime)}</div>
          </div>
        </div>
        <div className="piv-card controls">
          <h3>Controls</h3>
          <div className="control-buttons">
            {!isRunning ? (
              <button className="btn btn-start" onClick={startLoop}>Start</button>
            ) : (
              <>
                {!isPaused ? (
                  <button className="btn btn-pause" onClick={pauseLoop}>Pause</button>
                ) : (
                  <button className="btn btn-resume" onClick={resumeLoop}>Resume</button>
                )}
                <button className="btn btn-stop" onClick={stopLoop}>Stop</button>
              </>
            )}
            <button className="btn btn-reset" onClick={resetLoop} disabled={isRunning && !isPaused}>Reset</button>
            <button className="btn btn-export" onClick={exportResults} disabled={!history.length}>Export</button>
          </div>
        </div>
        <div className="piv-card plan-display">
          <h3>Current Plan</h3>
          <div className="plan-content">
            {currentPlan ? <pre>{currentPlan}</pre> : <p className="placeholder">Plan appears here...</p>}
          </div>
        </div>
        <div className="piv-card implementation-log">
          <h3>Implementation Log</h3>
          <div className="log-content" ref={logRef}>
            {implementationLog.length ? implementationLog.map((l,i)=><div key={i} className="log-entry">{l}</div>) : <p className="placeholder">Actions appear here...</p>}
          </div>
        </div>
        <div className="piv-card validation-results">
          <h3>Validation Results</h3>
          <div className="validation-content">
            {validationResults.checks ? (
              <>
                {validationResults.checks.map((c,i)=><div key={i} className={'validation-check ' + (c.passed?'passed':'failed')}><span className="check-icon">{c.passed?'OK':'X'}</span><span>{c.name}</span></div>)}
                <div className={'validation-message ' + (validationResults.passed?'success':'warning')}>{validationResults.message}</div>
              </>
            ) : <p className="placeholder">Results appear here...</p>}
          </div>
        </div>
        <div className="piv-card components-panel">
          <h3>Active Components</h3>
          <p className="components-subtitle">Watch components light up as they are used in the simulation</p>
          <div className="components-grid">
            <div className="component-section">
              <h4>Agents</h4>
              <div className="component-list">
                <span className={'component-tag agent' + (isActive('agent', 'code-reviewer') ? ' active' : '')}>code-reviewer</span>
                <span className={'component-tag agent' + (isActive('agent', 'type-analyzer') ? ' active' : '')}>type-analyzer</span>
                <span className={'component-tag agent' + (isActive('agent', 'test-analyzer') ? ' active' : '')}>test-analyzer</span>
                <span className={'component-tag agent' + (isActive('agent', 'error-hunter') ? ' active' : '')}>error-hunter</span>
                <span className={'component-tag agent' + (isActive('agent', 'code-simplifier') ? ' active' : '')}>code-simplifier</span>
                <span className={'component-tag agent' + (isActive('agent', 'comment-analyzer') ? ' active' : '')}>comment-analyzer</span>
              </div>
            </div>
            <div className="component-section">
              <h4>MCPs</h4>
              <div className="component-list">
                <span className={'component-tag mcp' + (isActive('mcp', 'aws-docs') ? ' active' : '')}>aws-docs</span>
                <span className={'component-tag mcp' + (isActive('mcp', 'filesystem') ? ' active' : '')}>filesystem</span>
                <span className={'component-tag mcp' + (isActive('mcp', 'security-scanner') ? ' active' : '')}>security-scanner</span>
                <span className={'component-tag mcp' + (isActive('mcp', 'npm-registry') ? ' active' : '')}>npm-registry</span>
                <span className={'component-tag mcp' + (isActive('mcp', 'sentry-docs') ? ' active' : '')}>sentry-docs</span>
                <span className={'component-tag mcp' + (isActive('mcp', 'jest-runner') ? ' active' : '')}>jest-runner</span>
                <span className={'component-tag mcp' + (isActive('mcp', 'owasp-scanner') ? ' active' : '')}>owasp-scanner</span>
                <span className={'component-tag mcp' + (isActive('mcp', 'redis-docs') ? ' active' : '')}>redis-docs</span>
                <span className={'component-tag mcp' + (isActive('mcp', 'coverage-reporter') ? ' active' : '')}>coverage-reporter</span>
                <span className={'component-tag mcp' + (isActive('mcp', 'lighthouse') ? ' active' : '')}>lighthouse</span>
                <span className={'component-tag mcp' + (isActive('mcp', 'bundle-analyzer') ? ' active' : '')}>bundle-analyzer</span>
              </div>
            </div>
            <div className="component-section">
              <h4>Skills</h4>
              <div className="component-list">
                <span className={'component-tag skill' + (isActive('skill', 'crypto-helper') ? ' active' : '')}>crypto-helper</span>
                <span className={'component-tag skill' + (isActive('skill', 'error-patterns') ? ' active' : '')}>error-patterns</span>
                <span className={'component-tag skill' + (isActive('skill', 'rate-limiter') ? ' active' : '')}>rate-limiter</span>
                <span className={'component-tag skill' + (isActive('skill', 'test-runner') ? ' active' : '')}>test-runner</span>
              </div>
            </div>
            <div className="component-section">
              <h4>Hooks</h4>
              <div className="component-list">
                <span className={'component-tag hook' + (isActive('hook', 'pre-install') ? ' active' : '')}>pre-install</span>
                <span className={'component-tag hook' + (isActive('hook', 'post-create') ? ' active' : '')}>post-create</span>
                <span className={'component-tag hook' + (isActive('hook', 'on-save') ? ' active' : '')}>on-save</span>
                <span className={'component-tag hook' + (isActive('hook', 'pre-commit') ? ' active' : '')}>pre-commit</span>
                <span className={'component-tag hook' + (isActive('hook', 'security-check') ? ' active' : '')}>security-check</span>
                <span className={'component-tag hook' + (isActive('hook', 'pre-deploy') ? ' active' : '')}>pre-deploy</span>
                <span className={'component-tag hook' + (isActive('hook', 'notify-slack') ? ' active' : '')}>notify-slack</span>
              </div>
            </div>
          </div>
        </div>
        <div className="piv-card history">
          <h3>History</h3>
          <div className="history-content">
            {history.length ? history.map((e,i)=><div key={i} className={'history-entry ' + e.type}><span className="timestamp">{e.timestamp}</span><span className="message">{e.message}</span></div>) : <p className="placeholder">History appears here...</p>}
          </div>
        </div>
      </div>
      <div className="piv-footer">
        <p><strong>Exit:</strong> All pass | Max iterations | Error | User stop</p>
      </div>
    </div>
  )
}

export default PIVLoop
