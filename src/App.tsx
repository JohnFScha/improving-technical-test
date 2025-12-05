
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { ProductsPage } from "./pages/productos.tsx";
import { ThemeToggler } from "./components/sidebar/toggle-mode.tsx";

/**
 * Componente de la aplicación que envuelve el contenido con un layout de barra lateral.
 * @returns El componente de la aplicación.
 */
export default function App() {

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 w-full">
          <div className="flex items-center justify-between gap-2 px-4 w-full">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <h1 className="text-lg font-medium">Productos</h1>
            </div>
            <ThemeToggler />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-5">
          <ProductsPage />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}