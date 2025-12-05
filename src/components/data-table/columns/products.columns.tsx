import { MoreHorizontal, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTableColumnHeader } from "../utils/data-table-column-header.tsx"
import type { DataTableColumn, Product } from "@/lib/types/index.ts"
import { formatCurrency } from "@/lib/utils/index.ts"
import { Badge } from "@/components/ui/badge.tsx"
import ProductDetailModal from "@/components/modals/product-detail.tsx"

/**
 * Definicion de las columnas para la tabla de productos.
 * @return Un array de definiciones de columnas para la tabla de productos.
 */
export const columnsFactory = ({
  toggleFavorite,
  favorites,
}: {
  toggleFavorite: (product: Product) => void;
  favorites: Product[];
}): DataTableColumn<Product, unknown>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "name",
    accessorKey: "name",
    meta: { title: "Nombre" },
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nombre" />,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("name")}</div>
    ),
    filterConfig: {
      type: "text",
      placeholder: "Buscar por nombre..."
    },
    filterFn: (row, _columnId, filterValue) => {
      const name = row.getValue("name") as string
      return name.toLowerCase().includes((filterValue as string).toLowerCase())
    }
  },
  {
    id: "price",
    accessorKey: "price",
    meta: { title: "Precio" },
    header: ({ column }) => <DataTableColumnHeader column={column} title="Precio" />,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"))
      const formatted = formatCurrency(amount)
      return <Badge className="text-center">{formatted}</Badge>
    },
    filterFn: (row, _columnId, filterValue) => {
      const price = row.getValue("price") as number
      return price === parseFloat(filterValue as string)
    },
    filterConfig: {
      type: "number",
      placeholder: "Filtrar por precio..."
    }
  },
  {
    id: "category",
    accessorKey: "category",
    meta: { title: "Categoría" },
    header: ({ column }) => <DataTableColumnHeader column={column} title="Categoría" />,
    cell: ({ row }) => {
      const category = row.getValue("category") as string;
      switch (category) {
        case 'electronics':
          return <Badge variant={"blue"} className="text-center">Electrónica</Badge>;
        case 'clothing':
          return <Badge variant={"green"} className="text-center">Ropa</Badge>;
        case 'books':
          return <Badge variant={"yellow"} className="text-center">Libros</Badge>;
        case 'home':
          return <Badge variant={"purple"} className="text-center">Hogar</Badge>;
        default:
          return <Badge variant={"secondary"} className="text-center">{row.getValue("category")}</Badge>
      }
    },
    filterConfig: {
      type: "select",
      placeholder: "Filtrar por categoría...",
      options: [
        { label: "Electrónica", value: "electronics" },
        { label: "Ropa", value: "clothing" },
        { label: "Libros", value: "books" },
        { label: "Hogar", value: "home" },
      ],
    },
    filterFn: (row, _columnId, filterValue) => {
      const category = row.getValue("category") as string
      return category.toLowerCase().includes((filterValue as string).toLowerCase())
    }
  },
  {
    id: "isFavorite",
    accessorKey: "isFavorite",
    meta: { title: "Favorito" },
    header: ({ column }) => <DataTableColumnHeader column={column} title="Favorito" />,
    cell: ({ row }) => {
      const product = row.original
      const isFav = favorites.some((fav) => fav.id === product.id)
      return (
        <Button
          variant={"ghost"}
          size="sm"
          onClick={() => toggleFavorite(product)}
        >
          {isFav ? <Star className="fill-primary" /> : <Star className="fill-transparent" />}
        </Button>
      )
    }
  },
  {
    id: "actions",
    meta: { title: "Acciones" },
    header: () => <div className="text-center">Acciones</div>,
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original
      const isFav = favorites.some((fav) => fav.id === product.id)
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.id)}
            >
              Copiar ID del producto
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <ProductDetailModal product={product} isFavorite={isFav} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]