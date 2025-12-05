import type { Product } from "../types/index.ts";
import { sleep } from "../utils/index.ts";

/**
 * API simulada para obtener productos.
 * Generalmente aqui se harian llamadas reales a un backend o servicio externo.
 * Por ahora, simulamos la obtencion de datos con fetch desde un archivo local y un retraso artificial.
 * @returns Una promesa que se resuelve con una lista de productos.
 */
export const api = {
  getProducts: async (): Promise<Product[]> => {
    await sleep(1000); // Simula un retraso de red
    const response = await fetch("./products.json");

    if (!response.ok) {
      throw new Error("Error al obtener los productos");
    }

    const products = await response.json();
    return products as Product[];
  },

  getFavoriteProducts: async (): Promise<Product[]> => {
    await sleep(1000); // Simula un retraso de red
    const response = await fetch("./products.json");
    if (!response.ok) {
      throw new Error("Error al obtener los productos favoritos");
    }
    const products = await response.json();
    return products.filter((product: Product) => product.isFavorite) as Product[];
  },

  getProductoByCategory: async (category: string): Promise<Product[]> => {
    await sleep(1000); // Simula un retraso de red
    const response = await fetch("./products.json");

    if (!response.ok) {
      throw new Error("Error al obtener los productos por categoria");
    }
    const products = await response.json();
    return products.filter((product: Product) => product.category === category) as Product[];
  }
} as const;