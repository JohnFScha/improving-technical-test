import { ProductsController } from "@/lib/controllers/products.controller.ts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card.tsx";
import { DataTable } from "@/components/data-table/index.tsx";
import { Spinner } from "@/components/ui/spinner.tsx";

export function ProductsPage() {
  const { data, isLoading, error, columns } = ProductsController();

  const renderContent = () => {
    switch (true) {
      case isLoading:
        return (
          <div className="flex justify-center items-center h-32">
            <Spinner className="size-10" />
          </div>
        );
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