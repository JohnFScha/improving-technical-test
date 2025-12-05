import { api } from "../api/index.ts";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types/index.ts";
import { useState } from "react";
import { columnsFactory } from "@/components/data-table/columns/products.columns.tsx";

/**
 * Controlador para manejar la logica de productos, incluyendo la obtencion de datos desde la API.
 * @returns Un objeto que contiene los datos de productos, el estado de carga y cualquier error ocurrido durante la obtencion de datos.
 */
export function ProductsController() {
  const [favorites, setFavorites] = useState<Product[]>(() => {
    try {
      if (typeof window === "undefined") return [];
      const raw = localStorage.getItem("favorites");
      return raw ? (JSON.parse(raw) as Product[]) : [];
    } catch {
      return [];
    }
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: api.getProducts,
  });

  const toggleFavorite = (product: Product) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.find((fav) => fav.id === product.id)) {
        return prevFavorites.filter((fav) => fav.id !== product.id);
      }
      localStorage.setItem("favorites", JSON.stringify([...prevFavorites, product]));
      return [...prevFavorites, product];
    });
  };

  const columns = columnsFactory({ toggleFavorite, favorites });

  return { data, isLoading, error, favorites, toggleFavorite, columns };
}
