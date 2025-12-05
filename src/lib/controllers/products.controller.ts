import { api } from "../api/index.ts";
import { useQuery } from "@tanstack/react-query";

/**
 * Controlador para manejar la logica de productos, incluyendo la obtencion de datos desde la API.
 * @returns Un objeto que contiene los datos de productos, el estado de carga y cualquier error ocurrido durante la obtencion de datos.
 */
export function ProductsController() {
  // Usualment en este componente se alojan toda la logica que hace al ciclo de vida del componente
  // Como por ejemplo llamadas a APIs, custom hooks, event handlers, manejo de estados complejos, etc.
  // Aqui usamos React Query para obtener los productos desde la API simulada

  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: api.getProducts,
    // Opcional: puedes configurar el tiempo de cache, reintentos, etc.
  });

  return { data, isLoading, error };
};
