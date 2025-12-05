import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Instaciamos el cliente de React Query
// Para ahorrar recursos de red, deshabilitamos el reintento automático y la refetch al enfocar la ventana
// Estas opciones pueden ajustarse a nivel de query individual si es necesario
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    }
  }
})

/**
 * Componente proveedor para React Query
 * Usa el cliente de React Query para envolver la aplicación
 * @returns El proveedor de React Query que envuelve la aplicación
 */
export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* React Query Devtools para facilitar el desarrollo */}
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" position="right" />
    </QueryClientProvider>
  )
}