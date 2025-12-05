import type { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Trash } from "lucide-react";
import type { DataTableColumn, GlobalFilterConfig } from "@/lib/types";
import React, { useMemo, useCallback } from "react";

interface DataTableFiltersProps<TData, TValue> {
  table: Table<TData>;
  columns: DataTableColumn<TData, TValue>[];
  globalFilterConfig?: GlobalFilterConfig;
}

/**
 * Componente de filtro de texto para la tabla de datos.
 * @param value El valor actual del filtro
 * @param onChange La funcion para actualizar el valor del filtro
 * @param placeholder El placeholder para el input del filtro
 * @returns El componente de filtro de texto
 */
const TextFilter = React.memo(function TextFilter({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <Search className="absolute size-4 left-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
      <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="pl-9" />
    </div>
  );
});

/**
 * Componente de filtro numerico para la tabla de datos.
 * @param value El valor actual del filtro
 * @param onChange La funcion para actualizar el valor del filtro
 * @param placeholder El placeholder para el input del filtro
 * @returns El componente de filtro numerico
 */
const NumberFilter = React.memo(function NumberFilter({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return <Input type="number" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />;
});

/**
 * Componente de filtro de seleccion para la tabla de datos.
 * @param value El valor actual del filtro
 * @param onChange La funcion para actualizar el valor del filtro
 * @param placeholder El placeholder para el select del filtro
 * @param options Las opciones para el select del filtro
 * @returns El componente de filtro de selecciones
 */
const SelectFilter = React.memo(function SelectFilter({
  value,
  onChange,
  placeholder,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  options?: { value: string; label: string }[];
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="min-w-[200px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Todos</SelectItem>
        {options?.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
});

/**
 * Componente de filtro booleano para la tabla de datos.
 * @param value El valor actual del filtro
 * @param onChange La funcion para actualizar el valor del filtro
 * @param placeholder El placeholder para el select del filtro
 * @returns El componente de filtro booleano
 */
const BooleanFilter = React.memo(function BooleanFilter({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="max-w-[200px]">
        <SelectValue placeholder={placeholder}>
          {value === "" || value === "all" ? "Todos" : value === "true" ? "Activos" : "Inactivos"}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Todos</SelectItem>
        <SelectItem value="true">Activos</SelectItem>
        <SelectItem value="false">Inactivos</SelectItem>
      </SelectContent>
    </Select>
  );
});

/**
 * Componente de filtros para la tabla de datos que permite filtrar los datos en base a las configuraciones de filtro definidas en las columnas.
 * Soporta filtros de texto, seleccion, numero y booleano.
 * @param table La instancia de la tabla de datos
 * @param columns Las columnas de la tabla de datos
 * @param globalFilterConfig La configuracion del filtro global
 * @returns El componente de filtros de la tabla de datos
 */
export function DataTableFilters<TData, TValue>({ table, columns, globalFilterConfig }: DataTableFiltersProps<TData, TValue>) {
  // Memorizar columnas filtrables
  const filterableColumns = useMemo(() => columns.filter((column) => column.filterConfig), [columns]);

  // Separar columnas con filtros de texto de las que no cuando la busqueda global esta habilitada
  const nonTextFilterColumns = useMemo(() => {
    if (!globalFilterConfig?.enabled) return filterableColumns;

    // Solo mostrar filtros que no sean de texto cuando la busqueda global esta habilitada
    return filterableColumns.filter(
      (column) => column.filterConfig?.type !== "text" && column.filterConfig?.type !== "number"
    );
  }, [filterableColumns, globalFilterConfig]);

  // Columnas con filtros de texto/número que serán reemplazadas por la búsqueda global
  const textFilterColumns = useMemo(() => {
    return filterableColumns.filter(
      (column) => column.filterConfig?.type === "text" || column.filterConfig?.type === "number"
    );
  }, [filterableColumns]);

  // Valor del filtro global
  const globalFilterValue = (table.getState().globalFilter as string) ?? "";

  // Mostrar búsqueda global si está habilitada y hay columnas de texto/número
  const showGlobalFilter = globalFilterConfig?.enabled && textFilterColumns.length > 0;

  // Mostrar filtros individuales (todos los filtros si la búsqueda global está deshabilitada, o solo los no textuales si está habilitada)
  const columnsToRender = globalFilterConfig?.enabled ? nonTextFilterColumns : filterableColumns;

  // Memorizar renderFilter
  const renderFilter = useCallback(
    (column: DataTableColumn<TData, TValue>) => {
      const { filterConfig } = column;
      if (!filterConfig || !column.id) return null;

      const columnId = column.id as string;
      const currentValue = (table.getColumn(columnId)?.getFilterValue() as string) ?? "";

      switch (filterConfig.type) {
        case "text":
          return (
            <TextFilter
              key={columnId}
              value={currentValue}
              onChange={(v) => table.getColumn(columnId)?.setFilterValue(v)}
              placeholder={filterConfig.placeholder || `Filter ${columnId}...`}
            />
          );
        case "select":
          return (
            <SelectFilter
              key={columnId}
              value={currentValue}
              onChange={(v) => table.getColumn(columnId)?.setFilterValue(v === "all" ? "" : v)}
              placeholder={filterConfig.placeholder || `Select ${columnId}...`}
              options={filterConfig.options}
            />
          );
        case "number":
          return (
            <NumberFilter
              key={columnId}
              value={currentValue}
              onChange={(v) => table.getColumn(columnId)?.setFilterValue(v)}
              placeholder={filterConfig.placeholder || `Filter ${columnId}...`}
            />
          );
        case "boolean":
          return (
            <BooleanFilter
              key={columnId}
              value={currentValue === "" ? "all" : String(currentValue) === "true" ? "true" : "false"}
              onChange={(v) =>
                table.getColumn(columnId)?.setFilterValue(v === "all" ? "" : v === "true" ? true : false)
              }
              placeholder={filterConfig.placeholder || `Select ${columnId}...`}
            />
          );
        default:
          return null;
      }
    },
    [table]
  );

  // Memorizar clearAllFilters
  const clearAllFilters = useCallback(() => {
    filterableColumns.forEach((column) => {
      const columnId = column.id as string;
      table.getColumn(columnId)?.setFilterValue("");
    });
    table.setGlobalFilter("");
  }, [filterableColumns, table]);

  // Determinar qué mostrar
  const hasAnyFilters = showGlobalFilter || columnsToRender.length > 0;

  if (!hasAnyFilters) return null;

  return (
    <div className="flex flex-col mt-4 lg:mt-0 lg:flex-row items-center gap-4">
      {/* Entrada de búsqueda global */}
      {showGlobalFilter && (
        <div className="relative w-full lg:max-w-sm">
          <Search className="absolute size-4 left-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            value={globalFilterValue}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            placeholder={globalFilterConfig.placeholder || "Buscar..."}
            className="pl-9 w-full"
          />
        </div>
      )}

      {/* Filtros individuales de columna (filtros no textuales cuando la búsqueda global está habilitada) */}
      {columnsToRender.map(renderFilter)}

      {/* Botón para borrar filtros */}
      {globalFilterValue.length > 0 || table.getFilteredRowModel().rows.length > 0 ? (
        <Button variant="destructive" size="sm" onClick={clearAllFilters}>
          <Trash className="ml-2 h-5 w-5" />
          Borrar filtros
        </Button>
      ) : null}
    </div>
  );
}
