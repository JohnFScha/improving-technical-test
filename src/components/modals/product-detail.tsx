import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog.tsx"

import type { Product } from "@/lib/types/index.ts"
import { Button } from "../ui/button.tsx"
import { CircleQuestionMark } from "lucide-react"
import { formatCurrency } from "@/lib/utils/index.ts"

const ProductDetailModal = ({
  product,
}: {
  product: Product
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="w-full text-left p-2 font-normal">
          Ver detalles del producto
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <CircleQuestionMark className="inline mr-2 mb-1 text-muted-foreground size-5" />
            {product.name}
          </AlertDialogTitle>
          <AlertDialogDescription>Detalles del producto</AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <ul className="list-disc pl-5 space-y-2">
            <li>Detalles: {product.description}</li>
            <li>Categoría: {product.category}</li>
            <li>Precio: {formatCurrency(product.price)}</li>
            <li>Favorito: {product.isFavorite ? "Sí" : "No"}</li>
          </ul>   
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>
            Cerrar
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ProductDetailModal;