import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// 1. Create a modern mount point for our React UI
const rootElement = document.createElement('div');
rootElement.id = 'mal-modern-root';
rootElement.style.minHeight = '100vh';
rootElement.style.backgroundColor = '#0f1117'; // mal-dark
rootElement.style.color = 'white';

// 2. Wait for the body to be available, then inject
const injectReact = () => {
  if (document.body) {
    document.body.appendChild(rootElement);
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } else {
    requestAnimationFrame(injectReact);
  }
};

injectReact();