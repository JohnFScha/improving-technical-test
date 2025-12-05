import type { ColumnDef } from "@tanstack/react-table"

export interface Product {
  id:          string;
  name:        string;
  description: string;
  category:    Category;
  price:       number;
  isFavorite:  boolean;
}

export type Category = 'electronics' | 'clothing' | 'books' | 'home';

export type FilterType = "text" | "select" | "date" | "number" | "boolean" | "selectIdFromName" | "multi-select"

export interface FilterConfig {
  type: FilterType
  placeholder?: string
  options?: { label: string; value: string, id?: number }[]
}

export type DataTableColumn<TData, TValue> = ColumnDef<TData, TValue> & {
  filterConfig?: FilterConfig
}

export interface  GlobalFilterConfig {
  enabled: boolean
  placeholder?: string
  columnIds: string[] // Array of column IDs to search across
}
