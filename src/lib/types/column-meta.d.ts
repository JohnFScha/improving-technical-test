import '@tanstack/react-table';

// Module augmentation para agregar metadatos personalizados a las columnas de la tabla
declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> {
    title?: string
  }
}