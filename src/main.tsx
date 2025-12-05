// apis de react
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// proveedores de contexto
import { ThemeProvider } from './components/providers/theme-provider.tsx'
import { QueryProvider } from './components/providers/query-provider.tsx'

// estilos globales
import './index.css'

// componente raíz de la aplicación
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </QueryProvider>
  </StrictMode>,
)
