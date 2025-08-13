import api from "./api";

export const loginUser = async (username: string, password: string) => {
  // Hace POST, backend pone cookie HTTP-only con el token
  const response = await api.post("/auth/login", { username, password });
  
  // Puedes devolver un mensaje o solo indicar que fue exitoso
  return response.data;  // probablemente { message: "Login exitoso" } o similar
};