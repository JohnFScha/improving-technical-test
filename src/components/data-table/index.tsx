import { flexRender, type ColumnDef } from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { DataTableController } from "./data-table.controller.ts"
import { DataTableViewOptions } from "./utils/data-table-column-toggle.tsx"
import { DataTablePagination } from "./utils/data-table-pagination.tsx"
import type { GlobalFilterConfig } from "@/lib/types/index.ts"
import { DataTableFilters } from "./utils/data-table-filters.tsx"

export interface DataTableControllerProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  globalFilterConfig?: GlobalFilterConfig; // Global filter configuration
}

/**
 * Componente de tabla de datos que utiliza DataTableController para manejar la logica de la tabla.
 * @param data - Los datos a mostrar en la tabla
 * @param columns - La configuracion de las columnas de la tabla
 * @returns Una tabla de datos con funcionalidades de filtrado, ordenacion y paginacion
 */
export function DataTable<TData, TValue>({ data, columns, globalFilterConfig }: DataTableControllerProps<TData, TValue>) {
  const { table } = DataTableController({ data, columns, globalFilterConfig })

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4 relative">
        <DataTableFilters table={table} columns={columns} globalFilterConfig={globalFilterConfig} />
        <DataTableViewOptions table={table} />
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} align="center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} align="center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No hay productos.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} />
    </div>
  )
}