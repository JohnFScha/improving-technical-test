import { useContext } from "react"
import { ThemeProviderContext } from "@/components/providers/theme-provider.tsx"

/**
 *  Hook personalizado para acceder al contexto del tema.
 * @returns El contexto del tema.
 */
export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}