import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App.tsx'

const root = document.getElementById('root')!
const app = (
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>
)

if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  // The development HTML is rendered on the client.
  createRoot(root).render(app)
}
