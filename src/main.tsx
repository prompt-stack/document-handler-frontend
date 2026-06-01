import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './AppRouter.tsx'
import { TooltipProvider } from './shadui/components/ui/tooltip.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <TooltipProvider>
        <AppRouter />
      </TooltipProvider>
    </BrowserRouter>
  </StrictMode>
)
