import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Headeroverlay from './file.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
    <Headeroverlay />
    <App />
  </React.StrictMode>,
)
