import { createRoot } from 'react-dom/client'
import './index.css'
import './portfolio.css'
import App from './App.jsx'

// StrictMode intentionally removed — portfolio uses imperative DOM animations
// (canvas star field, char-by-char name animation, typed text) that break
// under StrictMode's double-invoke behaviour in development.
createRoot(document.getElementById('root')).render(<App />)
