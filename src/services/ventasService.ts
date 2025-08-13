// src/services/ventasService.ts
const API_URL = "http://localhost:8080/api"; // tu backend en Spring Boot

export interface Venta {
  id?: number;
  mesaId: number;
  productos: { id: number; cantidad: number }[];
  metodoPago: string;
  total: number;
}

export async function registrarVenta(venta: Venta) {
  const response = await fetch(`${API_URL}/ventas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(venta),
  });
  if (!response.ok) {
    throw new Error("Error registrando venta");
  }
  return await response.json();
}

export async function obtenerVentas() {
  const response = await fetch(`${API_URL}/ventas`);
  if (!response.ok) {
    throw new Error("Error obteniendo ventas");
  }
  return await response.json();
}