import { ProductsController } from "@/lib/controllers/products.controller.ts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card.tsx";
import { DataTable } from "@/components/data-table/index.tsx";
import { columns } from "@/components/data-table/columns/products.columns.tsx";

export function ProductsPage() {
  const { data, isLoading, error } = ProductsController();

  const renderContent = () => {
    switch (true) {
      case isLoading:
        return <div>Cargando productos...</div>;
      case !!error:
        return <div>Error al cargar los productos.</div>;
      case data?.length === 0:
        return <div>No hay productos disponibles.</div>;
      default:
        return <DataTable data={data!} columns={columns} globalFilterConfig={{
          enabled: true,
          columnIds: ["name", "category"]
        }} />;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Productos</CardTitle>
        <CardDescription>Lista de productos disponibles</CardDescription>
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  )
}