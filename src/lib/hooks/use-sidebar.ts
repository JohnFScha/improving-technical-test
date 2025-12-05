import { useContext } from "react"
import { SidebarContext } from "@/components/ui/sidebar.tsx"

/**
 * Hook personalizado para acceder al contexto de la barra lateral.
 * @returns El contexto de la barra lateral.
 */
export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}