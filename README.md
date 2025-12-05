# Prueba Técnica - Improving Inc.


Aplicación de gestión de productos desarrollada con React, TypeScript y Vite.

<div align="center">
  <img src="https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.1.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
  <br />
  <img src="https://img.shields.io/badge/TanStack_Query-5.90.12-FF4154?style=for-the-badge&logo=react-query&logoColor=white" alt="TanStack Query" />
  <img src="https://img.shields.io/badge/TanStack_Table-8.21.3-FF4154?style=for-the-badge&logo=react-table&logoColor=white" alt="TanStack Table" />
  <img src="https://img.shields.io/badge/Radix_UI-Latest-161618?style=for-the-badge&logo=radix-ui&logoColor=white" alt="Radix UI" />
  <br />
  <img src="https://img.shields.io/badge/ESLint-9.39.1-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" />
  <img src="https://img.shields.io/badge/pnpm-Latest-F69220?style=for-the-badge&logo=pnpm&logoColor=white" alt="pnpm" />
</div>

## 🚀 Cómo arrancar el proyecto

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Build para producción
pnpm build

# Previsualizar build de producción
pnpm preview
```

## 🏗️ Decisiones Técnicas Importantes

### Arquitectura de Componentes

- **Separación de responsabilidades**: Los componentes UI están en `src/components/ui/`, mientras que los componentes de negocio como `data-table` y `modals` tienen sus propias carpetas.
- **Patrón Controller**: Implementé controladores separados (`data-table.controller.ts`) para manejar la lógica de negocio fuera de los componentes, manteniendo los componentes React enfocados en la presentación.

### Manejo de Estado

- **Custom Hooks**: La lógica reutilizable está encapsulada en hooks personalizados en `src/lib/hooks/`.
- **Providers**: Uso de Context API a través de providers en `src/components/providers/` para estado global cuando es necesario.

### Organización del Código

- **Funciones pequeñas y con responsabilidad única**: Las utilidades están organizadas en `src/lib/utils/` y las columnas de la tabla en `data-table/columns/`.
- **TypeScript**: Tipos centralizados en `src/lib/types/` para garantizar type-safety en toda la aplicación.
- **API Layer**: Capa de abstracción para llamadas API en `src/lib/api/`.

### UI/UX

- **shadcn/ui**: Componentes accesibles y personalizables basados en Radix UI.
- **TailwindCSS**: Estilos utilitarios para desarrollo rápido y consistente.

## 🔧 Qué mejoraría con más tiempo

1. **Tests unitarios**: Añadir tests para los custom hooks y funciones puras en `utils/`.
2. **Tests de integración**: Implementar tests E2E con Playwright o Cypress para flujos críticos.
3. **Paginación del servidor**: Si el dataset crece, implementar paginación server-side en lugar de cargar todos los productos.
4. **Manejo de errores**: Implementar error boundaries y un sistema de notificaciones más robusto.
5. **Optimización de rendimiento**: Implementar virtualización en la tabla para grandes volúmenes de datos.
6. **Accesibilidad**: Auditoría completa de accesibilidad y mejoras según WCAG 2.1.
7. **Documentación**: Añadir Storybook para documentar los componentes UI.
8. **Caché de datos**: Implementar React Query o SWR para caché y revalidación de datos.
9. **Ruteo avanzado**: Añadir rutas protegidas y autenticación si la aplicación lo requiere.

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── data-table/     # Tabla de datos con controlador separado
│   ├── modals/         # Modales de la aplicación
│   ├── providers/      # Context providers
│   ├── sidebar/        # Navegación lateral
│   └── ui/             # Componentes UI reutilizables (shadcn)
├── lib/
│   ├── api/            # Capa de abstracción para APIs
│   ├── controllers/    # Lógica de negocio
│   ├── hooks/          # Custom hooks
│   ├── types/          # Definiciones de TypeScript
│   └── utils/          # Funciones utilitarias
└── pages/              # Páginas de la aplicación
```

## 🛠️ Tecnologías Utilizadas

- **[React 18](https://react.dev/)** - Biblioteca Principal
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safety
- **[Vite](https://vitejs.dev/)** - Bundler y servidor de desarrollo
- **[TailwindCSS](https://tailwindcss.com/)** - Estilos
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes UI
- **[pnpm](https://pnpm.io/)** - Gestor de paquetes
- **[Lucide React](https://lucide.dev/)** - Iconos
- **[TanStack Query](https://tanstack.com/query/latest)** - Manejo de estado y caché de datos
- **[TanStack Table](https://tanstack.com/table/latest)** - Tabla de datos avanzada
