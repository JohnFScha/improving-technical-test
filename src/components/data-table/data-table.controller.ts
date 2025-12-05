import * as React from "react";
import {
  type ColumnFiltersState,
  type Row,
  type SortingState,
  type VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { DataTableControllerProps } from "./index.tsx";

/**
 * Controlador para la tabla de datos que maneja el estado y la configuracion de la tabla utilizando React Table.
 * @param data Los datos a mostrar en la tabla
 * @param columns La configuracion de las columnas de la tabla
 * @returns El objeto de la tabla configurado con React Table
 */
export const DataTableController = <TData, TValue>({ data, columns, globalFilterConfig }: DataTableControllerProps<TData, TValue>) => {
  // Inicializacion del estado de la tabla
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState<string>("");

  // Funcion de filtrado global personalizada
  const globalFilterFn = React.useCallback(
    (row: Row<TData>, _columnId: string, filterValue: string) => {
      if (!globalFilterConfig?.enabled || !filterValue) return true;

      const searchValue = filterValue.toLowerCase();
      const columnsToSearch = globalFilterConfig.columnIds;

      // Verifica si alguna de las columnas especificadas contiene el valor de búsqueda
      return columnsToSearch.some((colId) => {
        // Encuentra la definición de la columna
        const columnDef = columns.find((col) => col.id === colId);

        // Si la columna tiene una función de filtro personalizada, úsala (solo si es invocable)
        if (columnDef?.filterFn) {
          // La opción FilterFn puede ser una cadena como "auto" o una función; protege antes de llamar.
          if (typeof columnDef.filterFn === "function") {
            return columnDef.filterFn(row, colId, searchValue, () => true);
          }
          // Si no es una función (por ejemplo, "auto"), continúa con el comportamiento predeterminado.
        }

        // De lo contrario, usa la lógica de filtro predeterminada
        const cellValue = row.getValue(colId);
        if (cellValue == null) return false;
        return String(cellValue).toLowerCase().includes(searchValue);
      });
    },
    [globalFilterConfig, columns]
  );

  // Configuracion de la tabla con React Table
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    globalFilterFn: globalFilterFn,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  return { table };
};
