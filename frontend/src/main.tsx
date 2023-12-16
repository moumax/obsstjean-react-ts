import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { CurrentEventContextProvider } from '@/contexts/EventContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <CurrentEventContextProvider>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </CurrentEventContextProvider>,
)
