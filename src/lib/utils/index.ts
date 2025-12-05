import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 *  ¡Combina clases de Tailwind CSS de manera condicional y maneja conflictos de clases.
 * @param inputs - Una lista de valores de clase que pueden ser cadenas, objetos o arrays.
 * @returns Una cadena de clases combinadas y resueltas.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formatea un numero como moneda segun la configuracion regional y la moneda especificada.
 * @param amount - El monto a formatear.
 * @param locale - La configuración regional para el formato. Por defecto es "es-AR".
 * @param currency - La moneda a utilizar para el formato. Por defecto es "ARS".
 * @returns Una cadena formateada como moneda según la configuración regional y la moneda especificada.
 */
export function formatCurrency(amount: number, locale = "es-AR", currency = "ARS"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currencyDisplay: "symbol",
    currency,
  }).format(amount);
}

/** Pausa la ejecucion durante un numero especifico de milisegundos. Para debugging o simulacion de retrasos.
 * @param ms - El numero de milisegundos para pausar la ejecucion.
 * @returns Una promesa que se resuelve despues del tiempo especificado.
 */
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
