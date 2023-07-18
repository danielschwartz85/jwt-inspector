import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/app.tsx'
import './index.css'
// Might not need all these weights, but is used by default by entire MUI
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
