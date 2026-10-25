import React from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
})

const injectRoot = () => {
  let rootElement = document.getElementById('mal-modern-root')
  if (!rootElement) {
    rootElement = document.createElement('div')
    rootElement.id = 'mal-modern-root'
    document.body.prepend(rootElement)
  }

  const root = createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>
  )
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectRoot)
} else {
  injectRoot()
}